#!/usr/bin/env bash
# install.sh — Install the vietnamese-writer skill for Hermes Agent
set -euo pipefail

HERMES_HOME="${HERMES_HOME:-$HOME/.hermes}"
SKILL_DIR="$HERMES_HOME/skills/writing/vietnamese-writer"

echo "Installing vietnamese-writer skill..."

mkdir -p "$SKILL_DIR/references"

# Download SKILL.md
curl -fsSL -o "$SKILL_DIR/SKILL.md" \
  "https://raw.githubusercontent.com/thanhan-a17/vietnamese-writer-skill/main/SKILL.md"

# Download reference
curl -fsSL -o "$SKILL_DIR/references/integration-pattern.md" \
  "https://raw.githubusercontent.com/thanhan-a17/vietnamese-writer-skill/main/references/integration-pattern.md"

# Verify (check SKILL.md exists and has content)
if [ -s "$SKILL_DIR/SKILL.md" ]; then
    echo "✓ vietnamese-writer installed to $SKILL_DIR"
    echo "  Load with:  hermes --skills vietnamese-writer"
    echo "  Or mid-session:  /skill vietnamese-writer"
else
    echo "✗ Install failed — SKILL.md is empty or missing"
    exit 1
fi
