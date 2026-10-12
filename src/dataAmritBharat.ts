import { SubSystem, Fault } from './types';

export const amritBharatSubSystems: SubSystem[] = [
  { id: 'ALL', name: 'सभी सिस्टम (All Subsystems)' },
  { id: 'SS01', name: 'SS01: Main Power (मुख्य शक्ति)' },
  { id: 'SS02', name: 'SS02: Traction Bogie-1 (ट्रैक्शन बोगी-1)' },
  { id: 'SS03', name: 'SS03: Traction Bogie-2 (ट्रैक्शन बोगी-2)' },
  { id: 'SS04', name: 'SS04: Harmonic Filter (हार्मोनिक फिल्टर)' },
  { id: 'SS05', name: 'SS05: Hotel Load Converter (होटल लोड)' },
  { id: 'SS06', name: 'SS06: Aux Converter-1 / BUR-1' },
  { id: 'SS07', name: 'SS07: Aux Converter-2 / BUR-2' },
  { id: 'SS08', name: 'SS08: Aux Converter-3 / BUR-3' },
  { id: 'SS09', name: 'SS09: Battery System (बैटरी सिस्टम)' },
  { id: 'SS10', name: 'SS10: Brake System (ब्रेक सिस्टम)' },
  { id: 'SS11', name: 'SS11: Auxiliaries HB-1 (ऑक्ज़ीलरी-1)' },
  { id: 'SS12', name: 'SS12: Auxiliaries HB-2 (ऑक्ज़ीलरी-2)' },
  { id: 'SS15', name: 'SS15: Fire Detection (फायर डिटेक्शन)' },
  { id: 'SS19', name: 'SS19: Train Bus / WTB (ट्रेन बस)' },
  { id: 'GEN', name: 'General Push-Pull (सामान्य पुश-पुल फॉल्ट)' },
  { id: 'COACH', name: 'Amrit Bharat Coaches (कोच व HOG)' },
];

