// Automated validation: JS core extracted from the shipped HTML vs preventr 0.12.0 published test values and prevent_ascvd.py
const fs = require('fs'), {execFileSync} = require('child_process');
const html = fs.readFileSync(__dirname + '/PREVENT_calculator.html', 'utf8');
const core = html.split('/*CORE-START*/')[1].split('/*CORE-END*/')[0];
const m = {exports:{}}; new Function('module', core)(m); const P = m.exports;
const D = {sex:'female', age:50, sbp:160, bptx:true, tc:200, hdl:45, statin:false, dm:true, smoking:false, egfr:90, bmi:35, unit:'mg/dL'};
const cases = [ // expected values from preventr tests/testthat/test-other_models.R and estimate_risk() docs (Khan 2024 Table S25 / supplemental Excel)
 ['Published: 50F DM, SBP160 on BP tx, TC200/HDL45, eGFR90, BMI35', {}, {t10:[0.147,0.092,0.081], t30:[0.53,0.354,0.39]}],
 ['preventr test: same, age 67', {age:67}, {t10:[0.23,0.14,0.147], t30:[0.514,0.329,0.39]}],
 ['preventr test: 59M', {age:59, sex:'male'}, {t10:[0.211,0.134,0.146], t30:[0.518,0.355,0.433]}],
 ['preventr test: 59M SBP148', {age:59, sex:'male', sbp:148}, {t10:[0.187,0.117,0.127], t30:[0.487,0.325,0.402]}],
 ['preventr test: 59M SBP148 no BP tx', {age:59, sex:'male', sbp:148, bptx:false}, {t10:[0.153,0.1,0.102], t30:[0.437,0.299,0.35]}],
 ['preventr test: + TC189', {age:59, sex:'male', sbp:148, bptx:false, tc:189}, {t10:[0.151,0.096,0.102], t30:[0.433,0.29,0.35]}],
 ['preventr test: TC200/HDL60', {age:59, sex:'male', sbp:148, bptx:false, hdl:60}, {t10:[0.136,0.084,0.102]}],
];
const O = ['total_cvd','ascvd','heart_failure']; let pass = 0, fail = 0;
const rows = [];
for (const [name, mod, exp] of cases) {
  const r = P.computePrevent({...D, ...mod});
  for (const [k, yr] of [['t10','10yr'],['t30','30yr']]) if (exp[k]) exp[k].forEach((e, i) => {
    const got = r.results[yr][O[i]].risk, ok = Math.abs(got - e) < 0.0005;
    ok ? pass++ : fail++; rows.push(`${ok?'PASS':'FAIL'} | ${name} | ${yr} ${O[i]} | expected ${(e*100).toFixed(1)}% | JS ${(got*100).toFixed(1)}%`);
  });
}
// mmol/L entry must equal mg/dL
const a = P.computePrevent(D), b = P.computePrevent({...D, unit:'mmol/L', tc:200*0.02586, hdl:45*0.02586});
const okU = Math.abs(a.results['10yr'].ascvd.raw - b.results['10yr'].ascvd.raw) < 1e-12; okU?pass++:fail++; rows.push(`${okU?'PASS':'FAIL'} | mmol/L input equals mg/dL`);
// Random cases vs research/prevent_ascvd.py (ASCVD, unrounded)
let seed = 7; const rnd = () => (seed = (seed*16807) % 2147483647) / 2147483647;
const rc = []; for (let i=0;i<200;i++) rc.push({sex: rnd()<.5?'female':'male', age:30+Math.floor(rnd()*50), tc:130+Math.floor(rnd()*190), hdl:20+Math.floor(rnd()*80), sbp:90+Math.floor(rnd()*90), egfr:15+Math.floor(rnd()*125), dm:rnd()<.3, smoking:rnd()<.3, bptx:rnd()<.4, statin:rnd()<.3, bmi:25, unit:'mg/dL'}).toString();
const py = `import sys,json;sys.path.insert(0,'/workspace/research');from prevent_ascvd import ascvd
cs=json.load(sys.stdin);print(json.dumps([[ascvd(c['sex'],y,age=c['age'],tc=c['tc'],hdl=c['hdl'],sbp=c['sbp'],dm=c['dm'],smk=c['smoking'],egfr=c['egfr'],bptx=c['bptx'],statin=c['statin']) for y in (10,30)] for c in cs]))`;
const ref = JSON.parse(execFileSync('python3', ['-c', py], {input: JSON.stringify(rc)}));
let maxd = 0; rc.forEach((c,i) => { const r = P.computePrevent(c); maxd = Math.max(maxd, Math.abs(r.results['10yr'].ascvd.raw-ref[i][0]), Math.abs(r.results['30yr'].ascvd.raw-ref[i][1])); });
const okP = maxd < 1e-5; okP?pass++:fail++; rows.push(`${okP?'PASS':'FAIL'} | 200 random cases vs prevent_ascvd.py (ASCVD 10y+30y) | max abs diff ${maxd.toExponential(2)}`);
// CKD-EPI 2021 and range checks
const eg = [[P.ckdEpi2021(1.0,50,'female','mg/dL'),69],[P.ckdEpi2021(1.0,50,'male','mg/dL'),92],[P.ckdEpi2021(88.4,50,'male','umol/L'),92]];
eg.forEach(([g,e]) => { const ok=g===e; ok?pass++:fail++; rows.push(`${ok?'PASS':'FAIL'} | CKD-EPI 2021 expected ${e}, got ${g}`); });
const bad = P.computePrevent({...D, sbp:185}); const okR = !bad.ok && /Systolic/.test(bad.errors[0]); okR?pass++:fail++; rows.push(`${okR?'PASS':'FAIL'} | SBP 185 rejected`);
const nb = P.computePrevent({...D, bmi:NaN}); const okB = nb.ok && nb.results['10yr'].heart_failure===null && nb.results['10yr'].ascvd.risk===0.092; okB?pass++:fail++; rows.push(`${okB?'PASS':'FAIL'} | No BMI: HF withheld, ASCVD still 9.2%`);
const cats = [[0.029,'Low'],[0.03,'Borderline'],[0.05,'Intermediate'],[0.099,'Intermediate'],[0.1,'High']];
cats.forEach(([r,c]) => { const ok = P.ascvdCategory(r)===c; ok?pass++:fail++; if(!ok) rows.push(`FAIL | category ${r}`); });
console.log(rows.join('\n')); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail?1:0);
