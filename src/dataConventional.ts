import { SubSystem, Fault } from './types';

export const conventionalSubSystems: SubSystem[] = [
  { id: 'CONV_DJ', name: 'डीजे व पैंटो सर्किट (DJ & Pantograph)' },
  { id: 'CONV_GR', name: 'टैप चेंजर व नोचिंग (Tap Changer GR & Notching)' },
  { id: 'CONV_AUX', name: 'ऑक्सिलरी व अर्नो/SIV (Auxiliaries & SIV)' },
  { id: 'CONV_RELAY', name: 'सुरक्षा रिले (Safety Relays: QOP, QOA, QLM, QRSI)' },
  { id: 'CONV_TRACTION', name: 'ट्रैक्शन मोटर व पावर सर्किट (Traction Motor & Power)' },
  { id: 'CONV_PNEUMATIC', name: 'न्यूमैटिक व ब्रेक सिस्टम (Pneumatic & Brake)' },
  { id: 'CONV_CAB', name: 'कैब कंट्रोल व उपकरण (Cab Controls & Equipment)' },
  { id: 'CONV_FUSE', name: 'फ्यूज व कंट्रोल सप्लाई (Fuses & Control Supply)' },
];

export const conventionalFaults: Fault[] = [
  {
    id: 'CONV-DJ-NOT-CLOSING',
    subSystem: 'CONV_DJ',
    message: 'LSDJ नहीं बुझता है / DJ-VCB क्लोज़ नहीं होता है\nLSDJ DOES NOT EXTINGUISH / DJ-VCB NOT CLOSING\n(फ़ेलियर का प्रकार और असामान्‍य संकेत: LSDJ नहीं बुझता है - ICDJ)',
    lamp: 'LSDJ जलता रहेगा, UA मीटर शून्य रहेगा (LSDJ remains glowing, UA meter zero)',
    effect: 'DJ/VCB क्लोज नहीं होगा, लोको में OHE सप्लाई नहीं आएगी (DJ/VCB will not close; OHE supply will not enter loco)',
    actions: [
      '【उप-असामान्य संकेत / कार्यवाही जो करनी है: i) कम प्रेशर (Sub-abnormal Indication i: Low Pressure)】',
      'a) Ensure RAL cock is open. (a) RAL कॉक खुला है, सुनिश्चित करें।)',
      'b) If RS pressure is low, build pressure using CPA (MCPA). (b) यदि RS प्रेशर कम है तो CPA द्वारा बनाएं।)',
      '【उप-असामान्य संकेत / कार्यवाही जो करनी है: ii) कम बैटरी वोल्टेज (Sub-abnormal Indication ii: Low Battery Voltage)】',
      'a) Switch off all unnecessary cab lights and lamps. If Q118 does not energize due to low battery voltage, operate Q44 manually, close DJ/VCB, and release Q44 when LSCHBA extinguishes. (a) सभी अनावश्यक बत्तियां बुझा दें। यदि कम बैटरी वोल्टेज के कारण Q118 इनर्जाइज नहीं होती है तो Q44 को हाथ से ऑपरेट करें, DJ/VCB क्लोज करें और LSCHBA के बुझने पर Q44 को छोड़ दें।)',
      '【उप-असामान्य संकेत / कार्यवाही जो करनी है: iii) Q118 इनर्जाइज नहीं होती है (Sub-abnormal Indication iii: Q118 Does Not Energize)】',
      'a) Check pantograph - if pantograph is raised, CCBA and CCPT are intact. If pantograph is not raised - check CCBA and CCPT fuses; if melted, replace fuse once. If it melts again, place HOBA to "OFF" position and replace fuse. (a) पैंटो चेक करें - यदि पैंटो उठी हुई हालत में है तो, CCBA और CCPT बराबर है। यदि पैंटो उठा हुआ नहीं है तो – CCBA और CCPT चेक करें, यदि पिघल गए हैं तो एक बार फ्यूज बदल दें। यदि फिर से पिघलता है तो HOBA को "ऑफ" पोजीशन पर रख कर फ्यूज बदली करें।)',
      'b) Ensure GR is at "0". If GR is not at "0", bring it to "0" manually by hand. (b) GR "0" पर है, सुनिश्चित करें। यदि GR "0" पर नहीं है तो उसे हाथ से "0" पर लाएं।)',
      'c) Ensure auxiliary contactors C118, C105, C106 and C107 are open. (c) ऑक्सिलरी कॉन्टैक्टर C118, C105, C106 और C107 खुले हैं, सुनिश्चित करें।)',
      'd) Operate Q118 manually by hand until all auxiliaries have started (simultaneously press BP2DJ / BLRDJ). (d) सभी ऑक्सिलरियों के चालू हो जाने तक Q118 को हाथ से ऑपरेट करें (साथ में BP2DJ / BLRDJ को दबाएं)।)',
      'e) Wedge relay Q118 with approved procedure. (e) Q118 को वेज करें।)',
      '【उप-असामान्य संकेत / कार्यवाही जो करनी है: iv) BLRDJ को दबाने पर Q45 इनर्जाइज नहीं होती है (Sub-abnormal Indication iv: Q45 Does Not Energize on pressing BLRDJ)】',
      'a) Ensure ZPT is at "1" or "2" and BLDJ is closed. (a) ZPT "1" या "2" पर और BLDJ क्लोज है, सुनिश्चित करें।)',
      'b) Check CCDJ fuse - if needed, operate HOBA switch. (b) CCDJ चेक करें - आवश्यक हो तो HOBA का उपयोग करें।)',
      'c) Ensure GR is at "0" and SMGR drum indicates "0". (c) GR "0" पर है, SMGR ड्रम "0" बताता है, सुनिश्चित करें।)',
      'd) Operate ZPT 2-3 times, re-raise pantograph and attempt to close DJ/VCB. (d) ZPT को दो-तीन बार ऑपरेट करें, पैंटो को फिर से रेज करें और DJ/VCB क्लोज करने का प्रयत्न करें।)',
      'e) Operate BLDJ, BLRDJ, BP1DJ and BP2DJ 2-3 times and attempt again. (e) BLDJ, BLRDJ, BP1DJ और BP2DJ को 2-3 बार ऑपरेट करके फिर से प्रयत्न करें।)',
      'f) Operate Q45 manually by hand and release it when LSCHBA extinguishes. (f) Q45 को हाथ से ऑपरेट करें और LSCHBA के बुझने पर उसे छोड़ दें।)',
      'g) Attempt to close DJ/VCB from the other cab. (g) दूसरी कैब से प्रयत्न करें।)',
      '【उप-असामान्य संकेत / कार्यवाही जो करनी है: v) BLRDJ को दबाने पर Q44 इनर्जाइज नहीं होती है (Sub-abnormal Indication v: Q44 Does Not Energize on pressing BLRDJ)】',
      'a) Operate GR manually 2-3 times and bring it back to "0". Note: Even if LSGR is illuminated, take 2-3 notches manually on GR and return GR to "0". (a) GR को हाथ से 2-3 बार ऑपरेट करें और वापस "0" पर लाएं। नोट: यदि LSGR प्रकाशित है फिर भी GR को 2-3 नोच लेकर मैनुअली ऑपरेट करें एवं पुनः GR को "0" पर लाएं।)',
      'b) Operate Q44 manually by hand, simultaneously pressing BLRDJ / BP2DJ; release Q44 as soon as DJ/VCB closes. (b) Q44 को हाथ से ऑपरेट करें, उसके साथ-साथ BLRDJ/BP2DJ को दबाएं। DJ/VCB के क्लोज होते ही Q44 को छोड़ दें।)',
      '【उप-असामान्य संकेत / कार्यवाही जो करनी है: vi) BLRDJ को दबाने पर C118 क्लोज नहीं होता है (Sub-abnormal Indication vi: C118 Does Not Close on pressing BLRDJ)】',
      'a) Ground the locomotive. Check coil terminals of C118. Operate mobile jaw 2-3 times. Unground locomotive and attempt to close DJ/VCB. If unsuccessful, demand assistance. (a) लोको ग्राउंड करें। C118 के कॉइल टर्मिनल चेक करें। मोबाइल जॉ को 2-3 बार ऑपरेट करें। लोको अनग्राउंड करें और DJ/VCB क्लोज करने का प्रयत्न करें। यदि सफलता नहीं मिलती तो सहायता मांगें।)',
      '• Note: If C118 is located outside HT compartment, operate C-118 using dry wooden stick to close DJ/VCB. (नोट :- यदि C118 HT कम्पार्टमेंट के बाहर लगा है तो DJ/VCB क्लोज करने के लिए C-118 को सूखी लकड़ी से ऑपरेट करें।)',
      '【उप-असामान्य संकेत / कार्यवाही जो करनी है: vii) C118 क्लोज होता है परंतु DJ/VCB क्लोज नहीं होता (Sub-abnormal Indication vii: C118 Closes But DJ/VCB Does Not Close)】',
      'a) Check RS pressure. Close DJ and work train. (a) RS प्रेशर चेक करें। DJ क्लोज करके गाड़ी चलाएं।)',
      'b) Operate BPEMS 2-3 times and normalize it. (b) BPEMS को 2-3 बार ऑपरेट करके नॉर्मल करें।)',
      'c) Check terminals of normally open (N/O) interlock of C-118. (c) C-118 के N/O इंटरलॉक के टर्मिनल चेक करें।)',
      'd) In VCB fitted locomotives, close R1 cock and drain RS pressure. Once pressure is drained, close RS drain cock and open R1 cock. If RS pressure is low, build pressure using MCPA. Attempt to close VCB again. (d) VCB वाले लोको में R1 कॉक बंद करके RS प्रेशर ड्रेन करें। प्रेशर ड्रेन होने पर RS ड्रेन कॉक बंद करके R1 कॉक खोलें। यदि RS प्रेशर कम है तो MCPA द्वारा प्रेशर बनाएं। पुनः VCB क्लोज करने का प्रयत्न करें।)'
    ]
  },
  {
    id: 'CONV-LSDJ-EXTINGUISHED-UA-ZERO',
    subSystem: 'CONV_DJ',
    message: 'LSDJ बुझता है, UA डेविएट नहीं होता है\nLSDJ EXTINGUISHES, UA DOES NOT DEVIATE (0 KV)\n(डीजे क्लोज होने पर भी UA मीटर शून्य रहना / पैंटो व OHE वोल्टेज अनुपलब्ध)',
    lamp: 'LSDJ बुझ जाएगा, UA मीटर शून्य (0 KV) दर्शाएगा (LSDJ extinguishes, UA meter remains at 0 KV)',
    effect: 'DJ/VCB क्लोज है परंतु OHE वोल्टेज नहीं मिल रहा है; लोको ट्रैक्शन एवं ऑक्सिलरी कार्य नहीं करेंगे (DJ/VCB closed but no OHE supply available; traction & auxiliaries will not work)',
    actions: [
      '• Inspection: Check Pantograph. (जांच: पैंटो चेक करें।)',
      'a) If pantograph is not touching OHE: Raise the other pantograph. If necessary, troubleshoot for pantograph not raising (Failure No. 11, Page No. 63). (a) यदि पैंटो OHE को स्पर्श नहीं कर रहा है तो दूसरा पैंटो उठाएं। यदि आवश्यक हो तो पैंटो रेज़ नहीं होने के लिए ट्रबलशूट करें (फेलियर क्र. 11 पृष्ठ क्र. 63)।)',
      'b) If pantograph is touching OHE: Ensure that no object is shorting OHE with train, loco or roof bar, and pantograph has sustained no damage. (b) यदि पैंटो OHE को स्पर्श कर रहा है तो सुनिश्चित करें कि कोई भी वस्तु OHE को गाड़ी, लोको या रूफ बार के साथ शॉर्ट तो नहीं कर रही है और पैंटो को कोई नुकसान नहीं हुआ है।)',
      'c) Lower pantograph and check arcing. If there is no arcing, there is no OHE supply (OHE Dead / Power Block). Immediately switch ON flasher light, control the train (maximum speed 60 km/h at night) and stop train before obstruction or at convenient location. Contact TPC and act as per instructions (try closing VCB every 1 minute to detect tension resumption). If TPC cannot be contacted, LP shall depute ALP along with Guard to inspect train and loco. If any abnormality is noticed in train/loco inspection, immediately inform control and act as per instructions. If no abnormality is found and supply resumes, switch off flasher light and resume normal traction. (c) पैंटो लोअर करें और आर्किंग चेक करें। यदि आर्किंग नहीं होती है तो OHE सप्लाई नहीं है। तुरंत फ्लैशर लाइट जलाएं, गाड़ी को कंट्रोल करके (रात के समय अधिकतम गति 60 किमी.प्र.घंटे) रुकावट के पहले अथवा सुविधाजनक स्थान पर गाड़ी खड़ी करें। TPC से संपर्क करके उसके निर्देशानुसार कार्य करें (टेंशन आने का पता करने के लिए हर एक मिनट में VCB क्लोज करके देखें)। यदि TPC से संपर्क नहीं होता है तो लोको पायलट अपने सहायक लोको पायलट को गार्ड के साथ गाड़ी और लोको की जांच करने के लिए नियुक्त करेगा। यदि लोको/गाड़ी की जांच में कोई असामान्यता मिलती है तो वे तुरंत इसकी सूचना कंट्रोल को देकर उसके निर्देशानुसार कार्य करें। - यदि असामान्यता नहीं मिलती और सप्लाई आ जाती है तो फ्लैशर लाइट बंद करके सामान्य ट्रैक्शन चालू करें।)',
      'd) If arcing occurs: Try to work train by raising the other pantograph. (d) यदि आर्किंग होती है तो दूसरे पैंटो को रेज़ करके गाड़ी चलाने का प्रयत्न करें।)',
      'e) If still not successful: Contact TLC. (e) यदि सफलता नहीं मिलती तो TLC से संपर्क करें।)'
    ]
  },
  {
    id: 'CONV-LSDJ-BEFORE-LSCHBA',
    subSystem: 'CONV_DJ',
    message: 'LSCHBA के बुझने से पहले LSDJ फिर से प्रकाशित होता है।\nLSDJ GLOWS AGAIN BEFORE LSCHBA EXTINGUISHES\n(डीजे क्लोज होने के 4-5 सेकंड में ही ट्रिप हो जाना / आर्नो व QCVAR इनर्जाइज नहीं होना)',
    lamp: 'LSDJ क्षणिक बुझकर पुनः प्रकाशित हो जाएगा, LSCHBA जलता रहेगा (LSDJ extinguishes momentarily and glows again, LSCHBA remains glowing)',
    effect: 'DJ/VCB ट्रिप होगा, आर्नो व सहायक मोटरें चालू नहीं होंगी, लोको में सप्लाई नहीं आएगी (DJ/VCB trips, ARNO and auxiliaries will not start)',
    actions: [
      'a) आर्नो चेक करें। (Check ARNO.)',
      '   i) यदि आर्नो असामान्य आवाज के साथ काम करता है अथवा आर्नो चालू नहीं होता है तो सहायता मांगें। (If ARNO works with abnormal sound or ARNO does not start: Demand assistance.)',
      '   ii) यदि आर्नो सामान्य रूप से काम करता है तो गाड़ी चलाएं। (If ARNO works normally: Work train.)',
      '• विस्तृत प्रक्रिया (Detailed Procedure): HQCVAR को पोजीशन "0" पर रखें, DJ/VCB क्लोज करें और BLRDJ को 3-4 सेकंड में छोड़ दें। LSCHBA नहीं बुझेगा: आर्नो चेक करें।'
    ]
  },
  {
    id: 'CONV-LSDJ-AFTER-LSCHBA',
    subSystem: 'CONV_DJ',
    message: 'LSCHBA के बुझने के बाद LSDJ फिर से प्रकाशित होता है।\nLSDJ GLOWS AGAIN AFTER LSCHBA EXTINGUISHES\n(ऑक्सिलरी सुरक्षा रिले QPH, QVSL-1, QVSL-2 ट्रिपिंग अथवा Q118 रिले फॉल्ट)',
    lamp: 'LSDJ बुझता है, LSCHBA भी बुझता है, परंतु उसके बाद LSDJ फिर से प्रकाशित हो जाता है (LSDJ extinguishes, LSCHBA also extinguishes, but thereafter LSDJ glows again)',
    effect: 'DJ/VCB ट्रिप हो जाएगा, सभी चालू सहायक मोटरें बंद हो जाएंगी (DJ/VCB trips, running auxiliary motors stop)',
    actions: [
      '【उप-असामान्य संकेत / कार्यवाही जो करनी है (Sub-abnormal Indication / Action to Take)】',
      '• Place HPH, HVSL-1 and HVSL-2 to position "3" and close DJ/VCB: (HPH, HVSL-1 और HVSL-2 को "3" पर रखें और DJ/VCB क्लोज करें:)',
      'a) If DJ/VCB holds: Check operation of MPH, MVSL-1 and MVSL-2 auxiliaries. ((a) यदि DJ/VCB कायम रहता है तो : MPH, MVSL-1 और MVSL-2 ऑग्जीलरीयों का कार्य चेक करें।)',
      'i) If MPH is not working: Place HPH to "0" and isolate it. (i) यदि MPH काम नहीं कर रहा है तो - HPH को "0" पर रखकर उसे आइसोलेट करें।)',
      'ii) If MVSL-1 or MVSL-2 are not working: Isolate the concerned block. (ii) यदि MVSL-1 या MVSL-2 काम नहीं करते हैं तो संबंधित ब्लॉक को आइसोलेट करें।)',
      'iii) If all three auxiliaries are working: Place HPH, HVSL-1 and HVSL-2 one by one to position "1" to identify the defective relay, and isolate it by placing the concerned switch back to "3". (iii) यदि तीनों ऑग्जीलरी काम करती हैं तो - HPH, HVSL-1 और HVSL-2 को एक-एक करके पोजीशन "1" पर रखकर खराबी वाली रिले का पता लगाएं और संबंधित स्विच को वापस "3" पर रखकर उसे आइसोलेट करें।)',
      'b) If DJ/VCB does not hold: Place HQCVAR to "0" and close DJ/VCB. ((b) यदि DJ/VCB कायम नहीं रहता है तो - HQCVAR को "0" पर रखें और DJ/VCB क्लोज करें।)',
      'c) If DJ/VCB still does not hold: Wedge relay Q118. ((c) यदि DJ/VCB कायम नहीं रहता है तो - Q118 को वेज करें।)'
    ]
  },
  {
    id: 'CONV-BLVMT-DJ-TRIP',
    subSystem: 'CONV_AUX',
    message: 'BLVMT क्लोज करने पर DJ/VCB ट्रिप होता है\nDJ/VCB TRIPS ON CLOSING BLVMT\n(ब्लोअर स्विच ऑन करने पर डीजे ट्रिपिंग / ब्लोअर मोटर या रिले QVRH, QVMT-1, QVMT-2 दोष)',
    lamp: 'LSDJ जल जाएगा, BLVMT क्लोज करते ही DJ ट्रिप होगा (LSDJ will glow, DJ trips as soon as BLVMT is closed)',
    effect: 'DJ/VCB खुल जाएगा, ब्लोअर मोटरें और ट्रैक्शन बंद हो जाएंगे (DJ/VCB trips, blower motors and traction will stop)',
    actions: [
      '【उप-असामान्य संकेत / कार्यवाही जो करनी है (Sub-abnormal Indication / Action to Take)】',
      '• Place HVRH, HVMT-1 and HVMT-2 to position "3" and close DJ/VCB: (HVRH, HVMT-1 और HVMT-2 को "3" पर रखकर DJ/VCB क्लोज करें:)',
      'a) If DJ/VCB holds: Check operation of MVRH, MVMT-1 and MVMT-2 blowers. ((a) यदि DJ/VCB कायम रहता है तो : MVRH, MVMT-1 और MVMT-2 ब्लोअरों का कार्य चेक करें।)',
      'i) If any blower is not working: Isolate it. (i) यदि कोई ब्लोअर काम नहीं करता तो – उसे आइसोलेट करें।)',
      'ii) If all blowers are working: Starting from HVMT-2, put switches one by one to position "1" at 6-second intervals to identify the defective relay, and isolate it by placing the concerned switch to "3". (ii) यदि सभी ब्लोअर काम करते हैं तो HVMT-2 से प्रारंभ करके 6 सेकंड के समय के अंतर से एक-एक करके स्विचों को पोजीशन "1" पर रखकर खराबी वाली रिले का पता लगाएं और संबंधित स्विच को "3" पर रखकर उसे आइसोलेट करें।)',
      'b) If DJ/VCB does not hold: Wedge relay Q118. ((b) यदि DJ/VCB कायम नहीं रहता है तो - Q118 को वेज करें।)'
    ]
  },
  {
    id: 'CONV-MPH-NOT-WORKING',
    subSystem: 'CONV_AUX',
    message: 'MPH काम नहीं करता है\nMPH (TRANSFORMER OIL PUMP) DOES NOT WORK\n(ट्रांसफॉर्मर ऑयल पंप मोटर MPH का कार्य न करना / HPH स्विच व 450A प्रतिबंध)',
    lamp: 'तेल सर्कुलेशन नहीं होगा, रिले QPH इनर्जाइज नहीं होगी (No oil circulation, relay QPH will not energize)',
    effect: 'ट्रांसफॉर्मर तेल गर्म हो सकता है; MPH आइसोलेट करने पर ट्रैक्शन करंट 450A तक सीमित (Transformer oil temperature may rise; traction current limited to 450A)',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) Ensure HPH is at position "1". ((a) HPH "1" पर है, सुनिश्चित करें।)',
      'b) Place HPH switch to "0" and isolate MPH. ((b) HPH को "0" पर रखकर MPH को आइसोलेट करें।)',
      'c) Clear section with 450 Amp traction motor current. ((c) 450 एम्पीयर से सेक्शन क्लियर करें।)'
    ]
  },
  {
    id: 'CONV-MVSI-NOT-WORKING',
    subSystem: 'CONV_AUX',
    message: 'MVSI-1 / MVSI-2 काम नहीं करता है\nMVSI-1 / MVSI-2 (SILICON RECTIFIER BLOWER) DOES NOT WORK\n(सिलिकॉन रेक्टिफायर ब्लोअर मोटर का कार्य न करना / ब्लॉक आइसोलेशन व आधा लोड नियम)',
    lamp: 'रिले QVSI पिकअप नहीं होगी, LSDJ प्रकाशित हो सकता है (Relay QVSI will not pick up, LSDJ may glow)',
    effect: 'रेक्टिफायर ठंडा नहीं होगा; संबंधित ब्लॉक को आइसोलेट करना होगा (Rectifier will overheat; concerned block must be isolated)',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) Ensure concerned switch HVSI-1 / HVSI-2 is on position "1". ((a) HVSI-1 / HVSI-2 “1” पर है, सुनिश्चित करें।)',
      'b) Isolate the concerned block by placing concerned switches HVSI, HVMT and HVSL to position "0". Work train with half of the permissible load. ((b) संबंधित HVSI, HVMT और HVSL को “0” पर रखकर ब्लॉक को आइसोलेट करें। अनुमत (Permissible) लोड के आधे लोड से काम करें।)'
    ]
  },
  {
    id: 'CONV-MVSL-NOT-WORKING',
    subSystem: 'CONV_AUX',
    message: 'MVSL-1 / MVSL-2 काम नहीं करता है\nMVSL-1 / MVSL-2 (SMOOTHING REACTOR BLOWER) DOES NOT WORK\n(स्मूदिंग रिएक्टर ब्लोअर मोटर MVSL का कार्य न करना / ब्लॉक आइसोलेशन व आधा लोड नियम)',
    lamp: 'रिले QVSL पिकअप नहीं होगी, LSDJ प्रकाशित हो सकता है (Relay QVSL will not pick up, LSDJ may glow)',
    effect: 'स्मूदिंग रिएक्टर SL गर्म हो सकता है; संबंधित ब्लॉक आइसोलेट करना होगा (Smoothing reactor will overheat; concerned block must be isolated)',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) Ensure concerned switch HVSL-1 / HVSL-2 is on position "1". ((a) HVSL-1 / HVSL-2 “1” पर है, सुनिश्चित करें।)',
      'b) Isolate the concerned block by placing concerned switches HVSI, HVMT and HVSL to position "0". Work train with half of the permissible load. ((b) संबंधित HVSI, HVMT और HVSL को “0” पर रखकर ब्लॉक को आइसोलेट करें। अनुमत (Permissible) लोड के आधे लोड से कार्य करें।)'
    ]
  },
  {
    id: 'CONV-MVMT-NOT-WORKING',
    subSystem: 'CONV_AUX',
    message: 'MVMT-1 / MVMT-2 चालू नहीं होता है\nMVMT-1 / MVMT-2 (TRACTION MOTOR BLOWER) DOES NOT START\n(ट्रैक्शन मोटर ब्लोअर मोटर MVMT का चालू न होना / कॉन्टैक्टर C107, C105, C106 व ब्लॉक आइसोलेशन)',
    lamp: 'रिले QVMT पिकअप नहीं होगी, LSDJ प्रकाशित हो सकता है (Relay QVMT will not pick up, LSDJ may glow)',
    effect: 'ट्रैक्शन मोटरें ठंडी नहीं होंगी; ब्लोअर चालू न होने पर संबंधित ब्लॉक आइसोलेट करना होगा (Traction motors will overheat; concerned block must be isolated)',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) Ensure concerned switch HVMT-1 / HVMT-2 is on position "1". ((a) HVMT-1 / HVMT-2 “1” पर है, सुनिश्चित करें।)',
      'b) Ensure contactor C107 is closed. If C107 does not close, troubleshoot; if necessary, wedge it. ((b) C107 क्लोज है, सुनिश्चित करें। यदि C107 क्लोज नहीं होता तो ट्रबल शूट करें, यदि आवश्यक हो तो उसे वेज करें।)',
      'c) Check closing of contactors C105 / C106. If C105 / C106 is closed but MVMT-1 / MVMT-2 does not start, isolate the concerned block by placing the concerned switches to position "0". ((c) C105 / C106 का क्लोज होना चेक करें। यदि C105 / C106 क्लोज है परंतु MVMT-1 / MVMT-2 चालू नहीं होता है तो संबंधित स्विचों को “0” पर रखकर ब्लॉक आइसोलेट करें।)'
    ]
  },
  {
    id: 'CONV-MVRH-NOT-WORKING',
    subSystem: 'CONV_AUX',
    message: 'MVRH चालू नहीं होता है\nMVRH (TRANSFORMER OIL COOLING RADIATOR BLOWER) DOES NOT START\n(यदि BLVMT क्लोज करने पर तीनों ब्लोअर नहीं चलते हैं तो 1 नोच लेकर देखें / HVRH, C107, Q118 वेज व HC-107 नियम)',
    lamp: 'रिले QVRH पिकअप नहीं होगी, LSDJ प्रकाशित हो सकता है (Relay QVRH will not pick up, LSDJ may glow)',
    effect: 'ट्रांसफॉर्मर तेल ठंडा नहीं होगा; MVRH आइसोलेट करने पर Q118 वेज कर अधिकतम 450A से 1-2 सेक्शन क्लियर करें (Transformer oil will overheat; clear 1-2 sections at max 450A)',
    actions: [
      '• यदि BLVMT क्लोज करने पर तीनों ब्लोअर नहीं चलते हैं तो 1 नोच लेकर देखें: (If all 3 blowers do not start on closing BLVMT, take 1 notch and check:)',
      'a) Ensure MCP is working (i.e. relay Q100 is energized). If MCP does not work, troubleshoot for MCP first. ((a) MCP काम करता है, सुनिश्चित करें (अर्थात Q100 इनर्जाइज है)। यदि काम नहीं करता तो पहले MCP के लिये ट्रबल शूट करें।)',
      'b) Ensure switch HVRH is on position "1". ((b) HVRH “1” पर है, सुनिश्चित करें।)',
      'c) If contactor C107 does not close: Troubleshoot, if necessary wedge it. (To close DJ/VCB, place HVRH to "0" or "3"). ((c) यदि C107 क्लोज नहीं होता तो ट्रबल शूट करें। यदि आवश्यक हो तो उसे वेज करें (DJ/VCB क्लोज करने के लिये HVRH को “0”/“3” पर रखें)।)',
      'd) If C107 is closed but MVRH does not start: Isolate MVRH by placing HVRH to position "0". Wedge relay Q-118 with approved procedure. Clear one or two block sections with maximum 450 Amp traction motor current. ((d) यदि C107 क्लोज है परंतु MVRH चालू नहीं होता तो HVRH को “0” पर रखकर MVRH को आइसोलेट करें। Q-118 को वेज करें। 450 Amp से एक या दो सेक्शन क्लियर करें।)',
      '• Note (If HC-107 is provided on TB Panel): In microprocessor locomotives, when HVRH is kept on "0" position, operate switch HC-107 so that DJ/VCB does not trip on 6th notch, and clear section with 450 Amp. (नोट :- [TB Panel पर यदि HC-107 हो तो]: माइक्रोप्रोसेसर लोको में जब HVRH "0" पोजीशन पर रखा हो, HC-107 को ऑपरेट करें ताकि 6th नोच पर DJ/VCB ट्रिप न हो, 450 amp से सेक्शन क्लियर करें।)'
    ]
  },
  {
    id: 'CONV-AUX-DAMAGED-BURNT',
    subSystem: 'CONV_AUX',
    message: 'यदि कोई ऑक्सिलरी क्षतिग्रस्त (Damage) हो गई है अथवा जल गई है\nIF ANY AUXILIARY IS DAMAGED OR BURNT OUT\n(ऑक्सिलरी मोटर में आग/धुआं, जलने या क्षति होने पर सुरक्षा व आइसोलेशन नियम: MPH, MVSL, MVSI, MVMT, MCP, MVRH)',
    lamp: 'धुआं या आग दिखाई दे सकती है, LSDJ / QOA / QLA / QRSI ट्रिप हो सकता है (Smoke/fire visible, LSDJ/QOA/QLA/QRSI may trip)',
    effect: 'संबंधित ऑक्सिलरी ठप; बोगी/मोटर आइसोलेट करनी होगी, आधा लोड या 450A सीमा में कार्य करना होगा (Auxiliary damaged; isolate unit, work with half load or 450A limit)',
    actions: [
      '【सामान्य कार्यवाही (General Actions)】:',
      'a) If fire or smoke is visible: Lower pantograph immediately, halt the train. ((a) यदि आग या धुआं दिखाई देता है तो पैंटोग्राफ को लोअर करें, गाड़ी खड़ी करें।)',
      'b) Use Fire Extinguisher to extinguish the fire. ((b) आग बुझाने के लिये अग्निशामक यंत्र (Fire extinguisher) का उपयोग करें।)',
      'c) Isolate the burnt auxiliary by placing its concerned rotary switch to "0". ((c) जली हुई ऑक्सिलरी के संबंधित स्विच को “0” पर रखकर उसे आइसोलेट करें।)',
      'd) Always ensure that the contactor of the burnt auxiliary is fully open before energizing locomotive. ((d) लोको इनर्जाइज करने से पहले हमेशा सुनिश्चित करें कि जली हुई संबंधित ऑक्सिलरी का कॉन्टैक्टर पूरी तरह से खुल गया है।)',
      'e) Perform TSD of the concerned auxiliary as detailed below (also refer failures 1 to 7). ((e) नीचे बताये अनुसार संबंधित ऑक्सिलरी की TSD करें। [फेलियर क्र. 1 से 7 भी देखें])',
      '【1. MPH जल गई है (MPH Burnt Out)】:',
      'a) Place switch HPH to "0" to isolate MPH. ((a) MPH को आइसोलेट करने के लिये HPH को “0” पर रखें।)',
      'b) Clear section with maximum 450 Ampere traction motor current. ((b) 450 एम्पीयर से सेक्शन क्लियर करें।)',
      '【2. MVSL-1 या MVSI-1 या MVMT-1 जल गई है (Bogie-1 Burnt Auxiliary: MVSL-1 / MVSI-1 / MVMT-1)】:',
      'a) Place switches HVSI-1, HVMT-1 and HVSL-1 to "0". ((a) HVSI-1, HVMT-1 और HVSL-1 को “0” पर रखें।)',
      'b) Work train with half of the permissible load. ((b) अनुमत (Permissible) लोड के आधे से कार्य करें।)',
      'c) If DJ/VCB trips on 6th notch, wedge relay Q118. ((c) यदि छठी नोच पर DJ/VCB ट्रिप होता है तो Q118 को वेज करें।)',
      '【3. MVSL-2 या MVSI-2 या MVMT-2 जल गई है (Bogie-2 Burnt Auxiliary: MVSL-2 / MVSI-2 / MVMT-2)】:',
      'a) Place switches HVSI-2, HVMT-2 and HVSL-2 to "0". ((a) HVSI-2, HVMT-2 और HVSL-2 को “0” पर रखें।)',
      'b) Work train with half of the permissible load. ((b) अनुमत (Permissible) लोड के आधे से कार्य करें।)',
      'c) If DJ/VCB trips on 6th notch, wedge relay Q118. ((c) यदि छठी नोच पर DJ/VCB ट्रिप होता है तो Q118 को वेज करें।)',
      '【4. MCP-1 / MCP-2 / MCP-3 जल गई है (Main Compressor Burnt Out)】:',
      'a) Place switch HCP to such a position where the burnt MCP gets isolated. Ensure that the contactor of the burnt MCP is fully open. ((a) HCP को ऐसी पोजीशन पर रखें, जिस पर जली हुई MCP आइसोलेट हो जाये। संबंधित MCP का कॉन्टैक्टर पूरी तरह से खुल गया है, सुनिश्चित करें।)',
      '【5. MVRH जल गई है (Radiator Blower Burnt Out)】:',
      'a) Place switch HVRH to "0". ((a) HVRH को “0” पर रखें।)',
      'b) Wedge relay Q118. ((b) Q118 को वेज करें।)',
      'c) Clear section with maximum 450 Ampere traction motor current. ((c) 450 एम्पीयर से सेक्शन क्लियर करें।)'
    ]
  },
  {
    id: 'CONV-CHBA-NOT-WORKING',
    subSystem: 'CONV_AUX',
    message: 'CHBA काम नहीं करता है (DJ ट्रिप हुये बिना LSCHBA लैम्प प्रकाशित रहता है)\nCHBA (BATTERY CHARGER) NOT WORKING (LSCHBA GLOWS WITHOUT DJ TRIPPING)\n(बैटरी चार्जर कार्य न करना / HCHBA स्विच व एमीटर डिस्चार्जिंग/चार्जिंग करंट जांच)',
    lamp: 'LSCHBA लैम्प लगातार प्रकाशित रहेगा (DJ ट्रिप हुए बिना) (LSCHBA lamp remains glowing without DJ tripping)',
    effect: 'बैटरी चार्ज नहीं होगी; यदि डिस्चार्जिंग रही तो बैटरी वोल्टेज कम हो सकता है (Battery will not charge; battery voltage may drop if discharging)',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) Check position of switch HCHBA, it must be on "1". ((a) HCHBA की पोजीशन चेक करें, "1" पर होनी चाहिये।)',
      'b) Check CHBA ammeter: ((b) CHBA का एमीटर चेक करें:)',
      'i) If ammeter needle indicates discharging current: Place HCHBA to "0". Work with battery voltage. (Also refer Chapter 11 - Failure No. 7, Page No. 72-73). ((i) यदि एमीटर की सुई डिस्चार्जिंग करंट बताती है तो HCHBA को "0" पर रखें। बैटरी वोल्टेज से कार्य करें। (अध्याय 11-फेलियर क्र. 7 पृष्ठ क्र. 72-73 भी देखें))',
      'ii) If ammeter needle indicates charging current: Do not worry about LSCHBA - work train keeping watch on charging current. ((ii) यदि एमीटर की सुई चार्जिंग करंट बताती है तो LSCHBA की परवाह न करें - चार्जिंग करंट पर ध्यान रखकर गाड़ी चलाएं।)'
    ]
  },
  {
    id: 'CONV-FUSES-MELTING-FAILURES',
    subSystem: 'CONV_FUSE',
    message: 'फ्यूज पिघलने के फेलियर (विभिन्न फ्यूज के पिघलने पर मिलने वाले संकेत)\nINDICATIONS ON MELTING OF DIFFERENT FUSES IN CONVENTIONAL LOCOMOTIVES\n(कन्वेंशनल लोको में VCD तथा IPMV को सप्लाई CCLS से दी गई है / Additional CCBA, CCBA, CCPT, CCVCD, CCINV, CCA, CCLS, CCDJ, CCLSA)',
    lamp: 'पायलट लैम्प बुझना, LSGR / LSDBR बुझना, VCD हेल्दी लैम्प बुझना, UBA बैटरी वोल्टेज शून्य (Pilot lamps extinguish, LSGR/LSDBR extinguish, VCD healthy lamp extinguishes, UBA battery voltage "0" or normal)',
    effect: 'कंट्रोल सर्किट व ऑक्ज़ीलरी सप्लाई बाधित; VCB/DJ ट्रिप, ऑटो रिग्रेशन, पैंटो लोअर, कंप्रेसर/ब्लोअर बंद, या इमरजेंसी ब्रेक (Control circuit & auxiliary supply interrupted; VCB/DJ trip, auto regression, panto drops, compressors/blowers stop, or emergency brake application)',
    actions: [
      '• नोट: कन्वेंशनल लोको में VCD तथा IPMV को सप्लाई CCLS से दी गई है। (Note: In conventional locos, supply to VCD and IPMV is provided from CCLS).',
      '【1. एडिशनल CCBA पिघलने पर (Additional CCBA Fuse Melted)】:',
      '• चालू गाड़ी में जब तक DJ/VCB क्लोज है, एडिशनल CCBA पिघलने का पता नहीं चलता है। बैटरी चार्ज होना बंद हो जाती है।',
      '• जब DJ/VCB ओपन होता है या किया जाता है तब निम्नलिखित संकेत मिलते हैं:',
      '1) पैंटो लोअर हो जाएगा। ((1) Pantograph will lower).',
      '2) यदि GR नोच पर है तो रिग्रेशन नहीं होगा। LSGR पायलट लैम्प बुझा रहेगा। ((2) If GR is on notch, regression will not occur. LSGR pilot lamp will remain extinguished).',
      '3) सभी पायलट लैम्प बुझ जाएंगे। ((3) All pilot lamps will extinguish).',
      '4) LSDBR लैम्प बुझ जाएगा। ((4) LSDBR lamp will extinguish).',
      '5) ZUBA दबाने पर UBA बैटरी वोल्टेज ‘0’ बताएगी। ((5) On pressing ZUBA, UBA will indicate battery voltage "0").',
      '6) फ्यूज टेस्टर ECC कार्य नहीं करेगा। ((6) Fuse tester ECC will NOT work).',
      '7) IP Magnet valve COC खुला है तो BP प्रेशर ड्रॉप होगा और गाड़ी में इमरजेंसी ब्रेक लग जाएगी। ((7) If IP Magnet valve COC is open, BP pressure will drop and emergency brake will apply).',
      '8) विजिलेंस कंट्रोल डिवाइस {VCD} डिस्प्ले यूनिट का HEALTHY लैम्प बुझ जाएगा। ((8) Vigilance Control Device {VCD} Display unit HEALTHY lamp will extinguish).',
      '【2. CCBA पिघलने पर (CCBA Fuse Melted)】:',
      '• चालू गाड़ी में जब तक DJ/VCB क्लोज है, CCBA पिघलने का पता नहीं चलता है। बैटरी चार्ज होना बंद हो जाती है।',
      '• जब DJ/VCB ओपन होता है या किया जाता है तब निम्नलिखित संकेत मिलते हैं:',
      '1) पैंटो लोअर हो जाएगा। ((1) Pantograph will lower).',
      '2) यदि GR नोच पर है तो रिग्रेशन नहीं होगा। LSGR पायलट लैम्प बुझा रहेगा। ((2) If GR is on notch, regression will not occur. LSGR pilot lamp will remain extinguished).',
      '3) LSGR लैम्प को छोड़कर सभी पायलट लैम्प प्रकाशित रहेंगे। ((3) Except LSGR lamp, all other pilot lamps will remain glowing).',
      '4) LSDBR लैम्प बुझ जाएगा। ((4) LSDBR lamp will extinguish).',
      '5) ZUBA दबाने पर UBA सामान्य बैटरी वोल्टेज बताएगी। ((5) On pressing ZUBA, UBA will indicate normal battery voltage).',
      '6) फ्यूज टेस्टर ECC कार्य करेगा। ((6) Fuse tester ECC will work).',
      '【3. CCPT पिघलने पर (CCPT Fuse Melted - Panto & DJ Control Circuit)】:',
      '1) DJ/VCB ओपन हो जाएगा। ((1) DJ/VCB will open).',
      '2) पैंटो लोअर हो जाएगा। ((2) Pantograph will lower).',
      '3) यदि GR नोच पर है तो रिग्रेशन नहीं होगा। LSGR पायलट लैम्प बुझा रहेगा। ((3) If GR is on notch, regression will not occur. LSGR pilot lamp will remain extinguished).',
      '4) बाकी सभी पायलट लैम्प प्रकाशित रहेंगे। ((4) All remaining pilot lamps will remain glowing).',
      '5) LSDBR लैम्प बुझ जाएगा। ((5) LSDBR lamp will extinguish).',
      '6) ZUBA दबाने पर UBA सामान्य बैटरी वोल्टेज बताता है। ((6) On pressing ZUBA, UBA indicates normal battery voltage).',
      '7) फ्यूज टेस्टर ECC कार्य करेगा। ((7) Fuse tester ECC will work).',
      '【4. CCVCD पिघलने पर (CCVCD Fuse Melted - Vigilance Control)】:',
      '• VCD कार्य नहीं करेगी। ((4) VCD will not work).',
      '【5. CCINV पिघलने पर (CCINV Fuse Melted - Static Inverter)】:',
      '• SI UNIT (स्टैटिक इनवर्टर) नहीं चलेगी। ((5) SI UNIT will not run).',
      '【6. CCA पिघलने पर (CCA Fuse Melted - Auxiliaries Control)】:',
      '1) मेन कम्प्रेशर व ब्लोअर नहीं चलेंगे। ((1) Main compressors and blowers will not run).',
      '2) यदि GR पाँच (5) से अधिक नोच पर है तो DJ/VCB ट्रिप हो जाएगा। ((2) If GR is on more than 5th notch, DJ/VCB will trip).',
      '【7. CCLS (10A) पिघलने पर (CCLS 10A Fuse Melted - Signalling & Pilot Lamps)】:',
      '1) सभी पायलट लैम्प बुझ जाएंगे। ((1) All pilot lamps will extinguish).',
      '2) QRS डी-एनर्जाइज हो जाने की वजह से ऑटो रिग्रेशन होगा। कर्षण बल (Tractive Effort) की पूर्ण हानि होगी। ((2) Due to QRS de-energization, auto-regression will occur with total loss of tractive effort).',
      '3) IP Magnet valve COC खुला है तो BP प्रेशर ड्रॉप होगा और गाड़ी में इमरजेंसी ब्रेक लग जाएगी। ((3) If IP Magnet valve COC is open, BP pressure will drop and emergency brake will apply).',
      '4) विजिलेंस कंट्रोल डिवाइस {VCD} डिस्प्ले यूनिट का HEALTHY लैम्प बुझ जाएगा। ((4) Vigilance Control Device {VCD} Display unit HEALTHY lamp will extinguish).',
      '【8. CCDJ पिघलने पर (CCDJ Fuse Melted - DJ Control Circuit)】:',
      '• DJ/VCB ट्रिप होगा। ऑटो रिग्रेशन होगा। ((8) DJ/VCB will trip. Auto-regression will take place).',
      '【9. CCLSA पिघलने पर (CCLSA Fuse Melted - AFL & Sanders)】:',
      '1) AFL कार्य नहीं करेगी। ((1) AFL will not work).',
      '2) सैंडर्स (Sanders) कार्य नहीं करेंगे। ((2) Sanders will not work).',
      '【फ्यूज बदलने की अनिवार्य सुरक्षा प्रक्रिया (Safety Procedure for Replacing Fuses)】:',
      '• नोट :- CCBA / ADD CCBA / CCPT पिघलता है तो पहले GR को हाथ से “0” पर लाएं। MP, MPJ व ZPT को पोजीशन 0 पर रखें, IP MAGNET VALVE का COC बंद करें, HBA को ऑफ (OFF) पर रखें और उसके बाद फ्यूज बदली करें।',
      'a) एक बार फ्यूज बदल दें। ((a) Replace fuse once.)',
      'b) यदि फिर भी पिघलता है तो HOBA को “ऑफ” पर रखें और फ्यूज बदली करें। ((b) If it melts again, place HOBA to "OFF" and replace fuse.)'
    ]
  },
  {
    id: 'CONV-CCBA-MELTED-ACTION',
    subSystem: 'CONV_FUSE',
    message: 'CCBA पिघलता है (फ्यूज बदलना व HOBA स्विच नियम)\nCCBA FUSE MELTS - ACTION TO TAKE\n(एक बार फ्यूज बदलना / दोबारा पिघलने पर HOBA "ऑफ" पर रखना / GR हाथ से 0, MP/MPJ/ZPT 0, IP COC बंद, HBA ऑफ)',
    lamp: 'LSGR को छोड़कर सभी पायलट लैम्प जलते रहेंगे, LSDBR बुझ जाएगा, UBA सामान्य वोल्टेज',
    effect: 'बैटरी चार्जिंग बंद; DJ ओपन होने पर पैंटो लोअर, नोच पर रिग्रेशन नहीं',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) एक बार फ्यूज बदल दें। ((a) Replace fuse once.)',
      'b) यदि फिर भी पिघलता है तो HOBA को “ऑफ” पर रखें और फ्यूज बदली करें। ((b) If it melts again, place HOBA to "OFF" and replace fuse.)',
      '【अति-महत्वपूर्ण नोट (सुरक्षा सावधानियां)】:',
      '• नोट :- CCBA / ADD CCBA / CCPT पिघलता है तो पहले GR को हाथ से “0” पर लाएं। MP, MPJ व ZPT को पोजीशन 0 पर रखें, IP MAGNET VALVE का COC बंद करें, HBA को ऑफ (OFF) पर रखें और उसके बाद फ्यूज बदली करें।'
    ]
  },
  {
    id: 'CONV-ADD-CCBA-MELTED-ACTION',
    subSystem: 'CONV_FUSE',
    message: 'ADD CCBA (एडिशनल CCBA) पिघलता है (फ्यूज बदलना व HOBA स्विच नियम)\nADDITIONAL CCBA FUSE MELTS - ACTION TO TAKE\n(एक बार फ्यूज बदलना / दोबारा पिघलने पर HOBA "ऑफ" पर रखना / GR हाथ से 0, MP/MPJ/ZPT 0, IP COC बंद, HBA ऑफ)',
    lamp: 'सभी पायलट लैम्प बुझ जाएंगे, LSGR/LSDBR बुझ जाएगा, VCD HEALTHY लैम्प बुझ जाएगा, UBA वोल्टेज 0',
    effect: 'बैटरी चार्जिंग बंद; DJ ओपन होने पर पैंटो लोअर, नोच पर रिग्रेशन नहीं, इमरजेंसी ब्रेक लग जाना',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) एक बार फ्यूज बदल दें। ((a) Replace fuse once.)',
      'b) यदि फिर भी पिघलता है तो HOBA को “ऑफ” पर रखें और फ्यूज बदली करें। ((b) If it melts again, place HOBA to "OFF" and replace fuse.)',
      '【अति-महत्वपूर्ण नोट (सुरक्षा सावधानियां)】:',
      '• नोट :- CCBA / ADD CCBA / CCPT पिघलता है तो पहले GR को हाथ से “0” पर लाएं। MP, MPJ व ZPT को पोजीशन 0 पर रखें, IP MAGNET VALVE का COC बंद करें, HBA को ऑफ (OFF) पर रखें और उसके बाद फ्यूज बदली करें।'
    ]
  },
  {
    id: 'CONV-FUSE-ADDITIONAL-CCBA',
    subSystem: 'CONV_FUSE',
    message: 'एडिशनल CCBA पिघलने पर मिलने वाले संकेत\nADDITIONAL CCBA FUSE MELTING INDICATIONS\n(चालू गाड़ी में DJ क्लोज रहने तक पता नहीं चलता, DJ ओपन होने पर: पैंटो डाउन, सभी पायलट लैम्प बुझना, UBA=0, ECC काम नहीं करेगा, BP ड्रॉप, VCD लैम्प बुझना)',
    lamp: 'सभी पायलट लैम्प बुझ जाएंगे, LSGR/LSDBR बुझ जाएगा, VCD HEALTHY लैम्प बुझ जाएगा, UBA वोल्टेज 0',
    effect: 'बैटरी चार्जिंग बंद; DJ ओपन होने पर पैंटो लोअर, नोच पर रिग्रेशन नहीं, इमरजेंसी ब्रेक लग जाना',
    actions: [
      '• चालू गाड़ी में जब तक DJ/VCB क्लोज है, एडिशनल CCBA पिघलने का पता नहीं चलता है। बैटरी चार्ज होना बंद हो जाती है।',
      '• जब DJ/VCB ओपन होता है या किया जाता है तब:',
      '1) पैंटो लोअर हो जाएगा।',
      '2) यदि GR नोच पर है तो रिग्रेशन नहीं होगा। LSGR पायलट लैम्प बुझा रहेगा।',
      '3) सभी पायलट लैम्प बुझ जाएंगे।',
      '4) LSDBR लैम्प बुझ जाएगा।',
      '5) ZUBA दबाने पर UBA बैटरी वोल्टेज ‘0’ बताएगी।',
      '6) फ्यूज टेस्टर ECC कार्य नहीं करेगा।',
      '7) IP Magnet valve COC खुला है तो BP प्रेशर ड्रॉप होगा और गाड़ी में इमरजेंसी ब्रेक लग जाएगी।',
      '8) विजिलेंस कंट्रोल डिवाइस {VCD} डिस्प्ले यूनिट का HEALTHY लैम्प बुझ जाएगा।',
      '【कार्यवाही जो करनी है (Action to Take)】:',
      '• नोट :- CCBA / ADD CCBA / CCPT पिघलता है तो पहले GR को हाथ से “0” पर लाएं। MP, MPJ व ZPT को पोजीशन 0 पर रखें, IP MAGNET VALVE का COC बंद करें, HBA को ऑफ (OFF) पर रखें और उसके बाद फ्यूज बदली करें।',
      'a) एक बार फ्यूज बदल दें। ((a) Replace fuse once.)',
      'b) यदि फिर भी पिघलता है तो HOBA को “ऑफ” पर रखें और फ्यूज बदली करें। ((b) If it melts again, place HOBA to "OFF" and replace fuse.)'
    ]
  },
  {
    id: 'CONV-FUSE-CCBA',
    subSystem: 'CONV_FUSE',
    message: 'CCBA पिघलने पर मिलने वाले संकेत\nCCBA FUSE MELTING INDICATIONS\n(चालू गाड़ी में DJ क्लोज रहने तक पता नहीं चलता, DJ ओपन होने पर: पैंटो डाउन, LSGR को छोड़कर सभी लैम्प जलना, UBA सामान्य, ECC कार्य करेगा)',
    lamp: 'LSGR लैम्प को छोड़कर सभी पायलट लैम्प प्रकाशित रहेंगे, LSDBR बुझ जाएगा, UBA सामान्य वोल्टेज',
    effect: 'बैटरी चार्जिंग बंद; DJ ओपन होने पर पैंटो लोअर, नोच पर रिग्रेशन नहीं',
    actions: [
      '• चालू गाड़ी में जब तक DJ/VCB क्लोज है, CCBA पिघलने का पता नहीं चलता है। बैटरी चार्ज होना बंद हो जाती है।',
      '• जब DJ/VCB ओपन होता है या किया जाता है तब:',
      '1) पैंटो लोअर हो जाएगा।',
      '2) यदि GR नोच पर है तो रिग्रेशन नहीं होगा। LSGR पायलट लैम्प बुझा रहेगा।',
      '3) LSGR लैम्प को छोड़कर सभी पायलट लैम्प प्रकाशित रहेंगे।',
      '4) LSDBR लैम्प बुझ जाएगा।',
      '5) ZUBA दबाने पर UBA सामान्य बैटरी वोल्टेज बताएगी।',
      '6) फ्यूज टेस्टर ECC कार्य करेगा।',
      '【कार्यवाही जो करनी है (Action to Take)】:',
      '• नोट :- CCBA / ADD CCBA / CCPT पिघलता है तो पहले GR को हाथ से “0” पर लाएं। MP, MPJ व ZPT को पोजीशन 0 पर रखें, IP MAGNET VALVE का COC बंद करें, HBA को ऑफ (OFF) पर रखें और उसके बाद फ्यूज बदली करें।',
      'a) एक बार फ्यूज बदल दें। ((a) Replace fuse once.)',
      'b) यदि फिर भी पिघलता है तो HOBA को “ऑफ” पर रखें और फ्यूज बदली करें। ((b) If it melts again, place HOBA to "OFF" and replace fuse.)'
    ]
  },
  {
    id: 'CONV-FUSE-CCPT',
    subSystem: 'CONV_FUSE',
    message: 'CCPT पिघलने पर मिलने वाले संकेत\nCCPT FUSE MELTING INDICATIONS (PANTOGRAPH & DJ CIRCUIT)\n(DJ ओपन होना, पैंटो लोअर होना, GR नोच पर रिग्रेशन न होना व LSGR बुझना, बाकी लैम्प जलना, UBA सामान्य, ECC कार्य करेगा)',
    lamp: 'बाकी सभी पायलट लैम्प प्रकाशित रहेंगे, LSGR व LSDBR बुझ जाएगा, UBA सामान्य वोल्टेज',
    effect: 'DJ/VCB तुरंत ओपन हो जाएगा, पैंटो लोअर हो जाएगा',
    actions: [
      '1) DJ/VCB ओपन हो जाएगा।',
      '2) पैंटो लोअर हो जाएगा।',
      '3) यदि GR नोच पर है तो रिग्रेशन नहीं होगा। LSGR पायलट लैम्प बुझा रहेगा।',
      '4) बाकी सभी पायलट लैम्प प्रकाशित रहेंगे।',
      '5) LSDBR लैम्प बुझ जाएगा।',
      '6) ZUBA दबाने पर UBA सामान्य बैटरी वोल्टेज बताता है।',
      '7) फ्यूज टेस्टर ECC कार्य करेगा।',
      '【कार्यवाही जो करनी है (Action to Take)】:',
      '• नोट :- CCBA / ADD CCBA / CCPT पिघलता है तो पहले GR को हाथ से “0” पर लाएं। MP, MPJ व ZPT को पोजीशन 0 पर रखें, IP MAGNET VALVE का COC बंद करें, HBA को ऑफ (OFF) पर रखें और उसके बाद फ्यूज बदली करें।',
      'a) एक बार फ्यूज बदल दें। ((a) Replace fuse once.)',
      'b) यदि फिर भी पिघलता है तो HOBA को “ऑफ” पर रखें और फ्यूज बदली करें। ((b) If it melts again, place HOBA to "OFF" and replace fuse.)'
    ]
  },
  {
    id: 'CONV-HBA-ON-CCPT-MELTS',
    subSystem: 'CONV_FUSE',
    message: 'HBA को ऑन पर रखने पर CCPT पिघलता है\nCCPT FUSE MELTS ON PLACING HBA TO "ON"\n(HBA ऑन करते ही CCPT फ्यूज पिघल जाना / Q118 की कॉइल चेक करें / सहायता मांगें)',
    lamp: 'LSDJ व सभी लैम्प निष्क्रिय, पैंटो नहीं उठेगा (LSDJ inactive, panto will not raise)',
    effect: 'CCPT तुरंत पिघल जाता है, पैंटो व DJ कंट्रोल सर्किट एनर्जाइज नहीं होगा (CCPT melts immediately, panto & DJ circuit will not energize)',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) Q118 की कॉइल चेक करें, यदि कॉइल में खराबी है तो सहायता मांगें। ((a) Check coil of relay Q118; if defect is found in coil, demand assistance.)',
      '【सुरक्षा सावधानी (Safety Procedure)】:',
      '• नोट: फ्यूज बदलने से पहले GR को हाथ से “0” पर लाएं, MP, MPJ व ZPT को “0” पर रखें, IP MAGNET VALVE का COC बंद करें और HBA को “ऑफ” पर रखें।'
    ]
  },
  {
    id: 'CONV-ZPT-1-CCPT-MELTS',
    subSystem: 'CONV_FUSE',
    message: 'ZPT को पोजीशन “1” पर रखने पर CCPT पिघलता है\nCCPT FUSE MELTS ON PLACING ZPT TO POSITION "1"\n(ZPT 1 पर CCPT पिघलना / पैंटो 1 सर्किट दोष / ZPT पोजीशन 2 चयन व दूसरी कैब से प्रयत्न)',
    lamp: 'पैंटो नहीं उठेगा, LSDJ जलता रहेगा (Panto will not raise, LSDJ remains glowing)',
    effect: 'पैंटो-1 सर्किट में खराबी/शॉर्ट सर्किट; CCPT पिघलने से पैंटो व DJ कंट्रोल सप्लाई बाधित',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) एक बार फ्यूज बदल दें। ((a) Replace fuse once.)',
      'b) यदि फिर से पिघलता है तो HOBA को “ऑफ” पोजीशन पर रखें और फ्यूज बदली करें। ((b) If it melts again, place HOBA to "OFF" position and replace fuse.)',
      'c) यदि फिर भी पिघलता है तो ZPT को पहले पोजीशन 2 पर रखें और उसके बाद फ्यूज बदली करें। ((c) If it still melts, place ZPT to position 2 first and then replace fuse.)',
      'd) दूसरी कैब से प्रयत्न करें। ((d) Attempt from the other cab.)'
    ]
  },
  {
    id: 'CONV-MPJ-F-R-CCPT-MELTS',
    subSystem: 'CONV_FUSE',
    message: 'MPJ को “F” या “R” पर रखने पर CCPT पिघलता है\nCCPT FUSE MELTS ON PLACING MPJ TO "F" OR "R"\n(MPJ को F या R पर रखते ही CCPT पिघलना / रिवर्सर J1-J2 व CTF कॉइल टर्मिनल जांच / TWC अलग कर टेप करना / J1, J2, CTF मैनुअल ऑपरेशन / RB का उपयोग न करना)',
    lamp: 'LSDJ जलता रहेगा, GR प्रोग्रेस नहीं करेगा (LSDJ remains glowing, GR will not progress)',
    effect: 'रिवर्सर J1/J2 या CTF 1/2/3 कॉइल सर्किट में शॉर्ट सर्किट; CCPT पिघलने से दिशा व ट्रैक्शन कंट्रोल बाधित',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) एक बार फ्यूज बदल दें। ((a) Replace fuse once.)',
      'b) यदि फिर से पिघलता है तो HOBA को “ऑफ” पोजीशन पर रखें और फ्यूज बदली करें। ((b) If it melts again, place HOBA to "OFF" position and replace fuse.)',
      'c) यदि फिर भी पिघलता है तो पहले J-1, J-2 और CTF1, CTF2, CTF3 के कॉइल टर्मिनल में खराबी चेक करें, उनके TWC निकाल कर टेप कर दें और J-1, J-2 व CTF को हाथ से ऑपरेट करें। फ्यूज बदली करें और गाड़ी चलाने का प्रयत्न करें। ((c) If it still melts, first check defect in coil terminals of J-1, J-2 and CTF1, CTF2, CTF3; remove their TWC and tape them, and operate J-1, J-2 and CTF manually by hand. Replace fuse and attempt to work train.)',
      'd) रेहियोस्टैटिक ब्रेक (RB) का उपयोग न करें। ((d) Do not use Rheostatic Brake.)'
    ]
  },
  {
    id: 'CONV-REGRESSION-CCPT-MELTS',
    subSystem: 'CONV_FUSE',
    message: 'रिग्रेशन करने पर CCPT पिघलता है\nCCPT FUSE MELTS ON REGRESSION\n(MP को - या 0 पर लाते ही CCPT पिघलना / GR को हाथ से 0 पर लाना / HOBA ऑफ / GR हाथ से ऑपरेट करके सेक्शन क्लियर करना)',
    lamp: 'DJ ट्रिप, पैंटो लोअर होगा, LSDJ जल जाएगा (DJ trips, panto lowers, LSDJ glows)',
    effect: 'SMGR रिग्रेशन सर्किट में शॉर्ट सर्किट/दोष; रिग्रेशन लेते ही CCPT पिघलकर DJ खुल जाना',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) GR को हाथ से “0” पर लाएं। ((a) Bring GR manually by hand to "0".)',
      'b) एक बार फ्यूज बदल दें। ((b) Replace fuse once.)',
      'c) यदि फिर से पिघलता है तो HOBA को “ऑफ” पोजीशन पर रखें और फ्यूज बदली करें। ((c) If it melts again, place HOBA to "OFF" position and replace fuse.)',
      'd) फिर भी पिघलता है तो फ्यूज बदलकर GR को हाथ से ऑपरेट करके सेक्शन क्लियर करें। ((d) If it still melts, replace fuse and clear section by operating GR manually by hand.)'
    ]
  },
  {
    id: 'CONV-FIRST-NOTCH-CCPT-MELTS',
    subSystem: 'CONV_FUSE',
    message: 'पहली नोच लेने पर CCPT पिघलता है\nCCPT FUSE MELTS ON TAKING FIRST NOTCH\n(MP को 1st नोच पर रखते ही CCPT पिघलना / HOBA "ऑफ" / GR हाथ से ऑपरेट / RSI ब्लॉक एक-एक करके आइसोलेट करना)',
    lamp: 'DJ ट्रिप, पैंटो लोअर होगा, LSDJ जल जाएगा (DJ trips, panto lowers, LSDJ glows)',
    effect: 'लाइन कॉन्टैक्टर या प्रोग्रेशन / RSI ब्लॉक कंट्रोल सर्किट में शॉर्ट सर्किट; 1st नोच लेते ही CCPT पिघल जाना',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) एक बार फ्यूज बदल दें। ((a) Replace fuse once.)',
      'b) यदि फिर से पिघलता है तो HOBA को “ऑफ” पोजीशन पर रखें और फ्यूज बदली करें। ((b) If it melts again, place HOBA to "OFF" position and replace fuse.)',
      'c) यदि फिर भी पिघलता है तो फ्यूज बदलकर GR को हाथ से ऑपरेट करें। ((c) If it still melts, replace fuse and operate GR manually by hand.)',
      'd) फ्यूज बदलकर एक-एक करके RSI ब्लॉक आइसोलेट करें और गाड़ी चलाने का प्रयत्न करें। ((d) Replace fuse, isolate RSI blocks one by one and attempt to work train.)'
    ]
  },
  {
    id: 'CONV-6TH-NOTCH-CCPT-MELTS',
    subSystem: 'CONV_FUSE',
    message: '6 नोच लेने पर CCPT पिघलता है\nCCPT FUSE MELTS ON TAKING 6TH NOTCH\n(6 नोच पर CCPT पिघलना / GR को हाथ से “0” पर लाना / फ्यूज बदलना / EVPHGR के TWC निकाल कर टेप करना)',
    lamp: 'DJ ट्रिप, पैंटो लोअर होगा, LSDJ जल जाएगा (DJ trips, panto lowers, LSDJ glows)',
    effect: 'EVPHGR कॉइल या सर्किट में शॉर्ट सर्किट; 6th नोच पर EVPHGR इनर्जाइज होते ही CCPT पिघल जाना',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      '1. GR को हाथ से “0” पर लाएं। (Bring GR manually by hand to "0".)',
      '2. एक बार फ्यूज बदल दें। (Replace fuse once.)',
      '3. EVPHGR के TWC निकाल कर टेप कर दें। (Remove TWC of EVPHGR and tape them properly.)'
    ]
  },
  {
    id: 'CONV-MPS-OPERATE-CCPT-MELTS',
    subSystem: 'CONV_FUSE',
    message: 'MPS ऑपरेट करने पर CCPT पिघलता है\nCCPT FUSE MELTS ON OPERATING MPS (SHUNTING / FIELD WEAKENING)\n(MPS ऑपरेट करते ही CCPT पिघलना / GR को हाथ से “0” पर लाना / फ्यूज बदलना / MPS की उस पोजीशन का उपयोग न करना)',
    lamp: 'DJ ट्रिप, पैंटो लोअर होगा, LSDJ जल जाएगा (DJ trips, panto lowers, LSDJ glows)',
    effect: 'शंटिंग कॉन्टैक्टर या MPS फील्ड वीकिंग रेजिस्टेंस सर्किट में शॉर्ट सर्किट',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      '1. GR को हाथ से “0” पर लाएं। (Bring GR manually by hand to "0".)',
      '2. एक बार फ्यूज बदल दें। (Replace fuse once.)',
      '3. MPS की उस पोजीशन का उपयोग न करें। (Do not use that position of MPS; work without shunting/field weakening.)'
    ]
  },
  {
    id: 'CONV-BPSW-PRESS-CCPT-MELTS',
    subSystem: 'CONV_FUSE',
    message: 'BPSW दबाने पर CCPT पिघलता है\nCCPT FUSE MELTS ON PRESSING BPSW (SANDING SWITCH)\n(BPSW सैंडिंग स्विच दबाते ही CCPT पिघलना / फ्यूज बदली करना / BPSW का उपयोग न करना)',
    lamp: 'DJ ट्रिप, पैंटो लोअर होगा, LSDJ जल जाएगा (DJ trips, panto lowers, LSDJ glows)',
    effect: 'सैंडिंग वाल्व कॉइल या BPSW स्विच शाखा में शॉर्ट सर्किट',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      '1. फ्यूज बदली करें। (Replace CCPT fuse.)',
      '2. BPSW का उपयोग न करें। (Do not use BPSW sanding switch; work train without electrical sanding.)'
    ]
  },
  {
    id: 'CONV-PVEF-PRESS-CCPT-MELTS',
    subSystem: 'CONV_FUSE',
    message: 'PVEF दबाने पर CCPT पिघलता है\nCCPT FUSE MELTS ON PRESSING PVEF (LOCO BRAKE RELEASE PEDAL)\n(PVEF पैडल दबाते ही CCPT पिघलना / फ्यूज बदली करना / PVEF न दबाना / रेहियोस्टैटिक ब्रेक का उपयोग न करना)',
    lamp: 'DJ ट्रिप, पैंटो लोअर होगा, LSDJ जल जाएगा (DJ trips, panto lowers, LSDJ glows)',
    effect: 'VEF वाल्व कॉइल या PVEF स्विच सर्किट में शॉर्ट सर्किट; RB इंटरलॉकिंग प्रभावित',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      '1. फ्यूज बदली करें। (Replace CCPT fuse.)',
      '2. PVEF न दबाएं। (Do not press PVEF foot switch.)',
      '3. रेहियोस्टैटिक ब्रेक (RB) का उपयोग न करें। (Do not use Rheostatic Brake.)'
    ]
  },
  {
    id: 'CONV-MP-P-CCPT-MELTS',
    subSystem: 'CONV_FUSE',
    message: 'MP को “P” पर रखने पर CCPT पिघलता है\nCCPT FUSE MELTS ON PLACING MP TO "P" (BRAKING POSITION)\n(MP को P / ब्रेकिंग पर रखते ही CCPT पिघलना / फ्यूज बदली करना / रेहियोस्टैटिक ब्रेक का उपयोग न करना)',
    lamp: 'DJ ट्रिप, पैंटो लोअर होगा, LSDJ जल जाएगा (DJ trips, panto lowers, LSDJ glows)',
    effect: 'रेहियोस्टैटिक ब्रेकिंग एक्साइटेशन व कंट्रोल सर्किट में शॉर्ट सर्किट',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      '1. फ्यूज बदली करें। (Replace CCPT fuse.)',
      '2. रेहियोस्टैटिक ब्रेक (RB) का उपयोग न करें। (Do not use Rheostatic Brake; work train with pneumatic braking only.)'
    ]
  },
  {
    id: 'CONV-FUSE-CCLS',
    subSystem: 'CONV_FUSE',
    message: 'CCLS (10A) पिघलने पर मिलने वाले संकेत\nCCLS (10A) FUSE MELTING INDICATIONS (SIGNALLING LAMPS, QRS & VCD)\n(सभी पायलट लैम्प बुझना, QRS डी-एनर्जाइज होकर ऑटो रिग्रेशन व कर्षण बल हानि, IP COC खुला होने पर BP ड्रॉप व इमरजेंसी ब्रेक, VCD लैम्प बुझना)',
    lamp: 'सभी पायलट लैम्प बुझ जाएंगे, VCD डिस्प्ले का HEALTHY लैम्प बुझ जाएगा',
    effect: 'ऑटो रिग्रेशन, कर्षण बल की पूर्ण हानि, BP प्रेशर ड्रॉप व इमरजेंसी ब्रेक लगना',
    actions: [
      '• नोट: कन्वेंशनल लोको में VCD तथा IPMV को सप्लाई CCLS से दी गई है।',
      '1) सभी पायलट लैम्प बुझ जाएंगे।',
      '2) QRS डी-एनर्जाइज हो जाने की वजह से ऑटो रिग्रेशन होगा। कर्षण बल (Tractive Effort) की पूर्ण हानि होगी।',
      '3) IP Magnet valve COC खुला है तो BP प्रेशर ड्रॉप होगा और गाड़ी में इमरजेंसी ब्रेक लग जाएगी।',
      '4) विजिलेंस कंट्रोल डिवाइस {VCD} डिस्प्ले यूनिट का HEALTHY लैम्प बुझ जाएगा।',
      '• कार्यवाही: CCLS (10A) फ्यूज चेक करें व बदलें। सिग्नलिंग लैम्प व रिले शाखा का निरीक्षण करें।'
    ]
  },
  {
    id: 'CONV-FUSE-CCA',
    subSystem: 'CONV_FUSE',
    message: 'CCA पिघलने पर मिलने वाले संकेत\nCCA FUSE MELTING INDICATIONS (AUXILIARIES CONTROL)\n(मेन कम्प्रेशर व ब्लोअर न चलना, GR पाँच से अधिक नोच पर होने पर DJ/VCB ट्रिप होना)',
    lamp: 'LSDJ जल सकता है (5वीं नोच के बाद DJ ट्रिप पर), Q100 डी-एनर्जाइज',
    effect: 'मेन कंप्रेसर और ब्लोअर काम नहीं करेंगे; GR 5 नोच से आगे बढ़ने पर DJ ट्रिप',
    actions: [
      '1) मेन कम्प्रेशर व ब्लोअर नहीं चलेंगे।',
      '2) यदि GR पाँच (5) से अधिक नोच पर है तो DJ/VCB ट्रिप हो जाएगा।',
      '• कार्यवाही: CCA फ्यूज चेक करें व बदलें। यदि आवश्यक हो तो HOBA स्विच का उपयोग करें (अध्याय 7-फेलियर क्र. 14, 15 पृष्ठ क्र. 53 देखें)।'
    ]
  },
  {
    id: 'CONV-CCA-MELTS-BL-CLOSED',
    subSystem: 'CONV_FUSE',
    message: 'BL स्विचों की क्लोज हालत में CCA पिघलता है (लोको इनर्जाइज हालत में)\nCCA FUSE MELTS IN CLOSED CONDITION OF BL SWITCHES (LOCO ENERGIZED)\n(BL स्विच क्लोज करते ही CCA पिघलना / एक बार CCA बदलना / HOBA “ऑफ” / BLCP, BLCPD, BLVMT ओपन कर एक-एक क्लोज करना / फेलियर क्र. 14 से 15)',
    lamp: 'Q100 डी-एनर्जाइज, मेन कंप्रेसर व ब्लोअर बंद, 5 नोच से अधिक पर DJ ट्रिप',
    effect: 'BLCP/BLCPD/BLVMT या संबंधित ऑक्सिलरी कॉन्टैक्टर (C101, C102, C103, C105, C106, C107) कंट्रोल सर्किट में अर्थ फॉल्ट / शॉर्ट सर्किट',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) एक बार CCA फ्यूज बदल दें। ((a) Replace CCA fuse once.)',
      'b) यदि CCA फिर से पिघलता है तो HOBA को “ऑफ” पर रखें और फ्यूज बदल दें। ((b) If CCA melts again, place HOBA to "OFF" position and replace fuse.)',
      'c) यदि CCA फिर से पिघलता है तो BLCP, BLCPD और BLVMT ओपन करें, फ्यूज बदल दें तथा स्विचों को एक-एक करके क्लोज करें, खराबी वाले सर्किट का पता लगाएं और तदानुसार ट्रबल शूटिंग करें। (फेलियर क्र. 14 से 15) ((c) If CCA melts again, open BLCP, BLCPD, and BLVMT, replace fuse, then close the switches one by one to detect the defective circuit and troubleshoot accordingly - Failures 14 to 15.)'
    ]
  },
  {
    id: 'CONV-BLCP-CCA-MELTS',
    subSystem: 'CONV_FUSE',
    message: 'BLCP क्लोज करने पर CCA पिघलता है\nCCA FUSE MELTS ON CLOSING BLCP (COMPRESSOR CONTROL CIRCUIT)\n(BLCP क्लोज करते ही CCA पिघलना / C101, C102, C103 व VEAD वाल्व कॉइल व टर्मिनल जांच / HCP पोजीशन / BLCPD / HOBA "ऑफ" / दो MCP वेज कर 9.5 kg/cm² प्रेशर)',
    lamp: 'Q100 डी-एनर्जाइज, मेन कंप्रेसर बंद, 5 नोच से अधिक पर DJ ट्रिप',
    effect: 'C101, C102, C103 या VEAD अनलोडर वाल्व कॉइल में शॉर्ट सर्किट; BLCP क्लोज करते ही CCA पिघलना',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) C 101/ C 102/ C 103 और VEAD वाल्व की कॉइल और टर्मिनल चेक करें। ((a) Check coil and terminals of C-101 / C-102 / C-103 and VEAD valve.)',
      'i) यदि किसी कॉन्टैक्टर की कॉइल में खराबी है तो संबंधित MCP को आइसोलेट करने के लिए HCP की पोजीशन बदली करें। (यदि संबंधित MCP को चलाना जरूरी हो तो खराबी वाली कॉइल के टर्मिनल निकाल दें, कॉन्टैक्टर को वेज कर दें)। ((i) If defect is found in contactor coil, change HCP position to isolate defective MCP. If working that MCP is necessary, remove terminals of defective coil and wedge the contactor.)',
      'ii) यदि VEAD वाल्व में खराबी है तो BLCP ओपन करें और BLCPD से काम करें। ((ii) If defect is in VEAD unloader valve, open BLCP and work train using BLCPD.)',
      'iii) यदि कोई खराबी नहीं है तो: फ्यूज बदली करें। यदि फिर से पिघलता है तो HOBA को “ऑफ” पर रखें और फ्यूज बदली करें। यदि फ्यूज फिर भी पिघलता है तो BLCP और BLCPD क्लोज न करें। दो MCP के कॉन्टैक्टर वेज कर दें और लीकेज पैदा करें, जिससे 9.5 Kg/cm² प्रेशर कायम रहे। ((iii) If no visible defect is found: Replace fuse. If it melts again, place HOBA to "OFF" and replace fuse. If it still melts, do not close BLCP and BLCPD; wedge two MCP contactors and create artificial leakage to maintain 9.5 kg/cm² MR pressure.)'
    ]
  },
  {
    id: 'CONV-BLVMT-CCA-MELTS',
    subSystem: 'CONV_FUSE',
    message: 'BLVMT क्लोज करने पर CCA पिघलता है\nCCA FUSE MELTS ON CLOSING BLVMT (BLOWER MOTORS CONTROL CIRCUIT)\n(BLVMT क्लोज करते ही CCA पिघलना / C105, C106, C107 कॉइल जांच / HOBA "ऑफ" / Q118 वेज कर 450A से सेक्शन क्लियर / HVRH, HVMT-1, HVMT-2 से फॉल्टी सर्किट ढूंढना / SI यूनिट लोको नियम)',
    lamp: 'ब्लोअर नहीं चलेंगे, 5वीं नोच से अधिक पर DJ ट्रिप, Q100 प्रभावित',
    effect: 'ब्लोअर कॉन्टैक्टर C105, C106, C107 या टाइम डिले रिले शाखा में शॉर्ट सर्किट',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) एक बार फ्यूज बदल दें। ((a) Replace fuse once.)',
      'b) यदि फिर से पिघलता है तो HOBA को “ऑफ” पोजीशन पर रखें। फ्यूज बदली करें। ((b) If it melts again, place HOBA to "OFF" position and replace fuse.)',
      'c) यदि फिर भी पिघलता है तो C105, C106 और C107 की कॉइल टर्मिनल चेक करें। ((c) If it still melts, check coil terminals of C105, C106, and C107.)',
      '• यदि कोई खराबी पाई जाती है तो खराबी वाली कॉइल के टर्मिनल निकाल दें और कॉन्टैक्टर को वेज कर दें। (If defect is found, remove terminals of defective coil and wedge the contactor.)',
      '• यदि कोई खराबी नहीं पाई जाती और गाड़ी ब्लॉक सेक्शन में है तो एयर ब्रेक गाड़ी कार्य करते समय C-101/ C-102/ C-103 में से दो कॉन्टैक्टर वेज करके, CCA बदले बिना, Q-118 वेज करें और 450 Amp. से सेक्शन क्लियर करें तथा निम्नानुसार ट्रबल-शूट करें: (If no defect found & train is in block section, wedge two contactors out of C101/C102/C103, wedge Q118 without replacing CCA, clear section with max 450A, then troubleshoot as follows:)',
      '  - BLVMT ओपन करें। HVRH, HVMT-1 और HVMT-2 को “0” पर रखें, CCA फ्यूज बदलें और BLVMT क्लोज करें।',
      '  i) यदि CCA कायम रहता है तो: HVRH, HVMT-1 और HVMT-2 को एक-एक करके 10 सेकंड के अंतर से “1” पर रखें और खराबी वाले कंट्रोल सर्किट का पता लगाएं, खराब कॉइल के टर्मिनल निकाल दें और कॉन्टैक्टर को वेज कर दें।',
      '  ii) यदि CCA कायम नहीं रहता है तो: सहायता मांगें।',
      '• नोट (SI Unit लोको): एस आई यूनिट लोको में यदि BLVMT क्लोज करने पर CCA melt होता है तो BLVMT ओपन करें, CCA फ्यूज बदल दें, Q118 को Wedge करें, BLCP क्लोज करके 450 amp से सेक्शन क्लियर करें। ((Note for SI Unit Locos: If CCA melts on closing BLVMT, open BLVMT, replace CCA fuse, wedge Q118, close BLCP and clear section with 450A.))'
    ]
  },
  {
    id: 'CONV-FUSE-CCDJ',
    subSystem: 'CONV_FUSE',
    message: 'CCDJ पिघलने पर मिलने वाले संकेत\nCCDJ FUSE MELTING INDICATIONS (DJ CONTROL CIRCUIT)\n(DJ/VCB ट्रिप होना, ऑटो रिग्रेशन होना)',
    lamp: 'LSDJ प्रकाशित होगा, LSGR 0 पर आएगा',
    effect: 'DJ/VCB ट्रिप, ऑटो रिग्रेशन',
    actions: [
      '1) DJ/VCB ट्रिप होगा।',
      '2) ऑटो रिग्रेशन होगा।',
      '• कार्यवाही: CCDJ फ्यूज चेक करें। आवश्यकतानुसार HOBA स्विच का उपयोग करें।'
    ]
  },
  {
    id: 'CONV-FUSE-CCLSA',
    subSystem: 'CONV_FUSE',
    message: 'CCLSA पिघलने पर मिलने वाले संकेत\nCCLSA FUSE MELTING INDICATIONS (AFL & SANDERS)\n(AFL कार्य नहीं करेगी, सैंडर्स कार्य नहीं करेंगे)',
    lamp: 'AFL संकेत निष्क्रिय',
    effect: 'ऑटो फ्लैशर लाइट (AFL) व सैंडर्स काम नहीं करेंगे',
    actions: [
      '1) AFL (Auto Flasher Light) कार्य नहीं करेगी।',
      '2) सैंडर्स (Sanders) कार्य नहीं करेंगे।',
      '• कार्यवाही: CCLSA फ्यूज चेक करें व बदलें।'
    ]
  },
  {
    id: 'CONV-FUSE-CCVCD',
    subSystem: 'CONV_FUSE',
    message: 'CCVCD पिघलने पर मिलने वाले संकेत\nCCVCD FUSE MELTING INDICATIONS (VIGILANCE CONTROL UNIT)\n(VCD कार्य नहीं करेगी)',
    lamp: 'VCD डिस्प्ले यूनिट कार्य नहीं करेगी',
    effect: 'विजिलेंस कंट्रोल डिवाइस (VCD) कार्य नहीं करेगी',
    actions: [
      '• VCD कार्य नहीं करेगी।',
      '• कार्यवाही: CCVCD फ्यूज चेक करें व बदलें।'
    ]
  },
  {
    id: 'CONV-FUSE-CCINV',
    subSystem: 'CONV_FUSE',
    message: 'CCINV पिघलने पर मिलने वाले संकेत\nCCINV FUSE MELTING INDICATIONS (STATIC INVERTER SI UNIT)\n(SI UNIT नहीं चलेगी)',
    lamp: 'SIV फॉल्ट लैम्प / SI UNIT बंद',
    effect: 'SI UNIT (Static Inverter) नहीं चलेगी',
    actions: [
      '• SI UNIT (स्टैटिक इनवर्टर) नहीं चलेगी।',
      '• कार्यवाही: CCINV फ्यूज चेक करें व बदलें।'
    ]
  },
  {
    id: 'CONV-DJ-TRIPPING-IMMEDIATE',
    subSystem: 'CONV_DJ',
    message: 'DJ क्लोज़ होते ही तुरंत ट्रिप होना\nDJ TRIPPING IMMEDIATELY ON RELEASING BLRDJ\n(BLRDJ छोड़ते ही DJ खुल जाना)',
    lamp: 'LSDJ क्षणिक बुझकर तुरंत पुनः जल जाता है',
    effect: 'DJ होल्ड नहीं रहता, OHE सप्लाई तुरंत कट जाती है',
    actions: [
      '1. This fault is usually caused by defective Q44 or MTDJ holding branch. [यह दोष सामान्यतः Q44 या MTDJ होल्डिंग ब्रांच की खराबी के कारण होता है।]',
      '2. Keep BLRDJ pressed for 4 to 5 seconds and check if DJ holds after auxiliary motors start. [BLRDJ को 4 से 5 सेकंड तक दबाकर रखें और देखें कि क्या ऑक्सिलरी मोटरें चालू होने के बाद DJ रुकता है।]',
      '3. Check interlock of relay Q44 and de-energization of relay Q118. [रिले Q44 के इंटरलॉक और रिले Q118 के डी-एनर्जाइज होने की जांच करें।]',
      '4. Check C118 contactor tips to ensure they open normally (sticky C118 trips DJ). [C118 कॉन्टैक्टर की टिप की जांच करें कि वह सामान्य रूप से खुल रही है (C118 के चिपके रहने से DJ ट्रिप हो जाता है)।]',
      '5. In SIV fitted locomotives, check display panel on SIV unit for any fault code when SIV starts. [यदि SIV लगा लोको है तो SIV पैनल पर डिस्प्ले देखें कि क्या SIV इनवर्टर चालू होते ही कोई फॉल्ट कोड आ रहा है।]',
      '6. Attempt to close DJ from the other cab; if failure persists, inform TLC. [दूसरी कैब से DJ क्लोज़ करने का प्रयास करें; यदि विफलता बनी रहे तो TLC को सूचित करें।]'
    ]
  },
  {
    id: 'CONV-GR-NO-PROGRESSION',
    subSystem: 'CONV_GR',
    message: 'नोच नहीं आ रहा है / GR प्रोग्रेशन नहीं हो रहा\nGR NOT PROGRESSING / NO NOTCHING\n(MP को N से + पर रखने पर नोच नहीं बढ़ता)',
    lamp: 'LSGR जलता रहेगा (0 नोच पर)',
    effect: 'Tap changer (GR) will not progress beyond 0 notch; no traction available (टैप चेंजर (GR) 0 नोच से आगे नहीं बढ़ेगा, ट्रैक्शन नहीं मिलेगा)',
    actions: [
      '1. Check Control Reservoir Pressure (CP pressure) 5.0 kg/cm² on control gauge. [कंट्रोल रिजर्वॉयर प्रेशर (CP प्रेशर) 5.0 kg/cm² चेक करें (कंट्रोल गेज पर)।]',
      '2. Ensure Reverser Handle (MPJ) is fully engaged in correct direction Forward (F) or Reverse (R). [रिवर्सर हैंडल (MPJ) को आगे (F) या पीछे (R) सही दिशा में पूरा लगा होना सुनिश्चित करें।]',
      '3. Ensure A-9 and SA-9 brakes are fully released; Brake Cylinder pressure (BC) is 0 kg/cm²; relays Q51 and Q52 are de-energized. [A-9 और SA-9 ब्रेक पूरी तरह रिलीज हों; ब्रेक सिलिंडर प्रेशर (BC) 0 kg/cm² हो। रिले Q51 और Q52 डी-एनर्जाइज अवस्था में हों।]',
      '4. Ensure parking brake (if applied) is fully released. [पार्किंग ब्रेक (यदि लगा हो) पूरी तरह रिलीज हो।]',
      '5. Check pickup of relay Q50; when MP is moved from N to + or V, relay Q50 must pick up. [रिले Q50 के पिकअप होने की जांच करें। जब MP को "N" से "+" या "V" पर रखा जाता है, तो Q50 पिकअप होनी चाहिए।]',
      '6. If automatic notching via MP fails, unlock ZSMGR handle from neutral and use manual notching handle up to 10-15 notches as per rules. [यदि ऑटोमैटिक नोचिंग (MP द्वारा) फेल हो जाए, तो ZSMGR हैंडल को न्यूट्रल से अनलॉक करके मैनुअल नोचिंग (हैंडल द्वारा) का उपयोग करें (नियम अनुसार अधिकतम 10-15 नोच तक)।]',
      '7. Inform TLC and record in locomotive log book. [TLC को सूचित करें और लॉग बुक में नोट करें।]'
    ]
  },
  {
    id: 'CONV-DJ-TRIP-ON-NOTCH',
    subSystem: 'CONV_GR',
    message: 'पहला या छठा नोच लेते ही DJ ट्रिप होना\nDJ TRIPPING ON 1st OR 6th NOTCH\n(नोच बढ़ाते ही DJ का अचानक खुल जाना)',
    lamp: 'LSDJ प्रकाशित होगा, LSGR बुझकर पुनः जलेगा',
    effect: 'Traction will cut off; DJ will open (गाड़ी में ट्रैक्शन कट जाएगा, DJ खुल जाएगा)',
    actions: [
      '1. If tripping occurs on taking 1st notch: check QOP1 or QOP2 (power circuit earth fault); check QRSI 1 or 2 (silicon rectifier overcurrent); check Q48 or QLA. [1st नोच लेते ही ट्रिपिंग होने पर: QOP1 या QOP2 (पावर सर्किट अर्थ फॉल्ट) की जांच करें; QRSI 1 या 2 (सिलिकॉन रेक्टिफायर ओवरकरंट) चेक करें; Q48 (कमजोर फील्ड रिले) या QLA की जांच करें।]',
      '2. If tripping occurs on taking 6th notch: this is usually due to flashover or excessive traction motor current; relay QLM (main transformer overcurrent) target may be dropped. [6th नोच लेते ही ट्रिपिंग होने पर: यह सामान्यतः ट्रैक्शन मोटर में फ्लैशओवर या अत्यधिक करंट के कारण होता है; रिले QLM (मेन ट्रांसफॉर्मर ओवरकरंट) का टारगेट गिरा हो सकता है।]',
      '3. Check relay target flags: troubleshoot the fault corresponding to the dropped relay. [रिले टारगेट चेक करें: जिस रिले का टारगेट गिरा हो, संबंधित फॉल्ट का निवारण करें।]',
      '4. If QOP1 is dropped, isolate bogie-1 traction motors (TM 1, 2, 3) one by one using HMCS-1 and inspect. [यदि QOP1 गिरा है तो HMCS-1 द्वारा बोगी-1 की ट्रैक्शन मोटरों (TM 1, 2, 3) को एक-एक करके आइसोलेट करके जांच करें।]',
      '5. If QOP2 is dropped, inspect bogie-2 traction motors (TM 4, 5, 6) using HMCS-2. [यदि QOP2 गिरा है तो HMCS-2 द्वारा बोगी-2 की ट्रैक्शन मोटरों (TM 4, 5, 6) की जांच करें।]',
      '6. Isolate the defective traction motor with HMCS switch and work train safely with 5 motors. [दोषयुक्त ट्रैक्शन मोटर को HMCS स्विच द्वारा आइसोलेट करें और 5 मोटरों पर सुरक्षित रूप से गाड़ी चलाएं।]'
    ]
  },
  {
    id: 'CONV-DJ-TRIP-FIRST-NOTCH',
    subSystem: 'CONV_GR',
    message: 'पहली नोच पर DJ/VCB ट्रिप होता है।\nDJ/VCB TRIPS ON 1st NOTCH\n(1st नोच लेते ही DJ ट्रिप होना / MVSI ब्लोअर, QVSI रिले अथवा टैप चेंजर GR दोष)',
    lamp: 'LSDJ प्रकाशित होगा, LSGR बुझकर पुनः प्रकाशित होगा (LSDJ will glow, LSGR will extinguish and glow again)',
    effect: 'DJ/VCB ट्रिप होगा, गाड़ी में ट्रैक्शन कट जाएगा (DJ/VCB will trip, traction power will cut off)',
    actions: [
      '【उप-असामान्य संकेत / कार्यवाही जो करनी है (Sub-abnormal Indication / Action to Take)】',
      '• Check position of both HVSI switches. If both HVSI are normal - place HVSI-1 and HVSI-2 to position "3", close DJ/VCB. Check operation of MVSI-1 and MVSI-2 blowers: (दोनों HVSI की पोजीशन चेक करें। यदि दोनों HVSI सामान्य हैं तो – HVSI-1 और HVSI-2 को "3" पर रखें, DJ/VCB क्लोज करें। MVSI-1 और MVSI-2 ब्लोअरों का काम चेक करें:)',
      'a) If any blower is not working: Isolate the concerned block. ((a) यदि कोई ब्लोअर काम नहीं करता तो - संबंधित ब्लॉक को आइसोलेट करें।)',
      'b) If both blowers are working: Take one notch: ((b) यदि दोनों ब्लोअर काम करते हैं तो एक नोच लें:)',
      'i) If DJ/VCB does not trip: Identify the defective QVSI relay and isolate it by placing the concerned switch to "3". (i) यदि DJ/VCB ट्रिप नहीं होता है तो - खराबी वाली QVSI का पता लगाएं और संबंधित स्विच को "3" पर रखकर उसे आइसोलेट करें।)',
      'ii) If DJ/VCB trips: Operate GR manually by hand. (ii) यदि DJ/VCB ट्रिप होता है तो - GR को हाथ से ऑपरेट करें।)'
    ]
  },
  {
    id: 'CONV-DJ-TRIP-SIXTH-NOTCH',
    subSystem: 'CONV_GR',
    message: 'छठी नोच पर DJ/VCB ट्रिप होता है।\nDJ/VCB TRIPS ON 6th NOTCH\n(6th नोच पर डीजे ट्रिपिंग / कॉन्टैक्टर C107, C105, C106 क्लोज न होना अथवा रिले Q100, CCA, Q118)',
    lamp: 'LSDJ प्रकाशित होगा, 6 नोच लेते ही DJ ट्रिप होगा (LSDJ will glow, DJ trips on taking 6th notch)',
    effect: 'DJ/VCB ट्रिप होगा, गाड़ी में ट्रैक्शन कट जाएगा (DJ/VCB will trip, traction power will cut off)',
    actions: [
      '【उप-असामान्य संकेत / कार्यवाही जो करनी है (Sub-abnormal Indication / Action to Take)】',
      '• Close DJ/VCB, close BLVMT and check that contactors C107, C105 and C106 are closed: (DJ/VCB क्लोज करें, BLVMT क्लोज करें और C107, C105 और C106 का क्लोज होना चेक करें:)',
      'a) If any contactor does not close: Troubleshoot, if necessary wedge it. (To close DJ/VCB, place the concerned switch to "0" or "3"). ((a) यदि कोई कॉन्टैक्टर क्लोज नहीं होता है तो ट्रबल शूट करें, आवश्यक हो तो उसे वेज करें। (DJ/VCB क्लोज करने के लिये संबंधित स्विच को “0” या “3” पर रखें))',
      '• Note: If any contactor does not close, check Q100 and CCA fuse before troubleshooting. (नोट :- यदि कोई कॉन्टैक्टर क्लोज नहीं होता है तो ट्रबल शूट करने से पहले Q100 और CCA चेक करें।)',
      'b) If all three contactors are closed: Place HVMT-1 and HVMT-2 to "3" and close DJ/VCB: ((b) यदि तीनों कॉन्टैक्टर क्लोज हैं तो HVMT-1 और HVMT-2 को “3” पर रखकर DJ/VCB क्लोज करें:)',
      'i) If successful: Work train while monitoring the operation of blowers. (i) यदि सफलता मिलती है तो ब्लोअरों का काम चेक करते हुए गाड़ी चलाएं।)',
      'ii) If not successful: Wedge relay Q118. (ii) यदि सफलता नहीं मिलती है तो Q118 को वेज करें।)'
    ]
  },
  {
    id: 'CONV-DJ-TRIP-DIFFERENT-NOTCHES',
    subSystem: 'CONV_GR',
    message: 'भिन्न-भिन्न नोच पर DJ/VCB ट्रिप होता है – अर्थात बिना किसी स्पष्ट कारण के DJ/VCB ट्रिप होता है।\nDJ/VCB TRIPS ON DIFFERENT NOTCHES - i.e. TRIPPING WITHOUT ANY APPARENT REASON\n(अनिश्चित नोच पर डीजे ट्रिपिंग / रिले Q118 वेजिंग, स्विच HVSI-1/2 व GR हस्त प्रचालन)',
    lamp: 'LSDJ प्रकाशित होगा, किसी भी नोच पर अचानक DJ ट्रिप होगा (LSDJ will glow, DJ trips unexpectedly on random notches)',
    effect: 'DJ/VCB ट्रिप होगा, गाड़ी में ट्रैक्शन कट जाएगा (DJ/VCB will trip, traction power will cut off)',
    actions: [
      '【उप-असामान्य संकेत / कार्यवाही जो करनी है (Sub-abnormal Indication / Action to Take)】',
      'a) Wedge relay Q118 with approved procedure. ((a) Q118 को वेज करें।)',
      'b) Place HVSI-1 and HVSI-2 to position "3". ((b) HVSI-1 और HVSI-2 को "3" पर रखें।)',
      'c) If not successful: Control / operate GR manually by hand. ((c) यदि सफलता नहीं मिलती तो GR को हाथ से कंट्रोल करें।)'
    ]
  },
  {
    id: 'CONV-QOP1-EARTH-FAULT',
    subSystem: 'CONV_RELAY',
    message: 'QOP-1 ड्रॉप होती है और DJ/VCB ट्रिप होता है\nQOP-1 DROPS AND DJ/VCB TRIPS\n(पावर सर्किट-1 अर्थ फॉल्ट सुरक्षा रिले QOP-1 / बोगी-1)',
    lamp: 'LSDJ प्रकाशित होगा, रिले पैनल पर QOP-1 का लाल टारगेट गिरेगा (LSDJ will glow, red target of QOP-1 drops)',
    effect: 'DJ/VCB ट्रिप होगा, बोगी-1 में ट्रैक्शन कट जाएगा (DJ/VCB will trip, traction cut off in Bogie-1)',
    actions: [
      '• Inspection: Check concerned equipment RSI-1, SL-1, L-1, L-2, L-3, J-1, TM-1, TM-2, TM-3, QD-1, SJ, CTF-1, CTF-2, CTF-3, Q20 etc. whether there is any defect in them, or any metallic piece is shorting any equipment to locomotive body. (जांच: संबंधित उपकरणों RSI-1, SL-1, L-1, L-2, L-3, J-1, TM-1, TM-2, TM-3, QD-1, SJ, CTF-1, CTF-2, CTF-3, Q20 इत्यादि को चेक करें उनमें कोई खराबी तो नहीं है अथवा धातु का टुकड़ा इत्यादि किसी उपकरण को लोको बॉडी के साथ शॉर्ट तो नहीं कर रहा है।)',
      '(A) If any defect is found: Isolate the concerned equipment, work carefully. ((A) यदि कोई खराबी है तो - संबंधित उपकरण को आइसोलेट करें, सावधानी पूर्वक काम करें।)',
      '(B) If no defect is found: Reset relay. ((B) यदि कोई खराबी नहीं है तो रिले रीसेट करें।)',
      '(i) If QOP-1 resets: Close DJ/VCB and resume traction. If QOP-1 drops again and DJ/VCB trips, recheck TM, SL and HT compartments for smell or smoke; if no defect is found, reset relay. Change HMCS-1 positions one by one to identify and isolate defective TM. If it drops on all HMCS-1 positions, clear section in coasting, inform TLC, halt train, place HMCS-1 to normal and HQOP-1 to OFF (0). Follow precautions and fail loco after 1-2 block sections as per TLC order. ((i) यदि QOP-1 रीसेट हो जाती है तो DJ-VCB क्लोज करें और ट्रैक्शन चालू करें। यदि QOP-1 फिर से ड्रॉप होती है और DJ/VCB ट्रिप होता है तो TM, SL व HT कम्पार्टमेंट चेक करें कि कोई गंध या धुआं तो नहीं है; रिले रीसेट करें। HMCS-1 की पोजीशन बारी-बारी बदलकर खराबी वाली TM का पता लगाकर आइसोलेट करें। सभी पोजीशन पर ड्रॉप होने पर कोस्टिंग में सेक्शन क्लियर कर TLC को सूचित करें, गाड़ी खड़ी कर HMCS-1 सामान्य व HQOP-1 को OFF पर रखें। सावधानियों का पालन करते हुए TLC आदेशानुसार 1-2 ब्लॉक सेक्शन बाद लोको फेल करें।)',
      '(ii) If QOP-1 does not reset: Clear section in coasting and inform TLC. Halt train, check all TM, SL and HT compartments for smell or smoke. Place HQOP-1 to OFF (0). Reset relay, observe precautions and fail loco after 1-2 block sections as per TLC orders. ((ii) यदि QOP-1 रीसेट नहीं होती है तो कोस्टिंग में सेक्शन क्लियर करके TLC को सूचित करें। गाड़ी खड़ी करके सभी TM, SL व HT कम्पार्टमेंट के पास जाकर देखें कि कोई गंध या धुआं तो नहीं है। HQOP-1 को OFF पर रखें। रिले रीसेट करें, नीचे लिखी सावधानियों का पालन करते हुए TLC आदेशानुसार 1-2 ब्लॉक सेक्शन चलने के बाद लोको फेल करें।)',
      '(iii) If QOP-1 resets but DJ/VCB does not close: Before troubleshooting ICDJ, halt train, observe precautions, place HQOP-1 to OFF (0) and retry. ((iii) यदि QOP-1 रीसेट हो जाती है और DJ/VCB क्लोज नहीं होता है तो ICDJ की ट्रबल शूटिंग करने से पहले गाड़ी खड़ी करके उपरोक्त सावधानियों का पालन करते हुए HQOP-1 को OFF पर रखकर प्रयत्न करें।)',
      '(iv) If any TM was already isolated due to auto-regression and QOP-1 drops: Take the isolated TM into service and isolate the defective TM. If not successful, isolate RSI-1 block. ((iv) अगर ऑटो-रिग्रेशन के कारण पहले से ही कोई ट्रैक्शन मोटर आइसोलेट है और QOP-1 ड्रॉप होती है तो आइसोलेट ट्रैक्शन मोटर को सर्विस में लेकर खराबी वाली ट्रैक्शन मोटर को आइसोलेट करें। यदि सफलता नहीं मिलती है तो RSI-1 ब्लॉक को आइसोलेट करें।)',
      '【Precautions when working train with HQOP-1 placed to OFF (0) - HQOP-1 को OFF पर रखकर गाड़ी चलाने पर सावधानियां】:',
      '• Precaution (a): Halt train, set A-9 to minimum reduction, apply SA-9 brake, take 2-3 notches and ensure all blowers are working; after 2-3 minutes check TM, SL and HT compartments for smoke/smell. Inspect near SL for burning smell. If normal, inform TLC and work as per instructions. ((a) गाड़ी खड़ी करके A-9 को मिनिमम रिडक्शन पर रखकर व SA-9 से ब्रेक लगाकर 2-3 नोच लें तथा सभी ब्लोअर का चालू होना सुनिश्चित करें व 2-3 मिनट बाद TM, SL तथा HT कम्पार्टमेंट में धुआं/गंध चेक करें। SL के पास गंध चेक करें। सब नॉर्मल होने पर TLC को सूचित कर निर्देशानुसार कार्य करें।)',
      '• Precaution (b): If load is within permissible limits, isolate RSI-1 block as well. ((b) यदि लोड स्वीकृत सीमा में है तो RSI-1 ब्लॉक को भी आइसोलेट करें।)',
      '• Precaution (c): ALP should get down on ground; when LP takes 2-3 notches to start train, ensure all wheels rotate freely and there is no defect in TM and SL. ((c) सहायक लोको पायलट नीचे उतरकर जब लोको पायलट गाड़ी रवाना करने के लिए 2-3 नोच लें तब सुनिश्चित करें कि सभी व्हील बराबर (Freely) घूम रहे हैं तथा TM व SL में कोई खराबी नहीं है।)',
      '• Precaution (d): If smoke is visible in TM, SL or HT compartment, demand assistance immediately. ((d) यदि TM, SL अथवा HT कम्पार्टमेंट में धुआं दिखाई देता है तो तुरंत सहायता मांगें।)'
    ]
  },
  {
    id: 'CONV-QOP2-EARTH-FAULT',
    subSystem: 'CONV_RELAY',
    message: 'QOP-2 ड्रॉप होती है और DJ/VCB ट्रिप होता है\nQOP-2 DROPS AND DJ/VCB TRIPS\n(पावर सर्किट-2 अर्थ फॉल्ट सुरक्षा रिले QOP-2 / बोगी-2)',
    lamp: 'LSDJ प्रकाशित होगा, रिले पैनल पर QOP-2 का लाल टारगेट गिरेगा (LSDJ will glow, red target of QOP-2 drops)',
    effect: 'DJ/VCB ट्रिप होगा, बोगी-2 में ट्रैक्शन कट जाएगा (DJ/VCB will trip, traction cut off in Bogie-2)',
    actions: [
      '• Inspection: Check concerned equipment RSI-2, SL-2, L-4, L-5, L-6, J-2, TM-4, TM-5, TM-6, QD-2, SJ, CTF-1, CTF-2, CTF-3 and etc. whether there is any defect in them, or any metallic piece is shorting any equipment to locomotive body. (जांच: संबंधित उपकरणों RSI-2, SL-2, L-4, L-5, L-6, J-2, TM-4, TM-5, TM-6, QD-2, SJ, CTF-1, CTF-2, CTF-3 एवं इत्यादि को चेक करें उनमें कोई खराबी तो नहीं है अथवा धातु का टुकड़ा इत्यादि किसी उपकरण को लोको बॉडी के साथ शॉर्ट तो नहीं कर रहा है।)',
      '(A) If any defect is found: Isolate the concerned equipment, work carefully. ((A) यदि कोई खराबी है तो - संबंधित उपकरण को आइसोलेट करें, सावधानी पूर्वक काम करें।)',
      '(B) If no defect is found: Reset relay. ((B) यदि कोई खराबी नहीं है तो रिले रीसेट करें।)',
      '(i) If QOP-2 resets: Close DJ-VCB and resume traction. If QOP-2 drops again and DJ/VCB trips, recheck defect. Inspect near all TM, SL and HT compartments to check if there is any smell or smoke; if no defect is found, reset relay. Change HMCS-2 positions one by one and take traction to identify the defective traction motor and isolate it. Inform TLC at next convenient stop. If QOP-2 drops on all HMCS-2 positions and no defect is found, clear section in coasting and inform TLC. Halt train, place HMCS-2 to normal position and place HQOP-2 to OFF (0). Reset relay, work observing precautions written below. As per TLC orders, fail loco after working 1-2 block sections. ((i) यदि QOP-2 रीसेट हो जाती है तो DJ-VCB क्लोज करें और ट्रैक्शन चालू करें। यदि QOP-2 फिर से ड्रॉप होती है और DJ/VCB ट्रिप होता है तो खराबी फिर से चेक करें। सभी TM, SL व HT कम्पार्टमेंट के पास जाकर देखें कि कोई गंध या धुआं तो नहीं है और यदि कोई खराबी नहीं पाई जाती तो रिले रीसेट करें। HMCS-2 की पोजीशन बारी-बारी से बदलकर ट्रैक्शन चालू करके खराबी वाली ट्रैक्शन मोटर का पता लगाकर उसको आइसोलेट कर दें। अगले सुविधाजनक स्टॉप पर TLC को सूचित करें। यदि HMCS-2 की सभी पोजीशन पर QOP-2 ड्रॉप होती है और कोई खराबी नहीं मिलती है तो कोस्टिंग में सेक्शन क्लियर करके TLC को सूचित करें। गाड़ी खड़ी करके HMCS-2 को सामान्य पोजीशन पर रखें और HQOP-2 को OFF पर रखें। रिले रीसेट करें, नीचे लिखी सावधानियों का पालन करते हुए कार्य करें। TLC के आदेशानुसार, एक या दो ब्लॉक सेक्शन चलने के बाद लोको फेल करें।)',
      '(ii) If QOP-2 does not reset: Clear section in coasting and inform TLC. Halt train, inspect all TM, SL and HT compartments to check whether there is any smell or smoke. Place HQOP-2 to OFF (0). Reset relay, observing precautions written below and as per TLC orders, fail loco after working 1-2 block sections. ((ii) यदि QOP-2 रीसेट नहीं होती है तो कोस्टिंग में सेक्शन क्लियर करके TLC को सूचित करें। गाड़ी खड़ी करके सभी TM, SL व HT कम्पार्टमेंट के पास जाकर देखें कि कोई गंध या धुआं तो नहीं है। HQOP-2 को OFF पर रखें। रिले रीसेट करें, नीचे लिखी सावधानियों का पालन करते हुए TLC आदेशानुसार, एक या दो ब्लॉक सेक्शन चलने के बाद लोको फेल करें।)',
      '(iii) If QOP-2 resets but DJ/VCB does not close: Before troubleshooting ICDJ, halt train, observe the above precautions, place HQOP-2 to OFF (0) and retry. ((iii) यदि QOP-2 रीसेट हो जाती है और DJ/VCB क्लोज नहीं होता है तो ICDJ की ट्रबल शूटिंग करने से पहले गाड़ी खड़ी करके उपरोक्त सावधानियों का पालन करते हुए HQOP-2 को OFF पर रखकर प्रयत्न करें।)',
      '(iv) If any traction motor is already isolated due to auto-regression and QOP-2 drops: Take the isolated traction motor into service and isolate the defective traction motor. If not successful, isolate RSI-2 block. ((iv) अगर ऑटो-रिग्रेशन के कारण पहले से ही कोई ट्रैक्शन मोटर आइसोलेट है और QOP-2 ड्रॉप होती है तो आइसोलेट ट्रैक्शन मोटर को सर्विस में लेकर खराबी वाली ट्रैक्शन मोटर को आइसोलेट करें। यदि सफलता नहीं मिलती है तो RSI-2 ब्लॉक को आइसोलेट करें।)',
      '【Precautions when working train with HQOP-2 placed to OFF (0) - HQOP-2 को OFF पर रखकर गाड़ी चलाने पर सावधानियां】:',
      '• Precaution (a): Halt train, set A-9 to minimum reduction, apply SA-9 brake, take 2-3 notches and ensure all blowers are working; after 2-3 minutes check TM, SL and HT compartments for smoke/smell. Inspect near SL for burning smell. If everything is normal, inform TLC while checking smoke/smell/fire/abnormality in SL, HT & TM, and work as per instructions. ((a) गाड़ी खड़ी करके A-9 को मिनिमम रिडक्शन पर रखकर व SA-9 से ब्रेक लगाकर 2-3 नोच लें तथा सभी ब्लोअर का चालू होना सुनिश्चित करें व दो-तीन मिनट बाद ट्रैक्शन मोटर, SL तथा HT कम्पार्टमेंट में धुआं / गंध इत्यादि को चेक करें। SL के पास जाकर देखें कोई गंध तो नहीं आ रही है। यदि सब कुछ नॉर्मल है तो SL, HT एवं ट्रैक्शन मोटर में धुआं / गंध / आग या कोई अन्य असामान्यता चेक करते हुए TLC को सूचित करें और उसके निर्देशानुसार कार्य करें।)',
      '• Precaution (b): If load is within permissible limits, isolate RSI-2 block as well. ((b) यदि लोड स्वीकृत सीमा में है तो RSI-2 ब्लॉक को भी आइसोलेट करें।)',
      '• Precaution (c): Assistant Loco Pilot should get down on ground; when Loco Pilot takes 2-3 notches to start train, ensure all wheels rotate freely and there is no defect in TM and SL. ((c) सहायक लोको पायलट नीचे उतरकर जब लोको पायलट गाड़ी रवाना करने के लिए 2/3 नोच लें तब सुनिश्चित करें कि सभी व्हील बराबर (Freely) घूम रहे हैं तथा TM व SL में कोई खराबी नहीं है।)',
      '• Precaution (d): If smoke is visible in TM, SL or HT compartment, demand assistance immediately. ((d) यदि TM, SL अथवा HT कम्पार्टमेंट में धुआं दिखाई देता है तो सहायता मांगें।)'
    ]
  },
  {
    id: 'CONV-QOP-EARTH-FAULT',
    subSystem: 'CONV_RELAY',
    message: 'QOP1 / QOP2 रिले का ड्रॉप होना\nQOP RELAY DROPPING (EARTH FAULT IN TRACTION POWER CIRCUIT)\n(पावर सर्किट में अर्थ फॉल्ट)',
    lamp: 'LSDJ जल जाएगा, QOP रिले का लाल टारगेट गिरेगा',
    effect: 'DJ ट्रिप हो जाएगा, ट्रैक्शन बाधित होगा',
    actions: [
      '1. Go to relay panel in corridor and check target flags (red flag) of QOP-1 or QOP-2. [कॉरिडोर में रिले पैनल पर जाकर QOP-1 या QOP-2 के टारगेट (लाल ध्वज) की जांच करें।]',
      '2. Reset the target by turning the reset knob of the dropped relay. [जिस रिले का टारगेट गिरा हो, उसकी नॉब घुमाकर टारगेट रीसेट करें।]',
      '3. If QOP-1 dropped (bogie-1 TM 1-2-3 circuit): operate switch HMCS-1 from normal position 1. If needed, inspect TM before placing HQOP-1 to 0. [यदि QOP-1 गिरा है (बोगी-1 TM 1-2-3 सर्किट): स्विच HMCS-1 को सामान्य (स्थिति 1) से बदलें। यदि आवश्यक हो तो स्विच HQOP-1 को "0" पर रखकर आइसोलेट करने से पहले TM की जांच करें।]',
      '4. If QOP-2 dropped (bogie-2 TM 4-5-6 circuit): operate switch HMCS-2 from normal position 1. [यदि QOP-2 गिरा है (बोगी-2 TM 4-5-6 सर्किट): स्विच HMCS-2 को सामान्य से बदलें।]',
      '5. Traction motor isolation procedure: put HMCS-1 on positions 2, 3, 4 to find which isolated motor keeps QOP energized. Keep defective motor isolated. [ट्रैक्शन मोटर आइसोलेशन प्रक्रिया: HMCS-1 को क्रमशः स्थिति 2, 3, 4 पर रखकर देखें कि किस मोटर को आइसोलेट करने पर QOP नहीं गिरती; जिस मोटर में अर्थ फॉल्ट हो उसे HMCS से आइसोलेट रखें।]',
      '6. If earth fault persists even after testing all motors, take permission from TLC before placing HQOP switch to 0 (isolated). [यदि सभी मोटरों के ठीक होने पर भी अर्थ फॉल्ट रहता है तो HQOP स्विच को "0" (आइसोलेट) पर रखने के लिए TLC से अनुमति लें।]'
    ]
  },
  {
    id: 'CONV-QOA-EARTH-FAULT',
    subSystem: 'CONV_RELAY',
    message: 'QOA ड्रॉप होती है और DJ/VCB ट्रिप होता है\nQOA DROPS AND DJ/VCB TRIPS\n(ऑक्सिलरी पावर सर्किट अर्थ फॉल्ट सुरक्षा रिले QOA)',
    lamp: 'LSDJ प्रकाशित होगा, रिले पैनल पर QOA का लाल टारगेट गिरेगा (LSDJ will glow, red target of QOA drops)',
    effect: 'DJ/VCB ट्रिप होगा, सभी सहायक मोटरें (Compressor, Blowers) बंद हो जाएंगी (DJ/VCB will trip, auxiliary motors stop)',
    actions: [
      '• Inspection: Check ARNO, R118, C118, CHBA, TK panel and auxiliaries etc. whether there is any defect in them, or any metallic piece is shorting any equipment to locomotive body. (जांच: आर्नो, R118, C118, CHBA, TK पैनल और ऑक्सिलरी इत्यादि को चेक करें उनमें कोई खराबी तो नहीं है अथवा कोई धातु का टुकड़ा इत्यादि किसी उपकरण को लोको बॉडी के साथ शॉर्ट तो नहीं कर रहा है।)',
      '(I) If any defect is found: Isolate the concerned equipment, work carefully. If any defect is found in ARNO, R118 or C118, demand assistance. ((I) यदि कोई खराबी है तो - संबंधित उपकरण को आइसोलेट करें, सावधानी पूर्वक कार्य करें। यदि आर्नो, R118 अथवा C118 में कोई खराबी पाई जाए तो सहायता मांगें।)',
      '(II) If no defect is found: Open BLRA, BLCP and BLVMT. Remove fuses CCRA-1, CCRA-2 and CCVT, reset relay. ((II) यदि कोई खराबी नहीं मिलती – BLRA, BLCP और BLVMT को ओपन करें। CCRA-1, CCRA-2 और CCVT फ्यूज निकालें, रिले को रीसेट करें।)',
      '(a) If QOA does not reset: Place HQOA to "0", reset relay, work carefully and inform TLC at first opportunity. ((a) यदि QOA रीसेट नहीं होती है तो HQOA को "0" पर रखकर रिले रीसेट करें, सावधानी पूर्वक कार्य करें तथा पहले अवसर पर TLC को सूचित करें।)',
      '(b) If QOA resets: Close DJ/VCB and run auxiliaries. ((b) यदि QOA रीसेट हो जाती है तो DJ/VCB क्लोज करें और ऑक्सिलरी चलाएं।)',
      'A) If QOA drops again and DJ/VCB trips: Place switches HCHBA, HPH, HVSL-1, HVSL-2, HVSI-1 and HVSI-2 to "0" position. Reset relay and close DJ/VCB. (A) यदि QOA फिर से ड्रॉप होती है और DJ/VCB ट्रिप होता है तो - स्विच HCHBA, HPH, HVSL-1, HVSL-2, HVSI-1 और HVSI-2 को "0" पोजीशन पर रखें। रिले रीसेट करें और DJ/VCB क्लोज करें।)',
      'i) If QOA drops and DJ/VCB trips: Check ARNO, R118 and C118; if no defect is found, isolate QOA by placing HQOA to "0" and work carefully. (i) यदि QOA ड्रॉप होती है और DJ/VCB ट्रिप होता है तो - आर्नो, R118 और C118 को चेक करें; यदि कोई खराबी नहीं पाई जाती तो HQOA को "0" पर रखकर QOA को आइसोलेट करें और सावधानीपूर्वक कार्य करें।)',
      'ii) If DJ/VCB does not trip: Put switches HCHBA, HPH, HVSL-1, HVSL-2, HVSI-1 and HVSI-2 one by one to position "1" to identify the defective equipment, isolate it and work carefully. (ii) यदि DJ/VCB ट्रिप नहीं होता है तो - स्विच HCHBA, HPH, HVSL-1, HVSL-2, HVSI-1 और HVSI-2 को एक-एक करके पोजीशन "1" पर रखकर खराबी वाले उपकरण का पता लगाकर उसे आइसोलेट करें और सावधानी पूर्वक कार्य करें।)',
      'B) If QOA does not drop and DJ/VCB does not trip: (B) यदि QOA ड्रॉप नहीं होती है और DJ/VCB ट्रिप नहीं होता है तो:)',
      'C) Close BLCP: If QOA drops and DJ/VCB trips, reset relay, close DJ/VCB. Change HCP positions to identify the defective MCP and isolate it. (C) BLCP क्लोज करें - यदि QOA ड्रॉप होती है और DJ/VCB ट्रिप होता है तो रिले रीसेट करें, DJ/VCB क्लोज करें। HCP की पोजीशन बदल-बदल कर खराबी वाले MCP का पता लगाकर उसे आइसोलेट करें।)',
      '• If upon closing BLCP, QOA does not drop and DJ/VCB does not trip: (BLCP क्लोज करने पर यदि QOA ड्रॉप नहीं होती है और DJ/VCB ट्रिप नहीं होता है तो:)',
      'D) Close BLVMT: If QOA drops and DJ/VCB trips, place HVRH, HVMT-1 and HVMT-2 to "0". Reset relay, close DJ/VCB. Put switches one by one to position "1" at 10-second intervals to identify the defective equipment, isolate it and work carefully. (D) BLVMT क्लोज करें - यदि QOA ड्रॉप होती है और DJ/VCB ट्रिप होता है तो HVRH, HVMT-1 और HVMT-2 को "0" पर रखें। रिले रीसेट करें, DJ/VCB क्लोज करें। स्विचों को एक-एक करके दस-दस सेकंड के अंतर से पोजीशन "1" पर रखें। इस प्रकार खराबी वाले उपकरण का पता लगाकर उसे आइसोलेट करें और सावधानी पूर्वक कार्य करें।)',
      '【Notes / नोट】:',
      '• Note (i): In case QOA drops, if defective equipment cannot be identified and no abnormality is found in any equipment, isolate QOA by placing HQOA to "0". (नोट (i): QOA ड्रॉप होने की हालत में यदि खराबी वाले उपकरण का पता नहीं लगता और किसी उपकरण में कोई असामान्य बात भी नहीं पाई जाती है तो HQOA को "0" पर रखकर QOA को आइसोलेट करें।)',
      '• Note (ii): If any individual auxiliary is isolated by placing its switch to "0", ensure that its corresponding contactor is properly open. (नोट (ii): यदि कोई स्वतंत्र ऑक्सिलरी उसकी स्विच को "0" पर रखकर आइसोलेट की गई है तो संबंधित कॉन्टैक्टर बराबर खुला है, सुनिश्चित करें।)'
    ]
  },
  {
    id: 'CONV-QLA-OVERCURRENT',
    subSystem: 'CONV_RELAY',
    message: 'QLA ड्रॉप होती है और DJ/VCB ट्रिप होता है\nQLA DROPS AND DJ/VCB TRIPS\n(ऑक्सिलरी पावर सर्किट ओवरकरंट सुरक्षा रिले QLA / ARNO एवं ऑक्सिलरी मोटर सुरक्षा)',
    lamp: 'LSDJ प्रकाशित होगा, रिले पैनल पर QLA का लाल टारगेट गिरेगा (LSDJ will glow, red target of QLA drops)',
    effect: 'DJ/VCB ट्रिप होगा, सभी सहायक मोटरें (ARNO / Blowers / Compressors) बंद हो जाएंगी (DJ/VCB will trip, auxiliary motors stop)',
    actions: [
      '• Inspection: Check for defects in ARNO and auxiliaries etc. (जांच: आर्नो और ऑक्सिलरियों इत्यादि में खराबी चेक करें।)',
      '(a) If defect is in ARNO or in equipment which cannot be isolated: Demand assistance. ((a) यदि खराबी आर्नो या ऐसे साधन में है जिसे आइसोलेट नहीं किया जा सकता तो सहायता मांगें।)',
      '(b) If defect is in equipment which can be isolated: Isolate that equipment, reset relay and work carefully. ((b) यदि खराबी ऐसे साधन में है जिसे आइसोलेट किया जा सकता है तो उस साधन को आइसोलेट करें, रिले रीसेट करें एवं सावधानी पूर्वक कार्य करें।)',
      '(c) If no defect is found: Reset relay, close DJ/VCB, start auxiliaries and work train. ((c) यदि कोई खराबी नहीं मिलती है तो - रिले रीसेट करें, DJ/VCB क्लोज करें और ऑक्सिलरी चालू करें और गाड़ी चलाएं।)',
      '• Note: If QLA drops again, it can be reset a maximum of three times. (नोट :- यदि QLA फिर से ड्रॉप हो रही है तो उसे अधिकतम तीन बार रीसेट किया जा सकता है।)'
    ]
  },
  {
    id: 'CONV-QLM-OVERCURRENT',
    subSystem: 'CONV_RELAY',
    message: 'QLM रिले ड्रॉप होना एवं DJ/VCB ट्रिप होना\nQLM RELAY DROPPING & DJ/VCB TRIPPING\n(मेन ट्रांसफॉर्मर प्राइमरी ओवरकरंट सुरक्षा रिले QLM)',
    lamp: 'LSDJ प्रकाशित होगा, QLM व संबंधित रिले का टारगेट गिरेगा (LSDJ will glow, QLM target drops)',
    effect: 'DJ/VCB ट्रिप होगा, लोको पावर कट जाएगी (DJ/VCB will trip, loco power will cut off)',
    actions: [
      '【Situation 1: QLM drops alone & DJ/VCB trips - स्थिति 1: QLM अकेली ड्रॉप होती है और DJ/VCB ट्रिप होता है】',
      '• Inspection: Check whether there is any oil spillage or leakage in Transformer and GR, ensure oil is not accumulated in oil trap chamber, and check Transformer, RPGR, CGR, RGR, main bushing and bus bar connections etc. for any defect. (जांच: ट्रांसफॉर्मर और GR में तेल का बिखराव या तेल का लीकेज तो नहीं है, ऑयल ट्रैप चैंबर में तेल भरा तो नहीं है व ट्रांसफॉर्मर, RPGR, CGR, RGR, मेन बुशिंग और बस बार कनेक्शन इत्यादि में कोई खराबी तो नहीं है इसकी जांच करें।)',
      'a) If any defect is noticed or oil is spilled: Demand assistance. (a) यदि कोई खराबी है या तेल बिखरा है तो सहायता मांगें।)',
      'b) If no defect is found: Reset relay by rotating knob clockwise, close DJ/VCB. (b) यदि कोई खराबी नहीं पाई जाती है तो रिले को क्लॉक वाइज घुमाकर रीसेट करें, DJ/VCB क्लोज करें।)',
      '• If QLM drops again: Demand assistance. (यदि QLM फिर से ड्रॉप होती है तो सहायता मांगें।)',
      '• Note: QLM can be reset only once. (नोट :- QLM को केवल एक ही बार रीसेट किया जा सकता है।)',
      '【Situation 2 (A): QLM drops along with any other relay & DJ/VCB trips - स्थिति 2 (A): QLM किसी अन्य रिले के साथ ड्रॉप होती है और DJ/VCB ट्रिप होता है】',
      '• Inspection: Check winding circuit whether oil of tap changer / main transformer has spilled and check that their oil level is correct, GR safety valves are not blowing, CGR 1, 2, 3 and their arc chute covers are intact, and no smoke or sparks are emitting from main bushing / insulators or any equipment. (जांच: वाइंडिंग सर्किट को चेक करें कि कहीं टैप चेंजर / मेन ट्रांसफॉर्मर का तेल तो नहीं बिखरा है तथा उनका तेल लेवल सही है, GR सेफ्टी वाल्व ब्लो नहीं कर रहे हैं, CGR 1,2,3 और उनके आर्कच्यूट कवर सही हैं, मेन बुशिंग / इंसुलेटर तथा किसी उपकरण में से धुआं, चिंगारी तो नहीं निकल रही है।)',
      'a) If any abnormality is noticed: Demand assistance. (a) यदि कोई असामान्यता मिलती है तो सहायता मांगें।)',
      'b) If no abnormality is noticed: Check for fault in traction power circuit / auxiliary circuit. (b) यदि कोई असामान्यता नहीं मिलती है तो ट्रैक्शन पावर सर्किट / ऑक्सिलरी सर्किट में खराबी ढूंढें।)',
      'c) If any defect is found: Isolate the defective equipment, reset relays and work train. (c) यदि कोई खराबी मिलती है तो खराबी वाले उपकरणों को आइसोलेट करें, रिले को रीसेट करें और गाड़ी चलाएं।)',
      'd) If no defect is found: Reset relays and work train. (d) यदि कोई खराबी नहीं मिलती है तो रिले को रीसेट करें और गाड़ी चलाएं।)',
      'e) Locomotive should be thoroughly inspected by maintenance staff at nearest possible station; Inform TLC. (e) नजदीकी संभव स्थान पर मेंटेनेंस स्टाफ द्वारा लोको का पूर्ण निरीक्षण किया जाए। टीएलसी को सूचित करें।)',
      '【Situation 3 (B): QLM drops again with any other relay & DJ/VCB trips - स्थिति 3 (B): QLM किसी अन्य रिले के साथ दोबारा ड्रॉप होती है और DJ/VCB ट्रिप होता है】',
      '1. Do not reset the relay. Demand assistance. (1. रिले को रीसेट न करें। सहायता मांगें।)'
    ]
  },
  {
    id: 'CONV-QLM-ALONE-DROP',
    subSystem: 'CONV_RELAY',
    message: '1. QLM अकेली ड्रॉप होती है और DJ/VCB ट्रिप होता है\nQLM DROPS ALONE AND DJ/VCB TRIPS\n(मेन ट्रांसफॉर्मर प्राइमरी ओवरकरंट सुरक्षा रिले QLM - स्थिति 1)',
    lamp: 'LSDJ प्रकाशित होगा, रिले पैनल पर QLM का लाल टारगेट गिरेगा (LSDJ will glow, red target of QLM relay drops)',
    effect: 'DJ/VCB ट्रिप होगा, लोको पावर कट जाएगी (DJ/VCB will trip, loco power cut off)',
    actions: [
      '• Inspection: Check whether there is any oil spillage or leakage in Transformer and GR, ensure oil is not accumulated in oil trap chamber, and check Transformer, RPGR, CGR, RGR, main bushing and bus bar connections etc. for any defect. (जांच: ट्रांसफॉर्मर और GR में तेल का बिखराव या तेल का लीकेज तो नहीं है, ऑयल ट्रैप चैंबर में तेल भरा तो नहीं है व ट्रांसफॉर्मर, RPGR, CGR, RGR, मेन बुशिंग और बस बार कनेक्शन इत्यादि में कोई खराबी तो नहीं है इसकी जांच करें।)',
      'a) If any defect is noticed or oil is spilled: Demand assistance. (a) यदि कोई खराबी है या तेल बिखरा है तो सहायता मांगें।)',
      'b) If no defect is found: Reset relay by rotating knob clockwise, close DJ/VCB. (b) यदि कोई खराबी नहीं पाई जाती है तो रिले को क्लॉक वाइज घुमाकर रीसेट करें, DJ/VCB क्लोज करें।)',
      '• If QLM drops again: Demand assistance. (यदि QLM फिर से ड्रॉप होती है तो सहायता मांगें।)',
      '• Note: QLM can be reset only once. (नोट :- QLM को केवल एक ही बार रीसेट किया जा सकता है।)'
    ]
  },
  {
    id: 'CONV-QLM-WITH-OTHER-RELAYS',
    subSystem: 'CONV_RELAY',
    message: '(A) QLM किसी अन्य रिले के साथ ड्रॉप होती है और DJ/VCB ट्रिप होता है\nQLM DROPS ALONG WITH ANOTHER RELAY AND DJ/VCB TRIPS\n(सुरक्षा रिले ट्रिपिंग: QLM + QOP / QOA / QRSI)',
    lamp: 'LSDJ प्रकाशित होगा, QLM व संबंधित रिले का टारगेट गिरेगा (LSDJ will glow, QLM and related relay flag drops)',
    effect: 'DJ/VCB ट्रिप होगा, लोको पावर कट जाएगी (DJ/VCB will trip, loco power will cut off)',
    actions: [
      '• Inspection: Check winding circuit whether oil of tap changer / main transformer has spilled and check that their oil level is correct, GR safety valves are not blowing, CGR 1, 2, 3 and their arc chute covers are intact, and no smoke or sparks are emitting from main bushing / insulators or any equipment. (जांच: वाइंडिंग सर्किट को चेक करें कि कहीं टैप चेंजर / मेन ट्रांसफॉर्मर का तेल तो नहीं बिखरा है तथा उनका तेल लेवल सही है, GR सेफ्टी वाल्व ब्लो नहीं कर रहे हैं, CGR 1,2,3 और उनके आर्कच्यूट कवर सही हैं, मेन बुशिंग / इंसुलेटर तथा किसी उपकरण में से धुआं, चिंगारी तो नहीं निकल रही है।)',
      'a) If any abnormality is noticed: Demand assistance. (a) यदि कोई असामान्यता मिलती है तो सहायता मांगें।)',
      'b) If no abnormality is noticed: Check for fault in traction power circuit / auxiliary circuit. (b) यदि कोई असामान्यता नहीं मिलती है तो ट्रैक्शन पावर सर्किट / ऑक्सिलरी सर्किट में खराबी ढूंढें।)',
      'c) If any defect is found: Isolate the defective equipment, reset relays and work train. (c) यदि कोई खराबी मिलती है तो खराबी वाले उपकरणों को आइसोलेट करें, रिले को रीसेट करें और गाड़ी चलाएं।)',
      'd) If no defect is found: Reset relays and work train. (d) यदि कोई खराबी नहीं मिलती है तो रिले को रीसेट करें और गाड़ी चलाएं।)',
      'e) Locomotive should be thoroughly inspected by maintenance staff at nearest possible station; Inform TLC. (e) नजदीकी संभव स्थान पर मेंटेनेंस स्टाफ द्वारा लोको का पूर्ण निरीक्षण किया जाए। टीएलसी को सूचित करें।)'
    ]
  },
  {
    id: 'CONV-QLM-REPEAT-DROP',
    subSystem: 'CONV_RELAY',
    message: '(B) QLM किसी अन्य रिले के साथ दोबारा ड्रॉप होती है और DJ/VCB ट्रिप होता है\nQLM DROPS AGAIN ALONG WITH ANOTHER RELAY AND DJ/VCB TRIPS\n(QLM रिले दोबारा ड्रॉप होना - रीसेट वर्जित)',
    lamp: 'LSDJ प्रकाशित रहेगा, रिले टारगेट गिरेगा (LSDJ will glow, relay target drops)',
    effect: 'DJ/VCB ट्रिप होगा, लोको पावर कट जाएगी (DJ/VCB will trip, loco power cuts off)',
    actions: [
      '1. Do not reset the relay. Demand assistance. (1. रिले को रीसेट न करें। सहायता मांगें।)'
    ]
  },
  {
    id: 'CONV-QRSI-1-TRIP',
    subSystem: 'CONV_RELAY',
    message: 'QRSI-1 ड्रॉप होती है और DJ/VCB ट्रिप होता है\nQRSI-1 DROPS AND DJ/VCB TRIPS\n(सिलिकॉन रेक्टिफायर-1 ओवरकरंट सुरक्षा रिले QRSI-1 / RSI-1 व बोगी-1 सर्किट)',
    lamp: 'LSDJ प्रकाशित होगा, रिले पैनल पर QRSI-1 का लाल टारगेट गिरेगा (LSDJ will glow, red target of QRSI-1 relay will drop)',
    effect: 'DJ/VCB ट्रिप होगा, बोगी-1 / TM 1-2-3 में ट्रैक्शन कट जाएगा (DJ/VCB will trip, traction cut off in Bogie-1)',
    actions: [
      '• Inspection: Check RSI-1, SL-1, L1, L2 and L3, SJ, J-1, CTF, QD-1, Q-20 and TM1, TM2 and TM3 etc., whether there is any defect in them or any metallic piece or cable is shorted. (जांच: RSI-1, SL-1, L1, L2 और L3, SJ, J-1, CTF, QD-1, Q-20 और TM1, TM2 और TM3 इत्यादि को चेक करें, उनमें कोई खराबी तो नहीं है अथवा कोई धातु का टुकड़ा या केबल शॉर्ट तो नहीं है।)',
      'a) If any defect is found: Isolate the concerned equipment. ({a} यदि कोई खराबी मिलती है तो - संबंधित उपकरण को आइसोलेट करें।)',
      'b) If no defect is found: Reset relay, close DJ/VCB. Resume traction. ({b} यदि कोई खराबी नहीं मिलती है तो - रिले रीसेट करें, DJ/VCB क्लोज करें। ट्रैक्शन चालू करें।)',
      '• If QRSI-1 drops again and DJ/VCB trips: Identify the defective traction motor via HMCS-1 and keep it isolated. (यदि QRSI-1 फिर से ड्रॉप होती है और DJ/VCB ट्रिप होता है तो HMCS-1 के द्वारा खराबी वाली ट्रैक्शन मोटर का पता लगाकर उसको आइसोलेट ही रखें।)',
      '• If still no success: Place HVSI-1, HVMT-1 and HVSL-1 to 0 position and work train with the remaining three traction motors. (यदि फिर भी सफलता नहीं मिलती है तो HVSI-1, HVMT-1 और HVSL-1 को शून्य पोजीशन पर रखकर शेष तीन ट्रैक्शन मोटरों से कार्य करें।)'
    ]
  },
  {
    id: 'CONV-QRSI-2-TRIP',
    subSystem: 'CONV_RELAY',
    message: 'QRSI-2 ड्रॉप होती है और DJ/VCB ट्रिप होता है\nQRSI-2 DROPS AND DJ/VCB TRIPS\n(सिलिकॉन रेक्टिफायर-2 ओवरकरंट सुरक्षा रिले QRSI-2 / RSI-2 व बोगी-2 सर्किट)',
    lamp: 'LSDJ प्रकाशित होगा, रिले पैनल पर QRSI-2 का लाल टारगेट गिरेगा (LSDJ will glow, red target of QRSI-2 relay will drop)',
    effect: 'DJ/VCB ट्रिप होगा, बोगी-2 / TM 4-5-6 में ट्रैक्शन कट जाएगा (DJ/VCB will trip, traction cut off in Bogie-2)',
    actions: [
      '• Inspection: Check RSI-2, SL-2, L4, L5 and L6, SJ, J-2, CTF, QD-2, Q-20 and TM4, TM5 and TM6 etc., whether there is any defect in them or any metallic piece or cable is shorted. (जांच: RSI-2, SL-2, L4, L5 और L6, SJ, J-2, CTF, QD-2, Q-20 और TM4, TM5 और TM6 इत्यादि को चेक करें, उनमें कोई खराबी तो नहीं है अथवा कोई धातु का टुकड़ा या केबल शॉर्ट तो नहीं है।)',
      'a) If any defect is found: Isolate the concerned equipment. ({a} यदि कोई खराबी मिलती है तो - संबंधित उपकरण को आइसोलेट करें।)',
      'b) If no defect is found: Reset relay, close DJ/VCB. Resume traction. ({b} यदि कोई खराबी नहीं मिलती है तो - रिले रीसेट करें, DJ/VCB क्लोज करें। ट्रैक्शन चालू करें।)',
      '• If QRSI-2 drops again and DJ/VCB trips: Identify the defective traction motor via HMCS-2 and keep it isolated. (यदि QRSI-2 फिर से ड्रॉप होती है और DJ/VCB ट्रिप होता है तो HMCS-2 के द्वारा खराबी वाली ट्रैक्शन मोटर का पता लगाकर उसको आइसोलेट ही रखें।)',
      '• If still no success: Place HVSI-2, HVMT-2 and HVSL-2 to 0 position and work train with the remaining three traction motors. (यदि फिर भी सफलता नहीं मिलती है तो HVSI-2, HVMT-2 और HVSL-2 को शून्य पोजीशन पर रखकर शेष तीन ट्रैक्शन मोटरों से कार्य करें।)'
    ]
  },
  {
    id: 'CONV-SIV-TRIPPING',
    subSystem: 'CONV_AUX',
    message: 'SIV (स्टैटिक कनवर्टर) ट्रिपिंग व फॉल्ट\nSIV FAULT / TRIPPING (QSIT RELAY OPERATING)\n(स्टैटिक इनवर्टर में आंतरिक दोष या अर्थ फॉल्ट)',
    lamp: 'LSSIT लैम्प जलेगा, LSDJ जलेगा (यदि DJ ट्रिप हो)',
    effect: 'All auxiliary motors stop, 415V 3-phase supply stops, battery charging stops (सभी सहायक मोटरें बंद, 415V 3-फेज सप्लाई बंद, बैटरी चार्जिंग बंद)',
    actions: [
      '1. Go to SIV display panel and check fault code (EL-01 to EL-10). [SIV यूनिट के डिस्प्ले पैनल पर जाकर फॉल्ट कोड (EL-01 से EL-10) देखें।]',
      '2. If fault is Earth Fault, reset QSIT relay. [यदि फॉल्ट अर्थ फॉल्ट (Earth Fault) का है, तो QSIT रिले को रीसेट करें।]',
      '3. Press SIV Reset push button (PB-SIV) for 5 seconds to reset. [SIV रीसेट पुश बटन (PB-SIV या SIV Reset Button) को 5 सेकंड दबाकर रीसेट करें।]',
      '4. Close DJ via BLDJ and wait for LSSIT lamp to extinguish. [BLDJ से DJ क्लोज़ करें और LSSIT लैम्प के बुझने की प्रतीक्षा करें।]',
      '5. If SIV trips repeatedly showing overload of an auxiliary motor (e.g. blower or compressor), isolate that motor using rotary switch (HVRH, HVSMT, HCP). [यदि SIV बार-बार ट्रिप हो रहा हो और फॉल्ट कोड किसी ऑक्सिलरी मोटर का ओवरलोड दर्शा रहा हो, तो संबंधित रोटरी स्विच (HVRH, HVSMT, HCP) से उस मोटर को आइसोलेट करें।]',
      '6. If SIV indicates Internal Converter Fault and does not reset, inform TLC. [यदि SIV आंतरिक इन्वर्टर फॉल्ट (Internal Converter Fault) दिखाए और रीसेट न हो, तो TLC को सूचित करें।]'
    ]
  },
  {
    id: 'CONV-SIV-INPUT-VOLTAGE-OUT-OF-RANGE',
    subSystem: 'CONV_SIV',
    message: 'SI UNIT में लोको पायलट द्वारा ट्रबल शूटिंग (इनपुट वोल्टेज आउट ऑफ रेंज)\nSI UNIT - INPUT VOLTAGE OUT OF RANGE (RED LAMP / लाल लैम्प)\n(इनपुट वोल्टेज आउट ऑफ रेंज होने पर DJ/VCB ट्रिप नहीं होता है केवल SIV बंद होता है परंतु यदि GR नोच पर है तो DJ/VCB भी ट्रिप होगा। यदि DJ/VCB ट्रिप है तो LP पहले DJ/VCB क्लोज करें। यदि DJ/VCB क्लोज नहीं होता है तो ICDJ के लिए ट्रबल शूट करें। यदि DJ/VCB क्लोज होता है और SIV कार्य नहीं करता है तो SIV इंडिकेशन पैनल देखें।)',
    lamp: 'SIV डिस्प्ले पैनल पर इनपुट वोल्टेज आउट ऑफ रेंज {लाल लैम्प / Red Lamp} का संकेत, LSSIT प्रकाशित',
    effect: 'इनपुट वोल्टेज आउट ऑफ रेंज होने पर DJ/VCB ट्रिप नहीं होता है, केवल SIV बंद होता है; परंतु यदि GR नोच पर है तो DJ/VCB भी ट्रिप होगा',
    actions: [
      '• सामान्य नियम (General Principle): इनपुट वोल्टेज आउट ऑफ रेंज होने पर DJ/VCB ट्रिप नहीं होता है केवल SIV बंद होता है परंतु यदि GR नोच पर है तो DJ/VCB भी ट्रिप होगा। यदि DJ/VCB ट्रिप है तो LP पहले DJ/VCB क्लोज करें। यदि DJ/VCB क्लोज नहीं होता है तो ICDJ के लिए ट्रबल शूट करें। यदि DJ/VCB क्लोज होता है और SIV कार्य नहीं करता है तो SIV इंडिकेशन पैनल देखें।',
      '1. डिस्प्ले पैनल पर संकेत: A यदि इनपुट वोल्टेज आउट ऑफ रेंज {लाल लैम्प} का संकेत आता है - LP द्वारा कार्यवाही:',
      '   i) रीसेट बटन दबाइए। पुनः VCB क्लोज करें। UA मीटर, SIV पैनल और ESMON स्पीडोमीटर में OHE वोल्टेज का मान चेक करें। OHE वोल्टेज 16.5 से 31 kV के बीच होना चाहिए। SIV का इनपुट वोल्टेज रेंज {608 V - 1144 V}।',
      '   A} यदि OHE वोल्टेज आउट ऑफ रेंज है तो TPC / TLC से संपर्क करें।',
      '   B} यदि OHE वोल्टेज 16.5 से 31 kV के बीच है तो:',
      '      (i) रीसेट बटन दबाइए और लोको एनर्जाइज करें। सफलता मिलती है तो गाड़ी चलाएं।',
      '      (ii) यदि सफलता नहीं मिलती है तो कुछ सेकंड के लिए बैटरी ऑफ करके ऑन करें {IPMV का COC बंद करने के बाद} और लोको एनर्जाइज करें। सफलता मिलती है तो गाड़ी चलाएं {IPMV का COC खोल दें}।',
      '      (iii) यदि सफलता नहीं मिलती है तो सहायता मांगें।',
      '• नोट: यदि इनपुट वोल्टेज आउट ऑफ रेंज {लाल लैम्प} का संकेत नहीं आता है तो BLVMT देखें।',
      '--------------------------------------------------',
      '• अतिरिक्त जानकारी (Chapter 17, Page 101):',
      '  B} यदि BLVMT ओपन है और SIV नहीं चलता है: a) DJ/VCB क्लोज होना सुनिश्चित करें। b) CCINV फ्यूज चेक करें। यदि मेल्ट है तो बदलें। यदि फिर मेल्ट होता है तो HOBA का उपयोग करें।',
      '  C} यदि BLVMT क्लोज है और SIV नहीं चलता है: a) CCA फ्यूज चेक करें। यदि मेल्ट है तो बदलें (फिर मेल्ट होता है तो HOBA का उपयोग करें)। b) QSVM रिले का एनर्जाइज होना सुनिश्चित करें। यदि QSVM डी-एनर्जाइज है तो उसे वेज करें। (सावधानी: यदि QSVM वेज किया है तो DJ/VCB क्लोज करने से पहले BLVMT क्लोज करें)।'
    ]
  },
  {
    id: 'CONV-SIV-BLVMT-OPEN-SIV-NOT-WORKING',
    subSystem: 'CONV_SIV',
    message: 'यदि BLVMT ओपन है और SIV नहीं चलता है\nIF BLVMT IS OPEN AND SIV DOES NOT WORK\n(y(d BLVMT ai[pn h] ai]r SIV nh)> clti h] / a) DJ/VCB क्लोज होना सुनिश्चित करें / b) CCINV फ्यूज चेक करें, यदि मेल्ट है तो बदलें, यदि फिर मेल्ट होता है तो HOBA का उपयोग करें - WR BRC TSD अध्याय 17 पृष्ठ 101-102)',
    lamp: 'BLVMT ओपन स्थिति, SIV नहीं चलता / LSSIT लैम्प',
    effect: 'BLVMT ओपन होने पर SIV चालू नहीं होता; 3-फेज ऑक्जीलरी मोटरें कार्य नहीं करती हैं',
    actions: [
      'a) DJ/VCB क्लोज होना सुनिश्चित करें। (Ensure DJ/VCB is closed.)',
      'b) CCINV फ्यूज चेक करें। यदि मेल्ट है तो बदलें। यदि फिर मेल्ट होता है तो HOBA का उपयोग करें। (Check CCINV fuse. If melted, replace it. If it melts again, use HOBA.)',
      '• संदर्भ / अतिरिक्त जांच (WR BRC TSD अध्याय 17, पृष्ठ 101/102):',
      '  - यदि BLVMT क्लोज है और SIV नहीं चलता है तो:',
      '    1. CCA फ्यूज चेक करें। यदि मेल्ट है तो बदलें (यदि फिर मेल्ट होता है तो HOBA का उपयोग करें)।',
      '    2. QSVM रिले का एनर्जाइज होना सुनिश्चित करें। यदि QSVM डी-एनर्जाइज है तो उसे वेज करें। (सावधानी: यदि QSVM वेज किया है तो DJ/VCB क्लोज करने से पहले BLVMT क्लोज करें)।'
    ]
  },
  {
    id: 'CONV-SIV-EXTERNAL-FAULT-OVERCURRENT',
    subSystem: 'CONV_SIV',
    message: 'SIV डिस्प्ले पैनल पर EXTERNAL FAULT का लैम्प (LED) प्रकाशित होता है, LSSIT प्रकाशित होता है (एक्सटर्नल फॉल्ट के साथ ओवरकरंट)\nSIV DISPLAY PANEL - EXTERNAL FAULT (LED) GLOWS, LSSIT GLOWS, EXTERNAL FAULT WITH OVERCURRENT\n(SIV (Ds¼l[ p]nl pr EXTERNAL FAULT ki l]Àp (LED) p\\ki(St hi[ti h], LSSIT p\\ki(St hi[ti h], E±sTn<l fiˆÃT k[ siY ai[vrkr>T ki s>k[t aiti h] - WR BRC TSD अध्याय 17 पृष्ठ 102-103)',
    lamp: 'SIV डिस्प्ले पैनल पर EXTERNAL FAULT लैम्प (LED) प्रकाशित, LSSIT प्रकाशित, ओवरकरंट का संकेत (External Fault LED & LSSIT Glows, Overcurrent Indication)',
    effect: 'SIV ट्रिप हो जाता है, 3-फेज ऑक्सिलरी मोटरें बंद हो जाती हैं (SIV trips, 3-phase auxiliary motors stop working)',
    actions: [
      '1. ऑक्सिलरी पावर सर्किट की जांच करें तथा T.K. पैनल पर चेक करें कि सभी इलेक्ट्रोमैग्नेटिक कॉन्टैक्टर्स (Electromagnetic Contactors) पूरी तरह से ओपन हैं। (Check auxiliary power circuit and verify on T.K. panel that all electromagnetic contactors are fully open.)',
      '2. यदि किसी ऑक्सिलरी मोटर में कोई खराबी मिलती है तो उसे संबंधित स्विच द्वारा आइसोलेट करें, रीसेट बटन दबाएं एवं लोको एनर्जाइज करें। (If any defect is found in any auxiliary motor, isolate it by its respective switch, press reset button and energize the locomotive.)',
      '3. यदि कोई खराबी नहीं मिलती है तो (If no defect is found):',
      '   A} रीसेट बटन दबाएं और लोको एनर्जाइज करें। सफलता मिलती है तो गाड़ी चलाएं। (Press reset button and energize locomotive. If successful, work the train.)',
      '   B} यदि सफलता नहीं मिलती है तो कुछ सेकंड के लिए बैटरी ऑफ करके ऑन करें {IPMV का COC बंद करने के बाद} और लोको एनर्जाइज करें। (If unsuccessful, switch OFF battery for a few seconds and then switch ON [after closing IPMV COC], and energize loco.)',
      '      • सफलता मिलती है तो गाड़ी चलाएं {IPMV का COC खोल दें}। (If successful, work the train [open IPMV COC].)',
      '      • यदि सफलता नहीं मिलती है तो सभी BL स्विचों को ओपन करें। सभी ऑक्सिलरी मोटरों को संबंधित स्विचों द्वारा कार्य से अलग करें: (If unsuccessful, open all BL switches. Isolate all auxiliary motors by their respective switches:)',
      '        - HPH, HVSL-1, HVSL-2, HVSI-1, HVSI-2, HVRH, HVMT-1, HVMT-2, HCHBA एवं HRAVT स्विचों को ‘0’ पर रखें। (Place HPH, HVSL-1, HVSL-2, HVSI-1, HVSI-2, HVRH, HVMT-1, HVMT-2, HCHBA and HRAVT switches on \'0\'.)',
      '        - यदि HRAVT स्विच नहीं लगा है तो CCRA-1, CCRA-2, CCVT फ्यूज निकाल दें एवं TFVT के पास यदि MCB लगा है तो उसे मैन्युअली ट्रिप करें। (If HRAVT switch is not fitted, remove CCRA-1, CCRA-2, CCVT fuses, and manually trip MCB near TFVT if provided.)',
      '        - लोको एनर्जाइज करें। (Energize the locomotive.)',
      '4. यदि DJ/VCB कायम रहती है तो एक-एक करके स्विचों को नॉर्मल करें और जिस स्विच को नॉर्मल करने पर उपरोक्त फॉल्ट दोबारा आता है, तो संबंधित उपकरण को आइसोलेट करके सावधानीपूर्वक गाड़ी चलाएं। (If DJ/VCB stays closed, normalize switches one by one. Whichever switch causes the above fault to reappear when normalized, isolate that corresponding equipment and carefully work the train.)',
      '5. यदि DJ/VCB कायम नहीं रहती है तो सहायता मांगें। (If DJ/VCB does not stay closed, ask for assistance / relief loco.)'
    ]
  },
  {
    id: 'CONV-SIV-EXTERNAL-FAULT-EARTH-FAULT',
    subSystem: 'CONV_SIV',
    message: 'SIV डिस्प्ले पैनल पर EXTERNAL FAULT का लैम्प (LED) प्रकाशित होता है, LSSIT प्रकाशित होता है, एक्सटर्नल फॉल्ट के साथ अर्थ फॉल्ट का संकेत आता है\nSIV DISPLAY PANEL - EXTERNAL FAULT (LED) GLOWS, LSSIT GLOWS, EXTERNAL FAULT WITH EARTH FAULT INDICATION\n(SIV (Ds¼l[ p]nl pr EXTERNAL FAULT ki l]Àp (LED) p\\ki(St hi[ti h], E±sTn<l fiˆÃT k[ siY aY<fiˆÃT ki s>k[t aiti h], LSSIT p\\ki(St hi[ti h] - WR BRC TSD अध्याय 17 पृष्ठ 102-103)',
    lamp: 'SIV डिस्प्ले पैनल पर EXTERNAL FAULT लैम्प (LED) प्रकाशित, LSSIT प्रकाशित, एक्सटर्नल फॉल्ट के साथ अर्थ फॉल्ट का संकेत (External Fault LED & LSSIT Glows, Earth Fault Indication)',
    effect: 'SIV ट्रिप हो जाता है, 3-फेज ऑक्सिलरी मोटरें बंद हो जाती हैं (SIV trips, 3-phase auxiliary motors stop working)',
    actions: [
      '1. ऑक्सिलरी पावर सर्किट की जांच करें तथा T.K. पैनल पर चेक करें कि सभी इलेक्ट्रोमैग्नेटिक कॉन्टैक्टर्स (Electromagnetic Contactors) पूरी तरह से ओपन हैं। (Check auxiliary power circuit and verify on T.K. panel that all electromagnetic contactors are fully open.)',
      '2. यदि किसी ऑक्सिलरी मोटर में कोई खराबी मिलती है तो उसे संबंधित स्विच द्वारा आइसोलेट करें, रीसेट बटन दबाएं एवं लोको एनर्जाइज करें। (If any defect is found in any auxiliary motor, isolate it by its respective switch, press reset button and energize the locomotive.)',
      '3. यदि कोई खराबी नहीं मिलती है तो (If no defect is found):',
      '   A} रीसेट बटन दबाएं और लोको एनर्जाइज करें। सफलता मिलती है तो गाड़ी चलाएं। (Press reset button and energize locomotive. If successful, work the train.)',
      '   B} यदि सफलता नहीं मिलती है तो कुछ सेकंड के लिए बैटरी ऑफ करके ऑन करें {IPMV का COC बंद करने के बाद} और लोको एनर्जाइज करें। (If unsuccessful, switch OFF battery for a few seconds and then switch ON [after closing IPMV COC], and energize loco.)',
      '      • सफलता मिलती है - गाड़ी चलाएं {IPMV का COC खोल दें}। (If successful, work the train [open IPMV COC].)',
      '      • यदि सफलता नहीं मिलती है तो सभी BL स्विचों को ओपन करें। सभी ऑक्सिलरी मोटरों को संबंधित स्विचों द्वारा कार्य से अलग करें: (If unsuccessful, open all BL switches. Isolate all auxiliary motors by their respective switches:)',
      '        - HPH, HVSL-1, HVSL-2, HVSI-1, HVSI-2, HVRH, HVMT-1, HVMT-2, HCHBA एवं HRAVT स्विचों को ‘0’ पर रखें। (Place HPH, HVSL-1, HVSL-2, HVSI-1, HVSI-2, HVRH, HVMT-1, HVMT-2, HCHBA and HRAVT switches on \'0\'.)',
      '        - यदि HRAVT स्विच नहीं लगा है तो CCRA-1, CCRA-2, CCVT फ्यूज निकाल दें एवं TFVT के पास यदि MCB लगा है तो उसे मैन्युअली ट्रिप करें। (If HRAVT switch is not fitted, remove CCRA-1, CCRA-2, CCVT fuses, and manually trip MCB near TFVT if provided.)',
      '        - लोको एनर्जाइज करें। (Energize the locomotive.)',
      '4. यदि DJ/VCB कायम नहीं रहती है: TB पैनल पर लगे स्विच ‘HSIV’ को ‘0’ पर रखकर एस आई यूनिट पर दिए गए पुश बटन “अर्थ फॉल्ट बाईपास स्विच” (Earth Fault Bypass Switch) को प्रेस करें तथा लोको एनर्जाइज करें। सेक्शन क्लियर करें व TLC से संपर्क करें। (If DJ/VCB does not stay closed: Place switch "HSIV" fitted on TB panel to "0", press push button "Earth Fault Bypass Switch" provided on SI Unit and energize loco. Clear block section and contact TLC.)',
      '5. यदि DJ/VCB कायम रहती है तो एक-एक करके स्विचों को नॉर्मल करें और जिस स्विच को नॉर्मल करने पर उपरोक्त फॉल्ट दोबारा आता है, तो संबंधित उपकरण को आइसोलेट करके सावधानीपूर्वक गाड़ी चलाएं। (If DJ/VCB stays closed, normalize switches one by one. Whichever switch causes the above fault to recur when normalized, isolate that equipment and work train carefully.)',
      '• नोट:- खराबी वाले उपकरण को आइसोलेट करने पर संबंधित EM Contactor का पूरी तरह से ओपन होना चेक करें। (Note: On isolating the defective equipment, verify that the corresponding EM Contactor is fully open.)'
    ]
  },
  {
    id: 'CONV-SIV-INTERNAL-FAULT-EARTH-FAULT',
    subSystem: 'CONV_SIV',
    message: 'SIV डिस्प्ले पैनल पर INTERNAL FAULT लैम्प (LED) प्रकाशित होता है, इंटरनल अर्थ फॉल्ट संकेत के साथ LSSIT प्रकाशित होता है\nSIV DISPLAY PANEL - INTERNAL FAULT (LED) GLOWS, INTERNAL EARTH FAULT INDICATION WITH LSSIT GLOWS\n(SIV (DApl[ p]nl pr INTERNAL FAULT l]Àp (LED) p\\ki(St hi[ti h], enTn<l aY<fiˆÃT s>k[t k[ siY LSSIT p\\ki(St hi[ti h] - WR BRC TSD अध्याय 17 पृष्ठ 103-104)',
    lamp: 'SIV डिस्प्ले पैनल पर INTERNAL FAULT लैम्प (LED) प्रकाशित, LSSIT प्रकाशित, इंटरनल अर्थ फॉल्ट संकेत (Internal Fault LED & LSSIT Glows, Internal Earth Fault Indication)',
    effect: 'SIV ट्रिप हो जाता है, 3-फेज ऑक्सिलरी मोटरें बंद हो जाती हैं (SIV trips, 3-phase auxiliary motors stop working)',
    actions: [
      '【A) फैन फॉल्ट मैसेज (Fan Fault Message)】:',
      '• SIV पर लगे फैन MCB को रीसेट करें, SIV रीसेट बटन को दबाएं, लोको एनर्जाइज करें तथा गाड़ी चलाएं। (Reset Fan MCB on SIV, press SIV reset button, energize loco and work train.)',
      '• यदि MCB नहीं लगी है तो कुछ सेकंड के लिए बैटरी ऑफ करके ऑन करें {IPMV का COC बंद करने के बाद} और लोको एनर्जाइज करें। (If MCB is not fitted, switch OFF battery for a few seconds and then switch ON [after closing IPMV COC], and energize loco.)',
      '• यदि सफलता नहीं मिलती / पुनः वही दोष आता है तो सहायता मांगें। (If unsuccessful / defect repeats, ask for assistance.)',
      '【B) ओवर टेम्परेचर (Over Temperature Message)】:',
      '• रीसेट बटन दबाएं। 10 मिनट के बाद DJ/VCB क्लोज करें। (Press reset button. Close DJ/VCB after 10 minutes.)',
      '• SIV नॉर्मल चालू हो जाती है तो ब्लॉक सेक्शन साफ करके TLC से संपर्क करें। (If SIV starts normally, clear block section and contact TLC.)',
      '• यदि सफलता नहीं मिलती / पुनः वही दोष आता है तो सहायता मांगें। (If unsuccessful / defect repeats, ask for assistance.)',
      '【C) सिंगल फेजिंग फॉल्ट मैसेज (Single Phasing Fault Message)】:',
      '• बारी-बारी से एक-एक ऑक्सिलरी का लोड कम करके (MCP से शुरू करके) SIV रीसेट बटन को दबाएं तथा लोको एनर्जाइज करने का प्रयत्न करें। (Reduce auxiliary load one by one [starting with MCP], press SIV reset button and attempt to energize the loco.)',
      '【D) अन्य मैसेज / इंटरनल अर्थ फॉल्ट (Other Messages / Internal Earth Fault)】:',
      'a) रीसेट बटन दबाएं और लोको एनर्जाइज करें। सफलता मिलती है तो गाड़ी चलाएं। ((a) Press reset button and energize loco. If successful, work the train.)',
      'b) यदि सफलता नहीं मिलती है तो कुछ सेकंड के लिए बैटरी ऑफ करके ऑन करें {IPMV का COC बंद करने के बाद} और लोको एनर्जाइज करें। सफलता मिलती है तो गाड़ी चलाएं {IPMV COC खोल दें}। ((b) If unsuccessful, switch OFF battery for a few seconds and switch ON [after closing IPMV COC], and energize loco. If successful, work train [open IPMV COC].)',
      'c) यदि सफलता नहीं मिलती है तो सभी BL स्विचों को ओपन करें। सभी ऑक्सिलरी मोटरों को संबंधित स्विचों द्वारा कार्य से अलग करें: ((c) If unsuccessful, open all BL switches. Isolate all auxiliary motors by their respective switches:)',
      '   - HPH, HVSL-1, HVSL-2, HVSI-1, HVSI-2, HVRH, HVMT-1, HVMT-2, HCHBA एवं HRAVT स्विचों को ‘0’ पर रखें। (Place HPH, HVSL-1, HVSL-2, HVSI-1, HVSI-2, HVRH, HVMT-1, HVMT-2, HCHBA and HRAVT switches on \'0\'.)',
      '   - यदि HRAVT स्विच नहीं लगा है तो CCRA-1, CCRA-2, CCVT फ्यूज निकाल दें एवं TFVT के पास यदि MCB लगा है तो उसे मैन्युअली ट्रिप करें। (If HRAVT switch is not fitted, remove CCRA-1, CCRA-2, CCVT fuses, and manually trip MCB near TFVT if provided.)',
      '   - लोको एनर्जाइज करें। (Energize the locomotive.)',
      'd) यदि DJ/VCB कायम रहती है तो एक-एक करके स्विचों को नॉर्मल करें और जिस स्विच को नॉर्मल करने पर उपरोक्त फॉल्ट दोबारा आता है, तो संबंधित उपकरण को आइसोलेट करके सावधानीपूर्वक गाड़ी चलाएं। ((d) If DJ/VCB stays closed, normalize switches one by one. Whichever switch causes the above fault to reappear when normalized, isolate that corresponding equipment and carefully work the train.)',
      'e) यदि DJ/VCB कायम नहीं रहती है तो सहायता मांगें। ((e) If DJ/VCB does not stay closed, ask for assistance / relief loco.)'
    ]
  },
  {
    id: 'CONV-SIV-LSCHBA-GLOWS-WITHOUT-VCB-TRIP',
    subSystem: 'CONV_SIV',
    message: 'बिना VCB ट्रिप हुए LSCHBA प्रकाशित होता है (SIV लोको में बैटरी चार्जर कार्य न करना)\nLSCHBA GLOWS WITHOUT VCB TRIPPING (SIV LOCO BATTERY CHARGER FAILURE)\n((bni VCB (T^p h‰E LSCHBA p\\ki(St hi[ti h] / SIV चार्जर जांच / HBA OFF पोजीशन / VCB ट्रिप होना / 90-110V बैटरी वोल्टेज / TLC सूचना / अनावश्यक लोड व कम्पार्टमेंट लाइट बंद / QSVM रिले चैटरिंग वेज - WR BRC TSD अध्याय 17 पृष्ठ 104)',
    lamp: 'LSCHBA लैम्प लगातार प्रकाशित रहता है (VCB/DJ ट्रिप हुए बिना) (LSCHBA lamp remains glowing without VCB tripping)',
    effect: 'बैटरी चार्ज होना बंद हो जाती है; बैटरी वोल्टेज 90V से नीचे जाने पर लोको ट्रिप हो सकता है',
    actions: [
      '1. HBA को OFF पोजीशन पर रखकर चार्जर का काम चेक करें। यदि VCB ट्रिप होती है तो चार्जर काम नहीं करता है। (Place HBA to OFF position and check charger working. If VCB trips, charger is not working.)',
      '2. यदि किसी कारण/फॉल्ट से चार्जर काम नहीं करता है तो भी एस आई यूनिट (SI Unit) काम करती रहेगी। (Even if charger does not work due to any reason/fault, SI Unit will continue to function normally.)',
      '3. DJ/VCB ट्रिप करें, HBA को OFF तथा ON करके प्रयत्न करें। यदि सफलता मिलती है तो गाड़ी चलाएं। (Trip DJ/VCB, cycle HBA to OFF and ON, and attempt. If successful, work the train.)',
      '4. यदि सफलता नहीं मिलती है, तो बैटरी वोल्टेज चेक करें (90 से 110 वोल्ट होना चाहिए)। (If unsuccessful, check battery voltage [must be 90 to 110 Volts].)',
      '5. यदि बैटरी वोल्टेज 90 वोल्ट से अधिक है और चार्जर भी काम नहीं करता है, तो TLC को सूचना दें और उसके आदेशानुसार गाड़ी चलाएं। (If battery voltage is above 90V and charger also does not work, inform TLC and work train as per TLC instructions.)',
      '6. कम्पार्टमेंट लाइट को स्विच OFF करके तथा अनावश्यक लोड को बैटरी पर ध्यान रखते हुए कम करें। (Switch OFF compartment lights and reduce unnecessary electrical load keeping watch on battery voltage.)',
      '7. QSVM रिले के कभी-कभी चैटर (Chatter) करने की वजह से एस आई यूनिट अपने आप बंद तथा चालू होती है, तो उसे आवश्यकतानुसार वेज करें तथा सावधानीपूर्वक कार्य करें। (If due to occasional chattering of QSVM relay the SI Unit trips and restarts automatically, wedge QSVM as required and work train carefully.)'
    ]
  },
  {
    id: 'CONV-SIV-EARTH-FAULT-BYPASS-PROCEDURE',
    subSystem: 'CONV_SIV',
    message: 'अर्थ फॉल्ट बाईपास करने की विधि (SIV लोको में अर्थ फॉल्ट बाईपास)\nPROCEDURE FOR BYPASSING EARTH FAULT IN SIV LOCOMOTIVES\n(aY< fiÃT biypis krn[ k) (v(F / 45 मिनट के अंदर ब्लॉक सेक्शन साफ करना / 1500 ओम रेजिस्टेंस / 1. SIV रीसेट या HBA Off/On / 2. HSIV स्विच "0" पर / 3. अर्थ फॉल्ट बाईपास पुश बटन दबाएं 45 मिनट टाइमर व लाल लैम्प / 4. DJ-VCB क्लोज / फॉल्ट दूर होने पर HSIV "1" व लॉग बुक दर्ज - WR BRC TSD अध्याय 17 पृष्ठ 103)',
    lamp: 'SIV अर्थ फॉल्ट बाईपास का लाल लैम्प (Red Lamp) प्रकाशित, 45 मिनट का टाइमर सक्रिय',
    effect: 'अर्थ फॉल्ट करंट सीमित करने हेतु सर्किट में 1500 ओम की रेजिस्टेंस सम्मिलित; 45 मिनट में सेक्शन क्लियर करना अनिवार्य',
    actions: [
      '• सामान्य नियम: यदि फॉल्टी सर्किट को ढूंढना एवं बाईपास करना असंभव है तो LP को अर्थ फॉल्ट बाईपास करके सेक्शन साफ करना चाहिए और TLC को सूचित करना चाहिए।',
      '• ⚠️ आवश्यक समय-सीमा: जब अर्थ फॉल्ट को बाईपास किया जाता है तो 45 मिनट के अंदर सेक्शन साफ कर लेना चाहिए, क्योंकि इस दौरान एक 1500 ओम (1500 Ω) की रेजिस्टेंस सर्किट में आती है।',
      '【अर्थ फॉल्ट बाईपास करने की विधि (Step-by-Step Procedure)】:',
      '1. SIV पर SIV रीसेट बटन या HBA Off/On करके रीसेट करें। (Reset SIV by pressing SIV reset button or by cycling HBA Off/On.)',
      '2. HSIV स्विच को "0" पर करें {इससे अर्थ फॉल्ट करंट को कम करने के लिए 1500 ओम का रेजिस्टेंस सर्किट में आ जाएगा}। (Place HSIV switch to "0" [this inserts a 1500 Ohm resistance into the circuit to limit earth fault current].)',
      '3. अर्थ फॉल्ट बाईपास बटन को दबाएं {इससे 45 मिनट का टाइमर काम करेगा और अर्थ फॉल्ट बाईपास का लाल लैम्प जलने लगेगा}। (Press Earth Fault Bypass button [this starts a 45-minute timer and the red Earth Fault Bypass lamp illuminates].)',
      '4. DJ / VCB क्लोज करें और 45 मिनट के अंदर सेक्शन क्लियर करें। (Close DJ / VCB and clear section within 45 minutes.)',
      '• ⚠️ महत्वपूर्ण नोट (Post-Rectification Note): फॉल्ट दूर करने के बाद "HSIV" स्विच को पुनः "1" पर कर दें और लोको पायलट / मेंटेनेंस स्टाफ द्वारा लॉग बुक में दर्ज किया जाए। (After fault is cleared, restore HSIV switch to "1" and record entry in loco log book.)'
    ]
  },
  {
    id: 'CONV-MPCS-MAIN-UNIT-NOT-WORKING',
    subSystem: 'CONV_MPCS',
    message: 'MPCS लोको में मेन यूनिट कार्य नहीं करती है\nMPCS MAIN UNIT DOES NOT WORK\n(MPCS लोको में लोको पायलट द्वारा ट्रबल शूटिंग / m[n y‰(nT kiy< nh)> krti h] / मेन यूनिट कार्य न करना / सभी पायलट लैम्प बुझे रहना / डिस्प्ले यूनिट पर कोई मैसेज न आना / लोको इनर्जाइज न होना / 1. बैटरी वोल्टेज 0V व MCPA फेल तो एडिशनल CCBA बदली व HOBA OFF / 2. बैटरी 90V+ तो CCBA, CCPT, CCCPU फ्यूज बदली व HOBA OFF / 3. IPMV COC क्लोज कर HBA OFF, 3 मिनट इंतजार / 4. HOBA OFF / 5. TLC संपर्क - WR BRC TSD अध्याय 18)',
    lamp: 'सभी पायलट लैम्प बुझे रहेंगे, डिस्प्ले यूनिट पर कोई मैसेज नहीं आएगा, लोको इनर्जाइज नहीं होगा (All pilot lamps extinguish, no display message, loco does not energize)',
    effect: 'MPCS मेन यूनिट बंद रहने से लोको इनर्जाइज नहीं हो सकता, DJ/VCB क्लोज नहीं होगा तथा कोई ऑक्सिलरी चालू नहीं होगी',
    actions: [
      '• MPCS लोको सामान्य नियम: MPCS लोको में कोई फॉल्ट आने पर डिस्प्ले यूनिट पर फॉल्ट मैसेज दिखाई देता है और बजर बजता है। फॉल्ट मैसेज नोट कर TSD अनुसार ट्रबलशूट करें। TSD के बाद “Ack” बटन दबाएं जिससे मैसेज CLEAR होकर मेमोरी में रिकॉर्ड हो जाएगा।',
      '【मेन यूनिट कार्य नहीं करती है - LP द्वारा की जाने वाली कार्यवाही (Action to Take)】:',
      '1. यदि बैटरी वोल्टेज "0" वोल्ट और MCPA भी कार्य नहीं करता है, तो एडिशनल CCBA (Add. CCBA) एक बार बदली करें। यदि फिर भी पिघल जाता है, तो HOBA को OFF पोजीशन पर रखें और प्रयत्न करें। (If battery voltage is 0V and MCPA does not work, replace Add. CCBA once. If it melts again, place HOBA to OFF and attempt.)',
      '2. यदि बैटरी वोल्टेज "90" वोल्ट से अधिक है, तो CCBA, CCPT और CCCPU (यदि दिया है) फ्यूज चेक करें; यदि पिघल गया है तो फ्यूज बदली करें। यदि फिर भी पिघल जाता है, तो HOBA को OFF पोजीशन पर रखें और फ्यूज बदली करें। (If battery voltage is above 90V, check CCBA, CCPT and CCCPU [if provided]; if melted, replace fuse. If it melts again, place HOBA to OFF and replace fuse.)',
      '3. यदि सफलता नहीं मिलती है, तो IPMV COC क्लोज करके HBA को OFF पोजीशन पर रखें, 3 मिनट इंतजार करें और फिर प्रयत्न करें। (If unsuccessful, close IPMV COC, place HBA to OFF position, wait 3 minutes, and try again.)',
      '4. HOBA को OFF पोजीशन पर रखकर प्रयत्न करें। (Place HOBA in OFF position and attempt to energize.)',
      '5. यदि फिर भी लोको इनर्जाइज नहीं होता है, तो TLC से संपर्क करें। (If loco still does not energize, demand assistance / contact TLC.)'
    ]
  },
  {
    id: 'CONV-MPCS-ICDJ-DJ-VCB-NOT-CLOSING',
    subSystem: 'CONV_MPCS',
    message: 'DJ/VCB क्लोज नहीं होता / ICDJ\nDJ/VCB DOES NOT CLOSE / ICDJ\n(DJ/VCB ±li[j nh)> hi[ti /ICDJ / DJ/VCB क्लोज नहीं होना / 17 सूत्रीय निवारण कार्यवाही / MPCS लोको में लोको पायलट द्वारा ट्रबल शूटिंग / 1. चेक करें, बैटरी वोल्टेज 90 वोल्ट से अधिक है / 2. रिले टारगेट चेक करें / 3. CCBA CCPT CCCPU फ्यूज बदली व HOBA OFF / 4. MR तथा RS प्रेशर 8 kg/cm² / 5. C118 C105 C106 C107 ओपन / 6. GR 0 व LSGR / 7. BLDJ BP1DJ 2-3 बार / 8. ZPT पोजीशन बदलें / 9. BP2DJ Add BLRDJ 2-3 बार / 10. HQOA "0" / 11. HQOP 1-2 OFF / 12. पिछली कैब / 13. आर्नो C118 क्लोज जांच / 14. BP MR RS अधिकतम प्रेशर / 15. IPMV COC क्लोज HBA OFF 3 मिनट / 16. HOBA OFF / 17. TLC संपर्क व लॉग बुक दर्ज - WR BRC TSD अध्याय 18 पृष्ठ 105-106)',
    lamp: 'LSDJ लैम्प प्रकाशित रहता है, DJ/VCB क्लोज नहीं होता (LSDJ glows, DJ/VCB does not close / ICDJ in MPCS)',
    effect: 'DJ/VCB क्लोज न होने से मुख्य ट्रांसफार्मर एनर्जाइज नहीं होगा, ट्रैक्शन व ऑक्सिलरी कार्य नहीं करेंगी',
    actions: [
      '• MPCS लोको सामान्य नियम: MPCS लोको में कोई फॉल्ट आने पर डिस्प्ले यूनिट पर फॉल्ट मैसेज दिखाई देता है और साथ में बजर सुनाई देता है। मैसेज नोट कर TSD अनुसार ट्रबलशूट करें व अंत में “Ack” बटन दबाएं।',
      '【DJ/VCB क्लोज नहीं होता / ICDJ - लोको पायलट द्वारा 17-सूत्रीय निवारण कार्यवाही】:',
      '1. चेक करें कि बैटरी वोल्टेज 90 वोल्ट से अधिक है। (Check that battery voltage is above 90 Volts.)',
      '2. रिले टारगेट (Relay Targets) चेक करें, यदि कोई टारगेट ड्रॉप है, तो TSD के अनुसार ट्रबलशूट करें। (Check relay targets; if dropped, troubleshoot as per TSD.)',
      '3. CCBA, CCPT और CCCPU फ्यूज (यदि दिया है) चेक करें; यदि कोई पिघल गया है तो फ्यूज बदली करें। यदि फिर भी पिघल जाता है, तो HOBA को OFF पोजीशन पर रखें और फ्यूज बदली करें। (Check CCBA, CCPT, CCCPU; replace melted fuse. If it melts again, place HOBA to OFF and replace fuse.)',
      '4. MR तथा RS प्रेशर चेक करें, 8 kg/cm² से कम नहीं होना चाहिए। (Check MR & RS pressure; must not be less than 8 kg/cm².)',
      '5. DJ/VCB क्लोज करने से पहले चेक करें कि C118, C105, C106 तथा C107 पूरी तरह से ओपन (Open) हैं। (Ensure C118, C105, C106, C107 are fully open before closing DJ/VCB.)',
      '6. GR को मैनुअली ऑपरेट करें और "0" पर लाएं; LSGR प्रकाशित होना चेक करें। (Operate GR manually to "0"; verify LSGR illuminates.)',
      '7. BLDJ और BP1DJ को 2-3 बार ऑपरेट करें। (Operate BLDJ and BP1DJ 2-3 times.)',
      '8. ZPT की पोजीशन बदलकर प्रयत्न करें। (Change ZPT position [try other pantograph] and attempt.)',
      '9. BP2DJ और Add BLRDJ को 2-3 बार दबाएं और DJ/VCB क्लोज करने का प्रयत्न करें। (Press BP2DJ and Add BLRDJ 2-3 times and attempt to close DJ/VCB.)',
      '10. HQOA को "0" पर रखकर प्रयत्न करें। (Place HQOA to "0" and attempt.)',
      '11. HQOP 1 & 2 को "OFF" पोजीशन पर रखकर प्रयत्न करें। (Place HQOP 1 & 2 to "OFF" position and attempt.)',
      '12. पिछली कैब से प्रयत्न करें। (Attempt from rear cab.)',
      '13. आर्नो (ARNO) वाले लोको में DJ/VCB क्लोज करते समय C118 का क्लोज होना चेक करें। (In ARNO locos, check C118 closes while closing DJ/VCB.)',
      '14. BP, MR तथा RS में अधिकतम प्रेशर बनाएं और प्रयत्न करें। (Build maximum pressure in BP, MR, and RS and attempt.)',
      '15. IPMV COC क्लोज करके, HBA को OFF पोजीशन पर रखें, 3 मिनट इंतजार करें और फिर से DJ/VCB क्लोज करने का प्रयत्न करें। (Close IPMV COC, place HBA to OFF, wait 3 minutes for reset, and attempt closing DJ/VCB. Reopen IPMV COC after loco energizes.)',
      '16. यदि सफलता नहीं मिलती है तो HOBA को OFF पोजीशन पर रखकर प्रयत्न करें। (If unsuccessful, place HOBA to OFF position and attempt.)',
      '17. यदि फिर भी सफलता नहीं मिलती है तो TLC से संपर्क करें और लॉग बुक में दर्ज करें। (If still unsuccessful, demand assistance from TLC and record in log book.)'
    ]
  },
  {
    id: 'CONV-MPCS-DJ-TRIP-ON-6TH-NOTCH-15-SEC',
    subSystem: 'CONV_MPCS',
    message: '6 नोच लेने पर 15 सेकंड के अंदर ही DJ/VCB ट्रिप होता है\n6TH NOTCH TRIPS DJ/VCB WITHIN 15 SECONDS\n(6 ni[c l[n[ pr 15 sec k[ a>dr h) DJ/VCB (T^p hi[ti h] / MPCS लोको में 6 नोच लेने पर 15 सेकंड के अंदर DJ/VCB ट्रिप होता है / 1. डिस्प्ले यूनिट मैसेज अनुसार ट्रबलशूट / 2. डिस्प्ले यूनिट कार्य न करने पर पायलट लैम्प ध्यान रख गाड़ी चलाना / 3. C105/C106/C107 वायर कनेक्शन जांच / 4. HVMT 1/2 को 3 पोजीशन पर रखना / 5. HOBA OFF / 6. IPMV COC क्लोज कर HBA OFF 3 मिनट रीसेट - WR BRC TSD अध्याय 18 पृष्ठ 106)',
    lamp: 'LSDJ लैम्प प्रकाशित होता है, 6 नोच लेते ही 15 सेकंड के अंदर DJ/VCB ट्रिप हो जाता है',
    effect: 'गाड़ी 6 नोच से आगे नहीं बढ़ाई जा सकती, ट्रैक्शन पावर कट हो जाती है',
    actions: [
      '• MPCS लोको सामान्य नियम: MPCS लोको में कोई खराबी आने पर डिस्प्ले यूनिट पर फॉल्ट मैसेज दिखाई देता है और साथ में बजर सुनाई देता है। TSD अनुसार ट्रबलशूट करें व अंत में “Ack” बटन दबाएं।',
      '【6 नोच लेने पर 15 सेकंड के अंदर ही DJ/VCB ट्रिप होता है - लोको पायलट निवारण कार्यवाही】:',
      '1. डिस्प्ले यूनिट पर दर्शाए गए मैसेज के अनुसार ट्रबलशूट करें। (Troubleshoot according to message displayed on Display Unit.)',
      '2. यदि डिस्प्ले यूनिट कार्य नहीं करती है तो पायलट लैम्प पर ध्यान रखते हुए गाड़ी चलाएं। (If Display Unit is not working, work train keeping careful watch on pilot lamps.)',
      '3. C105/C106/C107 के वायर कनेक्शन चेक करें (संबंधित सावधानी रखते हुए) ट्रबलशूट करें। (Check wire connections of C105/C106/C107 [taking relevant precautions] and troubleshoot.)',
      '4. HVMT 1/2 को "3" पोजीशन पर रखकर प्रयत्न करें। (Try by keeping HVMT 1/2 on "3" position.)',
      '5. यदि सफलता नहीं मिलती है तो HOBA को "OFF" पर रखकर प्रयत्न करें। (If unsuccessful, try by keeping HOBA on "OFF" position.)',
      '6. IPMV COC क्लोज करके HBA को OFF पर रखें, 3 मिनट इंतजार करें, फिर HBA ON करके DJ/VCB क्लोज करने का प्रयत्न करें। (Close IPMV COC, keep HBA on OFF, wait for 3 minutes, then turn HBA ON and attempt to close DJ/VCB.)'
    ]
  },
  {
    id: 'CONV-MPCS-DJ-TRIPPED-VIA-C107-C106-C105-FEEDBACK-FAIL',
    subSystem: 'CONV_MPCS',
    message: 'DJ tripped via C-107/C-106/C-105 Feedback fail, Inform TLC\n(MPCS लोको में C-107/C-106/C-105 फीडबैक फेल के कारण DJ ट्रिप / IPMV COC क्लोज कर बैटरी ऑफ कर C-107/C-106/C-105 का ओपन होना चेक करना व C-107 को 1-2 बार हाथ से ऑपरेट कर DJ-VCB क्लोज करना / सफलता न मिलने पर TLC को सूचित करना - WR BRC TSD अध्याय 18)',
    lamp: 'MPCS डिस्प्ले स्क्रीन पर "DJ tripped via C-107/C-106/C-105 Feedback fail Inform TLC" संदेश, LSDJ लैम्प प्रकाशित, DJ ट्रिप',
    effect: 'ब्लोअर कॉन्टैक्टर फीडबैक सिग्नल न मिलने से MPCS द्वारा DJ/VCB ट्रिप करा दिया जाता है, ट्रैक्शन व ऑक्सिलरी बंद हो जाती हैं',
    actions: [
      '• MPCS डिस्प्ले संदेश: "DJ tripped via C-107/C-106/C-105 Feedback fail Inform TLC"',
      '【LP द्वारा की जाने वाली कार्यवाही (Step-by-Step Action)】:',
      '1. IPMV COC को क्लोज (बंद) करें तथा बैटरी ऑफ (HBA OFF) करें। (Close IPMV COC and turn battery OFF [HBA OFF].)',
      '2. C-107, C-106 तथा C-105 कॉन्टैक्टर्स का पूरी तरह से ओपन (Open) होना चेक करें। (Check that contactors C-107, C-106, and C-105 are completely open.)',
      '3. कॉन्टैक्टर C-107 को एक-दो बार हाथ से ऑपरेट करें (थपथपाएं/मैनुअली फ्री करें)। (Operate contactor C-107 manually by hand 1-2 times to free any stuck interlock.)',
      '4. बैटरी ऑन (HBA ON) करें और DJ/VCB क्लोज करने का प्रयत्न करें। (Turn battery ON and attempt closing DJ/VCB. Reopen IPMV COC after loco energizes.)',
      '5. सफलता न मिलने पर TLC को सूचित करें व सहायता मांगें। (If unsuccessful, inform TLC / demand assistance and record in log book.)'
    ]
  },
  {
    id: 'CONV-MPCS-ICE-RELAY-BYPASS-SOFT-WEDGE',
    subSystem: 'CONV_MPCS',
    message: 'MPCS वर्जन 3.0 में रिले को बाईपास (सॉफ्ट वेज) करना [ICE Make MPCS]\nRELAY BYPASS / SOFT WEDGING IN MPCS VERSION 3.0 (ICE MAKE)\n(Q118, Q50, QCON, QCVAR रिले को MPCS डिस्प्ले द्वारा वेज / बाईपास करने की विधि / VCB ओपन कर soft keys 0,7,8,9 को प्रेस करना / कन्फर्म हेतु 1 व कैंसिल हेतु 2 / HBA ऑफ करने पर वेजिंग कमांड समाप्त)',
    lamp: 'MPCS डिस्प्ले स्क्रीन पर रिले वेजिंग मेन्यू तथा स्टेटस (Relay Soft Wedging Menu on MPCS Screen)',
    effect: 'दोषयुक्त रिले (Q118 / Q50 / QCON / QCVAR) सॉफ्टवेयर द्वारा सुरक्षित रूप से बाईपास हो जाती है, जिससे लोको संचालन सुचारू रखा जा सकता है',
    actions: [
      '【लागू रिले (Relays Covered for Soft Wedging)】: Q118, Q50, QCON, QCVAR',
      '1. VCB को ओपन (Open) करें। ((Open VCB before initiating soft wedging.))',
      '2. MPCS डिस्प्ले यूनिट पर सॉफ्ट कीज़ (Soft Keys) 0, 7, 8, 9 को प्रेस करें। ((Press soft keys 0, 7, 8, 9 on MPCS display to open relay bypass screen.))',
      '3. रिले को वेज करने की पुष्टि (कन्फर्म) करने हेतु Soft Key ‘1’ दबाएं। ((Press soft key \'1\' to confirm relay wedging.))',
      '4. वेजिंग कैंसिल (रद्द) करने हेतु Soft Key ‘2’ दबाएं। ((Press soft key \'2\' to cancel relay wedging.))',
      '5. वेजिंग रीसेट नियम: HBA ऑफ करने पर रिले वेजिंग का कमांड समाप्त (Clear/Reset) हो जाता है। ((On switching HBA to OFF, the relay soft wedging command is terminated automatically.))',
      '6. TLC को सूचित करें तथा रिले वेज करने का विवरण लोको लॉग बुक में दर्ज करें। ((Inform TLC and record details of wedged relay in loco log book.))'
    ]
  },
  {
    id: 'CONV-MPCS-MEDHA-RELAY-BYPASS-SOFT-WEDGE',
    subSystem: 'CONV_MPCS',
    message: 'MEDHA Make MPCS में रिले को वेज / बाईपास करना [Medha MPCS]\nRELAY BYPASS / SOFT WEDGING IN MEDHA MAKE MPCS\n(MEDHA MPCS में रिले वेज करने की विधि / VCB ओपन कर soft keys 0, 7, 8, 9 प्रेस करना / सॉफ्ट की 1 - Instantaneous bypass / सॉफ्ट की 2 - Permanent bypass / सॉफ्ट की 3 - Cancel bypass / Temporary bypass VCB ओपन करने पर समाप्त / Permanent bypass HBA ऑफ करने पर समाप्त)',
    lamp: 'MEDHA MPCS डिस्प्ले स्क्रीन पर रिले बाईपास विकल्प (Relay Bypass Options on Medha MPCS Screen)',
    effect: 'MEDHA MPCS सिस्टम में दोषयुक्त रिले सॉफ्टवेयर द्वारा सुरक्षित तात्कालिक (Instantaneous) अथवा स्थायी (Permanent) रूप से बाईपास हो जाती है',
    actions: [
      '1. VCB को ओपन (Open) करें। ((Open VCB before initiating relay soft wedging on Medha MPCS.))',
      '2. MPCS डिस्प्ले यूनिट पर सॉफ्ट कीज़ (Soft Keys) 0, 7, 8, 9 को प्रेस करें। ((Press soft keys 0, 7, 8, 9 on MPCS display to open relay bypass options.))',
      '3. डिस्प्ले पर प्रदर्शित विकल्पों के अनुसार कीज़ दबाएं:',
      '   • Soft Key ‘1’ दबाएं: तात्कालिक बाईपास हेतु (For instantaneous / temporary bypass).',
      '   • Soft Key ‘2’ दबाएं: स्थायी बाईपास हेतु (For permanent bypass).',
      '   • Soft Key ‘3’ दबाएं: बाईपास कैंसिल करने हेतु (For cancel bypass).',
      '4. बाईपास समाप्ति एवं रीसेट नियम:',
      '   • Temporary (Instantaneous) Bypass: VCB ओपन करने पर स्वतः समाप्त हो जाता है। ((Temporary bypass is terminated automatically upon opening VCB.))',
      '   • Permanent Bypass: HBA ऑफ करने पर समाप्त होता है। ((Permanent bypass is cleared when battery HBA is turned OFF.))',
      '5. TLC को सूचित करें तथा रिले बाईपास का प्रकार लोको पायलट लॉग बुक में दर्ज करें। ((Inform TLC and record details in loco log book.))'
    ]
  },
  {
    id: 'CONV-MPCS-BPMPR-RESET',
    subSystem: 'CONV_MPCS',
    message: 'BPMPR द्वारा MPCS को रीसेट करना [मेन यूनिट TR पैनल]\nRESETTING MPCS VIA BPMPR PUSH BUTTON (ON TR PANEL MAIN UNIT)\n(BPMPR पुश बटन द्वारा MPCS रीसेट / एक से अधिक सब-सिस्टम आइसोलेट होने पर / DJ-VCB ओपन व पैंटो लोवर / BL चाबी बाहर निकालें / BPMPR को 10 सेकंड तक दबा कर रखें / लोको इनर्जाइज करें व सेक्शन क्लियर कर सहायता मांगें)',
    lamp: 'MPCS डिस्प्ले पर एक से अधिक सब-सिस्टम आइसोलेटेड संदेश (More than one sub-system isolated message on MPCS display)',
    effect: 'एक से अधिक सब-सिस्टम आइसोलेट होने पर ट्रैक्शन अथवा लोको संचालन बाधित हो जाता है; BPMPR द्वारा MPCS को रीसेट कर लोको पुनः सामान्य किया जाता है',
    actions: [
      '【अवस्थिति एवं उद्देश्य (Location & Purpose)】: MPCS की मेन यूनिट TR पैनल पर लगी है। MPCS को रीसेट करने हेतु एक पुश बटन "BPMPR" मेन यूनिट पर लगा है। एक से अधिक सब-सिस्टम (Sub-system) आइसोलेट होने पर MPCS को निम्न तरीके से रीसेट करते हैं:',
      '1. DJ/VCB ओपन और पैंटो लोवर करें। ((Open DJ/VCB and lower pantograph.))',
      '2. BL चाबी को बाहर निकालें। ((Remove BL key / switch off control supply.))',
      '3. BPMPR को 10 सेकंड (10 sec) तक दबा कर रखें। ((Press and hold BPMPR push button on TR panel MPCS main unit for 10 seconds.))',
      '4. लोको इनर्जाइज करें। ((Re-energize locomotive: insert BL key, raise panto, close DJ/VCB.))',
      '5. सेक्शन क्लियर करें और सहायता मांगें। ((Clear section and demand assistance / inform TLC and record in loco log book.))',
      '6. वैकल्पिक रीबूट (Reboot विधि): यदि BPMPR से रीसेट न हो, तो IPMV कॉक बंद करें, HBA को OFF पोजीशन पर रखें, 3 मिनट इंतजार करें और फिर HBA ON करके DJ/VCB क्लोज करने का प्रयत्न करें। ((Alternative Reboot Method: If not reset via BPMPR, close IPMV COC, keep HBA OFF for 3 minutes, then turn HBA ON and attempt to close DJ/VCB.))'
    ]
  },
  {
    id: 'CONV-PANTO-NOT-RAISING',
    subSystem: 'CONV_DJ',
    message: 'पैंटो नहीं उठता है\nPANTOGRAPH DOES NOT RAISE\n(पैंटो न उठना / दूसरा पैंटो उपयोग / BPEMS रीसेट / HLS-ZLS ऑन / RS प्रेशर CPA / बैटरी वोल्टेज / CCBA-CCPT / VEPT कॉक व टर्मिनल / VEPT हाथ से ऑपरेट / पीछे वाली कैब / VEPT वेज व TLC संपर्क)',
    lamp: 'पैंटो ऊपर नहीं उठता, OHE संपर्क नहीं बनता (Pantograph does not raise)',
    effect: 'लोको इनर्जाइज नहीं हो सकता, DJ/VCB क्लोज नहीं होगा',
    actions: [
      'a) दूसरे पैंटो का उपयोग करें।',
      'b) यदि BPEMS स्विच दबा है तो उसे रीसेट करें। (अध्याय-1, 1.5 II G, पृष्ठ.10)',
      'c) यदि लोको में HLS / ZLS स्विच दिया है तो स्विच का ऑन होना सुनिश्चित करें।',
      'd) RS प्रेशर चैक करें, यदि कम है तो CPA द्वारा बनाएं।',
      'e) बैटरी वोल्टेज चैक करें।',
      'f) CCBA और CCPT चैक करें (यदि आवश्यक हो तो HOBA का उपयोग करें) (अध्याय 7, क्र. 1-12, पृष्ठ-51-53)',
      'g) VEPT आइसोलेटिंग कॉक खुले हैं और VEPT टर्मिनल बराबर है, सुनिश्चित करें।',
      'h) VEPT को हाथ से ऑपरेट करें।',
      'i) पीछे वाली कैब से पैंटो उठाने का प्रयत्न करें।',
      'j) VEPT वेज करें, सैक्शन क्लीयर करें और TLC से सम्पर्क करें।'
    ]
  },
  {
    id: 'CONV-BP-PRESSURE-NOT-BUILDING',
    subSystem: 'CONV_PNEUMATIC',
    message: 'BP प्रेशर नहीं बनता है (केवल लोको)\nBP PRESSURE DOES NOT BUILD (LOCO ONLY)\n(BP प्रेशर नहीं बनना - केवल लोको / A-9 रिलीज व MR सामान्य / BLCPD क्लोज / A-9 दोनों COC कार्यरत कैब में खुले व पीछे बंद / BP चार्जिंग कॉक / MU2B लीड व 2-3 बार ऑपरेट / MR-4 COC खुला / दोनों सिरों पर एंगल कॉक बंद व IP-RS वाल्व लीकेज जांच / IP COC बंद / BP 0 रहने पर एडिशनल कॉक जांच)',
    lamp: 'BP प्रेशर गेज पर प्रेशर 0 kg/cm² रहेगा या 5.0 kg/cm² नहीं बढ़ेगा (BP gauge stays 0 kg/cm² or does not build to 5.0)',
    effect: 'लोको में ब्रेक पाइप (BP) प्रेशर नहीं बनेगा; गाड़ी में ब्रेक रिलीज नहीं हो सकेंगे व ब्रेक बाइंडिंग रहेगी',
    actions: [
      'a) A-9 हैंडल दोनों कैब में “रिलीज” पोजीशन पर और MR प्रेशर सामान्य है, सुनिश्चित करें।',
      'b) BLCPD क्लोज करके प्रयत्न करें।',
      'c) A-9 के दोनों कट आउट कॉक कार्यरत (Working) कैब में खुले और पीछे वाली कैब में बंद हैं, सुनिश्चित करें।',
      'd) BP चार्जिंग कॉक खुला है, सुनिश्चित करें।',
      'e) MU2B वाल्व “लीड” पोजीशन पर है, सुनिश्चित करें। दो तीन बार ऑपरेट करें।',
      'f) MR-4 कट आउट कॉक खुला है, सुनिश्चित करें।',
      'g) दोनों सिरों पर एंगल कॉक बंद हैं, सुनिश्चित करें। IP वाल्व और RS वाल्व में लीकेज नहीं है, सुनिश्चित करें।',
      'h) यदि IP वाल्व में लीकेज है तो उसका कट आउट कॉक बंद करें।',
      'i) यदि BP प्रेशर 0 kg/cm² ही रहता है तो चेक करें कि पीछे कैब के नीचे अथवा कैब में एडिशनल कॉक बंद तो नहीं है।'
    ]
  },
  {
    id: 'CONV-BP-PRESSURE-SURGE-BRAKE-BINDING',
    subSystem: 'CONV_PNEUMATIC',
    message: 'BP प्रेशर बढ़कर 5 kg/cm² से अधिक हो जाता है और फिर से घटकर 5 kg/cm² तक आ जाता है और सारी गाड़ी में ब्रेक बंधती है\nBP PRESSURE RISES ABOVE 5 kg/cm² AND REDUCES BACK TO 5 kg/cm² CAUSING TRAIN BRAKE BINDING\n(BP प्रेशर 5 kg/cm² से अधिक बढ़कर पुनः 5 पर घटना व सारी गाड़ी में ब्रेक बंधना / A-9 रेगुलेटर द्वारा BP बढ़ाना / A-9 इमरजेंसी व BP 0 / BP-FP एंगल कॉक बंद / पूरी गाड़ी ब्रेक रिलीज / A-9 रिलीज व 5 kg/cm² सेट / डिस्ट्रीब्यूटर वाल्व रिलीज वाल्व / एंगल कॉक खोलना / गार्ड वान 4.8 से 5 kg/cm² व कन्टीन्युइटी टेस्ट)',
    lamp: 'BP प्रेशर गेज 5.0 से अधिक उछलकर पुनः 5.0 kg/cm² पर आता है, गाड़ी में ब्रेक बाइंडिंग (BP surges above 5 kg/cm² then drops, train brakes applied)',
    effect: 'ओवरचार्जिंग के कारण पूरी गाड़ी के डिस्ट्रीब्यूटर वाल्व (DV) एक्टिवेट होकर ब्रेक बाइंडिंग करेंगे; गाड़ी रुक जाएगी',
    actions: [
      'a) A-9 वाल्व के regulator द्वारा समंजित (adjust) करके BP प्रेशर बढ़ाएं ताकि लोको एवं गाड़ी में ब्रेक रिलीज हो जाएं। सैक्शन क्लीयर करके (यदि लेवल सैक्शन है तो) निम्नलिखित कार्यवाही करें - A-9 को “इमरजेंसी” पोजीशन पर लाएं। BP प्रेशर के “0” पर आने तक रुकें। लोको और गाड़ी के बीच BP और FP के एंगल कॉक बंद कर दें।',
      'b) पूरी गाड़ी के ब्रेक रिलीज करें। A-9 को “रिलीज” पोजीशन पर रखें और BP प्रेशर को A-9 वाल्व के regulator द्वारा 5 kg/cm² पर समंजित (adjust) करें। लोको ब्रेक रिलीज करने के लिये लोको के डिस्ट्रीब्यूटर वाल्व का रिलीज वाल्व खींचें। एंगल कॉक खोल दें। जब गार्ड वान में BP प्रेशर बढ़कर 4.8 kg/cm² से 5 kg/cm² हो जाये तो कन्टीन्युइटी टेस्ट करने के बाद गाड़ी चलाएं।'
    ]
  },
  {
    id: 'CONV-BP-NOT-RISING-AFTER-ATTACHING-LOAD',
    subSystem: 'CONV_PNEUMATIC',
    message: 'एयर ब्रेक लोड पर अटैच करने के बाद BP प्रेशर 5 kg/cm² तक नहीं बढ़ता है और MR प्रेशर भी कम होता है\nBP PRESSURE DOES NOT RISE TO 5 kg/cm² AND MR PRESSURE DROPS AFTER ATTACHING AIR BRAKE LOAD\n(एयर ब्रेक लोड अटैच करने के बाद BP 5 kg/cm² न बढ़ना व MR कम होना / तीनों कम्प्रेशर चलाना / BLCP ओपन व BLCPD क्लोज / लोको-लोड के बीच BP व FP एंगल कॉक बंद कर जांच: i) MR 9.5 बनने पर लोड में खराबी व गाड़ी में लीकेज जांच / ii) MR न बनने पर लोको लीकेज जांच व BP जांच: A) BP बढ़ने पर लोड खराबी, वैगन एंगल कॉक व होस पाइप जांच / B) BP न बढ़ने पर लोको खराबी, पृष्ठ 68-69 फेलियर 3 व 4)',
    lamp: 'BP प्रेशर गेज 5.0 kg/cm² तक नहीं पहुंचता तथा MR प्रेशर में गिरावट (BP fails to reach 5 kg/cm², MR drops)',
    effect: 'एयर ब्रेक ट्रेन में ब्रेक रिलीज नहीं होंगे; भारी न्यूमैटिक लीकेज या कंप्रेसर क्षमता से अधिक एयर खपत',
    actions: [
      'a) यदि MR प्रेशर कम है तो तीनों कम्प्रेशर चलाएं।',
      'b) BLCP ओपन करें और BLCPD क्लोज करें।',
      'c) यदि फिर भी MR प्रेशर नहीं बनता है तो लोको और लोड के बीच BP और FP एंगल कॉक बंद करें:',
      '   i) यदि MR प्रेशर 9.5 kg/cm² तक बन जाता है तो लोड में खराबी है। गाड़ी में लीकेज चेक करें।',
      '   ii) यदि MR प्रेशर नहीं बनता है तो लोको में लीकेज चेक करें। BP प्रेशर चेक करें:',
      '      • यदि BP प्रेशर बढ़ता है तो लोड में खराबी है। वैगनों के बीच सभी एंगल कॉक खुले हैं और होस पाइप बराबर लगे हैं और BP में लीकेज नहीं है, सुनिश्चित करें। लोड की खराबी दूर कर देने के बाद FP और BP के एंगल कॉक खोल दें।',
      '      • यदि BP प्रेशर नहीं बढ़ता है तो लोको में खराबी है। पृष्ठ क्र. 68, 69 पर फेलियर क्र. 3 & 4 के अनुसार ट्रबलशूट करें।'
    ]
  },
  {
    id: 'CONV-MU-CAB-CHANGING-BRAKE-BINDING',
    subSystem: 'CONV_PNEUMATIC',
    message: 'मल्टीपल लोको चलाते हुये, कैब बदलते समय, किसी भी एक लोको में ब्रेक बंधती है\nBRAKE BINDING IN ANY ONE LOCO WHILE CHANGING CAB IN MULTIPLE UNIT (MU) OPERATION\n(मल्टीपल लोको में कैब बदलते समय ब्रेक बंधना / ट्रेलिंग लोको में ब्रेक रिलीज न होने पर MU2B को 5 से 10 सेकंड LEAD पर रखकर पुनः TRAIL पर रखना / A-9 एवं SA-9 को रिलीज पोजीशन पर रखकर कैब बदलना / उतार-चढ़ाव वाले सेक्शन में हैंडब्रेक का उपयोग)',
    lamp: 'ब्रेक सिलेंडर (BC) प्रेशर रिलीज नहीं होता व ब्रेक बंधती है (BC pressure does not release, brake binding in loco)',
    effect: 'पहिये जाम होने, व्हील स्किडिंग (wheel skidding) तथा पहिये में फ्लैट टायर (flat tyre) पड़ने का गंभीर जोखिम',
    actions: [
      'i) यदि ट्रेलिंग लोको में ब्रेक रिलीज नहीं होते हैं तो MU2B को 5 से 10 सेकंड के लिए LEAD पर रखें एवं पुनः TRAIL पर रखें। (If brakes do not release in trailing loco, place MU2B on LEAD for 5 to 10 seconds and then back to TRAIL.)',
      'ii) A-9/ SA-9 को “रिलीज” पोजीशन पर रखकर कैब बदली करें। (Keep A-9 and SA-9 in "RELEASE" position while changing cab.)',
      'नोट: उतार-चढ़ाव वाले सेक्शन में कैब बदलते समय हैंडब्रेक का उपयोग करें जिससे इंजन लुढ़क न जाए। (Note: In gradient / undulating sections, apply handbrake while changing cab to prevent locomotive from rolling down.)'
    ]
  },
  {
    id: 'CONV-A9-LOCO-BRAKE-NOT-APPLYING',
    subSystem: 'CONV_PNEUMATIC',
    message: 'A-9 द्वारा लोको ब्रेक नहीं लगती है\nLOCO BRAKE DOES NOT APPLY BY A-9 AUTO BRAKE VALVE\n(A-9 द्वारा लोको ब्रेक न लगना / ड्राइविंग कैब में A-9 कटआउट कॉक खुला व रियर में बंद / MU2B पूरी तरह LEAD पर व 2-3 बार ऑपरेट / BP प्रेशर सामान्य / डिस्ट्रीब्यूटर वाल्व DV आइसोलेट न होना / दोनों बोगी कटआउट कॉक खुले होना / RS या SA-9 द्वारा ब्रेक लगाना)',
    lamp: 'A-9 लगाने पर लोको ब्रेक सिलेंडर (BC) पर प्रेशर नहीं बढ़ता (No BC gauge pressure rise on applying A-9)',
    effect: 'ट्रेन में ब्रेक लग सकती है लेकिन लोकोमोटिव में आटोमैटिक ब्रेक (A-9) द्वारा ब्रेक नहीं लगेगी; केवल SA-9 या RS द्वारा लोको ब्रेक संभव',
    actions: [
      'a) Ensure A-9 cut-out cocks in driving cab are open and in rear cab are closed. (चलाने वाली (Driving) कैब में A-9 कट आउट कॉक खुले और पीछे वाली कैब में बंद हैं, सुनिश्चित करें।)',
      'b) Ensure MU2B valve is fully on "LEAD" position and operate it two to three times. (MU2B वाल्व पूरी तरह से “लीड” पोजीशन पर है, सुनिश्चित करें और उसे दो तीन बार ऑपरेट करें।)',
      'c) Ensure BP pressure is normal. (सुनिश्चित करें, BP प्रेशर सामान्य है।)',
      'd) Ensure Distributor Valve is not isolated. (डिस्ट्रीब्यूटर वाल्व आइसोलेट नहीं है, सुनिश्चित करें।)',
      'e) Ensure cut-out cocks of both bogies are open. (दोनों बोगी के कट आउट कॉक खुले हैं, सुनिश्चित करें।)',
      'f) If required, apply brakes by RS or SA-9. (आवश्यकता पड़ने पर RS या SA-9 द्वारा ब्रेक लगाएं।)'
    ]
  },
  {
    id: 'CONV-SA9-LOCO-BRAKE-NOT-APPLYING',
    subSystem: 'CONV_PNEUMATIC',
    message: 'SA-9 द्वारा लोको ब्रेक नहीं लगती है\nLOCO BRAKE DOES NOT APPLY BY SA-9 INDEPENDENT BRAKE VALVE\n(SA-9 द्वारा लोको ब्रेक न लगना / आगे वाली कैब में SA-9 कट आउट कॉक खुला व पीछे बंद / MU2B वाल्व LEAD पोजीशन पर व 2-3 बार ऑपरेट / बोगी कट आउट कॉक खुले होना / आवश्यकता पड़ने पर A-9 या RS वाल्व का उपयोग)',
    lamp: 'SA-9 लगाने पर लोको ब्रेक सिलेंडर (BC) पर 3.5 kg/cm² प्रेशर नहीं बढ़ता (No BC gauge pressure rise on applying SA-9)',
    effect: 'लोकोमोटिव में डायरेक्ट/इंडिपेंडेंट ब्रेक (SA-9) कार्य नहीं करेगी; केवल A-9 या RS वाल्व द्वारा ही ब्रेकिंग संभव',
    actions: [
      'a) SA-9 कट आउट कॉक आगे वाली कैब में खुले और पीछे वाली कैब में बंद हैं, सुनिश्चित करें। (Ensure SA-9 cut out cock is OPEN in leading/driving cab and CLOSED in rear cab.)',
      'b) MU2B वाल्व “लीड” (LEAD) पोजीशन पर है, सुनिश्चित करें। उसे 2-3 बार ऑपरेट करें। (Ensure MU2B valve is on "LEAD" position. Operate it 2-3 times.)',
      'c) बोगी कट आउट कॉक खुले हैं, सुनिश्चित करें। (Ensure bogie cut out cocks are open.)'
    ]
  },
  {
    id: 'CONV-LOCO-BRAKE-NOT-RELEASING-A9-SA9-RELEASE',
    subSystem: 'CONV_PNEUMATIC',
    message: 'लोको ब्रेक रिलीज नहीं होते हैं, यद्यपि A-9 और SA-9 “रिलीज” पोजीशन पर हैं\nLOCO BRAKES DO NOT RELEASE EVEN THOUGH A-9 AND SA-9 ARE IN RELEASE POSITION\n(लोको ब्रेक रिलीज न होना / A-9 एवं SA-9 रिलीज पोजीशन पर होना / BP प्रेशर 5 kg/cm² सुनिश्चित करना / DV डिस्ट्रीब्यूटर वाल्व द्वारा रिलीज करना / MU2B पूरी तरह LEAD पर / C-2 रिले वाल्व व SA-9 वाल्व को धीरे से टैप करना / खराबी वाली बोगी का कट आउट कॉक बंद करना / फ्लैक्सिबल पाइप कनेक्शन निकालना)',
    lamp: 'ब्रेक सिलेंडर (BC) गेज पर प्रेशर 0 kg/cm² नहीं होता (BC pressure does not drop to 0, remains applied)',
    effect: 'पहिये जाम होने, व्हील स्किडिंग (wheel skidding) तथा पहिये में फ्लैट टायर (flat tyre) पड़ने का गंभीर जोखिम',
    actions: [
      'a) सुनिश्चित करें, BP प्रेशर 5 kg/cm² है। (Ensure BP pressure is 5.0 kg/cm².)',
      'b) डिस्ट्रीब्यूटर वाल्व (DV) के द्वारा रिलीज करें। (Release through Distributor Valve manual release.)',
      'c) MU2B वाल्व पूरी तरह से “लीड” (LEAD) पर है, सुनिश्चित करें। (Ensure MU2B valve is fully on LEAD position.)',
      'd) C-2 रिले वाल्व और SA-9 वाल्व को धीरे से टैप करें। (Gently tap C-2 relay valve and SA-9 valve.)',
      'e) खराबी वाली बोगी के बोगी कट आउट कॉक बंद करें। (Close bogie cut out cock of defective bogie.)',
      'f) फ्लैक्सिबल पाइप कनैक्शन निकालें। (Uncouple/disconnect flexible pipe connection to release trapped air.)'
    ]
  },
  {
    id: 'CONV-BLCP-MR-PRESSURE-NOT-BUILDING',
    subSystem: 'CONV_PNEUMATIC',
    message: 'MR प्रेशर नहीं बनता है / BLCP क्लोज करने पर MR प्रेशर नहीं बनता है\nMR PRESSURE DOES NOT BUILD / BLCP CLOSED\n(MR प्रेशर नहीं बनना / a) यदि MCP कार्य नहीं कर रहा है तो / b) यदि MCP कार्य कर रहा है फिर भी MR प्रेशर नहीं बन रहा है - केवल लोको)',
    lamp: 'MR प्रेशर गेज पर प्रेशर नहीं बढ़ेगा (MR pressure gauge will not rise, remains low)',
    effect: 'लोको व गाड़ी में न्यूमैटिक प्रेशर (MR/BP) नहीं बनेगा, ब्रेक व पैंटो ऑपरेशन बाधित होगा (Pneumatic pressure will not build, brakes & panto will be affected)',
    actions: [
      '• Check MCP. (MCP चेक करें:)',
      '【(A) यदि MCP काम नहीं करता है तो (DJ/VCB को क्लोज हालत में रखने के लिये CPA चालू करें) / Sub-condition (A): If MCP does not work (run CPA to keep DJ/VCB closed)】:',
      'a) Open BLCP and close BLCPD. ((a) BLCP ओपन करें और BLCPD क्लोज करें।)',
      'b) Ensure HCP is not at "0". Change position of HCP switch and attempt to run other MCP. ((b) HCP “0” पर नहीं है, सुनिश्चित करें। HCP की पोजीशन बदलकर दूसरा MCP चलाने का प्रयत्न करें।)',
      'c) Check Q100 (start blowers); if Q100 is not energized: ((c) Q100 चेक करें (ब्लोअर चालू करें) यदि इनर्जाइज नहीं है तो:)',
      '   i) Check CCA fuse (if necessary operate HOBA) (Chapter-7, Failure No. 14, 15, Page No. 53). (i) CCA चेक करें (यदि आवश्यक हो तो HOBA का उपयोग करें) (अध्याय–7-फेलियर क्र. 14, 15 पृष्ठ क्र. 53))',
      '   ii) Wedge relay Q100. (ii) Q100 को वेज करें।)',
      'd) If Q100 is energized: Check contactors closing. If contactors C-101 / C-102 / C-103 are not closing, troubleshoot and wedge them as required. ((d) यदि Q100 इनर्जाइज है तो कॉन्टैक्टरों का क्लोजिंग चेक करें। यदि कॉन्टैक्टर C-101/C-102/C-103 क्लोज नहीं हुए हैं तो ट्रबल शूट करें, आवश्यकतानुसार उन्हें वेज करें।)',
      '• Note: If no independent auxiliary works: Wedge any two (2) contactors out of C-101 / C-102 / C-103 as required. Wedge Q-118 and clear section with 450 Amp traction motor current. (नोट :- यदि कोई भी स्वतंत्र ऑक्सिलरी नहीं चलती तो C-101 / C-102 / C-103 में से कोई भी दो (2) कॉन्टैक्टरों को आवश्यकतानुसार वेज करें। Q-118 वेज करके 450 Amp से सेक्शन क्लियर करें।)',
      '【(B) यदि MCP काम करता है तो / Sub-condition (B): If MCP works】:',
      'a) Ensure A-9 / SA-9 cut-out cocks are open in the driving cab. ((a) ड्राइविंग कैब में A-9 / SA-9 के कट आउट कॉक खुले हैं, सुनिश्चित करें।)',
      'b) Open BLCP and close BLCPD. ((b) BLCP ओपन करें और BLCPD क्लोज करें।)',
      'c) Change position of HCP switch and attempt to create pressure by starting other MCPs. ((c) HCP की पोजीशन बदली करें और दूसरे MCP चालू कर प्रेशर बनाने का प्रयत्न करें।)',
      'd) Ensure MR-4 cut-out cock is open and MR drain cocks are closed. ((d) MR-4 कट आउट कॉक खुला और MR ड्रेन कॉक बंद है, सुनिश्चित करें।)',
      'e) Ensure all angle cocks are closed. ((e) सभी एंगल कॉक क्लोज हैं, सुनिश्चित करें।)',
      'f) If there is leakage from Auto Drain Valve / VEAD Valve / Unloader Valve / Sanding Valve / IP Magnet Valve / Safety Valve: Close the concerned COC. ((f) यदि ऑटो ड्रेन वाल्व / VEAD वाल्व / अनलोडर वाल्व / सेंडिंग वाल्व / IP मैग्नेट वाल्व / सेफ्टी वाल्व से लीकेज है तो संबंधित COC बंद करें।)',
      'g) If leakage is from Air Dryer: Close "A" and "B" cocks, and OPEN "C" (by-pass) cock. ((g) यदि एयर ड्रायर से लीकेज है तो ‘A’ और ‘B’ कॉक बंद करें एवं ‘C’ कॉक खोलें।)',
      'h) If there is heavy leakage anywhere in pneumatic equipment, inspect and rectify. ((h) न्यूमैटिक उपकरणों में कहीं अत्यधिक लीकेज (Heavy leakage) हो तो उसकी जांच करें।)'
    ]
  },
  {
    id: 'CONV-MR-PRESSURE-LESS-THAN-7',
    subSystem: 'CONV_PNEUMATIC',
    message: 'MR प्रेशर 7 kg/cm² से कम बनता है (केवल लोको)\nMR PRESSURE BUILDS LESS THAN 7 kg/cm² (LOCO ONLY)\n(MR प्रेशर 7 kg/cm² से कम बनना - केवल लोको / तीनों MCP चालू कर 9.5 kg/cm² बनाना / RAL कॉक व RS गेज 8 kg/cm² जांच / BP चार्जिंग कॉक बंद कर जांच / i) MR प्रेशर न बनने पर MR ड्रेन कॉक, सेफ्टी वाल्व, अनलोडर, सैंडिंग, ब्रेक सिलेंडर लीकेज व एयर ड्रायर C खुला व A, B बंद / ii) MR प्रेशर 9.5 बनने पर BP चार्जिंग कॉक खोलना व पुनः ड्रॉप होने पर IP वाल्व, RS, BP होस पाइप व एंगल कॉक लीकेज जांच)',
    lamp: 'MR प्रेशर गेज 7 kg/cm² से कम दर्शाता है (MR gauge indicates less than 7 kg/cm²)',
    effect: 'न्यूमैटिक ब्रेक व पैंटो ऑपरेशन हेतु अपर्याप्त एयर प्रेशर; गेज त्रुटि अथवा भारी न्यूमैटिक लीकेज की संभावना',
    actions: [
      'a) तीनों MCP चालू करें। जब MR प्रेशर 9.5 kg/cm² तक बन जाये तो HCP को आवश्यक पोजीशन पर रख दें।',
      'b) RAL कॉक खोल कर RS गेज चेक करें। यदि RS प्रेशर 8 kg/cm² के लगभग है तो इसका अर्थ है MR प्रेशर बराबर है, गेज में खराबी है। यदि RS प्रेशर MR प्रेशर के बराबर या कम है तो BP चार्जिंग कॉक बंद करें और MR प्रेशर देखें:',
      'i) यदि MR प्रेशर नहीं बनता है तो:- MR ड्रेन कॉक, सेफ्टी वाल्व, अनलोडर वाल्व, सैंडिंग वाल्व, ब्रेक सिलेंडर इत्यादि में लीकेज चेक करें। एयर ड्रायर से लीकेज है तो “C” कॉक खोलें “A” व “B” कॉक बंद करें।',
      'ii) यदि MR प्रेशर बनता है तो:- MR प्रेशर 9.5 kg/cm² बन जाने तक रुकें। उसके बाद BP चार्जिंग कॉक खोल दें। यदि MR प्रेशर फिर से अत्यधिक मात्रा में कम होना शुरू होता है तो IP वाल्व, RS, BP होस पाइप और एंगल कॉक इत्यादि में लीकेज चेक करें।'
    ]
  },
  {
    id: 'CONV-MR-NOT-BUILDING',
    subSystem: 'CONV_PNEUMATIC',
    message: 'MR प्रेशर 8-10 kg/cm² नहीं बन रहा\nMR PRESSURE NOT CREATING / COMPRESSORS NOT WORKING\n(मेन रिजर्वॉयर प्रेशर कम)',
    lamp: 'LSBL बुझ सकता है, ऑटो ड्रेन वाल्व लगातार लीक कर सकता है',
    effect: 'Compressed air unavailable for pneumatic brakes, panto, and DJ operation (न्यूमैटिक ब्रेक, पैंटो और डीजे संचालन के लिए हवा उपलब्ध नहीं होगी)',
    actions: [
      '1. Turn BLCP switch from AUTO to MAN (Manual) position to run all three compressors (MCP 1, 2, 3). [BLCP स्विच को "AUTO" से "MAN" (Manual) स्थिति पर रखकर तीनों कंप्रेसरों (MCP 1, 2, 3) को चलाएं।]',
      '2. Check pickup of compressor contactors C101, C102, C103. [कंप्रेसर कॉन्टैक्टर C101, C102, C103 के पिकअप होने की जांच करें।]',
      '3. Check pressure switch RGCP: if RGCP is defective, compressors will not cut-in automatically. [प्रेशर स्विच RGCP की जांच करें: यदि RGCP खराब हो तो कंप्रेसर ऑटो में कट-इन नहीं होते।]',
      '4. Check drain cocks (MR1, MR2, MR3, MR4) and unloader valves to ensure none are leaking or left open. [ड्रेन कॉक (MR1, MR2, MR3, MR4) चेक करें कि कोई ड्रेन कॉक खुला या अनलोडर वाल्व खुला न रह गया हो।]',
      '5. If any compressor makes abnormal noise or overheats, isolate it via HCP switch and work with remaining two compressors. [यदि कोई एक कंप्रेसर आवाज कर रहा हो या गर्म हो, तो HCP स्विच द्वारा उसे आइसोलेट करके शेष दो कंप्रेसरों से कार्य करें।]'
    ]
  },
  {
    id: 'CONV-COMPRESSOR-CONTACTORS-NOT-CLOSING',
    subSystem: 'CONV_PNEUMATIC',
    message: 'कम्प्रेसर के कॉन्टैक्टर क्लोज नहीं होते\nCOMPRESSOR CONTACTORS DO NOT CLOSE (C101, C102, C103)\n(kÀp[Sr k[ kiºT[±Tr ±li[J nh)> hi[t[ / LSCHBA लैम्प जांच / QCON रिले एनर्जाइज व वेज / QTD-101 रिले / LSCHBA बुझने के 5 सेकंड बाद BLCP / सावधानी: QCON के साथ Q-118 वेज करना व 15-20 सेकंड बाद BLCP क्लोज - WR BRC TSD)',
    lamp: 'LSCHBA लैम्प की स्थिति (जलना या बुझना), कंप्रेसर कॉन्टैक्टर C-101, C-102, C-103 ओपन',
    effect: 'कंप्रेसर मोटरें चालू नहीं होंगी, MR एयर प्रेशर नहीं बनेगा (Compressor motors do not start, MR air pressure will not build up)',
    actions: [
      '• LSCHBA लैम्प चेक करें (Check LSCHBA lamp):',
      'a) यदि प्रकाशित है: तो QCON रिले का एनर्जाइज होना सुनिश्चित करें। यदि डी-एनर्जाइज है तो उसे वेज करें। (If glowing: ensure QCON relay is energized. If de-energized, wedge it.)',
      'b) यदि प्रकाशित नहीं है: तो QTD-101 रिले का एनर्जाइज होना सुनिश्चित करें। यदि डी-एनर्जाइज है तो उसे वेज करें। LSCHBA लैम्प बुझने के 5 सेकंड बाद BLCP क्लोज करें। (If not glowing: ensure QTD-101 relay is energized. If de-energized, wedge it. Close BLCP 5 seconds after LSCHBA lamp extinguishes.)',
      '• सावधानी (Important Precautions):',
      '  i) QCON रिले को वेज करने के साथ-साथ Q-118 रिले को भी वेज करें, अन्यथा DJ ट्रिप होगा। (Along with wedging relay QCON, also wedge relay Q-118, otherwise DJ will trip.)',
      '  ii) DJ क्लोज करने के 15-20 सेकंड बाद BLCP क्लोज करें। (Close BLCP 15 to 20 seconds after closing DJ.)'
    ]
  },
  {
    id: 'CONV-HORN-WHISTLE-FAILURE',
    subSystem: 'CONV_PNEUMATIC',
    message: 'चालू गाड़ी में व्हीसल (हॉर्न) फेल हो जाती है\nWHISTLE (HORN) FAILURE IN RUNNING TRAIN\n(चालू गाड़ी में व्हीसल/हॉर्न फेल होना / हवा लीकेज जांच / सैंडिंग कट आउट कॉक / अंडरफ्रेम डुप्लेक्स चेक वाल्व कॉरिडोर 2 / 25 KMPH साफ दृश्यता व 8 KMPH खराब दृश्यता / G&SR 4.50 (2) / स्टार्टिंग स्टेशन पर फेल होने पर लोको फेल)',
    lamp: 'व्हीसल (हॉर्न) नहीं बजता है / हवा का दबाव या वाल्व दोष (Whistle / Horn does not sound)',
    effect: 'चेतावनी संकेत अनुपलब्ध; संरक्षा खतरे के कारण G&SR 4.50 (2) के तहत 25 KMPH (साफ) अथवा 8 KMPH (अस्पष्ट) का गति प्रतिबंध लागू होगा',
    actions: [
      'a) हवा का लीकेज चैक करें।',
      'b) सैंडिंग कट आउट कॉक बंद करके प्रयत्न करें।',
      'c) अंडर फ्रेम पर डुप्लेक्स चैक वाल्व को टेप करें (कॉरिडोर नं. 2 के बाहर)।',
      'd) यदि सफलता नहीं मिलती है तो सावधानीपूर्वक सैक्शन क्लीयर करें। अगले स्टेशन पर TLC/ASM को लिखित में सूचित करें।',
      'e) यदि TLC लोको को अगले सुविधाजनक स्थान तक जाने के लिए लिखित अनुमति देता है तो दृश्यता साफ होने पर 25 KMPH व दृश्यता साफ नहीं होने पर 8 KMPH के गति प्रतिबंध का पालन करते हुए तीव्र दृष्टि एवं सावधानीपूर्वक हेडलाईट तथा मार्कर लाईट का उपयोग करते हुए G&SR 4.50 (2) के अनुसार गाड़ी चलाएं।',
      'नोट:- स्टार्टिंग स्टेशन पर व्हीसल फेल होने पर लोको फेल करें।'
    ]
  },
  {
    id: 'CONV-VCD-PENALTY-BRAKE',
    subSystem: 'CONV_CAB',
    message: 'विजिलेंस कंट्रोल डिवाइस (VCD) पेनल्टी ब्रेक लगना\nVCD PENALTY BRAKE APPLIED\n(60 सेकंड में सतर्कता न बरतने पर पेनल्टी)',
    lamp: 'VCD ऑडियो-विजुअल बजर और लैम्प सक्रिय, BP प्रेशर ड्रॉप',
    effect: 'Emergency brakes applied, BP pressure drops to 2.5-3.0 kg/cm², notches regress to 0 (गाड़ी में इमरजेंसी ब्रेक लग जाएगा, BP प्रेशर 2.5-3.0 kg/cm² गिरेगा, नोच कट जाएंगे)',
    actions: [
      '1. Immediately bring throttle MP to "0" notch. Bring train to a complete halt. [थ्रोटल / MP को तुरंत "0" नोच पर लाएं। गाड़ी को पूरी तरह रोकें।]',
      '2. VCD penalty brake cannot be reset for 32 seconds after application; wait for 32 seconds. [VCD पेनल्टी ब्रेक लगने के बाद 32 सेकंड तक रीसेट नहीं होता है, अतः 32 सेकंड की प्रतीक्षा करें।]',
      '3. After 32 seconds have elapsed, press VCD reset push button (BPVR). [32 सेकंड समाप्त होने पर VCD रीसेट पुश बटन (BPVR) दबाएं।]',
      '4. BP pressure will automatically recharge to 5.0 kg/cm². [BP प्रेशर स्वतः 5.0 kg/cm² तक रीचार्ज हो जाएगा।]',
      '5. If BP pressure does not recharge, close VCD isolating cock on pneumatic panel and place electric switch HVCD to 0. [यदि BP प्रेशर रीचार्ज न हो, तो VCD आइसोलेटिंग कॉक (न्यूमैटिक पैनल पर) को बंद करें और इलेक्ट्रिक स्विच HVCD को "0" पर रखें।]',
      '6. Inform TLC and record in locomotive log book. [TLC को सूचित करें और लॉग बुक में नोट करें।]'
    ]
  },
  {
    id: 'CONV-LOSS-TRACTIVE-FORCE',
    subSystem: 'CONV_TRACTION',
    message: 'कर्षण बल की पूर्ण हानि (Total loss of Tractive force) (दोनों एमीटर डेविएट नहीं होते हैं)\nTOTAL LOSS OF TRACTIVE FORCE (BOTH AMMETERS DO NOT DEVIATE)\n(एक नोच लें और LSGR की ओर देखें: (i) यदि LSGR पहले से ही बुझा है, (ii) यदि LSGR नहीं बुझता है, (iii) यदि LSGR बुझ जाता है)',
    lamp: 'दोनों ट्रैक्शन मोटर एमीटर डेविएट नहीं होते हैं (0 Amp), LSGR की 3 स्थितियां: पहले से बुझा हुआ / नहीं बुझता / बुझ जाता है',
    effect: 'कर्षण बल (Tractive Effort) शून्य; दोनों एमीटर शून्य पर बने रहते हैं और लोको गति नहीं पकड़ता',
    actions: [
      '【प्राथमिक परीक्षण (Initial Action)】:',
      '• Take 1 notch and observe LSGR pilot lamp: (एक नोच लें और LSGR की ओर देखें:)',
      '---------------------------------------------------------------------------------',
      '【शाखा (i) : यदि LSGR पहले से ही बुझा है (Branch i: If LSGR is already extinguished)】:',
      '• Press BPT and check glowing of LSRSI and LSP: (BPT दबाकर LSRSI तथा LSP प्रकाशित होना चेक करें:)',
      'a) If CCLS fuse is melted, replace it. ((a) यदि CCLS पिघल गया है तो बदली करें।)',
      'b) If it melts again, place HOBA to "OFF" position and replace fuse. ((b) यदि फिर भी पिघलता है तो HOBA को “ऑफ” पर रखें और फ्यूज बदली करें।)',
      'c) If required, wedge QRS relay and work train without pilot lamps. ((c) आवश्यकता हो तो QRS वेज करके बिना पायलट लैम्प के गाड़ी चलाएं।)',
      '---------------------------------------------------------------------------------',
      '【शाखा (ii) : यदि LSGR नहीं बुझता है (Branch ii: If LSGR does not extinguish)】:',
      '• If not successful by MP, attempt once via EEC: (MP द्वारा प्रयत्न करने पर यदि सफलता नहीं मिलती है तो एक बार EEC द्वारा प्रयत्न करें:)',
      'a) Check LSB; if glowing: (LSB चेक करें यदि प्रकाशित है तो:)',
      '  - Check Q-50; if not energized, verify J-1 and J-2 are set and ensure CTF-1, CTF-2, CTF-3 are properly set in "R" position. If not set properly, set them by hand. Check C-145 is open and ensure LSC-145 is extinguished. If necessary, wedge Q-50. (Q-50 चेक करें, यदि इनर्जाइज नहीं है तो J-1 और J-2 सेट हो गये हैं, इसकी जांच करें और CTF-1, CTF-2 और CTF-3 “R” पोजीशन में बराबर सेट हो गये हैं, सुनिश्चित करें। यदि वे बराबर सेट नहीं हैं तो उन्हें हाथ से सेट करें। C-145 का ओपन होना चेक करें और LSC-145 का बुझा होना सुनिश्चित करें। यदि आवश्यक हो Q-50 को वेज करें।)',
      '  - If any reverser does not set, lock the reverser. Isolate concerned RSI block, ensure LSC-145 is extinguished, and wedge Q-50. (यदि कोई रिवर्सर सेट नहीं होता है तो रिवर्सर को लॉक करें। संबंधित RSI ब्लॉक आइसोलेट करें तथा LSC-145 का बुझा होना सुनिश्चित करके Q-50 को वेज करें।)',
      '  - If any reverser does not set in desired direction, remove and tape terminals of concerned reverser coil, set reverser manually, and do not use rheostatic braking. (यदि कोई रिवर्सर इच्छित दिशा में सेट नहीं होता है तो संबंधित रिवर्सर की कॉइल के टर्मिनल निकालकर टेप करें व रिवर्सर को मैन्युअली सेट करें और रेहियोस्टैटिक ब्रेक का उपयोग न करें।)',
      'b) Check LSP; if glowing: (LSP चेक करें यदि प्रकाशित है तो:)',
      '  - Check Q-48; if energized, tap Q-48 gently by hand. If not successful, attempt via HMCS. If still not successful, close sanding COC, operate GR manually by hand, and clear section. (Q-48 चेक करें, यदि इनर्जाइज है तो Q-48 को हाथ से थपथपाएं, अगर सफलता न मिले तो HMCS के द्वारा प्रयत्न करें। अगर फिर भी सफलता नहीं मिलती तो सैंडिंग COC बंद करके GR को हाथ से ऑपरेट करके सेक्शन क्लियर करें।)',
      'c) If Auto Flasher LED is glowing: (यदि ऑटो फ्लैशर की LED प्रकाशित है तो:)',
      '  - Ensure BP pressure is 5 kg/cm² and Air Flow Indicator (AFI) needle is at its preset position. Remove CCLSA fuse and attempt. (सुनिश्चित करें BP प्रेशर 5 kg/cm² है, एयर फ्लो इंडिकेटर AFI की सुई पूर्व निर्धारित जगह पर है। CCLSA फ्यूज निकाल कर प्रयत्न करें।)',
      '  - If not successful, check relay PR-2. If energized, wedge PR-2 in open position. (यदि सफलता नहीं मिलती है तो PR-2 को चेक करें। यदि इनर्जाइज है तो PR-2 को ओपन में वेज करें।)',
      '  - In microprocessor-equipped locos, place HPAR / HQ-51 to "0" position. (माइक्रोप्रोसेसर युक्त लोको में HPAR/HQ-51 को "0" पोजीशन पर रखें।)',
      'd) Check BP pressure (ensure IP Magnet valve COC is open): (BP प्रेशर चेक करें (IP Magnet valve COC खुला है):)',
      '  i) If BP pressure is low and VCD has operated, reset VCD. If VCD does not reset, isolate VCD via HVCD or toggle switch. If not successful, remove CCVCD fuse and attempt. If CCVCD fuse is not provided, disconnect both connections of VCD main unit. (यदि BP प्रेशर कम है और VCD ऑपरेट हुई है तो VCD को रीसेट करें। यदि VCD रीसेट नहीं होती है तो HVCD या टॉगल स्विच द्वारा VCD को आइसोलेट करें। यदि सफलता नहीं मिलती है तो CCVCD फ्यूज निकाल कर प्रयत्न करें। यदि CCVCD फ्यूज नहीं लगा है तो VCD मेन यूनिट के दोनों कनेक्शन निकाल दें।)',
      '     (Note: If VCD malfunctions, reset only once; on second occurrence, isolate VCD.) ((नोट :- यदि VCD मालफंक्शन करती है तो सिर्फ एक बार ही रीसेट करेंगे, दूसरी बार में VCD को आइसोलेट करेंगे।))',
      '  ii) If BP pressure is low and VCD has not operated, check for BP leakage in loco and train. (यदि BP प्रेशर कम है और VCD ऑपरेट नहीं हुई है तो लोको तथा गाड़ी में BP लीकेज चेक करें।)',
      'e) Check relay QRS: if not energized, check RGEB-2 cut-out cock is open. Drop BP pressure to 2 kg/cm² via A-9 and return A-9 to release position. If QRS still does not energize, wedge it. (QRS चेक करें: यदि इनर्जाइज नहीं है तो RGEB-2 का कट आउट कॉक खुला होना चेक करें, A9 द्वारा BP प्रेशर 2 kg/cm² तक ड्रॉप करें और A9 को वापस रिलीज पोजीशन पर रख दें। यदि फिर भी QRS इनर्जाइज नहीं होती तो उसे वेज करें।)',
      'f) Ensure ZSMS switch is at position "1". (सुनिश्चित करें ZSMS एक पर है।)',
      'g) Inspect ZSMGR handle (it must be in vertical position). (ZSMGR हैंडल की जांच करें (वह खड़ी स्थिति में होना चाहिए)।)',
      'h) Check SMGR crank cock condition (it must be in normal position). (SMGR क्रैंक कॉक की स्थिति चेक करें।)',
      'i) Check SMGR control air pressure (it must be 2.5 to 3.5 kg/cm²). (SMGR का कंट्रोल प्रेशर चेक करें (वह 2.5 से 3.5 kg/cm² होना चाहिए)।)',
      'j) Attempt traction via EEC. (EEC द्वारा प्रयत्न करें।)',
      'k) Check that relays Q-51 and Q-52 are de-energized. (Q-51 और Q-52 डी-इनर्जाइज हैं, इसकी जांच करें।)',
      'l) Open DJ, operate GR manually by hand 2 to 3 times. (DJ ओपन करें, GR को हाथ से 2-3 बार ऑपरेट करें।)',
      'm) Work train by operating GR manually by hand. (GR को हाथ से ऑपरेट करके गाड़ी चलाएं।)',
      '---------------------------------------------------------------------------------',
      '【शाखा (iii) : यदि LSGR बुझ जाता है (Branch iii: If LSGR extinguishes)】:',
      'a) Check that switches HVSI-1, HVSI-2, HVMT-1, HVMT-2 are in normal position. (HVSI-1, HVSI-2, HVMT-1, HVMT-2 नॉर्मल पोजीशन में हैं, इसकी जांच करें।)',
      'b) Check that HT-2 cut-out cock is open. (HT-2 का कट आउट कॉक खुला हुआ है, इसकी जांच करें।)',
      'c) Perform LT testing to check closing of contactors L1 to L6; verify CTF-1, CTF-2, CTF-3 are in "Running" position. If required, wedge contactors L1 to L6. (LT टेस्टिंग करके L1 से L6 तक के कॉन्टैक्टर क्लोज होते हैं, इसकी जांच करें; CTF-1, CTF-2 और CTF-3 “रनिंग” पोजीशन में हैं, इसकी जांच करें। आवश्यकता हो तो L1 से L6 तक के कॉन्टैक्टर वेज करें।)',
      'd) Do not use rheostatic braking (RB). (रेहियोस्टैटिक ब्रेक RB का उपयोग न करें।)'
    ]
  },
  {
    id: 'CONV-LSGR-ALREADY-EXTINGUISHED',
    subSystem: 'CONV_TRACTION',
    message: 'यदि LSGR पहले से ही बुझा है (कर्षण बल की पूर्ण हानि)\nIF LSGR IS ALREADY EXTINGUISHED (TOTAL LOSS OF TRACTIVE FORCE)\n(एक नोच लेने पर एमीटर डेविएट नहीं होता / BPT दबाकर LSRSI तथा LSP प्रकाशित होना चेक करें / CCLS पिघलना / HOBA "ऑफ" / QRS वेज)',
    lamp: 'LSGR पहले से बुझा रहता है, BPT दबाने पर LSRSI व LSP प्रकाशित, दोनों एमीटर 0',
    effect: 'सिग्नलिंग व पायलट लैम्प सप्लाई फेल; QRS डी-एनर्जाइज होने से रिग्रेशन व कर्षण शून्य',
    actions: [
      '【परीक्षण (Check)】: BPT दबाकर LSRSI तथा LSP प्रकाशित होना चेक करें:',
      'a) यदि CCLS पिघल गया है तो बदली करें। ((a) If CCLS fuse is melted, replace it.)',
      'b) यदि फिर भी पिघलता है तो HOBA को “ऑफ” पर रखें और फ्यूज बदली करें। ((b) If it melts again, place HOBA to "OFF" position and replace fuse.)',
      'c) आवश्यकता हो तो QRS वेज करके बिना पायलट लैम्प के गाड़ी चलाएं। ((c) If required, wedge QRS relay and work train safely without pilot lamps.)'
    ]
  },
  {
    id: 'CONV-LSGR-NOT-EXTINGUISHING',
    subSystem: 'CONV_TRACTION',
    message: 'यदि LSGR नहीं बुझता है (कर्षण बल की पूर्ण हानि / नोच न आना)\nIF LSGR DOES NOT EXTINGUISH (TOTAL LOSS OF TRACTIVE FORCE)\n(MP से प्रयत्न करने पर सफलता न मिलने पर EEC द्वारा प्रयत्न / LSB, Q-50, रिवर्सर, LSP, Q-48, AFL, PR-2, VCD नियम, QRS, RGEB-2, ZSMS, ZSMGR, SMGR प्रेशर, Q51/Q52, GR हाथ से)',
    lamp: 'LSGR 0 पर लगातार जलता रहेगा, LSB / LSP / ऑटो फ्लैशर LED प्रकाशित हो सकती है',
    effect: 'टैप चेंजर GR 0 से आगे प्रोग्रेस नहीं करता; ट्रैक्शन मोटर में कोई करंट नहीं',
    actions: [
      '• MP द्वारा प्रयत्न करने पर यदि सफलता नहीं मिलती है तो एक बार EEC द्वारा प्रयत्न करें:',
      'a) LSB चेक करें यदि प्रकाशित है तो:',
      '  - Q-50 चेक करें, यदि इनर्जाइज नहीं है तो J-1 और J-2 सेट हो गये हैं, इसकी जांच करें और CTF-1, CTF-2 और CTF-3 “R” पोजीशन में बराबर सेट हो गये हैं, सुनिश्चित करें। यदि वे बराबर सेट नहीं हैं तो उन्हें हाथ से सेट करें। C-145 का ओपन होना चेक करें और LSC-145 का बुझा होना सुनिश्चित करें। यदि आवश्यक हो तो Q-50 को वेज करें।',
      '  - यदि कोई रिवर्सर सेट नहीं होता है तो रिवर्सर को लॉक करें। संबंधित RSI ब्लॉक आइसोलेट करें तथा LSC-145 का बुझा होना सुनिश्चित करके Q-50 को वेज करें।',
      '  - यदि कोई रिवर्सर इच्छित दिशा में सेट नहीं होता है तो संबंधित रिवर्सर की कॉइल के टर्मिनल निकालकर टेप करें व रिवर्सर को मैन्युअली सेट करें और रेहियोस्टैटिक ब्रेक का उपयोग न करें।',
      'b) LSP चेक करें यदि प्रकाशित है तो:',
      '  - Q-48 चेक करें, यदि इनर्जाइज है तो Q-48 को हाथ से थपथपाएं, अगर सफलता न मिले तो HMCS के द्वारा प्रयत्न करें। अगर फिर भी सफलता नहीं मिलती तो सैंडिंग COC बंद करके GR को हाथ से ऑपरेट करके सेक्शन क्लियर करें।',
      'c) यदि ऑटो फ्लैशर की LED प्रकाशित है तो:',
      '  - सुनिश्चित करें BP प्रेशर 5 kg/cm² है, एयर फ्लो इंडिकेटर (AFI) की सुई पूर्व निर्धारित जगह पर है। CCLSA फ्यूज निकाल कर प्रयत्न करें।',
      '  - यदि सफलता नहीं मिलती है तो PR-2 को चेक करें। यदि इनर्जाइज है तो PR-2 को ओपन में वेज करें।',
      '  - माइक्रोप्रोसेसर युक्त लोको में HPAR/HQ-51 को 0 पोजीशन पर रखें।',
      'd) BP प्रेशर चेक करें (IP Magnet valve COC खुला है):',
      '  i) यदि BP प्रेशर कम है और VCD ऑपरेट हुई है तो VCD को रीसेट करें। यदि VCD रीसेट नहीं होती है तो HVCD या टॉगल स्विच द्वारा VCD को आइसोलेट करें। यदि सफलता नहीं मिलती है तो CCVCD फ्यूज निकाल कर प्रयत्न करें। यदि CCVCD फ्यूज नहीं लगा है तो VCD मेन यूनिट के दोनों कनेक्शन निकाल दें।',
      '     (नोट :- यदि VCD मालफंक्शन करती है तो सिर्फ एक बार ही रीसेट करेंगे, दूसरी बार में VCD को आइसोलेट करेंगे।)',
      '  ii) यदि BP प्रेशर कम है और VCD ऑपरेट नहीं हुई है तो लोको तथा गाड़ी में BP लीकेज चेक करें।',
      'e) QRS चेक करें: यदि इनर्जाइज नहीं है तो RGEB-2 का कट आउट कॉक खुला होना चेक करें, A9 द्वारा BP प्रेशर 2 kg/cm² तक ड्रॉप करें और A9 को वापस रिलीज पोजीशन पर रख दें। यदि फिर भी QRS इनर्जाइज नहीं होती तो उसे वेज करें।',
      'f) सुनिश्चित करें ZSMS “1” पर है।',
      'g) ZSMGR हैंडल की जांच करें (वह खड़ी स्थिति में होना चाहिए)।',
      'h) SMGR सिम्पल (केंक कॉक की स्थिति चेक करें)।',
      'i) SMGR का कंट्रोल प्रेशर चेक करें (वह 2.5 से 3.5 kg/cm² होना चाहिए)।',
      'j) EEC द्वारा प्रयत्न करें।',
      'k) Q-51 और Q-52 डी-इनर्जाइज हैं, इसकी जांच करें।',
      'l) DJ ओपन करें, GR को हाथ से 2-3 बार ऑपरेट करें।',
      'm) GR को हाथ से ऑपरेट करके गाड़ी चलाएं।'
    ]
  },
  {
    id: 'CONV-LSGR-EXTINGUISHES-NO-TE',
    subSystem: 'CONV_TRACTION',
    message: 'यदि LSGR बुझ जाता है (कर्षण बल की पूर्ण हानि / एमीटर डेविएट नहीं)\nIF LSGR EXTINGUISHES (TOTAL LOSS OF TRACTIVE FORCE / NO TE)\n(LSGR बुझने पर भी एमीटर डेविएट न होना / HVSI व HVMT नॉर्मल / HT-2 कॉक खुला / LT टेस्टिंग L1 से L6 क्लोज चेक / CTF 1,2,3 रनिंग पोजीशन / L1-L6 वेज / RB का उपयोग न करना)',
    lamp: 'LSGR बुझ जाता है (GR 1 पर आता है), परंतु दोनों ट्रैक्शन मोटर एमीटर 0 दर्शाते हैं',
    effect: 'टैप चेंजर नोच लेता है परंतु लाइन कॉन्टैक्टर L1-L6 क्लोज न होने या ट्रैक्शन सर्किट ओपन होने से मोटर में करंट नहीं पहुंचता',
    actions: [
      'a) HVSI-1, HVSI-2, HVMT-1, HVMT-2 नॉर्मल पोजीशन में हैं, इसकी जांच करें। ((a) Check that HVSI-1, HVSI-2, HVMT-1, HVMT-2 are in normal position.)',
      'b) HT-2 का कट आउट कॉक खुला हुआ है, इसकी जांच करें। ((b) Check that HT-2 cut-out cock is open.)',
      'c) LT टेस्टिंग करके L1 से L6 तक के कॉन्टैक्टर क्लोज होते हैं, इसकी जांच करें, CTF-1, CTF-2 और CTF-3 “रनिंग” पोजीशन में हैं, इसकी जांच करें। आवश्यकता हो तो L1 से L6 तक के कॉन्टैक्टर वेज करें। ((c) Do LT testing and check that contactors L1 to L6 close; check that CTF-1, CTF-2, and CTF-3 are in "Running" position. If required, wedge contactors L1 to L6.)',
      'd) रेहियोस्टैटिक ब्रेक (RB) का उपयोग न करें। ((d) Do not use Rheostatic Brake.)'
    ]
  },
  {
    id: 'CONV-PARTIAL-LOSS-TRACTIVE-FORCE',
    subSystem: 'CONV_TRACTION',
    message: 'कर्षण बल की आंशिक हानि (Partial Loss of Tractive Force)\nPARTIAL LOSS OF TRACTIVE FORCE\n(OHE वोल्टेज 19 KV / HVSI, HVMT, HMCS नॉर्मल "1" / एमीटर A1-A2 व वोल्टमीटर U1-U2 / व्हील स्लिप व सैंडिंग BPSW / लाइन कॉन्टैक्टर L2, L5 / लोको व ट्रेन ब्रेक बाइंडिंग)',
    lamp: 'एमीटर/वोल्टमीटर में असमान रीडिंग, व्हील स्लिप, या OHE वोल्टेज 19 KV से कम',
    effect: 'लोकोमोटिव पूरी क्षमता से लोड नहीं खींच पाता; गति धीमी होना या समय हानि (Time Loss)',
    actions: [
      '【i) OHE वोल्टेज (OHE Voltage)】:',
      '• If OHE voltage is less than 19 KV and time loss occurs: inform TPC / TLC at the first station. If no time loss occurs: inform TPC / TLC at the next convenient stop. (यदि 19 KV से कम है और समय की हानि होती है तो पहले स्टेशन पर TPC/TLC को सूचित करें। यदि समय हानि नहीं होती है तो अगले सुविधाजनक स्टॉप पर TPC/TLC को सूचित करें।)',
      '---------------------------------------------------------------------------------',
      '【ii) HVSI, HVMT और HMCS चेक करें (Check HVSI, HVMT and HMCS)】:',
      '• All switches must be in normal position "1". (सभी स्विचें नॉर्मल पोजीशन “1” पर होनी चाहिये।)',
      '---------------------------------------------------------------------------------',
      '【iii) एमीटर (A-1, A-2) और वोल्टमीटर (U-1, U-2) चेक करें (Check Ammeters A-1, A-2 and Voltmeters U-1, U-2)】:',
      'a) If needles of ammeters fluctuate (wheel slip): whenever necessary, regress notch and use sanding. ((a) यदि एमीटरों की सुइयों में उतार चढ़ाव है (व्हील स्लिप) तो जब कभी आवश्यक हो-नोच रिग्रेस करें और सैंडिंग का उपयोग करें।)',
      'b) If any ammeter or voltmeter does not deviate: observe closing of concerned line contactor; wedge if required. ((b) यदि कोई एमीटर अथवा वोल्टमीटर डेविएट नहीं होता है तो संबंधित लाइन कॉन्टैक्टर का क्लोज होना देखें। यदि आवश्यक हो तो वेज करें।)',
      'c) If all voltmeters and ammeters deviate: check closing of L-2 and L-5; wedge if required. ((c) यदि सभी वोल्टमीटर और एमीटर डेविएट होते हैं तो L-2 और L-5 का क्लोज होना चेक करें। यदि आवश्यक हो तो वेज करें।)',
      '---------------------------------------------------------------------------------',
      '【iv) लोको ब्रेक चेक करें (Check Loco Brakes)】:',
      'a) If not released, release loco brake. ((a) यदि रिलीज नहीं है तो रिलीज कर दें।)',
      'b) Check that loco hand brake is released. ((b) लोको हैंड ब्रेक रिलीज है, इसकी जांच करें।)',
      '---------------------------------------------------------------------------------',
      '【v) ट्रेन ब्रेक (Check Train Brakes)】:',
      'a) If bound, ensure BP pressure is normal (5.0 kg/cm²). ((a) यदि बंधी है तो BP प्रेशर सामान्य होना सुनिश्चित करें।)',
      'b) Ensure A-9 handle is in release position. ((b) A-9 का हैंडल रिलीज पोजीशन पर है, सुनिश्चित करें।)',
      'c) If Air Flow Indicator deviates from steady position, check BP pressure leakage. ((c) यदि एयर फ्लो इंडिकेटर स्थिर पोजीशन से डेविएट होता है तो BP प्रेशर का लीकेज चेक करें।)',
      'd) Check hand brakes of the train. ((d) गाड़ी के हैंड ब्रेक चेक करें।)'
    ]
  },
  {
    id: 'CONV-FIRST-NOTCH-AUTOREGRESSION',
    subSystem: 'CONV_GR',
    message: 'पहली नोच पर ऑटो रिग्रेशन होता है (LSGR बुझकर फिर से प्रकाशित होता है)\nAUTO REGRESSION ON FIRST NOTCH (LSGR EXTINGUISHES AND GLOWS AGAIN)\n(पहली नोच लेते ही ऑटो रिग्रेशन / LSP चेक करें: i. यदि नोच लेने पर LSP प्रकाशित होता है, ii. यदि नोच लेने पर LSP प्रकाशित नहीं होता है)',
    lamp: 'LSGR बुझकर तुरंत पुनः प्रकाशित होता है (GR 0 पर आता है), LSP प्रकाशित हो सकता है या बुझा रह सकता है',
    effect: 'नोच नहीं टिकता; 1st नोच लेते ही ऑटो रिग्रेशन होकर GR 0 पर आ जाता है, गाड़ी में ट्रैक्शन नहीं मिलता',
    actions: [
      '【प्राथमिक परीक्षण (Initial Action)】:',
      '• नोच लेते समय LSP पायलट लैम्प की स्थिति चेक करें: ((Observe LSP pilot lamp while taking notch:))',
      '---------------------------------------------------------------------------------',
      '【i. यदि नोच लेने पर LSP प्रकाशित होता है (दोनों एमीटर चेक करें)】:',
      'a) यदि व्हील स्लिप के साथ एमीटरों में उतार-चढ़ाव है तो: सैंडिंग करें और ZQWC/BPQD का उपयोग करें। ((a) If ammeters fluctuate with wheel slip: Sand and use ZQWC / BPQD.)',
      'b) अनमोडीफाइड लोको में यदि A-1 एवं A-2 अथवा मोडीफाइड लोको में A-3 एवं A-4 में से कोई एक एमीटर डेविएट नहीं होता तो: HMCS के द्वारा संबंधित ट्रैक्शन मोटर को आइसोलेट करें। ((b) In unmodified loco if any one of A1/A2 or in modified loco any one of A3/A4 does not deviate: Isolate concerned TM via HMCS.)',
      'c) अनमोडीफाइड लोको में यदि A-1 एवं A-2 अथवा मोडीफाइड लोको में A-3 एवं A-4 दोनों एमीटर डेविएट होते हैं तो: HMCS के द्वारा ट्रैक्शन मोटर 2 और 5 को बारी-बारी से आइसोलेट करें। ((c) If both ammeters deviate: Isolate TM-2 and TM-5 one by one via HMCS.)',
      'd) शंटिंग कॉन्टैक्टर चेक करें: यदि कोई शंटिंग कॉन्टैक्टर क्लोज हालत में अटक गया है तो उसे LT में ओपन करने का प्रयत्न करें। यदि सफलता नहीं मिलती है तो HMCS के द्वारा संबंधित ट्रैक्शन मोटर को आइसोलेट करें। ((d) Check shunting contactors: If any contactor is stuck closed, try to open in LT; if unsuccessful, isolate concerned TM via HMCS.)',
      '---------------------------------------------------------------------------------',
      '【ii. यदि नोच लेने पर LSP प्रकाशित नहीं होता है】:',
      'a) पीछे वाली कैब की BL बराबर लॉक है, सुनिश्चित करें।',
      '   (आगे वाली कैब की BL लॉक करने पर यदि पायलट लैम्प प्रकाशित रहते हैं तो यह इस बात का संकेत है कि पीछे वाली कैब की BL अनलॉक हालत में है)',
      '   • यदि पीछे वाली कैब की BL अनलॉक है तो – उसे लॉक करने का प्रयत्न करें।',
      '   • यदि सफलता नहीं मिलती तो Q118 को वेज करें, ZSMS को “0” पर रखें और EEC द्वारा काम करें।',
      '   • मोडीफाइड ZSMS वाले लोको में GR को मैनुअल कंट्रोल करके सेक्शन क्लीयर करें।',
      'b) BP प्रेशर सामान्य है (IP Magnet valve COC बंद है) और VCD ऑपरेट हुई है तो VCD को रीसेट करें। यदि VCD रीसेट नहीं होती है तो QVCD को ओपन में वेज करें।',
      '   • नोट :- यदि VCD मालफंक्शन करती है तो पहली बार में ही रीसेट करें तथा आइसोलेट करें।',
      'c) मोडीफाइड ZSMS वाले लोको में, BPR दबी अवस्था में अटक गया है तो उसे नॉर्मल करने का प्रयत्न करें:',
      '   (i) यदि सफलता नहीं मिलती है तो ZSMS की पोजीशन बदलें।',
      '   (ii) यदि फिर भी सफलता नहीं मिलती है तो GR को मैनुअल कंट्रोल करके सेक्शन क्लीयर करें।'
    ]
  },
  {
    id: 'CONV-FIRST-NOTCH-AUTOREGRESSION-LSP-GLOWS',
    subSystem: 'CONV_GR',
    message: 'पहली नोच पर ऑटो रिग्रेशन - यदि नोच लेने पर LSP प्रकाशित होता है\nAUTO REGRESSION ON 1ST NOTCH - LSP GLOWS ON TAKING NOTCH\n(पहला नोच लेते ही ऑटो रिग्रेशन व LSP जलना / व्हील स्लिप, ZQWC/BPQD / A1-A2, A3-A4 एमीटर जांच / TM 2 व 5 आइसोलेट / शंटिंग कॉन्टैक्टर अटका होना)',
    lamp: 'LSGR बुझकर पुनः जलता है, नोच लेते ही LSP प्रकाशित होता है',
    effect: 'रिले Q48 पिकअप होने से ऑटो रिग्रेशन; ट्रैक्शन मोटर में असमान लोड या शंटिंग कॉन्टैक्टर चिपकना',
    actions: [
      'a) यदि व्हील स्लिप के साथ एमीटरों में उतार-चढ़ाव है तो: सैंडिंग करें और ZQWC/BPQD का उपयोग करें। ((a) If ammeters fluctuate with wheel slip: Sand and use ZQWC / BPQD.)',
      'b) अनमोडीफाइड लोको में यदि A-1 एवं A-2 अथवा मोडीफाइड लोको में A-3 एवं A-4 में से कोई एक एमीटर डेविएट नहीं होता तो: HMCS के द्वारा संबंधित ट्रैक्शन मोटर को आइसोलेट करें। ((b) In unmodified loco if any one of A1/A2 or in modified loco any one of A3/A4 does not deviate: Isolate concerned TM via HMCS.)',
      'c) अनमोडीफाइड लोको में यदि A-1 एवं A-2 अथवा मोडीफाइड लोको में A-3 एवं A-4 दोनों एमीटर डेविएट होते हैं तो: HMCS के द्वारा ट्रैक्शन मोटर 2 और 5 को बारी-बारी से आइसोलेट करें। ((c) If both ammeters deviate: Isolate TM-2 and TM-5 one by one via HMCS.)',
      'd) शंटिंग कॉन्टैक्टर चेक करें: यदि कोई शंटिंग कॉन्टैक्टर क्लोज हालत में अटक गया है तो उसे LT में ओपन करने का प्रयत्न करें। यदि सफलता नहीं मिलती है तो HMCS के द्वारा संबंधित ट्रैक्शन मोटर को आइसोलेट करें। ((d) Check shunting contactors: If any contactor is stuck closed, try to open in LT; if unsuccessful, isolate concerned TM via HMCS.)'
    ]
  },
  {
    id: 'CONV-FIRST-NOTCH-AUTOREGRESSION-LSP-OFF',
    subSystem: 'CONV_GR',
    message: 'पहली नोच पर ऑटो रिग्रेशन - यदि नोच लेने पर LSP प्रकाशित नहीं होता है\nAUTO REGRESSION ON 1ST NOTCH - LSP DOES NOT GLOW\n(पहला नोच लेते ही ऑटो रिग्रेशन व LSP न जलना / पीछे की कैब BL अनलॉक जांच / Q118 वेज व ZSMS 0 व EEC / मोडीफाइड ZSMS GR मैनुअल / IP COC व VCD रीसेट व QVCD ओपन वेज / BPR दबी अवस्था में अटकना)',
    lamp: 'LSGR बुझकर पुनः प्रकाशित होता है (0 पर आ जाता है), LSP बुझा रहता है',
    effect: 'कंट्रोल सर्किट, कैब BL इंटरलॉक या VCD/BPR फॉल्ट के कारण नोच होल्ड नहीं होता; तुरंत ऑटो रिग्रेशन',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) पीछे वाली कैब की BL बराबर लॉक है, सुनिश्चित करें।',
      '   (आगे वाली कैब की BL लॉक करने पर यदि पायलट लैम्प प्रकाशित रहते हैं तो यह इस बात का संकेत है कि पीछे वाली कैब की BL अनलॉक हालत में है)',
      '   • यदि पीछे वाली कैब की BL अनलॉक है तो – उसे लॉक करने का प्रयत्न करें।',
      '   • यदि सफलता नहीं मिलती तो Q118 को वेज करें, ZSMS को “0” पर रखें और EEC द्वारा काम करें।',
      '   • मोडीफाइड ZSMS वाले लोको में GR को मैनुअल कंट्रोल करके सेक्शन क्लीयर करें।',
      'b) BP प्रेशर सामान्य है (IP Magnet valve COC बंद है) और VCD ऑपरेट हुई है तो VCD को रीसेट करें। यदि VCD रीसेट नहीं होती है तो QVCD को ओपन में वेज करें।',
      '   • नोट :- यदि VCD मालफंक्शन करती है तो पहली बार में ही रीसेट करें तथा आइसोलेट करें।',
      'c) मोडीफाइड ZSMS वाले लोको में, BPR दबी अवस्था में अटक गया है तो उसे नॉर्मल करने का प्रयत्न करें:',
      '   (i) यदि सफलता नहीं मिलती है तो ZSMS की पोजीशन बदलें।',
      '   (ii) यदि फिर भी सफलता नहीं मिलती है तो GR को मैनुअल कंट्रोल करके सेक्शन क्लीयर करें।'
    ]
  },
  {
    id: 'CONV-MPJ-F-R-LSB-GLOWS',
    subSystem: 'CONV_TRACTION',
    message: 'MPJ को “F” या “R” पर रखने पर LSB प्रकाशित ही रहता है\nLSB REMAINS GLOWING ON PLACING MPJ TO "F" OR "R"\n(MPJ को F या R पर रखने पर LSB न बुझना / (I) यदि Q-50 इनर्जाइज नहीं है: CTF 1,2,3 रनिंग, J-1 व J-2 वांछित स्थिति, HT-1 व HT-2 कॉक खुले, C-145 ओपन व LSC-145 बुझा, Q-50 वेज / (II) यदि Q-50 इनर्जाइज है: LSB की परवाह न करें / रिवर्सर क्षतिग्रस्त होने पर RSI ब्लॉक आइसोलेट व Q-50 वेज)',
    lamp: 'LSB पायलट लैम्प लगातार प्रकाशित रहेगा (LSB pilot lamp remains glowing)',
    effect: 'Q-50 रिले इनर्जाइज न होने पर नोच नहीं आएगा; रिवर्सर/CTF सेट न होने या C-145 क्लोज होने से ट्रैक्शन सर्किट तैयार नहीं होगा',
    actions: [
      '【(I) यदि Q-50 इनर्जाइज नहीं है तो (If Q-50 is NOT energized)】:',
      'a) CTF-1, CTF-2 और CTF-3 “रनिंग” पोजीशन पर हैं, सुनिश्चित करें। यदि सेट नहीं हैं तो उन्हें हाथ से सेट करें।',
      'b) J-1 और J-2 चेक करें। यदि वांछित स्थिति (Desired Position) में नहीं हैं तो उन्हें हाथ से सेट करें। HT-1 और HT-2 के न्यूमैटिक कट आउट कॉक खुले हैं, सुनिश्चित करें।',
      'c) C-145 का ओपन होना चेक करें और LSC-145 का बुझा होना सुनिश्चित करें।',
      'd) यदि रिवर्सर और CTF बराबर सेट हैं और C-145 ओपन है (LSC-145 बुझा है) तो Q-50 को वेज करें।',
      '---------------------------------------------------------------------------------',
      '【(II) यदि Q-50 इनर्जाइज है तो (If Q-50 IS energized)】:',
      '• LSB की परवाह न करें। (Ignore LSB glowing if Q-50 is already energized.)',
      '• यदि रिवर्सर क्षतिग्रस्त हो गया है या यदि कोई रिवर्सर सेट नहीं होता है तो:',
      '  - संबंधित RSI ब्लॉक आइसोलेट करें तथा LSC-145 का बुझा होना सुनिश्चित करके Q-50 को वेज करें।'
    ]
  },
  {
    id: 'CONV-FIRST-NOTCH-L1-L6-NOT-CLOSING',
    subSystem: 'CONV_TRACTION',
    message: 'पहली नोच लेने पर कॉन्टैक्टर L-1 से L-6 क्लोज नहीं होते हैं\nCONTACTORS L-1 TO L-6 DO NOT CLOSE ON TAKING FIRST NOTCH\n(पहली नोच पर L1 से L6 क्लोज न होना / Q-50 इनर्जाइज LSB / दोनों HVSI व HVMT सामान्य / HT-2 कट आउट कॉक खुला / DJ ओपन कर लोको ग्राउंड / CTF 1,2,3 हाथ से ऑपरेट कर रनिंग पोजीशन / कॉन्टैक्टर न्यूमैटिकली हाथ से / कॉइल टर्मिनल जांच / सभी कॉन्टैक्टर वेज / रेहियोस्टैटिक ब्रेक उपयोग न करें)',
    lamp: 'LSGR बुझ जाता है (GR 1 पर आता है), LSB बुझा होना चाहिए, एमीटर 0 दर्शाते हैं',
    effect: 'लाइन कॉन्टैक्टर क्लोज न होने से ट्रैक्शन मोटरों को करंट नहीं मिलता; लोको में कोई कर्षण बल (TE) नहीं',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) Q-50 इनर्जाइज है, सुनिश्चित करें। (LSB बुझा होना चाहिए)।',
      'b) दोनों HVSI और HVMT सामान्य स्थिति में हैं, जांच करें।',
      'c) HT-2 कट आउट कॉक खुला है, सुनिश्चित करें।',
      'd) DJ/VCB ओपन करें, लोको ग्राउंड करें, CTF-1, CTF-2 व CTF-3 को हाथ से दो-तीन बार ऑपरेट करके उन्हें वापस “रनिंग” पोजीशन पर रखें। सभी कॉन्टैक्टरों को न्यूमैटिकली हाथ से ऑपरेट करें। कॉइलों के टर्मिनल इत्यादि चेक करें।',
      'e) यदि सफलता नहीं मिलती तो सभी कॉन्टैक्टरों को वेज करें।',
      'f) रेहियोस्टैटिक ब्रेक का उपयोग न करें।'
    ]
  },
  {
    id: 'CONV-L1-L3-OR-L4-L6-NOT-CLOSING',
    subSystem: 'CONV_TRACTION',
    message: 'L-1 से L-3 अथवा L-4 से L-6 क्लोज नहीं होते हैं\nCONTACTORS L-1 TO L-3 OR L-4 TO L-6 DO NOT CLOSE\n(L-1 से L-3 अथवा L-4 से L-6 क्लोज न होना / संबंधित HVSI व HVMT सामान्य स्थिति / 2-3 बार ऑपरेट करना / संबंधित RSI ब्लॉक आइसोलेट / सुविधाजनक स्टॉप पर कॉन्टैक्टर वेज व स्विच सामान्य / रेहियोस्टैटिक ब्रेक का उपयोग न करना)',
    lamp: 'संबंधित बोगी का एमीटर 0 दर्शाएगा (A1 या A2 = 0), आधा कर्षण बल (Half Traction)',
    effect: 'एक बोगी/ट्रक के लाइन कॉन्टैक्टर क्लोज न होने से 3 ट्रैक्शन मोटरें कार्य नहीं करेंगी; आधा कर्षण बल',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) संबंधित HVSI और HVMT सामान्य स्थिति में हैं, जांच करें। उन्हें 2-3 बार ऑपरेट करें। संबंधित RSI ब्लॉक आइसोलेट करें।',
      'b) सुविधाजनक स्टॉप पर कॉन्टैक्टरों को वेज करें और स्विचों को सामान्य स्थिति में रखें।',
      'c) रेहियोस्टैटिक ब्रेक का उपयोग न करें।'
    ]
  },
  {
    id: 'CONV-ONE-LINE-CONTACTOR-NOT-CLOSING',
    subSystem: 'CONV_TRACTION',
    message: 'कोई एक लाइन कॉन्टैक्टर क्लोज नहीं होता है\nANY ONE LINE CONTACTOR DOES NOT CLOSE\n(कोई एक लाइन कॉन्टैक्टर क्लोज न होना / संबंधित HMCS पोजीशन 1 जांच / HMCS द्वारा संबंधित ट्रैक्शन मोटर आइसोलेट / भार खींचने में कठिनाई पर सुविधाजनक स्टॉप पर ट्रबलशूट व कॉन्टैक्टर वेज / रेहियोस्टैटिक ब्रेक का उपयोग न करना)',
    lamp: 'संबंधित बोगी के एमीटर में करंट कम दिखेगा, 5 मोटरों पर लोको कार्य करेगा',
    effect: 'एक लाइन कॉन्टैक्टर न लगने से संबंधित ट्रैक्शन मोटर काम नहीं करेगी; हल्के लोड में गाड़ी चल सकती है, भारी लोड में कर्षण बल कम होगा',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) संबंधित HMCS पोजीशन “1” पर है, इसकी जांच करें।',
      'b) HMCS द्वारा संबंधित ट्रैक्शन मोटर को आइसोलेट करके गाड़ी चलाएं। परंतु यदि भार खींचने में कठिनाई पड़ती हो तो सुविधाजनक स्टॉप पर कॉन्टैक्टर के क्लोज न होने के लिये ट्रबलशूट करें। यदि सफलता नहीं मिलती तो उसे वेज करें।',
      'c) रेहियोस्टैटिक ब्रेक का उपयोग न करें।'
    ]
  },
  {
    id: 'CONV-LSRSI-GLOWS',
    subSystem: 'CONV_TRACTION',
    message: 'LSRSI प्रकाशित रहता है\nLSRSI PILOT LAMP REMAINS GLOWING\n(RSI-1 व RSI-2 टेल-टेल फ्यूज / 6 LED ब्लॉक / 14-18 LED ब्लॉक / 1-2 LED नियम / टॉगल स्विच / TM आइसोलेट / RSI ब्लॉक आइसोलेट व आधा लोड)',
    lamp: 'LSRSI पायलट लैम्प लगातार प्रकाशित रहेगा (LSRSI Pilot Lamp Remains Glowing)',
    effect: 'सिलिकॉन रेक्टिफायर ब्लॉक (RSI) में डायोड/फ्यूज खराबी; लोड वहन क्षमता प्रभावित (Defect in Silicon Rectifier Block RSI diodes/fuses; hauling load capacity impacted)',
    actions: [
      '【1. कन्वेंशनल टेल-टेल फ्यूज युक्त RSI ब्लॉक (RSI-1 और RSI-2 में टेल-टेल फ्यूज चेक करें)】:',
      'a) यदि एक भुजा में अथवा प्रत्येक भुजा में एक-एक टेल-टेल फ्यूज पिघल गया है तो: फ्यूज निकाल दें और ट्रैक्शन चालू करें।',
      'b) यदि एक भुजा में दो फ्यूज पिघल गये हैं तो: फ्यूज निकाल दें और RSI ब्लॉक आइसोलेट करें।',
      'c) यदि कोई भी फ्यूज नहीं पिघला है और LSRSI प्रकाशित है तो: LSRSI की परवाह न करें।',
      '---------------------------------------------------------------------------------',
      '【2. RSI ब्लॉक 6 LED वाले दिए हैं】:',
      '• यदि एक ही RSI ब्लॉक में एक LED प्रकाशित होती है तो: संबंधित RSI ब्लॉक आइसोलेट करें। अधिकतम अनुमत लोड (Permissible Load) का आधा करके गाड़ी चलाएं।',
      '---------------------------------------------------------------------------------',
      '【3. RSI ब्लॉक 14/18 LED वाले दिए हैं】:',
      'a) चलती गाड़ी में LSRSI प्रकाशित होता है, साथ ही RSI ब्लॉक में LED भी प्रकाशित होती है तो: MP को “0” पर लाएं।',
      'b) यदि एक LED प्रकाशित होती है एवं टॉगल स्विच है तो: उसे ऑफ करें और सामान्य रूप से गाड़ी चलाएं। यदि टॉगल स्विच नहीं है तो: संबंधित RSI ब्लॉक की जांच करते हुए गाड़ी सामान्य रूप से चलाएं।',
      'c) यदि दोनों RSI ब्लॉक में एक-एक LED प्रकाशित होती है तो: उपरोक्त (b) में दी गई विधि से सामान्य रूप से गाड़ी चलाएं।',
      'd) यदि एक ही RSI ब्लॉक में दो LED प्रकाशित होती हैं तो: संबंधित RSI ब्लॉक में से कोई एक ट्रैक्शन मोटर आइसोलेट करें।',
      'e) यदि एक ही RSI ब्लॉक में दो से ज्यादा LED प्रकाशित होती हैं तो: संबंधित RSI ब्लॉक आइसोलेट करें। अधिकतम अनुमत लोड का आधा करके गाड़ी चलाएं।'
    ]
  },
  {
    id: 'CONV-NOTCH-AUTOREGRESSION-LSP-GLOWS',
    subSystem: 'CONV_GR',
    message: 'नोच लेने पर LSP प्रकाशित होता है और आटो रिग्रेशन होता है\nLSP GLOWS AND AUTO REGRESSION OCCURS ON TAKING NOTCH\n(नोच लेने पर LSP प्रकाशित व आटो रिग्रेशन / पहली नोच पर LSP: अध्याय 8-पृष्ठ 56 फेलियर सं. 3(I) / अन्य नोचों पर LSP: शंटिंग कॉन्टैक्टर क्लोज अटका होना, LT में ओपन करना, HMCS से TM आइसोलेट)',
    lamp: 'LSP पायलट लैम्प प्रकाशित होता है और GR पर ऑटो रिग्रेशन होता है (LSGR बुझकर पुनः प्रकाशित)',
    effect: 'रिले Q48 पिकअप या शंटिंग कॉन्टैक्टर चिपके होने के कारण नोच टिकते नहीं और ऑटो रिग्रेशन हो जाता है',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) यदि पहली नोच पर LSP प्रकाशित होता है तो: अध्याय 8-पृष्ठ 56 पर फेलियर सं. 3(I) देखें। (अर्थात: व्हील स्लिप जांचें, सैंडिंग व ZQWC/BPQD का उपयोग करें; एमीटर न हिलने पर HMCS से संबंधित TM आइसोलेट करें; दोनों एमीटर हिलने पर TM-2 व TM-5 को बारी-बारी आइसोलेट करें; शंटिंग कॉन्टैक्टर चेक करें।)',
      'b) यदि अन्य नोचों पर LSP प्रकाशित होता है तो: जांच करें कि कोई शंटिंग कॉन्टैक्टर तो क्लोज हालत में नहीं अटक गया है और उसे LT में ओपन करने का प्रयत्न करें। यदि सफलता नहीं मिलती तो HMCS के द्वारा संबंधित ट्रैक्शन मोटर को आइसोलेट करें।'
    ]
  },
  {
    id: 'CONV-LSP-GLOWS-WITHOUT-NOTCH',
    subSystem: 'CONV_GR',
    message: 'बिना नोच लिये LSP प्रकाशित रहता है\nLSP REMAINS GLOWING WITHOUT TAKING NOTCH\n(बिना नोच लिए LSP जलना / Q-48 रिले इनर्जाइज चेक / हाथ से थपथपाएं / HMCS द्वारा प्रयत्न / सैंडिंग COC बंद / GR हाथ से ऑपरेट करके सेक्शन क्लीयर)',
    lamp: 'LSP पायलट लैम्प बिना नोच लिए भी लगातार प्रकाशित रहेगा (LSP glows continuously on GR 0)',
    effect: 'व्हील स्लिप प्रोटेक्शन रिले Q-48 इनर्जाइज या चिपकी होने से नोचिंग ब्लॉक होगी अथवा लगातार सैंडिंग/रिग्रेशन का खतरा रहेगा',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) Q-48 चेक करें (LSP): यदि इनर्जाइज है तो Q-48 को हाथ से थपथपाएं।',
      'b) अगर सफलता न मिले तो: HMCS के द्वारा प्रयत्न करें (संबंधित ट्रैक्शन मोटर आइसोलेट करके देखें)।',
      'c) अगर फिर भी सफलता नहीं मिलती तो: सैंडिंग COC बंद करें और GR को हाथ से ऑपरेट करके सेक्शन क्लीयर करें।'
    ]
  },
  {
    id: 'CONV-WHEEL-SLIP-LSP-NOT-GLOWING',
    subSystem: 'CONV_GR',
    message: 'पहिये फिसलने पर LSP प्रकाशित नहीं होता (एमीटर रीडिंग में उतार-चढ़ाव है)\nLSP DOES NOT GLOW ON WHEEL SLIP (AMMETER READING FLUCTUATING)\n(पहिये फिसलना / व्हील स्लिप पर LSP न जलना / एमीटर उतार-चढ़ाव / a) आटो रिग्रेशन और सैंडिंग न होने पर GR रिग्रेस, PSA सैंडिंग, ZQWC दबाएं / b) आटो रिग्रेशन और सैंडिंग होने पर व्हील स्लिप संकेतों का ध्यान रख गाड़ी चलाएं, ZQWC उपयोग)',
    lamp: 'LSP पायलट लैम्प नहीं जलता, लेकिन एमीटरों (A-1, A-2) की सुइयों में भारी उतार-चढ़ाव (Wheel Slip)',
    effect: 'पहिया फिसलने पर ऑटोमैटिक व्हील स्लिप डिटेक्शन (Q48/LSP) काम न करने से रेल व पहिए की घिसावट का खतरा',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) यदि आटो रिग्रेशन और सैंडिंग नहीं होता: तो आवश्यक होने पर GR रिग्रेस करें और PSA को दबाएं (यदि आवश्यक हो तो ZQWC को दबाएं)।',
      'b) यदि आटो रिग्रेशन और सैंडिंग होता है: तो व्हील स्लिप के संकेतों का ध्यान रखते हुए गाड़ी चलाएं। ZQWC का उपयोग करें।'
    ]
  },
  {
    id: 'CONV-LSGR-NOT-GLOWING',
    subSystem: 'CONV_GR',
    message: 'LSGR प्रकाशित नहीं होता है\nLSGR DOES NOT GLOW (ON GR "0")\n(LSGR प्रकाशित न होना / MP "0" सुनिश्चित / SMGR ड्रम जांच / GR हाथ से 0 व 2-3 बार ऑपरेट / दूसरी कैब लैम्प व QV62 रिले जांच / नोच रिपीटर का ध्यान रखते हुए गाड़ी चलाना)',
    lamp: 'LSGR पायलट लैम्प नहीं जलता है (GR 0 पर भी LSGR बुझा रहता है)',
    effect: 'GR 0 पोजीशन का पायलट लैम्प इंडिकेशन न मिलना; DJ क्लोजिंग या नोचिंग की स्थिति स्पष्ट न होना',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) MP “0” पर है, सुनिश्चित करें।',
      'b) SMGR ड्रम चेक करें। यदि GR “0” पर नहीं है तो उसे हाथ से “0” पर लाएं। यदि GR “0” पर है तो भी उसे 2-3 बार ऑपरेट करें और वापस “0” पर लाएं।',
      'c) दूसरी कैब का लैम्प चेक करें। यदि प्रकाशित नहीं है तो QV62 चेक करें।',
      'd) नोच रिपीटर का ध्यान रखते हुए गाड़ी चलाएं।'
    ]
  },
  {
    id: 'CONV-TRACTION-VOLTMETER-NOT-DEVIATING',
    subSystem: 'CONV_CAB',
    message: 'ट्रैक्शन वोल्टमीटर डेविएट नहीं होते हैं परंतु कर्षण बल की कोई हानि नहीं है\nTRACTION VOLTMETER DOES NOT DEVIATE BUT NO LOSS OF TRACTIVE FORCE\n(ट्रैक्शन वोल्टमीटर U1/U2 डेविएट न होना / कर्षण बल हानि न होना / a) ट्रैक्शन चालू रखें / b) 28 नोच से आगे न बढ़ें)',
    lamp: 'ट्रैक्शन वोल्टमीटर (U-1, U-2) शून्य दर्शाते हैं, परंतु एमीटर करंट दर्शाते हैं और लोको में कर्षण सामान्य है',
    effect: 'वोल्टमीटर मीटर सर्किट में खराबी; वोल्टेज मॉनिटरिंग उपलब्ध न होने के कारण ओवरवोल्टेज सुरक्षा हेतु 28 नोच की अधिकतम सीमा',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) ट्रैक्शन चालू रखें।',
      'b) 28 नोच से आगे न बढ़ें।'
    ]
  },
  {
    id: 'CONV-NOTCH-REPEATER-NOT-WORKING',
    subSystem: 'CONV_CAB',
    message: 'नोच रिपीटर काम नहीं करता है\nNOTCH REPEATER DOES NOT WORK\n(नोच रिपीटर खराब / वोल्टमीटर व एमीटर पर ध्यान रख ट्रैक्शन चालू / CHBA जांच / CCTFS व CCNR फ्यूज या MCB / बार-बार पिघलना / SIV लोको में HRAVT नॉर्मल)',
    lamp: 'कैब में नोच रिपीटर मीटर (0 से 32 नोच) सुई नहीं हिलती या गलत रीडिंग दिखाता है',
    effect: 'कैब में वर्तमान नोच संख्या नहीं दिखती; ट्रैक्शन चालू रह सकता है परंतु वोल्टमीटर/एमीटर पर निगरानी रखनी होगी',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) वोल्टमीटर और एमीटर पर ध्यान रखते हुये ट्रैक्शन चालू रखें।',
      'b) CHBA का काम चेक करें। यदि CHBA काम नहीं करता तो उसके लिये ट्रबलशूट करें।',
      'c) यदि CHBA काम करता है और दोनों कैब के नोच रिपीटर काम नहीं करते हैं तो: CCTFS / CCNR फ्यूज / MCB चेक करें।',
      'd) यदि CCTFS / CCNR बार-बार पिघलता है तो: वोल्टमीटर और एमीटर पर ध्यान रखते हुये ट्रैक्शन चालू रखें।',
      'e) SI UNIT लोको है तो: HRAVT नॉर्मल होना चेक करें।'
    ]
  },
  {
    id: 'CONV-FLASHER-LIGHT-NOT-WORKING',
    subSystem: 'CONV_CAB',
    message: 'फ्लैशर लाईट कार्य नहीं करती\nFLASHER LIGHT DOES NOT WORK\n(फ्लैशर लाईट कार्य न करना / यूनिट पर मेन-स्टैंडबाई स्विच मेन से स्टैंडबाई / मेन व स्टैंडबाई ग्लास फ्यूज / फ्लैशर लाईट हैड ग्लास फ्यूज / शेड से निकलते समय फेल होने पर शेड आउट न करें / वर्किंग के दौरान फेल होने पर TLC को सूचित करें व लोको फेल करें)',
    lamp: 'फ्लैशर लाईट नहीं जलती है / फ्लैशर यूनिट इंडिकेटर बंद (Flasher light does not illuminate / flash)',
    effect: 'संरक्षा चेतावनी बाधित; आपातकालीन स्थिति में सामने से आने वाली गाड़ियों को चेतावनी नहीं दी जा सकेगी। संरक्षा नियमों के अनुसार शेड आउट न करें अथवा लोको फेल करें',
    actions: [
      'a) Turn the Main / Standby switch on the Flasher Light unit from MAIN to STANDBY. (फ्लैशर लाईट यूनिट पर लगे मेन / स्टैंड बाई स्विच को मेन से स्टैंड बाई करें।)',
      'b) If it still does not work, check Main and Standby glass fuses on the unit. If melted, replace with spare glass fuse. (यदि फिर भी कार्य नहीं करती तो यूनिट पर लगे मेन तथा स्टैंड बाई ग्लास फ्यूजों को चेक करें। यदि पिघल गए हों तो स्पेयर ग्लास फ्यूज से बदलें।)',
      'c) Check the glass fuse on the Flasher Light head. If melted, replace with spare glass fuse. (फ्लैशर लाईट हैड पर लगे ग्लास फ्यूज को चेक करें। यदि पिघल गया हो तो स्पेयर ग्लास फ्यूज से बदलें।)',
      '• Note: If flasher light does not work when turning out from shed, do not shed-out the locomotive. (नोट :- यदि शेड से निकलते समय फ्लैशर लाईट कार्य नहीं करती है तो लोको शेड से शेड आउट न करें।)',
      '• During working on line, if flasher light does not work, inform TLC and fail the locomotive. (वर्किंग के दौरान यदि फ्लैशर लाईट कार्य नहीं करती है तो TLC को सूचित करें और लोको फेल करें।)'
    ]
  },
  {
    id: 'CONV-HEADLIGHT-NOT-GLOWING',
    subSystem: 'CONV_CAB',
    message: 'हेडलाइट प्रकाशित नहीं होती है\nHEADLIGHT DOES NOT GLOW / HEADLIGHT DEFECTIVE\n(हेडलाइट प्रकाशित न होना / BL अनलॉक और ZRT/ZPR जांच / BLPRD, BLPRF, BLPRR / DC to DC कन्वर्टर टॉगल स्विच / बल्ब बदली / मार्कर लाइट 40 KMPH G&SR 4.14 / HRTPR "0" RTPR उपयोग)',
    lamp: 'लोको हेडलाइट प्रकाशित नहीं होती है (Twin beam headlight does not illuminate / glows dimly)',
    effect: 'रात्रि में ट्रैक दृश्यता बाधित; G & SR 4.14 के अनुसार मार्कर लाइट से 40 KMPH का गति प्रतिबंध लागू होगा',
    actions: [
      'a) BL अनलॉक और ZRT/ ZPR का ऑन होना, सुनिश्चित करें।',
      'b) BLPRD क्लोज करें।',
      'c) BLPRD/ BLPRF ओपन करें और BLPRR क्लोज करें।',
      '- यदि पीछे वाली हेड लाइट भी प्रकाशित नहीं होती है तो DC to DC कन्वर्टर के टॉगल स्विच की पोजीशन बदलकर प्रयत्न करें।',
      '- यदि पीछे वाली हेड लाइट प्रकाशित होती है तो बल्ब बदली करें।',
      'd) यदि सफलता नहीं मिलती तो मार्कर लाइटों की सहायता से 40 KMPH के गति प्रतिबंध (Speed Restriction) से G & SR 4.14 के अनुसार गाड़ी चलाएं।',
      'नोट:- यदि HRTPR है तो उसे पोजीशन “0” पर रखकर RTPR का उपयोग करें। परिचालन संबंधी निर्देश कंडिका 3.7 पृष्ठ 29 देखें।'
    ]
  },
  {
    id: 'CONV-NO-PILOT-LAMP-ON-UNLOCKING-BL',
    subSystem: 'CONV_CAB',
    message: 'BL को अनलॉक करने पर कोई भी पायलट लैम्प प्रकाशित नहीं होता है\nNO PILOT LAMP GLOWS ON UNLOCKING BL KEY/SWITCH\n(BL अनलॉक करने पर कोई पायलट लैम्प न जलना / दूसरी कैब जांच / BL 2-3 बार ऑपरेट / HLS-ZLS स्विच / UBA 0 होने पर Additional CCBA, CCMCB, BA बॉक्स-1, HOBA, बैटरी कनेक्शन / CCLS फ्यूज / "A" कॉक कनेक्शन / सावधानियां: QRS वेज, IP COC बंद, बिना पायलट लैम्प गाड़ी चलाना, VCD कार्य नहीं करेगी, RB का उपयोग न करें)',
    lamp: 'BL अनलॉक करने पर कैब डेस्क के सभी पायलट लैम्प (LSDJ, LSCHBA, LSB, LSGR आदि) बुझे रहते हैं (No pilot lamps glow)',
    effect: 'पायलट लैम्प इंडिकेशन बाधित; यदि CCLS पिघला है तो रिले QRS डी-इनर्जाइज होकर IP वाल्व से BP ड्रॉप कर सकती है और VCD फेल हो सकती है',
    actions: [
      'A) यदि दूसरी कैब में पायलट लैम्प प्रकाशित है तो पीछे वाली कैब के और दूसरे मापक यंत्रों पर ध्यान रखते हुए गाड़ी चलाएं।',
      'B) यदि दूसरी कैब में भी पायलट लैम्प प्रकाशित नहीं है तो -',
      'a) BL को 2-3 बार ऑपरेट करें।',
      'b) यदि लोको में HLS/ZLS स्विच दिया है तो उसका ऑन होना चेक करें।',
      'c) यदि बैटरी वोल्टेज “0” है तो एडिशनल CCBA / CCMCB (BA बॉक्स-1 पर) चेक करें, यदि मेल्ट होता है तो HOBA का उपयोग करें। बैटरी कनेक्शन चेक करें और खराब बैटरी आइसोलेट करें।',
      'd) CCLS चेक करें - यदि पिघल गया है तो उसे बदल दें - यदि फिर से पिघलता है तो HOBA को “ऑफ” पर रखकर फ्यूज बदली करें।',
      'e) यदि CCLS बराबर है तो A कॉक कनेक्शन चेक करें (TB Panel के नीचे)।',
      'नोट:-',
      'i) यदि CCLS कायम नहीं रहता है तो गाड़ी चलाने के लिए QRS को वेज करें।',
      'ii) IP MAGNET VALVE का COC बंद करें।',
      'iii) बिना पायलट लैम्प के गाड़ी चलाएं। अन्य मापक यंत्रों जैसे UA, नोच रिपीटर, एमीटर, CHBA एमीटर, रिले टारगेट इत्यादि पर ध्यान रखते हुए गाड़ी चलाएं (पृष्ठ 29 पर कंडिका 3.6 देखें)।',
      'iv) विजिलेंस कंट्रोल डिवाइस {VCD} कार्य नहीं करेगी।',
      'v) रेहियोस्टैटिक ब्रेक का उपयोग न करें।'
    ]
  },
  {
    id: 'CONV-LSDJ-NOT-GLOWING-ON-UNLOCKING-BL',
    subSystem: 'CONV_DJ',
    message: 'BL अनलॉक करने पर LSDJ प्रकाशित नहीं होता है\nLSDJ DOES NOT GLOW ON UNLOCKING BL KEY/SWITCH\n(BL अनलॉक करने पर LSDJ न जलना / दूसरी कैब में LSDJ जांच / दोनों कैब में न होने पर RS प्रेशर जांच व CPA द्वारा 8 Kg/cm² बनाना / रिले QV60 को 2-3 बार ऑपरेट करना)',
    lamp: 'BL अनलॉक करने पर LSDJ पायलट लैम्प नहीं जलता है (LSDJ pilot lamp does not illuminate)',
    effect: 'DJ ओपन/क्लोज स्थिति का इंडिकेशन नहीं मिलता; RS में हवा का दबाव कम होने पर DJ क्लोज नहीं होगा',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) दूसरी कैब में LSDJ चेक करें।',
      'b) यदि दोनों कैब में प्रकाशित नहीं है तो: RS में प्रेशर चेक करें। यदि कम है तो CPA द्वारा 8 Kg/cm² प्रेशर बनाएं।',
      'c) QV60 को दो-तीन बार ऑपरेट करें। लैम्पों को चेक करें।'
    ]
  },
  {
    id: 'CONV-LSCHBA-NOT-GLOWING-ON-UNLOCKING-BL',
    subSystem: 'CONV_CAB',
    message: 'BL अनलॉक करने पर LSCHBA प्रकाशित नहीं होता है\nLSCHBA DOES NOT GLOW ON UNLOCKING BL KEY/SWITCH\n(BL अनलॉक करने पर LSCHBA न जलना / दूसरी कैब में जांच / BLRDJ 3-4 सेकंड में छोड़ें / CHBA एमीटर चार्जिंग करंट जांच)',
    lamp: 'BL अनलॉक करने पर LSCHBA पायलट लैम्प नहीं जलता है',
    effect: 'बैटरी चार्जर CHBA इंडिकेशन उपलब्ध नहीं; DJ क्लोजिंग के समय समय पर BLRDJ छोड़ना होगा',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) दूसरी कैब में LSCHBA चेक करें।',
      'b) यदि दोनों कैब में प्रकाशित नहीं है तो निम्न सावधानी रखें -',
      'i) जब कभी DJ/VCB क्लोज करना हो BLRDJ को 3-4 सेकंड में छोड़ दें।',
      'ii) CHBA काम कर रहा है, सुनिश्चित करने के लिये CHBA एमीटर पर ध्यान रखें।'
    ]
  },
  {
    id: 'CONV-LSB-NOT-GLOWING-ON-UNLOCKING-BL',
    subSystem: 'CONV_CAB',
    message: 'BL अनलॉक करने पर LSB प्रकाशित नहीं होता है\nLSB DOES NOT GLOW ON UNLOCKING BL KEY/SWITCH\n(BL अनलॉक करने पर LSB न जलना / दूसरी कैब में जांच / MPJ ऑपरेट करते समय दोनों रिवर्सर व Q50 इनर्जाइज सुनिश्चित / रेहियोस्टैटिक ब्रेक उपयोग न करें)',
    lamp: 'BL अनलॉक करने पर LSB पायलट लैम्प नहीं जलता है',
    effect: 'रिवर्सर व ट्रैक्शन/ब्रेकिंग चेंजओवर की स्थिति का लैम्प इंडिकेशन बाधित; Q50 व रिवर्सर दिशा की मैन्युअल पुष्टि आवश्यक',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) दूसरी कैब में LSB चेक करें।',
      'b) यदि दोनों कैबों में LSB प्रकाशित नहीं है तो निम्न सावधानी रखें:-',
      '• जब कभी MPJ को ऑपरेट करें, सुनिश्चित करें कि दोनों रिवर्सर (J1, J2) वांछित दिशा में सेट हो गये हैं और Q50 इनर्जाइज हो गई है।',
      'c) रेहियोस्टैटिक ब्रेक का उपयोग न करें।'
    ]
  },
  {
    id: 'CONV-LSGR-NOT-GLOWING-ON-UNLOCKING-BL',
    subSystem: 'CONV_GR',
    message: 'BL अनलॉक करने पर LSGR प्रकाशित नहीं होता है\nLSGR DOES NOT GLOW ON UNLOCKING BL KEY/SWITCH\n(BL अनलॉक करने पर LSGR न जलना / SMGR ड्रम चेक / GR हाथ से 0 / एमीटर व नोच रिपीटर पर ध्यान रखकर गाड़ी चलाना)',
    lamp: 'BL अनलॉक करने पर LSGR पायलट लैम्प नहीं जलता है (GR 0 पर बुझा रहता है)',
    effect: 'GR 0 पोजीशन इंडिकेशन बाधित',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) SMGR ड्रम चेक करें और GR “0” पर है, सुनिश्चित करें। यदि GR “0” पर नहीं है तो उसे हाथ से “0” पर लाएं। लैम्प चेक करें।',
      'b) यदि GR “0” पर है तो एमीटर और नोच रिपीटर की ओर ध्यान रखते हुये गाड़ी चलाएं।'
    ]
  },
  {
    id: 'CONV-LSP-GLOWS-ON-UNLOCKING-BL',
    subSystem: 'CONV_GR',
    message: 'BL अनलॉक करने पर LSP प्रकाशित होता है\nLSP GLOWS ON UNLOCKING BL KEY/SWITCH\n(BL अनलॉक करने पर LSP प्रकाशित होना / Q-48 इनर्जाइज चेक व थपथपाएं / HMCS प्रयत्न / सैंडिंग COC बंद व GR हाथ से ऑपरेट / Q-48 डी-इनर्जाइज होने पर BPT 2-3 बार ऑपरेट)',
    lamp: 'BL अनलॉक करते ही बिना नोच लिए LSP पायलट लैम्प प्रकाशित हो जाता है',
    effect: 'व्हील स्लिप सर्किट एक्टिव या रिले Q48 चिपकी होने से ऑटो रिग्रेशन या सैंडिंग का जोखिम',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) Q-48 चेक करें (LSP): यदि इनर्जाइज है तो Q-48 को हाथ से थपथपाएं, अगर सफलता न मिले तो HMCS के द्वारा प्रयत्न करें, अगर फिर भी सफलता नहीं मिलती तो सैंडिंग COC बंद करें और GR को हाथ से ऑपरेट करके सेक्शन क्लीयर करें।',
      'b) यदि Q-48 रिले डी-इनर्जाइज है तो: BPT को 2-3 बार ऑपरेट करें।'
    ]
  },
  {
    id: 'CONV-BPT-LSP-LSRSI-NOT-GLOWING',
    subSystem: 'CONV_CAB',
    message: 'BPT दबाने पर LSP / LSRSI प्रकाशित नहीं होते हैं\nLSP / LSRSI DO NOT GLOW ON PRESSING BPT (LAMP TEST PUSH BUTTON)\n(BPT दबाने पर लैम्प टेस्ट फेल / पीछे वाली कैब BPT जांच / व्हील स्लिप व एमीटर निगरानी / RSI टेल-टेल फ्यूज व LED समय-समय पर चेक करना)',
    lamp: 'BPT (Lamp Test Push Button) दबाने पर LSP या LSRSI पायलट लैम्प नहीं जलते हैं',
    effect: 'पायलट लैम्प बल्ब या टेस्टिंग सर्किट खराब; पहिया फिसलने या RSI ब्लॉक फेलियर पर दृश्य चेतावनी नहीं मिल सकेगी',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      '• LSP / LSRSI को टेस्ट करने के लिये पीछे वाली कैब की BPT दबाएं।',
      '• यदि LSP / LSRSI प्रकाशित नहीं होते हैं तो सावधानीपूर्वक गाड़ी चलाएं:',
      'a) व्हील स्लिप के साथ एमीटरों में उतार-चढ़ाव चेक करते रहें।',
      'b) समय-समय पर RSI ब्लॉक पर टेल-टेल फ्यूज चेक करते रहें।',
      'c) यदि LED वाले RSI ब्लॉक हैं तो सभी LED का बुझा होना चेक करते रहें।'
    ]
  },
  {
    id: 'CONV-CPA-NOT-STARTING',
    subSystem: 'CONV_PNEU',
    message: 'CPA चालू नहीं होता है\nCPA (BABY COMPRESSOR) DOES NOT START\n(CPA चालू न होना / HBA "1" व बैटरी 80V से अधिक / CCBA चेक व HOBA उपयोग / ZCPA 2-3 बार ऑपरेट / ZCPA व MCPA टर्मिनल वायर कनेक्शन जांच)',
    lamp: 'CPA मोटर की आवाज नहीं आती, RS प्रेशर नहीं बढ़ता (CPA motor does not run)',
    effect: 'कंट्रोल रिजर्वोयर RS में एयर प्रेशर नहीं बनेगा; पैंटोग्राफ नहीं उठ सकेगा तथा DJ क्लोज नहीं हो पाएगा',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) HBA “1” पर है और बैटरी वोल्टेज 80 वोल्ट से अधिक है, सुनिश्चित करें (ZCPA को “1” पर रखने के बाद)।',
      'b) CCBA चेक करें। यदि आवश्यक हो तो HOBA का उपयोग करें।',
      'c) ZCPA को 2-3 बार ऑपरेट करें।',
      'd) ZCPA के टर्मिनल वायर कनेक्शन चेक करें।',
      'e) MCPA के टर्मिनल वायर कनेक्शन चेक करें।'
    ]
  },
  {
    id: 'CONV-CPA-RUNS-RS-PRESSURE-NOT-BUILDING',
    subSystem: 'CONV_PNEU',
    message: 'CPA चालू होता है परंतु RS प्रेशर नहीं बनता है\nCPA STARTS BUT RS PRESSURE DOES NOT BUILD UP\n(CPA चालू होना पर RS प्रेशर न बनना / RAL कॉक खुला व टैप / RS व MCPA ड्रेन कॉक बंद / RDJ व DJ ऑयल सेपरेटर ड्रेन कॉक / पैंटो पाइपिंग व BV बॉक्स लीकेज / DJ-VCB बॉक्स / CPA सेफ्टी वाल्व या COC / R-1 COC क्लोज / CPA चालू रख लोको इनर्जाइज / चार्जिंग रेट 1 kg/cm² प्रति मिनट)',
    lamp: 'CPA मोटर चलती है परंतु RS गेज पर सुई नहीं बढ़ती या 8 kg/cm² तक नहीं पहुंचती',
    effect: 'RS प्रेशर कम रहने से पैंटोग्राफ रेज नहीं होगा और DJ/VCB क्लोज नहीं हो सकेगा',
    actions: [
      '【कार्यवाही जो करनी है (Action to Take)】:',
      'a) सुनिश्चित करें कि RAL कॉक खुला है (उसे टैप करें)।',
      'b) RS और MCPA के ड्रेन कॉक बंद हैं, सुनिश्चित करें।',
      'c) RDJ और DJ ऑयल सेपरेटर के ड्रेन कॉक बंद हैं।',
      'd) पैंटो पाइपिंग ड्रेन कॉक बंद है और पैंटो पाइप में कोई लीकेज नहीं है और BV बॉक्स में कोई लीकेज नहीं है, सुनिश्चित करें।',
      'e) DJ/VCB कंट्रोल बॉक्स में कोई लीकेज नहीं है, सुनिश्चित करें।',
      'f) यदि CPA का सेफ्टी वाल्व लीक कर रहा है तो उसे ब्लैंक करें। यदि संबंधित COC दिया है तो उसे बंद करें।',
      'g) R-1 COC को क्लोज करके प्रयत्न करें।',
      'h) CPA को चालू रखें और लोको इनर्जाइज करने का प्रयत्न करें। जब MR प्रेशर 7 kg/cm² हो जाये तो CPA बंद कर दें।',
      '• नोट: CPA चार्जिंग रेट चेक करें - 1 kg/cm² प्रति मिनट होना चाहिए।'
    ]
  }
];




