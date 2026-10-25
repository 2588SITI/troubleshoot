import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, ChevronRight, ArrowLeft, AlertTriangle, Lightbulb, Activity, Wrench, ShieldAlert, Sparkles, Loader2, Bot, AlertCircle, ExternalLink, HelpCircle, Globe, BookOpen, Download, FileText, CheckCircle2, Bookmark, Layers, Smartphone, Copy, Check, X, Share2, Sun, Moon, Type, Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { subSystems, faults } from './data';
import { amritBharatSubSystems, amritBharatFaults } from './dataAmritBharat';
import { Fault } from './types';
import { cn } from './lib/utils';
import { cleanRailwayVoiceText } from './lib/speechCleaner';
import { resolveDefectClientSide, expandLocoTokens } from './lib/clientTroubleshooter';
import { usePWAInstall } from './lib/usePWAInstall';
import { VoiceTroubleshooterPlayer } from './components/VoiceTroubleshooterPlayer';

interface AiTroubleshootResult {
  identifiedFaultId?: string | null;
  faultTitle?: string;
  analysis: string;
  suggestedActions: string[];
  precautions?: string;
  manualReference?: string;
  verifiedFromPdf?: boolean;
  pdfDocumentName?: string;
  pdfPage?: number | null;
  pdfQuote?: string;
}

interface ManualInfo {
  title: string;
  subTitle: string;
  totalPages: number;
  totalCharacters: number;
  pdfFileSize: string;
  memoryStatus: string;
  chapters: Array<{ id: string; title: string; pageStart: number; pageEnd: number }>;
  subsystems: Array<{ code: string; name: string }>;
}

interface ManualSearchResult {
  page: number;
  snippet: string;
  matchCount: number;
}

