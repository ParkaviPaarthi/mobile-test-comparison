#!/usr/bin/env node
// Runs each tool N times (no retries), records duration + pass/fail to results/results.csv
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const RUNS = parseInt(process.env.RUNS || '10', 10);
const root = path.resolve(__dirname, '..');
const suites = {
  maestro: { cmd: 'maestro', args: ['test', 'maestro/flows'], cwd: root },
  appium:  { cmd: 'npx', args: ['wdio', 'run', 'wdio.conf.js'], cwd: path.join(root, 'appium') },
  detox:   { cmd: 'npx', args: ['detox', 'test', '-c', process.env.DETOX_CONFIG || 'android.emu.release'], cwd: path.join(root, 'detox') },
};
const tools = (process.env.TOOLS || Object.keys(suites).join(',')).split(',');

fs.mkdirSync(path.join(root, 'results'), { recursive: true });
const out = path.join(root, 'results', 'results.csv');
if (!fs.existsSync(out)) fs.writeFileSync(out, 'timestamp,tool,run,passed,duration_s\n');

for (const tool of tools) {
  const s = suites[tool];
  if (!s) { console.error(`Unknown tool ${tool}`); continue; }
  for (let i = 1; i <= RUNS; i++) {
    const t0 = Date.now();
    const r = spawnSync(s.cmd, s.args, { cwd: s.cwd, stdio: 'ignore', shell: process.platform === 'win32' });
    const dur = ((Date.now() - t0) / 1000).toFixed(1);
    const passed = r.status === 0;
    fs.appendFileSync(out, `${new Date().toISOString()},${tool},${i},${passed},${dur}\n`);
    console.log(`${tool} run ${i}/${RUNS}: ${passed ? 'PASS' : 'FAIL'} in ${dur}s`);
  }
}
console.log(`\nDone. Results: ${out}\nRun: npm run report`);
