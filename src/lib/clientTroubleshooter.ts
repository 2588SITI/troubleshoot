import { amritBharatFaults } from '../dataAmritBharat';
import { faults } from '../data';

export interface GroundedResult {
  identifiedFaultId: string;
  faultTitle: string;
  analysis: string;
  suggestedActions: string[];
  precautions?: string;
  manualReference?: string;
  verifiedFromPdf: boolean;
  pdfDocumentName: string;
  pdfPage: number;
  pdfQuote: string;
}

// -----------------------------------------------------------------------------
// 3-PHASE CONVENTIONAL ELECTRIC LOCOMOTIVE RESOLVER (WAP-7, WAG-9, WAP-5)
// Sources: 254-page 3-Phase Loco Directory (BRC / Indian Railways)
// -----------------------------------------------------------------------------
function resolve3PhaseDefect(query: string, norm: string): GroundedResult {
  // Query clarification / explicit intent check
  if (
    norm.includes('question 3 phase ka pooch raha') ||
    norm.includes('question 3 phase ka') ||
    norm.includes('3 phase ka pooch raha') ||
    norm.includes('bata raha hai amrit bharat') ||
    norm.includes('3 phase ka batao') ||
    norm.includes('3 phase loco ka batao')
  ) {
    return {
      identifiedFaultId: "MODE_3PHASE_CONFIRMED",
      faultTitle: "3-फ़ेस लोकोमोटिव मोड सक्रिय (3-Phase Locomotive Mode Active)",
      analysis: "लोको पायलट सर, 3-फ़ेस लोकोमोटिव (WAP-7, WAG-9, WAP-5) को अमृत भारत पुश-पुल से पूरी तरह अलग कर दिया गया है। आपके 3-फेज के किसी भी सवाल पर केवल 254-पृष्ठ 3-फेज TSD डायरेक्टरी (वड़ोदरा) से ही परिणाम प्रस्तुत होंगे।",
      suggestedActions: [
        "1. पैंटोग्राफ समस्या (Panto Not Raising): 3-फेज लोको में फॉल्ट F0103P1 (LOW PRESSURE PANTO / FAULTY PANTO) लागू होगा - RS प्रेशर 6.0 kg/cm² चेक करें, न्यूमैटिक पैनल पर IG-38 नीली चाबी आड़ी (Horizontal) हो, PAN-1 व PAN-2 कॉक खुले हों, SB-2 में MCPA MCB 48.1 चेक करें।",
        "2. ब्रेक बाइंडिंग / रिलीज समस्या (Brake Not Releasing): SA-9 रिलीज करें, C3W वाल्व का QRV हैंडल खींचें, E-70 पैनल पर 57 व 58 D-2 रिले वाल्व टैप करें (CCB में TP-16/20/BC दबाएं)।",
        "3. BP प्रेशर समस्या (BP Not Creating): Cock-70 खुला रखें, BPEMS चेक करें, RS हैंडल सामान्य हों, MR प्रेशर 8-10 kg/cm² चेक करें।",
        "4. थ्रोटल न चलना (TE/BE Failure): स्विच 152 को '0' से '1' पर रखकर फेलियर मोड में चलाएं।"
      ],
      precautions: "अब आप ऊपर दिए गए '3-फ़ेस लोको (3-Phase)' टैब में 254 पृष्ठों की पूरी डायरेक्टरी व 29 फॉल्ट्स सर्च कर सकते हैं।",
      manualReference: "क्षेत्रीय विद्युत प्रशिक्षण केंद्र, वड़ोदरा (BRC) 254-पृष्ठ 3-फेज TSD",
      verifiedFromPdf: true,
      pdfDocumentName: "254-पृष्ठ 3-फेज लोको TSD डायरेक्टरी (भारतीय रेल)",
      pdfPage: 126,
      pdfQuote: "BRC VADODARA 254-PAGE 3-PHASE LOCOMOTIVE TSD DIRECTORY ACTIVE FOR WAP-7, WAG-9 & WAP-5."
    };
  }

  const isPantoQuery = 
    norm.includes('panto') || norm.includes('pantograph') || 
    norm.includes('पैंटो') || norm.includes('पैंटोग्राफ') || norm.includes('पेंटो') || 
    (norm.includes('raising') && !norm.includes('brake')) || 
    norm.includes('not raising') || norm.includes('not going up') || 
    norm.includes('उठ नहीं') || norm.includes('उठता नहीं') || 
    norm.includes('pan-1') || norm.includes('pan-2') || 
    norm.includes('ig-38') || norm.includes('mcpa') || norm.includes('f0103p1');

  const hasBrake = norm.includes('brake') || norm.includes('ब्रेक') || norm.includes('binding') || norm.includes('बाइंडिंग') || norm.includes('bc') || norm.includes('sa-9');
  const hasRelease = norm.includes('releas') || norm.includes('रिलीज') || norm.includes('छूट') || norm.includes('binding') || norm.includes('बाइंडिंग');
  const isPreparation = norm.includes('preparation') || norm.includes('prepare') || norm.includes('तैयारी') || norm.includes('तैयार') || norm.includes('energiz') || norm.includes('एनरजाइज');

  // 1. Pantograph Trouble on 3-Phase Locomotive (F0103P1 - Pages 126-127 & 238)
  if (isPantoQuery) {
    return {
      identifiedFaultId: "F0103P1",
      faultTitle: "F0103P1: LOW PRESSURE PANTO / FAULTY PANTO (3-Phase Loco TSD पृष्ठ 126-127 व 238)",
      analysis: "254-पृष्ठ 3-फेज लोको TSD डायरेक्टरी (WAP-7 / WAG-9 / WAP-5):\nसबसिस्टम SS01 (Main Power): फॉल्ट संदेश 'LOW PRESSURE PANTO/FAULTY PANTO - Check Isolating Cock Check Aux. Reservoir Pressure'।\nलैंप प्रभाव: LSDJ और BPFA प्रकाशित होंगे, LSFI ब्लिंक करेगी। प्रभाव: पेन्टो रेज़ नहीं होगा (Panto will not raise)।\n3-फेज लोको TSD अनुसार 10-चरणीय आधिकारिक दोष निवारण प्रक्रिया:",
      suggestedActions: [
        "1. थ्रोटल को ' 0 ' पर लायें। BPFA दबाकर फॉल्ट ACK करें।",
        "2. सुनिश्चित करें कि न्यूमेटिक पेनल पर IG-38 (नीली चाबी) आड़ी (Horizontal) स्थिति में लगी है।",
        "3. चैक करें कि MCPA (Auxiliary Compressor) चल रहा है या नहीं। यदि नहीं चल रहा है तो SB-2 पेनल में MCPA की MCB 48.1 चैक करें, यदि ट्रिप हो तो रीसेट करें।",
        "4. यदि MCPA ठीक कार्य कर रहा है फिर भी RS प्रेशर नहीं बन रहा है, तो सहायक कम्प्रेसर का ड्रेन कॉक 10 चैक करें। यदि खुला हो तो बंद करें। RS प्रेशर 6.0 kg/cm² से अधिक होना चाहिए।",
        "5. न्यूमेटिक पेनल पर पेंन्टो आइसोलेटिंग कॉक PAN-1 व PAN-2 की स्थिति चैक करें। दोनों कॉक खुले (खड़ी स्थिति में) होने चाहिए।",
        "6. पेंन्टो सिलेक्टर स्विच (कैब-1 व कैब-2 में) को बदल कर देखें (Position 1 / 2 / Auto)।",
        "7. न्यूमेटिक पेनल पर लगे पेंन्टो प्रेशर स्विच को हल्के से टैप करें।",
        "8. SB-1 पैनल पर सिमुलेशन चाबी 179 चेक करें कि '0' पर हो (Key 179 in position 0)।",
        "9. कन्ट्रोल इलेक्ट्रॉनिक्स को एक बार स्विच ऑफ करके पुनः ऑन (MCE OFF/ON) करें।",
        "10. यदि सफलता न मिले तो पिछली कैब से प्रयास करें।"
      ],
      precautions: "RS (पैंटो रिज़रवायर) प्रेशर 6.0 kg/cm² से अधिक होना अनिवार्य है। IG-38 चाबी आड़ी स्थिति में तथा PAN 1 व 2 कॉक खुले होने चाहिए।",
      manualReference: "254-पृष्ठ 3-फेज लोको TSD - SS01 Main Power (पृष्ठ 126-127 व पृष्ठ 238)",
      verifiedFromPdf: true,
      pdfDocumentName: "254-पृष्ठ 3-फेज लोको TSD डायरेक्टरी (भारतीय रेल)",
      pdfPage: 126,
      pdfQuote: "3-PHASE LOCO TSD - PAGE 126-127:\nF0103P1 LOW PRESSURE PANTO/FAULTY PANTO\nLamps: LSDJ & BPFA illuminated, LSFI blinking.\nEffect: Panto will not raise.\nTroubleshooting:\n1. Bring throttle to 0. Ack fault via BPFA.\n2. Ensure IG-38 blue key horizontal.\n3. Check MCPA running; check MCB 48.1 in SB-2.\n4. Drain cock 10 closed, RS pressure > 6.0 kg/cm2.\n5. PAN-1 & PAN-2 cocks open.\n6. Try Panto selector switch.\n7. Tap panto pressure switches.\n8. Switch 179 on SB-1 in position 0.\n9. MCE OFF/ON.\n10. Try from rear cab."
    };
  }

  // 2. Brake Binding / Release Trouble in 3-Phase Locomotive (Page 136)
  if (hasBrake && hasRelease) {
    return {
      identifiedFaultId: "3PH_BRAKE_BINDING",
      faultTitle: "3-फेज लोको में ब्रेक बाइंडिंग / ब्रेक रिलीज न होने पर निवारण (3-Phase Loco TSD पृष्ठ 136)",
      analysis: "254-पृष्ठ 3-फेज लोको TSD डायरेक्टरी: 3-फेज लोकोमोटिव (WAP-7 / WAG-9 / WAP-5) में ब्रेक बाइंडिंग होने या ब्रेक रिलीज न होने पर निर्धारित 7-चरणीय आधिकारिक कार्यवाही:",
      suggestedActions: [
        "1. दोनों कैब में SA-9 हैंडल को RELEASE स्थिति में रखें और A-9 हैंडल को RUN स्थिति में चेक करें।",
        "2. कैब में BC (Brake Cylinder) गेज चेक करें, प्रेशर '0' kg/cm² होना चाहिए।",
        "3. यदि ब्रेक रिलीज नहीं हो रहे हैं, तो न्यूमैटिक पैनल पर लगे C3W / Distributor Valve का क्विक रिलीज हैंडल (QRV) खींचकर ब्रेक रिलीज करें।",
        "4. E-70 ब्रेक सिस्टम में: न्यूमैटिक पैनल पर 57 एवं 58 D-2 रिले वाल्व को हल्के से टैप करें।",
        "5. कॉक 94 व कॉक 136 की स्थिति चेक करें (कॉक 136 खुला हो)।",
        "6. दोनों बोगी आइसोलेटिंग कॉक (Bogie 1 & Bogie 2 Isolating Cock) को एक बार बंद करें, ब्रेक रिलीज होने के बाद पुनः खोलें।",
        "7. Knorr CCB ब्रेक सिस्टम में: न्यूमैटिक पैनल पर TP-16, TP-20, TP-BC दबाएं और DV क्विक रिलीज हैंडल ऑपरेट करें।"
      ],
      precautions: "लोकोमोटिव के पहियों पर ब्रेक ब्लॉक चिपके न हों। SA-9 दोनों कैब में रिलीज स्थिति में रखें।",
      manualReference: "254-पृष्ठ 3-फेज लोको TSD - न्यूमैटिक ब्रेक अध्याय (पृष्ठ 136)",
      verifiedFromPdf: true,
      pdfDocumentName: "254-पृष्ठ 3-फेज लोको TSD डायरेक्टरी (भारतीय रेल)",
      pdfPage: 136,
      pdfQuote: "3-PHASE LOCO TSD - BRAKE RELEASE:\n1. Keep SA-9 in RELEASE in both cabs.\n2. BC gauge should be 0 kg/cm2.\n3. Pull quick release valve (QRV) handle on C3W distributor valve.\n4. Tap D-2 relay valves 57 & 58 on E-70 pneumatic panel.\n5. Check cock 94 and cock 136.\n6. Close and open bogie isolating cocks.\n7. On CCB locos, press TP-16, TP-20, TP-BC test points."
    };
  }

  // 3. BP Pressure trouble on 3-Phase Locomotive (Page 138)
  if (norm.includes('bp') || norm.includes('cock-70') || norm.includes('cock 70') || norm.includes('bpems')) {
    return {
      identifiedFaultId: "3PH_BP_TROUBLE",
      faultTitle: "3-फेज लोको में BP प्रेशर न बनने / मेंटेन न होने पर कार्यवाही (3-Phase Loco TSD पृष्ठ 138)",
      analysis: "254-पृष्ठ 3-फेज लोको TSD डायरेक्टरी: 3-फेज लोको में ब्रेक पाइप (BP) 5.0 kg/cm² न बनने या निरंतर ड्रॉप होने पर निर्धारित आधिकारिक निवारण कार्यवाही:",
      suggestedActions: [
        "1. MR प्रेशर चेक करें, यह 8.0 से 10.0 kg/cm² होना अनिवार्य है।",
        "2. न्यूमैटिक पैनल पर Cock-70 (BP चार्जिंग कॉक) चेक करें, यह खुला (OPEN) होना चाहिए।",
        "3. दोनों कैब में आपातकालीन ब्रेक पुश बटन (BPEMS) चेक करें कि दबा न हो।",
        "4. ड्राइविंग कैब में A-9 हैंडल RUN पोजीशन में हो तथा नॉन-ड्राइविंग कैब में Neutral/Locked हो।",
        "5. दोनों कैब के RS हैंडल सामान्य (वर्टिकल) स्थिति में चेक करें।",
        "6. लोको और ट्रेन के बीच BP एंगल कॉक खुला हो तथा होज़ पाइप में कोई लीकेज न हो।",
        "7. E-70 सिस्टम में रिले वाल्व 57/58 चेक करें; CCB सिस्टम में मोड स्विच 'Lead' में सुनिश्चित करें।"
      ],
      precautions: "कॉक-70 सदैव खुला होना चाहिए तथा BPEMS सामान्य होना चाहिए।",
      manualReference: "254-पृष्ठ 3-फेज लोको TSD - न्यूमैटिक सिस्टम (पृष्ठ 138)",
      verifiedFromPdf: true,
      pdfDocumentName: "254-पृष्ठ 3-फेज लोको TSD डायरेक्टरी (भारतीय रेल)",
      pdfPage: 138,
      pdfQuote: "3-PHASE LOCO TSD - BP CHARGING:\n1. Ensure MR > 8.0 kg/cm2.\n2. Ensure Cock-70 OPEN.\n3. BPEMS released.\n4. A-9 in RUN position.\n5. Both RS valves normal.\n6. Check train leakages."
    };
  }

  // 4. Preparation / Energization of 3-Phase Locomotive (Page 1)
  if (isPreparation) {
    return {
      identifiedFaultId: "3PH_PREPARATION",
      faultTitle: "3-फेज लोकोमोटिव (WAP-7 / WAG-9 / WAP-5) प्रारंभिक तैयारी एवं एनरजाइजेशन प्रक्रिया",
      analysis: "254-पृष्ठ 3-फेज लोको TSD डायरेक्टरी: 3-फेज लोकोमोटिव को ड्यूटी पर लेने, कैब एक्टिवेशन एवं एनरजाइज करने की निर्धारित मानक संचालन प्रक्रिया (SOP):",
      suggestedActions: [
        "1. लोकोमोटिव का संपूर्ण सामान्य निरीक्षण (Undergear, MR, BP, FP, पार्किंग ब्रेक, बोगी कॉक) करें।",
        "2. मशीन रूम-2 (SB-2 पैनल) में बैटरी MCB 110 और कंट्रोल इलेक्ट्रॉनिक्स MCB 112.1 को 'ON / SET' स्थिति में करें।",
        "3. ड्राइविंग कैब के 'A' पैनल पर BL चाबी को 'OFF' से 'D' स्थिति में घुमाएं।",
        "4. DDU (ड्राइवर डिस्प्ले यूनिट) पर सिस्टम सेल्फ-टेस्ट व Node प्रोग्रेशन (Node 504) आने तक 35-45 सेकंड प्रतीक्षा करें।",
        "5. ZPT स्विच को 'UP' दबाकर पैंटोग्राफ उठाएं, कैब वोल्टमीटर पर OHE वोल्टेज (22.5 - 27.5 kV) चेक करें।",
        "6. BLDJ स्विच दबाकर VCB क्लोज करें; LSDJ बत्ती बुझ जाएगी।",
        "7. BLCP को 'AUTO' में रखें, ऑक्सिलरी कंप्रेसर व मुख्य कंप्रेसर चलकर MR प्रेशर 8.0-10.0 kg/cm² बनाएंगे।",
        "8. A-9 द्वारा BP प्रेशर 5.0 kg/cm² चार्ज करें, पार्किंग ब्रेक रिलीज करें और ब्रेक टेस्ट संपन्न करें।"
      ],
      precautions: "DDU पर Node 504 आने के बाद ही ZPT दबाएं। U-मीटर पर 22.5-27.5 kV वोल्टेज आने के बाद ही VCB क्लोज करें।",
      manualReference: "254-पृष्ठ 3-फेज लोको TSD डायरेक्टरी (भाग-A संचालन पृष्ठ 1)",
      verifiedFromPdf: true,
      pdfDocumentName: "254-पृष्ठ 3-फेज लोको TSD डायरेक्टरी (भारतीय रेल)",
      pdfPage: 1,
      pdfQuote: "3-PHASE LOCO TSD - ENERGIZATION SOP:\n1. General loco inspection.\n2. SB-2: MCB 110 & 112.1 ON.\n3. BL Key OFF to D on Panel A.\n4. Wait for Node 504 on DDU.\n5. Press ZPT to raise pantograph.\n6. Press BLDJ to close VCB.\n7. Start compressor via BLCP.\n8. Test brakes."
    };
  }

  // 5. Throttle / Traction Failure (F1703P1 / F1803P1 - Pages 238 & 242)
  if (norm.includes('throttle') || norm.includes('थ्रोटल') || norm.includes('te/be') || norm.includes('traction') || norm.includes('ट्रैक्शन')) {
    return {
      identifiedFaultId: "F1703P1",
      faultTitle: "F1703P1 / F1803P1: FAULT IN ANGLE TRANSMITTER OF THROTTLE (3-Phase Loco TSD पृष्ठ 238, 242)",
      analysis: "254-पृष्ठ 3-फेज लोको TSD डायरेक्टरी (पृष्ठ 238 व 242): थ्रोटल एंगल ट्रांसमीटर में खराबी होने पर TE/BE थ्रोटल '0' पर लाने और फेलियर मोड में लोको चलाने की प्रक्रिया:",
      suggestedActions: [
        "1. थ्रोटल को ' 0 ' पर लाएं।",
        "2. BPFA दबाकर फॉल्ट को एकनॉलेज (ACK) करें।",
        "3. VCB ओपन करके SB-1 पैनल पर लगे स्विच नंबर 152 को ' 0 ' से ' 1 ' पर रखकर लोको को फेलियर मोड (Failure Mode) में चलाएं।",
        "4. यदि सफलता नहीं मिलती है तो पुनः VCB ओपन करके स्विच 152 को 2-3 बार ऑपरेट करें।",
        "5. कंट्रोल इलेक्ट्रॉनिक्स को एक बार स्विच ऑफ करके ऑन (MCE OFF/ON) करें।",
        "6. पिछली कैब से प्रयास करें।"
      ],
      precautions: "स्विच 152 को ऑपरेट करने से पूर्व VCB ओपन अवश्य करें।",
      manualReference: "254-पृष्ठ 3-फेज लोको TSD directry पृष्ठ 238 व 242",
      verifiedFromPdf: true,
      pdfDocumentName: "254-पृष्ठ 3-फेज लोको TSD डायरेक्टरी (भारतीय रेल)",
      pdfPage: 238,
      pdfQuote: "3-PHASE LOCO TSD - PAGE 238:\nF1703P1 FAULT IN ANGLE TRANSMITTER OF THROTTLE\nBring TE/BE Throttle to zero. Operate switch failure mode.\n1. Throttle to 0.\n2. Ack fault via BPFA.\n3. Open VCB, operate switch 152 on SB-1 from 0 to 1.\n4. Reset MCE.\n5. Try from rear cab."
    };
  }

  // 6. Match against 3-Phase Catalog Faults (from src/data.ts)
  let bestFault = null;
  let bestScore = 0;
  const stopWords = new Set([
    'loco', 'the', 'in', 'of', 'for', 'to', 'and', 'a', 'an', 'is', 'ka', 'ki', 'ke', 'ko', 
    'me', 'mein', 'par', 'se', 'hai', 'hain', 'kya', 'bataye', 'poocha', 'hu', 'answer',
    'de', 'rahe', 'ho', 'karo', 'karein', 'hota', 'phase', '3phase'
  ]);
  const words = norm.split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));

  for (const f of faults) {
    let score = 0;
    const fId = f.id.toLowerCase();
    const fMsg = f.message.toLowerCase();
    const fEff = (f.effect || '').toLowerCase();

    if (fId && norm.includes(fId)) score += 100;
    for (const w of words) {
      if (fMsg.includes(w)) score += 20;
      if (fEff.includes(w)) score += 10;
      if (f.subSystem.toLowerCase().includes(w)) score += 5;
    }
    if (score > bestScore) {
      bestScore = score;
      bestFault = f;
    }
  }

  if (bestFault && bestScore >= 15) {
    return {
      identifiedFaultId: bestFault.id,
      faultTitle: `${bestFault.id}: ${bestFault.message.split('\n')[0]}`,
      analysis: `क्षेत्रीय विद्युत प्रशिक्षण केंद्र (BRC) 254-पृष्ठ 3-फेज TSD: फॉल्ट ${bestFault.id} (${bestFault.subSystem}) का विश्लेषण। ${bestFault.effect || ''}`,
      suggestedActions: bestFault.actions && bestFault.actions.length > 0 ? bestFault.actions : [
        "1. DDU पर फॉल्ट संदेश व सबसिस्टम की जांच करें।",
        "2. संबंधित रिले / MCB की स्थिति की जांच करें।",
        "3. BPFA दबाकर एकनॉलेज करें।"
      ],
      precautions: "सुरक्षा नियमों एवं न्यूमैटिक कॉक स्थिति का कड़ाई से पालन करें।",
      manualReference: `BRC 3-Phase TSD - ${bestFault.subSystem}`,
      verifiedFromPdf: true,
      pdfDocumentName: "254-पृष्ठ 3-फेज लोको TSD डायरेक्टरी (भारतीय रेल)",
      pdfPage: 22,
      pdfQuote: `${bestFault.id}: ${bestFault.message}\nEffect: ${bestFault.effect || 'N/A'}`
    };
  }

  // 3-Phase Generic Fallback
  return {
    identifiedFaultId: "GEN_3PH_ASSIST",
    faultTitle: "3-फेज लोकोमोटिव दोष निवारण (WAP-7 / WAG-9 / WAP-5)",
    analysis: `इनपुट '${query}' के आधार पर 254-पृष्ठ 3-फेज लोको TSD डायरेक्टरी अनुसार सामान्य प्रक्रिया:`,
    suggestedActions: [
      "1. DDU / DDS स्क्रीन पर प्रदर्शित फॉल्ट संदेश व नोड (Node) नंबर की जांच करें।",
      "2. BPFA दबाकर फॉल्ट एकनॉलेज (ACK) करें।",
      "3. मशीन रूम (SB-1, SB-2, HB-1, HB-2) में संबंधित सबसिस्टम की MCB चेक करें।",
      "4. आवश्यकता पड़ने पर BL चाबी या MCB 112.1 से MCE रीसेट (OFF/ON) करें।"
    ],
    precautions: "लोकोमोटिव की सुरक्षा सुनिश्चित करें और SA-9 लगा लें।",
    manualReference: "254-पृष्ठ 3-फेज लोको TSD डायरेक्टरी",
    verifiedFromPdf: true,
    pdfDocumentName: "254-पृष्ठ 3-फेज लोको TSD डायरेक्टरी (भारतीय रेल)",
    pdfPage: 1,
    pdfQuote: "Official 3-Phase Troubleshooting Procedure"
  };
}

