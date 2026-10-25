import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Volume2, Play, Pause, Square, SkipForward, SkipBack, RotateCcw, Gauge, Languages, CheckCircle2 } from 'lucide-react';

interface VoiceTroubleshooterPlayerProps {
  steps: string[];
  faultTitle?: string;
  isDay: boolean;
  fontSize?: 'normal' | 'large' | 'extra-large';
  onActiveStepChange?: (index: number | null) => void;
  className?: string;
}

/**
 * Detects if a text string contains Devanagari (Hindi) characters.
 */
function containsDevanagari(text: string): boolean {
  return /[\u0900-\u097F]/.test(text);
}

/**
 * Checks whether a line is an actual actionable troubleshooting step,
 * strictly filtering out headers, conditions, symptoms, and effects.
 */
function isActionableStep(text: string): boolean {
  if (!text || typeof text !== 'string') return false;
  const s = text.trim();
  if (s.length === 0) return false;

  // 1. Decorative borders or section markers
  if (/^[═\s【\-\*•#_]+|[═\s】\-\*•#_]+$/.test(s)) return false;

  // 2. Condition headers ending with colon, e.g.:
  // "यदि मास्टर लोको पर ब्रेक रिलीज नहीं हो रहे हैं (IF BRAKES NOT RELEASING ON MASTER LOCO):"
  // "If fault is on Master Loco (यदि खराबी मास्टर लोको में है):"
  // "If fault is on Slave Loco (यदि खराबी स्लेव लोको में है):"
  // "यदि खराबी स्लेव लोको में है:"
  if (/^(यदि\s+.*:\s*$|If\s+.*:\s*$)/i.test(s)) return false;
  if (/^.*(\(IF BRAKES|\(यदि खराबी|\(IF FAULT).*:\s*$/i.test(s)) return false;
  if (/^(यदि|if)\s+(मास्टर|स्लेव|fault|brakes|loco).*(लोको|loco|है|releasing).*:\s*$/i.test(s)) return false;

  // 3. Effects / Observations (e.g., "Effect on Master Loco...", "मास्टर लोको पर प्रभाव...", "BC gauge will show...")
  if (/^(•\s*)?(Effect\s+on\s+(Master|Slave)\s+Loco|मास्टर\s+लोको\s+पर\s+प्रभाव|स्लेव\s+लोको\s+पर\s+प्रभाव)/i.test(s)) return false;
  if (/^(•\s*)?(Effect\s+on\s+Loco|लोको\s+पर\s+प्रभाव)/i.test(s)) return false;
  if (/^(•\s*)?(Effect:|प्रभाव:)/i.test(s)) return false;
  if (/^(•\s*)?(Master|Slave)\s+Loco\s*:\s*(BC|MR|Panto|VCB|No|If|LSFI)/i.test(s)) return false;
  if (/^(•\s*)?(मास्टर|स्लेव)\s+लोको\s*:\s*(BC|MR|पैंटो|VCB|यदि|LSFI|गेज)/i.test(s)) return false;
  if (/^(•\s*)?(BC gauge|MR gauge|BC गेज|MR गेज)\s*(will show|प्रेशर|दर्शाएगा)/i.test(s)) return false;

  // 4. Section headings, e.g.:
  // "Troubleshooting Steps (दोष निवारण प्रक्रिया):"
  // "Troubleshooting Actions (दोष निवारण कार्यवाही):"
  // "लक्षण (Symptoms):"
  if (/^(Troubleshooting\s+(Steps|Actions|Procedure)|दोष\s+निवारण\s+(प्रक्रिया|कार्यवाही|चरण)|Symptoms|लक्षण|Note|नोट).*:\s*$/i.test(s)) return false;
  if (/^(Troubleshooting\s+(Steps|Actions|Procedure)|दोष\s+निवारण\s+(प्रक्रिया|कार्यवाही|चरण))\s*(\([^\)]*\))?\s*$/i.test(s)) return false;

  return true;
}

/**
 * Extracts ONLY the Hindi text from a bilingual or Hindi step.
 * If English is outside and Hindi is inside brackets: extracts the bracketed Hindi.
 * If Hindi is outside and English is inside brackets: extracts the outside Hindi.
 */
function extractHindiOnly(text: string): string {
  if (!text) return '';

  // Extract all bracketed portions: (...) or [...]
  const bracketMatches = Array.from(text.matchAll(/[\(\[]([^\)\]]+)[\)\]]/g));
  let hindiFromBrackets = '';
  for (const match of bracketMatches) {
    if (containsDevanagari(match[1])) {
      hindiFromBrackets += (hindiFromBrackets ? ' ' : '') + match[1];
    }
  }

  // Text outside brackets
  const outsideText = text.replace(/[\(\[][^\)\]]+[\)\]]/g, '').trim();

  let targetHindi = '';
  if (containsDevanagari(outsideText)) {
    // Hindi is outside brackets
    targetHindi = outsideText;
  } else if (hindiFromBrackets) {
    // Hindi was inside brackets
    targetHindi = hindiFromBrackets;
  } else {
    // Fallback: If no Devanagari at all, use cleaned text
    targetHindi = outsideText || text;
  }

  // Strip leading numbering, bullets, roman numerals: e.g. "1.", "i.", "•", "-"
  let clean = targetHindi
    .replace(/^(\d+|[ivx]+|[a-z])[\.\)]\s*/i, '')
    .replace(/^[•\-\*⚡\s]+/, '')
    .trim();

  // Spoken number adjustments for clarity in Hindi
  clean = clean
    .replace(/\b0\b/g, 'शून्य')
    .replace(/‘0’|'0'|"0"/g, 'शून्य')
    .replace(/‘1’|'1'|"1"/g, 'एक')
    .replace(/‘II’|'II'|"II"/g, 'दो')
    .replace(/‘I’|'I'|"I"/g, 'एक');

  return clean.replace(/[\s\.]+$/, '').trim();
}

