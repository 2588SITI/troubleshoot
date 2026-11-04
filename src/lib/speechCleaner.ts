/**
 * Railway Technical Terminology Speech Cleaner
 * Normalizes Hindi / Hinglish voice-to-text transcripts for 3-Phase Electric Locomotives (WAP-7, WAG-9, WAP-5).
 * Corrects typical ASR misrecognitions (e.g., 'लोगों' -> 'लोको', 'एलएसी' -> 'LSCE', 'गला' -> 'ग्लो').
 */

export function cleanRailwayVoiceText(raw: string): string {
  if (!raw) return '';
  let text = raw.replace(/[\r\n]+/g, ' ');

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

  // 5d. MPCS Version & Relay OCR / Voice replacements
  text = text.replace(/वजन\s*3\.0/gi, 'वर्जन 3.0');
  text = text.replace(/realy|rely/gi, 'relay');
  text = text.replace(/रले\s*को/gi, 'रिले को');
  text = text.replace(/रले\s*के/gi, 'रिले के');
  text = text.replace(/बाइपास/gi, 'बाईपास');
  text = text.replace(/वेजग/gi, 'वेजिंग');
  text = text.replace(/समात/gi, 'समाप्त');
  text = text.replace(/कंफम/gi, 'कन्फर्म');
  text = text.replace(/कसल/gi, 'कैंसिल');
  text = text.replace(/ेस\s*करे/gi, 'प्रेस करें');
  text = text.replace(/(?:^|\s)ले\s*को\s*वेज(?:\s|$)/gi, ' रिले को वेज ');
  text = text.replace(/ओपेन/gi, 'ओपन');
  text = text.replace(/Temparari/gi, 'Temporary');
  text = text.replace(/नन\s*आशन/gi, 'निम्न ऑप्शन');
  text = text.replace(/यूनट/gi, 'यूनिट');
  text = text.replace(/अधक/gi, 'अधिक');
  text = text.replace(/सब\s*सटम/gi, 'सब-सिस्टम');
  text = text.replace(/पेटो/gi, 'पैंटो');
  text = text.replace(/लोवर/gi, 'लोवर');
  text = text.replace(/नकाले/gi, 'निकालें');
  text = text.replace(/इनरजाइज़/gi, 'इनर्जाइज');
  text = text.replace(/सेन\s*लयर/gi, 'सेक्शन क्लियर');
  text = text.replace(/नन\s*तरीके/gi, 'निम्न तरीके');

  // 5c. Conventional Locomotive Safety Relays & Controls (QLM, QOP, QOA, DJ, etc.)
  text = text.replace(/(?:^|\s|[.,!?])(?:क्यू\s*एल\s*एम|क्यु\s*एल\s*एम|क्यूएलएम|क्युएलएम)(?=\s|[.,!?]|$)/gi, ' QLM ');
  text = text.replace(/क्यू\s*एल\s*एम|क्यु\s*एल\s*एम|क्यूएलएम|क्युएलएम/gi, 'QLM');
  text = text.replace(/(?:^|\s|[.,!?])(?:q\s*l\s*m)(?=\s|[.,!?]|$)/gi, ' QLM ');
  text = text.replace(/क्यू\s*एल\s*ए|क्यु\s*एल\s*ए|क्यूएलए|क्युएलए/gi, 'QLA');
  text = text.replace(/क्यू\s*ओ\s*पी|क्यु\s*ओ\s*पी|क्यूओपी|क्युओपी/gi, 'QOP');
  text = text.replace(/क्यू\s*ओ\s*ए|क्यु\s*ओ\s*ए|क्यूओए|क्युओए/gi, 'QOA');
  text = text.replace(/(?:^|\s|[.,!?])(?:q\s*r\s*s\s*i|क्यू\s*आर\s*एस\s*आई|क्यु\s*आर\s*एस\s*आई|क्यूआरएसआई|क्युआरएसआई)\s*[-_]?\s*(?:2|two|tu|टू|दो)(?=\s|[.,!?]|$)/gi, ' QRSI-2 ');
  text = text.replace(/(?:^|\s|[.,!?])(?:q\s*r\s*s\s*i|क्यू\s*आर\s*एस\s*आई|क्यु\s*आर\s*एस\s*आई|क्यूआरएसआई|क्युआरएसआई)\s*[-_]?\s*(?:1|one|van|वन|एक)(?=\s|[.,!?]|$)/gi, ' QRSI-1 ');
  text = text.replace(/(?:^|\s|[.,!?])(?:q\s*r\s*s\s*i)(?=\s|[.,!?]|$)/gi, ' QRSI ');
  text = text.replace(/क्यू\s*आर\s*एस\s*आई|क्यु\s*आर\s*एस\s*आई|क्यूआरएसआई|क्युआरएसआई/gi, 'QRSI');
  text = text.replace(/डी\s*जे|डीजे/gi, 'DJ');
  text = text.replace(/आक\s*७८|ओसीआर\s*७८|ओसीआर-७८/gi, 'OCR-78');
  text = text.replace(/बी\s*पी\s*एस\s*डब्ल्यू|बीपीएसडब्ल्यू/gi, 'BPSW');
  text = text.replace(/पी\s*वी\s*ई\s*एफ|पीवीईएफ/gi, 'PVEF');
  text = text.replace(/एम\s*पी\s*एस|एमपीएस/gi, 'MPS');
  text = text.replace(/ई\s*वी\s*पी\s*एच\s*जी\s*आर|ईवीपीएचजीआर/gi, 'EVPHGR');

  // 5c-2. Pilot Lamps & Spoken Hinglish ASR Normalization
  // Common ASR mishearings for "BL" (e.g. 'दल अनलॉक', 'बेल अनलॉक', 'देल अनलॉक', 'डल अनलॉक', 'दल को अनलॉक')
  text = text.replace(/(?:^|\s|[.,!?])(?:दल|बेल|देल|डल|बिल|बल|बी\s*एल|बीएल)\s*(?:ko|को)?\s*(?:unlock|anlock|अनलॉक)/gi, ' BL अनलॉक');
  text = text.replace(/(?:^|\s|[.,!?])(?:दल|बेल|देल|डल|बिल|बल|बी\s*एल|बीएल)\s*(?:ko|को)?\s*(?:lock|लॉक)/gi, ' BL लॉक');
  text = text.replace(/(?:^|\s|[.,!?])(?:दल|बेल|देल|डल|बिल|बल|बी\s*एल|बीएल)\s*(?:chaabi|chabi|चाबी|key|की)/gi, ' BL चाबी');
  text = text.replace(/(?:^|\s|[.,!?])(?:दल|बेल|देल|डल|बिल|बल|बी\s*एल|बीएल)\s*(?:switch|swich|स्विच)/gi, ' BL स्विच');

  // LSCHBA ASR corrections (e.g. 'लग वा', 'लगवा', 'लग बा', 'लछवा', 'लचवा', 'लक वा', 'लकवा', 'LIC hba', 'एलआईसी एचबीए' -> LSCHBA)
  text = text.replace(/(?:^|\s|[.,!?])(?:लिक\s*[-_]?\s*बा|लिकबा|लिक\s*[-_]?\s*भा|लिकभा|लिक\s*[-_]?\s*वा|लिकवा|लीक\s*[-_]?\s*बा|लीकबा|लीक\s*[-_]?\s*भा|लीकभा|लीक\s*[-_]?\s*वा|लीकवा|लिश\s*[-_]?\s*बा|लिशबा|लिच\s*[-_]?\s*बा|लिचबा|लिस\s*[-_]?\s*बा|लिसबा|लिस्क\s*[-_]?\s*बा|लिस्कबा|लिक\s*चबा|लिकचबा|लिक्क\s*[-_]?\s*बा|लिक्कबा|लिक्ख\s*[-_]?\s*बा|लिक्खबा|लिश\s*चबा|लिशचबा|लिक\s*एच\s*बी\s*ए|लिक\s*एचबीए|लिकएचबीए|लग\s*वा|लगवा|लग\s*बा|लगबा|लछवा|लचवा|लक\s*वा|लकवा|लस\s*चबा|लस\s*चवा|लस\s*कबा|लचहबा|लसहबा|एल\s*एस\s*सी\s*एच\s*बा|एलएससीएचबा|एलएस\s*सीएचबा|एल\s*एस\s*सी\s*एच\s*भा|एल\s*एस\s*सी\s*एच\s*वा|एल\s*सी\s*एच\s*बा|एलसीएचबा|एलएस\s*हवा|एल\s*एस\s*हवा|एलएस\s*एचबीए|एल\s*एस\s*एच\s*बी\s*ए|एल\s*सी\s*एच\s*बी\s*ए|एलसीएचबीए|lik\s*ba|likba|leek\s*ba|leekba|lik\s*bha|likbha|lish\s*ba|lishba|lisc\s*hba|lischba)(?=\s|[.,!?]|$)/gi, ' LSCHBA ');
  text = text.replace(/(?:^|\s|[.,!?])(?:LIC|lic|एलआईसी|एलआइसी|एल\s*आई\s*सी)\s*[-_]?\s*(?:hba|एचबीए|एच\s*बी\s*ए)(?=\s|[.,!?]|$)/gi, ' LSCHBA ');
  text = text.replace(/(?:^|\s|[.,!?])(?:एल\s*एस\s*सी\s*एच\s*बी\s*ए|एलएससीएचबीए|एलएस\s*सीएचबीए)(?=\s|[.,!?]|$)/gi, ' LSCHBA ');
  text = text.replace(/(?:ls|एलएस)\s*c\s*hba/gi, ' LSCHBA ');
  text = text.replace(/(?:^|\s|[.,!?])(?:ls\s*chba|lschba)(?=\s|[.,!?]|$)/gi, ' LSCHBA ');
  text = text.replace(/(?:^|\s|[.,!?])(?:BL|बी\s*एल|बीएल|बेल|दल)\s*(?:ko|को)?\s*(?:unlock|anlock|अनलॉक)\s*(?:karne|krne|करने)\s*(?:per|par|pe|पैर|पर)\s*(?:lik\s*ba|likba|लिक\s*बा|लिकबा|लिक\s*भा|लिकभा|लीक\s*बा|लीकबा|lschba|ls\s*chba|LSCHBA)\s*(?:prakashit|प्रकाषित|प्रकाशित)?\s*(?:nahin|nahi|नहीं|नही)\s*(?:hota|होता)\s*(?:hai|है)?/gi, ' BL अनलॉक करने पर LSCHBA प्रकाशित नहीं होता है ');

  // LSDJ, LSB, LSGR, LSP, LSRSI, BLRDJ, BLDJ
  text = text.replace(/(?:^|\s|[.,!?])(?:एल\s*एस\s*डी\s*जे|एलएसडीजे|लस\s*डीजे|लसडीजे|ल\s*एसडीजे|एल\s*एस\s*डी\s*जी|एलएसडीजी)(?=\s|[.,!?]|$)/gi, ' LSDJ ');
  text = text.replace(/(?:^|\s|[.,!?])(?:ls\s*dj|lsdj)(?=\s|[.,!?]|$)/gi, ' LSDJ ');
  text = text.replace(/(?:^|\s|[.,!?])(?:एल\s*एस\s*बी|एलएसबी|लस\s*बी|लसबी|ल\s*एसबी)(?=\s|[.,!?]|$)/gi, ' LSB ');
  text = text.replace(/(?:^|\s|[.,!?])(?:ls\s*b|lsb)(?=\s|[.,!?]|$)/gi, ' LSB ');
  text = text.replace(/(?:^|\s|[.,!?])(?:एल\s*एस\s*जी\s*आर|एलएसजीआर|लस\s*जीआर|लसजीआर|ल\s*एसजीआर)(?=\s|[.,!?]|$)/gi, ' LSGR ');
  text = text.replace(/(?:^|\s|[.,!?])(?:ls\s*gr|lsgr)(?=\s|[.,!?]|$)/gi, ' LSGR ');
  text = text.replace(/(?:^|\s|[.,!?])(?:एल\s*एस\s*पी|एलएसपी|लस\s*पी|लस्पी|ल\s*एसपी)(?=\s|[.,!?]|$)/gi, ' LSP ');
  text = text.replace(/(?:^|\s|[.,!?])(?:ls\s*p|lsp)(?=\s|[.,!?]|$)/gi, ' LSP ');
  text = text.replace(/(?:^|\s|[.,!?])(?:एल\s*एस\s*आर\s*एस\s*आई|एलएसआरएसआई|लस\s*आरएसआई|ल\s*एसआरएसआई)(?=\s|[.,!?]|$)/gi, ' LSRSI ');
  text = text.replace(/(?:^|\s|[.,!?])(?:ls\s*rsi|lsrsi)(?=\s|[.,!?]|$)/gi, ' LSRSI ');
  text = text.replace(/(?:^|\s|[.,!?])(?:बी\s*एल\s*आर\s*डी\s*जे|बीएलआरडीजे|दल\s*आरडीजे|बेल\s*आरडीजे)(?=\s|[.,!?]|$)/gi, ' BLRDJ ');
  text = text.replace(/(?:^|\s|[.,!?])(?:bl\s*rdj|blrdj)(?=\s|[.,!?]|$)/gi, ' BLRDJ ');
  text = text.replace(/(?:^|\s|[.,!?])(?:बी\s*एल\s*डी\s*जे|बीएलडीजे|दल\s*डीजे|बेल\s*डीजे)(?=\s|[.,!?]|$)/gi, ' BLDJ ');
  text = text.replace(/(?:^|\s|[.,!?])(?:bl\s*dj|bldj)(?=\s|[.,!?]|$)/gi, ' BLDJ ');
  text = text.replace(/(?:^|\s|[.,!?])(?:बी\s*एल|बीएल)(?=\s|[.,!?]|$)/gi, ' BL ');

  // Pilot lamp & Key actions
  text = text.replace(/(?:koi|koyi|kisi|कोई)\s*(?:bhi|भी)\s*(?:pilot|पायलट)\s*(?:lamp|laimp|लैंप|लैम्प)/gi, ' कोई भी पायलट लैम्प ');
  text = text.replace(/(?:^|\s|[.,!?])BL\s*(?:ko|को)?\s*(?:unlock|anlock|अनलॉक)\s*(?:karne|krne|करने)\s*(?:per|par|pe|पैर|पर)\s*(?:koi|koyi|कोई)\s*(?:bhi|भी)\s*पायलट लैम्प/gi, ' BL को अनलॉक करने पर कोई भी पायलट लैम्प ');
  text = text.replace(/(?:^|\s|[.,!?])BL\s*(?:ko|को)?\s*(?:unlock|anlock|अनलॉक)\s*(?:karne|krne|करने)\s*(?:per|par|pe|पैर|पर)/gi, ' BL अनलॉक करने पर ');
  text = text.replace(/(?:^|\s|[.,!?])BL\s*(?:ko|को)?\s*(?:lock|लॉक)\s*(?:karne|krne|करने)\s*(?:per|par|pe|पैर|पर)/gi, ' BL लॉक करने पर ');
  text = text.replace(/(?:^|\s|[.,!?])(?:unlock|anlock)\s*(?:karne|krne|करने)\s*(?:per|par|pe|पैर|पर)/gi, ' अनलॉक करने पर ');
  text = text.replace(/(?:^|\s|[.,!?])(?:bpt|बीपीटी)\s*(?:dabane|dbane|दबाने)\s*(?:per|par|pe|पैर|पर)/gi, ' BPT दबाने पर ');

  // Lamp status variations
  text = text.replace(/(?:prakashit|प्रकाषित|प्रकाशित)\s*(?:nahin|nahi|नहीं|नही)\s*(?:hota|होता)\s*(?:hai|है)?/gi, ' प्रकाशित नहीं होता है ');
  text = text.replace(/(?:prakashit|प्रकाषित|प्रकाशित)\s*(?:nahin|nahi|नहीं|नही)\s*(?:hote|होते)\s*(?:hain|hai|हैं|है)?/gi, ' प्रकाशित नहीं होते हैं ');
  text = text.replace(/(?:prakashit|प्रकाषित|प्रकाशित)\s*(?:rehta|rahta|rahata|रहता)\s*(?:hai|है)?/gi, ' प्रकाशित रहता है ');
  text = text.replace(/(?:prakashit|प्रकाषित|प्रकाशित)\s*(?:hota|होता)\s*(?:hai|है)?/gi, ' प्रकाशित होता है ');
  text = text.replace(/(?:bujhta|bujta|बुझता)\s*(?:nahin|nahi|नहीं|नही)\s*(?:hai|है)?/gi, ' नहीं बुझता है ');
  text = text.replace(/(?:nahin|nahi|नहीं|नही)\s*(?:bujhta|bujta|बुझता)\s*(?:hai|है)?/gi, ' नहीं बुझता है ');
  text = text.replace(/(?:bujh\s*jata|बुझ\s*जाता)\s*(?:hai|है)?/gi, ' बुझ जाता है ');

  // Operations & Statuses
  text = text.replace(/(?:notch|noch|नोच)\s*(?:repeater|ripitar|रिपीटर)/gi, ' नोच रिपीटर ');
  text = text.replace(/(?:traction|treksan|ट्रेक्शन)\s*(?:voltmeter|volt\s*meter|वोल्टमीटर)/gi, ' ट्रैक्शन वोल्टमीटर ');
  text = text.replace(/(?:deviate|deviat|डेविएट|डेिवएट)\s*(?:nahin|nahi|नहीं|नही)\s*(?:hote|होते)\s*(?:hain|hai|हैं|है)?/gi, ' डेविएट नहीं होते हैं ');
  text = text.replace(/(?:parantu|parntu)\s*/gi, 'परंतु ');
  text = text.replace(/(?:tractive\s*force|traction\s*force|कर्षण\s*बल)\s*(?:ki|की)?\s*(?:koi|koyi|कोई)?\s*(?:bhi|भी)?\s*(?:hani|हानि)\s*(?:nahin|nahi|नहीं|नही)\s*(?:hai|है)?/gi, ' कर्षण बल की कोई हानि नहीं है ');
  text = text.replace(/(?:tractive\s*force|traction\s*force)\s*(?:ki|की)\s*(?:aanshik|आंशिक)\s*(?:hani|हानि)/gi, ' कर्षण बल की आंशिक हानि ');
  text = text.replace(/(?:partial\s*loss\s*of\s*tractive\s*force)/gi, ' कर्षण बल की आंशिक हानि Partial Loss of tractive force ');
  text = text.replace(/(?:chalu|चालू)\s*(?:nahin|nahi|नहीं|नही)\s*(?:hota|होता)\s*(?:hai|है)?/gi, ' चालू नहीं होता है ');
  text = text.replace(/(?:chalu|चालू)\s*(?:hota|होता)\s*(?:hai|है)?/gi, ' चालू होता है ');
  text = text.replace(/(?:kam|kaam|काम)\s*(?:nahin|nahi|नहीं|नही)\s*(?:karta|करता)\s*(?:hai|है)?/gi, ' काम नहीं करता है ');
  text = text.replace(/(?:pressure|presar|प्रेशर)\s*(?:nahin|nahi|नहीं|नही)\s*(?:banta|बनता)\s*(?:hai|है)?/gi, ' प्रेशर नहीं बनता है ');

  // Pantograph operations
  text = text.replace(/(?:^|\s|[.,!?])(?:panto|pento|पैंतो|पैंटो|पेन्टो|पेंटो)\s*(?:nahin|nahi|नहीं|नही)\s*(?:uthta|uthata|उठता)\s*(?:hai|है)?/gi, ' पैंटो नहीं उठता है ');
  text = text.replace(/(?:^|\s|[.,!?])(?:panto|pento|पैंतो|पैंटो|पेन्टो|पेंटो)\s*(?:nahin|nahi|नहीं|नही)\s*(?:uth|उठ)\s*(?:raha|rahe|रहा|रहे)\s*(?:hai|hain|है|हैं)?/gi, ' पैंटो नहीं उठता है ');

  // Headlight operations
  text = text.replace(/(?:^|\s|[.,!?])(?:headlight|head\s*light|हेडलाइट|हेड\s*लाइट|हेडलाईट)\s*(?:prakashit|प्रकाशित)?\s*(?:nahin|nahi|नहीं|नही)\s*(?:hoti|hota|jalti|जलती|होती|होता)\s*(?:hai|है)?/gi, ' हेडलाइट प्रकाशित नहीं होती है ');

  // Whistle / Horn operations
  text = text.replace(/(?:^|\s|[.,!?])(?:चालू\s*गाड़ी\s*में\s*)?(?:whistle|vhisl|विसल|व्हीसल|व्हिसल|हॉर्न|हॉन|horn)\s*(?:fail|फेल|खराब|काम\s*नहीं)\s*(?:ho\s*gaya|ho\s*gayi|ho\s*jati|ho\s*jata|ho|हो\s*गया|हो\s*गई|हो\s*जाती|हो\s*जाता|हो)?\s*(?:gaya|gayi|jati|jata|गई|गया|जाती|जाता)?\s*(?:hai|hain|है|हैं)?/gi, ' चालू गाड़ी में व्हीसल (हॉर्न) फेल हो जाती है ');

  // 5d. Kruti Dev / Shree Lipi legacy font decoding for QLA, QLM, QRSI, QOP & relays
  if (
    text.includes('á»ëÔä') || text.includes('Å÷âúÍ') || text.includes('ãÃ÷Í') || text.includes('ã»Öä') ||
    text.includes('ánÒ') || text.includes('QRSI') || text.includes('ÎëãÔÒÓ') || text.includes('D^iˆp') ||
    text.includes('QOP') || text.includes('HQOP') || text.includes('HMCS') || text.includes('QLA') ||
    text.includes('áâÓÌíï') || text.includes('áâúgÁäÔÓäÒo') || text.includes('ÏçÂÈâ') ||
    text.includes('LSDJ') || text.includes('Q118') || text.includes('C118') || text.includes('Q45') || text.includes('Q44') ||
    text.includes('ÍÚÔä') || text.includes('Ìâë¿') || text.includes('HVSI') || text.includes('MVSI') || text.includes('QVSI') ||
    text.includes('ÀÄä') || text.includes('C107') || text.includes('C105') || text.includes('C106') || text.includes('Q100') || text.includes('CCA') ||
    text.includes('ãÐnÌ') || text.includes('sÍwÃ') || text.includes('»âÓÇ') ||
    text.includes('BLCP') || text.includes('BLCPD') || (text.includes('MCP') && text.includes('HCP')) ||
    text.includes('MPH') || text.includes('HPH') || text.includes('MVSL') || text.includes('HVSL') ||
    text.includes('MVMT') || text.includes('HVMT') || text.includes('MVRH') || text.includes('HVRH') ||
    text.includes('CHBA') || text.includes('HCHBA') ||
    text.includes('BPSW') || text.includes('PVEF') || text.includes('MPS') || text.includes('EVPHGR') ||
    text.includes('ÜãÈ½ýsÈ') || text.includes('Damage') || text.includes('ÁÔ') || text.includes('ÁÔä') ||
    text.includes('áãgÌ×âÑ»') || text.includes('extinguisher') ||
    text.includes('»ØôÇ') || text.includes('»ØôÔÏÔ') || text.includes('áâïã×»') || text.includes('Tractive') || text.includes('tractive') || text.includes('Partial') || text.includes('partial') ||
    text.includes('ÅëãÕ#Ã') || text.includes('LSGR') || text.includes('áâúÃíãÓ½ýë×Ì') || text.includes('ZQWC') || text.includes('BPQD') ||
    text.includes('LSRSI') || text.includes('ÃëÔ-ÃëÔ') || text.includes('RSI') ||
    text.includes('áÌÔâú»') || text.includes('ÍâÒÔÃ') || text.includes('ÔìmÍ') ||
    text.includes('LSCHBA') || text.includes('LSB') || text.includes('BPT') ||
    text.includes('CPA') || text.includes('MCPA') || text.includes('ZCPA') ||
    text.includes('ÍìºÃí') || text.includes('ÍìnÃí') || text.includes('éÄÈâ') || text.includes('VEPT') ||
    text.includes('SI UNIT') || text.includes('enp&T') || text.includes('vi[ÃT[j') || text.includes('aiUT') || text.includes('r[>j') || text.includes('(Ds¼l[') || text.includes('l]Àp') ||
    text.includes('BLVMT') || text.includes('CCINV') || text.includes('ai[pn') || text.includes('clti') ||
    text.includes('EXTERNAL FAULT') || text.includes('E±sTn<l') || text.includes('fiˆÃT') || text.includes('ai[vrkr>T') ||
    text.includes('INTERNAL FAULT') || text.includes('enTn<l') || text.includes('aY<fiˆÃT') || text.includes('(DApl[') ||
    text.includes('kÀp[Sr') || text.includes('kiºT[±Tr') || text.includes('QCON') || text.includes('QTD-101') ||
    text.includes('(bni') || text.includes('h‰E') || text.includes('QSVM') ||
    text.includes('biypis') || text.includes('aY<') ||
    text.includes('MPCS') || text.includes('CCCPU') || text.includes('m[n y‰(nT') || text.includes('m[n y*(nT') || text.includes('m[n y') ||
    text.includes('BP1DJ') || text.includes('BP2DJ') || text.includes('ICDJ') || text.includes('Add BLRDJ') ||
    text.includes('15 sec') || text.includes('15 s[k') ||
    text.includes('Feedback fail') || text.includes('Feedback') || text.includes('C-107/C-106/C-105') ||
    text.includes('ʬीसल') || text.includes('İʬसल') || text.includes('हॉनŊ') || text.includes('डुɘेƛ') || text.includes('सैİȵंग')
  ) {
    text = text.replace(/DJ\s*tripped\s*via\s*C-?107\/C-?106\/C-?105\s*Feedback\s*fail(?:\s*Inform\s*TLC)?(?:-?\s*ka\s*n?answer\s*ye\s*hai)?/gi, 'DJ tripped via C-107/C-106/C-105 Feedback fail Inform TLC MPCS');
    text = text.replace(/MPCS\s*li\[ki\[\s*m\[>(?:\s*li\[ki\[\s*piylT\s*oiri\s*T\^bl\s*S\*T\)>g)?/gi, 'MPCS लोको में लोको पायलट द्वारा ट्रबल शूटिंग');
    text = text.replace(/6\s*ni\[c\s*l\[n\[\s*pr(?:\s*15\s*sec\s*k\[\s*a>dr\s*h\))?(?:\s*DJ\/VCB\s*\(?T\^p\s*hi\[ti\s*h\])?(?:-?\s*ka\s*n?answer\s*ye\s*hai)?/gi, 'MPCS लोको में 6 नोच लेने पर 15 सेकंड के अंदर DJ/VCB ट्रिप होता है');
    text = text.replace(/DJ\/VCB\s*±li\[j\s*nh\)>?\s*hi\[ti(?:\s*\/ICDJ)?(?:-?\s*ka\s*n?answer\s*ye\s*hai)?/gi, 'MPCS लोको में DJ/VCB क्लोज नहीं होता ICDJ');
    text = text.replace(/airni\[>\s*vil\[\s*li\[ki\[/gi, 'आर्नो वाले लोको');
    text = text.replace(/m\[n\s*y[‰\*]\(nT\s*kiy<\s*nh\)>?\s*krti\s*h\](?:-?\s*ka\s*n?answer\s*ye\s*hai)?/gi, 'MPCS मेन यूनिट कार्य नहीं करती है');
    text = text.replace(/m\[n\s*y[‰\*]\(nT/gi, 'मेन यूनिट');
    text = text.replace(/kiy<\s*nh\)>?\s*krti/gi, 'कार्य नहीं करती');
    text = text.replace(/aY<\s*fiˆ?ÃT\s*biypis(?:\s*krn\[\s*k\)\s*\(?v\(F\s*:-?)?(?:-?\s*ka\s*n?answer\s*ye\s*hai)?/gi, 'अर्थ फॉल्ट बाईपास करने की विधि');
    text = text.replace(/biypis/gi, 'बाईपास');
    text = text.replace(/(?:\(?bni|\(?बिना)\s*(?:VCB|DJ)\s*\(?T\^p\s*h‰E\s*LSCHBA\s*(?:p\\?ki\(St|prakashit)\s*hi\[ti\s*h\](?:-?\s*ka\s*n?answer\s*ye\s*hai)?/gi, 'बिना VCB ट्रिप हुए LSCHBA प्रकाशित होता है');
    text = text.replace(/kÀp\[Sr\s*k[e\[]?\s*kiºT\[±Tr\s*±li\[J\s*nh\)>?\s*hi\[t\[(?:-?\s*ka\s*n?answer\s*ye\s*hai)?/gi, 'कम्प्रेसर के कॉन्टैक्टर क्लोज नहीं होते');
    text = text.replace(/kÀp\[Sr/gi, 'कम्प्रेसर');
    text = text.replace(/kiºT\[±Tr/gi, 'कॉन्टैक्टर');
    text = text.replace(/±li\[J/gi, 'क्लोज');
    text = text.replace(/SIV\s*\(?D[sA]¼?pl\[\s*p\]nl\s*pr\s*INTERNAL\s*FAULT(?:\s*l\]Àp\s*\(?LED\)?\s*(?:p\\?ki\(St|prakashit)\s*hi\[ti\s*h\])?(?:\s*enTn<l\s*aY<fiˆÃT(?:\s*s>k\[t(?:\s*k[\s\S]*?)?)?)?(?:\s*LSSIT\s*(?:p\\?ki\(St|prakashit)\s*hi\[ti\s*h\])?(?:-?\s*ka\s*answer\s*ye\s*hai)?/gi, 'SIV डिस्प्ले पैनल पर INTERNAL FAULT लैम्प (LED) प्रकाशित होता है इंटरनल अर्थ फॉल्ट संकेत के साथ LSSIT प्रकाशित होता है');
    text = text.replace(/enTn<l\s*aY<fiˆÃT/gi, 'इंटरनल अर्थ फॉल्ट');
    text = text.replace(/SIV\s*\(?D[sA]¼?pl\[\s*p\]nl\s*pr\s*EXTERNAL\s*FAULT(?:\s*ki\s*l\]Àp\s*\(?LED\)?\s*(?:p\\?ki\(St|prakashit)\s*hi\[ti\s*h\])?(?:\s*E±sTn<l\s*fiˆÃT\s*k[\s\S]*?aY<fiˆÃT(?:\s*ki\s*s>k\[t)?[\s\S]*?aiti\s*h\])?(?:\s*LSSIT\s*(?:p\\?ki\(St|prakashit)\s*hi\[ti\s*h\])?(?:-?\s*ka\s*answer\s*ye\s*hai)?/gi, 'SIV डिस्प्ले पैनल पर EXTERNAL FAULT का लैम्प (LED) प्रकाशित होता है LSSIT प्रकाशित होता है एक्सटर्नल फॉल्ट के साथ अर्थ फॉल्ट का संकेत आता है');
    text = text.replace(/E±sTn<l\s*fiˆÃT\s*k[\s\S]*?aY<fiˆÃT[\s\S]*?aiti\s*h\]/gi, 'एक्सटर्नल फॉल्ट के साथ अर्थ फॉल्ट का संकेत आता है');
    text = text.replace(/SIV\s*\(?Ds¼l\[\s*p\]nl\s*pr\s*EXTERNAL\s*FAULT(?:\s*ki\s*l\]Àp\s*\(?LED\)?\s*p\\ki\(St\s*hi\[ti\s*h\])?(?:\s*LSSIT\s*p\\ki\(St\s*hi\[ti\s*h\])?(?:\s*E±sTn<l\s*fiˆÃT\s*k[\s\S]*?ai\[vrkr>T[\s\S]*?aiti\s*h\])?(?:-?\s*ka\s*answer\s*ye\s*hai)?/gi, 'SIV डिस्प्ले पैनल पर EXTERNAL FAULT का लैम्प (LED) प्रकाशित होता है LSSIT प्रकाशित होता है एक्सटर्नल फॉल्ट के साथ ओवरकरंट का संकेत आता है');
    text = text.replace(/E±sTn<l\s*fiˆÃT\s*k[\s\S]*?ai\[vrkr>T[\s\S]*?aiti\s*h\]/gi, 'एक्सटर्नल फॉल्ट के साथ ओवरकरंट का संकेत आता है');
    text = text.replace(/y\(d\s*BLVMT\s*ai\[pn\s*h\](?:\s*ai\]r\s*SIV\s*nh\)>?\s*clti\s*h\])?(?:-?\s*ka\s*answer\s*ye\s*hai)?/gi, 'यदि BLVMT ओपन है और SIV नहीं चलता है');
    text = text.replace(/BLVMT\s*ai\[pn(?:\s*h\])?/gi, 'BLVMT ओपन है');
    text = text.replace(/SIV\s*nh\)>?\s*clti\s*h\]/gi, 'SIV नहीं चलता है');
    text = text.replace(/CCINV\s*(?:½y\*J|फ्यूज|fuse)/gi, 'CCINV फ्यूज');
    text = text.replace(/m\[ÃT\s*h\]\s*ti\[\s*bdl\[>/gi, 'मेल्ट है तो बदलें');
    text = text.replace(/HOBA\s*ki\s*upyi\[g\s*kr\[>/gi, 'HOBA का उपयोग करें');
    text = text.replace(/SI\s*UNIT\s*m\[>\s*li\[ki\[\s*piylT\s*oiri\s*T\^bl\s*S\*\(T>g/gi, 'SI UNIT में लोको पायलट द्वारा ट्रबल शूटिंग');
    text = text.replace(/(?:k\\mi‚k\s*)?\(?Ds¼l\[\s*p\]nl\s*pr\s*s>k\[t/gi, 'डिस्प्ले पैनल पर संकेत');
    text = text.replace(/(?:1\.\s*)?A\s*y\(d\s*enp&T\s*vi\[ÃT\[j\s*aiUT\s*ai\[f\s*r\[>j\s*\{?lil\s*l\]Àp\}?\s*ki\s*s>k\[t\s*aiti\s*h\]ó?-?/gi, 'SI UNIT में इनपुट वोल्टेज आउट ऑफ रेंज लाल लैम्प का संकेत आता है');
    text = text.replace(/enp&T\s*vi\[ÃT\[j\s*aiUT\s*ai\[f\s*r\[>j(?:\s*hi\[n\[\s*pr)?/gi, 'इनपुट वोल्टेज आउट ऑफ रेंज');
    text = text.replace(/(?:चालू\s*गाडी\s*मŐ\s*)?(?:ʬीसल|İʬसल)\s*(?:\(हॉनŊ\)\s*)?फेल\s*हो\s*जाती\s*है।?-?/gi, 'चालू गाड़ी में व्हीसल (हॉर्न) फेल हो जाती है');
    text = text.replace(/(?:ÚìÅÔâåÃ|ÚëÅ\s*ÔâåÃ)\s*(?:Íý»âã×È\s*ÌÚIï?\s*ÚíÈä\s*Úìó?|Íý»âã×È\s*ÌÚIï?|काम\s*नहीं\s*करती)?-?/gi, 'हेडलाइट प्रकाशित नहीं होती है');
    text = text.replace(/(?:ÍìºÃí|ÍìnÃí)\s*ÌÚIï?\s*éÄÈâ\s*Úìó?-?/gi, 'पैंटो नहीं उठता है');
    text = text.replace(/CPA\s*(?:¿âÔè|चालू)\s*ÚíÈâ\s*Úý?ì\s*ÍÓnÈç\s*RS\s*Íýë×Ó\s*ÌÚIï?\s*ÏÌÈâ\s*Úìó?-?/gi, 'CPA चालू होता है परंतु RS प्रेशर नहीं बनता है');
    text = text.replace(/CPA\s*(?:¿âÔè|चालू)\s*ÌÚIï?\s*(?:ÚíÈâ|होता)\s*Úìó?-?(?:\s*a-?)?/gi, 'CPA चालू नहीं होता है');
    text = text.replace(/BPT\s*ÊÏâÌë\s*ÍÓ\s*LSP\/?\s*LSRSI\s*Íý»âã×È\s*ÌÚIï?\s*ÚíÈë\s*Úìó?-?/gi, 'BPT दबाने पर LSP LSRSI प्रकाशित नहीं होते हैं');
    text = text.replace(/BL\s*áÌÔâú»\s*(?:»ÓÌë|krn\[)\s*(?:ÍÓ|pr)\s*LSCHBA\s*Íý»âã×È\s*ÌÚIï?\s*ÚíÈâ\s*Úìó?-?/gi, 'BL अनलॉक करने पर LSCHBA प्रकाशित नहीं होता है');
    text = text.replace(/BL\s*áÌÔâú»\s*(?:»ÓÌë|krn\[)\s*(?:ÍÓ|pr)\s*LSB\s*Íý»âã×È\s*ÌÚIï?\s*ÚíÈâ\s*Úìó?-?/gi, 'BL अनलॉक करने पर LSB प्रकाशित नहीं होता है');
    text = text.replace(/BL\s*áÌÔâú»\s*(?:»ÓÌë|krn\[)\s*(?:ÍÓ|pr)\s*LSGR\s*Íý»âã×È\s*ÌÚIï?\s*ÚíÈâ\s*Úìó?-?/gi, 'BL अनलॉक करने पर LSGR प्रकाशित नहीं होता है');
    text = text.replace(/BL\s*áÌÔâú»\s*(?:»ÓÌë|krn\[)\s*(?:ÍÓ|pr)\s*LSP\s*Íý»âã×È\s*ÚíÈâ\s*Úìó?-?/gi, 'BL अनलॉक करने पर LSP प्रकाशित होता है');
    text = text.replace(/BL\s*áÌÔâú»\s*(?:»ÓÌë|krn\[)\s*(?:ÍÓ|pr)\s*LSRSI\s*Íý»âã×È\s*ÚíÈâ\s*Úìó?-?/gi, 'BL अनलॉक करने पर LSRSI प्रकाशित होता है');
    text = text.replace(/BL\s*áÌÔâú»\s*(?:»ÓÌë|krn\[)\s*(?:ÍÓ|pr)\s*LSDJ\s*Íý»âã×È\s*ÌÚIï?\s*ÚíÈâ\s*Úìó?-?/gi, 'BL अनलॉक करने पर LSDJ प्रकाशित नहीं होता है');
    text = text.replace(/BL\s*(?:»í|ki\[)\s*áÌÔâú»\s*(?:»ÓÌë|krn\[)\s*(?:ÍÓ|pr)\s*»íæ\s*Ðä\s*ÍâÒÔÃ\s*ÔìmÍ\s*Íý»âã×È\s*ÌÚIï?\s*ÚíÈâ\s*Úìó?-?/gi, 'BL को अनलॉक करने पर कोई भी पायलट लैम्प प्रकाशित नहीं होता है');
    text = text.replace(/(?:10\.\s*)?LSRSI\s*(?:Íý»âã×È|p\\ki\(St)\s*(?:ÓÚÈâ|hi\[t[i|)]|rht[i|)])\s*Úìó?-?/gi, 'LSRSI प्रकाशित रहता है RSI-1 RSI-2 टेल-टेल फ्यूज 6 LED 14 18 LED');
    text = text.replace(/RSI-?1\s*(?:áîÓ|ai\]r)\s*RSI-?2\s*(?:Ñëï|m\[>)\s*(?:ÃëÔ-ÃëÔ|टेल-टेल)\s*(?:PÒèÁ|फ्यूज|fuse)/gi, 'RSI-1 और RSI-2 में टेल-टेल फ्यूज');
    text = text.replace(/RSI\s*(?:¾liˆk|bÔâú»|ब्लॉक)\s*6\s*LED/gi, 'RSI ब्लॉक 6 LED');
    text = text.replace(/RSI\s*(?:¾liˆk|bÔâú»|ब्लॉक)\s*14\/18\s*LED/gi, 'RSI ब्लॉक 14/18 LED');
    text = text.replace(/ãÏÌâ\s*Ìâë¿\s*ãÔÒë\s*LSP\s*Íý»âã×È\s*ÓÚÈâ\s*Úìó?-?/gi, 'बिना नोच लिये LSP प्रकाशित रहता है Q-48 थपथपाएं HMCS सैंडिंग COC GR हाथ से');
    text = text.replace(/ÍãÚÒë\s*ãÎÖÔÌë\s*ÍÓ\s*LSP\s*Íý»âã×È\s*ÌÚIï\s*ÚíÈâó?-?/gi, 'पहिये फिसलने पर LSP प्रकाशित नहीं होता एमीटर रीडिंग में उतार चढ़ाव GR रिग्रेस PSA सैंडिंग ZQWC');
    text = text.replace(/LSGR\s*Íý»âã×È\s*ÌÚIï?\s*ÚíÈâ\s*Úìó?-?/gi, 'LSGR प्रकाशित नहीं होता है MP 0 SMGR ड्रम GR हाथ से 0 QV62 नोच रिपीटर');
    text = text.replace(/Ìâë¿\s*ãÓÍäÃÓ\s*»âÑ\s*ÌÚIï?\s*»ÓÈâ\s*Úìó?-?/gi, 'नोच रिपीटर काम नहीं करता है वोल्टमीटर एमीटर CHBA CCTFS CCNR HRAVT');
    text = text.replace(/Ã÷ìk×Ì\s*ÕílÃÑäÃÓ\s*ÅëãÕÒëÃ\s*ÌÚIï\s*ÚíÈë\s*Úì\s*ÍÓnÈç\s*»ØôÇ\s*ÏÔ\s*»ä\s*»íæ\s*ÚâãÌ\s*ÌÚIï\s*Úìó?-?/gi, 'ट्रैक्शन वोल्टमीटर डेविएट नहीं होते हैं परंतु कर्षण बल की कोई हानि नहीं है ट्रैक्शन चालू रखें 28 नोच');
    text = text.replace(/Ìâë¿\s*ÔëÌë\s*ÍÓ\s*LSP\s*Íý»âã×È\s*ÚíÈâ\s*Úì\s*áîÓ\s*áâúÃí\s*ãÓ½ýë×Ì\s*ÚíÈâ\s*Úìó?-?/gi, 'नोच लेने पर LSP प्रकाशित होता है और आटो रिग्रेशन होता है पहली नोच अन्य नोच शंटिंग कॉन्टैक्टर');
    text = text.replace(/(?:ÍÚÔä|ÚÔä)\s*Ìâë¿\s*ÍÓ\s*áâúÃíãÓ½ýë×Ì\s*ÚíÈâ\s*Úì(?:\s*\(LSGR\s*ÏçÂ»Ó\s*ãÎÓ\s*Öë\s*Íý»âã×È\s*ÚíÈâ\s*Úì\))?/gi, 'पहली नोच पर ऑटो रिग्रेशन होता है LSGR बुझकर फिर से प्रकाशित होता है LSP चेक करें दोनों एमीटर');
    text = text.replace(/»ØôÇ\s*ÏÔ\s*»ä\s*ÍèÇô\s*ÚâãÌ(?:\s*\(Total\s*loss\s*of\s*Tractive\s*force\))?(?:\s*\(ÊíÌíï\s*#ÑäÃÓ\s*ÅëãÕ#Ã\s*ÌÚI\s*ÚíÈë\s*Úì\))?(?:\s*#»\s*Ìâë¿\s*Ôëï\s*áîÓ\s*LSGR\s*»ä\s*áíÓ\s*Êë¼ë)?/gi, 'कर्षण बल की पूर्ण हानि Total loss of Tractive force दोनों एमीटर डेविएट नहीं होते हैं एक नोच लें और LSGR की ओर देखें');
    text = text.replace(/#»\s*Ìâë¿\s*Ôëï\s*áîÓ\s*LSGR\s*»ä\s*áíÓ\s*Êë¼ë/gi, 'एक नोच लें और LSGR की ओर देखें');
    text = text.replace(/(?:\(i\)\s*)?y\(d\s*LSGR\s*ÍÚÔë+?\s*Öë\s*Úä\s*ÏçÂâ\s*Úìó?/gi, 'यदि LSGR पहले से ही बुझा है CCLS पिघलना HOBA ऑफ QRS वेज');
    text = text.replace(/(?:\(ii\)\s*)?ÒãÊ\s*LSGR\s*ÌÚI\s*ÏçÂÈâ\s*Úìó?/gi, 'यदि LSGR नहीं बुझता है Q50 Q48 PR-2 VCD QRS EEC ZSMGR SMGR');
    text = text.replace(/(?:\(iii\)\s*)?ÒãÊ\s*LSGR\s*ÏçÂ\s*ÁâÈâ\s*Úìó?/gi, 'यदि LSGR बुझ जाता है HVSI HVMT HT-2 L1 L6 CTF रनिंग वेज');
    text = text.replace(/BLCP\s*kÔíÁ\s*»ÓÌë\s*ÍÓ\s*CCA\s*ãÍ¾ÔÈâ\s*Úìó?-?/gi, 'BLCP क्लोज करने पर CCA पिघलता है C101 C102 C103 VEAD वाल्व HCP BLCPD HOBA');
    text = text.replace(/BLVMT\s*kÔíÁ\s*»ÓÌë\s*ÍÓ\s*CCA\s*ãÍ¾ÔÈâ\s*Úìó?-?/gi, 'BLVMT क्लोज करने पर CCA पिघलता है C105 C106 C107 HVRH HVMT Q118 450A SI Unit');
    text = text.replace(/BL\s*(?:ãsÕ¿o|स्विचों?)\s*»ä\s*kÔíÁ\s*ÚâÔÈ\s*Ñe\s*CCA\s*ãÍ¾ÔÈâ\s*Úìó?-?/gi, 'BL स्विचों की क्लोज हालत में CCA पिघलता है लोको इनर्जाइज हालत में BLCP BLCPD BLVMT HOBA');
    text = text.replace(/6\s*(?:ni\[c|Ìâë¿)\s*(?:ÔëÌë|l\[n\[)\s*ÍÓ\s*CCPT\s*ãÍ¾ÔÈâ\s*Úìó?-?/gi, '6 नोच लेने पर CCPT पिघलता है EVPHGR TWC टेप GR हाथ से 0');
    text = text.replace(/MPS\s*(?:aiˆpr\[T|áâúÍÓëÃ)\s*(?:krn\[|»ÓÌë)\s*pr\s*CCPT\s*ãÍ¾ÔÈâ\s*Úìó?-?/gi, 'MPS ऑपरेट करने पर CCPT पिघलता है GR हाथ से 0 MPS पोजीशन उपयोग न करें');
    text = text.replace(/BPSW\s*(?:dbin\[|ÊÏâÌë)\s*pr\s*CCPT\s*ãÍ¾ÔÈâ\s*Úìó?-?/gi, 'BPSW दबाने पर CCPT पिघलता है फ्यूज बदली BPSW उपयोग न करें');
    text = text.replace(/PVEF\s*(?:dbin\[|ÊÏâÌë)\s*ÍÓ\s*CCPT\s*ãÍ¾ÔÈâ\s*Úìó?-?/gi, 'PVEF दबाने पर CCPT पिघलता है PVEF न दबाएं रेहियोस्टैटिक ब्रेक');
    text = text.replace(/MP\s*(?:ki\[|»í)\s*[“"']?P[”"']?\s*pr\s*(?:rKn\[|Ó¼Ìë)\s*pr\s*CCPT\s*ãÍ¾ÔÈâ\s*Úìó?-?/gi, 'MP को P पर रखने पर CCPT पिघलता है रेहियोस्टैटिक ब्रेक');
    text = text.replace(/MPJ\s*(?:»í|ki\[)?\s*[“"']?F[”"']?\s*(?:Òâ|ya)\s*[“"']?R[”"']?\s*(?:ÍÓ|pr)\s*(?:Ó¼Ìë|rKn\[)?\s*(?:ÍÓ|pr)?\s*LSB\s*Íý»âã×È\s*Úä\s*ÓÚÈâ\s*Úìó?-?/gi, 'MPJ को F या R पर रखने पर LSB प्रकाशित ही रहता है Q50 CTF J1 J2 C145 LSC145 वेज');
    text = text.replace(/CHBA\s*»âÑ\s*ÌÚI\s*»ÓÈâ\s*Úìó?\s*(?:\(DJ\s*ãÃ÷Í\s*ÚçÒë\s*ãÏÌâ\s*LSCHBA\s*l\]Àp\s*Íý»âã×È\s*ÓÚÈâ\s*Úì\))?-?/gi, 'CHBA काम नहीं करता है DJ ट्रिप हुये बिना LSCHBA लैम्प प्रकाशित रहता है');
    text = text.replace(/ÒãÊ\s*»íæ\s*áâúgÁäÔÓä\s*ÜãÈ½ýsÈ\s*(?:\(Damage\)\s*)?Úí\s*½æ\s*Úì\s*(?:áÉÕâ\s*ÁÔ\s*½æ\s*Úìó?)?-?/gi, 'यदि कोई ऑक्सिलरी क्षतिग्रस्त Damage हो गई है अथवा जल गई है');
    text = text.replace(/MPH\s*ÁÔ\s*½æ\s*Úìó?-?/gi, 'MPH जल गई है');
    text = text.replace(/MVSL-1\s*Òâ\s*MVSI-1\s*Òâ\s*MVMT-1\s*ÁÔ\s*½æ\s*Úìó?-?/gi, 'MVSL-1 या MVSI-1 या MVMT-1 जल गई है');
    text = text.replace(/MVSL-2\s*Òâ\s*MVSI-2\s*Òâ\s*MVMT-2\s*ÁÔ\s*½æ\s*Úìó?-?/gi, 'MVSL-2 या MVSI-2 या MVMT-2 जल गई है');
    text = text.replace(/MCP(?:-1\/2\/3|-1\/?2\/?3)?\s*ÁÔ\s*½æ\s*Úìó?-?/gi, 'MCP-1/2/3 जल गई है');
    text = text.replace(/MVRH\s*ÁÔ\s*½æ\s*Úìó?-?/gi, 'MVRH जल गई है');
    text = text.replace(/MVRH\s*(?:¿âÔè|»âÑ)\s*ÌÚI\s*(?:ÚíÈâ|»ÓÈâ)\s*Úìó?-?/gi, 'MVRH चालू नहीं होता है');
    text = text.replace(/MVMT(?:-1\/?(?:MVMT-)?2)?\s*(?:¿âÔè|»âÑ)\s*ÌÚI\s*(?:ÚíÈâ|»ÓÈâ)\s*Úìó?-?/gi, 'MVMT-1/MVMT-2 चालू नहीं होता है');
    text = text.replace(/MVSI(?:-1\/?(?:MVSI-)?2)?\s*»âÑ\s*ÌÚI\s*»ÓÈâ\s*Úìó?-?/gi, 'MVSI-1/MVSI-2 काम नहीं करता है');
    text = text.replace(/MVSL(?:-1\/?(?:MVSL-)?2)?\s*»âÑ\s*ÌÚI\s*»ÓÈâ\s*Úìó?-?/gi, 'MVSL-1/MVSL-2 काम नहीं करता है');
    text = text.replace(/MPH\s*»âÑ\s*ÌÚI\s*»ÓÈâ\s*Úìó?-?/gi, 'MPH काम नहीं करता है');
    text = text.replace(/½l\]Sr\s*lie<T(?:\s*kiy<\s*nh\)>?\s*krt\))?/gi, 'फ्लैशर लाईट कार्य नहीं करती');
    text = text.replace(/फ्लैशर\s*ला(?:इट|ईट)\s*(?:कार्य\s*नहीं\s*करती|काम\s*नहीं\s*करती|काम\s*नहीं\s*करता|फेल|खराब)/gi, 'फ्लैशर लाईट कार्य नहीं करती');
    text = text.replace(/BLCP\s*kÔíÁ\s*»ÓÌë\s*ÍÓ\s*MR\s*Íýë×Ó\s*ÌÚäï\s*ÏÌÈâ\s*Úìó?-?/gi, 'BLCP क्लोज करने पर MR प्रेशर नहीं बनता है');
    text = text.replace(/BP\s*Íýë×Ó\s*ÏÆ‘\s*»Ó\s*5(?:\s*kg\/cm2)?\s*Öë\s*áãË»(?:\s*Úí\s*ÁâÈâ\s*Úì)?(?:\s*áîÓ\s*ãÎÓ\s*Öë\s*¾Ã\s*»Ó\s*5(?:\s*kg\/cm2)?\s*È»\s*áâ\s*ÁâÈâ\s*Úì)?(?:\s*áîÓ\s*ÖâÓä\s*½âÅ‘ä\s*Ñëï\s*Ïýë»\s*ÏnËÈä\s*Úìó?)?/gi, 'BP प्रेशर बढ़कर 5 kg/cm2 से अधिक हो जाता है और फिर से घटकर 5 kg/cm2 तक आ जाता है और सारी गाड़ी में ब्रेक बंधती है');
    text = text.replace(/BP\s*प्रेशर\s*बढ़कर\s*5(?:\s*kg\/cm2)?\s*से\s*अधिक(?:\s*हो\s*जाता\s*है)?(?:\s*और\s*फिर\s*से\s*घटकर\s*5(?:\s*kg\/cm2)?\s*तक\s*आ\s*जाता\s*है)?(?:\s*और\s*सारी\s*गाड़ी\s*में\s*ब्रेक\s*बंधती\s*है)?/gi, 'BP प्रेशर बढ़कर 5 kg/cm2 से अधिक हो जाता है और फिर से घटकर 5 kg/cm2 तक आ जाता है और सारी गाड़ी में ब्रेक बंधती है');
    text = text.replace(/बीपी\s*प्रेशर\s*बढ़कर\s*5(?:\s*kg\/cm2)?\s*से\s*अधिक/gi, 'BP प्रेशर बढ़कर 5 kg/cm2 से अधिक हो जाता है और फिर से घटकर 5 kg/cm2 तक आ जाता है और सारी गाड़ी में ब्रेक बंधती है');
    text = text.replace(/Ôí»í\s*Ïýë»\s*ãÓÔäÁ\s*(?:ÌÚIï?\s*)?(?:ÚíÈë|ÚíÈâ|Úí\s*ÓÚâ)?(?:\s*Úìó?)?(?:,?\s*(?:ÒYãÍ\s*)?A-?9\s*áîÓ\s*SA-?9\s*(?:“|")?ãÓÔäÁ(?:”|")?\s*ÍíÁä×Ì\s*ÍÓ\s*Úìó?)?/gi, 'लोको ब्रेक रिलीज नहीं होते हैं यद्यपि A-9 और SA-9 रिलीज पोजीशन पर हैं');
    text = text.replace(/(?:लोको\s*)?(?:ब्रेक|ब्रोक|break)\s*(?:सिलेंडर\s*)?(?:रिलीज|रीलीज|रिलीज़|छूट|छूटता|छूटती)\s*नहीं\s*(?:हो(?:ते|ता|ती|ने|रहा|रही)\s*)?(?:हैं?|रहता|रहती)?(?:,?\s*(?:यद्यपि)?\s*A-?9\s*(?:और|व)?\s*SA-?9\s*(?:भी\s*)?(?:रिलीज|रीलीज)?(?:\s*पोजीशन\s*पर)?(?:\s*हैं?)?)?/gi, 'लोको ब्रेक रिलीज नहीं होते हैं यद्यपि A-9 और SA-9 रिलीज पोजीशन पर हैं');
    text = text.replace(/(?:loco\s*)?(?:brake|break)\s*(?:release|relis|rilij)\s*(?:nahi|not|ni)(?:\s*hota|\s*hote|\s*ho\s*raha|\s*ho\s*rahi|\s*hai)?/gi, 'लोको ब्रेक रिलीज नहीं होते हैं यद्यपि A-9 और SA-9 रिलीज पोजीशन पर हैं');
    text = text.replace(/SA-?9\s*]âÓâ\s*Ôí»í\s*Ïýë»\s*ÌÚIï?\s*Ô½Èä\s*Úìó?-?/gi, 'SA-9 द्वारा लोको ब्रेक नहीं लगती है');
    text = text.replace(/SA-?9\s*(?:द्वारा|से)?\s*लोको\s*ब्रेक\s*नहीं\s*(?:लगती|लग\s*रही)\s*है?/gi, 'SA-9 द्वारा लोको ब्रेक नहीं लगती है');
    text = text.replace(/A-?9\s*]âÓâ\s*Ôí»í\s*Ïýë»\s*ÌÚIï?\s*Ô½Èä\s*Úìó?-?/gi, 'A-9 द्वारा लोको ब्रेक नहीं लगती है');
    text = text.replace(/A-?9\s*(?:द्वारा|से)?\s*लोको\s*ब्रेक\s*नहीं\s*(?:लगती|लग\s*रही)\s*है?/gi, 'A-9 द्वारा लोको ब्रेक नहीं लगती है');
    text = text.replace(/ÑlÃäÍÔ\s*Ôí»í\s*¿ÔâÈë\s*ÚçÒë,?\s*»ìÏ\s*ÏÊÔÈë\s*ÖÑÒ,?\s*(?:ã»Öä\s*Ðä\s*#»\s*Ôí»í\s*Ñëï\s*)?Ïýë»\s*ÏnËÈä\s*Úìó?-?/gi, 'मल्टीपल लोको चलाते हुये कैब बदलते समय किसी भी एक लोको में ब्रेक बंधती है');
    text = text.replace(/मल्टीपल\s*(?:यूनिट|लोको)?\s*(?:में|चलाते\s*हुए)?\s*कैब\s*बदलते\s*समय(?:\s*किसी\s*भी\s*एक\s*लोको\s*में)?\s*ब्रेक\s*बंधती\s*है?/gi, 'मल्टीपल लोको चलाते हुये कैब बदलते समय किसी भी एक लोको में ब्रेक बंधती है');
    text = text.replace(/(?:#ÒÓ\s*Ïýë»|एयर\s*ब्रेक)?\s*(?:ÔíÅ|लोड)\s*(?:ÍÓ|पर)\s*(?:áÃì¿|अटैच)\s*»ÓÌë\s*»ë\s*ÏâÊ(?:\s*BP\s*Íýë×Ó\s*5(?:\s*kg\/cm2)?\s*È»\s*ÌÚI\s*ÏÆ‘Èâ\s*Úì)?(?:\s*áîÓ\s*MR\s*Íýë×Ó\s*Ðä\s*»Ñ\s*ÚíÈâ\s*Úìó?)?/gi, 'एयर ब्रेक लोड पर अटैच करने के बाद BP प्रेशर 5 kg/cm2 तक नहीं बढ़ता है और MR प्रेशर भी कम होता है');
    text = text.replace(/(?:एयर\s*ब्रेक\s*)?लोड\s*पर\s*अटैच\s*करने\s*के\s*बाद(?:\s*BP\s*प्रेशर\s*5(?:\s*kg\/cm2)?\s*तक\s*नहीं\s*बढ़ता\s*है)?(?:\s*और\s*MR\s*प्रेशर\s*भी\s*कम\s*होता\s*है)?/gi, 'एयर ब्रेक लोड पर अटैच करने के बाद BP प्रेशर 5 kg/cm2 तक नहीं बढ़ता है और MR प्रेशर भी कम होता है');
    text = text.replace(/BP\s*Íýë×Ó\s*ÌÚIï?\s*ÏÌÈâ\s*Úìó?(?:\s*\(»ëÕÔ\s*Ôí»í\))?-?/gi, 'BP प्रेशर नहीं बनता है केवल लोको');
    text = text.replace(/BP\s*प्रेशर\s*नहीं\s*(?:बनता|बन\s*रहा)\s*है(?:\s*\(?केवल\s*लोको\)?)?/gi, 'BP प्रेशर नहीं बनता है केवल लोको');
    text = text.replace(/बीपी\s*प्रेशर\s*नहीं\s*(?:बनता|बन\s*रहा)\s*है(?:\s*\(?केवल\s*लोको\)?)?/gi, 'BP प्रेशर नहीं बनता है केवल लोको');
    text = text.replace(/MR\s*Íýë×Ó\s*7\s*(?:kg\/cm2|»ë½ä\/ÖëÑä2)?\s*Öë\s*»Ñ\s*ÏÌÈâ\s*Úìó?(?:\s*\(»ëÕÔ\s*Ôí»í\))?-?/gi, 'MR प्रेशर 7 kg/cm2 से कम बनता है केवल लोको');
    text = text.replace(/MR\s*प्रेशर\s*7\s*(?:kg\/cm2|केजी|किग्रा)?\s*से\s*कम\s*(?:बनता|बन\s*रहा)\s*है(?:\s*\(?केवल\s*लोको\)?)?/gi, 'MR प्रेशर 7 kg/cm2 से कम बनता है केवल लोको');
    text = text.replace(/MR\s*Íýë×Ó\s*ÌÚIï?\s*ÏÌÈâ\s*Úìó?-?/gi, 'MR प्रेशर नहीं बनता है');
    text = text.replace(/(?:a\)\s*)?ÒãÊ\s*MCP\s*(?:kiy\s*…|काम|»âÑ)\s*ÌÚIï?\s*»Ó\s*ÓÚâ\s*Úì\s*Èí-?/gi, 'यदि MCP कार्य नहीं कर रहा है तो');
    text = text.replace(/(?:b\)\s*)?ÒãÊ\s*MCP\s*(?:kiy\s*…|काम|»âÑ)\s*»Ó\s*ÓÚâ\s*Úì(?:\s*ãÎÓ\s*Ðä)?(?:\s*MR\s*Íýë×Ó\s*ÌÚIï?\s*ÏÌ\s*ÓÚâ\s*Úìó?)?(?:\s*\(»ëÕÔ\s*Ôí»í\))?-?/gi, 'यदि MCP कार्य कर रहा है फिर भी MR प्रेशर नहीं बन रहा है केवल लोको');
    text = text.replace(/ãÐnÌ\s*ãÐnÌ\s*Ìâë¿\s*ÍÓ\s*DJ\/VCB\s*ãÃ÷Í\s*ÚíÈâ\s*Úì[–-]?\s*(?:áÉâôÈ\s*)?(?:ãÏÌâ\s*ã»Öä\s*)?sÍwÃ\s*»âÓÇ\s*»ë\s*(?:DJ\/VCB\s*ãÃ÷Í\s*ÚíÈâ\s*Úìó?)?/gi, 'भिन्न-भिन्न नोच पर DJ/VCB ट्रिप होता है अर्थात बिना किसी स्पष्ट कारण के');
    text = text.replace(/ÀÄä\s*Ìâë¿\s*ÍÓ\s*DJ\/VCB\s*ãÃ÷Í\s*ÚíÈâ\s*Úìó?-?/gi, 'छठी नोच पर DJ/VCB ट्रिप होता है');
    text = text.replace(/ÍÚÔä\s*(?:ni\[c|Ìâë¿)\s*(?:ÔëÌë|l\[n\[)\s*ÍÓ\s*CCPT\s*ãÍ¾ÔÈâ\s*Úìó?-?/gi, 'पहली नोच लेने पर CCPT पिघलता है HOBA GR हाथ से RSI ब्लॉक एक-एक करके आइसोलेट');
    text = text.replace(/ÍÚÔä\s*Ìâë¿\s*ÍÓ\s*DJ\/VCB\s*ãÃ÷Í\s*ÚíÈâ\s*Úìó?-?/gi, 'पहली नोच पर DJ/VCB ट्रिप होता है');
    text = text.replace(/ÍÚÔä\s*(?:ni\[c|Ìâë¿)\s*(?:ÔëÌë|l\[n\[)?\s*ÍÓ\s*»âúnÃëkÃÓ\s*L-?1\s*Öë\s*L-?6\s*kÔíÁ\s*ÌÚI\s*ÚíÈë\s*Úìó?-?/gi, 'पहली नोच लेने पर कॉन्टैक्टर L-1 से L-6 क्लोज नहीं होते हैं Q50 HVSI HVMT HT2 CTF वेज');
    text = text.replace(/L-?1\s*Öë\s*L-?3\s*(?:áÉÕâ|या)?\s*L-?4\s*Öë\s*L-?6\s*kÔíÁ\s*ÌÚIï?\s*ÚíÈë\s*Úìó?-?/gi, 'L-1 से L-3 अथवा L-4 से L-6 क्लोज नहीं होते हैं HVSI HVMT RSI आइसोलेट वेज');
    text = text.replace(/(?:»íæ\s*#»|कोई\s*एक)?\s*ÔâåÌ\s*»âúnÃëkÃÓ\s*kÔíÁ\s*ÌÚIï?\s*ÚíÈâ\s*Úìó?-?/gi, 'कोई एक लाइन कॉन्टैक्टर क्लोज नहीं होता है HMCS TM आइसोलेट वेज');
    text = text.replace(/BLVMT\s*kÔíÁ\s*»ÓÌë\s*ÍÓ\s*DJ\/VCB\s*ãÃ÷Í\s*ÚíÈâ\s*Úìó?-?/gi, 'BLVMT क्लोज करने पर DJ/VCB ट्रिप होता है');
    text = text.replace(/LSCHBA\s*»ë\s*ÏçÂÌë\s*Öë\s*ÍÚÔë\s*LSDJ\s*ãÎÓ\s*Öë\s*Íý»âã×È\s*ÚíÈâ\s*Úìó?-?/gi, 'LSCHBA के बुझने से पहले LSDJ फिर से प्रकाशित होता है');
    text = text.replace(/LSCHBA\s*»ë\s*ÏçÂÌë\s*»ë\s*ÏâÊ\s*LSDJ\s*ãÎÓ\s*Öë\s*Íý»âã×È\s*ÚíÈâ\s*Úìó?-?/gi, 'LSCHBA के बुझने के बाद LSDJ फिर से प्रकाशित होता है');
    text = text.replace(/(?:ÎëãÔÒÓ\s*»â\s*Íý»âÓ\s*áîÓ\s*áÖâÑânÒ\s*Öï»ëÈ\s*)?LSDJ\s*ÌÚI\s*ÏçÂÈâ\s*Úìó?-?/gi, 'LSDJ नहीं बुझता है');
    text = text.replace(/QOA\s*Å÷âúÍ\s*ÚíÈä\s*Úì\s*áîÓ\s*DJ\/VCB\s*ãÃ÷Í\s*ÚíÈâ\s*Úìó?-?/gi, 'QOA ड्रॉप होती है और DJ/VCB ट्रिप होता है');
    text = text.replace(/QLA\s*Å÷âúÍ\s*ÚíÈä\s*Úì\s*áîÓ\s*DJ\/VCB\s*ãÃ÷Í\s*ÚíÈâ\s*Úìó?-?/gi, 'QLA ड्रॉप होती है और DJ/VCB ट्रिप होता है');
    text = text.replace(/QOP-?2\s*D\^iˆp\s*hi\[t\)\s*h\]\s*ai\]r\s*DJ\/VCB\s*\(?T\^p\s*hi\[ti\s*h\]\.?-?/gi, 'QOP-2 ड्रॉप होती है और DJ/VCB ट्रिप होता है');
    text = text.replace(/QOP-?1\s*D\^iˆp\s*hi\[t\)\s*h\]\s*ai\]r\s*DJ\/VCB\s*\(?T\^p\s*hi\[ti\s*h\]\.?-?/gi, 'QOP-1 ड्रॉप होती है और DJ/VCB ट्रिप होता है');
    text = text.replace(/(?:4\.\s*)?QRSI-?2\s*Å÷âúÍ\s*ÚíÈä\s*Úì\s*áîÓ\s*DJ\/VCB\s*ãÃ÷Í\s*ÚíÈâ\s*Úìó?-?/gi, 'QRSI-2 ड्रॉप होती है और DJ/VCB ट्रिप होता है');
    text = text.replace(/(?:3\.\s*)?QRSI-?1\s*Å÷âúÍ\s*ÚíÈä\s*Úì\s*áîÓ\s*DJ\/VCB\s*ãÃ÷Í\s*ÚíÈâ\s*Úìó?-?/gi, 'QRSI-1 ड्रॉप होती है और DJ/VCB ट्रिप होता है');
    text = text.replace(/QRSI\s*Å÷âúÍ\s*ÚíÈä\s*Úì\s*áîÓ\s*DJ\/VCB\s*ãÃ÷Í\s*ÚíÈâ\s*Úìó?-?/gi, 'QRSI-1 ड्रॉप होती है और DJ/VCB ट्रिप होता है');
    text = text.replace(/(?:1\.\s*)?QLM\s*á»ëÔä\s*Å÷âúÍ\s*ÚíÈä\s*Úì\s*áîÓ\s*DJ\/VCB\s*ãÃ÷Í\s*ÚíÈâ\s*Úìó?-?/gi, '1. QLM अकेली ड्रॉप होती है और DJ/VCB ट्रिप होता है');
    text = text.replace(/á»ëÔä\s*Å÷âúÍ\s*ÚíÈä\s*Úì\s*áîÓ\s*DJ\/VCB\s*ãÃ÷Í\s*ÚíÈâ\s*Úìó?-?/gi, '1. QLM अकेली ड्रॉप होती है और DJ/VCB ट्रिप होता है');
    text = text.replace(/(?:\(?B\)?\s*)?QLM\s*ã»Öä\s*ánÒ\s*ãÓÔë\s*»ë\s*ÖâÉ\s*ÊâëÏâÓâ\s*Å÷âúÍ\s*ÚíÈä\s*Úì\s*áîÓ\s*DJ\/VCB\s*ãÃ÷Í\s*ÚíÈâ\s*Úìó?-?/gi, '(B) QLM किसी अन्य रिले के साथ दोबारा ड्रॉप होती है और DJ/VCB ट्रिप होता है');
    text = text.replace(/(?:\(?A\)?\s*)?QLM\s*ã»Öä\s*ánÒ\s*ãÓÔë\s*»ë\s*ÖâÉ\s*Å÷âúÍ\s*ÚíÈä\s*Úì\s*áîÓ\s*DJ\/VCB\s*ãÃ÷Í\s*ÚíÈâ\s*Úìó?-?/gi, '(A) QLM किसी अन्य रिले के साथ ड्रॉप होती है और DJ/VCB ट्रिप होता है');
    const isAlreadyDecodedConventionalFault =
      text.includes('BL अनलॉक') || text.includes('BL को अनलॉक') || text.includes('नोच रिपीटर') ||
      text.includes('पहिये फिसलने') || text.includes('ट्रैक्शन वोल्टमीटर') || text.includes('CPA चालू') ||
      text.includes('BPT दबाने') || text.includes('बिना नोच लिये') || text.includes('LSGR प्रकाशित नहीं होता') ||
      text.includes('LSRSI प्रकाशित रहता') || text.includes('कर्षण बल की आंशिक हानि') ||
      text.includes('कर्षण बल की पूर्ण हानि') || text.includes('यदि LSGR पहले से ही बुझा') ||
      text.includes('यदि LSGR नहीं बुझता') || text.includes('यदि LSGR बुझ जाता') ||
      text.includes('पैंटो नहीं उठता') || text.includes('पेन्टो नहीं उठता') ||
      text.includes('फ्लैशर लाईट कार्य नहीं करती') || text.includes('फ्लैशर लाइट') || text.includes('flasher light') ||
      text.includes('MR प्रेशर 7') || text.includes('7 kg/cm2 से कम') ||
      text.includes('BP प्रेशर नहीं बनता') || text.includes('बीपी प्रेशर नहीं बनता') || text.includes('BP pressure') ||
      text.includes('BP प्रेशर बढ़कर') || text.includes('सारी गाड़ी में ब्रेक बंधती') ||
      text.includes('लोड पर अटैच') || text.includes('एयर ब्रेक लोड') ||
      text.includes('कैब बदलते समय') || text.includes('मल्टीपल लोको चलाते') || text.includes('ट्रेलिंग लोको में ब्रेक') ||
      text.includes('A-9 द्वारा लोको ब्रेक नहीं') || text.includes('A-9 से लोको ब्रेक नहीं') ||
      text.includes('SA-9 द्वारा लोको ब्रेक नहीं') || text.includes('SA-9 से लोको ब्रेक नहीं') ||
      text.includes('LSCHBA के बुझने से पहले') || text.includes('LSCHBA के बुझने के बाद') ||
      text.includes('बुझने से पहले LSDJ') || text.includes('बुझने के बाद LSDJ') ||
      text.includes('LSDJ फिर से प्रकाशित') ||
      text.includes('लोको ब्रेक रिलीज नहीं होते') || text.includes('यद्यपि A-9 और SA-9');

    if (!isAlreadyDecodedConventionalFault) {
      if (
        text.includes('PÒèÁ') || text.includes('IpGln[') || text.includes('f[Ilyr') || text.includes('ãÍ¾Ô') ||
        (text.includes('फ्यूज') && (text.includes('पिघल') || text.includes('संकेत') || text.includes('फेलियर') || text.includes('बदल'))) ||
        ((text.includes('CCBA') || text.includes('CCPT') || text.includes('CCLS') || text.includes('CCDJ') || text.includes('CCA') || text.includes('CCLSA') || text.includes('CCVCD') || text.includes('CCINV')) &&
         (text.includes('पिघल') || text.includes('ãÍ¾Ô') || text.includes('IpGln[') || text.includes('ED)Snl') || text.includes('ZUBA') || text.includes('f[Ilyr') || text.includes('fuse') || text.includes('melt')))
      ) {
        if (text.includes('ED)Snl') || text.includes('Additional CCBA') || text.includes('एडिशनल CCBA') || text.includes('ADD CCBA')) {
          text = 'ADD CCBA एडिशनल CCBA पिघलता है एक बार फ्यूज बदल दें HOBA ऑफ GR हाथ से 0 IP COC HBA';
        } else if (text.includes('CCPT') && (text.includes('HBA') || text.includes('hba')) && (text.includes('aiˆn') || text.includes('ऑन') || text.includes('on') || text.includes('rKn['))) {
          text = 'HBA को ऑन पर रखने पर CCPT पिघलता है Q118 कॉइल चेक करें सहायता मांगें';
        } else if (text.includes('CCPT') && (text.includes('ZPT') || text.includes('zpt')) && (text.includes('1') || text.includes('“1”') || text.includes('एक') || text.includes('ÍíÁä×Ì'))) {
          text = 'ZPT को पोजीशन 1 पर रखने पर CCPT पिघलता है HOBA ZPT 2 दूसरी कैब';
        } else if (text.includes('CCPT') && (text.includes('MPJ') || text.includes('mpj')) && (text.includes('F') || text.includes('R') || text.includes('एफ') || text.includes('आर') || text.includes('“F”') || text.includes('“R”') || text.includes('ÍíÁä×Ì') || text.includes('Ó¼Ìë'))) {
          text = 'MPJ को F या R पर रखने पर CCPT पिघलता है HOBA J1 J2 CTF TWC टेप हाथ से ऑपरेट';
        } else if (text.includes('CCPT') && (text.includes('ãÓ½ýë×Ì') || text.includes('रिग्रेशन') || text.includes('रीग्रेशन') || text.includes('regression'))) {
          text = 'रिग्रेशन करने पर CCPT पिघलता है GR को हाथ से 0 HOBA ऑफ GR हाथ से ऑपरेट';
        } else if (text.includes('CCPT') && (text.includes('ÍÚÔä') || text.includes('पहली नोच') || text.includes('पहला नोच') || text.includes('1st notch') || text.includes('first notch') || text.includes('ni[c') || text.includes('RSI') || text.includes('rsi'))) {
          text = 'पहली नोच लेने पर CCPT पिघलता है HOBA GR हाथ से RSI ब्लॉक एक-एक करके आइसोलेट';
        } else if (text.includes('CCPT') && (text.includes('6') || text.includes('६') || text.includes('छह') || text.includes('छठी')) && (text.includes('नोच') || text.includes('notch') || text.includes('ni[c') || text.includes('EVPHGR') || text.includes('evphgr'))) {
          text = '6 नोच लेने पर CCPT पिघलता है EVPHGR TWC टेप GR हाथ से 0';
        } else if (text.includes('CCPT') && (text.includes('MPS') || text.includes('mps')) && (text.includes('ऑपरेट') || text.includes('operate') || text.includes('पोजीशन') || text.includes('aiˆpr[T') || text.includes('krn['))) {
          text = 'MPS ऑपरेट करने पर CCPT पिघलता है GR हाथ से 0 MPS पोजीशन उपयोग न करें';
        } else if (text.includes('CCPT') && (text.includes('BPSW') || text.includes('bpsw') || text.includes('सैंडर') || text.includes('सैंडिंग') || text.includes('sander') || text.includes('dbin['))) {
          text = 'BPSW दबाने पर CCPT पिघलता है फ्यूज बदली BPSW उपयोग न करें';
        } else if (text.includes('CCPT') && (text.includes('PVEF') || text.includes('pvef') || text.includes('पैडल') || text.includes('ÊÏâÌë'))) {
          text = 'PVEF दबाने पर CCPT पिघलता है PVEF न दबाएं रेहियोस्टैटिक ब्रेक';
        } else if (text.includes('CCPT') && (text.includes('MP') || text.includes('mp')) && (text.includes('“P”') || text.includes('"P"') || text.includes('P पर') || text.includes('पी पर') || text.includes('ब्रेकिंग')) && !text.includes('MPJ')) {
          text = 'MP को P पर रखने पर CCPT पिघलता है रेहियोस्टैटिक ब्रेक';
        } else if (text.includes('CCPT') && !text.includes('CCBA') && !text.includes('CCLS')) {
          text = 'CCPT पिघलने पर मिलने वाले संकेत CCPT fuse GR 0 HBA ऑफ';
        } else if (text.includes('CCLS') && !text.includes('CCBA') && !text.includes('CCPT')) {
          text = 'CCLS 10A पिघलने पर मिलने वाले संकेत CCLS fuse';
        } else if (text.includes('CCDJ') && !text.includes('CCBA')) {
          text = 'CCDJ पिघलने पर मिलने वाले संकेत CCDJ fuse';
        } else if (text.includes('CCA') && !text.includes('CCBA')) {
          if (text.includes('BLCP') && !text.includes('BLVMT')) {
            text = 'BLCP क्लोज करने पर CCA पिघलता है C101 C102 C103 VEAD वाल्व HCP BLCPD HOBA';
          } else if (text.includes('BLVMT')) {
            text = 'BLVMT क्लोज करने पर CCA पिघलता है C105 C106 C107 HVRH HVMT Q118 450A SI Unit';
          } else if (text.includes('BL') || text.includes('ãsÕ¿') || text.includes('स्विच') || text.includes('kÔíÁ') || text.includes('क्लोज') || text.includes('क्लोज़') || text.includes('इनर्जाइज') || text.includes('åÌÓÁâåÁ')) {
            text = 'BL स्विचों की क्लोज हालत में CCA पिघलता है लोको इनर्जाइज हालत में BLCP BLCPD BLVMT HOBA';
          } else {
            text = 'CCA पिघलने पर मिलने वाले संकेत CCA fuse';
          }
        } else if (text.includes('CCLSA')) {
          text = 'CCLSA पिघलने पर मिलने वाले संकेत CCLSA fuse';
        } else if (text.includes('CCVCD')) {
          text = 'CCVCD पिघलने पर मिलने वाले संकेत CCVCD fuse';
        } else if (text.includes('CCINV')) {
          text = 'CCINV पिघलने पर मिलने वाले संकेत CCINV fuse';
        } else if (text.includes('CCBA') && !text.includes('ED)Snl') && !text.includes('CCPT') && !text.includes('CCLS') && (text.includes('ãÍ¾ÔÈâ') || text.includes('पिघलता') || text.includes('HOBA') || text.includes('áâúÎ'))) {
          text = 'CCBA पिघलता है एक बार फ्यूज बदल दें HOBA ऑफ GR हाथ से 0 IP COC HBA';
        } else if (text.includes('CCBA') && !text.includes('ED)Snl') && !text.includes('CCPT') && !text.includes('CCLS')) {
          text = 'CCBA पिघलने पर मिलने वाले संकेत CCBA fuse';
        } else {
          text = 'फ्यूज पिघलने के फेलियर विभिन्न फ्यूज के पिघलने पर मिलने वाले संकेत Additional CCBA CCBA CCPT CCLS CCA CCDJ CCLSA CCVCD CCINV';
        }
      } else if (
        text.includes('ÜãÈ½ýsÈ') || text.includes('Damage') || text.includes('damage') ||
        text.includes('ÁÔ ½æ') || text.includes('ÁÔä Úçæ') || text.includes('जल गई') || text.includes('जल गयी') || text.includes('जली हुई') ||
        text.includes('áãgÌ×âÑ»') || text.includes('extinguisher') ||
        (text.includes('áâúgÁäÔÓä') && (text.includes('ÁÔ') || text.includes('ÜãÈ') || text.includes('Damage'))) ||
        (text.includes('ऑक्सिलरी') && (text.includes('क्षतिग्रस्त') || text.includes('जल गई') || text.includes('जलने')))
      ) {
        text = 'यदि कोई ऑक्सिलरी क्षतिग्रस्त Damage हो गई है अथवा जल गई है आग धुआं अग्निशामक आइसोलेट';
      } else if (text.includes('MVRH') && (text.includes('¿âÔè') || text.includes('चालू') || text.includes('काम नहीं') || text.includes('काम') || text.includes('HVRH') || text.includes('C107') || text.includes('Q100') || text.includes('Q-118') || text.includes('Q118') || text.includes('450') || text.includes('HC-107') || text.includes('HC107') || text.includes('áâåÖíÔëÃ') || text.includes('आइसोलेट'))) {
        text = 'MVRH चालू नहीं होता है';
      } else if (text.includes('MVMT') && (text.includes('¿âÔè') || text.includes('चालू') || text.includes('काम नहीं') || text.includes('काम') || (text.includes('C107') && (text.includes('C105') || text.includes('C106') || text.includes('HVMT'))) || (text.includes('HVMT') && (text.includes('C107') || text.includes('1') || text.includes('0'))))) {
        text = 'MVMT-1/MVMT-2 चालू नहीं होता है';
      } else if (text.includes('MVSL') && (text.includes('»âÑ') || text.includes('काम नहीं') || text.includes('काम') || text.includes('HVSL') || text.includes('áâåÖíÔëÃ') || text.includes('आइसोलेट') || text.includes('Permissible') || text.includes('áÌçÑÈ') || text.includes('आधा'))) {
        text = 'MVSL-1/MVSL-2 काम नहीं करता है';
      } else if (text.includes('MVSI') && (text.includes('»âÑ') || text.includes('काम नहीं') || text.includes('काम') || (text.includes('HVSL') && text.includes('HVMT')) || text.includes('Permissible') || text.includes('áÌçÑÈ') || text.includes('आधा') || (text.includes('áâåÖíÔëÃ') && !text.includes('Ìâë¿')))) {
        text = 'MVSI-1/MVSI-2 काम नहीं करता है';
      } else if (text.includes('MPH') && (text.includes('»âÑ') || text.includes('काम नहीं') || text.includes('काम') || text.includes('HPH') || text.includes('450') || text.includes('áâåÖíÔëÃ') || text.includes('आइसोलेट'))) {
        text = 'MPH काम नहीं करता है';
      } else if (
        (text.includes('LSCHBA') || text.includes('lschba') || text.includes('ÏçÂÌë')) &&
        (text.includes('LSDJ') || text.includes('lsdj')) &&
        (text.includes('पहले') || text.includes('ÍÚÔë') || text.toLowerCase().includes('before') || text.toLowerCase().includes('pehle'))
      ) {
        text = 'LSCHBA के बुझने से पहले LSDJ फिर से प्रकाशित होता है';
      } else if (
        (text.includes('LSCHBA') || text.includes('lschba') || text.includes('ÏçÂÌë')) &&
        (text.includes('LSDJ') || text.includes('lsdj')) &&
        (text.includes('बाद') || text.includes('ÏâÊ') || text.toLowerCase().includes('after') || text.toLowerCase().includes('baad'))
      ) {
        text = 'LSCHBA के बुझने के बाद LSDJ फिर से प्रकाशित होता है';
      } else if (
        (text.includes('कम्प्रेसर') || text.includes('compressor') || text.includes('kÀp[Sr')) &&
        (text.includes('कॉन्टैक्टर') || text.includes('contactor') || text.includes('kiºT[±Tr') || text.includes('C101') || text.includes('C102') || text.includes('C103') || text.includes('क्लोज') || text.includes('±li[J'))
      ) {
        text = 'कम्प्रेसर के कॉन्टैक्टर क्लोज नहीं होते LSCHBA QCON QTD-101 BLCP';
      } else if (
        (text.includes('अर्थ फॉल्ट') || text.includes('earth fault') || text.includes('aY< fiÃT') || text.includes('aY<')) &&
        (text.includes('बाईपास') || text.includes('bypass') || text.includes('biypis') || text.includes('1500') || text.includes('45'))
      ) {
        text = 'अर्थ फॉल्ट बाईपास करने की विधि SIV HSIV 1500 ओम 45 मिनट टाइमर';
      } else if (
        (text.includes('बिना') || text.includes('bina') || text.includes('(bni') || text.includes('without')) &&
        (text.includes('VCB') || text.includes('vcb')) &&
        (text.includes('LSCHBA') || text.includes('lschba'))
      ) {
        text = 'बिना VCB ट्रिप हुए LSCHBA प्रकाशित होता है SIV चार्जर HBA OFF QSVM';
      } else if (
        text.includes('BPMPR') || text.includes('bpmpr') || text.includes('बीपीएमपीआर') ||
        (
          (text.includes('MPCS') || text.includes('mpcs') || text.includes('एमपीसीएस')) &&
          (text.includes('रीसेट') || text.includes('रिसेट') || text.includes('reset')) &&
          (text.includes('TR') || text.includes('पैनल') || text.includes('10') || text.includes('सब-सिस्टम') || text.includes('सब सिस्टम') || text.includes('बटन'))
        ) ||
        (
          (text.includes('सब-सिस्टम') || text.includes('सब सिस्टम') || text.includes('sub-system') || text.includes('subsystem')) &&
          (text.includes('आइसोलेट') || text.includes('isolate')) &&
          (text.includes('रीसेट') || text.includes('reset') || text.includes('BPMPR') || text.includes('MPCS') || text.includes('एमपीसीएस') || text.includes('10 sec') || text.includes('10 सेकंड'))
        )
      ) {
        text = 'BPMPR द्वारा MPCS को रीसेट करना मेन यूनिट TR पैनल एक से अधिक सब सिस्टम आइसोलेट DJ VCB ओपन पैंटो लोवर BL चाबी 10 sec लोको इनर्जाइज सेक्शन क्लियर';
      } else if (
        (text.includes('MEDHA') || text.includes('medha') || text.includes('मेधा')) &&
        (text.includes('MPCS') || text.includes('mpcs') || text.includes('एमपीसीएस') || text.includes('रिले') || text.includes('रले') || text.includes('ले') || text.includes('relay') || text.includes('वेज') || text.includes('wedge') || text.includes('bypass') || text.includes('बाईपास') || text.includes('बाइपास') || text.includes('soft') || text.includes('0,7,8,9') || text.includes('0 7 8 9') || text.includes('instantaneous') || text.includes('permanent'))
      ) {
        text = 'MEDHA make MPCS में रिले को वेज बाईपास करना soft keys 0,7,8,9 instantaneous permanent bypass cancel';
      } else if (
        (text.includes('instantaneous') || text.includes('Instantaneous') || text.includes('permanent bypass') || text.includes('Permanent bypass') || text.includes('Temparari') || text.includes('temporary bypass')) &&
        (text.includes('soft') || text.includes('key') || text.includes('bypass') || text.includes('MPCS') || text.includes('mpcs') || text.includes('0,7,8,9') || text.includes('0 7 8 9'))
      ) {
        text = 'MEDHA make MPCS में रिले को वेज बाईपास करना soft keys 0,7,8,9 instantaneous permanent bypass cancel';
      } else if (
        (text.includes('MPCS') || text.includes('mpcs') || text.includes('एमपीसीएस')) &&
        (text.includes('3.0') || text.includes('ICE') || text.includes('ice') || text.includes('सॉफ्ट') || text.includes('soft') || text.includes('0,7,8,9') || text.includes('0 7 8 9') || text.includes('बाइपास') || text.includes('बाईपास') || text.includes('बायपास')) &&
        (text.includes('रिले') || text.includes('रले') || text.includes('relay') || text.includes('वेज') || text.includes('wedge') || text.includes('Q118') || text.includes('Q50') || text.includes('QCON') || text.includes('QCVAR'))
      ) {
        text = 'MPCS वर्जन 3.0 में रिले को बाईपास सॉफ्ट वेज करना ICE Make Q118 Q50 QCON QCVAR soft keys 0,7,8,9';
      } else if (
        (text.includes('ICE') || text.includes('ice')) &&
        (text.includes('MPCS') || text.includes('mpcs') || text.includes('रिले') || text.includes('रले') || text.includes('relay') || text.includes('वेज') || text.includes('wedge') || text.includes('0,7,8,9') || text.includes('0 7 8 9'))
      ) {
        text = 'MPCS वर्जन 3.0 में रिले को बाईपास सॉफ्ट वेज करना ICE Make Q118 Q50 QCON QCVAR soft keys 0,7,8,9';
      } else if (
        (text.includes('0,7,8,9') || text.includes('0 7 8 9')) &&
        (text.includes('soft') || text.includes('सॉफ्ट') || text.includes('की') || text.includes('key') || text.includes('वेज') || text.includes('रले') || text.includes('रिले'))
      ) {
        text = 'MPCS वर्जन 3.0 में रिले को बाईपास सॉफ्ट वेज करना ICE Make Q118 Q50 QCON QCVAR soft keys 0,7,8,9';
      } else if (
        (text.includes('MPCS') || text.includes('mpcs') || text.includes('एमपीसीएस') || text.includes('m[n y') || text.includes('CCCPU') || text.includes('cccpu')) &&
        (text.includes('मेन यूनिट') || text.includes('main unit') || text.includes('कार्य नहीं') || text.includes('not work') || text.includes('काम नहीं') || text.includes('CCCPU') || text.includes('एडिशनल CCBA') || text.includes('ed)ånl') || text.includes('nh)> krti'))
      ) {
        text = 'MPCS लोको में मेन यूनिट कार्य नहीं करती है CCCPU CCBA CCPT Add CCBA HOBA IPMV';
      } else if (
        (text.includes('मेन यूनिट') || text.includes('main unit') || text.includes('m[n y‰(nT') || text.includes('m[n y*(nT')) &&
        (text.includes('कार्य नहीं') || text.includes('काम नहीं') || text.includes('not work') || text.includes('nh)> krti'))
      ) {
        text = 'MPCS लोको में मेन यूनिट कार्य नहीं करती है CCCPU CCBA CCPT Add CCBA HOBA IPMV';
      } else if (
        (text.includes('MPCS') || text.includes('mpcs') || text.includes('एमपीसीएस')) &&
        (text.includes('DJ') || text.includes('VCB') || text.includes('ICDJ') || text.includes('icdj') || text.includes('BP1DJ') || text.includes('BP2DJ') || text.includes('क्लोज नहीं') || text.includes('±li[j')) &&
        !text.includes('6') && !text.includes('छठी') && !text.includes('छठा')
      ) {
        text = 'MPCS लोको में DJ/VCB क्लोज नहीं होता ICDJ BP1DJ BP2DJ Add BLRDJ CCCPU HQOA HQOP C118';
      } else if (
        (text.includes('MPCS') || text.includes('mpcs') || text.includes('एमपीसीएस')) &&
        (text.includes('6') || text.includes('छठा') || text.includes('छठी')) &&
        (text.includes('नोच') || text.includes('notch') || text.includes('ni[c'))
      ) {
        text = 'MPCS लोको में 6 नोच लेने पर 15 सेकंड के अंदर DJ/VCB ट्रिप होता है C105 C106 C107 HVMT1 HVMT2 3 HOBA IPMV';
      } else if (
        (text.includes('6 नोच') || text.includes('6th notch') || text.includes('छठी नोच')) &&
        (text.includes('15') || text.includes('सेकंड') || text.includes('sec')) &&
        (text.includes('DJ') || text.includes('VCB') || text.includes('ट्रिप') || text.includes('trip'))
      ) {
        text = 'MPCS लोको में 6 नोच लेने पर 15 सेकंड के अंदर DJ/VCB ट्रिप होता है C105 C106 C107 HVMT1 HVMT2 3 HOBA IPMV';
      } else if (
        (text.includes('Feedback') || text.includes('feedback') || text.includes('फीडबैक')) &&
        (text.includes('107') || text.includes('106') || text.includes('105') || text.includes('C-107') || text.includes('C-106') || text.includes('C-105'))
      ) {
        text = 'DJ tripped via C-107/C-106/C-105 Feedback fail Inform TLC MPCS IPMV COC HBA OFF';
      } else if (
        !text.includes('अनलॉक') && !text.includes('unlock') && !text.includes('áÌÔâú»') &&
        !text.includes('प्रकाशित नहीं') && !text.includes('not glow') &&
        !text.includes('VCB') && !text.includes('vcb') && !text.includes('QSVM') && !text.includes('qsvm') &&
        !text.includes('BLRDJ') && !text.includes('दूसरी कैब') &&
        !text.includes('नोच रिपीटर') && !text.includes('Ìâë¿ ãÓÍäÃÓ') &&
        !text.includes('LSDJ') && !text.includes('lsdj') &&
        !text.includes('बुझने') && !text.includes('bujhne') &&
        !text.includes('ÍÚÔë') && !text.includes('pehle') && !text.includes('before') &&
        !text.includes('ÏâÊ') && !text.includes('baad') && !text.includes('after') &&
        !text.includes('कम्प्रेसर') && !text.includes('compressor') && !text.includes('kÀp[Sr') &&
        !text.includes('कॉन्टैक्टर') && !text.includes('contactor') && !text.includes('kiºT[±Tr') &&
        !text.includes('QCON') && !text.includes('QTD') &&
        (text.includes('CHBA') || text.includes('HCHBA')) &&
        (text.includes('काम नहीं') || text.includes('»âÑ') || text.includes('not working') || text.includes('l]Àp') || text.includes('डिस्चार्ज') || text.includes('चार्ज') || text.includes('एमीटर') || text.includes('Öçæ') || (text.includes('LSCHBA') && !text.includes('DJ')))
      ) {
        text = 'CHBA काम नहीं करता है DJ ट्रिप हुये बिना LSCHBA लैम्प प्रकाशित रहता है HCHBA एमीटर';
      } else if (
        (text.includes('MR') || text.includes('एमआर') || text.toLowerCase().includes('mr')) &&
        (text.includes('7') || text.includes('७') || text.includes('सात')) &&
        (text.includes('कम') || text.includes('»Ñ') || text.toLowerCase().includes('less') || text.toLowerCase().includes('kam') || text.includes('नीचे') || text.toLowerCase().includes('below'))
      ) {
        text = 'MR प्रेशर 7 kg/cm2 से कम बनता है केवल लोको तीनों MCP 9.5 RAL RS गेज BP चार्जिंग कॉक';
      } else if (
        (text.includes('लोको') || text.includes('Ôí»í') || text.toLowerCase().includes('loco')) &&
        (text.includes('ब्रेक') || text.includes('Ïýë»') || text.toLowerCase().includes('brake')) &&
        (text.includes('रिलीज') || text.includes('ãÓÔäÁ') || text.toLowerCase().includes('release')) &&
        (text.includes('नहीं') || text.includes('ÌÚI') || text.toLowerCase().includes('not') || text.toLowerCase().includes('nahi'))
      ) {
        text = 'लोको ब्रेक रिलीज नहीं होते हैं यद्यपि A-9 और SA-9 रिलीज पोजीशन पर हैं';
      } else if (
        (text.includes('SA-9') || text.includes('SA9') || text.toLowerCase().includes('sa-9') || text.toLowerCase().includes('sa9') || text.includes('SA 9') || text.toLowerCase().includes('sa 9')) &&
        (text.includes('लोको') || text.includes('Ôí»í') || text.toLowerCase().includes('loco') || text.includes('ब्रेक') || text.includes('Ïýë»') || text.toLowerCase().includes('brake')) &&
        (text.includes('नहीं') || text.includes('ÌÚI') || text.toLowerCase().includes('not') || text.toLowerCase().includes('nahi'))
      ) {
        text = 'SA-9 द्वारा लोको ब्रेक नहीं लगती है';
      } else if (
        (text.includes('A-9') || text.includes('A9') || text.toLowerCase().includes('a-9') || text.toLowerCase().includes('a9')) &&
        (text.includes('लोको') || text.includes('Ôí»í') || text.toLowerCase().includes('loco')) &&
        (text.includes('ब्रेक') || text.includes('Ïýë»') || text.toLowerCase().includes('brake')) &&
        (text.includes('नहीं') || text.includes('ÌÚI') || text.toLowerCase().includes('not') || text.toLowerCase().includes('nahi'))
      ) {
        text = 'A-9 द्वारा लोको ब्रेक नहीं लगती है';
      } else if (
        (text.includes('मल्टीपल') || text.includes('ÑlÃäÍÔ') || text.toLowerCase().includes('multiple') || text.toLowerCase().includes('mu') || text.includes('एमयू') || text.includes('ट्रेलिंग') || text.includes('T^[(l>g') || text.toLowerCase().includes('trailing')) &&
        (text.includes('कैब') || text.includes('»ìÏ') || text.toLowerCase().includes('cab') || text.includes('k]b')) &&
        (text.includes('बदल') || text.includes('ÏÊÔ') || text.toLowerCase().includes('change') || text.toLowerCase().includes('badal') || text.includes('bdl'))
      ) {
        text = 'मल्टीपल लोको चलाते हुये कैब बदलते समय किसी भी एक लोको में ब्रेक बंधती है';
      } else if (
        (text.includes('लोड') || text.includes('ÔíÅ') || text.toLowerCase().includes('load')) &&
        (text.includes('अटैच') || text.includes('áÃì¿') || text.toLowerCase().includes('attach') || text.includes('जोड़ने') || text.includes('लगाने') || text.includes('जोड')) &&
        (text.includes('BP') || text.includes('MR') || text.toLowerCase().includes('bp') || text.toLowerCase().includes('mr') || text.includes('प्रेशर') || text.includes('5'))
      ) {
        text = 'एयर ब्रेक लोड पर अटैच करने के बाद BP प्रेशर 5 kg/cm2 तक नहीं बढ़ता है और MR प्रेशर भी कम होता है';
      } else if (
        (text.includes('BP') || text.includes('बीपी') || text.toLowerCase().includes('bp')) &&
        (text.includes('5') || text.includes('५')) &&
        (text.includes('अधिक') || text.includes('áãË»') || text.toLowerCase().includes('adhik') || text.includes('बढ़कर') || text.includes('ÏÆ‘') || text.includes('घटकर') || text.includes('¾Ã') || text.includes('बंधती') || text.includes('ÏnËÈä') || text.toLowerCase().includes('surge') || text.includes('गाड़ी') || text.includes('½âÅ‘ä'))
      ) {
        text = 'BP प्रेशर बढ़कर 5 kg/cm2 से अधिक हो जाता है और फिर से घटकर 5 kg/cm2 तक आ जाता है और सारी गाड़ी में ब्रेक बंधती है';
      } else if (
        (text.includes('BP') || text.includes('बीपी') || text.toLowerCase().includes('bp')) &&
        (text.includes('Íýë×Ó') || text.includes('प्रेशर') || text.toLowerCase().includes('pressure')) &&
        (text.includes('ÌÚI') || text.includes('नहीं') || text.toLowerCase().includes('not') || text.toLowerCase().includes('nahi') || text.includes('ÏÌÈâ') || text.includes('बनता') || text.toLowerCase().includes('banta') || text.includes('कम') || text.includes('ड्रॉप'))
      ) {
        text = 'BP प्रेशर नहीं बनता है केवल लोको A-9 रिलीज BLCPD MU2B लीड MR-4 IP वाल्व एडिशनल कॉक';
      } else if (
      (text.includes('BLCP') && (text.includes('MR') || text.includes('Íýë×Ó') || text.includes('प्रेशर') || text.includes('MCP') || text.includes('ÏÌÈâ'))) ||
      ((text.includes('MCP') || text.includes('HCP')) && (text.includes('BLCP') || text.includes('BLCPD') || text.includes('C-101') || text.includes('C101') || text.includes('Q100') || text.includes('MR-4') || text.includes('VEAD') || text.includes('Å÷âåiÕ½ »ëÏ'))) ||
      ((text.includes('MR') || text.includes('एमआर') || text.includes('mr')) && (text.includes('Íýë×Ó') || text.includes('प्रेशर') || text.includes('pressure')) && (text.includes('ÌÚIï') || text.includes('नहीं') || text.includes('nahi') || text.includes('ÏÌÈâ') || text.includes('बनता') || text.includes('banta') || text.includes('not building'))) ||
      (text.includes('MCP') && (text.includes('kiy') || text.includes('कार्य') || text.includes('काम') || text.includes('kaam')))
    ) {
      text = 'BLCP क्लोज करने पर MR प्रेशर नहीं बनता है MCP चेक करें';
    } else if (
      text.includes('½l]Sr') ||
      (text.includes('फ्लैशर') && (text.includes('कार्य नहीं') || text.includes('काम नहीं') || text.includes('फेल') || text.includes('नहीं जल') || text.includes('नहीं करती') || text.includes('स्टैंड बाई') || text.includes('ग्लास फ्यूज') || text.includes('शेड') || text.includes('लोको फेल') || text.includes('लाईट') || text.includes('लाइट'))) ||
      ((text.includes('फ्लैशर') || text.toLowerCase().includes('flasher')) && (text.includes('लाइट') || text.includes('लाईट') || text.toLowerCase().includes('light'))) ||
      (text.toLowerCase().includes('flasher') && (text.toLowerCase().includes('fail') || text.toLowerCase().includes('not work') || text.toLowerCase().includes('standby') || text.toLowerCase().includes('fuse') || text.toLowerCase().includes('glass')))
    ) {
      text = 'फ्लैशर लाईट कार्य नहीं करती फ्लैशर यूनिट मेन स्टैंड बाई ग्लास फ्यूज शेड आउट';
    } else if (
      text.includes('ãÐnÌ') || text.includes('भिन्न-भिन्न') || text.includes('भिन्न भिन्न') ||
      text.includes('sÍwÃ »âÓÇ') || text.includes('स्पष्ट कारण') ||
      ((text.includes('ãÐnÌ') || text.includes('भिन्न')) && (text.includes('Ìâë¿') || text.includes('नोच') || text.includes('notch')))
    ) {
      text = 'भिन्न-भिन्न नोच पर DJ/VCB ट्रिप होता है अर्थात बिना किसी स्पष्ट कारण के';
    } else if (text.includes('ÀÄä Ìâë¿') || (text.includes('छठी नोच') && (text.includes('ट्रिप') || text.includes('trip') || text.includes('ãÃ÷Í'))) || ((text.includes('C107') || text.includes('C105') || text.includes('C106')) && (text.includes('Q100') || text.includes('CCA') || text.includes('क्लोज') || text.includes('kÔíÁ')))) {
      text = 'छठी नोच पर DJ/VCB ट्रिप होता है';
    } else if (text.includes('ÍÚÔä Ìâë¿') || (text.includes('पहली नोच') && (text.includes('ट्रिप') || text.includes('trip') || text.includes('ãÃ÷Í'))) || ((text.includes('HVSI') || text.includes('MVSI') || text.includes('QVSI')) && (text.includes('3') || text.includes('bÔíáÓ') || text.includes('ब्लोअर') || text.includes('ãÃ÷Í') || text.includes('ट्रिप')))) {
      text = 'पहली नोच पर DJ/VCB ट्रिप होता है';
    } else if (text.includes('BLVMT') && (text.includes('kÔíÁ') || text.includes('क्लोज') || text.includes('close') || text.includes('trip') || text.includes('ãÃ÷Í') || text.includes('HVRH') || text.includes('HVMT') || text.includes('MVRH'))) {
      text = 'BLVMT क्लोज करने पर DJ/VCB ट्रिप होता है';
    } else if (text.includes('LSCHBA') && (text.includes('ÏçÂÌë Öë ÍÚÔë') || text.includes('बुझने से पहले') || text.includes('se pehle') || text.includes('se pahle') || text.includes('before') || text.includes('HQCVAR'))) {
      text = 'LSCHBA के बुझने से पहले LSDJ फिर से प्रकाशित होता है';
    } else if (text.includes('LSCHBA') && (text.includes('ÏçÂÌë »ë ÏâÊ') || text.includes('बुझने के बाद') || text.includes('ke baad') || text.includes('ke bad') || text.includes('after') || text.includes('HPH') || text.includes('HVSL') || text.includes('Q118 »í ÕëÁ') || text.includes('Q118 को वेज'))) {
      text = 'LSCHBA के बुझने के बाद LSDJ फिर से प्रकाशित होता है';
    } else if (text.includes('LSDJ') && (text.includes('UA') || text.includes('डेविएट') || text.includes('डेिवएट') || text.includes('deviat'))) {
      text = 'LSDJ बुझता है UA डेविएट नहीं होता है';
    } else if (text.includes('LSDJ') && (text.includes('ÏçÂÈâ') || text.includes('बुझता') || text.includes('नहीं बुझता') || text.includes('ÌÚI') || text.includes('ICDJ') || text.includes('Q118') || text.includes('C118') || text.includes('RAL') || text.includes('Q45') || text.includes('Q44'))) {
      text = 'LSDJ नहीं बुझता है';
    } else if (text.includes('QOA') && (text.includes('HQOA') || text.includes('BLRA') || text.includes('BLCP') || text.includes('BLVMT') || text.includes('CCRA') || text.includes('HCHBA') || text.includes('TK ÍìÌÔ') || text.includes('R118') || text.includes('C118') || text.includes('áâÓÌíï'))) {
      text = 'QOA ड्रॉप होती है और DJ/VCB ट्रिप होता है';
    } else if (text.includes('QLA') && (text.includes('áâÓÌíï') || text.includes('आर्नो') || text.includes('arno') || text.includes('áâúgÁäÔÓäÒo') || text.includes('ऑक्सिलरी') || text.includes('तीन बार') || text.includes('ÈäÌ ÏâÓ'))) {
      text = 'QLA ड्रॉप होती है और DJ/VCB ट्रिप होता है';
    } else if ((text.includes('QOP-2') || text.includes('QOP 2') || text.includes('HQOP-2')) && (text.includes('D^iˆp') || text.includes('HMCS-2') || text.includes('RSI-2') || text.includes('SL-2') || text.includes('L-4') || text.includes('TM-4') || text.includes('L-5'))) {
      text = 'QOP-2 ड्रॉप होती है और DJ/VCB ट्रिप होता है';
    } else if ((text.includes('QOP-1') || text.includes('QOP 1') || text.includes('HQOP-1')) && (text.includes('D^iˆp') || text.includes('HMCS-1') || text.includes('RSI-1') || text.includes('SL-1') || text.includes('CTF-1'))) {
      text = 'QOP-1 ड्रॉप होती है और DJ/VCB ट्रिप होता है';
    } else if (text.includes('QRSI-2') || (text.includes('QRSI') && (text.includes('2') || text.includes('दो') || text.includes('two') || text.includes('two') || text.includes('HMCS-2') || text.includes('RSI-2')))) {
      text = 'QRSI-2 ड्रॉप होती है और DJ/VCB ट्रिप होता है';
    } else if (text.includes('QRSI-1') || text.includes('QRSI')) {
      text = 'QRSI-1 ड्रॉप होती है और DJ/VCB ट्रिप होता है';
    } else if (
      text.includes('CGR 1,2,3') || text.includes('áâ»ô¿èÃ') || text.includes('GR ÖëPÃä') ||
      (text.includes('QLM') && (text.includes('ã»Öä ánÒ') || text.includes('अन्य रिले') || text.includes('anya relay') || text.includes('other relay') || text.includes('दोबारा') || text.includes('repeat')))
    ) {
      if (text.includes('ÊâëÏâÓâ') || text.includes('दोबारा') || text.includes('(B)') || text.includes('repeat') || text.includes('फिर से')) {
        text = '(B) QLM किसी अन्य रिले के साथ दोबारा ड्रॉप होती है और DJ/VCB ट्रिप होता है';
      } else {
        text = '(A) QLM किसी अन्य रिले के साथ ड्रॉप होती है और DJ/VCB ट्रिप होता है';
      }
    } else if (
      (text.includes('QLM') || text.includes('qlm') || text.includes('á»ëÔä')) &&
      (text.includes('ड्रॉप') || text.includes('drop') || text.includes('ट्रिप') || text.includes('trip') || text.includes('अकेली') || text.includes('akeli') || text.includes('alone') || text.includes('Å÷âúÍ') || text.includes('ãÃ÷Í') || text.includes('होती') || text.includes('hoti') || text.includes('kya kare') || text.includes('क्या करें'))
    ) {
      text = '1. QLM अकेली ड्रॉप होती है और DJ/VCB ट्रिप होता है ट्रांसफॉर्मर GR तेल बिखराव RPGR CGR RGR बुशिंग';
    } else if ((text.includes('RPGR') || text.includes('CGR') || text.includes('Ã÷âïÖÎâúÑôÓ') || text.includes('¿ìmÏÓ')) && (text.includes('QLM') || text.includes('á»ëÔä') || text.includes('Å÷âúÍ'))) {
      text = '1. QLM अकेली ड्रॉप होती है और DJ/VCB ट्रिप होता है';
    } else if (
      text.includes('áâïã×»') || text.includes('आंशिक') || text.includes('Partial') || text.includes('partial') ||
      (text.includes('19 KV') && text.includes('OHE')) ||
      (text.includes('L-2') && text.includes('L-5')) ||
      (text.includes('L2') && text.includes('L5'))
    ) {
      text = 'कर्षण बल की आंशिक हानि Partial Loss of tractive force OHE वोल्टेज 19 KV HVSI HVMT HMCS एमीटर A1 A2 L2 L5 ब्रेक';
    } else if (
      (text.includes('»ØôÇ') || text.includes('»ØôÔÏÔ') || text.includes('कर्षण बल') || text.includes('tractive') || text.includes('te loss') || (text.includes('एमीटर') && (text.includes('डेविएट') || text.includes('डेिवएट') || text.includes('deviat')))) ||
      (text.includes('LSGR') && (text.includes('बुझ') || text.includes('bujh') || text.includes('ÏçÂ') || text.includes('extinguish')))
    ) {
      if (
        text.includes('पूर्ण हानि') || text.includes('total loss') || text.includes('ÍèÇô') ||
        text.includes('दोनों एमीटर') || text.includes('ÊíÌíï #ÑäÃÓ') || text.includes('ÊíÌíï') ||
        (text.includes('»ØôÇ') && (text.includes('ÚâãÌ') || text.includes('ÍèÇô'))) ||
        (text.includes('कर्षण') && text.includes('पूर्ण'))
      ) {
        text = 'कर्षण बल की पूर्ण हानि Total loss of Tractive force दोनों एमीटर डेविएट नहीं होते हैं एक नोच लें LSGR';
      } else if (text.includes('पहले से') || text.includes('ÍÚÔë') || text.includes('already') || (text.includes('ccls') && text.includes('qrs'))) {
        text = 'यदि LSGR पहले से ही बुझा है CCLS पिघलना HOBA ऑफ QRS वेज BPT LSRSI LSP';
      } else if (text.includes('नहीं बुझता') || text.includes('ÌÚI') || text.includes('not extinguish') || text.includes('q50') || text.includes('q48') || text.includes('pr-2') || text.includes('zsmgr')) {
        text = 'यदि LSGR नहीं बुझता है Q50 Q48 PR-2 VCD QRS EEC ZSMGR SMGR';
      } else if (text.includes('कोई एक') || text.includes('»íæ #»') || ((text.includes('लाइन कॉन्टैक्टर') || text.includes('ÔâåÌ »âúnÃëkÃÓ')) && (text.includes('क्लोज नहीं') || text.includes('kÔíÁ ÌÚI')))) {
        text = 'कोई एक लाइन कॉन्टैक्टर क्लोज नहीं होता है HMCS TM आइसोलेट वेज';
      } else if (text.includes('L-3') || text.includes('L3') || text.includes('L-4') || text.includes('L4') || (text.includes('RSI') && text.includes('आइसोलेट') && (text.includes('L-1') || text.includes('L1')))) {
        text = 'L-1 से L-3 अथवा L-4 से L-6 क्लोज नहीं होते हैं HVSI HVMT RSI आइसोलेट वेज';
      } else if (text.includes('क्लोज नहीं') || text.includes('kÔíÁ ÌÚI') || (text.includes('कॉन्टैक्टर') && (text.includes('l-1') || text.includes('l1') || text.includes('l-6') || text.includes('l6')))) {
        text = 'पहली नोच लेने पर कॉन्टैक्टर L-1 से L-6 क्लोज नहीं होते हैं Q50 HVSI HVMT HT2 CTF वेज';
      } else if (text.includes('बुझ जाता') || text.includes('ÏçÂ ÁâÈâ') || text.includes('extinguishes') || text.includes('l1') || text.includes('l-1') || text.includes('l6') || text.includes('ht-2')) {
        text = 'यदि LSGR बुझ जाता है HVSI HVMT HT-2 L1 L6 CTF रनिंग वेज';
      } else {
        text = 'कर्षण बल की पूर्ण हानि Total loss of Tractive force दोनों एमीटर डेविएट नहीं होते हैं एक नोच लें LSGR';
      }
    } else if (
      text.includes('áâúÃíãÓ½ýë×Ì') || text.includes('ऑटो रिग्रेशन') || text.includes('ऑटोरेग्रेशन') || text.includes('auto regression') ||
      (text.includes('नोच') && (text.includes('रिग्रेशन') || text.includes('regression')) && !text.includes('CCPT')) ||
      (text.includes('LSGR') && (text.includes('बुझकर') || text.includes('bujhkar') || text.includes('ÏçÂ»Ó')) && (text.includes('प्रकाशित') || text.includes('glow') || text.includes('Íý»âã×È'))) ||
      text.includes('ZQWC') || text.includes('BPQD')
    ) {
      if (text.includes('नहीं होता') || text.includes('nahi hota') || text.includes('off') || text.includes('nh)>') || text.includes('nh)') || text.includes('नहीं') || text.includes('बुझा')) {
        text = 'पहली नोच पर ऑटो रिग्रेशन यदि नोच लेने पर LSP प्रकाशित नहीं होता है पीछे कैब BL लॉक Q118 ZSMS EEC QVCD BPR';
      } else if (text.includes('प्रकाशित') || text.includes('Ůकािशत') || text.includes('glows') || text.includes('जलता') || text.includes('wheel slip') || text.includes('स्लिप') || text.includes('एमीटर')) {
        text = 'पहली नोच पर ऑटो रिग्रेशन यदि नोच लेने पर LSP प्रकाशित होता है व्हील स्लिप ZQWC HMCS TM 2 5 शंटिंग';
      } else {
        text = 'पहली नोच पर ऑटो रिग्रेशन होता है LSGR बुझकर फिर से प्रकाशित होता है LSP चेक करें दोनों एमीटर';
      }
    } else if (
      (text.includes('MPJ') || text.includes('mpj')) &&
      (text.includes('LSB') || text.includes('lsb')) &&
      !text.includes('CCPT')
    ) {
      text = 'MPJ को F या R पर रखने पर LSB प्रकाशित ही रहता है Q50 CTF J1 J2 C145 LSC145 वेज';
    } else if (
      text.includes('ÚìÅÔâåÃ') || text.includes('ÚëÅ ÔâåÃ') ||
      (text.includes('हेडलाइट') && (text.includes('BLPRD') || text.includes('BLPRF') || text.includes('BLPRR') || text.includes('ZRT') || text.includes('ZPR') || text.includes('DC to DC') || text.includes('HRTPR') || text.includes('RTPR') || text.includes('40 KMPH'))) ||
      text.includes('BLPRD') || text.includes('BLPRF') || text.includes('BLPRR')
    ) {
      text = 'हेडलाइट प्रकाशित नहीं होती है BL अनलॉक ZRT ZPR BLPRD BLPRF BLPRR DC to DC टॉगल स्विच बल्ब बदली मार्कर लाइट 40 KMPH HRTPR RTPR';
    } else if (
      text.includes('ʬीसल') || text.includes('İʬसल') || text.includes('हॉनŊ') || text.includes('डुɘेƛ') || text.includes('सैİȵंग') ||
      (text.includes('व्हीसल') && (text.includes('फेल') || text.includes('सैंडिंग') || text.includes('डुप्लेक्स') || text.includes('4.50') || text.includes('हॉर्न'))) ||
      ((text.includes('हॉर्न') || text.includes('horn') || text.includes('whistle')) && (text.includes('फेल') || text.includes('fail') || text.includes('सैंडिंग') || text.includes('sanding') || text.includes('डुप्लेक्स') || text.includes('duplex') || text.includes('4.50') || text.includes('स्टार्टिंग स्टेशन')))
    ) {
      text = 'चालू गाड़ी में व्हीसल (हॉर्न) फेल हो जाती है हवा लीकेज सैंडिंग कट आउट कॉक अंडर फ्रेम डुप्लेक्स चैक वाल्व G&SR 4.50 25 KMPH 8 KMPH';
    }
  }
}

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
  text = text.split(/\s+/).filter((w, i, arr) => i === 0 || w.toLowerCase() !== arr[i - 1].toLowerCase()).join(' ');

  // 8. Collapse duplicate spaces
  return text.replace(/\s+/g, ' ').trim();
}