export const amritBharatFaults: Fault[] = [
  {
    id: 'F0101P1',
    subSystem: 'SS01',
    message: 'VCB STUCK IN ON POSITION\nLoco will be shut down',
    lamp: 'LSFI फ्लिकर करेगा, LSDJ एवं BPFA जलेंगे',
    effect: 'मास्टर लोको: पैंटो नीचे गिरेगा व VCB ट्रिप होगा। स्लेव लोको पुश-पुल मोड में सामान्य रूप से कार्य करता रहेगा।',
    masterEffect: 'पैंटो नीचे गिरेगा व VCB ट्रिप होगा, LSFI फ्लिकर करेगा व LSDJ, BPFA जलेंगे।',
    slaveEffect: 'स्लेव लोको पुश-पुल में है तो सामान्य काम जारी रहेगा (स्लेव लोको की मदद से सेक्शन क्लियर करें)।',
    actions: [
      '1. स्लेव लोको की मदद से गाड़ी को सेक्शन क्लियर कराने का प्रयास करें (चूंकि स्लेव लोको में ट्रैक्शन उपलब्ध रहता है)।',
      '2. सेक्शन क्लियर करने के बाद गाड़ी खड़ी करें।',
      '3. ZNN स्विच को OFF पोजीशन में रखें।',
      '4. मास्टर लोको से BLDJ द्वारा स्लेव लोको का VCB खोलें।',
      '5. मास्टर लोको से ZPT द्वारा स्लेव लोको का पैंटो नीचे करें (स्लेव लोको Self Hold Mode में आएगा)।',
      '6. मास्टर लोको की BL Key से MCE रीसेट करें (D से OFF, फिर C, फिर OFF से D)।',
      '7. 35-40 सेकंड प्रतीक्षा करें जब तक मास्टर DDU पर दोनों लोको का Node 504 न आ जाए।',
      '8. Node 504 आने पर सामान्य पुश-पुल विधि से लोको एनरजाइज करें।',
      '9. यदि सफलता न मिले तो मास्टर लोको को Dead करें (कॉक 136 खोलें) और स्लेव लोको से गाड़ी कार्य करें।'
    ],
    slaveActions: [
      '1. ZNN को OFF करें और BLDJ से VCB क्लोज करने का एक बार प्रयास करें।',
      '2. यदि असफल हो तो रोलिंग में सेक्शन क्लियर करें।',
      '3. गाड़ी रुकने पर मास्टर लोको का MCE BL Key से बंद करें (D->OFF->C)।',
      '4. मास्टर लोको के D-Panel पर लगे अतिरिक्त BL Key (ADD BL) द्वारा स्लेव लोको का MCE रीसेट करें (OFF->C->OFF->D)।',
      '5. 35-40 सेकंड प्रतीक्षा करें जब तक ADD BPFA न जल जाए (Node 504)।',
      '6. मास्टर लोको का MCE ऑन करें और दोनों लोको का Node 504 आने पर सामान्य पुश-पुल चालू करें।'
    ]
  },
  {
    id: 'F0104P1',
    subSystem: 'SS01',
    message: 'CATENARY VOLTAGE OUT OF LIMIT\nWatch Catenary Voltmeter Close VCB when voltage is ok',
    lamp: 'LSFI फ्लिकर, LSDJ व BPFA प्रकाशित',
    effect: 'पैंटो उठा रहेगा, दोनों लोको का VCB ट्रिप/ओपन हो जाएगा।',
    masterEffect: 'पैंटो उठा रहेगा व VCB ट्रिप होगा, LSFI फ्लिकर, LSDJ व BPFA प्रकाशित।',
    slaveEffect: 'स्लेव लोको का VCB भी ओपन हो जाएगा।',
    actions: [
      '1. मास्टर लोको के OHE मीटर से चेक करें कि वोल्टेज 17.5 kV से 29.5 kV की सीमा में है या नहीं।',
      '2. यदि OHE उपलब्ध नहीं या लिमिट से बाहर है, तो रोलिंग में सेक्शन क्लियर करें व TLC को बताएं।',
      '3. यदि OHE उपलब्ध व सामान्य है, तो मास्टर लोको का PT Fuse चेक करें (उड़ा हो तो बदलें)।',
      '4. यदि एनालॉग U-मीटर 25kV दर्शा रहा है लेकिन DDU पर नहीं दिख रहा, तो SR-1 और SR-2 को बारी-बारी से आइसोलेट करके देखें।',
      '5. गाड़ी खड़ी कर पुश-पुल रिकॉन्फ़िगर करें: ZNN OFF, VCB ओपन, पैंटो डाउन, MCE रीसेट (35-40 सेकंड में Node 504 की प्रतीक्षा करें)।'
    ],
    slaveActions: [
      '1. यदि दोष स्लेव लोको में है, तो स्लेव लोको का PT Fuse चेक करें।',
      '2. मास्टर लोको के D-Panel पर स्थित ADD BL स्लॉट से स्लेव लोको MCE रीसेट करें।'
    ]
  },
  {
    id: 'F0105P1',
    subSystem: 'SS01',
    message: 'TRANSFORMER OIL TEMPERATURE OR PRESSURE NOT OK',
    lamp: 'LSFI फ्लिकर करेगा व BPFA जलेगा',
    effect: 'TE/BE कम होगा या VCB ट्रिप होगा। स्लेव लोको का VCB भी ओपन होगा।',
    actions: [
      '1. BPFA दबाकर संदेश एकनॉलेज करें। चेक करें कि फॉल्ट मास्टर लोको का है या स्लेव लोको का।',
      '2. चेक करें कि ट्रांसफार्मर ऑयल पंप MCB ट्रिप तो नहीं हुई। यदि ट्रिप है, तो VCB ओपन करके MCB रीसेट करें।',
      '3. VCB क्लोज करें और MCB ट्रिपिंग की निगरानी करें।',
      '4. यदि MCB सामान्य है फिर भी संदेश आ रहा है, तो TR Pump गेज का प्रेशर देखें। यदि प्रेशर OK है तो कार्य जारी रखें व TLC को बताएं।',
      '5. यदि TR Pump गेज शून्य दर्शा रहा है, तो SB-1 के रोटरी स्विच से संबंधित SR को आइसोलेट करें।'
    ]
  },
  {
    id: 'F0201P1',
    subSystem: 'SS02',
    message: 'DISTURBANCE IN CONVERTER-1\n(Traction Bogie-1 Disturbance)',
    lamp: 'LSFI फ्लिकर, LSDJ व BPFA जलेंगे',
    effect: 'मास्टर लोको VCB खुलेगा। स्लेव लोको सामान्य रूप से कार्य करता रहेगा।',
    actions: [
      '1. फॉल्ट संदेश को एकनॉलेज करें। VCB दोबारा बंद करके सेक्शन क्लियर करने का प्रयास करें।',
      '2. गाड़ी रुकने पर ZNN को OFF रखकर मास्टर लोको से स्लेव VCB व पैंटो नीचे करें (स्लेव Self Hold में आएगा)।',
      '3. मास्टर लोको का MCE रीसेट करें। Node 504 आने पर सामान्य पुश-पुल शुरू करें।',
      '4. यदि फॉल्ट न हटे, तो मास्टर लोको के SB-1 पैनल में स्विच 154 को "I" पर रखकर और MCB 127.1/1 व 127.11/1 ट्रिप करके ट्रैक्शन बोगी-1 को आइसोलेट करें।',
      '5. बोगी-1 आइसोलेट होने पर मास्टर लोको में 50% ट्रैक्शन उपलब्ध रहेगा, पुश-पुल सामान्य चलेगा।'
    ],
    slaveActions: [
      '1. यदि स्लेव लोको में F0201P1 आए तो स्लेव लोको के SB-1 पैनल में स्विच 154 तथा MCB 127.1/1 व 127.11/1 द्वारा बोगी-1 आइसोलेट करें।',
      '2. स्लेव लोको में 50% पावर रहेगी और पुश-पुल सामान्य चलेगा।'
    ]
  },
  {
    id: 'F0301P1',
    subSystem: 'SS03',
    message: 'DISTURBANCE IN CONVERTER-2\n(Traction Bogie-2 Disturbance)',
    lamp: 'LSFI फ्लिकर, LSDJ व BPFA जलेंगे',
    effect: 'VCB ओपन होगा। बोगी-2 आइसोलेट होने पर 50% पावर उपलब्ध रहेगी।',
    actions: [
      '1. संदेश एकनॉलेज करें, VCB बंद कर सेक्शन क्लियर करें।',
      '2. स्थायी समाधान हेतु SB-2 पैनल में स्विच 154 तथा MCB 127.1/2 व 127.11/2 द्वारा बोगी-2 को आइसोलेट करें।',
      '3. 50% ट्रैक्शन पावर के साथ पुश-पुल सामान्य रूप से कार्य करेगा।'
    ]
  },
  {
    id: 'F0401P1',
    subSystem: 'SS04',
    message: 'HARMONIC FILTER CURRENT TOO HIGH\nF0402P1: Harmonic Filter Contactor Stuck OFF/ON',
    lamp: 'LSFI फ्लिकर, LSDJ व BPFA जलेंगे',
    effect: 'दोनों लोको (Master & Slave) का VCB खुल जाएगा।',
    actions: [
      '1. उपलब्ध गति से सेक्शन क्लियर करने का प्रयास करें।',
      '2. गाड़ी खड़ी कर ZPT से पैंटो नीचे करें और MCE रीसेट बटन से रीसेट करें।',
      '3. 35-40 सेकंड में दोनों लोको का Node 504 आने पर री-एनरजाइज करें।',
      '4. अति-महत्वपूर्ण पुश-पुल नियम: यदि हार्मोनिक फिल्टर सर्विस में नहीं आता, तो दोषयुक्त लोको पर 40 kmph का स्पीड रेस्ट्रिक्शन लागू होगा। 40 kmph के बाद दोषयुक्त लोको का ट्रैक्शन शून्य हो जाएगा और दूसरे लोको पर पूरा ट्रैक्शन आ जाएगा, जिससे पुश-पुल सामान्य गति प्राप्त कर सकता है!',
      '5. 1-2 सेक्शन बाद स्विच 154 द्वारा बोगी-1 को आइसोलेट करें; हार्मोनिक फिल्टर सर्विस में आ जाएगा और सामान्य गति पर आधी TE/BE मिलेगी।'
    ]
  },
  {
    id: 'F0601P1',
    subSystem: 'SS06',
    message: 'DISTURBANCE IN PROCESSOR BUR-1\nAuxiliary Converter-1 Defect',
    lamp: 'LSFI फ्लिकर, LSDJ व BPFA जलेंगे',
    effect: 'VCB खुलेगा। BUR-1 स्वतः आइसोलेट हो जाएगा।',
    actions: [
      '1. थ्रोटल को 0 पर लाएं। BPFA दबाकर एकनॉलेज करें।',
      '2. BUR-1 स्वतः आइसोलेट हो जाएगा। Enter दबाएं और VCB क्लोज करें।',
      '3. गाड़ी को शेष दो ऑक्सिलरी कन्वर्टर (BUR-2 व BUR-3) से चलाएं।',
      '4. ब्लॉक सेक्शन क्लियर होने पर SB-1 पैनल में MCB 127.22/1 चेक करें। ट्रिप हो तो ZNN OFF, पैंटो डाउन कर MCB रीसेट करें व MCE OFF/ON करें।',
      '5. यदि बार-बार ट्रिप हो, तो MCB 127.22/1 ट्रिप रखकर BUR-1 को आइसोलेटेड अवस्था में रखकर कार्य करें। TLC को सूचित करें।'
    ]
  },
  {
    id: 'F0701P1',
    subSystem: 'SS07',
    message: 'DISTURBANCE IN PROCESSOR BUR-2\nAuxiliary Converter-2 Defect',
    lamp: 'LSFI फ्लिकर, LSDJ व BPFA जलेंगे',
    effect: 'VCB खुलेगा। BUR-2 स्वतः आइसोलेट होगा।',
    actions: [
      '1. थ्रोटल 0 करें, BPFA दबाएं।',
      '2. BUR-2 स्वतः आइसोलेट होगा। Enter दबाकर VCB क्लोज करें। BUR-1 और BUR-3 से कार्य करें।',
      '3. सेक्शन क्लियर होने पर SB-1/SB-2 में MCB 127.22/2 चेक व रीसेट करें।'
    ]
  },
  {
    id: 'F0801P1',
    subSystem: 'SS08',
    message: 'DISTURBANCE IN PROCESSOR BUR-3\nAuxiliary Converter-3 Defect',
    lamp: 'LSFI फ्लिकर, LSDJ व BPFA जलेंगे',
    effect: 'BUR-3 स्वतः आइसोलेट होगा। गाड़ी BUR-1 व BUR-2 से चलेगी।',
    actions: [
      '1. थ्रोटल 0 करें, BPFA दबाएं, Enter दबाकर VCB क्लोज करें।',
      '2. SB-2 में MCB 127.22/3 चेक करें।'
    ]
  },
  {
    id: 'F0902P2',
    subSystem: 'SS09',
    message: 'BATTERY CHARGER MCB OFF\nF0903P2: Low Battery Charger Current',
    lamp: 'BPFA जलेगा, UBA वोल्टमीटर में लगभग 5V की गिरावट आएगी',
    effect: 'बैटरी चार्ज नहीं होगी। 86V तक कार्य किया जा सकता है।',
    actions: [
      '1. BPFA दबाकर एकनॉलेज करें।',
      '2. HB-2 पैनल में बैटरी चार्जर MCB 100 चेक करें। यदि ट्रिप है, तो VCB खोलकर एक बार रीसेट करें।',
      '3. SB-2 पैनल में बैटरी चार्जर आउटपुट MCB 110 चेक करें (MCE बंद करके ही रीसेट करें)।',
      '4. यदि MCB 100 बार-बार ट्रिप हो, तो SB-2 में MCB 127.22/3 द्वारा BUR-3 आइसोलेट करें ताकि CHBA को BUR-2 से चलाया जा सके।',
      '5. लोको बैटरी वोल्टेज 86V तक गिरने तक कार्य कर सकता है। TLC से निर्देश लें। स्लेव लोको में होने पर असफल होने पर स्लेव लोको dead करें।'
    ]
  },
  {
    id: 'F1001P1',
    subSystem: 'SS10',
    message: 'FAULT IN BRAKE ELECTRONICS\nEmergency brake applied, No traction allowed',
    lamp: 'LSFI फ्लिकर, BPFA जलेगा, फुल सर्विस ब्रेक लगेगा, ट्रैक्शन शून्य',
    effect: 'गाड़ी में स्वतः ब्रेक लग जाएगा।',
    actions: [
      '1. थ्रोटल को 0 पर लाएं। BPFA दबाएं।',
      '2. SB-2 पैनल में MCB 127.7 एवं 128.1 चेक करें।',
      '3. यदि ट्रिप हों, तो MCE बंद करके केवल MCB 127.7 को एक बार रीसेट करें (MCB 128.1 को रीसेट न करें!)।',
      '4. न्यूमैटिक पैनल पर SV-30 रिलीज प्लंजर से पार्किंग ब्रेक रिलीज करें। सैंडर्स का उपयोग न करें।',
      '5. Knorr CCB लोको में यदि रियर कैब A-9 इमरजेंसी में है, तो उसे FS में लाकर लॉक करें और मोड स्विच Trail में रखें।',
      '6. यदि सामान्य न हो तो PTDC मोड बनाकर सेक्शन क्लियर करें।'
    ]
  },
  {
    id: 'F1003P1',
    subSystem: 'SS10',
    message: 'VIGILANCE EMERGENCY BRAKE APPLICATION (VCD / Vigilance Penalty)',
    lamp: 'LSFI फ्लिकर करेगा, LSVW व BPFA जलेंगे, बजर बजेगा, BP 2.5-3.0 kg/cm² गिरेगा',
    effect: 'VCD पेनल्टी ब्रेक लगेगा, गाड़ी रुक जाएगी।',
    actions: [
      '1. थ्रोटल को 0 पर लाएं। A-9 को Emergency में रखें और SA-9 लगाएं।',
      '2. 120 सेकंड प्रतीक्षा करें (Knorr CCB-2 में 32 सेकंड)।',
      '3. VCD रीसेट करने हेतु BPVR पुश बटन दबाएं। LSVW बुझ जाएगा और बजर बंद होगा।',
      '4. BPFA दबाकर संदेश एकनॉलेज करें। A-9 को RUN पर लाएं और BP प्रेशर 5.0 kg/cm² चार्ज होने दें।',
      '5. यदि VCD बार-बार अनावश्यक पेनल्टी दे रहा है, तो SB-1 पैनल में स्विच 237.1 को "0" पोजीशन में रखकर VCD आइसोलेट करें।',
      'नोट (अमृत भारत विशेष): पुश-पुल में स्लेव लोको का VCD हमेशा Suppressed (सुप्त) रहता है। यदि स्लेव लोको का VCD पेनल्टी दे तो स्लेव लोको के SB-1 में स्विच 237.1 को "0" पर कर दें।'
    ]
  },
  {
    id: 'F1002P1',
    subSystem: 'SS10',
    message: 'LOW PRESSURE MAIN RESERVOIR\nNo traction allowed till pressure reaches to 6.4 kg/cm²',
    lamp: 'LSFI फ्लिकर करेगा व BPFA जलेगा',
    effect: 'MR प्रेशर 6.4 kg/cm² से कम होने पर ट्रैक्शन (TE/BE) नहीं मिलेगा।',
    actions: [
      '1. थ्रोटल को 0 पर लाएं। MR प्रेशर 6.4 kg/cm² पहुंचने तक प्रतीक्षा करें।',
      '2. कंप्रेसर चल रहे हैं या नहीं चेक करें। HB-1 में MCB 47.1/1 और HB-2 में 47.1/2 चेक करें।',
      '3. एयर ड्रायर लीकेज चेक करें। अत्यधिक लीकेज होने पर अंडरफ्रेम में लगे D-in कॉक को बंद करके ड्रायर आइसोलेट करें।',
      '4. MR-1 के नीचे लगे ऑटो ड्रेन वाल्व और सेंट्रीफ्यूगल डस्ट कलेक्टर (CDC) की लीकेज चेक करें।',
      '5. यदि 20 मिनट में MR प्रेशर न बने, तो उस लोको को dead घोषित कर दूसरे लोको की मदद से गाड़ी चलाएं।'
    ]
  },
  {
    id: 'F1006P1',
    subSystem: 'SS10',
    message: 'TRACTION WITH PARKING BRAKES NOT ALLOWED',
    lamp: 'LSFI फ्लिकर, BPPB लाल प्रकाशित',
    effect: 'पार्किंग ब्रेक लगे रहने के कारण ट्रैक्शन नहीं मिलेगा।',
    actions: [
      '1. थ्रोटल 0 करें। लाल प्रकाशित BPPB पुश बटन दबाकर पार्किंग ब्रेक रिलीज करें (गेज 6.0 kg/cm² दिखाना चाहिए)।',
      '2. यदि रिलीज न हो, तो न्यूमैटिक पैनल पर लैच सोलेनोइड वाल्व (30) चेक करें।',
      '3. पहिया नंबर 1, 4, 5, 8 पर लगे रिलीज नॉब को खींचकर मैन्युअल पार्किंग ब्रेक रिलीज करें।'
    ]
  },
  {
    id: 'F1501P1',
    subSystem: 'SS15',
    message: 'FIRE IN MACHINE ROOM (मशीन रूम में आग / धुआं)',
    lamp: 'LSFI फ्लिकर, BPFA जलेगा व सायरन/बजर बजेगा',
    effect: 'अत्यंत गंभीर सुरक्षा चेतावनी! तुरंत गाड़ी रोकें।',
    actions: [
      '1. थ्रोटल को तुरंत 0 करें और गाड़ी को नियंत्रित कर सुरक्षित स्थान पर रोकें।',
      '2. VCB ओपन करें, पैंटो नीचे करें और MCE बंद करें।',
      '3. मशीन रूम का निरीक्षण करें। यदि धुआं/आग दिखे तो SB-2 में MCB 112.1 ट्रिप करें और पोर्टेबल अग्निशामक यंत्र से आग बुझाएं।',
      '4. ट्रैक्शन कन्वर्टर में बड़ी आग की स्थिति में कैब के ALP लॉकर में लगे CO2 सिलेंडर का कॉक खोलें। मशीन रूम का दरवाजा बंद रखें।',
      '5. यदि स्थिति सामान्य है (झूठा अलार्म), तो SB-2 में फायर डिटेक्शन यूनिट का रीसेट बटन दबाएं व BPFA दबाएं। TLC को सूचित करें।'
    ]
  },
  {
    id: 'F1901P1',
    subSystem: 'SS19',
    message: 'COMMUNICATION DISTURBANCE (ट्रेन बस / WTB संचार बाधा)',
    lamp: 'LSFI फ्लिकर करेगा, BPFA जलेगा, VCB खुलेगा, LSFI लगातार जलेगा',
    effect: 'मास्टर लोको VCB खुलेगा। स्लेव लोको का पैंटो गिरेगा व VCB खुलेगा, परंतु कंट्रोल इलेक्ट्रॉनिक्स 60 मिनट तक Self Hold Mode में ऑन रहेगा।',
    actions: [
      '1. मास्टर लोको पर थ्रोटल 0 करें। BPFA दबाकर एकनॉलेज करें।',
      '2. स्क्रीन पर "TRAIN BUS ISOLATED" संदेश आएगा और LSFI लगातार जलेगी (SS19 आइसोलेट हो गया)।',
      '3. BLDJ दबाकर VCB क्लोज करें और केवल मास्टर लोको की पावर पर गाड़ी चलाकर ब्लॉक सेक्शन क्लियर करें (Master: 596, Slv: 0)।',
      '4. अगले ठहराव पर: दोनों लोको की बैटरी (MCB 110 व 112.1) बंद करके कोच UIC जंपर्स की जांच करें।',
      '5. कोच नंबर 6, 12 व 18 में लगे WTB Repeater Cards की बिजली सप्लाई चेक करें (कोच बैटरी से संचालित होते हैं)। जंपर सही कर पुनः एनरजाइज करें।'
    ]
  },
  {
    id: 'P53_MASTER_BRAKE',
    subSystem: 'SS10',
    message: 'IF BRAKES NOT RELEASING ON MASTER LOCO (मास्टर लोको में ब्रेक रिलीज न होना - Page 53)',
    lamp: 'मास्टर लोको BC गेज प्रेशर दर्शाएगा, ब्रेक रिलीज नहीं होंगे',
    effect: 'मास्टर लोको में ब्रेक बाइंडिंग की स्थिति, गाड़ी आगे नहीं बढ़ सकती (CLW TSD Final Copy - पृष्ठ 53)।',
    masterEffect: 'मास्टर लोको ब्रेक सिलेंडर में हवा का दबाव रहेगा, ब्रेक जूते पहियों से चिपके रहेंगे।',
    slaveEffect: 'स्लेव लोको ब्रेक स्थिति पर निगरानी रखें।',
    actions: [
      '1. Keep SA-9 in RELEASE position in both cabs. (दोनों कैब में SA-9 को RELEASE पोजीशन में रखें।)',
      '2. Operate C3W valve & release the brakes. (C3W वाल्व को ऑपरेट करें और ब्रेक रिलीज करें।)',
      '3. Tap on 57 & 58 D-2 relay valve provided on pneumatic panel of E-70 brake system. In case of CCB Brake system, press TP-16, TP-20, TP-BC and DV quick release handle. (E-70 ब्रेक सिस्टम के न्यूमैटिक पैनल पर दिए गए 57 एवं 58 D-2 रिले वाल्व को हल्के से टैप करें। CCB ब्रेक सिस्टम में TP-16, TP-20, TP-BC दबाएं और DV क्विक रिलीज हैंडल ऑपरेट करें।)',
      '4. Close & open 94 cock. (94 नंबर कॉक को बंद करके पुनः खोलें।)',
      '5. Close both bogie isolating cock, after releasing brakes, open the same & try. (दोनों बोगी आइसोलेटिंग कॉक बंद करें, ब्रेक रिलीज होने पर पुनः खोलें और प्रयास करें।)'
    ]
  },
  {
    id: 'P53_SLAVE_BRAKE',
    subSystem: 'SS10',
    message: 'DURING PUSH PULL FORMATION IF SLAVE LOCO BRAKES ARE NOT RELEASING & BC GAUGE SHOWING 3.5 kg/cm² (Page 53)',
    lamp: 'स्लेव लोको BC गेज 3.5 kg/cm² दर्शाएगा, ब्रेक रिलीज नहीं होंगे',
    effect: 'यदि गलती से स्लेव (Slave) लोको में SA-9 एप्लिकेशन पर है और मास्टर (Master) लोको से स्लेव लोको का MCE ऑन कर दिया है, तो स्लेव लोको के ब्रेक RELEASE (रिलीज़) नहीं होंगे। इस स्थिति में स्लेव लोको का SA-9 RELEASE करवाएँ तथा मास्टर लोको से स्लेव लोको का MCE OFF करें और पुनः ON करें, अब स्लेव लोको का ब्रेक RELEASE होना सुनिश्चित करें।',
    masterEffect: 'मास्टर लोको ब्रेक सामान्य रहेंगे परंतु स्लेव लोको में ब्रेक बाइंडिंग रहने से गाड़ी आगे नहीं बढ़ सकती।',
    slaveEffect: 'स्लेव लोको BC गेज 3.5 kg/cm² दर्शाएगा, ब्रेक रिलीज नहीं होंगे। यदि स्लेव लोको में SA-9 एप्लिकेशन पर है और मास्टर लोको से MCE ऑन हो गया था, तो स्लेव का SA-9 रिलीज करवाकर मास्टर लोको से MCE OFF/ON करें।',
    actions: [
      'यदि गलती से स्लेव (Slave) लोको में SA-9 एप्लिकेशन पर है और मास्टर (Master) लोको से स्लेव लोको का MCE ऑन कर दिया है, तो स्लेव लोको के ब्रेक RELEASE (रिलीज़) नहीं होंगे। इस स्थिति में स्लेव लोको का SA-9 RELEASE करवाएँ तथा मास्टर लोको से स्लेव लोको का MCE OFF करें और पुनः ON करें, अब स्लेव लोको का ब्रेक RELEASE होना सुनिश्चित करें। (यदि अब भी रिलीज नहीं होता है तो नीचे दिए गए स्टेप्स 1 से 5 को फॉलो करें:)',
      'स्टेप 1: Keep SA-9 in RELEASE position in both cabs. (दोनों कैब में SA-9 को RELEASE पोजीशन में रखें।)',
      'स्टेप 2: Operate C3W valve & release the brakes. (C3W वाल्व को ऑपरेट करें और ब्रेक रिलीज करें।)',
      'स्टेप 3: Tap on 57 & 58 D-2 relay valve provided on pneumatic panel of E-70 brake system. In case of CCB Brake system, press TP-16, TP-20, TP-BC and DV quick release handle. (E-70 ब्रेक सिस्टम के न्यूमैटिक पैनल पर दिए गए 57 एवं 58 D-2 रिले वाल्व को हल्के से टैप करें। CCB ब्रेक सिस्टम में TP-16, TP-20, TP-BC दबाएं और DV क्विक रिलीज हैंडल ऑपरेट करें।)',
      'स्टेप 4: Close & open 94 cock. (94 नंबर कॉक को बंद करके पुनः खोलें।)',
      'स्टेप 5: Close both bogie isolating cock, after releasing brakes, open the same & try. (दोनों बोगी आइसोलेटिंग कॉक बंद करें, ब्रेक रिलीज होने पर पुनः खोलें और प्रयास करें।)'
    ]
  },
  {
    id: 'P56_BP_MASTER',
    subSystem: 'GEN',
    message: 'IF BP NOT MAINTAINING/CREATING ON MASTER LOCO (मास्टर लोको पर BP प्रेशर न बनने या न ठहरने पर - पृष्ठ 56)',
    lamp: 'DDU Fault Message, BP Gauge 0 / less BP',
    effect: 'BP gauge will show ‘0’ or less BP pressure (दोनों लोको के BP गेज में 0 या कम प्रेशर)।',
    masterEffect: 'BP gauge will show ‘0’ or less BP pressure',
    slaveEffect: 'BP gauge will show ‘0’ or less BP pressure',
    actions: [
      '1. Ensure MR pressure above 8 kg/cm2. (सुनिश्चित करें कि MR प्रेशर 8 kg/cm² से अधिक हो।)',
      '2. Ensure BP angle cock in proper position & should not be leaked. (सुनिश्चित करें कि BP एंगल कॉक सही स्थिति में हो और उसमें से लीकेज न हो।)',
      '3. Check any related fault message appearing on DDU & stored in DDS, if yes then troubleshoot as per TSD. (Also ensure that Cock-70 is in closed condition, BPEMS not pressed, A-9 handle is in proper position in all cab & RS handles are in vertical position) (DDU पर दिखने वाले तथा DDS में दर्ज संबंधित फॉल्ट संदेश की जांच करें और TSD के अनुसार निवारण करें। यह भी सुनिश्चित करें कि कॉक-70 बंद स्थिति में हो, BPEMS दबा न हो, सभी कैब में A-9 हैंडल सही स्थिति में हो तथा RS हैंडल वर्टिकल स्थिति में हों।)',
      '4. Check BP in master loco by closing BP angle cock between master loco & power car. (मास्टर लोको और पावर कार के बीच BP एंगल कॉक बंद करके मास्टर लोको में BP प्रेशर की जांच करें।)',
      '5. Close Slave Loco\'s Power car side BP angle cock & check whether BP maintaining or not, If BP maintaining, make slave loco completely dead & open BP angle cock between slave loco & power car & check BP continuity & conjunction brake test in slave loco. (स्लेव लोको के पावर कार साइड BP एंगल कॉक को बंद करें और देखें कि BP मेंटेन हो रहा है या नहीं। यदि BP मेंटेन हो रहा है, तो स्लेव लोको को पूरी तरह डेड करें तथा स्लेव लोको और पावर कार के बीच BP एंगल कॉक खोलें और स्लेव लोको में BP निरंतरता व कंजंक्शन ब्रेक टेस्ट करें।)',
      '6. If still BP not maintaining, Check any leakages in Train. (यदि फिर भी BP मेंटेन नहीं हो रहा है, तो ट्रेन में लीकेज की जांच करें।)'
    ]
  },
  {
    id: 'GEN_CE',
    subSystem: 'GEN',
    message: 'CONTROL ELECTRONICS NOT GETTING ON (कंट्रोल इलेक्ट्रॉनिक्स ऑन नहीं हो रहा)',
    lamp: 'कोई बत्ती नहीं जलेगी, UBA मीटर नहीं पढ़ेगा, DDU शुरू नहीं होगा',
    effect: 'लोको स्टार्ट नहीं हो सकता।',
    actions: [
      'मास्टर लोको के लिए: SB-2 पैनल में MCB 110 और 112.1 चेक करें (ON होनी चाहिए)। दूसरी कैब से चालू करके देखें।',
      'स्लेव लोको के लिए: सुनिश्चित करें कि दोनों लोको में MCB 110 और 112.1 चालू हैं।',
      'लोको और पावर कार के बीच UIC / Harting जंपर्स की जांच करें।',
      'स्लेव लोको को पहले स्लेव कैब के A-Panel से BL Key लगाकर चालू करें जब तक Node 504 न आ जाए। फिर BL Key OFF में निकालकर मास्टर कैब से एनरजाइज करें।'
    ]
  },
  {
    id: 'P55_PANTO',
    subSystem: 'SS01',
    message: 'IF PANTO NOT GOING UP ON MASTER LOCO (मास्टर लोको पर पैंटोग्राफ न उठने पर - CLW TSD पृष्ठ 55)',
    lamp: 'Panto will not go up & ‘U’ meter will not show',
    effect: 'Panto will not go up & ‘U’ meter will not show. VCB क्लोज नहीं हो सकता, ट्रैक्शन उपलब्ध नहीं (CLW TSD पृष्ठ 55)।',
    masterEffect: '• Panto will not go up & ‘U’ meter will not show',
    slaveEffect: '• Panto will not go up & ‘U’ meter will not show',
    actions: [
      '1. Check panto reservoir pressure above 6 kg/cm2. (सुनिश्चित करें कि पैंटो रिज़रवायर प्रेशर 6 kg/cm² से अधिक हो। कम होने पर ऑक्सिलरी कंप्रेसर MCPA चलाएं।)',
      '2. Check IG-38 key is in horizontal position on pneumatic panel. (On CCB 2.0 loco in vertical position) (न्यूमैटिक पैनल पर नीली चाबी IG-38 हॉरिजॉन्टल स्थिति में हो; CCB 2.0 लोको में वर्टिकल स्थिति में हो।)',
      '3. Check Emergency stop push button should not be in pressed condition. (सुनिश्चित करें कि दोनों कैब में Emergency Stop पुश बटन दबा न हो।)',
      '4. PAN-1 & PAN-2 cocks are open on pneumatic panel. (न्यूमैटिक पैनल पर PAN-1 एवं PAN-2 आइसोलेटिंग कॉक खुले (Open) हों।)',
      '5. Try by changing positions of \'Panto Selector switch\'. (पैंटो सिलेक्टर स्विच की स्थिति बदलकर पैंटो उठाने का प्रयास करें।)',
      '6. Tap PAN-1 & PAN-2 pressure switches on pneumatic panel. (7th & 8th from left) (न्यूमैटिक पैनल पर बाएं से 7वें और 8वें PAN-1 व PAN-2 प्रेशर स्विच को हल्के से टैप करें।)',
      '7. Check MCB 127.12 is in set condition on SB-1 panel, if tripped reset it. (SB-1 पैनल में MCB 127.12 सेट स्थिति में हो, यदि ट्रिप हो तो रीसेट करें।)',
      '8. Check closing of panto ON contactor 130.1 on SB-2 panel. (SB-2 पैनल में पैंटो ON कॉन्टैक्टर 130.1 के क्लोजिंग की जांच करें।)'
    ]
  },
  {
    id: 'P55_PANTO_SLAVE',
    subSystem: 'SS01',
    message: 'IF PANTO NOT GOING UP ON SLAVE LOCO (स्लेव लोको पर पैंटोग्राफ न उठने पर - CLW TSD पृष्ठ 55 & पृष्ठ 8)',
    lamp: 'Slv: 504 नहीं आएगा, स्लेव पैंटो नहीं उठेगा व ‘U’ मीटर नहीं दिखाएगा',
    effect: 'स्लेव लोको का पैंटोग्राफ नहीं उठेगा, स्लेव में VCB क्लोज नहीं होगा, 50% ट्रैक्शन बाधित (CLW TSD पृष्ठ 55, 8)।',
    masterEffect: 'मास्टर लोको पैंटो सामान्य रूप से उठ सकता है लेकिन स्लेव पैंटो नीचे रहेगा।',
    slaveEffect: 'स्लेव लोको पैंटो नहीं उठेगा (Slv: 550 नहीं आएगा)।',
    actions: [
      '1. Master DDU पर Node 504 जांचें (Node Progression Check - पृष्ठ 8): मास्टर DDU पर "Slv: 504" दिखना अनिवार्य है। यदि स्लेव Node 504 पर नहीं आया है, तो मास्टर से ZPT दबाने पर भी स्लेव पैंटो नहीं उठेगा। (मास्टर के "D" पैनल पर ADD BL चाबी से स्लेव MCE पुनः बूट करें, 35-45s प्रतीक्षा करें)।',
      '2. स्लेव लोको पैंटो रिज़रवायर प्रेशर चेक करें (Panto Reservoir Pressure - पृष्ठ 55): स्लेव लोको में पैंटो रिज़रवायर प्रेशर 6.0 kg/cm² से अधिक होना चाहिए। कम होने पर स्लेव लोको के SB-2 पैनल से सहायक कंप्रेसर MCPA चलाकर प्रेशर बनाएं।',
      '3. स्लेव न्यूमैटिक पैनल पर IG-38 चाबी (Pneumatic Panel - पृष्ठ 55 व 5): स्लेव लोको के न्यूमैटिक पैनल पर नीली चाबी IG-38 हॉरिजॉन्टल स्थिति में होनी चाहिए (CCB 2.0 लोको में वर्टिकल स्थिति में)।',
      '4. स्लेव लोको इमरजेंसी स्टॉप पुश बटन (Emergency Stop - पृष्ठ 55): सुनिश्चित करें कि स्लेव लोको के दोनों कैब में Emergency Stop पुश बटन दबा हुआ न हो।',
      '5. स्लेव लोको PAN-1 व PAN-2 आइसोलेटिंग कॉक (पृष्ठ 55): स्लेव लोको के न्यूमैटिक पैनल पर PAN-1 एवं PAN-2 आइसोलेटिंग कॉक खुले (OPEN) होने चाहिए।',
      '6. स्लेव लोको पैंटो सिलेक्टर स्विच (Panto Selector Switch - पृष्ठ 55): स्लेव लोको में "Panto Selector Switch" की स्थिति बदलकर पैंटो उठाने का प्रयास करें।',
      '7. स्लेव न्यूमैटिक पैनल पर PAN-1 व PAN-2 प्रेशर स्विच टैप करें (पृष्ठ 55): स्लेव के न्यूमैटिक पैनल पर बाएं से 7वें और 8वें PAN-1 व PAN-2 प्रेशर स्विच को हल्के से टैप करें।',
      '8. स्लेव लोको SB-1 में MCB 127.12 व SB-2 में कॉन्टैक्टर 130.1 (पृष्ठ 55): स्लेव लोको के SB-1 पैनल में MCB 127.12 सेट स्थिति में हो (ट्रिप हो तो रीसेट करें), तथा SB-2 पैनल में पैंटो ON कॉन्टैक्टर 130.1 के क्लोजिंग (पिकअप) की जांच करें।',
      '9. 22-पिन UIC जंपर व WTB संचार (पृष्ठ 52): लोको और रैक के बीच 22-पिन UIC पुश-पुल जंपर सही से लगा व लॉक होना चाहिए। यदि WTB में खराबी है तो BPFA दबाएं या स्लेव को DEAD करें।'
    ]
  },
  {
    id: 'GEN_ZNN',
    subSystem: 'GEN',
    message: 'NEUTRAL SECTION PASSING WITH ZNN SWITCH (न्यूट्रल सेक्शन संचालन)',
    lamp: 'LSDJ लैम्प',
    effect: 'मास्टर और स्लेव लोको के VCB का स्वतः क्रमिक संचालन (350m / 750m)।',
    actions: [
      '1. 500 मीटर बोर्ड पर अनुमेय अधिकतम गति प्राप्त करें।',
      '2. 250 मीटर बोर्ड पर मास्टर कैब के A-Panel पर ZNN स्विच "ON" रखें। थ्रोटल रीजेनेरेटिव मोड में न हो।',
      '3. DJ OPEN बोर्ड पर BLDJ को OFF करें। केवल मास्टर VCB खुलेगा; स्लेव VCB चालू रहेगा।',
      '4. DJ CLOSE बोर्ड पर थ्रोटल 0 कर BLDJ को ON करें (LSDJ बुझ जाएगा)।',
      '5. स्लेव VCB लगभग 350 मीटर बाद स्वतः खुलेगा और 750 मीटर बाद स्वतः बंद हो जाएगा (DDU Node 590 पर निगरानी रखें)।',
      '6. दोनों लोको का Node 590 आने पर सामान्य रूप से थ्रोटल लें।'
    ]
  },
  {
    id: 'GEN_HOTEL_LOAD',
    subSystem: 'COACH',
    message: 'HOTEL LOAD NOT COMING FROM HLC- 2/1 OF SLAVE LOCO (स्लेव लोको के HLC-2/1 से होटल लोड न आना - CLW TSD पृष्ठ 58)',
    lamp: 'HLC इंडिकेशन नहीं आएगा, कोचों में होटल लोड सप्लाई बाधित',
    effect: 'स्लेव लोको के HLC-2/1 से अमृत भारत कोचों में होटल लोड (750V AC) आपूर्ति नहीं आएगी।',
    masterEffect: 'मास्टर लोको सामान्य रहेगा; आगे के फेल्डर में सप्लाई सामान्य रह सकती है।',
    slaveEffect: 'स्लेव लोको के HLC-2/1 से होटल लोड की आपूर्ति बाधित रहेगी।',
    actions: [
      '1. Check IVC Coupler properly fitted or not. (जांचें कि 500A IVC कपलर सही प्रकार से फिट है या नहीं।)',
      '2. Hotel Load UIC coupler properly fitted or not. (होटल लोड 13-पिन UIC कपलर सही प्रकार से फिट है या नहीं जांचें।)',
      '3. Hotel Load UIC coupler pin to be checked and ensure no deformity in Hotel Load UIC Coupler. (होटल लोड UIC कपलर पिनों की भली-भांति जांच करें और सुनिश्चित करें कि होटल लोड UIC कपलर में कोई विकृति/मुड़ाव न हो।)',
      '4. If any abnormality identified by LP or ETL staff, then following action should be taken at next halt – (यदि लोको पायलट या ETL स्टाफ द्वारा कोई असामान्यता पाई जाती है, तो अगले हॉल्ट पर निम्न कार्यवाही करें):',
      '   a. On Master loco –',
      '      i. Ensure Throttle on ‘0’ & MPJ in Neutral. (थ्रोटल ‘0’ और MPJ को न्यूट्रल पर रखें।)',
      '      ii. Apply SA-9 to ON position. Keep A-9 in Emergency position. (SA-9 को ON स्थिति में लगाएं, A-9 को इमरजेंसी स्थिति में रखें।)',
      '      iii. Open VCB, drop the pantograph & switch OFF control electronics. (VCB खोलें, पैंटोग्राफ नीचे करें और कंट्रोल इलेक्ट्रॉनिक्स OFF करें।)',
      '      iv. Switch OFF battery by operating 110 & 112.1 in SB-2 panel. (SB-2 पैनल में MCB 110 एवं 112.1 को ऑपरेट करके बैटरी बंद करें।)',
      '   b. On Slave loco –',
      '      i. If control electronics is in ON condition then switch OFF battery by operating 110 & 112.1 in SB-2 panel. (यदि कंट्रोल इलेक्ट्रॉनिक्स ON स्थिति में है तो SB-2 पैनल में 110 व 112.1 को ऑपरेट कर बैटरी बंद करें।)',
      '5. Attend the Hotel Load UIC coupler pin problem, after attending the problem, switch ON the battery of both locos by operating 110 & 112.1 to ON position. (होटल लोड UIC कपलर पिन की समस्या को ठीक करें, समस्या निवारण के बाद दोनों लोको में 110 व 112.1 को ON स्थिति में करके बैटरी चालू करें।)',
      '6. Try to energize the loco as per procedure from Master loco. If successful, work the train with both locos. If unsuccessful, then make slave loco as dead loco and work the train with single loco i.e. by Master loco. (मास्टर लोको से निर्धारित प्रक्रिया अनुसार लोको को एनरजाइज करने का प्रयास करें। यदि सफल होता है, तो दोनों लोको के साथ गाड़ी का कार्य संचालन करें। यदि असफल होता है, तो स्लेव लोको को DEAD लोको बनाएं और केवल मास्टर लोको (सिंगल लोको) से ट्रेन का संचालन करें।)'
    ]
  },

  {
    id: 'F0102P1',
    subSystem: 'SS01',
    message: 'VCB STUCK IN OFF POSITION (SS01 - CLW TSD पृष्ठ 17)',
    lamp: 'LSDJ जलता रहेगा, LSFI फ्लिकर करेगा',
    effect: 'VCB क्लोज नहीं होगा, LSDJ प्रकाशित रहेगा। मास्टर या स्लेव लोको एनरजाइज नहीं होगा।',
    masterEffect: 'मास्टर लोको VCB क्लोज नहीं होगा।',
    slaveEffect: 'स्लेव लोको VCB क्लोज नहीं होगा (D-Panel पर ADD LSDJ जलता रहेगा)।',
    actions: [
      '1. सुनिश्चित करें कि MR प्रेशर > 6.4 kg/cm² और पैंटो रिज़रवायर प्रेशर > 6.0 kg/cm² है।',
      '2. UBA मीटर पर बैटरी वोल्टेज चेक करें (न्यूनतम 86V DC होना अनिवार्य है)।',
      '3. SB-2 पैनल में कंट्रोल इलेक्ट्रॉनिक्स MCB 112.1 तथा बैटरी MCB 110 की स्थिति चेक करें।',
      '4. न्यूमैटिक पैनल पर VCB आइसोलेटिंग कॉक खुला (OPEN) होना सुनिश्चित करें।',
      '5. स्लेव लोको में: लोको और रैक के बीच 22-पिन UIC जंपर केबल कनेक्शन की जांच करें।',
      '6. यदि आवश्यक हो तो BLDJ को दोबारा ऑपरेट करें तथा BPFA द्वारा एकनॉलेज करें।'
    ]
  },
  {
    id: 'F0103P1',
    subSystem: 'SS01',
    message: 'LOW PRESSURE PANTO / FAULTY PANTO (SS01 - CLW TSD पृष्ठ 18)',
    lamp: 'LSDJ व BPFA प्रकाशित, Node 504 पर रुका रहेगा',
    effect: 'पैंटोग्राफ नहीं उठेगा, नोड 504 से आगे नहीं बढ़ेगा।',
    masterEffect: 'मास्टर लोको पैंटो नहीं उठेगा।',
    slaveEffect: 'स्लेव लोको पैंटो नहीं उठेगा, DDU पर Slv: 504 बना रहेगा।',
    actions: [
      '1. ऑक्सिलरी रिज़रवायर (Aux Reservoir) गेज में प्रेशर 5.2 kg/cm² से अधिक चेक करें। कम हो तो SB-2 से MCPA चलाएं।',
      '2. न्यूमैटिक पैनल पर नीली चाबी IG-38 हॉरिजॉन्टल (CCB 2.0 में वर्टिकल) स्थिति में चेक करें।',
      '3. न्यूमैटिक पैनल पर PAN-1 एवं PAN-2 कॉक खुले (OPEN) चेक करें।',
      '4. सुनिश्चित करें कि दोनों कैब में Emergency Stop पुश बटन दबा न हो।',
      '5. SB-1 पैनल में MCB 127.12 तथा SB-2 पैनल में कॉन्टैक्टर 130.1 के क्लोजिंग की जांच करें।',
      '6. पैंटो सिलेक्टर स्विच 85 की पोजीशन बदलकर दूसरा पैंटो उठाने का प्रयास करें।'
    ]
  },
  {
    id: 'F0402P1',
    subSystem: 'SS04',
    message: 'HARMONIC FILTER CONTACTOR STUCK / DEFECTS (SS04 - CLW TSD पृष्ठ 26)',
    lamp: 'LSFI फ्लिकर, LSDJ व BPFA जलेंगे',
    effect: 'दोनों लोको का VCB ओपन होगा। हार्मोनिक फिल्टर सर्विस में नहीं आने पर 40 किमी/घंटा स्पीड प्रतिबंध लागू होगा।',
    masterEffect: 'मास्टर व स्लेव दोनों लोको का VCB ट्रिप होगा।',
    slaveEffect: 'स्लेव लोको का VCB भी ट्रिप होगा।',
    actions: [
      '1. उपलब्ध गति (मोमेंटम) से रोलिंग में सेक्शन क्लियर करने का प्रयास करें।',
      '2. ZPT से पैंटो नीचे करें, MCE रीसेट करें। दोनों लोको पर Node 504 की प्रतीक्षा करें।',
      '3. [40 km/h स्पीड प्रतिबंध नियम]: यदि हार्मोनिक फिल्टर सर्विस में नहीं आता है, तो प्रभावित लोको 40 किमी/घंटा प्रतिबंध पर चलेगा। 40 किमी/घंटा से ऊपर दोषपूर्ण लोको का ट्रैक्शन 0 हो जाता है और दूसरा लोको पूरा ट्रैक्शन लेकर सामान्य गति प्राप्त करता है!',
      '4. 1-2 सेक्शन बाद, प्रभावित लोको पर स्विच 154 द्वारा ट्रैक्शन बोगी-1 को आइसोलेट करें; हार्मोनिक फिल्टर सर्विस में आ जाएगा और सामान्य गति पर आधा TE/BE उपलब्ध होगा।'
    ]
  },
  {
    id: 'F0501P1',
    subSystem: 'SS05',
    message: 'HOTEL LOAD CONVERTER-1 DISTURBANCE (SS05 - CLW TSD पृष्ठ 28)',
    lamp: 'BPFA जलेगा, होटल लोड फीडर-A ट्रिप',
    effect: 'HLC-1 ट्रिप होगा, फीडर-A पर होटल लोड बिजली बाधित होगी।',
    actions: [
      '1. थ्रोटल 0 पर लाएं, BPFA दबाकर फॉल्ट एकनॉलेज करें।',
      '2. HB-1 / ऑक्ज़ीलरी पैनल में HLC-1 संबंधित MCBs चेक करें।',
      '3. LSRD कोच के SBC-0195 में, बस कपलर स्विच S2S12 को ऑपरेट कर स्वस्थ कन्वर्टर से पूरी ट्रेन को फीड दें।',
      '4. यदि HLC-1 पुनः चालू न हो, तो स्लेव लोको के HLC से पूरे रैक को पावर सप्लाई दें।'
    ]
  },
  {
    id: 'F0502P1',
    subSystem: 'SS05',
    message: 'HOTEL LOAD CONVERTER-2 DISTURBANCE (SS05 - CLW TSD पृष्ठ 29)',
    lamp: 'BPFA जलेगा, होटल लोड फीडर-B ट्रिप',
    effect: 'HLC-2 ट्रिप होगा, फीडर-B पर कोचों की सप्लाई बाधित होगी।',
    actions: [
      '1. BPFA दबाकर फॉल्ट एकनॉलेज करें।',
      '2. HB-2 में HLC-2 संबंधित MCBs की स्थिति चेक करें।',
      '3. लोको और पावर कार के बीच 13-पिन UIC जंपर केबल कनेक्शन की जांच करें।',
      '4. LSRD कोच SBC-0195 में बस कपलर ऑपरेट कर कोच सप्लाई बहाल रखें।'
    ]
  },
  {
    id: 'F0901P1',
    subSystem: 'SS09',
    message: 'BATTERY VOLTAGE LOW (SS09 - CLW TSD पृष्ठ 37)',
    lamp: 'BPFA जलेगा, वोल्टेज 92V से नीचे',
    effect: 'कंट्रोल वोल्टेज कम होने से लोकोमोटिव इलेक्ट्रॉनिक्स शटडाउन का खतरा।',
    actions: [
      '1. ड्राइविंग कैब में UBA वोल्टमीटर पर बैटरी वोल्टेज देखें।',
      '2. HB-2 में बैटरी चार्जर MCB 100 तथा SB-2 में MCB 110 की जांच करें।',
      '3. यदि वोल्टेज 86V DC से नीचे चला जाए तो कंट्रोल इलेक्ट्रॉनिक्स काम नहीं कर सकता। अगले स्टेशन पर गाड़ी खड़ी कर TLC को सूचित करें।'
    ]
  },
  {
    id: 'F0903P2',
    subSystem: 'SS09',
    message: 'LOW BATTERY CHARGER CURRENT (SS09 - CLW TSD पृष्ठ 39)',
    lamp: 'BPFA प्रकाशित',
    effect: 'बैटरी सही तरीके से चार्ज नहीं हो रही है।',
    actions: [
      '1. BPFA दबाकर फॉल्ट एकनॉलेज करें।',
      '2. UBA मीटर पर निरंतर निगरानी रखें। जब तक बैटरी वोल्टेज 86V DC से ऊपर है तब तक लोको कार्य कर सकता है।',
      '3. TLC से मार्गदर्शन प्राप्त करें। स्लेव लोको में असफल होने पर स्लेव को डेड करें।'
    ]
  },
  {
    id: 'F1004P1',
    subSystem: 'SS10',
    message: 'WRONG CONFIGURATION BRAKE SYSTEM (SS10 - CLW TSD पृष्ठ 44)',
    lamp: 'BPFA प्रकाशित',
    effect: 'मास्टर और स्लेव लोको के बीच ब्रेक सिस्टम कॉन्फ़िगरेशन बेमेल (Mismatch)।',
    actions: [
      '1. दोनों लोको के न्यूमैटिक पैनल पर Cock 70 चेक करें (खुला / OPEN होना चाहिए)।',
      '2. सुनिश्चित करें कि ZBAN स्विच OFF स्थिति में है।',
      '3. CCB 2.0 में: सुनिश्चित करें कि मास्टर ड्राइविंग कैब Lead में हो तथा अन्य सभी कैब Trail मोड में हों।'
    ]
  },
  {
    id: 'F1005P1',
    subSystem: 'SS10',
    message: 'TRACTION WITH AUTO BRAKE NOT ALLOWED (SS10 - CLW TSD पृष्ठ 45)',
    lamp: 'BPFA प्रकाशित, थ्रोटल पावर नहीं लेगा',
    effect: 'ऑटो ब्रेक लगा होने पर थ्रोटल पावर नहीं लेगा (TE = 0)।',
    actions: [
      '1. A-9 ऑटो ब्रेक हैंडल को RUN पोजीशन में रखें।',
      '2. सुनिश्चित करें कि ब्रेक सिलेंडर प्रेशर BC = 0 और BP = 5.0 kg/cm² है।',
      '3. यदि BC प्रेशर 0 पर नहीं आता है, तो न्यूमैटिक पैनल पर TP-BC टेस्ट पॉइंट दबाएं और DV क्विक रिलीज हैंडल चलाएं।'
    ]
  },
  {
    id: 'F1007P1',
    subSystem: 'SS10',
    message: 'REGENERATIVE BRAKE FAILURE (SS10 - CLW TSD पृष्ठ 47)',
    lamp: 'BPFA प्रकाशित',
    effect: 'इलेक्ट्रिक रीजेनरेटिव ब्रेकिंग उपलब्ध नहीं होगी, केवल न्यूमैटिक ब्रेक काम करेंगे।',
    actions: [
      '1. थ्रोटल ‘0’ पर लाएं, A-9 ऑटो ब्रेक हैंडल का उपयोग करें।',
      '2. लोको ब्रेक सिलेंडर प्रेशर को बढ़ने से रोकने के लिए PVEF पैडल का उपयोग करें।',
      '3. दोनों लोको के बीच 22-पिन UIC केबल संचार की जांच करें।'
    ]
  },
  {
    id: 'F1008P1',
    subSystem: 'SS10',
    message: 'EMERGENCY STOP / SHUTDOWN (SS10 - CLW TSD पृष्ठ 48)',
    lamp: 'टोटल शटडाउन, BP = 0, इमरजेंसी ब्रेक',
    effect: 'संपूर्ण शटडाउन और इमरजेंसी ब्रेक का स्वतः अनुप्रयोग।',
    actions: [
      '1. ALP और LP दोनों डेस्क पर Emergency Stop पुश बटन चेक करें।',
      '2. यदि दबा हुआ हो, तो तीर की दिशा में घड़ी की सुई के अनुसार (क्लॉकवाइज) घुमाकर रीसेट करें।',
      '3. BP प्रेशर रीचार्ज करें और निर्धारित प्रक्रिया से लोको पुनः एनरजाइज करें।'
    ]
  },
  {
    id: 'F1101P2',
    subSystem: 'SS11',
    message: 'MCB TRIPPED IN AUX CUBICLE HB-1 (SS11 - CLW TSD पृष्ठ 49)',
    lamp: 'BPFA प्रकाशित',
    effect: 'HB-1 में उपकरण ट्रिप, संबंधित ऑक्ज़ीलरी बंद।',
    actions: [
      '1. SB-1 में MCB 127.2/1 तथा HB-1 में MCBs 54.1/1 (MRB), 62.1/1, 63.1/1, 53.1/1, 59.1/1 की जांच करें।',
      '2. ZNN OFF करें, VCB खोलें, MCB को एक बार रीसेट करें।',
      '3. यदि 54.1/1 बार-बार ट्रिप होती है, तो TLC से संपर्क करें।'
    ]
  },
  {
    id: 'F1103P2',
    subSystem: 'SS11',
    message: 'MCB OF MAIN COMPRESSOR 1 OPEN (SS11 - CLW TSD पृष्ठ 49)',
    lamp: 'BPFA प्रकाशित',
    effect: 'मेन कंप्रेसर MCP-1 कार्य नहीं करेगा।',
    actions: [
      '1. HB-1 में MCB 47.1/1 की जांच करें।',
      '2. यदि ट्रिप हो, तो ZNN OFF करें, VCB खोलें, MCB रीसेट करें।',
      '3. यदि पुनः ट्रिप होती है, तो सिंगल कंप्रेसर (MCP-2) से गाड़ी कार्य करें।',
      '4. यदि 47.1/1 और 47.1/2 बारी-बारी से ट्रिप हों, तो BUR-3 को आइसोलेट करें।'
    ]
  },
  {
    id: 'F1201P2',
    subSystem: 'SS12',
    message: 'MCB TRIPPED IN AUX CUBICLE HB-2 (SS12 - CLW TSD पृष्ठ 50)',
    lamp: 'BPFA प्रकाशित',
    effect: 'HB-2 में उपकरण ट्रिप।',
    actions: [
      '1. SB-2 में MCB 127.2/2 तथा HB-2 में MCBs 54.1/2, 62.1/2, 63.1/2, 53.1/2, 59.1/2 की जांच करें।',
      '2. VCB ओपन करके एक बार ट्रिप्ड MCB रीसेट करें।'
    ]
  },
  {
    id: 'F1202P2',
    subSystem: 'SS12',
    message: 'MCB OF MAIN COMPRESSOR 2 OPEN (SS12 - CLW TSD पृष्ठ 50)',
    lamp: 'BPFA प्रकाशित',
    effect: 'मेन कंप्रेसर MCP-2 कार्य नहीं करेगा।',
    actions: [
      '1. HB-2 में MCB 47.1/2 की जांच करें।',
      '2. ट्रिप होने पर एक बार रीसेट करें, आवश्यकता पड़ने पर सिंगल कंप्रेसर (MCP-1) से कार्य करें।'
    ]
  },
  {
    id: 'P54_CE',
    subSystem: 'GEN',
    message: 'CONTROL ELECTRONICS NOT GETTING ON (कंट्रोल इलेक्ट्रॉनिक्स ऑन न होने पर - पृष्ठ 54)',
    lamp: 'DDU बूट नहीं होगा, नोड नहीं आएगा',
    effect: 'मास्टर या स्लेव लोको का MCE शुरू नहीं होता है।',
    actions: [
      '1. [मास्टर लोको]: SB-2 क्यूबिकल में MCBs 110 और 112.1 की जांच करें। दूसरे कैब से एनरजाइज करने का प्रयास करें।',
      '2. [स्लेव लोको]: दोनों लोको के SB-2 में MCB 110 और 112.1 का ON होना सुनिश्चित करें।',
      '3. लोको और पावर कार के बीच 22-पिन UIC / हार्टिंग जंपर्स की जांच करें।',
      '4. स्लेव लोको को पहले सीधे स्लेव के A पैनल से Node 504 तक एनरजाइज करें, BL चाबी OFF में निकालें (Node 612 दिखाई देगा), फिर मास्टर लोको को एनरजाइज करें।'
    ]
  },
  {
    id: 'P57_THROTTLE',
    subSystem: 'GEN',
    message: 'THROTTLE NOT RESPONDING IN TRACTION (थ्रोटल रिस्पॉन्ड न करने पर - पृष्ठ 57)',
    lamp: 'TE/BE मीटर 0 दर्शाएगा',
    effect: 'थ्रोटल देने पर भी ट्रैक्शन करंट नहीं आता है।',
    actions: [
      '1. दोनों ट्रैक्शन बोगी मीटर 0 दर्शा रहे हों तो BPCS (कांस्टेंट स्पीड) बटन दबाकर स्पीड होल्ड रिलीज करें।',
      '2. रिवर्सर (MPJ) को Forward -> 0 -> Forward साइकिल करें।',
      '3. ZNN स्विच को OFF पर टॉगल करें, BLDJ द्वारा VCB खोलें और पुनः बंद करें।',
      '4. चेक करें कि पार्किंग ब्रेक या VCD पेनाल्टी ब्रेक तो नहीं लगा है।'
    ]
  },
  {
    id: 'P58_HOTEL_LOAD_SLAVE',
    subSystem: 'GEN',
    message: 'HOTEL LOAD NOT COMING FROM HLC- 2/1 OF SLAVE LOCO (स्लेव लोको से होटल लोड न आना - पृष्ठ 58)',
    lamp: 'स्लेव HLC आउटपुट 0',
    effect: 'स्लेव लोको के HLC-2/1 से रैक को होटल लोड आपूर्ति नहीं मिलती।',
    actions: [
      '1. IVC 500A कपलर ठीक से फिट है या नहीं जांचें।',
      '2. Hotel Load UIC कपलर सही प्रकार से फिट है या नहीं जांचें।',
      '3. Hotel Load UIC कपलर पिनों की भली-भांति जांच करें और सुनिश्चित करें कि कपलर में कोई विकृति/मुड़ाव (deformity) न हो।',
      '4. अगले हॉल्ट पर: मास्टर में थ्रोटल 0, MPJ Neutral, SA-9 ON, A-9 Emergency, VCB ओपन, पैंटो डाउन, SB-2 में 110 व 112.1 OFF। स्लेव में 110 व 112.1 OFF।',
      '5. UIC कपलर पिन की समस्या को ठीक करें, फिर दोनों लोको में 110 व 112.1 ON कर बैटरी चालू करें।',
      '6. मास्टर से एनरजाइज करें। सफल होने पर दोनों लोको से चलें, असफल होने पर स्लेव को DEAD कर सिंगल लोको से ट्रेन चलाएं।'
    ]
  },
  {
    id: 'P59_E70_BRAKE',
    subSystem: 'SS10',
    message: 'E-70 BRAKE SYSTEM COCK POSITIONS IN PUSH-PULL (E-70 कॉक स्थितियां - पृष्ठ 59)',
    lamp: 'BP / BC प्रेशर नियंत्रण',
    effect: 'पुश-पुल में ब्रेक पाइप और ब्रेक रिलीज की शुद्ध कार्यप्रणाली।',
    actions: [
      '1. [मास्टर लोको]: Cock No. 70: OPEN (BP चार्जिंग), Cock No. 74: OPEN, Cock No. 136: OPEN (BP कंट्रोल), Cock No. 47: CLOSED, IG-38: Horizontal।',
      '2. [स्लेव लोको]: Cock No. 70: OPEN, Cock No. 74: OPEN, Cock No. 136: STRICTLY CLOSED (अनिवार्य रूप से बंद), Cock No. 47: CLOSED (केवल स्लेव को डेड करने पर खोलें)।',
      '3. सावधानी: यदि स्लेव लोको का Cock-136 खुला रह जाएगा तो BP मेंटेन नहीं होगा और स्लेव में निरंतर ब्रेक बाइंडिंग होगी।'
    ]
  },
  {
    id: 'P60_CCB_BRAKE',
    subSystem: 'SS10',
    message: 'KNORR CCB 2.0 BRAKE SYSTEM IN PUSH-PULL (CCB 2.0 नियम - पृष्ठ 60)',
    lamp: 'CCB 2.0 मोड डिस्प्ले',
    effect: 'माइक्रोप्रोसेसर आधारित ब्रेक सिस्टम का सुचारू पुश-पुल संचालन।',
    actions: [
      '1. [मास्टर लोको]: ड्राइविंग कैब में मोड सिलेक्टर स्विच LEAD में, नॉन-ड्राइविंग रियर कैब में TRAIL में।',
      '2. [स्लेव लोको]: ड्राइविंग और नॉन-ड्राइविंग दोनों कैब में मोड सिलेक्टर स्विच TRAIL में रखें।',
      '3. स्लेव लोको A-9 हैंडल: Full Service (FS) में रखकर लॉक करें।',
      '4. स्लेव लोको SA-9 हैंडल: दोनों कैब में RELEASE पोजीशन में रखें।',
      '5. CCB इलेक्ट्रॉनिक्स फेल होने पर: PTDC (Pneumatic Trail Direct Control) मोड का उपयोग करें।'
    ]
  },

  
  {
    id: "P05_PREPARATION_SLAVE",
    subSystem: "GEN",
    message: "PREPARATION OF SLAVE LOCO FOR PUSH-PULL SERVICE (स्लेव लोको की प्रारंभिक तैयारी - CLW TSD पृष्ठ 5)",
    lamp: "प्रारंभिक तैयारी / न्यूमैटिक व इलेक्ट्रिकल सेटअप",
    effect: "पुश-पुल सेवा के लिए स्लेव लोको की सही व सुरक्षित तैयारी।",
    actions: [
      "1. एकल लोको प्रक्रिया के अनुसार स्लेव लोको का प्रारंभिक निरीक्षण करें।",
      "2. सुनिश्चित करें कि MU और HLC के लिए UIC जंपर्स तथा ट्रेन व लोको के बीच होटल लोड के लिए IVC जंपर्स सही तरीके से जुड़े और लॉक हैं।",
      "3. पावर कार से जुड़े BP और FP एयर पाइप चेक करें और एंगल कॉक खुली (OPEN) स्थिति में रखें।",
      "4. स्लेव न्यूमैटिक पैनल: E-70 में कॉक 70, 74, IG-38 खुले (OPEN), कॉक 136 और 47 अनिवार्य रूप से बंद (STRICTLY CLOSED)! CCB 2.0 में दोनों कैब 'Trail' मोड में, SIFA कॉक खुला।",
      "5. ब्रेक हैंडल सेटअप: E-70 में दोनों कैब SA-9 RELEASE में, A-9 निकाल लें या Neutral में। CCB 2.0 में A-9 Full Service (FS) में लॉक, मोड 'Trail', SA-9 RELEASE।",
      "6. इलेक्ट्रिकल क्यूबिकल SB-2 सेटअप: MCB 110 (बैटरी चार्जर) और MCB 112.1 (MCE) ON / SET स्थिति में हों।"
    ]
  },
  {
    id: "P06_PREPARATION_MASTER",
    subSystem: "GEN",
    message: "PREPARATION OF MASTER LOCO FOR PUSH-PULL SERVICE (मास्टर लोको की प्रारंभिक तैयारी - CLW TSD पृष्ठ 6)",
    lamp: "प्रारंभिक तैयारी / मास्टर ड्राइविंग सेटअप",
    effect: "पुश-पुल सेवा के लिए मुख्य ड्राइविंग लोको की तैयारी।",
    actions: [
      "1. मानक सिंगल लोको ऑपरेटिंग प्रक्रिया अनुसार मास्टर लोको का निरीक्षण करें।",
      "2. मास्टर लोको और ट्रेन के बीच 22-पिन UIC पुश-पुल जंपर्स, 13-पिन HLC जंपर्स तथा 500A IVC जंपर्स कनेक्ट और लॉक चेक करें।",
      "3. BP और FP होज़ जुड़े हों, एंगल कॉक खुली (OPEN) स्थिति में हों।",
      "4. मास्टर न्यूमैटिक पैनल: E-70 में कॉक 70, 74, और 136 OPEN स्थिति में, IG-38 OPEN, कॉक 47 CLOSED। CCB 2.0 में ड्राइविंग कैब 'Lead' में, रियर कैब 'Trail' में।",
      "5. इलेक्ट्रिकल क्यूबिकल SB-2 सेटअप: MCB 110 (बैटरी चार्जर) और MCB 112.1 (कंट्रोल इलेक्ट्रॉनिक्स) ON / SET स्थिति में।",
      "6. WTB रिपीटर्स के लिए पावर कार/LSRD में कोच बैटरी वोल्टेज (>110V DC) स्वस्थ होने की पुष्टि करें।"
    ]
  },
  {
    id: "P07_ENERGIZATION_PUSHPULL",
    subSystem: "GEN",
    message: "ENERGIZATION OF LOCOMOTIVES FOR PUSH-PULL (पुश-पुल एनरजाइजेशन प्रक्रिया - CLW TSD पृष्ठ 7)",
    lamp: "ADD BL, ADD LSDJ, ADD BPFA",
    effect: "मास्टर कैब से स्लेव और मास्टर दोनों लोकोमोटिव्स का सुरक्षित बूटिंग व एनरजाइजेशन।",
    actions: [
      "1. मास्टर ड्राइविंग कैब में, 'D' पैनल पर दिए गए ADD BL स्लॉट में BL Key डालें।",
      "2. BL Key को 'OFF' से 'D' पर घुमाएं।",
      "3. ADD LSDJ प्रकाशित होगा, जो दर्शाता है कि स्लेव लोको कंट्रोल इलेक्ट्रॉनिक्स ON हो गए हैं।",
      "4. स्लेव लोको कॉन्फ़िगरेशन शुरू: ADD BPFA प्रकाशित होकर 35-45 सेकंड में बुझ जाएगा।",
      "5. ADD BPFA बुझने के बाद, BL Key को 'D' से 'OFF' करके निकाल लें।",
      "6. BL Key को मास्टर लोको के मुख्य BL स्लॉट ('A' पैनल) में डालकर 'D' पर ले जाएं।",
      "7. मास्टर लोको MCE बूट होगा और स्लेव DDU पर 'Self hold mode active' संदेश आएगा।",
      "8. दोनों लोको का Node 504 आने के बाद ZPT द्वारा पैंटोग्राफ उठाएं।"
    ]
  },
  {
    id: "P08_DDU_NODE_PROGRESSION",
    subSystem: "GEN",
    message: "DDU NODE PROGRESSION IN PUSH-PULL (नोड प्रोग्रेशन - CLW TSD पृष्ठ 8)",
    lamp: "Node 504 -> 550 -> 570 -> 590 -> 596",
    effect: "पुश-पुल में दोनों लोको का चरणबद्ध नोड प्रोग्रेशन।",
    actions: [
      "• Node 504: दोनों लोको प्रारंभिक कॉन्फ़िगरेशन पूरा करते हैं, मास्टर DDU पर Node 504 और Slv: 504 दिखता है। दोनों पैंटो उठने के लिए तैयार हैं।",
      "• Node 550: मास्टर से ZPT स्विच दबाने पर दोनों लोको के पैंटोग्राफ उठते हैं।",
      "• Node 570: BLDJ क्लोज करने पर दोनों लोको का VCB बंद होता है, OHE वोल्टेज U-मीटर पर दिखता है।",
      "• Node 590: ऑक्सिलरी कन्वर्टर्स BUR-1, BUR-2, BUR-3 शुरू होते हैं, कंप्रेसर व ब्लोअर्स चालू होते हैं।",
      "• Node 596: ड्राइविंग मोड तैयार, रिवर्सर MPJ आगे करने पर ट्रैक्शन करंट के लिए पूर्णतः तैयार।"
    ]
  },
  {
    id: "P10_MAKING_SLAVE_DEAD",
    subSystem: "GEN",
    message: "MAKING SLAVE LOCO DEAD (स्लेव लोको को डेड करने की प्रक्रिया - CLW TSD पृष्ठ 10 व 11)",
    lamp: "डेड लोको कॉक 47 OPEN, कॉक 136 CLOSED",
    effect: "खराबी आने पर स्लेव लोको को सुरक्षित रूप से डेड कर केवल मास्टर लोको से गाड़ी कार्य करना।",
    actions: [
      "1. यार्ड/स्टेशन पर: स्लेव न्यूमैटिक पैनल पर कॉक 70 व 74 बंद करें, कॉक 47 (डेड लोको कॉक) खोलें (OPEN)।",
      "2. CCB 2.0 में डेड इंजन कॉक खोलें। दोनों कैब में SA-9 RELEASE में रखें।",
      "3. स्लेव SB-2 में MCB 112.1 व 110 ट्रिप करें। मास्टर DDU से Train Bus Isolate करें।",
      "4. रनिंग ब्लॉक सेक्शन में: स्लेव 100 मिनट तक Self Hold Mode में रहता है। 100 मिनट में सुरक्षित स्थान पर खड़ी कर कॉक 47 खोलें व SA-9 रिलीज करें।"
    ]
  },
  {
    id: "P12_CAB_CHANGING",
    subSystem: "GEN",
    message: "CHANGING MASTER LOCO TO SLAVE AND SLAVE TO MASTER (कैब बदलना / रिवर्सल - CLW TSD पृष्ठ 12)",
    lamp: "Push-Pull Cab Changing Procedure",
    effect: "टर्मिनल स्टेशन पर गाड़ी की दिशा बदलना (Master -> Slave और Slave -> Master)।",
    actions: [
      "1. वर्तमान मास्टर लोको में (जो स्लेव बनेगा): गाड़ी रोककर SA-9/A-9 लगाएं, थ्रोटल 0, VCB ओपन, पैंटो डाउन। कॉक 136 बंद (CLOSED) करें, कॉक 70 व 74 OPEN रखें। दोनों कैब SA-9 RELEASE करें। BL चाबी निकालें।",
      "2. नए मास्टर लोको में (जो पहले स्लेव था): कॉक 136 खोलें (OPEN)! ड्राइविंग कैब में BL Key 'D' पर ले जाएं। CCB 2.0 में कैब को 'Lead' मोड में सेट करें। Node 504 आने पर सामान्य रूप से एनरजाइज करें।"
    ]
  }
];
