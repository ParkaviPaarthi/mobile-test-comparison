#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, '../results/results.csv');
const rows = fs.readFileSync(file, 'utf8').trim().split('\n').slice(1).map(l => {
  const [, tool, , passed, dur] = l.split(',');
  return { tool, passed: passed === 'true', dur: parseFloat(dur) };
});
const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
const median = a => { const s = [...a].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const table = {};
for (const t of [...new Set(rows.map(r => r.tool))]) {
  const rs = rows.filter(r => r.tool === t);
  const d = rs.map(r => r.dur), mu = mean(d);
  table[t] = {
    runs: rs.length,
    'pass %': (100 * rs.filter(r => r.passed).length / rs.length).toFixed(0),
    'avg s': mu.toFixed(1),
    'median s': median(d).toFixed(1),
    'stddev s': Math.sqrt(mean(d.map(x => (x - mu) ** 2))).toFixed(1),
  };
}
console.table(table);