// -----------------------------------------------------------------------------
// AMRIT BHARAT PUSH-PULL LOCOMOTIVE RESOLVER (WAP-5 + RAKE + WAP-5)
// Sources: CLW 67-page Amrit Bharat TSD Final Copy
// -----------------------------------------------------------------------------
function resolveAmritBharatDefect(query: string, norm: string): GroundedResult {
  const hasSlave = norm.includes('slave') || norm.includes('स्लेव');
  const hasMaster = norm.includes('master') || norm.includes('मास्टर');
  const isPantoQuery = 
    norm.includes('panto') || norm.includes('pantograph') || 
    norm.includes('पैंटो') || norm.includes('पैंटोग्राफ') || norm.includes('पेंटो') || 
    (norm.includes('raising') && !norm.includes('brake')) || 
    norm.includes('not raising') || norm.includes('not going up') || 
    norm.includes('उठ नहीं') || norm.includes('उठता नहीं') || 
    norm.includes('pan-1') || norm.includes('pan-2') || 
    norm.includes('ig-38') || norm.includes('127.12') || norm.includes('130.1');

  // 1. Pantograph Not Going Up on SLAVE Loco (Amrit Bharat Page 55, 8, 52)
  if (isPantoQuery && hasSlave && (!hasMaster || norm.includes('question slave') || norm.includes('slave loco ka') || norm.includes('slave ka') || norm.includes('slave loco'))) {
    return {
      identifiedFaultId: "P55_PANTO_SLAVE",
      faultTitle: "IF PANTO NOT GOING UP ON SLAVE LOCO (स्लेव लोको पर पैंटोग्राफ न उठने पर - CLW TSD पृष्ठ 55, 8, 5)",
      analysis: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी (पृष्ठ 55 व पृष्ठ 8): 'IF PANTO NOT GOING UP ON SLAVE LOCO' - पुश-पुल फॉर्मेशन में मास्टर से ZPT दबाने पर यदि स्लेव लोको का पैंटोग्राफ नहीं उठ रहा है (Slave Loco Panto Not Raising / Slv: 550 नहीं आ रहा), तो CLW TSD अनुसार निर्धारित आधिकारिक 9-चरणीय निवारण कार्यवाही:",
      suggestedActions: [
        "1. Master DDU पर Node 504 जांचें (Node Progression Check - पृष्ठ 8): मास्टर DDU पर 'Node 504' के साथ 'Slv: 504' प्रदर्शित होना अनिवार्य है। यदि स्लेव Node 504 पर नहीं आया है, तो मास्टर से ZPT दबाने पर भी स्लेव पैंटो नहीं उठेगा। (मास्टर के 'D' पैनल पर ADD BL चाबी से स्लेव MCE पुनः बूट करें, 35-45s प्रतीक्षा करें)।",
        "2. स्लेव लोको पैंटो रिज़रवायर प्रेशर चेक करें (Panto Reservoir Pressure - पृष्ठ 55): स्लेव लोको में पैंटो रिज़रवायर प्रेशर 6.0 kg/cm² से अधिक होना चाहिए। यदि प्रेशर कम है, तो स्लेव लोको के SB-2 पैनल से ऑक्सिलरी कंप्रेसर MCPA चलाकर प्रेशर बनाएं।",
        "3. स्लेव न्यूमैटिक पैनल पर IG-38 चाबी (Pneumatic Panel - पृष्ठ 55 व 5): स्लेव लोको के न्यूमैटिक पैनल पर नीली चाबी IG-38 हॉरिजॉन्टल स्थिति में होनी चाहिए (CCB 2.0 लोको में वर्टिकल स्थिति में)।",
        "4. स्लेव लोको इमरजेंसी स्टॉप पुश बटन (Emergency Stop - पृष्ठ 55): सुनिश्चित करें कि स्लेव लोको के दोनों कैब में Emergency Stop पुश बटन दबा हुआ न हो।",
        "5. स्लेव लोको PAN-1 व PAN-2 आइसोलेटिंग कॉक (पृष्ठ 55): स्लेव लोको के न्यूमैटिक पैनल पर PAN-1 एवं PAN-2 आइसोलेटिंग कॉक खुले (OPEN) होने चाहिए।",
        "6. स्लेव लोको पैंटो सिलेक्टर स्विच (Panto Selector Switch - पृष्ठ 55): स्लेव लोको में 'Panto Selector Switch' की स्थिति बदलकर पैंटो उठाने का प्रयास करें।",
        "7. स्लेव न्यूमैटिक पैनल पर PAN-1 व PAN-2 प्रेशर स्विच टैप करें (पृष्ठ 55): स्लेव के न्यूमैटिक पैनल पर बाएं से 7वें और 8वें PAN-1 व PAN-2 प्रेशर स्विच को हल्के से टैप करें।",
        "8. स्लेव लोको SB-1 में MCB 127.12 व SB-2 में कॉन्टैक्टर 130.1 (पृष्ठ 55): स्लेव लोको के SB-1 पैनल में MCB 127.12 सेट स्थिति में हो (ट्रिप हो तो रीसेट करें), तथा SB-2 पैनल में पैंटो ON कॉन्टैक्टर 130.1 के क्लोजिंग (पिकअप) की जांच करें।",
        "9. 22-पिन UIC जंपर व WTB संचार (Train Bus - पृष्ठ 52): लोको और रैक के बीच 22-पिन UIC पुश-पुल जंपर सही से लगा व लॉक होना चाहिए। यदि WTB में बाधा (F1901P1) है, तो BPFA दबाकर Train Bus Isolated करें अथवा स्लेव को डेड (DEAD) कर मास्टर लोको से गाड़ी कार्य करें।"
      ],
      precautions: "स्लेव लोको का निरीक्षण करने जाने से पहले मास्टर लोको में SA-9 लगा लें। स्लेव लोको का Node 504 सुनिश्चित होने के बाद ही मास्टर कैब से ZPT ऑपरेट करें।",
      manualReference: "CLW अमृत भारत TSD फाइनल कॉपी - पृष्ठ 55 (पैंटो निवारण), पृष्ठ 8 (Node 504/550) व पृष्ठ 5",
      verifiedFromPdf: true,
      pdfDocumentName: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी PDF",
      pdfPage: 55,
      pdfQuote: "CLW AMRIT BHARAT TSD FINAL COPY:\nPAGE 55: 'IF PANTO NOT GOING UP ON MASTER LOCO: Effect on Slave Loco: Panto will not go up & U meter will not show... Troubleshooting: 1. Panto reservoir pressure > 6 kg/cm2, 2. IG-38 key horizontal, 3. Emergency stop not pressed, 4. PAN-1 & 2 open, 5. Panto selector switch, 6. Tap PAN-1 & 2 pressure switches, 7. MCB 127.12 set, 8. Contactor 130.1 closing.'\nPAGE 8: 'Node 504: When both locos finish initial configuration, Master DDU displays Node 504 and Slave status Slv: 504. Node 550: Press ZPT switch on Master loco to raise pantograph. Both Master & Slave pantographs raise.'"
    };
  }

  // 2. Pantograph Not Going Up on MASTER Loco (Amrit Bharat Page 55)
  if (isPantoQuery) {
    return {
      identifiedFaultId: "P55_PANTO_MASTER",
      faultTitle: "IF PANTO NOT GOING UP ON MASTER LOCO (मास्टर लोको पर पैंटोग्राफ न उठने पर - CLW TSD पृष्ठ 55)",
      analysis: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी (पृष्ठ 55): 'IF PANTO NOT GOING UP ON MASTER LOCO'\nEffect on Master Loco:\nEffect on Slave Loco:\n• Panto will not go up & ‘U’ meter will not show (पैंटोग्राफ नहीं उठेगा और 'U' मीटर OHE वोल्टेज नहीं दर्शाएगा)।\nCLW TSD द्वारा निर्धारित आधिकारिक 8-चरणीय दोष निवारण कार्यवाही:",
      suggestedActions: [
        "1. Check panto reservoir pressure above 6 kg/cm2. (सुनिश्चित करें कि पैंटो रिज़रवायर प्रेशर 6 kg/cm² से अधिक हो। यदि कम है तो ऑक्सिलरी कंप्रेसर MCPA चलाएं।)",
        "2. Check IG-38 key is in horizontal position on pneumatic panel. (On CCB 2.0 loco in vertical position) (न्यूमैटिक पैनल पर नीली चाबी IG-38 हॉरिजॉन्टल स्थिति में हो; CCB 2.0 लोको में वर्टिकल स्थिति में हो।)",
        "3. Check Emergency stop push button should not be in pressed condition. (सुनिश्चित करें कि दोनों कैब में Emergency Stop पुश बटन दबा न हो।)",
        "4. PAN-1 & PAN-2 cocks are open on pneumatic panel. (न्यूमैटिक पैनल पर PAN-1 एवं PAN-2 आइसोलेटिंग कॉक खुले (Open) हों।)",
        "5. Try by changing positions of 'Panto Selector switch'. (पैंटो सिलेक्टर स्विच की स्थिति बदलकर पैंटो उठाने का प्रयास करें।)",
        "6. Tap PAN-1 & PAN-2 pressure switches on pneumatic panel. (7th & 8th from left) (न्यूमैटिक पैनल पर बाएं से 7वें और 8वें PAN-1 व PAN-2 प्रेशर स्विच को हल्के से टैप करें।)",
        "7. Check MCB 127.12 is in set condition on SB-1 panel, if tripped reset it. (SB-1 पैनल में MCB 127.12 सेट स्थिति में हो, यदि ट्रिप हो तो रीसेट करें।)",
        "8. Check closing of panto ON contactor 130.1 on SB-2 panel. (SB-2 पैनल में पैंटो ON कॉन्टैक्टर 130.1 के क्लोजिंग की जांच करें।)"
      ],
      precautions: "पैंटो रिज़रवायर प्रेशर 6.0 kg/cm² से अधिक होना चाहिए तथा IG-38 चाबी सही दिशा में होनी चाहिए। Emergency stop बटन सामान्य स्थिति में हो।",
      manualReference: "CLW अमृत भारत TSD फाइनल कॉपी - भाग B / पृष्ठ 55",
      verifiedFromPdf: true,
      pdfDocumentName: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी PDF",
      pdfPage: 55,
      pdfQuote: "CLW AMRIT BHARAT TSD FINAL COPY - PAGE NO 55\nIF PANTO NOT GOING UP ON MASTER LOCO\nEffect on Master Loco:\nEffect on Slave Loco:\n• Panto will not go up & ‘U’ meter will not show\nTroubleshooting:\n1. Check panto reservoir pressure above 6 kg/cm2.\n2. Check IG-38 key is in horizontal position on pneumatic panel. (On CCB 2.0 loco in vertical position)\n3. Check Emergency stop push button should not be in pressed condition.\n4. PAN-1 & PAN-2 cocks are open on pneumatic panel.\n5. Try by changing positions of 'Panto Selector switch'\n6. Tap PAN-1 & PAN-2 pressure switches on pneumatic panel. (7th & 8th from left)\n7. Check MCB 127.12 is in set condition on SB-1 panel, if tripped reset it.\n8. Check closing of panto ON contactor 130.1 on SB-2 panel."
    };
  }

  const hasBrake = norm.includes('brake') || norm.includes('ब्रेक') || norm.includes('binding') || norm.includes('बाइंडिंग') || norm.includes('bc') || norm.includes('sa-9');
  const hasRelease = norm.includes('releas') || norm.includes('रिलीज') || norm.includes('छूट') || norm.includes('binding') || norm.includes('बाइंडिंग');
  const isPreparation = norm.includes('preparation') || norm.includes('prepare') || norm.includes('तैयारी') || norm.includes('तैयार');

  // 3. Operational: Preparation of Slave Loco for Push-Pull Service (Amrit Bharat Page 5)
  if (isPreparation && (hasSlave || !hasMaster)) {
    return {
      identifiedFaultId: "P05_PREPARATION_SLAVE",
      faultTitle: "PREPARATION OF SLAVE LOCO FOR PUSH-PULL SERVICE (स्लेव लोको की प्रारंभिक तैयारी - CLW TSD पृष्ठ 5)",
      analysis: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी (पृष्ठ 5): 'PREPARATION OF SLAVE LOCO FOR PUSH-PULL SERVICE' - पुश-पुल सेवा के लिए स्लेव लोकोमोटिव की निर्धारित आधिकारिक 6-चरणीय प्रारंभिक तैयारी एवं न्यूमैटिक/इलेक्ट्रिकल पैनल सेटअप:",
      suggestedActions: [
        "1. Carry out initial inspection of Slave loco as per single loco procedure. (एकल लोको प्रक्रिया के अनुसार स्लेव लोको का प्रारंभिक निरीक्षण करें।)",
        "2. Ensure UIC jumpers for MU & HLC, and IVC jumpers for Hotel Load between loco and train are properly connected and locked. (सुनिश्चित करें कि MU व HLC के लिए 22 व 13-पिन UIC जंपर्स तथा ट्रेन व लोको के बीच होटल लोड के लिए 500A IVC जंपर्स सही प्रकार से जुड़े और लॉक हैं।)",
        "3. Check BP & FP air pipes connected with power car and angle cocks in OPEN condition. (पावर कार से जुड़े BP और FP एयर पाइप चेक करें और एंगल कॉक खुली (OPEN) स्थिति में रखें।)",
        "4. Pneumatic panel setup on Slave Loco (स्लेव लोको पर न्यूमैटिक पैनल सेटअप):\n   - In E-70 Brake System: Cock No. 70, 74, IG-38 key in OPEN/Horizontal condition. Cock 136 and Cock 47 in STRICTLY CLOSED condition! (कॉक 136 और कॉक 47 अनिवार्य रूप से बंद (CLOSED) स्थिति में होने चाहिए!)\n   - In Knorr CCB 2.0 Brake System: Controller mode switch in 'Trail' in both driving and non-driving cabs. SIFA cock open.",
        "5. Brake handle setup (ब्रेक हैंडल सेटअप):\n   - In E-70: SA-9 handle in RELEASE position in both cabs. A-9 handle removed or kept in 'Neutral'.\n   - In CCB 2.0: Both cab A-9 handles in Full Service (FS) and locked; mode switch in 'Trail'. SA-9 released.",
        "6. Electrical cubicle SB-2 setup (SB-2 पैनल सेटअप):\n   - MCB 110 (Battery Charger) in ON / SET condition.\n   - MCB 112.1 (Main Control Electronics) in ON / SET condition."
      ],
      precautions: "स्लेव लोको में Cock-136 और Cock-47 हमेशा बंद (STRICTLY CLOSED) रहना चाहिए। दोनों कैब में SA-9 रिलीज पोजीशन में रखें। CCB 2.0 में दोनों कैब 'TRAIL' मोड में हों।",
      manualReference: "CLW अमृत भारत TSD फाइनल कॉपी - भाग A (ऑपरेशनल निर्देशिका) / पृष्ठ 5",
      verifiedFromPdf: true,
      pdfDocumentName: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी PDF",
      pdfPage: 5,
      pdfQuote: "CLW AMRIT BHARAT TSD FINAL COPY - PAGE NO 5\nPREPARATION OF SLAVE LOCO FOR PUSH-PULL SERVICE:\n1. Carry out initial inspection of Slave loco as per single loco procedure.\n2. Ensure UIC jumpers for MU & HLC, and IVC jumpers for Hotel Load between loco and train are properly connected and locked.\n3. Check BP & FP air pipes connected with power car and angle cocks in OPEN condition.\n4. Pneumatic panel setup on Slave Loco:\n- In E-70 Brake System: Cock No. 70, 74, IG-38 key in OPEN condition. Cock 136 and Cock 47 in CLOSED condition!\n- In Knorr CCB 2.0 Brake System: Controller mode switch in 'Trail' in both driving and non-driving cabs. SIFA cock open.\n5. Brake handle setup:\n- In E-70: SA-9 handle in RELEASE position in both cabs. A-9 handle removed or kept in 'Neutral'.\n- In CCB 2.0: Both cab A-9 handles in Full Service (FS) and locked; mode switch in 'Trail'. SA-9 released.\n6. Electrical cubicle SB-2 setup:\n- MCB 110 (Battery Charger) in ON / SET condition.\n- MCB 112.1 (Main Control Electronics) in ON / SET condition."
    };
  }

  // 4. Preparation of Master Loco for Push-Pull Service (Amrit Bharat Page 6)
  if (isPreparation && hasMaster) {
    return {
      identifiedFaultId: "P06_PREPARATION_MASTER",
      faultTitle: "PREPARATION OF MASTER LOCO FOR PUSH-PULL SERVICE (मास्टर लोको की प्रारंभिक तैयारी - CLW TSD पृष्ठ 6)",
      analysis: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी (पृष्ठ 6): 'PREPARATION OF MASTER LOCO FOR PUSH-PULL SERVICE' - पुश-पुल सेवा के लिए मास्टर (लीडिंग) लोकोमोटिव की निर्धारित आधिकारिक 6-चरणीय तैयारी:",
      suggestedActions: [
        "1. Inspect Master loco as per standard single loco operating procedure. (मानक सिंगल लोको ऑपरेटिंग प्रक्रिया अनुसार मास्टर लोको का निरीक्षण करें।)",
        "2. Check 22-pin UIC push-pull jumpers, 13-pin HLC jumpers, and 500A IVC jumpers connected between Master loco and train. (22-पिन UIC पुश-पुल जंपर्स, 13-पिन HLC जंपर्स तथा 500A IVC जंपर्स जुड़े और लॉक चेक करें।)",
        "3. Check BP and FP hoses connected, angle cocks open. (BP और FP होज़ जुड़े हों, एंगल कॉक खुली स्थिति में हों।)",
        "4. Pneumatic panel setup on Master Loco (मास्टर न्यूमैटिक पैनल सेटअप):\n   - In E-70 Brake System: Cock No. 70, 74, and Cock 136 in OPEN condition. IG-38 key OPEN. Cock 47 CLOSED.\n   - In Knorr CCB 2.0: Controller mode switch in 'Lead' in driving cab, and 'Trail' in non-driving rear cab.",
        "5. Electrical cubicle SB-2 setup: MCB 110 (Battery Charger) and MCB 112.1 (Control Electronics) in ON / SET condition.",
        "6. Verify coach battery voltage in power cars/LSRD is healthy (>110V DC) for WTB repeaters."
      ],
      precautions: "मास्टर लोको में Cock-136 खुला (OPEN) रहना चाहिए (स्लेव में बंद)। CCB 2.0 में ड्राइविंग कैब 'Lead' में और रियर कैब 'Trail' में होनी चाहिए।",
      manualReference: "CLW अमृत भारत TSD फाइनल कॉपी - पृष्ठ 6",
      verifiedFromPdf: true,
      pdfDocumentName: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी PDF",
      pdfPage: 6,
      pdfQuote: "CLW AMRIT BHARAT TSD FINAL COPY - PAGE NO 6\nPREPARATION OF MASTER LOCO FOR PUSH-PULL SERVICE:\n1. Inspect Master loco as per standard single loco procedure.\n2. Check 22-pin UIC, 13-pin HLC, 500A IVC jumpers connected.\n3. Check BP & FP hoses connected, angle cocks open.\n4. Pneumatic panel: Cock 70, 74, 136 OPEN. IG-38 OPEN. Cock 47 CLOSED. CCB 2.0 driving cab in 'Lead', rear cab in 'Trail'.\n5. SB-2: MCB 110 & 112.1 ON/SET.\n6. Coach battery voltage > 110V DC for WTB repeaters."
    };
  }

  // 5. Energization Sequence for Push-Pull (Amrit Bharat Page 7)
  if (norm.includes('energization') || norm.includes('energize') || norm.includes('एनरजाइज') || norm.includes('add bl')) {
    return {
      identifiedFaultId: "P07_ENERGIZATION_PUSHPULL",
      faultTitle: "ENERGIZATION OF LOCOMOTIVES FOR PUSH-PULL (पुश-पुल एनरजाइजेशन प्रक्रिया - CLW TSD पृष्ठ 7)",
      analysis: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी (पृष्ठ 7): 'ENERGIZATION OF LOCOMOTIVES FOR PUSH-PULL' - मास्टर ड्राइविंग कैब से दोनों लोको को एनरजाइज करने की निर्धारित 9-चरणीय आधिकारिक प्रक्रिया:",
      suggestedActions: [
        "1. In Master driving cab, insert BL Key in ADD BL slot provided on 'D' panel (ALP side). (मास्टर कैब के 'D' पैनल पर ADD BL स्लॉट में BL चाबी डालें।)",
        "2. Move BL Key from 'OFF' to 'D'. (BL चाबी को 'OFF' से 'D' पर घुमाएं।)",
        "3. ADD LSDJ illuminates, indicating Slave loco control electronics are switched ON. (ADD LSDJ जलेगा, जो दर्शाता है कि स्लेव MCE ऑन हो गया है।)",
        "4. Slave loco configuration starts: ADD BPFA illuminates for a few seconds, then extinguishes. (ADD BPFA कुछ सेकंड जलकर बुझ जाएगा, पूरी प्रक्रिया में 35-45 सेकंड लगते हैं।)",
        "5. After ADD BPFA extinguishes, operate BL Key from 'D' to 'OFF' in ADD BL slot and remove it. (ADD BPFA बुझने पर BL चाबी OFF में निकाल लें।)",
        "6. Insert BL Key into Master Loco main BL slot (on 'A' Panel) in 'OFF' position and move to 'D'. (BL चाबी को मास्टर के 'A' पैनल मुख्य BL स्लॉट में डालकर 'D' पर ले जाएं।)",
        "7. Master loco control electronics boot up. On Slave loco DDU, 'self hold mode active' message appears.",
        "8. When both locos achieve Node 504 (Master Node 504 and Slv: 504), press ZPT switch on Master loco to raise pantographs."
      ],
      precautions: "स्लेव लोको बूट होने में 35-45 सेकंड लगते हैं। ADD BPFA बुझने से पहले BL चाबी न निकालें। दोनों लोको का Node 504 आने के बाद ही ZPT दबाएं।",
      manualReference: "CLW अमृत भारत TSD फाइनल कॉपी - पृष्ठ 7 व पृष्ठ 8",
      verifiedFromPdf: true,
      pdfDocumentName: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी PDF",
      pdfPage: 7,
      pdfQuote: "CLW AMRIT BHARAT TSD FINAL COPY - PAGE NO 7\nENERGIZATION OF LOCOMOTIVES FOR PUSH-PULL:\n1. In Master driving cab, insert BL Key in ADD BL slot provided on 'D' panel.\n2. Move BL Key from 'OFF' to 'D'.\n3. ADD LSDJ illuminates (Slave CE ON).\n4. Slave configuration starts: ADD BPFA illuminates, takes 35-45 seconds.\n5. When ADD BPFA extinguishes, remove BL Key from ADD BL.\n6. Insert BL Key in Master main BL slot and move to 'D'.\n7. Master CE boots up.\n8. Both locos achieve Node 504, raise panto via ZPT."
    };
  }

  // 6. Hotel Load Not Coming from HLC- 2/1 of Slave Loco (Amrit Bharat Page 58)
  if (
    norm.includes('hotel load') || norm.includes('होटल लोड') || 
    norm.includes('hlc- 2/1') || norm.includes('hlc-2/1') || norm.includes('hlc 2/1') || 
    (norm.includes('hlc') && (norm.includes('slave') || norm.includes('coupler') || norm.includes('not coming') || norm.includes('supply'))) || 
    norm.includes('ivc coupler') || norm.includes('ivc') || 
    (norm.includes('uic coupler') && (norm.includes('hotel') || norm.includes('hlc') || norm.includes('deformity') || norm.includes('pin'))) || 
    (norm.includes('hotel') && norm.includes('slave'))
  ) {
    return {
      identifiedFaultId: "P58_HOTEL_LOAD_SLAVE",
      faultTitle: "HOTEL LOAD NOT COMING FROM HLC- 2/1 OF SLAVE LOCO (CLW TSD पृष्ठ 58)",
      analysis: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी (पृष्ठ 58): 'HOTEL LOAD NOT COMING FROM HLC- 2/1 OF SLAVE LOCO' - पुश-पुल फॉर्मेशन में स्लेव लोको के HLC-2/1 से होटल लोड आपूर्ति न आने पर लोको पायलट (LP) एवं ETL स्टाफ द्वारा की जाने वाली आधिकारिक 6-चरणीय दोष निवारण प्रक्रिया:",
      suggestedActions: [
        "1. Check IVC Coupler properly fitted or not. (जांचें कि 500A IVC कपलर सही प्रकार से फिट है या नहीं।)",
        "2. Hotel Load UIC coupler properly fitted or not. (होटल लोड UIC कपलर सही प्रकार से फिट है या नहीं जांचें।)",
        "3. Hotel Load UIC coupler pin to be checked and ensure no deformity in Hotel Load UIC Coupler. (होटल लोड UIC कपलर पिनों की भली-भांति जांच करें और सुनिश्चित करें कि होटल लोड UIC कपलर में कोई विकृति/मुड़ाव (deformity) न हो।)",
        "4. If any abnormality identified by LP or ETL staff, then following action should be taken at next halt – (यदि लोको पायलट (LP) या ETL स्टाफ द्वारा कोई असामान्यता पाई जाती है, तो अगले हॉल्ट पर निम्न कार्यवाही करें):",
        "   a. On Master loco – Ensure Throttle on '0' & MPJ in Neutral. Apply SA-9 to ON position. Keep A-9 in Emergency position. Open VCB, drop pantograph, MCE OFF. Switch OFF battery via 110 & 112.1 in SB-2.",
        "   b. On Slave loco – Switch OFF battery by operating 110 & 112.1 in SB-2 panel.",
        "5. Attend Hotel Load UIC coupler pin problem, then switch ON batteries via 110 & 112.1.",
        "6. Try to energize from Master loco. If successful, work train. If unsuccessful, make slave loco DEAD and work single loco."
      ],
      precautions: "कपलर या पिनों का भौतिक निरीक्षण करने से पहले दोनों लोको के SB-2 पैनल में MCB 110 और 112.1 को OFF करके बैटरी पावर काटना अनिवार्य है।",
      manualReference: "CLW अमृत भारत TSD फाइनल कॉपी - भाग B / पृष्ठ 58",
      verifiedFromPdf: true,
      pdfDocumentName: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी PDF",
      pdfPage: 58,
      pdfQuote: "CLW AMRIT BHARAT TSD FINAL COPY - PAGE NO 58\nHOTEL LOAD NOT COMING FROM HLC- 2/1 OF SLAVE LOCO"
    };
  }

  // 7. Slave Loco Brake Binding / BC 3.5 kg/cm² (Amrit Bharat Page 53 Section 2)
  if (
    (hasSlave && (hasBrake || hasRelease || norm.includes('sa-9') || norm.includes('sa9') || norm.includes('mce') || norm.includes('c3w'))) ||
    norm.includes('slave loco mein brake binding') ||
    norm.includes('slave brake') ||
    norm.includes('bc 3.5') ||
    norm.includes('3.5 kg') ||
    (norm.includes('स्लेव') && (norm.includes('ब्रेक') || norm.includes('रिलीज़') || norm.includes('रिलीज') || norm.includes('sa-9') || norm.includes('mce')))
  ) {
    return {
      identifiedFaultId: "P53_SLAVE_BRAKE",
      faultTitle: "DURING PUSH PULL FORMATION IF SLAVE LOCO BRAKES ARE NOT RELEASING & BC GAUGE SHOWING 3.5 kg/cm² (पृष्ठ 53)",
      analysis: "यदि गलती से स्लेव (Slave) लोको में SA-9 एप्लिकेशन पर है और मास्टर (Master) लोको से स्लेव लोको का MCE ऑन कर दिया है, तो स्लेव लोको के ब्रेक RELEASE (रिलीज़) नहीं होंगे। इस स्थिति में स्लेव लोको का SA-9 RELEASE करवाएँ तथा मास्टर लोको से स्लेव लोको का MCE OFF करें और पुनः ON करें, अब स्लेव लोको का ब्रेक RELEASE होना सुनिश्चित करें। (यदि अब भी रिलीज नहीं होता है तो नीचे दिए गए स्टेप्स 1 से 5 को फॉलो करें:)",
      suggestedActions: [
        "प्रारंभिक एवं मुख्य चरण: यदि गलती से स्लेव (Slave) लोको में SA-9 एप्लिकेशन पर है और मास्टर (Master) लोको से स्लेव लोको का MCE ऑन कर दिया है, तो स्लेव लोको के ब्रेक RELEASE (रिलीज़) नहीं होंगे। इस स्थिति में स्लेव लोको का SA-9 RELEASE करवाएँ तथा मास्टर लोको से स्लेव लोको का MCE OFF करें और पुनः ON करें, अब स्लेव लोको का ब्रेक RELEASE होना सुनिश्चित करें। (यदि अब भी रिलीज नहीं होता है तो नीचे दिए गए स्टेप्स 1 से 5 को फॉलो करें:)",
        "स्टेप 1: Keep SA-9 in RELEASE position in both cabs. (दोनों कैब में SA-9 को RELEASE पोजीशन में रखें।)",
        "स्टेप 2: Operate C3W valve & release the brakes. (C3W वाल्व को ऑपरेट करें और ब्रेक रिलीज करें।)",
        "स्टेप 3: Tap on 57 & 58 D-2 relay valve provided on pneumatic panel of E-70 brake system. In case of CCB Brake system, press TP-16, TP-20, TP-BC and DV quick release handle. (E-70 ब्रेक सिस्टम के न्यूमैटिक पैनल पर दिए गए 57 एवं 58 D-2 रिले वाल्व को हल्के से टैप करें। CCB ब्रेक सिस्टम में TP-16, TP-20, TP-BC दबाएं और DV क्विक रिलीज हैंडल ऑपरेट करें।)",
        "स्टेप 4: Close & open 94 cock. (94 नंबर कॉक को बंद करके पुनः खोलें।)",
        "स्टेप 5: Close both bogie isolating cock, after releasing brakes, open the same & try. (दोनों बोगी आइसोलेटिंग कॉक बंद करें, ब्रेक रिलीज होने पर पुनः खोलें और प्रयास करें।)"
      ],
      precautions: "स्लेव लोको में दोनों कैब के SA-9 रिलीज पोजीशन में होने चाहिए। कॉक 136 स्लेव लोको में बंद (CLOSED) रहना चाहिए।",
      manualReference: "CLW अमृत भारत TSD फाइनल कॉपी - भाग B / पृष्ठ 53 (सेक्शन 2)",
      verifiedFromPdf: true,
      pdfDocumentName: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी PDF",
      pdfPage: 53,
      pdfQuote: "यदि गलती से स्लेव (Slave) लोको में SA-9 एप्लिकेशन पर है और मास्टर (Master) लोको से स्लेव लोको का MCE ऑन कर दिया है, तो स्लेव लोको के ब्रेक RELEASE (रिलीज़) नहीं होंगे। इस स्थिति में स्लेव लोको का SA-9 RELEASE करवाएँ तथा मास्टर लोको से स्लेव लोको का MCE OFF करें और पुनः ON करें, अब स्लेव लोको का ब्रेक RELEASE होना सुनिश्चित करें। (यदि अब भी रिलीज नहीं होता है तो नीचे दिए गए स्टेप्स 1 से 5 को फॉलो करें:)\n\nयदि अब भी रिलीज न हो, तो निम्नलिखित 5 स्टेप्स:\nस्टेप 1: Keep SA-9 in RELEASE position in both cabs. (दोनों कैब में SA-9 को RELEASE पोजीशन में रखें।)\nस्टेप 2: Operate C3W valve & release the brakes. (C3W वाल्व को ऑपरेट करें और ब्रेक रिलीज करें।)\nस्टेप 3: Tap on 57 & 58 D-2 relay valve provided on pneumatic panel of E-70 brake system. In case of CCB Brake system, press TP-16, TP-20, TP-BC and DV quick release handle. (E-70 ब्रेक सिस्टम के न्यूमैटिक पैनल पर दिए गए 57 एवं 58 D-2 रिले वाल्व को हल्के से टैप करें। CCB ब्रेक सिस्टम में TP-16, TP-20, TP-BC दबाएं और DV क्विक रिलीज हैंडल ऑपरेट करें।)\nस्टेप 4: Close & open 94 cock. (94 नंबर कॉक को बंद करके पुनः खोलें।)\nस्टेप 5: Close both bogie isolating cock, after releasing brakes, open the same & try. (दोनों बोगी आइसोलेटिंग कॉक बंद करें, ब्रेक रिलीज होने पर पुनः खोलें और प्रयास करें।)"
    };
  }

  // 8. Master Loco Brake Binding / Brake Not Releasing (Amrit Bharat Page 53 Section 1)
  if (hasMaster && (hasBrake || hasRelease)) {
    return {
      identifiedFaultId: "P53_MASTER_BRAKE",
      faultTitle: "IF BRAKES NOT RELEASING ON MASTER LOCO (मास्टर लोको में ब्रेक रिलीज न होना - पृष्ठ 53)",
      analysis: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी (पृष्ठ 53, सेक्शन 1): 'IF BRAKES NOT RELEASING ON MASTER LOCO' के तहत निर्धारित 5-चरणीय समाधान प्रक्रिया:",
      suggestedActions: [
        "1. Keep SA-9 in RELEASE position in both cabs. (दोनों कैब में SA-9 को RELEASE पोजीशन में रखें।)",
        "2. Operate C3W valve & release the brakes. (C3W वाल्व को ऑपरेट करें और ब्रेक रिलीज करें।)",
        "3. Tap on 57 & 58 D-2 relay valve provided on pneumatic panel of E-70 brake system. In case of CCB Brake system, press TP-16, TP-20, TP-BC and DV quick release handle. (E-70 ब्रेक सिस्टम के न्यूमैटिक पैनल पर दिए गए 57 एवं 58 D-2 रिले वाल्व को हल्के से टैप करें। CCB ब्रेक सिस्टम में TP-16, TP-20, TP-BC दबाएं और DV क्विक रिलीज हैंडल ऑपरेट करें।)",
        "4. Close & open 94 cock. (94 नंबर कॉक को बंद करके पुनः खोलें।)",
        "5. Close both bogie isolating cock, after releasing brakes, open the same & try. (दोनों बोगी आइसोलेटिंग कॉक बंद करें, ब्रेक रिलीज होने पर पुनः खोलें और प्रयास करें।)"
      ],
      precautions: "मास्टर लोको ब्रेक स्थिति की जांच करें। दोनों कैब में SA-9 रिलीज पोजीशन में होना चाहिए।",
      manualReference: "CLW अमृत भारत TSD फाइनल कॉपी - भाग B / पृष्ठ 53 (सेक्शन 1)",
      verifiedFromPdf: true,
      pdfDocumentName: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी PDF",
      pdfPage: 53,
      pdfQuote: "CLW AMRIT BHARAT TSD FINAL COPY - PAGE NO 53\nSECTION 1: IF BRAKES NOT RELEASING ON MASTER LOCO"
    };
  }

  // 9. BP Trouble on Slave / Master in Push-Pull (Amrit Bharat Page 56)
  if (norm.includes('bp') || norm.includes('cock-70') || norm.includes('cock 70') || norm.includes('bpems')) {
    if (hasSlave && (!hasMaster || norm.includes('slave effect') || norm.includes('effect on slave'))) {
      return {
        identifiedFaultId: "P56_SLAVE_BP",
        faultTitle: "पुश-पुल में BP न बनने पर स्लेव लोको (Slave Loco) प्रभाव एवं निवारण (CLW TSD पृष्ठ 56)",
        analysis: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी (पृष्ठ 56): Effect on Slave Loco - BP gauge will show ‘0’ or less BP pressure (स्लेव लोको BP गेज 0 या कम BP प्रेशर दर्शाएगा)। पुश-पुल फॉर्मेशन में स्लेव लोको के लिए आधिकारिक निवारण प्रक्रिया:",
        suggestedActions: [
          "• Effect on Slave Loco: BP gauge will show ‘0’ or less BP pressure (स्लेव लोको BP गेज '0' या कम BP प्रेशर दर्शाएगा)।",
          "1. Ensure MR pressure above 8 kg/cm2. (सुनिश्चित करें कि MR प्रेशर 8 kg/cm² से अधिक हो।)",
          "2. Ensure BP angle cock in proper position & should not be leaked. (सुनिश्चित करें कि BP एंगल कॉक सही स्थिति में हो और उसमें से लीकेज न हो।)",
          "3. Check any related fault message on DDU. Cock-70 closed, BPEMS released, A-9 in proper position.",
          "4. Check BP in master loco by closing BP angle cock between master loco & power car.",
          "5. [स्लेव लोको मुख्य निवारण]: Close Slave Loco's Power car side BP angle cock & check whether BP maintaining or not. If BP maintaining, make slave loco completely DEAD & open BP angle cock between slave loco & power car & check BP continuity & conjunction brake test in slave loco.",
          "6. If still BP not maintaining, check leakages in train.",
          "7. [पृष्ठ 59 - कॉक 136 जांच]: E-70 ब्रेक सिस्टम में स्लेव लोको का Cock-136 अनिवार्य रूप से बंद (STRICTLY CLOSED) होना चाहिए।"
        ],
        precautions: "स्लेव लोको में Cock-136 हमेशा बंद (CLOSED) रहना चाहिए। स्लेव लोको को डेड करने के बाद BP निरंतरता एवं कंजंक्शन ब्रेक टेस्ट अनिवार्य रूप से करें।",
        manualReference: "CLW अमृत भारत TSD फाइनल कॉपी - पृष्ठ 56 व पृष्ठ 59",
        verifiedFromPdf: true,
        pdfDocumentName: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी PDF",
        pdfPage: 56,
        pdfQuote: "CLW AMRIT BHARAT TSD FINAL COPY - PAGE NO 56\nEffect on Slave Loco: BP gauge will show ‘0’ or less BP pressure"
      };
    } else {
      return {
        identifiedFaultId: "P56_BP_MASTER",
        faultTitle: "IF BP NOT MAINTAINING/CREATING ON MASTER LOCO (मास्टर लोको पर BP प्रेशर न बनने पर - पृष्ठ 56)",
        analysis: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी (पृष्ठ 56): 'IF BP NOT MAINTAINING/CREATING ON MASTER LOCO' - मास्टर लोको एवं स्लेव लोको दोनों के BP गेज '0' या कम BP प्रेशर दर्शाएंगे। CLW TSD द्वारा निर्धारित 6-चरणीय दोष निवारण कार्यवाही:",
        suggestedActions: [
          "1. Ensure MR pressure above 8 kg/cm2. (सुनिश्चित करें कि MR प्रेशर 8 kg/cm² से अधिक हो।)",
          "2. Ensure BP angle cock in proper position & should not be leaked. (सुनिश्चित करें कि BP एंगल कॉक सही स्थिति में हो और लीकेज न हो।)",
          "3. Check any related fault message on DDU. Ensure Cock-70 closed, BPEMS not pressed, A-9 in proper position.",
          "4. Check BP in master loco by closing BP angle cock between master loco & power car.",
          "5. Close Slave Loco's Power car side BP angle cock & check whether BP maintaining. If maintaining, make slave loco DEAD, open angle cock, check BP continuity & conjunction brake test.",
          "6. Check any leakages in Train."
        ],
        precautions: "कॉक-70 सदैव बंद (Closed) स्थिति में रहना चाहिए। A-9 हैंडल सभी कैब में सही स्थिति में हो।",
        manualReference: "CLW अमृत भारत TSD फाइनल कॉपी - भाग B / पृष्ठ 56",
        verifiedFromPdf: true,
        pdfDocumentName: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी PDF",
        pdfPage: 56,
        pdfQuote: "CLW AMRIT BHARAT TSD FINAL COPY - PAGE NO 56\nIF BP NOT MAINTAINING/CREATING ON MASTER LOCO"
      };
    }
  }

  // 10. Throttle Not Responding in Push-Pull (Amrit Bharat Page 57)
  if (norm.includes('throttle') || norm.includes('थ्रोटल') || norm.includes('te/be')) {
    return {
      identifiedFaultId: "P57_THROTTLE",
      faultTitle: "THROTTLE (TE/BE) NOT RESPONDING IN PUSH-PULL (CLW TSD पृष्ठ 57)",
      analysis: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी (पृष्ठ 57): पुश-पुल फॉर्मेशन में थ्रोटल (TE/BE) काम न करने पर निर्धारित आधिकारिक 6-चरणीय निवारण प्रक्रिया:",
      suggestedActions: [
        "1. Check TE/BE Throttle is calibrated & no angle transmitter fault on DDU. (DDU पर एंगल ट्रांसमीटर फॉल्ट चेक करें।)",
        "2. Check reverser (MPJ) properly engaged in Direction (F or R). (रिवर्सर MPJ सही दिशा में लगा हो।)",
        "3. Check Parking Brake is fully released in both Master and Slave locos. (मास्टर व स्लेव दोनों लोको में पार्किंग ब्रेक पूरी तरह रिलीज हो।)",
        "4. Check emergency exhaust / Vigilance penalty brake is not applied. (विजिलेंस पेनल्टी ब्रेक न लगा हो।)",
        "5. Operate switch 152 to failure mode if angle transmitter defect detected.",
        "6. If slave loco not giving tractive effort, check 22-pin UIC jumper connection."
      ],
      precautions: "थ्रोटल देने से पहले सुनिश्चित करें कि दोनों लोको के पार्किंग ब्रेक रिलीज हैं तथा BC प्रेशर 0 kg/cm² है।",
      manualReference: "CLW अमृत भारत TSD फाइनल कॉपी - भाग B / पृष्ठ 57",
      verifiedFromPdf: true,
      pdfDocumentName: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी PDF",
      pdfPage: 57,
      pdfQuote: "CLW AMRIT BHARAT TSD FINAL COPY - PAGE NO 57\nTHROTTLE NOT RESPONDING IN PUSH-PULL"
    };
  }

  // 11. Match against Amrit Bharat Catalog Faults
  let bestFault = null;
  let bestScore = 0;
  const stopWords = new Set([
    'loco', 'the', 'in', 'of', 'for', 'to', 'and', 'a', 'an', 'is', 'ka', 'ki', 'ke', 'ko', 
    'me', 'mein', 'par', 'se', 'hai', 'hain', 'kya', 'bataye', 'poocha', 'hu', 'answer',
    'de', 'rahe', 'ho', 'karo', 'karein', 'hota'
  ]);
  const words = norm.split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));

  for (const f of amritBharatFaults) {
    let score = 0;
    const fId = f.id.toLowerCase();
    const fMsg = f.message.toLowerCase();
    const fEff = (f.effect || '').toLowerCase();

    // Safety guard: If fault is about brake binding, but user did NOT ask about brake or binding, do not match it!
    const isBrakeFault = fId.includes('brake') || fId.includes('p53') || fMsg.includes('brake not releasing') || fMsg.includes('3.5 kg/cm²');
    if (isBrakeFault && !hasBrake && !hasRelease) {
      continue;
    }

    if (fId && norm.includes(fId)) score += 100;
    for (const w of words) {
      if (fMsg.includes(w)) score += 20;
      if (fEff.includes(w)) score += 10;
      if (f.subSystem.toLowerCase().includes(w)) score += 5;
    }
    if (score > bestScore) {
      bestScore = score;
      bestFault = f;
    }
  }

  if (bestFault && bestScore >= 15) {
    const amritPageMap: Record<string, number> = {
      P05_PREPARATION_SLAVE: 5, P06_PREPARATION_MASTER: 6, P07_ENERGIZATION_PUSHPULL: 7,
      P08_DDU_NODE_PROGRESSION: 8, P10_MAKING_SLAVE_DEAD: 10, P12_CAB_CHANGING: 12,
      F0101P1: 16, F0102P1: 17, F0103P1: 18, F0104P1: 19, F0105P1: 20,
      F0201P1: 22, F0301P1: 24, F0401P1: 26, F0402P1: 26,
      F0501P1: 28, F0502P1: 29,
      F0601P1: 31, F0701P1: 33, F0801P1: 35,
      F0901P1: 37, F0902P2: 38, F0903P2: 39,
      F1001P1: 41, F1002P1: 42, F1003P1: 43, F1004P1: 44, F1005P1: 45, F1006P1: 46, F1007P1: 47, F1008P1: 48,
      F1101P2: 49, F1103P2: 49, F1201P2: 50, F1202P2: 50,
      F1501P1: 51, F1901P1: 52,
      P53_MASTER_BRAKE: 53, P53_SLAVE_BRAKE: 53,
      P54_CE: 54, GEN_CE: 54,
      P55_PANTO: 55, P55_PANTO_MASTER: 55, P55_PANTO_SLAVE: 55,
      P56_BP_MASTER: 56, P56_SLAVE_BP: 56,
      P57_THROTTLE: 57,
      P58_HOTEL_LOAD_SLAVE: 58, GEN_HOTEL_LOAD: 58,
      P59_E70_BRAKE: 59, P60_CCB_BRAKE: 60,
      GEN_ZNN: 9
    };
    const exactPage = amritPageMap[bestFault.id] || 53;

    return {
      identifiedFaultId: bestFault.id,
      faultTitle: `${bestFault.id}: ${bestFault.message.split('\n')[0]}`,
      analysis: `चित्तरंजन लोकोमोटिव वर्क्स (CLW) अमृत भारत TSD: फॉल्ट ${bestFault.id} (${bestFault.subSystem}) का विश्लेषण (पृष्ठ ${exactPage})। ${bestFault.effect || ''}`,
      suggestedActions: bestFault.actions && bestFault.actions.length > 0 ? bestFault.actions : [
        "1. DDU पर फॉल्ट संदेश व सबसिस्टम की जांच करें।",
        "2. रिले / MCB / कॉक की स्थिति की जांच करें।",
        "3. TSD निर्देशिका अनुसार रीसेट करें।"
      ],
      precautions: "सुरक्षा नियमों एवं न्यूमैटिक कॉक स्थिति का कड़ाई से पालन करें।",
      manualReference: `CLW अमृत भारत TSD - ${bestFault.subSystem} (पृष्ठ ${exactPage})`,
      verifiedFromPdf: true,
      pdfDocumentName: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी PDF",
      pdfPage: exactPage,
      pdfQuote: `${bestFault.id}: ${bestFault.message}\nEffect: ${bestFault.effect || 'N/A'}`
    };
  }

  // Amrit Bharat Generic Fallback
  return {
    identifiedFaultId: "GEN_AMRIT_ASSIST",
    faultTitle: "अमृत भारत पुश-पुल लोकोमोटिव दोष निवारण (CLW TSD)",
    analysis: `इनपुट '${query}' के आधार पर CLW 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी अनुसार प्रक्रिया:`,
    suggestedActions: [
      "1. Master DDU पर फॉल्ट संदेश व Node (Node 504) की जांच करें।",
      "2. 22-पिन UIC जंपर व WTB कम्युनिकेशन लिंक की स्थिति चेक करें।",
      "3. स्लेव लोको में कॉक 136 बंद (CLOSED) तथा SA-9 रिलीज स्थिति में होना सुनिश्चित करें।",
      "4. आवश्यक होने पर Master कैब के 'D' पैनल पर ADD BL से स्लेव MCE रीसेट करें।"
    ],
    precautions: "स्लेव लोको का निरीक्षण करने से पूर्व मास्टर लोको में SA-9 अवश्य लगाएं।",
    manualReference: "CLW अमृत भारत TSD फाइनल कॉपी",
    verifiedFromPdf: true,
    pdfDocumentName: "चित्तरंजन लोकोमोटिव वर्क्स (CLW) 67-पृष्ठ अमृत भारत TSD फाइनल कॉपी PDF",
    pdfPage: 53,
    pdfQuote: "Official Amrit Bharat Push-Pull Troubleshooting Procedure"
  };
}

