import { createContext, useState, useEffect, useRef, useCallback, useContext } from 'react';

const TTSContext = createContext(null);

export const TTSProvider = ({ children }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const synthesisRef = useRef(window.speechSynthesis);
    const utteranceRef = useRef(null);

    useEffect(() => {
        const synth = synthesisRef.current;
        return () => {
            if (synth.speaking || synth.paused) {
                synth.cancel();
            }
        };
    }, []);

    const cancel = useCallback(() => {
        if (synthesisRef.current.speaking || synthesisRef.current.paused) {
            synthesisRef.current.cancel();
            setIsSpeaking(false);
            setIsPaused(false);
        }
    }, []);

    const speak = useCallback((text) => {
        if (!text) return;

        cancel(); // Stop any current speech

        const utterance = new SpeechSynthesisUtterance(text);
        utteranceRef.current = utterance;

        utterance.onstart = () => {
            setIsSpeaking(true);
            setIsPaused(false);
        };

        utterance.onend = () => {
            setIsSpeaking(false);
            setIsPaused(false);
        };

        utterance.onerror = (event) => {
            console.error("Speech synthesis error", event);
            setIsSpeaking(false);
            setIsPaused(false);
        };

        synthesisRef.current.speak(utterance);
    }, [cancel]);

    const pause = useCallback(() => {
        if (synthesisRef.current.speaking && !synthesisRef.current.paused) {
            synthesisRef.current.pause();
            setIsPaused(true);
        }
    }, []);

    const resume = useCallback(() => {
        if (synthesisRef.current.paused) {
            synthesisRef.current.resume();
            setIsPaused(false);
        }
    }, []);

    const value = {
        speak,
        pause,
        resume,
        cancel,
        isSpeaking,
        isPaused,
        hasSupport: !!window.speechSynthesis
    };

    return (
        <TTSContext.Provider value={value}>
            {children}
        </TTSContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTTSContext = () => {
    const context = useContext(TTSContext);
    if (!context) {
        throw new Error('useTTSContext must be used within a TTSProvider');
    }
    return context;
};