export default function App() {
  const [locoType, setLocoType] = useState<'3phase' | 'amrit_bharat'>('3phase');
  const [mode, setMode] = useState<'browse' | 'ai' | 'manual'>('browse');
  
  // Cab visibility modes: 'night' (Dark high contrast) or 'day' (Day glare high contrast)
  const [cabMode, setCabMode] = useState<'night' | 'day'>(() => {
    if (typeof window !== 'undefined') {
      try {
        return (localStorage.getItem('cab_mode') as 'night' | 'day') || 'night';
      } catch (e) {}
    }
    return 'night';
  });

  // Text size for LP readability: 'normal', 'large', 'extra-large'
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'extra-large'>(() => {
    if (typeof window !== 'undefined') {
      try {
        return (localStorage.getItem('font_size') as 'normal' | 'large' | 'extra-large') || 'large';
      } catch (e) {}
    }
    return 'large';
  });

  useEffect(() => {
    try {
      localStorage.setItem('cab_mode', cabMode);
    } catch (e) {}
  }, [cabMode]);

  useEffect(() => {
    try {
      localStorage.setItem('font_size', fontSize);
    } catch (e) {}
  }, [fontSize]);

  const [aiQuery, setAiQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<AiTroubleshootResult | null>(null);
  const [aiVoiceActiveIndex, setAiVoiceActiveIndex] = useState<number | null>(null);
  const [detailVoiceActiveIndex, setDetailVoiceActiveIndex] = useState<number | null>(null);

  // Voice Input (Loco Pilot Speech-to-Text Microphone) states
  const [isVoiceInputActive, setIsVoiceInputActive] = useState<boolean>(false);
  const [voiceInputError, setVoiceInputError] = useState<string | null>(null);
  const [voicePermissionGuideOpen, setVoicePermissionGuideOpen] = useState<boolean>(false);
  const [voiceInputLang, setVoiceInputLang] = useState<'hi-IN' | 'en-IN'>('hi-IN');
  const [isInIframe, setIsInIframe] = useState<boolean>(false);
  const speechRecognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        setIsInIframe(window.self !== window.top);
      } catch (e) {
        setIsInIframe(true);
      }
    }
  }, []);

  const startVoiceInput = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceInputError("आपके डिवाइस/ब्राउज़र में वेब स्पीच रिकॉग्निशन सपोर्ट नहीं मिला। कृपया Google Chrome ब्राउज़र का उपयोग करें।");
      return;
    }

    setVoiceInputError(null);

    try {
      if (speechRecognitionRef.current) {
        try {
          speechRecognitionRef.current.abort();
        } catch {}
      }

      const recognition = new SpeechRecognition();
      recognition.lang = voiceInputLang; // 'hi-IN' or 'en-IN'
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsVoiceInputActive(true);
        setVoiceInputError(null);
      };

      recognition.onaudiostart = () => {
        setIsVoiceInputActive(true);
      };

      recognition.onspeechstart = () => {
        setIsVoiceInputActive(true);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        const rawTranscript = final || interim;
        if (rawTranscript) {
          const cleaned = cleanRailwayVoiceText(rawTranscript);
          setAiQuery(cleaned);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsVoiceInputActive(false);

        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          if (isInIframe) {
            setVoiceInputError("ब्राउज़र ने प्रीव्यू फ्रेम (iFrame) में माइक एक्सेस ब्लॉक किया है। अलग टैब में यह 100% काम करता है — कृपया नीचे 'अलग टैब में खोलें' दबाएं।");
          } else {
            setVoiceInputError("माइक्रोफ़ोन अनुमति (Mic Permission) नहीं मिली। नीचे 'अनुमति दें' दबाएं या एड्रेस बार के 🔒 लॉक से Microphone Allow करें।");
          }
          setVoicePermissionGuideOpen(true);
        } else if (event.error === 'no-speech') {
          setVoiceInputError("कोई आवाज सुनाई नहीं दी। कृपया दोबारा माइक दबाकर स्पष्ट बोलें।");
        } else if (event.error !== 'aborted') {
          setVoiceInputError(`माइक सूचना (${event.error})। कृपया पुनः प्रयास करें या नीचे त्वरित विषय चुनें।`);
        }
      };

      recognition.onend = () => {
        setIsVoiceInputActive(false);
      };

      speechRecognitionRef.current = recognition;
      
      // CRITICAL: Call recognition.start() synchronously within user click event loop!
      recognition.start();
      setIsVoiceInputActive(true);
    } catch (err: any) {
      console.error("Speech recognition start failed:", err);
      setIsVoiceInputActive(false);
      if (err?.name === 'InvalidStateError') {
        // already started
        return;
      }
      setVoiceInputError("माइक चालू नहीं हो सका। कृपया अनुमति दें या नीचे तुरंत समाधान बटन दबाएं।");
    }
  };

  const stopVoiceInput = () => {
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch {}
      setIsVoiceInputActive(false);
    }
  };

  const toggleVoiceInput = () => {
    if (isVoiceInputActive) {
      stopVoiceInput();
    } else {
      startVoiceInput();
    }
  };

  const handleRequestMicPermission = async () => {
    if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(t => t.stop());
        setVoiceInputError(null);
        setVoicePermissionGuideOpen(false);
        // User explicitly granted permission in the native browser dialog!
        startVoiceInput();
      } catch (err: any) {
        console.warn("Manual getUserMedia error:", err);
        setVoicePermissionGuideOpen(true);
        if (err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError') {
          setVoiceInputError("माइक अनुमति ब्लॉक है। कृपया ब्राउज़र के URL बार में 🔒 लॉक या ⚙️ आइकन दबाकर 'Microphone' चालू करें।");
        } else {
          setVoiceInputError("माइक्रोफ़ोन एक्सेस नहीं मिल सका: " + (err.message || "त्रुटि"));
        }
      }
    } else {
      setVoiceInputError("ब्राउज़र में ऑडियो डिवाइस एक्सेस उपलब्ध नहीं है। कृपया Google Chrome का उपयोग करें।");
    }
  };

  // Manual memory states
  const [manualInfo, setManualInfo] = useState<ManualInfo | null>(null);
  const [manualSearchQuery, setManualSearchQuery] = useState('');
  const [manualSearchResults, setManualSearchResults] = useState<ManualSearchResult[]>([]);
  const [manualSearching, setManualSearching] = useState(false);
  const [manualSearchDone, setManualSearchDone] = useState(false);
  const [activePageNumber, setActivePageNumber] = useState<number>(22);
  const [activePageText, setActivePageText] = useState<string>('');
  const [loadingPage, setLoadingPage] = useState(false);
  const [manualSubTab, setManualSubTab] = useState<'search' | 'reader' | 'chapters'>('search');



  // Mobile App modal state
  const { isInstallable, isInstalled, isIOS, isInAppBrowser, install } = usePWAInstall();
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const DEFAULT_APP_URL = "https://ais-dev-x4easeru2dj3odnunfu4u3-81125844265.asia-southeast1.run.app";
  const mobileAppUrl = typeof window !== 'undefined' && 
    window.location.origin && 
    !window.location.origin.includes('localhost') && 
    !window.location.origin.includes('127.0.0.1')
      ? window.location.origin
      : DEFAULT_APP_URL;

  const handleCopyMobileLink = async () => {
    try {
      let copied = false;
      if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(mobileAppUrl);
          copied = true;
        } catch (clipErr) {
          console.warn("navigator.clipboard failed, using fallback:", clipErr);
        }
      }
      if (!copied && typeof document !== 'undefined') {
        const textArea = document.createElement("textarea");
        textArea.value = mobileAppUrl;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFault, setSelectedFault] = useState<Fault | null>(null);



  const quickPrompts = [
    { label: "LSCE लैम्प प्रकाशित / Cooling Mode", query: "LSCE lamp glow kar raha hai over temperature control electronics F0101P2 cooling mode" },
    { label: "Main Compressor (MCP) काम नहीं कर रहा", query: "main compressure not working / MCP kaam nahi kar raha" },
    { label: "MCPA (Aux Compressor) / Panto नहीं उठ रहा", query: "MCPA auxiliary compressor nahi chal raha panto nahi uth raha" },
    { label: "VCB Close नहीं हो रहा", query: "VCB close nahi ho raha stuck in off position" },
    { label: "MR Pressure कम हो रहा है", query: "MR pressure drop ho raha hai brake nahi lag raha" },
    { label: "Converter 1 Disturbance", query: "Converter 1 disturbance VCB open" },
    { label: "F0108P1 Primary Over Current / OCR-78", query: "SS01 F0108P1 Primary over current check over current relay flag close VCB after unlocking relay OCR-78" },
    { label: "F0109P1 Aux Winding Over Current / BUR MCB", query: "SS01 F0109P1 Aux winding over current try to close VCB again BUR-1 BUR-2 BUR-3 MCB 127.22" },
    { label: "F0110P1 Fatal Error Main Circuit / Turn OFF", query: "SS01 F0110P1 Fatal error in main circuit turn off the loco HB/SB MCB RDSO" },
    { label: "Brake Electronics Fault", query: "Fault in brake electronics emergency brake applied" }
  ];

  const amritBharatQuickPrompts = [
    { label: "BP प्रेशर नहीं बन रहा (BP Not Maintaining - P56)", query: "If BP not maintaining/creating on Master Loco Effect on Master Loco Effect on Slave Loco BP gauge will show 0 or less BP pressure" },
    { label: "मास्टर लोको ब्रेक रिलीज नहीं (Master Brake - P53)", query: "If brakes not releasing on Master Loco push pull amrit bharat SA-9 release cock 136 C3W 57 58 D-2 94 cock" },
    { label: "स्लेव लोको ब्रेक रिलीज नहीं (BC 3.5 - P53)", query: "During push pull formation if slave loco brakes are not releasing & slave loco BC gauge showing 3.5 kg/cm2 C3W valve 57 58 D-2 94 cock" },
    { label: "F1901P1 WTB संचार बाधा / Self Hold", query: "F1901P1 communication disturbance WTB slave loco self hold mode train bus isolated" },
    { label: "F0101P1 VCB Stuck ON / Master-Slave", query: "F0101P1 VCB stuck in ON position master slave loco push pull" },
    { label: "F0104P1 कैटेनरी वोल्टेज / OHE सीमा (P15)", query: "F0104P1 Catenary voltage out of limit OHE meter 17.5 29.5 kV PT fuse" },
    { label: "न्यूट्रल सेक्शन (NSN) सावधानियां - P3", query: "Precautions to be taken while NSN Neutral Section Negotiation ZNN switch" },
    { label: "स्लेव लोको VCD पेनल्टी ब्रेक", query: "Slave loco VCD acts penalty brake switch 237.1 push pull" },
    { label: "F0401P1 हार्मोनिक फिल्टर / 40 kmph नियम", query: "F0401P1 harmonic filter current too high 40 kmph restriction push pull" },
    { label: "स्लेव लोको कंट्रोल इलेक्ट्रॉनिक्स नहीं ऑन हो रहा", query: "Slave loco control electronics not getting on ADD BL ADD BPFA" },
    { label: "स्लेव लोको डेड करना (Stationary - P10)", query: "Procedure to make slave loco dead stationary cock 47 70 74 112.1 110" },
    { label: "स्लेव लोको डेड करना (On Run - P11)", query: "Procedure to make slave loco dead on run 100 minutes train bus isolated" },
    { label: "कैब बदलना / रिवर्सल (P12)", query: "Changing of Master Loco to Slave Loco and Slave Loco to Master Loco reversal" },
    { label: "पुश-पुल 21 नियम (Push-Pull 21 Points - P8/9)", query: "Points to keep in mind while working Push Pull operation 21 golden rules" },
    { label: "F0105P1 ट्रांसफार्मर ऑयल (P20)", query: "SS01 F0105P1 transformer oil temperature or pressure not ok pump mcb push pull" },
    { label: "F0301P1 कन्वर्टर-2 / बोगी-2 (P24)", query: "SS03 F0301P1 Disturbance in converter-2 switch 154 bogie-2 push pull" },
    { label: "F0701P1 BUR-2 ऑक्सिलरी-2 (P33)", query: "SS07 F0701P1 disturbance in processor BUR-2 127.22/2 push pull" },
    { label: "F0801P1 BUR-3 ऑक्सिलरी-3 (P35)", query: "SS08 F0801P1 disturbance in processor BUR-3 127.22/3 push pull" },
    { label: "F0903P2 बैटरी चार्जर करंट (P39)", query: "SS09 F0903P2 low battery charger current MCB 100 110 push pull" },
    { label: "F1001P1 ब्रेक इलेक्ट्रॉनिक्स (SS10)", query: "SS10 F1001P1 fault in brake electronics MCB 127.7 128.1 push pull" },
    { label: "F1002P1 लो MR प्रेशर 6.4 (P32)", query: "SS10 F1002P1 low pressure main reservoir 6.4 kg/cm2 compressor 47.1/1 push pull" },
    { label: "F1006P1 पार्किंग ब्रेक BPPB (P36)", query: "SS10 F1006P1 traction with parking brakes not allowed BPPB latch solenoid 30 push pull" },
    { label: "स्लेव लोको होटल लोड समस्या (HLC-2/1 - P58)", query: "Hotel load not coming from HLC- 2/1 of slave loco" }
  ];

  const activeQuickPrompts = locoType === 'amrit_bharat' ? amritBharatQuickPrompts : quickPrompts;

  const handleAiSubmit = async (overrideQuery?: string) => {


    const rawQuery = overrideQuery || aiQuery;
    const q = cleanRailwayVoiceText(rawQuery).trim();
    if (!q) return;
    setAiQuery(q);
    
    setAiLoading(true);
    setAiError(null);
    setAiResult(null);

    // 1. Detect if the query explicitly specifies a locomotive type and auto-sync active tab:
    const qLower = q.toLowerCase();
    const isExplicit3Phase = 
      qLower.includes('3 phase ka pooch raha') || qLower.includes('question 3 phase') || qLower.includes('3 phase ka') ||
      qLower.includes('3 phase') || qLower.includes('3phase') || qLower.includes('3-phase') || 
      qLower.includes('3 फ़ेस') || qLower.includes('3 फेज') || qLower.includes('तीन फेज') || qLower.includes('तीन फ़ेस') ||
      qLower.includes('wap7') || qLower.includes('wag9') || qLower.includes('wap-7') || qLower.includes('wag-9') || 
      qLower.includes('wap5') || qLower.includes('wap-5') || qLower.includes('254') || qLower.includes('vadodara');

    const isExplicitAmrit = 
      qLower.includes('amrit bharat') || qLower.includes('अमृत भारत') || 
      qLower.includes('push pull') || qLower.includes('push-pull') || qLower.includes('पुश-पुल') || qLower.includes('पुश पुल') ||
      qLower.includes('slave') || qLower.includes('स्लेव') || qLower.includes('स्लैब') || qLower.includes('स्लेब') || qLower.includes('slab') ||
      qLower.includes('master & slave') || qLower.includes('slave loco') || qLower.includes('master loco') ||
      qLower.includes('hlc') || qLower.includes('power car') || qLower.includes('wtb') || qLower.includes('67');

    let targetLoco = locoType;
    if (qLower.includes('3 phase ka pooch raha') || (isExplicit3Phase && !isExplicitAmrit)) {
      targetLoco = '3phase';
      if (locoType !== '3phase') {
        setLocoType('3phase');
      }
    } else if (isExplicitAmrit && !isExplicit3Phase) {
      targetLoco = 'amrit_bharat';
      if (locoType !== 'amrit_bharat') {
        setLocoType('amrit_bharat');
      }
    }

    // 2. Immediately evaluate client-side Grounded TSD solution (Instant & 100% offline reliable)
    let data: any = null;
    try {
      data = resolveDefectClientSide(q, targetLoco);
    } catch (clientErr) {
      console.warn("Client-side resolver error:", clientErr);
    }

    // If client solver found a verified match from PDF (fault ID or page), display immediately!
    if (data && data.identifiedFaultId && data.identifiedFaultId !== 'GEN_TSD_ASSIST' && data.identifiedFaultId !== 'GEN_3PH_ASSIST') {
      setAiResult(data);
      setAiLoading(false);
      return;
    }

    // 3. If it was generic, attempt server API if available with strict JSON content-type check
    try {
      const res = await fetch('/api/troubleshoot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem: q, locoType: targetLoco })
      });
      
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const serverData = await res.json();
        if (serverData && !serverData.error) {
          data = serverData;
        }
      }
    } catch (fetchErr) {
      console.warn("Server troubleshoot API unavailable, using local grounded response:", fetchErr);
    }

    // 3. Fallback - always guaranteed to return a grounded response, NEVER null or error
    if (!data) {
      try {
        data = resolveDefectClientSide(q, locoType);
      } catch (err) {
        console.error("Fallback error:", err);
      }
    }

    if (data) {
      setAiResult(data);
    } else {
      setAiError("समस्या का विश्लेषण करने में विफलता आई। कृपया पुनः प्रयास करें या नीचे दिए त्वरित बटनों का उपयोग करें।");
    }
    setAiLoading(false);
  };

  const fetchManualInfo = async (type?: '3phase' | 'amrit_bharat') => {
    const target = type || locoType;
    const url = target === 'amrit_bharat' ? '/api/amrit-bharat/info' : '/api/manual/info';
    try {
      const res = await fetch(url);
      if (res.ok) {
        const raw = await res.text();
        if (raw && !raw.trim().startsWith('<')) {
          try {
            const data = JSON.parse(raw);
            if (data) setManualInfo(data);
          } catch (e) {
            console.warn('Invalid JSON in manual info:', e);
          }
        }
      }
    } catch (err) {
      console.error('Failed to load manual info:', err);
    }
  };

  const handleManualSearch = async (queryText?: string) => {
    const q = queryText !== undefined ? queryText : manualSearchQuery;
    if (!q.trim()) return;
    setManualSearching(true);
    const url = locoType === 'amrit_bharat'
      ? `/api/amrit-bharat/search?q=${encodeURIComponent(q.trim())}`
      : `/api/manual/search?q=${encodeURIComponent(q.trim())}`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const raw = await res.text();
        if (raw && !raw.trim().startsWith('<')) {
          try {
            const data = JSON.parse(raw);
            if (data && data.results) {
              setManualSearchResults(data.results);
              setManualSearchDone(true);
            }
          } catch (e) {
            console.warn('Invalid JSON in manual search:', e);
          }
        }
      }
    } catch (err) {
      console.error('Manual search error:', err);
    } finally {
      setManualSearching(false);
    }
  };

  const loadManualPage = async (pageNum: number) => {
    const maxPage = locoType === 'amrit_bharat' ? 67 : 254;
    if (pageNum < 1 || pageNum > maxPage) return;
    setLoadingPage(true);
    setActivePageNumber(pageNum);
    const url = locoType === 'amrit_bharat'
      ? `/api/amrit-bharat/page/${pageNum}`
      : `/api/manual/page/${pageNum}`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const raw = await res.text();
        if (raw && !raw.trim().startsWith('<')) {
          try {
            const data = JSON.parse(raw);
            if (data && typeof data.text === 'string') {
              setActivePageText(data.text);
              setManualSubTab('reader');
            }
          } catch (e) {
            console.warn('Invalid JSON in manual page:', e);
          }
        }
      }
    } catch (err) {
      console.error('Error loading manual page:', err);
    } finally {
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    fetchManualInfo(locoType);
    setManualSearchResults([]);
    setManualSearchDone(false);
    setActivePageNumber(1);
    setActivePageText('');
  }, [locoType]);

  const currentSubSystems = useMemo(() => {
    return locoType === 'amrit_bharat' ? amritBharatSubSystems : subSystems;
  }, [locoType]);

  const currentFaults = useMemo(() => {
    const rawLower = searchQuery.trim().toLowerCase();
    const isAmritSearch = rawLower.includes('slave') || rawLower.includes('स्लेव') || rawLower.includes('स्लैब') || rawLower.includes('स्लेब') || rawLower.includes('slab') || rawLower.includes('push pull') || rawLower.includes('push-pull') || rawLower.includes('amrit') || rawLower.includes('अमृत');
    if (isAmritSearch) {
      return amritBharatFaults;
    }
    return locoType === 'amrit_bharat' ? amritBharatFaults : faults;
  }, [locoType, searchQuery]);

  const matchedCatalogFault = useMemo(() => {
    if (!aiResult?.identifiedFaultId) return null;
    const cleanId = aiResult.identifiedFaultId.trim().toUpperCase();
    return currentFaults.find(f => f.id.toUpperCase() === cleanId) || null;
  }, [aiResult, currentFaults]);

  const filteredFaults = useMemo(() => {
    const rawSearch = searchQuery.trim();
    if (!rawSearch) {
      return selectedSystem ? currentFaults.filter(f => f.subSystem === selectedSystem) : currentFaults;
    }

    const rawLower = rawSearch.toLowerCase();
    const tokens = expandLocoTokens(rawSearch);
    const hasSlaveInSearch = rawLower.includes('slave') || rawLower.includes('स्लेव') || rawLower.includes('स्लैब') || rawLower.includes('स्लेब') || rawLower.includes('slab');
    const hasMasterInSearch = (rawLower.includes('master') || rawLower.includes('मास्टर')) && !hasSlaveInSearch;

    const matched = currentFaults.filter((fault) => {
      const fullFaultText = [
        fault.id,
        fault.message,
        fault.lamp,
        fault.effect,
        fault.masterEffect || '',
        fault.slaveEffect || '',
        ...fault.actions,
        ...(fault.slaveActions || [])
      ].join(' ').toLowerCase();

      // 1. Direct exact or substring match
      let matchesSearch = fullFaultText.includes(rawLower);

      // 2. Multilingual expanded token semantic match
      if (!matchesSearch && tokens.length > 0) {
        const matchedTokens = tokens.filter(tok => fullFaultText.includes(tok));
        if (tokens.length <= 2) {
          matchesSearch = matchedTokens.length > 0;
        } else {
          matchesSearch = (matchedTokens.length / tokens.length) >= 0.35;
        }
      }

      const matchesSystem = selectedSystem ? fault.subSystem === selectedSystem : true;
      return matchesSearch && matchesSystem;
    });

    // Prioritize specific Slave vs Master fault over generic combined fault
    if (hasSlaveInSearch) {
      matched.sort((a, b) => {
        const aIsSlave = a.id.includes('SLAVE') || a.message.toLowerCase().includes('slave') || a.message.includes('स्लेव');
        const bIsSlave = b.id.includes('SLAVE') || b.message.toLowerCase().includes('slave') || b.message.includes('स्लेव');
        if (aIsSlave && !bIsSlave) return -1;
        if (!aIsSlave && bIsSlave) return 1;
        return 0;
      });
    } else if (hasMasterInSearch) {
      matched.sort((a, b) => {
        const aIsMaster = a.id.includes('MASTER') || a.message.toLowerCase().includes('master') || a.message.includes('मास्टर');
        const bIsMaster = b.id.includes('MASTER') || b.message.toLowerCase().includes('master') || b.message.includes('मास्टर');
        if (aIsMaster && !bIsMaster) return -1;
        if (!aIsMaster && bIsMaster) return 1;
        return 0;
      });
    }

    return matched;
  }, [searchQuery, selectedSystem, currentFaults]);

  const isDay = cabMode === 'day';

  const getSubsystemBadgeStyle = (subSystem: string, isDayMode: boolean) => {
    const code = (subSystem || '').toUpperCase();
    if (code.includes('SS01') || code.includes('VCB') || code.includes('MAIN POWER')) {
      return isDayMode 
        ? "bg-rose-100 text-rose-900 border-rose-300 shadow-sm" 
        : "bg-rose-950/80 text-rose-300 border-rose-500/60 shadow-rose-950/40";
    }
    if (code.includes('SS02') || code.includes('BOGIE-1')) {
      return isDayMode 
        ? "bg-blue-100 text-blue-900 border-blue-300 shadow-sm" 
        : "bg-blue-950/80 text-blue-300 border-blue-500/60 shadow-blue-950/40";
    }
    if (code.includes('SS03') || code.includes('BOGIE-2')) {
      return isDayMode 
        ? "bg-cyan-100 text-cyan-900 border-cyan-300 shadow-sm" 
        : "bg-cyan-950/80 text-cyan-300 border-cyan-500/60 shadow-cyan-950/40";
    }
    if (code.includes('SS04') || code.includes('HARMONIC')) {
      return isDayMode 
        ? "bg-purple-100 text-purple-900 border-purple-300 shadow-sm" 
        : "bg-purple-950/80 text-purple-300 border-purple-500/60 shadow-purple-950/40";
    }
    if (code.includes('SS05') || code.includes('HOTEL')) {
      return isDayMode 
        ? "bg-amber-100 text-amber-900 border-amber-300 shadow-sm" 
        : "bg-amber-950/80 text-amber-300 border-amber-500/60 shadow-amber-950/40";
    }
    if (code.includes('SS06') || code.includes('SS07') || code.includes('SS08') || code.includes('BUR') || code.includes('AUX')) {
      return isDayMode 
        ? "bg-emerald-100 text-emerald-900 border-emerald-300 shadow-sm" 
        : "bg-emerald-950/80 text-emerald-300 border-emerald-500/60 shadow-emerald-950/40";
    }
    if (code.includes('SS09') || code.includes('BATTERY')) {
      return isDayMode 
        ? "bg-yellow-100 text-yellow-950 border-yellow-300 shadow-sm" 
        : "bg-yellow-950/80 text-yellow-300 border-yellow-500/60 shadow-yellow-950/40";
    }
    if (code.includes('SS10') || code.includes('BRAKE') || code.includes('P53') || code.includes('P56')) {
      return isDayMode 
        ? "bg-red-100 text-red-900 border-red-300 shadow-sm" 
        : "bg-red-950/80 text-red-300 border-red-500/60 shadow-red-950/40";
    }
    if (code.includes('SS11') || code.includes('SS12') || code.includes('HB')) {
      return isDayMode 
        ? "bg-teal-100 text-teal-900 border-teal-300 shadow-sm" 
        : "bg-teal-950/80 text-teal-300 border-teal-500/60 shadow-teal-950/40";
    }
    if (code.includes('SS15') || code.includes('FIRE')) {
      return isDayMode 
        ? "bg-orange-100 text-orange-900 border-orange-300 shadow-sm" 
        : "bg-orange-950/80 text-orange-300 border-orange-500/60 shadow-orange-950/40";
    }
    if (code.includes('SS19') || code.includes('WTB') || code.includes('TRAIN BUS')) {
      return isDayMode 
        ? "bg-indigo-100 text-indigo-900 border-indigo-300 shadow-sm" 
        : "bg-indigo-950/80 text-indigo-300 border-indigo-500/60 shadow-indigo-950/40";
    }
    if (code.includes('GEN') || code.includes('COACH') || code.includes('PUSH-PULL')) {
      return isDayMode 
        ? "bg-teal-100 text-teal-900 border-teal-300 shadow-sm" 
        : "bg-teal-950/80 text-teal-300 border-teal-500/60 shadow-teal-950/40";
    }
    return isDayMode 
      ? "bg-slate-100 text-slate-800 border-slate-300" 
      : "bg-zinc-800 text-zinc-300 border-zinc-700";
  };

  const getSubsystemLeftAccent = (subSystem: string) => {
    const code = (subSystem || '').toUpperCase();
    if (code.includes('SS01') || code.includes('VCB')) return "border-l-rose-500";
    if (code.includes('SS02')) return "border-l-blue-500";
    if (code.includes('SS03')) return "border-l-cyan-500";
    if (code.includes('SS04')) return "border-l-purple-500";
    if (code.includes('SS05')) return "border-l-amber-500";
    if (code.includes('SS06') || code.includes('SS07') || code.includes('SS08')) return "border-l-emerald-500";
    if (code.includes('SS09')) return "border-l-yellow-400";
    if (code.includes('SS10') || code.includes('BRAKE')) return "border-l-red-500";
    if (code.includes('SS19') || code.includes('WTB')) return "border-l-indigo-500";
    if (code.includes('GEN') || code.includes('COACH')) return "border-l-teal-500";
    return "border-l-orange-500";
  };

  const getQuickPromptStyle = (label: string, isDayMode: boolean) => {
    const l = (label || '').toLowerCase();
    if (l.includes('ब्रेक') || l.includes('brake') || l.includes('bp') || l.includes('mr') || l.includes('vcd')) {
      return isDayMode 
        ? "bg-rose-50 hover:bg-rose-100 text-rose-950 border-rose-300 shadow-sm" 
        : "bg-gradient-to-br from-rose-950/70 via-red-950/50 to-zinc-900 text-rose-200 border-rose-500/50 hover:border-rose-400 hover:shadow-rose-950/50";
    }
    if (l.includes('vcb') || l.includes('voltage') || l.includes('ohe') || l.includes('हार्मोनिक') || l.includes('nsn')) {
      return isDayMode 
        ? "bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-300 shadow-sm" 
        : "bg-gradient-to-br from-amber-950/70 via-orange-950/50 to-zinc-900 text-amber-200 border-amber-500/50 hover:border-amber-400 hover:shadow-amber-950/50";
    }
    if (l.includes('कन्वर्टर') || l.includes('bur') || l.includes('ऑक्सिलरी') || l.includes('होटल लोड') || l.includes('hlc')) {
      return isDayMode 
        ? "bg-sky-50 hover:bg-sky-100 text-sky-950 border-sky-300 shadow-sm" 
        : "bg-gradient-to-br from-sky-950/70 via-blue-950/50 to-zinc-900 text-sky-200 border-sky-500/50 hover:border-sky-400 hover:shadow-sky-950/50";
    }
    if (l.includes('wtb') || l.includes('बैटरी') || l.includes('इलेक्ट्रॉनिक्स') || l.includes('ce') || l.includes('f1901')) {
      return isDayMode 
        ? "bg-purple-50 hover:bg-purple-100 text-purple-950 border-purple-300 shadow-sm" 
        : "bg-gradient-to-br from-purple-950/70 via-indigo-950/50 to-zinc-900 text-purple-200 border-purple-500/50 hover:border-purple-400 hover:shadow-purple-950/50";
    }
    if (l.includes('पुश-पुल') || l.includes('डेड') || l.includes('रिवर्सल') || l.includes('कैब')) {
      return isDayMode 
        ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-emerald-300 shadow-sm" 
        : "bg-gradient-to-br from-emerald-950/70 via-teal-950/50 to-zinc-900 text-emerald-200 border-emerald-500/50 hover:border-emerald-400 hover:shadow-emerald-950/50";
    }
    return isDayMode 
      ? "bg-slate-50 hover:bg-slate-100 text-slate-900 border-slate-300" 
      : "bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-700 hover:border-amber-500/50";
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col font-sans transition-colors duration-200",
      isDay 
        ? "bg-gradient-to-br from-amber-50/60 via-slate-50 to-blue-50/50 text-slate-950" 
        : "bg-gradient-to-b from-[#0B0F19] via-[#0D1220] to-[#080B14] text-[#F4F4F5]",
      fontSize === 'extra-large' ? "text-xl sm:text-2xl" : fontSize === 'large' ? "text-lg sm:text-xl" : "text-base sm:text-lg"
    )}>
      {/* 🇮🇳 Indian Railways Tricolor & Amrit Bharat Livery Accent Ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-amber-300 via-emerald-400 to-blue-500 shadow-sm" />

      {/* Header */}
      <header className={cn(
        "border-b sticky top-0 z-30 transition-colors duration-200 backdrop-blur-md",
        isDay 
          ? "bg-white/95 border-amber-200/80 shadow-md" 
          : "bg-[#0c1424]/95 border-indigo-500/25 shadow-xl shadow-black/30"
      )}>
        <div className="max-w-3xl w-full mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-lg border-2 border-orange-500 bg-zinc-950 shrink-0 flex items-center justify-center ring-2 ring-orange-500/30">
              <img 
                src="/icon-192.png" 
                alt="Locomotive" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
              <span className={cn(
                "absolute -bottom-0.5 -right-0.5 text-[8px] font-black px-1 rounded-tl shadow-sm",
                locoType === 'amrit_bharat' ? "bg-emerald-400 text-black font-extrabold" : "bg-gradient-to-r from-orange-500 to-amber-400 text-black font-extrabold"
              )}>
                {locoType === 'amrit_bharat' ? 'AB' : 'WAP'}
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className={cn(
                  "text-sm sm:text-base font-black tracking-wider uppercase",
                  locoType === 'amrit_bharat' 
                    ? (isDay ? "text-emerald-800" : "bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-300 bg-clip-text text-transparent") 
                    : (isDay ? "text-orange-700" : "bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent")
                )}>
                  {locoType === 'amrit_bharat' ? 'LocoAssist • Amrit Bharat' : 'LocoAssist Pro'}
                </span>
                <span className={cn(
                  "text-[10px] sm:text-xs font-black px-1.5 py-0.5 rounded border uppercase shadow-sm",
                  locoType === 'amrit_bharat' 
                    ? (isDay ? "bg-emerald-100 text-emerald-900 border-emerald-300" : "bg-emerald-950/80 text-emerald-300 border-emerald-500/60")
                    : (isDay ? "bg-orange-100 text-orange-900 border-orange-300" : "bg-orange-950/80 text-orange-300 border-orange-500/60")
                )}>
                  {locoType === 'amrit_bharat' ? 'Push-Pull' : '3-Phase'}
                </span>
              </div>
              <span className={cn("text-xs mt-1 font-semibold hidden xs:inline", isDay ? "text-slate-600" : "text-slate-400")}>
                {locoType === 'amrit_bharat' 
                  ? 'Aerodynamic WAP-5 Push-Pull & Coaches (CLW 67p TSD)' 
                  : '3 Phase Troubleshooter & Vadodara Directory (254p)'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* 🌙 CAB VISIBILITY TOGGLE (HIGH CONTRAST DAY vs NIGHT) */}
            <button
              type="button"
              onClick={() => setCabMode(prev => prev === 'night' ? 'day' : 'night')}
              className={cn(
                "inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-black border transition-all cursor-pointer shadow-sm active:scale-95",
                isDay
                  ? "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-950 border-amber-400 hover:bg-amber-200"
                  : "bg-gradient-to-r from-slate-800 to-indigo-950 text-amber-300 border-indigo-500/50 hover:border-amber-400"
              )}
              title={isDay ? "नाइट कैब मोड चालू करें (Dark Cab Night)" : "डे एंटी-ग्लेयर मोड चालू करें (Sunlight Anti-Glare Day)"}
            >
              {isDay ? <Sun className="w-3.5 h-3.5 text-amber-600" /> : <Moon className="w-3.5 h-3.5 text-amber-400" />}
              <span className="hidden sm:inline">{isDay ? 'डे मोड' : 'नाइट मोड'}</span>
            </button>

            {/* 🔤 FONT SIZE SELECTOR (LP READABILITY - ACCESSIBLE ON ALL DEVICES) */}
            <div className={cn(
              "flex items-center rounded-xl border-2 p-0.5 shadow-md transition-all",
              isDay ? "bg-amber-100/80 border-amber-300 text-slate-800" : "bg-[#111A30] border-amber-500/50 text-amber-300"
            )}>
              <button
                type="button"
                onClick={() => setFontSize('normal')}
                className={cn(
                  "px-2.5 py-1 rounded-lg transition-all text-xs font-black cursor-pointer",
                  fontSize === 'normal' 
                    ? (isDay ? "bg-slate-900 text-white shadow" : "bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-md") 
                    : (isDay ? "text-slate-700 hover:text-slate-950" : "text-amber-400/70 hover:text-white")
                )}
                title="सामान्य फॉन्ट (Normal Font)"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize('large')}
                className={cn(
                  "px-2.5 py-1 rounded-lg transition-all text-xs font-black cursor-pointer",
                  fontSize === 'large' 
                    ? (isDay ? "bg-slate-900 text-white shadow" : "bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-md") 
                    : (isDay ? "text-slate-700 hover:text-slate-950" : "text-amber-400/70 hover:text-white")
                )}
                title="बड़ा फॉन्ट - अनुशंसित (Large Font)"
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => setFontSize('extra-large')}
                className={cn(
                  "px-2.5 py-1 rounded-lg transition-all text-xs font-black cursor-pointer",
                  fontSize === 'extra-large' 
                    ? (isDay ? "bg-slate-900 text-white shadow" : "bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-md") 
                    : (isDay ? "text-slate-700 hover:text-slate-950" : "text-amber-400/70 hover:text-white")
                )}
                title="अति विशाल फॉन्ट (Extra Large Font)"
              >
                A++
              </button>
            </div>

            {/* Mobile PWA Install */}
            <button
              onClick={() => {
                if (isInstallable) {
                  install();
                } else {
                  setShowMobileModal(true);
                }
              }}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md border border-emerald-400/40 transition-all active:scale-95 cursor-pointer shrink-0"
              title="अपने मोबाइल में चलाएं और होम स्क्रीन पर ऐप लगाएं"
            >
              <Smartphone className="w-3.5 h-3.5 text-white" />
              <span className="hidden xs:inline">{isInstalled ? '✅ इंस्टॉल है' : isInstallable ? '⚡ इंस्टॉल करें' : '📲 ऐप बनाएं'}</span>
            </button>
          </div>
        </div>

        {/* Mobile PWA Install Sticky Notification Bar (Visible if not in standalone mode) */}
        {!isInstalled && (
          <div className="bg-gradient-to-r from-emerald-950/90 via-[#18181B] to-amber-950/90 border-t border-b border-emerald-800/40 px-3 py-2 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-zinc-200 truncate">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="truncate text-xs text-emerald-200">
                {isInstallable 
                  ? '📱 ऐप इंस्टॉल करने के लिए तैयार है!' 
                  : isInAppBrowser 
                    ? '⚠️ WhatsApp/मैसेज में खुला है: Chrome में खोलें' 
                    : '📲 होम स्क्रीन पर जोड़कर सीधे ऐप बनाएं'}
              </span>
            </div>
            <button
              onClick={() => {
                if (isInstallable) {
                  install();
                } else {
                  setShowMobileModal(true);
                }
              }}
              className="shrink-0 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-md shadow text-[11px] flex items-center gap-1 transition-all active:scale-95"
            >
              <Smartphone className="w-3 h-3" />
              <span>{isInstallable ? '⚡ इंस्टॉल' : 'तरीका देखें'}</span>
            </button>
          </div>
        )}
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {!selectedFault ? (
            <motion.div 
              key="catalog-main"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col h-full"
            >
              <div className="bg-[#0A0A0B] px-4 py-3 z-10 shrink-0 border-b border-[#27272A] flex flex-col gap-3">
                {/* Primary 2-Tab Locomotive Switcher */}
                <div className="grid grid-cols-2 p-1.5 bg-[#121214] rounded-xl border border-[#27272A] gap-2 shadow-inner">
                  <button
                    type="button"
                    onClick={() => {
                      setLocoType('3phase');
                      setSelectedSystem(null);
                      setSelectedFault(null);
                    }}
                    className={cn(
                      "py-2.5 px-3 rounded-lg text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all",
                      locoType === '3phase'
                        ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-950/50 border border-orange-400/40 font-black"
                        : "text-[#A1A1AA] hover:text-white hover:bg-[#1C1C1F]"
                    )}
                  >
                    <Activity className="w-4 h-4 text-orange-200" />
                    <div className="flex flex-col text-left sm:text-center leading-tight">
                      <span className="font-extrabold tracking-wide">3-फ़ेस लोको (3-Phase)</span>
                      <span className="text-xs font-normal opacity-85">WAP-7 / WAG-9 (254p)</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLocoType('amrit_bharat');
                      setSelectedSystem(null);
                      setSelectedFault(null);
                    }}
                    className={cn(
                      "py-2.5 px-3 rounded-lg text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all",
                      locoType === 'amrit_bharat'
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/50 border border-emerald-400/40 font-black"
                        : "text-[#A1A1AA] hover:text-white hover:bg-[#1C1C1F]"
                    )}
                  >
                    <Layers className="w-4 h-4 text-emerald-200" />
                    <div className="flex flex-col text-left sm:text-center leading-tight">
                      <span className="font-extrabold tracking-wide">अमृत भारत (Amrit Bharat)</span>
                      <span className="text-xs font-normal opacity-85">Push-Pull WAP-5 (67p)</span>
                    </div>
                  </button>
                </div>

                {/* 3-Tab Navigation: Catalog, AI Assistant, Directory Reader */}
                <div className={cn(
                  "flex p-1.5 rounded-2xl border-2 gap-1.5 shadow-md transition-colors",
                  isDay ? "bg-slate-200/80 border-slate-300" : "bg-[#0c1424] border-indigo-950"
                )}>
                  <button 
                    onClick={() => {
                      setMode('browse');
                      setSelectedFault(null);
                    }} 
                    className={cn(
                      "flex-1 py-2.5 px-2 text-sm sm:text-base rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm", 
                      mode === 'browse' 
                        ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 font-black scale-[1.02]" 
                        : (isDay ? "text-slate-700 hover:text-blue-700 hover:bg-blue-50/50 font-bold" : "text-slate-300 hover:text-white hover:bg-slate-800/50 font-bold")
                    )}
                  >
                    <Search className="w-4 h-4" />
                    <span>कैटलॉग (TSD)</span>
                  </button>
                  <button 
                    onClick={() => setMode('ai')} 
                    className={cn(
                      "flex-1 py-2.5 px-2 text-sm sm:text-base rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm", 
                      mode === 'ai' 
                        ? (locoType === 'amrit_bharat' 
                            ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-black shadow-lg shadow-emerald-500/30 font-black scale-[1.02]" 
                            : "bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-500 text-black shadow-lg shadow-orange-500/30 font-black scale-[1.02]")
                        : (isDay ? "text-slate-700 hover:text-orange-600 hover:bg-orange-50/50 font-bold" : "text-slate-300 hover:text-amber-400 hover:bg-slate-800/50 font-bold")
                    )}
                  >
                    <Sparkles className="w-4 h-4"/> <span>AI सहायक</span>
                  </button>

                  <button 
                    onClick={() => {
                      setMode('manual');
                      if (!manualInfo) fetchManualInfo(locoType);
                    }} 
                    className={cn(
                      "flex-1 py-2.5 px-2 text-sm sm:text-base rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm", 
                      mode === 'manual' 
                        ? "bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30 font-black scale-[1.02]" 
                        : (isDay ? "text-slate-700 hover:text-purple-600 hover:bg-purple-50/50 font-bold" : "text-slate-300 hover:text-purple-400 hover:bg-slate-800/50 font-bold")
                    )}
                  >
                    <BookOpen className="w-4 h-4"/> <span>{locoType === 'amrit_bharat' ? 'TSD बुक (67p)' : 'TSD डायरेक्टरी'}</span>
                  </button>
                </div>

                {mode === 'browse' && (
                  <div className="relative">
                    <Search className={cn("absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4", isDay ? "text-amber-600" : "text-amber-400")} />
                    <input 
                      type="text" 
                      placeholder="दोष कोड या समस्या खोजें... (उदा. P56 BP, P55 Panto, P53 Brakes, CE, F0101P1)" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={cn(
                        "w-full pl-10 pr-4 py-2.5 rounded-xl border-2 text-sm font-bold transition-all outline-none shadow-sm",
                        isDay 
                          ? "bg-white border-amber-300 text-slate-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200" 
                          : "bg-[#0d1424] border-indigo-900 text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                      )}
                    />
                  </div>
                )}
              </div>

              {mode === 'browse' ? (
                <>
                  {/* Sub Systems Scroller with Color-coded Badges */}
                  <div className={cn(
                    "border-b shrink-0 transition-colors shadow-sm",
                    isDay ? "bg-slate-200/60 border-slate-300" : "bg-[#0c1322] border-indigo-950/80"
                  )}>
                    <div className="overflow-x-auto hide-scrollbar flex gap-2 px-4 py-2.5">
                      <button
                        onClick={() => setSelectedSystem(null)}
                        className={cn(
                          "px-4 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all shadow-sm border",
                          selectedSystem === null 
                            ? (isDay ? "bg-slate-900 text-white border-slate-900 shadow-md" : "bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 text-black border-amber-300 shadow-md shadow-amber-500/30 scale-105") 
                            : (isDay ? "bg-white text-slate-800 border-slate-300 hover:bg-slate-100" : "bg-slate-900/80 text-zinc-300 border-slate-700 hover:bg-slate-800")
                        )}
                      >
                        {locoType === 'amrit_bharat' ? '🌟 सभी सिस्टम (All)' : '🌟 All Systems'}
                      </button>
                      {currentSubSystems.map((sys) => {
                        const isSelected = selectedSystem === sys.id;
                        const badgeStyle = getSubsystemBadgeStyle(sys.id, isDay);
                        return (
                          <button
                            key={sys.id}
                            onClick={() => setSelectedSystem(sys.id)}
                            className={cn(
                              "px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all shadow-sm border cursor-pointer",
                              isSelected 
                                ? "ring-2 ring-amber-400 scale-105 " + badgeStyle
                                : badgeStyle + " hover:scale-102 hover:shadow-md"
                            )}
                          >
                            {sys.id} - {sys.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Faults List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {filteredFaults.length > 0 ? (
                      filteredFaults.map((fault, idx) => (
                        <div 
                          key={`${fault.id}-${idx}`}
                          onClick={() => setSelectedFault(fault)}
                          className={cn(
                            "rounded-2xl p-4 sm:p-5 border-2 border-l-[6px] cursor-pointer transition-all active:scale-[0.99] shadow-md",
                            getSubsystemLeftAccent(fault.subSystem),
                            isDay 
                              ? "bg-white border-slate-200 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/10" 
                              : "bg-gradient-to-br from-[#0F1424] via-[#0E1320] to-[#0A0D16] border-[#1E2945] hover:border-amber-400/80 hover:shadow-xl hover:shadow-amber-500/10"
                          )}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white text-[11px] uppercase font-black px-3 py-1 rounded-lg shadow-sm border border-red-400/30">
                                {fault.id}
                              </span>
                              <span className={cn(
                                "text-[11px] uppercase font-black tracking-wider px-2.5 py-0.5 rounded-lg border",
                                getSubsystemBadgeStyle(fault.subSystem, isDay)
                              )}>
                                {fault.subSystem}
                              </span>
                              {fault.lamp && (
                                <span className={cn(
                                  "text-[10px] px-2 py-0.5 rounded-lg font-bold border inline-flex items-center gap-1",
                                  isDay ? "bg-amber-50 text-amber-900 border-amber-300" : "bg-amber-950/70 text-amber-300 border-amber-500/50"
                                )}>
                                  <Lightbulb className="w-3 h-3 text-amber-400 fill-current" />
                                  <span className="truncate max-w-[150px]">{fault.lamp.split('(')[0]}</span>
                                </span>
                              )}
                              {fault.masterEffect && (
                                <span className={cn(
                                  "text-[10px] px-2.5 py-0.5 rounded-lg font-black border uppercase tracking-wider",
                                  isDay ? "bg-blue-100 text-blue-900 border-blue-300" : "bg-blue-950 text-blue-300 border-blue-800"
                                )}>
                                  Master / Slave
                                </span>
                              )}
                            </div>
                            <ChevronRight className={cn("w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1", isDay ? "text-amber-500" : "text-amber-400")} />
                          </div>

                          <h3 className={cn(
                            "mt-2.5 font-black tracking-tight leading-snug line-clamp-2",
                            fontSize === 'extra-large' ? 'text-lg sm:text-xl' : fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base',
                            isDay ? "text-slate-950" : "text-white"
                          )}>
                            {fault.message.split('\n')[0]}
                          </h3>

                          <p className={cn(
                            "mt-1 font-semibold line-clamp-2 leading-relaxed",
                            fontSize === 'extra-large' ? 'text-base sm:text-lg' : fontSize === 'large' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm',
                            isDay ? "text-slate-700" : "text-slate-300"
                          )}>
                            {fault.effect}
                          </p>

                          {/* Quick Card Footer */}
                          <div className={cn(
                            "mt-3 pt-2.5 border-t flex items-center justify-between gap-2",
                            isDay ? "border-slate-200" : "border-slate-800/80"
                          )}>
                            <span className={cn(
                              "font-black px-2.5 py-1 rounded-lg border",
                              fontSize === 'extra-large' ? 'text-sm' : 'text-xs',
                              isDay ? "bg-amber-100 text-amber-950 border-amber-300" : "bg-amber-950/50 text-amber-300 border-amber-500/40"
                            )}>
                              ⚡ {fault.actions.filter(a => typeof a === 'string' && a.trim() && !a.startsWith('═') && !a.startsWith('【')).length} निवारण चरण
                            </span>
                            <span className={cn(
                              "font-black px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all shadow-sm",
                              fontSize === 'extra-large' ? 'text-sm' : 'text-xs',
                              isDay 
                                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black border-amber-400 shadow-amber-200" 
                                : "bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-300 border-amber-500/50 hover:bg-amber-500/40"
                            )}>
                              <span>निवारण देखें</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className={cn("h-40 flex flex-col items-center justify-center font-bold", isDay ? "text-slate-500" : "text-zinc-500")}>
                        <Search className="w-8 h-8 mb-2 opacity-50" />
                      </div>
                    )}
                  </div>
                </>
              ) : mode === 'ai' ? (
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">
                  <div className={cn(
                    "rounded-2xl p-5 sm:p-6 border-2 transition-all shadow-xl",
                    isDay 
                      ? "bg-gradient-to-br from-amber-50/90 via-white to-orange-50/50 border-amber-300 shadow-amber-500/10" 
                      : "bg-gradient-to-br from-[#0c1427] via-[#0f172a] to-[#080d1a] border-amber-500/50 shadow-2xl shadow-black/50"
                  )}>
                    <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-black font-black shadow-md border border-amber-300">
                          <Bot className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <h2 className={cn(
                            "font-black tracking-tight",
                            fontSize === 'extra-large' ? 'text-xl sm:text-2xl' : fontSize === 'large' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg',
                            isDay ? "text-slate-950" : "text-white"
                          )}>
                            Describe Loco Defect (समस्या का विवरण दें)
                          </h2>
                          <p className={cn("text-xs font-bold", isDay ? "text-slate-600" : "text-amber-400/90")}>
                            {locoType === 'amrit_bharat' ? 'CLW 67-Page TSD (Push-Pull WAP-5)' : 'Vadodara 254-Page TSD (3-Phase WAP-7/WAG-9)'}
                          </p>
                        </div>
                      </div>

                      <span className={cn(
                        "text-xs font-black px-3 py-1 rounded-xl border shadow-sm",
                        locoType === 'amrit_bharat'
                          ? (isDay ? "bg-emerald-100 text-emerald-900 border-emerald-300" : "bg-emerald-950/80 text-emerald-300 border-emerald-500/50")
                          : (isDay ? "bg-orange-100 text-orange-900 border-orange-300" : "bg-orange-950/80 text-orange-300 border-orange-500/50")
                      )}>
                        {locoType === 'amrit_bharat' ? '⚡ पुश-पुल TSD मोड' : '⚡ 3-फेज TSD मोड'}
                      </span>
                    </div>

                    {/* LOCO PILOT VOICE INPUT (SPEECH-TO-TEXT MIC BUTTON) */}
                    <div className="mb-3 space-y-2">
                      <div className="flex items-center justify-between gap-2 px-1 text-xs">
                        <span className="font-bold text-zinc-400 flex items-center gap-1.5">
                          <span>🎙️</span> <span>लोको पायलट वॉयस इनपुट (बोलकर खोजें):</span>
                        </span>
                        <div className="flex items-center gap-1 bg-black/30 p-0.5 rounded-lg border border-zinc-700/60">
                          <button
                            type="button"
                            onClick={() => setVoiceInputLang('hi-IN')}
                            className={cn(
                              "px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer",
                              voiceInputLang === 'hi-IN'
                                ? "bg-amber-400 text-amber-950 shadow-sm"
                                : "text-zinc-400 hover:text-zinc-200"
                            )}
                          >
                            🇮🇳 हिंदी / Hinglish
                          </button>
                          <button
                            type="button"
                            onClick={() => setVoiceInputLang('en-IN')}
                            className={cn(
                              "px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer",
                              voiceInputLang === 'en-IN'
                                ? "bg-amber-400 text-amber-950 shadow-sm"
                                : "text-zinc-400 hover:text-zinc-200"
                            )}
                          >
                            🇬🇧 English
                          </button>
                        </div>
                      </div>

                      {isInIframe && (
                        <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-base shrink-0">💡</span>
                            <span className="text-amber-200 font-semibold leading-tight">
                              आप प्रीव्यू फ्रेम में हैं। ब्राउज़र सुरक्षा नीति (iFrame Sandbox) के कारण माइक <strong>सीधे अलग टैब</strong> में काम करता है।
                            </span>
                          </div>
                          <a
                            href={typeof window !== 'undefined' ? window.location.href : '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs shrink-0 cursor-pointer shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1.5 border border-amber-300"
                          >
                            <span>अलग टैब में खोलें</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={toggleVoiceInput}
                        className={cn(
                          "w-full py-3.5 px-4 rounded-2xl font-black flex items-center justify-between gap-3 transition-all shadow-md active:scale-[0.98] border-2 cursor-pointer",
                          isVoiceInputActive
                            ? "bg-red-600 hover:bg-red-500 text-white border-red-300 ring-4 ring-red-400/50 shadow-red-500/50 animate-pulse"
                            : isDay
                              ? "bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-700 hover:to-red-700 text-white border-rose-300 shadow-rose-950/10"
                              : "bg-gradient-to-r from-rose-700 via-red-800 to-amber-900 hover:from-rose-600 hover:to-red-700 text-white border-rose-500/60 shadow-black/40"
                        )}
                        title="माइक दबाकर अपनी आवाज में लोको की समस्या बोलें"
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                            isVoiceInputActive 
                              ? "bg-white text-red-600 border-white shadow-inner animate-spin" 
                              : "bg-white/20 text-white border-white/30"
                          )}>
                            {isVoiceInputActive ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-amber-200" />}
                          </div>
                          <div className="text-left">
                            <div className="flex items-center gap-2">
                              <span className="font-black text-sm sm:text-base tracking-wide">
                                {isVoiceInputActive ? "🔴 माइक सक्रिय: समस्या बोलिए..." : "🎙️ बोलकर बताएं (माइक चालू करें)"}
                              </span>
                              <span className={cn(
                                "text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-sm",
                                isVoiceInputActive ? "bg-white text-red-700 animate-pulse" : "bg-amber-400 text-amber-950"
                              )}>
                                {isVoiceInputActive ? "LISTENING" : "VOICE MIC"}
                              </span>
                            </div>
                            <p className="text-xs text-rose-100 font-medium">
                              {isVoiceInputActive ? "बोलना पूरा होने पर 'रोकें' दबाएं या थोड़ा रुकें" : "माइक दबाकर समस्या बोलें (उदा. 'VCB बंद नहीं हो रहा', 'स्पीडोमीटर फॉल्ट')"}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/25 text-xs font-black border border-white/20">
                          {isVoiceInputActive ? "रोकें (Stop)" : "बोलें (Speak)"}
                        </div>
                      </button>

                      {voiceInputError && (
                        <div className="text-xs text-rose-200 font-bold p-3 bg-rose-950/90 rounded-xl border border-rose-700 shadow-lg space-y-2">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                              <span>{voiceInputError}</span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              {isInIframe && (
                                <a
                                  href={typeof window !== 'undefined' ? window.location.href : '#'}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1 rounded-lg bg-orange-500 hover:bg-orange-400 text-white font-black text-xs shrink-0 cursor-pointer shadow-sm transition-all active:scale-95 flex items-center gap-1 border border-orange-400"
                                >
                                  <span>🔗 अलग टैब में खोलें</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                              <button
                                type="button"
                                onClick={handleRequestMicPermission}
                                className="px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs shrink-0 cursor-pointer shadow-sm transition-all active:scale-95 flex items-center gap-1"
                              >
                                <span>⚡</span>
                                <span>अनुमति दें (Allow Mic)</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setVoicePermissionGuideOpen(!voicePermissionGuideOpen)}
                                className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs shrink-0 cursor-pointer border border-zinc-600 transition-all"
                              >
                                {voicePermissionGuideOpen ? "छुपाएं" : "ℹ️ कैसे चालू करें?"}
                              </button>
                            </div>
                          </div>

                          {voicePermissionGuideOpen && (
                            <div className="p-2.5 rounded-lg bg-black/40 border border-rose-800/80 text-[11px] space-y-1.5 font-normal text-zinc-300 mt-2">
                              <p className="font-bold text-amber-300 text-xs flex items-center gap-1">
                                <span>🔧</span> <span>ब्राउज़र में माइक अनुमति (Mic Permission) चालू करने के 3 आसान चरण:</span>
                              </p>
                              <p>• <strong>चरण 1:</strong> ब्राउज़र के सबसे ऊपर एड्रेस बार में वेबसाइट लिंक (URL) के पास 🔒 (ताला/लॉक) या ⚙️ आइकन दबाएं।</p>
                              <p>• <strong>चरण 2:</strong> <strong>"Permissions" (अनुमतियाँ)</strong> में जाकर <strong>"Microphone" (माइक्रोफ़ोन)</strong> को <strong>Allow / चालू</strong> करें।</p>
                              <p>• <strong>चरण 3:</strong> पेज को रिफ्रेश (Reload) करें और ऊपर माइक बटन दबाएं।</p>
                              <div className="pt-1 flex items-center justify-between border-t border-zinc-800">
                                <span>यदि आप प्रीव्यू/आईफ्रेम में हैं:</span>
                                <a
                                  href={typeof window !== 'undefined' ? window.location.href : '#'}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-amber-400 hover:text-amber-300 font-bold underline flex items-center gap-1 cursor-pointer"
                                >
                                  <span>🔗 नए अलग टैब में खोलें (Open Full Tab)</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Textarea with colorful styling */}
                    <div className="relative mb-3.5">
                      <textarea
                        value={aiQuery}
                        onChange={e => setAiQuery(e.target.value)}
                        placeholder="समस्या या फॉल्ट कोड यहाँ लिखें या ऊपर माइक दबाकर बोलें... (उदा. 'स्लेव लोको ब्रेक रिलीज नहीं हो रहा', 'F0903P2 बैटरी चार्जर करंट', 'VCB not closing', 'MCP 1 trip')..."
                        className={cn(
                          "w-full h-28 border-2 rounded-2xl p-4 font-bold focus:outline-none resize-none transition-all shadow-inner",
                          fontSize === 'extra-large' ? 'text-lg sm:text-xl' : fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base',
                          isDay 
                            ? "bg-white border-amber-300 text-slate-950 placeholder-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200" 
                            : "bg-[#080d1a] border-indigo-900/80 text-zinc-100 placeholder-zinc-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/30"
                        )}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                            handleAiSubmit();
                          }
                        }}
                      />

                      <div className="absolute right-3 top-3 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={toggleVoiceInput}
                          title={isVoiceInputActive ? "माइक बंद करें" : "माइक से बोलें"}
                          className={cn(
                            "text-xs font-black px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1 cursor-pointer",
                            isVoiceInputActive
                              ? "bg-red-600 text-white border-red-400 animate-pulse"
                              : "bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border-rose-500/40"
                          )}
                        >
                          <Mic className="w-3.5 h-3.5" />
                          <span>{isVoiceInputActive ? 'Listening' : 'Mic'}</span>
                        </button>
                        {aiQuery && (
                          <>
                            <button
                              type="button"
                              onClick={() => setAiQuery(cleanRailwayVoiceText(aiQuery))}
                              title="तकनीकी शब्दों को सही करें"
                              className="text-xs font-black bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 px-2.5 py-1 rounded-lg border border-amber-500/40 transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                              <span>शब्द सुधारें</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setAiQuery('')}
                              title="हटाएं"
                              className="text-xs font-black bg-zinc-800/80 text-zinc-300 hover:text-white px-2.5 py-1 rounded-lg border border-zinc-700 transition-colors cursor-pointer"
                            >
                              Clear
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Quick 1-Tap Defect Selection Chips for Fast LP Cab Operation */}
                    <div className="mb-3">
                      <div className="text-[11px] font-bold text-zinc-400 mb-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <span className="text-amber-400">⚡</span>
                          <span>1-टैप तुरंत समस्या चयन (माइक न चलने या शोर होने पर):</span>
                        </span>
                        <span className="text-[10px] text-amber-400 font-semibold">1-क्लिक समाधान</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { label: 'VCB क्लोज नहीं हो रहा / Trip', query: 'VCB close nahi ho raha ya VCB trip' },
                          { label: 'Panto नहीं उठ रहा', query: 'Panto raise nahi ho raha' },
                          { label: 'F1501P1 फायर अलार्म', query: 'F1501P1 Fire detection in machine room' },
                          { label: 'F1601P1 स्पीडोमीटर', query: 'F1601P1 speed limit exceeded speedometer' },
                          { label: 'SS19 ट्रेन बस', query: 'SS19 Train Bus isolated' },
                          { label: 'MCB 112.1 ट्रिप', query: 'MCB 112.1 trip SB-2' },
                          { label: 'BUR 1/2/3 फॉल्ट', query: 'BUR fault auxiliary converter' },
                          { label: 'MR प्रेशर ड्रॉप', query: 'MR pressure drop compressor low' },
                        ].map((chip, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setAiQuery(chip.query);
                              handleAiSubmit(chip.query);
                            }}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-zinc-800/90 hover:bg-amber-400 hover:text-amber-950 text-zinc-200 border border-zinc-700/80 transition-all cursor-pointer active:scale-95 shadow-sm"
                          >
                            {chip.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* AI Submit Button with vibrant colorful gradient */}
                    <button 
                      onClick={() => handleAiSubmit()}
                      disabled={aiLoading || !aiQuery.trim()}
                      className="w-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:via-orange-400 hover:to-amber-400 text-black font-black py-3.5 px-6 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2.5 transition-all shadow-lg shadow-orange-500/30 active:scale-[0.99] border-2 border-amber-300 cursor-pointer text-base sm:text-lg"
                    >
                      {aiLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                      <span>{aiLoading ? "TSD मैन्युअल से निवारण खोज रहे हैं..." : "⚡ Analyze Defect (निवारण कार्यवाही खोजें)"}</span>
                    </button>
                  </div>

                  {/* Error Notification Banner */}
                  {aiError && (
                    <div className="bg-red-950/60 border border-red-800 rounded-lg p-4 flex items-start gap-3 text-red-200">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <div className="flex-1 text-sm">
                        <p className="font-semibold text-red-300">त्रुटि (Error):</p>
                        <p className="mt-0.5 text-red-200/90">{aiError}</p>
                        <div className="flex flex-wrap gap-2 mt-2.5">
                          <button
                            onClick={() => handleAiSubmit()}
                            className="text-xs bg-red-900/60 hover:bg-red-800 text-white font-medium px-3 py-1.5 rounded border border-red-700 transition-colors"
                          >
                            पुनः प्रयास करें (Retry)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (typeof window !== 'undefined') {
                                window.location.reload();
                              }
                            }}
                            className="text-xs bg-[#27272A] hover:bg-[#3F3F46] text-orange-400 font-medium px-3 py-1.5 rounded border border-orange-500/40 transition-colors flex items-center gap-1.5 shadow-sm"
                          >
                            🔄 ऐप रिफ्रेश करें (Reload App)
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {!aiResult && !aiLoading && (
                    <div className={cn(
                      "border-2 rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-3.5 shadow-xl transition-all",
                      isDay 
                        ? "bg-gradient-to-b from-white via-amber-50/40 to-white border-amber-300 shadow-amber-500/10" 
                        : "bg-gradient-to-b from-[#0c1427] via-[#0e172e] to-[#080d1a] border-indigo-900/60 shadow-2xl"
                    )}>
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-black shadow-lg border-2 border-amber-300">
                        <Bot className="w-7 h-7 text-black" />
                      </div>
                      <div className="max-w-md">
                        <h3 className={cn(
                          "font-black tracking-tight",
                          fontSize === 'extra-large' ? 'text-xl sm:text-2xl' : fontSize === 'large' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg',
                          isDay ? "text-slate-950" : "text-white"
                        )}>
                          {locoType === 'amrit_bharat' ? 'अमृत भारत TSD AI दोष निवारक' : '3-फ़ेस लोको TSD सहायक'}
                        </h3>
                        <p className={cn(
                          "mt-1 leading-relaxed font-semibold",
                          isDay ? "text-slate-700" : "text-zinc-300",
                          fontSize === 'extra-large' ? 'text-base sm:text-lg' : fontSize === 'large' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                        )}>
                          लोको में आ रही समस्या या फॉल्ट कोड ऊपर लिखें, या नीचे दिए गए किसी भी तकनीकी विकल्प पर क्लिक करें:
                        </p>
                      </div>
                      <div className="w-full mt-2">
                        <span className={cn(
                          "font-black uppercase tracking-wider text-amber-500 mb-3 block text-center flex items-center justify-center gap-1.5",
                          fontSize === 'extra-large' ? 'text-base' : 'text-sm'
                        )}>
                          <span>⚡</span> <span>त्वरित प्रश्न / आधिकारिक TSD विषय (Quick Prompts):</span>
                        </span>
                        <div className="flex flex-wrap justify-center gap-2.5 max-h-80 overflow-y-auto p-1.5">
                          {activeQuickPrompts.map((qp, qIdx) => (
                            <button
                              key={qIdx}
                              type="button"
                              onClick={() => {
                                setAiQuery(qp.query);
                                handleAiSubmit(qp.query);
                              }}
                              className={cn(
                                "font-bold px-4 py-2.5 rounded-xl border-2 transition-all text-left shadow-md active:scale-95 cursor-pointer flex items-center gap-2",
                                getQuickPromptStyle(qp.label, isDay),
                                fontSize === 'extra-large' ? 'text-base sm:text-lg' : fontSize === 'large' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                              )}
                            >
                              <span className="shrink-0 text-base">⚡</span>
                              <span className="leading-snug">{qp.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {aiResult && (
                    <div className={cn(
                      "rounded-2xl p-5 sm:p-6 border-2 transition-all flex flex-col gap-5 shadow-2xl",
                      isDay 
                        ? "bg-gradient-to-b from-amber-50/90 via-white to-blue-50/50 border-amber-400 shadow-xl" 
                        : "bg-gradient-to-b from-[#0F172A] via-[#111C35] to-[#0A0F1D] border-amber-500/70 shadow-[0_0_35px_rgba(245,158,11,0.2)]"
                    )}>
                      {/* Fault Header with ID and Catalog Link */}
                      <div className={cn(
                        "flex flex-col gap-2.5 border-b pb-4",
                        isDay ? "border-amber-200" : "border-indigo-950"
                      )}>
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <ShieldAlert className="w-5 h-5 text-amber-500" />
                            <span className={cn("text-xs font-black uppercase tracking-wider", isDay ? "text-slate-700" : "text-amber-400/90")}>
                              Identified Fault Code:
                            </span>
                            {aiResult.identifiedFaultId ? (
                              <span className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-black px-3.5 py-1 rounded-xl text-sm tracking-wide shadow-md border border-red-400/40">
                                {aiResult.identifiedFaultId}
                              </span>
                            ) : (
                              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/50 px-3 py-1 rounded-xl text-xs font-bold">
                                General Defect
                              </span>
                            )}
                            {aiResult.verifiedFromPdf && (
                              <span className="bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 text-xs font-bold px-2.5 py-1 rounded-xl flex items-center gap-1.5 shadow-sm">
                                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                                <span>CLW TSD Verified</span>
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {matchedCatalogFault && (
                              <button
                                onClick={() => setSelectedFault(matchedCatalogFault)}
                                className={cn(
                                  "text-xs flex items-center gap-1.5 border-2 px-3 py-1.5 rounded-xl font-black transition-all shadow-sm active:scale-95 cursor-pointer",
                                  isDay 
                                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black border-amber-400 hover:from-amber-400 hover:to-orange-400 shadow-amber-200" 
                                    : "bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-300 border-amber-500/60 hover:bg-amber-500/40"
                                )}
                              >
                                <span>कैटलॉग में देखें</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {aiResult.faultTitle && (
                          <h3 className={cn(
                            "font-black tracking-tight leading-snug mt-1",
                            fontSize === 'extra-large' ? 'text-2xl sm:text-3xl' : fontSize === 'large' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl',
                            isDay ? "text-slate-950" : "text-white"
                          )}>
                            {aiResult.faultTitle}
                          </h3>
                        )}
                      </div>

                      {/* Analysis Section */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-4 h-4 text-blue-400" />
                          <h4 className="font-black text-xs uppercase tracking-widest text-blue-400">Analysis (कारण एवं विवरण)</h4>
                        </div>
                        <div className={cn(
                          "p-4 sm:p-5 rounded-2xl border-2 shadow-md leading-relaxed font-semibold transition-all",
                          isDay 
                            ? "bg-sky-50 border-sky-300 text-sky-950" 
                            : "bg-[#0B132B]/90 border-blue-500/40 text-blue-100",
                          fontSize === 'extra-large' ? 'text-lg sm:text-xl' : fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                        )}>
                          {aiResult.analysis}
                        </div>
                      </div>

                      {/* Suggested Actions Section */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3.5 flex-wrap">
                          <div className="flex items-center gap-2">
                            <Wrench className="w-5 h-5 text-amber-500" />
                            <h4 className={cn(
                              "font-black uppercase tracking-wider text-amber-500",
                              fontSize === 'extra-large' ? 'text-lg sm:text-xl' : fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                            )}>
                              Loco Pilot Troubleshooting Actions (दोष निवारण कार्यवाही)
                            </h4>
                          </div>
                        </div>

                        {/* LOCO PILOT VOICE ASSISTANT BUTTON / PLAYER */}
                        {aiResult.suggestedActions && aiResult.suggestedActions.length > 0 && (
                          <div className="mb-4">
                            <VoiceTroubleshooterPlayer
                              steps={aiResult.suggestedActions}
                              faultTitle={aiResult.faultTitle || "दोष निवारण कार्यवाही"}
                              isDay={isDay}
                              fontSize={fontSize}
                              onActiveStepChange={setAiVoiceActiveIndex}
                            />
                          </div>
                        )}

                        <div className="space-y-3.5">
                          {(() => {
                            const validActions = (aiResult.suggestedActions || [])
                              .map(a => (typeof a === 'string' ? a.trim() : ''))
                              .filter(a => a.length > 0);

                            let stepCounter = 0;

                            return validActions.map((action, idx) => {
                              const isHeader = action.startsWith('═') || action.startsWith('【') || action.endsWith('═') || action.startsWith('---');
                              const isBullet = action.startsWith('•') || action.startsWith('-') || action.startsWith('*');
                              const numberedMatch = action.match(/^(\d+)[\.\)]\s*(.*)/);
                              const isSpeakingThis = aiVoiceActiveIndex === idx;

                              if (isHeader) {
                                const cleanTitle = action.replace(/^[═\s【\-\*]+|[═\s】\-\*]+$/g, '').trim();
                                return (
                                  <div 
                                    key={`hdr-${idx}`}
                                    className={cn(
                                      "py-3 px-4 rounded-xl font-black tracking-wide border-2 shadow-md my-2.5 flex items-center justify-between gap-2.5 transition-all",
                                      isSpeakingThis
                                        ? "ring-4 ring-emerald-400 border-emerald-400 bg-emerald-950/60 text-emerald-300"
                                        : isDay 
                                          ? "bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-50 border-amber-300 text-amber-950" 
                                          : "bg-gradient-to-r from-amber-950/60 via-orange-950/50 to-amber-950/40 border-amber-500/60 text-amber-300",
                                      fontSize === 'extra-large' ? 'text-xl' : fontSize === 'large' ? 'text-lg' : 'text-base'
                                    )}
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0 shadow-sm" />
                                      <span>{cleanTitle}</span>
                                    </div>
                                    {isSpeakingThis && (
                                      <span className="text-xs font-black uppercase px-2 py-0.5 rounded bg-emerald-500 text-white flex items-center gap-1 shadow-sm animate-pulse">
                                        <Volume2 className="w-3 h-3" />
                                        बोल रहा है
                                      </span>
                                    )}
                                  </div>
                                );
                              }

                              if (isBullet) {
                                const isMasterBullet = action.toLowerCase().includes('master') || action.includes('मास्टर');
                                const isSlaveBullet = action.toLowerCase().includes('slave') || action.includes('स्लेव');

                                return (
                                  <div 
                                    key={`bullet-${idx}`}
                                    className={cn(
                                      "flex items-start gap-3 p-4 rounded-xl border-2 transition-all shadow-sm relative",
                                      isSpeakingThis
                                        ? "ring-4 ring-emerald-400 border-emerald-400 bg-emerald-950/50 text-white"
                                        : isMasterBullet
                                          ? (isDay ? "bg-blue-50 border-blue-300 text-blue-950" : "bg-blue-950/50 border-blue-500/60 text-blue-200")
                                          : isSlaveBullet
                                            ? (isDay ? "bg-purple-50 border-purple-300 text-purple-950" : "bg-purple-950/50 border-purple-500/60 text-purple-200")
                                            : (isDay ? "bg-slate-50 border-slate-200 text-slate-900" : "bg-[#141417] border-zinc-800 text-zinc-200"),
                                      fontSize === 'extra-large' ? 'text-lg sm:text-xl' : fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                                    )}
                                  >
                                    {isSpeakingThis && (
                                      <div className="absolute -top-3 right-4 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md animate-pulse">
                                        <Volume2 className="w-3 h-3" />
                                        <span>अब बोला जा रहा है</span>
                                      </div>
                                    )}
                                    <div className={cn(
                                      "w-2.5 h-2.5 rounded-full shrink-0 mt-2 shadow-sm",
                                      isSpeakingThis ? "bg-emerald-400 animate-ping" : isMasterBullet ? "bg-blue-400" : isSlaveBullet ? "bg-purple-400" : "bg-amber-400"
                                    )} />
                                    <p className="leading-relaxed whitespace-pre-wrap font-bold flex-1">
                                      {action.replace(/^[•\-\*]\s*/, '')}
                                    </p>
                                  </div>
                                );
                              }

                              stepCounter++;
                              const stepNum = numberedMatch ? numberedMatch[1] : stepCounter.toString();
                              const stepText = numberedMatch ? numberedMatch[2] : action;

                              return (
                                <div 
                                  key={`step-${idx}`} 
                                  className={cn(
                                    "flex gap-4 items-start p-4 sm:p-5 rounded-2xl border-2 transition-all shadow-md relative",
                                    isSpeakingThis
                                      ? (isDay ? "bg-amber-50/90 border-emerald-500 ring-4 ring-emerald-400 shadow-emerald-500/30" : "bg-emerald-950/40 border-emerald-400 ring-4 ring-emerald-500/60 shadow-emerald-500/40")
                                      : isDay 
                                        ? "bg-white border-slate-300 hover:border-amber-500" 
                                        : "bg-gradient-to-r from-[#0E1528] to-[#121B33] border-indigo-900/60 hover:border-amber-400/80"
                                  )}
                                >
                                  {isSpeakingThis && (
                                    <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md animate-pulse">
                                      <Volume2 className="w-3 h-3" />
                                      <span>अब बोला जा रहा है (Speaking)</span>
                                    </div>
                                  )}
                                  <div className={cn(
                                    "w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-xl flex items-center justify-center text-sm sm:text-base font-black shadow-lg border-2 mt-0.5 transition-all",
                                    isSpeakingThis
                                      ? "bg-emerald-400 text-emerald-950 border-white scale-105"
                                      : "bg-gradient-to-br from-amber-400 via-orange-500 to-amber-500 text-black border-amber-300"
                                  )}>
                                    {stepNum.padStart(2, '0')}
                                  </div>
                                  <p className={cn(
                                    "font-black leading-relaxed whitespace-pre-wrap flex-1",
                                    isDay ? "text-slate-950" : "text-[#F4F4F5]",
                                    fontSize === 'extra-large' ? 'text-xl sm:text-2xl' : fontSize === 'large' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
                                  )}>
                                    {stepText}
                                  </p>
                                </div>
                              );
                            });
                          })()}
                        </div>
                      </div>

                      {/* Precautions / TLC Advice Section */}
                      {aiResult.precautions && (
                        <div className={cn(
                          "p-4 sm:p-5 rounded-2xl border-2 shadow-lg transition-all",
                          isDay 
                            ? "bg-emerald-50 border-emerald-300 text-emerald-950" 
                            : "bg-gradient-to-r from-emerald-950/80 via-teal-950/70 to-emerald-950/80 border-emerald-500/70 text-emerald-100"
                        )}>
                          <div className="flex items-center gap-2 mb-2 text-emerald-400 font-black">
                            <ShieldAlert className="w-5 h-5 text-emerald-400" />
                            <h4 className={cn(
                              "font-black uppercase tracking-wider text-emerald-400",
                              fontSize === 'extra-large' ? 'text-lg sm:text-xl' : fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                            )}>
                              सावधानी एवं निर्देश (Precautions & TLC Advice)
                            </h4>
                          </div>
                          <p className={cn(
                            "leading-relaxed font-bold",
                            fontSize === 'extra-large' ? 'text-lg sm:text-xl' : fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                          )}>
                            {aiResult.precautions}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                /* Mode === 'manual' - Full Permanent Memory & Vadodara Directory */
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">
                  {/* Permanent Memory Status Banner */}
                  <div className="bg-[#121214] rounded-lg p-5 border border-blue-900/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[11px] font-semibold border border-emerald-800">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            स्थायी मेमोरी सक्रिय (Permanent In-Memory Active)
                          </span>
                          <span className="text-[11px] text-[#71717A] bg-[#18181B] px-2 py-0.5 rounded border border-[#27272A]">
                            {locoType === 'amrit_bharat' ? 'CLW 67 पृष्ठ सम्पूर्ण TSD' : '254 पृष्ठ संपूर्ण डायरेक्टरी'}
                          </span>
                        </div>
                        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                          {locoType === 'amrit_bharat' 
                            ? 'चित्तरंजन लोकोमोटिव वर्क्स (CLW) - अमृत भारत पुश-पुल TSD फाइनल कॉपी'
                            : '3 फ़ेस लोको परिचालन निर्देश एवं दोष निवारण निर्देशिका'}
                        </h2>
                        <p className="text-xs text-[#A1A1AA] mt-1">
                          {locoType === 'amrit_bharat'
                            ? 'एरोडायनामिक WAP-5 पुश-पुल लोको एवं 22-कोच रैक (अप्रैल 2024)'
                            : 'क्षेत्रीय विद्युत प्रशिक्षण केंद्र, वड़ोदरा (Western Railway Electric Training Centre, Vadodara)'}
                        </p>
                      </div>

                      {/* Quick Action Buttons for PDF */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {locoType === '3phase' ? (
                          <>
                            <a
                              href="/api/manual/pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white font-medium px-3 py-1.5 rounded transition-colors"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>मूल PDF खोलें</span>
                            </a>
                            <a
                              href="/api/manual/pdf"
                              download="3_Phase_Loco_Manual_Vadodara.pdf"
                              className="flex items-center gap-1.5 text-xs bg-[#18181B] hover:bg-[#27272A] border border-[#3F3F46] text-[#E4E4E7] font-medium px-3 py-1.5 rounded transition-colors"
                            >
                              <Download className="w-3.5 h-3.5 text-orange-400" />
                              <span>डाउनलोड (21.3 MB)</span>
                            </a>
                          </>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>CLW 67p TSD RAM Memory Loaded</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Manual Meta Highlights */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-[#27272A]/70 text-center">
                      <div className="bg-[#18181B]/80 p-2 rounded border border-[#27272A]">
                        <span className="text-[10px] text-[#71717A] block uppercase">कुल पृष्ठ</span>
                        <span className="text-sm font-semibold text-white">
                          {locoType === 'amrit_bharat' ? '67 Pages (16 Sections)' : '254 Pages'}
                        </span>
                      </div>
                      <div className="bg-[#18181B]/80 p-2 rounded border border-[#27272A]">
                        <span className="text-[10px] text-[#71717A] block uppercase">कवर लोको</span>
                        <span className="text-sm font-semibold text-orange-400">
                          {locoType === 'amrit_bharat' ? 'Amrit Bharat WAP-5' : 'WAP-7 / 5 / WAG-9'}
                        </span>
                      </div>
                      <div className="bg-[#18181B]/80 p-2 rounded border border-[#27272A]">
                        <span className="text-[10px] text-[#71717A] block uppercase">सब-सिस्टम</span>
                        <span className="text-sm font-semibold text-blue-400">
                          {locoType === 'amrit_bharat' ? 'Part A-D, UIC, WTB' : 'SS01 से SS19 TSD'}
                        </span>
                      </div>
                      <div className="bg-[#18181B]/80 p-2 rounded border border-[#27272A]">
                        <span className="text-[10px] text-[#71717A] block uppercase">मेमोरी स्टेटस</span>
                        <span className="text-sm font-semibold text-emerald-400">RAM Pre-Loaded</span>
                      </div>
                    </div>
                  </div>

                  {/* Sub Navigation: Search / Reader / Chapters */}
                  <div className="flex bg-[#121214] p-1 rounded-lg border border-[#27272A] text-xs font-medium">
                    <button
                      onClick={() => setManualSubTab('search')}
                      className={cn(
                        "flex-1 py-1.5 rounded transition-colors flex items-center justify-center gap-1.5",
                        manualSubTab === 'search' ? "bg-blue-600 text-white" : "text-[#71717A] hover:text-[#A1A1AA]"
                      )}
                    >
                      <Search className="w-3.5 h-3.5" /> {locoType === 'amrit_bharat' ? 'अमृत भारत TSD में सर्च' : '254 पेजों में सर्च'}
                    </button>
                    <button
                      onClick={() => {
                        setManualSubTab('reader');
                        if (!activePageText) loadManualPage(activePageNumber);
                      }}
                      className={cn(
                        "flex-1 py-1.5 rounded transition-colors flex items-center justify-center gap-1.5",
                        manualSubTab === 'reader' ? "bg-blue-600 text-white" : "text-[#71717A] hover:text-[#A1A1AA]"
                      )}
                    >
                      <FileText className="w-3.5 h-3.5" /> पेज रीडर (Page {activePageNumber})
                    </button>
                    <button
                      onClick={() => setManualSubTab('chapters')}
                      className={cn(
                        "flex-1 py-1.5 rounded transition-colors flex items-center justify-center gap-1.5",
                        manualSubTab === 'chapters' ? "bg-blue-600 text-white" : "text-[#71717A] hover:text-[#A1A1AA]"
                      )}
                    >
                      <Layers className="w-3.5 h-3.5" /> अध्याय व सब-सिस्टम
                    </button>
                  </div>

                  {/* Tab 1: In-Memory Search */}
                  {manualSubTab === 'search' && (
                    <div className="flex flex-col gap-4">
                      <div className="bg-[#121214] p-4 rounded-lg border border-[#27272A]">
                        <label className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider block mb-2">
                          {locoType === 'amrit_bharat'
                            ? 'अमृत भारत डायरेक्टरी में शब्द / कोड खोजें (Instant Search)'
                            : 'मेमोरी में शब्द / कोड खोजें (Instant Search across all 254 pages)'}
                        </label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                            <input
                              type="text"
                              placeholder={locoType === 'amrit_bharat' 
                                ? "उदा. F1901P1, WTB, ZNN, 22-pin UIC, Cock 136, Self Hold, Node 504..." 
                                : "उदा. MCP, BUR, MCPA, VCB, 47.1/1, F1101P1, बोगी आइसोलेशन..."}
                              value={manualSearchQuery}
                              onChange={(e) => setManualSearchQuery(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleManualSearch()}
                              className="w-full pl-9 pr-4 py-2 bg-[#0A0A0B] border border-[#27272A] text-sm text-[#E4E4E7] rounded focus:border-blue-500 outline-none"
                            />
                          </div>
                          <button
                            onClick={() => handleManualSearch()}
                            disabled={manualSearching || !manualSearchQuery.trim()}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors shrink-0"
                          >
                            {manualSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                            <span>खोजें</span>
                          </button>
                        </div>

                        {/* Quick chips */}
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#27272A]">
                          <span className="text-[11px] text-[#71717A] self-center mr-1">त्वरित सर्च:</span>
                          {(locoType === 'amrit_bharat'
                            ? ["F1901P1", "ZNN", "Node 504", "Node 596", "UIC Jumper", "WTB", "Cock 136", "Cock 47", "BUR 1", "F0101P1", "Self Hold", "F1003P1 VCD"]
                            : ["LSCE", "F0108P1", "F0109P1", "F0110P1", "कूलिंग मोड", "MCP", "MCPA", "BUR 1", "BUR 2", "BUR 3", "VCB", "47.1/1", "48.1", "F0101P2", "E-70", "BOGIE 1"]
                          ).map((term) => (
                            <button
                              key={term}
                              onClick={() => {
                                setManualSearchQuery(term);
                                handleManualSearch(term);
                              }}
                              className="text-[11px] bg-[#18181B] hover:bg-blue-950/60 hover:text-blue-300 hover:border-blue-800 border border-[#27272A] text-[#A1A1AA] px-2.5 py-1 rounded transition-colors"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Results */}
                      {manualSearchDone && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs text-[#71717A] px-1">
                            <span>{manualSearchResults.length} परिणाम मिले</span>
                            <span>क्लिक करके पूरा पेज पढ़ें</span>
                          </div>

                          {manualSearchResults.length === 0 ? (
                            <div className="bg-[#121214] p-8 text-center text-[#71717A] rounded-lg border border-[#27272A]">
                              कोई परिणाम नहीं मिला। कृपया दूसरा शब्द खोजें।
                            </div>
                          ) : (
                            manualSearchResults.map((res) => (
                              <div
                                key={res.page}
                                className="bg-[#121214] p-4 rounded-lg border border-[#27272A] hover:border-blue-500/50 transition-colors"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="inline-flex items-center gap-1 bg-blue-950/80 text-blue-300 text-xs font-semibold px-2 py-0.5 rounded border border-blue-800">
                                    <Bookmark className="w-3 h-3" /> पृष्ठ {res.page} / {locoType === 'amrit_bharat' ? (manualInfo?.totalPages || 67) : 254}
                                  </span>
                                  <button
                                    onClick={() => loadManualPage(res.page)}
                                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
                                  >
                                    <span>यह पेज पढ़ें</span>
                                    <ChevronRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <p className="text-xs text-[#A1A1AA] font-mono leading-relaxed bg-[#0A0A0B] p-2.5 rounded border border-[#27272A]/50">
                                  {res.snippet}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab 2: Page Reader */}
                  {manualSubTab === 'reader' && (
                    <div className="flex flex-col gap-4">
                      {/* Page selector bar */}
                      <div className="bg-[#121214] p-3 rounded-lg border border-[#27272A] flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => loadManualPage(Math.max(1, activePageNumber - 1))}
                            disabled={activePageNumber <= 1}
                            className="px-2.5 py-1.5 bg-[#18181B] hover:bg-[#27272A] disabled:opacity-40 text-xs font-medium rounded border border-[#27272A] transition-colors"
                          >
                            ◀ पिछला पेज
                          </button>
                          <div className="flex items-center gap-1 text-xs text-[#A1A1AA]">
                            <span>पृष्ठ</span>
                            <input
                              type="number"
                              min={1}
                              max={locoType === 'amrit_bharat' ? (manualInfo?.totalPages || 67) : 254}
                              value={activePageNumber}
                              onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                const maxP = locoType === 'amrit_bharat' ? (manualInfo?.totalPages || 67) : 254;
                                if (!isNaN(val) && val >= 1 && val <= maxP) {
                                  loadManualPage(val);
                                }
                              }}
                              className="w-14 text-center bg-[#0A0A0B] border border-[#3F3F46] rounded py-1 text-white font-semibold text-xs"
                            />
                            <span>/ {locoType === 'amrit_bharat' ? (manualInfo?.totalPages || 67) : 254}</span>
                          </div>
                          <button
                            onClick={() => {
                              const maxP = locoType === 'amrit_bharat' ? (manualInfo?.totalPages || 67) : 254;
                              loadManualPage(Math.min(maxP, activePageNumber + 1));
                            }}
                            disabled={activePageNumber >= (locoType === 'amrit_bharat' ? (manualInfo?.totalPages || 67) : 254)}
                            className="px-2.5 py-1.5 bg-[#18181B] hover:bg-[#27272A] disabled:opacity-40 text-xs font-medium rounded border border-[#27272A] transition-colors"
                          >
                            अगला पेज ▶
                          </button>
                        </div>

                        <div className="flex items-center gap-2">

                          {locoType === '3phase' && (
                            <a
                              href="/api/manual/pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-[#18181B] hover:bg-[#27272A] text-blue-400 border border-[#27272A] px-2.5 py-1.5 rounded flex items-center gap-1 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>PDF में देखें</span>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Page text container */}
                      <div className="bg-[#121214] rounded-lg p-5 border border-[#27272A]">
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#27272A]">
                          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-400" />
                            <span>डायरेक्टरी पृष्ठ {activePageNumber} का विवरण</span>
                          </h3>
                          <span className="text-[11px] text-[#71717A]">
                            {locoType === 'amrit_bharat' ? 'चित्तरंजन लोकोमोटिव वर्क्स (CLW) अमृत भारत TSD Final Copy' : 'क्षेत्रीय विद्युत प्रशिक्षण केंद्र, वड़ोदरा'}
                          </span>
                        </div>

                        {loadingPage ? (
                          <div className="py-12 flex flex-col items-center justify-center text-[#71717A] gap-2">
                            <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                            <span className="text-xs">पेज लोड हो रहा है...</span>
                          </div>
                        ) : activePageText ? (
                          <div className="bg-[#0A0A0B] p-4 rounded-lg border border-[#27272A]/70">
                            <pre className="text-xs text-[#E4E4E7] whitespace-pre-wrap font-sans leading-relaxed">
                              {activePageText}
                            </pre>
                          </div>
                        ) : (
                          <div className="py-12 text-center text-[#71717A]">
                            पेज लोड करने के लिए ऊपर पेज नंबर चुनें।
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Chapters & Subsystems */}
                  {manualSubTab === 'chapters' && (
                    <div className="space-y-5">
                      {/* Chapters list */}
                      <div className="bg-[#121214] p-5 rounded-lg border border-[#27272A]">
                        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-orange-400" />
                          <span>
                            {locoType === 'amrit_bharat' ? 'अमृत भारत TSD अध्याय व अनुभाग (CLW 67-Page Sections)' : 'प्रमुख अध्याय व विषय (Major Chapters in Manual)'}
                          </span>
                        </h3>
                        <div className="space-y-2">
                          {(locoType === 'amrit_bharat'
                            ? [
                                { title: "भाग-A: पुश-पुल WAP-5 तैयारी एवं एनरजाइजेशन प्रक्रिया (Preparation & Energization)", page: 1 },
                                { title: "भाग-A: नोड अनुक्रम (Node 504, 550, 570, 590, 596) एवं DDU डिस्प्ले", page: 2 },
                                { title: "भाग-A: न्यूट्रल सेक्शन पार करना (ZNN स्विच) एवं स्लेव लोको डेड करना", page: 3 },
                                { title: "भाग-A: मास्टर से स्लेव लोको परिवर्तन व मुख्य परिचालन बिंदु", page: 4 },
                                { title: "भाग-B: F0101P1 - VCB Stuck in ON Position (Master vs Slave)", page: 5 },
                                { title: "भाग-B: F0104P1 - Catenary Voltage Out of Limit (OHE Meter)", page: 6 },
                                { title: "भाग-B: F0105P1 - Transformer Oil Temperature / Pressure Not OK", page: 7 },
                                { title: "भाग-B: F0201P1 / F0301P1 - Traction Converter-1 / Converter-2 Disturbance", page: 8 },
                                { title: "भाग-B: F0401P1 / F0402P1 - Harmonic Filter (40 kmph Speed Restriction Rule)", page: 9 },
                                { title: "भाग-B: F0601P1 / F0701P1 / F0801P1 - Auxiliary Converter BUR 1, 2, 3", page: 10 },
                                { title: "भाग-B: F0902P2 / F0903P2 - Battery Charger MCB / Low Current", page: 11 },
                                { title: "भाग-B: F1001P1 to F1008P1 - Brake System (VCD Suppressed, CCB 2.0)", page: 12 },
                                { title: "भाग-B: F1101P2 / F1103P2 / F1201P2 - Auxiliaries HB-1 & HB-2 (MCP 1 & 2)", page: 13 },
                                { title: "भाग-B: F1501P1 (Fire) & F1901P1 (Train Bus / WTB Communication Disturbance)", page: 14 },
                                { title: "भाग-B: सामान्य पुश-पुल दोष (Panto, BP, Throttle, Brakes, Hotel Load)", page: 15 },
                                { title: "भाग-C व D: अमृत भारत कोच (LSRD, LSCN, LWS), WTB Repeaters, UIC जंपर्स", page: 16 },
                              ]
                            : [
                                { title: "तकनीकी डेटा (Technical Data WAP-5, WAP-7, WAG-9, WAG-9H)", page: 22 },
                                { title: "3-फ़ेस लोकोमोटिव की उन्नत विशेषताएं (Features)", page: 24 },
                                { title: "कैब-1 व कैब-2 की उपकरण व्यवस्था", page: 31 },
                                { title: "मशीन रूम लेआउट (HB1, HB2, SB1, SB2, फिल्टर क्यूबिकल)", page: 41 },
                                { title: "न्यूमैटिक उपकरण, वाल्व, कॉक व प्रेशर गेज स्थिति", page: 56 },
                                { title: "विद्युत सर्किट (पॉवर, ऑक्ज़ीलरी व कंट्रोल)", page: 66 },
                                { title: "स्क्रीन संरचना व फॉल्ट एकनॉलेजमेंट", page: 85 },
                                { title: "दोष निवारण निर्देशिका TSD (Subsystems SS01 - SS19)", page: 93 },
                              ]
                          ).map((ch, idx) => (
                            <div
                              key={idx}
                              onClick={() => loadManualPage(ch.page)}
                              className="flex items-center justify-between p-3 rounded bg-[#0A0A0B] border border-[#27272A] hover:border-blue-500/50 cursor-pointer transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded bg-[#18181B] text-[#A1A1AA] flex items-center justify-center text-xs font-bold border border-[#27272A]">
                                  {ch.page}
                                </span>
                                <span className="text-xs text-[#E4E4E7] font-medium">{ch.title}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-blue-400">
                                <span>पेज {ch.page} खोलें</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Subsystems TSD Directory */}
                      <div className="bg-[#121214] p-5 rounded-lg border border-[#27272A]">
                        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <Bookmark className="w-4 h-4 text-blue-400" />
                          <span>
                            {locoType === 'amrit_bharat' ? 'अमृत भारत TSD सब-सिस्टम निर्देशिका' : 'TSD सब-सिस्टम निर्देशिका (SS01 - SS19)'}
                          </span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {(manualInfo?.subsystems && manualInfo.subsystems.length > 0
                            ? manualInfo.subsystems
                            : [
                                { code: "SS01", name: "MAIN POWER (मुख्य पॉवर सर्किट)" },
                                { code: "SS02", name: "TRACTION BOGIE 1 (ट्रैक्शन बोगी 1)" },
                                { code: "SS03", name: "TRACTION BOGIE 2 (ट्रैक्शन बोगी 2)" },
                                { code: "SS04", name: "HARMONIC FILTER (हार्मोनिक फिल्टर)" },
                                { code: "SS05", name: "HOTEL LOAD (होटल लोड)" },
                                { code: "SS06", name: "AUXILIARY CONVERTER 1 - BUR 1" },
                                { code: "SS07", name: "AUXILIARY CONVERTER 2 - BUR 2" },
                                { code: "SS08", name: "AUXILIARY CONVERTER 3 - BUR 3" },
                                { code: "SS09", name: "BATTERY SYSTEM (बैटरी सर्किट)" },
                                { code: "SS10", name: "BRAKE SYSTEM (ब्रेक सिस्टम - E-70 / CCB)" },
                                { code: "SS11", name: "AUXILIARIES HB1 (सहायक मोटर 1 / MCP 1)" },
                                { code: "SS12", name: "AUXILIARIES HB2 (सहायक मोटर 2 / MCP 2)" },
                                { code: "SS13", name: "CAB 1 (कैब 1 उपकरण)" },
                                { code: "SS14", name: "CAB 2 (कैब 2 उपकरण)" },
                                { code: "SS15", name: "FIRE DETECTION (अग्नि सुरक्षा)" },
                                { code: "SS16", name: "SPEEDOMETER (स्पीडोमीटर / SPM)" },
                                { code: "SS17", name: "VCU / PROCESSOR (प्रोसेसर व VCU)" },
                                { code: "SS18", name: "COMMUNICATION / RADIO (संचार)" },
                                { code: "SS19", name: "OTHER SUBSYSTEMS (अन्य उपकरण)" }
                              ]
                          ).map((sub) => (
                            <button
                              key={sub.code}
                              onClick={() => {
                                setManualSubTab('search');
                                setManualSearchQuery(sub.code);
                                handleManualSearch(sub.code);
                              }}
                              className="flex items-center justify-between p-2.5 rounded bg-[#0A0A0B] border border-[#27272A] hover:border-orange-500/50 text-left transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold bg-orange-950 text-orange-400 px-1.5 py-0.5 rounded border border-orange-900">
                                  {sub.code}
                                </span>
                                <span className="text-xs text-[#E4E4E7] line-clamp-1">{sub.name}</span>
                              </div>
                              <Search className="w-3.5 h-3.5 text-[#71717A] shrink-0 ml-1" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "absolute inset-0 z-20 flex flex-col h-full transition-colors",
                isDay ? "bg-slate-100 text-slate-950" : "bg-[#09090B] text-zinc-100"
              )}
            >
              {/* Detail Header */}
              <div className={cn(
                "border-b px-3 sm:px-4 py-3 shrink-0 flex items-center justify-between gap-2 shadow-sm transition-colors",
                isDay ? "bg-white border-slate-300" : "bg-[#121214] border-[#27272A]"
              )}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <button 
                    onClick={() => setSelectedFault(null)}
                    className={cn(
                      "p-2 -ml-1 rounded-xl transition-all cursor-pointer",
                      isDay ? "hover:bg-slate-200 text-slate-900" : "hover:bg-[#18181B] text-white"
                    )}
                    title="वापस जाएं (Back)"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-red-600 text-white text-xs font-black uppercase tracking-wide shadow-sm">
                      {selectedFault.id}
                    </span>
                    <span className={cn(
                      "text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded border",
                      isDay ? "bg-slate-100 text-slate-800 border-slate-300" : "bg-zinc-900 text-zinc-300 border-zinc-700"
                    )}>
                      {selectedFault.subSystem}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-16 space-y-5">

                {/* Fault Message Title */}
                <div className={cn(
                  "p-4 sm:p-5 rounded-2xl border-2 shadow-sm transition-all",
                  isDay ? "bg-white border-slate-300" : "bg-[#131316] border-zinc-800"
                )}>
                  <span className="text-[10px] uppercase font-bold text-amber-500 block mb-1">
                    खराबी संदेश (Fault Title / Description):
                  </span>
                  <h1 className={cn(
                    "font-black tracking-tight leading-snug whitespace-pre-wrap",
                    fontSize === 'extra-large' ? 'text-2xl sm:text-3xl' : fontSize === 'large' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl',
                    isDay ? "text-slate-950" : "text-white"
                  )}>
                    {selectedFault.message}
                  </h1>
                </div>

                {/* Indicators & Effects Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className={cn(
                    "p-4 rounded-xl border transition-all",
                    isDay ? "bg-white border-slate-300" : "bg-[#131316] border-zinc-800"
                  )}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <h3 className={cn("font-black text-xs uppercase tracking-wider", isDay ? "text-slate-800" : "text-zinc-300")}>
                        लैम्प एवं संकेत (Lamps)
                      </h3>
                    </div>
                    <p className={cn("text-xs sm:text-sm font-semibold", isDay ? "text-slate-700 italic" : "text-zinc-300 italic")}>
                      {selectedFault.lamp}
                    </p>
                  </div>

                  <div className={cn(
                    "p-4 rounded-xl border transition-all",
                    isDay ? "bg-white border-slate-300" : "bg-[#131316] border-zinc-800"
                  )}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Activity className="w-4 h-4 text-orange-500" />
                      <h3 className={cn("font-black text-xs uppercase tracking-wider", isDay ? "text-slate-800" : "text-zinc-300")}>
                        प्रभाव एवं लक्षण (Effect)
                      </h3>
                    </div>
                    <p className={cn("text-xs sm:text-sm font-semibold leading-relaxed", isDay ? "text-slate-700" : "text-zinc-300")}>
                      {selectedFault.effect}
                    </p>
                  </div>

                  {selectedFault.masterEffect && (
                    <div className={cn(
                      "p-4 rounded-xl border transition-all",
                      isDay ? "bg-blue-50 border-blue-300 text-blue-950" : "bg-blue-950/40 border-blue-800 text-blue-200"
                    )}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <ShieldAlert className="w-4 h-4 text-blue-500" />
                        <h3 className="font-black text-xs uppercase tracking-wider">
                          मास्टर लोको पर प्रभाव (Master Loco Effect)
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                        {selectedFault.masterEffect}
                      </p>
                    </div>
                  )}

                  {selectedFault.slaveEffect && (
                    <div className={cn(
                      "p-4 rounded-xl border transition-all",
                      isDay ? "bg-emerald-50 border-emerald-300 text-emerald-950" : "bg-emerald-950/40 border-emerald-800 text-emerald-200"
                    )}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Layers className="w-4 h-4 text-emerald-500" />
                        <h3 className="font-black text-xs uppercase tracking-wider">
                          स्लेव लोको पर प्रभाव (Slave Loco Effect)
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                        {selectedFault.slaveEffect}
                      </p>
                    </div>
                  )}
                </div>

                {/* Troubleshooting Actions */}
                <div className="pt-2">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-amber-500" />
                      <h3 className={cn("font-black tracking-wide uppercase text-sm sm:text-base", isDay ? "text-slate-950" : "text-white")}>
                        {selectedFault.slaveActions ? "मास्टर लोको / मुख्य निवारण कार्यवाही (Master Actions)" : "दोष निवारण कार्यवाही (Actions to Take)"}
                      </h3>
                    </div>
                  </div>

                  {/* LOCO PILOT VOICE ASSISTANT BUTTON / PLAYER FOR SELECTED FAULT */}
                  {selectedFault.actions && selectedFault.actions.length > 0 && (
                    <div className="mb-4">
                      <VoiceTroubleshooterPlayer
                        steps={selectedFault.actions}
                        faultTitle={selectedFault.message || selectedFault.id}
                        isDay={isDay}
                        fontSize={fontSize}
                        onActiveStepChange={setDetailVoiceActiveIndex}
                      />
                    </div>
                  )}
                  
                  <div className="space-y-3.5">
                    {(() => {
                      const validActions = (selectedFault.actions || [])
                        .map(a => typeof a === 'string' ? a.trim() : '')
                        .filter(a => a.length > 0);
                      let stepCounter = 0;
                      return validActions.map((action, idx) => {
                        const isHeader = action.startsWith('═') || action.startsWith('【') || action.endsWith('═') || action.startsWith('---');
                        const isBullet = action.startsWith('•') || action.startsWith('-') || action.startsWith('*');
                        const numberedMatch = action.match(/^(\d+)[\.\)]\s*(.*)/);
                        const isSpeakingThis = detailVoiceActiveIndex === idx;

                        if (isHeader) {
                          const cleanTitle = action.replace(/^[═\s【\-\*]+|[═\s】\-\*]+$/g, '').trim();
                          return (
                            <div 
                              key={`fa-hdr-${idx}`}
                              className={cn(
                                "py-2.5 px-4 rounded-xl font-black tracking-wide border shadow-sm my-2 flex items-center justify-between gap-2 transition-all",
                                isSpeakingThis
                                  ? "ring-4 ring-emerald-400 border-emerald-400 bg-emerald-950/60 text-emerald-300"
                                  : isDay 
                                    ? "bg-amber-100/90 border-amber-300 text-amber-950" 
                                    : "bg-amber-950/40 border-amber-500/40 text-amber-300",
                                fontSize === 'extra-large' ? 'text-lg' : fontSize === 'large' ? 'text-base' : 'text-sm'
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                                <span>{cleanTitle}</span>
                              </div>
                              {isSpeakingThis && (
                                <span className="text-xs font-black uppercase px-2 py-0.5 rounded bg-emerald-500 text-white flex items-center gap-1 shadow-sm animate-pulse">
                                  <Volume2 className="w-3 h-3" />
                                  बोल रहा है
                                </span>
                              )}
                            </div>
                          );
                        }

                        if (isBullet) {
                          return (
                            <div 
                              key={`fa-bullet-${idx}`}
                              className={cn(
                                "flex items-start gap-3 p-3.5 rounded-xl border transition-all relative",
                                isSpeakingThis
                                  ? "ring-4 ring-emerald-400 border-emerald-400 bg-emerald-950/50 text-white"
                                  : isDay 
                                    ? "bg-slate-50 border-slate-200 text-slate-900" 
                                    : "bg-[#141417] border-zinc-800 text-zinc-200",
                                fontSize === 'extra-large' ? 'text-base sm:text-lg' : fontSize === 'large' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                              )}
                            >
                              {isSpeakingThis && (
                                <div className="absolute -top-3 right-4 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md animate-pulse">
                                  <Volume2 className="w-3 h-3" />
                                  <span>अब बोला जा रहा है</span>
                                </div>
                              )}
                              <div className={cn(
                                "w-2 h-2 rounded-full shrink-0 mt-2",
                                isSpeakingThis ? "bg-emerald-400 animate-ping" : "bg-amber-500"
                              )} />
                              <p className="leading-relaxed whitespace-pre-wrap font-semibold flex-1">
                                {action.replace(/^[•\-\*]\s*/, '')}
                              </p>
                            </div>
                          );
                        }

                        stepCounter++;
                        const stepNum = numberedMatch ? numberedMatch[1] : stepCounter.toString();
                        const stepText = numberedMatch ? numberedMatch[2] : action;

                        return (
                          <div 
                            key={`fa-step-${idx}`} 
                            className={cn(
                              "flex gap-3.5 items-start p-4 sm:p-5 rounded-2xl border-2 transition-all shadow-sm relative",
                              isSpeakingThis
                                ? (isDay ? "bg-amber-50/90 border-emerald-500 ring-4 ring-emerald-400 shadow-emerald-500/30" : "bg-emerald-950/40 border-emerald-400 ring-4 ring-emerald-500/60 shadow-emerald-500/40")
                                : isDay 
                                  ? "bg-white border-slate-300 hover:border-amber-500" 
                                  : "bg-[#131316] border-[#2A2A30] hover:border-amber-500/50"
                            )}
                          >
                            {isSpeakingThis && (
                              <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md animate-pulse">
                                <Volume2 className="w-3 h-3" />
                                <span>अब बोला जा रहा है (Speaking)</span>
                              </div>
                            )}
                            <div className={cn(
                              "w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-xl flex items-center justify-center text-sm sm:text-base font-black shadow-md border-2 mt-0.5 transition-all",
                              isSpeakingThis
                                ? "bg-emerald-400 text-emerald-950 border-white scale-105"
                                : "bg-gradient-to-br from-amber-400 via-orange-500 to-amber-500 text-black border-amber-300"
                            )}>
                              {stepNum.padStart(2, '0')}
                            </div>
                            <div className="flex-1">
                              <p className={cn(
                                "leading-relaxed whitespace-pre-wrap font-black",
                                fontSize === 'extra-large' ? 'text-xl sm:text-2xl' : fontSize === 'large' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg',
                                isDay ? "text-slate-950" : "text-zinc-100"
                              )}>
                                {stepText}
                              </p>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* Slave Loco Actions if Push-Pull formation */}
                {selectedFault.slaveActions && selectedFault.slaveActions.length > 0 && (
                  <div className="pt-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-emerald-500" />
                      <h3 className="font-black text-sm sm:text-base tracking-wide uppercase text-emerald-500">
                        स्लेव लोको में की जाने वाली कार्यवाही (Slave Loco Actions)
                      </h3>
                    </div>

                    <div className="mb-4">
                      <VoiceTroubleshooterPlayer
                        steps={selectedFault.slaveActions}
                        faultTitle={`स्लेव लोको: ${selectedFault.id}`}
                        isDay={isDay}
                        fontSize={fontSize}
                      />
                    </div>
                    <div className="space-y-3.5">
                      {(() => {
                        const validSlaveActions = (selectedFault.slaveActions || [])
                          .map(a => typeof a === 'string' ? a.trim() : '')
                          .filter(a => a.length > 0);
                        let slaveStepCounter = 0;
                        return validSlaveActions.map((action, idx) => {
                          const isHeader = action.startsWith('═') || action.startsWith('【') || action.endsWith('═') || action.startsWith('---');
                          const isBullet = action.startsWith('•') || action.startsWith('-') || action.startsWith('*');
                          const numberedMatch = action.match(/^(\d+)[\.\)]\s*(.*)/);

                          if (isHeader) {
                            const cleanTitle = action.replace(/^[═\s【\-\*]+|[═\s】\-\*]+$/g, '').trim();
                            return (
                              <div 
                                key={`sla-hdr-${idx}`}
                                className={cn(
                                  "py-2.5 px-4 rounded-xl font-black tracking-wide border shadow-sm my-2 flex items-center gap-2",
                                  isDay 
                                    ? "bg-emerald-100/90 border-emerald-300 text-emerald-950" 
                                    : "bg-emerald-950/40 border-emerald-500/40 text-emerald-300",
                                  fontSize === 'extra-large' ? 'text-lg' : fontSize === 'large' ? 'text-base' : 'text-sm'
                                )}
                              >
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                                <span>{cleanTitle}</span>
                              </div>
                            );
                          }

                          if (isBullet) {
                            return (
                              <div 
                                key={`sla-bullet-${idx}`}
                                className={cn(
                                  "flex items-start gap-3 p-3.5 rounded-xl border transition-all",
                                  isDay 
                                    ? "bg-emerald-50/60 border-emerald-300 text-emerald-950" 
                                    : "bg-[#0E1714] border-emerald-900/60 text-emerald-200",
                                  fontSize === 'extra-large' ? 'text-base sm:text-lg' : fontSize === 'large' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                                )}
                              >
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-2" />
                                <p className="leading-relaxed whitespace-pre-wrap font-semibold flex-1">
                                  {action.replace(/^[•\-\*]\s*/, '')}
                                </p>
                              </div>
                            );
                          }

                          slaveStepCounter++;
                          const stepNum = numberedMatch ? numberedMatch[1] : slaveStepCounter.toString();
                          const stepText = numberedMatch ? numberedMatch[2] : action;

                          return (
                            <div 
                              key={`sla-step-${idx}`} 
                              className={cn(
                                "flex gap-3.5 items-start p-4 sm:p-5 rounded-2xl border-2 transition-all shadow-sm",
                                isDay 
                                  ? "bg-emerald-50/60 border-emerald-300 hover:border-emerald-500" 
                                  : "bg-[#0E1714] border-emerald-900/60 hover:border-emerald-600"
                              )}
                            >
                              <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 text-black flex items-center justify-center text-sm sm:text-base font-black shadow-md border-2 border-emerald-300 mt-0.5">
                                S{stepNum.padStart(2, '0')}
                              </div>
                              <div className="flex-1">
                                <p className={cn(
                                  "leading-relaxed whitespace-pre-wrap font-black",
                                  fontSize === 'extra-large' ? 'text-xl sm:text-2xl' : fontSize === 'large' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg',
                                  isDay ? "text-slate-950" : "text-emerald-100"
                                )}>
                                  {stepText}
                                </p>
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 📱 MOBILE USAGE & INSTALLATION MODAL */}
      <AnimatePresence>
        {showMobileModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-[#121214] border border-[#27272A] w-full max-w-lg rounded-2xl p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-[#27272A] pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-950/80 border border-orange-800 flex items-center justify-center text-orange-400">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      मोबाइल में कैसे चलाएं? (Mobile Setup)
                    </h3>
                    <p className="text-xs text-[#A1A1AA]">
                      अपने Android या iPhone में ऐप की तरह इंस्टॉल करें
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMobileModal(false)}
                  className="w-8 h-8 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-[#A1A1AA] hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* One-Click Direct Install Button (If supported/prompt available) */}
              {isInstallable && (
                <div className="mb-4 bg-emerald-950/80 border border-emerald-500 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">फोन तैयार है!</p>
                      <p className="text-xs text-emerald-300">सीधे एक क्लिक में होम स्क्रीन पर जोड़ें</p>
                    </div>
                  </div>
                  <button
                    onClick={install}
                    className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-lg shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>⚡ अभी इंस्टॉल करें (Install App)</span>
                  </button>
                </div>
              )}

              {/* Troubleshooting: Why Add to Home Screen is Missing */}
              <div className="bg-amber-950/40 border border-amber-800/80 rounded-xl p-3.5 mb-4 text-xs text-amber-200">
                <div className="flex items-center gap-2 font-bold text-amber-300 mb-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>❓ 'Add to Home Screen' का विकल्प क्यों नहीं दिख रहा?</span>
                </div>
                <ul className="space-y-1.5 pl-5 list-disc text-amber-200/90 leading-relaxed">
                  <li>
                    <strong>लिंक WhatsApp या ईमेल में खुला है?</strong> WhatsApp का इनबिल्ट ब्राउज़र 'Add to Home Screen' सपोर्ट नहीं करता।
                    <div className="text-emerald-300 font-semibold mt-0.5">
                      👉 ऊपर दाईं ओर <strong>3 डॉट्स (⋮)</strong> दबाएं और <strong>"Open in Chrome" (क्रोम में खोलें)</strong> चुनें!
                    </div>
                  </li>
                  <li>
                    <strong>Chrome में:</strong> Chrome में खुलने पर ऊपर <strong>3 डॉट्स (⋮)</strong> दबाएं ➔ <strong>"Install app"</strong> या <strong>"Add to Home screen" (होम स्क्रीन में जोड़ें)</strong> तुरंत दिखेगा।
                  </li>
                  <li>
                    <strong>iPhone Safari में:</strong> नीचे बीच में <strong>Share (⎋ तीर वाला बॉक्स)</strong> दबाएं ➔ नीचे स्क्रॉल कर <strong>"Add to Home Screen"</strong> दबाएं।
                  </li>
                </ul>
              </div>

              {/* Direct Link & QR Code Section */}
              <div className="bg-[#0A0A0B] p-4 rounded-xl border border-[#27272A] mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-orange-400" />
                    सीधा मोबाइल लिंक (Direct Mobile URL)
                  </span>
                  {copiedLink && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                      <Check className="w-3.5 h-3.5" /> कॉपी हो गया!
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#18181B] p-3 rounded-lg border border-[#27272A] mb-3">
                  <div className="text-center shrink-0">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(mobileAppUrl)}`} 
                      alt="Mobile QR Code"
                      className="w-24 h-24 rounded-lg bg-white p-1 border border-zinc-700 mx-auto shadow"
                      loading="lazy"
                    />
                    <span className="text-[10px] text-zinc-400 block mt-1">कैमरे से स्कैन करें</span>
                  </div>
                  <div className="flex-1 w-full flex flex-col justify-between gap-2">
                    <input
                      type="text"
                      readOnly
                      value={mobileAppUrl}
                      className="w-full bg-[#121214] border border-[#27272A] rounded-lg px-2.5 py-2 text-xs text-zinc-200 font-mono select-all focus:outline-none"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyMobileLink}
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow"
                      >
                        {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedLink ? 'लिंक कॉपी हो गया!' : '📋 लिंक कॉपी करें (Copy Link)'}</span>
                      </button>
                      <a
                        href={mobileAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-semibold flex items-center gap-1 border border-zinc-700 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>खोलें</span>
                      </a>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                  💡 <strong>टिप:</strong> इस लिंक को अपने मोबाइल में <strong>Google Chrome</strong> (एंड्रॉयड) या <strong>Safari</strong> (iPhone) में खोलें।
                </p>
              </div>

              {/* Step by Step Instructions */}
              <div className="space-y-4 text-xs sm:text-sm">
                {/* Android Steps */}
                <div className="bg-[#18181B]/80 rounded-xl p-3.5 border border-[#27272A]">
                  <div className="flex items-center gap-2 mb-2 font-bold text-white">
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-2 py-0.5 rounded">
                      Android (Chrome)
                    </span>
                    <span>एंड्रॉयड फोन में होम स्क्रीन पर लगाएं</span>
                  </div>
                  <ol className="space-y-2 text-[#D4D4D8] list-decimal list-inside pl-1">
                    <li>अपने फोन के <strong>Google Chrome</strong> ब्राउज़र में ऊपर दिए गए लिंक को खोलें।</li>
                    <li>ब्राउज़र के ऊपर दाईं ओर कोने में <strong>तीन डॉट्स (⋮)</strong> पर टैप करें।</li>
                    <li>मेन्यू में से <strong>"Install app"</strong> या <strong>"Add to Home screen" (होम स्क्रीन में जोड़ें)</strong> दबाएं।</li>
                    <li>फोन स्क्रीन पर <strong>LocoTSD</strong> नाम से ऐप आइकन बन जाएगा। अब आप इसे कभी भी बिना ब्राउज़र खोले सीधे एक टैप में इस्तेमाल कर सकते हैं!</li>
                  </ol>
                </div>

                {/* iPhone Steps */}
                <div className="bg-[#18181B]/80 rounded-xl p-3.5 border border-[#27272A]">
                  <div className="flex items-center gap-2 mb-2 font-bold text-white">
                    <span className="bg-blue-950 text-blue-400 border border-blue-800 text-[10px] px-2 py-0.5 rounded">
                      iPhone (Apple Safari)
                    </span>
                    <span>आईफोन में होम स्क्रीन पर लगाएं</span>
                  </div>
                  <ol className="space-y-2 text-[#D4D4D8] list-decimal list-inside pl-1">
                    <li>अपने iPhone के <strong>Safari</strong> ब्राउज़र में यह लिंक खोलें।</li>
                    <li>स्क्रीन के नीचे बीच में दिए <strong>Share (तीर वाला शेयर बटन)</strong> पर टैप करें।</li>
                    <li>नीचे स्क्रॉल करके <strong>"Add to Home Screen"</strong> चुनें।</li>
                  </ol>
                </div>

                {/* Mobile Special Benefits */}
                <div className="bg-gradient-to-r from-emerald-950/40 to-teal-950/40 rounded-xl p-3 border border-emerald-800/50 text-emerald-200 text-xs">
                  <p className="font-semibold text-emerald-300 mb-1">
                    🌟 मोबाइल पर चलाने के विशेष लाभ:
                  </p>
                  <ul className="space-y-1 list-disc list-inside text-emerald-200/90 text-[11px]">
                    <li><strong>बड़ा स्पष्ट फॉन्ट (High Readability):</strong> चलती ट्रेन या वाइब्रेशन में भी आसानी से पढ़ने योग्य विशाल फॉन्ट।</li>
                    <li><strong>फुल स्क्रीन रेलवे डेस्कटॉप:</strong> कोई ब्राउज़र टैब या झंझट नहीं, शुद्ध रेलवे TSD गाइड।</li>
                    <li><strong>321 पृष्ठों की डायरेक्टरी:</strong> ड्यूटी के दौरान किसी भी फॉल्ट, कॉक या नोड का समाधान सेकंडों में।</li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 mt-5 pt-3 border-t border-[#27272A]">
                <a
                  href={mobileAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#27272A] hover:bg-[#3F3F46] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>नए टैब में खोलें</span>
                </a>
                <button
                  onClick={() => setShowMobileModal(false)}
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  समझ गया (Close)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
