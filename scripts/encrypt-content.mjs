// ============================================================================
//  encrypt-content.mjs — local encrypt step for the password gate
// ============================================================================
//  Reads the plaintext protected content (content/letter.html), derives a key
//  from the wedding password via PBKDF2, encrypts it with AES-GCM, and writes
//  the ciphertext to src/generated/letter.enc.json (which IS committed).
//
//  The deployed site only ever ships the ciphertext — the password and the
//  plaintext never reach the browser. The browser re-derives the same key from
//  the typed password and decrypts in place (see src/pages/index.astro).
//
//  Run before every push:   WEDDING_PASSWORD='…' npm run encrypt
//  (or just `npm run encrypt` and type the password at the prompt).
//  See PUBLISHING.md.
//
//  Uses Node's built-in webcrypto, which is byte-compatible with the browser's
//  crypto.subtle — so there are zero dependencies and the two sides interop.
// ============================================================================

import { webcrypto as crypto } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createInterface } from 'node:readline/promises';

const ITERATIONS = 310000;
const SRC = 'content/letter.html';
const OUT = 'src/generated/letter.enc.json';

const b64 = (buf) => Buffer.from(buf).toString('base64');

async function getPassword() {
  if (process.env.WEDDING_PASSWORD) return process.env.WEDDING_PASSWORD;
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const pw = await rl.question('Wedding password: ');
  rl.close();
  if (!pw) throw new Error('No password provided (set WEDDING_PASSWORD or type one at the prompt).');
  return pw;
}

async function deriveKey(password, salt) {
  const base = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveKey'],
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt'],
  );
}

async function main() {
  let plaintext;
  try {
    plaintext = await readFile(SRC, 'utf8');
  } catch {
    throw new Error(`Could not read ${SRC}. Run this from the project root.`);
  }

  const password = await getPassword();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);
  const ct = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(plaintext),
  );

  await mkdir('src/generated', { recursive: true });
  await writeFile(
    OUT,
    JSON.stringify(
      {
        v: 1,
        kdf: 'PBKDF2',
        hash: 'SHA-256',
        iterations: ITERATIONS,
        salt: b64(salt),
        iv: b64(iv),
        ct: b64(ct),
      },
      null,
      2,
    ) + '\n',
  );

  console.log(`✓ Encrypted ${plaintext.length} chars of ${SRC} → ${OUT}`);
  console.log('  Commit content/letter.html AND src/generated/letter.enc.json, then push.');
}

main().catch((err) => {
  console.error('✗ Encrypt failed:', err.message);
  process.exit(1);
});
