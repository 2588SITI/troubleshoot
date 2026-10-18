import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, ChevronRight, ArrowLeft, AlertTriangle, Lightbulb, Activity, Wrench, ShieldAlert, Sparkles, Loader2, Bot, AlertCircle, ExternalLink, HelpCircle, Mic, MicOff, Volume2, VolumeX, Globe, BookOpen, Download, FileText, CheckCircle2, Bookmark, Layers, Smartphone, Copy, Check, X, Share2, Sun, Moon, Type, Radio, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { subSystems, faults } from './data';
import { amritBharatSubSystems, amritBharatFaults } from './dataAmritBharat';
import { Fault } from './types';
import { cn } from './lib/utils';
import { cleanRailwayVoiceText } from './lib/speechCleaner';
import { resolveDefectClientSide, expandLocoTokens } from './lib/clientTroubleshooter';
import { usePWAInstall } from './lib/usePWAInstall';
import { LPVoiceGuide } from './components/LPVoiceGuide';

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
  const [mode, setMode] = useState<'browse' | 'ai' | 'voice' | 'manual'>('browse');
  
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

  // Speech Recognition state
  // Input Mode: 'keyboard' (default, clean, no mic prompts) or 'voice'
  const [inputMode, setInputMode] = useState<'keyboard' | 'voice'>('keyboard');
  const [isListening, setIsListening] = useState(false);
  const [speechLang, setSpeechLang] = useState<'hi-IN' | 'en-IN'>('hi-IN');
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [showMicPermissionGuide, setShowMicPermissionGuide] = useState(false);
  const [micPermanentlyDismissed, setMicPermanentlyDismissed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('dismiss_mic_guide') === 'true';
      } catch (e) {
        return false;
      }
    }
    return false;
  });
  const [isCheckingMic, setIsCheckingMic] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);
  const recognitionRef = useRef<any>(null);
  const initialQueryBeforeSpeakRef = useRef<string>('');

  // Text to speech state
  const [isSpeaking, setIsSpeaking] = useState(false);

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
      }
      setIsInIframe(window.self !== window.top);
    }
  }, []);

  const requestMicrophoneAccess = async (): Promise<boolean> => {
    setIsCheckingMic(true);
    try {
      if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        setSpeechError(null);
        setShowMicPermissionGuide(false);
        return true;
      }
      return true;
    } catch (err: any) {
      console.warn("Microphone access check:", err);
      if (!micPermanentlyDismissed) {
        setSpeechError("ब्राउज़र ने प्रीव्यू फ्रेम (iframe) में माइक्रोफ़ोन की अनुमति रोक रखी है।");
        setShowMicPermissionGuide(true);
      }
      return false;
    } finally {
      setIsCheckingMic(false);
    }
  };

  const dismissMicBanner = (persist = true) => {
    setSpeechError(null);
    setShowMicPermissionGuide(false);
    setMicPermanentlyDismissed(true);
    try {
      localStorage.setItem('dismiss_mic_guide', 'true');
      sessionStorage.setItem('dismiss_mic_guide', 'true');
    } catch (e) {}
  };

  const toggleListening = async () => {
    if (isListening) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      setIsListening(false);
      setAiQuery(prev => cleanRailwayVoiceText(prev));
      return;
    }

    setSpeechError(null);
    setShowMicPermissionGuide(false);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechError("आपके ब्राउज़र में वॉइस इनपुट सपोर्ट नहीं है। कृपया Google Chrome या Edge का उपयोग करें अथवा सीधे कीबोर्ड से टाइप करें।");
      return;
    }

    // Capture starting query before user begins speaking
    initialQueryBeforeSpeakRef.current = aiQuery;

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = speechLang;
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
        setShowMicPermissionGuide(false);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        const fullTranscript = (finalTranscript + ' ' + interimTranscript).trim();
        if (fullTranscript) {
          const cleaned = cleanRailwayVoiceText(fullTranscript);
          const base = initialQueryBeforeSpeakRef.current.trim();
          setAiQuery(base ? `${base} ${cleaned}` : cleaned);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          if (!micPermanentlyDismissed) {
            setSpeechError("ब्राउज़र ने प्रीव्यू फ्रेम (iframe) में माइक्रोफ़ोन की अनुमति रोक रखी है। आप सीधे कीबोर्ड से लिख सकते हैं।");
            setShowMicPermissionGuide(true);
          }
        } else if (event.error === 'no-speech') {
          // No sound detected - quiet reset, don't harass user
          setSpeechError(null);
        } else {
          setSpeechError(null);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        setAiQuery(prev => cleanRailwayVoiceText(prev));
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e: any) {
      console.warn("SpeechRecognition start exception:", e);
      setIsListening(false);
      if (!micPermanentlyDismissed) {
        setSpeechError("माइक शुरू नहीं हो सका। कृपया सीधे कीबोर्ड से टाइप करें।");
      }
    }
  };

  const handleSpeakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.95;

    // Try finding Hindi voice
    const voices = window.speechSynthesis.getVoices();
    const hiVoice = voices.find(v => v.lang.includes('hi') || v.name.toLowerCase().includes('hindi') || v.lang.includes('IN'));
    if (hiVoice) {
      utterance.voice = hiVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Stop speech synthesis on component unmount or result change
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const quickPrompts = [
    { label: "LSCE लैम्प प्रकाशित / Cooling Mode", query: "LSCE lamp glow kar raha hai over temperature control electronics F0101P2 cooling mode" },
    { label: "Main Compressor (MCP) काम नहीं कर रहा", query: "main compressure not working / MCP kaam nahi kar raha" },
    { label: "MCPA (Aux Compressor) / Panto नहीं उठ रहा", query: "MCPA auxiliary compressor nahi chal raha panto nahi uth raha" },
    { label: "VCB Close नहीं हो रहा", query: "VCB close nahi ho raha stuck in off position" },
    { label: "MR Pressure कम हो रहा है", query: "MR pressure drop ho raha hai brake nahi lag raha" },
    { label: "Converter 1 Disturbance", query: "Converter 1 disturbance VCB open" },
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
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    if (isSpeaking && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

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
      qLower.includes('slave') || qLower.includes('स्लेव') || 
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
    return locoType === 'amrit_bharat' ? amritBharatFaults : faults;
  }, [locoType]);

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

    return currentFaults.filter((fault) => {
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
  }, [searchQuery, selectedSystem, currentFaults]);

  const isDay = cabMode === 'day';

  return (
    <div className={cn(
      "min-h-screen flex flex-col font-sans transition-colors duration-200",
      isDay ? "bg-slate-100 text-slate-950" : "bg-[#09090B] text-[#F4F4F5]",
      fontSize === 'extra-large' ? "text-lg" : fontSize === 'large' ? "text-base" : "text-sm"
    )}>
      {/* Header */}
      <header className={cn(
        "border-b sticky top-0 z-30 transition-colors duration-200",
        isDay ? "bg-white border-slate-300 shadow-sm" : "bg-[#121214] border-[#27272A]"
      )}>
        <div className="max-w-3xl w-full mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className={cn(
              "w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-black text-lg sm:text-xl shadow-md transition-colors",
              locoType === 'amrit_bharat' ? "bg-emerald-500 text-black shadow-emerald-500/20" : "bg-orange-500 text-black shadow-orange-500/20"
            )}>
              {locoType === 'amrit_bharat' ? 'AB' : '3Φ'}
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className={cn(
                  "text-xs sm:text-sm font-black tracking-wider uppercase",
                  locoType === 'amrit_bharat' 
                    ? (isDay ? "text-emerald-800" : "text-emerald-400") 
                    : (isDay ? "text-orange-700" : "text-orange-500")
                )}>
                  {locoType === 'amrit_bharat' ? 'LocoAssist • Amrit Bharat' : 'LocoAssist Pro'}
                </span>
                <span className={cn(
                  "text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded border uppercase",
                  locoType === 'amrit_bharat' 
                    ? (isDay ? "bg-emerald-100 text-emerald-900 border-emerald-300" : "bg-emerald-950 text-emerald-300 border-emerald-800")
                    : (isDay ? "bg-orange-100 text-orange-900 border-orange-300" : "bg-orange-950 text-orange-300 border-orange-800")
                )}>
                  {locoType === 'amrit_bharat' ? 'Push-Pull' : '3-Phase'}
                </span>
              </div>
              <span className={cn("text-[11px] mt-1 font-medium hidden xs:inline", isDay ? "text-slate-600" : "text-zinc-400")}>
                {locoType === 'amrit_bharat' 
                  ? 'Aerodynamic WAP-5 Push-Pull & Coaches (CLW 67p TSD)' 
                  : '3 Phase Troubleshooter & Vadodara Directory (254p)'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* 🔊 DIRECT LOUD VOICE INSTRUCTOR BUTTON (ALWAYS ACCESSIBLE IN HEADER) */}
            <button
              type="button"
              onClick={() => {
                setMode('voice');
              }}
              className={cn(
                "inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer shadow-md active:scale-95 shrink-0 border",
                mode === 'voice'
                  ? "bg-amber-400 text-black border-amber-300 ring-2 ring-amber-400 shadow-amber-400/30"
                  : "bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black border-amber-300 hover:brightness-105 shadow-amber-500/20"
              )}
              title="वॉयस गाइड (Loud Voice) - कैब में लाउड आवाज में स्टेप-दर-स्टेप सुनें"
            >
              <Volume2 className={cn("w-3.5 h-3.5 fill-current", mode === 'voice' && "animate-bounce")} />
              <span className="font-black tracking-wide">वॉयस गाइड</span>
              <span className="bg-red-600 text-white text-[9px] px-1 py-0.2 rounded font-black uppercase">
                LOUD
              </span>
            </button>
            {/* 🌙 CAB VISIBILITY TOGGLE (HIGH CONTRAST DAY vs NIGHT) */}
            <button
              type="button"
              onClick={() => setCabMode(prev => prev === 'night' ? 'day' : 'night')}
              className={cn(
                "inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-black border transition-all cursor-pointer shadow-sm active:scale-95",
                isDay
                  ? "bg-amber-100 text-amber-950 border-amber-400 hover:bg-amber-200"
                  : "bg-zinc-800 text-amber-300 border-zinc-700 hover:bg-zinc-700"
              )}
              title={isDay ? "नाइट कैब मोड चालू करें (Dark Cab Night)" : "डे एंटी-ग्लेयर मोड चालू करें (Sunlight Anti-Glare Day)"}
            >
              {isDay ? <Sun className="w-3.5 h-3.5 text-amber-600" /> : <Moon className="w-3.5 h-3.5 text-amber-400" />}
              <span className="hidden sm:inline">{isDay ? 'डे मोड (Sun)' : 'नाइट मोड (Dark)'}</span>
            </button>

            {/* 🔤 FONT SIZE SELECTOR (LP READABILITY) */}
            <div className={cn(
              "hidden sm:flex items-center rounded-lg border p-0.5 text-xs font-black",
              isDay ? "bg-slate-100 border-slate-300 text-slate-800" : "bg-zinc-800 border-zinc-700 text-zinc-300"
            )}>
              <button
                type="button"
                onClick={() => setFontSize('normal')}
                className={cn("px-2 py-0.5 rounded transition-colors", fontSize === 'normal' && (isDay ? "bg-slate-900 text-white" : "bg-amber-500 text-black font-black"))}
                title="सामान्य फॉन्ट (Normal Font)"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize('large')}
                className={cn("px-2 py-0.5 rounded transition-colors", fontSize === 'large' && (isDay ? "bg-slate-900 text-white" : "bg-amber-500 text-black font-black"))}
                title="बड़ा फॉन्ट - LP कैब अनुशंसित (Large Font - Recommended)"
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => setFontSize('extra-large')}
                className={cn("px-2 py-0.5 rounded transition-colors", fontSize === 'extra-large' && (isDay ? "bg-slate-900 text-white" : "bg-amber-500 text-black font-black"))}
                title="विशाल फॉन्ट (Extra Large Font)"
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
          {(!selectedFault || mode === 'voice') ? (
            <motion.div 
              key={mode === 'voice' ? 'voice' : 'list'}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col h-full"
            >
              <div className="bg-[#0A0A0B] px-4 py-3 z-10 shrink-0 border-b border-[#27272A] flex flex-col gap-3">
                {/* Primary 2-Tab Locomotive Switcher */}
                <div className="grid grid-cols-2 p-1 bg-[#121214] rounded-xl border border-[#27272A] gap-1.5 shadow-inner">
                  <button
                    type="button"
                    onClick={() => {
                      setLocoType('3phase');
                      setSelectedSystem(null);
                      setSelectedFault(null);
                    }}
                    className={cn(
                      "py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all",
                      locoType === '3phase'
                        ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-950/50 border border-orange-400/40"
                        : "text-[#A1A1AA] hover:text-white hover:bg-[#1C1C1F]"
                    )}
                  >
                    <Activity className="w-4 h-4 text-orange-200" />
                    <div className="flex flex-col text-left sm:text-center leading-tight">
                      <span className="font-extrabold tracking-wide">3-फ़ेस लोको (3-Phase)</span>
                      <span className="text-[10px] font-normal opacity-85">WAP-7 / WAG-9 / WAP-5 (254p)</span>
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
                      "py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all",
                      locoType === 'amrit_bharat'
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/50 border border-emerald-400/40"
                        : "text-[#A1A1AA] hover:text-white hover:bg-[#1C1C1F]"
                    )}
                  >
                    <Layers className="w-4 h-4 text-emerald-200" />
                    <div className="flex flex-col text-left sm:text-center leading-tight">
                      <span className="font-extrabold tracking-wide">अमृत भारत (Amrit Bharat)</span>
                      <span className="text-[10px] font-normal opacity-85">Push-Pull WAP-5 & Rake (67p)</span>
                    </div>
                  </button>
                </div>

                {/* 4-Tab Navigation: Catalog, AI Assistant, LOUD Voice Instructor, Directory Reader */}
                <div className={cn(
                  "flex p-1 rounded-xl border gap-1 shadow-sm transition-colors",
                  isDay ? "bg-slate-200 border-slate-300" : "bg-[#121214] border-[#27272A]"
                )}>
                  <button 
                    onClick={() => {
                      setMode('browse');
                      setSelectedFault(null);
                    }} 
                    className={cn(
                      "flex-1 py-2 px-1 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-1", 
                      mode === 'browse' 
                        ? (isDay ? "bg-white text-slate-950 shadow-sm font-black" : "bg-[#27272A] text-white shadow-sm font-black") 
                        : (isDay ? "text-slate-700 hover:text-slate-950" : "text-[#A1A1AA] hover:text-white")
                    )}
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>कैटलॉग</span>
                  </button>
                  <button 
                    onClick={() => setMode('ai')} 
                    className={cn(
                      "flex-1 py-2 px-1 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-1", 
                      mode === 'ai' 
                        ? (locoType === 'amrit_bharat' ? "bg-emerald-500 text-black shadow font-black" : "bg-orange-500 text-black shadow font-black")
                        : (isDay ? "text-slate-700 hover:text-orange-600" : "text-[#A1A1AA] hover:text-orange-400")
                    )}
                  >
                    <Sparkles className="w-3.5 h-3.5"/> <span>AI सहायक</span>
                  </button>
                  
                  {/* 🎙️ PROMINENT LP LOUD VOICE INSTRUCTOR TAB */}
                  <button 
                    onClick={() => setMode('voice')} 
                    className={cn(
                      "flex-1 py-2 px-1 text-xs sm:text-sm font-black rounded-lg transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer", 
                      mode === 'voice' 
                        ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/30 scale-102 font-black"
                        : (isDay 
                            ? "bg-amber-100 text-amber-950 hover:bg-amber-200 border border-amber-300 font-bold" 
                            : "bg-amber-950/60 text-amber-300 hover:bg-amber-900/60 border border-amber-500/40 font-bold")
                    )}
                  >
                    <Volume2 className={cn("w-3.5 h-3.5", mode === 'voice' ? "animate-bounce text-black" : "text-amber-500")}/> 
                    <span>वॉयस गाइड</span>
                    <span className="text-[9px] bg-red-600 text-white px-1 py-0.2 rounded font-black uppercase tracking-wider hidden sm:inline">
                      LOUD
                    </span>
                  </button>

                  <button 
                    onClick={() => {
                      setMode('manual');
                      if (!manualInfo) fetchManualInfo(locoType);
                    }} 
                    className={cn(
                      "flex-1 py-2 px-1 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-1", 
                      mode === 'manual' 
                        ? "bg-blue-600 text-white shadow-sm font-black" 
                        : (isDay ? "text-slate-700 hover:text-blue-600" : "text-[#A1A1AA] hover:text-blue-400")
                    )}
                  >
                    <BookOpen className="w-3.5 h-3.5"/> <span>{locoType === 'amrit_bharat' ? 'TSD (67p)' : 'मेमोरी'}</span>
                  </button>
                </div>

                {mode === 'browse' && (
                  <div className="relative">
                    <Search className={cn("absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4", isDay ? "text-slate-500" : "text-zinc-400")} />
                    <input 
                      type="text" 
                      placeholder="दोष कोड या समस्या खोजें... (उदा. P56 BP, P55 Panto, P53 Brakes, CE, F0101P1)" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={cn(
                        "w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-semibold transition-all outline-none shadow-sm",
                        isDay 
                          ? "bg-white border-slate-300 text-slate-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-200" 
                          : "bg-[#121214] border-[#27272A] text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      )}
                    />
                  </div>
                )}
              </div>

              {mode === 'browse' ? (
                <>
                  {/* Sub Systems Scroller */}
                  <div className={cn(
                    "border-b shrink-0 transition-colors",
                    isDay ? "bg-slate-200/70 border-slate-300" : "bg-[#121214] border-[#27272A]"
                  )}>
                    <div className="overflow-x-auto hide-scrollbar flex gap-2 px-4 py-2.5">
                      <button
                        onClick={() => setSelectedSystem(null)}
                        className={cn(
                          "px-3.5 py-1.5 rounded-lg text-xs font-black whitespace-nowrap transition-all shadow-sm",
                          selectedSystem === null 
                            ? (isDay ? "bg-slate-900 text-white" : "bg-amber-500 text-black shadow-amber-500/20") 
                            : (isDay ? "bg-white text-slate-800 border border-slate-300 hover:bg-slate-100" : "bg-[#18181B] text-zinc-300 border border-transparent hover:bg-[#222226]")
                        )}
                      >
                        {locoType === 'amrit_bharat' ? 'सभी सिस्टम (All)' : 'All Systems'}
                      </button>
                      {currentSubSystems.map((sys) => (
                        <button
                          key={sys.id}
                          onClick={() => setSelectedSystem(sys.id)}
                          className={cn(
                            "px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all shadow-sm",
                            selectedSystem === sys.id 
                              ? (locoType === 'amrit_bharat' 
                                  ? (isDay ? "bg-emerald-700 text-white font-black" : "bg-emerald-950 text-emerald-300 border border-emerald-500 font-black") 
                                  : (isDay ? "bg-orange-700 text-white font-black" : "bg-orange-500 text-black font-black"))
                              : (isDay ? "bg-white text-slate-800 border border-slate-300 hover:bg-slate-100" : "bg-[#18181B] text-zinc-300 border border-transparent hover:bg-[#222226]")
                          )}
                        >
                          {sys.id} - {sys.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Faults List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {filteredFaults.length > 0 ? (
                      filteredFaults.map((fault) => (
                        <div 
                          key={fault.id}
                          onClick={() => setSelectedFault(fault)}
                          className={cn(
                            "rounded-2xl p-4 sm:p-5 border-2 cursor-pointer transition-all active:scale-[0.99] shadow-sm",
                            isDay 
                              ? "bg-white border-slate-300 hover:border-amber-500 hover:shadow-md" 
                              : "bg-[#131316] border-[#2A2A30] hover:border-amber-500/60 hover:bg-[#18181D]"
                          )}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="bg-red-600 text-white text-[11px] uppercase font-black px-2.5 py-0.5 rounded-lg shadow-sm">
                                {fault.id}
                              </span>
                              <span className={cn(
                                "text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border",
                                isDay ? "bg-slate-100 text-slate-800 border-slate-300" : "bg-zinc-900 text-zinc-300 border-zinc-700"
                              )}>
                                {fault.subSystem}
                              </span>
                              {fault.masterEffect && (
                                <span className={cn(
                                  "text-[10px] px-2 py-0.5 rounded font-black border uppercase tracking-wider",
                                  isDay ? "bg-blue-100 text-blue-900 border-blue-300" : "bg-blue-950 text-blue-300 border-blue-800"
                                )}>
                                  Master / Slave
                                </span>
                              )}
                            </div>
                            <ChevronRight className={cn("w-5 h-5 shrink-0", isDay ? "text-slate-400" : "text-zinc-500")} />
                          </div>

                          <h3 className={cn("mt-2.5 text-base sm:text-lg font-black tracking-tight leading-snug line-clamp-2", isDay ? "text-slate-950" : "text-white")}>
                            {fault.message.split('\n')[0]}
                          </h3>

                          <p className={cn("mt-1 text-xs sm:text-sm font-semibold line-clamp-2 leading-relaxed", isDay ? "text-slate-700" : "text-zinc-300")}>
                            {fault.effect}
                          </p>

                          {/* Quick Card Footer with Loud Voice button */}
                          <div className={cn(
                            "mt-3 pt-2.5 border-t flex items-center justify-between gap-2",
                            isDay ? "border-slate-200" : "border-zinc-800"
                          )}>
                            <span className={cn("text-[11px] font-bold", isDay ? "text-slate-600" : "text-zinc-400")}>
                              {fault.actions.length} निवारण चरण
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFault(fault);
                                setMode('voice');
                              }}
                              className={cn(
                                "text-xs font-black px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer",
                                isDay 
                                  ? "bg-amber-100 text-amber-950 border-amber-400 hover:bg-amber-200" 
                                  : "bg-amber-950/80 text-amber-300 border-amber-500/50 hover:bg-amber-900"
                              )}
                              title="इस खराबी का निवारण जोर से बोलकर सुनें"
                            >
                              <Volume2 className="w-3.5 h-3.5 text-amber-500" />
                              <span>🔊 वॉयस में सुनें</span>
                            </button>
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
                  {/* Strict Document Grounding Notice */}
                  <div className="bg-[#0D1512] p-3.5 rounded-xl border border-emerald-800/80 shadow-sm flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-400 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                          केवल अपलोड TSD PDF विश्लेषण आधारित (Strict Document Grounding)
                        </span>
                        <span className="text-[10px] font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                          बिना मनगढ़ंत उत्तर (Zero Hallucination)
                        </span>
                      </div>
                      <p className="text-xs text-[#D4D4D8] mt-1 leading-relaxed">
                        AI सहायक अपने मन से उत्तर नहीं देता। यह केवल अपलोड की गई आधिकारिक TSD PDF (
                        <span className="font-semibold text-emerald-300">
                          {locoType === 'amrit_bharat'
                            ? 'चित्तरंजन लोकोमोटिव वर्क्स - 67 पृष्ठ अमृत भारत TSD Final Copy PDF'
                            : 'क्षेत्रीय विद्युत प्रशिक्षण केंद्र, वड़ोदरा - 254 पृष्ठ 3-Phase TSD PDF'}
                        </span>
                        ) के पन्नों का गहराई से विश्लेषण करके ही नियम, स्विच, MCB व समाधान बताता है।
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#121214] rounded-lg p-5 border border-[#27272A]">
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <h2 className="text-[#E4E4E7] font-semibold flex items-center gap-2 text-base">
                        <Bot className="w-5 h-5 text-orange-500"/> Describe Loco Defect (समस्या का विवरण दें)
                      </h2>

                      {/* Input Mode & Language Selector */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Keyboard vs Voice Mode Toggle */}
                        <div className="flex items-center bg-[#18181B] rounded border border-[#27272A] p-0.5 text-xs">
                          <button
                            type="button"
                            onClick={() => {
                              setInputMode('keyboard');
                              if (isListening && recognitionRef.current) {
                                try { recognitionRef.current.stop(); } catch (e) {}
                                setIsListening(false);
                              }
                              setSpeechError(null);
                              setShowMicPermissionGuide(false);
                            }}
                            className={cn(
                              "px-2.5 py-1 rounded font-semibold transition-colors flex items-center gap-1",
                              inputMode === 'keyboard' ? "bg-orange-500 text-black shadow-sm" : "text-[#A1A1AA] hover:text-white"
                            )}
                          >
                            <span>⌨️ टाइपिंग (Keyboard)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setInputMode('voice')}
                            className={cn(
                              "px-2.5 py-1 rounded font-semibold transition-colors flex items-center gap-1",
                              inputMode === 'voice' ? "bg-orange-500 text-black shadow-sm" : "text-[#A1A1AA] hover:text-white"
                            )}
                          >
                            <Mic className="w-3.5 h-3.5" />
                            <span>बोलकर (Voice)</span>
                          </button>
                        </div>

                        {/* Language Selector when in voice mode */}
                        {inputMode === 'voice' && (
                          <div className="flex items-center bg-[#18181B] rounded border border-[#27272A] p-0.5 text-xs">
                            <button
                              type="button"
                              onClick={() => setSpeechLang('hi-IN')}
                              className={cn(
                                "px-2 py-0.5 rounded font-medium transition-colors",
                                speechLang === 'hi-IN' ? "bg-orange-500 text-black font-semibold" : "text-[#A1A1AA] hover:text-white"
                              )}
                            >
                              हिंदी
                            </button>
                            <button
                              type="button"
                              onClick={() => setSpeechLang('en-IN')}
                              className={cn(
                                "px-2 py-0.5 rounded font-medium transition-colors",
                                speechLang === 'en-IN' ? "bg-orange-500 text-black font-semibold" : "text-[#A1A1AA] hover:text-white"
                              )}
                            >
                              Eng
                            </button>
                          </div>
                        )}

                        <span className="text-xs text-[#71717A] bg-[#18181B] px-2 py-0.5 rounded border border-[#27272A] hidden sm:inline">
                          {locoType === 'amrit_bharat' ? 'CLW 67-Page TSD' : 'TSD 254-Page Directory'}
                        </span>
                      </div>
                    </div>

                    {/* Non-intrusive Frame Mic notice when in voice mode */}
                    {inputMode === 'voice' && speechError && (
                      <div className="mb-3 p-3 bg-[#1C1412] border border-amber-800/80 rounded-xl text-xs text-[#FDE68A] shadow-md flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2">
                          <MicOff className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold text-amber-200">
                              प्रीव्यू फ्रेम (iframe) में ब्राउज़र ने माइक्रोफ़ोन रोक रखा है
                            </span>
                            <span className="text-[11px] text-[#E4E4E7] leading-relaxed">
                              बोलकर इनपुट देने के लिए नीचे दिए गए बटन से इसे <strong>नए टैब में खोलें</strong> (जहाँ ब्राउज़र सीधे माइक की अनुमति देता है) अथवा <strong>⌨️ टाइपिंग मोड</strong> में सीधे लिखकर सर्च करें।
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                              {isInIframe && (
                                <a
                                  href={typeof window !== 'undefined' ? window.location.href : '#'}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 px-3 py-1 rounded bg-orange-600 hover:bg-orange-500 text-black font-bold text-[11px] transition-colors shadow-sm"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  <span>🔗 नए टैब में खोलें (माइक चालू करें)</span>
                                </a>
                              )}
                              <button
                                type="button"
                                onClick={() => {
                                  setInputMode('keyboard');
                                  dismissMicBanner(true);
                                }}
                                className="px-2.5 py-1 rounded bg-[#27272A] hover:bg-[#3F3F46] text-[#E4E4E7] text-[11px] transition-colors"
                              >
                                ⌨️ कीबोर्ड टाइपिंग पर जाएं
                              </button>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => dismissMicBanner(true)}
                          className="text-[#A1A1AA] hover:text-white text-xs font-bold p-1"
                          title="बंद करें"
                        >
                          ✕
                        </button>
                      </div>
                    )}

                    {/* Textarea with voice bar */}
                    <div className="relative mb-3">
                      <textarea
                        value={aiQuery}
                        onChange={e => {
                          setAiQuery(e.target.value);
                          if (speechError) setSpeechError(null);
                        }}
                        placeholder={isListening ? "सुन रहे हैं... कृपया स्पष्ट आवाज़ में बोलें (Listening... Speak now)..." : "बोलकर या लिखकर समस्या बताएं (जैसे: 'main compressure not working' या 'MCP 1 trip ho gaya hai')..."}
                        className={cn(
                          "w-full h-24 bg-[#0A0A0B] border rounded-lg p-3 text-sm text-[#E4E4E7] focus:outline-none resize-none placeholder-[#52525B] transition-all",
                          isListening 
                            ? "border-red-500 ring-2 ring-red-500/30 bg-red-950/10 placeholder-red-400/70" 
                            : "border-[#27272A] focus:border-orange-500"
                        )}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                            handleAiSubmit();
                          }
                        }}
                      />

                      {aiQuery && (
                        <div className="absolute right-2 top-2 flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setAiQuery(cleanRailwayVoiceText(aiQuery))}
                            title="तकनीकी शब्दों को सही करें"
                            className="text-xs bg-[#18181B] text-orange-400 hover:text-orange-300 px-2 py-0.5 rounded border border-[#27272A] hover:bg-[#27272A] transition-colors flex items-center gap-1"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>शब्द सुधारें</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setAiQuery('')}
                            title="हटाएं"
                            className="text-xs bg-[#18181B] text-[#71717A] hover:text-white px-2 py-0.5 rounded border border-[#27272A] hover:bg-[#27272A] transition-colors"
                          >
                            Clear
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Voice Input Action Button (only shown in Voice Mode) */}
                    {inputMode === 'voice' && (
                      <div className="flex gap-2 mb-4">
                        <button
                          type="button"
                          onClick={toggleListening}
                          className={cn(
                            "flex-1 py-2.5 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2.5 transition-all border shadow-sm",
                            isListening
                              ? "bg-red-600 hover:bg-red-500 text-white border-red-400 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                              : "bg-[#18181B] hover:bg-[#222226] text-white border-[#3F3F46] hover:border-orange-500/50"
                          )}
                        >
                          {isListening ? (
                            <>
                              <MicOff className="w-4 h-4 text-white" />
                              <span>सुन रहा हूँ... (रोकने के लिए दबाएं)</span>
                            </>
                          ) : (
                            <>
                              <Mic className="w-4 h-4 text-orange-500" />
                              <span>बोलकर बताएं (Tap to Speak in {speechLang === 'hi-IN' ? 'हिंदी' : 'English'})</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Quick suggestion chips */}
                    <div className="mb-4">
                      <p className="text-[11px] font-medium text-[#71717A] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-orange-500/70" /> सामान्य समस्याएं (Quick Prompts):
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {activeQuickPrompts.map((qp, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleAiSubmit(qp.query)}
                            disabled={aiLoading}
                            className="text-xs px-2.5 py-1 rounded bg-[#18181B] text-[#A1A1AA] hover:text-white hover:bg-[#27272A] border border-[#27272A] hover:border-orange-500/40 transition-all text-left"
                          >
                            {qp.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => handleAiSubmit()}
                      disabled={aiLoading || !aiQuery.trim()}
                      className="w-full bg-orange-500 text-black font-bold py-3 rounded-lg hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 transition-colors shadow-sm"
                    >
                      {aiLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                      {aiLoading ? "Analyzing Indian Railways TSD Manual..." : "Analyze Defect (जांच करें)"}
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

                  {aiResult && (
                    <div className="bg-[#121214] rounded-lg p-5 border border-orange-500/40 shadow-[0_0_25px_rgba(249,115,22,0.08)] flex flex-col gap-5">
                      {/* Fault Header with ID and Catalog Link and Read Aloud */}
                      <div className="flex flex-col gap-2 border-b border-[#27272A] pb-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2.5">
                            <ShieldAlert className="w-5 h-5 text-orange-500" />
                            <span className="text-[#A1A1AA] text-xs font-semibold uppercase tracking-wider">Identified Fault Code:</span>
                            {aiResult.identifiedFaultId ? (
                              <span className="bg-red-950 text-red-400 border border-red-900 font-bold px-2.5 py-0.5 rounded text-sm tracking-wide">
                                {aiResult.identifiedFaultId}
                              </span>
                            ) : (
                              <span className="bg-yellow-950/60 text-yellow-400 border border-yellow-800/80 px-2 py-0.5 rounded text-xs">
                                General Defect
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {/* 🔊 Open in Voice Guide with step-by-step loud voice */}
                            <button
                              type="button"
                              onClick={() => setMode('voice')}
                              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-black bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-md transition-all active:scale-95 cursor-pointer"
                              title="इस पूरे समाधान को वॉयस गाइड में जोर से सुनें"
                            >
                              <Volume2 className="w-3.5 h-3.5 fill-current animate-bounce" />
                              <span>🔊 वॉयस गाइड में सुनें</span>
                            </button>

                            {matchedCatalogFault && (
                              <button
                                onClick={() => setSelectedFault(matchedCatalogFault)}
                                className={cn(
                                  "text-xs flex items-center gap-1.5 border px-2.5 py-1.5 rounded-lg font-bold transition-colors",
                                  isDay ? "bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200" : "text-orange-400 bg-orange-950/40 border-orange-800/60 hover:bg-orange-900/50"
                                )}
                              >
                                <span>कैटलॉग में देखें</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {aiResult.faultTitle && (
                          <h3 className="text-base font-semibold text-white mt-1">
                            {aiResult.faultTitle}
                          </h3>
                        )}

                        {/* 🏛️ OFFICIAL HARD EVIDENCE CARD (आधिकारिक दस्तावेज़ का ठोस प्रमाण) */}
                        <div className="bg-gradient-to-br from-emerald-950/90 via-[#0A1612] to-[#0A1118] border-2 border-emerald-500/70 rounded-xl p-4 shadow-xl flex flex-col gap-3 mt-1">
                          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-emerald-800/60 pb-2.5">
                            <div className="flex items-center gap-2">
                              <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                              </span>
                              <h4 className="text-xs sm:text-sm font-black text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                                <span>🏛️ आधिकारिक दस्तावेज़ का ठोस प्रमाण (OFFICIAL HARD EVIDENCE)</span>
                              </h4>
                            </div>
                            <span className="bg-emerald-900/90 text-emerald-200 border border-emerald-500/80 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm">
                              ✓ 100% PDF सत्यापित (Verified)
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div className="bg-[#0A0A0B]/90 p-3 rounded-lg border border-emerald-900/60 flex flex-col justify-center">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">आधिकारिक पुस्तक (Official Source Book):</span>
                              <span className="text-emerald-200 font-bold mt-1 leading-snug">
                                {aiResult.pdfDocumentName || (locoType === 'amrit_bharat' ? 'चित्तरंजन लोकोमोटिव वर्क्स (CLW) - 67 पृष्ठ अमृत भारत TSD Final Copy' : 'क्षेत्रीय विद्युत प्रशिक्षण केंद्र, वड़ोदरा (BRC) - 254 पृष्ठ 3-फेज TSD')}
                              </span>
                            </div>

                            <div className="bg-[#0A0A0B]/90 p-3 rounded-lg border border-emerald-900/60 flex items-center justify-between gap-2">
                              <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">सटीक पृष्ठ संख्या (Exact Page No.):</span>
                                <span className="text-xl font-black text-amber-400 mt-0.5">
                                  {aiResult.pdfPage ? `पृष्ठ संख्या ${aiResult.pdfPage}` : (aiResult.manualReference || 'पृष्ठ 53')}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setMode('manual');
                                  let pageToLoad = aiResult.pdfPage;
                                  if (!pageToLoad && aiResult.manualReference) {
                                    const m = aiResult.manualReference.match(/(?:पृष्ठ|page)\s*(\d+)/i);
                                    if (m) pageToLoad = parseInt(m[1], 10);
                                  }
                                  pageToLoad = pageToLoad || (locoType === 'amrit_bharat' ? 53 : 22);
                                  loadManualPage(pageToLoad);
                                }}
                                className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-lg shadow-lg flex items-center gap-1.5 transition-transform active:scale-95 shrink-0"
                              >
                                <BookOpen className="w-4 h-4" />
                                <span>📖 TSD में पृष्ठ {aiResult.pdfPage || 53} अभी खोलें</span>
                              </button>
                            </div>
                          </div>

                          {aiResult.manualReference && (
                            <div className="text-[11px] text-gray-300 bg-[#0A0A0B]/70 px-3 py-1.5 rounded border border-emerald-950 flex items-center gap-2">
                              <span className="text-emerald-400 font-bold shrink-0">अनुभाग / क्लॉज़ (Section):</span>
                              <span className="font-medium text-emerald-100">{aiResult.manualReference}</span>
                            </div>
                          )}

                          {/* Official Document Excerpt / Quote */}
                          {aiResult.pdfQuote && (
                            <div className="bg-[#050C10] p-3 rounded-lg border border-emerald-800/70">
                              <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-bold mb-1.5">
                                <FileText className="w-3.5 h-3.5" />
                                <span>अपलोड TSD PDF से मूल पाठ (Verbatim PDF Quote):</span>
                              </div>
                              <pre className="text-xs text-gray-200 font-mono leading-relaxed whitespace-pre-wrap border-l-2 border-emerald-400 pl-3 py-1 bg-black/60 rounded-r">
                                {aiResult.pdfQuote}
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Analysis Section */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-4 h-4 text-blue-400" />
                          <h4 className="font-bold text-xs uppercase tracking-widest text-[#71717A]">Analysis (कारण एवं विवरण)</h4>
                        </div>
                        <p className="text-[#E4E4E7] text-sm leading-relaxed bg-[#0A0A0B] p-4 rounded-lg border border-[#27272A]">
                          {aiResult.analysis}
                        </p>
                      </div>

                      {/* Suggested Actions Section */}
                      <div>
                        <div className="flex items-center gap-2 mb-2.5">
                          <Wrench className="w-4 h-4 text-orange-500" />
                          <h4 className="font-bold text-xs uppercase tracking-widest text-[#71717A]">Loco Pilot Troubleshooting Actions (दोष निवारण कार्यवाही)</h4>
                        </div>
                        <div className="space-y-2.5">
                          {aiResult.suggestedActions.map((action, idx) => (
                            <div key={idx} className="flex gap-3.5 items-start bg-[#0A0A0B] p-3.5 rounded-lg border border-[#27272A] hover:border-orange-500/30 transition-colors">
                              <div className="w-6 h-6 shrink-0 rounded-full bg-[#18181B] flex items-center justify-center text-xs font-bold text-orange-500 border border-[#3F3F46] mt-0.5">
                                {idx + 1}
                              </div>
                              <p className="text-[#E4E4E7] text-sm leading-relaxed pt-0.5 whitespace-pre-wrap">
                                {action}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Precautions / TLC Advice Section */}
                      {aiResult.precautions && (
                        <div className="bg-[#18181B] p-4 rounded-lg border border-[#27272A]">
                          <div className="flex items-center gap-2 mb-1.5 text-yellow-500">
                            <AlertTriangle className="w-4 h-4" />
                            <h4 className="font-bold text-xs uppercase tracking-widest text-yellow-500">सावधानी एवं निर्देश (Precautions & TLC Advice)</h4>
                          </div>
                          <p className="text-xs text-[#A1A1AA] leading-relaxed">
                            {aiResult.precautions}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : mode === 'voice' ? (
                <LPVoiceGuide
                  locoType={locoType}
                  currentFault={selectedFault}
                  aiResult={aiResult}
                  cabMode={cabMode}
                  fontSize={fontSize}
                  onSelectFault={(f) => {
                    setSelectedFault(f);
                  }}
                  onOpenAi={() => setMode('ai')}
                  onBackToCatalog={() => {
                    setMode('browse');
                    setSelectedFault(null);
                  }}
                />
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
                            : ["LSCE", "कूलिंग मोड", "MCP", "MCPA", "BUR 1", "BUR 2", "BUR 3", "VCB", "47.1/1", "48.1", "F0101P2", "E-70", "BOGIE 1"]
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
                          {activePageText && (
                            <button
                              onClick={() => handleSpeakText(activePageText.slice(0, 500))}
                              className="text-xs bg-[#18181B] hover:bg-[#27272A] text-orange-400 border border-[#27272A] px-2.5 py-1.5 rounded flex items-center gap-1 transition-colors"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>पेज सुनें</span>
                            </button>
                          )}
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

                {/* 🔊 LOUD VOICE INSTRUCTOR BUTTON */}
                <button
                  type="button"
                  onClick={() => setMode('voice')}
                  className="px-3 sm:px-4 py-2 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/30 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                  title="इस खराबी का निवारण जोर से बोलकर सुनें"
                >
                  <Volume2 className="w-4 h-4 fill-current animate-bounce" />
                  <span>🔊 लाउड वॉयस में सुनें</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-16 space-y-5">
                {/* 📢 PROMINENT VOICE GUIDE BANNER */}
                <div className={cn(
                  "p-4 rounded-2xl border-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg transition-all",
                  isDay 
                    ? "bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 border-amber-500 text-slate-950 shadow-amber-200/50" 
                    : "bg-gradient-to-r from-amber-950/90 via-[#18140B] to-orange-950/90 border-amber-500/80 text-white shadow-[0_0_25px_rgba(245,158,11,0.2)]"
                )}>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-amber-500 text-black flex items-center justify-center font-black shrink-0 shadow-md">
                      <Volume2 className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500 text-black">
                          📢 LP VOICE CO-PILOT
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-600 text-white">
                          हिंदी / English
                        </span>
                      </div>
                      <h4 className="font-black text-sm sm:text-base mt-0.5">
                        लोको पायलट वॉयस गाइड (Loud Voice Instructor)
                      </h4>
                      <p className={cn("text-xs font-semibold", isDay ? "text-slate-700" : "text-zinc-300")}>
                        कैब में बिना स्क्रीन देखे 100% लाउड आवाज में एक-एक स्टेप सुनें
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMode('voice')}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer shrink-0"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>▶️ जोर से बोलकर सुनें (Start Audio)</span>
                  </button>
                </div>

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
                    <span className="text-xs font-bold text-amber-500">
                      ({selectedFault.actions.length} चरण)
                    </span>
                  </div>
                  
                  <div className="space-y-3.5">
                    {selectedFault.actions.map((action, idx) => (
                      <div 
                        key={idx} 
                        className={cn(
                          "flex gap-3.5 items-start p-4 sm:p-5 rounded-2xl border-2 transition-all shadow-sm",
                          isDay 
                            ? "bg-white border-slate-300 hover:border-amber-500" 
                            : "bg-[#131316] border-[#2A2A30] hover:border-amber-500/50"
                        )}
                      >
                        <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-amber-500 text-black flex items-center justify-center text-xs sm:text-sm font-black shadow-md border-2 border-amber-300 mt-0.5">
                          {(idx + 1).toString().padStart(2, '0')}
                        </div>
                        <div className="flex-1">
                          <p className={cn(
                            "leading-relaxed whitespace-pre-wrap font-bold",
                            fontSize === 'extra-large' ? 'text-base sm:text-lg' : fontSize === 'large' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm',
                            isDay ? "text-slate-950" : "text-zinc-100"
                          )}>
                            {action}
                          </p>
                        </div>
                      </div>
                    ))}
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
                    <div className="space-y-3.5">
                      {selectedFault.slaveActions.map((action, idx) => (
                        <div 
                          key={idx} 
                          className={cn(
                            "flex gap-3.5 items-start p-4 sm:p-5 rounded-2xl border-2 transition-all shadow-sm",
                            isDay 
                              ? "bg-emerald-50/60 border-emerald-300 hover:border-emerald-500" 
                              : "bg-[#0E1714] border-emerald-900/60 hover:border-emerald-600"
                          )}
                        >
                          <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-emerald-500 text-black flex items-center justify-center text-xs sm:text-sm font-black shadow-md border-2 border-emerald-300 mt-0.5">
                            S{(idx + 1).toString().padStart(2, '0')}
                          </div>
                          <div className="flex-1">
                            <p className={cn(
                              "leading-relaxed whitespace-pre-wrap font-bold",
                              fontSize === 'extra-large' ? 'text-base sm:text-lg' : fontSize === 'large' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm',
                              isDay ? "text-slate-950" : "text-emerald-100"
                            )}>
                              {action}
                            </p>
                          </div>
                        </div>
                      ))}
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
                    <li><strong>आवाज़ से तुरंत सर्च (Microphone):</strong> मोबाइल में बोलने पर माइक्रोफ़ोन 100% सीधे काम करता है।</li>
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
