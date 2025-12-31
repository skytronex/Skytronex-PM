
import { useTTS } from '../hooks/useTTS';
import { Volume2, PauseCircle, PlayCircle } from 'lucide-react';

export const TTSButton = ({ text, size = 20, className = "" }) => {
    const { speak, pause, resume, isSpeaking, isPaused } = useTTS();

    const handleClick = (e) => {
        e.stopPropagation();

        if (isSpeaking && !isPaused) {
            pause();
        } else if (isPaused) {
            resume();
        } else {
            speak(text);
        }
    };

    if (!text) return null;

    return (
        <button
            onClick={handleClick}
            className={`p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-blue-500 hover:text-blue-600 ${className}`}
            title={isSpeaking ? (isPaused ? "Resume" : "Pause") : "Read Aloud"}
        >
            {isSpeaking ? (
                isPaused ? <PlayCircle size={size} /> : <PauseCircle size={size} />
            ) : (
                <Volume2 size={size} />
            )}
        </button>
    );
};
