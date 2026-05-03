#!/usr/bin/env node
/**
 * Lock zone protection hook — Claude Code workflow v3
 *
 * PreToolUse Edit/Write/MultiEdit. Forces permission prompt with custom
 * reason when AI tries to edit a lock zone file. Per RULES §15 + §18,
 * lock zone files require STRICT tier batch + Pavle approval.
 *
 * LOCK_ZONE array MUST match STATE.md "Lock zone" section.
 *
 * Failure mode: exit 0 on any unexpected error (never block by accident).
 */

import path from 'path';

const LOCK_ZONE = [
  'src/App.tsx',
  'api/claude.ts',
];

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.on('data', (chunk) => { data += chunk; });
    process.stdin.on('end', () => resolve(data));
    process.stdin.on('error', () => resolve(''));
  });
}

function normalize(p) {
  if (!p) return '';
  const rel = path.isAbsolute(p) ? path.relative(process.cwd(), p) : p;
  return rel.replace(/\\/g, '/');
}

(async () => {
  try {
    const raw = await readStdin();
    if (!raw) { process.exit(0); return; }
    const input = JSON.parse(raw);
    const filePath = input?.tool_input?.file_path || input?.tool_input?.notebook_path || '';
    const norm = normalize(filePath);
    if (!norm) { process.exit(0); return; }

    if (LOCK_ZONE.includes(norm)) {
      const reason = `LOCK ZONE: ${norm}. RULES §15 + §18 zahtevaju STRICT tier batch + Pavle approval pre edita.`;
      console.log(JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'ask',
          permissionDecisionReason: reason,
        },
      }));
      process.exit(0);
      return;
    }

    process.exit(0);
  } catch {
    process.exit(0);
  }
})();
