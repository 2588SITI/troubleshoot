import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Volume2, Play, Pause, Square, SkipForward, SkipBack, RotateCcw, Gauge, Languages, CheckCircle2 } from 'lucide-react';
import { isActionableStep, getSpokenHindi, getSpokenEnglish, containsDevanagari } from '../lib/railwayBilingualSpeech';

export type SpeechLanguageMode = 'hi' | 'en' | 'both';

interface VoiceTroubleshooterPlayerProps {
  steps: string[];
  faultTitle?: string;
  isDay: boolean;
  fontSize?: 'normal' | 'large' | 'extra-large';
  onActiveStepChange?: (index: number | null) => void;
  className?: string;
  selectedLanguage?: SpeechLanguageMode;
  onLanguageChange?: (lang: SpeechLanguageMode) => void;
}

export const VoiceTroubleshooterPlayer: React.FC<VoiceTroubleshooterPlayerProps> = ({
  steps,
  faultTitle,
  isDay,
  fontSize = 'normal',
  onActiveStepChange,
  className = '',
  selectedLanguage: controlledLang,
  onLanguageChange
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentActionIndex, setCurrentActionIndex] = useState<number | null>(null);
  const [currentlySpeakingSubPart, setCurrentlySpeakingSubPart] = useState<'hi' | 'en' | null>(null);
  const [playbackRate, setPlaybackRate] = useState<number>(0.95);
  const [internalLanguage, setInternalLanguage] = useState<SpeechLanguageMode>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('tts_lang');
        if (saved === 'hi' || saved === 'en' || saved === 'both') {
          return saved as SpeechLanguageMode;
        }
      } catch {}
    }
    return 'hi';
  });

  const selectedLanguage = controlledLang || internalLanguage;

  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const currentActionRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  isPlayingRef.current = isPlaying;

  const rateRef = useRef<number>(playbackRate);
  rateRef.current = playbackRate;

  const langRef = useRef<SpeechLanguageMode>(selectedLanguage);
  langRef.current = selectedLanguage;

  // Process all steps into high-quality bilingual speakable items
  const actionableSteps = useMemo(() => {
    const list: Array<{ originalIndex: number; text: string; hindi: string; english: string }> = [];

    steps.forEach((s, idx) => {
      const trimmed = typeof s === 'string' ? s.trim() : '';
      if (trimmed.length > 0 && isActionableStep(trimmed)) {
        const hindiText = getSpokenHindi(trimmed);
        const englishText = getSpokenEnglish(trimmed);

        // Fallback safety: ensure neither field is ever empty
        list.push({
          originalIndex: idx,
          text: trimmed,
          hindi: hindiText || trimmed,
          english: englishText || trimmed
        });
      }
    });

    // Fallback if all got filtered out: keep non-empty steps
    if (list.length === 0) {
      steps.forEach((s, idx) => {
        const trimmed = typeof s === 'string' ? s.trim() : '';
        if (trimmed.length > 0) {
          list.push({
            originalIndex: idx,
            text: trimmed,
            hindi: getSpokenHindi(trimmed) || trimmed,
            english: getSpokenEnglish(trimmed) || trimmed
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
  const handleLanguageChange = (newLang: SpeechLanguageMode) => {
    setInternalLanguage(newLang);
    langRef.current = newLang;
    try {
      localStorage.setItem('tts_lang', newLang);
    } catch {}
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }

    // If currently speaking, immediately switch language for the active step
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
    setCurrentlySpeakingSubPart(null);
    currentActionRef.current = 0;
    if (onActiveStepChange) {
      onActiveStepChange(null);
    }
  }, [onActiveStepChange]);

  // Speak a specific action step by index
  const speakActionAt = useCallback((index: number, activeLang?: SpeechLanguageMode) => {
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

    // Helper to find optimal voice
    const getVoiceFor = (langCode: 'hi' | 'en', text: string) => {
      if (availableVoices.length === 0) return null;
      if (langCode === 'hi' || containsDevanagari(text)) {
        return availableVoices.find(v => 
          v.lang.toLowerCase().startsWith('hi') || 
          v.name.toLowerCase().includes('hindi')
        ) || null;
      } else {
        return availableVoices.find(v => 
          v.lang.toLowerCase() === 'en-in' || 
          v.name.toLowerCase().includes('india') ||
          v.lang.toLowerCase().startsWith('en')
        ) || null;
      }
    };

    // Handler to advance to next step
    const advanceNext = () => {
      if (!isPlayingRef.current) return;
      const nextIdx = currentActionRef.current + 1;
      if (nextIdx < actionableStepsRef.current.length) {
        setTimeout(() => {
          if (isPlayingRef.current) {
            speakActionAt(nextIdx, useLang);
          }
        }, 300);
      } else {
        stopPlayback();
      }
    };

    if (useLang === 'both') {
      // DUAL MODE: First speak Hindi, then speak English
      setCurrentlySpeakingSubPart('hi');
      const hiText = stepItem.hindi;
      const hiUtterance = new SpeechSynthesisUtterance(hiText);
      hiUtterance.rate = rateRef.current;
      hiUtterance.pitch = 1.0;
      hiUtterance.lang = 'hi-IN';
      const hiVoice = getVoiceFor('hi', hiText);
      if (hiVoice) hiUtterance.voice = hiVoice;

      hiUtterance.onend = () => {
        if (!isPlayingRef.current) return;
        // Pause briefly before speaking English
        setTimeout(() => {
          if (!isPlayingRef.current) return;
          setCurrentlySpeakingSubPart('en');
          const enText = stepItem.english;
          const enUtterance = new SpeechSynthesisUtterance(enText);
          enUtterance.rate = rateRef.current;
          enUtterance.pitch = 1.0;
          enUtterance.lang = containsDevanagari(enText) ? 'hi-IN' : 'en-IN';
          const enVoice = getVoiceFor('en', enText);
          if (enVoice) enUtterance.voice = enVoice;

          enUtterance.onend = advanceNext;
          enUtterance.onerror = (e) => {
            if (e.error !== 'canceled' && e.error !== 'interrupted') advanceNext();
          };
          window.speechSynthesis.speak(enUtterance);
        }, 350);
      };

      hiUtterance.onerror = (e) => {
        if (e.error !== 'canceled' && e.error !== 'interrupted') advanceNext();
      };

      window.speechSynthesis.speak(hiUtterance);

    } else if (useLang === 'hi') {
      // HINDI ONLY MODE
      setCurrentlySpeakingSubPart('hi');
      const spokenText = stepItem.hindi;
      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.rate = rateRef.current;
      utterance.pitch = 1.0;
      utterance.lang = 'hi-IN';
      const voice = getVoiceFor('hi', spokenText);
      if (voice) utterance.voice = voice;

      utterance.onend = advanceNext;
      utterance.onerror = (e) => {
        if (e.error !== 'canceled' && e.error !== 'interrupted') advanceNext();
      };
      window.speechSynthesis.speak(utterance);

    } else {
      // ENGLISH ONLY MODE
      setCurrentlySpeakingSubPart('en');
      let spokenText = stepItem.english;
      // Prepend "Step X" or "Next," cleanly if not the first step
      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.rate = rateRef.current;
      utterance.pitch = 1.0;
      // If there are residual Devanagari characters, use hi-IN voice so it doesn't mute
      utterance.lang = containsDevanagari(spokenText) ? 'hi-IN' : 'en-IN';
      const voice = getVoiceFor('en', spokenText);
      if (voice) utterance.voice = voice;

      utterance.onend = advanceNext;
      utterance.onerror = (e) => {
        if (e.error !== 'canceled' && e.error !== 'interrupted') advanceNext();
      };
      window.speechSynthesis.speak(utterance);
    }
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
                    {selectedLanguage === 'hi' 
                      ? '🇮🇳 केवल हिंदी' 
                      : selectedLanguage === 'en' 
                        ? '🇬🇧 ONLY ENGLISH' 
                        : '🌐 दोनों (HINDI + ENGLISH)'}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/30 text-emerald-200">
                    {totalDisplaySteps} निवारण कदम
                  </span>
                </div>
                <p className="text-xs text-emerald-100 font-medium truncate">
                  {selectedLanguage === 'hi'
                    ? 'सभी कदम स्पष्ट हिंदी में बोलकर सुनाएगा'
                    : selectedLanguage === 'en'
                      ? 'All steps spoken clearly in professional railway English'
                      : 'हिंदी एवं इंग्लिश दोनों भाषाओं में क्रमशः बोलकर सुनाएगा'}
                </p>
              </div>
            </button>

            {/* Language Selector Buttons */}
            <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl self-end sm:self-center border border-white/20">
              <span className="text-[10px] font-bold text-emerald-200 px-1 hidden xs:inline flex items-center gap-1">
                <Languages className="w-3 h-3" />
                भाषा:
              </span>
              <button
                type="button"
                onClick={() => handleLanguageChange('hi')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                  selectedLanguage === 'hi'
                    ? "bg-amber-400 text-amber-950 shadow-sm"
                    : "text-emerald-100 hover:text-white hover:bg-white/10"
                }`}
                title="सिर्फ हिंदी में बोलें"
              >
                <span>🇮🇳 हिंदी</span>
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                  selectedLanguage === 'en'
                    ? "bg-amber-400 text-amber-950 shadow-sm"
                    : "text-emerald-100 hover:text-white hover:bg-white/10"
                }`}
                title="Speak in English only"
              >
                <span>🇬🇧 English</span>
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('both')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                  selectedLanguage === 'both'
                    ? "bg-amber-400 text-amber-950 shadow-sm"
                    : "text-emerald-100 hover:text-white hover:bg-white/10"
                }`}
                title="दोनों भाषाएं (Hindi + English)"
              >
                <span>🌐 दोनों</span>
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
                {isPaused ? "रोका गया (Paused)" : "निवारण कार्यवाही (Speaking)"}
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
                  className={`px-2 py-1 rounded text-xs font-black transition-all ${
                    selectedLanguage === 'hi' ? "bg-amber-400 text-black shadow-sm" : "text-slate-300 hover:text-white"
                  }`}
                  title="सिर्फ हिंदी बोलें"
                >
                  🇮🇳 हिंदी
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('en')}
                  className={`px-2 py-1 rounded text-xs font-black transition-all ${
                    selectedLanguage === 'en' ? "bg-amber-400 text-black shadow-sm" : "text-slate-300 hover:text-white"
                  }`}
                  title="English only"
                >
                  🇬🇧 English
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('both')}
                  className={`px-2 py-1 rounded text-xs font-black transition-all ${
                    selectedLanguage === 'both' ? "bg-amber-400 text-black shadow-sm" : "text-slate-300 hover:text-white"
                  }`}
                  title="दोनों भाषाएं (Hindi + English)"
                >
                  🌐 दोनों
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

          {/* Current Step Spoken Preview */}
          <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 mb-3.5">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold mb-1">
              <span className="flex items-center gap-1 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>बोली जा रही कार्यवाही:</span>
              </span>
              <span className="text-amber-400 font-black text-[11px] uppercase bg-black/40 px-2 py-0.5 rounded">
                {selectedLanguage === 'hi'
                  ? '🇮🇳 केवल हिंदी'
                  : selectedLanguage === 'en'
                    ? '🇬🇧 English Only'
                    : currentlySpeakingSubPart === 'hi'
                      ? '🇮🇳 हिंदी (Step 1/2)'
                      : '🇬🇧 English (Step 2/2)'}
              </span>
            </div>
            
            {/* Display Spoken Content */}
            {currentStepData && (
              <div className="space-y-1.5">
                {(selectedLanguage === 'hi' || selectedLanguage === 'both') && (
                  <p className={`font-bold leading-relaxed text-slate-100 ${
                    currentlySpeakingSubPart === 'hi' ? 'text-amber-200' : 'text-slate-300'
                  } ${
                    fontSize === 'extra-large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                  }`}>
                    {selectedLanguage === 'both' && <span className="text-xs text-amber-400 mr-2 font-mono">🇮🇳 [HI]</span>}
                    {currentStepData.hindi}
                  </p>
                )}
                {(selectedLanguage === 'en' || selectedLanguage === 'both') && (
                  <p className={`font-medium leading-relaxed ${
                    currentlySpeakingSubPart === 'en' ? 'text-emerald-200 font-bold' : 'text-slate-300'
                  } ${
                    fontSize === 'extra-large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                  }`}>
                    {selectedLanguage === 'both' && <span className="text-xs text-emerald-400 mr-2 font-mono">🇬🇧 [EN]</span>}
                    {currentStepData.english}
                  </p>
                )}
              </div>
            )}
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
