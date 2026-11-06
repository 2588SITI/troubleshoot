#!/usr/bin/env python3
"""
Railway TSD Conventional Faults Bilingual Translator
Adds accurate Indian Railways English technical translations to all Hindi-only
actions, lamps, and effects in src/dataConventional.ts.
"""

import json
import re

# Load dump of missing items
with open("scripts/missing_dump.json", "r", encoding="utf-8") as f:
    missing_data = json.load(f)

print(f"Loaded {len(missing_data)} faults needing translation updates.")
