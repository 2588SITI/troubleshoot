/**
 * Railway Technical Terminology Speech Cleaner
 * Normalizes Hindi / Hinglish voice-to-text transcripts for 3-Phase Electric Locomotives (WAP-7, WAG-9, WAP-5).
 * Corrects typical ASR misrecognitions (e.g., 'लोगों' -> 'लोको', 'एलएसी' -> 'LSCE', 'गला' -> 'ग्लो').
 */

export function cleanRailwayVoiceText(raw: string): string {
  if (!raw) return '';
  let text = raw;

  // 1. Locomotive references ('लोगों' / 'लोगो' -> 'लोको')
  text = text.replace(/लोगों\s*में/gi, 'लोको में');
  text = text.replace(/लोगो\s*में/gi, 'लोको में');
  text = text.replace(/लोगों/gi, 'लोको');
  text = text.replace(/(^|\s)लोगो(\s|$)/gi, '$1लोको$2');

  // 2. 3-Phase variations ('थ्री 3 फेस', 'थ्री फेज', '3 फेज')
  text = text.replace(/(?:थ्री|3)\s*(?:फेस|फेज|फ़ेज़|फ़ेस)/gi, '3-फ़ेस');

  // 3. LSCE lamp (CEL Over-temperature signaling lamp) misinterpretations
  text = text.replace(/एल\s*एस\s*सी\s*ई/gi, 'LSCE');
  text = text.replace(/एलएससीई/gi, 'LSCE');
  text = text.replace(/एलसीएम/gi, 'LSCE');
  text = text.replace(/एलएसी/gi, 'LSCE');
  text = text.replace(/एल\s*सी\s*ई/gi, 'LSCE');
  text = text.replace(/एलसीई/gi, 'LSCE');

  // 4. Lamp glow misinterpretations ('गला' / 'गलो' -> 'ग्लो')
  text = text.replace(/लैं?प\s*(?:गला|गलो)/gi, 'लैम्प ग्लो');
  text = text.replace(/(?:गला|गलो)\s*हो\s*रहा/gi, 'ग्लो हो रहा');
  text = text.replace(/LSCE\s*(?:लैं?प)?\s*(?:गला|गलो)/gi, 'LSCE लैम्प ग्लो');

  // 5. High-voltage & Auxiliary components
  text = text.replace(/वी\s*सी\s*बी|विसीबी|वीसीबी/gi, 'VCB');
  text = text.replace(/पैंटो|पैन्टो|पेंटो|पेन्टो/gi, 'पेन्टो');
  text = text.replace(/एम\s*सी\s*पी\s*ए|एमसीपीए/gi, 'MCPA');
  text = text.replace(/एम\s*सी\s*पी|एमसीपी/gi, 'MCP');
  text = text.replace(/बी\s*यू\s*आर|बीयूआर/gi, 'BUR');
  text = text.replace(/बी\s*पी\s*एफ\s*ए|बीपीएफए/gi, 'BPFA');
  text = text.replace(/एल\s*एस\s*डी\s*जे|एलएसडीजे/gi, 'LSDJ');
  text = text.replace(/एल\s*एस\s*एफ\s*आई|एलएसएफआई/gi, 'LSFI');
  text = text.replace(/एम\s*आर\s*प्रेशर|एमआर\s*प्रेशर/gi, 'MR प्रेशर');
  text = text.replace(/ट्रेक्शन/gi, 'ट्रैक्शन');
  text = text.replace(/कम्प्रेसर|कंप्रेशर/gi, 'कंप्रेसर');

  // 5b. Push-Pull & Locomotive terms: Slave / Master / Amrit Bharat corrections
  // 'स्लैब लोको' / 'स्लेब लोको' / 'स्लैब' / 'स्लेब' -> 'स्लेव लोको' (Common Speech-to-Text misrecognition for 'slave loco')
  text = text.replace(/स्लैब\s*लोको/gi, 'स्लेव लोको');
  text = text.replace(/स्लेब\s*लोको/gi, 'स्लेव लोको');
  text = text.replace(/(^|\s)(?:स्लैब|स्लेब)(\s|$)/gi, '$1स्लेव$2');
  text = text.replace(/(^|\s)(?:slab|slabe)\s+loco(\s|$)/gi, '$1slave loco$2');
  text = text.replace(/(^|\s)(?:slab|slabe)(\s|$)/gi, '$1slave$2');
  text = text.replace(/मासटर\s*लोको/gi, 'मास्टर लोको');
  text = text.replace(/मासटर/gi, 'मास्टर');
  text = text.replace(/पुशपुल|पुश\s*पुल/gi, 'पुश-पुल');
  text = text.replace(/बाइन्डिंग|बाइंडिग/gi, 'बाइंडिंग');
  text = text.replace(/ब्रेक\s*बाइन्डिंग|ब्रेक\s*बाइंडिग/gi, 'ब्रेक बाइंडिंग');

  // 6. Handle historical concatenations from earlier speech bugs if present
  // (e.g. user text ending with repetitive "क्या करें")
  const clauses = text.split(/(?:क्या करें|kya kare)/gi);
  if (clauses.length > 2) {
    const lastClause = clauses[clauses.length - 2].trim();
    if (lastClause) {
      text = lastClause + ' क्या करें';
    }
  }

  // 7. Collapse immediate adjacent duplicated words (e.g. "3-फ़ेस 3-फ़ेस" or "लोको लोको")
  text = text.replace(/(\S+)(?:\s+\1)+/gi, '$1');

  // 8. Collapse duplicate spaces
  return text.replace(/\s+/g, ' ').trim();
}
