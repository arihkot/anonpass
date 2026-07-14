const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..', '..', '..');

describe('AnonPass build artifacts', () => {
  it('has the compiled TypeScript contract binding', () => {
    const p = path.join(repoRoot, 'frontend', 'src', 'lib', 'managed', 'age_verifier.ts');
    assert.ok(fs.existsSync(p), `Missing ${p}`);
  });

  it('has generated ZK circuit artifacts (zkir + proving key)', () => {
    const zkir = path.join(repoRoot, 'frontend', 'src', 'lib', 'managed', 'zkir', 'proveAge.zkir');
    const proverKey = path.join(repoRoot, 'frontend', 'src', 'lib', 'managed', 'keys', 'proveAge.prover');
    assert.ok(fs.existsSync(zkir), `Missing zkir artifact: ${zkir}`);
    assert.ok(fs.existsSync(proverKey), `Missing prover key: ${proverKey}`);
  });
});

describe('AnonPass source and documentation', () => {
  it('has a Compact contract with a proveAge circuit', () => {
    const p = path.join(repoRoot, 'contracts', 'age_verifier.compact');
    assert.ok(fs.existsSync(p), `Missing contract: ${p}`);
    const src = fs.readFileSync(p, 'utf8');
    assert.ok(src.includes('export circuit proveAge'), 'Contract must export a proveAge circuit');
    assert.ok(src.includes('witness birthYear'), 'Contract must use a private birthYear witness');
  });

  it('README documents the privacy model and live demo', () => {
    const p = path.join(repoRoot, 'README.md');
    assert.ok(fs.existsSync(p), 'README.md must exist');
    const readme = fs.readFileSync(p, 'utf8');
    assert.ok(readme.includes('Privacy Model') || readme.includes('privacy model'), 'README must mention privacy model');
    assert.ok(readme.includes('vercel.app'), 'README must contain a live demo link');
  });
});
