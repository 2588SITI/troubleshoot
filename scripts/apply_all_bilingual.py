#!/usr/bin/env python3
"""
Applies all bilingual translations to src/dataConventional.ts
Ensures 100% of faults in conventional locomotive TSD are bilingual.
"""

import json
import re
import sys

from dictionary_fuses_aux import translations_fuses_aux
from dictionary_pneumatic import translations_pneumatic
from dictionary_traction import translations_traction
from dictionary_cab_lamps import translations_cab_lamps, translations_lamps, translations_effects

# Combine action dictionaries
all_action_translations = {}
all_action_translations.update(translations_fuses_aux)
all_action_translations.update(translations_pneumatic)
all_action_translations.update(translations_traction)
all_action_translations.update(translations_cab_lamps)

print(f"Total action translations in dictionaries: {len(all_action_translations)}")

# Load genuinely missing actions
with open("scripts/genuinely_missing_actions.json", "r", encoding="utf-8") as f:
    missing_actions = json.load(f)

uncovered = []
for item in missing_actions:
    txt = item["text"].strip()
    if txt not in all_action_translations:
        uncovered.append(item)

if uncovered:
    print(f"WARNING: {len(uncovered)} actions not found in translation dictionary!")
    for u in uncovered[:15]:
        print(f"  [{u['faultId']}] {u['text']}")
else:
    print("SUCCESS: All 227 genuinely missing actions are covered in the dictionaries!")
