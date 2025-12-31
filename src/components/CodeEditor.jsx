import { useState } from 'react';
import { Play, Copy, RefreshCw, Layers } from 'lucide-react';

export const CodeEditor = ({ snippets }) => {
    const [activeSnippet, setActiveSnippet] = useState(snippets[0]);
    const [code, setCode] = useState(snippets[0].code);

    return (
        <div className="flex flex-col h-full bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
            {/* Editor Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                <div className="flex items-center gap-2">
                    <Layers size={16} className="text-blue-400" />
                    <select
                        className="bg-slate-700 text-slate-200 text-xs px-2 py-1 rounded border-none focus:ring-0 cursor-pointer"
                        value={activeSnippet.id}
                        onChange={(e) => {
                            const snippet = snippets.find(s => s.id === parseInt(e.target.value));
                            setActiveSnippet(snippet);
                            setCode(snippet.code);
                        }}
                    >
                        {snippets.map(s => (
                            <option key={s.id} value={s.id}>{s.title} ({s.language})</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white" title="Reset">
                        <RefreshCw size={14} onClick={() => setCode(activeSnippet.code)} />
                    </button>
                    <button className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white" title="Copy">
                        <Copy size={14} onClick={() => navigator.clipboard.writeText(code)} />
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded transition-colors">
                        <Play size={12} fill="currentColor" /> Run
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 relative font-mono text-sm">
                <div className="absolute left-0 top-0 bottom-0 w-10 bg-slate-800/50 flex flex-col items-center pt-4 text-slate-600 select-none border-r border-slate-700/50">
                    {code.split('\n').map((_, i) => (
                        <div key={i} className="h-6 leading-6 text-[10px]">{i + 1}</div>
                    ))}
                </div>
                <textarea
                    className="w-full h-full bg-slate-900 text-slate-300 p-4 pl-12 leading-6 resize-none focus:outline-none focus:ring-0 border-none font-mono"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck="false"
                />
            </div>

            {/* Status Bar */}
            <div className="bg-slate-800 px-4 py-1 flex justify-between items-center text-[10px] text-slate-500">
                <span>{activeSnippet.language.toUpperCase()}</span>
                <span>Ln {code.split('\n').length}, Col {code.length}</span>
            </div>
        </div>
    );
};
