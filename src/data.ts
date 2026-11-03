import { Fault, SubSystem } from './types';

export const subSystems: SubSystem[] = [
  {
    "id": "SS01",
    "name": "SS01: Main Power (मुख्य शक्ति)"
  },
  {
    "id": "SS02",
    "name": "SS02: Traction Bogie-1 (ट्रैक्शन बोगी-1)"
  },
  {
    "id": "SS03",
    "name": "SS03: Traction Bogie-2 (ट्रैक्शन बोगी-2)"
  },
  {
    "id": "SS04",
    "name": "SS04: Harmonic Filter (हार्मोनिक फिल्टर)"
  },
  {
    "id": "SS05",
    "name": "SS05: Hotel Load Converter (होटल लोड)"
  },
  {
    "id": "SS06",
    "name": "SS06: Aux Converter-1 / BUR-1 (ऑक्ज़ीलरी-1)"
  },
  {
    "id": "SS07",
    "name": "SS07: Aux Converter-2 / BUR-2 (ऑक्ज़ीलरी-2)"
  },
  {
    "id": "SS08",
    "name": "SS08: Aux Converter-3 / BUR-3 (ऑक्ज़ीलरी-3)"
  },
  {
    "id": "SS09",
    "name": "SS09: Battery System (बैटरी सिस्टम)"
  },
  {
    "id": "SS10",
    "name": "SS10: Brake System (ब्रेक सिस्टम)"
  },
  {
    "id": "SS11",
    "name": "SS11: Auxiliaries HB-1 (ऑक्ज़ीलरी HB-1)"
  },
  {
    "id": "SS12",
    "name": "SS12: Auxiliaries HB-2 (ऑक्ज़ीलरी HB-2)"
  },
  {
    "id": "SS13",
    "name": "SS13: Cab-1 (कैब-1)"
  },
  {
    "id": "SS14",
    "name": "SS14: Cab-2 (कैब-2)"
  },
  {
    "id": "SS15",
    "name": "SS15: Fire Detection Unit (फायर डिटेक्शन)"
  },
  {
    "id": "SS16",
    "name": "SS16: Speedometer (स्पीडोमीटर)"
  },
  {
    "id": "SS17",
    "name": "SS17: FLG1 / ICP1 / MCC1 (प्रोसेसर / VCU 1)"
  },
  {
    "id": "SS18",
    "name": "SS18: FLG2 / ICP2 / MCC2 (प्रोसेसर / VCU 2)"
  },
  {
    "id": "SS19",
    "name": "SS19: Train Bus / WTB (ट्रेन बस)"
  }
];

export const faults: Fault[] = [
  {
    id: "F0101P1",
    subSystem: "SS01",
    message: "VCB STUCK IN ON POSITION\nLoco will be shut down\n[स्क्रीन 2: MAIN POWER ISOLATED - VCB Inhibited Loco is dead]",
    lamp: "LSDJ will not glow, LSFI will flicker & BPFA will glow (LSDJ प्रकाशित नहीं होगा, LSFI ब्लिंक करेगी और BPFA प्रकाशित होगा)",
    effect: "SR contactors will open (hotel load / converter), pantograph will lower; in Situation 2 main power isolated, VCB close inhibited, loco dead (SR कान्टेक्टर खुल जायेंगे (होटल लोड / कनवर्टर) पेन्टोग्राफ लोअर होगा; स्थिति 2 में मेन पावर आइसोलेट, VCB क्लोज होना बाधित, लोको डेड)",
    actions: [
      "【Situation 1: VCB STUCK IN ON POSITION (Loco will be shut down) - स्थिति 1: VCB स्टक इन ऑन पोजीशन】",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को “ 0 ” पर लाएं। BPFA दबाकर फॉल्ट ACK करें।)",
      "2. Clear block section while coasting. (कोस्टिंग करते हुए ब्लॉक सेक्शन क्लियर करें।)",
      "3. Bring locomotive to a halt at a safe location. (लोको को सुरक्षित स्थान पर खड़ा करें।)",
      "4. Switch OFF control electronics and turn it ON again. If LSDJ illuminates:- (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करके ऑन करें {कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करके ऑन करने की विधि पेज सं. 74/75 पर दी गई है}। यदि LSDJ प्रकाशित होता है तो:-)",
      "5. Raise pantograph, close VCB and resume normal traction. (पैंटो को उठाएं और VCB क्लोज करें और सामान्य ट्रैक्शन चालू करें।)",
      "6. If unsuccessful, try from the other cab. (यदि सफलता नहीं मिलती तो दूसरी कैब से प्रयत्न करें।)",
      "7. If VCB remains stuck in ON, check switch 154 and MCB 127.1 on SB-1 panel. (यदि VCB अभी भी stuck in ON रहे तो SB-1 पैनल पर स्विच 154 तथा MCB 127.1 चेक करें।)",
      "8. Switch OFF control electronics and turn ON after 5 minutes. (कंट्रोल इलेक्ट्रॉनिक्स को 5 मिनट बाद पुनः ऑफ करके ऑन करें।)",
      "--------------------------------------------------",
      "【Situation 2: MAIN POWER ISOLATED (VCB Inhibited, Loco is dead) - स्थिति 2: मेन पावर आइसोलेटेड】",
      "1. Switch OFF control electronics once again and turn it ON, try to resume traction. (एक बार पुनः कंट्रोल इलेक्ट्रॉनिक्स को ऑफ कर फिर से ऑन करें, ट्रैक्शन चालू करने का प्रयत्न करें।)",
      "2. If not successful, demand relief engine within 20 minutes, inform TLC and record in loco log book. (सफलता न मिलने पर 20 मिनट के अंदर सहायता इंजन की मांग करें, TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0101P1-DEAD",
    subSystem: "SS01",
    message: "MAIN POWER ISOLATED\nVCB Inhibited Loco is dead",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "Main power isolated, VCB close inhibited, locomotive is dead (मेन पावर आइसोलेट होगी, VCB क्लोज होना बाधित, लोको डेड)",
    actions: [
      "【Situation 2: MAIN POWER ISOLATED (VCB Inhibited, Loco is dead) - स्थिति 2: मेन पावर आइसोलेटेड】",
      "1. Switch OFF control electronics once again and turn it ON, try to resume traction. (एक बार पुनः कंट्रोल इलेक्ट्रॉनिक्स को ऑफ कर फिर से ऑन करें, ट्रैक्शन चालू करने का प्रयत्न करें।)",
      "2. If not successful, demand relief engine within 20 minutes, inform TLC and record in loco log book. (सफलता न मिलने पर 20 मिनट के अंदर सहायता इंजन की मांग करें, TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0102P1",
    subSystem: "SS01",
    message: "VCB STUCK IN OFF POSITION\nTry to close VCB again\n[स्क्रीन 2: MAIN POWER ISOLATED - VCB Inhibited Loco is dead]",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "VCB control changed to redundant processor; स्थिति 2 में मेन पावर आइसोलेट, VCB इनहिबिटेड, लोको डेड",
    actions: [
      "【Situation 1: VCB STUCK IN OFF POSITION (Try to close VCB again) - स्थिति 1: VCB स्टक इन ऑफ पोजीशन】",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को “ 0 ” पर लाएं। BPFA दबाकर फॉल्ट ACK करें।)",
      "2. Ensure VCB COC is in open position. (VCB COC खुला होना सुनिश्चित करें।)",
      "3. Press BLDJ to close VCB. (VCB क्लोज करने के लिए BLDJ को प्रेस करें।)",
      "4. If VCB closes, resume traction. (यदि VCB क्लोज होता है तो ट्रैक्शन चालू करें।)",
      "5. Otherwise, clear block section while coasting and stop the locomotive. (अन्यथा यदि संभव हो तो कोस्टिंग करते हुए ब्लॉक सेक्शन क्लियर करें और लोको को खड़ा करें।)",
      "6. Switch OFF control electronics and turn it ON. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करके ऑन करें।)",
      "7. Raise pantograph, close VCB and resume normal traction. (पैंटो उठाएं तथा VCB क्लोज करें और सामान्य ट्रैक्शन चालू करें।)",
      "8. If unsuccessful, try from the rear cab. (यदि सफलता नहीं मिलती तो दूसरी कैब से प्रयत्न करें।)",
      "--------------------------------------------------",
      "【Situation 2: MAIN POWER ISOLATED (VCB Inhibited, Loco is dead) - स्थिति 2: मेन पावर आइसोलेटेड】",
      "1. Switch OFF control electronics once again and turn it ON, try to resume traction. (एक बार पुनः कंट्रोल इलेक्ट्रॉनिक्स को ऑफ कर फिर से ऑन करें, ट्रैक्शन चालू करने का प्रयत्न करें।)",
      "2. If failure persists, demand assistance engine within 20 minutes, inform TLC and record in log book. (सफलता न मिलने पर 20 मिनट के अंदर सहायता इंजन की मांग करें, TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0102P1-DEAD",
    subSystem: "SS01",
    message: "MAIN POWER ISOLATED\nVCB Inhibited Loco is dead",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "Main power isolated, VCB close inhibited, locomotive is dead (मेन पावर आइसोलेट होगी, VCB क्लोज होना बाधित, लोको डेड)",
    actions: [
      "Switch OFF control electronics once again and turn it ON, try to resume traction. (एक बार पुनः कंट्रोल इलेक्ट्रॉनिक्स को ऑफ कर फिर से ऑन करें, ट्रैक्शन चालू करने का प्रयत्न करें।)",
      "Demand assistance engine within 20 minutes. (सफलता न मिलने पर 20 मिनट के अंदर सहायता इंजन की मांग करें।)"
    ]
  },
  {
    id: "F0101P2",
    subSystem: "SS01",
    message: "OVER TEMPERATURE CONTROL ELECTRONICS\nTurn off the loco. Set up cooling mode (LSCE GLOW)",
    lamp: "LSCE (Yellow lamp) & BPFA will glow (LSCE पीला लैम्प और BPFA प्रकाशित होंगे)",
    effect: "Control electronics contactor will not close, TE/BE will become zero (कंट्रोल इलेक्ट्रॉनिक्स का कॉन्टैक्टर क्लोज नहीं होगा, TE/BE शून्य हो जायेगा)",
    actions: [
      "1. Check MCBs in HB/SB panel. If tripped, reset once (MCB 54.1/1 and 54.1/2 on both HB panels, and MCBs 127.91/1 and 127.91/2 on both SB panels). (1. HB/SB पैनल में MCBs को चेक करें। यदि ट्रिप हों तो एक बार रीसेट करें। (MCB 54.1/1 और 54.1/2 दोनों HB पैनल पर एवं MCBs 127.91/1 और 127.91/2 दोनों SB पैनल पर)।)",
      "2. If TE is available, clear block section. Otherwise try to clear block section while coasting Press BPFA to acknowledge fault. (यदि TE उपलब्ध है तो ब्लॉक सेक्शन क्लियर करें। अन्यथा कोस्टिंग करते हुए ब्लॉक सेक्शन क्लियर करने का प्रयत्न करें। BPFA दबाकर फॉल्ट ACK करें।)",
      "3. Inform Station Master that loco will be disabled for 10-15 minutes. After halting train, keep A-9 in Emergency position before placing loco into cooling mode (to prevent MR pressure drop). (स्टेशन मास्टर को 10-15 मिनट तक लोको के असमर्थ रहने की सूचना दें। गाड़ी खड़ी करने के बाद लोको को कूलिंग मोड में रखने से पहले A-9 को इमरजेंसी पोजीशन पर रखें (MR को ड्रॉप होने से रोकने के लिए)।)",
      "4. Switch OFF control electronics BL Key ‘ C ’ (Cooling Mode) , ZPT , Close VCB , LSCE. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करें। BL Key को ‘ C ’ (Cooling Mode) पोजीशन पर रखें, ZPT द्वारा पैंटो रेज़ करें, VCB क्लोज करें। दोनों मशीन रूम ब्लोअर तथा दोनों स्केवेंजिंग ब्लोअर चालू होंगे, लोको कूलिंग मोड में रहेगा और कंट्रोल इलेक्ट्रॉनिक्स ठंडा होने लगेगा। LSCE की बत्ती बुझने तक इंतजार करें।)",
      "5. If VCB opens during cooling mode, check OCR (78) and all oil points before closing VCB, and act accordingly. (5. यदि कूलिंग मोड के दौरान VCB ओपन होता है तो VCB क्लोज करने से पहले OCR (78) तथा सभी ऑयल पॉइंट को चेक करें और उसके अनुसार कार्यवाही करें।)",
      "6. After LSCE extinguishes, open VCB and lower pantograph. Place BL Key in D (Driving Mode), raise pantograph, close VCB and resume traction. (LSCE के बुझने के बाद VCB ओपन करें तथा पैंटो लोअर करें। BL Key को \"D\" (Driving Mode) पोजीशन पर रखें, पैंटो रेज़ करें, VCB क्लोज करें तथा ट्रैक्शन चालू करें।)",
      "★ 3-Phase MRB Loco Special: In locos fitted with 3-phase MRB (MCB 54.1/1 and 54.1/2 3-phase), keep throttle at \"0\" in idle. If cooling mode is activated accidentally, control electronics can be turned ON before LSCE extinguishes by manually operating contactor 218. (★ 3-फ़ेस MRB लोको विशेष: जिन लोको में 3-फ़ेस MRB (MCB 54.1/1 व 54.1/2 थ्री-फ़ेस) लगे हैं, उनमें थ्रोटल \"0\" पर रखकर आइडल में रखें। यदि गलती से कूलिंग मोड एक्टिवेट हो जाए तो LSCE बुझने से पहले कॉन्टैक्टर 218 को मैनुअली ऑपरेट करके कंट्रोल इलेक्ट्रॉनिक्स ऑन किया जा सकता है।)"
    ]
  },
  {
    id: "F0102P2",
    subSystem: "SS01",
    message: "TRANSFORMER OIL PRESSURE NOT OK\nAny oil pump circuit not working TE/BE will be reduced",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "TE/BE कम होने की संभावना है। वेंटिलेशन बढ़ेगा। VCB ट्रिप होगा।",
    actions: [
      "1. If TE is available, clear block section. Otherwise try to clear block section while coasting. (यदि TE उपलब्ध है तो ब्लॉक सेक्शन क्लियर करें। अन्यथा कोस्टिंग करते हुए ब्लॉक सेक्शन क्लियर करने का प्रयत्न करें।)",
      "2. Bring throttle to \"0\" Press BPFA to acknowledge fault. (थ्रोटल को 0 पर लाएं और BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "3. VCB Press BPFA to acknowledge fault, VCB. (यदि VCB ट्रिप होता है तो BPFA दबाकर फ़ॉल्ट ACK करें, VCB क्लोज़ करें तथा कोस्टिंग करते हुए ब्लॉक सेक्शन क्लियर करने का प्रयत्न करें।)",
      "4. Touch inlet and outlet pipes of transformer oil pump by hand to ensure pump is running. Check MCB 62.1/1 in HB-1 panel and MCB 62.1/2 in HB-2 panel; if tripped, open VCB and reset once. (4. ट्रांसफार्मर ऑयल पंप के इनलेट व आउटलेट पाइपों को हाथ से छूकर ट्रांसफार्मर ऑयल पंप का चलना सुनिश्चित करें। HB-1 पैनल में लगे MCB 62.1/1 तथा HB-2 में लगे MCB 62.1/2 की जांच करें। यदि ट्रिप हों तो VCB को ओपन करके एक बार रीसेट करें।)",
      "5. Close VCB; if successful, work train. (VCB क्लोज़ करें, यदि सफलता मिलती है तो गाड़ी चलाएं।)"
    ]
  },
  {
    id: "F0103P2",
    subSystem: "SS01",
    message: "EARTH FAULT AUX. WINDING CIRCUIT\nNormal operation can continue. To be checked during maintenance",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Normal operation can continue. Inspect during maintenance. (सामान्य परिचालन जारी रह सकता है। अनुरक्षण के दौरान जांच की जानी है।)",
    actions: [
      "1. Inspect machine room for any smoke, fire or burning smell in auxiliaries If defective, trip the MCB of concerned auxiliary Press BPFA to acknowledge fault. (मशीन रूम में जाकर ऑक्सिलरी में आग या आग लगने की गंध (Smell/Smoke) चेक करें। यदि खराबी हो तो संबंधित ऑक्सिलरी के MCB को ट्रिप करें। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. If the same fault recurs, troubleshoot as per additional instructions given at end of SS-01. (यदि फिर से वही फ़ॉल्ट आता है तो SS-01 के अंत में दिए गए अतिरिक्त अनुदेशों के अनुसार ट्रबल-शूट करें।)",
      "3. Inform TLC and record in locomotive log book. Continue normal operation. (3. TLC को सूचित करके लॉग बुक में दर्ज करें। सामान्य परिचालन जारी रखें।)"
    ]
  },
  {
    id: "F0104P2",
    subSystem: "SS01",
    message: "LOW FREQUENCY CATENARY VOLTAGE\nWait for 1 minute and set TE / BE again",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "OHE फ्रीक्वेंसी 45 हर्ट्ज (Hz) के ऊपर आने पर ही ट्रैक्शन चालू होगा।",
    actions: [
      "1. Clear block section while coasting Press BPFA to acknowledge fault. (कोस्टिंग करते हुए ब्लॉक सेक्शन क्लियर करें। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Inform TLC and record in locomotive log book at scheduled halt. (2. निर्धारित स्टॉप पर TLC को सूचित करके लॉग बुक में दर्ज करें।)",
      "3. Keep attempting traction and resume normal operation on success. (ट्रैक्शन के लिए प्रयास करते रहें और सफलता मिलने पर नॉर्मल ऑपरेशन चालू करें।)"
    ]
  },
  {
    id: "F0105P2",
    subSystem: "SS01",
    message: "CATENARY FREQUENCY IS HIGH\nBring throttle to zero",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "OHE फ्रीक्वेंसी 55 हर्ट्ज (Hz) से नीचे रहने पर ही ट्रैक्शन चालू रहेगा।",
    actions: [
      "1. Clear block section while coasting Press BPFA to acknowledge fault. (कोस्टिंग करते हुए ब्लॉक सेक्शन क्लियर करें। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Inform TLC and record in locomotive log book at scheduled halt. (2. निर्धारित स्टॉप पर TLC को सूचित करके लॉग बुक में दर्ज करें।)",
      "3. Keep attempting traction and resume normal operation on success. (ट्रैक्शन के लिए प्रयास करते रहें और सफलता मिलने पर नॉर्मल ऑपरेशन चालू करें।)"
    ]
  },
  {
    id: "F0106P2",
    subSystem: "SS01",
    message: "AUXILIARY CAPACITOR MACHINE ROOM BLOWER NOT OFF\nContinue normal traction",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Continue normal traction (सामान्य ट्रैक्शन जारी रहेगा)",
    actions: [
      "1. 1 2 Press BPFA to acknowledge fault. (यदि मशीन रूम ब्लोअर 1 और 2 चालू हैं तो BPFA दबाकर फ़ॉल्ट ACK करें और नॉर्मल ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book at scheduled halt. (2. निर्धारित स्टॉप पर TLC को सूचित करके लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0107P2",
    subSystem: "SS01",
    message: "DEMANDED SPEED CANNOT BE ACHIEVED",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Speed will not exceed 1 km/h; on applying >50% TE, locomotive starts with heavy jerk (गति 1 kmph से अधिक नहीं बढ़ेगी और 50% से अधिक TE देने पर लोको भारी झटके के साथ चालू होगा)",
    actions: [
      "1. Press BPFA to acknowledge fault. (BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. For WAG9, WAG9H, WAP7 locomotives fitted with toggle switches above Traction Converter:\n   • As per DDS background message 0052, 0053 or 0054 ASC1 ERROR TACHO GENERATOR, operate lower, middle or upper toggle switch above SR-1 to bypass speed sensor.\n   • Similarly as per DDS message 0052, 0053 or 0054 ASC2 ERROR TACHO GENERATOR, operate toggle switch above SR-2 to bypass speed sensor. (यदि लोको (WAG9, WAG9H, WAP7) में ट्रैक्शन कनवर्टर के ऊपर टॉगल स्विच लगे हों तो: DDS मैसेज अनुसार SR-1 व SR-2 के ऊपर लगे स्पीड सेंसर के टॉगल स्विच को ऑपरेट करके बाईपास करें।)",
      "3. If locomotive is not fitted with toggle switches above Traction Converter, isolate relevant Traction Converter as per DDS background message: a) If message is ASC1 Error Tacho Generator 1/2/3, switch OFF control electronics and isolate Traction Converter-1 via MCB 127.1/1 and 127.11/1 in SB-1. Work with one traction bogie. Inform TLC. b) If message is ASC2 Error Tacho Generator 1/2/3, switch OFF control electronics and isolate Traction Converter-2 via MCB 127.1/2 and 127.11/2 in SB-2. Work with one traction bogie. Inform TLC. (यदि लोको में ट्रैक्शन कनवर्टर के ऊपर टॉगल स्विच नहीं लगे हों तो निम्न DDS मैसेज के अनुसार संबंधित ट्रैक्शन कनवर्टर को आइसोलेट करें: a) यदि मैसेज ASC1 Error Tacho Generator 1/2/3 का हो, तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके ट्रैक्शन कनवर्टर-1 को MCB 127.1/1 एवं 127.11/1 (SB-1) के द्वारा आइसोलेट करें। एक ट्रैक्शन बोगी से कार्य करें। TLC को सूचित करें। b) यदि मैसेज ASC2 Error Tacho Generator 1/2/3 का हो, तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके ट्रैक्शन कनवर्टर-2 को MCB 127.1/2 एवं 127.11/2 (SB-2) के द्वारा आइसोलेट करें। एक ट्रैक्शन बोगी से कार्य करें। TLC को सूचित करें।)"
    ]
  },
  {
    id: "SS01-OCB-EARTH-FAULT",
    subSystem: "SS01",
    message: "Auxiliary Converter-2 isolated after Converter-1 [Earth fault in OCB]\nF0103P2 / STB2:004 Earth fault Auxiliary circuit\n(ऑक्सिलरी कनवर्टर 1 के बाद 2 आइसोलेट होने पर {OCB में अर्थ फ़ॉल्ट})",
    lamp: "BPFA will glow, LSDJ will glow, VCB tripped/inhibited (BPFA प्रकाशित होगा, LSDJ प्रकाशित, VCB ट्रिप/बाधित)",
    effect: "Converter 1 and 2 both isolated, VCB inhibited, main power OFF (कनवर्टर 1 व 2 दोनों आइसोलेट, VCB बाधित, मेन पावर ऑफ)",
    actions: [
      "A) If MCB No. 59.1/1 or 59.1/2 is not tripped: (A) यदि MCB नं-59.1/1 या 59.1/2 ट्रिप नहीं हैं तो:)",
      "1. Switch OFF control electronics and turn it ON again HB-1 MCB 59.1/1 OCB-1. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके ऑन करें। HB-1 में लगे MCB नं 59.1/1 को ट्रिप करके OCB-1 को आइसोलेट करें।)",
      "2. Close VCB. (VCB क्लोज़ करें।)",
      "3. Check following messages: (a) F0601P1 (b) F0602P1 (c) F0103P2. If no message appears, defective OCB is isolated. (निम्नलिखित मैसेज चेक करें: (a) F0601P1 (b) F0602P1 (c) F0103P2. यदि कोई मैसेज नहीं है तो खराब OCB आइसोलेट हो चुका है।)",
      "4. Operate bogie cut-out switch No. 154 to isolate Bogie-1. Switch OFF control electronics and turn it ON again. Half TE will be available. Clear section with one bogie and demand relief engine. (4. बोगी कट-आउट स्विच नं.-154 को ऑपरेट करके बोगी-1 को आइसोलेट करें। कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके ऑन करें। आधा TE उपलब्ध रहेगा। एक बोगी से सेक्शन क्लियर करके सहायता इंजन की मांग करें।)",
      "If the message recurs:- (यदि संदेश दोबारा आता है तो:-)",
      "i) Reset 59.1/1 in HB-1 panel. Bring Bogie-1 into service. (HB-1 पैनल में लगे 59.1/1 को रीसेट करें। बोगी-1 को सर्विस में लाएं।)",
      "ii) Trip MCB 59.1/2 in HB-2 to isolate OCB-2. (ii) HB-2 में लगे MCB 59.1/2 को ट्रिप करके OCB-2 को आइसोलेट करें।)",
      "iii) Switch OFF control electronics. (कंट्रोल इलेक्ट्रॉनिक्स ऑफ़ करें।)",
      "iv) Isolate Bogie-2 by operating bogie cut-out switch 154. Turn ON control electronics. Half TE available. Clear section with one bogie and demand relief engine. (बोगी कट आउट स्विच-154 को ऑपरेट करके बोगी-2 को आइसोलेट करें। कंट्रोल इलेक्ट्रॉनिक्स ऑन करें। आधा TE उपलब्ध रहेगा। एक बोगी से सेक्शन क्लियर करके सहायता इंजन की मांग करें।)",
      "B) If MCB 59.1/1 or 59.1/2 trips due to a defective OCB motor: (B) यदि OCB की खराब मोटर के कारण MCB 59.1/1 या 59.1/2 ट्रिप होते हैं तो:)",
      "a) Do not reset the MCB. (MCB को रीसेट न करें।)",
      "b) Isolate concerned bogie by operating bogie cut-out switch 154. (बोगी कट आउट स्विच-154 को ऑपरेट करके संबंधित बोगी को आइसोलेट करें।)",
      "c) Half traction will be available. Clear section continuing traction with one bogie and demand relief engine. (आधा ट्रैक्शन उपलब्ध रहेगा। एक ट्रैक्शन बोगी के साथ ट्रैक्शन जारी रखते हुए सेक्शन क्लियर करें। सेक्शन क्लियर करके सहायता इंजन की मांग करें।)"
    ]
  },
  {
    id: "SS01-TMB-EARTH-FAULT",
    subSystem: "SS01",
    message: "Auxiliary Converter-1 isolated after Converter-2 [Earth fault in TMB]\nF0103P2 / STB2:004 Earth fault Auxiliary circuit\n(ऑक्सिलरी कनवर्टर 2 के बाद 1 आइसोलेट होने पर {TMB में अर्थ फ़ॉल्ट})",
    lamp: "BPFA will glow, LSDJ will glow, VCB inhibited (BPFA प्रकाशित होगा, LSDJ प्रकाशित, VCB बाधित)",
    effect: "Converter 2 and 1 both isolated, VCB inhibited, main power OFF (कनवर्टर 2 व 1 दोनों आइसोलेट, VCB बाधित, मेन पावर ऑफ)",
    actions: [
      "A) If MCB No. 53.1/1 or 53.1/2 has not tripped: (A) यदि MCB नं 53.1/1 या 53.1/2 ट्रिप न हुआ हो तो:)",
      "1. Switch OFF control electronics and turn it ON again - HB-1 MCB 53.1/1 TMB-1 HB-2 MCB 53.1/2 TMB-2. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके ऑन करें। एक-एक करके HB-1 में लगे MCB नं 53.1/1 को ट्रिप करके TMB-1 और HB-2 में लगे MCB नं 53.1/2 को ट्रिप करके TMB-2 को आइसोलेट करें।)",
      "2. Close VCB. If success is obtained on isolating TMB-1 or TMB-2, isolate the concerned traction bogie via switch 154. Half traction will remain available; clear block section continuing traction with one bogie. (VCB को क्लोज़ करें। यदि TMB-1 या TMB-2 को आइसोलेट करके सफलता मिलती है तो संबंधित ट्रैक्शन बोगी को स्विच 154 के द्वारा आइसोलेट करें। आधा ट्रैक्शन उपलब्ध रहेगा। एक बोगी के साथ ट्रैक्शन जारी रखते हुए सेक्शन क्लियर करें।)",
      "B) If MCB No. 53.1/1 or 53.1/2 trips due to a defective TMB motor: (B) यदि TMB के खराब मोटर के कारण MCB नं 53.1/1 या 53.1/2 ट्रिप होते हैं तो:)",
      "a) Do not reset the MCB. (MCB को रीसेट न करें।)",
      "b) Switch OFF control electronics and turn it ON again. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके ऑन करें।)",
      "c) Isolate concerned bogie by operating bogie cut-out switch 154. (बोगी कट आउट स्विच-154 को ऑपरेट करके संबंधित बोगी को आइसोलेट करें।)",
      "d) Half traction will be available. Clear section continuing traction with one traction bogie. (आधा ट्रैक्शन उपलब्ध रहेगा। एक ट्रैक्शन बोगी के साथ ट्रैक्शन जारी रखते हुए सेक्शन क्लियर करें।)"
    ]
  },
  {
    id: "SS01-SR-OILPUMP-EARTH-FAULT",
    subSystem: "SS01",
    message: "Auxiliary Converter-3 isolated after Converter-2 [Earth fault in SR/Transformer pump]\nF0103P2 / STB2:004 Earth fault Auxiliary circuit\n(ऑक्सिलरी कनवर्टर 2 के बाद 3 आइसोलेट होने पर {SR/ट्रांसफार्मर पंप में अर्थ फ़ॉल्ट})",
    lamp: "BPFA will glow, LSDJ will glow, VCB inhibited (BPFA प्रकाशित होगा, LSDJ प्रकाशित, VCB बाधित)",
    effect: "Converter 2 and 3 both isolated, VCB inhibited, main power OFF (कनवर्टर 2 व 3 दोनों आइसोलेट, VCB बाधित, मेन पावर ऑफ)",
    actions: [
      "A) If MCB 63.1/1 or 63.1/2 does not trip: (A) यदि MCB 63.1/1 या 63.1/2 ट्रिप नहीं होता तो:)",
      "1. Switch OFF control electronics and turn it ON again - SR-1 HB-1 MCB 63.1/1 SR-2 HB-2 MCB 63.1/2. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके ऑन करें। एक-एक करके क्रमानुसार SR-1 ऑयल पंप को HB-1 पैनल पर लगे MCB 63.1/1 और SR-2 ऑयल पंप को HB-2 पैनल पर लगे MCB 63.1/2 ट्रिप करके आइसोलेट करें।)",
      "2. Close the VCB. (VCB को क्लोज़ करें।)",
      "3. If isolating SR-1 oil pump or SR-2 oil pump succeeds, isolate the corresponding bogie using switch 154. Half traction will be available. Clear section taking traction with one bogie. (3. यदि SR-1 ऑयल पंप या SR-2 ऑयल पंप को आइसोलेट करने से सफलता मिलती है तो संबंधित बोगी को बोगी आइसोलेटिंग स्विच 154 के द्वारा आइसोलेट करें। आधा ट्रैक्शन उपलब्ध रहेगा। एक बोगी के साथ ट्रैक्शन लेते हुए सेक्शन क्लियर करें।)",
      "B) If MCB 63.1/1 or 63.1/2 trips due to a defect in SR oil pump (MPH-C) motor: (B) यदि SR ऑयल पंप (MPH-C) की मोटर में दोष होने के कारण MCB 63.1/1 या 63.1/2 ट्रिप होता है तो:)",
      "a) Do not reset the MCB. (MCB रीसेट न करें।)",
      "b) Switch OFF control electronics and turn it ON again. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके ऑन करें। संबंधित बोगी अपने आप आइसोलेट होगी।)",
      "c) Half traction will be available. Clear section taking traction with one bogie. (आधा ट्रैक्शन उपलब्ध रहेगा। एक बोगी के साथ ट्रैक्शन लेते हुए सेक्शन क्लियर करें।)",
      "C) MCB 54.1/2 , , Inform TLC. (MCB क्रम 54.1/2 को चेक करें, यदि ट्रिप है तो एक बार रीसेट करें, यदि फिर से ट्रिप होती है तो सेक्शन साफ़ करके TLC को सूचित करें और सहायता मांगें।)"
    ]
  },
  {
    id: "SS01-MCP-EARTH-FAULT",
    subSystem: "SS01",
    message: "Auxiliary Converter-2 isolated after Converter-3 [Earth fault in MCP]\nF0103P2 / STB2:004 Earth fault Auxiliary circuit\n(ऑक्सिलरी कनवर्टर 3 के बाद 2 आइसोलेट होने पर {MCP में अर्थ फ़ॉल्ट})",
    lamp: "BPFA will glow, LSDJ will glow, VCB inhibited (BPFA प्रकाशित होगा, LSDJ प्रकाशित, VCB बाधित)",
    effect: "Converter 3 and 2 both isolated, VCB inhibited, main power OFF (कनवर्टर 3 व 2 दोनों आइसोलेट, VCB बाधित, मेन पावर ऑफ)",
    actions: [
      "A) If MCB No. 47.1/1 or 47.1/2 does not trip: (A) यदि MCB नं 47.1/1 या 47.1/2 ट्रिप नहीं होता है तो:)",
      "1. Switch OFF control electronics and turn it ON again HB-1 HB-2 MCB 47.1/1 47.1/2 - MCP. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके ऑन करें। HB-1 और HB-2 में लगे MCB नं 47.1/1 या 47.1/2 को ट्रिप करके एक-एक MCP को आइसोलेट करें।)",
      "2. Close VCB. If success is obtained on isolating MCP-1 or MCP-2, try to work with one MCP. (VCB क्लोज़ करें। यदि MCP-1 या MCP-2 को आइसोलेट करने पर सफलता मिलती है तो एक MCP के साथ काम करने का प्रयत्न करें।)",
      "B) If MCB 47.1/1 or 47.1/2 trips due to a defect in MCP motor: (B) यदि MCP की मोटर में दोष होने के कारण MCB 47.1/1 या 47.1/2 ट्रिप होता है तो:)",
      "a) MCB Switch OFF control electronics and turn it ON again. (MCB को रीसेट न करें। कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके ऑन करें।)",
      "b) Work train with one MCP. (एक MCP के साथ गाड़ी चलाएं।)",
      "C) MCB 54.1/2 , , Inform TLC. (MCB क्रम 54.1/2 को चेक करें, यदि ट्रिप है तो एक बार रीसेट करें, यदि फिर से ट्रिप होती है तो सेक्शन साफ़ करके TLC को सूचित करें और सहायता मांगें।)"
    ]
  },
  {
    id: "SS01-SCAV-EARTH-FAULT",
    subSystem: "SS01",
    message: "Auxiliary Converter-1 isolated after Converter-3 [Earth fault in Scavenge Blower]\nF0103P2 / STB2:004 Earth fault Auxiliary circuit\n(ऑक्सिलरी कनवर्टर 3 के बाद 1 आइसोलेट होने पर {स्कैवेंजिंग ब्लोअर में अर्थ फ़ॉल्ट})",
    lamp: "BPFA will glow, LSDJ will glow, VCB inhibited (BPFA प्रकाशित होगा, LSDJ प्रकाशित, VCB बाधित)",
    effect: "Converter 3 and 1 both isolated, VCB inhibited, main power OFF (कनवर्टर 3 व 1 दोनों आइसोलेट, VCB बाधित, मेन पावर ऑफ)",
    actions: [
      "A) If MCB No. 55.1/1 or 55.1/2 does not trip: (A) यदि MCB नं 55.1/1 या 55.1/2 ट्रिप नहीं होता है तो:)",
      "1. Switch OFF control electronics and turn it ON again HB-1 HB-2 MCB 55.1/1 55.1/2. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके ऑन करें। HB-1 और HB-2 में लगे MCB नं 55.1/1 या 55.1/2 को ट्रिप करके एक-एक स्कैवेंजिंग ब्लोअर को आइसोलेट करें।)",
      "2. Close VCB. If success is obtained on isolating Scavenging Blower-1 or 2, try to work with one Scavenging Blower. (VCB क्लोज़ करें। यदि स्कैवेंजिंग ब्लोअर-1 या स्कैवेंजिंग ब्लोअर-2 को आइसोलेट करने पर सफलता मिलती है तो एक स्कैवेंजिंग ब्लोअर के साथ काम करने का प्रयत्न करें।)",
      "B) If MCB 55.1/1 or 55.1/2 trips due to fault in scavenging blower motor: (यदि स्कैवेंजिंग ब्लोअर की मोटर में दोष होने के कारण MCB 55.1/1 या 55.1/2 ट्रिप होता है तो:)",
      "a) MCB Switch OFF control electronics and turn it ON again. (MCB को रीसेट न करें। कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके ऑन करें।)",
      "b) Work train with one scavenging blower. (एक स्कैवेंजिंग ब्लोअर के साथ गाड़ी चलाएं।)"
    ]
  },
  {
    id: "F1101P1",
    subSystem: "SS11",
    message: "MAIN COMPRESSOR 1 NOT WORKING\nCheck MCB of MCP 1",
    lamp: "LSFI will flicker & BPFA will glow (LSFI ब्लिंक करेगी, BPFA प्रकाशित होगा)",
    effect: "Main Reservoir (MR) pressure will drop (MR प्रेशर कम हो जायेगा)",
    actions: [
      "\" 0 \" Press BPFA to acknowledge fault. (थ्रोटल को \" 0 \" पर लायें। BPFA दबाकर फॉल्ट ACK करें।)",
      "Check MCB 47.1/1 for MCP-1 in SB-2 panel; if tripped, reset once. (SB-2 पैनल में MCP-1 का MCB (47.1/1) चेक करें, यदि ट्रिप है तो रिसेट करें।)",
      "Isolate BUR-1 and check. (BUR-1 को आइसोलेट करके चेक करें।)",
      "1 (MCP-1) , MCP-2 Inform TLC. (यदि फिर भी मेन कम्प्रेसर 1 (MCP-1) काम नहीं कर रहा है, तो MCP-2 पर निर्भर रहें और TLC को सूचित करें।)"
    ]
  },
  {
    id: "F0103P1",
    subSystem: "SS01",
    message: "LOW PRESSURE PANTO/FAULTY PANTO\nCheck Isolating Cock Check Aux. Reservoir Pressure",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "Pantograph will not raise (पेन्टो रेज़ नहीं होगा)",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को “ 0 ” पर लाएं। BPFA दबाकर फॉल्ट ACK करें।)",
      "2. Ensure blue key IG-38 on pneumatic panel is in horizontal position. In locomotives with KNORR-CCB-2 brakes, ensure IG-38 key is in vertical position. (सुनिश्चित करें कि न्यूमैटिक पैनल पर IG-38 (नीली चाबी) आड़ी स्थिति में लगी है। KNORR-CCB-2 ब्रेक वाले लोको में IG-38 key खड़ी स्थिति में लगी है।)",
      "3. Check whether MCPA is running. If not running, check MCB 48.1 (SB-2) of MCPA; if tripped, reset it once. (चेक करें कि MCPA चल रहा है या नहीं। यदि नहीं चल रहा है तो MCPA की MCB 48.1 (SB-2) को चेक करें, यदि ट्रिप हो तो उसे रीसेट करें।)",
      "4. If MCPA is still not running, gently tap pressure switch No. 26 (5th from left on pneumatic panel in E70 locos, or \"PANS-PS\" in CCB2 locos). (यदि फिर भी MCPA नहीं चल रहा है तो प्रेशर स्विच नं. 26 (E70 वाले लोको में न्यूमैटिक पैनल पर बाएं हाथ से पांचवां और CCB2 वाले लोको में “ PANS-PS ”) को धीरे से टैप करें।)",
      "5. Check that auxiliary reservoir gauge indicates more than 5.2 kg/cm² pressure. Ensure drain cock of MCPA on pneumatic panel is closed (must be parallel to pipe). (चेक करें कि ऑक्सिलरी रिज़र्वायर गेज में 5.2 kg/cm² से ज्यादा प्रेशर उपलब्ध है। न्यूमैटिक पैनल पर MCPA का ड्रेन कॉक बंद होना सुनिश्चित करें {पाइप के समानांतर होना चाहिए}।)",
      "6. Check that panto and VCB isolating cocks on pneumatic panel are open. Operate 2-3 times and ensure they are in horizontal position. (न्यूमैटिक पैनल पर पैंटो व VCB आइसोलेटिंग कॉक खुला होना चेक करें। दो-तीन बार ऑपरेट करें और आड़ी (हॉरिजॉन्टल) स्थिति में होना सुनिश्चित करें।)",
      "7. Try to raise pantograph. If not successful, change the position of panto selector switch (85) on pneumatic panel and try to raise the other pantograph. (पैंटो रेज़ करने का प्रयत्न करें। यदि सफलता नहीं मिलती है तो न्यूमैटिक पैनल पर पैंटो सिलेक्टर स्विच (85) की पोजीशन बदलकर दूसरा पैंटो रेज़ करने का प्रयत्न करें।)",
      "8. Panto circuit pressure is monitored by pressure switches 130.4/1 and 130.4/2. After giving panto raise command, if this switch does not pick up within 35 seconds, VCB will not close (if closed, it opens after 2 seconds). Gently tap switches 130.4/1 & 130.4/2 (i.e. 9/1 & 9/2 on E70 pneumatic panel, or \"PAN1-PS\" & \"PAN2-PS\" on CCB-2). Raise panto and close VCB. (पैंटो सर्किट के प्रेशर को 130.4/1 तथा 130.4/2 प्रेशर स्विच मॉनिटर करते हैं। पैंटो रेज़िंग की कमांड देने के बाद, यदि यह प्रेशर स्विच 35 सेकंड में पिकअप नहीं होता है तो VCB क्लोज नहीं होगा। यदि VCB क्लोज होता है तो वह 2 सेकंड के बाद खुल जायेगा। प्रेशर स्विच नं. 130.4/1 तथा 130.4/2 अर्थात 9/1 और 9/2, E70 वाले लोको में न्यूमैटिक पैनल पर और CCB2 वाले लोको में “ PAN1-PS तथा PAN2-PS ” को धीरे से टैप करें। पैंटो रेज़ करें तथा VCB क्लोज करें।)",
      "9. If not successful, change cab and/or change position of panto selector switch (85) on pneumatic panel and retry. (यदि सफलता नहीं मिलती है तो कैब बदलकर / पैंटो सिलेक्टर स्विच (85) {न्यूमैटिक पैनल पर} की पोजीशन बदलकर प्रयत्न करें।)",
      "10. If still unsuccessful, switch OFF control electronics once, turn it ON again and retry. (अगर सफलता नहीं मिलती है तो कंट्रोल इलेक्ट्रॉनिक्स को एक बार ऑफ कर फिर से ऑन करके प्रयत्न करें।)"
    ]
  },
  {
    id: "F0104P1",
    subSystem: "SS01",
    message: "CATENARY VOLTAGE OUT OF LIMIT\nWatch Catenary Voltmeter Close VCB When Voltage is OK",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "VCB will not trip when catenary voltage is between 17.5 kV and 29 kV (कैटनरी वोल्टेज 17.5 kv से 29 kv के बीच में VCB ट्रिप नहीं होगा)",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को “ 0 ” पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. If U-meter indicates \"0\", ensure pantograph touches OHE and check roof for damage: (यदि U मीटर “ 0 ” बताता है, तो पैंटो का OHE से स्पर्श होना सुनिश्चित करें, छत पर खराबी चेक करें:)",
      "• If pantograph does not touch OHE, raise other pantograph and work train. (यदि पैंटो OHE से स्पर्श नहीं करता तो दूसरा पैंटो उठाकर कार्य करें।)",
      "• If there is damage on roof, contact TPC/TLC. (यदि छत पर खराबी है तो TPC/TLC से संपर्क करें।)",
      "• If no roof damage, check for arcing to confirm OHE tension: (यदि छत पर खराबी नहीं है तो OHE टेंशन के लिए आर्किंग चेक करें:)",
      "a) If no arcing: Act as per No Tension procedure, contact TPC/TLC and act as instructed. (a) यदि आर्किंग नहीं होती है तो No tension से संबंधित कार्यवाही करें, TPC/TLC से संपर्क करें और आदेशानुसार कार्यवाही करें।)",
      "b) If arcing occurs: Lower pantograph and replace 2 Amp PT fuse in SB-1 panel with spare fuse; on success, resume normal operation. (b) यदि आर्किंग होती है तो पैंटो लोअर करके SB-1 पैनल पर 2 Amp के फ्यूज को अतिरिक्त फ्यूज से बदल दें। सफलता मिलने पर सामान्य तौर पर कार्य करें।)",
      "c) If 2 Amp fuse is not melted: Wait until OHE voltage normalizes between 17.5 kV and 29 kV; then close VCB and resume traction. (c) यदि 2 Amp का फ्यूज नहीं पिघला है तो OHE Voltage 17.5 kv से 29 kv के बीच आने तक इंतज़ार करें। वोल्टेज सामान्य होने पर VCB क्लोज़ करें, ट्रैक्शन चालू करें।)",
      "3. If U-meter indicates OHE Voltage between 17.5 kV and 29 kV, isolate Traction Converter 1 & 2 as per following message: (यदि U मीटर OHE Voltage 17.5 kV से 29 kV के बीच बताता है तो ट्रैक्शन कनवर्टर 1 व 2 को निम्न मैसेज के अनुसार आइसोलेट करें:)",
      "{i} If DDS displays message SLG-1:0020, locomotive pilot isolate Traction Converter-1 via MCB 127.1/1 & 127.11/1 (SB-1) with MCE OFF. ({i} यदि DDS पर मैसेज SLG-1:0020 आता है तो लोको पायलट ट्रैक्शन कनवर्टर 1 को MCB 127.1/1 एवं 127.11/1 {SB-1} के द्वारा आइसोलेट करें {MCE OFF करके}।)",
      "{ii} If DDS displays message SLG-2:0020, isolate Traction Converter-2 via MCB 127.1/2 & 127.11/2 (SB-2) with MCE OFF. ({ii} यदि DDS पर मैसेज SLG-2:0020 आता है तो ट्रैक्शन कनवर्टर 2 को MCB 127.1/2 एवं 127.11/2 {SB-2} के द्वारा आइसोलेट करें {MCE OFF करके}।)",
      "4. If unsuccessful, switch OFF control electronics and turn it ON again (MCE OFF/ON). Resume traction. (यदि सफलता नहीं मिलती है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करके ऑन करें। ट्रैक्शन चालू करें।)",
      "5. If still unsuccessful, change pantograph and retry. (यदि फिर भी सफलता नहीं मिलती है तो पैंटो बदलकर प्रयत्न करें।)",
      "6. Change cab and retry. (कैब बदलकर प्रयत्न करें।)"
    ]
  },
  {
    id: "F0104P1-WAP5-MU",
    subSystem: "SS01",
    message: "CATENARY VOLTAGE OUT OF LIMIT\n(From Slave loco only during WAP5 MU with single panto)",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "Catenary voltage out of limit from slave loco, VCB opens (स्लेव लोको से कैटनरी वोल्टेज आउट ऑफ लिमिट, VCB ओपन)",
    actions: [
      "Bring throttle to \"0\". Inspect the HV connecting cable between both locomotives. If the HV cable is damaged, isolate slave loco electrically by pressing BPISO and opening both isolators of slave loco; operate train as a single locomotive. (Warning: Do not open mechanical coupling of MU, otherwise HV cable may be damaged. If HV cable is intact, then:-). (थ्रोटल को “ 0 ” पर लाएं। दोनों लोको के बीच HV कनेक्टिंग केबल चेक करें। अगर HV केबल क्षतिग्रस्त हो गई है, तो {BPISO दबाकर} स्लेव लोको के दोनों आइसोलेटर खोलकर उसे इलेक्ट्रिकली आइसोलेट करें। सिंगल लोको की तरह ऑपरेट करें।★ चेतावनी: MU की मैकेनिकल कपलिंग ओपन न करें, अन्यथा HV केबल क्षतिग्रस्त हो सकती है।★ अगर HV केबल ठीक है तो:-)",
      "Check 2 Amp PT fuse (SB-1) of rear (slave) loco. If melted, lower pantograph and replace with spare fuse. Check OHE voltage; if normal, close VCB and resume traction. (पीछे वाले (स्लेव) लोको का 2 Amp का PT फ्यूज (SB-1) चेक करें। अगर मेल्ट है तो पैंटो लोअर करके अतिरिक्त फ्यूज से बदलें। OHE वोल्टेज चेक करें, अगर सामान्य है तो VCB क्लोज करें तथा ट्रैक्शन लें।)",
      "If 2 Amp fuse is not melted, wait for OHE voltage to normalize between 17.5 kV and 29 kV. When voltage is normal, close VCB and resume traction. (यदि 2 Amp का फ्यूज मेल्ट नहीं है तो OHE वोल्टेज 17.5 kV से अधिक तथा 29 kV से कम होने का इंतज़ार करें। वोल्टेज सामान्य होने पर VCB क्लोज करें तथा ट्रैक्शन लें।)",
      "Switch OFF control electronics once and turn it ON (MCE OFF/ON). Try to resume traction. (एक बार कंट्रोल इलेक्ट्रॉनिक्स ऑफ करके ऑन (MCE OFF/ON) करें। ट्रैक्शन लेने का प्रयत्न करें।)",
      "If still unsuccessful, change pantograph and retry. (यदि फिर भी सफलता नहीं मिलती है तो पैंटो बदलकर प्रयत्न करें।)",
      "Change cab and retry. (कैब बदलकर प्रयत्न करें।)",
      "Isolate slave locomotive and retry. (स्लेव लोको को आइसोलेट करके प्रयत्न करें।)"
    ]
  },
  {
    id: "F0105P1",
    subSystem: "SS01",
    message: "TRANSFORMER OIL TEMPERATURE OR PRESSURE NOT OK\nTE/BE reduction or VCB trips\nTry to close VCB, if open",
    lamp: "LSFI will flicker & BPFA will glow (LSFI ब्लिंक करेगी और BPFA प्रकाशित होगा)",
    effect: "TE/BE कम हो जाएगा या VCB ट्रिप हो जाएगा",
    actions: [
      "If TE is available, clear block section. Otherwise try to clear block section while coasting. (यदि TE उपलब्ध है तो ब्लॉक सेक्शन क्लियर करें। अन्यथा कोस्टिंग करते हुए ब्लॉक सेक्शन क्लियर करने का प्रयत्न करें।)",
      "Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को “ 0 ” पर लाएं। BPFA दबाकर फॉल्ट ACK करें।)",
      "VCB , Press BPFA to acknowledge fault, Close VCB, (). (यदि VCB ट्रिप होता है, तो BPFA दबाकर फॉल्ट ACK करें, VCB क्लोज करें, कोस्टिंग करते हुए ब्लॉक सेक्शन साफ (क्लियर) करने का प्रयत्न करें।)",
      "Check underframe transformer oil pumps MCB 62.1/1 in HB-1 and MCB 62.1/2 in HB-2. If tripped, open VCB and reset once. If transformer oil pumps do not run: a) Switch OFF control electronics and turn ON (MCE OFF/ON). b) Keep loco in idle for 10 minutes. (अंडरफ्रेम में लगे ट्रांसफार्मर के ऑयल पंप HB-1 में लगे MCB 62.1/1 तथा HB-2 में लगे MCB 62.1/2 की जांच करें। यदि ट्रिप हो तो VCB को ओपन करके एक बार रीसेट करें। यदि ट्रांसफार्मर के ऑयल पंप नहीं चल रहे हों तो:- a) कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करके ऑन (MCE OFF/ON) करें। b) लोको को 10 मिनट आइडल (Idle) स्थिति में रखें।)",
      "Check oil level on expansion tank oil gauge near oil cooling blower in machine room. It must be between MAX and MIN. (मशीन रूम में ऑयल कूलिंग ब्लोअर के पास ट्रांसफार्मर के एक्सपेंशन टैंक पर लगे ऑयल गेज पर तेल का लेवल चेक करें। यह अधिकतम तथा न्यूनतम के बीच में होना चाहिए।)",
      "Loco pilot must ensure operation of oil cooling blowers in machine room. If not working, check MCB 59.1/1 in HB-1 and MCB 59.1/2 in HB-2. If tripped, open VCB and reset once. If oil cooling blowers still do not run: a) Switch OFF control electronics and turn ON. b) Keep loco in idle for 10 minutes. If impeller or casing of oil cooling blower is damaged: a) Isolate blower by tripping MCB 59.1/1 or 59.1/2. b) Trip MCB 63.1/1 or 63.1/2 for traction converter pump. c) Trip MCB 62.1/1 or 62.1/2 for transformer oil pump. (Note: Operate MCBs with VCB open and MCE OFF. Isolate bogie via switch 154 in SB-1, turn ON MCE, raise panto, close VCB and work with one bogie in consultation with TLC). (लोको पायलट मशीन रूम में लगे ऑयल कूलिंग ब्लोअर का चलना सुनिश्चित करें। यदि नहीं चल रहे हों तो चेक करें कि HB-1 में MCB 59.1/1 तथा HB-2 में MCB 59.1/2 ट्रिप तो नहीं है। यदि ट्रिप हो तो VCB ओपन करके एक बार रीसेट करें। यदि फिर भी न चलें तो MCE OFF/ON करें और 10 मिनट आइडल रखें। यदि इम्पेलर या केसिंग क्षतिग्रस्त हो तो संबंधित MCB ट्रिप कर बोगी को स्विच 154 द्वारा आइसोलेट करें और TLC से सलाह कर एक बोगी से कार्य करें।)",
      "Try to resume traction. (ट्रैक्शन चालू करने का प्रयत्न करें।)"
    ]
  },
  {
    id: "F0105P1-DEAD",
    subSystem: "SS01",
    message: "MAIN POWER ISOLATED\nVCB Inhibited Loco is dead",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "Main power isolated, VCB close inhibited, locomotive is dead (मेन पावर आइसोलेट होगी, VCB क्लोज होना बाधित, लोको डेड)",
    actions: [
      "MCBs Bring throttle to \"0\". (यदि फिर से वही मैसेज आता है और MCBs सामान्य हैं तो थ्रोटल को “ 0 ” पर लाएं।)",
      "Switch OFF control electronics and turn it ON again. Raise pantograph, close VCB and resume traction. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करके फिर से ऑन करें, पैंटो को रेज़ करें तथा VCB क्लोज करें। ट्रैक्शन चालू करें।)",
      "If not successful - if DDS displays SLG-1:0019, isolate Traction Converter-1 via MCB 127.1/1 & 127.11/1 (SB-1); if SLG-2:0019, isolate Traction Converter-2 via MCB 127.1/2 & 127.11/2 (SB-2) with MCE OFF. (सफलता न मिलने पर - यदि DDS पर मैसेज, SLG-1:0019 का आता है तो ट्रैक्शन कनवर्टर-1 को MCB 127.1/1 एवं 127.11/1 (SB-1) और SLG-2:0019 का आता है तो ट्रैक्शन कनवर्टर-2 को MCB 127.1/2 एवं 127.11/2 (SB-2) के द्वारा आइसोलेट करें। (MCE ऑफ करके)।)",
      "If not successful: Demand assistance engine within 20 minutes. (यदि सफलता नहीं मिलती है तो 20 मिनट के अंदर सहायता इंजन की मांग करें।)"
    ]
  },
  {
    id: "F0106P1",
    subSystem: "SS01",
    message: "FILTER ON/OFF CONTACTOR STUCK ON\nVCB will not close again",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "Harmonic filter ON/OFF contactor stuck ON, VCB will not close again, 40 km/h speed restriction (हार्मोनिक फिल्टर ऑन/ऑफ कॉन्टैक्टर स्टक ऑन, VCB दोबारा क्लोज नहीं होगा, 40 kmph गति प्रतिबंध)",
    actions: [
      "VIf VCB opens, it will not close again. (Vयदि VCB ओपन होता है तो पुनः क्लोज नहीं होगा।)",
      "Bring throttle to \"0\" Press BPFA to acknowledge fault , Close VCB. (थ्रोटल को “ 0 ” पर लाएं और BPFA दबाकर फॉल्ट ACK करें। कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करके एक बार पुनः ऑन करें। पैंटोग्राफ रेज़ करें, VCB क्लोज करें यदि लोको सामान्य हो जाता है तो ट्रैक्शन चालू करें।)",
      "Harmonic filter will auto-isolate and loco pilot can operate at 40 km/h. (हार्मोनिक फ़िल्टर अपने आप आइसोलेट होगा और लोको पायलट 40 kmph की गति से कार्य कर सकता है।)"
    ]
  },
  {
    id: "F0106P1-DEAD",
    subSystem: "SS01",
    message: "MAIN POWER ISOLATED\nVCB Inhibited Loco is dead",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "Main power isolated, VCB close inhibited, locomotive is dead (मेन पावर आइसोलेट होगी, VCB क्लोज होना बाधित, लोको डेड)",
    actions: [
      "If unsuccessful, check DDS message — if DDS message SLG-1:0059 appears, isolate Traction Converter-1 via MCB 127.1/1 & 127.11/1 (SB-1) and place switch 154 (SB-1) to \"I\" and try. (सफलता न मिलने पर DDS पर मैसेज चेक करें — यदि DDS पर मैसेज, SLG-1:0059 का आता है तो ट्रैक्शन कनवर्टर-1 को MCB 127.1/1 एवं 127.11/1 (SB-1) और 154 (SB-1) को “ I ” पर रखकर आइसोलेट करके प्रयत्न करें।)",
      "If not successful: Record in log book. (यदि सफलता नहीं मिलती तो सहायता इंजन की मांग करें व लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0107P1",
    subSystem: "SS01",
    message: "PRECHARGE OR MAIN CONTACTOR STUCK ON\nMain converter blocked",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "Main converter blocked, precharge or main contactor stuck ON; work isolating one bogie (मेन कनवर्टर ब्लॉक, प्रीचार्ज या मेन कॉन्टैक्टर स्टक ऑन, एक बोगी आइसोलेट कर कार्य)",
    actions: [
      "Bring throttle to \"0\". Try to clear block section while coasting. (थ्रोटल को “ 0 ” पर लाएं। कोस्टिंग करते हुए ब्लॉक सेक्शन क्लियर करने का प्रयत्न करें।)",
      "Press BPFA to acknowledge fault. Switch OFF control electronics and turn ON again. Raise pantograph, close VCB and resume normal traction. (BPFA दबाकर फॉल्ट ACK करें। कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करके एक बार पुनः ऑन करें। पैंटो रेज़ करें, VCB क्लोज करें तथा ट्रैक्शन चालू करें।)",
      "If not successful, isolate relevant Traction Converter as per DDS message and clear block section with one bogie in service: (i) If DDS shows SLG-1:0037 or 0039, isolate Traction Converter-1 via MCB 127.1/1 & 127.11/1 (SB-1). (ii) If DDS shows SLG-2:0037 or 0039, isolate Traction Converter-2 via MCB 127.1/2 & 127.11/2 (SB-2). Inform TLC and act as advised. (यदि सफलता नहीं मिलती है तो निम्न DDS मैसेज के अनुसार संबंधित ट्रैक्शन कनवर्टर को आइसोलेट करके एक बोगी से सेक्शन क्लियर करें: (i) यदि DDS पर SLG-1:0037 या 0039 हो तो ट्रैक्शन कनवर्टर-1 को MCB 127.1/1 व 127.11/1 (SB-1) द्वारा आइसोलेट करें। (ii) यदि DDS पर SLG-2:0037 या 0039 हो तो कनवर्टर-2 को MCB 127.1/2 व 127.11/2 (SB-2) द्वारा आइसोलेट करें। TLC को सूचित करें।)",
      "Demand assistance engine within 20 minutes. (सफलता न मिलने पर 20 मिनट के अंदर सहायता इंजन की मांग करें।)"
    ]
  },
  {
    id: "F0107P1-DEAD",
    subSystem: "SS01",
    message: "MAIN POWER ISOLATED\nVCB inhibited Loco is dead",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "Main power isolated, VCB close inhibited, locomotive is dead (मेन पावर आइसोलेट होगी, VCB क्लोज होना बाधित, लोको डेड)",
    actions: [
      "Switch OFF control electronics and turn it ON again , Close VCB. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करके ऑन करें। पैंटोग्राफ रेज़ करें, VCB क्लोज करें तथा ट्रैक्शन चालू करें।)",
      "If VCB does not close, shut down the locomotive. (यदि VCB क्लोज नहीं हो रहा है तो लोको को शट-डाउन करें।)",
      "Demand assistance engine within 20 minutes. (20 मिनट के अंदर सहायता इंजन की मांग करें।)"
    ]
  },
  {
    id: "F0108P1",
    subSystem: "SS01",
    message: "PRIMARY OVER CURRENT\nCheck over current relay flag\nClose VCB after unlocking relay",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "VCB क्लोजिंग/होल्डिंग कॉइल की पावर सप्लाई मैक्सिमम करंट रिले (OCR 78) के द्वारा बाधित होगी",
    actions: [
      "VDo not close VCB before inspecting the locomotive. Inspect OCR (78) and all oil points in machine room. If any abnormality is noticed, act per safety rules and immediately demand relief engine. (Vलोको की जांच करने से पहले VCB को क्लोज न करें। मशीन रूम में OCR (78) तथा सभी ऑयल पॉइंट्स चेक करें। यदि कोई असामान्यता दिखाई दे तो मानक सुरक्षा नियमानुसार कार्यवाही करें और बिना समय गंवाए सहायता इंजन मांगें।)",
      "Clear block section while coasting Press BPFA to acknowledge fault. (यदि कोई असामान्यता नहीं है तो कोस्टिंग करते हुए ब्लॉक सेक्शन क्लियर करें और गाड़ी को खड़ी करें। BPFA दबाकर फॉल्ट ACK करें।)",
      "Inspect target flag of OCR-78 relay on SB-1 panel. (SB-1 पैनल पर OCR-78 रिले के टारगेट की जांच करें।)",
      "Check for any oil spillage in the machine room. (मशीन रूम में तेल का बिखराव चेक करें।)",
      "Min. Max. ( ) - Demand assistance engine within 20 minutes. (मशीन रूम में ऑयल कूलिंग यूनिट के पास ट्रांसफॉर्मर के दोनों एक्सपेंशन टैंक तथा दोनों ट्रैक्शन कनवर्टर के एक्सपेंशन टैंक में ऑयल लेवल चेक करें। यह Min. तथा Max. के बीच होना चाहिए। यदि कोई असामान्यता (जैसे तेल का बिखराव या अत्यधिक तापमान) हो तो लोको को शट-डाउन करें। 20 मिनट के अंदर सहायता इंजन की मांग करें।)",
      "If OCR-78 (SB-1) target is dropped but no oil leakage is visible and oil levels in all four gauges are between Min and Max, reset relay by turning knob clockwise until flag resets. (यदि OCR-78 (SB-1) का टारगेट गिरा है परंतु किसी भी प्रकार का तेल बिखराव नहीं दिखता है एवं चारों ऑयल गेज में तेल Min. तथा Max. के बीच है तो रिले के नॉब को clockwise घुमाकर रीसेट करें, रिले का फ्लैग हट जाएगा।)",
      "Close VCB using BLDJ, inform TLC and record in locomotive log book. (BLDJ द्वारा VCB क्लोज करें एवं TLC को सूचित करके लॉग बुक में दर्ज करें।)",
      "If above steps are unsuccessful and VCB does not close, demand relief engine without losing time. (यदि एक बार में उपरोक्त अनुसार सफलता न मिले और VCB क्लोज नहीं होता है तो बिना समय गंवाए सहायता इंजन की मांग करें।)"
    ]
  },
  {
    id: "F0108P1-DEAD",
    subSystem: "SS01",
    message: "MAIN POWER ISOLATED\nVCB inhibited Loco is dead",
    lamp: "LSDJ & LSFI will glow (LSDJ और LSFI प्रकाशित होंगे)",
    effect: "VCB क्लोज नहीं होगा, लोको डेड",
    actions: [
      "If not successful on first attempt, demand relief engine without losing time. (यदि एक बार में सफलता न मिले तो बिना समय गंवाए सहायता इंजन की मांग करें।)"
    ]
  },
  {
    id: "QLM-RELAY-DROP",
    subSystem: "SS01",
    message: "QLM रिले ड्रॉप होना एवं DJ/VCB ट्रिप होना\nQLM RELAY DROPPING & DJ/VCB TRIPPING\n(Primary Over Current Relay OCR-78 / QLM Relay)",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "DJ/VCB ट्रिप होगा, लोको पावर कट जाएगी (DJ/VCB will trip, loco power will cut off)",
    actions: [
      "【Situation 1: QLM drops alone & DJ/VCB trips - स्थिति 1: QLM अकेली ड्रॉप होती है और DJ/VCB ट्रिप होता है】",
      "• Inspection: Check whether there is any oil spillage or leakage in Transformer and GR, ensure oil is not accumulated in oil trap chamber, and check Transformer, RPGR, CGR, RGR, main bushing and bus bar connections etc. for any defect. (जांच: ट्रांसफॉर्मर और GR में तेल का बिखराव या तेल का लीकेज तो नहीं है, ऑयल ट्रैप चैंबर में तेल भरा तो नहीं है व ट्रांसफॉर्मर, RPGR, CGR, RGR, मेन बुशिंग और बस बार कनेक्शन इत्यादि में कोई खराबी तो नहीं है इसकी जांच करें।)",
      "a) If any defect is noticed or oil is spilled: Demand assistance. (a) यदि कोई खराबी है या तेल बिखरा है तो सहायता मांगें।)",
      "b) If no defect is found: Reset relay by rotating knob clockwise, close DJ/VCB. (b) यदि कोई खराबी नहीं पाई जाती है तो रिले को क्लॉक वाइज घुमाकर रीसेट करें, DJ/VCB क्लोज करें।)",
      "• If QLM drops again: Demand assistance. (यदि QLM फिर से ड्रॉप होती है तो सहायता मांगें।)",
      "• Note: QLM can be reset only once. (नोट :- QLM को केवल एक ही बार रीसेट किया जा सकता है।)",
      "【Situation 2 (A): QLM drops along with any other relay & DJ/VCB trips - स्थिति 2 (A): QLM किसी अन्य रिले के साथ ड्रॉप होती है और DJ/VCB ट्रिप होता है】",
      "• Inspection: Check winding circuit whether oil of tap changer / main transformer has spilled and check that their oil level is correct, GR safety valves are not blowing, CGR 1, 2, 3 and their arc chute covers are intact, and no smoke or sparks are emitting from main bushing / insulators or any equipment. (जांच: वाइंडिंग सर्किट को चेक करें कि कहीं टैप चेंजर / मेन ट्रांसफॉर्मर का तेल तो नहीं बिखरा है तथा उनका तेल लेवल सही है, GR सेफ्टी वाल्व ब्लो नहीं कर रहे हैं, CGR 1,2,3 और उनके आर्कच्यूट कवर सही हैं, मेन बुशिंग / इंसुलेटर तथा किसी उपकरण में से धुआं, चिंगारी तो नहीं निकल रही है।)",
      "a) If any abnormality is noticed: Demand assistance. (a) यदि कोई असामान्यता मिलती है तो सहायता मांगें।)",
      "b) If no abnormality is noticed: Check for fault in traction power circuit / auxiliary circuit. (b) यदि कोई असामान्यता नहीं मिलती है तो ट्रैक्शन पावर सर्किट / ऑक्सिलरी सर्किट में खराबी ढूंढें।)",
      "c) If any defect is found: Isolate the defective equipment, reset relays and work train. (c) यदि कोई खराबी मिलती है तो खराबी वाले उपकरणों को आइसोलेट करें, रिले को रीसेट करें और गाड़ी चलाएं।)",
      "d) If no defect is found: Reset relays and work train. (d) यदि कोई खराबी नहीं मिलती है तो रिले को रीसेट करें और गाड़ी चलाएं।)",
      "e) Locomotive should be thoroughly inspected by maintenance staff at nearest possible station; Inform TLC. (e) नजदीकी संभव स्थान पर मेंटेनेंस स्टाफ द्वारा लोको का पूर्ण निरीक्षण किया जाए। टीएलसी को सूचित करें।)",
      "【Situation 3 (B): QLM drops again with any other relay & DJ/VCB trips - स्थिति 3 (B): QLM किसी अन्य रिले के साथ दोबारा ड्रॉप होती है और DJ/VCB ट्रिप होता है】",
      "1. Do not reset the relay. Demand assistance. (1. रिले को रीसेट न करें। सहायता मांगें।)"
    ]
  },
  {
    id: "QLM-ALONE-DROP",
    subSystem: "SS01",
    message: "1. QLM अकेली ड्रॉप होती है और DJ/VCB ट्रिप होता है\nQLM DROPS ALONE AND DJ/VCB TRIPS\n(मेन ट्रांसफॉर्मर प्राइमरी ओवरकरंट सुरक्षा रिले QLM - स्थिति 1)",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "DJ/VCB ट्रिप होगा, लोको पावर कट जाएगी (DJ/VCB will trip, loco power cut off)",
    actions: [
      "• Inspection: Check whether there is any oil spillage or leakage in Transformer and GR, ensure oil is not accumulated in oil trap chamber, and check Transformer, RPGR, CGR, RGR, main bushing and bus bar connections etc. for any defect. (जांच: ट्रांसफॉर्मर और GR में तेल का बिखराव या तेल का लीकेज तो नहीं है, ऑयल ट्रैप चैंबर में तेल भरा तो नहीं है व ट्रांसफॉर्मर, RPGR, CGR, RGR, मेन बुशिंग और बस बार कनेक्शन इत्यादि में कोई खराबी तो नहीं है इसकी जांच करें।)",
      "a) If any defect is noticed or oil is spilled: Demand assistance. (a) यदि कोई खराबी है या तेल बिखरा है तो सहायता मांगें।)",
      "b) If no defect is found: Reset relay by rotating knob clockwise, close DJ/VCB. (b) यदि कोई खराबी नहीं पाई जाती है तो रिले को क्लॉक वाइज घुमाकर रीसेट करें, DJ/VCB क्लोज करें।)",
      "• If QLM drops again: Demand assistance. (यदि QLM फिर से ड्रॉप होती है तो सहायता मांगें।)",
      "• Note: QLM can be reset only once. (नोट :- QLM को केवल एक ही बार रीसेट किया जा सकता है।)"
    ]
  },
  {
    id: "QLM-WITH-OTHER-RELAYS",
    subSystem: "SS01",
    message: "(A) QLM किसी अन्य रिले के साथ ड्रॉप होती है और DJ/VCB ट्रिप होता है\nQLM DROPS ALONE WITH ANOTHER RELAY AND DJ/VCB TRIPS\n(सुरक्षा रिले ट्रिपिंग: QLM + OCR / अन्य रिले)",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "DJ/VCB ट्रिप होगा, लोको पावर कट जाएगी (DJ/VCB will trip, loco power will cut off)",
    actions: [
      "• Inspection: Check winding circuit whether oil of tap changer / main transformer has spilled and check that their oil level is correct, GR safety valves are not blowing, CGR 1, 2, 3 and their arc chute covers are intact, and no smoke or sparks are emitting from main bushing / insulators or any equipment. (जांच: वाइंडिंग सर्किट को चेक करें कि कहीं टैप चेंजर / मेन ट्रांसफॉर्मर का तेल तो नहीं बिखरा है तथा उनका तेल लेवल सही है, GR सेफ्टी वाल्व ब्लो नहीं कर रहे हैं, CGR 1,2,3 और उनके आर्कच्यूट कवर सही हैं, मेन बुशिंग / इंसुलेटर तथा किसी उपकरण में से धुआं, चिंगारी तो नहीं निकल रही है।)",
      "a) If any abnormality is noticed: Demand assistance. (a) यदि कोई असामान्यता मिलती है तो सहायता मांगें।)",
      "b) If no abnormality is noticed: Check for fault in traction power circuit / auxiliary circuit. (b) यदि कोई असामान्यता नहीं मिलती है तो ट्रैक्शन पावर सर्किट / ऑक्सिलरी सर्किट में खराबी ढूंढें।)",
      "c) If any defect is found: Isolate the defective equipment, reset relays and work train. (c) यदि कोई खराबी मिलती है तो खराबी वाले उपकरणों को आइसोलेट करें, रिले को रीसेट करें और गाड़ी चलाएं।)",
      "d) If no defect is found: Reset relays and work train. (d) यदि कोई खराबी नहीं मिलती है तो रिले को रीसेट करें और गाड़ी चलाएं।)",
      "e) Locomotive should be thoroughly inspected by maintenance staff at nearest possible station; Inform TLC. (e) नजदीकी संभव स्थान पर मेंटेनेंस स्टाफ द्वारा लोको का पूर्ण निरीक्षण किया जाए। टीएलसी को सूचित करें।)"
    ]
  },
  {
    id: "QLM-REPEAT-DROP",
    subSystem: "SS01",
    message: "(B) QLM किसी अन्य रिले के साथ दोबारा ड्रॉप होती है और DJ/VCB ट्रिप होता है\nQLM DROPS AGAIN ALONG WITH ANOTHER RELAY AND DJ/VCB TRIPS\n(QLM रिले दोबारा ड्रॉप होना - रीसेट वर्जित)",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "DJ/VCB ट्रिप होगा, लोको पावर कट जाएगी (DJ/VCB will trip, loco power will cut off)",
    actions: [
      "1. Do not reset the relay. Demand assistance. (1. रिले को रीसेट न करें। सहायता मांगें।)"
    ]
  },
  {
    id: "F0109P1",
    subSystem: "SS01",
    message: "AUX. WINDING OVER CURRENT\nTry to close VCB again",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "VCB will trip (VCB ट्रिप होगा)",
    actions: [
      "Press BPFA to acknowledge fault. Press BLDJ to close VCB. (BPFA दबाकर फ़ॉल्ट ACK करें। VCB को क्लोज़ करने के लिए BLDJ दबाएं।)",
      "If the fault persists, isolation message will appear; press ENTER key to acknowledge. (यदि दोष बना ही रहता है तो आइसोलेशन मैसेज आएगा, ENTER बटन दबाकर ACK करें।)",
      "Clear block section while coasting. (कोस्टिंग करते हुए ब्लॉक सेक्शन क्लियर करें और गाड़ी को खड़ी करें।)"
    ]
  },
  {
    id: "F0109P1-DEAD",
    subSystem: "SS01",
    message: "MAIN POWER ISOLATED\nVCB inhibited Loco is dead",
    lamp: "LSDJ & LSFI will glow (LSDJ और LSFI प्रकाशित होंगे)",
    effect: "VCB will not close, locomotive is dead (VCB क्लोज़ नहीं होगा, लोको डेड)",
    actions: [
      "Switch OFF control electronics and turn it ON again. Raise pantograph, close VCB and resume normal traction. (कंट्रोल इलेक्ट्रॉनिक्स को एक बार फिर ऑफ़ करके ऑन करें। पैंटोग्राफ रेज़ करें, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "VIf VCB does not close, shut down the locomotive. (Vयदि VCB क्लोज़ नहीं होता है तो लोको को शट-डाउन करें।)",
      "Check background messages on DDS. According to message, isolate BUR-1, BUR-2 or BUR-3 via MCB 127.22/1, 127.22/2 or 127.22/3 with MCE OFF and retry. (DDS पर बैकग्राउंड मैसेज चेक करें, और मैसेज के अनुसार BUR-1, BUR-2 या BUR-3 को MCB 127.22/1 या MCB 127.22/2 या MCB 127.22/3 के द्वारा आइसोलेट करके प्रयत्न करें। (MCE ऑफ़ करके)।)",
      "Demand assistance engine within 20 minutes. (सफलता न मिलने पर 20 मिनट के अंदर सहायता इंजन की मांग करें।)"
    ]
  },
  {
    id: "F0110P1",
    subSystem: "SS01",
    message: "FATAL ERROR IN MAIN CIRCUIT\nTurn OFF the Loco",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगा)",
    effect: "VCB ट्रिप होगा और पैंटोग्राफ लोअर हो जाएगा",
    actions: [
      "\"0\" Press BPFA to acknowledge fault. (थ्रॉटल को \"0\" पर लाएं और BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "Check MCBs on HB/SB panels. If tripped, reset once. (HB/SB पैनल में MCBs को चेक करें। यदि ट्रिप हों तो एक बार रीसेट करें।)",
      "Switch OFF control electronics and turn it ON again. Raise pantograph, close VCB and resume normal traction. (कंट्रोल इलेक्ट्रॉनिक्स को एक बार फिर ऑफ़ करके ऑन करें। पैंटो रेज़ करें, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "If more than one subsystem is isolated (applicable after implementation of RDSO modification letter No. RDSO/2013/EL/MS/0420, Rev \"0\" dated 23.01.13). (एक से ज़्यादा सब-सिस्टम आइसोलेट हों (RDSO का मॉडिफिकेशन पत्र सं. RDSO/2013/EL/MS/0420, Rev. \"0\" Dated 23.01.13 के कार्यान्वयन के बाद ही यह लागू होगा)।)"
    ]
  },
  {
    id: "F0110P1-DEAD",
    subSystem: "SS01",
    message: "MAIN POWER ISOLATED\nVCB inhibited Loco is dead",
    lamp: "LSDJ & LSFI will glow (LSDJ और LSFI प्रकाशित होंगे)",
    effect: "VCB will not close (VCB क्लोज़ नहीं होगा)",
    actions: [
      "OCB, TMB, (MPH-C) MCP SS-01 If not successful. (OCB, TMB, कन्वर्टर पंप (MPH-C) व MCP के लिए SS-01 के अंत में दिए गए अतिरिक्त मदों के अनुसार दोष निवारण करें। यदि सफलता नहीं मिलती है तो -।)",
      "Switch OFF control electronics and turn it ON again. Raise pantograph, close VCB and resume normal traction. (कंट्रोल इलेक्ट्रॉनिक्स को एक बार फिर ऑफ़ करके ऑन करें। पैंटो रेज़ करें, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "VIf VCB does not close, shut down the locomotive. (Vयदि VCB क्लोज़ नहीं होता है तो लोको को शट-डाउन करें।)",
      "Demand assistance engine within 20 minutes. (20 मिनट के अंदर सहायता इंजन की मांग करें।)"
    ]
  },
  {
    id: "F0201P1",
    subSystem: "SS02",
    message: "DISTURBANCE IN CONVERTER 1\nTry to close VCB again",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "VCB will open (VCB ओपन होगा)",
    actions: [
      "\" 0 \" Press BPFA to acknowledge fault. (थ्रोटल को \" 0 \" पर लायें। BPFA दबाकर फॉल्ट ACK करें।)",
      "Check MCB 127.1/1 (SB1). If tripped, switch OFF control electronics and reset once. (MCB 127.1/1 (SB1) चैक करें। यदि ट्रिप है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करके एक बार रिसेट करें।)",
      "VPress BLDJ to close VCB. (VVCB क्लोज करने के लिए BLDJ प्रेस करें।)",
      "If the same message repeats, switch OFF control electronics and turn ON after 5 minutes. Raise panto, close VCB and resume traction if locomotive normalizes. (यदि वही मैसेज दुबारा आता है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करके 5 मिनट बाद ऑन करें। पेन्टो रेज़ करें, VCB क्लोज करें यदि लोको सामान्य होता है तो ट्रैक्शन चालू करें।)",
      "If same message repeats and Bogie-1 is not isolated automatically, isolate Bogie-1 via MCB 127.1/1 & 127.11/1 on SB-1 panel (with MCE OFF). (यदि वही मैसेज दुबारा आता है और ट्रैक्शन बोगी-1 अपने आप आइसोलेट नहीं होती है तो SB-1 पैनल में लगे MCB 127.1/1 एवं 127.11/1 (SB-1) द्वारा बोगी-1 को आइसोलेट करें। (MCE ऑफ करके)।)",
      "Inform TLC DDS Record in log book. (TLC को सूचित करें तथा बोगी आइसोलेट करने से पहले आये हुए DDS मैसेज को लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "SS02-BOGIE1-ISOLATED",
    subSystem: "SS02",
    message: "BOGIE 1 ISOLATED :\nOnly half traction and electrical braking power available\nPress <Enter>",
    lamp: "LSFI will glow (LSFI प्रकाशित होगी)",
    effect: "Bogie-1 will be isolated (only half TE/BE power available) (बोगी-1 आइसोलेट होगी, सिर्फ आधा TE/BE पावर उपलब्ध रहेगा)",
    actions: [
      "1. If loco pilot isolates Bogie-1 via switch 154, press ENTER key on Display Keyboard, otherwise:- (1. यदि लोको पायलट 154 स्विच के द्वारा बोगी-1 को आइसोलेट करता है तो उसके बाद केवल Display Key Board पर ENTER Key प्रेस करें, अन्यथा -)",
      "2. Switch OFF control electronics and turn it ON again. Raise pantograph, close VCB and resume normal traction. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करें और फिर ऑन करें। पैंटो उठायें (रेज़ करें), VCB क्लोज करें और ट्रैक्शन चालू करें।)",
      "3. If the same message repeats, continue normal operation with half traction/braking power. (3. यदि वही मैसेज दोबारा आता है तो आधे ट्रैक्शन / ब्रेकिंग पावर से सामान्य ऑपरेशन चालू करें।)",
      "4. Inform TLC and record in locomotive log book. (TLC को सूचित करें तथा लॉग बुक में दर्ज करें।)",
      "★ Note: Avoid switching OFF/ON control electronics for following DDS messages: (नोट: कंट्रोल इलेक्ट्रॉनिक्स को निम्न DDS मैसेज के लिए ऑफ़/ऑन करने से बचें:)",
      "• If after \"ASC 1: Error PS hardware\", any of the following messages appear: a) ASC 1: Error PS Fault storage CGP or ASC 1: Error PS Fault storage GBC. b) After NSC 1: Error PS hardware, Error PS Fault storage GBC and ASC 1: 0052/0053/0054. (यदि ASC 1: Error PS hardware के बाद निम्न में से कोई मैसेज आता है: a) ASC 1: Error PS Fault storage CGP अथवा ASC 1: Error PS Fault storage GBC. b) NSC 1: Error PS hardware के बाद Error PS Fault storage GBC और ASC 1: 0052/0053/0054)"
    ]
  },
  {
    id: "F0202P1",
    subSystem: "SS02",
    message: "CONVERTER CONTACTOR STUCK OFF\nTry to close VCB again",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "VCB will open (VCB ओपन होगा)",
    actions: [
      "\" 0 \" Press BPFA to acknowledge fault. (थ्रोटल को \" 0 \" पर लायें। BPFA दबाकर फॉल्ट ACK करें।)",
      "In CCB-2 locomotives: check MR and FP pressure gauges. If pressure is low, rectify by setting MPJ to \"0\". (CCB-2 लोको में - MR और FP प्रेशर गेज़ की जाँच करें। यदि प्रेशर कम होता है तो MPJ को \"0\" पर रखकर उसे दुरस्त करें।)",
      "VPress BLDJ to close VCB. (VVCB क्लोज करने के लिए BLDJ प्रेस करें।)",
      "Check for air leakage in SR-1 (Traction Converter-1). If air leakage exists, isolate SR-1 via cock 125 on pneumatic panel (COC 125 on inside left, 4th from top), and then isolate Bogie-1 using switch 154 on SB-1. (ट्रैक्शन कनवर्टर-1) में एयर लीकेज को जाँच करें। यदि एयर लीकेज है तो SR-1 को न्यूमेटिक पैनल पर लगे कॉक (125) द्वारा आइसोलेट करें। न्यूमेटिक पैनल पर COC125 बायीं ओर अन्दर की तरफ (ऊपर से चौथा) को आईसोलेट करें तथा उसके बाद बोगी-1 को स्विच 154 (SB-1) के द्वारा आइसोलेट करें।)",
      "VPress BLDJ to close VCB. (VVCB क्लोज करने के लिए BLDJ प्रेस करें।)"
    ]
  },
  {
    id: "F0203P1",
    subSystem: "SS02",
    message: "GATE UNIT SUPPLY STUCK OFF\nTry to close VCB again",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "VCB will open (VCB ओपन होगा)",
    actions: [
      "\" 0 \" Press BPFA to acknowledge fault. (थ्रोटल को \" 0 \" पर लायें। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "Check MCB 127.11/1 on SB-1. If tripped, switch OFF control electronics and reset once. (SB-1 पर लगे MCB 127.11/1 की जाँच करें। यदि ट्रिप है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके एक बार रीसेट करें।)",
      "VPress BLDJ to close VCB. (VVCB क्लोज़ करने के लिए BLDJ प्रेस करें।)",
      "If bogie gets isolated (BOGIE 1 ISOLATED): clear block section or work with one bogie with TLC permission. Check MCB 127.11/1 in SB-1; if tripped, switch OFF control electronics and reset once. (यदि बोगी आइसोलेट हो जाती है (BOGIE 1 ISOLATED): ब्लॉक सेक्शन क्लियर करें या TLC की अनुमति से एक बोगी से कार्य करें। SB-1 में लगे MCB 127.11/1 को चेक करें, यदि ट्रिप मिलता है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके एक बार रीसेट करें।)",
      "IIf not successful, switch OFF control electronics and turn it ON. Raise pantograph, close VCB and resume traction. (Iयदि सफलता नहीं मिलती तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करें और फिर ऑन करें। पैंटो रेज़ करें, VCB क्लोज़ करें और ट्रैक्शन चालू करें।)",
      "If the same message repeats, continue normal operation with half traction/braking power. (यदि वही मैसेज दोबारा आता है तो आधे ट्रैक्शन / ब्रेकिंग पावर से सामान्य ऑपरेशन चालू करें।)"
    ]
  },
  {
    id: "F0205P1",
    subSystem: "SS02",
    message: "CONVERTER-1 OIL TEMPERATURE TOO HIGH\nTry to close VCB again\n(एवं BOGIE 1 ISOLATED / Press <Enter>)",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (On isolation LSFI will glow continuously) [LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी (आइसोलेट होने पर LSFI लगातार प्रकाशित रहेगी)]",
    effect: "VCB ओपन होगा / बोगी-1 आइसोलेट होगी (आधा TE/BE पावर उपलब्ध)",
    actions: [
      "【Situation 1: When message \"CONVERTER-1 OIL TEMPERATURE TOO HIGH, Try to close VCB again\" appears - स्थिति 1: जब \"CONVERTER-1 OIL TEMPERATURE TOO HIGH\" मैसेज आये】",
      "1. \" 0 \" Press BPFA to acknowledge fault. (थ्रोटल को \" 0 \" पर लायें। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Check oil level in converter expansion tank on converter cubicle. (कनवर्टर क्यूबिकल पर लगे कनवर्टर एक्सपेंशन टैंक में ऑयल लेवल की जाँच करें।)",
      "3. Check MCBs 59.1/1 and 63.1/1 on HB-1 panel. If tripped, open VCB and reset once. Close VCB and ensure SR-1 oil pump runs. Ensure OCB-1 operation by air draft from underframe radiator. (HB-1 पैनल में लगे MCB 59.1/1 और 63.1/1 की जाँच करें। यदि ट्रिप मिले तो VCB ओपन करके एक बार रीसेट करें। VCB क्लोज़ करें और ट्रैक्शन कनवर्टर ऑयल पंप-1 का चलना सुनिश्चित करें। अंडरफ्रेम में लगे रेडिएटर पर से हवा आने के द्वारा OCB-1 का कार्य सुनिश्चित करें।)",
      "4. OCB-1 , VCB Lower pantograph HB-1 MCB 59.1/1, MCB 62.1/1 MCB 63.1/1 , 154 (SB-1 ) -1. (लोको पायलट OCB-1 के इम्पेलर व केसिंग की किसी भी क्षति को चेक करें, यदि क्षतिग्रस्त पाते हैं तो VCB ओपन करके पैंटो लोअर करें। HB-1 में लगे MCB 59.1/1, MCB 62.1/1 व MCB 63.1/1 को ओपन करें, फिर बाद में स्विच 154 (SB-1 में स्थित) के द्वारा बोगी-1 को आइसोलेट करें।)",
      "5. LSFI Inform TLC and record in locomotive log book. (लोको को एनर्जाइज़ करें व एक बोगी के साथ गाड़ी चलायें। इस स्थिति में LSFI लगातार प्रकाशित रहेगी। TLC को सूचित करें तथा लॉग बुक में दर्ज करें।)",
      "【Situation 2: स्थिति 2: जब \"BOGIE 1 ISOLATED : Only half traction and electrical braking power available. Press <Enter>\" मैसेज आये - स्थिति 2】",
      "1. Switch OFF control electronics and turn it ON again. Raise pantograph, close VCB and resume normal traction. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करें और फिर ऑन करें। पैंटो उठायें, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "【Situation 2: When \"BOGIE 1 ISOLATED: Only half traction and electrical braking power available. Press <Enter>\" appears - स्थिति 2: जब बोगी 1 आइसोलेटेड मैसेज आये】",
      "3. Inform TLC and record in locomotive log book. (TLC को सूचित करें तथा लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0206P1",
    subSystem: "SS02",
    message: "CONVERTER 1 OIL PRESSURE NOT OK\nCheck oil level\nTry to close the VCB again\n(एवं BOGIE 1 ISOLATED / Press <Enter>)",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSFI glows continuously on isolation) [LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी]",
    effect: "VCB will open / Bogie-1 will be isolated (half TE/BE available) [VCB ओपन होगा / बोगी-1 आइसोलेट होगी]",
    actions: [
      "【Situation 1: When message \"CONVERTER 1 OIL PRESSURE NOT OK, Check oil level, Try to close the VCB again\" appears - स्थिति 1: जब \"CONVERTER 1 OIL PRESSURE NOT OK\" मैसेज आये】",
      "1. \" 0 \" Press BPFA to acknowledge fault. (थ्रोटल को \" 0 \" पर लायें। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Check oil level in converter expansion tank on converter cubicle. If above MAX or below MIN, isolate Bogie-1 via switch 154 to \"I\" and work with half traction. (कनवर्टर क्यूबिकल पर लगे कनवर्टर एक्सपेंशन टैंक में ऑयल लेवल की जाँच करें। यदि मैक्सिमम से ऊपर या मिनिमम से नीचे हो तो बोगी-1 को स्विच 154 द्वारा \"I\" पर रखकर आईसोलेट करके आधे ट्रैक्शन से कार्य करें।)",
      "3. If oil level is normal, check MCB 63.1/1 on HB-1 panel. If tripped, open VCB and reset once. Check whether SR-1 oil pump is running by feeling its inlet and outlet pipes. (यदि ऑयल लेवल बराबर हो तो HB-1 पैनल में MCB 63.1/1 को चेक करें। यदि ट्रिप हो तो उसे VCB ओपन करके एक बार रीसेट करें। मशीन रूम में SR-1 का ऑयल पंप चल रहा है या नहीं इसकी जाँच उसके इनलेट तथा आउटलेट पाइप को छूकर करें।)",
      "4. If MCB 63.1/1 trips again after resetting once, do not reset it again. Bogie-1 will auto-isolate. Work with half traction. (यदि MCB 63.1/1 को एक बार रीसेट करने के बाद दोबारा ट्रिप होता है तो उसे फिर से रीसेट न करें। बोगी-1 अपने आप आइसोलेट हो जायेगी। आधे ट्रैक्शन के साथ कार्य करें।)",
      "5. Loco Pilot should inspect Traction Converter-1 oil pipeline for leakage or damage, and check OCB-1 blower casing for impeller damage. In this condition, damaged radiator may cause oil leakage resulting in \"Converter No.1 oil pressure low\" message. Loco Pilot should open VCB, lower pantograph, trip MCB 59.1/1 and MCB 63.1/1 on HB-1 panel. Isolate Bogie-1 by placing switch 154 on \"I\". Energize locomotive and clear block section with one bogie. (In case of steps 2 and 5, LSFI will glow continuously. Inform TLC and record in log book). (लोको पायलट ट्रैक्शन कनवर्टर-1 के ऑयल की पाइप लाइन को ऑयल लीकेज तथा कोई क्षति के लिए चेक करें जिससे तेल का रिसाव हो सकता है और ऑयल कूलिंग ब्लोअर-1 (OCB-1) की केसिंग को इम्पेलर की खराबी से कोई क्षति के लिए चेक करें। ऐसी स्थिति में रेडिएटर के क्षतिग्रस्त होने से तेल का रिसाव होकर \"Converter No.1 oil pressure low\" का मैसेज आ सकता है। लोको पायलट VCB ओपन करें, पैंटो लोअर करें और HB-1 पैनल पर लगे MCB 59.1/1 और MCB 63.1/1 को ट्रिप करें। स्विच 154 को \"I\" पर रखकर बोगी-1 को आईसोलेट करें। लोको एनर्जाइज करके एक बोगी द्वारा कार्य करें। उपरोक्त क्रम सं. 2 और 5 की स्थिति में LSFI लगातार प्रकाशित रहेगी। TLC को सूचित करें तथा लॉग बुक में दर्ज करें।)",
      "6. If SR-1 oil pump is normal, switch OFF control electronics and isolate BUR-2 via MCB 127.22/2. (6. यदि SR-1 ऑयल पंप सामान्य हो तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके BUR-2 को MCB 127.22/2 के द्वारा आइसोलेट करें।)",
      "7. If successful, work train keeping BUR-2 isolated. (यदि सफलता मिलती है तो BUR-2 को आइसोलेट रखते हुए गाड़ी चलाएं।)",
      "8. If not successful, isolate Bogie-1 by placing switch 154 on \"I\". Inform TLC. (यदि सफलता नहीं मिलती है तो स्विच 154 को \"I\" पर रखकर बोगी-1 को आईसोलेट करें। TLC को सूचित करें।)",
      "【Situation 2: When \"BOGIE 1 ISOLATED: Only half traction and electrical braking power available. Press <Enter>\" appears - स्थिति 2: जब बोगी 1 आइसोलेटेड मैसेज आये】",
      "1. Switch OFF control electronics and turn it ON again. Raise pantograph, close VCB and resume normal traction. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करें और फिर ऑन करें। पैंटो रेज़ करें, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "2. If the same message repeats, continue normal operation with half traction/braking power. (2. यदि वही मैसेज दोबारा आता है तो आधे ट्रैक्शन / ब्रेकिंग पावर से सामान्य ऑपरेशन चालू करें।)",
      "3. Inform TLC and record in locomotive log book. (TLC को सूचित करें तथा लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0207P1",
    subSystem: "SS02",
    message: "TRACTION MOTOR TEMPERATURE TOO HIGH\nConverter 1 blocked Bogie 1 may get isolated\n(एवं BOGIE 1 ISOLATED / Press <Enter>)",
    lamp: "LSFI will glow, half TE/BE available (On isolation LSFI glows continuously) [LSFI प्रकाशित होगी, आधा TE/BE उपलब्ध]",
    effect: "Converter-1 will be blocked / Bogie-1 may be isolated (half TE/BE available) (कन्वर्टर-1 ब्लॉक होगा / बोगी-1 आइसोलेट हो सकती है - आधा TE/BE उपलब्ध)",
    actions: [
      "【Situation 1: When message \"TRACTION MOTOR TEMPERATURE TOO HIGH\" appears - स्थिति 1: जब \"TRACTION MOTOR TEMPERATURE TOO HIGH\" मैसेज आये】",
      "1. \" 0 \" Press BPFA to acknowledge fault. (ब्लॉक सेक्शन क्लियर करें और थ्रोटल को \" 0 \" पर लायें। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Check whether Traction Motor Blower-1 is operating via manual air suction at TM Louver. Check MCB 53.1/1 on HB-1 panel; if tripped, open VCB and reset once. (ट्रैक्शन मोटर ब्लोअर-1 कार्य कर रहा है या नहीं, मैन्युअली एयर सक्शन द्वारा TM Louver पर चेक करें। HB-1 पैनल में लगे MCB 53.1/1 को चेक करें। यदि ट्रिप हो तो उसे VCB ओपन करके एक बार रीसेट करें।)",
      "【Situation 2: स्थिति 2: जब \"BOGIE 1 ISOLATED: Only half traction and electrical braking power available, Press <Enter>\" मैसेज आये - स्थिति 2】",
      "1. If MCB 53.1/1 and MCB 53.1/2 trip repeatedly, isolate BUR-2 (by turning MCE OFF). Try to close VCB. (MCB 53.1/1 और MCB 53.1/2 बार-बार ट्रिप होते हैं तो BUR-2 को आइसोलेट करें (MCE ऑफ़ करके)। VCB क्लोज़ करने का प्रयत्न करें।)",
      "2. Switch OFF control electronics and turn it ON again. Raise pantograph, close VCB and resume normal traction. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करें और फिर ऑन करें। पैंटो उठायें, VCB क्लोज़ करने का प्रयत्न करें और यदि लोको सामान्य हो जाता है तो ट्रैक्शन चालू करें।)",
      "3. If fault clears, work train keeping BUR-2 isolated. (यदि दोष दूर हो जाता है तो BUR-2 को आइसोलेट रखते हुए कार्य करें।)",
      "4. If fault persists, Bogie-1 will auto-isolate. (यदि दोष कायम रहता है तो बोगी-1 अपने आप आइसोलेट हो जायेगी।)",
      "5. / Continue normal operation. (यदि वही मैसेज पुनः आता है तो आधे ट्रैक्शन / ब्रेकिंग पावर के साथ सामान्य ऑपरेशन चालू करें।)",
      "6. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0201P2",
    subSystem: "SS02",
    message: "EARTH FAULT IN CONVERTER 1\nNormal operation can continue\nTo be checked during maintenance",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Normal operation will continue (सामान्य ऑपरेशन जारी रहेगा)",
    actions: [
      "1. Press BPFA to acknowledge fault Continue normal operation. (BPFA दबाकर फ़ॉल्ट ACK करें। सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0202P2",
    subSystem: "SS02",
    message: "TRACTION MOTOR OVERSPEED\nTE is being reduced",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Tractive Effort (TE) is reducing (TE कम हो रहा है)",
    actions: [
      "1. Press BPFA to acknowledge fault. (गति कम करें। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Continue normal operation. (सामान्य ऑपरेशन चालू करें।)",
      "3. If speed is within limits and TE reduces to \"0\", open VCB and isolate Bogie-1 by setting switch 154 to \"1\". (3. यदि स्पीड सीमा के अन्दर है और TE \"0\" तक कम होता है तो VCB ओपन करके बोगी-1 को स्विच 154 को \"1\" पर रखकर आईसोलेट करें।)"
    ]
  },
  {
    id: "F0203P2",
    subSystem: "SS02",
    message: "MUB RESISTANCE TOO HOT IN CONVERTER 1\nWait for 30 seconds",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "VCB will open (VCB ओपन होगा)",
    actions: [
      "MUB VCB 30 (15.1 ) Press BPFA to acknowledge fault. (MUB रेजिस्टेंस को ठंडा होने के लिए VCB क्लोज़ करने से पहले 30 सेकंड इंतज़ार करें (15.1 कनवर्टर क्यूबिकल में लगा है)। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "Press BLDJ to close VCB. (VCB क्लोज़ करने के लिए BLDJ प्रेस करें।)"
    ]
  },
  {
    id: "F0204P2",
    subSystem: "SS02",
    message: "FAULTY MOTOR TEMPERATURE SENSOR\nNormal operation can continue\nTo be checked during maintenance",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Normal operation will continue (सामान्य ऑपरेशन जारी रहेगा)",
    actions: [
      "Press BPFA to acknowledge fault Continue normal operation. (BPFA दबाकर फ़ॉल्ट ACK करें। सामान्य ऑपरेशन चालू रखें।)",
      "Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0205P2",
    subSystem: "SS02",
    message: "EQUIPMENT TEMPERATURE HIGH\nTE/BE is being reduced",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Tractive/Braking Effort (TE/BE) is reducing (TE/BE कम हो रहा है)",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (ब्लॉक सेक्शन क्लियर करें और थ्रोटल को \" 0 \" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Wait for 10 minutes or some time for transformer/converter oil temperature to normalize. (ट्रांसफार्मर / कनवर्टर के ऑयल का तापमान सामान्य होने के लिए 10 मिनट या कुछ समय इंतज़ार करें।)",
      "3. Check all MCBs in HB/SB panel; if tripped, reset them once. (3. HB/SB पैनल में लगे सभी MCBs चेक करें, यदि ट्रिप हों तो उन्हें एक बार रीसेट करें।)",
      "4. Ensure all auxiliaries and MRB (machine room blowers) are running. (सभी ऑक्सिलरी तथा MRB (मशीन रूम ब्लोअर) का चलना सुनिश्चित करें।)",
      "5. Continue normal operation. (सामान्य ऑपरेशन चालू करें।)",
      "6. If fault persists, switch OFF control electronics and turn it ON. Raise panto, close VCB. If loco normalizes, resume traction. Otherwise isolate Bogie-1 via switch 154, inform TLC, and work train with one bogie. (6. यदि दोष दूर नहीं होता है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करें और फिर ऑन करें। पैंटो उठायें, VCB क्लोज़ करें। यदि लोको सामान्य होता है तो ट्रैक्शन चालू करें। अन्यथा बोगी कट आउट स्विच 154 को ऑपरेट करके बोगी-1 को आइसोलेट करें एवं TLC को सूचित करके, एक बोगी के साथ गाड़ी चलाएं।)",
      "7. If unsuccessful within 20 minutes, demand relief engine. (यदि 20 मिनट के अंदर सफलता न मिले तो सहायता इंजन की मांग करें।)"
    ]
  },
  {
    id: "F0206P2",
    subSystem: "SS02",
    message: "DC LINK CAPACITORS PRESSURE NOT OK\nNormal operation can continue\nTo be checked during maintenance",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Normal operation will continue (सामान्य ऑपरेशन जारी रहेगा)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें। गंतव्य स्थान पर मेंटेनेंस स्टाफ को सूचित करें।)",
      "3. Inspect DC Link capacitors during maintenance. Capacitors may be open-circuited or defective. (3. मेंटेनेंस के दौरान DC Link कैपेसिटर्स को चेक करना चाहिए। कैपेसिटर ओपन सर्किट या खराब हो सकते हैं।)"
    ]
  },
  {
    id: "F0207P2",
    subSystem: "SS02",
    message: "WHEEL SKIDDING IN BOGIE 1 / Reduce BE\n(एवं Bombardier IGBT लोको में: LINE CONVERTER ISOLATED BOGIE 1 / Reduced Traction/Braking effort)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Instruction to reduce BE / half TE/BE available (BE कम करने का निर्देश / आधा TE/BE उपलब्ध रहेगा)",
    actions: [
      "【Situation 1: Standard Loco - WHEEL SKIDDING IN BOGIE 1 - Reduce BE - स्थिति 1: सामान्य लोको - WHEEL SKIDDING IN BOGIE 1】",
      "1. Acknowledge the fault by pressing BPFA. (1. BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें।)",
      "2. Ensure that there is no brake binding on locomotive. (सुनिश्चित करें कि लोको पर ब्रेक बाइंडिंग नहीं है।)",
      "3. Check that all parking brakes are properly released. (जाँच करें कि सभी पार्किंग ब्रेक बराबर रिलीज़ हो चुके हैं।)",
      "4. If speed is greater than 1 km/h and DDS shows \"Error Tacho Generator\", loco pilot can operate normally. (4. अगर गति 1 किमी/घंटा से ज़्यादा है और DDS में \"Error Tacho Generator\" का मैसेज है तो लोको पायलट सामान्य तरीके से कार्य कर सकता है।)",
      "5. (BE) , Inform TLC and record in locomotive log book. (ब्रेकिंग एफ़र्ट (BE) को कम करें, चालू गाड़ी में आवाज़ से व्हील स्किडिंग का अनुभव करें। TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "6. Do not use BPCS or Regenerative Brake. (BPCS व रिजनेरेटिव ब्रेक का उपयोग न करें।)",
      "【Situation 2: स्थिति 2: M - s Bombardier Transportation IGBT कनवर्टर लोको - LINE CONVERTER ISOLATED BOGIE 1 - Reduced Traction - Braking effort - स्थिति 2】",
      "1. Acknowledge fault by pressing BPFA and work with half TE and BE. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और आधे TE/BE द्वारा कार्य करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0207P2-BT",
    subSystem: "SS02",
    message: "LINE CONVERTER ISOLATED BOGIE 1\nReduced Traction/Braking effort\n(M/s BOMBARDIER Transportation IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Half TE/BE will remain available (आधा TE/BE उपलब्ध रहेगा)",
    actions: [
      "1. BPFA (ACK) TE/BE. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और आधे TE/BE द्वारा कार्य करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0208P2",
    subSystem: "SS02",
    message: "DOPPLER RADAR FAILED\n(एवं Bombardier IGBT लोको में: MOTOR 1 ISOLATED BOGIE 1 / Reduced Traction/Braking effort)\n(एवं MEDHA IGBT लोको में: TM1 BOGIE 1 ISOLATED / TM 1 of bogie 1 isolated only 5/6th of Traction/electrical Braking power available)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Normal operation continues / Reduced TE/BE (half in Bombardier, 5/6th in MEDHA) (सामान्य ऑपरेशन जारी रहेगा / Reduced TE/BE)",
    actions: [
      "【Situation 1: Standard Loco - DOPPLER RADAR FAILED - स्थिति 1: सामान्य लोको - DOPPLER RADAR FAILED】",
      "1. Acknowledge the fault by pressing BPFA. (1. BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें।)",
      "2. If DDS background message shows \"SLG1:0083/SLG2:0083 Radar control disabled/Faulty\": (2. यदि DDS पर बैकग्राउंड मैसेज \"SLG1:0083/SLG2:0083 Radar control disabled/Faulty\" आता है -।)",
      "3. Continue working normally. (सामान्य तरीके से कार्य करें।)",
      "【Situation 2: Bombardier Transportation IGBT - MOTOR 1 ISOLATED BOGIE 1 (Reduced TE/BE) - स्थिति 2: बॉम्बार्डियर IGBT - मोटर 1 बोगी 1 आइसोलेट】",
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "【Situation 3: MEDHA IGBT Converter - TM1 BOGIE 1 ISOLATED (5/6th power available) - स्थिति 3: मेधा IGBT कनवर्टर - TM1 बोगी 1 आइसोलेट】",
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0208P2-BT",
    subSystem: "SS02",
    message: "MOTOR 1 ISOLATED BOGIE 1\nReduced Traction/Braking effort\n(M/s BOMBARDIER Transportation IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Reduced Traction/Braking effort (आधा TE/BE उपलब्ध)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0208P2-MEDHA",
    subSystem: "SS02",
    message: "TM1 BOGIE 1 ISOLATED\nTM 1 of bogie 1 isolated only 5/6th of Traction/electrical Braking power available\n(M/s MEDHA IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "TM 1 isolated, only 5/6th traction/electrical braking power available (TM 1 आइसोलेट, केवल 5/6th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0209P2",
    subSystem: "SS02",
    message: "MOTOR 2 ISOLATED BOGIE 1 / Reduced Traction/Braking effort (Bombardier IGBT)\n(एवं MEDHA IGBT लोको में: TM2 BOGIE 1 ISOLATED / TM 2 of bogie 1 isolated only 5/6th of Traction/electrical Braking power available)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Reduced TE/BE (Bombardier में आधा, MEDHA में बोगी-1 की TM-2 आइसोलेट, केवल 5/6th TE/BE उपलब्ध)",
    actions: [
      "【Situation 1: Bombardier IGBT Loco - MOTOR 2 ISOLATED BOGIE 1 (Reduced TE/BE) - स्थिति 1: Bombardier IGBT लोको - मोटर 2 बोगी 1 आइसोलेट】",
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "【Situation 2: MEDHA IGBT Converter - TM2 BOGIE 1 ISOLATED (5/6th power available) - स्थिति 2: MEDHA IGBT कनवर्टर - TM2 बोगी 1 आइसोलेट】",
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0209P2-BT",
    subSystem: "SS02",
    message: "MOTOR 2 ISOLATED BOGIE 1\nReduced Traction/Braking effort\n(M/s BOMBARDIER Transportation IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Reduced Traction/Braking effort (half/reduced TE/BE available) [आधा/घटा हुआ TE/BE उपलब्ध रहेगा]",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0209P2-MEDHA",
    subSystem: "SS02",
    message: "TM2 BOGIE 1 ISOLATED\nTM 2 of bogie 1 isolated only 5/6th of Traction/electrical Braking power available\n(M/s MEDHA IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "TM 2 isolated, only 5/6th traction/electrical braking power available (TM 2 आइसोलेट, केवल 5/6th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग power उपलब्ध)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0210P2",
    subSystem: "SS02",
    message: "MOTOR 3 ISOLATED BOGIE 1 / Reduced Traction/Braking effort (Bombardier IGBT)\n(एवं MEDHA IGBT लोको में: TM3 BOGIE 1 ISOLATED / TM 3 of bogie 1 isolated only 5/6th of Traction/electrical Braking power available)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Reduced TE/BE (Bombardier में आधा, MEDHA में बोगी-1 की TM-3 आइसोलेट, केवल 5/6th TE/BE उपलब्ध)",
    actions: [
      "【Situation 1: Bombardier IGBT Loco - MOTOR 3 ISOLATED BOGIE 1 (Reduced TE/BE) - स्थिति 1: Bombardier IGBT लोको - मोटर 3 बोगी 1 आइसोलेट】",
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "【Situation 2: MEDHA IGBT Converter - TM3 BOGIE 1 ISOLATED (5/6th power available) - स्थिति 2: MEDHA IGBT कनवर्टर - TM3 बोगी 1 आइसोलेट】",
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0210P2-BT",
    subSystem: "SS02",
    message: "MOTOR 3 ISOLATED BOGIE 1\nReduced Traction/Braking effort\n(M/s BOMBARDIER Transportation IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Reduced Traction/Braking effort (half/reduced TE/BE available) [आधा/घटा हुआ TE/BE उपलब्ध रहेगा]",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0210P2-MEDHA",
    subSystem: "SS02",
    message: "TM3 BOGIE 1 ISOLATED\nTM 3 of bogie 1 isolated only 5/6th of Traction/electrical Braking power available\n(M/s MEDHA IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "TM 3 isolated, only 5/6th traction/electrical braking power available (TM 3 आइसोलेट, केवल 5/6th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग power उपलब्ध)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0211P2",
    subSystem: "SS02",
    message: "MOTOR 1 BOGIE 1 ISOLATED / TM 1 isolated 5/6th power (BHEL IGBT)\n(एवं MEDHA IGBT लोको में: LINE CONVERTER 1 BOGIE 1 ISOLATED / LC1 of bogie 1 isolated only 3/4th of traction/electrical Braking power available)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "BHEL लोको में TM 1 आइसोलेट (5/6th TE/BE), MEDHA लोको में LC1 आइसोलेट (3/4th TE/BE उपलब्ध)",
    actions: [
      "【Situation 1: BHEL IGBT Loco - MOTOR 1 BOGIE 1 ISOLATED (5/6th power available) - स्थिति 1: BHEL IGBT लोको - मोटर 1 बोगी 1 आइसोलेट】",
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "【Situation 2: MEDHA IGBT Converter - LINE CONVERTER 1 BOGIE 1 ISOLATED (3/4th power available) - स्थिति 2: MEDHA IGBT कनवर्टर - लाइन कनवर्टर 1 बोगी 1 आइसोलेट】",
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0211P2-BHEL",
    subSystem: "SS02",
    message: "MOTOR 1 BOGIE 1 ISOLATED\nTM 1 of bogie 1 isolated only 5/6th of Traction/electrical Braking power available\n(M/s BHEL IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "TM 1 isolated, only 5/6th traction/electrical braking power available (TM 1 आइसोलेट, केवल 5/6th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0211P2-MEDHA",
    subSystem: "SS02",
    message: "LINE CONVERTER 1 BOGIE 1 ISOLATED\nLC1 of bogie 1 isolated only 3/4th of traction/electrical Braking power available\n(M/s MEDHA IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Line Converter 1 of Bogie-1 isolated, only 3/4th traction/electrical braking power available (बोगी-1 का LC1 आइसोलेट, केवल 3/4th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0212P2",
    subSystem: "SS02",
    message: "MOTOR 2 BOGIE 1 ISOLATED / TM 2 isolated 5/6th power (BHEL IGBT)\n(एवं MEDHA IGBT लोको में: LINE CONVERTER 2 BOGIE 1 ISOLATED / LC2 of bogie 1 isolated only 3/4th of traction/electrical Braking power available)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "BHEL लोको में TM 2 आइसोलेट (5/6th TE/BE), MEDHA लोको में LC2 आइसोलेट (3/4th TE/BE उपलब्ध)",
    actions: [
      "【Situation 1: BHEL IGBT Loco - MOTOR 2 BOGIE 1 ISOLATED (5/6th power available) - स्थिति 1: BHEL IGBT लोको - मोटर 2 बोगी 1 आइसोलेट】",
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "【Situation 2: MEDHA IGBT Converter - LINE CONVERTER 2 BOGIE 1 ISOLATED (3/4th power available) - स्थिति 2: MEDHA IGBT कनवर्टर - लाइन कनवर्टर 2 बोगी 1 आइसोलेट】",
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0212P2-BHEL",
    subSystem: "SS02",
    message: "MOTOR 2 BOGIE 1 ISOLATED\nTM 2 of bogie 1 isolated only 5/6th of Traction/electrical Braking power available\n(M/s BHEL IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "TM 2 isolated, only 5/6th traction/electrical braking power available (TM 2 आइसोलेट, केवल 5/6th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग power उपलब्ध)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0212P2-MEDHA",
    subSystem: "SS02",
    message: "LINE CONVERTER 2 BOGIE 1 ISOLATED\nLC2 of bogie 1 isolated only 3/4th of traction/electrical Braking power available\n(M/s MEDHA IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Line Converter 2 of Bogie-1 isolated, only 3/4th traction/electrical braking power available (बोगी-1 का LC2 आइसोलेट, केवल 3/4th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0213P2",
    subSystem: "SS02",
    message: "MOTOR 3 BOGIE 1 ISOLATED\nTM 3 of bogie 1 isolated only 5/6th of traction/electrical Braking power available\n(M/s BHEL IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "TM 3 isolated, only 5/6th traction/electrical braking power available (TM 3 आइसोलेट, केवल 5/6th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग power उपलब्ध)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0214P2",
    subSystem: "SS02",
    message: "LINE CONVERTER 1 BOGIE 1 ISOLATED\nLC1 of bogie 1 isolated only 3/4th of traction/electrical Braking power available\n(M/s BHEL IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Line Converter 1 of Bogie-1 isolated, only 3/4th traction/electrical braking power available (बोगी-1 का LC1 आइसोलेट, केवल 3/4th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0215P2",
    subSystem: "SS02",
    message: "LINE CONVERTER 2 BOGIE 1 ISOLATED\nLC2 of bogie 1 isolated only 3/4th of traction/electrical Braking power available\n(M/s BHEL IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Line Converter 2 of Bogie-1 isolated, only 3/4th traction/electrical braking power available (बोगी-1 का LC2 आइसोलेट, केवल 3/4th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0301P1",
    subSystem: "SS03",
    message: "DISTURBANCE IN CONVERTER 2\nTry to close VCB again",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "VCB ओपन होगा, TE/BE '0' हो जाएगा",
    actions: [
      "1. \" 0 \" Press BPFA to acknowledge fault. (थ्रॉटल को \" 0 \" पर लायें। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Check MCB 127.1/2 on SB-2. If tripped, switch OFF control electronics and reset once. (2. MCB 127.1/2 (SB2) चेक करें। यदि ट्रिप है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करके एक बार रीसेट करें।)",
      "3. Press BLDJ to close VCB. (3. VCB क्लोज करने के लिए BLDJ प्रेस करें।)",
      "4. If the same message repeats, switch OFF control electronics and turn ON after 5 minutes. Raise panto, close VCB, and resume traction if locomotive normalizes. (4. यदि वही मैसेज दोबारा आता है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करके 5 मिनट बाद ऑन करें। पेंटो उठायें और VCB क्लोज करें, यदि लोको सामान्य होता है तो ट्रैक्शन चालू करें।)",
      "5. If same message repeats and Bogie-2 is not isolated automatically, isolate Bogie-2 via MCB 127.1/2 & 127.11/2 on SB-2 panel (with MCE OFF). (5. यदि वही मैसेज दोबारा आता है और ट्रैक्शन बोगी-2 अपने आप आइसोलेट नहीं होती है तो SB-2 पैनल में लगे MCB 127.1/2 एवं 127.11/2 (SB-2) द्वारा बोगी-2 को आइसोलेट करें। (MCE ऑफ करके)।)",
      "6. Inform TLC DDS Record in log book. (TLC को सूचित करें तथा बोगी आइसोलेट करने से पहले आये हुए DDS मैसेज को लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "SS03-BOGIE2-ISOLATED",
    subSystem: "SS03",
    message: "BOGIE 2 ISOLATED :\nOnly half traction and electrical braking power available\nPress <Enter>",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Bogie-2 will remain isolated, only half traction and electrical braking power available (बोगी-2 आइसोलेट रहेगी, केवल आधा ट्रैक्शन और इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध रहेगा)",
    actions: [
      "1. If loco pilot isolates Bogie-2 via switch 154, press ENTER key on display board, otherwise - (1. यदि लोको पायलट 154 स्विच के द्वारा बोगी-2 को आइसोलेट करता है तो उसके बाद डिस्प्ले बोर्ड पर ENTER Key प्रेस करें, अन्यथा-।)",
      "2. Switch OFF control electronics , Close VCB. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करें और फिर ऑन करें। पेंटो उठायें, VCB क्लोज करें तथा ट्रैक्शन चालू करें।)",
      "3. If the same message repeats, continue normal operation with half traction/braking power. (3. यदि वही मैसेज दोबारा आता है तो आधे ट्रैक्शन / ब्रेकिंग पावर से सामान्य ऑपरेशन चालू करें।)",
      "4. Inform TLC and record in locomotive log book. (TLC को सूचित करें तथा लॉग बुक में दर्ज करें।)",
      "★ Note: Avoid switching OFF/ON control electronics for following DDS messages: (नोट: कंट्रोल इलेक्ट्रॉनिक्स को निम्न DDS मैसेज के लिए ऑफ / ऑन करने से बचें:)",
      "• If after \"ASC 2: Error PS hardware\", any of the following messages appear: (• यदि ASC 2: Error PS hardware के बाद निम्न में से कोई मैसेज आता है:)",
      "a) ASC 2: Error PS Fault storage CGP or ASC 2: Error PS Fault storage GBC. (a) ASC 2: Error PS Fault storage CGP अथवा ASC 2: Error PS Fault storage GBC.)",
      "b) After NSC 2: Error PS hardware, NSC 2: Error PS Fault storage GBC and ASC 2: 0052/0053/0054. (b) NSC 2: Error PS hardware के बाद NSC 2: Error PS Fault storage GBC और ASC 2: 0052/0053/0054।)"
    ]
  },
  {
    id: "F0302P1",
    subSystem: "SS03",
    message: "CONVERTER CONTACTOR STUCK OFF\nTry to close VCB again\n(एवं BOGIE 2 ISOLATED / Press <Enter>)",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "VCB will open / Bogie-2 will be isolated (half TE/BE available) [VCB ओपन होगा / बोगी-2 आइसोलेट होगी]",
    actions: [
      "【Situation 1: When message \"CONVERTER CONTACTOR STUCK OFF, Try to close VCB again\" appears - स्थिति 1: जब \"CONVERTER CONTACTOR STUCK OFF\" मैसेज आये】",
      "1. “ 0 ” Press BPFA to acknowledge fault. (थ्रोटल को “ 0 ” पर लायें। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. In CCB-2 locomotives: check MR and FP pressure gauges. If pressure is low, rectify by placing MPJ to \"0\". (2. CCB-2 लोको में - MR और FP प्रेशर गेज़ की जाँच करें। यदि प्रेशर कम होता है तो MPJ को ‘ 0 ’ पर रखकर उसे दुरुस्त करें।)",
      "3. Press BLDJ to close VCB. (3. VCB क्लोज़ करने के लिए BLDJ प्रेस करें।)",
      "4. Check for air leakage in SR-2 (Traction Converter-2). If air leakage exists, isolate SR-2 via Cock 88 on pneumatic panel (inside left, 2nd from top), then isolate Bogie-2 via switch 154 on SB-1. (SR-2 में एयर लीकेज की जाँच करें। यदि एयर लीकेज है तो संबंधित SR को न्यूमैटिक पैनल पर लगे कॉक (88) द्वारा आइसोलेट करें। न्यूमैटिक पैनल पर COC 88 बायीं ओर अन्दर की तरफ को आइसोलेट करें तथा उसके बाद बोगी-2 को स्विच 154 (SB-1) के द्वारा आइसोलेट करें।)",
      "5. Press BLDJ to close VCB. (5. VCB क्लोज़ करने के लिए BLDJ प्रेस करें।)",
      "【Situation 2: BOGIE 2 ISOLATED (Only half traction and electrical braking power available) - स्थिति 2: बोगी 2 आइसोलेटेड (आधा TE/BE उपलब्ध)】",
      "1. If loco pilot isolates Bogie-2 via switch 154, press only ENTER key on Display Keyboard, otherwise - (1. यदि लोको पायलट 154 स्विच के द्वारा बोगी-2 को आइसोलेट करता है तो उसके बाद केवल Display Key Board पर ENTER Key प्रेस करें, अन्यथा -।)",
      "2. Switch OFF control electronics and turn it ON again. Raise pantograph, close VCB and resume normal traction. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करें और फिर ऑन करें। पेंटो उठायें, VCB क्लोज़ करें और ट्रैक्शन चालू करें।)",
      "3. If the same message repeats, continue normal operation with half traction/braking power. (3. यदि वही मैसेज दोबारा आता है तो आधे ट्रैक्शन / ब्रेकिंग पावर से सामान्य ऑपरेशन चालू करें।)",
      "4. Inform TLC and record in locomotive log book. (TLC को सूचित करें तथा लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0303P1",
    subSystem: "SS03",
    message: "GATE UNIT SUPPLY STUCK OFF\nTry to close VCB again\n(एवं BOGIE 2 ISOLATED / Press <Enter>)",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "VCB will open / Bogie-2 will be isolated (half TE/BE available) [VCB ओपन होगा / बोगी-2 आइसोलेट होगी]",
    actions: [
      "【Situation 1: When message \"GATE UNIT SUPPLY STUCK OFF, Try to close VCB again\" appears - स्थिति 1: जब \"GATE UNIT SUPPLY STUCK OFF\" मैसेज आये】",
      "1. “ 0 ” Press BPFA to acknowledge fault. (थ्रोटल को “ 0 ” पर लायें। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Check MCB 127.11/2 on SB-2. If tripped, switch OFF control electronics and reset once. (2. SB-2 पर लगे MCB 127.11/2 की जाँच करें। यदि कोई MCB ट्रिप हो तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करके एक बार रीसेट करें।)",
      "3. Press BLDJ to close VCB. (3. VCB क्लोज़ करने के लिए BLDJ प्रेस करें।)",
      "【Situation 2: BOGIE 2 ISOLATED (Only half traction and electrical braking power available) - स्थिति 2: बोगी 2 आइसोलेटेड (आधा TE/BE उपलब्ध)】",
      "1. Clear block section or work with one bogie with TLC permission. (ब्लॉक सेक्शन क्लियर करें या TLC की अनुमति से एक बोगी से कार्य करें।)",
      "2. Check MCB 127.11/2 in SB-2; if tripped, switch OFF control electronics and reset once. (2. SB-2 में लगे MCB 127.11/2 को चेक करें। यदि ट्रिप मिलता है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करके एक बार रीसेट करें।)",
      "3. If not successful, switch OFF control electronics and turn it ON again. Raise pantograph, close VCB and resume normal traction. (यदि सफलता नहीं मिलती तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करें और फिर ऑन करें। पेंटो उठायें, VCB क्लोज़ करें और ट्रैक्शन चालू करें।)",
      "4. If the same message repeats, continue normal operation with half traction/braking power. (4. यदि वही मैसेज दोबारा आता है तो आधे ट्रैक्शन / ब्रेकिंग पावर से सामान्य ऑपरेशन चालू करें।)",
      "5. Inform TLC and record in locomotive log book. (TLC को सूचित करें तथा लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0305P1",
    subSystem: "SS03",
    message: "CONVERTER -2 OIL TEMPERATURE TOO HIGH\nTry to close VCB again\n(एवं BOGIE 2 ISOLATED / Press <Enter>)",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (On isolation LSFI glows continuously) [LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी]",
    effect: "VCB will open / Bogie-2 will be isolated (half TE/BE available) [VCB ओपन होगा / बोगी-2 आइसोलेट होगी]",
    actions: [
      "【Situation 1: When message \"CONVERTER -2 OIL TEMPERATURE TOO HIGH, Try to close VCB again\" appears - स्थिति 1: जब \"CONVERTER -2 OIL TEMPERATURE TOO HIGH\" मैसेज आये】",
      "1. “ 0 ” Press BPFA to acknowledge fault. (थ्रोटल को “ 0 ” पर लायें। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Check oil level in converter expansion tank on converter cubicle. (कनवर्टर क्यूबिकल पर लगे कनवर्टर एक्सपेंशन टैंक में ऑयल लेवल की जाँच करें।)",
      "3. Check MCBs 59.1/2 and 63.1/2 in HB-2 panel. If tripped, open VCB and reset once, and ensure SR pump-2 is running. Verify OCB-2 operation by checking air draft from underframe radiator. (3. HB-2 पैनल में लगे MCB 59.1/2 और 63.1/2 की जाँच करें। यदि ट्रिप मिले तो VCB ओपन करके एक बार रीसेट करें और ट्रैक्शन कनवर्टर पंप-2 का चलना सुनिश्चित करें। OCB-2 का कार्य अंडरफ्रेम में लगे रेडिएटर से हवा आने के द्वारा सुनिश्चित करें।)",
      "4. OCB-2 VCB Lower pantograph HB-2 MCB 59.1/2, MCB 62.1/2 MCB 63.1/2 , 154 (SB-1) -2. (लोको पायलट OCB-2 के इम्पेल्लर व केसिंग की किसी भी क्षति को चेक करें। यदि क्षतिग्रस्त पाते हैं तो VCB ओपन करके पैंटो लोअर करें। HB-2 में लगे MCB 59.1/2, MCB 62.1/2 व MCB 63.1/2 को ट्रिप करें, फिर बाद में स्विच 154 (SB-1) के द्वारा बोगी-2 को आइसोलेट करें।)",
      "5. LSFI Inform TLC and record in locomotive log book. (लोको को एनर्जाइज करें व एक बोगी के साथ गाड़ी चलायें। इस स्थिति में LSFI लगातार जलती रहेगी। TLC को सूचित करें तथा लॉग बुक में दर्ज करें।)",
      "【Situation 2: BOGIE 2 ISOLATED (Only half traction and electrical braking power available) - स्थिति 2: बोगी 2 आइसोलेटेड (आधा TE/BE उपलब्ध)】",
      "1. Switch OFF control electronics and turn it ON again. Raise pantograph, close VCB and resume normal traction. (एक बार कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करें और ऑन करें। पैंटो रेज़ करें, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "2. If the same message repeats, continue normal operation with half traction/braking power. (2. यदि वही मैसेज दोबारा आता है तो आधे ट्रैक्शन / ब्रेकिंग पावर से सामान्य ऑपरेशन चालू करें।)",
      "3. Inform TLC and record in locomotive log book. (TLC को सूचित करें तथा लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0306P1",
    subSystem: "SS03",
    message: "CONVERTER 2 OIL PRESSURE NOT OK\nCheck oil level\nTry to close the VCB again\n(एवं BOGIE 2 ISOLATED / Press <Enter>)",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSFI glows continuously on isolation) [LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी]",
    effect: "VCB will open / Bogie-2 will be isolated (half TE/BE available) [VCB ओपन होगा / बोगी-2 आइसोलेट होगी]",
    actions: [
      "【Situation 1: When message \"CONVERTER 2 OIL PRESSURE NOT OK\" appears - स्थिति 1: जब \"CONVERTER 2 OIL PRESSURE NOT OK\" मैसेज आये】",
      "1. “ 0 ” Press BPFA to acknowledge fault. (थ्रोटल को “ 0 ” पर लायें। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Check oil level in converter expansion tank on converter. If above MAX or below MIN, isolate Bogie-2 via switch 154 to \"II\" and work with half traction. (कनवर्टर पर लगे कनवर्टर एक्सपेंशन टैंक में ऑयल लेवल की जाँच करें। यदि मैक्सिमम से ऊपर या मिनिमम से नीचे है तो बोगी-2 को स्विच 154 के द्वारा ‘ II ’ पर रखकर आइसोलेट करके आधे ट्रैक्शन से कार्य करें।)",
      "3. If oil level is normal, check MCB 63.1/2 in HB-2 panel. If tripped, open VCB and reset once. Verify SR-2 oil pump operation in machine room by feeling its inlet and outlet pipes. (3. यदि ऑयल लेवल बराबर है तो HB-2 पैनल में MCB 63.1/2 को चेक करें। यदि ट्रिप है तो उसे VCB ओपन करके एक बार रीसेट करें। मशीन रूम में SR-2 का ऑयल पंप चल रहा है या नहीं, इसकी जाँच उसके इनलेट तथा आउटलेट पाइप को छूकर करें।)",
      "4. If MCB 63.1/2 trips again after resetting once, do not reset it. Bogie-2 will isolate automatically and LSFI will glow continuously. Work with half traction. (4. यदि MCB 63.1/2 को एक बार रीसेट करने के बाद दोबारा ट्रिप होता है तो उसे रीसेट न करें। बोगी-2 अपने आप आइसोलेट हो जायेगी और LSFI लगातार प्रकाशित होगी। आधे ट्रैक्शन के साथ कार्य करें।)",
      "5. Loco Pilot should inspect Traction Converter-2 oil pipeline for leakage or damage, and check OCB-2 blower casing for impeller damage. In this condition, damaged radiator may cause oil leakage resulting in \"Converter No.2 oil pressure low\" message. Loco Pilot should open VCB, lower pantograph, trip MCB 59.1/2 and MCB 63.1/2 on HB-2 panel. Isolate Bogie-2 by placing switch 154 on \"II\". Energize locomotive and clear block section with one bogie. (In case of steps 2 and 5, LSFI will glow continuously. Inform TLC and record in log book). (लोको पायलट ट्रैक्शन कनवर्टर-2 के ऑयल की पाइप लाइन को ऑयल लीकेज तथा कोई क्षति के लिए चेक करें जिससे तेल का रिसाव हो सकता है और ऑयल कूलिंग ब्लोअर-2 (OCB-2) की केसिंग को इम्पेलर की खराबी से कोई क्षति के लिए चेक करें। ऐसी स्थिति में रेडिएटर के क्षतिग्रस्त होने से तेल का रिसाव होकर \"Converter No.2 oil pressure low\" का मैसेज आ सकता है। लोको पायलट VCB ओपन करें, पैंटो लोअर करें और HB-2 पैनल पर लगे MCB 59.1/2 और MCB 63.1/2 को ट्रिप करें। स्विच 154 को \"II\" पर रखकर बोगी-2 को आईसोलेट करें। लोको एनर्जाइज करके एक बोगी द्वारा कार्य करें। उपरोक्त क्रम सं. 2 और 5 की स्थिति में LSFI लगातार प्रकाशित रहेगी। TLC को सूचित करें तथा लॉग बुक में दर्ज करें।)",
      "6. If SR-2 oil pump is normal, switch OFF control electronics and isolate BUR-2 via MCB 127.22/2. (यदि SR-2 ऑयल पंप सामान्य है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करके BUR-2 को MCB 127.22/2 के द्वारा आइसोलेट करें।)",
      "7. If successful, work train keeping BUR-2 isolated. (यदि सफलता मिलती है तो BUR-2 को आइसोलेट रखते हुए गाड़ी चलाएं।)",
      "8. If not successful, isolate Bogie-2 by placing switch 154 on \"II\". Inform TLC. (यदि सफलता नहीं मिलती है तो बोगी-2 को स्विच 154 को ‘ II ’ पर रखकर आइसोलेट करें। TLC को सूचित करें।)",
      "【Situation 2: When \"BOGIE 2 ISOLATED: Only half traction and electrical braking power available. Press <Enter>\" appears - स्थिति 2: जब बोगी 2 आइसोलेटेड मैसेज आये】",
      "1. Switch OFF control electronics and turn it ON again. Raise pantograph, close VCB and resume normal traction. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करें और फिर ऑन करें। पैंटो रेज़ करें, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "2. If the same message repeats, continue normal operation with half traction/braking power. (2. यदि वही मैसेज दोबारा आता है तो आधे ट्रैक्शन / ब्रेकिंग पावर से सामान्य ऑपरेशन चालू करें।)",
      "3. Inform TLC and record in locomotive log book. (TLC को सूचित करें तथा लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0307P1",
    subSystem: "SS03",
    message: "TRACTION MOTOR TEMPERATURE TOO HIGH\nConverter 2 blocked Bogie 2 mayget isolated\n(एवं BOGIE 2 ISOLATED / Press <Enter>)",
    lamp: "LSFI will glow, half TE/BE available (On isolation LSFI glows continuously) [LSFI प्रकाशित होगी, आधा TE/BE उपलब्ध]",
    effect: "Converter-2 will be blocked / Bogie-2 may be isolated (half TE/BE available) (कन्वर्टर-2 ब्लॉक होगा / बोगी-2 आइसोलेट हो सकती है - आधा TE/BE उपलब्ध)",
    actions: [
      "【Situation 1: When message \"TRACTION MOTOR TEMPERATURE TOO HIGH (Bogie 2)\" appears - स्थिति 1: जब TM टेम्परेचर हाई मैसेज आये】",
      "1. ‘ 0 ’ Press BPFA to acknowledge fault. (ब्लॉक सेक्शन क्लियर करें और थ्रॉटल को ‘ 0 ’ पर लायें। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Check whether Traction Motor Blower-2 (TMB-2) is working via manual air suction at TM Louver. Check MCB 53.1/2 in HB-2 panel; if tripped, open VCB and reset once. (2. ट्रैक्शन मोटर ब्लोअर-2 (TMB-2) कार्य कर रहा है या नहीं, मैन्युअली एयर सक्शन द्वारा TM Louver पर चेक करें। HB-2 पैनल में लगे MCB 53.1/2 को चेक करें। यदि ट्रिप है तो उसे VCB ओपन करके एक बार रीसेट करें।)",
      "【Situation 2: BOGIE 2 ISOLATED (Only half traction and electrical braking power available) - स्थिति 2: बोगी 2 आइसोलेटेड (आधा TE/BE उपलब्ध)】",
      "1. If MCB 53.1/1 and 53.1/2 trip repeatedly, isolate BUR-2 (by turning MCE OFF). Try to close VCB. (MCB 53.1/1 और MCB 53.1/2 बार-बार ट्रिप होते हैं तो BUR-2 को आइसोलेट करें (MCE ऑफ करके)। VCB क्लोज़ करने का प्रयत्न करें।)",
      "2. Switch OFF control electronics and turn it ON again. Raise pantograph, close VCB and resume normal traction. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करें और फिर ऑन करें। पैंटो उठायें, VCB क्लोज़ करने का प्रयत्न करें और यदि लोको सामान्य हो जाता है तो ट्रैक्शन चालू करें।)",
      "3. If fault clears, work train keeping BUR-2 isolated. (यदि दोष दूर हो जाता है तो BUR-2 को आइसोलेट रखते हुए कार्य करें।)",
      "4. If fault persists, Bogie-2 will auto-isolate. (यदि दोष कायम रहता है तो बोगी-2 अपने आप आइसोलेट हो जायेगी।)",
      "5. / Continue normal operation. (यदि वही मैसेज पुनः आता है तो आधे ट्रैक्शन / ब्रेकिंग पावर के साथ सामान्य ऑपरेशन चालू करें।)",
      "6. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0301P2",
    subSystem: "SS03",
    message: "EARTH FAULT IN CONVERTER 2\nNormal operation can continue\nTo be checked during maintenance",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Normal operation will continue (सामान्य ऑपरेशन जारी रहेगा)",
    actions: [
      "1. Press BPFA to acknowledge fault Continue normal operation. (BPFA दबाकर फ़ॉल्ट ACK करें। सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0302P2",
    subSystem: "SS03",
    message: "TRACTION MOTOR OVER SPEED\nREDUCE LOCO SPEED",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Instructions to reduce speed / TE may reduce to \"0\" (गति कम करने का निर्देश / TE ‘ 0 ’ तक कम हो सकता है)",
    actions: [
      "1. Press BPFA to acknowledge fault. (गति कम करें। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Continue normal operation. (सामान्य ऑपरेशन चालू करें।)",
      "3. If speed is within limits and TE reduces to \"0\", open VCB and isolate Bogie-2 by setting switch 154 to \"II\". (3. यदि स्पीड सीमा के अंदर है और TE ‘ 0 ’ तक कम होता है तो VCB ओपन करके बोगी-2 को स्विच 154 को ‘ II ’ पर रखकर आइसोलेट करें।)"
    ]
  },
  {
    id: "F0303P2",
    subSystem: "SS03",
    message: "MUB RESISTANCE TOO HOT IN CONVERTER 2\nWait for 30 seconds",
    lamp: "LSDJ & BPFA will glow, LSFI will flicker (LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी)",
    effect: "VCB will open (VCB ओपन होगा)",
    actions: [
      "1. MUB VCB 30 Press BPFA to acknowledge fault. (MUB रेजिस्टेंस को ठंडा होने के लिए VCB क्लोज़ करने से पहले 30 सेकंड इंतज़ार करें। {15.1 कनवर्टर क्यूबिकल में लगा है} BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Press BLDJ to close VCB. (2. VCB क्लोज़ करने के लिए BLDJ को प्रेस करें।)"
    ]
  },
  {
    id: "F0304P2",
    subSystem: "SS03",
    message: "FAULTY MOTOR TEMPERATURE SENSOR\nNormal operation can continue\nTo be checked during maintenance",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Normal operation will continue (सामान्य ऑपरेशन जारी रहेगा)",
    actions: [
      "1. Press BPFA to acknowledge fault Continue normal operation. (BPFA दबाकर फ़ॉल्ट ACK करें। सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0305P2",
    subSystem: "SS03",
    message: "EQUIPMENT TEMPERATURE HIGH\nTE/BE is being reduced",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Tractive / Electrical Braking Effort (TE/BE) is reducing (TE/BE कम हो रहा है)",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (ब्लॉक सेक्शन क्लियर करें और थ्रोटल को ‘ 0 ’ पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Wait for 10 minutes or some time for transformer/converter oil temperature to normalize. (ट्रांसफार्मर / कनवर्टर के ऑयल का तापमान सामान्य होने के लिए 10 मिनट या कुछ समय इंतज़ार करें।)",
      "3. Check all MCBs in HB/SB panel; if tripped, reset once. (3. HB/SB पैनल में लगे सभी MCB चेक करें यदि ट्रिप हैं तो उसे एक बार रीसेट करें।)",
      "4. Ensure all auxiliaries and MRB are running. (सभी ऑक्सिलरी तथा MRB का चलना सुनिश्चित करें।)",
      "5. Continue normal operation. (सामान्य ऑपरेशन चालू करें।)",
      "6. If fault is not resolved, switch OFF control electronics and turn ON again. Raise pantograph, close VCB, and if locomotive normalizes, resume traction. Otherwise isolate Bogie-2 using bogie cut-out switch 154, inform TLC, and work train with one bogie. (यदि दोष दूर नहीं होता है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करें और फिर ऑन करें। पैंटो रेज़ करें, VCB क्लोज़ करें, यदि लोको सामान्य होता है तो ट्रैक्शन चालू करें। अन्यथा बोगी कट आउट स्विच 154 को ऑपरेट करके बोगी-2 को आइसोलेट करें एवं TLC को सूचित करके एक बोगी के साथ गाड़ी चलाएं।)",
      "7. If unsuccessful within 20 minutes, demand relief engine. (यदि 20 मिनट के अंदर सफलता न मिले तो सहायता इंजन की मांग करें।)"
    ]
  },
  {
    id: "F0306P2",
    subSystem: "SS03",
    message: "DC LINK CAPACITORS\nPRESSURE NOT OK\nNormal operation can continue\nTo be checked during\nmaintenance",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Normal operation will continue (सामान्य ऑपरेशन जारी रहेगा)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें। गंतव्य स्थान पर मेंटेनेंस स्टाफ़ को सूचित करें।)",
      "3. Inspect DC Link capacitors during maintenance. Capacitors may be open-circuited or defective. (3. मेंटेनेंस के दौरान DC Link कैपेसिटर को चेक करना चाहिए। कैपेसिटर ओपन सर्किट या ख़राब हो सकते हैं।)"
    ]
  },
  {
    id: "F0307P2",
    subSystem: "SS03",
    message: "WHEEL SKIDDING IN BOGIE 2\nReduce BE\n(एवं Bombardier IGBT लोको में: LINE CONVERTER ISOLATED BOGIE 2 / Reduced Traction/Braking effort)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Instruction to reduce BE / half TE/BE available (BE कम करने का निर्देश / आधा TE/BE उपलब्ध रहेगा)",
    actions: [
      "【Situation 1: Standard Loco - WHEEL SKIDDING IN BOGIE 2 - Reduce BE - स्थिति 1: सामान्य लोको - WHEEL SKIDDING IN BOGIE 2】",
      "1. Acknowledge the fault by pressing BPFA. (1. BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें।)",
      "2. Ensure that there is no brake binding on the locomotive. (सुनिश्चित करें कि लोको पर ब्रेक बाइंडिंग तो नहीं है।)",
      "3. Check that all parking brakes are properly released. (जाँच करें कि सभी पार्किंग ब्रेक बराबर रिलीज़ हो चुके हैं।)",
      "4. If speed is greater than 1 km/h and DDS shows \"Error Tacho Generator\", loco pilot can work normally. (4. यदि गति 1 किमी/घंटा से ज़्यादा है और DDS में “ Error Tacho Generator ” का मैसेज है तो लोको पायलट सामान्य तरीके से कार्य कर सकता है।)",
      "5. Do not expect BE on the TE/BE meter during braking (i.e., electric braking will not be available). Inform TLC and record in locomotive log book. (ब्रेकिंग के दौरान TE/BE मीटर में BE का प्रयास न देखें (यानी BE नहीं मिलेगा)। TLC को सूचित करें तथा लॉग बुक में दर्ज करें।)",
      "6. Do not use BPCS or Regenerative Brake. (BPCS व रिजनेरेटिव ब्रेक का उपयोग न करें।)",
      "【Situation 2: Bombardier Transportation IGBT - LINE CONVERTER ISOLATED BOGIE 2 (Reduced TE/BE) - स्थिति 2: बॉम्बार्डियर IGBT - लाइन कनवर्टर बोगी 2 आइसोलेट】",
      "1. Acknowledge fault by pressing BPFA and work with half TE and BE. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और आधे TE/BE द्वारा कार्य करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0308P2",
    subSystem: "SS03",
    message: "MOTOR 1 ISOLATED BOGIE 2 / Reduced Traction/Braking effort (Bombardier IGBT)\n(एवं MEDHA IGBT लोको में: TM1 BOGIE 2 ISOLATED / TM 1 of bogie 2 isolated only 5/6th of Traction/electrical Braking power available)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Reduced TE/BE (Bombardier में आधा, MEDHA में बोगी-2 की TM-1 आइसोलेट, केवल 5/6th TE/BE उपलब्ध)",
    actions: [
      "【Situation 1: Bombardier IGBT Loco - MOTOR 1 ISOLATED BOGIE 2 (Reduced TE/BE) - स्थिति 1: Bombardier IGBT लोको - मोटर 1 बोगी 2 आइसोलेट】",
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "【Situation 2: MEDHA IGBT Converter - TM1 BOGIE 2 ISOLATED (5/6th power available) - स्थिति 2: MEDHA IGBT कनवर्टर - TM1 बोगी 2 आइसोलेट】",
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0308P2-BT",
    subSystem: "SS03",
    message: "MOTOR 1 ISOLATED\nBOGIE 2\nReduced Traction/Braking effort\n(M/s BOMBARDIER Transportation IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Reduced Traction/Braking effort (half TE/BE available) [आधा TE/BE उपलब्ध रहेगा]",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0308P2-MEDHA",
    subSystem: "SS03",
    message: "TM1 BOGIE 2 ISOLATED\nTM 1 of bogie 2 isolated only 5/6th of Traction/electrical Braking power available.\n(M/s MEDHA IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "TM 1 isolated, only 5/6th traction/electrical braking power available (TM 1 आइसोलेट, केवल 5/6th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध रहेगा)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0309P2",
    subSystem: "SS03",
    message: "MOTOR 2 ISOLATED BOGIE 2 / Reduced Traction/Braking effort (Bombardier IGBT)\n(एवं MEDHA IGBT लोको में: TM2 BOGIE 2 ISOLATED / TM 2 of bogie 2 isolated only 5/6th of Traction/electrical Braking power available)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Reduced TE/BE (Bombardier में आधा, MEDHA में बोगी-2 की TM-2 आइसोलेट, केवल 5/6th TE/BE उपलब्ध)",
    actions: [
      "【Situation 1: Bombardier IGBT Loco - MOTOR 2 ISOLATED BOGIE 2 (Reduced TE/BE) - स्थिति 1: Bombardier IGBT लोको - मोटर 2 बोगी 2 आइसोलेट】",
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "【Situation 2: MEDHA IGBT Converter - TM2 BOGIE 2 ISOLATED (5/6th power available) - स्थिति 2: MEDHA IGBT कनवर्टर - TM2 बोगी 2 आइसोलेट】",
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0309P2-BT",
    subSystem: "SS03",
    message: "MOTOR 2 ISOLATED\nBOGIE 2\nReduced Traction/Braking effort\n(M/s BOMBARDIER Transportation IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Reduced Traction/Braking effort (half TE/BE available) [आधा TE/BE उपलब्ध रहेगा]",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0309P2-MEDHA",
    subSystem: "SS03",
    message: "TM2 BOGIE 2 ISOLATED\nTM 2 of bogie 2 isolated only 5/6th of Traction/electrical Braking power available.\n(M/s MEDHA IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "TM 2 isolated, only 5/6th traction/electrical braking power available (TM 2 आइसोलेट, केवल 5/6th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध रहेगा)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0310P2",
    subSystem: "SS03",
    message: "MOTOR 3 ISOLATED BOGIE 2 / Reduced Traction/Braking effort (Bombardier IGBT)\n(एवं MEDHA IGBT लोको में: TM3 BOGIE 2 ISOLATED / TM 3 of bogie 2 isolated only 5/6th of Traction/electrical Braking power available)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Reduced TE/BE (Bombardier में आधा, MEDHA में बोगी-2 की TM-3 आइसोलेट, केवल 5/6th TE/BE उपलब्ध)",
    actions: [
      "【Situation 1: Bombardier IGBT Loco - MOTOR 3 ISOLATED BOGIE 2 (Reduced TE/BE) - स्थिति 1: Bombardier IGBT लोको - मोटर 3 बोगी 2 आइसोलेट】",
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "【Situation 2: MEDHA IGBT Converter - TM3 BOGIE 2 ISOLATED (5/6th power available) - स्थिति 2: MEDHA IGBT कनवर्टर - TM3 बोगी 2 आइसोलेट】",
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0310P2-BT",
    subSystem: "SS03",
    message: "MOTOR 3 ISOLATED\nBOGIE 2\nReduced Traction/Braking effort\n(M/s BOMBARDIER Transportation IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Reduced Traction/Braking effort (half TE/BE available) [आधा TE/BE उपलब्ध रहेगा]",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0310P2-MEDHA",
    subSystem: "SS03",
    message: "TM3 BOGIE 2 ISOLATED\nTM 3 of bogie 2 isolated only 5/6th of Traction/electrical Braking power available.\n(M/s MEDHA IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "TM 3 isolated, only 5/6th traction/electrical braking power available (TM 3 आइसोलेट, केवल 5/6th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग power उपलब्ध रहेगा)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0311P2",
    subSystem: "SS03",
    message: "MOTOR 1 BOGIE 2 ISOLATED / TM 1 of bogie 2 isolated only 5/6th TE/BE (BHEL IGBT)\n(एवं MEDHA IGBT लोको में: LINE CONVERTER1 BOGIE 2 ISOLATED / LC1 of bogie 2 isolated only 3/4th TE/BE available)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "BHEL लोको में बोगी-2 की TM-1 आइसोलेट (5/6th TE/BE) एवं MEDHA लोको में LC-1 बोगी-2 आइसोलेट (3/4th TE/BE उपलब्ध)",
    actions: [
      "【Situation 1: BHEL IGBT Converter - MOTOR 1 BOGIE 2 ISOLATED (5/6th TE/BE) - स्थिति 1: BHEL IGBT कनवर्टर - मोटर 1 बोगी 2 आइसोलेट】",
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "【Situation 2: MEDHA IGBT Converter - LINE CONVERTER 1 BOGIE 2 ISOLATED (3/4th TE/BE) - स्थिति 2: MEDHA IGBT कनवर्टर - लाइन कनवर्टर 1 बोगी 2 आइसोलेट】",
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0311P2-BHEL",
    subSystem: "SS03",
    message: "MOTOR 1 BOGIE 2\nISOLATED\nTM 1 of bogie 2 isolated only 5/6th of Traction/electrical Braking power available.\n(M/s BHEL IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "TM 1 isolated, only 5/6th traction/electrical braking power available (TM 1 आइसोलेट, केवल 5/6th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध रहेगा)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0311P2-MEDHA",
    subSystem: "SS03",
    message: "LINE CONVERTER1 BOGIE 2\nISOLATED\nLC1 of bogie 2 isolated only 3/4th of traction/electrical Braking power available.\n(M/s MEDHA IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "LC1 of Bogie-2 isolated, only 3/4th traction/electrical braking power available (LC1 बोगी-2 आइसोलेट, केवल 3/4th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध रहेगा)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0312P2",
    subSystem: "SS03",
    message: "MOTOR 2 BOGIE 2 ISOLATED / TM 2 of bogie 2 isolated only 5/6th TE/BE (BHEL IGBT)\n(एवं MEDHA IGBT लोको में: LINE CONVERTER2 BOGIE 2 ISOLATED / LC2 of bogie 2 isolated only 3/4th TE/BE available)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "BHEL लोको में बोगी-2 की TM-2 आइसोलेट (5/6th TE/BE) एवं MEDHA लोको में LC-2 बोगी-2 आइसोलेट (3/4th TE/BE उपलब्ध)",
    actions: [
      "【Situation 1: BHEL IGBT Converter - MOTOR 2 BOGIE 2 ISOLATED (5/6th TE/BE) - स्थिति 1: BHEL IGBT कनवर्टर - मोटर 2 बोगी 2 आइसोलेट】",
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "【Situation 2: MEDHA IGBT Converter - LINE CONVERTER 2 BOGIE 2 ISOLATED (3/4th TE/BE) - स्थिति 2: MEDHA IGBT कनवर्टर - लाइन कनवर्टर 2 बोगी 2 आइसोलेट】",
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0312P2-BHEL",
    subSystem: "SS03",
    message: "MOTOR 2 BOGIE 2\nISOLATED\nTM 2 of bogie 2 isolated only 5/6th of Traction/electrical Braking power available.\n(M/s BHEL IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "TM 2 isolated, only 5/6th traction/electrical braking power available (TM 2 आइसोलेट, केवल 5/6th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध रहेगा)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0312P2-MEDHA",
    subSystem: "SS03",
    message: "LINE CONVERTER2 BOGIE 2\nISOLATED\nLC2 of bogie 2 isolated only 3/4th of traction/electrical Braking power available.\n(M/s MEDHA IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "LC2 of Bogie-2 isolated, only 3/4th traction/electrical braking power available (LC2 बोगी-2 आइसोलेट, केवल 3/4th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध रहेगा)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0313P2",
    subSystem: "SS03",
    message: "MOTOR 3 BOGIE 2 ISOLATED\nTM 3 of bogie 2 isolated only 5/6th of traction/electrical Braking power available.\n(बोगी-2 के लिए अतिरिक्त मैसेज - जिन लोको में M/s BHEL का IGBT ट्रैक्शन कनवर्टर लगा है)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "TM 3 isolated, only 5/6th traction/electrical braking power available (TM 3 आइसोलेट, केवल 5/6th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध रहेगा)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0313P2-BHEL",
    subSystem: "SS03",
    message: "MOTOR 3 BOGIE 2\nISOLATED\nTM 3 of bogie 2 isolated only 5/6th of traction/electrical Braking power available.\n(M/s BHEL IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "TM 3 isolated, only 5/6th traction/electrical braking power available (TM 3 आइसोलेट, केवल 5/6th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध रहेगा)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0314P2",
    subSystem: "SS03",
    message: "LINE CONVERTER1 BOGIE 2 ISOLATED\nLC1 of bogie 2 isolated only 3/4th of traction/electrical Braking power available.\n(बोगी-2 के लिए अतिरिक्त मैसेज - जिन लोको में M/s BHEL का IGBT ट्रैक्शन कनवर्टर लगा है)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "LC1 isolated, only 3/4th traction/electrical braking power available (LC1 आइसोलेट, केवल 3/4th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध रहेगा)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0314P2-BHEL",
    subSystem: "SS03",
    message: "LINE CONVERTER1 BOGIE 2\nISOLATED\nLC1 of bogie 2 isolated only 3/4th of traction/electrical Braking power available.\n(M/s BHEL IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "LC1 isolated, only 3/4th traction/electrical braking power available (LC1 आइसोलेट, केवल 3/4th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध रहेगा)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0315P2",
    subSystem: "SS03",
    message: "LINE CONVERTER2 BOGIE 2 ISOLATED\nLC2 of bogie 2 isolated only 3/4th of traction/electrical Braking power available.\n(बोगी-2 के लिए अतिरिक्त मैसेज - जिन लोको में M/s BHEL का IGBT ट्रैक्शन कनवर्टर लगा है)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "LC2 isolated, only 3/4th traction/electrical braking power available (LC2 आइसोलेट, केवल 3/4th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध रहेगा)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0315P2-BHEL",
    subSystem: "SS03",
    message: "LINE CONVERTER2 BOGIE 2\nISOLATED\nLC2 of bogie 2 isolated only 3/4th of traction/electrical Braking power available.\n(M/s BHEL IGBT Traction Converter)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "LC2 isolated, only 3/4th traction/electrical braking power available (LC2 आइसोलेट, केवल 3/4th ट्रैक्शन/इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध रहेगा)",
    actions: [
      "1. Acknowledge fault by pressing BPFA and continue normal operation. (BPFA द्वारा फ़ॉल्ट एकनॉलेज (ACK) करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0401P1",
    subSystem: "SS04",
    message: "HARMONIC FILTER CURRENT TOO HIGH\nTry to close VCB again\n(स्क्रीन-2 / Press <Enter>: HARMONIC FILTER ISOLATED / Speak to TLC / Max. permitted speed is 40 Kmph)",
    lamp: "BPFA will glow, VCB will open (BPFA प्रकाशित होगा। VCB ओपन हो जाएगा।)",
    effect: "VCB will open; on Harmonic Filter isolation maximum permissible speed will be 40 KMPH (VCB ओपन हो जाएगा; हार्मोनिक फ़िल्टर आइसोलेट होने पर अधिकतम गति 40 KMPH)",
    actions: [
      "【Screen 1 - स्क्रीन 1】:",
      "1. \"0\" Press BPFA to acknowledge fault. (थ्रॉटल को \"0\" पर लायें। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Press BLDJ to close VCB. (2. VCB क्लोज़ करने के लिए BLDJ को प्रेस करें।)",
      "3. If fault persists, switch OFF control electronics once and turn ON. Raise pantograph, close VCB and resume traction. (यदि दोष बना रहता है तो कंट्रोल इलेक्ट्रॉनिक्स को एक बार ऑफ़ करें और फिर ऑन करें। पेण्टो रेज़ करें, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "【Screen 2 (Press ENTER) - स्क्रीन 2 (ENTER दबाने पर)】:",
      "1. Speed will reduce to 40 km/h. (गति कम होकर 40 KMPH होगी।)",
      "2. Inform TLC Resume normal traction. (TLC को सूचित करें तथा सामान्य ट्रैक्शन चालू करें।)",
      "3. - Switch OFF control electronics. (एक-दो सेक्शन पास करने के उपरांत कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करें और फिर ऑन करें।)",
      "4. If harmonic filter comes into service, work train at normal speed. If it does not come into service, clear section with a speed restriction of 40 km/h and inform TLC. (यदि हार्मोनिक फ़िल्टर सर्विस में आ जाता है तो सामान्य गति से गाड़ी चलाएं। यदि सर्विस में नहीं आता है तो 40 KMPH की गति सीमा से सेक्शन क्लियर करें और TLC को सूचित करें।)",
      "5. If not successful: 40 KMPH -1 154 ( ) TLC TE/BE. (यदि सफलता नहीं मिलती है तो 40 KMPH की गति से दोनों ट्रैक्शन कनवर्टर के साथ गाड़ी चलाएं या बोगी-1 को स्विच 154 के द्वारा आइसोलेट करें। कंट्रोल इलेक्ट्रॉनिक्स ऑफ़ करें और फिर ऑन करें (आइसोलेट हार्मोनिक फ़िल्टर को वापस सर्विस में लाने के लिए)। TLC के आदेशानुसार आधे TE/BE पावर के साथ सामान्य गति से काम करें।)",
      "6. Record in log book. (लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0401P2",
    subSystem: "SS04",
    message: "FILTER CONTACTOR 8.1\nSTUCK ON\nIf VCB opens it will not close again",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "If VCB opens, it will not be possible to close VCB by pressing BLDJ (यदि VCB ओपन होता है तो BLDJ को प्रेस करने से VCB क्लोज़ करना संभव नहीं होगा)",
    actions: [
      "1. VCB BLDJ VCB Press BPFA to acknowledge fault. (यदि VCB ओपन होता है तो BLDJ को प्रेस करने से VCB क्लोज़ करना संभव नहीं होगा। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. VCB Stop the train immediately. (बिना VCB ओपन करे सेक्शन क्लियर करके गाड़ी खड़ी करें।)",
      "3. Switch OFF control electronics and turn it ON again. Raise pantograph, close VCB and resume normal traction. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करें और फिर ऑन करें। पेण्टो उठायें, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "4. If VCB does not close, demand relief engine within 20 minutes. (यदि VCB क्लोज़ नहीं होता है तो 20 मिनट में सहायता इंजन की मांग करें।)"
    ]
  },
  {
    id: "F0402P1",
    subSystem: "SS04",
    message: "HARM. FILTER CONTACTOR (S) STUCK OFF/ON\nHarmonic filter will be isolated / Speak to TLC\n(स्क्रीन-2 / Press <Enter>: HARMONIC FILTER ISOLATED / Speak to TLC / Max. permitted speed is 40 Kmph)",
    lamp: "BPFA will glow, VCB will open (BPFA प्रकाशित होगा। VCB ओपन हो जाएगा।)",
    effect: "VCB will open; on Harmonic Filter isolation maximum permissible speed will be 40 KMPH (VCB ओपन हो जाएगा; हार्मोनिक फ़िल्टर आइसोलेट होने पर अधिकतम गति 40 KMPH)",
    actions: [
      "【Screen 1 - स्क्रीन 1】:",
      "1. \"0\" Press BPFA to acknowledge fault. (थ्रॉटल को \"0\" पर लायें। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Press BLDJ to close VCB. (2. VCB क्लोज़ करने के लिए BLDJ को प्रेस करें।)",
      "3. If fault persists, switch OFF control electronics once and turn ON. Raise pantograph, close VCB and resume traction. (यदि दोष बना रहता है तो कंट्रोल इलेक्ट्रॉनिक्स को एक बार ऑफ़ करें और फिर ऑन करें। पेण्टो रेज़ करें, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "【Screen 2 (Press ENTER) - स्क्रीन 2 (ENTER दबाने पर)】:",
      "1. Speed will reduce to 40 km/h. (गति कम होकर 40 KMPH होगी।)",
      "2. Inform TLC Resume normal traction. (TLC को सूचित करें तथा सामान्य ट्रैक्शन चालू करें।)",
      "3. - Switch OFF control electronics. (एक-दो सेक्शन पास करने के उपरांत कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करें और फिर ऑन करें।)",
      "4. If harmonic filter comes into service, work train at normal speed. If it does not come into service, clear section with a speed restriction of 40 km/h and inform TLC. (यदि हार्मोनिक फ़िल्टर सर्विस में आ जाता है तो सामान्य गति से गाड़ी चलाएं। यदि सर्विस में नहीं आता है तो 40 KMPH की गति सीमा से सेक्शन क्लियर करें और TLC को सूचित करें।)",
      "5. If not successful:, 40 KMPH -1 154 ( ) TLC TE/BE. (यदि सफलता नहीं मिलती है तो, 40 KMPH की गति से दोनों ट्रैक्शन कनवर्टर के साथ गाड़ी चलाएं या बोगी-1 को स्विच 154 के द्वारा आइसोलेट करें। कंट्रोल इलेक्ट्रॉनिक्स ऑफ़ करें और फिर ऑन करें (आइसोलेटेड हार्मोनिक फ़िल्टर को वापस सर्विस में लाने के लिए)। TLC के आदेशानुसार आधे TE/BE पावर के साथ सामान्य गति से काम करें।)",
      "6. Record in log book. (लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0402P2",
    subSystem: "SS04",
    message: "EARTH FAULT HARMONIC FILTER CIRCUIT\nNormal operation can continue\nTo be checked during maintenance",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Normal operation continues. No traction or braking restrictions. (सामान्य ऑपरेशन जारी रहेगा। कोई कर्षण/ब्रेकिंग प्रतिबंध नहीं।)",
    actions: [
      "1. BPFA Continue normal operation. (BPFA द्वारा फ़ॉल्ट एक्नॉलेज करें। सामान्य ऑपरेशन चालू रखें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0404P1",
    subSystem: "SS04",
    message: "RESISTOR TOO HOT\nNo. of filter discharges exceeded\nVCB will remain inhibited 15 min.",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "VCB ओपन हो जाएगा तथा 15 मिनट तक इनहिबिट (Inhibited) रहेगा।",
    actions: [
      "1. “0” Press BPFA to acknowledge fault. (थ्रॉटल को “0” पर लायें। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Wait for 15 minutes and press BLDJ to attempt closing VCB again. (2. 15 मिनट इंतजार करें तथा BLDJ प्रेस करके फिर से VCB क्लोज़ करने का प्रयत्न करें।)",
      "3. If fault persists, switch OFF control electronics and turn it ON again. Raise pantograph, close VCB and resume normal traction. (यदि दोष बना रहता है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करें और फिर से ऑन करें। पेण्टो उठायें, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "4. Inform TLC and record in locomotive log book. (TLC को सूचित करें तथा लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0403P2",
    subSystem: "SS04",
    message: "TM1 BOGIE 1 ISOLATED\nTM 1 of bogie 1 isolated only 5/6th of Traction/electrical Braking power available.\n(बोगी-1 अतिरिक्त संदेश - M/s ABB IGBT)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "TM 1 (Bogie-1) will be isolated. Only 5/6th traction / electrical braking power available. (TM 1 बोगी-1 आइसोलेट होगा। केवल 5/6th ट्रैक्शन / इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध रहेगा।)",
    actions: [
      "1. BPFA Continue normal operation. (BPFA द्वारा फ़ॉल्ट एक्नॉलेज करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0404P2",
    subSystem: "SS04",
    message: "TM2 BOGIE 1 ISOLATED\nTM 2 of bogie 1 isolated only 5/6th of Traction/electrical Braking power available.\n(बोगी-1 अतिरिक्त संदेश - M/s ABB IGBT)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "TM 2 (Bogie-1) will be isolated. Only 5/6th traction / electrical braking power available. (TM 2 बोगी-1 आइसोलेट होगा। केवल 5/6th ट्रैक्शन / इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध रहेगा।)",
    actions: [
      "1. BPFA Continue normal operation. (BPFA द्वारा फ़ॉल्ट एक्नॉलेज करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0405P2",
    subSystem: "SS04",
    message: "TM3 BOGIE 1 ISOLATED\nTM 3 of bogie 1 isolated only 5/6th of Traction/electrical Braking power available.\n(बोगी-1 अतिरिक्त संदेश - M/s ABB IGBT)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "TM 3 (Bogie-1) will be isolated. Only 5/6th traction / electrical braking power available. (TM 3 बोगी-1 आइसोलेट होगा। केवल 5/6th ट्रैक्शन / इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध रहेगा।)",
    actions: [
      "1. BPFA Continue normal operation. (BPFA द्वारा फ़ॉल्ट एक्नॉलेज करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0406P2",
    subSystem: "SS04",
    message: "LINE CONVERTER1 BOGIE 1 ISOLATED\nLC1 of bogie 1 isolated only 3/4th of traction/electrical Braking power available.\n(बोगी-1 अतिरिक्त संदेश - M/s ABB IGBT)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Line Converter-1 (Bogie-1) will be isolated. Only 3/4th traction / electrical braking power available. (लाइन कनवर्टर-1 बोगी-1 आइसोलेट होगा। केवल 3/4th पावर उपलब्ध रहेगा।)",
    actions: [
      "1. BPFA Continue normal operation. (BPFA द्वारा फ़ॉल्ट एक्नॉलेज करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0407P2",
    subSystem: "SS04",
    message: "LINE CONVERTER2 BOGIE 1 ISOLATED\nLC2 of bogie 1 isolated, only 3/4th of traction/electrical Braking power available.\n(बोगी-1 अतिरिक्त संदेश - M/s ABB IGBT)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Line Converter-2 (Bogie-1) will be isolated. Only 3/4th traction / electrical braking power available. (लाइन कनवर्टर-2 बोगी-1 आइसोलेट होगा। केवल 3/4th पावर उपलब्ध रहेगा।)",
    actions: [
      "1. BPFA Continue normal operation. (BPFA द्वारा फ़ॉल्ट एक्नॉलेज करें और सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0503P1",
    subSystem: "SS05",
    message: "EARTH FAULT IN\nHOTEL LOAD\nCIRCUIT\nHotel Load will be\nisolated",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Hotel Load आइसोलेट हो जाएगा (Hotel Load will be isolated)",
    actions: [
      "1. Switch OFF BLHO switch to open Hotel Load contactor. Acknowledge fault by pressing BPFA. (1. Hotel Load कॉन्टैक्टर को खोलने के लिए BLHO स्विच को ऑफ़ करें। BPFA द्वारा फ़ॉल्ट एक्नॉलेज (ACK) करें।)",
      "2. Inform maintenance staff. (मेंटेनेंस स्टाफ को सूचित करें।)"
    ]
  },
  {
    id: "F0504P1",
    subSystem: "SS05",
    message: "OVER CURRENT IN\nHOTEL LOAD\nCIRCUIT\nTry to close VCB again",
    lamp: "BPFA & LSDJ will glow (BPFA एवं LSDJ प्रकाशित होंगे)",
    effect: "VCB ओपन हो जाएगा (Try to close VCB again)",
    actions: [
      "【1st Occasion - प्रथम बार】:",
      "1. Acknowledge fault by pressing BPFA. (BPFA द्वारा फ़ॉल्ट एक्नॉलेज (ACK) करें।)",
      "2. Press BLDJ to close VCB. (2. VCB क्लोज़ करने के लिए BLDJ को प्रेस करें।)",
      "【2nd Occasion (If fault persists) - दूसरी बार (यदि दोष बना रहे)】:",
      "1. Inform maintenance staff. (मेंटेनेंस स्टाफ को सूचित करें।)"
    ]
  },
  {
    id: "F0501P2",
    subSystem: "SS05",
    message: "HOTEL LOAD\nCONTACTOR STUCK\nOFF\nHotel Load not available",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Hotel Load उपलब्ध नहीं रहेगा (Hotel Load not available)",
    actions: [
      "1. Acknowledge fault by pressing BPFA. (BPFA द्वारा फ़ॉल्ट एक्नॉलेज (ACK) करें।)",
      "2. Inform maintenance staff. (मेंटेनेंस स्टाफ को सूचित करें।)"
    ]
  },
  {
    id: "F0502P2",
    subSystem: "SS05",
    message: "HOTEL LOAD\nCONTACTOR STUCK\nON\nFor Un/coupling hotel\nload trip VCB",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "If VCB has tripped, it will not close again. VCB tripping is mandatory for Hotel Load coupling/uncoupling. (यदि VCB ट्रिप हुआ है तो दोबारा क्लोज़ नहीं होगा। होटल लोड कप्लिंग/अनकप्लिंग हेतु VCB ट्रिप आवश्यक।)",
    actions: [
      "1. Acknowledge fault by pressing BPFA. (BPFA द्वारा फ़ॉल्ट एक्नॉलेज (ACK) करें।)",
      "2. Inform TLC TLC VCB. (TLC को सूचित करें और TLC के निर्देशानुसार कार्य करें क्योंकि यदि VCB ट्रिप हुआ है तो क्लोज़ नहीं होगा।)"
    ]
  },
  {
    id: "F0503P2",
    subSystem: "SS05",
    message: "TM 1 BOGIE 2 ISOLATED\nTM 1 of bogie 2 isolated only 5/6th of Traction/electrical Braking power available.\n(बोगी-2 अतिरिक्त संदेश - M/s ABB IGBT)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "TM 1 (Bogie-2) will be isolated. Only 5/6th traction / electrical braking power available. (TM 1 बोगी-2 आइसोलेट होगा। केवल 5/6th ट्रैक्शन / इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध रहेगा।)",
    actions: [
      "1. Press BPFA to acknowledge fault. Continue normal operation. (BPFA द्वारा फ़ॉल्ट एक्नॉलेज (ACK) करें। सामान्य ऑपरेशन चालू रखें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0504P2",
    subSystem: "SS05",
    message: "TM 2 BOGIE 2 ISOLATED\nTM 2 of bogie 2 isolated only 5/6th of Traction/electrical Braking power available.\n(बोगी-2 अतिरिक्त संदेश - M/s ABB IGBT)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "TM 2 (Bogie-2) will be isolated. Only 5/6th traction / electrical braking power available. (TM 2 बोगी-2 आइसोलेट होगा। केवल 5/6th ट्रैक्शन / इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध रहेगा।)",
    actions: [
      "1. Press BPFA to acknowledge fault. Continue normal operation. (BPFA द्वारा फ़ॉल्ट एक्नॉलेज (ACK) करें। सामान्य ऑपरेशन चालू रखें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0505P2",
    subSystem: "SS05",
    message: "TM 3 BOGIE 2 ISOLATED\nTM 3 of bogie 2 isolated only 5/6th of Traction/electrical Braking power available.\n(बोगी-2 अतिरिक्त संदेश - M/s ABB IGBT)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "TM 3 (Bogie-2) will be isolated. Only 5/6th traction / electrical braking power available. (TM 3 बोगी-2 आइसोलेट होगा। केवल 5/6th ट्रैक्शन / इलेक्ट्रिकल ब्रेकिंग पावर उपलब्ध रहेगा।)",
    actions: [
      "1. Press BPFA to acknowledge fault. Continue normal operation. (BPFA द्वारा फ़ॉल्ट एक्नॉलेज (ACK) करें। सामान्य ऑपरेशन चालू रखें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0506P2",
    subSystem: "SS05",
    message: "LINE CONVERTER 1 BOGIE 2 ISOLATED\nLC1 of bogie 2 isolated only 3/4th of traction/electrical Braking power available.\n(बोगी-2 अतिरिक्त संदेश - M/s ABB IGBT)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Line Converter-1 (Bogie-2) will be isolated. Only 3/4th traction / electrical braking power available. (लाइन कनवर्टर-1 बोगी-2 आइसोलेट होगा। केवल 3/4th पावर उपलब्ध रहेगा।)",
    actions: [
      "1. Press BPFA to acknowledge fault. Continue normal operation. (BPFA द्वारा फ़ॉल्ट एक्नॉलेज (ACK) करें। सामान्य ऑपरेशन चालू रखें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0507P2",
    subSystem: "SS05",
    message: "LINE CONVERTER 2 BOGIE 2 ISOLATED\nLC2 of bogie 2 isolated only 3/4th of traction/electrical Braking power available.\n(बोगी-2 अतिरिक्त संदेश - M/s ABB IGBT)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Line Converter-2 (Bogie-2) will be isolated. Only 3/4th traction / electrical braking power available. (लाइन कनवर्टर-2 बोगी-2 आइसोलेट होगा। केवल 3/4th पावर उपलब्ध रहेगा।)",
    actions: [
      "1. Press BPFA to acknowledge fault. Continue normal operation. (BPFA द्वारा फ़ॉल्ट एक्नॉलेज (ACK) करें। सामान्य ऑपरेशन चालू रखें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0601P1",
    subSystem: "SS06",
    message: "DISTURBANCE IN\nPROCESSOR BUR 1\nTry to close VCB again\n(स्क्रीन-2 / Press <Enter>: AUX CONVERTER1 ISOLATED / Driving still Possible / max. ventilation level will be reduced)",
    lamp: "BPFA will glow, VCB will open (BPFA प्रकाशित होगा। VCB ओपन हो जाएगा।)",
    effect: "VCB ओपन हो जाएगा; BUR-1 स्वतः आइसोलेट होगा (Try to close VCB again)।",
    actions: [
      "【Screen 1 - स्क्रीन 1】:",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. BUR-1 will isolate automatically. Press ENTER key. (2. BUR-1 अपने आप आइसोलेट होगा। ENTER key दबाएं।)",
      "3. Press BLDJ to close VCB. (3. VCB क्लोज़ करने के लिए BLDJ को प्रेस करें।)",
      "4. Drive train with normal traction. (सामान्य ट्रैक्शन द्वारा गाड़ी चलाएं।)",
      "【Screen 2 (Press ENTER) - स्क्रीन 2 (ENTER दबाने पर)】:",
      "1. Check MCB No. 127.22/1 in SB-1; if tripped, switch OFF control electronics and reset MCB once. (1. SB-1 में लगे MCB नं. 127.22/1 को चेक करें, यदि ट्रिप है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके MCB को एक बार रीसेट करें।)",
      "2. If MCB is not tripped, switch OFF control electronics once and turn it ON again. Raise pantograph, close VCB and resume traction. (यदि MCB ट्रिप नहीं है तो कंट्रोल इलेक्ट्रॉनिक्स को एक बार ऑफ करके ऑन करें। पैंटो उठाएं, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "3. If same message repeats, continue normal operation with BUR-1 isolated. Do not attempt to take BUR-1 into service by cycling control electronics. Work train keeping BUR-1 isolated. (3. यदि वही मैसेज फिर से आता है, BUR-1 को आइसोलेट रखते हुए सामान्य ऑपरेशन चालू रखें और कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ तथा ऑन करके BUR-1 को सर्विस में लेने का प्रयत्न न करें। BUR-1 को आइसोलेट रखते हुए गाड़ी चलाएं।)",
      "4. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "SS06-BUR1-ISOLATED",
    subSystem: "SS06",
    message: "AUX CONVERTER1\nISOLATED\nDriving still Possible\nmax. ventilation level will be\nreduced\nPress<Enter>",
    lamp: "BPFA will remain glowing (BPFA प्रकाशित रहेगा)",
    effect: "BUR-1 आइसोलेट रहेगा; ड्राइविंग संभव है, अधिकतम वेंटिलेशन स्तर घट जाएगा (Driving still Possible, max. ventilation level will be reduced)।",
    actions: [
      "1. Check MCB No. 127.22/1 in SB-1; if tripped, switch OFF control electronics and reset MCB once. (1. SB-1 में लगे MCB नं. 127.22/1 को चेक करें, यदि ट्रिप है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके MCB को एक बार रीसेट करें।)",
      "2. If MCB is not tripped, switch OFF control electronics once and turn it ON again. Raise pantograph, close VCB and resume traction. (यदि MCB ट्रिप नहीं है तो कंट्रोल इलेक्ट्रॉनिक्स को एक बार ऑफ करके ऑन करें। पैंटो उठाएं, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "3. If same message repeats, continue normal operation with BUR-1 isolated. Do not attempt to take BUR-1 into service by cycling control electronics. Work train keeping BUR-1 isolated. (3. यदि वही मैसेज फिर से आता है, BUR-1 को आइसोलेट रखते हुए सामान्य ऑपरेशन चालू रखें और कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ तथा ऑन करके BUR-1 को सर्विस में लेने का प्रयत्न न करें। BUR-1 को आइसोलेट रखते हुए गाड़ी चलाएं।)",
      "4. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0602P1",
    subSystem: "SS06",
    message: "FAULT IN AUXILIARY\nCONVERTER 1\nTry to close VCB again\n(स्क्रीन-2 / Press <Enter>: AUX CONVERTER1 ISOLATED / Driving still possible / max. ventilation level will be reduced)",
    lamp: "BPFA will glow, VCB will open (BPFA प्रकाशित होगा। VCB ओपन हो जाएगा।)",
    effect: "VCB ओपन हो जाएगा; BUR-1 स्वतः आइसोलेट होगा (Try to close VCB again)।",
    actions: [
      "【Screen 1 - स्क्रीन 1】:",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Press BLDJ to close VCB. (2. VCB क्लोज़ करने के लिए BLDJ प्रेस करें।)",
      "3. If message recurs, BUR-1 will isolate automatically. Press ENTER key. (3. यदि फिर से मैसेज आता है तो BUR-1 अपने आप आइसोलेट होगा। <ENTER> key दबाएं।)",
      "4. Check MCB 54.1/1 in HB-1. If tripped, open VCB and reset MCB 54.1/1 once. If it trips again, clear section, isolate Bogie-1 and inform TLC. (HB-1 में लगे MCB नं. 54.1/1 को चेक करें। यदि ट्रिप है तो VCB ओपन करके एक बार MCB नं. 54.1/1 को रीसेट करें। यदि फिर से ट्रिप होती है तो सेक्शन क्लियर करके बोगी-1 को आइसोलेट करें और TLC को सूचित करें।)",
      "5. Drive train with normal traction. (सामान्य ट्रैक्शन द्वारा गाड़ी चलाएं।)",
      "【Screen 2 (Press ENTER) - स्क्रीन 2 (ENTER दबाने पर)】:",
      "1. Check MCB No. 127.22/1 in SB-1; if tripped, switch OFF control electronics and reset MCB once. (1. SB-1 में लगे MCB नं. 127.22/1 को चेक करें, यदि ट्रिप है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके MCB को एक बार रीसेट करें।)",
      "2. Switch OFF control electronics and turn it ON again. Raise pantograph, close VCB, and resume traction if locomotive normalizes. (2. कंट्रोल इलेक्ट्रॉनिक्स को एक बार ऑफ़ करके ऑन करें। पेंटो उठाएं, VCB क्लोज़ करें, यदि लोको सामान्य होता है तो ट्रैक्शन चालू करें।)",
      "3. If same message repeats, continue normal operation keeping BUR-1 isolated. If BUR-1 does not isolate automatically, open VCB, switch OFF control electronics, and trip MCB 127.22/1 in SB-1 to isolate BUR-1. (3. यदि वही मैसेज फिर से आता है, BUR-1 को आइसोलेट रखते हुए सामान्य ऑपरेशन चालू रखें। यदि BUR-1 आइसोलेट नहीं हो रहा है तो VCB ओपन करके तथा कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके SB-1 में लगे MCB 127.22/1 को ट्रिप करके BUR-1 को आइसोलेट करें।)",
      "4. Energize locomotive and work train keeping BUR-1 isolated. In this condition, LSFI lamp will glow continuously. (4. लोको को एनरजाइज करें और BUR-1 को आइसोलेट रखते हुए गाड़ी कार्य करें। इस स्थिति में LSFI की बत्ती लगातार जलती रहेगी।)",
      "5. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0603P1",
    subSystem: "SS06",
    message: "CONTACTOR FAULT IN\nAUX. CONV-1/HB1\nContactor 52/4 or 52/5 stuck\nOFF or ON\n(स्क्रीन-2 / Press <Enter>: AUX CONVERTER1 ISOLATED / Driving still possible / max. ventilation level will be reduced)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Converter-1/HB1 contactor 52/4 or 52/5 stuck OFF or ON; BUR-1 will isolate if fault persists. Normal operation permitted till scheduled halt. (कनवर्टर-1/HB1 कॉन्टैक्टर 52/4 या 52/5 स्टक OFF या ON; दोष बना रहने पर BUR-1 आइसोलेट होगा।)",
    actions: [
      "【Screen 1 - स्क्रीन 1】:",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Press BLDJ to close VCB. (2. VCB क्लोज़ करने के लिए BLDJ प्रेस करें।)",
      "3. If fault still persists, BUR-1 will be isolated. Loco pilot can continue normal operation till next scheduled halt. (यदि दोष फिर भी रहता है तो BUR-1 आइसोलेट होगा। लोको पायलट अगले निर्धारित स्टॉप तक सामान्य ऑपरेशन कर सकता है।)",
      "【Screen 2 (Press ENTER) - स्क्रीन 2 (ENTER दबाने पर)】:",
      "1. Work train keeping BUR-1 isolated. (BUR-1 को आइसोलेट रखते हुए गाड़ी चलाएं।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0604P1",
    subSystem: "SS06",
    message: "VENTILATION BUR 1\nDISTURBED\nPress acknowledge to\nreconfigure to BUR 2",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "BUR 1 का वेंटिलेशन बाधित होगा। BPFA दबाने पर लोड BUR 2 पर रीकॉन्फ़िगर होगा।",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Switch OFF control electronics and turn it ON again. Raise pantograph, close VCB, and resume traction if locomotive normalizes. (2. कंट्रोल इलेक्ट्रॉनिक्स को एक बार ऑफ़ करके ऑन करें। पेंटो उठाएं, VCB क्लोज़ करें, यदि लोको सामान्य होता है तो ट्रैक्शन चालू करें।)",
      "3. If the same message repeats, continue normal operation keeping BUR-1 isolated. (3. यदि वही मैसेज फिर से आता है, BUR-1 को आइसोलेट रखते हुए सामान्य ऑपरेशन चालू रखें।)",
      "4. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0701P1",
    subSystem: "SS07",
    message: "DISTURBANCE IN\nPROCESSOR BUR 2\nTry to close VCB again\n(स्क्रीन-2 / Press <Enter>: AUX CONVERTER 2 ISOLATED / Driving still Possible / max. ventilation level will be reduced)",
    lamp: "BPFA will glow, VCB will open (BPFA प्रकाशित होगा। VCB ओपन हो जाएगा।)",
    effect: "VCB ओपन हो जाएगा; BUR-2 स्वतः आइसोलेट होगा (Try to close VCB again)।",
    actions: [
      "【Screen 1 - स्क्रीन 1】:",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. BUR-2 will isolate automatically. Press ENTER key. (2. BUR-2 अपने आप आइसोलेट होगा। ENTER key दबाएं।)",
      "3. Press BLDJ to close VCB. (3. VCB क्लोज़ करने के लिए BLDJ को प्रेस करें।)",
      "4. Drive train with normal traction. (सामान्य ट्रैक्शन द्वारा गाड़ी चलाएं।)",
      "【Screen 2 (Press ENTER) - स्क्रीन 2 (ENTER दबाने पर)】:",
      "1. Check MCB No. 127.22/2 in SB-2; if tripped, switch OFF control electronics and reset MCB once. (1. SB-2 में लगे MCB नं. 127.22/2 को चेक करें, यदि ट्रिप है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके MCB को एक बार रीसेट करें।)",
      "2. If MCB is not tripped, switch OFF control electronics and turn it ON again. Raise pantograph, close VCB, and resume traction if locomotive normalizes. (2. यदि MCB ट्रिप नहीं है तो कंट्रोल इलेक्ट्रॉनिक्स को एक बार ऑफ़ करके ऑन करें। पेंटो रेज़ करें, VCB क्लोज़ करें, यदि लोको सामान्य होता है तो ट्रैक्शन चालू करें।)",
      "3. If same message repeats, continue normal operation keeping BUR-2 isolated. Do not attempt to take BUR-2 into service by cycling control electronics. Work train keeping BUR-2 isolated. (3. यदि वही मैसेज फिर से आता है, BUR-2 को आइसोलेट रखते हुए सामान्य ऑपरेशन चालू रखें और कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ तथा ऑन करके BUR-2 को सर्विस में लेने की कोशिश न करें। BUR-2 को आइसोलेट रखते हुए गाड़ी चलाएं।)",
      "4. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "SS07-BUR2-ISOLATED",
    subSystem: "SS07",
    message: "AUX CONVERTER 2\nISOLATED\nDriving still Possible\nmax. ventilation level will be\nreduced\nPress<Enter>",
    lamp: "BPFA will remain glowing (BPFA प्रकाशित रहेगा)",
    effect: "BUR-2 आइसोलेट रहेगा; ड्राइविंग संभव है, अधिकतम वेंटिलेशन स्तर घट जाएगा (Driving still Possible, max. ventilation level will be reduced)।",
    actions: [
      "1. Check MCB No. 127.22/2 in SB-2; if tripped, switch OFF control electronics and reset MCB once. (1. SB-2 में लगे MCB नं. 127.22/2 को चेक करें, यदि ट्रिप है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके MCB को एक बार रीसेट करें।)",
      "2. If MCB is not tripped, switch OFF control electronics and turn it ON again. Raise pantograph, close VCB, and resume traction if locomotive normalizes. (2. यदि MCB ट्रिप नहीं है तो कंट्रोल इलेक्ट्रॉनिक्स को एक बार ऑफ़ करके ऑन करें। पेंटो रेज़ करें, VCB क्लोज़ करें, यदि लोको सामान्य होता है तो ट्रैक्शन चालू करें।)",
      "3. If same message repeats, continue normal operation keeping BUR-2 isolated. Do not attempt to take BUR-2 into service by cycling control electronics. Work train keeping BUR-2 isolated. (3. यदि वही मैसेज फिर से आता है, BUR-2 को आइसोलेट रखते हुए सामान्य ऑपरेशन चालू रखें और कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ तथा ऑन करके BUR-2 को सर्विस में लेने की कोशिश न करें। BUR-2 को आइसोलेट रखते हुए गाड़ी चलाएं।)",
      "4. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0702P1",
    subSystem: "SS07",
    message: "FAULT IN AUXILIARY\nCONVERTER 2\nTry to close VCB again\n(स्क्रीन-2 / Press <Enter>: AUX CONVERTER 2 ISOLATED / Driving still possible / max. ventilation level will be reduced)",
    lamp: "BPFA will glow, VCB will open (BPFA प्रकाशित होगा। VCB ओपन हो जाएगा।)",
    effect: "VCB ओपन हो जाएगा; BUR-2 स्वतः आइसोलेट होगा (Try to close VCB again)। MCB 54.1/2 बार-बार ट्रिप होने पर सेक्शन क्लियर कर सहायता इंजन मांगें।",
    actions: [
      "【Screen 1 - स्क्रीन 1】:",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Press BLDJ to close VCB. (2. VCB क्लोज़ करने के लिए BLDJ प्रेस करें।)",
      "3. If message recurs, BUR-2 will isolate automatically. Press ENTER key. (3. यदि फिर से मैसेज आता है तो BUR-2 अपने आप आइसोलेट होगा। <ENTER> key दबाएं।)",
      "4. Check MCB 54.1/2 in HB-2. If tripped, open VCB and reset MCB 54.1/2 once. If it trips again, clear section, isolate Bogie-2 and inform TLC. (HB-2 में लगे MCB नं. 54.1/2 को चेक करें। यदि ट्रिप है तो VCB ओपन करके एक बार MCB नं. 54.1/2 को रीसेट करें। यदि फिर से ट्रिप होती है तो सेक्शन क्लियर करके बोगी-2 को आइसोलेट करें और TLC को सूचित करें।)",
      "【Screen 2 (Press ENTER) - स्क्रीन 2 (ENTER दबाने पर)】:",
      "1. Check MCB No. 127.22/2 in SB-2; if tripped, switch OFF control electronics and reset MCB once. (1. SB-2 में लगे MCB नं. 127.22/2 को चेक करें, यदि ट्रिप है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके MCB को एक बार रीसेट करें।)",
      "2. If MCB is not tripped, switch OFF control electronics and turn it ON again. Raise pantograph, close VCB, and resume traction if locomotive normalizes. (2. यदि MCB ट्रिप नहीं है तो कंट्रोल इलेक्ट्रॉनिक्स को एक बार ऑफ़ करके ऑन करें। पेंटो रेज़ करें, VCB क्लोज़ करें, यदि लोको सामान्य होता है तो ट्रैक्शन चालू करें।)",
      "3. If same message repeats, continue normal operation keeping BUR-2 isolated. If BUR-2 does not isolate automatically, open VCB, switch OFF control electronics, and trip MCB 127.22/2 in SB-2 to isolate BUR-2. (3. यदि वही मैसेज फिर से आता है, BUR-2 को आइसोलेट रखते हुए सामान्य ऑपरेशन चालू रखें। यदि BUR-2 आइसोलेट नहीं हो रहा है तो VCB ओपन करके तथा कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके SB-2 में लगे MCB 127.22/2 को ट्रिप करके BUR-2 को आइसोलेट करें।)",
      "4. Energize locomotive and work train keeping BUR-2 isolated. In this condition, LSFI lamp will glow continuously. (4. लोको को एनरजाइज करें और BUR-2 को आइसोलेट रखते हुए गाड़ी कार्य करें। इस स्थिति में LSFI की बत्ती लगातार प्रकाशित रहेगी।)",
      "5. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0703P1",
    subSystem: "SS07",
    message: "CONTACTOR FAULT IN\nAUX CONV-2/ HB2\nContactor 52/1/2/4 stuck OFF or ON\n(स्क्रीन-2 / Press <Enter>: AUX CONVERTER 2 ISOLATED / Driving still possible / max. ventilation level will be reduced)",
    lamp: "BPFA will glow, VCB will open (BPFA प्रकाशित होगा। VCB ओपन हो जाएगा।)",
    effect: "VCB ओपन हो जाएगा; BUR-2 आइसोलेट होगा। लोको पायलट अगले निर्धारित स्टॉप तक सामान्य ऑपरेशन कर सकता है।",
    actions: [
      "【Screen 1 - स्क्रीन 1】:",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \" 0 \" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Press BLDJ to close VCB. (2. VCB क्लोज़ करने के लिए BLDJ प्रेस करें।)",
      "3. If fault still persists, BUR-2 will be isolated. Loco pilot can continue normal operation till next scheduled halt. (यदि दोष फिर भी रहता है तो BUR-2 आइसोलेट होगा। लोको पायलट अगले निर्धारित स्टॉप तक सामान्य ऑपरेशन कर सकता है।)",
      "【Screen 2 (Press ENTER) - स्क्रीन 2 (ENTER दबाने पर)】:",
      "1. Work train keeping BUR-2 isolated. (BUR-2 को आइसोलेट रखते हुए गाड़ी चलाएं।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0704P1",
    subSystem: "SS07",
    message: "VENTILATION BUR 2\nDISTURBED\nPress acknowledge to\nreconfigure to BUR 1",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "BUR 2 का वेंटिलेशन बाधित होगा। BPFA द्वारा एक्नॉलेज करने पर BUR 1 पर लोड रीकॉन्फ़िगर होगा।",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को “ 0 ” पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Switch OFF control electronics and turn it ON again. Raise pantograph, close VCB, and resume traction if locomotive normalizes. (2. कंट्रोल इलेक्ट्रॉनिक्स को एक बार ऑफ़ करके ऑन करें। पेंटो उठाएं, VCB क्लोज़ करें, यदि लोको सामान्य होता है तो ट्रैक्शन चालू करें।)",
      "3. If the same message repeats, continue normal operation keeping BUR-2 isolated. (3. यदि वही मैसेज फिर से आता है, BUR-2 को आइसोलेट रखते हुए सामान्य ऑपरेशन चालू रखें।)",
      "4. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0801P1",
    subSystem: "SS08",
    message: "DISTURBANCE IN\nPROCESSOR BUR 3\nTry to close VCB again\n(स्क्रीन-2 / Press <Enter>: AUX CONVERTER 3 ISOLATED / Driving still Possible / max. ventilation level will be reduced)",
    lamp: "BPFA will glow, VCB will open (BPFA प्रकाशित होगा। VCB ओपन हो जाएगा।)",
    effect: "VCB ओपन हो जाएगा; BUR-3 स्वतः आइसोलेट होगा (Try to close VCB again)।",
    actions: [
      "【Screen 1 - स्क्रीन 1】:",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को “ 0 ” पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. BUR-3 will isolate automatically. Press ENTER key. (2. BUR-3 अपने आप आइसोलेट होगा। ENTER key दबाएं।)",
      "3. Press BLDJ to close VCB. (3. VCB क्लोज़ करने के लिए BLDJ को प्रेस करें।)",
      "4. Drive train with normal traction. (सामान्य ट्रैक्शन द्वारा गाड़ी चलाएं।)",
      "【Screen 2 (Press ENTER) - स्क्रीन 2 (ENTER दबाने पर)】:",
      "1. Check MCB No. 127.22/3 in SB-2; if tripped, switch OFF control electronics and reset MCB once. (1. SB-2 में लगे MCB नं. 127.22/3 को चेक करें, यदि ट्रिप है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके MCB को एक बार रीसेट करें।)",
      "2. If MCB is not tripped, switch OFF control electronics and turn it ON again. Raise pantograph, close VCB, and resume traction if locomotive normalizes. (2. यदि MCB ट्रिप नहीं है तो कंट्रोल इलेक्ट्रॉनिक्स को एक बार ऑफ़ करके ऑन करें। पेंटो रेज़ करें, VCB क्लोज़ करें, यदि लोको सामान्य होता है तो ट्रैक्शन चालू करें।)",
      "3. If same message repeats, continue normal operation keeping BUR-3 isolated. Do not attempt to take BUR-3 into service by cycling control electronics. Work train keeping BUR-3 isolated. (3. यदि वही मैसेज फिर से आता है, BUR-3 को आइसोलेट रखते हुए सामान्य ऑपरेशन चालू रखें और कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ तथा ऑन करके BUR-3 को सर्विस में लेने का प्रयत्न न करें। BUR-3 को आइसोलेट रखते हुए गाड़ी चलाएं।)",
      "4. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0802P1",
    subSystem: "SS08",
    message: "FAULT IN AUXILIARY\nCONVERTER 3\nTry to close VCB again\n(स्क्रीन-2 / Press <Enter>: AUX CONVERTER 3 ISOLATED / Driving still possible / max. ventilation level will be reduced)",
    lamp: "BPFA will glow, VCB will open (BPFA प्रकाशित होगा। VCB ओपन हो जाएगा।)",
    effect: "VCB ओपन हो जाएगा; BUR-3 स्वतः आइसोलेट होगा (Try to close VCB again)। MCB 54.1/2 बार-बार ट्रिप होने पर सेक्शन साफ करके सहायता मांगें।",
    actions: [
      "【Screen 1 - स्क्रीन 1】:",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को “ 0 ” पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Press BLDJ to close VCB. (2. VCB क्लोज़ करने के लिए BLDJ प्रेस करें।)",
      "3. If message recurs, BUR-3 will isolate automatically. Press ENTER key. (3. यदि दोबारा मैसेज आता है तो BUR-3 अपने आप आइसोलेट होगा। <ENTER> key दबाएं।)",
      "4. Check MCB 54.1/2 in HB-2. If tripped, open VCB and reset MCB 54.1/2 once. If it trips again, clear section, isolate Bogie-2 and inform TLC. (HB-2 में लगे MCB नं 54.1/2 को चेक करें। यदि ट्रिप है तो VCB ओपन करके एक बार MCB नं 54.1/2 को रीसेट करें। यदि फिर से ट्रिप होती है तो सेक्शन क्लियर करके बोगी-2 को आइसोलेट करें और TLC को सूचित करें।)",
      "【Screen 2 (Press ENTER) - स्क्रीन 2 (ENTER दबाने पर)】:",
      "1. Check MCB No. 127.22/3 in SB-2; if tripped, switch OFF control electronics and reset MCB once. (1. SB-2 में लगे MCB नं. 127.22/3 को चेक करें, यदि ट्रिप है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके MCB को एक बार रीसेट करें।)",
      "2. If MCB is not tripped, switch OFF control electronics and turn it ON again. Raise pantograph, close VCB, and resume traction if locomotive normalizes. (2. यदि MCB ट्रिप नहीं है तो कंट्रोल इलेक्ट्रॉनिक्स को एक बार ऑफ़ करके ऑन करें। पेंटो रेज़ करें, VCB क्लोज़ करें, यदि लोको सामान्य होता है तो ट्रैक्शन चालू करें।)",
      "3. If same message repeats, continue normal operation keeping BUR-3 isolated. If BUR-3 does not isolate automatically, open VCB, switch OFF control electronics, and trip MCB 127.22/3 in SB-2 to isolate BUR-3. (3. यदि वही मैसेज फिर से आता है, BUR-3 को आइसोलेट रखते हुए सामान्य ऑपरेशन चालू रखें। यदि BUR-3 आइसोलेट नहीं हो रहा है तो VCB ओपन करके तथा कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके SB-2 में लगे MCB 127.22/3 को ट्रिप करके BUR-3 को आइसोलेट करें।)",
      "4. Energize locomotive and work train keeping BUR-3 isolated. In this condition, LSFI lamp will glow continuously. (4. लोको को एनरजाइज करें और BUR-3 को आइसोलेट रखते हुए गाड़ी कार्य करें। इस स्थिति में LSFI की बत्ती लगातार जलती रहेगी।)",
      "5. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F0803P1",
    subSystem: "SS08",
    message: "CONTACTOR FAULT IN\nAUXCONV 3\nContactor 52/3 stuck OFF or ON\n(स्क्रीन-2 / Press <Enter>: AUX CONVERTER 3 ISOLATED / Driving still possible / max. ventilation level will be reduced)",
    lamp: "BPFA will glow, VCB will open (BPFA प्रकाशित होगा। VCB ओपन हो जाएगा।)",
    effect: "VCB ओपन हो जाएगा; BUR-3 आइसोलेट होगा। लोको पायलट अगले निर्धारित स्टॉप तक सामान्य ऑपरेशन कर सकता है।",
    actions: [
      "【Screen 1 - स्क्रीन 1】:",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को “ 0 ” पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Press BLDJ to close VCB. (2. VCB क्लोज़ करने के लिए BLDJ प्रेस करें।)",
      "3. If fault still persists, BUR-3 will be isolated. Loco pilot can continue normal operation till next scheduled halt. (यदि दोष फिर भी रहता है तो BUR-3 आइसोलेट होगा। लोको पायलट अगले निर्धारित स्टॉप तक सामान्य ऑपरेशन कर सकता है।)",
      "【Screen 2 (Press ENTER) - स्क्रीन 2 (ENTER दबाने पर)】:",
      "1. Work train keeping BUR-3 isolated. (BUR-3 को आइसोलेट रखते हुए गाड़ी चलाएं।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "SS08-BUR3-ISOLATED",
    subSystem: "SS08",
    message: "AUX CONVERTER 3\nISOLATED\nDriving still Possible\nmax. ventilation level will be\nreduced\nPress<Enter>",
    lamp: "BPFA will remain glowing (If isolated via MCB 127.22/3, LSFI will also glow continuously) [BPFA प्रकाशित रहेगा]",
    effect: "BUR-3 आइसोलेट रहेगा; ड्राइविंग संभव है, अधिकतम वेंटिलेशन स्तर घट जाएगा (Driving still Possible, max. ventilation level will be reduced)।",
    actions: [
      "1. Check MCB No. 127.22/3 in SB-2; if tripped, switch OFF control electronics and reset MCB once. (1. SB-2 में लगे MCB नं. 127.22/3 को चेक करें, यदि ट्रिप है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके MCB को एक बार रीसेट करें।)",
      "2. If MCB is not tripped, switch OFF control electronics and turn it ON again. Raise pantograph, close VCB, and resume traction if locomotive normalizes. (2. यदि MCB ट्रिप नहीं है तो कंट्रोल इलेक्ट्रॉनिक्स को एक बार ऑफ़ करके ऑन करें। पेंटो रेज़ करें, VCB क्लोज़ करें, यदि लोको सामान्य होता है तो ट्रैक्शन चालू करें।)",
      "3. If same message repeats, continue normal operation keeping BUR-3 isolated. If BUR-3 does not isolate automatically, open VCB, switch OFF control electronics, and trip MCB 127.22/3 in SB-2 to isolate BUR-3. (3. यदि वही मैसेज फिर से आता है, BUR-3 को आइसोलेट रखते हुए सामान्य ऑपरेशन चालू रखें। यदि BUR-3 आइसोलेट नहीं हो रहा है तो VCB ओपन करके तथा कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके SB-2 में लगे MCB 127.22/3 को ट्रिप करके BUR-3 को आइसोलेट करें।)",
      "4. Energize locomotive and work train keeping BUR-3 isolated. In this condition, LSFI lamp will glow continuously. (4. लोको को एनरजाइज करें और BUR-3 को आइसोलेट रखते हुए गाड़ी कार्य करें। इस स्थिति में LSFI की बत्ती लगातार जलती रहेगी।)",
      "5. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "SS06-SS08-AUX-MCB-TRIP",
    subSystem: "SS06-SS08",
    message: "Troubleshooting on Frequent Tripping of Auxiliary Motors MCBs (SS06, SS07, SS08)\n(ऑक्सिलरी मोटरों के MCB के बार-बार ट्रिप होने पर ट्रबल शूटिंग)",
    lamp: "On related MCB trip, fault message & BPFA may glow (संबंधित MCB ट्रिप होने पर फ़ॉल्ट मैसेज एवं BPFA प्रकाशित हो सकता है)",
    effect: "Concerned auxiliary motor will shut down; MCB may trip repeatedly due to BUR voltage imbalance (संबंधित ऑक्सिलरी मोटर बंद होगी; BUR वोल्टेज असंतुलन से MCB बार-बार ट्रिप हो सकती है)",
    actions: [
      "If MCB 59.1/1 (OCB-1) or/and MCB 59.1/2 (OCB-2) trips repeatedly: (यदि MCB 59.1/1 (OCB-1) अथवा MCB 59.1/2 (OCB-2) बार-बार ट्रिप होती है:)",
      "1. Switch OFF control electronics. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करें।)",
      "2. Trip MCB 127.22/1 in SB-1 to isolate BUR-1. (2. SB-1 में लगे MCB 127.22/1 को ट्रिप करें, BUR-1 को आइसोलेट करें।)",
      "3. Reset MCB 59.1/1 or/and MCB 59.1/2. (3. MCB 59.1/1 या/और MCB 59.1/2 को रीसेट करें।)",
      "4. Attempt to work with BUR-1 isolated; OCB 1 & 2 will operate via BUR-2. (4. BUR-1 को आइसोलेट रखते हुए कार्य करने का प्रयत्न करें और OCB 1 & 2 BUR-2 द्वारा कार्य करेंगे।)",
      "★ Note: This fault may occur due to unbalance in BUR-1 output voltage. (नोट: BUR-1 के आउटपुट वोल्टेज में असंतुलन होने के कारण यह दोष उत्पन्न हो सकता है।)",
      "If MCB 63.1/1, 63.1/2 (SR oil pump) or/and MCB 62.1/1, 62.1/2 (Transformer oil pump-1/2) trips repeatedly: (यदि MCB 63.1/1, 63.1/2 (SR ऑयल पंप) या/और MCB 62.1/1, 62.1/2 (ट्रांसफार्मर ऑयल पंप-1/2) बार-बार ट्रिप होती है:)",
      "1. Switch OFF control electronics. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करें।)",
      "2. Trip MCB 127.22/2 in SB-2 to isolate BUR-2. (2. SB-2 में लगे MCB 127.22/2 को ट्रिप करें, BUR-2 को आइसोलेट करें।)",
      "3. Open VCB and reset MCBs once. (VCB ओपन करके एक बार MCBs को रीसेट करें।)",
      "4. Attempt to work keeping BUR-2 isolated; Transformer oil pump-1/2 and SR oil pump-1/2 will operate via BUR-3. (4. BUR-2 को आइसोलेट रखते हुए कार्य करने का प्रयत्न करें और ट्रांसफार्मर ऑयल पंप-1/2 और SR ऑयल पंप-1/2 BUR-3 द्वारा कार्य करेंगे।)",
      "★ Note: This fault may occur due to unbalance in BUR-2 output voltage. (नोट: BUR-2 के आउटपुट वोल्टेज में असंतुलन होने के कारण यह दोष उत्पन्न हो सकता है।)",
      "If MCB 53.1/1 (TMB-1) or/and MCB 53.1/2 (TMB-2) trips repeatedly: (यदि MCB 53.1/1 (TMB-1) अथवा MCB 53.1/2 (TMB-2) बार-बार ट्रिप होती है:)",
      "1. Switch OFF control electronics. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करें।)",
      "2. Trip MCB 127.22/2 in SB-2 to isolate BUR-2. (2. SB-2 में लगे MCB 127.22/2 को ट्रिप करें, BUR-2 को आइसोलेट करें।)",
      "3. Reset MCB 53.1/1 or/and MCB 53.1/2. (3. MCB 53.1/1 या/और MCB 53.1/2 को रीसेट करें।)",
      "4. Attempt to work keeping BUR-2 isolated; TMB 1 & 2 will operate via BUR-1. (4. BUR-2 को आइसोलेट रखते हुए कार्य करने का प्रयत्न करें और TMB 1 & 2 BUR-1 द्वारा कार्य करेंगे।)",
      "★ Note: This fault may occur due to unbalance in BUR-2 output voltage. (नोट: BUR-2 के आउटपुट वोल्टेज में असंतुलन होने के कारण यह दोष उत्पन्न हो सकता है।)",
      "If MCB 47.1/1, 47.1/2 (MCP-1/2) or/and MCB 55.1/1, 55.1/2 (Scavenge Blower-1/2) trips repeatedly: (यदि MCB 47.1/1, 47.1/2 (MCP-1/2) या/और MCB 55.1/1, 55.1/2 (स्कैवेंजिंग ब्लोअर-1/2) बार-बार ट्रिप होती है:)",
      "1. Switch OFF control electronics. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करें।)",
      "2. Trip MCB 127.22/3 in SB-2 to isolate BUR-3. (2. SB-2 में लगे MCB 127.22/3 को ट्रिप करें, BUR-3 को आइसोलेट करें।)",
      "3. Reset the MCB. (MCB को रीसेट करें।)",
      "4. Attempt to work keeping BUR-3 isolated; MCP-1/2 will operate via BUR-2 and Scavenge Blowers 1/2 via BUR-1. (4. BUR-3 को आइसोलेट रखते हुए कार्य करने का प्रयत्न करें और MCP-1/2 BUR-2 द्वारा तथा स्कैवेंजिंग ब्लोअर-1/2 BUR-1 द्वारा कार्य करेंगे।)",
      "★ Note: This fault may occur due to unbalance in BUR-3 output voltage. (नोट: BUR-3 के आउटपुट वोल्टेज में असंतुलन होने के कारण यह दोष उत्पन्न हो सकता है।)"
    ]
  },
  {
    id: "F0901P1",
    subSystem: "SS09",
    message: "BATTERY VOLTAGE TOO LOW\nElectronics will switch off\n\n(फॉलो-अप स्क्रीन / MAIN POWER ISOLATED):\nVCB can not be closed\nVCB inhibited, Loco is dead",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Control electronics will automatically switch OFF / VCB will not close, locomotive is dead (कंट्रोल इलेक्ट्रॉनिक्स स्वतः स्विच ऑफ़ हो जाएगी / VCB क्लोज़ नहीं होगा, लोको डेड)",
    actions: [
      "【Screen 1 - स्क्रीन 1】:",
      "1. “ 0 ” Press BPFA to acknowledge fault. (थ्रोटल को “ 0 ” पर लायें। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Check MCB 112.1 and 110 in SB-2 panel. If tripped, switch OFF control electronics and reset MCB. (2. SB-2 पैनल में MCB 112.1 एवं 110 को चेक करें। यदि ट्रिप मिले तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके MCB रीसेट करें।)",
      "3. 82 BUR-3 MCB 127.22/3 (SB-2) , Resume normal traction. (यदि बैटरी का वोल्टेज 82 वोल्ट के ऊपर है तो BUR-3 को कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके MCB 127.22/3 (SB-2) द्वारा आइसोलेट करें। लोको एनरजाइज़ करें, सामान्यतौर पर ट्रैक्शन चालू करें।)",
      "4. UBA 82 Demand relief engine immediately. (यदि UBA बैटरी वोल्टेज 82 वोल्ट से कम दिखा रहा है तो तुरंत सहायता इंजन की मांग करें।)",
      "--------------------------------------------------",
      "【Screen 2 (Press ENTER) - स्क्रीन 2 (ENTER दबाने पर)】:",
      "1. If battery cannot be switched ON, demand relief engine. (यदि बैटरी ऑन नहीं हो सकती है तो सहायता इंजन की मांग करें।)"
    ]
  },
  {
    id: "F0902P1",
    subSystem: "SS09",
    message: "BATTERY VOLTAGE LOW\nConverters being switched off\nOpen VCB, lower Panto\n\n(फॉलो-अप स्क्रीन / MAIN POWER ISOLATED):\nVCB cannot be closed:\nVCB inhibited, Loco is dead",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Converters will switch OFF, instruction to open VCB and lower pantograph; VCB will not close, locomotive is dead (कनवर्टर स्विच ऑफ़ होंगे, VCB क्लोज़ नहीं होगा, लोको डेड)",
    actions: [
      "【Screen 1 - स्क्रीन 1】:",
      "1. “ 0 ” Press BPFA to acknowledge fault. (थ्रोटल को “ 0 ” पर लायें। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Check MCB 112.1 and 110 in SB-2 panel. If tripped, switch OFF control electronics and reset MCB. (2. SB-2 पैनल में MCB 112.1 एवं 110 को चेक करें। यदि ट्रिप मिले तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके MCB रीसेट करें।)",
      "3. Turn ON control electronics. (कंट्रोल इलेक्ट्रॉनिक्स को ऑन करें।)",
      "4. Check battery voltage on UBA. If above 82V and MCB 100 is tripped, open VCB and reset MCB. Keep loco energized for battery charging. (4. UBA पर बैटरी वोल्टेज चेक करें। यदि 82 वोल्ट के ऊपर है और MCB 100 ट्रिप होता है तो VCB ओपन करके MCB को रीसेट करें। लोको को बैटरी चार्जिंग के लिए एनरजाइज़ रखें।)",
      "--------------------------------------------------",
      "【Screen 2 (Press ENTER) - स्क्रीन 2 (ENTER दबाने पर)】:",
      "1. If battery cannot be switched ON, demand relief engine. (यदि बैटरी ऑन नहीं हो सकती है तो सहायता इंजन की मांग करें।)"
    ]
  },
  {
    id: "F0903P1",
    subSystem: "SS09",
    message: "PAN LOWERED LONGER THAN 10 MINUTES\nControl electronics will switch off",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Control electronics will automatically switch OFF (10 min timer to protect against battery discharge) (कंट्रोल इलेक्ट्रॉनिक्स स्वतः स्विच ऑफ़ हो जाएगी - 10 मिनट टाइमर)",
    actions: [
      "1. If BL key is in position \"D\" and pantograph remains lowered for more than 10 minutes, this message appears on screen. (1. यदि BL key पोजीशन “ D ” पर हो तथा पैंटो 10 मिनट से ज्यादा समय तक लोअर रहे तब यह मैसेज स्क्रीन पर आता है।)",
      "2. “ 0 ” Press BPFA to acknowledge fault. (थ्रोटल को “ 0 ” पर लायें। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "3. BL key Turn ON control electronics 10. (यदि आवश्यकता है तो BL key के द्वारा एक बार कंट्रोल इलेक्ट्रॉनिक्स को ऑन करें। लोको पायलट द्वारा 10 मिनट के अंदर पैंटो उठाकर इस फ़ॉल्ट मैसेज को टाला जा सकता है।)",
      "4. If pantograph does not raise and this message appears, troubleshoot as per F0103P1. (यदि पैंटो रेज़ नहीं हो रहा है और यह मैसेज स्क्रीन पर आता है तो F0103P1 के अनुसार दोष का निवारण करें।)"
    ]
  },
  {
    id: "F0901P2",
    subSystem: "SS09",
    message: "WARNING: LOW BATTERY VOLTAGE\nDriving available for less than 30 min, Check battery charger MCB",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Driving available for less than 30 minutes, instruction to check battery charger MCB (30 मिनट से कम समय के लिए ड्राइविंग उपलब्ध रहेगी, बैटरी चार्जर MCB चेक करने का निर्देश)",
    actions: [
      "1. Check MCB 110 in SB-2 panel; if tripped, switch OFF control electronics and reset MCB. Check input MCB 100 of battery charger in HB-2; if tripped, open VCB and reset MCB. (1. SB-2 पैनल में MCB 110 को चेक करें। यदि ट्रिप मिले तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके MCB रीसेट करें। {इलेक्ट्रॉनिक्स कार्ड को फ़ेल होने से बचाने हेतु MCB 110 को रीसेट करने के लिए कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करें।} और HB-2 में लगे बैटरी चार्जर के इनपुट MCB 100 की जांच करें {यदि लोको पायलट द्वारा F0902P2 मैसेज पर ध्यान नहीं दिया गया तो} यदि ट्रिप मिले तो VCB ओपन करके MCB को रीसेट करें।)",
      "2. Press BPFA to acknowledge fault. (BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "3. If MCBs are normal and message persists, clear section and demand relief engine. (यदि MCBs सामान्य हों और मैसेज बना रहता है तो सेक्शन क्लियर करके सहायता इंजन मांगें।)"
    ]
  },
  {
    id: "F0902P2",
    subSystem: "SS09",
    message: "BATTERY CHARGER MCB\nOFF\nTry to close the MCB",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Battery charger MCB 100 may trip; battery will not charge (बैटरी चार्जर MCB 100 ट्रिप होने की संभावना, बैटरी चार्ज नहीं होगी)",
    actions: [
      "1. Check MCB 100 in HB-2 / on BUR-2 or window behind it. If tripped, open VCB and reset once. (1. HB-2 में / BUR-2 पर या उसके पीछे {नीचे की ओर} लगी हुई खिड़की में लगे MCB 100 को चेक करें। यदि ट्रिप मिले तो VCB ओपन करके एक बार रीसेट करें।)",
      "2. Press BPFA to acknowledge fault. (BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "3. Keep traction running normally. (सामान्य तौर पर ट्रैक्शन चालू रखें।)",
      "4. If MCB 100 trips repeatedly, isolate BUR-3 and work train transferring battery charger load to BUR-2. (4. यदि MCB 100 बार-बार ट्रिप हो रहा है तो BUR-3 को आइसोलेट करके बैटरी चार्जर का लोड BUR-2 पर लेकर कार्य करें।)",
      "5. If MCB 100 is normal and UBA indicates higher voltage when VCB is closed than open, it indicates battery charging. Ignore message and operate normally. (5. यदि MCB 100 सामान्य है और UBA, VCB ओपन अवस्था की तुलना में क्लोज़ अवस्था में ज्यादा वोल्टेज बताता है तो यह बैटरी चार्जिंग का संकेत है। मैसेज पर ध्यान न दें। सामान्य रूप से गाड़ी चलाएं।)",
      "6. If battery is not charging, clear section, inform TLC and act according to instructions. (यदि बैटरी चार्ज नहीं हो रही है तो सेक्शन क्लियर करके इसकी सूचना TLC को दें और उसके आदेशानुसार काम करें।)"
    ]
  },
  {
    id: "F0903P2",
    subSystem: "SS09",
    message: "LOW BATTERY CHARGER CURRENT\nBattery charger MCB may have Tripped\nBattery not being charged",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Battery is not being charged, battery charger MCB may trip (बैटरी चार्ज नहीं हो रही है, बैटरी चार्जर MCB ट्रिप हो सकता है)",
    actions: [
      "1. Check battery charger output MCB 110 in SB-2 and input MCB 100 in HB-2. If tripped, open VCB and reset MCB. (1. SB-2 में लगे बैटरी चार्जर आउटपुट MCB 110 व HB-2 में लगे बैटरी चार्जर इनपुट MCB 100 को चेक करें {यदि लोको पायलट द्वारा F0902P2 मैसेज पर ध्यान नहीं दिया गया तो} यदि ट्रिप हो तो VCB ओपन करके MCB को रीसेट करें।)",
      "2. Press BPFA to acknowledge fault. (BPFA दबाकर फ़ॉल्ट ACK करें। ब्लॉक सेक्शन क्लियर करें।)",
      "3. If MCB is normal and UBA indicates higher voltage when VCB is closed than open, it indicates battery charging. Ignore message and operate normally. (3. यदि MCB सामान्य हो और UBA, VCB ओपन अवस्था की तुलना में क्लोज़ अवस्था में ज्यादा वोल्टेज बताता है तो यह बैटरी चार्जिंग का संकेत है। मैसेज पर ध्यान न दें। सामान्य रूप से गाड़ी चलाएं।)",
      "4. If battery is not charging, clear section, inform TLC and act according to instructions. (यदि बैटरी चार्ज नहीं हो रही है तो सेक्शन क्लियर करके इसकी सूचना TLC को दें और उसके आदेशानुसार काम करें।)",
      "5. If everything is normal, drive train normally. (यदि सब कुछ सामान्य हो तो सामान्य रूप से गाड़ी चलाएं।)"
    ]
  },
  {
    id: "F0904P2",
    subSystem: "SS09",
    message: "DIAGNOSIS\nMEMORY BATTERY\nEMPTY\nInform TLC during next stop",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Diagnostic memory battery is EMPTY; normal locomotive operation is not affected (डायग्नोसिस मेमोरी बैटरी खाली होने की सूचना, सामान्य ऑपरेशन प्रभावित नहीं)",
    actions: [
      "1. Press BPFA to acknowledge fault Continue normal operation. (BPFA दबाकर फ़ॉल्ट ACK करें। सामान्य ऑपरेशन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1001P1",
    subSystem: "SS10",
    message: "FAULT IN BRAKE ELECTRONICS\nFull service brake applied\nNo traction allowed",
    lamp: "LSFI will flicker & BPFA will glow (LSFI ब्लिंक करेगी, BPFA प्रकाशित होगा)",
    effect: "Full service brake applied, no traction allowed (TE/BE = 0) (फुल सर्विस ब्रेक लग जाएगी, ट्रैक्शन नहीं मिलेगा / TE/BE = 0)",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \" 0 \" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Check MCB 127.7 in SB-2; if tripped, turn OFF control electronics once and reset. Release parking brake using release plunger of Solenoid-30 and work train. If unsuccessful, try from rear cab. (SB-2 में MCB नं 127.7 चेक करें। यदि ट्रिप है तो एक बार कंट्रोल इलेक्ट्रॉनिक्स ऑफ़ करके उसे रीसेट करें। सोलेनाइड-30 के रिलीज़ प्लंजर द्वारा पार्किंग ब्रेक रिलीज़ करें और कार्य करें। यदि सफलता नहीं मिलती तो पीछे की कैब से प्रयत्न करें।)",
      "3. If not tripped, switch OFF control electronics and turn ON again. Raise pantograph, close VCB, and if locomotive normalizes, resume normal traction. (यदि ट्रिप नहीं है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके ऑन करें। पैंटो उठाएं, VCB क्लोज़ करें तथा यदि लोको सामान्य होता है तो ट्रैक्शन चालू करें।)",
      "4. If the same message repeats: • In E-70 locos: bring TE/BE throttle to \"0\" and seek relief assistance. • In CCB (Knorr Bremse) locos: if rear cab A-9 is in Emergency, lock it in FS and set mode switch to Trail. If still unsuccessful, follow instructions to activate PTDC mode and clear block section. (यदि वही मैसेज फिर से आता है तो: • E-70 वाले लोको में: TE/BE थ्रोटल को \" 0 \" पर लाएं और सहायता मांगें। • CCB (Knorr Bremse) वाले लोको में: यदि पीछे की कैब का A-9 इमरजेंसी पर हो तो उसे FS पर लॉक करके मोड स्विच को Trail पर रखें। यदि सफलता नहीं मिलती तो PTDC मोड एक्टिव करने के अनुदेशों का पालन करके सेक्शन क्लियर करें।)",
      "5. If unsuccessful within 20 minutes, demand relief engine. (यदि 20 मिनट के अंदर सफलता नहीं मिलती है तो सहायता इंजन की मांग करें।)"
    ]
  },
  {
    id: "F1001P2",
    subSystem: "SS10",
    message: "LOCO IS IN BANKING\nMODE\nLoco brake controller isolated\nEmergency brakes can be\napplied",
    lamp: "LSFI will flicker & BPFA will glow (LSFI ब्लिंक करेगी, BPFA प्रकाशित होगा)",
    effect: "Locomotive brake controller will remain isolated, only emergency brake can be applied (लोको ब्रेक कंट्रोलर आइसोलेट रहेगा, केवल इमरजेंसी ब्रेक लगाई जा सकती है)",
    actions: [
      "1. This message appears when loco operates in Banking Mode (ZBAN ON & Cock 70 closed). If loco is not in banking mode, take following action:- (यह मैसेज लोको बैंकिंग मोड में कार्य करते समय आएगा (ZBAN ऑन है और कॉक नं 70 क्लोज़ है)।)",
      "2. Bring throttle to \"0\". (थ्रोटल को \" 0 \" पर लाएं।)",
      "3. Check position of ZBAN switch; if ON, turn it OFF. (ZBAN स्विच की पोजीशन चेक करें, यदि ऑन है तो उसे ऑफ करें।)",
      "4. This may be due to mal-operation of ZBAN microswitch. Operate ZBAN switch briskly 2 to 3 times; if stuck, it will normalize. (4. यह ZBAN माइक्रोस्विच के माल-ऑपरेशन (Mal-operation) के कारण हो सकता है। ZBAN स्विच को दो-तीन बार झटके से ऑपरेट करें, यदि अटका है तो सामान्य हो जाएगा।)",
      "5. VCB Resume normal traction. (VCB क्लोज़ करके सामान्य ट्रैक्शन चालू करें।)",
      "6. If not successful: (MCE OFF/ON) , If unsuccessful, try from the other cab. (यदि सफलता नहीं मिलती है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ कर उसे ऑन (MCE OFF/ON) करें, और दूसरी कैब से प्रयत्न करें।)",
      "7. Inform TLC, Record in log book. (TLC को सूचित करें, लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1002P1",
    subSystem: "SS10",
    message: "LOW PRESSURE MAIN RESERVOIR\nNo traction allowed till pressure\nreaches 6.4 kg/cm2",
    lamp: "LSFI will flicker & BPFA will glow (LSFI ब्लिंक करेगी, BPFA प्रकाशित होगा)",
    effect: "No traction allowed until MR pressure reaches 6.4 kg/cm² (MR प्रेशर 6.4 kg/cm² आने तक ट्रैक्शन की अनुमति नहीं मिलेगी)",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \" 0 \" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Check operation of compressors; if not working, press BLCP to MAN position. (2. कम्प्रेसर का कार्य चेक करें, यदि कार्य नहीं करते तो BLCP को MAN पोजीशन पर दबाएं।)",
      "3. Wait until MR pressure reaches 6.4 kg/cm². (3. MR प्रेशर 6.4 kg/cm² आने तक इंतजार करें।)",
      "4. Check MCB 47.1/1 (HB-1) and 47.1/2 (HB-2); if tripped, open VCB and reset once. (MCB 47.1/1 (HB-1) व 47.1/2 (HB-2) को चेक करें। यदि ट्रिप मिले तो VCB ओपन करके उसे एक बार रीसेट करें।)",
      "5. If Main Compressors (MCP) operate, check Air Dryer cocks: D-in and D-out must be OPEN and D-off must be CLOSED. (यदि MCP कार्य करते हैं तो एयर ड्रायर (Air Dryer) के कॉक चेक करें: D-in और D-out खुले होने चाहिए तथा D-off कॉक बंद होना चाहिए।)",
      "6. Check for air leakage from auto drain valve, MR1 & 2 drain cocks, CP delivery pipe, and unloader valve. If leaking, close relevant cock above battery box 2; in CCB-2 locos close VEUL cock. (6. ऑटो ड्रेन वाल्व, MR1 & 2 के ड्रेन कॉक, CP के डिलीवरी पाइप और अनलोडर वाल्व से लीकेज चेक करें। यदि लीकेज हो तो बैटरी बॉक्स-2 के ऊपर संबंधित COC बंद करें। यदि अनलोडर वाल्व का कॉक उपलब्ध नहीं है तो न्यूमैटिक पैनल पर लगे EP 26 के केबल को निकालें। CCB-2 लोको में न्यूमैटिक पैनल पर लगे VEUL के COC को बंद करें।)",
      "7. If FP pressure drops, close Cock 136. (FP प्रेशर ड्रॉप होने पर 136 कॉक को बंद करें।)",
      "8. Check pneumatic system for leaks in the train. If MR drops due to BP drop, isolate VCD/SPM/TPWS. Ensure ALP emergency valve is closed in both cabs and rear cab A-9 is in Neutral (FS in CCB-2). (8. गाड़ी में न्यूमैटिक सिस्टम में लीकेज की जांच करें। यदि BP प्रेशर ड्रॉप होने के कारण MR प्रेशर ड्रॉप होता है तो VCD / SPM / TPWS (यदि दोनों कैब में A-9 के नीचे COC लगा हो) को आइसोलेट करें। सुनिश्चित करें कि ALP का इमरजेंसी वाल्व दोनों कैब में बंद और पीछे की कैब का A-9 न्यूट्रल पर हो (CCB-2 लोको में A-9 FS पर हो)।)",
      "9. MCB , MR , Switch OFF control electronics and turn it ON again (MCE OFF/ON), Raise pantograph, VCB. (यदि कोई एयर लीकेज न हो और दोनों कम्प्रेसर के MCB सेट हों, फिर भी कम्प्रेसर काम नहीं कर रहे हों और MR प्रेशर मेंटेन नहीं हो रहा है, तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके ऑन करें (MCE OFF/ON), पैंटो उठाएं, VCB क्लोज़ करें। यदि लोको सामान्य होता है तो ट्रैक्शन चालू करें।)",
      "10. If not successful: BUR-3 (MCE SB-2 MCB 127.22/3 ). (यदि सफलता नहीं मिलती है तो BUR-3 को आइसोलेट करें (MCE ऑफ़ करके SB-2 में लगे MCB 127.22/3 के द्वारा)। लोको एनरजाइज करें। यदि लोको सामान्य होता है तो ट्रैक्शन चालू करें।)",
      "11. If unsuccessful within 20 minutes, demand relief engine. (यदि 20 मिनट के अंदर सफलता नहीं मिलती है तो सहायता इंजन की मांग करें।)"
    ]
  },
  {
    id: "F1002P2",
    subSystem: "SS10",
    message: "ALARM CHAIN PULLING\nCheck train",
    lamp: "LSFI will flicker, BPFA will glow, AFI needle will rise (LSFI ब्लिंक करेगी, BPFA प्रकाशित होगा, AFI सुई उठेगी)",
    effect: "BP pressure drops in train, brake application/binding occurs (throttle must be brought to 0) (ट्रेन में BP प्रेशर ड्रॉप होगा, ब्रेक बाइंडिंग/ब्रेक लगेगा)",
    actions: [
      "1. Bring throttle to \"0\" G&SR 4.45/1. (थ्रोटल को \" 0 \" पर लाएं। गाड़ी को तुरंत सुविधाजनक जगह पर रोकें। ऑपरेटिंग मैनुअल तथा G&SR 4.45/1 के अनुसार कार्य करें।)",
      "2. Check affected coach, identify cause of ACP, reset ACP apparatus and proceed accordingly. (2. प्रभावित कोच को चेक करें, ACP के कारण का पता लगाएं, ACP को रीसेट करें और उसके अनुसार गाड़ी चलाएं।)"
    ]
  },
  {
    id: "F1003P1",
    subSystem: "SS10",
    message: "VIGILANCE EMERGENCY\nBRAKE APPLICATION\nBring TE/BE Throttle to 0\nPress vigilance reset push\nbutton",
    lamp: "LSFI will flicker, BPFA will glow, LSVW on Panel A will glow & buzzer will sound (LSFI ब्लिंक करेगी, BPFA प्रकाशित होगा, LSVW जलेगी व बजर बजेगा)",
    effect: "BP pressure drops to 2.5-3 kg/cm², penalty brake applied, TE/BE becomes 0 (BP प्रेशर 3 से 2.5 kg/cm² ड्रॉप होगा, पेनल्टी ब्रेक लग जाएगी, TE/BE शून्य)",
    actions: [
      "【Situation A: When crew fails to acknowledge VCD - स्थिति A: कर्मीदल द्वारा VCD \"ACK\" नहीं करने पर】:",
      "1. Bring throttle to \"0\". (थ्रोटल को \"0\" पर लाएं।)",
      "2. Place A-9 in Emergency position, which stops MR pressure drop. (A-9 को आपातकालीन (Emergency) पोजीशन पर रखें, जिससे MR प्रेशर ड्रॉप होना बंद हो जाएगा।)",
      "3. Wait for 120 sec (WAP-5/7) or 160 sec (WAG-9/9H), as VCD penalty resets only after 120/160 sec. Do not press BPVR until then (Note: press after 32 sec in CCB Knorr Bremse). (3. 120 सेकंड (WAP-5/7) / 160 सेकंड (WAG-9/9H) तक इंतजार करें, क्योंकि VCD पेनल्टी ब्रेक 120/160 सेकंड के बाद ही रीसेट हो सकती है। इसलिए BPVR को 120/160 सेकंड तक प्रेस न करें। (नोट: CCB Knorr Bremse में 32 सेकंड बाद BPVR प्रेस करें)।)",
      "4. After 120/160 sec (32 sec in CCB), press vigilance reset button BPVR on Panel A. Ensure LSVW extinguishes and buzzer stops. (4. 120/160 सेकंड (CCB में 32 सेकंड) बाद पैनल A पर विजिलेंस रीसेट बटन BPVR दबाएं। LSVW बुझना व बजर बंद होना सुनिश्चित करें।)",
      "5. Press vigilance pedal switch PVCD and release. (विजिलेंस पेडल स्विच PVCD दबाकर रिलीज करें।)",
      "6. Press BPFA to acknowledge fault. (BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "7. Place A-9 to RUN position. Penalty brakes will release and BP pressure will recharge to 5.0 kg/cm². (7. A-9 को RUN पोजीशन पर रखें। पेनल्टी ब्रेक रिलीज होकर BP प्रेशर वापस 5.0 kg/cm² चार्ज होगा।)",
      "8. If brakes do not release, switch MCE OFF/ON, raise pantograph, close VCB and resume normal traction. (यदि ब्रेक रिलीज न हो तो MCE OFF/ON करें, पैंटो उठाएं, VCB क्लोज़ कर सामान्य ट्रैक्शन चालू करें।)",
      "【Situation B: When Penalty Brake applies despite vigilance (VCD Malfunction) - स्थिति B: सतर्क रहने पर भी पेनल्टी ब्रेक लगने पर (VCD खराबी)】",
      "• MCE OFF SB-1 237.1 \"0\" VCD. (MCE OFF करके SB-1 पैनल में लगे स्विच 237.1 को \"0\" पर रखकर VCD आइसोलेट करें।)",
      "• Switch MCE ON, raise pantograph, close VCB and resume normal traction. (MCE ON करें, पैंटो उठाएं, VCB क्लोज़ कर सामान्य ट्रैक्शन चालू करें।)",
      "• Inform TLC and exercise extra caution (ignore Low MR pressure message in this situation). (TLC को सूचित करें और अतिरिक्त सतर्क रहें। (इस स्थिति में \"Low MR pressure\" मैसेज आए तो ध्यान न दें)।)"
    ]
  },
  {
    id: "F1004P1",
    subSystem: "SS10",
    message: "WORKING WRONG\nCONFIGURATION\nBRAKE SYSTEM\nCheck isolating coc brake\ncontrol Wrong coc position, to\nreset open VCB",
    lamp: "LSFI will flicker & BPFA will glow (LSFI ब्लिंक करेगी, BPFA प्रकाशित होगा)",
    effect: "Incorrect brake system configuration warning, normal traction inhibited (ब्रेक सिस्टम की गलत कॉन्फ़िगरेशन चेतावनी, सामान्य ट्रैक्शन अवरुद्ध)",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \" 0 \" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. 70 VCB 70 VCB - , (Limiting Switch) /. (न्यूमैटिक पैनल पर लगे ब्रेक पाइप आइसोलेटिंग कॉक 70 को चेक करें। यदि क्लोज़ हो तो VCB ओपन करके उसे ओपन करें। यदि कॉक 70 पहले से ओपन हो तो VCB ओपन करके उसे दो-तीन बार ऑपरेट करें, लिमिटिंग स्विच (Limiting Switch) खराब/जाम होने के कारण ऐसा हो सकता है।)",
      "3. ZBAN , ON OFF. (ZBAN स्विच का ऑफ़ होना चेक करें, यदि ON हो तो उसे OFF पर रखें।)",
      "4. Resume normal traction. (सामान्य ट्रैक्शन चालू करें।)"
    ]
  },
  {
    id: "F1005P1",
    subSystem: "SS10",
    message: "TRACTION WITH AUTO\nBRAKE NOT ALLOWED\nRelease parking brakes\nBring TE/BE Throttle to 0",
    lamp: "LSFI will flicker & BPFA will glow (LSFI ब्लिंक करेगी, BPFA प्रकाशित होगा)",
    effect: "Traction (TE/BE) inhibited due to auto brake applied (TE/BE = 0) (ऑटो ब्रेक लगे रहने के कारण ट्रैक्शन अवरुद्ध रहेगा)",
    actions: [
      "1. Release auto air brake (place A-9 handle to RUN position). Check BP pressure; it must be 5.0 kg/cm². (1. ऑटो एयर ब्रेक रिलीज करें (A-9 हैंडल को RUN पोजीशन पर रखें)। BP प्रेशर चेक करें 5.0 kg/cm² होना चाहिए।)",
      "2. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \" 0 \" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "3. Resume normal traction. (सामान्य ट्रैक्शन चालू करें।)",
      "4. , If unsuccessful, try from the other cab. (यदि सफलता नहीं मिलती, दूसरी कैब से प्रयत्न करें।)"
    ]
  },
  {
    id: "F1006P1",
    subSystem: "SS10",
    message: "TRACTION WITH PARKING\nBRAKES NOT ALLOWED\nRelease parking brakes\nBring TE/BE Throttle to 0",
    lamp: "LSFI will flicker, BPFA will glow, BPPB will remain glowing (LSFI ब्लिंक करेगी, BPFA प्रकाशित होगा, BPPB प्रकाशित रहेगा)",
    effect: "Traction (TE/BE) inhibited due to parking brake applied (TE/BE = 0) (पार्किंग ब्रेक लगे रहने के कारण ट्रैक्शन अवरुद्ध रहेगा)",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \" 0 \" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Release parking brake using illuminated push button BPPB. When parking brake releases, gauge indicates 6.0 kg/cm² and BPPB light extinguishes. (2. प्रज्वलित पुश बटन BPPB के द्वारा पार्किंग ब्रेक रिलीज़ करें। यदि पार्किंग ब्रेक रिलीज़ हो जाते हैं तो पार्किंग ब्रेक गेज में 6.0 kg/cm² प्रेशर दर्शाएगा और BPPB की लाइट बुझेगी।)",
      "3. If parking brakes do not release, check solenoid valve latch on pneumatic panel. If applied push button is locked in applied position, release it. (यदि पार्किंग ब्रेक रिलीज़ नहीं होते तो न्यूमैटिक पैनल पर सोलेनाइड वाल्व के लैच को चेक करें।)",
      "4. Press Release push button and lock in that position if required. (रिलीज़ पुश बटन को प्रेस करें और उस स्थिति में ज़रूरत पड़ने पर लॉक करें।)",
      "5. If parking brakes still do not release, check for air leakage on parking brake cylinder hose pipes; stop leakage if found. (यदि फिर भी पार्किंग ब्रेक रिलीज़ नहीं होते हैं तो पार्किंग ब्रेक सिलिंडर होज़ पाइप पर एयर लीकेज को चेक करें।)",
      "6. Resume normal traction. (पार्किंग ब्रेक रिलीज़ होने के बाद सामान्य ट्रैक्शन चालू करें।)"
    ]
  },
  {
    id: "F1007P1",
    subSystem: "SS10",
    message: "REGENERATIVE BRAKE\nFAILURE\nPnuematic loco brake applied",
    lamp: "LSFI will flicker & BPFA will glow (LSFI ब्लिंक करेगी, BPFA प्रकाशित होगा)",
    effect: "Electrical/regenerative brake power unavailable (effort = 0 kN); pneumatic brake remains active (इलेक्ट्रिकल/रीजेनेरेटिव ब्रेक पावर उपलब्ध नहीं रहेगा, न्यूमैटिक ब्रेक लागू रहेगा)",
    actions: [
      "1. Bring throttle to \"0\" Press BPFA to acknowledge fault. (थ्रोटल को \" 0 \" पर लाएं। लोको ब्रेक रिलीज़ हो जाएंगे। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Control train using A-9. Keep pressing PVEF until BC gauge indicates 0 kg/cm². (2. गाड़ी को A-9 के द्वारा कंट्रोल करें। BC गेज 0 kg/cm² आने तक PVEF को प्रेस करें।)",
      "3. Electrical brake power will not be available; braking available only via A-9 / SA-9. (इलेक्ट्रिकल ब्रेक पावर उपलब्ध नहीं रहेगा, ब्रेकिंग सिर्फ A-9 / SA-9 के द्वारा ही उपलब्ध रहेगी।)",
      "4. Resume normal traction. (सामान्य ट्रैक्शन चालू करें।)",
      "5. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1008P1",
    subSystem: "SS10",
    message: "EMERGENCY STOP,\nSHUT DOWN ON THE\nLOCO\nTo release, reset emergency\nstop push button\nBring TE/BE Throttle to 0",
    lamp: "LSFI will flicker & BPFA will glow (LSFI ब्लिंक करेगी, BPFA प्रकाशित होगा)",
    effect: "VCB ओपन हो जाएगा, पैंटो लोअर हो जाएगा, इमरजेंसी ब्रेक लग जाएगा और BP प्रेशर शून्य हो जाएगा (TE/BE = 0)।",
    actions: [
      "1. Bring throttle to \"0\". (थ्रोटल को \" 0 \" पर लाएं।)",
      "2. Reset emergency stop push button (BPEMS) by turning it in direction of arrow. It will return to normal position. (इमरजेंसी स्टॉप पुश बटन (BPEMS) पर लगे तीर के निशान के अनुसार घुमाकर उसे रीसेट करें।)",
      "3. Press BPFA to acknowledge fault. (BPFA को प्रेस करें।)",
      "4. Raise pantograph. (पैंटो उठाएं।)",
      "5. Close VCB and resume normal traction. (VCB क्लोज करें।)",
      "6. Resume traction after BP and MR pressures normalize. (6. BP और MR सामान्य होने के बाद ट्रैक्शन चालू करें।)",
      "7. If not successful: If unsuccessful, try from the other cab. (यदि सफलता नहीं मिलती है तो दूसरी कैब से प्रयत्न करें।)"
    ]
  },
  {
    id: "F1009P1",
    subSystem: "SS10",
    message: "TRACTION NOT ALLOWED\nWITH APPLIED BRAKE\nRelease loco brake\nBring TE/BE Throttle to 0",
    lamp: "LSFI will flicker & BPFA will glow (LSFI ब्लिंक करेगी, BPFA प्रकाशित होगा)",
    effect: "Traction inhibited while loco brake is applied (BC > 0.65 kg/cm²) (लोको ब्रेक लागू रहने पर ट्रैक्शन अवरुद्ध रहेगा / TE/BE = 0)",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \" 0 \" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Release loco brake via SA-9 (ensure rear cab SA-9 is in release). In E-70 loco pull C3W distributor valve release handle; in CCB (Knorr) loco lift Bail Ring and press nipples 20CP and 16CP on pneumatic panel. (SA-9 से लोको ब्रेक रिलीज़ करें (सुनिश्चित करें कि पिछली कैब का SA-9 रिलीज़ पर हो)। E-70 युक्त लोको में C3W डिस्ट्रीब्यूटर वाल्व का रिलीज़ हैंडल खींचें और CCB वाले लोको में बेल रिंग उठाएं तथा न्यूमैटिक पैनल पर 20CP एवं 16CP निप्पल को प्रेस करें।)",
      "3. If brake cylinder pressure indicates \"0\" kg/cm² yet above message appears, gently tap pressure switches 269.6/1 and 269.6/2 (located between AR and pneumatic panel). (3. यदि ब्रेक सिलिंडर प्रेशर \" 0 \" kg/cm² बता रहा है और उपरोक्त मैसेज आता है तो हल्के से प्रेशर स्विच 269.6/1 और 269.6/2 को थपथपाएं (ये AR और न्यूमैटिक पैनल के बीच में लगे हैं)।)",
      "4. If not successful: (MCE OFF/ON). (यदि सफलता नहीं मिलती है तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करके ऑन (MCE OFF/ON) करें।)",
      "5. Inform TLC and record in log book (Note: this message may appear during ACP in passenger train if BP drops >0.6 kg/cm²). (TLC को सूचित करें, लॉग बुक में दर्ज करें। (नोट: यह मैसेज पैसेंजर गाड़ी में ACP के दौरान भी आ सकता है यदि BP प्रेशर 0.6 kg/cm² से ज्यादा ड्रॉप हो)।)"
    ]
  },
  {
    id: "F1010P1",
    subSystem: "SS10",
    message: "EMG. EXHAUST COCK\nCLOSED, NO TRACTION\nFor traction open the cock\nBring TE/BE Throttle to 0",
    lamp: "LSFI will flicker & BPFA will glow (LSFI ब्लिंक करेगी, BPFA प्रकाशित होगा)",
    effect: "Traction inhibited while cock 74 is closed (TE/BE = 0) (कॉक 74 बंद रहने पर ट्रैक्शन अवरुद्ध रहेगा)",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \" 0 \" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Open emergency exhaust Cock 74 on pneumatic panel. (न्यूमैटिक पैनल पर लगे इमरजेंसी एग्जॉस्ट कॉक नं. 74 (Cock 74) को खोल दें।)",
      "3. If Cock No. 74 is open and the message persists, check wires of Pressure Limiting Switch and attempt to close VCB 2 to 3 times. (यदि कॉक नं. 74 ओपन है और फिर भी मैसेज आता है तो प्रेशर लिमिटिंग स्विच (Pressure Limiting Switch) के तार चेक करें और VCB को 2-3 बार क्लोज़ करने का प्रयास करें।)",
      "4. If locomotive normalizes, proceed with operation; otherwise switch OFF control electronics and turn ON once (MCE OFF/ON). (यदि लोको सामान्य होता है तो आगे कार्य करें, अन्यथा एक बार कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करके ऑन (MCE OFF/ON) करें।)"
    ]
  },
  {
    id: "F1101P2",
    subSystem: "SS11",
    message: "MCB(S) TRIPPED IN AUX.\nCUBICLE 1\nTraction power may get reduced,\nif temperature exceed.",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "HB-1 में MCB ट्रिप होने से संबंधित ऑक्सिलरी बंद हो सकती है; तापमान बढ़ने पर ट्रैक्शन पॉवर कम हो सकती है या बोगी-1 आइसोलेट हो सकती है।",
    actions: [
      "1. Check MCBs in HB-1; if any MCB is tripped, open VCB and reset it once. (1. HB-1 में लगे MCB को चेक करें, यदि कोई MCB ट्रिप मिले, तो उसे VCB ओपन करके एक बार रीसेट करें।)",
      "2. Acknowledge fault by pressing BPFA. Continue normal operation. (BPFA द्वारा फ़ॉल्ट एक्नॉलेज (ACK) करें। सामान्य ऑपरेशन चालू रखें।)",
      "3. If no MCB is tripped yet message appears and all auxiliaries are operating, ignore it. It may be due to defective MCB control contacts. (यदि कोई भी MCB ट्रिप नहीं है, फिर भी मैसेज आ रहा है और सभी ऑक्सिलरी कार्य कर रही हैं, तो उस पर ध्यान न दें। यह संबंधित MCB के कंट्रोल कॉन्टैक्ट (Control Contact) खराब होने के कारण हो सकता है।)",
      "4. If MCBs (59.1/1, 62.1/1, 63.1/1 or 53.1/1) trip again after resetting once, isolate Bogie-1 via switch 154. (यदि MCBs (59.1/1, 62.1/1, 63.1/1 या 53.1/1) रीसेट करने के बाद दोबारा ट्रिप होते हैं तो बोगी-1 को स्विच 154 द्वारा आइसोलेट करें।)",
      "5. Inform TLC -1. (TLC को सूचित करें तथा लॉग बुक में नोट करें। यदि अपने आप बोगी-1 आइसोलेट हो जाती है तो एक बोगी के साथ ट्रैक्शन चालू रखें।)",
      "6. If MCBs other than those in Step 4 trip again after resetting, continue normal operation as far as possible and inform TLC. (6. अगर अनुक्रम 4 में दिए गए MCB के अलावा दूसरे MCB रीसेट करने के पश्चात दोबारा ट्रिप हो रहे हैं, तो जहाँ तक संभव हो सामान्य ऑपरेशन चालू रखें और TLC को सूचित करें।)",
      "7. Check MCB 54.1/1; if tripped, reset once. If it trips again and auxiliary converter 1 (BUR-1) is isolated, work train and inform TLC. (MCB 54.1/1 को चेक करें, यदि ट्रिप है तो एक बार रीसेट करें। यदि फिर से ट्रिप होती है और यदि ऑक्सिलरी कनवर्टर 1 (BUR-1) आइसोलेट हो जाता है तो गाड़ी चलाएं। TLC को सूचित करें।)"
    ]
  },
  {
    id: "F1102P2",
    subSystem: "SS11",
    message: "EARTH FAULT 415/110V\nCIRCUIT\nNormal operation can continue\nTo be checked during maintenance",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Normal operation can continue; earth fault in 415/110V circuit to be inspected during maintenance (सामान्य ऑपरेशन जारी रह सकता है, 415/110V सर्किट में अर्थ फ़ॉल्ट की मेंटेनेंस में जांच करें)",
    actions: [
      "1. Press BPFA to acknowledge fault Resume normal traction. (BPFA दबाकर फ़ॉल्ट ACK करें। सामान्य ट्रैक्शन चालू करें।)",
      "2. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1103P2",
    subSystem: "SS11",
    message: "MCB OFF MAIN\nCOMPRESSOR\nOPEN\nCompressor 1 not available",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Compressor-1 not available; only Compressor-2 will operate (कम्प्रेसर-1 उपलब्ध नहीं रहेगा, केवल कम्प्रेसर-2 कार्य करेगा)",
    actions: [
      "1. Check MCB No. 47.1/1 in auxiliary cubicle HB-1; if tripped, open VCB and reset once. (1. ऑक्सिलरी क्यूबिकल HB-1 में लगे MCB नं 47.1/1 चेक करें। यदि ट्रिप मिले, तो VCB ओपन करके एक बार रीसेट करें।)",
      "2. Press BPFA to acknowledge fault. (BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "3. Resume normal traction. (सामान्य ट्रैक्शन चालू करें। अगर वही मैसेज दोबारा आता है तो एक कम्प्रेसर के साथ गाड़ी चलाएं।)",
      "4. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "Note: If MCBs No. 47.1/1 and 47.1/2 trip repeatedly, open VCB, reset MCBs, and isolate BUR-3. (नोट: यदि MCB नं. 47.1/1 और 47.1/2 बार-बार ट्रिप होते हैं तो VCB ओपन करके MCBs रीसेट करें और BUR-3 को आइसोलेट करें।)"
    ]
  },
  {
    id: "F1104P2",
    subSystem: "SS11",
    message: "OVERLOAD ON OCB-1\nIsolate OCB",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "OCB-1 पर ओवरलोड (Overload on OCB-1)। बोगी-1 को आइसोलेट करना पड़ेगा।",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Trip MCB 59.1/1 of Oil Cooling Blower in HB-1. (2. HB-1 में लगे ऑयल कूलिंग ब्लोअर के MCB 59.1/1 को ट्रिप करें।)",
      "3. Isolate Bogie-1 via switch 154. (बोगी-1 को स्विच 154 द्वारा आइसोलेट करें।)",
      "4. Can continue normal operation with one bogie (Bogie-2). (एक बोगी (बोगी-2) के साथ सामान्य ऑपरेशन कर सकते हैं।)"
    ]
  },
  {
    id: "F1105P2",
    subSystem: "SS11",
    message: "Rotary Switch Vigilance off\n/ on position\nNormal operation",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Position message for rotary switch 237.1 (VCD cutout switch); normal operation continues (रोटरी स्विच 237.1 की पोजीशन संबंधित संदेश, सामान्य ऑपरेशन जारी रहेगा)",
    actions: [
      "1. Press BPFA to acknowledge fault. (BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Resume normal traction. (सामान्य ट्रैक्शन चालू करें और सतर्क रहें।)",
      "3. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "Note: Isolate VCD via switch 237.1 (SB-1) only during failure or malfunction. (नोट: VCD को 237.1 (SB-1) के द्वारा केवल फ़ेलियर / माल-फंक्शन के दौरान ही आइसोलेट करें।)"
    ]
  },
  {
    id: "F1106P2",
    subSystem: "SS11",
    message: "ROTARY SWITCH 160\nLoco in shunting mode speed\ncannot be more than 15 KMPH",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Locomotive is in shunting mode, speed cannot exceed 15 km/h (लोको शंटिंग मोड में है, गति 15 KMPH से अधिक नहीं हो सकती)",
    actions: [
      "1. SB-1 . 160 \"0\" Bring throttle to \"0\", Speed \"0\" , Reverser \"0\" , Switch 160 \"1\". (SB-1 पर लगे स्विच नं. 160 की पोजीशन चेक करें। यदि स्विच \"0\" पर है तो थ्रोटल को \"0\" पर लाएं, Speed \"0\" पर लाएं, Reverser \"0\" पर लाएं, तथा Switch 160 को \"1\" पर लाकर सामान्य गति प्राप्त करें।)",
      "2. Press BPFA to acknowledge fault. (BPFA दबाकर फ़ॉल्ट ACK करें। सामान्यतौर पर गाड़ी चलाएं।)"
    ]
  },
  {
    id: "F1201P2",
    subSystem: "SS12",
    message: "MCB(S) TRIPPED IN AUX.\nCUBICLE 2\nTraction power may get reduced,\nif temperature exceed.",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "HB-2 में MCB ट्रिप होने से संबंधित ऑक्सिलरी बंद हो सकती है; तापमान बढ़ने पर ट्रैक्शन पॉवर कम हो सकती है अथवा बोगी-2 स्वतः आइसोलेट हो सकती है।",
    actions: [
      "1. Check MCBs in HB-2; if any MCB is tripped, open VCB and reset it once. (1. HB-2 में लगे MCBs को चेक करें, यदि कोई MCB ट्रिप मिले, तो उसे VCB ओपन करके एक बार रीसेट करें।)",
      "2. Acknowledge fault by pressing BPFA. Continue normal operation. (BPFA द्वारा फ़ॉल्ट एक्नॉलेज (ACK) करें। सामान्य ऑपरेशन चालू रखें।)",
      "3. If no MCB is tripped yet the message appears and all auxiliaries are operating, ignore the message. It may be due to defective MCB control contacts. (3. यदि कोई भी MCB ट्रिप नहीं है फिर भी मैसेज आ रहा है और सभी ऑक्सिलरी कार्य कर रही हैं तो उस मैसेज पर ध्यान न दें। यह संबंधित MCB के कंट्रोल कॉन्टैक्ट खराब होने के कारण हो सकता है।)",
      "4. If MCBs (59.1/2, 62.1/2, 63.1/2 or 53.1/2) trip again after resetting once, isolate Bogie-2 via switch 154. (यदि MCBs (59.1/2, 62.1/2, 63.1/2 या 53.1/2) रीसेट करने के बाद दोबारा ट्रिप होते हैं तो बोगी-2 को स्विच 154 द्वारा आइसोलेट करें।)",
      "5. Inform TLC and record in log book. If Bogie-2 automatically isolates, continue traction with one bogie (Bogie-1). (TLC को सूचित करें तथा लॉग बुक में नोट करें। यदि अपने आप बोगी-2 आइसोलेट हो जाती है तो एक बोगी (बोगी-1) के साथ ट्रैक्शन चालू रखें।)",
      "6. If MCBs other than those in Step 4 trip again after resetting, continue normal operation as far as possible and inform TLC. (6. यदि अनुक्रम 4 में दिए गए MCB के अलावा दूसरे MCB रीसेट करने के पश्चात दोबारा ट्रिप हो रहे हैं तो जहाँ तक संभव हो सामान्य ऑपरेशन चालू रखें और TLC को सूचित करें।)",
      "7. Check MCB 54.1/2. If tripped, reset once; if it trips again, clear section, inform TLC and demand assistance engine. (MCB क्रम 54.1/2 को चेक करें, यदि ट्रिप है तो एक बार रीसेट करें, यदि फिर से ट्रिप होती है तो सेक्शन साफ़ करके TLC को सूचित करें और सहायता इंजन मांगें।)"
    ]
  },
  {
    id: "F1202P2",
    subSystem: "SS12",
    message: "MCB OF MAIN\nCOMPRESSOR OPEN\nCompressor 2 not available",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Compressor-2 not available; work with Compressor-1 only (कम्प्रेसर 2 उपलब्ध नहीं रहेगा, केवल कम्प्रेसर 1 से कार्य होगा)",
    actions: [
      "1. Check MCB No. 47.1/2 in auxiliary cubicle HB-2; if tripped, open VCB and reset once. (1. ऑक्सिलरी क्यूबिकल HB-2 में लगे MCB नं 47.1/2 चेक करें। यदि ट्रिप मिले, VCB ओपन करके एक बार रीसेट करें।)",
      "2. Press BPFA to acknowledge fault. (BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "3. Resume normal traction. (सामान्य ट्रैक्शन चालू करें। अगर वही मैसेज दोबारा आता है तो एक कम्प्रेसर के साथ गाड़ी चलाएं।)",
      "4. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "Note: If MCBs No. 47.1/1 and 47.1/2 trip repeatedly, open VCB, reset MCBs, and isolate BUR-3. (नोट: यदि MCB नं 47.1/1 और 47.1/2 बार-बार ट्रिप होते हैं तो VCB ओपन करके MCBs रीसेट करें और BUR-3 को आइसोलेट करें।)"
    ]
  },
  {
    id: "F1203P2",
    subSystem: "SS12",
    message: "OVERLOAD ON OCB-2\nIsolate OCB",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "OCB-2 पर ओवरलोड (Overload on OCB-2)। बोगी-2 को आइसोलेट करना पड़ेगा।",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Trip MCB 59.1/2 of Oil Cooling Blower in HB-2. (2. HB-2 में लगे ऑयल कूलिंग ब्लोअर के MCB 59.1/2 को ट्रिप करें।)",
      "3. Isolate Bogie-2 via switch 154. (बोगी-2 को स्विच 154 द्वारा आइसोलेट करें।)",
      "4. Can continue normal operation with one bogie (Bogie-1). (एक बोगी (बोगी-1) के साथ सामान्य ऑपरेशन कर सकते हैं।)"
    ]
  },
  {
    id: "F1301P1",
    subSystem: "SS13",
    message: "DISTURBANCE IN\nPROCESSOR HBB1\nCab 1 may get isolated, drive\nfrom cab 2 refer to driver’s\nmanual\n\n[WAG-9 / WAG-9H / WAP-7 / WAP-5 VCU Redundancy]:\nCab 1 will not Isolate.\nDrive from cab 1.\n\n[RBU / RIOM VCU Variant]:\nDisturbance in Processor RBU-2\nDriving from Cab 1 still possible Press BPFA.",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "WAG-9 / WAG-9H / WAP-7 (VCU Redundancy): कैब 1 आइसोलेट नहीं होगी (Drive from cab 1)। HB-1 के सभी MCB, अर्थफ़ॉल्ट रिले 415/110V और फ्यूज 415/110V मॉनीटर नहीं होंगे।\nWAP-5 (VCU Redundancy): कैब 1 आइसोलेट नहीं होगी (Drive from cab 1)। HB-1 में 47.1/1 को छोड़कर अन्य MCB मॉनीटर नहीं होंगे।\nRBU-2 वेरिएंट: कैब-1 से ड्राइविंग संभव है (Press BPFA)।\nकन्वेंशनल 3-फेज लोको: कैब 1 आइसोलेट हो सकती है (Drive from cab 2)।",
    actions: [
      "【1. RBU / RIOM VCU Variant (Disturbance in Processor RBU-2) - 1. RBU / RIOM VCU वेरिएंट (प्रोसेसर RBU-2 में खराबी)】",
      "1. Switch OFF and turn ON control electronics once again. Raise pantograph, close VCB and resume traction. (कंट्रोल इलेक्ट्रॉनिक्स को एक बार फिर ऑफ़ तथा ऑन करें। पेंटो रेज करें, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "2. Press BPFA to acknowledge fault. (यदि फ़ॉल्ट बना रहता है तो BPFA दबाकर फ़ॉल्ट एक्नॉलेज करें और किसी भी कैब से सामान्यतौर पर गाड़ी चलाएं।)",
      "--------------------------------------------------",
      "【2. WAG-9 / WAG-9H / WAP-7 (With VCU Redundancy) - 2. WAG-9 / WAG-9H / WAP-7 लोको (जिनमें VCU Redundancy फीचर है)】",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें और गाड़ी चलाएं।)",
      "Note: All MCBs, earth fault relay 415/110V, and fuse 415/110V in HB-1 will not be monitored. (नोट: HB-1 के सभी MCB, अर्थफ़ॉल्ट रिले 415/110V और फ्यूज 415/110V मॉनीटर नहीं होंगे।)",
      "--------------------------------------------------",
      "【3. WAP-5 Locomotives (With VCU Redundancy) - 3. WAP-5 लोको (जिनमें VCU रिडंडेंसी फीचर है)】",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें और गाड़ी चलाएं।)",
      "【1. RBU / RIOM VCU Variant (Disturbance in Processor RBU-2) - 1. RBU / RIOM VCU वेरिएंट (प्रोसेसर RBU-2 में खराबी)】",
      "【2. WAG-9 / WAG-9H / WAP-7 (With VCU Redundancy) - 2. WAG-9 / WAG-9H / WAP-7 लोको (जिनमें VCU Redundancy फीचर है)】",
      "【4. Conventional 3-Phase Loco (Without VCU Redundancy) - 4. कन्वेंशनल 3-फेज लोको (बिना VCU Redundancy)】: • If driving from Cab-2: Lower pantograph using ZPT; place Panto Selector Switch 85 on \"I\"; raise pantograph using ZPT (Panto-1 will raise); close VCB and resume normal operation. • If unsuccessful, drive from Cab-1. (यदि कैब-2 से गाड़ी चला रहे हों तो: ZPT को डाउन करें, स्विच 85 को \"I\" पर रखें, पैंटो-1 उठाएं, VCB क्लोज करें; असफलता पर कैब-1 से कार्य करें।)",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Check MCB 127.1/1 on SB-1; if tripped, switch OFF control electronics and reset once. (SB-1 पर लगे MCB (127.1/1) को चेक करें, यदि ट्रिप हो तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके एक बार रीसेट करें।)",
      "3. If not tripped, switch OFF and turn ON control electronics once again. Raise pantograph, close VCB and resume traction. (यदि ट्रिप नहीं है तो कंट्रोल इलेक्ट्रॉनिक्स को एक बार फिर ऑफ़ तथा ऑन करें। पेंटो रेज करें, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "【Screen 2 (Press ENTER): CAB 1 ISOLATED - Drive from Cab-2 - स्क्रीन 2 (ENTER दबाने पर): कैब 1 आइसोलेटेड - कैब 2 से चलाएं】: Work train from Cab-2. Inform TLC and record in locomotive log book. (कैब-2 से कार्य करें। TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1302P1",
    subSystem: "SS13",
    message: "DISTURBANCE IN\nPROCESSOR STB1\nCab 1 may get isolated, drive\nfrom Cab 2 refer to driver’s\nmanual\n\n[WAG-9 / WAG-9H / WAP-7 / WAP-5 VCU Redundancy]:\nCab 1 will not Isolate.\nDrive from cab 1.\n\n[RBU / RIOM VCU Variant]:\nDisturbance in Processor RBU-1\nDriving from Cab 1 still possible Press BPFA.",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "RBU-1 वेरिएंट: कैब-1 से ड्राइविंग संभव (Press BPFA)। CAB-1 के TE/BE मीटर काम नहीं करेंगे, CAB-1 से फेलियर मोड में चलेगा, CAB-2 से सामान्य ऑपरेशन संभव।\nWAG-9 / WAG-9H / WAP-7 (VCU Redundancy): कैब 1 आइसोलेट नहीं होगी (Drive from cab 1)। एयर ड्रायर, होटल लोड और फेलियर मोड स्विच काम नहीं करेंगे।\nWAP-5 (VCU Redundancy): कैब 1 आइसोलेट नहीं होगी। एयर ड्रायर, होटल लोड और ऑटो सैंडिंग काम नहीं करेंगे।\nकन्वेंशनल 3-फेज लोको: कैब 1 आइसोलेट हो सकती है (Drive from cab 2)।",
    actions: [
      "【1. RBU / RIOM VCU Variant (Disturbance in Processor RBU-1) - 1. RBU / RIOM VCU वेरिएंट (प्रोसेसर RBU-1 में खराबी)】",
      "1. Switch OFF control electronics and turn it ON. Raise pantograph, close VCB, and resume normal traction. (1. कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ तथा ऑन करें। पेंटो रेज करें, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "2. Press BPFA to acknowledge fault. (यदि फ़ॉल्ट बना रहता है तो BPFA दबाकर फ़ॉल्ट एक्नॉलेज करें और किसी भी कैब से सामान्यतौर पर गाड़ी चलाएं।)",
      "3. CAB-1 TE/BE. (CAB-1 के TE/BE मीटर रीडिंग नहीं बताएंगे।)",
      "4. Loco will operate from Cab-1 in failure mode (auto-activation). (लोको CAB-1 से फेलियर मोड {ऑटो एक्टिवेशन} में चलेगा।)",
      "5. Normal operation can be performed from Cab-2. (CAB-2 से सामान्य ऑपरेशन किया जा सकता है।)",
      "--------------------------------------------------",
      "【2. WAG-9 / WAG-9H / WAP-7 (With VCU Redundancy) - 2. WAG-9 / WAG-9H / WAP-7 लोको (जिनमें VCU Redundancy फीचर है)】",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें और गाड़ी चलाएं।)",
      "2. If bogie isolation is required, isolate Bogie-1 via MCB 127.1/1 & 127.11/1 (SB-1), and Bogie-2 via MCB 127.1/2 & 127.11/2 (SB-2). (2. यदि बोगी आइसोलेशन की आवश्यकता हो तो बोगी-1 को MCB 127.1/1 एवं 127.11/1 {SB-1}, बोगी-2 को MCB 127.1/2 एवं 127.11/2 {SB-2} द्वारा आइसोलेट करें।)",
      "【1. RBU / RIOM VCU Variant (Disturbance in Processor RBU-1) - 1. RBU / RIOM VCU वेरिएंट (प्रोसेसर RBU-1 में खराबी)】",
      "Note: Air dryer, hotel load and failure mode switch will not work. (नोट: एयर ड्रायर, होटल लोड और फेलियर मोड स्विच काम नहीं करेंगे।)",
      "【2. WAG-9 / WAG-9H / WAP-7 (With VCU Redundancy) - 2. WAG-9 / WAG-9H / WAP-7 लोको (जिनमें VCU Redundancy फीचर है)】",
      "【3. WAP-5 Locomotives (With VCU Redundancy) - 3. WAP-5 लोको (जिनमें VCU रिडंडेंसी फीचर है)】",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें और गाड़ी चलाएं।)",
      "Note: Air dryer, hotel load and auto sanding will not work. (नोट: एयर ड्रायर, होटल लोड और ऑटो सैंडिंग काम नहीं करेंगे।)",
      "--------------------------------------------------",
      "【4. Conventional 3-Phase Loco (Without VCU Redundancy) - 4. कन्वेंशनल 3-फेज लोको (बिना VCU Redundancy)】: • If driving from Cab-2: Lower pantograph using ZPT; place Panto Selector Switch 85 on \"I\"; raise pantograph using ZPT (Panto-1 will raise); close VCB and resume normal operation. • If unsuccessful, drive from Cab-1. (यदि कैब-2 से गाड़ी चला रहे हों तो: ZPT को डाउन करें, स्विच 85 को \"I\" पर रखें, पैंटो-1 उठाएं, VCB क्लोज करें; असफलता पर कैब-1 से कार्य करें।)",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Check MCB 127.1/1 on SB-1; if tripped, switch OFF control electronics and reset once. (SB-1 पर लगे MCB (127.1/1) को चेक करें, यदि ट्रिप हो तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके एक बार रीसेट करें।)",
      "3. If not tripped, switch OFF and turn ON control electronics once again. Raise pantograph, close VCB and resume traction. (यदि ट्रिप नहीं है तो कंट्रोल इलेक्ट्रॉनिक्स को एक बार फिर ऑफ़ तथा ऑन करें। पेंटो रेज करें, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "【Screen 2 (Press ENTER): CAB 1 ISOLATED - Drive from Cab-2 - स्क्रीन 2 (ENTER दबाने पर): कैब 1 आइसोलेटेड - कैब 2 से चलाएं】: Work train from Cab-2. Inform TLC and record in locomotive log book. (कैब-2 से कार्य करें। TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1303P1",
    subSystem: "SS13",
    message: "REVERSER DEFECTIVE\nDrive from cab 2",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Cannot drive from Cab-1 due to defective reverser; clear section in coasting and drive from Cab-2 (रिवर्सर ख़राब होने के कारण कैब-1 से परिचालन बाधित; कोस्टिंग में सेक्शन क्लियर कर कैब-2 से चलाएं)",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Operate reverser 2 to 3 times. (रिवर्सर को 2-3 बार ऑपरेट करें।)",
      "If not successful: Clear block section in coasting. Switch OFF and ON control electronics. (MCE OFF/ON). (यदि सफलता नहीं मिलती है तो कोस्टिंग में सेक्शन क्लियर करें। कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ तथा ऑन करें (MCE OFF/ON)।)",
      "4. If the same message repeats, change cab and clear section from Cab-2. (यदि वही मैसेज दोबारा आता है तो कैब बदलकर, कैब-2 से सेक्शन क्लियर करें।)",
      "5. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "--------------------------------------------------",
      "【Screen 2 (Press ENTER): CAB 1 ISOLATED - Drive from Cab-2 - स्क्रीन 2 (ENTER दबाने पर): कैब 1 आइसोलेटेड - कैब 2 से चलाएं】",
      "1. Switch OFF and turn ON control electronics. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ तथा ऑन करें।)",
      "2. If driving from Cab-1 and same message recurs, change cab and clear section from Cab-2. Inform TLC and record in log book. (2. यदि कैब-1 से गाड़ी चला रहे हैं और वही मैसेज दोबारा आता है तो कैब बदलकर, कैब-2 से सेक्शन क्लियर करें। TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1304P1",
    subSystem: "SS13",
    message: "RBU 1 RIOM\nEXTENSION FAULT\nDriving still possible",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Driving still possible; identify affected RIOM extension from DDS (ड्राइविंग संभव है, प्रभावित RIOM एक्सटेंशन की पहचान DDS से करनी होगी)",
    actions: [
      "1. Switch OFF control electronics and turn it ON. Raise pantograph, close VCB, and resume normal traction. (1. कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ तथा ऑन करें। पेंटो रेज करें, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "2. -1 -2 Inform TLC and record in locomotive log book. (यदि वही मैसेज दोबारा आता है और कैब-1 से गाड़ी चला रहे हैं तो कैब बदलकर कैब-2 से सेक्शन क्लियर करें। TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "3. Read DDS messages to identify which RIOM extension requires replacement. (DDS के मैसेज पढ़ें और कौन सा RIOM एक्सटेंशन बदलना है पता लगाएं।)"
    ]
  },
  {
    id: "F1305P1",
    subSystem: "SS13",
    message: "RBU 2 RIOM\nEXTENSION FAULT\nDriving still possible",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Driving still possible; identify affected RIOM extension from DDS (ड्राइविंग संभव है, प्रभावित RIOM एक्सटेंशन की पहचान DDS से करनी होगी)",
    actions: [
      "1. Switch OFF control electronics once again and turn it ON. Raise pantograph, close VCB, and resume normal traction. (1. कंट्रोल इलेक्ट्रॉनिक्स को एक बार फिर ऑफ़ तथा ऑन करें। पेंटो उठाएं, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "2. -1 -2 Inform TLC and record in locomotive log book. (यदि कैब-1 से गाड़ी चला रहे हैं और वही मैसेज दोबारा आता है तो कैब बदलकर कैब-2 से सेक्शन क्लियर करें। TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "3. Read DDS messages to identify which RIOM extension requires replacement. (DDS के मैसेज पढ़ें और कौन सा RIOM एक्सटेंशन बदलना है पता लगाएं।)"
    ]
  },
  {
    id: "F1304P1-MEDHA",
    subSystem: "SS13",
    message: "START RUN INTERLOCK\nSimultaneous Motoring & Braking command\nfrom Throttle of CAB-1",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Interlock active due to simultaneous motoring & braking commands from Cab-1 throttle; normal operation inhibited (कैब-1 थ्रोटल इंटरलॉक सक्रिय, सामान्य परिचालन बाधित)",
    actions: [
      "1. Bring throttle to \"0\". (थ्रोटल को \"0\" पर लाएं।)",
      "2. (MCE OFF/ON). (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ तथा ऑन करें (MCE OFF/ON)।)",
      "3. If the same message repeats, change cab and clear the section. (यदि वही मैसेज दोबारा आता है तो कैब बदलकर सेक्शन क्लियर करें।)",
      "4. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1301P2",
    subSystem: "SS13",
    message: "Disturbance in Processor\nVCU1-DIP1\n(MEDHA IGBT Loco)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "VCU1-DIP1 डिस्टर्बेंस। सामान्य ऑपरेशन चालू रहेगा किंतु CSC, सिमुलेशन मोड, PVEF कैब-1 से कार्य नहीं करेंगे और 47.1/1 MCB ट्रिप का पता नहीं चलेगा।",
    actions: [
      "1. Record in log book Continue normal operation. (फ़ॉल्ट को लॉग बुक में दर्ज करें तथा सामान्य ऑपरेशन चालू रखें।)",
      "Following functions will not be available:- (निम्न कार्य नहीं होंगे:-)",
      "• CSC will not work from Cab-1. (CSC कैब-1 से कार्य नहीं करेगा।)",
      "• Simulation mode will not work. (सिमुलेशन मोड कार्य नहीं करेगा।)",
      "• PVEF will not work from Cab-1. (PVEF कैब-1 से कार्य नहीं करेगा।)",
      "• Tripping of MCB 47.1/1 will not be detected. (47.1/1 MCB ट्रिप होने का पता नहीं चलेगा।)"
    ]
  },
  {
    id: "F1302P2",
    subSystem: "SS13",
    message: "Disturbance in Processor\nVCU1-DIP2\n(MEDHA IGBT Loco)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "VCU1-DIP2 डिस्टर्बेंस। सामान्य ऑपरेशन चालू रहेगा किंतु MCB 53.1/1, 54.1/1, 55.1/1, 56.1/1 और 59.1/1 ट्रिप होने का पता नहीं चलेगा।",
    actions: [
      "1. Record in log book Continue normal operation. (फ़ॉल्ट को लॉग बुक में दर्ज करें तथा सामान्य ऑपरेशन चालू रखें।)",
      "Following functions will not be available:- (निम्न कार्य नहीं होंगे:-)",
      "• Tripping of MCBs 53.1/1, 54.1/1, 55.1/1, 56.1/1 and 59.1/1 will not be detected. (MCB 53.1/1, 54.1/1, 55.1/1, 56.1/1 और 59.1/1 ट्रिप होने का पता नहीं चलेगा।)"
    ]
  },
  {
    id: "F1303P2",
    subSystem: "SS13",
    message: "Disturbance in Processor\nVCU1-DIP3\n(MEDHA IGBT Loco)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "VCU1-DIP3 डिस्टर्बेंस। सामान्य ऑपरेशन चालू रहेगा किंतु अर्थफ़ॉल्ट {कंट्रोल, फ़िल्टर और 415/110} डिटेक्ट नहीं होगा और MCB 62.1/1, 63.1/1 ट्रिप का पता नहीं चलेगा।",
    actions: [
      "1. Record in log book Continue normal operation. (फ़ॉल्ट को लॉग बुक में दर्ज करें तथा सामान्य ऑपरेशन चालू रखें।)",
      "Following functions will not be available:- (निम्न कार्य नहीं होंगे:-)",
      "• Earth fault (Control, Filter & 415/110V) will not be detected. (अर्थफ़ॉल्ट {कंट्रोल, फ़िल्टर और 415/110V} डिटेक्ट नहीं होगा।)",
      "• Tripping of MCBs 62.1/1 and 63.1/1 will not be detected. (MCB 62.1/1 और 63.1/1 ट्रिप होने का पता नहीं चलेगा।)"
    ]
  },
  {
    id: "F1304P2",
    subSystem: "SS13",
    message: "Disturbance in Processor\nVCU1-DIP4\n(MEDHA IGBT Loco)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "VCU1-DIP4 डिस्टर्बेंस। सामान्य ऑपरेशन पर कोई प्रतिकूल प्रभाव नहीं।",
    actions: [
      "1. Record in log book Continue normal operation. (फ़ॉल्ट को लॉग बुक में दर्ज करें तथा सामान्य ऑपरेशन चालू रखें।)"
    ]
  },
  {
    id: "F1305P2",
    subSystem: "SS13",
    message: "Disturbance in Processor\nVCU1-DOP1\n(MEDHA IGBT Loco)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "VCU1-DOP1 डिस्टर्बेंस। डेस्क लैम्प इंडिकेशन कार्य नहीं करेंगे; TFT डिस्प्ले यूनिट पर इंडिकेशन देखें।",
    actions: [
      "1. Record in log book Continue normal operation. (फ़ॉल्ट को लॉग बुक में दर्ज करें तथा सामान्य ऑपरेशन चालू रखें।)",
      "Following functions will not be available:- (निम्न कार्य नहीं होंगे:-)",
      "• Lamp indications will not work; lamps can be viewed on TFT display unit. (लैम्प इंडिकेशन कार्य नहीं करेंगे, लैम्प इंडिकेशन TFT डिस्प्ले यूनिट पर देखे जा सकते हैं।)"
    ]
  },
  {
    id: "F1306P2",
    subSystem: "SS13",
    message: "Disturbance in Processor\nVCU1-DOP2\n(MEDHA IGBT Loco)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "VCU1-DOP2 डिस्टर्बेंस। सामान्य ऑपरेशन चालू रहेगा किंतु एयर ड्रायर कार्य नहीं करेगा।",
    actions: [
      "1. Record in log book Continue normal operation. (फ़ॉल्ट को लॉग बुक में दर्ज करें तथा सामान्य ऑपरेशन चालू रखें।)",
      "Following functions will not be available:- (निम्न कार्य नहीं होंगे:-)",
      "• Air dryer will not work. (• एयर ड्रायर (Air Dryer) कार्य नहीं करेगा।)"
    ]
  },
  {
    id: "F1307P2",
    subSystem: "SS13",
    message: "Disturbance in Processor\nVCU1-DOP3\n(MEDHA IGBT Loco)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "VCU1-DOP3 डिस्टर्बेंस। सामान्य ऑपरेशन पर कोई प्रतिकूल प्रभाव नहीं।",
    actions: [
      "1. Record in log book Continue normal operation. (फ़ॉल्ट को लॉग बुक में दर्ज करें तथा सामान्य ऑपरेशन चालू रखें।)"
    ]
  },
  {
    id: "F1401P1",
    subSystem: "SS14",
    message: "DISTURBANCE IN\nPROCESSOR HBB2 / RBU-4\nCab 2 may get isolated / Cab 2 will not Isolate\nDrive from cab 1 / Drive from cab 2 (BHEL TCN/IGBT: RBU-4)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "In conventional 3-phase, Cab-2 may isolate (drive from Cab-1); in VCU Redundancy locos, drive from Cab-2 placing switch 85 to II. Isolate VCD 237.1, release parking brake, regen brake will not work. In BHEL TCN/IGBT locos, driving from Cab-2 is possible on RBU-4 disturbance. (कन्वेंशनल 3-फेज में कैब-2 आइसोलेट हो सकती है; VCU Redundancy में कैब-2 से ड्राइविंग संभव है)",
    actions: [
      "【1. BHEL TCN IGBT (Disturbance in Processor RBU-4) - 1. BHEL TCN एवं IGBT मेक लोको (प्रोसेसर RBU-4 में खराबी)】",
      "1. Switch OFF and ON control electronics. (MCE OFF/ON). Raise pantograph, close VCB and resume normal traction. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ तथा ऑन करें (MCE OFF/ON)। पैंटो रेज़ करें, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "2. Press BPFA to acknowledge fault. (यदि फ़ॉल्ट फिर भी बना रहता है तो BPFA दबाकर फ़ॉल्ट एकनॉलेज करें और किसी भी कैब से सामान्य तौर पर गाड़ी चलाएं।)",
      "--------------------------------------------------",
      "【2. WAG-9 - WAG-9H - WAP-7 (VCU Redundancy Feature) - लोको जिनमें VCU रिडंडेंसी फीचर है】:",
      "1. Bring throttle to \"0\" Stop the train immediately. (थ्रोटल को \"0\" पर लाएं। गाड़ी खड़ी करें और पार्किंग ब्रेक मैनुअली रिलीज़ करें।)",
      "2. Isolate VCD by placing switch 237.1 in SB-1 to \"0\". (2. VCD को SB-1 में लगे 237.1 स्विच को \"0\" पर रखकर आइसोलेट करें।)",
      "3. If driving from Cab-2, set panto selector switch (85) on pneumatic panel to \"II\", because Panto-1 will not raise. (यदि कैब-2 से गाड़ी चला रहे हों तो न्यूमैटिक पैनल पर पैंटो सिलेक्टर स्विच (85) को \"II\" पर रखें, क्योंकि पैंटो-1 रेज नहीं होगा।)",
      "4. Press BPFA to acknowledge fault. (BPFA दबाकर फ़ॉल्ट ACK करें और गाड़ी चलाएं।)",
      "5. Do not move throttle towards BE (Braking Effort) side, as regenerative braking will not function. (थ्रोटल को BE (Braking Effort) की तरफ न ले जाएं क्योंकि रीजेनेरेटिव ब्रेक कार्य नहीं करेगा।)",
      "6. Auto flasher will not work as flow indicator pressure switch will not monitor; hence if needed turn ON flasher light using BPFL switch. (ऑटो फ़्लैशर काम नहीं करेगी क्योंकि प्रेशर स्विच फ्लो इंडिकेटर मॉनीटर नहीं होगा, अतः आवश्यकता पड़ने पर BPFL स्विच को ऑन करके फ़्लैशर लाइट जलाएं।)",
      "Note: Pressure switches for Direct Brake will not be monitored; pressure switches PAN-1 and PAN-2 will not be monitored. (नोट: प्रेशर स्विच डायरेक्ट ब्रेक मॉनीटर नहीं होगा; प्रेशर स्विच PAN-1 और PAN-2 मॉनीटर नहीं होंगे।)",
      "--------------------------------------------------",
      "【2. WAG-9 - WAG-9H - WAP-7 (VCU Redundancy Feature) - लोको जिनमें VCU रिडंडेंसी फीचर है】:",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें और गाड़ी चलाएं।)",
      "2. If driving from Cab-2, set panto selector switch (85) on pneumatic panel to \"II\", because Panto-1 will not raise. (यदि कैब-2 से गाड़ी चला रहे हों तो न्यूमैटिक पैनल पर पैंटो सिलेक्टर स्विच (85) को \"II\" पर रखें, क्योंकि पैंटो-1 रेज नहीं होगा।)",
      "--------------------------------------------------",
      "【4. Conventional 3-Phase Loco (Without VCU Redundancy) - 4. कन्वेंशनल 3-फेज लोको (बिना VCU Redundancy)】: • If driving from Cab-2: Lower pantograph using ZPT; place Panto Selector Switch 85 on \"I\"; raise pantograph using ZPT (Panto-1 will raise); close VCB and resume normal operation. • If unsuccessful, drive from Cab-1. (यदि कैब-2 से गाड़ी चला रहे हों तो: ZPT को डाउन करें, स्विच 85 को \"I\" पर रखें, पैंटो-1 उठाएं, VCB क्लोज करें; असफलता पर कैब-1 से कार्य करें।)",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Check MCB 127.1/2 on SB-2; if tripped, switch OFF control electronics and reset once. (SB-2 पर लगे MCB (127.1/2) को चेक करें, यदि ट्रिप हो तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके एक बार रीसेट करें।)",
      "3. If not tripped, switch OFF and turn ON control electronics once again. Raise pantograph, close VCB and resume traction. (यदि ट्रिप नहीं है तो कंट्रोल इलेक्ट्रॉनिक्स को एक बार फिर ऑफ़ तथा ऑन करें। पेंटो रेज करें, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "【Screen 2 (Press ENTER): CAB 2 ISOLATED - Drive from Cab-1 - स्क्रीन 2 (ENTER दबाने पर): कैब 2 आइसोलेटेड - कैब 1 से चलाएं】: Work train from Cab-1. Inform TLC and record in locomotive log book. (कैब-1 से कार्य करें। TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1402P1",
    subSystem: "SS14",
    message: "DISTURBANCE IN\nPROCESSOR STB2 / RBU-3\nCab 2 may get isolated / Cab 2 will not Isolate\nDrive from cab 1 / Drive from cab 2 (BHEL TCN/IGBT: RBU-3)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "In conventional 3-phase, Cab-2 may isolate (drive from Cab-1); in VCU Redundancy locos, drive from Cab-2, but HB-2 MCBs and VCD buzzer not monitored. In BHEL locos with RBU-3 disturbance, drive in failure mode via switch 152. (कन्वेंशनल 3-फेज में कैब-2 आइसोलेट हो सकती है; VCU Redundancy में कैब-2 से चलाएं)",
    actions: [
      "【1. BHEL TCN IGBT (Disturbance in Processor RBU-3) - 1. BHEL TCN एवं IGBT मेक लोको (प्रोसेसर RBU-3 में खराबी)】",
      "1. Switch OFF and ON control electronics. (MCE OFF/ON). Raise pantograph, close VCB and resume normal traction. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ तथा ऑन करें (MCE OFF/ON)। पैंटो रेज़ करें, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "2. Press BPFA to acknowledge fault. (यदि फ़ॉल्ट बना रहता है तो BPFA दबाकर फ़ॉल्ट एकनॉलेज करें और किसी भी कैब से सामान्य तौर पर गाड़ी चलाएं।)",
      "3. TE/BE meters in Cab-2 will not show readings. (कैब-2 के TE/BE मीटर रीडिंग नहीं बताएंगे।)",
      "4. Loco will operate from Cab-2 in failure mode (put rotating switch 152 from \"0\" to \"1\" position). (लोको कैब-2 से फेलियर मोड (रोटेटिंग स्विच 152 को \"0\" से \"1\" पोजीशन पर) में चलेगा।)",
      "5. Regenerative brake will not be available; therefore control train/loco using pneumatic brakes A-9 and SA-9. (रीजेनेरेटिव ब्रेक उपलब्ध नहीं होगा, अतः गाड़ी/लोको को न्यूमैटिक ब्रेक (A-9/SA-9) द्वारा कंट्रोल करें।)",
      "6. Normal operation is possible from Cab-1. (कैब-1 से सामान्य ऑपरेशन संभव है।)",
      "--------------------------------------------------",
      "【2. WAG-9 - WAG-9H - WAP-7 (VCU Redundancy Feature) - लोको जिनमें VCU रिडंडेंसी फीचर है】:",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें और गाड़ी चलाएं।)",
      "2. If bogie isolation is required, isolate Bogie-1 via MCB 127.1/1 & 127.11/1 (SB-1) and Bogie-2 via MCB 127.1/2 & 127.11/2 (SB-2) with MCE OFF. (2. यदि बोगी आइसोलेशन की आवश्यकता हो तो बोगी-1 को MCB 127.1/1 एवं 127.11/1 (SB-1), बोगी-2 को MCB 127.1/2 एवं 127.11/2 (SB-2) द्वारा आइसोलेट करें (MCE ऑफ़ करके)।)",
      "3. BL \"OFF\" MCB 112.1. (यदि कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करने की आवश्यकता हो तो BL को \"OFF\" पर रखकर MCB 112.1 को ऑफ़ करें।)",
      "Note: All MCBs in HB-2 will not be monitored; overspeed will not be monitored in speedometer; vigilance warning will not be received in Cab-2; only 1 compressor will work. (नोट: HB-2 में लगी सभी MCB मॉनीटर नहीं होंगी; स्पीडोमीटर में ओवरस्पीड मॉनीटर नहीं होगी; विजिलेंस वार्निंग कैब-2 में नहीं मिलेगी; केवल 1 कंप्रेसर काम करेगा।)",
      "--------------------------------------------------",
      "【2. WAG-9 - WAG-9H - WAP-7 (VCU Redundancy Feature) - लोको जिनमें VCU रिडंडेंसी फीचर है】:",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें और गाड़ी चलाएं।)",
      "2. Alarm will not be available on 105% and 110% overspeed; loco pilot must be extra vigilant and continuously monitor speedometer. (105% और 110% ओवर स्पीड होने पर अलार्म उपलब्ध नहीं होगा अतः लोको पायलट ज्यादा सतर्क रहते हुए स्पीडोमीटर पर लगातार ध्यान देते हुए गाड़ी चलाएं।)",
      "3. If driving from Cab-1, set panto selector switch (85) on pneumatic panel to \"I\", because Panto-2 will not raise. (यदि कैब-1 से गाड़ी चला रहे हों तो न्यूमैटिक पैनल पर पैंटो सिलेक्टर स्विच (85) को \"I\" पर रखें, क्योंकि पैंटो-2 रेज नहीं होगा।)",
      "Note: Except MCB 47.1/2, all other MCBs in HB-2 will not be monitored. (नोट: MCB 47.1/2 को छोड़कर HB-2 में लगी अन्य सभी MCB मॉनीटर नहीं होंगी।)",
      "--------------------------------------------------",
      "【4. Conventional 3-Phase Loco (Without VCU Redundancy) - 4. कन्वेंशनल 3-फेज लोको (बिना VCU Redundancy)】: • If driving from Cab-2: Lower pantograph using ZPT; place Panto Selector Switch 85 on \"I\"; raise pantograph using ZPT (Panto-1 will raise); close VCB and resume normal operation. • If unsuccessful, drive from Cab-1. (यदि कैब-2 से गाड़ी चला रहे हों तो: ZPT को डाउन करें, स्विच 85 को \"I\" पर रखें, पैंटो-1 उठाएं, VCB क्लोज करें; असफलता पर कैब-1 से कार्य करें।)",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Check MCB 127.1/2 on SB-2; if tripped, switch OFF control electronics and reset once. (SB-2 पर लगे MCB (127.1/2) को चेक करें, यदि ट्रिप हो तो कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करके एक बार रीसेट करें।)",
      "3. Switch OFF control electronics once again and turn it ON. Raise pantograph, close VCB, and resume normal traction. (3. कंट्रोल इलेक्ट्रॉनिक्स को एक बार फिर ऑफ़ तथा ऑन करें। पेंटो उठाएं, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "【Screen 2 (Press ENTER): CAB 2 ISOLATED - Drive from Cab-1 - स्क्रीन 2 (ENTER दबाने पर): कैब 2 आइसोलेटेड - कैब 1 से चलाएं】: Work train from Cab-1. Inform TLC and record in locomotive log book. (कैब-1 से कार्य करें। TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1403P1",
    subSystem: "SS14",
    message: "REVERSER DEFECTIVE\nDrive from cab 1",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Operation inhibited from Cab-2 due to defective reverser (MPJ); clear section in coasting and drive from Cab-1 (कैब-2 का रिवर्सर खराब होने से परिचालन बाधित; कोस्टिंग में क्लियर कर कैब-1 से चलाएं)",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Operate reverser 2 to 3 times. (रिवर्सर को 2-3 बार ऑपरेट करें।)",
      "If not successful: Clear block section in coasting. Switch OFF and ON control electronics. (MCE OFF/ON). (यदि सफलता नहीं मिलती है तो कोस्टिंग में सेक्शन क्लियर करें। कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ तथा ऑन करें (MCE OFF/ON)।)",
      "4. If the same message repeats, clear section from rear cab (Cab-1). (यदि वही मैसेज दोबारा आता है तो पीछे की कैब (कैब-1) से सेक्शन क्लियर करें।)",
      "5. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "--------------------------------------------------",
      "【Screen 2 (Press ENTER) - स्क्रीन 2 (ENTER दबाने पर)】:",
      "1. Switch OFF and turn ON control electronics. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ तथा ऑन करें।)",
      "2. If the same message repeats, drive train from rear cab (Cab-1). Inform TLC and record in locomotive log book. (यदि वही मैसेज दोबारा आता है तो पीछे की कैब से गाड़ी चलाएं (कैब-1)। TLC को सूचित करें तथा लोको लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1404P1",
    subSystem: "SS14",
    message: "RBU 3 RIOM\nEXTENSION FAULT\nDriving still possible",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "RBU-3 RIOM extension fault in Cab-2; driving still possible; identify affected RIOM extension from DDS (कैब-2 में RBU-3 RIOM एक्सटेंशन फ़ॉल्ट, ड्राइविंग संभव है)",
    actions: [
      "1. Switch OFF and ON control electronics. (MCE OFF/ON). Raise pantograph, close VCB and resume normal traction. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ तथा ऑन करें (MCE OFF/ON)। पैंटो रेज़ करें, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "2. -2 -1 Inform TLC and record in locomotive log book. (यदि कैब-2 से गाड़ी चला रहे हों और वही मैसेज दोबारा आता है तो कैब बदलकर कैब-1 से सेक्शन क्लियर करें। TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "3. Read DDS messages to identify which RIOM extension requires replacement. (DDS के मैसेज पढ़ें और कौन सा RIOM एक्सटेंशन बदलना है पता लगाएं।)"
    ]
  },
  {
    id: "F1405P1",
    subSystem: "SS14",
    message: "RBU 4 RIOM\nEXTENSION FAULT\nDriving still possible",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "RBU-4 RIOM extension fault in Cab-2; driving still possible; identify affected RIOM extension from DDS (कैब-2 में RBU-4 RIOM एक्सटेंशन फ़ॉल्ट, ड्राइविंग संभव है)",
    actions: [
      "1. Switch OFF and ON control electronics. (MCE OFF/ON). Raise pantograph, close VCB and resume normal traction. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ तथा ऑन करें (MCE OFF/ON)। पैंटो उठाएं, VCB क्लोज़ करें तथा ट्रैक्शन चालू करें।)",
      "2. -2 -1 Inform TLC and record in locomotive log book. (यदि कैब-2 से गाड़ी चला रहे हों और वही मैसेज दोबारा आता है तो कैब बदलकर कैब-1 से सेक्शन क्लियर करें। TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "3. Read DDS messages to identify which RIOM extension requires replacement. (DDS के मैसेज पढ़ें और कौन सा RIOM एक्सटेंशन बदलना है पता लगाएं।)"
    ]
  },
  {
    id: "F1404P1-MEDHA",
    subSystem: "SS14",
    message: "START RUN INTERLOCK\nSimultaneous Motoring & Braking command\nfrom Throttle of CAB-2",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Safety interlock active due to simultaneous motoring & braking commands from Cab-2 throttle; normal operation inhibited (कैब-2 थ्रोटल सुरक्षा इंटरलॉक सक्रिय, सामान्य परिचालन बाधित)",
    actions: [
      "1. Bring throttle to \"0\". (थ्रोटल को \"0\" पर लाएं।)",
      "1. Switch OFF and ON control electronics. (MCE OFF/ON). If same message repeats, change cab and clear section. Inform TLC and record in log book. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ तथा ऑन करें (MCE OFF/ON)। यदि वही मैसेज दोबारा आता है तो कैब बदलकर सेक्शन क्लियर करें। TLC को सूचित करें तथा लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1401P2",
    subSystem: "SS14",
    message: "Disturbance in Processor\nVCU2-DIP1\n(MEDHA IGBT Loco)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "VCU2-DIP1 डिस्टर्बेंस। सामान्य ऑपरेशन चालू रहेगा किंतु CSC कैब-2 से कार्य नहीं करेगा, PVEF कैब-2 से कार्य नहीं करेगा और MCB 47.1/2, 54.1/2 व 59.1/2 ट्रिप का पता नहीं चलेगा।",
    actions: [
      "1. Record in log book Continue normal operation. (फ़ॉल्ट को लॉग बुक में दर्ज करें तथा सामान्य ऑपरेशन चालू रखें।)",
      "Following functions will not be available:- (निम्न कार्य नहीं होंगे:-)",
      "• CSC will not work from Cab-2. (CSC कैब-2 से कार्य नहीं करेगा।)",
      "• PVEF will not work from Cab-2. (PVEF कैब-2 से कार्य नहीं करेगा।)",
      "• Tripping of MCBs 47.1/2, 54.1/2 and 59.1/2 will not be detected. (MCB 47.1/2, 54.1/2 और 59.1/2 ट्रिप होने का पता नहीं चलेगा।)"
    ]
  },
  {
    id: "F1402P2",
    subSystem: "SS14",
    message: "Disturbance in Processor\nVCU2-DIP2\n(MEDHA IGBT Loco)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "VCU2-DIP2 डिस्टर्बेंस। सामान्य ऑपरेशन चालू रहेगा किंतु MCB 53.1/2, 55.1/2 और 56.1/2 ट्रिप होने का पता नहीं चलेगा।",
    actions: [
      "1. Record in log book Continue normal operation. (फ़ॉल्ट को लॉग बुक में दर्ज करें तथा सामान्य ऑपरेशन चालू रखें।)",
      "Following functions will not be available:- (निम्न कार्य नहीं होंगे:-)",
      "• Tripping of MCBs 53.1/2, 55.1/2 and 56.1/2 will not be detected. (MCB 53.1/2, 55.1/2 और 56.1/2 ट्रिप होने का पता नहीं चलेगा।)"
    ]
  },
  {
    id: "F1403P2",
    subSystem: "SS14",
    message: "Disturbance in Processor\nVCU2-DIP3\n(MEDHA IGBT Loco)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "VCU2-DIP3 डिस्टर्बेंस। सामान्य ऑपरेशन चालू रहेगा किंतु स्मोक वार्निंग डिटेक्ट नहीं होगी और MCB 62.1/2 व 63.1/2 ट्रिप होने का पता नहीं चलेगा।",
    actions: [
      "1. Record in log book Continue normal operation. (फ़ॉल्ट को लॉग बुक में दर्ज करें तथा सामान्य ऑपरेशन चालू रखें।)",
      "Following functions will not be available:- (निम्न कार्य नहीं होंगे:-)",
      "• Smoke warning will not be detected. (स्मोक वार्निंग डिटेक्ट नहीं होगी।)",
      "• Tripping of MCBs 62.1/2 and 63.1/2 will not be detected. (MCB 62.1/2 और 63.1/2 ट्रिप होने का पता नहीं चलेगा।)"
    ]
  },
  {
    id: "F1404P2",
    subSystem: "SS14",
    message: "Disturbance in Processor\nVCU2-DIP4\n(MEDHA IGBT Loco)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "VCU2-DIP4 डिस्टर्बेंस। सामान्य ऑपरेशन पर कोई प्रतिकूल प्रभाव नहीं।",
    actions: [
      "1. Record in log book Continue normal operation. (फ़ॉल्ट को लॉग बुक में दर्ज करें तथा सामान्य ऑपरेशन चालू रखें।)"
    ]
  },
  {
    id: "F1405P2",
    subSystem: "SS14",
    message: "Disturbance in Processor\nVCU2-DOP1\n(MEDHA IGBT Loco)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "VCU2-DOP1 डिस्टर्बेंस। लैम्प इंडिकेशन काम नहीं करेंगे (TFT पर देखें); पैंटो-2 रेज़ नहीं होगा (स्विच 85 को I पर रखकर पैंटो-1 उठाएं)।",
    actions: [
      "1. Record in log book Continue normal operation. (फ़ॉल्ट को लॉग बुक में दर्ज करें तथा सामान्य ऑपरेशन चालू रखें।)",
      "2. If driving from Cab-2, lower pantograph using ZPT, set Panto Selector Switch (85) to \"I\", raise pantograph using ZPT, ensure Panto-1 is raised, and continue normal operation. (यदि कैब-2 से गाड़ी चला रहे हों तो ZPT को डाउन पोजीशन पर करके पैंटो सिलेक्टर स्विच (85) को \"I\" पर रखकर ZPT को अप पोजीशन पर करें और पैंटो-1 का रेज़ होना सुनिश्चित करें और सामान्य ऑपरेशन चालू रखें।)",
      "Following functions will not be available:- (निम्न कार्य नहीं होंगे:-)",
      "• Lamp indications will not work (lamps can be viewed on TFT display unit). (लैम्प इंडिकेशन कार्य नहीं करेंगे (लैम्प इंडिकेशन TFT डिस्प्ले यूनिट पर देखे जा सकते हैं)।)",
      "• Panto-2 will not raise. (पैंटो-2 रेज़ नहीं होगा।)"
    ]
  },
  {
    id: "F1406P2",
    subSystem: "SS14",
    message: "Disturbance in Processor\nVCU2-DOP2\n(MEDHA IGBT Loco)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "VCU2-DOP2 डिस्टर्बेंस। पैंटो-1 रेज़ नहीं होगा (कैब-1 से चलाने पर स्विच 85 को II पर रखकर पैंटो-2 उठाएं); सैंडिंग वाल्व कार्य नहीं करेंगे।",
    actions: [
      "1. Record in log book. (फ़ॉल्ट को लॉग बुक में दर्ज करें।)",
      "2. If driving from Cab-1, lower pantograph using ZPT, set Panto Selector Switch (85) to \"II\", raise pantograph using ZPT, ensure Panto-2 is raised, and continue normal operation. (यदि कैब-1 से गाड़ी चला रहे हों तो ZPT को डाउन पोजीशन पर करके पैंटो सिलेक्टर स्विच (85) को \"II\" पर रखकर ZPT को अप पोजीशन पर करें और पैंटो-2 का रेज़ होना सुनिश्चित करें और सामान्य ऑपरेशन चालू रखें।)",
      "Following functions will not be available:- (निम्न कार्य नहीं होंगे:-)",
      "• Panto-1 will not raise. (पैंटो-1 रेज़ नहीं होगा।)",
      "• Sanding valves will not work. (सैंडिंग वाल्व कार्य नहीं करेंगे।)"
    ]
  },
  {
    id: "F1407P2",
    subSystem: "SS14",
    message: "Disturbance in Processor\nVCU2-DOP3\n(MEDHA IGBT Loco)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "VCU2-DOP3 डिस्टर्बेंस। सामान्य ऑपरेशन पर कोई प्रतिकूल प्रभाव नहीं।",
    actions: [
      "1. Record in log book Continue normal operation. (फ़ॉल्ट को लॉग बुक में दर्ज करें तथा सामान्य ऑपरेशन चालू रखें।)"
    ]
  },
  {
    id: "F1501P1",
    subSystem: "SS15",
    message: "FIRE IN MACHINE ROOM\nExtinguish the fire\nReset the fire detection unit",
    lamp: "LSFI will flicker, BPFA will glow, buzzer will sound (LSFI ब्लिंक करेगी, BPFA प्रकाशित होगा, बजर बजेगा)",
    effect: "TE/BE will become '0' (TE/BE '0' हो जायेगा)",
    actions: [
      "Bring throttle to \"0\" Open VCB, Switch OFF control electronics. (थ्रोटल को \"0\" पर लाएं और गाडी तुरन्त खडी करें। VCB ओपन करें, पेन्टो लोअर करें तथा कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करें।)",
      "2. Carefully inspect machine room. If fire or smoke is present, trip MCB 112.1 in SB-2 and extinguish fire using small fire extinguisher. (सावधानी पूर्वक मशीन रूम की जाँच करें। यदि आग/धुँआ है, MCB 112.1 (SB-2) को ट्रिप करें और छोटे अग्निशामक यंत्र से आग बुझाएं।)",
      "If fire is intense, especially in traction converter, operate CO-2 fire extinguisher regulator behind ALP seat in each cab and open cock. Keep machine room doors closed. (यदि आग ज्यादा है विशेषतः ट्रैक्शन कनवर्टर में है तो प्रत्येक कैब में सहायक लोको पायलट के पीछे लगे CO-2 टाइप अग्निशामक यंत्र के रेगुलेटर को ऑपरेट करें, कॉक को खोलें। मशीन रूम का दरवाजा बंद रखें।)",
      "3. Press reset push button on Fire Detection Unit in SB-2 panel to reset. Then acknowledge fault by pressing BPFA. (इसके बाद SB-2 पैनल पर लगे फायर डिटेक्शन यूनिट पर लगे रिसेट पुश बटन को प्रेस करके रिसेट करें। फिर BPFA द्वारा फॉल्ट एक्नॉलेज करें।)",
      "4. If everything is found normal, resume normal traction. Inform TLC and record in locomotive log book. (यदि सभी कुछ सामान्य मिलता है, सामान्यतौर पर ट्रैक्शन चालू करें। TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1501P2",
    subSystem: "SS15",
    message: "FAULT IN FIRE DETECTION UNIT\nNo fire detection, Possible normal operation can continue",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Defect in Fire Detection Unit (FDU); auto fire detection will not work but normal train operation can continue (FDU में खराबी, स्वतः आग संसूचन काम नहीं करेगा किंतु सामान्य परिचालन जारी रखा जा सकता है)",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को \"0\" पर लाएं। BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "2. Resume normal traction. (सामान्य ट्रैक्शन चालू करें।)",
      "3. Check machine room repeatedly for fire or smoke. (मशीन रूम को बार-बार आग या धुएं के लिए चेक करें।)",
      "4. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1502P2",
    subSystem: "SS15",
    message: "WARNING SMOKE IN MACHINE ROOM\nInspect machine room\n(मशीन रूम में धुआं)",
    lamp: "LSFI will flicker, BPFA will glow, buzzer will sound (LSFI ब्लिंक करेगी, BPFA प्रकाशित होगा, बजर बजेगा)",
    effect: "TE/BE will become '0' (TE/BE '0' हो जायेगा)",
    actions: [
      "1. Bring throttle to \"0\" Stop the train immediately Open VCB, Lower pantograph Switch OFF control electronics. (थ्रोटल को \"0\" पर लाएं और गाड़ी तुरंत खड़ी करें। VCB ओपन करें, पैंटो लोअर करें तथा कंट्रोल इलेक्ट्रॉनिक्स को ऑफ़ करें।)",
      "2. Carefully inspect machine room. If fire or smoke is present, trip MCB 112.1 in SB-2 and extinguish fire using small fire extinguisher. (सावधानी पूर्वक मशीन रूम की जांच करें। यदि आग/धुआं है, MCB 112.1 (SB-2) को ट्रिप करें और छोटे अग्निशामक यंत्र से आग बुझाएं।)",
      "3. If fire is intense, especially in traction converter, operate CO-2 fire extinguisher regulator behind ALP seat in each cab and open cock. Keep machine room doors closed. (यदि आग ज्यादा है विशेषतः ट्रैक्शन कनवर्टर में है तो प्रत्येक कैब में सहायक लोको पायलट के पीछे लगे CO-2 टाइप अग्निशामक यंत्र के रेगुलेटर को ऑपरेट करें, कॉक को खोलें। मशीन रूम का दरवाजा बंद रखें।)",
      "4. If everything is found normal, resume normal traction. (यदि सभी कुछ सामान्य मिलता है, सामान्य तौर पर ट्रैक्शन चालू करें।)",
      "5. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1601P1",
    subSystem: "SS16",
    message: "SPEED LIMIT EXCEEDED\nEmergency brakes\nTE/BE Throttle to 0\n(स्पीड लिमिट पार / स्पीडोमीटर)",
    lamp: "BPFA will glow, LSFI will flicker, buzzer will sound (BPFA प्रकाशित होगा, LSFI ब्लिंक करेगी, बजर बजेगा)",
    effect: "Emergency brakes applied, TE/BE will become '0' (इमरजेंसी ब्रेक लग जाएंगे, TE/BE '0' हो जायेगा)",
    actions: [
      "1. Bring throttle to \"0\". (लोको की गति कम करने के लिए थ्रोटल को \"0\" पर लाएं।)",
      "2. Press BPFA to acknowledge fault. (BPFA दबाकर फ़ॉल्ट ACK करें।)",
      "3. As soon as speed comes within speed limit, resume normal traction. (जैसे ही गति सीमा के अंदर आ जाती है, तो सामान्य ट्रैक्शन चालू करें।)",
      "4. If speedometer does not show speed within limit but actual speed has reduced, speedometer is defective: Trip speedometer MCB 127.92 in SB-2 to isolate speedometer. (यदि स्पीडोमीटर में गति सीमा के अंदर नहीं आ रही है, परंतु वास्तविक गति कम हो गई है तो SB-2 में MCB 127.92 को ट्रिप करें।)",
      "5. Speedometer is now isolated; operate train carefully and observe speed in Simulation Mode. (अब स्पीडोमीटर आइसोलेट हो गया है इसलिए गाड़ी सावधानीपूर्वक चलाएं तथा सिमुलेशन मोड (Simulation Mode) में गति को देखें।)",
      "6. Inform TLC and act according to instructions; record in locomotive log book. (TLC को सूचित करें और आदेशानुसार कार्य करें, लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1601P2",
    subSystem: "SS16",
    message: "FAULT IN SPEEDOMETER\nNo display of speed in the cab\nDrive carefully, use diagn screen\n(स्पीडोमीटर में ख़राबी / गति का कोई प्रदर्शन नहीं)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "No display of speed on cab speedometer (कैब में स्पीडोमीटर पर गति प्रदर्शित नहीं होगी)",
    actions: [
      "1. Bring throttle to \"0\". (थ्रोटल को \"0\" पर लाएं।)",
      "2. Check speedometer MCB 127.92 in SB-2; if tripped, reset once. Press BPFA to acknowledge fault; if loco normalizes, resume normal operation. (SB-2 में लगे स्पीडोमीटर के MCB 127.92 को चेक करें। यदि ट्रिप हो तो उसे एक बार रीसेट करें, BPFA दबाकर फ़ॉल्ट ACK करें और सामान्य ऑपरेशन चालू करें।)",
      "3. If fault persists, trip MCB 127.92 in SB-2 to isolate speedometer. (यदि फ़ॉल्ट बना रहता है तो SB-2 में लगे MCB 127.92 को ट्रिप करके स्पीडोमीटर को आइसोलेट करें।)",
      "4. Speedometer is now isolated; operate train carefully and observe speed in Simulation Mode. (अब स्पीडोमीटर आइसोलेट हो जायेगा। इसलिए सावधानीपूर्वक गाड़ी चलाएं तथा सिमुलेशन मोड (Simulation Mode) में गति को देखें।)",
      "5. Inform TLC and record in locomotive log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "6. TLC Resume normal traction. (TLC के आदेशानुसार सामान्य ट्रैक्शन चालू करें।)"
    ]
  },
  {
    id: "F1701P1",
    subSystem: "SS17",
    message: "DISTURBANCE IN PROCESSOR FLG1\nFLG1 will be isolated\n(प्रोसेसर FLG1 में व्यवधान / FLG1 आइसोलेट होगा)\n\n[स्क्रीन 2: FLG1 ISOLATED - Refer to driver’s manual]",
    lamp: "BPFA will glow, LSFI will flicker (BPFA प्रकाशित होगा, LSFI ब्लिंक करेगी)",
    effect: "FLG1 आइसोलेट होगा; मल्टीपल ऑपरेशन संभव नहीं होगा; कैब-1 से कार्य करने पर एंगल ट्रांसमीटर और बोगी मीटर कार्य नहीं करेंगे (TE/BE ऑटोमैटिक ऑक्सिलरी कॉन्टैक्ट मोड में बदलेगा)",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को ‘0’ पर लाएं। BPFA दबाकर फॉल्ट ACK करें।)",
      "2. Switch OFF control electronics once and turn it ON again. (कंट्रोल इलेक्ट्रॉनिक्स को एक बार ऑफ कर उसे ऑन करें।)",
      "3. Resume normal traction. (सामान्य ट्रैक्शन चालू करें।)",
      "4. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "5. DDU \"FLG1 ISOLATED - Refer to driver’s manual\". (यदि DDU पर \"FLG1 ISOLATED - Refer to driver’s manual\" संदेश आए तो:-)",
      "6. Multiple operation will not be possible. (मल्टीपल ऑपरेशन संभव नहीं होगा।)",
      "7. Resume normal traction. (सामान्य ट्रैक्शन चालू करें।)",
      "8. If working from Cab-1, Cab-1 angle transmitter and bogie meter will not work. TE/BE control will automatically switch to auxiliary contact mode. (यदि कैब-1 से कार्य कर रहे हों तो कैब-1 के एंगल ट्रांसमीटर और बोगी मीटर कार्य नहीं करेंगे। TE/BE का कंट्रोल अपने आप बदलकर ऑक्सिलरी कॉन्टैक्ट मोड में आ जाएगा।)",
      "9. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1701P1-ISO",
    subSystem: "SS17",
    message: "FLG1 ISOLATED\nRefer to driver’s manual\nPress <Enter>\n(FLG1 आइसोलेटेड / ड्राइवर मैनुअल देखें)",
    lamp: "BPFA will glow, LSFI will flicker (BPFA प्रकाशित होगा, LSFI ब्लिंक करेगी)",
    effect: "FLG1 आइसोलेट; मल्टीपल ऑपरेशन संभव नहीं होगा; Cab-1 एंगल ट्रांसमीटर व बोगी मीटर बंद, TE/BE ऑक्सिलरी कॉन्टैक्ट मोड में सक्रिय",
    actions: [
      "1. Multiple operation will not be possible. (मल्टीपल ऑपरेशन संभव नहीं होगा।)",
      "2. Resume normal traction. (सामान्य ट्रैक्शन चालू करें।)",
      "3. If working from Cab-1, Cab-1 angle transmitter and bogie meter will not work. TE/BE control will automatically switch to auxiliary contact mode. (यदि कैब-1 से कार्य कर रहे हों तो कैब-1 के एंगल ट्रांसमीटर और बोगी मीटर कार्य नहीं करेंगे। TE/BE का कंट्रोल अपने आप बदलकर ऑक्सिलरी कॉन्टैक्ट मोड में आ जाएगा।)",
      "4. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1701P1-BHEL",
    subSystem: "SS17",
    message: "DISTURBANCE IN PROCESSOR ICP-1\nICP1 will be isolated\n(BHEL TCN & IGBT Make)\nLoco xx SS17:processor ICP1\n[स्क्रीन 2: ICP-1 ISOLATED - Refer to driver’s manual]",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "BHEL TCN मेक लोको में ICP-1 डिस्टर्बेंस। ICP-1 आइसोलेट होगा। सिंगल लोको में सामान्य ट्रैक्शन चालू रहेगा; मल्टीपल ऑपरेशन (MU working) संभव नहीं होगा। (TCN व IGBT के SR वाले BHEL लोको में SS13, SS14, SS17 व SS18 के अतिरिक्त अन्य सभी सब-सिस्टम की ट्रबलशूटिंग MICAS GTO के समान है)",
    actions: [
      "1. Resume normal traction. (सामान्य तौर पर ट्रैक्शन चालू करें।)",
      "2. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "--------------------------------------------------",
      "【Screen 2 (Press ENTER) - स्क्रीन 2 (ENTER दबाने पर)】:",
      "1. Multiple operation will not be possible. (मल्टीपल ऑपरेशन संभव नहीं होगा।)",
      "2. Resume normal traction. (सामान्य तौर पर ट्रैक्शन चालू करें।)",
      "3. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1701P1-BHEL-ISO",
    subSystem: "SS17",
    message: "ICP-1 ISOLATED\nRefer to driver’s manual\nPress <Enter>\n(BHEL TCN & IGBT Make)\nLoco xx SS17:processor ICP1",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "ICP-1 आइसोलेट हुआ। मल्टीपल ऑपरेशन (MU working) संभव नहीं होगा। सिंगल लोको में सामान्य ट्रैक्शन निर्बाध चालू रहेगा।",
    actions: [
      "1. Multiple operation will not be possible. (मल्टीपल ऑपरेशन संभव नहीं होगा।)",
      "2. Resume normal traction. (सामान्य तौर पर ट्रैक्शन चालू करें।)",
      "3. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1701P1-MEDHA",
    subSystem: "SS17",
    message: "DISTURBANCE IN PROCESSOR MCC1\nMCC1 will be isolated\n(MEDHA IGBT Make)\nSS17 F1701P1 Loco xxSS17:processor MCC1",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "MEDHA IGBT मेक लोको में MCC1 प्रोसेसर में व्यवधान। MCC1 आइसोलेट होगा। (नोट: अतिरिक्त/विविध फ़ॉल्ट मैसेज IGBT वाले MEDHA मेक के लोको में SS13, SS14, SS17 और SS18 सब सिस्टम के अलावा अन्य सभी सब सिस्टम के लिए ट्रबल शूटिंग MICAS GTO वाले लोको के समान है)",
    actions: [
      "1. Switch OFF control electronics and turn it ON again. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ कर उसे ऑन करें।)",
      "2. Resume normal traction. (सामान्य तौर पर ट्रैक्शन चालू करें।)",
      "3. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1701P1-MEDHA-ISO",
    subSystem: "SS17",
    message: "MCC-1 ISOLATED\nRefer to driver’s manual\nPress <Enter>\n(MEDHA IGBT Make)\nLoco xxSS17:processor MCC1",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "MCC-1 आइसोलेटेड। यदि कैब-1 से गाड़ी चला रहे हों तो VCB ओपन करके SB-1 पैनल पर लगे स्विच नं. 152 को ‘0’ से ‘1’ पर रखकर लोको को फेल्योर मोड में चलाएं। केवल कैब-1 से फेल्योर मोड ऑपरेशन संभव, कैब-1 में TE/BE मीटर कार्य नहीं करेंगे (मान डिस्प्ले पर देखा जा सकता है)।",
    actions: [
      "1. If driving from Cab-1, open VCB, put switch No. 152 on SB-1 panel from \"0\" to \"1\" and operate loco in Failure Mode. (यदि कैब-1 से गाड़ी चला रहे हों तो VCB ओपन करके SB-1 पैनल पर लगे स्विच नं. 152 को ‘ 0 ’ से ‘ 1 ’ पर रखकर लोको को फेल्योर मोड में लाकर चलाएं।)",
      "2. Resume normal traction. (सामान्य तौर पर ट्रैक्शन चालू करें।)",
      "3. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "Note: Failure mode operation is possible only from Cab-1; TE/BE meters in Cab-1 will not work, TE/BE % value can be viewed on display. (नोट: केवल कैब-1 से फेल्योर मोड ऑपरेशन संभव होगा, कैब-1 में TE/BE मीटर कार्य नहीं करेंगे, TE/BE का (%) प्रतिशत मान डिस्प्ले पर देखा जा सकता है।)"
    ]
  },
  {
    id: "F1702P1",
    subSystem: "SS17",
    message: "SOFTWARE MISMATCH\nWAP-5/WAG-9\nPanto will not raise\n(सॉफ्टवेयर मिसमैच / पैंटो नहीं उठेगा)",
    lamp: "BPFA will glow, LSFI will flicker (BPFA प्रकाशित होगा, LSFI ब्लिंक करेगी)",
    effect: "Pantograph will not raise, locomotive is inactive/dead (पैंटोग्राफ नहीं उठेगा, लोको निष्क्रिय/डेड)",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को ‘0’ पर लाएं। BPFA दबाकर फॉल्ट ACK करें।)",
      "2. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "3. Demand relief engine immediately. (तुरंत सहायता इंजन की मांग करें।)"
    ]
  },
  {
    id: "F1703P1",
    subSystem: "SS17",
    message: "FAULT IN ANGLE TRANSMITTER OF THROTTLE\nBring TE/BE Throttle to zero\nOperate switch failure mode\n(थ्रोटल के एंगल ट्रांसमीटर में खराबी / स्विच 152 फेल्योर मोड)",
    lamp: "BPFA will glow, LSFI will flicker (BPFA प्रकाशित होगा, LSFI ब्लिंक करेगी)",
    effect: "Throttle angle transmitter failed; TE/BE will not work in normal mode; operate via auxiliary contacts by placing switch 152 on SB-1 to \"1\" (Failure Mode) (थ्रोटल एंगल ट्रांसमीटर फेल; स्विच 152 को फेल्योर मोड में रखने पर कार्य करेगा)",
    actions: [
      "1. Bring throttle to \"0\". (थ्रोटल को ‘ 0 ’ पर लाएं।)",
      "2. Press BPFA to acknowledge fault. (BPFA को दबाकर फ़ॉल्ट को एक्नॉलेज (ACK) करें।)",
      "3. Open VCB, set switch 152 on SB-1 from \"0\" to \"1\" and operate loco in Failure Mode. (VCB ओपन करके SB-1 पैनल पर लगे स्विच नं. 152 को ‘ 0 ’ से ‘ 1 ’ पर रखकर लोको को फेल्योर मोड (Failure Mode) में लाकर चलाएं।)",
      "4. If not successful: VCB Operate switch 152 on SB-1 panel 2 to 3 times (If not successful, open VCB again and operate switch 152 (SB-1) 2-3 times). (यदि सफलता नहीं मिलती है तो फिर से VCB ओपन करके स्विच 152 (SB-1) को 2-3 बार ऑपरेट करें। (If not successful, open VCB again and operate switch 152 (SB-1) 2-3 times).)",
      "5. Switch OFF control electronics once and turn it ON again. (कंट्रोल इलेक्ट्रॉनिक्स को एक बार ऑफ कर उसे ऑन करें।)",
      "6. Try from the rear cab. (पिछली कैब से प्रयत्न करें।)",
      "7. If no success, inform TLC and record in log book. (यदि सफलता न मिले तो TLC को बताएं तथा लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1704P1",
    subSystem: "SS17",
    message: "SIMULATION SWITCH POSITION NOT MATCHING\nCheck simulation Key on master / slave\n(सिमुलेशन स्विच पोजीशन मिसमैच / स्विच 179 चेक करें)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Simulation switch 179 position not normal; traction will be inhibited if master/slave simulation switches mismatch (सिमुलेशन स्विच 179 पोजीशन सामान्य नहीं; मिसमैच होने पर ट्रैक्शन बाधित रहेगा)",
    actions: [
      "1. Bring throttle to \"0\". (थ्रोटल को ‘ 0 ’ पर लाएं।)",
      "2. Switch OFF control electronics. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ (MCE OFF) करें।)",
      "3. Ensure simulation key switch 179 on SB-1 is in \"0\" position. If not, bring it from \"1\" to \"0\". (SB-1 पैनल पर लगी सिमुलेशन चाबी (स्विच 179) का ‘ 0 ’ पर होना सुनिश्चित करें। यदि नहीं है तो ‘ 1 ’ से ‘ 0 ’ पोजीशन पर लाएं।)",
      "4. Turn ON control electronics, press BPFA to acknowledge fault, and resume normal traction. (कंट्रोल इलेक्ट्रॉनिक्स को ऑन करें, BPFA दबाकर फॉल्ट ACK करें और सामान्य ट्रैक्शन चालू करें।)",
      "5. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1701P2",
    subSystem: "SS17",
    message: "DISTURBANCE IN PROCESSOR DIA 1\nDIA 1 will be isolated\nNo fault data will be stored\nPress <Enter>\n(प्रोसेसर DIA 1 में व्यवधान / DDS में फॉल्ट स्टोर नहीं होगा)",
    lamp: "BPFA will glow, LSFI will flicker (BPFA प्रकाशित होगा, LSFI ब्लिंक करेगी)",
    effect: "DIA 1 आइसोलेट होगा; DDS में कोई नया फ़ॉल्ट डाटा स्टोर नहीं होगा; सामान्य ट्रैक्शन चालू रखा जा सकता है",
    actions: [
      "1. No fault data will be stored in DDS, hence record all upcoming faults in the loco log book. (DDS में कोई फ़ॉल्ट स्टोर नहीं होगा इसलिए सभी फ़ॉल्ट को लोको लॉग बुक में अनिवार्य रूप से दर्ज करें।)",
      "2. Press BPFA to acknowledge fault. Resume normal traction. (BPFA को दबाकर फ़ॉल्ट को एक्नॉलेज (ACK) करें। सामान्य ट्रैक्शन चालू करें।)",
      "3. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1701P2-MEDHA",
    subSystem: "SS17",
    message: "DISTURBANCE IN PROCESSOR DMC1\nDMC 1 will be isolated\nNo fault data will be stored in DMC 1\nPress<Enter>\n(MEDHA IGBT Make)\nSS17 F1701P2 Loco XX SS17: Processor MCC1",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "MEDHA IGBT मेक लोको में DMC1 (Diagnostic & Memory Controller 1) प्रोसेसर आइसोलेट होगा; DMC-1 में कोई नया फ़ॉल्ट डाटा स्टोर नहीं होगा; सामान्य ट्रैक्शन निर्बाध चालू रखा जा सकता है।",
    actions: [
      "1. Resume normal traction. (सामान्य ट्रैक्शन चालू करें।)",
      "2. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1801P1",
    subSystem: "SS18",
    message: "DISTURBANCE IN PROCESSOR FLG2\nFLG2 will be isolated\n(प्रोसेसर FLG2 में व्यवधान / FLG2 आइसोलेट होगा)\n\n[स्क्रीन 2: FLG2 ISOLATED - Refer to driver’s manual]",
    lamp: "BPFA will glow, LSFI will flicker (BPFA प्रकाशित होगा, LSFI ब्लिंक करेगी)",
    effect: "FLG2 आइसोलेट होगा; यदि कैब-2 से कार्य कर रहे हों तो एंगल ट्रांसमीटर और बोगी मीटर कार्य नहीं करेंगे (TE/BE ऑटोमैटिक ऑक्सिलरी कॉन्टैक्ट मोड में बदलेगा); रीजेनेरेटिव ब्रेक उपलब्ध नहीं होगा (न्यूमैटिक ब्रेक A-9/SA-9 से कंट्रोल करें)",
    actions: [
      "【Screen 1 - स्क्रीन 1】:",
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को ‘0’ पर लाएं। BPFA दबाकर फॉल्ट ACK करें।)",
      "2. Switch OFF control electronics once and turn it ON again. (कंट्रोल इलेक्ट्रॉनिक्स को एक बार ऑफ कर उसे ऑन करें।)",
      "3. Resume normal traction. (सामान्य ट्रैक्शन चालू करें।)",
      "4. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "--------------------------------------------------",
      "【Screen 2 (Press ENTER) - स्क्रीन 2 (ENTER दबाने पर)】:",
      "1. If the same message appears again, keep normal traction ON. (यदि वही मैसेज पुनः आता है तो सामान्य ट्रैक्शन चालू रखें।)",
      "2. If working from Cab-2, Cab-2 angle transmitter and bogie meter will not work. TE/BE control will automatically switch to auxiliary contact mode. (यदि कैब-2 से कार्य कर रहे हों तो कैब-2 के एंगल ट्रांसमीटर और बोगी मीटर कार्य नहीं करेंगे। TE/BE का कंट्रोल अपने आप बदलकर ऑक्सिलरी कॉन्टैक्ट मोड में आ जाएगा।)",
      "3. Regenerative brake will not be available. Hence control train/loco by pneumatic brake A-9 / SA-9. Ensure throttle is at \"0\" before applying A-9. (रीजेनेरेटिव ब्रेक उपलब्ध नहीं होगा। अतः गाड़ी/लोको को न्यूमैटिक ब्रेक (A-9 / SA-9) द्वारा कंट्रोल करें। A-9 एप्लाई करने से पहले थ्रोटल का 0 पर होना सुनिश्चित करें।)",
      "4. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1801P1-ISO",
    subSystem: "SS18",
    message: "FLG2 ISOLATED\nRefer to driver’s manual\nPress <Enter>\n(FLG2 आइसोलेटेड / ड्राइवर मैनुअल देखें)",
    lamp: "BPFA will glow, LSFI will flicker (BPFA प्रकाशित होगा, LSFI ब्लिंक करेगी)",
    effect: "FLG2 आइसोलेट; Cab-2 एंगल ट्रांसमीटर व बोगी मीटर बंद, TE/BE ऑक्सिलरी कॉन्टैक्ट मोड में सक्रिय; रीजेनेरेटिव ब्रेक उपलब्ध नहीं होगा (A-9/SA-9 से कंट्रोल करें)",
    actions: [
      "1. If the same message appears again, keep normal traction ON. (यदि वही मैसेज पुनः आता है तो सामान्य ट्रैक्शन चालू रखें।)",
      "2. If working from Cab-2, Cab-2 angle transmitter and bogie meter will not work. TE/BE control will automatically switch to auxiliary contact mode. (यदि कैब-2 से कार्य कर रहे हों तो कैब-2 के एंगल ट्रांसमीटर और बोगी मीटर कार्य नहीं करेंगे। TE/BE का कंट्रोल अपने आप बदलकर ऑक्सिलरी कॉन्टैक्ट मोड में आ जाएगा।)",
      "3. Regenerative brake will not be available. Hence control train/loco by pneumatic brake A-9 / SA-9. Ensure throttle is at \"0\" before applying A-9. (रीजेनेरेटिव ब्रेक उपलब्ध नहीं होगा। अतः गाड़ी/लोको को न्यूमैटिक ब्रेक (A-9 / SA-9) द्वारा कंट्रोल करें। A-9 एप्लाई करने से पहले थ्रोटल का 0 पर होना सुनिश्चित करें।)",
      "4. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1801P1-BHEL",
    subSystem: "SS18",
    message: "DISTURBANCE IN PROCESSOR ICP-2\nICP2 will be isolated\n(BHEL TCN & IGBT Make)\nLoco xx SS18:processor ICP2\n[स्क्रीन 2: ICP-2 ISOLATED - Refer to driver’s manual]",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "BHEL TCN मेक लोको में ICP-2 डिस्टर्बेंस। ICP-2 आइसोलेट होगा। सिंगल लोको में सामान्य ट्रैक्शन चालू रहेगा; मल्टीपल ऑपरेशन (MU working) संभव नहीं होगा।",
    actions: [
      "1. Resume normal traction. (सामान्य तौर पर ट्रैक्शन चालू करें।)",
      "2. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "--------------------------------------------------",
      "【Screen 2 (Press ENTER) - स्क्रीन 2 (ENTER दबाने पर)】:",
      "1. Multiple operation will not be possible. (मल्टीपल ऑपरेशन संभव नहीं होगा।)",
      "2. Resume normal traction. (सामान्य तौर पर ट्रैक्शन चालू करें।)",
      "3. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1801P1-BHEL-ISO",
    subSystem: "SS18",
    message: "ICP-2 ISOLATED\nRefer to driver’s manual\nPress <Enter>\n(BHEL TCN & IGBT Make)\nLoco xx SS18:processor ICP2",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "ICP-2 आइसोलेट हुआ। मल्टीपल ऑपरेशन (MU working) संभव नहीं होगा। सिंगल लोको में सामान्य ट्रैक्शन निर्बाध चालू रहेगा।",
    actions: [
      "1. Multiple operation will not be possible. (मल्टीपल ऑपरेशन संभव नहीं होगा।)",
      "2. Resume normal traction. (सामान्य तौर पर ट्रैक्शन चालू करें।)",
      "3. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1801P1-MEDHA",
    subSystem: "SS18",
    message: "DISTURBANCE IN PROCESSOR MCC2\nMCC2 will be isolated\n(MEDHA IGBT Make)\nSS18 F1801P1 Loco xxSS18:processor MCC2",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "MEDHA IGBT मेक लोको में MCC2 प्रोसेसर में व्यवधान। MCC2 आइसोलेट होगा। (नोट: अतिरिक्त/विविध फ़ॉल्ट मैसेज IGBT वाले MEDHA मेक के लोको में SS13, SS14, SS17 और SS18 सब सिस्टम के अलावा अन्य सभी सब सिस्टम के लिए ट्रबल शूटिंग MICAS GTO वाले लोको के समान है)",
    actions: [
      "1. Switch OFF control electronics and turn it ON again. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ कर उसे ऑन करें।)",
      "2. Resume normal traction. (सामान्य तौर पर ट्रैक्शन चालू करें।)",
      "3. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1801P1-MEDHA-ISO",
    subSystem: "SS18",
    message: "MCC-2 ISOLATED\nRefer to driver’s manual\nPress <Enter>\n(MEDHA IGBT Make)\nLoco xxSS18:processor MCC2",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "MCC-2 आइसोलेटेड। यदि कैब-2 से गाड़ी चला रहे हों तो VCB ओपन करके SB-1 पैनल पर लगे स्विच नं. 152 को ‘0’ से ‘1’ पर रखकर लोको को फेल्योर मोड में चलाएं। केवल कैब-2 से फेल्योर मोड ऑपरेशन संभव, कैब-2 में TE/BE मीटर कार्य नहीं करेंगे; रीजेनेरेटिव ब्रेक उपलब्ध नहीं होगा (न्यूमैटिक ब्रेक A-9/SA-9 से कंट्रोल करें)।",
    actions: [
      "1. If the same message repeats, and driving from Cab-2, open VCB, put switch No. 152 on SB-1 panel from \"0\" to \"1\" and operate loco in Failure Mode. (यदि वही मैसेज दोबारा आता है, यदि कैब-2 से गाड़ी चला रहे हों तो VCB ओपन करके SB-1 पैनल पर लगे स्विच नं. 152 को ‘ 0 ’ से ‘ 1 ’ पर रखकर लोको को फेल्योर मोड में लाकर चलाएं।)",
      "2. Resume normal traction. (सामान्य तौर पर ट्रैक्शन चालू करें।)",
      "3. Regenerative brake will not be available. Hence control train/loco by pneumatic brake A-9 / SA-9. Ensure throttle is at \"0\" before applying A-9. (रीजेनेरेटिव ब्रेक उपलब्ध नहीं होगा। अतः गाड़ी/लोको को न्यूमैटिक ब्रेक (A-9 / SA-9) द्वारा कंट्रोल करें। A-9 एप्लाई करने से पहले थ्रोटल का 0 पर होना सुनिश्चित करें।)",
      "4. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "Note: Failure mode operation is possible only from Cab-2; TE/BE meters in Cab-2 will not work, TE/BE % value can be viewed on display. (नोट: केवल कैब-2 से फेल्योर मोड ऑपरेशन संभव होगा, कैब-2 में TE/BE मीटर कार्य नहीं करेंगे, TE/BE का (%) प्रतिशत मान डिस्प्ले पर देखा जा सकता है।)"
    ]
  },
  {
    id: "F1802P1",
    subSystem: "SS18",
    message: "SOFTWARE MISMATCH\nWAP-5/WAG-9\nPanto will not raise\n(सॉफ्टवेयर मिसमैच / पैंटो नहीं उठेगा)",
    lamp: "BPFA will glow, LSFI will flicker (BPFA प्रकाशित होगा, LSFI ब्लिंक करेगी)",
    effect: "Pantograph will not raise, locomotive is inactive/dead (पैंटोग्राफ नहीं उठेगा, लोको निष्क्रिय/डेड)",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को ‘0’ पर लाएं। BPFA दबाकर फॉल्ट ACK करें।)",
      "2. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "3. Demand relief engine immediately. (तुरंत सहायता इंजन की मांग करें।)"
    ]
  },
  {
    id: "F1803P1",
    subSystem: "SS18",
    message: "FAULT IN ANGLE TRANSMITTER OF THROTTLE\nBring TE/BE Throttle to zero\nOperate switch failure mode\n(FLG2 / कैब-2: थ्रोटल एंगल ट्रांसमीटर में खराबी / स्विच 152)",
    lamp: "BPFA will glow, LSFI will flicker (BPFA प्रकाशित होगा, LSFI ब्लिंक करेगी)",
    effect: "Cab-2 throttle angle transmitter failed; TE/BE will not work in normal mode; operate via switch 152 in Failure Mode on SB-1 (कैब-2 थ्रोटल एंगल ट्रांसमीटर फेल; स्विच 152 को फेल्योर मोड पर रखने पर कार्य करेगा)",
    actions: [
      "1. Bring throttle to \"0\". (थ्रोटल को ‘ 0 ’ पर लाएं।)",
      "2. Press BPFA to acknowledge fault. (BPFA को दबाकर फ़ॉल्ट को एक्नॉलेज (ACK) करें।)",
      "3. Open VCB, set switch 152 on SB-1 from \"0\" to \"1\" to enter Failure Mode. (VCB ओपन करके SB-1 पैनल पर लगे स्विच नं. 152 को ‘ 0 ’ से ‘ 1 ’ पर रखकर लोको को फेल्योर मोड (Failure Mode) में लाएं।)",
      "4. Keep switch 152 in failure mode and resume normal traction. (स्विच नं. 152 को फेल्योर मोड में रखकर सामान्य ट्रैक्शन चालू करें।)",
      "5. If not successful, open VCB again and operate switch 152 on SB-1 2-3 times. (यदि सफलता नहीं मिलती है तो फिर से VCB ओपन करके स्विच 152 (SB-1) को 2-3 बार ऑपरेट करें।)",
      "6. Switch OFF control electronics once and turn it ON again. (कंट्रोल इलेक्ट्रॉनिक्स को एक बार ऑफ कर उसे ऑन करें।)",
      "7. Try from the rear cab - Cab-1. (पिछली कैब (कैब-1) से प्रयत्न करें।)",
      "8. If no success, inform TLC and record in log book. (यदि सफलता न मिले तो TLC को बताएं तथा लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1804P1",
    subSystem: "SS18",
    message: "SIMULATION SWITCH POSITION NOT MATCHING\nCheck simulation Key on master / slave\n(FLG2: सिमुलेशन स्विच पोजीशन मिसमैच / स्विच 179 चेक करें)",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "Simulation switch 179 position not normal; traction will be inhibited if master/slave simulation switches mismatch (सिमुलेशन स्विच 179 पोजीशन सामान्य नहीं; मिसमैच होने पर ट्रैक्शन बाधित रहेगा)",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को ‘ 0 ’ पर लाएं। BPFA को दबाकर फ़ॉल्ट को एक्नॉलेज (ACK) करें।)",
      "2. Switch OFF control electronics. (कंट्रोल इलेक्ट्रॉनिक्स को ऑफ (MCE OFF) करें।)",
      "3. Ensure simulation key switch 179 on SB-1 is in \"0\" position. If not, bring it from \"1\" to \"0\". (SB-1 पैनल पर लगी सिमुलेशन चाबी (स्विच 179) का ‘ 0 ’ पर होना सुनिश्चित करें। यदि नहीं है तो ‘ 1 ’ से ‘ 0 ’ पर लाएं।)",
      "4. Turn ON control electronics. Resume normal traction. (कंट्रोल इलेक्ट्रॉनिक्स को ऑन करें। सामान्य ट्रैक्शन चालू करें।)",
      "5. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1801P2",
    subSystem: "SS18",
    message: "DISTURBANCE IN PROCESSOR DIA 2\nDIA 2 will be isolated\nNo fault data will be stored\nPress <Enter>\n(प्रोसेसर DIA 2 में व्यवधान / DDS में फॉल्ट स्टोर नहीं होगा)",
    lamp: "BPFA will glow, LSFI will flicker (BPFA प्रकाशित होगा, LSFI ब्लिंक करेगी)",
    effect: "DIA 2 आइसोलेट होगा; DDS में कोई नया फ़ॉल्ट डाटा स्टोर नहीं होगा; सामान्य ट्रैक्शन चालू रखा जा सकता है",
    actions: [
      "1. No fault data will be stored in DDS, hence record all upcoming faults in the loco log book. (DDS में कोई फ़ॉल्ट स्टोर नहीं होगा इसलिए सभी फ़ॉल्ट को लोको लॉग बुक में अनिवार्य रूप से दर्ज करें।)",
      "2. Press BPFA to acknowledge fault. Resume normal traction. (BPFA को दबाकर फ़ॉल्ट को एक्नॉलेज (ACK) करें। सामान्य ट्रैक्शन चालू करें।)",
      "3. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1801P2-MEDHA",
    subSystem: "SS18",
    message: "DISTURBANCE IN PROCESSOR DMC2\nDMC 2 will be isolated\nNo fault data will be stored in DMC 2\nPress<Enter>\n(MEDHA IGBT Make)\nSS18 F1801P2 Loco XX SS18: Processor MCC2",
    lamp: "BPFA will glow (BPFA प्रकाशित होगा)",
    effect: "MEDHA IGBT मेक लोको में DMC2 (Diagnostic & Memory Controller 2) प्रोसेसर आइसोलेट होगा; DMC-2 में कोई नया फ़ॉल्ट डाटा स्टोर नहीं होगा; सामान्य ट्रैक्शन निर्बाध चालू रखा जा सकता है।",
    actions: [
      "1. Resume normal traction. (सामान्य ट्रैक्शन चालू करें।)",
      "2. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1901P1",
    subSystem: "SS19",
    message: "COMMUNICATION DISTURBANCE\nTry to close the VCB again\nMultiple operation not possible\nSS19 F1901P1 LocoXXX SS19: Train Bus\n(स्क्रीन 1: कम्युनिकेशन डिस्टर्बेंस / VCB ओपन)",
    lamp: "BPFA will glow, VCB will open (BPFA प्रकाशित होगा, VCB ओपन हो जाएगा)",
    effect: "VCB ओपन हो जाएगा; मल्टीपल ऑपरेशन (MU) बाधित रहेगा",
    actions: [
      "1. Bring throttle to \"0\". Press BPFA to acknowledge fault. (थ्रोटल को ‘ 0 ’ पर लाएं। BPFA को दबाकर फ़ॉल्ट को एक्नॉलेज (ACK) करें।)",
      "2. Press BLDJ to close VCB. (2. VCB क्लोज़ करने के लिए BLDJ प्रेस करें।)",
      "3. Check jumper cable connecting the two locomotives for multiple operation. (मल्टीपल ऑपरेशन के लिए दोनों लोको के बीच लगे UIC जम्पर केबल (Train Bus Jumper Cable) को चेक करें।)",
      "4. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)"
    ]
  },
  {
    id: "F1901P1-ISO",
    subSystem: "SS19",
    message: "TRAIN BUS ISOLATED\nMultiple operation not possible\nLocoXXX SS19: Train Bus\n(स्क्रीन 2: ट्रेन बस आइसोलेटेड / मल्टीपल ऑपरेशन संभव नहीं)",
    lamp: "BPFA will glow, LSFI will glow continuously (BPFA प्रकाशित होगा, LSFI लगातार प्रकाशित रहेगा)",
    effect: "Train bus isolated; multiple operation unavailable; LSFI lamp will glow continuously; trailing loco may need to be made dead (ट्रेन बस आइसोलेट; मल्टीपल ऑपरेशन उपलब्ध नहीं रहेगा; LSFI लैम्प लगातार जलेगी; ट्रेलिंग लोको को डेड बनाना पड़ सकता है)",
    actions: [
      "【Situation 1: If BP pressure also drops and train halts - स्थिति 1: यदि बीपी प्रेशर भी साथ में ड्रॉप होता है और गाड़ी खड़ी हो जाती है】",
      "1. Check slave loco. If loco has shut down, inspect loco and if all normal, turn ON control electronics of slave loco. (स्लेव लोको को चेक करें यदि लोको शट डाउन हो गया है तो लोको की जांच करें और सभी कुछ सामान्य मिलने पर स्लेव लोको की कंट्रोल इलेक्ट्रॉनिक्स को ऑन करें।)",
      "2. Go to master loco, switch OFF control electronics and turn ON, resume normal operation. (मास्टर लोको में जाकर कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करके ऑन करें, सामान्य ऑपरेशन चालू करें।)",
      "3. If the above fault recurs, make the rear locomotive dead. (यदि दोबारा से उपरोक्त दोष आता है तो पीछे वाले लोको को डेड बनाएं।)",
      "--------------------------------------------------",
      "【Situation 2: If BP pressure does not drop - स्थिति 2: यदि बीपी प्रेशर ड्रॉप नहीं होता है】",
      "1. Multiple operation will not be available. (मल्टीपल ऑपरेशन उपलब्ध नहीं रहेगा।)",
      "2. Inform TLC and record in log book. (TLC को सूचित करें और लॉग बुक में दर्ज करें।)",
      "3. Continue normal operation, LSFI will glow continuously. (सामान्य ऑपरेशन चालू रखें, LSFI लगातार प्रकाशित होगा।)",
      "4. Halt train at convenient location, switch OFF and turn ON control electronics of master loco; if successful, resume normal operation. (सुविधाजनक स्थान पर गाड़ी खड़ी करके मास्टर लोको की कंट्रोल इलेक्ट्रॉनिक्स को ऑफ करके ऑन करें, सफलता मिलती है तो सामान्य ऑपरेशन चालू करें।)",
      "5. If the above fault recurs, make the rear locomotive dead. (यदि दोबारा से उपरोक्त दोष आता है तो पीछे वाले लोको को डेड बनाएं।)"
    ]
  },
  {
    id: "HEADLIGHT-FAIL",
    subSystem: "SS13",
    message: "HEADLIGHT FAILURE\nहेडलाइट फ़ेल होने पर\n(MCB 310.1/1 & 310.1/2 / ZPRD / G&SR 4.14)",
    lamp: "Headlight will not glow / will extinguish (हेडलाइट नहीं जलेगी / बुझ जाएगी)",
    effect: "Headlight will not illuminate (हेडलाइट प्रकाशित नहीं होगी)",
    actions: [
      "1. Turn ON dimmer switch ZPRD. (ZPRD डिमर स्विच ON करें।)",
      "2. If dim headlight illuminates, work train normally. (यदि डिम हेडलाइट प्रकाशित होती है तो सामान्य रूप से कार्य करें।)",
      "3. If dimmer also does not illuminate:\n   • If working from Cab-1, check MCB 310.1/1 in SB-1 panel.\n   • If working from Cab-2, check MCB 310.1/2 in SB-2 panel. (यदि डिमर भी प्रकाशित नहीं होती है तो: Cab-1 से वर्किंग में SB-1 की MCB 310.1/1 तथा Cab-2 से वर्किंग में SB-2 की MCB 310.1/2 चेक करें।)",
      "4. If MCB is tripped, open VCB and reset the MCB. (यदि MCB ट्रिप हो तो VCB ओपन करके MCB को रीसेट करें।)",
      "5. If not successful, work train with marker light at speed restriction of 40 km/h as per G & SR 4.14. (यदि सफलता नहीं मिलती है तो मार्कर लाइट (Marker Light) की सहायता से 40 KMPH के गति प्रतिबंध से G & SR 4.14 के अनुसार गाड़ी चलाएं।)"
    ]
  },
  {
    id: "QRSI-1-DROP",
    subSystem: "SS01",
    message: "QRSI-1 ड्रॉप होती है और DJ/VCB ट्रिप होता है\nQRSI-1 DROPS AND DJ/VCB TRIPS\n(सिलिकॉन रेक्टिफायर-1 ओवरकरंट सुरक्षा रिले QRSI-1)",
    lamp: "LSDJ प्रकाशित होगा, रिले पैनल पर QRSI-1 का लाल टारगेट गिरेगा (LSDJ will glow, red target of QRSI-1 drops)",
    effect: "DJ/VCB ट्रिप होगा, बोगी-1 / TM 1-2-3 में पावर कट जाएगी (DJ/VCB will trip, traction cut off in Bogie-1)",
    actions: [
      "• Inspection: Check RSI-1, SL-1, L1, L2 and L3, SJ, J-1, CTF, QD-1, Q-20 and TM1, TM2 and TM3 etc. whether there is any defect in them. (जांच: RSI-1, SL-1, L1, L2 और L3, SJ, J-1, CTF, QD-1, Q-20 और TM1, TM2 और TM3 इत्यादि को चेक करें, उनमें कोई खराबी तो नहीं है।)",
      "a) If any defect is found: Isolate the concerned equipment. ({a} यदि कोई खराबी मिलती है तो - संबंधित उपकरण को आइसोलेट करें।)",
      "b) If no defect is found: Reset relay, close DJ/VCB. Resume traction. ({b} यदि कोई खराबी नहीं मिलती है तो - रिले रीसेट करें, DJ/VCB क्लोज करें। ट्रैक्शन चालू करें।)",
      "• If QRSI-1 drops again and DJ/VCB trips: Identify the defective traction motor via HMCS-1 and keep it isolated. (यदि QRSI-1 फिर से ड्रॉप होती है और DJ/VCB ट्रिप होता है तो HMCS-1 के द्वारा खराबी वाली ट्रैक्शन मोटर का पता लगाकर उसको आइसोलेट ही रखें।)",
      "• If still no success: Place HVSI-1, HVMT-1 and HVSL-1 to '0' position and work train with the remaining three traction motors. (यदि फिर भी सफलता नहीं मिलती है तो HVSI-1, HVMT-1 और HVSL-1 को 0 पोजीशन पर रखकर शेष तीन ट्रैक्शन मोटरों से कार्य करें।)"
    ]
  },
  {
    id: "QRSI-2-DROP",
    subSystem: "SS01",
    message: "4. QRSI-2 ड्रॉप होती है और DJ/VCB ट्रिप होता है\nQRSI-2 DROPS AND DJ/VCB TRIPS\n(सिलिकॉन रेक्टिफायर-2 ओवरकरंट सुरक्षा रिले QRSI-2)",
    lamp: "LSDJ प्रकाशित होगा, रिले पैनल पर QRSI-2 का लाल टारगेट गिरेगा (LSDJ will glow, red target of QRSI-2 drops)",
    effect: "DJ/VCB ट्रिप होगा, बोगी-2 / TM 4-5-6 में पावर कट जाएगी (DJ/VCB will trip, traction cut off in Bogie-2)",
    actions: [
      "• Inspection: Check RSI-2, SL-2, L4, L5 and L6, SJ, J-2, CTF, QD-2 and TM4, TM5 and TM6 etc. whether there is any defect in them. (जांच: RSI-2, SL-2, L4, L5 और L6, SJ, J-2, CTF, QD-2 और TM4, TM5 और TM6 इत्यादि को चेक करें, उनमें कोई खराबी तो नहीं है।)",
      "a) If any defect is found: Isolate the concerned equipment. (a) यदि कोई खराबी मिलती है तो - संबंधित उपकरण को आइसोलेट करें।)",
      "b) If no defect is found: Reset relay, close DJ/VCB. Resume traction. (b) यदि कोई खराबी नहीं मिलती है तो - रिले रीसेट करें, DJ/VCB क्लोज करें। ट्रैक्शन चालू करें।)",
      "• If QRSI-2 drops again and DJ/VCB trips: Identify the defective traction motor via HMCS-2 and keep it isolated. (यदि QRSI-2 फिर से ड्रॉप होती है और DJ/VCB ट्रिप होता है तो HMCS-2 के द्वारा खराबी वाली ट्रैक्शन मोटर का पता लगाकर उसको आइसोलेट ही रखें।)",
      "• If still no success: Place HVSI-2, HVMT-2 and HVSL-2 to '0' position and work train with the remaining three traction motors. (यदि फिर भी सफलता नहीं मिलती है तो HVSI-2, HVMT-2 और HVSL-2 को 0 पोजीशन पर रखकर शेष तीन ट्रैक्शन मोटरों से कार्य करें।)"
    ]
  },
  {
    id: "QOP-1-DROP",
    subSystem: "SS01",
    message: "QOP-1 ड्रॉप होती है और DJ/VCB ट्रिप होता है\nQOP-1 DROPS AND DJ/VCB TRIPS\n(पावर सर्किट-1 अर्थ फॉल्ट सुरक्षा रिले QOP-1)",
    lamp: "LSDJ प्रकाशित होगा, रिले पैनल पर QOP-1 का लाल टारगेट गिरेगा (LSDJ will glow, red target of QOP-1 drops)",
    effect: "DJ/VCB ट्रिप होगा, बोगी-1 में ट्रैक्शन कट जाएगा (DJ/VCB will trip, traction cut off in Bogie-1)",
    actions: [
      "• Inspection: Check concerned equipment RSI-1, SL-1, L-1, L-2, L-3, J-1, TM-1, TM-2, TM-3, QD-1, SJ, CTF-1, CTF-2, CTF-3, Q20 etc. whether there is any defect in them, or any metallic piece is shorting any equipment to locomotive body. (जांच: संबंधित उपकरणों RSI-1, SL-1, L-1, L-2, L-3, J-1, TM-1, TM-2, TM-3, QD-1, SJ, CTF-1, CTF-2, CTF-3, Q20 इत्यादि को चेक करें उनमें कोई खराबी तो नहीं है अथवा धातु का टुकड़ा इत्यादि किसी उपकरण को लोको बॉडी के साथ शॉर्ट तो नहीं कर रहा है।)",
      "(A) If any defect is found: Isolate the concerned equipment, work carefully. ((A) यदि कोई खराबी है तो - संबंधित उपकरण को आइसोलेट करें, सावधानी पूर्वक काम करें।)",
      "(B) If no defect is found: Reset relay. ((B) यदि कोई खराबी नहीं है तो रिले रीसेट करें।)",
      "(i) If QOP-1 resets: Close DJ/VCB and resume traction. If QOP-1 drops again and DJ/VCB trips, recheck TM, SL and HT compartments for smell or smoke; if no defect is found, reset relay. Change HMCS-1 positions one by one to identify and isolate defective TM. If it drops on all HMCS-1 positions, clear section in coasting, inform TLC, halt train, place HMCS-1 to normal and HQOP-1 to OFF (0). Follow precautions and fail loco after 1-2 block sections as per TLC order. ((i) यदि QOP-1 रीसेट हो जाती है तो DJ-VCB क्लोज करें और ट्रैक्शन चालू करें। यदि QOP-1 फिर से ड्रॉप होती है और DJ/VCB ट्रिप होता है तो TM, SL व HT कम्पार्टमेंट चेक करें कि कोई गंध या धुआं तो नहीं है; रिले रीसेट करें। HMCS-1 की पोजीशन बारी-बारी बदलकर खराबी वाली TM का पता लगाकर आइसोलेट करें। सभी पोजीशन पर ड्रॉप होने पर कोस्टिंग में सेक्शन क्लियर कर TLC को सूचित करें, गाड़ी खड़ी कर HMCS-1 सामान्य व HQOP-1 को OFF पर रखें। सावधानियों का पालन करते हुए TLC आदेशानुसार 1-2 ब्लॉक सेक्शन बाद लोको फेल करें।)",
      "(ii) If QOP-1 does not reset: Clear section in coasting and inform TLC. Halt train, check all TM, SL and HT compartments for smell or smoke. Place HQOP-1 to OFF (0). Reset relay, observe precautions and fail loco after 1-2 block sections as per TLC orders. ((ii) यदि QOP-1 रीसेट नहीं होती है तो कोस्टिंग में सेक्शन क्लियर करके TLC को सूचित करें। गाड़ी खड़ी करके सभी TM, SL व HT कम्पार्टमेंट के पास जाकर देखें कि कोई गंध या धुआं तो नहीं है। HQOP-1 को OFF पर रखें। रिले रीसेट करें, नीचे लिखी सावधानियों का पालन करते हुए TLC आदेशानुसार 1-2 ब्लॉक सेक्शन चलने के बाद लोको फेल करें।)",
      "(iii) If QOP-1 resets but DJ/VCB does not close: Before troubleshooting ICDJ, halt train, observe precautions, place HQOP-1 to OFF (0) and retry. ((iii) यदि QOP-1 रीसेट हो जाती है और DJ/VCB क्लोज नहीं होता है तो ICDJ की ट्रबल शूटिंग करने से पहले गाड़ी खड़ी करके उपरोक्त सावधानियों का पालन करते हुए HQOP-1 को OFF पर रखकर प्रयत्न करें।)",
      "(iv) If any TM was already isolated due to auto-regression and QOP-1 drops: Take the isolated TM into service and isolate the defective TM. If not successful, isolate RSI-1 block. ((iv) अगर ऑटो-रिग्रेशन के कारण पहले से ही कोई ट्रैक्शन मोटर आइसोलेट है और QOP-1 ड्रॉप होती है तो आइसोलेट ट्रैक्शन मोटर को सर्विस में लेकर खराबी वाली ट्रैक्शन मोटर को आइसोलेट करें। यदि सफलता नहीं मिलती है तो RSI-1 ब्लॉक को आइसोलेट करें।)",
      "【Precautions when working train with HQOP-1 placed to OFF (0) - HQOP-1 को OFF पर रखकर गाड़ी चलाने पर सावधानियां】:",
      "• Precaution (a): Halt train, set A-9 to minimum reduction, apply SA-9 brake, take 2-3 notches and ensure all blowers are working; after 2-3 minutes check TM, SL and HT compartments for smoke/smell. Inspect near SL for burning smell. If normal, inform TLC and work as per instructions. ((a) गाड़ी खड़ी करके A-9 को मिनिमम रिडक्शन पर रखकर व SA-9 से ब्रेक लगाकर 2-3 नोच लें तथा सभी ब्लोअर का चालू होना सुनिश्चित करें व 2-3 मिनट बाद TM, SL तथा HT कम्पार्टमेंट में धुआं/गंध चेक करें। SL के पास गंध चेक करें। सब नॉर्मल होने पर TLC को सूचित कर निर्देशानुसार कार्य करें।)",
      "• Precaution (b): If load is within permissible limits, isolate RSI-1 block as well. ((b) यदि लोड स्वीकृत सीमा में है तो RSI-1 ब्लॉक को भी आइसोलेट करें।)",
      "• Precaution (c): ALP should get down on ground; when LP takes 2-3 notches to start train, ensure all wheels rotate freely and there is no defect in TM and SL. ((c) सहायक लोको पायलट नीचे उतरकर जब लोको पायलट गाड़ी रवाना करने के लिए 2-3 नोच लें तब सुनिश्चित करें कि सभी व्हील बराबर (Freely) घूम रहे हैं तथा TM व SL में कोई खराबी नहीं है।)",
      "• Precaution (d): If smoke is visible in TM, SL or HT compartment, demand assistance immediately. ((d) यदि TM, SL अथवा HT कम्पार्टमेंट में धुआं दिखाई देता है तो तुरंत सहायता मांगें।)"
    ]
  },
  {
    id: "QOP-2-DROP",
    subSystem: "SS01",
    message: "QOP-2 ड्रॉप होती है और DJ/VCB ट्रिप होता है\nQOP-2 DROPS AND DJ/VCB TRIPS\n(पावर सर्किट-2 अर्थ फॉल्ट सुरक्षा रिले QOP-2)",
    lamp: "LSDJ प्रकाशित होगा, रिले पैनल पर QOP-2 का लाल टारगेट गिरेगा (LSDJ will glow, red target of QOP-2 drops)",
    effect: "DJ/VCB ट्रिप होगा, बोगी-2 में ट्रैक्शन कट जाएगा (DJ/VCB will trip, traction cut off in Bogie-2)",
    actions: [
      "• Inspection: Check concerned equipment RSI-2, SL-2, L-4, L-5, L-6, J-2, TM-4, TM-5, TM-6, QD-2, SJ, CTF-1, CTF-2, CTF-3 and etc. whether there is any defect in them, or any metallic piece is shorting any equipment to locomotive body. (जांच: संबंधित उपकरणों RSI-2, SL-2, L-4, L-5, L-6, J-2, TM-4, TM-5, TM-6, QD-2, SJ, CTF-1, CTF-2, CTF-3 एवं इत्यादि को चेक करें उनमें कोई खराबी तो नहीं है अथवा धातु का टुकड़ा इत्यादि किसी उपकरण को लोको बॉडी के साथ शॉर्ट तो नहीं कर रहा है।)",
      "(A) If any defect is found: Isolate the concerned equipment, work carefully. ((A) यदि कोई खराबी है तो - संबंधित उपकरण को आइसोलेट करें, सावधानी पूर्वक काम करें।)",
      "(B) If no defect is found: Reset relay. ((B) यदि कोई खराबी नहीं है तो रिले रीसेट करें।)",
      "(i) If QOP-2 resets: Close DJ-VCB and resume traction. If QOP-2 drops again and DJ/VCB trips, recheck defect. Inspect near all TM, SL and HT compartments to check if there is any smell or smoke; if no defect is found, reset relay. Change HMCS-2 positions one by one and take traction to identify the defective traction motor and isolate it. Inform TLC at next convenient stop. If QOP-2 drops on all HMCS-2 positions and no defect is found, clear section in coasting and inform TLC. Halt train, place HMCS-2 to normal position and place HQOP-2 to OFF (0). Reset relay, work observing precautions written below. As per TLC orders, fail loco after working 1-2 block sections. ((i) यदि QOP-2 रीसेट हो जाती है तो DJ-VCB क्लोज करें और ट्रैक्शन चालू करें। यदि QOP-2 फिर से ड्रॉप होती है और DJ/VCB ट्रिप होता है तो खराबी फिर से चेक करें। सभी TM, SL व HT कम्पार्टमेंट के पास जाकर देखें कि कोई गंध या धुआं तो नहीं है और यदि कोई खराबी नहीं पाई जाती तो रिले रीसेट करें। HMCS-2 की पोजीशन बारी-बारी से बदलकर ट्रैक्शन चालू करके खराबी वाली ट्रैक्शन मोटर का पता लगाकर उसको आइसोलेट कर दें। अगले सुविधाजनक स्टॉप पर TLC को सूचित करें। यदि HMCS-2 की सभी पोजीशन पर QOP-2 ड्रॉप होती है और कोई खराबी नहीं मिलती है तो कोस्टिंग में सेक्शन क्लियर करके TLC को सूचित करें। गाड़ी खड़ी करके HMCS-2 को सामान्य पोजीशन पर रखें और HQOP-2 को OFF पर रखें। रिले रीसेट करें, नीचे लिखी सावधानियों का पालन करते हुए कार्य करें। TLC के आदेशानुसार, एक या दो ब्लॉक सेक्शन चलने के बाद लोको फेल करें।)",
      "(ii) If QOP-2 does not reset: Clear section in coasting and inform TLC. Halt train, inspect all TM, SL and HT compartments to check whether there is any smell or smoke. Place HQOP-2 to OFF (0). Reset relay, observing precautions written below and as per TLC orders, fail loco after working 1-2 block sections. ((ii) यदि QOP-2 रीसेट नहीं होती है तो कोस्टिंग में सेक्शन क्लियर करके TLC को सूचित करें। गाड़ी खड़ी करके सभी TM, SL व HT कम्पार्टमेंट के पास जाकर देखें कि कोई गंध या धुआं तो नहीं है। HQOP-2 को OFF पर रखें। रिले रीसेट करें, नीचे लिखी सावधानियों का पालन करते हुए TLC आदेशानुसार, एक या दो ब्लॉक सेक्शन चलने के बाद लोको फेल करें।)",
      "(iii) If QOP-2 resets but DJ/VCB does not close: Before troubleshooting ICDJ, halt train, observe the above precautions, place HQOP-2 to OFF (0) and retry. ((iii) यदि QOP-2 रीसेट हो जाती है और DJ/VCB क्लोज नहीं होता है तो ICDJ की ट्रबल शूटिंग करने से पहले गाड़ी खड़ी करके उपरोक्त सावधानियों का पालन करते हुए HQOP-2 को OFF पर रखकर प्रयत्न करें।)",
      "(iv) If any traction motor is already isolated due to auto-regression and QOP-2 drops: Take the isolated traction motor into service and isolate the defective traction motor. If not successful, isolate RSI-2 block. ((iv) अगर ऑटो-रिग्रेशन के कारण पहले से ही कोई ट्रैक्शन मोटर आइसोलेट है और QOP-2 ड्रॉप होती है तो आइसोलेट ट्रैक्शन मोटर को सर्विस में लेकर खराबी वाली ट्रैक्शन मोटर को आइसोलेट करें। यदि सफलता नहीं मिलती है तो RSI-2 ब्लॉक को आइसोलेट करें।)",
      "【Precautions when working train with HQOP-2 placed to OFF (0) - HQOP-2 को OFF पर रखकर गाड़ी चलाने पर सावधानियां】:",
      "• Precaution (a): Halt train, set A-9 to minimum reduction, apply SA-9 brake, take 2-3 notches and ensure all blowers are working; after 2-3 minutes check TM, SL and HT compartments for smoke/smell. Inspect near SL for burning smell. If everything is normal, inform TLC while checking smoke/smell/fire/abnormality in SL, HT & TM, and work as per instructions. ((a) गाड़ी खड़ी करके A-9 को मिनिमम रिडक्शन पर रखकर व SA-9 से ब्रेक लगाकर 2-3 नोच लें तथा सभी ब्लोअर का चालू होना सुनिश्चित करें व दो-तीन मिनट बाद ट्रैक्शन मोटर, SL तथा HT कम्पार्टमेंट में धुआं / गंध इत्यादि को चेक करें। SL के पास जाकर देखें कोई गंध तो नहीं आ रही है। यदि सब कुछ नॉर्मल है तो SL, HT एवं ट्रैक्शन मोटर में धुआं / गंध / आग या कोई अन्य असामान्यता चेक करते हुए TLC को सूचित करें और उसके निर्देशानुसार कार्य करें।)",
      "• Precaution (b): If load is within permissible limits, isolate RSI-2 block as well. ((b) यदि लोड स्वीकृत सीमा में है तो RSI-2 ब्लॉक को भी आइसोलेट करें।)",
      "• Precaution (c): Assistant Loco Pilot should get down on ground; when Loco Pilot takes 2-3 notches to start train, ensure all wheels rotate freely and there is no defect in TM and SL. ((c) सहायक लोको पायलट नीचे उतरकर जब लोको पायलट गाड़ी रवाना करने के लिए 2/3 नोच लें तब सुनिश्चित करें कि सभी व्हील बराबर (Freely) घूम रहे हैं तथा TM व SL में कोई खराबी नहीं है।)",
      "• Precaution (d): If smoke is visible in TM, SL or HT compartment, demand assistance immediately. ((d) यदि TM, SL अथवा HT कम्पार्टमेंट में धुआं दिखाई देता है तो तुरंत सहायता मांगें।)"
    ]
  },
  {
    id: "QLA-DROP",
    subSystem: "SS01",
    message: "QLA ड्रॉप होती है और DJ/VCB ट्रिप होता है\nQLA DROPS AND DJ/VCB TRIPS\n(ऑक्सिलरी पावर सर्किट ओवरकरंट सुरक्षा रिले QLA / ARNO एवं ऑक्सिलरी मोटर सुरक्षा)",
    lamp: "LSDJ प्रकाशित होगा, रिले पैनल पर QLA का लाल टारगेट गिरेगा (LSDJ will glow, red target of QLA drops)",
    effect: "DJ/VCB ट्रिप होगा, सभी सहायक मोटरें (ARNO / Blowers / Compressors) बंद हो जाएंगी (DJ/VCB will trip, auxiliary motors stop)",
    actions: [
      "• Inspection: Check for defects in ARNO and auxiliaries etc. (जांच: आर्नो और ऑक्सिलरियों इत्यादि में खराबी चेक करें।)",
      "(a) If defect is in ARNO or in equipment which cannot be isolated: Demand assistance. ((a) यदि खराबी आर्नो या ऐसे साधन में है जिसे आइसोलेट नहीं किया जा सकता तो सहायता मांगें।)",
      "(b) If defect is in equipment which can be isolated: Isolate that equipment, reset relay and work carefully. ((b) यदि खराबी ऐसे साधन में है जिसे आइसोलेट किया जा सकता है तो उस साधन को आइसोलेट करें, रिले रीसेट करें एवं सावधानी पूर्वक कार्य करें।)",
      "(c) If no defect is found: Reset relay, close DJ/VCB, start auxiliaries and work train. ((c) यदि कोई खराबी नहीं मिलती है तो - रिले रीसेट करें, DJ/VCB क्लोज करें और ऑक्सिलरी चालू करें और गाड़ी चलाएं।)",
      "• Note: If QLA drops again, it can be reset a maximum of three times. (नोट :- यदि QLA फिर से ड्रॉप हो रही है तो उसे अधिकतम तीन बार रीसेट किया जा सकता है।)"
    ]
  },
  {
    id: "QOA-DROP",
    subSystem: "SS01",
    message: "QOA ड्रॉप होती है और DJ/VCB ट्रिप होता है\nQOA DROPS AND DJ/VCB TRIPS\n(ऑक्सिलरी पावर सर्किट अर्थ फॉल्ट सुरक्षा रिले QOA)",
    lamp: "LSDJ प्रकाशित होगा, रिले पैनल पर QOA का लाल टारगेट गिरेगा (LSDJ will glow, red target of QOA drops)",
    effect: "DJ/VCB ट्रिप होगा, सभी सहायक मोटरें (Compressor, Blowers) बंद हो जाएंगी (DJ/VCB will trip, auxiliary motors stop)",
    actions: [
      "• Inspection: Check ARNO, R118, C118, CHBA, TK panel and auxiliaries etc. whether there is any defect in them, or any metallic piece is shorting any equipment to locomotive body. (जांच: आर्नो, R118, C118, CHBA, TK पैनल और ऑक्सिलरी इत्यादि को चेक करें उनमें कोई खराबी तो नहीं है अथवा कोई धातु का टुकड़ा इत्यादि किसी उपकरण को लोको बॉडी के साथ शॉर्ट तो नहीं कर रहा है।)",
      "(I) If any defect is found: Isolate the concerned equipment, work carefully. If any defect is found in ARNO, R118 or C118, demand assistance. ((I) यदि कोई खराबी है तो - संबंधित उपकरण को आइसोलेट करें, सावधानी पूर्वक कार्य करें। यदि आर्नो, R118 अथवा C118 में कोई खराबी पाई जाए तो सहायता मांगें।)",
      "(II) If no defect is found: Open BLRA, BLCP and BLVMT. Remove fuses CCRA-1, CCRA-2 and CCVT, reset relay. ((II) यदि कोई खराबी नहीं मिलती – BLRA, BLCP और BLVMT को ओपन करें। CCRA-1, CCRA-2 और CCVT फ्यूज निकालें, रिले को रीसेट करें।)",
      "(a) If QOA does not reset: Place HQOA to \"0\", reset relay, work carefully and inform TLC at first opportunity. ((a) यदि QOA रीसेट नहीं होती है तो HQOA को \"0\" पर रखकर रिले रीसेट करें, सावधानी पूर्वक कार्य करें तथा पहले अवसर पर TLC को सूचित करें।)",
      "(b) If QOA resets: Close DJ/VCB and run auxiliaries. ((b) यदि QOA रीसेट हो जाती है तो DJ/VCB क्लोज करें और ऑक्सिलरी चलाएं।)",
      "A) If QOA drops again and DJ/VCB trips: Place switches HCHBA, HPH, HVSL-1, HVSL-2, HVSI-1 and HVSI-2 to \"0\" position. Reset relay and close DJ/VCB. (A) यदि QOA फिर से ड्रॉप होती है और DJ/VCB ट्रिप होता है तो - स्विच HCHBA, HPH, HVSL-1, HVSL-2, HVSI-1 और HVSI-2 को \"0\" पोजीशन पर रखें। रिले रीसेट करें और DJ/VCB क्लोज करें।)",
      "i) If QOA drops and DJ/VCB trips: Check ARNO, R118 and C118; if no defect is found, isolate QOA by placing HQOA to \"0\" and work carefully. (i) यदि QOA ड्रॉप होती है और DJ/VCB ट्रिप होता है तो - आर्नो, R118 और C118 को चेक करें; यदि कोई खराबी नहीं पाई जाती तो HQOA को \"0\" पर रखकर QOA को आइसोलेट करें और सावधानीपूर्वक कार्य करें।)",
      "ii) If DJ/VCB does not trip: Put switches HCHBA, HPH, HVSL-1, HVSL-2, HVSI-1 and HVSI-2 one by one to position \"1\" to identify the defective equipment, isolate it and work carefully. (ii) यदि DJ/VCB ट्रिप नहीं होता है तो - स्विच HCHBA, HPH, HVSL-1, HVSL-2, HVSI-1 और HVSI-2 को एक-एक करके पोजीशन \"1\" पर रखकर खराबी वाले उपकरण का पता लगाकर उसे आइसोलेट करें और सावधानी पूर्वक कार्य करें।)",
      "B) If QOA does not drop and DJ/VCB does not trip: (B) यदि QOA ड्रॉप नहीं होती है और DJ/VCB ट्रिप नहीं होता है तो:)",
      "C) Close BLCP: If QOA drops and DJ/VCB trips, reset relay, close DJ/VCB. Change HCP positions to identify the defective MCP and isolate it. (C) BLCP क्लोज करें - यदि QOA ड्रॉप होती है और DJ/VCB ट्रिप होता है तो रिले रीसेट करें, DJ/VCB क्लोज करें। HCP की पोजीशन बदल-बदल कर खराबी वाले MCP का पता लगाकर उसे आइसोलेट करें।)",
      "• If upon closing BLCP, QOA does not drop and DJ/VCB does not trip: (BLCP क्लोज करने पर यदि QOA ड्रॉप नहीं होती है और DJ/VCB ट्रिप नहीं होता है तो:)",
      "D) Close BLVMT: If QOA drops and DJ/VCB trips, place HVRH, HVMT-1 and HVMT-2 to \"0\". Reset relay, close DJ/VCB. Put switches one by one to position \"1\" at 10-second intervals to identify the defective equipment, isolate it and work carefully. (D) BLVMT क्लोज करें - यदि QOA ड्रॉप होती है और DJ/VCB ट्रिप होता है तो HVRH, HVMT-1 और HVMT-2 को \"0\" पर रखें। रिले रीसेट करें, DJ/VCB क्लोज करें। स्विचों को एक-एक करके दस-दस सेकंड के अंतर से पोजीशन \"1\" पर रखें। इस प्रकार खराबी वाले उपकरण का पता लगाकर उसे आइसोलेट करें और सावधानी पूर्वक कार्य करें।)",
      "【Notes / नोट】:",
      "• Note (i): In case QOA drops, if defective equipment cannot be identified and no abnormality is found in any equipment, isolate QOA by placing HQOA to \"0\". (नोट (i): QOA ड्रॉप होने की हालत में यदि खराबी वाले उपकरण का पता नहीं लगता और किसी उपकरण में कोई असामान्य बात भी नहीं पाई जाती है तो HQOA को \"0\" पर रखकर QOA को आइसोलेट करें।)",
      "• Note (ii): If any individual auxiliary is isolated by placing its switch to \"0\", ensure that its corresponding contactor is properly open. (नोट (ii): यदि कोई स्वतंत्र ऑक्सिलरी उसकी स्विच को \"0\" पर रखकर आइसोलेट की गई है तो संबंधित कॉन्टैक्टर बराबर खुला है, सुनिश्चित करें।)"
    ]
  },
  {
    id: "ICDJ-LSDJ-NOT-EXTINGUISHING",
    subSystem: "SS01",
    message: "LSDJ नहीं बुझता है / DJ-VCB क्लोज़ नहीं होता है\nLSDJ DOES NOT EXTINGUISH / DJ-VCB NOT CLOSING\n(फ़ेलियर का प्रकार और असामान्‍य संकेत: LSDJ नहीं बुझता है - ICDJ)",
    lamp: "LSDJ जलता रहेगा, UA मीटर शून्य रहेगा (LSDJ remains glowing, UA meter zero)",
    effect: "DJ/VCB क्लोज नहीं होगा, लोको में OHE सप्लाई नहीं आएगी (DJ/VCB will not close; OHE supply will not enter loco)",
    actions: [
      "【उप-असामान्य संकेत / कार्यवाही जो करनी है: i) कम प्रेशर (Sub-abnormal Indication i: Low Pressure)】",
      "a) Ensure RAL cock is open. (a) RAL कॉक खुला है, सुनिश्चित करें।)",
      "b) If RS pressure is low, build pressure using CPA (MCPA). (b) यदि RS प्रेशर कम है तो CPA द्वारा बनाएं।)",
      "【उप-असामान्य संकेत / कार्यवाही जो करनी है: ii) कम बैटरी वोल्टेज (Sub-abnormal Indication ii: Low Battery Voltage)】",
      "a) Switch off all unnecessary cab lights and lamps. If Q118 does not energize due to low battery voltage, operate Q44 manually, close DJ/VCB, and release Q44 when LSCHBA extinguishes. (a) सभी अनावश्यक बत्तियां बुझा दें। यदि कम बैटरी वोल्टेज के कारण Q118 इनर्जाइज नहीं होती है तो Q44 को हाथ से ऑपरेट करें, DJ/VCB क्लोज करें और LSCHBA के बुझने पर Q44 को छोड़ दें।)",
      "【उप-असामान्य संकेत / कार्यवाही जो करनी है: iii) Q118 इनर्जाइज नहीं होती है (Sub-abnormal Indication iii: Q118 Does Not Energize)】",
      "a) Check pantograph - if pantograph is raised, CCBA and CCPT are intact. If pantograph is not raised - check CCBA and CCPT fuses; if melted, replace fuse once. If it melts again, place HOBA to \"OFF\" position and replace fuse. (a) पैंटो चेक करें - यदि पैंटो उठी हुई हालत में है तो, CCBA और CCPT बराबर है। यदि पैंटो उठा हुआ नहीं है तो – CCBA और CCPT चेक करें, यदि पिघल गए हैं तो एक बार फ्यूज बदल दें। यदि फिर से पिघलता है तो HOBA को \"ऑफ\" पोजीशन पर रख कर फ्यूज बदली करें।)",
      "b) Ensure GR is at \"0\". If GR is not at \"0\", bring it to \"0\" manually by hand. (b) GR \"0\" पर है, सुनिश्चित करें। यदि GR \"0\" पर नहीं है तो उसे हाथ से \"0\" पर लाएं।)",
      "c) Ensure auxiliary contactors C118, C105, C106 and C107 are open. (c) ऑक्सिलरी कॉन्टैक्टर C118, C105, C106 और C107 खुले हैं, सुनिश्चित करें।)",
      "d) Operate Q118 manually by hand until all auxiliaries have started (simultaneously press BP2DJ / BLRDJ). (d) सभी ऑक्सिलरियों के चालू हो जाने तक Q118 को हाथ से ऑपरेट करें (साथ में BP2DJ / BLRDJ को दबाएं)।)",
      "e) Wedge relay Q118 with approved procedure. (e) Q118 को वेज करें।)",
      "【उप-असामान्य संकेत / कार्यवाही जो करनी है: iv) BLRDJ को दबाने पर Q45 इनर्जाइज नहीं होती है (Sub-abnormal Indication iv: Q45 Does Not Energize on pressing BLRDJ)】",
      "a) Ensure ZPT is at \"1\" or \"2\" and BLDJ is closed. (a) ZPT \"1\" या \"2\" पर और BLDJ क्लोज है, सुनिश्चित करें।)",
      "b) Check CCDJ fuse - if needed, operate HOBA switch. (b) CCDJ चेक करें - आवश्यक हो तो HOBA का उपयोग करें।)",
      "c) Ensure GR is at \"0\" and SMGR drum indicates \"0\". (c) GR \"0\" पर है, SMGR ड्रम \"0\" बताता है, सुनिश्चित करें।)",
      "d) Operate ZPT 2-3 times, re-raise pantograph and attempt to close DJ/VCB. (d) ZPT को दो-तीन बार ऑपरेट करें, पैंटो को फिर से रेज करें और DJ/VCB क्लोज करने का प्रयत्न करें।)",
      "e) Operate BLDJ, BLRDJ, BP1DJ and BP2DJ 2-3 times and attempt again. (e) BLDJ, BLRDJ, BP1DJ और BP2DJ को 2-3 बार ऑपरेट करके फिर से प्रयत्न करें।)",
      "f) Operate Q45 manually by hand and release it when LSCHBA extinguishes. (f) Q45 को हाथ से ऑपरेट करें और LSCHBA के बुझने पर उसे छोड़ दें।)",
      "g) Attempt to close DJ/VCB from the other cab. (g) दूसरी कैब से प्रयत्न करें।)",
      "【उप-असामान्य संकेत / कार्यवाही जो करनी है: v) BLRDJ को दबाने पर Q44 इनर्जाइज नहीं होती है (Sub-abnormal Indication v: Q44 Does Not Energize on pressing BLRDJ)】",
      "a) Operate GR manually 2-3 times and bring it back to \"0\". Note: Even if LSGR is illuminated, take 2-3 notches manually on GR and return GR to \"0\". (a) GR को हाथ से 2-3 बार ऑपरेट करें और वापस \"0\" पर लाएं। नोट: यदि LSGR प्रकाशित है फिर भी GR को 2-3 नोच लेकर मैनुअली ऑपरेट करें एवं पुनः GR को \"0\" पर लाएं।)",
      "b) Operate Q44 manually by hand, simultaneously pressing BLRDJ / BP2DJ; release Q44 as soon as DJ/VCB closes. (b) Q44 को हाथ से ऑपरेट करें, उसके साथ-साथ BLRDJ/BP2DJ को दबाएं। DJ/VCB के क्लोज होते ही Q44 को छोड़ दें।)",
      "【उप-असामान्य संकेत / कार्यवाही जो करनी है: vi) BLRDJ को दबाने पर C118 क्लोज नहीं होता है (Sub-abnormal Indication vi: C118 Does Not Close on pressing BLRDJ)】",
      "a) Ground the locomotive. Check coil terminals of C118. Operate mobile jaw 2-3 times. Unground locomotive and attempt to close DJ/VCB. If unsuccessful, demand assistance. (a) लोको ग्राउंड करें। C118 के कॉइल टर्मिनल चेक करें। मोबाइल जॉ को 2-3 बार ऑपरेट करें। लोको अनग्राउंड करें और DJ/VCB क्लोज करने का प्रयत्न करें। यदि सफलता नहीं मिलती तो सहायता मांगें।)",
      "• Note: If C118 is located outside HT compartment, operate C-118 using dry wooden stick to close DJ/VCB. (नोट :- यदि C118 HT कम्पार्टमेंट के बाहर लगा है तो DJ/VCB क्लोज करने के लिए C-118 को सूखी लकड़ी से ऑपरेट करें।)",
      "【उप-असामान्य संकेत / कार्यवाही जो करनी है: vii) C118 क्लोज होता है परंतु DJ/VCB क्लोज नहीं होता (Sub-abnormal Indication vii: C118 Closes But DJ/VCB Does Not Close)】",
      "a) Check RS pressure. Close DJ and work train. (a) RS प्रेशर चेक करें। DJ क्लोज करके गाड़ी चलाएं।)",
      "b) Operate BPEMS 2-3 times and normalize it. (b) BPEMS को 2-3 बार ऑपरेट करके नॉर्मल करें।)",
      "c) Check terminals of normally open (N/O) interlock of C-118. (c) C-118 के N/O इंटरलॉक के टर्मिनल चेक करें।)",
      "d) In VCB fitted locomotives, close R1 cock and drain RS pressure. Once pressure is drained, close RS drain cock and open R1 cock. If RS pressure is low, build pressure using MCPA. Attempt to close VCB again. (d) VCB वाले लोको में R1 कॉक बंद करके RS प्रेशर ड्रेन करें। प्रेशर ड्रेन होने पर RS ड्रेन कॉक बंद करके R1 कॉक खोलें। यदि RS प्रेशर कम है तो MCPA द्वारा प्रेशर बनाएं। पुनः VCB क्लोज करने का प्रयत्न करें।)"
    ]
  },
  {
    id: "CONV-LSDJ-EXTINGUISHED-UA-ZERO",
    subSystem: "SS01",
    message: "LSDJ बुझता है, UA डेविएट नहीं होता है\nLSDJ EXTINGUISHES, UA DOES NOT DEVIATE (0 KV)\n(डीजे क्लोज होने पर भी UA मीटर शून्य रहना / पैंटो व OHE वोल्टेज अनुपलब्ध)",
    lamp: "LSDJ बुझ जाएगा, UA मीटर शून्य (0 KV) दर्शाएगा (LSDJ extinguishes, UA meter remains at 0 KV)",
    effect: "DJ/VCB क्लोज है परंतु OHE वोल्टेज नहीं मिल रहा है; लोको ट्रैक्शन एवं ऑक्सिलरी कार्य नहीं करेंगे (DJ/VCB closed but no OHE supply available; traction & auxiliaries will not work)",
    actions: [
      "• Inspection: Check Pantograph. (जांच: पैंटो चेक करें।)",
      "a) If pantograph is not touching OHE: Raise the other pantograph. If necessary, troubleshoot for pantograph not raising (Failure No. 11, Page No. 63). (a) यदि पैंटो OHE को स्पर्श नहीं कर रहा है तो दूसरा पैंटो उठाएं। यदि आवश्यक हो तो पैंटो रेज़ नहीं होने के लिए ट्रबलशूट करें (फेलियर क्र. 11 पृष्ठ क्र. 63)।)",
      "b) If pantograph is touching OHE: Ensure that no object is shorting OHE with train, loco or roof bar, and pantograph has sustained no damage. (b) यदि पैंटो OHE को स्पर्श कर रहा है तो सुनिश्चित करें कि कोई भी वस्तु OHE को गाड़ी, लोको या रूफ बार के साथ शॉर्ट तो नहीं कर रही है और पैंटो को कोई नुकसान नहीं हुआ है।)",
      "c) Lower pantograph and check arcing. If there is no arcing, there is no OHE supply (OHE Dead / Power Block). Immediately switch ON flasher light, control the train (maximum speed 60 km/h at night) and stop train before obstruction or at convenient location. Contact TPC and act as per instructions (try closing VCB every 1 minute to detect tension resumption). If TPC cannot be contacted, LP shall depute ALP along with Guard to inspect train and loco. If any abnormality is noticed in train/loco inspection, immediately inform control and act as per instructions. If no abnormality is found and supply resumes, switch off flasher light and resume normal traction. (c) पैंटो लोअर करें और आर्किंग चेक करें। यदि आर्किंग नहीं होती है तो OHE सप्लाई नहीं है। तुरंत फ्लैशर लाइट जलाएं, गाड़ी को कंट्रोल करके (रात के समय अधिकतम गति 60 किमी.प्र.घंटे) रुकावट के पहले अथवा सुविधाजनक स्थान पर गाड़ी खड़ी करें। TPC से संपर्क करके उसके निर्देशानुसार कार्य करें (टेंशन आने का पता करने के लिए हर एक मिनट में VCB क्लोज करके देखें)। यदि TPC से संपर्क नहीं होता है तो लोको पायलट अपने सहायक लोको पायलट को गार्ड के साथ गाड़ी और लोको की जांच करने के लिए नियुक्त करेगा। यदि लोको/गाड़ी की जांच में कोई असामान्यता मिलती है तो वे तुरंत इसकी सूचना कंट्रोल को देकर उसके निर्देशानुसार कार्य करें। - यदि असामान्यता नहीं मिलती और सप्लाई आ जाती है तो फ्लैशर लाइट बंद करके सामान्य ट्रैक्शन चालू करें।)",
      "d) If arcing occurs: Try to work train by raising the other pantograph. (d) यदि आर्किंग होती है तो दूसरे पैंटो को रेज़ करके गाड़ी चलाने का प्रयत्न करें।)",
      "e) If still not successful: Contact TLC. (e) यदि सफलता नहीं मिलती तो TLC से संपर्क करें।)"
    ]
  },
  {
    id: "CONV-LSDJ-BEFORE-LSCHBA",
    subSystem: "SS01",
    message: "LSCHBA के बुझने से पहले LSDJ फिर से प्रकाशित होता है।\nLSDJ GLOWS AGAIN BEFORE LSCHBA EXTINGUISHES\n(डीजे क्लोज होने के 4-5 सेकंड में ही ट्रिप हो जाना / आर्नो व QCVAR इनर्जाइज नहीं होना)",
    lamp: "LSDJ क्षणिक बुझकर पुनः प्रकाशित हो जाएगा, LSCHBA जलता रहेगा (LSDJ extinguishes momentarily and glows again, LSCHBA remains glowing)",
    effect: "DJ/VCB ट्रिप होगा, आर्नो व सहायक मोटरें चालू नहीं होंगी, लोको में सप्लाई नहीं आएगी (DJ/VCB trips, ARNO and auxiliaries will not start)",
    actions: [
      "a) आर्नो चेक करें। (Check ARNO.)",
      "   i) यदि आर्नो असामान्य आवाज के साथ काम करता है अथवा आर्नो चालू नहीं होता है तो सहायता मांगें। (If ARNO works with abnormal sound or ARNO does not start: Demand assistance.)",
      "   ii) यदि आर्नो सामान्य रूप से काम करता है तो गाड़ी चलाएं। (If ARNO works normally: Work train.)",
      "• विस्तृत प्रक्रिया (Detailed Procedure): HQCVAR को पोजीशन \"0\" पर रखें, DJ/VCB क्लोज करें और BLRDJ को 3-4 सेकंड में छोड़ दें। LSCHBA नहीं बुझेगा: आर्नो चेक करें।"
    ]
  },
  {
    id: "CONV-LSDJ-AFTER-LSCHBA",
    subSystem: "SS01",
    message: "LSCHBA के बुझने के बाद LSDJ फिर से प्रकाशित होता है।\nLSDJ GLOWS AGAIN AFTER LSCHBA EXTINGUISHES\n(ऑक्सिलरी सुरक्षा रिले QPH, QVSL-1, QVSL-2 ट्रिपिंग अथवा Q118 रिले फॉल्ट)",
    lamp: "LSDJ बुझता है, LSCHBA भी बुझता है, परंतु उसके बाद LSDJ फिर से प्रकाशित हो जाता है (LSDJ extinguishes, LSCHBA also extinguishes, but thereafter LSDJ glows again)",
    effect: "DJ/VCB ट्रिप हो जाएगा, सभी चालू सहायक मोटरें बंद हो जाएंगी (DJ/VCB trips, running auxiliary motors stop)",
    actions: [
      "【उप-असामान्य संकेत / कार्यवाही जो करनी है (Sub-abnormal Indication / Action to Take)】",
      "• Place HPH, HVSL-1 and HVSL-2 to position \"3\" and close DJ/VCB: (HPH, HVSL-1 और HVSL-2 को \"3\" पर रखें और DJ/VCB क्लोज करें:)",
      "a) If DJ/VCB holds: Check operation of MPH, MVSL-1 and MVSL-2 auxiliaries. ((a) यदि DJ/VCB कायम रहता है तो : MPH, MVSL-1 और MVSL-2 ऑग्जीलरीयों का कार्य चेक करें।)",
      "i) If MPH is not working: Place HPH to \"0\" and isolate it. (i) यदि MPH काम नहीं कर रहा है तो - HPH को \"0\" पर रखकर उसे आइसोलेट करें।)",
      "ii) If MVSL-1 or MVSL-2 are not working: Isolate the concerned block. (ii) यदि MVSL-1 या MVSL-2 काम नहीं करते हैं तो संबंधित ब्लॉक को आइसोलेट करें।)",
      "iii) If all three auxiliaries are working: Place HPH, HVSL-1 and HVSL-2 one by one to position \"1\" to identify the defective relay, and isolate it by placing the concerned switch back to \"3\". (iii) यदि तीनों ऑग्जीलरी काम करती हैं तो - HPH, HVSL-1 और HVSL-2 को एक-एक करके पोजीशन \"1\" पर रखकर खराबी वाली रिले का पता लगाएं और संबंधित स्विच को वापस \"3\" पर रखकर उसे आइसोलेट करें।)",
      "b) If DJ/VCB does not hold: Place HQCVAR to \"0\" and close DJ/VCB. ((b) यदि DJ/VCB कायम नहीं रहता है तो - HQCVAR को \"0\" पर रखें और DJ/VCB क्लोज करें।)",
      "c) If DJ/VCB still does not hold: Wedge relay Q118. ((c) यदि DJ/VCB कायम नहीं रहता है तो - Q118 को वेज करें।)"
    ]
  },
  {
    id: "CONV-BLVMT-DJ-TRIP",
    subSystem: "SS01",
    message: "BLVMT क्लोज करने पर DJ/VCB ट्रिप होता है\nDJ/VCB TRIPS ON CLOSING BLVMT\n(ब्लोअर स्विच ऑन करने पर डीजे ट्रिपिंग / ब्लोअर मोटर या रिले QVRH, QVMT-1, QVMT-2 दोष)",
    lamp: "LSDJ जल जाएगा, BLVMT क्लोज करते ही DJ ट्रिप होगा (LSDJ will glow, DJ trips as soon as BLVMT is closed)",
    effect: "DJ/VCB खुल जाएगा, ब्लोअर मोटरें और ट्रैक्शन बंद हो जाएंगे (DJ/VCB trips, blower motors and traction will stop)",
    actions: [
      "【उप-असामान्य संकेत / कार्यवाही जो करनी है (Sub-abnormal Indication / Action to Take)】",
      "• Place HVRH, HVMT-1 and HVMT-2 to position \"3\" and close DJ/VCB: (HVRH, HVMT-1 और HVMT-2 को \"3\" पर रखें और DJ/VCB क्लोज करें:)",
      "a) If DJ/VCB holds: Check operation of MVRH, MVMT-1 and MVMT-2 blowers. ((a) यदि DJ/VCB कायम रहता है तो : MVRH, MVMT-1 और MVMT-2 ब्लोअरों का कार्य चेक करें।)",
      "i) If any blower is not working: Isolate it. (i) यदि कोई ब्लोअर काम नहीं करता तो – उसे आइसोलेट करें।)",
      "ii) If all blowers are working: Starting from HVMT-2, put switches one by one to position \"1\" at 6-second intervals to identify the defective relay, and isolate it by placing the concerned switch to \"3\". (ii) यदि सभी ब्लोअर काम करते हैं तो HVMT-2 से प्रारंभ करके 6 सेकंड के समय के अंतर से एक-एक करके स्विचों को पोजीशन \"1\" पर रखकर खराबी वाली रिले का पता लगाएं और संबंधित स्विच को \"3\" पर रखकर उसे आइसोलेट करें।)",
      "b) If DJ/VCB does not hold: Wedge relay Q118. ((b) यदि DJ/VCB कायम नहीं रहता है तो - Q118 को वेज करें।)"
    ]
  },
  {
    id: "CONV-DJ-TRIP-FIRST-NOTCH",
    subSystem: "SS01",
    message: "पहली नोच पर DJ/VCB ट्रिप होता है।\nDJ/VCB TRIPS ON 1st NOTCH\n(1st नोच लेते ही DJ ट्रिप होना / MVSI ब्लोअर, QVSI रिले अथवा टैप चेंजर GR दोष)",
    lamp: "LSDJ प्रकाशित होगा, LSGR बुझकर पुनः प्रकाशित होगा (LSDJ will glow, LSGR will extinguish and glow again)",
    effect: "DJ/VCB ट्रिप होगा, गाड़ी में ट्रैक्शन कट जाएगा (DJ/VCB will trip, traction power will cut off)",
    actions: [
      "【उप-असामान्य संकेत / कार्यवाही जो करनी है (Sub-abnormal Indication / Action to Take)】",
      "• Check position of both HVSI switches. If both HVSI are normal - place HVSI-1 and HVSI-2 to position \"3\", close DJ/VCB. Check operation of MVSI-1 and MVSI-2 blowers: (दोनों HVSI की पोजीशन चेक करें। यदि दोनों HVSI सामान्य हैं तो – HVSI-1 और HVSI-2 को \"3\" पर रखें, DJ/VCB क्लोज करें। MVSI-1 और MVSI-2 ब्लोअरों का काम चेक करें:)",
      "a) If any blower is not working: Isolate the concerned block. ((a) यदि कोई ब्लोअर काम नहीं करता तो - संबंधित ब्लॉक को आइसोलेट करें।)",
      "b) If both blowers are working: Take one notch: ((b) यदि दोनों ब्लोअर काम करते हैं तो एक नोच लें:)",
      "i) If DJ/VCB does not trip: Identify the defective QVSI relay and isolate it by placing the concerned switch to \"3\". (i) यदि DJ/VCB ट्रिप नहीं होता है तो - खराबी वाली QVSI का पता लगाएं और संबंधित स्विच को \"3\" पर रखकर उसे आइसोलेट करें।)",
      "ii) If DJ/VCB trips: Operate GR manually by hand. (ii) यदि DJ/VCB ट्रिप होता है तो - GR को हाथ से ऑपरेट करें।)"
    ]
  },
  {
    id: "CONV-DJ-TRIP-SIXTH-NOTCH",
    subSystem: "SS01",
    message: "छठी नोच पर DJ/VCB ट्रिप होता है।\nDJ/VCB TRIPS ON 6th NOTCH\n(6th नोच पर डीजे ट्रिपिंग / कॉन्टैक्टर C107, C105, C106 क्लोज न होना अथवा रिले Q100, CCA, Q118)",
    lamp: "LSDJ प्रकाशित होगा, 6 नोच लेते ही DJ ट्रिप होगा (LSDJ will glow, DJ trips on taking 6th notch)",
    effect: "DJ/VCB ट्रिप होगा, गाड़ी में ट्रैक्शन कट जाएगा (DJ/VCB will trip, traction power will cut off)",
    actions: [
      "【उप-असामान्य संकेत / कार्यवाही जो करनी है (Sub-abnormal Indication / Action to Take)】",
      "• Close DJ/VCB, close BLVMT and check that contactors C107, C105 and C106 are closed: (DJ/VCB क्लोज करें, BLVMT क्लोज करें और C107, C105 और C106 का क्लोज होना चेक करें:)",
      "a) If any contactor does not close: Troubleshoot, if necessary wedge it. (To close DJ/VCB, place the concerned switch to \"0\" or \"3\"). ((a) यदि कोई कॉन्टैक्टर क्लोज नहीं होता है तो ट्रबल शूट करें, आवश्यक हो तो उसे वेज करें। (DJ/VCB क्लोज करने के लिये संबंधित स्विच को “0” या “3” पर रखें))",
      "• Note: If any contactor does not close, check Q100 and CCA fuse before troubleshooting. (नोट :- यदि कोई कॉन्टैक्टर क्लोज नहीं होता है तो ट्रबल शूट करने से पहले Q100 और CCA चेक करें।)",
      "b) If all three contactors are closed: Place HVMT-1 and HVMT-2 to \"3\" and close DJ/VCB: ((b) यदि तीनों कॉन्टैक्टर क्लोज हैं तो HVMT-1 और HVMT-2 को “3” पर रखकर DJ/VCB क्लोज करें:)",
      "i) If successful: Work train while monitoring the operation of blowers. (i) यदि सफलता मिलती है तो ब्लोअरों का काम चेक करते हुए गाड़ी चलाएं।)",
      "ii) If not successful: Wedge relay Q118. (ii) यदि सफलता नहीं मिलती है तो Q118 को वेज करें।)"
    ]
  },
  {
    id: "CONV-DJ-TRIP-DIFFERENT-NOTCHES",
    subSystem: "SS01",
    message: "भिन्न-भिन्न नोच पर DJ/VCB ट्रिप होता है – अर्थात बिना किसी स्पष्ट कारण के DJ/VCB ट्रिप होता है।\nDJ/VCB TRIPS ON DIFFERENT NOTCHES - i.e. TRIPPING WITHOUT ANY APPARENT REASON\n(अनिश्चित नोच पर डीजे ट्रिपिंग / रिले Q118 वेजिंग, स्विच HVSI-1/2 व GR हस्त प्रचालन)",
    lamp: "LSDJ प्रकाशित होगा, किसी भी नोच पर अचानक DJ ट्रिप होगा (LSDJ will glow, DJ trips unexpectedly on random notches)",
    effect: "DJ/VCB ट्रिप होगा, गाड़ी में ट्रैक्शन कट जाएगा (DJ/VCB will trip, traction power will cut off)",
    actions: [
      "【उप-असामान्य संकेत / कार्यवाही जो करनी है (Sub-abnormal Indication / Action to Take)】",
      "a) Wedge relay Q118 with approved procedure. ((a) Q118 को वेज करें।)",
      "b) Place HVSI-1 and HVSI-2 to position \"3\". ((b) HVSI-1 और HVSI-2 को \"3\" पर रखें।)",
      "c) If not successful: Control / operate GR manually by hand. ((c) यदि सफलता नहीं मिलती तो GR को हाथ से कंट्रोल करें।)"
    ]
  },
  {
    id: "CONV-BLCP-MR-PRESSURE-NOT-BUILDING",
    subSystem: "SS01",
    message: "BLCP क्लोज करने पर MR प्रेशर नहीं बनता है\nMR PRESSURE DOES NOT BUILD ON CLOSING BLCP\n(कंप्रेसर स्विच ऑन करने पर एमआर प्रेशर न बनना / MCP कार्य व न्यूमैटिक लीकेज जांच)",
    lamp: "MR प्रेशर गेज पर प्रेशर नहीं बढ़ेगा (MR pressure gauge will not rise, remains low)",
    effect: "लोको व गाड़ी में न्यूमैटिक प्रेशर (MR/BP) नहीं बनेगा, ब्रेक व पैंटो ऑपरेशन बाधित होगा (Pneumatic pressure will not build, brakes & panto will be affected)",
    actions: [
      "• Check MCP. (MCP चेक करें:)",
      "【(A) यदि MCP काम नहीं करता है तो (DJ/VCB को क्लोज हालत में रखने के लिये CPA चालू करें) / Sub-condition (A): If MCP does not work (run CPA to keep DJ/VCB closed)】:",
      "a) Open BLCP and close BLCPD. ((a) BLCP ओपन करें और BLCPD क्लोज करें।)",
      "b) Ensure HCP is not at \"0\". Change position of HCP switch and attempt to run other MCP. ((b) HCP \"0\" पर नहीं है, सुनिश्चित करें। HCP की पोजीशन बदलकर दूसरा MCP चलाने का प्रयत्न करें।)",
      "c) Check Q100 (start blowers); if Q100 is not energized: ((c) Q100 चेक करें (ब्लोअर चालू करें) यदि इनर्जाइज नहीं है तो:)",
      "i) Check CCA fuse (if necessary operate HOBA) (Chapter-7, Failure No. 14, 15, Page No. 53). (i) CCA चेक करें (यदि आवश्यक हो तो HOBA का उपयोग करें) (अध्याय-7, फेलियर क्र. 14, 15 पृष्ठ क्र. 53))",
      "ii) Wedge relay Q100. (ii) Q100 को वेज करें।)",
      "d) If Q100 is energized: Check contactors closing. If contactors C-101 / C-102 / C-103 are not closing, troubleshoot and wedge them as required. ((d) यदि Q100 इनर्जाइज है तो कॉन्टैक्टरों का क्लोजिंग चेक करें। यदि कॉन्टैक्टर C-101/C-102/C-103 क्लोज नहीं हुए हैं तो ट्रबल शूट करें, आवश्यकतानुसार उन्हें वेज करें।)",
      "• Note: If no independent auxiliary works: Wedge any two (2) contactors out of C-101 / C-102 / C-103 as required. Wedge Q-118 and clear section with 450 Amp traction motor current. (नोट :- यदि कोई भी स्वतंत्र ऑग्जीलरी नहीं चलती तो C-101 / C-102 / C-103 में से कोई भी दो (2) कॉन्टैक्टरों को आवश्यकतानुसार वेज करें। Q-118 वेज करके 450 Amp से सेक्शन क्लियर करें।)",
      "【(B) यदि MCP काम करता है तो / Sub-condition (B): If MCP works】:",
      "a) Ensure A-9 / SA-9 cut-out cocks are open in the driving cab. ((a) ड्राइविंग कैब में A-9 / SA-9 के कट-आउट कॉक खुले हैं, सुनिश्चित करें।)",
      "b) Open BLCP and close BLCPD. ((b) BLCP ओपन करें और BLCPD क्लोज करें।)",
      "c) Change position of HCP switch and attempt to create pressure by starting other MCPs. ((c) HCP की पोजीशन बदली करें और दूसरे MCP चालू कर प्रेशर बनाने का प्रयत्न करें।)",
      "d) Ensure MR-4 cut-out cock is open and MR drain cocks are closed. ((d) MR-4 कट-आउट कॉक खुला और MR ड्रेन कॉक बंद है, सुनिश्चित करें।)",
      "e) Ensure all angle cocks are closed. ((e) सभी एंगल कॉक क्लोज हैं, सुनिश्चित करें।)",
      "f) If there is leakage from Auto Drain Valve / VEAD Valve / Unloader Valve / Sanding Valve / IP Magnet Valve / Safety Valve: Close the concerned COC. ((f) यदि ऑटो ड्रेन वाल्व / VEAD वाल्व / अनलोडर वाल्व / सेंडिंग वाल्व / IP मैग्नेट वाल्व / सेफ्टी वाल्व से लीकेज है तो संबंधित COC बंद करें।)",
      "g) If leakage is from Air Dryer: Close \"A\" and \"B\" cocks, and OPEN \"C\" (by-pass) cock. ((g) यदि एयर ड्रायर से लीकेज है तो \"A\" और \"B\" कॉक बंद करें एवं \"C\" कॉक खोलें।)",
      "h) If there is heavy leakage anywhere in pneumatic equipment, inspect and rectify. ((h) न्यूमैटिक उपकरणों में कहीं अत्यधिक लीकेज (Heavy leakage) हो तो उसकी जांच करें।)"
    ]
  },
  {
    id: "CONV-MPH-NOT-WORKING",
    subSystem: "SS01",
    message: "MPH काम नहीं करता है\nMPH (TRANSFORMER OIL PUMP) DOES NOT WORK\n(ट्रांसफॉर्मर ऑयल पंप मोटर MPH का कार्य न करना / HPH स्विच व 450A प्रतिबंध)",
    lamp: "तेल सर्कुलेशन नहीं होगा, रिले QPH इनर्जाइज नहीं होगी (No oil circulation, relay QPH will not energize)",
    effect: "ट्रांसफॉर्मर तेल गर्म हो सकता है; MPH आइसोलेट करने पर ट्रैक्शन करंट 450A तक सीमित (Transformer oil temperature may rise; traction current limited to 450A)",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) Ensure HPH is at position \"1\". ((a) HPH \"1\" पर है, सुनिश्चित करें।)",
      "b) Place HPH switch to \"0\" and isolate MPH. ((b) HPH को \"0\" पर रखकर MPH को आइसोलेट करें।)",
      "c) Clear section with 450 Amp traction motor current. ((c) 450 एम्पीयर से सेक्शन क्लियर करें।)"
    ]
  },
  {
    id: "CONV-MVSI-NOT-WORKING",
    subSystem: "SS01",
    message: "MVSI-1 / MVSI-2 काम नहीं करता है\nMVSI-1 / MVSI-2 (SILICON RECTIFIER BLOWER) DOES NOT WORK\n(सिलिकॉन रेक्टिफायर ब्लोअर मोटर का कार्य न करना / ब्लॉक आइसोलेशन व आधा लोड नियम)",
    lamp: "रिले QVSI पिकअप नहीं होगी, LSDJ प्रकाशित हो सकता है (Relay QVSI will not pick up, LSDJ may glow)",
    effect: "रेक्टिफायर ठंडा नहीं होगा; संबंधित ब्लॉक को आइसोलेट करना होगा (Rectifier will overheat; concerned block must be isolated)",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) Ensure concerned switch HVSI-1 / HVSI-2 is on position \"1\". ((a) HVSI-1 / HVSI-2 “1” पर है, सुनिश्चित करें।)",
      "b) Isolate the concerned block by placing concerned switches HVSI, HVMT and HVSL to position \"0\". Work train with half of the permissible load. ((b) संबंधित HVSI, HVMT और HVSL को “0” पर रखकर ब्लॉक को आइसोलेट करें। अनुमत (Permissible) लोड के आधे लोड से काम करें।)"
    ]
  },
  {
    id: "CONV-MVSL-NOT-WORKING",
    subSystem: "SS01",
    message: "MVSL-1 / MVSL-2 काम नहीं करता है\nMVSL-1 / MVSL-2 (SMOOTHING REACTOR BLOWER) DOES NOT WORK\n(स्मूदिंग रिएक्टर ब्लोअर मोटर MVSL का कार्य न करना / ब्लॉक आइसोलेशन व आधा लोड नियम)",
    lamp: "रिले QVSL पिकअप नहीं होगी, LSDJ प्रकाशित हो सकता है (Relay QVSL will not pick up, LSDJ may glow)",
    effect: "स्मूदिंग रिएक्टर SL गर्म हो सकता है; संबंधित ब्लॉक आइसोलेट करना होगा (Smoothing reactor will overheat; concerned block must be isolated)",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) Ensure concerned switch HVSL-1 / HVSL-2 is on position \"1\". ((a) HVSL-1 / HVSL-2 “1” पर है, सुनिश्चित करें।)",
      "b) Isolate the concerned block by placing concerned switches HVSI, HVMT and HVSL to position \"0\". Work train with half of the permissible load. ((b) संबंधित HVSI, HVMT और HVSL को “0” पर रखकर ब्लॉक को आइसोलेट करें। अनुमत (Permissible) लोड के आधे लोड से कार्य करें।)"
    ]
  },
  {
    id: "CONV-MVMT-NOT-WORKING",
    subSystem: "SS01",
    message: "MVMT-1 / MVMT-2 चालू नहीं होता है\nMVMT-1 / MVMT-2 (TRACTION MOTOR BLOWER) DOES NOT START\n(ट्रैक्शन मोटर ब्लोअर मोटर MVMT का चालू न होना / कॉन्टैक्टर C107, C105, C106 व ब्लॉक आइसोलेशन)",
    lamp: "रिले QVMT पिकअप नहीं होगी, LSDJ प्रकाशित हो सकता है (Relay QVMT will not pick up, LSDJ may glow)",
    effect: "ट्रैक्शन मोटरें ठंडी नहीं होंगी; ब्लोअर चालू न होने पर संबंधित ब्लॉक आइसोलेट करना होगा (Traction motors will overheat; concerned block must be isolated)",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) Ensure concerned switch HVMT-1 / HVMT-2 is on position \"1\". ((a) HVMT-1 / HVMT-2 “1” पर है, सुनिश्चित करें।)",
      "b) Ensure contactor C107 is closed. If C107 does not close, troubleshoot; if necessary, wedge it. ((b) C107 क्लोज है, सुनिश्चित करें। यदि C107 क्लोज नहीं होता तो ट्रबल शूट करें, यदि आवश्यक हो तो उसे वेज करें।)",
      "c) Check closing of contactors C105 / C106. If C105 / C106 is closed but MVMT-1 / MVMT-2 does not start, isolate the concerned block by placing the concerned switches to position \"0\". ((c) C105 / C106 का क्लोज होना चेक करें। यदि C105 / C106 क्लोज है परंतु MVMT-1 / MVMT-2 चालू नहीं होता है तो संबंधित स्विचों को “0” पर रखकर ब्लॉक आइसोलेट करें।)"
    ]
  },
  {
    id: "CONV-MVRH-NOT-WORKING",
    subSystem: "SS01",
    message: "MVRH चालू नहीं होता है\nMVRH (TRANSFORMER OIL COOLING RADIATOR BLOWER) DOES NOT START\n(यदि BLVMT क्लोज करने पर तीनों ब्लोअर नहीं चलते हैं तो 1 नोच लेकर देखें / HVRH, C107, Q118 वेज व HC-107 नियम)",
    lamp: "रिले QVRH पिकअप नहीं होगी, LSDJ प्रकाशित हो सकता है (Relay QVRH will not pick up, LSDJ may glow)",
    effect: "ट्रांसफॉर्मर तेल ठंडा नहीं होगा; MVRH आइसोलेट करने पर Q118 वेज कर अधिकतम 450A से 1-2 सेक्शन क्लियर करें (Transformer oil will overheat; clear 1-2 sections at max 450A)",
    actions: [
      "• यदि BLVMT क्लोज करने पर तीनों ब्लोअर नहीं चलते हैं तो 1 नोच लेकर देखें: (If all 3 blowers do not start on closing BLVMT, take 1 notch and check:)",
      "a) Ensure MCP is working (i.e. relay Q100 is energized). If MCP does not work, troubleshoot for MCP first. ((a) MCP काम करता है, सुनिश्चित करें (अर्थात Q100 इनर्जाइज है)। यदि काम नहीं करता तो पहले MCP के लिये ट्रबल शूट करें।)",
      "b) Ensure switch HVRH is on position \"1\". ((b) HVRH “1” पर है, सुनिश्चित करें।)",
      "c) If contactor C107 does not close: Troubleshoot, if necessary wedge it. (To close DJ/VCB, place HVRH to \"0\" or \"3\"). ((c) यदि C107 क्लोज नहीं होता तो ट्रबल शूट करें। यदि आवश्यक हो तो उसे वेज करें (DJ/VCB क्लोज करने के लिये HVRH को “0”/“3” पर रखें)।)",
      "d) If C107 is closed but MVRH does not start: Isolate MVRH by placing HVRH to position \"0\". Wedge relay Q-118 with approved procedure. Clear one or two block sections with maximum 450 Amp traction motor current. ((d) यदि C107 क्लोज है परंतु MVRH चालू नहीं होता तो HVRH को “0” पर रखकर MVRH को आइसोलेट करें। Q-118 को वेज करें। 450 Amp से एक या दो सेक्शन क्लियर करें।)",
      "• Note (If HC-107 is provided on TB Panel): In microprocessor locomotives, when HVRH is kept on \"0\" position, operate switch HC-107 so that DJ/VCB does not trip on 6th notch, and clear section with 450 Amp. (नोट :- [TB Panel पर यदि HC-107 हो तो]: माइक्रोप्रोसेसर लोको में जब HVRH \"0\" पोजीशन पर रखा हो, HC-107 को ऑपरेट करें ताकि 6th नोच पर DJ/VCB ट्रिप न हो, 450 amp से सेक्शन क्लियर करें।)"
    ]
  },
  {
    id: "CONV-AUX-DAMAGED-BURNT",
    subSystem: "SS01",
    message: "यदि कोई ऑक्सिलरी क्षतिग्रस्त (Damage) हो गई है अथवा जल गई है\nIF ANY AUXILIARY IS DAMAGED OR BURNT OUT\n(ऑक्सिलरी मोटर में आग/धुआं, जलने या क्षति होने पर सुरक्षा व आइसोलेशन नियम: MPH, MVSL, MVSI, MVMT, MCP, MVRH)",
    lamp: "धुआं या आग दिखाई दे सकती है, LSDJ / QOA / QLA / QRSI ट्रिप हो सकता है (Smoke/fire visible, LSDJ/QOA/QLA/QRSI may trip)",
    effect: "संबंधित ऑक्सिलरी ठप; बोगी/मोटर आइसोलेट करनी होगी, आधा लोड या 450A सीमा में कार्य करना होगा (Auxiliary damaged; isolate unit, work with half load or 450A limit)",
    actions: [
      "【सामान्य कार्यवाही (General Actions)】:",
      "a) If fire or smoke is visible: Lower pantograph immediately, halt the train. ((a) यदि आग या धुआं दिखाई देता है तो पैंटोग्राफ को लोअर करें, गाड़ी खड़ी करें।)",
      "b) Use Fire Extinguisher to extinguish the fire. ((b) आग बुझाने के लिये अग्निशामक यंत्र (Fire extinguisher) का उपयोग करें।)",
      "c) Isolate the burnt auxiliary by placing its concerned rotary switch to \"0\". ((c) जली हुई ऑक्सिलरी के संबंधित स्विच को “0” पर रखकर उसे आइसोलेट करें।)",
      "d) Always ensure that the contactor of the burnt auxiliary is fully open before energizing locomotive. ((d) लोको इनर्जाइज करने से पहले हमेशा सुनिश्चित करें कि जली हुई संबंधित ऑक्सिलरी का कॉन्टैक्टर पूरी तरह से खुल गया है।)",
      "e) Perform TSD of the concerned auxiliary as detailed below (also refer failures 1 to 7). ((e) नीचे बताये अनुसार संबंधित ऑक्सिलरी की TSD करें। [फेलियर क्र. 1 से 7 भी देखें])",
      "【1. MPH जल गई है (MPH Burnt Out)】:",
      "a) Place switch HPH to \"0\" to isolate MPH. ((a) MPH को आइसोलेट करने के लिये HPH को “0” पर रखें।)",
      "b) Clear section with maximum 450 Ampere traction motor current. ((b) 450 एम्पीयर से सेक्शन क्लियर करें।)",
      "【2. MVSL-1 या MVSI-1 या MVMT-1 जल गई है (Bogie-1 Burnt Auxiliary: MVSL-1 / MVSI-1 / MVMT-1)】:",
      "a) Place switches HVSI-1, HVMT-1 and HVSL-1 to \"0\". ((a) HVSI-1, HVMT-1 और HVSL-1 को “0” पर रखें।)",
      "b) Work train with half of the permissible load. ((b) अनुमत (Permissible) लोड के आधे से कार्य करें।)",
      "c) If DJ/VCB trips on 6th notch, wedge relay Q118. ((c) यदि छठी नोच पर DJ/VCB ट्रिप होता है तो Q118 को वेज करें।)",
      "【3. MVSL-2 या MVSI-2 या MVMT-2 जल गई है (Bogie-2 Burnt Auxiliary: MVSL-2 / MVSI-2 / MVMT-2)】:",
      "a) Place switches HVSI-2, HVMT-2 and HVSL-2 to \"0\". ((a) HVSI-2, HVMT-2 और HVSL-2 को “0” पर रखें।)",
      "b) Work train with half of the permissible load. ((b) अनुमत (Permissible) लोड के आधे से कार्य करें।)",
      "c) If DJ/VCB trips on 6th notch, wedge relay Q118. ((c) यदि छठी नोच पर DJ/VCB ट्रिप होता है तो Q118 को वेज करें।)",
      "【4. MCP-1 / MCP-2 / MCP-3 जल गई है (Main Compressor Burnt Out)】:",
      "a) Place switch HCP to such a position where the burnt MCP gets isolated. Ensure that the contactor of the burnt MCP is fully open. ((a) HCP को ऐसी पोजीशन पर रखें, जिस पर जली हुई MCP आइसोलेट हो जाये। संबंधित MCP का कॉन्टैक्टर पूरी तरह से खुल गया है, सुनिश्चित करें।)",
      "【5. MVRH जल गई है (Radiator Blower Burnt Out)】:",
      "a) Place switch HVRH to \"0\". ((a) HVRH को “0” पर रखें।)",
      "b) Wedge relay Q118. ((b) Q118 को वेज करें।)",
      "c) Clear section with maximum 450 Ampere traction motor current. ((c) 450 एम्पीयर से सेक्शन क्लियर करें।)"
    ]
  },
  {
    id: "CONV-CHBA-NOT-WORKING",
    subSystem: "SS01",
    message: "CHBA काम नहीं करता है (DJ ट्रिप हुये बिना LSCHBA लैम्प प्रकाशित रहता है)\nCHBA (BATTERY CHARGER) NOT WORKING (LSCHBA GLOWS WITHOUT DJ TRIPPING)\n(बैटरी चार्जर कार्य न करना / HCHBA स्विच व एमीटर डिस्चार्जिंग/चार्जिंग करंट जांच)",
    lamp: "LSCHBA लैम्प लगातार प्रकाशित रहेगा (DJ ट्रिप हुए बिना) (LSCHBA lamp remains glowing without DJ tripping)",
    effect: "बैटरी चार्ज नहीं होगी; यदि डिस्चार्जिंग रही तो बैटरी वोल्टेज कम हो सकता है (Battery will not charge; battery voltage may drop if discharging)",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) Check position of switch HCHBA, it must be on \"1\". ((a) HCHBA की पोजीशन चेक करें, \"1\" पर होनी चाहिये।)",
      "b) Check CHBA ammeter: ((b) CHBA का एमीटर चेक करें:)",
      "i) If ammeter needle indicates discharging current: Place HCHBA to \"0\". Work with battery voltage. (Also refer Chapter 11 - Failure No. 7, Page No. 72-73). ((i) यदि एमीटर की सुई डिस्चार्जिंग करंट बताती है तो HCHBA को \"0\" पर रखें। बैटरी वोल्टेज से कार्य करें। (अध्याय 11-फेलियर क्र. 7 पृष्ठ क्र. 72-73 भी देखें))",
      "ii) If ammeter needle indicates charging current: Do not worry about LSCHBA - work train keeping watch on charging current. ((ii) यदि एमीटर की सुई चार्जिंग करंट बताती है तो LSCHBA की परवाह न करें - चार्जिंग करंट पर ध्यान रखकर गाड़ी चलाएं।)"
    ]
  },
  {
    id: "CONV-FUSES-MELTING-FAILURES",
    subSystem: "SS01",
    message: "फ्यूज पिघलने के फेलियर (विभिन्न फ्यूज के पिघलने पर मिलने वाले संकेत)\nINDICATIONS ON MELTING OF DIFFERENT FUSES IN CONVENTIONAL LOCOMOTIVES\n(कन्वेंशनल लोको में VCD तथा IPMV को सप्लाई CCLS से दी गई है / Additional CCBA, CCBA, CCPT, CCVCD, CCINV, CCA, CCLS, CCDJ, CCLSA)",
    lamp: "पायलट लैम्प बुझना, LSGR / LSDBR बुझना, VCD हेल्दी लैम्प बुझना, UBA बैटरी वोल्टेज शून्य (Pilot lamps extinguish, LSGR/LSDBR extinguish, VCD healthy lamp extinguishes, UBA battery voltage '0' or normal)",
    effect: "कंट्रोल सर्किट व ऑक्ज़ीलरी सप्लाई बाधित; VCB/DJ ट्रिप, ऑटो रिग्रेशन, पैंटो लोअर, कंप्रेसर/ब्लोअर बंद, या इमरजेंसी ब्रेक (Control circuit & auxiliary supply interrupted; VCB/DJ trip, auto regression, panto drops, compressors/blowers stop, or emergency brake application)",
    actions: [
      "• नोट: कन्वेंशनल लोको में VCD तथा IPMV को सप्लाई CCLS से दी गई है। (Note: In conventional locos, supply to VCD and IPMV is provided from CCLS).",
      "【1. एडिशनल CCBA पिघलने पर (Additional CCBA Fuse Melted)】:",
      "• चालू गाड़ी में जब तक DJ/VCB क्लोज है, एडिशनल CCBA पिघलने का पता नहीं चलता है। बैटरी चार्ज होना बंद हो जाती है।",
      "• जब DJ/VCB ओपन होता है या किया जाता है तब निम्नलिखित संकेत मिलते हैं:",
      "1) पैंटो लोअर हो जाएगा। ((1) Pantograph will lower).",
      "2) यदि GR नोच पर है तो रिग्रेशन नहीं होगा। LSGR पायलट लैम्प बुझा रहेगा। ((2) If GR is on notch, regression will not occur. LSGR pilot lamp will remain extinguished).",
      "3) सभी पायलट लैम्प बुझ जाएंगे। ((3) All pilot lamps will extinguish).",
      "4) LSDBR लैम्प बुझ जाएगा। ((4) LSDBR lamp will extinguish).",
      "5) ZUBA दबाने पर UBA बैटरी वोल्टेज ‘0’ बताएगी। ((5) On pressing ZUBA, UBA will indicate battery voltage '0').",
      "6) फ्यूज टेस्टर ECC कार्य नहीं करेगा। ((6) Fuse tester ECC will NOT work).",
      "7) IP Magnet valve COC खुला है तो BP प्रेशर ड्रॉप होगा और गाड़ी में इमरजेंसी ब्रेक लग जाएगी। ((7) If IP Magnet valve COC is open, BP pressure will drop and emergency brake will apply).",
      "8) विजिलेंस कंट्रोल डिवाइस {VCD} डिस्प्ले यूनिट का HEALTHY लैम्प बुझ जाएगा। ((8) Vigilance Control Device {VCD} Display unit HEALTHY lamp will extinguish).",
      "【2. CCBA पिघलने पर (CCBA Fuse Melted)】:",
      "• चालू गाड़ी में जब तक DJ/VCB क्लोज है, CCBA पिघलने का पता नहीं चलता है। बैटरी चार्ज होना बंद हो जाती है।",
      "• जब DJ/VCB ओपन होता है या किया जाता है तब निम्नलिखित संकेत मिलते हैं:",
      "1) पैंटो लोअर हो जाएगा। ((1) Pantograph will lower).",
      "2) यदि GR नोच पर है तो रिग्रेशन नहीं होगा। LSGR पायलट लैम्प बुझा रहेगा। ((2) If GR is on notch, regression will not occur. LSGR pilot lamp will remain extinguished).",
      "3) LSGR लैम्प को छोड़कर सभी पायलट लैम्प प्रकाशित रहेंगे। ((3) Except LSGR lamp, all other pilot lamps will remain glowing).",
      "4) LSDBR लैम्प बुझ जाएगा। ((4) LSDBR lamp will extinguish).",
      "5) ZUBA दबाने पर UBA सामान्य बैटरी वोल्टेज बताएगी। ((5) On pressing ZUBA, UBA will indicate normal battery voltage).",
      "6) फ्यूज टेस्टर ECC कार्य करेगा। ((6) Fuse tester ECC will work).",
      "【3. CCPT पिघलने पर (CCPT Fuse Melted - Panto & DJ Control Circuit)】:",
      "1) DJ/VCB ओपन हो जाएगा। ((1) DJ/VCB will open).",
      "2) पैंटो लोअर हो जाएगा। ((2) Pantograph will lower).",
      "3) यदि GR नोच पर है तो रिग्रेशन नहीं होगा। LSGR पायलट लैम्प बुझा रहेगा। ((3) If GR is on notch, regression will not occur. LSGR pilot lamp will remain extinguished).",
      "4) बाकी सभी पायलट लैम्प प्रकाशित रहेंगे। ((4) All remaining pilot lamps will remain glowing).",
      "5) LSDBR लैम्प बुझ जाएगा। ((5) LSDBR lamp will extinguish).",
      "6) ZUBA दबाने पर UBA सामान्य बैटरी वोल्टेज बताता है। ((6) On pressing ZUBA, UBA indicates normal battery voltage).",
      "7) फ्यूज टेस्टर ECC कार्य करेगा। ((7) Fuse tester ECC will work).",
      "【4. CCVCD पिघलने पर (CCVCD Fuse Melted - Vigilance Control)】:",
      "• VCD कार्य नहीं करेगी। ((4) VCD will not work).",
      "【5. CCINV पिघलने पर (CCINV Fuse Melted - Static Inverter)】:",
      "• SI UNIT (स्टैटिक इनवर्टर) नहीं चलेगी। ((5) SI UNIT will not run).",
      "【6. CCA पिघलने पर (CCA Fuse Melted - Auxiliaries Control)】:",
      "1) मेन कम्प्रेशर व ब्लोअर नहीं चलेंगे। ((1) Main compressors and blowers will not run).",
      "2) यदि GR पाँच (5) से अधिक नोच पर है तो DJ/VCB ट्रिप हो जाएगा। ((2) If GR is on more than 5th notch, DJ/VCB will trip).",
      "【7. CCLS (10A) पिघलने पर (CCLS 10A Fuse Melted - Signalling & Pilot Lamps)】:",
      "1) सभी पायलट लैम्प बुझ जाएंगे। ((1) All pilot lamps will extinguish).",
      "2) QRS डी-एनर्जाइज हो जाने की वजह से ऑटो रिग्रेशन होगा। कर्षण बल (Tractive Effort) की पूर्ण हानि होगी। ((2) Due to QRS de-energization, auto-regression will occur with total loss of tractive effort).",
      "3) IP Magnet valve COC खुला है तो BP प्रेशर ड्रॉप होगा और गाड़ी में इमरजेंसी ब्रेक लग जाएगी। ((3) If IP Magnet valve COC is open, BP pressure will drop and emergency brake will apply).",
      "4) विजिलेंस कंट्रोल डिवाइस {VCD} डिस्प्ले यूनिट का HEALTHY लैम्प बुझ जाएगा। ((4) Vigilance Control Device {VCD} Display unit HEALTHY lamp will extinguish).",
      "【8. CCDJ पिघलने पर (CCDJ Fuse Melted - DJ Control Circuit)】:",
      "• DJ/VCB ट्रिप होगा। ऑटो रिग्रेशन होगा। ((8) DJ/VCB will trip. Auto-regression will take place).",
      "【9. CCLSA पिघलने पर (CCLSA Fuse Melted - AFL & Sanders)】:",
      "1) AFL कार्य नहीं करेगी। ((1) AFL will not work).",
      "2) सैंडर्स (Sanders) कार्य नहीं करेंगे। ((2) Sanders will not work).",
      "【फ्यूज बदलने की अनिवार्य सुरक्षा प्रक्रिया (Safety Procedure for Replacing Fuses)】:",
      "• नोट :- CCBA / ADD CCBA / CCPT पिघलता है तो पहले GR को हाथ से “0” पर लाएं। MP, MPJ व ZPT को पोजीशन 0 पर रखें, IP MAGNET VALVE का COC बंद करें, HBA को ऑफ (OFF) पर रखें और उसके बाद फ्यूज बदली करें।",
      "a) एक बार फ्यूज बदल दें। ((a) Replace fuse once.)",
      "b) यदि फिर भी पिघलता है तो HOBA को “ऑफ” पर रखें और फ्यूज बदली करें। ((b) If it melts again, place HOBA to \"OFF\" and replace fuse.)"
    ]
  },
  {
    id: "CONV-CCBA-MELTED-ACTION",
    subSystem: "SS01",
    message: "CCBA पिघलता है (फ्यूज बदलना व HOBA स्विच नियम)\nCCBA FUSE MELTS - ACTION TO TAKE\n(एक बार फ्यूज बदलना / दोबारा पिघलने पर HOBA 'ऑफ' पर रखना / GR हाथ से 0, MP/MPJ/ZPT 0, IP COC बंद, HBA ऑफ)",
    lamp: "LSGR को छोड़कर सभी पायलट लैम्प जलते रहेंगे, LSDBR बुझ जाएगा, UBA सामान्य वोल्टेज",
    effect: "बैटरी चार्जिंग बंद; DJ ओपन होने पर पैंटो लोअर, नोच पर रिग्रेशन नहीं",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) एक बार फ्यूज बदल दें। ((a) Replace fuse once.)",
      "b) यदि फिर भी पिघलता है तो HOBA को “ऑफ” पर रखें और फ्यूज बदली करें। ((b) If it melts again, place HOBA to \"OFF\" and replace fuse.)",
      "【अति-महत्वपूर्ण नोट (सुरक्षा सावधानियां)】:",
      "• नोट :- CCBA / ADD CCBA / CCPT पिघलता है तो पहले GR को हाथ से “0” पर लाएं। MP, MPJ व ZPT को पोजीशन 0 पर रखें, IP MAGNET VALVE का COC बंद करें, HBA को ऑफ (OFF) पर रखें और उसके बाद फ्यूज बदली करें।"
    ]
  },
  {
    id: "CONV-ADD-CCBA-MELTED-ACTION",
    subSystem: "SS01",
    message: "ADD CCBA (एडिशनल CCBA) पिघलता है (फ्यूज बदलना व HOBA स्विच नियम)\nADDITIONAL CCBA FUSE MELTS - ACTION TO TAKE\n(एक बार फ्यूज बदलना / दोबारा पिघलने पर HOBA 'ऑफ' पर रखना / GR हाथ से 0, MP/MPJ/ZPT 0, IP COC बंद, HBA ऑफ)",
    lamp: "सभी पायलट लैम्प बुझ जाएंगे, LSGR/LSDBR बुझ जाएगा, VCD HEALTHY लैम्प बुझ जाएगा, UBA वोल्टेज 0",
    effect: "बैटरी चार्जिंग बंद; DJ ओपन होने पर पैंटो लोअर, नोच पर रिग्रेशन नहीं, इमरजेंसी ब्रेक लग जाना",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) एक बार फ्यूज बदल दें। ((a) Replace fuse once.)",
      "b) यदि फिर भी पिघलता है तो HOBA को “ऑफ” पर रखें और फ्यूज बदली करें। ((b) If it melts again, place HOBA to \"OFF\" and replace fuse.)",
      "【अति-महत्वपूर्ण नोट (सुरक्षा सावधानियां)】:",
      "• नोट :- CCBA / ADD CCBA / CCPT पिघलता है तो पहले GR को हाथ से “0” पर लाएं। MP, MPJ व ZPT को पोजीशन 0 पर रखें, IP MAGNET VALVE का COC बंद करें, HBA को ऑफ (OFF) पर रखें और उसके बाद फ्यूज बदली करें।"
    ]
  },
  {
    id: "CONV-HBA-ON-CCPT-MELTS",
    subSystem: "SS01",
    message: "HBA को ऑन पर रखने पर CCPT पिघलता है\nCCPT FUSE MELTS ON PLACING HBA TO 'ON'\n(HBA ऑन करते ही CCPT फ्यूज पिघल जाना / Q118 की कॉइल चेक करें / सहायता मांगें)",
    lamp: "LSDJ व सभी लैम्प निष्क्रिय, पैंटो नहीं उठेगा (LSDJ inactive, panto will not raise)",
    effect: "CCPT तुरंत पिघल जाता है, पैंटो व DJ कंट्रोल सर्किट एनर्जाइज नहीं होगा (CCPT melts immediately, panto & DJ circuit will not energize)",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) Q118 की कॉइल चेक करें, यदि कॉइल में खराबी है तो सहायता मांगें। ((a) Check coil of relay Q118; if defect is found in coil, demand assistance.)",
      "【सुरक्षा सावधानी (Safety Procedure)】:",
      "• नोट: फ्यूज बदलने से पहले GR को हाथ से “0” पर लाएं, MP, MPJ व ZPT को “0” पर रखें, IP MAGNET VALVE का COC बंद करें और HBA को “ऑफ” पर रखें।"
    ]
  },
  {
    id: "CONV-ZPT-1-CCPT-MELTS",
    subSystem: "SS01",
    message: "ZPT को पोजीशन “1” पर रखने पर CCPT पिघलता है\nCCPT FUSE MELTS ON PLACING ZPT TO POSITION '1'\n(ZPT 1 पर CCPT पिघलना / पैंटो 1 सर्किट दोष / ZPT पोजीशन 2 चयन व दूसरी कैब से प्रयत्न)",
    lamp: "पैंटो नहीं उठेगा, LSDJ जलता रहेगा (Panto will not raise, LSDJ remains glowing)",
    effect: "पैंटो-1 सर्किट में खराबी/शॉर्ट सर्किट; CCPT पिघलने से पैंटो व DJ कंट्रोल सप्लाई बाधित",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) एक बार फ्यूज बदल दें। ((a) Replace fuse once.)",
      "b) यदि फिर से पिघलता है तो HOBA को “ऑफ” पोजीशन पर रखें और फ्यूज बदली करें। ((b) If it melts again, place HOBA to \"OFF\" position and replace fuse.)",
      "c) यदि फिर भी पिघलता है तो ZPT को पहले पोजीशन 2 पर रखें और उसके बाद फ्यूज बदली करें। ((c) If it still melts, place ZPT to position 2 first and then replace fuse.)",
      "d) दूसरी कैब से प्रयत्न करें। ((d) Attempt from the other cab.)"
    ]
  },
  {
    id: "CONV-MPJ-F-R-CCPT-MELTS",
    subSystem: "SS01",
    message: "MPJ को “F” या “R” पर रखने पर CCPT पिघलता है\nCCPT FUSE MELTS ON PLACING MPJ TO 'F' OR 'R'\n(MPJ को F या R पर रखते ही CCPT पिघलना / रिवर्सर J1-J2 व CTF कॉइल टर्मिनल जांच / TWC अलग कर टेप करना / J1, J2, CTF मैनुअल ऑपरेशन / RB का उपयोग न करना)",
    lamp: "LSDJ जलता रहेगा, GR प्रोग्रेस नहीं करेगा (LSDJ remains glowing, GR will not progress)",
    effect: "रिवर्सर J1/J2 या CTF 1/2/3 कॉइल सर्किट में शॉर्ट सर्किट; CCPT पिघलने से दिशा व ट्रैक्शन कंट्रोल बाधित",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) एक बार फ्यूज बदल दें। ((a) Replace fuse once.)",
      "b) यदि फिर से पिघलता है तो HOBA को “ऑफ” पोजीशन पर रखें और फ्यूज बदली करें। ((b) If it melts again, place HOBA to \"OFF\" position and replace fuse.)",
      "c) यदि फिर भी पिघलता है तो पहले J-1, J-2 और CTF1, CTF2, CTF3 के कॉइल टर्मिनल में खराबी चेक करें, उनके TWC निकाल कर टेप कर दें और J-1, J-2 व CTF को हाथ से ऑपरेट करें। फ्यूज बदली करें और गाड़ी चलाने का प्रयत्न करें। ((c) If it still melts, first check defect in coil terminals of J-1, J-2 and CTF1, CTF2, CTF3; remove their TWC and tape them, and operate J-1, J-2 and CTF manually by hand. Replace fuse and attempt to work train.)",
      "d) रेहियोस्टैटिक ब्रेक (RB) का उपयोग न करें। ((d) Do not use Rheostatic Brake.)"
    ]
  },
  {
    id: "CONV-REGRESSION-CCPT-MELTS",
    subSystem: "SS01",
    message: "रिग्रेशन करने पर CCPT पिघलता है\nCCPT FUSE MELTS ON REGRESSION\n(MP को - या 0 पर लाते ही CCPT पिघलना / GR को हाथ से 0 पर लाना / HOBA ऑफ / GR हाथ से ऑपरेट करके सेक्शन क्लियर करना)",
    lamp: "DJ ट्रिप, पैंटो लोअर होगा, LSDJ जल जाएगा (DJ trips, panto lowers, LSDJ glows)",
    effect: "SMGR रिग्रेशन सर्किट में शॉर्ट सर्किट/दोष; रिग्रेशन लेते ही CCPT पिघलकर DJ खुल जाना",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) GR को हाथ से “0” पर लाएं। ((a) Bring GR manually by hand to \"0\".)",
      "b) एक बार फ्यूज बदल दें। ((b) Replace fuse once.)",
      "c) यदि फिर से पिघलता है तो HOBA को “ऑफ” पोजीशन पर रखें और फ्यूज बदली करें। ((c) If it melts again, place HOBA to \"OFF\" position and replace fuse.)",
      "d) फिर भी पिघलता है तो फ्यूज बदलकर GR को हाथ से ऑपरेट करके सेक्शन क्लियर करें। ((d) If it still melts, replace fuse and clear section by operating GR manually by hand.)"
    ]
  },
  {
    id: "CONV-FIRST-NOTCH-CCPT-MELTS",
    subSystem: "SS01",
    message: "पहली नोच लेने पर CCPT पिघलता है\nCCPT FUSE MELTS ON TAKING FIRST NOTCH\n(MP को 1st नोच पर रखते ही CCPT पिघलना / HOBA \"ऑफ\" / GR हाथ से ऑपरेट / RSI ब्लॉक एक-एक करके आइसोलेट करना)",
    lamp: "DJ ट्रिप, पैंटो लोअर होगा, LSDJ जल जाएगा (DJ trips, panto lowers, LSDJ glows)",
    effect: "लाइन कॉन्टैक्टर या प्रोग्रेशन / RSI ब्लॉक कंट्रोल सर्किट में शॉर्ट सर्किट; 1st नोच लेते ही CCPT पिघल जाना",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) एक बार फ्यूज बदल दें। ((a) Replace fuse once.)",
      "b) यदि फिर से पिघलता है तो HOBA को “ऑफ” पोजीशन पर रखें और फ्यूज बदली करें। ((b) If it melts again, place HOBA to \"OFF\" position and replace fuse.)",
      "c) यदि फिर भी पिघलता है तो फ्यूज बदलकर GR को हाथ से ऑपरेट करें। ((c) If it still melts, replace fuse and operate GR manually by hand.)",
      "d) फ्यूज बदलकर एक-एक करके RSI ब्लॉक आइसोलेट करें और गाड़ी चलाने का प्रयत्न करें। ((d) Replace fuse, isolate RSI blocks one by one and attempt to work train.)"
    ]
  },
  {
    id: "CONV-6TH-NOTCH-CCPT-MELTS",
    subSystem: "SS01",
    message: "6 नोच लेने पर CCPT पिघलता है\nCCPT FUSE MELTS ON TAKING 6TH NOTCH\n(6 नोच पर CCPT पिघलना / GR को हाथ से “0” पर लाना / फ्यूज बदलना / EVPHGR के TWC निकाल कर टेप करना)",
    lamp: "DJ ट्रिप, पैंटो लोअर होगा, LSDJ जल जाएगा (DJ trips, panto lowers, LSDJ glows)",
    effect: "EVPHGR कॉइल या सर्किट में शॉर्ट सर्किट; 6th नोच पर EVPHGR इनर्जाइज होते ही CCPT पिघल जाना",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "1. GR को हाथ से “0” पर लाएं। (Bring GR manually by hand to \"0\".)",
      "2. एक बार फ्यूज बदल दें। (Replace fuse once.)",
      "3. EVPHGR के TWC निकाल कर टेप कर दें। (Remove TWC of EVPHGR and tape them properly.)"
    ]
  },
  {
    id: "CONV-MPS-OPERATE-CCPT-MELTS",
    subSystem: "SS01",
    message: "MPS ऑपरेट करने पर CCPT पिघलता है\nCCPT FUSE MELTS ON OPERATING MPS (SHUNTING / FIELD WEAKENING)\n(MPS ऑपरेट करते ही CCPT पिघलना / GR को हाथ से “0” पर लाना / फ्यूज बदलना / MPS की उस पोजीशन का उपयोग न करना)",
    lamp: "DJ ट्रिप, पैंटो लोअर होगा, LSDJ जल जाएगा (DJ trips, panto lowers, LSDJ glows)",
    effect: "शंटिंग कॉन्टैक्टर या MPS फील्ड वीकिंग रेजिस्टेंस सर्किट में शॉर्ट सर्किट",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "1. GR को हाथ से “0” पर लाएं। (Bring GR manually by hand to \"0\".)",
      "2. एक बार फ्यूज बदल दें। (Replace fuse once.)",
      "3. MPS की उस पोजीशन का उपयोग न करें। (Do not use that position of MPS; work without shunting/field weakening.)"
    ]
  },
  {
    id: "CONV-BPSW-PRESS-CCPT-MELTS",
    subSystem: "SS01",
    message: "BPSW दबाने पर CCPT पिघलता है\nCCPT FUSE MELTS ON PRESSING BPSW (SANDING SWITCH)\n(BPSW सैंडिंग स्विच दबाते ही CCPT पिघलना / फ्यूज बदली करना / BPSW का उपयोग न करना)",
    lamp: "DJ ट्रिप, पैंटो लोअर होगा, LSDJ जल जाएगा (DJ trips, panto lowers, LSDJ glows)",
    effect: "सैंडिंग वाल्व कॉइल या BPSW स्विच शाखा में शॉर्ट सर्किट",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "1. फ्यूज बदली करें। (Replace CCPT fuse.)",
      "2. BPSW का उपयोग न करें। (Do not use BPSW sanding switch; work train without electrical sanding.)"
    ]
  },
  {
    id: "CONV-PVEF-PRESS-CCPT-MELTS",
    subSystem: "SS01",
    message: "PVEF दबाने पर CCPT पिघलता है\nCCPT FUSE MELTS ON PRESSING PVEF (LOCO BRAKE RELEASE PEDAL)\n(PVEF पैडल दबाते ही CCPT पिघलना / फ्यूज बदली करना / PVEF न दबाना / रेहियोस्टैटिक ब्रेक का उपयोग न करना)",
    lamp: "DJ ट्रिप, पैंटो लोअर होगा, LSDJ जल जाएगा (DJ trips, panto lowers, LSDJ glows)",
    effect: "VEF वाल्व कॉइल या PVEF स्विच सर्किट में शॉर्ट सर्किट; RB इंटरलॉकिंग प्रभावित",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "1. फ्यूज बदली करें। (Replace CCPT fuse.)",
      "2. PVEF न दबाएं। (Do not press PVEF foot switch.)",
      "3. रेहियोस्टैटिक ब्रेक (RB) का उपयोग न करें। (Do not use Rheostatic Brake.)"
    ]
  },
  {
    id: "CONV-MP-P-CCPT-MELTS",
    subSystem: "SS01",
    message: "MP को “P” पर रखने पर CCPT पिघलता है\nCCPT FUSE MELTS ON PLACING MP TO \"P\" (BRAKING POSITION)\n(MP को P / ब्रेकिंग पर रखते ही CCPT पिघलना / फ्यूज बदली करना / रेहियोस्टैटिक ब्रेक का उपयोग न करना)",
    lamp: "DJ ट्रिप, पैंटो लोअर होगा, LSDJ जल जाएगा (DJ trips, panto lowers, LSDJ glows)",
    effect: "रेहियोस्टैटिक ब्रेकिंग एक्साइटेशन व कंट्रोल सर्किट में शॉर्ट सर्किट",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "1. फ्यूज बदली करें। (Replace CCPT fuse.)",
      "2. रेहियोस्टैटिक ब्रेक (RB) का उपयोग न करें। (Do not use Rheostatic Brake; work train with pneumatic braking only.)"
    ]
  },
  {
    id: "CONV-CCA-MELTS-BL-CLOSED",
    subSystem: "SS01",
    message: "BL स्विचों की क्लोज हालत में CCA पिघलता है (लोको इनर्जाइज हालत में)\nCCA FUSE MELTS IN CLOSED CONDITION OF BL SWITCHES (LOCO ENERGIZED)\n(BL स्विच क्लोज करते ही CCA पिघलना / एक बार CCA बदलना / HOBA “ऑफ” / BLCP, BLCPD, BLVMT ओपन कर एक-एक क्लोज करना / फेलियर क्र. 14 से 15)",
    lamp: "Q100 डी-एनर्जाइज, मेन कंप्रेसर व ब्लोअर बंद, 5 नोच से अधिक पर DJ ट्रिप",
    effect: "BLCP/BLCPD/BLVMT या संबंधित ऑक्सिलरी कॉन्टैक्टर (C101, C102, C103, C105, C106, C107) कंट्रोल सर्किट में अर्थ फॉल्ट / शॉर्ट सर्किट",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) एक बार CCA फ्यूज बदल दें। ((a) Replace CCA fuse once.)",
      "b) यदि CCA फिर से पिघलता है तो HOBA को “ऑफ” पर रखें और फ्यूज बदल दें। ((b) If CCA melts again, place HOBA to \"OFF\" position and replace fuse.)",
      "c) यदि CCA फिर से पिघलता है तो BLCP, BLCPD और BLVMT ओपन करें, फ्यूज बदल दें तथा स्विचों को एक-एक करके क्लोज करें, खराबी वाले सर्किट का पता लगाएं और तदानुसार ट्रबल शूटिंग करें। (फेलियर क्र. 14 से 15) ((c) If CCA melts again, open BLCP, BLCPD, and BLVMT, replace fuse, then close the switches one by one to detect the defective circuit and troubleshoot accordingly - Failures 14 to 15.)"
    ]
  },
  {
    id: "CONV-BLCP-CCA-MELTS",
    subSystem: "SS01",
    message: "BLCP क्लोज करने पर CCA पिघलता है\nCCA FUSE MELTS ON CLOSING BLCP (COMPRESSOR CONTROL CIRCUIT)\n(BLCP क्लोज करते ही CCA पिघलना / C101, C102, C103 व VEAD वाल्व कॉइल व टर्मिनल जांच / HCP पोजीशन / BLCPD / HOBA \"ऑफ\" / दो MCP वेज कर 9.5 kg/cm² प्रेशर)",
    lamp: "Q100 डी-एनर्जाइज, मेन कंप्रेसर बंद, 5 नोच से अधिक पर DJ ट्रिप",
    effect: "C101, C102, C103 या VEAD अनलोडर वाल्व कॉइल में शॉर्ट सर्किट; BLCP क्लोज करते ही CCA पिघलना",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) C 101/ C 102/ C 103 और VEAD वाल्व की कॉइल और टर्मिनल चेक करें। ((a) Check coil and terminals of C-101 / C-102 / C-103 and VEAD valve.)",
      "i) यदि किसी कॉन्टैक्टर की कॉइल में खराबी है तो संबंधित MCP को आइसोलेट करने के लिए HCP की पोजीशन बदली करें। (यदि संबंधित MCP को चलाना जरूरी हो तो खराबी वाली कॉइल के टर्मिनल निकाल दें, कॉन्टैक्टर को वेज कर दें)। ((i) If defect is found in contactor coil, change HCP position to isolate defective MCP. If working that MCP is necessary, remove terminals of defective coil and wedge the contactor.)",
      "ii) यदि VEAD वाल्व में खराबी है तो BLCP ओपन करें और BLCPD से काम करें। ((ii) If defect is in VEAD unloader valve, open BLCP and work train using BLCPD.)",
      "iii) यदि कोई खराबी नहीं है तो: फ्यूज बदली करें। यदि फिर से पिघलता है तो HOBA को “ऑफ” पर रखें और फ्यूज बदली करें। यदि फ्यूज फिर भी पिघलता है तो BLCP और BLCPD क्लोज न करें। दो MCP के कॉन्टैक्टर वेज कर दें और लीकेज पैदा करें, जिससे 9.5 Kg/cm² प्रेशर कायम रहे। ((iii) If no visible defect is found: Replace fuse. If it melts again, place HOBA to \"OFF\" and replace fuse. If it still melts, do not close BLCP and BLCPD; wedge two MCP contactors and create artificial leakage to maintain 9.5 kg/cm² MR pressure.)"
    ]
  },
  {
    id: "CONV-BLVMT-CCA-MELTS",
    subSystem: "SS01",
    message: "BLVMT क्लोज करने पर CCA पिघलता है\nCCA FUSE MELTS ON CLOSING BLVMT (BLOWER MOTORS CONTROL CIRCUIT)\n(BLVMT क्लोज करते ही CCA पिघलना / C105, C106, C107 कॉइल जांच / HOBA \"ऑफ\" / Q118 वेज कर 450A से सेक्शन क्लियर / HVRH, HVMT-1, HVMT-2 से फॉल्टी सर्किट ढूंढना / SI यूनिट लोको नियम)",
    lamp: "ब्लोअर नहीं चलेंगे, 5वीं नोच से अधिक पर DJ ट्रिप, Q100 प्रभावित",
    effect: "ब्लोअर कॉन्टैक्टर C105, C106, C107 या टाइम डिले रिले शाखा में शॉर्ट सर्किट",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) एक बार फ्यूज बदल दें। ((a) Replace fuse once.)",
      "b) यदि फिर से पिघलता है तो HOBA को “ऑफ” पोजीशन पर रखें। फ्यूज बदली करें। ((b) If it melts again, place HOBA to \"OFF\" position and replace fuse.)",
      "c) यदि फिर भी पिघलता है तो C105, C106 और C107 की कॉइल टर्मिनल चेक करें। ((c) If it still melts, check coil terminals of C105, C106, and C107.)",
      "• यदि कोई खराबी पाई जाती है तो खराबी वाली कॉइल के टर्मिनल निकाल दें और कॉन्टैक्टर को वेज कर दें। (If defect is found, remove terminals of defective coil and wedge the contactor.)",
      "• यदि कोई खराबी नहीं पाई जाती और गाड़ी ब्लॉक सेक्शन में है तो एयर ब्रेक गाड़ी कार्य करते समय C-101/ C-102/ C-103 में से दो कॉन्टैक्टर वेज करके, CCA बदले बिना, Q-118 वेज करें और 450 Amp. से सेक्शन क्लियर करें तथा निम्नानुसार ट्रबल-शूट करें: (If no defect found & train is in block section, wedge two contactors out of C101/C102/C103, wedge Q118 without replacing CCA, clear section with max 450A, then troubleshoot as follows:)",
      "  - BLVMT ओपन करें। HVRH, HVMT-1 और HVMT-2 को “0” पर रखें, CCA फ्यूज बदलें और BLVMT क्लोज करें।",
      "  i) यदि CCA कायम रहता है तो: HVRH, HVMT-1 और HVMT-2 को एक-एक करके 10 सेकंड के अंतर से “1” पर रखें और खराबी वाले कंट्रोल सर्किट का पता लगाएं, खराब कॉइल के टर्मिनल निकाल दें और कॉन्टैक्टर को वेज कर दें।",
      "  ii) यदि CCA कायम नहीं रहता है तो: सहायता मांगें।",
      "• नोट (SI Unit लोको): एस आई यूनिट लोको में यदि BLVMT क्लोज करने पर CCA melt होता है तो BLVMT ओपन करें, CCA फ्यूज बदल दें, Q118 को Wedge करें, BLCP क्लोज करके 450 amp से सेक्शन क्लियर करें। ((Note for SI Unit Locos: If CCA melts on closing BLVMT, open BLVMT, replace CCA fuse, wedge Q118, close BLCP and clear section with 450A.))"
    ]
  },
  {
    id: "CONV-LOSS-TRACTIVE-FORCE",
    subSystem: "SS01",
    message: "कर्षण बल की पूर्ण हानि (Total loss of Tractive force) (दोनों एमीटर डेविएट नहीं होते हैं)\nTOTAL LOSS OF TRACTIVE FORCE (BOTH AMMETERS DO NOT DEVIATE)\n(एक नोच लें और LSGR की ओर देखें: (i) यदि LSGR पहले से ही बुझा है, (ii) यदि LSGR नहीं बुझता है, (iii) यदि LSGR बुझ जाता है)",
    lamp: "दोनों ट्रैक्शन मोटर एमीटर डेविएट नहीं होते हैं (0 Amp), LSGR की 3 स्थितियां: पहले से बुझा हुआ / नहीं बुझता / बुझ जाता है",
    effect: "कर्षण बल (Tractive Effort) शून्य; दोनों एमीटर शून्य पर बने रहते हैं और लोको गति नहीं पकड़ता",
    actions: [
      "【प्राथमिक परीक्षण (Initial Action)】:",
      "• एक नोच लें और LSGR की ओर देखें: ((Take 1 notch and observe LSGR pilot lamp:))",
      "---------------------------------------------------------------------------------",
      "【शाखा (i) : यदि LSGR पहले से ही बुझा है (Branch i: If LSGR is already extinguished)】:",
      "• (BPT दबाकर LSRSI तथा LSP प्रकाशित होना चेक करें):",
      "a) यदि CCLS पिघल गया है तो बदली करें। ((a) If CCLS fuse is melted, replace it.)",
      "b) यदि फिर भी पिघलता है तो HOBA को “ऑफ” पर रखें और फ्यूज बदली करें। ((b) If it melts again, place HOBA to \"OFF\" position and replace fuse.)",
      "c) आवश्यकता हो तो QRS वेज करके बिना पायलट लैम्प के गाड़ी चलाएं। ((c) If required, wedge QRS relay and work train without pilot lamps.)",
      "---------------------------------------------------------------------------------",
      "【शाखा (ii) : यदि LSGR नहीं बुझता है (Branch ii: If LSGR does not extinguish)】:",
      "• MP द्वारा प्रयत्न करने पर यदि सफलता नहीं मिलती है तो एक बार EEC द्वारा प्रयत्न करें:",
      "a) LSB चेक करें यदि प्रकाशित है तो:",
      "  - Q-50 चेक करें, यदि इनर्जाइज नहीं है तो J-1 और J-2 सेट हो गये हैं, इसकी जांच करें और CTF-1, CTF-2 और CTF-3 “R” पोजीशन में बराबर सेट हो गये हैं, सुनिश्चित करें। यदि वे बराबर सेट नहीं हैं तो उन्हें हाथ से सेट करें। C-145 का ओपन होना चेक करें और LSC-145 का बुझा होना सुनिश्चित करें। यदि आवश्यक हो Q-50 को वेज करें।",
      "  - यदि कोई रिवर्सर सेट नहीं होता है तो रिवर्सर को लॉक करें। संबंधित RSI ब्लॉक आइसोलेट करें तथा LSC-145 का बुझा होना सुनिश्चित करके Q-50 को वेज करें।",
      "  - यदि कोई रिवर्सर इच्छित दिशा में सेट नहीं होता है तो संबंधित रिवर्सर की कॉइल के टर्मिनल निकालकर टेप करें व रिवर्सर को मैन्युअली सेट करें और रेहियोस्टैटिक ब्रेक का उपयोग न करें।",
      "b) LSP चेक करें यदि प्रकाशित है तो:",
      "  - Q-48 चेक करें, यदि इनर्जाइज है तो Q-48 को हाथ से थपथपाएं, अगर सफलता न मिले तो HMCS के द्वारा प्रयत्न करें। अगर फिर भी सफलता नहीं मिलती तो सैंडिंग COC बंद करके GR को हाथ से ऑपरेट करके सेक्शन क्लियर करें।",
      "c) यदि ऑटो फ्लैशर की LED प्रकाशित है तो:",
      "  - सुनिश्चित करें BP प्रेशर 5 kg/cm² है, एयर फ्लो इंडिकेटर (AFI) की सुई पूर्व निर्धारित जगह पर है। CCLSA फ्यूज निकाल कर प्रयत्न करें।",
      "  - यदि सफलता नहीं मिलती है तो PR-2 को चेक करें। यदि इनर्जाइज है तो PR-2 को ओपन में वेज करें।",
      "  - माइक्रोप्रोसेसर युक्त लोको में HPAR/HQ-51 को \"0\" पोजीशन पर रखें।",
      "d) BP प्रेशर चेक करें (IP Magnet valve COC खुला है):",
      "  i) यदि BP प्रेशर कम है और VCD ऑपरेट हुई है तो VCD को रीसेट करें। यदि VCD रीसेट नहीं होती है तो HVCD या टॉगल स्विच द्वारा VCD को आइसोलेट करें। यदि सफलता नहीं मिलती है तो CCVCD फ्यूज निकाल कर प्रयत्न करें। यदि CCVCD फ्यूज नहीं लगा है तो VCD मेन यूनिट के दोनों कनेक्शन निकाल दें।",
      "     (नोट :- यदि VCD मालफंक्शन करती है तो सिर्फ एक बार ही रीसेट करेंगे, दूसरी बार में VCD को आइसोलेट करेंगे।)",
      "  ii) यदि BP प्रेशर कम है और VCD ऑपरेट नहीं हुई है तो लोको तथा गाड़ी में BP लीकेज चेक करें।",
      "e) QRS चेक करें: यदि इनर्जाइज नहीं है तो RGEB-2 का कट आउट कॉक खुला होना चेक करें, A9 द्वारा BP प्रेशर 2 kg/cm² तक ड्रॉप करें और A9 को वापस रिलीज पोजीशन पर रख दें। यदि फिर भी QRS इनर्जाइज नहीं होती तो उसे वेज करें।",
      "f) सुनिश्चित करें ZSMS “1” पर है।",
      "g) ZSMGR हैंडल की जांच करें (वह खड़ी स्थिति में होना चाहिए)।",
      "h) SMGR सिम्पल (केंक कॉक की स्थिति चेक करें)।",
      "i) SMGR का कंट्रोल प्रेशर चेक करें (वह 2.5 से 3.5 kg/cm² होना चाहिए)।",
      "j) EEC द्वारा प्रयत्न करें।",
      "k) Q-51 और Q-52 डी-इनर्जाइज हैं, इसकी जांच करें।",
      "l) DJ ओपन करें, GR को हाथ से 2-3 बार ऑपरेट करें।",
      "m) GR को हाथ से ऑपरेट करके गाड़ी चलाएं।",
      "---------------------------------------------------------------------------------",
      "【शाखा (iii) : यदि LSGR बुझ जाता है (Branch iii: If LSGR extinguishes)】:",
      "a) HVSI-1, HVSI-2, HVMT-1, HVMT-2 नॉर्मल पोजीशन में हैं, इसकी जांच करें।",
      "b) HT-2 का कट आउट कॉक खुला हुआ है, इसकी जांच करें।",
      "c) LT टेस्टिंग करके L1 से L6 तक के कॉन्टैक्टर क्लोज होते हैं, इसकी जांच करें; CTF-1, CTF-2 और CTF-3 “रनिंग” पोजीशन में हैं, इसकी जांच करें। आवश्यकता हो तो L1 से L6 तक के कॉन्टैक्टर वेज करें।",
      "d) रेहियोस्टैटिक ब्रेक (RB) का उपयोग न करें।"
    ]
  },
  {
    id: "CONV-LSGR-ALREADY-EXTINGUISHED",
    subSystem: "SS01",
    message: "यदि LSGR पहले से ही बुझा है (कर्षण बल की पूर्ण हानि)\nIF LSGR IS ALREADY EXTINGUISHED (TOTAL LOSS OF TRACTIVE FORCE)\n(एक नोच लेने पर एमीटर डेविएट नहीं होता / BPT दबाकर LSRSI तथा LSP प्रकाशित होना चेक करें / CCLS पिघलना / HOBA \"ऑफ\" / QRS वेज)",
    lamp: "LSGR पहले से बुझा रहता है, BPT दबाने पर LSRSI व LSP प्रकाशित, दोनों एमीटर 0",
    effect: "सिग्नलिंग व पायलट लैम्प सप्लाई फेल; QRS डी-एनर्जाइज होने से रिग्रेशन व कर्षण शून्य",
    actions: [
      "【परीक्षण (Check)】: BPT दबाकर LSRSI तथा LSP प्रकाशित होना चेक करें:",
      "a) यदि CCLS पिघल गया है तो बदली करें। ((a) If CCLS fuse is melted, replace it.)",
      "b) यदि फिर भी पिघलता है तो HOBA को “ऑफ” पर रखें और फ्यूज बदली करें। ((b) If it melts again, place HOBA to \"OFF\" position and replace fuse.)",
      "c) आवश्यकता हो तो QRS वेज करके बिना पायलट लैम्प के गाड़ी चलाएं। ((c) If required, wedge QRS relay and work train safely without pilot lamps.)"
    ]
  },
  {
    id: "CONV-LSGR-NOT-EXTINGUISHING",
    subSystem: "SS01",
    message: "यदि LSGR नहीं बुझता है (कर्षण बल की पूर्ण हानि / नोच न आना)\nIF LSGR DOES NOT EXTINGUISH (TOTAL LOSS OF TRACTIVE FORCE)\n(MP से प्रयत्न करने पर सफलता न मिलने पर EEC द्वारा प्रयत्न / LSB, Q-50, रिवर्सर, LSP, Q-48, AFL, PR-2, VCD नियम, QRS, RGEB-2, ZSMS, ZSMGR, SMGR प्रेशर, Q51/Q52, GR हाथ से)",
    lamp: "LSGR 0 पर लगातार जलता रहेगा, LSB / LSP / ऑटो फ्लैशर LED प्रकाशित हो सकती है",
    effect: "टैप चेंजर GR 0 से आगे प्रोग्रेस नहीं करता; ट्रैक्शन मोटर में कोई करंट नहीं",
    actions: [
      "• MP द्वारा प्रयत्न करने पर यदि सफलता नहीं मिलती है तो एक बार EEC द्वारा प्रयत्न करें:",
      "a) LSB चेक करें यदि प्रकाशित है तो:",
      "  - Q-50 चेक करें, यदि इनर्जाइज नहीं है तो J-1 और J-2 सेट हो गये हैं, इसकी जांच करें और CTF-1, CTF-2 और CTF-3 “R” पोजीशन में बराबर सेट हो गये हैं, सुनिश्चित करें। यदि वे बराबर सेट नहीं हैं तो उन्हें हाथ से सेट करें। C-145 का ओपन होना चेक करें और LSC-145 का बुझा होना सुनिश्चित करें। यदि आवश्यक हो तो Q-50 को वेज करें।",
      "  - यदि कोई रिवर्सर सेट नहीं होता है तो रिवर्सर को लॉक करें। संबंधित RSI ब्लॉक आइसोलेट करें तथा LSC-145 का बुझा होना सुनिश्चित करके Q-50 को वेज करें।",
      "  - यदि कोई रिवर्सर इच्छित दिशा में सेट नहीं होता है तो संबंधित रिवर्सर की कॉइल के टर्मिनल निकालकर टेप करें व रिवर्सर को मैन्युअली सेट करें और रेहियोस्टैटिक ब्रेक का उपयोग न करें।",
      "b) LSP चेक करें यदि प्रकाशित है तो:",
      "  - Q-48 चेक करें, यदि इनर्जाइज है तो Q-48 को हाथ से थपथपाएं, अगर सफलता न मिले तो HMCS के द्वारा प्रयत्न करें। अगर फिर भी सफलता नहीं मिलती तो सैंडिंग COC बंद करके GR को हाथ से ऑपरेट करके सेक्शन क्लियर करें।",
      "c) यदि ऑटो फ्लैशर की LED प्रकाशित है तो:",
      "  - सुनिश्चित करें BP प्रेशर 5 kg/cm² है, एयर फ्लो इंडिकेटर (AFI) की सुई पूर्व निर्धारित जगह पर है। CCLSA फ्यूज निकाल कर प्रयत्न करें।",
      "  - यदि सफलता नहीं मिलती है तो PR-2 को चेक करें। यदि इनर्जाइज है तो PR-2 को ओपन में वेज करें।",
      "  - माइक्रोप्रोसेसर युक्त लोको में HPAR/HQ-51 को 0 पोजीशन पर रखें।",
      "d) BP प्रेशर चेक करें (IP Magnet valve COC खुला है):",
      "  i) यदि BP प्रेशर कम है और VCD ऑपरेट हुई है तो VCD को रीसेट करें। यदि VCD रीसेट नहीं होती है तो HVCD या टॉगल स्विच द्वारा VCD को आइसोलेट करें। यदि सफलता नहीं मिलती है तो CCVCD फ्यूज निकाल कर प्रयत्न करें। यदि CCVCD फ्यूज नहीं लगा है तो VCD मेन यूनिट के दोनों कनेक्शन निकाल दें।",
      "     (नोट :- यदि VCD मालफंक्शन करती है तो सिर्फ एक बार ही रीसेट करेंगे, दूसरी बार में VCD को आइसोलेट करेंगे।)",
      "  ii) यदि BP प्रेशर कम है और VCD ऑपरेट नहीं हुई है तो लोको तथा गाड़ी में BP लीकेज चेक करें।",
      "e) QRS चेक करें: यदि इनर्जाइज नहीं है तो RGEB-2 का कट आउट कॉक खुला होना चेक करें, A9 द्वारा BP प्रेशर 2 kg/cm² तक ड्रॉप करें और A9 को वापस रिलीज पोजीशन पर रख दें। यदि फिर भी QRS इनर्जाइज नहीं होती तो उसे वेज करें।",
      "f) सुनिश्चित करें ZSMS “1” पर है।",
      "g) ZSMGR हैंडल की जांच करें (वह खड़ी स्थिति में होना चाहिए)।",
      "h) SMGR सिम्पल (केंक कॉक की स्थिति चेक करें)।",
      "i) SMGR का कंट्रोल प्रेशर चेक करें (वह 2.5 से 3.5 kg/cm² होना चाहिए)।",
      "j) EEC द्वारा प्रयत्न करें।",
      "k) Q-51 और Q-52 डी-इनर्जाइज हैं, इसकी जांच करें।",
      "l) DJ ओपन करें, GR को हाथ से 2-3 बार ऑपरेट करें।",
      "m) GR को हाथ से ऑपरेट करके गाड़ी चलाएं।"
    ]
  },
  {
    id: "CONV-LSGR-EXTINGUISHES-NO-TE",
    subSystem: "SS01",
    message: "यदि LSGR बुझ जाता है (कर्षण बल की पूर्ण हानि / एमीटर डेविएट नहीं)\nIF LSGR EXTINGUISHES (TOTAL LOSS OF TRACTIVE FORCE / NO TE)\n(LSGR बुझने पर भी एमीटर डेविएट न होना / HVSI व HVMT नॉर्मल / HT-2 कॉक खुला / LT टेस्टिंग L1 से L6 क्लोज चेक / CTF 1,2,3 रनिंग पोजीशन / L1-L6 वेज / RB का उपयोग न करना)",
    lamp: "LSGR बुझ जाता है (GR 1 पर आता है), परंतु दोनों ट्रैक्शन मोटर एमीटर 0 दर्शाते हैं",
    effect: "टैप चेंजर नोच लेता है परंतु लाइन कॉन्टैक्टर L1-L6 क्लोज न होने या ट्रैक्शन सर्किट ओपन होने से मोटर में करंट नहीं पहुंचता",
    actions: [
      "a) HVSI-1, HVSI-2, HVMT-1, HVMT-2 नॉर्मल पोजीशन में हैं, इसकी जांच करें। ((a) Check that HVSI-1, HVSI-2, HVMT-1, HVMT-2 are in normal position.)",
      "b) HT-2 का कट आउट कॉक खुला हुआ है, इसकी जांच करें। ((b) Check that HT-2 cut-out cock is open.)",
      "c) LT टेस्टिंग करके L1 से L6 तक के कॉन्टैक्टर क्लोज होते हैं, इसकी जांच करें, CTF-1, CTF-2 और CTF-3 “रनिंग” पोजीशन में हैं, इसकी जांच करें। आवश्यकता हो तो L1 से L6 तक के कॉन्टैक्टर वेज करें। ((c) Do LT testing and check that contactors L1 to L6 close; check that CTF-1, CTF-2, and CTF-3 are in \"Running\" position. If required, wedge contactors L1 to L6.)",
      "d) रेहियोस्टैटिक ब्रेक (RB) का उपयोग न करें। ((d) Do not use Rheostatic Brake.)"
    ]
  },
  {
    id: "CONV-PARTIAL-LOSS-TRACTIVE-FORCE",
    subSystem: "SS01",
    message: "कर्षण बल की आंशिक हानि (Partial Loss of Tractive Force)\nPARTIAL LOSS OF TRACTIVE FORCE\n(OHE वोल्टेज 19 KV / HVSI, HVMT, HMCS नॉर्मल \"1\" / एमीटर A1-A2 व वोल्टमीटर U1-U2 / व्हील स्लिप व सैंडिंग BPSW / लाइन कॉन्टैक्टर L2, L5 / लोको व ट्रेन ब्रेक बाइंडिंग)",
    lamp: "एमीटर/वोल्टमीटर में असमान रीडिंग, व्हील स्लिप, या OHE वोल्टेज 19 KV से कम",
    effect: "लोकोमोटिव पूरी क्षमता से लोड नहीं खींच पाता; गति धीमी होना या समय हानि (Time Loss)",
    actions: [
      "【i) OHE वोल्टेज (OHE Voltage)】:",
      "• यदि 19 KV से कम है और समय की हानि (Time Loss) होती है: पहले स्टेशन पर TPC / TLC को तुरंत सूचित करें।",
      "• यदि समय हानि नहीं होती है: अगले सुविधाजनक स्टॉप पर TPC / TLC को सूचित करें।",
      "---------------------------------------------------------------------------------",
      "【ii) HVSI, HVMT और HMCS चेक करें】:",
      "• सभी स्विचें नॉर्मल पोजीशन “1” पर होनी चाहिये।",
      "---------------------------------------------------------------------------------",
      "【iii) एमीटर (A-1, A-2) और वोल्टमीटर (U-1, U-2) चेक करें】:",
      "a) यदि एमीटरों की सुइयों में उतार-चढ़ाव है (व्हील स्लिप / Wheel Slip):",
      "   • जब कभी आवश्यक हो — नोच रिग्रेस (कम) करें और सैंडिंग (BPSW) का उपयोग करें।",
      "b) यदि कोई एमीटर अथवा वोल्टमीटर डेविएट नहीं होता है:",
      "   • संबंधित लाइन कॉन्टैक्टर का क्लोज होना देखें। यदि आवश्यक हो तो उसे वेज करें।",
      "c) यदि सभी वोल्टमीटर और एमीटर डेविएट होते हैं:",
      "   • L-2 और L-5 लाइन कॉन्टैक्टर का क्लोज होना चेक करें। यदि आवश्यक हो तो उन्हें वेज करें।",
      "---------------------------------------------------------------------------------",
      "【iv) लोको ब्रेक चेक करें】:",
      "a) यदि लोको ब्रेक रिलीज नहीं है तो रिलीज कर दें।",
      "b) लोको हैंड ब्रेक / पार्किंग ब्रेक रिलीज है, इसकी जांच करें।",
      "---------------------------------------------------------------------------------",
      "【v) ट्रेन ब्रेक (ट्रेन ब्रेक बाइंडिंग जांच)】:",
      "a) यदि ट्रेन ब्रेक बंधी है:",
      "   • BP प्रेशर सामान्य (5.0 kg/cm²) होना सुनिश्चित करें।",
      "b) A-9 का हैंडल:",
      "   • रिलीज पोजीशन पर है, सुनिश्चित करें।",
      "c) यदि एयर फ्लो इंडिकेटर (AFI):",
      "   • स्थिर पोजीशन से डेविएट होता है तो ट्रेन में BP प्रेशर का लीकेज चेक करें।",
      "d) ट्रेन के हैंड ब्रेक:",
      "   • गाड़ी के हैंड ब्रेक चेक करें (सुनिश्चित करें कि सभी रिलीज हैं)।"
    ]
  },
  {
    id: "CONV-FIRST-NOTCH-AUTOREGRESSION",
    subSystem: "SS01",
    message: "पहली नोच पर ऑटो रिग्रेशन होता है (LSGR बुझकर फिर से प्रकाशित होता है)\nAUTO REGRESSION ON FIRST NOTCH (LSGR EXTINGUISHES AND GLOWS AGAIN)\n(पहली नोच लेते ही ऑटो रिग्रेशन / LSP चेक करें: i. यदि नोच लेने पर LSP प्रकाशित होता है, ii. यदि नोच लेने पर LSP प्रकाशित नहीं होता है)",
    lamp: "LSGR बुझकर तुरंत पुनः प्रकाशित होता है (GR 0 पर आता है), LSP प्रकाशित हो सकता है या बुझा रह सकता है",
    effect: "नोच नहीं टिकता; 1st नोच लेते ही ऑटो रिग्रेशन होकर GR 0 पर आ जाता है, गाड़ी में ट्रैक्शन नहीं मिलता",
    actions: [
      "【प्राथमिक परीक्षण (Initial Action)】:",
      "• नोच लेते समय LSP पायलट लैम्प की स्थिति चेक करें: ((Observe LSP pilot lamp while taking notch:))",
      "---------------------------------------------------------------------------------",
      "【i. यदि नोच लेने पर LSP प्रकाशित होता है (दोनों एमीटर चेक करें)】:",
      "a) यदि व्हील स्लिप के साथ एमीटरों में उतार-चढ़ाव है तो: सैंडिंग करें और ZQWC/BPQD का उपयोग करें। ((a) If ammeters fluctuate with wheel slip: Sand and use ZQWC / BPQD.)",
      "b) अनमोडीफाइड लोको में यदि A-1 एवं A-2 अथवा मोडीफाइड लोको में A-3 एवं A-4 में से कोई एक एमीटर डेविएट नहीं होता तो: HMCS के द्वारा संबंधित ट्रैक्शन मोटर को आइसोलेट करें। ((b) In unmodified loco if any one of A1/A2 or in modified loco any one of A3/A4 does not deviate: Isolate concerned TM via HMCS.)",
      "c) अनमोडीफाइड लोको में यदि A-1 एवं A-2 अथवा मोडीफाइड लोको में A-3 एवं A-4 दोनों एमीटर डेविएट होते हैं तो: HMCS के द्वारा ट्रैक्शन मोटर 2 और 5 को बारी-बारी से आइसोलेट करें। ((c) If both ammeters deviate: Isolate TM-2 and TM-5 one by one via HMCS.)",
      "d) शंटिंग कॉन्टैक्टर चेक करें: यदि कोई शंटिंग कॉन्टैक्टर क्लोज हालत में अटक गया है तो उसे LT में ओपन करने का प्रयत्न करें। यदि सफलता नहीं मिलती है तो HMCS के द्वारा संबंधित ट्रैक्शन मोटर को आइसोलेट करें। ((d) Check shunting contactors: If any contactor is stuck closed, try to open in LT; if unsuccessful, isolate concerned TM via HMCS.)",
      "---------------------------------------------------------------------------------",
      "【ii. यदि नोच लेने पर LSP प्रकाशित नहीं होता है】:",
      "a) पीछे वाली कैब की BL बराबर लॉक है, सुनिश्चित करें।",
      "   (आगे वाली कैब की BL लॉक करने पर यदि पायलट लैम्प प्रकाशित रहते हैं तो यह इस बात का संकेत है कि पीछे वाली कैब की BL अनलॉक हालत में है)",
      "   • यदि पीछे वाली कैब की BL अनलॉक है तो – उसे लॉक करने का प्रयत्न करें।",
      "   • यदि सफलता नहीं मिलती तो Q118 को वेज करें, ZSMS को “0” पर रखें और EEC द्वारा काम करें।",
      "   • मोडीफाइड ZSMS वाले लोको में GR को मैनुअल कंट्रोल करके सेक्शन क्लीयर करें।",
      "b) BP प्रेशर सामान्य है (IP Magnet valve COC बंद है) और VCD ऑपरेट हुई है तो VCD को रीसेट करें। यदि VCD रीसेट नहीं होती है तो QVCD को ओपन में वेज करें।",
      "   • नोट :- यदि VCD मालफंक्शन करती है तो पहली बार में ही रीसेट करें तथा आइसोलेट करें।",
      "c) मोडीफाइड ZSMS वाले लोको में, BPR दबी अवस्था में अटक गया है तो उसे नॉर्मल करने का प्रयत्न करें:",
      "   (i) यदि सफलता नहीं मिलती है तो ZSMS की पोजीशन बदलें।",
      "   (ii) यदि फिर भी सफलता नहीं मिलती है तो GR को मैनुअल कंट्रोल करके सेक्शन क्लीयर करें।"
    ]
  },
  {
    id: "CONV-FIRST-NOTCH-AUTOREGRESSION-LSP-GLOWS",
    subSystem: "SS01",
    message: "पहली नोच पर ऑटो रिग्रेशन - यदि नोच लेने पर LSP प्रकाशित होता है\nAUTO REGRESSION ON 1ST NOTCH - LSP GLOWS ON TAKING NOTCH\n(पहला नोच लेते ही ऑटो रिग्रेशन व LSP जलना / व्हील स्लिप, ZQWC/BPQD / A1-A2, A3-A4 एमीटर जांच / TM 2 व 5 आइसोलेट / शंटिंग कॉन्टैक्टर अटका होना)",
    lamp: "LSGR बुझकर पुनः जलता है, नोच लेते ही LSP प्रकाशित होता है",
    effect: "रिले Q48 पिकअप होने से ऑटो रिग्रेशन; ट्रैक्शन मोटर में असमान लोड या शंटिंग कॉन्टैक्टर चिपकना",
    actions: [
      "a) यदि व्हील स्लिप के साथ एमीटरों में उतार-चढ़ाव है तो: सैंडिंग करें और ZQWC/BPQD का उपयोग करें। ((a) If ammeters fluctuate with wheel slip: Sand and use ZQWC / BPQD.)",
      "b) अनमोडीफाइड लोको में यदि A-1 एवं A-2 अथवा मोडीफाइड लोको में A-3 एवं A-4 में से कोई एक एमीटर डेविएट नहीं होता तो: HMCS के द्वारा संबंधित ट्रैक्शन मोटर को आइसोलेट करें। ((b) In unmodified loco if any one of A1/A2 or in modified loco any one of A3/A4 does not deviate: Isolate concerned TM via HMCS.)",
      "c) अनमोडीफाइड लोको में यदि A-1 एवं A-2 अथवा मोडीफाइड लोको में A-3 एवं A-4 दोनों एमीटर डेविएट होते हैं तो: HMCS के द्वारा ट्रैक्शन मोटर 2 और 5 को बारी-बारी से आइसोलेट करें। ((c) If both ammeters deviate: Isolate TM-2 and TM-5 one by one via HMCS.)",
      "d) शंटिंग कॉन्टैक्टर चेक करें: यदि कोई शंटिंग कॉन्टैक्टर क्लोज हालत में अटक गया है तो उसे LT में ओपन करने का प्रयत्न करें। यदि सफलता नहीं मिलती है तो HMCS के द्वारा संबंधित ट्रैक्शन मोटर को आइसोलेट करें। ((d) Check shunting contactors: If any contactor is stuck closed, try to open in LT; if unsuccessful, isolate concerned TM via HMCS.)"
    ]
  },
  {
    id: "CONV-FIRST-NOTCH-AUTOREGRESSION-LSP-OFF",
    subSystem: "SS01",
    message: "पहली नोच पर ऑटो रिग्रेशन - यदि नोच लेने पर LSP प्रकाशित नहीं होता है\nAUTO REGRESSION ON 1ST NOTCH - LSP DOES NOT GLOW\n(पहला नोच लेते ही ऑटो रिग्रेशन व LSP न जलना / पीछे की कैब BL अनलॉक जांच / Q118 वेज व ZSMS 0 व EEC / मोडीफाइड ZSMS GR मैनुअल / IP COC व VCD रीसेट व QVCD ओपन वेज / BPR दबी अवस्था में अटकना)",
    lamp: "LSGR बुझकर पुनः प्रकाशित होता है (0 पर आ जाता है), LSP बुझा रहता है",
    effect: "कंट्रोल सर्किट, कैब BL इंटरलॉक या VCD/BPR फॉल्ट के कारण नोच होल्ड नहीं होता; तुरंत ऑटो रिग्रेशन",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) पीछे वाली कैब की BL बराबर लॉक है, सुनिश्चित करें।",
      "   (आगे वाली कैब की BL लॉक करने पर यदि पायलट लैम्प प्रकाशित रहते हैं तो यह इस बात का संकेत है कि पीछे वाली कैब की BL अनलॉक हालत में है)",
      "   • यदि पीछे वाली कैब की BL अनलॉक है तो – उसे लॉक करने का प्रयत्न करें।",
      "   • यदि सफलता नहीं मिलती तो Q118 को वेज करें, ZSMS को “0” पर रखें और EEC द्वारा काम करें।",
      "   • मोडीफाइड ZSMS वाले लोको में GR को मैनुअल कंट्रोल करके सेक्शन क्लीयर करें।",
      "b) BP प्रेशर सामान्य है (IP Magnet valve COC बंद है) और VCD ऑपरेट हुई है तो VCD को रीसेट करें। यदि VCD रीसेट नहीं होती है तो QVCD को ओपन में वेज करें।",
      "   • नोट :- यदि VCD मालफंक्शन करती है तो पहली बार में ही रीसेट करें तथा आइसोलेट करें।",
      "c) मोडीफाइड ZSMS वाले लोको में, BPR दबी अवस्था में अटक गया है तो उसे नॉर्मल करने का प्रयत्न करें:",
      "   (i) यदि सफलता नहीं मिलती है तो ZSMS की पोजीशन बदलें।",
      "   (ii) यदि फिर भी सफलता नहीं मिलती है तो GR को मैनुअल कंट्रोल करके सेक्शन क्लीयर करें।"
    ]
  },
  {
    id: "CONV-MPJ-F-R-LSB-GLOWS",
    subSystem: "SS01",
    message: "MPJ को “F” या “R” पर रखने पर LSB प्रकाशित ही रहता है\nLSB REMAINS GLOWING ON PLACING MPJ TO \"F\" OR \"R\"\n(MPJ को F या R पर रखने पर LSB न बुझना / (I) यदि Q-50 इनर्जाइज नहीं है: CTF 1,2,3 रनिंग, J-1 व J-2 वांछित स्थिति, HT-1 व HT-2 कॉक खुले, C-145 ओपन व LSC-145 बुझा, Q-50 वेज / (II) यदि Q-50 इनर्जाइज है: LSB की परवाह न करें / रिवर्सर क्षतिग्रस्त होने पर RSI ब्लॉक आइसोलेट व Q-50 वेज)",
    lamp: "LSB पायलट लैम्प लगातार प्रकाशित रहेगा (LSB pilot lamp remains glowing)",
    effect: "Q-50 रिले इनर्जाइज न होने पर नोच नहीं आएगा; रिवर्सर/CTF सेट न होने या C-145 क्लोज होने से ट्रैक्शन सर्किट तैयार नहीं होगा",
    actions: [
      "【(I) यदि Q-50 इनर्जाइज नहीं है तो (If Q-50 is NOT energized)】:",
      "a) CTF-1, CTF-2 और CTF-3 “रनिंग” पोजीशन पर हैं, सुनिश्चित करें। यदि सेट नहीं हैं तो उन्हें हाथ से सेट करें।",
      "b) J-1 और J-2 चेक करें। यदि वांछित स्थिति (Desired Position) में नहीं हैं तो उन्हें हाथ से सेट करें। HT-1 और HT-2 के न्यूमैटिक कट आउट कॉक खुले हैं, सुनिश्चित करें।",
      "c) C-145 का ओपन होना चेक करें और LSC-145 का बुझा होना सुनिश्चित करें।",
      "d) यदि रिवर्सर और CTF बराबर सेट हैं और C-145 ओपन है (LSC-145 बुझा है) तो Q-50 को वेज करें।",
      "---------------------------------------------------------------------------------",
      "【(II) यदि Q-50 इनर्जाइज है तो (If Q-50 IS energized)】:",
      "• LSB की परवाह न करें। (Ignore LSB glowing if Q-50 is already energized.)",
      "• यदि रिवर्सर क्षतिग्रस्त हो गया है या यदि कोई रिवर्सर सेट नहीं होता है तो:",
      "  - संबंधित RSI ब्लॉक आइसोलेट करें तथा LSC-145 का बुझा होना सुनिश्चित करके Q-50 को वेज करें।"
    ]
  },
  {
    id: "CONV-FIRST-NOTCH-L1-L6-NOT-CLOSING",
    subSystem: "SS01",
    message: "पहली नोच लेने पर कॉन्टैक्टर L-1 से L-6 क्लोज नहीं होते हैं\nCONTACTORS L-1 TO L-6 DO NOT CLOSE ON TAKING FIRST NOTCH\n(पहली नोच पर L1 से L6 क्लोज न होना / Q-50 इनर्जाइज LSB / दोनों HVSI व HVMT सामान्य / HT-2 कट आउट कॉक खुला / DJ ओपन कर लोको ग्राउंड / CTF 1,2,3 हाथ से ऑपरेट कर रनिंग पोजीशन / कॉन्टैक्टर न्यूमैटिकली हाथ से / कॉइल टर्मिनल जांच / सभी कॉन्टैक्टर वेज / रेहियोस्टैटिक ब्रेक उपयोग न करें)",
    lamp: "LSGR बुझ जाता है (GR 1 पर आता है), LSB बुझा होना चाहिए, एमीटर 0 दर्शाते हैं",
    effect: "लाइन कॉन्टैक्टर क्लोज न होने से ट्रैक्शन मोटरों को करंट नहीं मिलता; लोको में कोई कर्षण बल (TE) नहीं",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) Q-50 इनर्जाइज है, सुनिश्चित करें। (LSB बुझा होना चाहिए)।",
      "b) दोनों HVSI और HVMT सामान्य स्थिति में हैं, जांच करें।",
      "c) HT-2 कट आउट कॉक खुला है, सुनिश्चित करें।",
      "d) DJ/VCB ओपन करें, लोको ग्राउंड करें, CTF-1, CTF-2 व CTF-3 को हाथ से दो-तीन बार ऑपरेट करके उन्हें वापस “रनिंग” पोजीशन पर रखें। सभी कॉन्टैक्टरों को न्यूमैटिकली हाथ से ऑपरेट करें। कॉइलों के टर्मिनल इत्यादि चेक करें।",
      "e) यदि सफलता नहीं मिलती तो सभी कॉन्टैक्टरों को वेज करें।",
      "f) रेहियोस्टैटिक ब्रेक का उपयोग न करें।"
    ]
  },
  {
    id: "CONV-L1-L3-OR-L4-L6-NOT-CLOSING",
    subSystem: "SS01",
    message: "L-1 से L-3 अथवा L-4 से L-6 क्लोज नहीं होते हैं\nCONTACTORS L-1 TO L-3 OR L-4 TO L-6 DO NOT CLOSE\n(L-1 से L-3 अथवा L-4 से L-6 क्लोज न होना / संबंधित HVSI व HVMT सामान्य स्थिति / 2-3 बार ऑपरेट करना / संबंधित RSI ब्लॉक आइसोलेट / सुविधाजनक स्टॉप पर कॉन्टैक्टर वेज व स्विच सामान्य / रेहियोस्टैटिक ब्रेक का उपयोग न करना)",
    lamp: "संबंधित बोगी का एमीटर 0 दर्शाएगा (A1 या A2 = 0), आधा कर्षण बल (Half Traction)",
    effect: "एक बोगी/ट्रक के लाइन कॉन्टैक्टर क्लोज न होने से 3 ट्रैक्शन मोटरें कार्य नहीं करेंगी; आधा कर्षण बल",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) संबंधित HVSI और HVMT सामान्य स्थिति में हैं, जांच करें। उन्हें 2-3 बार ऑपरेट करें। संबंधित RSI ब्लॉक आइसोलेट करें।",
      "b) सुविधाजनक स्टॉप पर कॉन्टैक्टरों को वेज करें और स्विचों को सामान्य स्थिति में रखें।",
      "c) रेहियोस्टैटिक ब्रेक का उपयोग न करें।"
    ]
  },
  {
    id: "CONV-ONE-LINE-CONTACTOR-NOT-CLOSING",
    subSystem: "SS01",
    message: "कोई एक लाइन कॉन्टैक्टर क्लोज नहीं होता है\nANY ONE LINE CONTACTOR DOES NOT CLOSE\n(कोई एक लाइन कॉन्टैक्टर क्लोज न होना / संबंधित HMCS पोजीशन 1 जांच / HMCS द्वारा संबंधित ट्रैक्शन मोटर आइसोलेट / भार खींचने में कठिनाई पर सुविधाजनक स्टॉप पर ट्रबलशूट व कॉन्टैक्टर वेज / रेहियोस्टैटिक ब्रेक का उपयोग न करना)",
    lamp: "संबंधित बोगी के एमीटर में करंट कम दिखेगा, 5 मोटरों पर लोको कार्य करेगा",
    effect: "एक लाइन कॉन्टैक्टर न लगने से संबंधित ट्रैक्शन मोटर काम नहीं करेगी; हल्के लोड में गाड़ी चल सकती है, भारी लोड में कर्षण बल कम होगा",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) संबंधित HMCS पोजीशन “1” पर है, इसकी जांच करें।",
      "b) HMCS द्वारा संबंधित ट्रैक्शन मोटर को आइसोलेट करके गाड़ी चलाएं। परंतु यदि भार खींचने में कठिनाई पड़ती हो तो सुविधाजनक स्टॉप पर कॉन्टैक्टर के क्लोज न होने के लिये ट्रबलशूट करें। यदि सफलता नहीं मिलती तो उसे वेज करें।",
      "c) रेहियोस्टैटिक ब्रेक का उपयोग न करें।"
    ]
  },
  {
    id: "CONV-LSRSI-GLOWS",
    subSystem: "SS01",
    message: "LSRSI प्रकाशित रहता है\nLSRSI PILOT LAMP REMAINS GLOWING\n(RSI-1 व RSI-2 टेल-टेल फ्यूज / 6 LED ब्लॉक / 14-18 LED ब्लॉक / 1-2 LED नियम / टॉगल स्विच / TM आइसोलेट / RSI ब्लॉक आइसोलेट व आधा लोड)",
    lamp: "LSRSI पायलट लैम्प लगातार प्रकाशित रहेगा (LSRSI Pilot Lamp Remains Glowing)",
    effect: "सिलिकॉन रेक्टिफायर ब्लॉक (RSI) में डायोड/फ्यूज खराबी; लोड वहन क्षमता प्रभावित (Defect in Silicon Rectifier Block RSI diodes/fuses; hauling load capacity impacted)",
    actions: [
      "【1. कन्वेंशनल टेल-टेल फ्यूज युक्त RSI ब्लॉक (RSI-1 और RSI-2 में टेल-टेल फ्यूज चेक करें)】:",
      "a) यदि एक भुजा में अथवा प्रत्येक भुजा में एक-एक टेल-टेल फ्यूज पिघल गया है तो: फ्यूज निकाल दें और ट्रैक्शन चालू करें।",
      "b) यदि एक भुजा में दो फ्यूज पिघल गये हैं तो: फ्यूज निकाल दें और RSI ब्लॉक आइसोलेट करें।",
      "c) यदि कोई भी फ्यूज नहीं पिघला है और LSRSI प्रकाशित है तो: LSRSI की परवाह न करें।",
      "---------------------------------------------------------------------------------",
      "【2. RSI ब्लॉक 6 LED वाले दिए हैं】:",
      "• यदि एक ही RSI ब्लॉक में एक LED प्रकाशित होती है तो: संबंधित RSI ब्लॉक आइसोलेट करें। अधिकतम अनुमत लोड (Permissible Load) का आधा करके गाड़ी चलाएं।",
      "---------------------------------------------------------------------------------",
      "【3. RSI ब्लॉक 14/18 LED वाले दिए हैं】:",
      "a) चलती गाड़ी में LSRSI प्रकाशित होता है, साथ ही RSI ब्लॉक में LED भी प्रकाशित होती है तो: MP को “0” पर लाएं।",
      "b) यदि एक LED प्रकाशित होती है एवं टॉगल स्विच है तो: उसे ऑफ करें और सामान्य रूप से गाड़ी चलाएं। यदि टॉगल स्विच नहीं है तो: संबंधित RSI ब्लॉक की जांच करते हुए गाड़ी सामान्य रूप से चलाएं।",
      "c) यदि दोनों RSI ब्लॉक में एक-एक LED प्रकाशित होती है तो: उपरोक्त (b) में दी गई विधि से सामान्य रूप से गाड़ी चलाएं।",
      "d) यदि एक ही RSI ब्लॉक में दो LED प्रकाशित होती हैं तो: संबंधित RSI ब्लॉक में से कोई एक ट्रैक्शन मोटर आइसोलेट करें।",
      "e) यदि एक ही RSI ब्लॉक में दो से ज्यादा LED प्रकाशित होती हैं तो: संबंधित RSI ब्लॉक आइसोलेट करें। अधिकतम अनुमत लोड का आधा करके गाड़ी चलाएं।"
    ]
  },
  {
    id: "CONV-NOTCH-AUTOREGRESSION-LSP-GLOWS",
    subSystem: "SS01",
    message: "नोच लेने पर LSP प्रकाशित होता है और आटो रिग्रेशन होता है\nLSP GLOWS AND AUTO REGRESSION OCCURS ON TAKING NOTCH\n(नोच लेने पर LSP प्रकाशित व आटो रिग्रेशन / पहली नोच पर LSP: अध्याय 8-पृष्ठ 56 फेलियर सं. 3(I) / अन्य नोचों पर LSP: शंटिंग कॉन्टैक्टर क्लोज अटका होना, LT में ओपन करना, HMCS से TM आइसोलेट)",
    lamp: "LSP पायलट लैम्प प्रकाशित होता है और GR पर ऑटो रिग्रेशन होता है (LSGR बुझकर पुनः प्रकाशित)",
    effect: "रिले Q48 पिकअप या शंटिंग कॉन्टैक्टर चिपके होने के कारण नोच टिकते नहीं और ऑटो रिग्रेशन हो जाता है",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) यदि पहली नोच पर LSP प्रकाशित होता है तो: अध्याय 8-पृष्ठ 56 पर फेलियर सं. 3(I) देखें। (अर्थात: व्हील स्लिप जांचें, सैंडिंग व ZQWC/BPQD का उपयोग करें; एमीटर न हिलने पर HMCS से संबंधित TM आइसोलेट करें; दोनों एमीटर हिलने पर TM-2 व TM-5 को बारी-बारी आइसोलेट करें; शंटिंग कॉन्टैक्टर चेक करें।)",
      "b) यदि अन्य नोचों पर LSP प्रकाशित होता है तो: जांच करें कि कोई शंटिंग कॉन्टैक्टर तो क्लोज हालत में नहीं अटक गया है और उसे LT में ओपन करने का प्रयत्न करें। यदि सफलता नहीं मिलती तो HMCS के द्वारा संबंधित ट्रैक्शन मोटर को आइसोलेट करें।"
    ]
  },
  {
    id: "CONV-LSP-GLOWS-WITHOUT-NOTCH",
    subSystem: "SS01",
    message: "बिना नोच लिये LSP प्रकाशित रहता है\nLSP REMAINS GLOWING WITHOUT TAKING NOTCH\n(बिना नोच लिए LSP जलना / Q-48 रिले इनर्जाइज चेक / हाथ से थपथपाएं / HMCS द्वारा प्रयत्न / सैंडिंग COC बंद / GR हाथ से ऑपरेट करके सेक्शन क्लीयर)",
    lamp: "LSP पायलट लैम्प बिना नोच लिए भी लगातार प्रकाशित रहेगा (LSP glows continuously on GR 0)",
    effect: "व्हील स्लिप प्रोटेक्शन रिले Q-48 इनर्जाइज या चिपकी होने से नोचिंग ब्लॉक होगी अथवा लगातार सैंडिंग/रिग्रेशन का खतरा रहेगा",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) Q-48 चेक करें (LSP): यदि इनर्जाइज है तो Q-48 को हाथ से थपथपाएं।",
      "b) अगर सफलता न मिले तो: HMCS के द्वारा प्रयत्न करें (संबंधित ट्रैक्शन मोटर आइसोलेट करके देखें)।",
      "c) अगर फिर भी सफलता नहीं मिलती तो: सैंडिंग COC बंद करें और GR को हाथ से ऑपरेट करके सेक्शन क्लीयर करें।"
    ]
  },
  {
    id: "CONV-WHEEL-SLIP-LSP-NOT-GLOWING",
    subSystem: "SS01",
    message: "पहिये फिसलने पर LSP प्रकाशित नहीं होता (एमीटर रीडिंग में उतार-चढ़ाव है)\nLSP DOES NOT GLOW ON WHEEL SLIP (AMMETER READING FLUCTUATING)\n(पहिये फिसलना / व्हील स्लिप पर LSP न जलना / एमीटर उतार-चढ़ाव / a) आटो रिग्रेशन और सैंडिंग न होने पर GR रिग्रेस, PSA सैंडिंग, ZQWC दबाएं / b) आटो रिग्रेशन और सैंडिंग होने पर व्हील स्लिप संकेतों का ध्यान रख गाड़ी चलाएं, ZQWC उपयोग)",
    lamp: "LSP पायलट लैम्प नहीं जलता, लेकिन एमीटरों (A-1, A-2) की सुइयों में भारी उतार-चढ़ाव (Wheel Slip)",
    effect: "पहिया फिसलने पर ऑटोमैटिक व्हील स्लिप डिटेक्शन (Q48/LSP) काम न करने से रेल व पहिए की घिसावट का खतरा",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) यदि आटो रिग्रेशन और सैंडिंग नहीं होता: तो आवश्यक होने पर GR रिग्रेस करें और PSA को दबाएं (यदि आवश्यक हो तो ZQWC को दबाएं)।",
      "b) यदि आटो रिग्रेशन और सैंडिंग होता है: तो व्हील स्लिप के संकेतों का ध्यान रखते हुए गाड़ी चलाएं। ZQWC का उपयोग करें।"
    ]
  },
  {
    id: "CONV-LSGR-NOT-GLOWING",
    subSystem: "SS01",
    message: "LSGR प्रकाशित नहीं होता है\nLSGR DOES NOT GLOW (ON GR \"0\")\n(LSGR प्रकाशित न होना / MP \"0\" सुनिश्चित / SMGR ड्रम जांच / GR हाथ से 0 व 2-3 बार ऑपरेट / दूसरी कैब लैम्प व QV62 रिले जांच / नोच रिपीटर का ध्यान रखते हुए गाड़ी चलाना)",
    lamp: "LSGR पायलट लैम्प नहीं जलता है (GR 0 पर भी LSGR बुझा रहता है)",
    effect: "GR 0 पोजीशन का पायलट लैम्प इंडिकेशन न मिलना; DJ क्लोजिंग या नोचिंग की स्थिति स्पष्ट न होना",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) MP “0” पर है, सुनिश्चित करें।",
      "b) SMGR ड्रम चेक करें। यदि GR “0” पर नहीं है तो उसे हाथ से “0” पर लाएं। यदि GR “0” पर है तो भी उसे 2-3 बार ऑपरेट करें और वापस “0” पर लाएं।",
      "c) दूसरी कैब का लैम्प चेक करें। यदि प्रकाशित नहीं है तो QV62 चेक करें।",
      "d) नोच रिपीटर का ध्यान रखते हुए गाड़ी चलाएं।"
    ]
  },
  {
    id: "CONV-TRACTION-VOLTMETER-NOT-DEVIATING",
    subSystem: "SS01",
    message: "ट्रैक्शन वोल्टमीटर डेविएट नहीं होते हैं परंतु कर्षण बल की कोई हानि नहीं है\nTRACTION VOLTMETER DOES NOT DEVIATE BUT NO LOSS OF TRACTIVE FORCE\n(ट्रैक्शन वोल्टमीटर U1/U2 डेविएट न होना / कर्षण बल हानि न होना / a) ट्रैक्शन चालू रखें / b) 28 नोच से आगे न बढ़ें)",
    lamp: "ट्रैक्शन वोल्टमीटर (U-1, U-2) शून्य दर्शाते हैं, परंतु एमीटर करंट दर्शाते हैं और लोको में कर्षण सामान्य है",
    effect: "वोल्टमीटर मीटर सर्किट में खराबी; वोल्टेज मॉनिटरिंग उपलब्ध न होने के कारण ओवरवोल्टेज सुरक्षा हेतु 28 नोच की अधिकतम सीमा",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) ट्रैक्शन चालू रखें।",
      "b) 28 नोच से आगे न बढ़ें।"
    ]
  },
  {
    id: "CONV-NOTCH-REPEATER-NOT-WORKING",
    subSystem: "SS01",
    message: "नोच रिपीटर काम नहीं करता है\nNOTCH REPEATER DOES NOT WORK\n(नोच रिपीटर खराब / वोल्टमीटर व एमीटर पर ध्यान रख ट्रैक्शन चालू / CHBA जांच / CCTFS व CCNR फ्यूज या MCB / बार-बार पिघलना / SIV लोको में HRAVT नॉर्मल)",
    lamp: "कैब में नोच रिपीटर मीटर (0 से 32 नोच) सुई नहीं हिलती या गलत रीडिंग दिखाता है",
    effect: "कैब में वर्तमान नोच संख्या नहीं दिखती; ट्रैक्शन चालू रह सकता है परंतु वोल्टमीटर/एमीटर पर निगरानी रखनी होगी",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) वोल्टमीटर और एमीटर पर ध्यान रखते हुये ट्रैक्शन चालू रखें।",
      "b) CHBA का काम चेक करें। यदि CHBA काम नहीं करता तो उसके लिये ट्रबलशूट करें।",
      "c) यदि CHBA काम करता है और दोनों कैब के नोच रिपीटर काम नहीं करते हैं तो: CCTFS / CCNR फ्यूज / MCB चेक करें।",
      "d) यदि CCTFS / CCNR बार-बार पिघलता है तो: वोल्टमीटर और एमीटर पर ध्यान रखते हुये ट्रैक्शन चालू रखें।",
      "e) SI UNIT लोको है तो: HRAVT नॉर्मल होना चेक करें।"
    ]
  },
  {
    id: "CONV-NO-PILOT-LAMP-ON-UNLOCKING-BL",
    subSystem: "SS01",
    message: "BL को अनलॉक करने पर कोई भी पायलट लैम्प प्रकाशित नहीं होता है\nNO PILOT LAMP GLOWS ON UNLOCKING BL KEY/SWITCH\n(BL अनलॉक करने पर कोई पायलट लैम्प न जलना / दूसरी कैब जांच / BL 2-3 बार ऑपरेट / HLS-ZLS स्विच / UBA 0 होने पर Additional CCBA, CCMCB, BA बॉक्स-1, HOBA, बैटरी कनेक्शन / CCLS फ्यूज / \"A\" कॉक कनेक्शन / सावधानियां: QRS वेज, IP COC बंद, बिना पायलट लैम्प गाड़ी चलाना, VCD कार्य नहीं करेगी, RB का उपयोग न करें)",
    lamp: "BL अनलॉक करने पर कैब डेस्क के सभी पायलट लैम्प (LSDJ, LSCHBA, LSB, LSGR आदि) बुझे रहते हैं (No pilot lamps glow)",
    effect: "पायलट लैम्प इंडिकेशन बाधित; यदि CCLS पिघला है तो रिले QRS डी-इनर्जाइज होकर IP वाल्व से BP ड्रॉप कर सकती है और VCD फेल हो सकती है",
    actions: [
      "【A) यदि दूसरी कैब में पायलट लैम्प प्रकाशित हैं (If pilot lamps glow in the other cab)】:",
      "• तो पीछे वाली कैब के और दूसरे मापक यंत्रों पर ध्यान रखते हुये गाड़ी चलाएं।",
      "【B) यदि दूसरी कैब में भी पायलट लैम्प प्रकाशित नहीं हैं (If pilot lamps do not glow in the other cab as well)】:",
      "a) BL को 2-3 बार ऑपरेट करें।",
      "b) यदि लोको में HLS / ZLS स्विच दिया है तो उसका ऑन (ON) होना चेक करें।",
      "c) यदि बैटरी वोल्टेज “0” है तो: एडिशनल CCBA / CCMCB (BA बॉक्स-1 पर) चेक करें। यदि मेल्ट होता है तो HOBA का उपयोग करें। बैटरी कनेक्शन चेक करें और खराब बैटरी को आइसोलेट करें।",
      "d) CCLS चेक करें - यदि पिघल गया है तो उसे बदल दें - यदि फिर से पिघलता है तो HOBA को “ऑफ” पर रखकर फ्यूज बदली करें।",
      "e) यदि CCLS बराबर (सही) है तो: \"A\" कॉक कनेक्शन चेक करें (TB Panel के नीचे)।",
      "【महत्वपूर्ण नोट / सावधानियां (Crucial Precautions)】:",
      "i) यदि CCLS कायम नहीं रहता है तो: गाड़ी चलाने के लिये QRS को वेज करें।",
      "ii) IP MAGNET VALVE का COC बंद करें।",
      "iii) बिना पायलट लैम्प के गाड़ी चलाएं। अन्य मापक यंत्रों जैसे UA, नोच रिपीटर, एमीटर, CHBA एमीटर, रिले टारगेट इत्यादि पर ध्यान रखते हुये गाड़ी चलाएं (पृष्ठ 29 पर कंडिका 3.6 देखें)।",
      "iv) विजिलेंस कंट्रोल डिवाइस {VCD} कार्य नहीं करेगी।",
      "v) रेहियोस्टैटिक ब्रेक (Rheostatic Braking) का उपयोग न करें।"
    ]
  },
  {
    id: "CONV-LSDJ-NOT-GLOWING-ON-UNLOCKING-BL",
    subSystem: "SS01",
    message: "BL अनलॉक करने पर LSDJ प्रकाशित नहीं होता है\nLSDJ DOES NOT GLOW ON UNLOCKING BL KEY/SWITCH\n(BL अनलॉक करने पर LSDJ न जलना / दूसरी कैब में LSDJ जांच / दोनों कैब में न होने पर RS प्रेशर जांच व CPA द्वारा 8 Kg/cm² बनाना / रिले QV60 को 2-3 बार ऑपरेट करना)",
    lamp: "BL अनलॉक करने पर LSDJ पायलट लैम्प नहीं जलता है (LSDJ pilot lamp does not illuminate)",
    effect: "DJ ओपन/क्लोज स्थिति का इंडिकेशन नहीं मिलता; RS में हवा का दबाव कम होने पर DJ क्लोज नहीं होगा",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) दूसरी कैब में LSDJ चेक करें।",
      "b) यदि दोनों कैब में प्रकाशित नहीं है तो: RS में प्रेशर चेक करें। यदि कम है तो CPA द्वारा 8 Kg/cm² प्रेशर बनाएं।",
      "c) QV60 को दो-तीन बार ऑपरेट करें। लैम्पों को चेक करें।"
    ]
  },
  {
    id: "CONV-LSCHBA-NOT-GLOWING-ON-UNLOCKING-BL",
    subSystem: "SS01",
    message: "BL अनलॉक करने पर LSCHBA प्रकाशित नहीं होता है\nLSCHBA DOES NOT GLOW ON UNLOCKING BL KEY/SWITCH\n(BL अनलॉक करने पर LSCHBA न जलना / दूसरी कैब में जांच / BLRDJ 3-4 सेकंड में छोड़ें / CHBA एमीटर चार्जिंग करंट जांच)",
    lamp: "BL अनलॉक करने पर LSCHBA पायलट लैम्प नहीं जलता है",
    effect: "बैटरी चार्जर CHBA इंडिकेशन उपलब्ध नहीं; DJ क्लोजिंग के समय समय पर BLRDJ छोड़ना होगा",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) दूसरी कैब में LSCHBA चेक करें।",
      "b) यदि दोनों कैब में प्रकाशित नहीं है तो निम्न सावधानी रखें -",
      "i) जब कभी DJ/VCB क्लोज करना हो BLRDJ को 3-4 सेकंड में छोड़ दें।",
      "ii) CHBA काम कर रहा है, सुनिश्चित करने के लिये CHBA एमीटर पर ध्यान रखें।"
    ]
  },
  {
    id: "CONV-LSB-NOT-GLOWING-ON-UNLOCKING-BL",
    subSystem: "SS01",
    message: "BL अनलॉक करने पर LSB प्रकाशित नहीं होता है\nLSB DOES NOT GLOW ON UNLOCKING BL KEY/SWITCH\n(BL अनलॉक करने पर LSB न जलना / दूसरी कैब में जांच / MPJ ऑपरेट करते समय दोनों रिवर्सर व Q50 इनर्जाइज सुनिश्चित / रेहियोस्टैटिक ब्रेक उपयोग न करें)",
    lamp: "BL अनलॉक करने पर LSB पायलट लैम्प नहीं जलता है",
    effect: "रिवर्सर व ट्रैक्शन/ब्रेकिंग चेंजओवर की स्थिति का लैम्प इंडिकेशन बाधित; Q50 व रिवर्सर दिशा की मैन्युअल पुष्टि आवश्यक",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) दूसरी कैब में LSB चेक करें।",
      "b) यदि दोनों कैबों में LSB प्रकाशित नहीं है तो निम्न सावधानी रखें:-",
      "• जब कभी MPJ को ऑपरेट करें, सुनिश्चित करें कि दोनों रिवर्सर (J1, J2) वांछित दिशा में सेट हो गये हैं और Q50 इनर्जाइज हो गई है।",
      "c) रेहियोस्टैटिक ब्रेक का उपयोग न करें।"
    ]
  },
  {
    id: "CONV-LSGR-NOT-GLOWING-ON-UNLOCKING-BL",
    subSystem: "SS01",
    message: "BL अनलॉक करने पर LSGR प्रकाशित नहीं होता है\nLSGR DOES NOT GLOW ON UNLOCKING BL KEY/SWITCH\n(BL अनलॉक करने पर LSGR न जलना / SMGR ड्रम चेक / GR हाथ से 0 / एमीटर व नोच रिपीटर पर ध्यान रखकर गाड़ी चलाना)",
    lamp: "BL अनलॉक करने पर LSGR पायलट लैम्प नहीं जलता है (GR 0 पर बुझा रहता है)",
    effect: "GR 0 पोजीशन इंडिकेशन बाधित",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) SMGR ड्रम चेक करें और GR “0” पर है, सुनिश्चित करें। यदि GR “0” पर नहीं है तो उसे हाथ से “0” पर लाएं। लैम्प चेक करें।",
      "b) यदि GR “0” पर है तो एमीटर और नोच रिपीटर की ओर ध्यान रखते हुये गाड़ी चलाएं।"
    ]
  },
  {
    id: "CONV-LSP-GLOWS-ON-UNLOCKING-BL",
    subSystem: "SS01",
    message: "BL अनलॉक करने पर LSP प्रकाशित होता है\nLSP GLOWS ON UNLOCKING BL KEY/SWITCH\n(BL अनलॉक करने पर LSP प्रकाशित होना / Q-48 इनर्जाइज चेक व थपथपाएं / HMCS प्रयत्न / सैंडिंग COC बंद व GR हाथ से ऑपरेट / Q-48 डी-इनर्जाइज होने पर BPT 2-3 बार ऑपरेट)",
    lamp: "BL अनलॉक करते ही बिना नोच लिए LSP पायलट लैम्प प्रकाशित हो जाता है",
    effect: "व्हील स्लिप सर्किट एक्टिव या रिले Q48 चिपकी होने से ऑटो रिग्रेशन या सैंडिंग का जोखिम",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) Q-48 चेक करें (LSP): यदि इनर्जाइज है तो Q-48 को हाथ से थपथपाएं, अगर सफलता न मिले तो HMCS के द्वारा प्रयत्न करें, अगर फिर भी सफलता नहीं मिलती तो सैंडिंग COC बंद करें और GR को हाथ से ऑपरेट करके सेक्शन क्लीयर करें।",
      "b) यदि Q-48 रिले डी-इनर्जाइज है तो: BPT को 2-3 बार ऑपरेट करें।"
    ]
  },
  {
    id: "CONV-BPT-LSP-LSRSI-NOT-GLOWING",
    subSystem: "SS01",
    message: "BPT दबाने पर LSP / LSRSI प्रकाशित नहीं होते हैं\nLSP / LSRSI DO NOT GLOW ON PRESSING BPT (LAMP TEST PUSH BUTTON)\n(BPT दबाने पर लैम्प टेस्ट फेल / पीछे वाली कैब BPT जांच / व्हील स्लिप व एमीटर निगरानी / RSI टेल-टेल फ्यूज व LED समय-समय पर चेक करना)",
    lamp: "BPT (Lamp Test Push Button) दबाने पर LSP या LSRSI पायलट लैम्प नहीं जलते हैं",
    effect: "पायलट लैम्प बल्ब या टेस्टिंग सर्किट खराब; पहिया फिसलने या RSI ब्लॉक फेलियर पर दृश्य चेतावनी नहीं मिल सकेगी",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "• LSP / LSRSI को टेस्ट करने के लिये पीछे वाली कैब की BPT दबाएं।",
      "• यदि LSP / LSRSI प्रकाशित नहीं होते हैं तो सावधानीपूर्वक गाड़ी चलाएं:",
      "a) व्हील स्लिप के साथ एमीटरों में उतार-चढ़ाव चेक करते रहें।",
      "b) समय-समय पर RSI ब्लॉक पर टेल-टेल फ्यूज चेक करते रहें।",
      "c) यदि LED वाले RSI ब्लॉक हैं तो सभी LED का बुझा होना चेक करते रहें।"
    ]
  },
  {
    id: "CONV-CPA-NOT-STARTING",
    subSystem: "SS01",
    message: "CPA चालू नहीं होता है\nCPA (BABY COMPRESSOR) DOES NOT START\n(CPA चालू न होना / HBA \"1\" व बैटरी 80V से अधिक / CCBA चेक व HOBA उपयोग / ZCPA 2-3 बार ऑपरेट / ZCPA व MCPA टर्मिनल वायर कनेक्शन जांच)",
    lamp: "CPA मोटर की आवाज नहीं आती, RS प्रेशर नहीं बढ़ता (CPA motor does not run)",
    effect: "कंट्रोल रिजर्वोयर RS में एयर प्रेशर नहीं बनेगा; पैंटोग्राफ नहीं उठ सकेगा तथा DJ क्लोज नहीं हो पाएगा",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) HBA “1” पर है और बैटरी वोल्टेज 80 वोल्ट से अधिक है, सुनिश्चित करें (ZCPA को “1” पर रखने के बाद)।",
      "b) CCBA चेक करें। यदि आवश्यक हो तो HOBA का उपयोग करें।",
      "c) ZCPA को 2-3 बार ऑपरेट करें।",
      "d) ZCPA के टर्मिनल वायर कनेक्शन चेक करें।",
      "e) MCPA के टर्मिनल वायर कनेक्शन चेक करें।"
    ]
  },
  {
    id: "CONV-CPA-RUNS-RS-PRESSURE-NOT-BUILDING",
    subSystem: "SS01",
    message: "CPA चालू होता है परंतु RS प्रेशर नहीं बनता है\nCPA STARTS BUT RS PRESSURE DOES NOT BUILD UP\n(CPA चालू होना पर RS प्रेशर न बनना / RAL कॉक खुला व टैप / RS व MCPA ड्रेन कॉक बंद / RDJ व DJ ऑयल सेपरेटर ड्रेन कॉक / पैंटो पाइपिंग व BV बॉक्स लीकेज / DJ-VCB बॉक्स / CPA सेफ्टी वाल्व या COC / R-1 COC क्लोज / CPA चालू रख लोको इनर्जाइज / चार्जिंग रेट 1 kg/cm² प्रति मिनट)",
    lamp: "CPA मोटर चलती है परंतु RS गेज पर सुई नहीं बढ़ती या 8 kg/cm² तक नहीं पहुंचती",
    effect: "RS प्रेशर कम रहने से पैंटोग्राफ रेज नहीं होगा और DJ/VCB क्लोज नहीं हो सकेगा",
    actions: [
      "【कार्यवाही जो करनी है (Action to Take)】:",
      "a) सुनिश्चित करें कि RAL कॉक खुला है (उसे टैप करें)।",
      "b) RS और MCPA के ड्रेन कॉक बंद हैं, सुनिश्चित करें।",
      "c) RDJ और DJ ऑयल सेपरेटर के ड्रेन कॉक बंद हैं।",
      "d) पैंटो पाइपिंग ड्रेन कॉक बंद है और पैंटो पाइप में कोई लीकेज नहीं है और BV बॉक्स में कोई लीकेज नहीं है, सुनिश्चित करें।",
      "e) DJ/VCB कंट्रोल बॉक्स में कोई लीकेज नहीं है, सुनिश्चित करें।",
      "f) यदि CPA का सेफ्टी वाल्व लीक कर रहा है तो उसे ब्लैंक करें। यदि संबंधित COC दिया है तो उसे बंद करें।",
      "g) R-1 COC को क्लोज करके प्रयत्न करें।",
      "h) CPA को चालू रखें और लोको इनर्जाइज करने का प्रयत्न करें। जब MR प्रेशर 7 kg/cm² हो जाये तो CPA बंद कर दें।",
      "• नोट: CPA चार्जिंग रेट चेक करें - 1 kg/cm² प्रति मिनट होना चाहिए।"
    ]
  }
];




