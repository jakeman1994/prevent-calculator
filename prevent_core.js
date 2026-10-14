/*CORE-START*/
const PREVENT_COEF = {"base_10yr": {"female_total_cvd": [0.7939329, 0.0305239, -0.1606857, -0.2394003, 0.3600781, 0.8667604, 0.5360739, 0.0, 0.0, 0.6045917, 0.0433769, 0.3151672, -0.1477655, -0.0663612, 0.1197879, -0.0819715, 0.0306769, -0.0946348, -0.27057, -0.078715, 0.0, -0.1637806, -3.307728], "male_total_cvd": [0.7688528, 0.0736174, -0.0954431, -0.4347345, 0.3362658, 0.7692857, 0.4386871, 0.0, 0.0, 0.5378979, 0.0164827, 0.288879, -0.1337349, -0.0475924, 0.150273, -0.0517874, 0.0191169, -0.1049477, -0.2251948, -0.0895067, 0.0, -0.1543702, -3.031168], "female_ascvd": [0.719883, 0.1176967, -0.151185, -0.0835358, 0.3592852, 0.8348585, 0.4831078, 0.0, 0.0, 0.4864619, 0.0397779, 0.2265309, -0.0592374, -0.0395762, 0.0844423, -0.0567839, 0.0325692, -0.1035985, -0.2417542, -0.0791142, 0.0, -0.1671492, -3.819975], "male_ascvd": [0.7099847, 0.1658663, -0.1144285, -0.2837212, 0.3239977, 0.7189597, 0.3956973, 0.0, 0.0, 0.3690075, 0.0203619, 0.2036522, -0.0865581, -0.0322916, 0.114563, -0.0300005, 0.0232747, -0.0927024, -0.2018525, -0.0970527, 0.0, -0.1217081, -3.500655], "female_heart_failure": [0.8998235, 0.0, 0.0, -0.4559771, 0.3576505, 1.038346, 0.583916, -0.0072294, 0.2997706, 0.7451638, 0.0557087, 0.3534442, 0.0, -0.0981511, 0.0, 0.0, 0.0, -0.0946663, -0.3581041, -0.1159453, -0.003878, -0.1884289, -4.310409], "male_heart_failure": [0.8972642, 0.0, 0.0, -0.6811466, 0.3634461, 0.923776, 0.5023736, -0.0485841, 0.3726929, 0.6926917, 0.0251827, 0.2980922, 0.0, -0.0497731, 0.0, 0.0, 0.0, -0.1289201, -0.3040924, -0.1401688, 0.0068126, -0.1797778, -3.946391]}, "base_30yr": {"female_total_cvd": [0.5503079, -0.0928369, 0.0409794, -0.1663306, -0.1628654, 0.3299505, 0.6793894, 0.3196112, 0.0, 0.0, 0.1857101, 0.0553528, 0.2894, -0.075688, -0.056367, 0.1071019, -0.0751438, 0.0301786, -0.0998776, -0.3206166, -0.1607862, 0.0, -0.1450788, -1.318827], "male_total_cvd": [0.4627309, -0.0984281, 0.0836088, -0.1029824, -0.2140352, 0.2904325, 0.5331276, 0.2141914, 0.0, 0.0, 0.1155556, 0.0603775, 0.232714, -0.0272112, -0.0384488, 0.134192, -0.0511759, 0.0165865, -0.1101437, -0.2585943, -0.1566406, 0.0, -0.1166776, -1.148204], "female_ascvd": [0.4669202, -0.0893118, 0.1256901, -0.1542255, -0.0018093, 0.322949, 0.6296707, 0.268292, 0.0, 0.0, 0.100106, 0.0499663, 0.1875292, 0.0152476, -0.0276123, 0.0736147, -0.0521962, 0.0316918, -0.1046101, -0.2727793, -0.1530907, 0.0, -0.1299149, -1.974074], "male_ascvd": [0.3994099, -0.0937484, 0.1744643, -0.120203, -0.0665117, 0.2753037, 0.4790257, 0.1782635, 0.0, 0.0, -0.0218789, 0.0602553, 0.1421182, 0.0135996, -0.0218265, 0.1013148, -0.0312619, 0.020673, -0.0920935, -0.2159947, -0.1548811, 0.0, -0.0712547, -1.736444], "female_heart_failure": [0.6254374, -0.0983038, 0.0, 0.0, -0.3919241, 0.3142295, 0.8330787, 0.3438651, 0.0594874, 0.2525536, 0.2981642, 0.0667159, 0.333921, 0.0, -0.0893177, 0.0, 0.0, 0.0, -0.0974299, -0.404855, -0.1982991, -0.0035619, -0.1564215, -2.205379], "male_heart_failure": [0.5681541, -0.1048388, 0.0, 0.0, -0.4761564, 0.30324, 0.6840338, 0.2656273, 0.0833107, 0.26999, 0.2541805, 0.0638923, 0.2583631, 0.0, -0.0391938, 0.0, 0.0, 0.0, -0.1269124, -0.3273572, -0.2043019, -0.0182831, -0.1342618, -1.95751]}};
const RANGES = {age:[30,79], tc_mg:[130,320], tc_mmol:[3.36,8.28], hdl_mg:[20,100], hdl_mmol:[0.52,2.59], sbp:[90,180], egfr:[15,140], bmi:[18.5,39.9]};
const MG2MMOL = 0.02586;
function roundHalfUp(x, dp){ const m = Math.pow(10, dp); return Math.sign(x)*Math.floor(Math.abs(x)*m + 0.5 + 1e-9)/m; }
function inRange(v, r){ return typeof v === 'number' && isFinite(v) && v >= r[0] && v <= r[1]; }
function ckdEpi2021(cr, age, sex, unit){ // race-free CKD-EPI 2021, as preventr calc_egfr
  if (unit === 'umol/L') cr = cr/88.4;
  const f = sex === 'female'; const k = f?0.7:0.9, a1 = f?-0.241:-0.302;
  return Math.round(142*Math.pow(Math.min(cr/k,1),a1)*Math.pow(Math.max(cr/k,1),-1.2)*Math.pow(0.9938,age)*(f?1.012:1));
}
function bmiCalc(wt, ht, units){ // metric: kg, cm; nonmetric: lb, in
  if (units === 'nonmetric') return 703*wt/(ht*ht);
  const m = ht/100; return wt/(m*m);
}
function predictors(p){
  const f = p.unit === 'mmol/L' ? 1 : MG2MMOL;
  const age = (p.age-55)/10, nh = (p.tc-p.hdl)*f - 3.5, h = (p.hdl*f - 1.3)/0.3;
  const sge = (Math.max(p.sbp,110)-130)/20, slt = (Math.min(p.sbp,110)-110)/20;
  const bmi = (p.bmi == null || isNaN(p.bmi)) ? 25 : p.bmi; // BMI terms are 0 for CVD/ASCVD; HF requires real BMI
  const blt = (Math.min(bmi,30)-25)/5, bge = (Math.max(bmi,30)-30)/5;
  const elt = (Math.min(p.egfr,60)-60)/-15, ege = (Math.max(p.egfr,60)-90)/-15;
  const dm=+!!p.dm, smk=+!!p.smoking, bp=+!!p.bptx, st=+!!p.statin;
  return [age, age*age, nh, h, slt, sge, dm, smk, blt, bge, elt, ege, bp, st, bp*sge, st*nh, age*nh, age*h, age*sge, age*dm, age*smk, age*bge, age*elt, 1];
}
function validate(p){
  const errs = [], warns = [];
  if (p.sex !== 'female' && p.sex !== 'male') errs.push('Sex is required.');
  const chk = (v, r, name, unit) => { if (!inRange(v, r)) errs.push(`${name} must be ${r[0]} to ${r[1]}${unit?' '+unit:''} (entered: ${isFinite(v)?v:'blank'}).`); };
  chk(p.age, RANGES.age, 'Age', 'years');
  const mm = p.unit === 'mmol/L';
  chk(p.tc, mm?RANGES.tc_mmol:RANGES.tc_mg, 'Total cholesterol', p.unit);
  chk(p.hdl, mm?RANGES.hdl_mmol:RANGES.hdl_mg, 'HDL-C', p.unit);
  chk(p.sbp, RANGES.sbp, 'Systolic BP', 'mmHg');
  chk(p.egfr, RANGES.egfr, 'eGFR', 'mL/min/1.73m2');
  let bmiOk = true;
  if (p.bmi == null || isNaN(p.bmi)) { bmiOk = false; warns.push('BMI not entered: heart failure not calculated (total CVD and ASCVD do not use BMI).'); }
  else if (!inRange(p.bmi, RANGES.bmi)) { bmiOk = false; warns.push(`BMI must be 18.5 to 39.9 (entered: ${p.bmi.toFixed(1)}); heart failure not calculated.`); }
  if (inRange(p.age, RANGES.age) && p.age > 59) warns.push('Estimating 30-year risk in people > 59 years of age is questionable (preventr warning); 30-year results shown for reference only.');
  return {errs, warns, bmiOk};
}
function computePrevent(p){
  const v = validate(p);
  if (v.errs.length) return {ok:false, errors:v.errs, warnings:v.warns};
  const x = predictors(p), out = {};
  for (const yr of ['10yr','30yr']) {
    const tbl = PREVENT_COEF['base_'+yr], xs = yr==='10yr' ? x.filter((_,i)=>i!==1) : x;
    out[yr] = {};
    for (const o of ['total_cvd','ascvd','heart_failure']) {
      if (o === 'heart_failure' && !v.bmiOk) { out[yr][o] = null; continue; } // only HF uses BMI (BMI betas are 0 for CVD and ASCVD)
      const b = tbl[p.sex+'_'+o]; let lo = 0; for (let i=0;i<b.length;i++) lo += b[i]*xs[i];
      const r = Math.exp(lo)/(1+Math.exp(lo)); out[yr][o] = {raw:r, risk:roundHalfUp(r,3)};
    }
  }
  return {ok:true, results:out, warnings:v.warns, thirtyQuestionable:p.age>59};
}
function ascvdCategory(r){ // 2026 ACC/AHA Dyslipidemia Guideline Table 12, PREVENT-ASCVD 10-y
  const pct = r*100;
  if (pct < 3) return 'Low'; if (pct < 5) return 'Borderline'; if (pct < 10) return 'Intermediate'; return 'High';
}
if (typeof module !== 'undefined') module.exports = {computePrevent, ckdEpi2021, bmiCalc, ascvdCategory, roundHalfUp};
/*CORE-END*/