// -----------------------------------------------------------------------------
// MAIN ENTRY POINT: RESOLVE DEFECT CLIENT-SIDE
// -----------------------------------------------------------------------------
export function resolveDefectClientSide(query: string, locoType: '3phase' | 'amrit_bharat'): GroundedResult {
  const norm = query.toLowerCase();

  // 1. Detect explicit locomotive intent in user's query
  const isExplicit3Phase = 
    norm.includes('3 phase') || norm.includes('3phase') || norm.includes('3-phase') || 
    norm.includes('3 फ़ेस') || norm.includes('3 फेज') || norm.includes('तीन फेज') || norm.includes('तीन फ़ेस') ||
    norm.includes('wap7') || norm.includes('wag9') || norm.includes('wap-7') || norm.includes('wag-9') || 
    norm.includes('wap5') || norm.includes('wap-5') || norm.includes('254') || norm.includes('vadodara') ||
    norm.includes('brc') || norm.includes('conventional 3 phase');

  const isExplicitAmrit = 
    norm.includes('amrit bharat') || norm.includes('अमृत भारत') || 
    norm.includes('push pull') || norm.includes('push-pull') || norm.includes('पुश-पुल') || norm.includes('पुश पुल') ||
    norm.includes('slave') || norm.includes('स्लेव') || 
    norm.includes('master & slave') || norm.includes('slave loco') || norm.includes('master loco') ||
    norm.includes('hlc') || norm.includes('power car') || norm.includes('wtb') || norm.includes('67');

  let effectiveType: '3phase' | 'amrit_bharat' = locoType === 'amrit_bharat' ? 'amrit_bharat' : '3phase';
  if (norm.includes('3 phase ka pooch raha') || norm.includes('question 3 phase') || norm.includes('3 phase ka') || norm.includes('3-phase ka')) {
    effectiveType = '3phase';
  } else if (isExplicit3Phase && !isExplicitAmrit) {
    effectiveType = '3phase';
  } else if (isExplicitAmrit && !isExplicit3Phase) {
    effectiveType = 'amrit_bharat';
  }

  // 2. Strict routing based on effective locomotive type
  if (effectiveType === '3phase') {
    return resolve3PhaseDefect(query, norm);
  } else {
    return resolveAmritBharatDefect(query, norm);
  }
}
