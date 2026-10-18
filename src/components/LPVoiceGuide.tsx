import { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Volume2, VolumeX, Play, Pause, Square, SkipBack, SkipForward, RotateCcw, 
  Globe, Search, Layers, ShieldAlert, Sparkles, CheckCircle2, ChevronRight, 
  AlertTriangle, Radio, Sun, Moon, Type, Zap, ArrowLeft
} from 'lucide-react';
import { Fault } from '../types';
import { faults } from '../data';
import { amritBharatFaults } from '../dataAmritBharat';
import { cn } from '../lib/utils';

interface LPVoiceGuideProps {
  locoType: '3phase' | 'amrit_bharat';
  currentFault: Fault | null;
  aiResult?: {
    identifiedFaultId?: string | null;
    faultTitle?: string;
    analysis?: string;
    suggestedActions?: string[];
    precautions?: string;
  } | null;
  cabMode: 'night' | 'day';
  fontSize: 'normal' | 'large' | 'extra-large';
  onSelectFault: (fault: Fault) => void;
  onOpenAi: () => void;
  onBackToCatalog?: () => void;
}

export function LPVoiceGuide({
  locoType,
  currentFault,
  aiResult,
  cabMode,
  fontSize,
  onSelectFault,
  onOpenAi,
  onBackToCatalog
}: LPVoiceGuideProps) {
  // Language for loud voice instructions: 'hi' (Hindi) or 'en' (English)
  const [voiceLang, setVoiceLang] = useState<'hi' | 'en'>('hi');
  const [speechRate, setSpeechRate] = useState<number>(0.9); // 0.8 (slow/cab), 0.95 (normal), 1.2 (fast)
  
  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  // Web Speech Synthesis References
  const isSpeakingRef = useRef(false);
  const currentStepRef = useRef(-1);
  const stepListRef = useRef<Array<{ id: number; raw: string; en: string; hi: string; prefixTag?: string }>>([]);
  const activeStepCardRef = useRef<HTMLDivElement | null>(null);

  // Available faults for quick selection
  const allFaults = locoType === 'amrit_bharat' ? amritBharatFaults : faults;

  // Load and monitor browser voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const loadVoices = () => {
      try {
        const v = window.speechSynthesis.getVoices();
        if (v && v.length > 0) setAvailableVoices(v);
      } catch (e) {
        console.warn('Could not retrieve speech voices:', e);
      }
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Selected item: Either currentFault, or created from aiResult, or default critical fault
  const activeItem = useMemo(() => {
    if (currentFault) {
      // If there are slaveActions, append them with clear tags
      const combinedActions = [...(currentFault.actions || [])];
      if (currentFault.slaveActions && currentFault.slaveActions.length > 0) {
        currentFault.slaveActions.forEach((sa) => {
          combinedActions.push(`[Slave Loco / स्लेव लोको] ${sa}`);
        });
      }

      return {
        title: currentFault.message,
        id: currentFault.id,
        subSystem: currentFault.subSystem,
        effect: currentFault.effect,
        masterEffect: currentFault.masterEffect,
        slaveEffect: currentFault.slaveEffect,
        actions: combinedActions,
        precautions: (currentFault as any).precautions
      };
    }

    if (aiResult && aiResult.suggestedActions && aiResult.suggestedActions.length > 0) {
      return {
        title: aiResult.faultTitle || 'AI विश्लेषित दोष (Analyzed Defect)',
        id: aiResult.identifiedFaultId || 'AI_DEFECT',
        subSystem: 'TSD',
        effect: aiResult.analysis || '',
        masterEffect: undefined,
        slaveEffect: undefined,
        actions: aiResult.suggestedActions,
        precautions: aiResult.precautions
      };
    }

    // Default top fault: P56 BP or P54 CE or first fault
    const fallback = allFaults.find(f => f.id === 'P56_BP_MASTER' || f.id === 'P54_CE') || allFaults[0];
    const combinedActions = [...(fallback.actions || [])];
    if (fallback.slaveActions && fallback.slaveActions.length > 0) {
      fallback.slaveActions.forEach((sa) => {
        combinedActions.push(`[Slave Loco / स्लेव लोको] ${sa}`);
      });
    }

    return {
      title: fallback.message,
      id: fallback.id,
      subSystem: fallback.subSystem,
      effect: fallback.effect,
      masterEffect: fallback.masterEffect,
      slaveEffect: fallback.slaveEffect,
      actions: combinedActions,
      precautions: (fallback as any).precautions
    };
  }, [currentFault, aiResult, allFaults]);

  // Parse actions into English and Hindi dual channels
  const parsedSteps = useMemo(() => {
    if (!activeItem || !activeItem.actions) return [];

    return activeItem.actions.map((act, index) => {
      let raw = act.trim();
      let hiText = '';
      let enText = '';
      let prefixTag = '';

      // Check for [Slave Loco] or [Master Loco] tag
      if (raw.startsWith('[Slave Loco') || raw.startsWith('[स्लेव लोको') || raw.startsWith('[Slave Loco /')) {
        prefixTag = 'स्लेव लोको (Slave Loco)';
        raw = raw.replace(/^\[[^\]]+\]\s*/, '').trim();
      } else if (raw.startsWith('[Master Loco') || raw.startsWith('[मास्टर लोको')) {
        prefixTag = 'मास्टर लोको (Master Loco)';
        raw = raw.replace(/^\[[^\]]+\]\s*/, '').trim();
      }

      // 1. Check if line contains parentheses with Hindi
      const parenMatch = raw.match(/\(([\u0900-\u097F\s\S]+?)\)/);
      if (parenMatch) {
        hiText = parenMatch[1].trim();
        enText = raw.replace(/\(([\u0900-\u097F\s\S]+?)\)/, '').trim();
      } else if (raw.includes(' / ') && /[\u0900-\u097F]/.test(raw)) {
        // 2. Check for slash separated English / Hindi
        const parts = raw.split(' / ');
        const hindiPart = parts.find(p => /[\u0900-\u097F]/.test(p));
        const engPart = parts.find(p => !/[\u0900-\u097F]/.test(p));
        hiText = hindiPart ? hindiPart.trim() : raw;
        enText = engPart ? engPart.trim() : raw;
      } else if (raw.includes('\n') && /[\u0900-\u097F]/.test(raw)) {
        // 3. Multi-line English on top, Hindi below
        const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
        const hindiLines = lines.filter(l => /[\u0900-\u097F]/.test(l));
        const engLines = lines.filter(l => !/[\u0900-\u097F]/.test(l));
        hiText = hindiLines.join(' ') || raw;
        enText = engLines.join(' ') || raw;
      } else {
        // 4. Test if primarily Hindi or English
        const hasHindi = /[\u0900-\u097F]/.test(raw);
        if (hasHindi) {
          hiText = raw;
          enText = raw;
        } else {
          enText = raw;
          hiText = raw;
        }
      }

      // Clean up numbering prefixes from spoken text
      const cleanHi = hiText.replace(/^[•\s\d\.\-a-z\(\)]+/i, '').trim() || hiText;
      const cleanEn = enText.replace(/^[•\s\d\.\-a-z\(\)]+/i, '').trim() || enText;

      return {
        id: index,
        raw,
        en: cleanEn,
        hi: cleanHi,
        prefixTag
      };
    });
  }, [activeItem]);

  // Keep ref updated
  useEffect(() => {
    stepListRef.current = parsedSteps;
  }, [parsedSteps]);

  // Clean stop audio on unmount or item change
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [activeItem]);

  // Scroll active card into view
  useEffect(() => {
    if (currentStepIndex >= 0 && activeStepCardRef.current) {
      activeStepCardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [currentStepIndex]);

  // Play Cab Attention Alert Beep using Web Audio API
  const playCabBeep = () => {
    try {
      if (typeof window === 'undefined') return;
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(950, ctx.currentTime); // High pitch for cutting through cab noise
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {
      // AudioContext policy
    }
  };

  // Find best speech voice
  const getBestVoice = (lang: 'hi' | 'en') => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const vList = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();
    if (!vList || vList.length === 0) return null;

    if (lang === 'hi') {
      return (
        vList.find(v => v.lang === 'hi-IN') ||
        vList.find(v => v.lang.toLowerCase().startsWith('hi')) ||
        vList.find(v => v.name.toLowerCase().includes('hindi')) ||
        vList.find(v => v.lang.includes('IN')) ||
        null
      );
    } else {
      return (
        vList.find(v => v.lang === 'en-IN') ||
        vList.find(v => v.lang === 'en-GB') ||
        vList.find(v => v.lang === 'en-US' && v.name.includes('Google')) ||
        vList.find(v => v.lang.startsWith('en')) ||
        null
      );
    }
  };

  // Speak a single step by index
  const speakStep = (index: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert("इस ब्राउज़र में स्पीच सिंथेसिस सपोर्ट उपलब्ध नहीं है।");
      return;
    }

    if (index < 0 || index >= stepListRef.current.length) {
      // Completed all steps
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentStepIndex(-1);
      currentStepRef.current = -1;
      isSpeakingRef.current = false;
      return;
    }

    window.speechSynthesis.cancel();
    setCurrentStepIndex(index);
    currentStepRef.current = index;
    setIsPlaying(true);
    setIsPaused(false);
    isSpeakingRef.current = true;

    // Attention chime in cab
    playCabBeep();

    const step = stepListRef.current[index];
    const prefix = voiceLang === 'hi' 
      ? (step.prefixTag ? `${step.prefixTag}, चरण संख्या ${index + 1}: ` : `चरण संख्या ${index + 1}: `)
      : (step.prefixTag ? `${step.prefixTag}, Step number ${index + 1}: ` : `Step number ${index + 1}: `);
    
    const textToSpeak = voiceLang === 'hi' ? `${prefix} ${step.hi}` : `${prefix} ${step.en}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = voiceLang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = speechRate;
    utterance.volume = 1.0; // 100% loudest possible
    utterance.pitch = 1.05; // High clarity pitch

    const voice = getBestVoice(voiceLang);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      // Advance to next step after brief pause if still playing
      if (isSpeakingRef.current && currentStepRef.current === index) {
        setTimeout(() => {
          if (isSpeakingRef.current && currentStepRef.current === index) {
            speakStep(index + 1);
          }
        }, 1200); // 1.2s pause for LP to comprehend and apply
      }
    };

    utterance.onerror = (e) => {
      console.warn("TTS utterance error:", e);
      setIsPlaying(false);
      setIsPaused(false);
      isSpeakingRef.current = false;
    };

    window.speechSynthesis.speak(utterance);
  };

  // Play All or Resume
  const handlePlay = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPaused && currentStepIndex >= 0) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      isSpeakingRef.current = true;
      return;
    }

    const startIndex = currentStepIndex >= 0 ? currentStepIndex : 0;
    speakStep(startIndex);
  };

  // Pause
  const handlePause = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.pause();
    setIsPlaying(false);
    setIsPaused(true);
    isSpeakingRef.current = false;
  };

  // Stop
  const stopAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentStepIndex(-1);
    currentStepRef.current = -1;
    isSpeakingRef.current = false;
  };

  // Previous Step
  const handlePrevStep = () => {
    const prev = Math.max(0, (currentStepIndex >= 0 ? currentStepIndex : 0) - 1);
    speakStep(prev);
  };

  // Next Step
  const handleNextStep = () => {
    const next = (currentStepIndex >= 0 ? currentStepIndex : -1) + 1;
    if (next < parsedSteps.length) {
      speakStep(next);
    } else {
      stopAudio();
    }
  };

  // Repeat current step
  const handleRepeat = () => {
    const current = currentStepIndex >= 0 ? currentStepIndex : 0;
    speakStep(current);
  };

  // Switch voice language and re-announce if playing
  const handleLanguageSwitch = (newLang: 'hi' | 'en') => {
    setVoiceLang(newLang);
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        speakStep(currentStepIndex >= 0 ? currentStepIndex : 0);
      }, 250);
    }
  };

  // Filtered faults for quick selection search
  const filteredQuickFaults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allFaults.filter(f => 
      f.id.toLowerCase().includes(q) || 
      f.message.toLowerCase().includes(q) ||
      (f.effect && f.effect.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [allFaults, searchQuery]);

  // Font size classes for high visibility
  const textClass = fontSize === 'extra-large' 
    ? 'text-lg sm:text-xl' 
    : fontSize === 'large' 
      ? 'text-base sm:text-lg' 
      : 'text-sm sm:text-base';

  const headingClass = fontSize === 'extra-large' 
    ? 'text-xl sm:text-2xl' 
    : fontSize === 'large' 
      ? 'text-lg sm:text-xl' 
      : 'text-base sm:text-lg';

  // Day vs Night cab themes
  const isDay = cabMode === 'day';

  return (
    <div className={cn(
      "flex-1 flex flex-col h-full overflow-y-auto p-3 sm:p-5 transition-colors duration-200",
      isDay ? "bg-slate-100 text-slate-950" : "bg-[#09090B] text-zinc-100"
    )}>
      {/* Optional Back to Catalog Navigation */}
      {onBackToCatalog && (
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              stopAudio();
              onBackToCatalog();
            }}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer shadow-sm active:scale-95",
              isDay 
                ? "bg-white hover:bg-slate-200 text-slate-900 border-slate-300" 
                : "bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-700"
            )}
          >
            <ArrowLeft className="w-4 h-4 text-amber-500" />
            <span>← फॉल्ट कैटलॉग सूची पर वापस जाएं (Back to Catalog)</span>
          </button>
        </div>
      )}

      {/* 📢 TOP BANNER: LOUD VOICE INSTRUCTOR FOR LOCO PILOT */}
      <div className={cn(
        "rounded-2xl p-4 sm:p-5 border-2 shadow-xl mb-4 relative overflow-hidden transition-all",
        isDay 
          ? "bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 border-amber-500 shadow-amber-200/50" 
          : "bg-gradient-to-r from-amber-950/90 via-[#14120B] to-orange-950/90 border-amber-500/80 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
      )}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border-2",
              isDay 
                ? "bg-amber-500 text-slate-950 border-amber-600 shadow-amber-300" 
                : "bg-amber-500 text-black border-amber-300 shadow-amber-500/30"
            )}>
              <Volume2 className={cn("w-7 h-7", isPlaying && "animate-bounce")} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={cn(
                  "text-xs uppercase font-black px-2.5 py-0.5 rounded-full border tracking-wide",
                  isDay 
                    ? "bg-amber-200 text-amber-950 border-amber-400" 
                    : "bg-amber-500/20 text-amber-300 border-amber-500/50"
                )}>
                  📢 LP LOUD VOICE INSTRUCTOR
                </span>
                <span className={cn(
                  "text-[11px] font-extrabold px-2 py-0.5 rounded border",
                  isDay 
                    ? "bg-emerald-100 text-emerald-900 border-emerald-300" 
                    : "bg-emerald-950 text-emerald-300 border-emerald-800"
                )}>
                  🔊 100% लाउड वॉयस (Loud Audio)
                </span>
              </div>
              <h2 className={cn("font-black tracking-tight mt-1", headingClass)}>
                लोको पायलट वॉयस गाइड (Step-by-Step Voice Guide)
              </h2>
              <p className={cn("text-xs font-semibold", isDay ? "text-slate-700" : "text-zinc-300")}>
                कैब में खड़े रहकर या चलते हुए जोर से सुनकर एक-एक कदम का पालन करें
              </p>
            </div>
          </div>

          {/* 🇮🇳 HINDI / 🇬🇧 ENGLISH LANGUAGE TOGGLE */}
          <div className={cn(
            "flex items-center gap-1.5 p-1.5 rounded-xl border-2 self-stretch sm:self-auto justify-center shadow-md",
            isDay ? "bg-white border-amber-400" : "bg-[#18181B] border-amber-500/60"
          )}>
            <span className={cn("text-xs font-bold px-2 flex items-center gap-1", isDay ? "text-slate-800" : "text-zinc-300")}>
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              <span>भाषा चुनें:</span>
            </span>

            <button
              type="button"
              onClick={() => handleLanguageSwitch('hi')}
              className={cn(
                "px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95",
                voiceLang === 'hi'
                  ? (isDay ? "bg-amber-600 text-white font-black" : "bg-amber-500 text-black shadow-amber-500/30 font-black scale-105")
                  : (isDay ? "text-slate-700 hover:bg-slate-100" : "text-zinc-400 hover:text-white hover:bg-zinc-800")
              )}
            >
              <span>🇮🇳 हिंदी (Hindi)</span>
              {voiceLang === 'hi' && <CheckCircle2 className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={() => handleLanguageSwitch('en')}
              className={cn(
                "px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95",
                voiceLang === 'en'
                  ? (isDay ? "bg-blue-600 text-white font-black" : "bg-blue-500 text-black shadow-blue-500/30 font-black scale-105")
                  : (isDay ? "text-slate-700 hover:bg-slate-100" : "text-zinc-400 hover:text-white hover:bg-zinc-800")
              )}
            >
              <span>🇬🇧 English</span>
              {voiceLang === 'en' && <CheckCircle2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* SPEED CONTROLS: 0.8x, 0.95x, 1.2x */}
        <div className="mt-4 pt-3 border-t border-amber-500/30 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className={cn("font-extrabold", isDay ? "text-slate-800" : "text-zinc-200")}>बोलने की गति (Speed):</span>
            <div className="flex gap-1">
              {[
                { val: 0.8, label: "0.8x धीमा (शोरगुल कैब)" },
                { val: 0.95, label: "1.0x सामान्य" },
                { val: 1.2, label: "1.2x तेज" }
              ].map(s => (
                <button
                  key={s.val}
                  type="button"
                  onClick={() => {
                    setSpeechRate(s.val);
                    if (isPlaying) {
                      speakStep(currentStepIndex >= 0 ? currentStepIndex : 0);
                    }
                  }}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-[11px] font-bold border transition-all cursor-pointer active:scale-95",
                    speechRate === s.val
                      ? (isDay ? "bg-slate-950 text-white border-slate-950 font-black" : "bg-white text-black border-white shadow font-black")
                      : (isDay ? "bg-white text-slate-800 border-slate-300" : "bg-zinc-900 text-zinc-400 border-zinc-700")
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-black text-[11px] border shadow-sm",
              isPlaying
                ? (isDay ? "bg-emerald-100 text-emerald-950 border-emerald-400 animate-pulse" : "bg-emerald-950 text-emerald-300 border-emerald-500 animate-pulse")
                : (isDay ? "bg-slate-200 text-slate-800 border-slate-300" : "bg-zinc-800 text-zinc-300 border-zinc-700")
            )}>
              <Radio className={cn("w-3.5 h-3.5", isPlaying && "text-emerald-500 animate-spin")} />
              <span>{isPlaying ? `चरण संख्या ${currentStepIndex + 1} / ${parsedSteps.length} बोल रहा है` : isPaused ? "ऑडियो रोका गया है" : "तैयार (Ready)"}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 🎯 MAIN FAULT INFO CARD (HIGH CONTRAST) */}
      <div className={cn(
        "rounded-2xl p-4 sm:p-5 border-2 shadow-lg mb-4 transition-all",
        isDay 
          ? "bg-white border-slate-300 shadow-slate-200" 
          : "bg-[#121215] border-zinc-800 shadow-black/50"
      )}>
        <div className="flex items-start justify-between flex-wrap gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <span className="bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-lg shadow-sm">
              {activeItem.id}
            </span>
            <span className={cn(
              "text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border",
              isDay ? "bg-slate-100 text-slate-800 border-slate-300" : "bg-zinc-900 text-zinc-300 border-zinc-700"
            )}>
              {activeItem.subSystem}
            </span>
            {locoType === 'amrit_bharat' && (
              <span className="bg-emerald-600 text-white font-extrabold text-[11px] px-2 py-0.5 rounded shadow-sm">
                पुश-पुल अमृत भारत (WAP-5)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenAi}
              className={cn(
                "text-xs font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all shadow-sm cursor-pointer",
                isDay 
                  ? "bg-orange-100 text-orange-950 border-orange-300 hover:bg-orange-200" 
                  : "bg-orange-950/60 text-orange-300 border-orange-700 hover:bg-orange-900"
              )}
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>AI सहायक में खोजें</span>
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className={cn("font-black tracking-tight mt-3 mb-2 leading-snug", headingClass, isDay ? "text-slate-950" : "text-white")}>
          {activeItem.title}
        </h3>

        {/* Effect / Symptoms Banner */}
        {activeItem.effect && (
          <div className={cn(
            "p-3 rounded-xl border mt-2 text-xs sm:text-sm font-bold leading-relaxed",
            isDay ? "bg-amber-50 text-amber-950 border-amber-300" : "bg-amber-950/40 text-amber-200 border-amber-900/60"
          )}>
            <span className="font-black uppercase tracking-wider block text-[10px] text-amber-600 dark:text-amber-400 mb-0.5">
              ⚠️ प्रभाव एवं लक्षण (Effect & Symptom):
            </span>
            <p>{activeItem.effect}</p>
          </div>
        )}

        {/* Master vs Slave Loco Effects if available */}
        {(activeItem.masterEffect || activeItem.slaveEffect) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
            {activeItem.masterEffect && (
              <div className={cn(
                "p-3 rounded-xl border text-xs sm:text-sm font-semibold",
                isDay ? "bg-blue-50 text-blue-950 border-blue-300" : "bg-blue-950/50 text-blue-200 border-blue-800"
              )}>
                <span className="font-bold text-[10px] uppercase tracking-wider block text-blue-600 dark:text-blue-400 mb-0.5">
                  🚆 मास्टर लोको प्रभाव (Master Loco Effect):
                </span>
                <p>{activeItem.masterEffect}</p>
              </div>
            )}
            {activeItem.slaveEffect && (
              <div className={cn(
                "p-3 rounded-xl border text-xs sm:text-sm font-semibold",
                isDay ? "bg-emerald-50 text-emerald-950 border-emerald-300" : "bg-emerald-950/50 text-emerald-200 border-emerald-800"
              )}>
                <span className="font-bold text-[10px] uppercase tracking-wider block text-emerald-600 dark:text-emerald-400 mb-0.5">
                  🚅 स्लेव लोको प्रभाव (Slave Loco Effect):
                </span>
                <p>{activeItem.slaveEffect}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 🎛️ EXTRA-LARGE AUDIO CONTROL BAR (DESIGNED FOR CAB USE) */}
      <div className={cn(
        "sticky top-0 z-30 p-3 sm:p-4 rounded-2xl border-2 shadow-2xl mb-4 backdrop-blur-md transition-all flex flex-wrap items-center justify-between gap-3",
        isDay 
          ? "bg-slate-900 text-white border-slate-950 shadow-slate-400/40" 
          : "bg-[#16161A] text-white border-amber-500/80 shadow-[0_0_25px_rgba(245,158,11,0.25)]"
      )}>
        <div className="flex items-center gap-2">
          {/* PLAY / PAUSE BUTTON */}
          {!isPlaying ? (
            <button
              type="button"
              onClick={handlePlay}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-emerald-500/30 transition-all active:scale-95 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>{isPaused ? "फिर से सुनें (Resume)" : "▶️ जोर से बोलें (Speak Loudly)"}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePause}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-amber-500/30 transition-all active:scale-95 cursor-pointer animate-pulse"
            >
              <Pause className="w-5 h-5 fill-current" />
              <span>⏸️ रोकें (Pause)</span>
            </button>
          )}

          {/* STOP BUTTON */}
          <button
            type="button"
            onClick={stopAudio}
            disabled={!isPlaying && !isPaused && currentStepIndex === -1}
            className="p-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer shadow-md"
            title="ऑडियो पूरी तरह बंद करें"
          >
            <Square className="w-5 h-5 fill-current" />
          </button>
        </div>

        {/* STEP NAVIGATION BUTTONS */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevStep}
            className="px-3.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-xs flex items-center gap-1.5 border border-zinc-700 transition-all active:scale-95 cursor-pointer"
            title="पिछला चरण"
          >
            <SkipBack className="w-4 h-4" />
            <span className="hidden sm:inline">पिछला</span>
          </button>

          <button
            type="button"
            onClick={handleRepeat}
            className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
            title="यह चरण दोबारा सुनें"
          >
            <RotateCcw className="w-4 h-4" />
            <span>दोहराएं</span>
          </button>

          <button
            type="button"
            onClick={handleNextStep}
            className="px-3.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-xs flex items-center gap-1.5 border border-zinc-700 transition-all active:scale-95 cursor-pointer"
            title="अगला चरण"
          >
            <span className="hidden sm:inline">अगला</span>
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 📋 STEP-BY-STEP TROUBLESHOOTING ACTIONS LIST WITH ACTIVE HIGHLIGHT */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between pb-1">
          <h4 className={cn("font-black tracking-wide flex items-center gap-2", headingClass)}>
            <span>चरणबद्ध दोष निवारण निर्देश (Step-by-Step Actions):</span>
            <span className="text-xs font-semibold opacity-80">
              ({parsedSteps.length} चरण)
            </span>
          </h4>

          <span className="text-xs font-black text-amber-500">
            {voiceLang === 'hi' ? '🇮🇳 हिंदी ऑडियो सक्रिय' : '🇬🇧 English Audio Active'}
          </span>
        </div>

        {parsedSteps.map((step, idx) => {
          const isCurrent = currentStepIndex === idx && (isPlaying || isPaused);

          return (
            <div
              key={step.id}
              ref={isCurrent ? activeStepCardRef : null}
              className={cn(
                "rounded-2xl p-4 sm:p-5 border-2 transition-all duration-200 relative overflow-hidden",
                isCurrent
                  ? (isDay 
                      ? "bg-amber-100/90 border-amber-600 shadow-xl shadow-amber-300/40 ring-4 ring-amber-400/40 scale-[1.01]" 
                      : "bg-[#1E180B] border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.35)] ring-4 ring-amber-500/30 scale-[1.01]")
                  : (isDay
                      ? "bg-white border-slate-300 hover:border-slate-400 shadow-sm"
                      : "bg-[#131316] border-zinc-800 hover:border-zinc-700")
              )}
            >
              {/* Spoken Pulse Indicator Badge */}
              {isCurrent && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-amber-500 text-black px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow">
                  <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                  <span>{isPlaying ? "अभी बोल रहा है..." : "रोका गया"}</span>
                </div>
              )}

              <div className="flex items-start gap-3.5">
                {/* Step Number Badge */}
                <div className={cn(
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-black text-sm sm:text-base shrink-0 shadow-md border-2",
                  isCurrent
                    ? "bg-amber-500 text-black border-amber-300 shadow-amber-500/40 animate-pulse"
                    : (isDay
                        ? "bg-slate-200 text-slate-900 border-slate-300"
                        : "bg-zinc-800 text-zinc-200 border-zinc-700")
                )}>
                  {(idx + 1).toString().padStart(2, '0')}
                </div>

                <div className="flex-1 pr-6">
                  {/* Step Tag if Master or Slave */}
                  {step.prefixTag && (
                    <span className="inline-block bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider mb-1.5 shadow-sm">
                      {step.prefixTag}
                    </span>
                  )}

                  {/* Primary Language Display */}
                  <div className="mb-2">
                    <span className={cn(
                      "text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded border inline-block mb-1",
                      voiceLang === 'hi'
                        ? (isDay ? "bg-amber-200 text-amber-950 border-amber-400" : "bg-amber-950 text-amber-300 border-amber-800")
                        : (isDay ? "bg-blue-200 text-blue-950 border-blue-400" : "bg-blue-950 text-blue-300 border-blue-800")
                    )}>
                      {voiceLang === 'hi' ? '🇮🇳 हिंदी निर्देश (Spoken):' : '🇬🇧 English Instruction (Spoken):'}
                    </span>
                    <p className={cn(
                      "font-black leading-relaxed whitespace-pre-wrap",
                      textClass,
                      isCurrent 
                        ? (isDay ? "text-slate-950" : "text-amber-100") 
                        : (isDay ? "text-slate-950" : "text-white")
                    )}>
                      {voiceLang === 'hi' ? step.hi : step.en}
                    </p>
                  </div>

                  {/* Secondary Language Display */}
                  <div className={cn(
                    "pt-2 mt-2 border-t text-xs sm:text-sm font-medium",
                    isDay ? "border-slate-200 text-slate-700" : "border-zinc-800 text-zinc-300"
                  )}>
                    <span className="text-[10px] uppercase font-bold tracking-wider block opacity-80 mb-0.5">
                      {voiceLang === 'hi' ? 'English Reference:' : 'हिंदी संदर्भ:'}
                    </span>
                    <p className="leading-normal italic">
                      {voiceLang === 'hi' ? step.en : step.hi}
                    </p>
                  </div>

                  {/* Individual Step Play Button */}
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => speakStep(idx)}
                      className={cn(
                        "text-xs font-black px-3.5 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer",
                        isCurrent && isPlaying
                          ? "bg-amber-500 text-black border-amber-400 font-black"
                          : (isDay
                              ? "bg-slate-200 hover:bg-slate-300 text-slate-950 border-slate-300"
                              : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700")
                      )}
                    >
                      <Volume2 className="w-3.5 h-3.5 text-amber-500" />
                      <span>{isCurrent && isPlaying ? "🔊 दोहराएं (Repeat This Step)" : `🔊 केवल चरण ${idx + 1} सुनें`}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔍 QUICK PROBLEM SWITCHER DIRECTLY INSIDE VOICE TAB */}
      <div className={cn(
        "rounded-2xl p-4 sm:p-5 border-2 shadow-lg transition-all",
        isDay ? "bg-white border-slate-300" : "bg-[#121215] border-zinc-800"
      )}>
        <h4 className={cn("font-black tracking-wide mb-2 flex items-center gap-2", headingClass)}>
          <Search className="w-4 h-4 text-amber-500" />
          <span>अन्य खराबी को वॉयस में चुनें (Select Defect for Voice Guide):</span>
        </h4>

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="खराबी या फॉल्ट कोड खोजें (उदा. P56 BP, Brakes, P55 Panto, F1901P1, Selfhold)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm font-semibold outline-none transition-all",
              isDay 
                ? "bg-slate-100 border-slate-300 text-slate-900 focus:bg-white focus:border-amber-500" 
                : "bg-zinc-900 border-zinc-700 text-white focus:bg-zinc-800 focus:border-amber-500"
            )}
          />
        </div>

        {/* Quick Search Results if typed */}
        {filteredQuickFaults.length > 0 && (
          <div className="space-y-1.5 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <span className="text-[11px] font-bold text-amber-500 uppercase">सर्च परिणाम (Tap to load in Voice Guide):</span>
            {filteredQuickFaults.map(f => (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  stopAudio();
                  onSelectFault(f);
                  setSearchQuery('');
                }}
                className={cn(
                  "w-full text-left p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold transition-all cursor-pointer",
                  isDay 
                    ? "bg-slate-100 hover:bg-amber-100 text-slate-900 border-slate-300" 
                    : "bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-800 hover:border-amber-500/50"
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="bg-red-600 text-white px-2 py-0.5 rounded font-black text-[10px]">{f.id}</span>
                  <span className="truncate">{f.message.split('\n')[0]}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-500 shrink-0" />
              </button>
            ))}
          </div>
        )}

        {/* Common critical railway issues quick chips */}
        <div className="flex flex-wrap gap-2">
          {(locoType === 'amrit_bharat'
            ? [
                { label: "⚡ CE ON न होना (P54)", id: "P54_CE" },
                { label: "⚡ पैंटो नहीं उठ रहा (P55)", id: "P55_PANTO" },
                { label: "⚡ BP प्रेशर नहीं बन रहा (P56)", id: "P56_BP_MASTER" },
                { label: "⚡ थ्रोटल रिस्पॉन्ड नहीं (P57)", id: "P57_THROTTLE" },
                { label: "⚡ ब्रेक रिलीज नहीं (P53)", id: "P53_BRAKE" },
                { label: "⚡ होटल लोड HLC-2/1 (P58)", id: "P58_HOTEL_LOAD_SLAVE" },
                { label: "⚡ सेल्फहोल्ड 10 मिनट MCE OFF", id: "GEN_SELFHOLD_10MIN" },
                { label: "⚡ स्लेव लोको डेड करना (P10)", id: "P10_MAKING_SLAVE_DEAD" },
                { label: "⚡ DDU नोड 504 से 596 (P08)", id: "P08_DDU_NODE_PROGRESSION" },
                { label: "⚡ F1901P1 संचार बाधा", id: "F1901P1" },
                { label: "⚡ F1501P1 मशीन रूम आग", id: "F1501P1" }
              ]
            : [
                { label: "⚡ F0101P1 VCB Stuck ON", id: "F0101P1" },
                { label: "⚡ F0101P2 कूलिंग मोड / LSCE", id: "F0101P2" },
                { label: "⚡ F0102P1 VCB Stuck OFF", id: "F0102P1" },
                { label: "⚡ F0103P1 लो पैंटो प्रेशर", id: "F0103P1" },
                { label: "⚡ F1101P2 MCP कंप्रेसर दोष", id: "F1101P2" },
                { label: "⚡ F1001P1 ब्रेक इलेक्ट्रॉनिक्स", id: "F1001P1" }
              ]
          ).map((item, idx) => {
            const found = allFaults.find(f => f.id === item.id);
            if (!found) return null;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  stopAudio();
                  onSelectFault(found);
                }}
                className={cn(
                  "text-xs px-3 py-1.5 rounded-lg border font-black transition-all shadow-sm active:scale-95 cursor-pointer flex items-center gap-1.5",
                  activeItem.id === found.id
                    ? (isDay ? "bg-amber-600 text-white border-amber-600 font-black" : "bg-amber-500 text-black border-amber-400 font-black")
                    : (isDay 
                        ? "bg-slate-200 hover:bg-slate-300 text-slate-900 border-slate-300" 
                        : "bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-700")
                )}
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-500" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