/**
 * Extracts ONLY the English text from a bilingual or English step.
 * If English is outside and Hindi is inside brackets: extracts the outside English.
 * If Hindi is outside and English is inside brackets: extracts the bracketed English.
 */
function extractEnglishOnly(text: string): string {
  if (!text) return '';

  // Extract all bracketed portions that are purely English (no Devanagari)
  const bracketMatches = Array.from(text.matchAll(/[\(\[]([^\)\]]+)[\)\]]/g));
  let englishFromBrackets = '';
  for (const match of bracketMatches) {
    if (!containsDevanagari(match[1]) && /[A-Za-z]/.test(match[1])) {
      englishFromBrackets += (englishFromBrackets ? ' ' : '') + match[1];
    }
  }

  // Text outside brackets
  const outsideText = text.replace(/[\(\[][^\)\]]+[\)\]]/g, '').trim();

  let targetEnglish = '';
  if (!containsDevanagari(outsideText) && /[A-Za-z]/.test(outsideText)) {
    // English is outside brackets
    targetEnglish = outsideText;
  } else if (englishFromBrackets) {
    // English was inside brackets
    targetEnglish = englishFromBrackets;
  } else {
    // Fallback: strip Devanagari characters
    targetEnglish = text.replace(/[\u0900-\u097F]+/g, '').trim();
  }

  // Strip leading numbering, bullets, roman numerals: e.g. "1.", "i.", "•", "-"
  let clean = targetEnglish
    .replace(/^(\d+|[ivx]+|[a-z])[\.\)]\s*/i, '')
    .replace(/^[•\-\*⚡\s]+/, '')
    .trim();

  return clean.replace(/[\s\.]+$/, '').trim();
}

