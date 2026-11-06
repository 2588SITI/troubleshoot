#!/usr/bin/env python3
"""
Build bilingual translations for conventional locomotive TSDs.
Covers all Hindi-only actions, lamps, and effects in src/dataConventional.ts.
"""

import json
import re

# Load genuinely missing actions
with open("scripts/genuinely_missing_actions.json", "r", encoding="utf-8") as f:
    missing_actions = json.load(f)

print(f"Total actions to translate: {len(missing_actions)}")
