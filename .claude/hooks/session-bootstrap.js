#!/usr/bin/env node
/**
 * SessionStart hook — Claude Code workflow v3
 *
 * Outputs structured status to stdout. Claude Code reads stdout
 * and includes it in the session context as a system reminder.
 *
 * Failure mode: exit 0 always (never block session start).
 * If git/file reads fail, output what we can and continue.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function safeExec(cmd, fallback = '(unavailable)') {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return fallback;
  }
}

function safeRead(filepath, lines = 40, fallback = '(unavailable)') {
  try {
    const content = fs.readFileSync(filepath, 'utf8');
    return content.split('\n').slice(0, lines).join('\n');
  } catch {
    return fallback;
  }
}

const lines = [
  '═══ SESSION BOOTSTRAP (workflow v3) ═══════════════════',
  '',
  '## Git status (short)',
  safeExec('git status --short') || '  (clean)',
  '',
  '## Unpushed commits',
  safeExec('git log --oneline @{u}.. 2>/dev/null') || '  (none)',
  '',
  '## Active worktrees',
  safeExec('git worktree list'),
  '',
  '## STATE.md (head 40 lines)',
  safeRead(path.join('workflow', 'STATE.md'), 40),
  '',
  '## Active LESSONS (top 7)',
  safeRead(path.join('workflow', 'projects', 'cl3menza', 'LESSONS.md'), 50),
  '',
  '═══════════════════════════════════════════════════════',
  '',
];

console.log(lines.join('\n'));
process.exit(0);
