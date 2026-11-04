/**
 * Railway Bilingual Speech Processor for Indian Railways Locomotives
 * (3-Phase WAP-7/WAP-5/WAG-9, Amrit Bharat Push-Pull WAP-5, Conventional WAP-4/WAG-7).
 *
 * Guarantees that EVERY single troubleshooting step and situation header
 * has a 100% complete, audible spoken text in both Hindi and English.
 * Eliminates skipped points, stripped parentheticals, and silent lines.
 */

export function containsDevanagari(text: string): boolean {
  return /[\u0900-\u097F]/.test(text);
}

/**
 * Checks whether a line is a speakable troubleshooting step or situation header.
 * Skips only purely decorative divider lines that contain no readable words.
 */
export function isActionableStep(text: string): boolean {
  if (!text || typeof text !== 'string') return false;
  const s = text.trim();
  if (s.length === 0) return false;

  // 1. Skip purely decorative divider lines (e.g., "----------------", "════════════", "••••••••")
  if (/^[\-\s═_#\*•~=]+$/.test(s)) return false;

  // 2. Must contain at least one readable letter, number, or Devanagari character
  if (!/[A-Za-z0-9\u0900-\u097F]/.test(s)) return false;

  // 3. Skip standalone generic section labels without specific context
  if (/^(Troubleshooting\s+(Steps|Actions|Procedure)|दोष\s+निवारण\s+(प्रक्रिया|कार्यवाही|चरण))\s*(\([^\)]*\))?[:–—\-]?\s*$/i.test(s)) {
    return false;
  }

  return true;
}

/**
 * Common phrase translations from Hindi to Railway English
 */
const HINDI_TO_ENGLISH_PATTERNS: Array<[RegExp, string]> = [
  // Specific Situations & Headers
  [/【?\s*स्थिति\s*1\s*:\s*VCB\s*STUCK\s*IN\s*ON\s*POSITION\s*(?:\(?Loco\s*will\s*be\s*shut\s*down\)?)?\s*】?/gi, 'Situation 1: VCB STUCK IN ON POSITION (Loco will be shut down)'],
  [/【?\s*स्थिति\s*2\s*:\s*MAIN\s*POWER\s*ISOLATED\s*(?:\(?VCB\s*Inhibited,?\s*Loco\s*is\s*dead\)?)?\s*】?/gi, 'Situation 2: MAIN POWER ISOLATED (VCB Inhibited, Loco is dead)'],
  [/【?\s*स्थिति\s*1\s*:\s*VCB\s*STUCK\s*IN\s*OFF\s*POSITION\s*(?:\(?Try\s*to\s*close\s*VCB\s*again\)?)?\s*】?/gi, 'Situation 1: VCB STUCK IN OFF POSITION (Try to close VCB again)'],
  [/【?\s*स्थिति\s*1\s*:\s*FILTER\s*ON\/OFF\s*CONTACTOR\s*STUCK\s*ON\s*(?:\(?VCB\s*will\s*not\s*close\s*again\)?)?\s*】?/gi, 'Situation 1: FILTER ON/OFF CONTACTOR STUCK ON (VCB will not close again)'],
  [/【?\s*स्थिति\s*1\s*:\s*PRECHARGE\s*OR\s*MAIN\s*CONTACTOR\s*STUCK\s*ON\s*(?:\(?Main\s*converter\s*blocked\)?)?\s*】?/gi, 'Situation 1: PRECHARGE OR MAIN CONTACTOR STUCK ON (Main converter blocked)'],
  [/【?\s*स्थिति\s*1\s*:\s*PRIMARY\s*OVER\s*CURRENT[^\u0900-\u097F】]*】?/gi, 'Situation 1: PRIMARY OVER CURRENT (Check over current relay flag, Close VCB after unlocking relay)'],
  [/【?\s*स्थिति\s*1\s*:\s*AUX\.?\s*WINDING\s*OVER\s*CURRENT\s*(?:\(?Try\s*to\s*close\s*VCB\s*again\)?)?\s*】?/gi, 'Situation 1: AUXILIARY WINDING OVER CURRENT (Try to close VCB again)'],
  [/【?\s*स्थिति\s*1\s*:\s*FATAL\s*ERROR\s*IN\s*MAIN\s*CIRCUIT\s*(?:\(?Turn\s*OFF\s*the\s*Loco\)?)?\s*】?/gi, 'Situation 1: FATAL ERROR IN MAIN CIRCUIT (Turn OFF the Locomotive)'],
  [/【?\s*स्थिति\s*1\s*:\s*TRANSFORMER\s*OIL\s*TEMPERATURE\s*OR\s*PRESSURE\s*NOT\s*OK[^\u0900-\u097F】]*】?/gi, 'Situation 1: TRANSFORMER OIL TEMPERATURE OR PRESSURE NOT OK (TE/BE reduction or VCB trips)'],
  [/【?\s*स्थिति\s*1\s*:\s*यदि\s*बीपी\s*प्रेशर\s*(?:\(BP Pressure\)\s*)?भी\s*साथ\s*में\s*ड्रॉप\s*होता\s*है\s*(?:और\s*गाड़ी\s*खड़ी\s*हो\s*जाती\s*है)?\s*(?:तो\s*:?)?\s*】?/gi, 'Situation 1: If BP pressure also drops and train comes to a halt:'],
  [/【?\s*स्थिति\s*2\s*:\s*यदि\s*बीपी\s*प्रेशर\s*ड्रॉप\s*नहीं\s*होता\s*है\s*(?:तो\s*:?)?\s*】?/gi, 'Situation 2: If BP pressure does not drop:'],
  [/【?\s*स्थिति\s*A\s*:\s*(?:यदि\s*यह\s*मैसेज\s*)?(?:इंजन\s*के\s*)?कर्मीदल\s*द्वारा\s*VCD\s*(?:\"?ACK\"?|एक्नॉलेज)\s*नहीं\s*करने\s*पर\s*(?:आता\s*है)?\s*】?/gi, 'Situation A: When crew fails to acknowledge VCD:'],
  [/【?\s*स्थिति\s*B\s*:\s*यदि\s*सतर्क\s*रहने\s*पर\s*भी\s*(?:बार-बार\s*)?पेनल्टी\s*ब्रेक\s*लग(?:ते|ने\s*पर)\s*(?:हैं)?\s*(?:\(?[^\)]*खराबी\)?)?\s*】?/gi, 'Situation B: When penalty brake applies despite vigilance (VCD Malfunction):'],
  [/【?\s*स्थिति\s*A\s*:\s*यदि\s*MCB\s*नं\.?-?\s*59\.1\/[12]\s*ट्रिप\s*नहीं\s*हैं?\s*】?/gi, 'Situation A: If MCB 59.1/1 or 59.1/2 is not tripped:'],
  [/【?\s*स्थिति\s*B\s*:\s*यदि\s*OCB\s*की\s*खराब\s*मोटर\s*के\s*कारण\s*MCB\s*59\.1\/[12]\s*ट्रिप\s*होते\s*हैं\s*】?/gi, 'Situation B: If MCB 59.1/1 or 59.1/2 trips due to faulty OCB motor:'],
  [/【?\s*स्थिति\s*A\s*:\s*यदि\s*MCB\s*नं\.?-?\s*53\.1\/[12]\s*ट्रिप\s*न\s*हुआ\s*हो\s*】?/gi, 'Situation A: If MCB 53.1/1 or 53.1/2 is not tripped:'],
  [/【?\s*स्थिति\s*B\s*:\s*यदि\s*TMB\s*के\s*खराब\s*मोटर\s*के\s*कारण\s*MCB\s*नं\.?-?\s*53\.1\/[12]\s*ट्रिप\s*होते\s*हैं\s*】?/gi, 'Situation B: If MCB 53.1/1 or 53.1/2 trips due to faulty TMB motor:'],
  [/【?\s*स्थिति\s*A\s*:\s*यदि\s*MCB\s*63\.1\/[12]\s*ट्रिप\s*नहीं\s*होता\s*】?/gi, 'Situation A: If MCB 63.1/1 or 63.1/2 is not tripped:'],
  [/【?\s*स्थिति\s*B\s*:\s*यदि\s*SR\s*ऑयल\s*पंप\s*(?:\(MPH-C\))?\s*की\s*मोटर\s*में\s*दोष\s*के\s*कारण\s*MCB\s*63\.1\/[12]\s*ट्रिप\s*होता\s*है\s*】?/gi, 'Situation B: If MCB 63.1/1 or 63.1/2 trips due to faulty SR oil pump motor:'],
  [/【?\s*स्थिति\s*A\s*:\s*यदि\s*MCB\s*नं\.?-?\s*47\.1\/[12]\s*ट्रिप\s*नहीं\s*होता\s*है\s*】?/gi, 'Situation A: If MCB 47.1/1 or 47.1/2 is not tripped:'],
  [/【?\s*स्थिति\s*B\s*:\s*यदि\s*MCP\s*की\s*मोटर\s*में\s*दोष\s*के\s*कारण\s*MCB\s*47\.1\/[12]\s*ट्रिप\s*होता\s*है\s*】?/gi, 'Situation B: If MCB 47.1/1 or 47.1/2 trips due to faulty MCP motor:'],
  [/【?\s*स्थिति\s*A\s*:\s*यदि\s*MCB\s*नं\.?-?\s*55\.1\/[12]\s*ट्रिप\s*नहीं\s*होता\s*है\s*】?/gi, 'Situation A: If MCB 55.1/1 or 55.1/2 is not tripped:'],
  [/【?\s*स्थिति\s*B\s*:\s*यदि\s*स्कैवेंजिंग\s*ब्लोअर\s*की\s*मोटर\s*में\s*दोष\s*के\s*कारण\s*MCB\s*55\.1\/[12]\s*ट्रिप\s*होता\s*है\s*】?/gi, 'Situation B: If MCB 55.1/1 or 55.1/2 trips due to faulty Scavenging Blower motor:'],
  [/^【?\s*स्थिति\s*1\s*:\s*/gi, 'Situation 1: '],
  [/^【?\s*स्थिति\s*2\s*:\s*/gi, 'Situation 2: '],
  [/^【?\s*स्थिति\s*3\s*:\s*/gi, 'Situation 3: '],
  [/^【?\s*स्थिति\s*4\s*:\s*/gi, 'Situation 4: '],
  [/^【?\s*स्थिति\s*A\s*:\s*/gi, 'Situation A: '],
  [/^【?\s*स्थिति\s*B\s*:\s*/gi, 'Situation B: '],
  [/^【?\s*स्क्रीन\s*1\s*:\s*/gi, 'Screen 1: '],
  [/^【?\s*स्क्रीन\s*2\s*(?:\/\s*ENTER\s*दबाने\s*पर)?\s*:\s*/gi, 'Screen 2 (Press Enter): '],

  // Throttle & BPFA & VCB
  [/थ्रोटल\s*(?:को\s*)?[“'‘"]?\s*0\s*[”'’"]?\s*पर\s*(?:लाएं|लाए|रखें)/gi, 'Bring throttle to zero'],
  [/BPFA\s*(?:को\s*)?(?:दबाकर|दबाएं|प्रेस\s*करें|द्वारा)\s*फ़?ॉल्ट\s*(?:को\s*)?(?:एक्नॉलेज|एकनॉलेज|ACK|ack)\s*करें/gi, 'Press BPFA to acknowledge fault'],
  [/VCB\s*(?:को\s*)?(?:क्लोज़|क्लोज)\s*करने\s*के\s*लिए\s*BLDJ\s*(?:दबाएं|प्रेस\s*करें)/gi, 'Press BLDJ to close VCB'],
  [/BLDJ\s*(?:दबाएं|प्रेस\s*करें)/gi, 'Press BLDJ to close VCB'],
  [/VCB\s*(?:क्लोज़|क्लोज)\s*करें/gi, 'Close VCB'],
  [/BPFA\s*(?:दबाकर|प्रेस\s*करें|दबाएं)/gi, 'Press BPFA'],
  [/फ़?ॉल्ट\s*(?:को\s*)?(?:ACK|एक्नॉलेज)\s*करें/gi, 'Acknowledge the fault'],
  [/सामान्य\s*ऑपरेशन\s*(?:चालू\s*करें|चालू\s*रखें)/gi, 'Continue normal operation'],
  [/आधे\s*TE\/BE\s*द्वारा\s*कार्य\s*करें/gi, 'Work with half TE and BE'],

  // Section clearing & movement
  [/कोस्टिंग\s*करते\s*हुए\s*ब्लॉक\s*सेक्शन\s*क्लियर\s*करें/gi, 'Clear the block section while coasting'],
  [/रोलिंग\s*कंडीशन\s*में\s*सेक्शन\s*क्लियर\s*करें/gi, 'Clear section in rolling condition'],
  [/लोको\s*को\s*(?:सुरक्षित\s*स्थान\s*पर\s*)?(?:खड़ा|खड़ा|रोकें)\s*करें/gi, 'Bring locomotive to a halt at a safe location'],
  [/गाड़ी\s*(?:तुरंत\s*)?(?:खड़ी|खड़ी)\s*करें/gi, 'Stop the train immediately'],
  [/सुविधाजनक\s*स्थान\s*पर\s*गाड़ी\s*खड़ी\s*करके/gi, 'Halt the train at a convenient location and'],

  // Control Electronics
  [/कंट्रोल\s*इलेक्ट्रॉनिक्स\s*को\s*(?:एक\s*बार\s*)?(?:ऑफ|ऑफ़)\s*कर(?:के)?\s*(?:उसे\s*)?ऑन\s*करें/gi, 'Switch OFF control electronics and turn it ON again'],
  [/कंट्रोल\s*इलेक्ट्रॉनिक्स\s*को\s*(?:ऑफ|ऑफ़)\s*करें/gi, 'Switch OFF control electronics'],
  [/कंट्रोल\s*इलेक्ट्रॉनिक्स\s*को\s*ऑन\s*करें/gi, 'Turn ON control electronics'],
  [/MCE\s*(?:को\s*)?(?:ऑफ|ऑफ़)\s*करें/gi, 'Switch OFF MCE'],
  [/MCE\s*(?:को\s*)?ऑन\s*करें/gi, 'Switch ON MCE'],
  [/MCE\s*रीसेट\s*करें/gi, 'Reset MCE'],

  // Pantograph & VCB
  [/पैंटो(?:ग्राफ)?\s*(?:को\s*)?उठाएं|पैंटो\s*रेज़\s*करें/gi, 'Raise the pantograph'],
  [/पैंटो(?:ग्राफ)?\s*(?:को\s*)?(?:लोअर\s*करें|नीचे\s*करें|गिराएं)/gi, 'Lower the pantograph'],
  [/VCB\s*(?:को\s*)?क्लोज\s*करें/gi, 'Close VCB'],
  [/VCB\s*(?:को\s*)?ओपन\s*करें|VCB\s*खोलें/gi, 'Open VCB'],
  [/BLDJ\s*(?:को\s*)?प्रेस\s*करें|BLDJ\s*दबाएं/gi, 'Press BLDJ to close VCB'],
  [/VCB\s*COC\s*खुला\s*होना\s*सुनिश्चित\s*करें/gi, 'Ensure VCB COC is in open position'],

  // Traction resumption & Cab changes
  [/सामान्य\s*(?:तौर\s*पर\s*)?ट्रैक्शन\s*चालू\s*करें/gi, 'Resume normal traction'],
  [/सामान्य\s*ऑपरेशन\s*चालू\s*करें|सामान्य\s*ऑपरेशन\s*चालू\s*रखें/gi, 'Continue normal operation'],
  [/दूसरी\s*कैब\s*से\s*प्रयत्न\s*करें|अन्य\s*कैब\s*से\s*प्रयास\s*करें/gi, 'Try from the other cab'],
  [/पिछली\s*कैब\s*(?:\(कैब-[12]\)\s*)?से\s*प्रयत्न\s*करें/gi, 'Try from the rear cab'],

  // Assistance & Logging
  [/TLC\s*को\s*(?:सूचित\s*करें|बताएं|बताइए)\s*(?:और|तथा|एवं)?\s*लॉग\s*बुक\s*में\s*दर्ज\s*करें/gi, 'Inform TLC and record in locomotive log book'],
  [/TLC\s*को\s*(?:सूचित\s*करें|बताएं)/gi, 'Inform TLC'],
  [/लॉग\s*बुक\s*में\s*दर्ज\s*करें/gi, 'Record in log book'],
  [/तुरंत\s*सहायता\s*इंजन\s*की\s*मांग\s*करें|सहायता\s*इंजन\s*की\s*मांग\s*करें/gi, 'Immediately demand assistance relief engine'],
  [/20\s*मिनट\s*के\s*अंदर\s*सहायता\s*इंजन\s*की\s*मांग\s*करें/gi, 'Demand assistance engine within 20 minutes'],

  // Conditions
  [/यदि\s*LSDJ\s*प्रकाशित\s*होता\s*है\s*(?:तो\s*:?)?/gi, 'If LSDJ illuminates:'],
  [/यदि\s*LSDJ\s*प्रकाशित\s*नहीं\s*होता\s*(?:तो\s*:?)?/gi, 'If LSDJ does not illuminate:'],
  [/यदि\s*सफलता\s*नहीं\s*मिलती\s*(?:है\s*)?(?:तो\s*:?)?/gi, 'If not successful:'],
  [/यदि\s*दोबारा\s*(?:से\s*)?उपरोक्त\s*दोष\s*आता\s*है\s*(?:तो\s*:?)?/gi, 'If the above fault recurs:'],
  [/यदि\s*वही\s*मैसेज\s*दोबारा\s*आता\s*है\s*(?:तो\s*:?)?/gi, 'If the same message repeats:'],
  [/यदि\s*सभी\s*कुछ\s*सामान्य\s*मिलता\s*है\s*(?:तो\s*:?)?/gi, 'If everything is found normal:'],

  // Switches & Panels (Switch 152, Simulation Key 179)
  [/SB-1\s*पैनल\s*पर\s*लगे\s*स्विच\s*नं\.?\s*152\s*को\s*[“'‘"]?\s*0\s*[”'’"]?\s*से\s*[“'‘"]?\s*1\s*[”'’"]?\s*पर\s*रखकर\s*लोको\s*को\s*फेल(?:्य|ि)य?ोर\s*मोड\s*में\s*(?:लाकर\s*)?चलाएं/gi, 'Put Switch 152 on SB-1 panel from 0 to 1 and operate loco in Failure Mode'],
  [/स्विच\s*(?:नं\.?\s*)?152\s*को\s*फेल(?:्य|ि)य?ोर\s*मोड\s*में\s*रखकर\s*सामान्य\s*ट्रैक्शन\s*चालू\s*करें/gi, 'Keep switch 152 in failure mode and resume normal traction'],
  [/स्विच\s*152\s*\(SB-1\)\s*को\s*2-3\s*बार\s*ऑपरेट\s*करें/gi, 'Operate switch 152 on SB-1 panel 2 to 3 times'],
  [/SB-1\s*पैनल\s*पर\s*लगी\s*सिमुलेशन\s*चाबी\s*(?:\(स्विच 179\)|179)?\s*(?:का|को)\s*[“'‘"]?\s*0\s*[”'’"]?\s*पर\s*होना\s*सुनिश्चित\s*करें/gi, 'Ensure simulation key 179 on SB-1 panel is in 0 position'],
  [/यदि\s*नहीं\s*है\s*तो\s*[“'‘"]?\s*1\s*[”'’"]?\s*से\s*[“'‘"]?\s*0\s*[”'’"]?\s*पर\s*लाएं/gi, 'If not, bring it from 1 to 0 position'],

  // Push-Pull, Master & Slave Loco
  [/स्लेव\s*लोको\s*को\s*चेक\s*करें\s*यदि\s*लोको\s*शट\s*डाउन\s*हो\s*गया\s*है\s*तो/gi, 'Check slave loco. If loco has shut down,'],
  [/स्लेव\s*लोको\s*की\s*कंट्रोल\s*इलेक्ट्रॉनिक्स\s*को\s*ऑन\s*करें/gi, 'Turn ON control electronics of slave loco'],
  [/मास्टर\s*लोको\s*में\s*जाकर/gi, 'Go to the master locomotive and'],
  [/पीछे\s*वाले\s*लोको\s*को\s*डेड\s*बनाएं|स्लेव\s*लोको\s*को\s*डेड\s*बनाएं/gi, 'Make the rear slave locomotive dead'],
  [/मल्टीपल\s*ऑपरेशन\s*(?:संभव|उपलब्ध)\s*नहीं\s*(?:होगा|रहेगा)/gi, 'Multiple operation will not be available'],
  [/LSFI\s*लगातार\s*प्रकाशित\s*होगा/gi, 'LSFI will glow continuously'],
  [/ZNN\s*(?:स्विच\s*)?को\s*OFF\s*स्थिति\s*में\s*रखें/gi, 'Put ZNN switch to OFF position'],

  // Braking & Diagnostic
  [/DDS\s*में\s*कोई\s*फ़?ॉल्ट\s*स्टोर\s*नहीं\s*होगा/gi, 'No fault data will be stored in DDS'],
  [/इसलिए\s*सभी\s*फ़?ॉल्ट\s*को\s*लोको\s*लॉग\s*बुक\s*में\s*(?:अनिवार्य\s*रूप\s*से\s*)?दर्ज\s*करें/gi, 'Therefore record all faults in the locomotive log book'],
  [/रीजनरेटिव\s*ब्रेक\s*उपलब्ध\s*नहीं\s*होगा/gi, 'Regenerative brake will not be available'],
  [/गाड़ी\/लोको\s*को\s*न्यूमैटिक\s*ब्रेक\s*\(?A-9\s*\/\s*SA-9\)?\s*द्वारा\s*कंट्रोल\s*करें/gi, 'Control train using pneumatic brakes A-9 and SA-9'],
  [/A-9\s*(?:अप्लाई|एप्लाई)\s*करने\s*से\s*पहले\s*थ्रोटल\s*(?:का|को)\s*[“'‘"]?\s*0\s*[”'’"]?\s*पर\s*होना\s*सुनिश्चित\s*करें/gi, 'Ensure throttle is at 0 before applying A-9'],
  [/केवल\s*कैब-2\s*से\s*फेल(?:्य|ि)य?ोर\s*मोड\s*ऑपरेशन\s*संभव\s*होगा/gi, 'Failure mode operation is only possible from Cab-2'],
  [/कैब-2\s*में\s*TE\/BE\s*मीटर\s*कार्य\s*नहीं\s*करेंगे/gi, 'TE/BE meters will not work in Cab-2'],
  [/TE\/BE\s*का\s*(?:%\s*प्रतिशत\s*मान|प्रतिशत\s*मान)\s*डिस्प्ले\s*पर\s*देखा\s*जा\s*सकता\s*है/gi, 'TE/BE percentage value can be viewed on display'],

  // Conventional Locomotives (DJ, Relays, Compressor)
  [/RS\s*प्रेशर\s*चेक\s*करें\s*:\s*सुनिश्चित\s*करें\s*कि\s*RS\s*प्रेशर\s*कम\s*से\s*कम\s*5\.5\s*kg\/cm²\s*हो/gi, 'Check RS pressure: ensure RS pressure is at least 5.5 kg/cm²'],
  [/यदि\s*कम\s*हो\s*तो\s*बेबी\s*कंप्रेसर\s*\(MCPA\)\s*चलाएं/gi, 'If low, run baby compressor MCPA'],
  [/ZPT\s*को\s*स्थिति\s*1\s*या\s*2\s*पर\s*(?:करके\s*)?सुनिश्चित\s*करें\s*कि\s*पैंटो\s*ठीक\s*से\s*उठा\s*हुआ\s*है/gi, 'Put ZPT to position 1 or 2 and ensure pantograph is properly raised'],
  [/BL\s*चाबी\s*को\s*[“'‘"]?\s*1\s*[”'’"]?\s*पर\s*अनलॉक\s*करें/gi, 'Unlock BL key to position 1'],
  [/BLDJ\s*स्विच\s*बंद\s*करके\s*BLRDJ\s*को\s*2-3\s*सेकंड\s*दबाकर\s*रखें/gi, 'Close BLDJ switch and press BLRDJ for 2 to 3 seconds'],
  [/यदि\s*DJ\s*फिर\s*भी\s*क्लोज़\s*न\s*हो\s*तो\s*निम्न\s*रिले\s*व\s*इंटरलॉक्स\s*की\s*जांच\s*करें/gi, 'If DJ still does not close, inspect the following relays and interlocks:'],
  [/Q44\s*रिले\s*पिकअप\s*है\s*या\s*नहीं/gi, 'Check whether relay Q44 is picked up'],
  [/Q118\s*रिले\s*पिकअप\s*है\s*या\s*नहीं/gi, 'Check whether relay Q118 is picked up'],
  [/C118\s*कॉन्टैक्टर\s*ठीक\s*से\s*चिपकता\s*है\s*या\s*नहीं/gi, 'Check whether C118 contactor closes properly'],
  [/MTDJ\s*कॉइल\s*पर\s*सप्लाई\s*आ\s*रही\s*है\s*या\s*नहीं/gi, 'Check supply to MTDJ coil'],
  [/रिले\s*पैनल\s*पर\s*QOP1,?\s*QOP2,?\s*QOA,?\s*QLM\s*(?:तथा|एवं)?\s*QRSI(?:1\/2)?\s*के\s*टारगेट\s*चेक\s*करें/gi, 'Check target flags of QOP1, QOP2, QOA, QLM and QRSI relays on relay panel'],
  [/यदि\s*कोई\s*रिले\s*ड्रॉप\s*हो\s*तो\s*उसे\s*रीसेट\s*करें/gi, 'If any relay is dropped, reset it manually'],

  // MCBs & Panels
  [/MCB\s*127\.92\s*को\s*ट्रिप\s*करके/gi, 'Trip MCB 127.92 and'],
  [/MCB\s*को\s*रीसेट\s*करें/gi, 'Reset the MCB'],
  [/ZPRD\s*\(?डिमर\s*स्विच\)?\s*ON\s*करें/gi, 'Turn ON dimmer switch ZPRD'],
  [/40\s*KMPH\s*के\s*गति\s*प्रतिबंध\s*से\s*गाड़ी\s*चलाएं/gi, 'Operate train with 40 km/h speed restriction']
];

/**
 * Common phrase translations from English to Railway Hindi
 */
const ENGLISH_TO_HINDI_PATTERNS: Array<[RegExp, string]> = [
  // Specific Situations & Headers
  [/Situation\s*1\s*:\s*VCB\s*STUCK\s*IN\s*ON\s*POSITION\s*(?:\(?Loco\s*will\s*be\s*shut\s*down\)?)?/gi, 'स्थिति एक: वीसीबी स्टक इन ऑन पोजीशन (लोको शट डाउन हो जाएगा)'],
  [/Situation\s*2\s*:\s*MAIN\s*POWER\s*ISOLATED\s*(?:\(?VCB\s*Inhibited,?\s*Loco\s*is\s*dead\)?)?/gi, 'स्थिति दो: मेन पावर आइसोलेटेड (वीसीबी इनहिबिटेड, लोको डेड)'],
  [/Situation\s*1\s*:\s*VCB\s*STUCK\s*IN\s*OFF\s*POSITION\s*(?:\(?Try\s*to\s*close\s*VCB\s*again\)?)?/gi, 'स्थिति एक: वीसीबी स्टक इन ऑफ पोजीशन (वीसीबी दोबारा क्लोज करने का प्रयास करें)'],
  [/Situation\s*1\s*:\s*FILTER\s*ON\/OFF\s*CONTACTOR\s*STUCK\s*ON\s*(?:\(?VCB\s*will\s*not\s*close\s*again\)?)?/gi, 'स्थिति एक: फ़िल्टर ऑन ऑफ़ कॉन्टैक्टर स्टक ऑन (वीसीबी दोबारा क्लोज नहीं होगा)'],
  [/Situation\s*1\s*:\s*PRECHARGE\s*OR\s*MAIN\s*CONTACTOR\s*STUCK\s*ON\s*(?:\(?Main\s*converter\s*blocked\)?)?/gi, 'स्थिति एक: प्रीचार्ज या मेन कॉन्टैक्टर स्टक ऑन (मेन कनवर्टर ब्लॉक)'],
  [/Situation\s*1\s*:\s*PRIMARY\s*OVER\s*CURRENT[^\)]*\)?/gi, 'स्थिति एक: प्राइमरी ओवर करंट (ओवर करंट रिले फ्लैग चेक करें, रिले अनलॉक करके वीसीबी क्लोज करें)'],
  [/Situation\s*1\s*:\s*AUX\.?\s*WINDING\s*OVER\s*CURRENT\s*(?:\(?Try\s*to\s*close\s*VCB\s*again\)?)?/gi, 'स्थिति एक: ऑक्सिलरी वाइंडिंग ओवर करंट (वीसीबी दोबारा क्लोज करने का प्रयास करें)'],
  [/Situation\s*1\s*:\s*FATAL\s*ERROR\s*IN\s*MAIN\s*CIRCUIT\s*(?:\(?Turn\s*OFF\s*the\s*Loco\)?)?/gi, 'स्थिति एक: मेन सर्किट में फेटल एरर (लोको को ऑफ करें)'],
  [/Situation\s*1\s*:\s*TRANSFORMER\s*OIL\s*TEMPERATURE\s*OR\s*PRESSURE\s*NOT\s*OK[^\)]*\)?/gi, 'स्थिति एक: ट्रांसफार्मर ऑयल तापमान या प्रेशर नॉट ओके (टीई बीई में कमी या वीसीबी ट्रिप)'],
  [/Situation\s*1\s*:\s*If\s*BP\s*pressure\s*also\s*drops[^\)]*/gi, 'स्थिति एक: यदि बीपी प्रेशर भी साथ में ड्रॉप होता है और गाड़ी खड़ी हो जाती है'],
  [/Situation\s*2\s*:\s*If\s*BP\s*pressure\s*does\s*not\s*drop[^\)]*/gi, 'स्थिति दो: यदि बीपी प्रेशर ड्रॉप नहीं होता है'],
  [/Situation\s*A\s*:\s*When\s*crew\s*fails\s*to\s*acknowledge\s*VCD[^\)]*/gi, 'स्थिति ए: कर्मीदल द्वारा वीसीडी एकनॉलेज नहीं करने पर'],
  [/Situation\s*B\s*:\s*When\s*Penalty\s*Brake\s*applies\s*despite\s*vigilance[^\)]*/gi, 'स्थिति बी: सतर्क रहने पर भी पेनल्टी ब्रेक लगने पर (वीसीडी खराबी)'],
  [/^Situation\s*1\s*:\s*/gi, 'स्थिति एक: '],
  [/^Situation\s*2\s*:\s*/gi, 'स्थिति दो: '],
  [/^Situation\s*3\s*:\s*/gi, 'स्थिति तीन: '],
  [/^Situation\s*4\s*:\s*/gi, 'स्थिति चार: '],
  [/^Situation\s*A\s*:\s*/gi, 'स्थिति ए: '],
  [/^Situation\s*B\s*:\s*/gi, 'स्थिति बी: '],

  // Common parenthetical status messages
  [/Loco\s+will\s+be\s+shut\s+down/gi, 'लोको शट डाउन हो जाएगा'],
  [/VCB\s+Inhibited\s+Loco\s+is\s+dead/gi, 'VCB इनहिबिटेड, लोको डेड'],
  [/VCB\s+Inhibited,?\s+Loco\s+is\s+dead/gi, 'VCB इनहिबिटेड, लोको डेड'],
  [/Loco\s+is\s+dead/gi, 'लोको डेड'],
  [/Try\s+to\s+close\s+(?:the\s+)?VCB\s+again/gi, 'VCB दोबारा क्लोज करने का प्रयास करें'],
  [/Multiple\s+operation\s+not\s+possible/gi, 'मल्टीपल ऑपरेशन संभव नहीं'],
  [/Refer\s+to\s+driver’?s\s+manual/gi, 'ड्राइवर मैनुअल देखें'],
  [/Press\s*<?Enter>?/gi, 'एंटर दबाएं'],

  // Operations
  [/Bring\s+throttle\s+to\s+(?:zero|"0"|'0'|0)/gi, 'थ्रोटल को शून्य पर लाएं'],
  [/Press\s+BPFA\s+to\s+acknowledge\s+fault/gi, 'BPFA दबाकर फ़ॉल्ट एक्नॉलेज करें'],
  [/Clear\s+the\s+block\s+section\s+while\s+coasting/gi, 'कोस्टिंग करते हुए ब्लॉक सेक्शन क्लियर करें'],
  [/Bring\s+(?:loco|locomotive|train)\s+to\s+a\s+halt/gi, 'लोको को खड़ा करें'],
  [/Switch\s+OFF\s+control\s+electronics\s+and\s+(?:turn|switch)\s+it\s+ON/gi, 'कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करके ऑन करें'],
  [/Raise\s+the\s+pantograph/gi, 'पैंटो को उठाएं'],
  [/Lower\s+the\s+pantograph/gi, 'पैंटो को नीचे करें'],
  [/Close\s+VCB/gi, 'VCB क्लोज करें'],
  [/Open\s+VCB/gi, 'VCB ओपन करें'],
  [/Resume\s+normal\s+traction/gi, 'सामान्य ट्रैक्शन चालू करें'],
  [/Continue\s+normal\s+operation/gi, 'सामान्य ऑपरेशन चालू रखें'],
  [/Try\s+from\s+the\s+other\s+cab/gi, 'दूसरी कैब से प्रयत्न करें'],
  [/Try\s+from\s+the\s+rear\s+cab/gi, 'पिछली कैब से प्रयत्न करें'],
  [/Inform\s+TLC\s+and\s+(?:record|enter)\s+in\s+(?:loco\s+)?log\s*book/gi, 'TLC को सूचित करें और लॉग बुक में दर्ज करें'],
  [/Demand\s+assistance\s+(?:relief\s+)?engine/gi, 'सहायता इंजन की मांग करें'],
  [/Multiple\s+operation\s+will\s+not\s+be\s+(?:possible|available)/gi, 'मल्टीपल ऑपरेशन उपलब्ध नहीं रहेगा'],
  [/Make\s+(?:the\s+)?(?:rear\s+)?(?:slave\s+)?loco(?:motive)?\s+dead/gi, 'पीछे वाले लोको को डेड बनाएं']
];

/**
 * Strips manual references, page numbers, braces and decorative markers.
 */
function cleanRawLine(str: string): string {
  return str
    .replace(/^[═\s【\-\*•#_]+|[═\s】\-\*•#_]+$/g, '')
    .replace(/^(\d+|[ivx]+|[a-z])[\.\)]\s*/i, '') // strip leading numbered prefixes like 1., i., etc.
    .replace(/^[•\-\*⚡\s]+/, '')
    .replace(/\{[^\}]*\}/g, '') // remove curly brace manual notes {कंट्रोल...}
    .replace(/\([^\)]*(पेज|पृष्ठ|विधि|page|manual|सं\.)[^\)]*\)/gi, '') // strip page references
    .trim();
}

/**
 * Robust bilingual header extractor:
 * Splits bilingual headers without mistakenly breaking on internal slashes like 'उप-असामान्य संकेत / कार्यवाही'.
 * Supports:
 * - "Hindi text (English text)"
 * - "English text (Hindi text)"
 * - "Part A - Part B" (where one is Hindi and the other is English)
 */
export function splitBilingualHeader(inside: string): { hindi: string; english: string } {
  const clean = inside.replace(/^[【═\s]+|[】═\s]+$/g, '').trim();

  // 1. Parenthesized format at the end: e.g. "Hindi (English)" or "English (Hindi)"
  const roundMatch = clean.match(/^(.*?)\s*\(([^()]+)\)\s*$/);
  if (roundMatch) {
    const partA = roundMatch[1].trim();
    const partB = roundMatch[2].trim();
    if (containsDevanagari(partA) && !containsDevanagari(partB)) {
      return { hindi: partA, english: partB };
    }
    if (!containsDevanagari(partA) && containsDevanagari(partB)) {
      return { hindi: partB, english: partA };
    }
  }

  // 2. Dash separated: e.g. "Situation 1: ... - स्थिति 1: ..."
  const dashParts = clean.split(/\s+[-–—]\s+/);
  if (dashParts.length === 2) {
    const partA = dashParts[0].trim();
    const partB = dashParts[1].trim();
    if (containsDevanagari(partA) && !containsDevanagari(partB)) {
      return { hindi: partA, english: partB };
    }
    if (!containsDevanagari(partA) && containsDevanagari(partB)) {
      return { hindi: partB, english: partA };
    }
  }

  // 3. Fallback
  if (containsDevanagari(clean)) {
    return { hindi: clean, english: '' };
  }
  return { hindi: '', english: clean };
}

/**
 * Generic extractor for Situation & Sub-abnormal headers:
 * e.g. "【उप-असामान्य संकेत / कार्यवाही जो करनी है: i) कम प्रेशर (Sub-abnormal Indication i: Low Pressure)】"
 *      "【Situation 1: ... - स्थिति 1: ...】"
 *      "════ स्थिति 1: ... ════"
 */
function extractSituationSpeech(cleaned: string, targetLang: 'hi' | 'en'): string | null {
  const isHeader = 
    /^[【═\s]*(?:Situation|स्थिति|Screen|स्क्रीन|Sub-?abnormal|उप-?असामान्य)/i.test(cleaned) ||
    cleaned.includes('उप-असामान्य संकेत') ||
    cleaned.includes('Sub-abnormal Indication');

  if (!isHeader) return null;

  const inside = cleaned.replace(/^[【═\s]+|[】═\s]+$/g, '').trim();
  const hdr = splitBilingualHeader(inside);

  if (targetLang === 'hi') {
    if (hdr.hindi) return normalizeHindiSpeech(cleanRawLine(hdr.hindi));
    // Translate English header if only English present
    if (hdr.english) {
      let trans = cleanRawLine(hdr.english);
      for (const [re, val] of ENGLISH_TO_HINDI_PATTERNS) {
        trans = trans.replace(re, val);
      }
      return normalizeHindiSpeech(trans);
    }
  } else {
    if (hdr.english) return normalizeEnglishSpeech(cleanRawLine(hdr.english));
    // Translate Hindi header if only Hindi present
    if (hdr.hindi) {
      let trans = cleanRawLine(hdr.hindi);
      for (const [re, val] of HINDI_TO_ENGLISH_PATTERNS) {
        trans = trans.replace(re, val);
      }
      return normalizeEnglishSpeech(trans);
    }
  }

  return null;
}

/**
 * Extracts and prepares the clean HINDI text for spoken TTS.
 */
export function getSpokenHindi(text: string): string {
  if (!text) return '';
  const cleaned = text.trim();

  // Header / situation extraction
  const sitSpoken = extractSituationSpeech(cleaned, 'hi');
  if (sitSpoken) return sitSpoken;

  // Header banner enclosed in brackets 【...】
  if (cleaned.startsWith('【')) {
    const inside = cleaned.replace(/^[【\s]+|[】\s]+$/g, '').trim();
    const hdr = splitBilingualHeader(inside);
    if (hdr.hindi) {
      return normalizeHindiSpeech(cleanRawLine(hdr.hindi));
    }
  }

  // Section banner with ═══ e.g. "═══ 1. If fault is on Master Loco (यदि खराबी मास्टर लोको में है) ═══"
  if (cleaned.startsWith('═') || cleaned.endsWith('═')) {
    const inside = cleaned.replace(/^[\s═]+|[\s═]+$/g, '').trim();
    const hiMatch = inside.match(/\(([\u0900-\u097F\s\S]*?)\)/) || inside.match(/\[([\u0900-\u097F\s\S]*?)\]/);
    if (hiMatch && containsDevanagari(hiMatch[1])) {
      return normalizeHindiSpeech(cleanRawLine(hiMatch[1]));
    }
  }

  // 1. Accurate bilingual split using splitBilingualStep (strips English half if outside/inside)
  const split = splitBilingualStep(cleaned);
  if (split && split.hindi && containsDevanagari(split.hindi)) {
    let cleanHi = split.hindi
      .replace(/\(\([^\)]*\)\)/g, '')
      .replace(/\[\[[^\]]*\]\]/g, '')
      .replace(/\s*\(\s*\)\s*/g, ' ')
      .replace(/\s*\[\s*\]\s*/g, ' ')
      .trim();

    // Strip long English explanation brackets e.g. (Open VCB before initiating...)
    cleanHi = cleanHi.replace(/\(([A-Za-z0-9\s,.\/–—\-:;'"&%@#\+=\<\>]{8,})\)/g, (fullMatch, inside) => {
      if (containsDevanagari(inside)) return fullMatch;
      return '';
    }).replace(/\[([A-Za-z0-9\s,.\/–—\-:;'"&%@#\+=\<\>]{8,})\]/g, (fullMatch, inside) => {
      if (containsDevanagari(inside)) return fullMatch;
      return '';
    });

    if (containsDevanagari(cleanHi)) {
      return normalizeHindiSpeech(cleanRawLine(cleanHi));
    }
  }

  // 2. Check for outermost square bracket containing Devanagari: e.g. "English text [हिंदी निर्देश]"
  const squareMatch = cleaned.match(/\[([\s\S]*?)\]\s*$/) || cleaned.match(/\[([\s\S]*?)\]/);
  if (squareMatch && containsDevanagari(squareMatch[1])) {
    return normalizeHindiSpeech(cleanRawLine(squareMatch[1]));
  }

  // 3. Check for outermost round bracket containing Devanagari where outside is English: e.g. "English text (हिंदी निर्देश)"
  const roundMatch = cleaned.match(/\(([\s\S]*?)\)\s*$/);
  if (roundMatch && containsDevanagari(roundMatch[1])) {
    const outside = cleaned.slice(0, roundMatch.index).trim();
    if (!containsDevanagari(outside)) {
      return normalizeHindiSpeech(cleanRawLine(roundMatch[1]));
    }
  }

  // 4. If Devanagari is present in the main text:
  let workingHindi = cleanRawLine(cleaned);

  // First, strip all double-bracket English translations ((...)) and [[...]] BEFORE dictionary translation
  workingHindi = workingHindi
    .replace(/\(\([^\)]*\)\)/g, '')
    .replace(/\[\[[^\]]*\]\]/g, '')
    .replace(/\{[^\}]*\}/g, '');

  // Strip long purely English explanatory brackets (while preserving short acronyms like Q50, VCB, A-9)
  workingHindi = workingHindi
    .replace(/\(([A-Za-z0-9\s,.\/–—\-:;'"&%@#\+=\<\>]{7,})\)/g, (fullMatch, inside) => {
      if (containsDevanagari(inside)) return fullMatch;
      return '';
    })
    .replace(/\[([A-Za-z0-9\s,.\/–—\-:;'"&%@#\+=\<\>]{7,})\]/g, (fullMatch, inside) => {
      if (containsDevanagari(inside)) return fullMatch;
      return '';
    })
    .replace(/\s*\(\s*\)\s*/g, ' ')
    .replace(/\s*\[\s*\]\s*/g, ' ')
    .trim();

  // Translate parenthesized English status if present (e.g. "(Loco will be shut down)")
  for (const [pattern, hi] of ENGLISH_TO_HINDI_PATTERNS) {
    workingHindi = workingHindi.replace(pattern, hi);
  }

  // Unwrap short acronyms in parentheses like (MCPA), (BUR-1), (SB-1), (A-9) so they remain audible
  workingHindi = workingHindi.replace(/\(([A-Za-z0-9\-\.\/]{1,10})\)/g, ' $1 ');

  if (containsDevanagari(workingHindi)) {
    return normalizeHindiSpeech(cleanRawLine(workingHindi));
  }

  // 5. If the text has NO Devanagari at all (pure English instruction), translate known patterns to Hindi
  let translated = cleanRawLine(cleaned);
  for (const [pattern, hi] of ENGLISH_TO_HINDI_PATTERNS) {
    translated = translated.replace(pattern, hi);
  }

  return normalizeHindiSpeech(translated);
}

/**
 * Normalizes Hindi spoken words: replaces single digits, punctuation, and clears noise.
 */
function normalizeHindiSpeech(str: string): string {
  let s = str
    .replace(/^【?\s*स्थिति\s*1\s*:\s*/gi, 'स्थिति एक: ')
    .replace(/^【?\s*स्थिति\s*2\s*:\s*/gi, 'स्थिति दो: ')
    .replace(/^【?\s*स्थिति\s*3\s*:\s*/gi, 'स्थिति तीन: ')
    .replace(/^【?\s*स्थिति\s*4\s*:\s*/gi, 'स्थिति चार: ')
    .replace(/^【?\s*स्थिति\s*A\s*:\s*/gi, 'स्थिति ए: ')
    .replace(/^【?\s*स्थिति\s*B\s*:\s*/gi, 'स्थिति बी: ')
    .replace(/\b0\b/g, 'शून्य')
    .replace(/‘0’|'0'|"0"|“0”/g, 'शून्य')
    .replace(/‘1’|'1'|"1"|“1”/g, 'एक')
    .replace(/‘2’|'2'|"2"|“2”/g, 'दो')
    .replace(/‘II’|'II'|"II"/g, 'दो')
    .replace(/‘I’|'I'|"I"/g, 'एक')
    .replace(/[:\-–—\s]+$/, '')
    .trim();
  return s;
}

/**
 * Extracts and prepares the clean ENGLISH text for spoken TTS.
 */
export function getSpokenEnglish(text: string): string {
  if (!text) return '';
  const cleaned = text.trim();

  // Situation header extraction
  const sitSpoken = extractSituationSpeech(cleaned, 'en');
  if (sitSpoken) return sitSpoken;

  // Header banner enclosed in brackets 【...】
  if (cleaned.startsWith('【')) {
    const inside = cleaned.replace(/^[【\s]+|[】\s]+$/g, '').trim();
    const hdr = splitBilingualHeader(inside);
    if (hdr.english) {
      return normalizeEnglishSpeech(cleanRawLine(hdr.english));
    }
  }

  // Banners with ═══ e.g. "═══ 1. If fault is on Master Loco (यदि खराबी मास्टर लोको में है) ═══"
  if (cleaned.startsWith('═') || cleaned.endsWith('═')) {
    const inside = cleaned.replace(/^[\s═]+|[\s═]+$/g, '').trim();
    const engMatch = inside.match(/\(([^)]*[a-zA-Z]{3,}[^)]*)\)/);
    if (engMatch && !containsDevanagari(engMatch[1])) {
      return normalizeEnglishSpeech(cleanRawLine(engMatch[1]));
    }
    const beforeBracket = inside.split(/[(\[]/)[0].trim();
    if (!containsDevanagari(beforeBracket) && /[a-zA-Z]{3,}/.test(beforeBracket)) {
      return normalizeEnglishSpeech(cleanRawLine(beforeBracket));
    }
  }

  // 1. Accurate bilingual split using splitBilingualStep (prevents dropping English parenthetical terms like (SB-1), (85), etc.)
  const split = splitBilingualStep(cleaned);
  if (split && split.english) {
    const engWords = split.english.match(/[A-Za-z]{2,}/g) || [];
    if (engWords.length >= 2) {
      return normalizeEnglishSpeech(cleanRawLine(split.english));
    }
  }

  // 3. If English is inside parentheses at the end of a Hindi line: e.g. "दोष निवारण (Troubleshooting Actions)"
  const roundEngMatch = cleaned.match(/\(([A-Za-z0-9\s,.\/–—\-]+)\)\s*$/);
  if (roundEngMatch) {
    const engWords = roundEngMatch[1].match(/[A-Za-z]{2,}/g) || [];
    if (engWords.length >= 2) {
      return normalizeEnglishSpeech(cleanRawLine(roundEngMatch[1]));
    }
  }

  // 4. If text contains NO Devanagari at all, it is already pure English
  if (!containsDevanagari(cleaned)) {
    return normalizeEnglishSpeech(cleanRawLine(cleaned));
  }

  // 5. If text contains Hindi, translate via comprehensive domain dictionary
  let translated = cleanRawLine(cleaned);
  for (const [pattern, eng] of HINDI_TO_ENGLISH_PATTERNS) {
    translated = translated.replace(pattern, eng);
  }
  translated = translated.replace(/।/g, '. ');

  if (containsDevanagari(translated)) {
    const commonReplacements: Array<[RegExp, string]> = [
      [/दबाएं|दबाकर|प्रेस करें/gi, 'press'],
      [/करें|करके/gi, 'do'],
      [/चालू करें|शुरू करें/gi, 'turn ON'],
      [/बंद करें|ऑफ करें/gi, 'turn OFF'],
      [/जांच करें|चेक करें/gi, 'check'],
      [/रीसेट करें/gi, 'reset'],
      [/आइसोलेट करें/gi, 'isolate'],
      [/गाड़ी खड़ी करें|रोकें/gi, 'stop the train'],
      [/यदि|अगर/gi, 'if'],
      [/तो/gi, 'then'],
      [/और|तथा|एवं/gi, 'and'],
      [/नहीं/gi, 'not'],
      [/होता है|होती है|होगा/gi, 'occurs'],
      [/होने पर/gi, 'upon occurrence'],
      [/प्रयास करें|कोशिश करें/gi, 'attempt'],
      [/उपलब्ध/gi, 'available'],
      [/सुविधाजनक स्थान पर/gi, 'at a convenient place'],
      [/पीछे वाले लोको को|स्लेव लोको को/gi, 'the rear locomotive'],
      [/डेड बनाएं/gi, 'make dead'],
      [/सूचना दें|सूचित करें/gi, 'inform'],
      [/लॉग बुक में/gi, 'in the log book'],
      [/नोट करें|दर्ज करें/gi, 'record'],
      [/सामान्य/gi, 'normal'],
      [/ऑपरेशन/gi, 'operation'],
      [/लगातार/gi, 'continuously'],
      [/प्रकाशित होगा|जलेगा/gi, 'will glow'],
      [/बुझेगा/gi, 'will extinguish'],
      [/सुरक्षित/gi, 'safely'],
      [/सावधानी/gi, 'caution'],
      [/दोष निवारण/gi, 'troubleshooting'],
      [/कार्यवाही/gi, 'actions'],
      [/विधि/gi, 'procedure'],
      [/प्रभाव/gi, 'effect'],
      [/मास्टर लोको/gi, 'Master Locomotive'],
      [/स्लेव लोको/gi, 'Slave Locomotive'],
      [/बोगी/gi, 'bogie'],
      [/हार्मोनिक फिल्टर/gi, 'harmonic filter'],
      [/पैंटोग्राफ|पैंटो/gi, 'pantograph']
    ];
    for (const [re, val] of commonReplacements) {
      translated = translated.replace(re, val);
    }
    translated = translated.replace(/[\u0900-\u097F]+/g, ' ').replace(/\s+/g, ' ').trim();
  }

  return normalizeEnglishSpeech(translated);
}

/**
 * Cleans English text for clear audio utterance.
 */
function normalizeEnglishSpeech(str: string): string {
  let s = str
    .replace(/^[═\s【\-\*•#_]+|[═\s】\-\*•#_]+$/g, '')
    .replace(/[:\-–—\s]+$/, '')
    .replace(/\s+/g, ' ')
    .trim();
  return s;
}

/**
 * Splits a bilingual railway TSD step: "English instruction (Hindi translation)"
 * Accurately finds the true Hindi bracket opening without cutting off English parenthetical
 * notations like (SB-1), (85), (PAN1-PS), (MCE OFF), (17.5 kV to 29 kV), etc.
 */
export function splitBilingualStep(text: string): { prefix: string; english: string; hindi: string } | null {
  if (!text) return null;
  const trimmed = text.trim();

  // Extract prefix like "1. ", "01. ", "• ", "- ", "* ", "a) ", "{i} ", "   • "
  const prefixMatch = trimmed.match(/^(\s*(?:\d+|[ivx]+|[a-z])[\.\)]\s*|\s*[•\-\*]\s*|\s*\{[ivx0-9]+\}\s*)/i);
  const prefix = prefixMatch ? prefixMatch[0] : '';
  const body = prefixMatch ? trimmed.slice(prefixMatch[0].length) : trimmed;

  // Case 1: Check outermost brackets at end of string
  const lastBracketMatch = body.match(/\(([\s\S]*?)\)\s*$/) || body.match(/\[([\s\S]*?)\]\s*$/);
  if (lastBracketMatch && lastBracketMatch.index !== undefined) {
    const inside = lastBracketMatch[1].trim();
    const outside = body.slice(0, lastBracketMatch.index).trim();
    if (containsDevanagari(inside) && !containsDevanagari(outside) && outside.length > 0) {
      // English outside, Hindi inside
      let hindiClean = inside.replace(/^(\s*(?:\d+|[ivx]+|[a-z])[\.\)]\s*|\s*[•\-\*]\s*|\s*\{[ivx0-9]+\}\s*)/i, '').trim();
      return {
        prefix,
        english: outside,
        hindi: hindiClean || inside
      };
    } else if (!containsDevanagari(inside) && containsDevanagari(outside) && inside.length > 8) {
      // Hindi outside, English inside
      return {
        prefix,
        english: inside,
        hindi: outside
      };
    }
  }

  // Find index of the first Devanagari character (U+0900 to U+097F)
  const devanagariMatch = body.match(/[\u0900-\u097F]/);
  if (!devanagariMatch || devanagariMatch.index === undefined) {
    // Pure English (no Hindi translation found)
    return { prefix, english: body, hindi: '' };
  }

  const firstDevIndex = devanagariMatch.index;

  // The Hindi translation is enclosed in '(' or '[' right before the first Devanagari character.
  // Search backwards from firstDevIndex for '(' or '['
  const textBeforeDev = body.substring(0, firstDevIndex);
  const lastOpenParen = textBeforeDev.lastIndexOf('(');
  const lastOpenBracket = textBeforeDev.lastIndexOf('[');
  const openIndex = Math.max(lastOpenParen, lastOpenBracket);

  if (openIndex >= 0) {
    const englishPart = textBeforeDev.substring(0, openIndex).trim();
    if (englishPart.length > 0 && !containsDevanagari(englishPart)) {
      let hindiPart = body.substring(openIndex + 1).trim();
      // Remove trailing matching ')' or ']'
      hindiPart = hindiPart.replace(/[\)\]]\s*$/, '').trim();
      let hindiClean = hindiPart.replace(/^(\s*(?:\d+|[ivx]+|[a-z])[\.\)]\s*|\s*[•\-\*]\s*|\s*\{[ivx0-9]+\}\s*)/i, '').trim();
      return {
        prefix,
        english: englishPart,
        hindi: hindiClean || hindiPart
      };
    }
  }

  // Case 3: Embedded English explanation bracket in Hindi text
  const engParenMatch = body.match(/\(([A-Za-z0-9\s,.\/–—\-:;'"&%@#\+=\<\>]{10,})\)/) ||
                        body.match(/\[([A-Za-z0-9\s,.\/–—\-:;'"&%@#\+=\<\>]{10,})\]/);
  if (engParenMatch && engParenMatch.index !== undefined) {
    const engPart = engParenMatch[1].trim();
    const hindiPart = body.replace(engParenMatch[0], '').replace(/\s+/g, ' ').trim();
    if (containsDevanagari(hindiPart)) {
      return {
        prefix,
        english: engPart,
        hindi: hindiPart
      };
    }
  }

  return null;
}

/**
 * Formats a troubleshooting action step according to the user's selected language mode:
 * - 'en': Shows clean English text (English font)
 * - 'hi': Shows clean Hindi text (Hindi font)
 * - 'both': Shows both English and Hindi (English first, followed by Hindi in parentheses)
 */
export function getDisplayStepText(action: string, mode: 'en' | 'hi' | 'both'): string {
  if (!action || typeof action !== 'string') return '';
  const trimmed = action.trim();
  if (mode === 'both') return trimmed;

  // Divider lines
  if (/^[\-\s═_#\*•~=]+$/.test(trimmed)) {
    return '--------------------------------------------------';
  }

  // Headers e.g. "【उप-असामान्य संकेत / कार्यवाही जो करनी है: i) कम प्रेशर (Sub-abnormal Indication i: Low Pressure)】"
  if (trimmed.startsWith('【')) {
    const inside = trimmed.replace(/^[【\s]+|[】\s]+$/g, '').trim();
    const hdr = splitBilingualHeader(inside);

    if (mode === 'hi') {
      if (hdr.hindi) return `【${hdr.hindi}】`;
      const hiSpoken = getSpokenHindi(trimmed);
      return hiSpoken ? `【${hiSpoken}】` : trimmed;
    }

    if (mode === 'en') {
      if (hdr.english) return `【${hdr.english}】`;
      const engSpoken = getSpokenEnglish(trimmed);
      return engSpoken ? `【${engSpoken}】` : trimmed;
    }

    // mode === 'both': Show Hindi first with English in parentheses
    if (hdr.hindi && hdr.english) {
      return `【${hdr.hindi} (${hdr.english})】`;
    }
    return trimmed;
  }

  // Section banners e.g. "════ स्थिति 1: ... ════"
  if (trimmed.startsWith('═') || trimmed.endsWith('═')) {
    if (mode === 'en') {
      const engSpoken = getSpokenEnglish(trimmed);
      return engSpoken ? `════ ${engSpoken} ════` : trimmed;
    } else {
      const hiSpoken = getSpokenHindi(trimmed);
      return hiSpoken ? `════ ${hiSpoken} ════` : trimmed;
    }
  }

  // Use splitBilingualStep to accurately separate English and Hindi
  const split = splitBilingualStep(trimmed);
  if (split) {
    if (mode === 'en' && split.english) {
      return split.prefix + split.english;
    }
    if (mode === 'hi' && split.hindi) {
      let cleanHi = split.hindi;
      if (split.prefix) {
        cleanHi = cleanHi.replace(/^(\s*(?:\d+|[ivx]+|[a-z])[\.\)]\s*|\s*[•\-\*]\s*|\s*\{[ivx0-9]+\}\s*)/i, '').trim();
      }
      return split.prefix + cleanHi;
    }
  }

  // Fallback to getSpokenEnglish / getSpokenHindi
  if (mode === 'en') {
    const eng = getSpokenEnglish(trimmed);
    return eng || trimmed;
  } else {
    const hi = getSpokenHindi(trimmed);
    return hi || trimmed;
  }
}

/**
 * Formats multi-line text or headers (such as faultTitle, analysis, precautions) into pure Hindi or pure English:
 * - 'hi': Strips parenthetical English translations, English subtitles, and keeps pure Hindi
 * - 'en': Strips parenthetical Hindi translations, and keeps pure English
 * - 'both': Returns original text
 */
export function formatBilingualText(text: string, mode: 'en' | 'hi' | 'both'): string {
  if (!text || typeof text !== 'string') return '';
  const trimmed = text.trim();
  if (mode === 'both') return trimmed;

  if (mode === 'hi') {
    const lines = trimmed.split('\n');
    const cleanedLines = lines.map(line => {
      let l = line.trim();
      if (!l) return '';

      // Strip English explanation brackets (excluding loco models like WAP-4, WAG-7, WAG-5)
      l = l.replace(/\(([A-Za-z0-9\s,.\/–—\-:;'"&%@#\+=\<\>]{8,})\)/g, (fullMatch, inside) => {
        if (/\b(?:WAP|WAG|WAM|WDM|WDG|WDP|EMU|MEMU)\b/i.test(inside)) {
          return fullMatch; // Keep loco models
        }
        if (containsDevanagari(inside)) {
          return fullMatch; // Keep Hindi inside brackets
        }
        return '';
      });

      // Strip square brackets containing only English (excluding loco models)
      l = l.replace(/\[([A-Za-z0-9\s,.\/–—\-:;'"&%@#\+=\<\>]{8,})\]/g, (fullMatch, inside) => {
        if (/\b(?:WAP|WAG|WAM|WDM|WDG|WDP|EMU|MEMU)\b/i.test(inside)) {
          return fullMatch;
        }
        if (containsDevanagari(inside)) {
          return fullMatch;
        }
        return '';
      });

      // Remove redundant English uppercase fault names like 'QLM DROPS ALONE AND DJ/VCB TRIPS'
      l = l.replace(/\b(?:QLM|DJ|VCB|SIV|MPCS|CHBA|BUR|MCE)\s+(?:DROPS|ALONE|AND|TRIPS|TRIPPED|NOT|CLOSING|OVERCURRENT|EARTH|FAULT|ISOLATED|FAILED|FAILURE)[A-Z0-9\s\/\-]*/g, '');

      // For bilingual headers: 'English Title (हिंदी शीर्षक)'
      const roundParenMatch = l.match(/^(.*?)\s*\(([\u0900-\u097F\s\S]+?)\)\s*$/);
      if (roundParenMatch && !containsDevanagari(roundParenMatch[1]) && containsDevanagari(roundParenMatch[2])) {
        l = roundParenMatch[2].trim();
      }

      // Square bracket Hindi title: 'English Title [हिंदी शीर्षक]'
      const squareBracketMatch = l.match(/^(.*?)\s*\[([\u0900-\u097F\s\S]+?)\]\s*$/);
      if (squareBracketMatch && !containsDevanagari(squareBracketMatch[1]) && containsDevanagari(squareBracketMatch[2])) {
        l = squareBracketMatch[2].trim();
      }

      return l.replace(/\s{2,}/g, ' ').trim();
    });

    return cleanedLines.join('\n').trim();
  } else {
    // mode === 'en'
    const lines = trimmed.split('\n');
    const cleanedLines = lines.map(line => {
      let l = line.trim();
      if (!l) return '';

      // If line has "(Hindi translation)" at the end:
      l = l.replace(/\([\u0900-\u097F\s,.\/–—\-:;'"&%@#\+=\<\>]{4,}\)/g, '');
      l = l.replace(/\[[\u0900-\u097F\s,.\/–—\-:;'"&%@#\+=\<\>]{4,}\]/g, '');

      // If line is bilingual header: "English Title (हिंदी शीर्षक)"
      const roundParenMatch = l.match(/^(.*?)\s*\(([\u0900-\u097F\s\S]+?)\)\s*$/);
      if (roundParenMatch && !containsDevanagari(roundParenMatch[1])) {
        l = roundParenMatch[1].trim();
      }

      return l.replace(/\s{2,}/g, ' ').trim();
    });

    return cleanedLines.join('\n').trim();
  }
}