export const VoiceTroubleshooterPlayer: React.FC<VoiceTroubleshooterPlayerProps> = ({
  steps,
  faultTitle,
  isDay,
  fontSize = 'normal',
  onActiveStepChange,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentActionIndex, setCurrentActionIndex] = useState<number | null>(null);
  const [playbackRate, setPlaybackRate] = useState<number>(0.95);
  const [selectedLanguage, setSelectedLanguage] = useState<'hi' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      try {
        return (localStorage.getItem('tts_lang') as 'hi' | 'en') || 'hi';
      } catch {}
    }
    return 'hi';
  });

  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const currentActionRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  isPlayingRef.current = isPlaying;

  const rateRef = useRef<number>(playbackRate);
  rateRef.current = playbackRate;

  const langRef = useRef<'hi' | 'en'>(selectedLanguage);
  langRef.current = selectedLanguage;

  // Filter only actionable troubleshooting steps (skipping headers, conditions, effects)
  const actionableSteps = useMemo(() => {
    const list: Array<{ originalIndex: number; text: string; hindi: string; english: string }> = [];

    steps.forEach((s, idx) => {
      const trimmed = typeof s === 'string' ? s.trim() : '';
      if (trimmed.length > 0 && isActionableStep(trimmed)) {
        list.push({
          originalIndex: idx,
          text: trimmed,
          hindi: extractHindiOnly(trimmed),
          english: extractEnglishOnly(trimmed)
        });
      }
    });

    // Fallback: If filtering removed all lines, include non-empty trimmed steps
    if (list.length === 0) {
      steps.forEach((s, idx) => {
        const trimmed = typeof s === 'string' ? s.trim() : '';
        if (trimmed.length > 0) {
          list.push({
            originalIndex: idx,
            text: trimmed,
            hindi: extractHindiOnly(trimmed),
            english: extractEnglishOnly(trimmed)
          });
        }
      });
    }

    return list;
  }, [steps]);

  const actionableStepsRef = useRef(actionableSteps);
  actionableStepsRef.current = actionableSteps;

  // Check speech synthesis support & load voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    const updateVoices = () => {
      try {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          setAvailableVoices(voices);
        }
      } catch {}
    };

    updateVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Save selected language to localStorage
  const handleLanguageChange = (newLang: 'hi' | 'en') => {
    setSelectedLanguage(newLang);
    langRef.current = newLang;
    try {
      localStorage.setItem('tts_lang', newLang);
    } catch {}

    // If currently speaking, replay current action step with the new language
    if (isPlaying && currentActionIndex !== null) {
      speakActionAt(currentActionIndex, newLang);
    }
  };

  // Stop playback completely
  const stopPlayback = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentActionIndex(null);
    currentActionRef.current = 0;
    if (onActiveStepChange) {
      onActiveStepChange(null);
    }
  }, [onActiveStepChange]);

  // Speak a specific action step by index
  const speakActionAt = useCallback((index: number, activeLang?: 'hi' | 'en') => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const currentSteps = actionableStepsRef.current;
    if (index < 0 || index >= currentSteps.length) {
      stopPlayback();
      return;
    }

    window.speechSynthesis.cancel();

    currentActionRef.current = index;
    setCurrentActionIndex(index);
    setIsPlaying(true);
    setIsPaused(false);

    const stepItem = currentSteps[index];
    const useLang = activeLang || langRef.current;

    // Highlight the original step in the parent list
    if (onActiveStepChange) {
      onActiveStepChange(stepItem.originalIndex);
    }

    // Extract pure chosen language text (no bilingual repetitions!)
    const cleanAction = useLang === 'hi' ? stepItem.hindi : stepItem.english;

    // Direct action for Step 1. "Next, [action]" for subsequent steps (no "Step 1", "Step 2" noise)
    const spokenText = index === 0 ? cleanAction : `Next, ${cleanAction}`;

    if (!spokenText.trim()) {
      const nextIdx = index + 1;
      if (nextIdx < currentSteps.length) {
        speakActionAt(nextIdx, useLang);
      } else {
        stopPlayback();
      }
      return;
    }

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.rate = rateRef.current;
    utterance.pitch = 1.0;

    // Select optimal voice for language
    if (availableVoices.length > 0) {
      if (useLang === 'hi') {
        const hindiVoice = availableVoices.find(v => 
          v.lang.toLowerCase().startsWith('hi') || 
          v.name.toLowerCase().includes('hindi')
        );
        if (hindiVoice) utterance.voice = hindiVoice;
        utterance.lang = 'hi-IN';
      } else {
        const engVoice = availableVoices.find(v => 
          v.lang.toLowerCase() === 'en-in' || 
          v.name.toLowerCase().includes('india') ||
          v.lang.toLowerCase().startsWith('en')
        );
        if (engVoice) utterance.voice = engVoice;
        utterance.lang = 'en-IN';
      }
    } else {
      utterance.lang = useLang === 'hi' ? 'hi-IN' : 'en-IN';
    }

    utterance.onend = () => {
      if (isPlayingRef.current) {
        const nextIdx = currentActionRef.current + 1;
        if (nextIdx < actionableStepsRef.current.length) {
          // Brief pause (250ms) between steps
          setTimeout(() => {
            if (isPlayingRef.current) {
              speakActionAt(nextIdx, useLang);
            }
          }, 250);
        } else {
          stopPlayback();
        }
      }
    };

    utterance.onerror = (e) => {
      if (e.error === 'canceled' || e.error === 'interrupted') return;
      const nextIdx = currentActionRef.current + 1;
      if (nextIdx < actionableStepsRef.current.length) {
        speakActionAt(nextIdx, useLang);
      } else {
        stopPlayback();
      }
    };

    window.speechSynthesis.speak(utterance);
  }, [availableVoices, stopPlayback, onActiveStepChange]);

  // Start speaking
  const startPlayback = () => {
    if (actionableSteps.length === 0) return;
    speakActionAt(0);
  };

  // Pause / Resume
  const togglePause = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  // Next step
  const nextStep = () => {
    const nextIdx = (currentActionIndex ?? -1) + 1;
    if (nextIdx < actionableSteps.length) {
      speakActionAt(nextIdx);
    } else {
      stopPlayback();
    }
  };

  // Previous step
  const prevStep = () => {
    const prevIdx = Math.max(0, (currentActionIndex ?? 1) - 1);
    speakActionAt(prevIdx);
  };

  // Speed cycle: 0.85x -> 0.95x -> 1.1x
  const cycleRate = () => {
    let nextRate = 0.95;
    if (playbackRate === 0.95) nextRate = 1.1;
    else if (playbackRate === 1.1) nextRate = 0.85;
    else nextRate = 0.95;

    setPlaybackRate(nextRate);
    rateRef.current = nextRate;

    if (isPlaying && currentActionIndex !== null) {
      speakActionAt(currentActionIndex);
    }
  };

  if (!isSupported || actionableSteps.length === 0) {
    return null;
  }

  const currentDisplayStepNum = currentActionIndex !== null ? currentActionIndex + 1 : 1;
  const totalDisplaySteps = actionableSteps.length;
  const currentStepData = currentActionIndex !== null ? actionableSteps[currentActionIndex] : null;

  return (
    <div className={`transition-all ${className}`}>
      {!isPlaying ? (
        // INACTIVE STATE: Tactile Pilot Voice Bar with Language Options
        <div className={`p-3 sm:p-3.5 rounded-2xl border-2 transition-all shadow-md ${
          isDay
            ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 border-emerald-400/80 text-white shadow-emerald-900/10"
            : "bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 border-emerald-500/60 text-white shadow-black/40"
        }`}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Play Button */}
            <button
              type="button"
              onClick={startPlayback}
              className="flex-1 flex items-center gap-3 text-left active:scale-[0.98] transition-transform cursor-pointer"
              title="सिर्फ निवारण कार्यवाही बोलकर सुनाएं (बिना हेडर/प्रभाव)"
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/30">
                <Volume2 className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-sm sm:text-base tracking-wide">
                    🔊 बोलकर सुनाएं (पायलट वॉइस)
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 shadow-sm">
                    {selectedLanguage === 'hi' ? '🇮🇳 केवल हिंदी' : '🇬🇧 ONLY ENGLISH'}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/30 text-emerald-200">
                    {totalDisplaySteps} निवारण कदम
                  </span>
                </div>
                <p className="text-xs text-emerald-100 font-medium truncate">
                  सिर्फ निवारण कार्यवाही (हेडर/प्रभाव नहीं पढ़ेगा • सिंगल भाषा)
                </p>
              </div>
            </button>

            {/* Language Selector Buttons */}
            <div className="flex items-center gap-1.5 bg-black/25 p-1 rounded-xl self-end sm:self-center border border-white/20">
              <span className="text-[10px] font-bold text-emerald-200 px-1 hidden xs:inline flex items-center gap-1">
                <Languages className="w-3 h-3" />
                भाषा:
              </span>
              <button
                type="button"
                onClick={() => handleLanguageChange('hi')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                  selectedLanguage === 'hi'
                    ? "bg-amber-400 text-amber-950 shadow-sm"
                    : "text-emerald-100 hover:text-white hover:bg-white/10"
                }`}
                title="सिर्फ हिंदी वाला हिस्सा बोलें"
              >
                <span>🇮🇳 केवल हिंदी</span>
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                  selectedLanguage === 'en'
                    ? "bg-amber-400 text-amber-950 shadow-sm"
                    : "text-emerald-100 hover:text-white hover:bg-white/10"
                }`}
                title="Speak English action portion only"
              >
                <span>🇬🇧 English Only</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        // ACTIVE STATE: Fast-action Player Controls
        <div className={`p-4 rounded-2xl border-2 shadow-xl animate-in fade-in duration-200 ${
          isDay
            ? "bg-slate-900 border-emerald-500 text-white"
            : "bg-[#0B132B] border-emerald-500/80 text-white shadow-emerald-950/40"
        }`}>
          {/* Header Row: Status, Step Counter & Language Toggle */}
          <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-700/80 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="font-black text-sm tracking-wide text-emerald-400 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                {isPaused ? "रोका गया (Paused)" : "निवारण कार्यवाही (Action)"}
              </span>
              <span className="text-xs font-black px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                कदम {currentDisplayStepNum} / {totalDisplaySteps}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Language Switcher during playback */}
              <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
                <button
                  type="button"
                  onClick={() => handleLanguageChange('hi')}
                  className={`px-2.5 py-1 rounded text-xs font-black transition-all ${
                    selectedLanguage === 'hi' ? "bg-amber-400 text-black shadow-sm" : "text-slate-300 hover:text-white"
                  }`}
                  title="सिर्फ हिंदी बोलें"
                >
                  🇮🇳 हिंदी
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('en')}
                  className={`px-2.5 py-1 rounded text-xs font-black transition-all ${
                    selectedLanguage === 'en' ? "bg-amber-400 text-black shadow-sm" : "text-slate-300 hover:text-white"
                  }`}
                  title="English only"
                >
                  🇬🇧 English
                </button>
              </div>

              {/* Speed Selector */}
              <button
                type="button"
                onClick={cycleRate}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-bold text-amber-300 transition-colors shadow-sm"
                title="गति बदलें (Playback Speed)"
              >
                <Gauge className="w-3.5 h-3.5 text-amber-400" />
                <span>{playbackRate}x</span>
              </button>
            </div>
          </div>

          {/* Current Step Spoken Preview (Showing clean single language) */}
          <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 mb-3.5">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold mb-1">
              <span className="flex items-center gap-1 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>बोली जा रही कार्यवाही:</span>
              </span>
              <span className="text-amber-400 font-black text-[11px] uppercase bg-black/40 px-2 py-0.5 rounded">
                {selectedLanguage === 'hi' ? 'केवल हिंदी (No English Repetition)' : 'English Only (No Hindi Repetition)'}
              </span>
            </div>
            <p className={`font-bold leading-relaxed text-slate-100 ${
              fontSize === 'extra-large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
            }`}>
              {currentStepData 
                ? (selectedLanguage === 'hi' ? currentStepData.hindi : currentStepData.english)
                : ''}
            </p>
          </div>

          {/* Player Navigation & Stop Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentActionIndex === 0}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-40 disabled:pointer-events-none text-slate-200 border border-slate-700 flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer"
                title="पिछला कदम (Previous)"
              >
                <SkipBack className="w-4 h-4" />
                <span className="hidden sm:inline">पिछला</span>
              </button>

              <button
                type="button"
                onClick={() => currentActionIndex !== null && speakActionAt(currentActionIndex)}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-amber-300 border border-slate-700 flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer"
                title="दोहराएं (Repeat)"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">दोहराएं</span>
              </button>

              <button
                type="button"
                onClick={nextStep}
                disabled={currentActionIndex !== null && currentActionIndex >= actionableSteps.length - 1}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-40 disabled:pointer-events-none text-slate-200 border border-slate-700 flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer"
                title="अगला कदम (Next)"
              >
                <SkipForward className="w-4 h-4" />
                <span>Next</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePause}
                className={`px-3.5 py-2 rounded-xl active:scale-95 flex items-center gap-2 text-xs sm:text-sm font-black transition-all shadow-md cursor-pointer ${
                  isPaused 
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white" 
                    : "bg-amber-600 hover:bg-amber-500 text-white"
                }`}
              >
                {isPaused ? (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>जारी रखें</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>रोकें</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={stopPlayback}
                className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 active:scale-95 text-white flex items-center gap-2 text-xs sm:text-sm font-black transition-all shadow-md cursor-pointer"
                title="आवाज बंद करें (Stop Voice)"
              >
                <Square className="w-4 h-4 fill-current" />
                <span>Stop</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
