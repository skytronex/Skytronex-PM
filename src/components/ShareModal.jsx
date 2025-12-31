import { useState, useEffect } from 'react';
import { X, UserPlus, Check, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ShareModal = ({ isOpen, onClose, onShare, itemType }) => {
    const [email, setEmail] = useState('');
    const [availableUsers, setAvailableUsers] = useState([]);
    const { user: currentUser } = useAuth();
    const [isSending, setIsSending] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Simulate fetching other users for autocomplete/suggestions
            const users = JSON.parse(localStorage.getItem('skytronex_users') || '[]');
            setAvailableUsers(users.filter(u => u.email !== currentUser?.email));
            setSuccess(false);
            setEmail('');
        }
    }, [isOpen, currentUser]);

    if (!isOpen) return null;

    const handleShare = () => {
        if (!email) return;
        setIsSending(true);

        // Simulate network delay
        setTimeout(() => {
            onShare(email);
            setIsSending(false);
            setSuccess(true);
            setTimeout(() => {
                onClose();
            }, 1000);
        }, 600);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">

                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                            <UserPlus size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-800 dark:text-white">Share {itemType}</h3>
                            <p className="text-xs text-slate-500">Collaborate with your team</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Recipient Email</label>
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="email"
                            placeholder="colleague@skytronex.com"
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {availableUsers.length > 0 && (
                        <div className="mb-6">
                            <p className="text-xs font-bold text-slate-500 uppercase mb-2">Suggestions</p>
                            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                                {availableUsers.map(u => (
                                    <button
                                        key={u.id}
                                        onClick={() => setEmail(u.email)}
                                        className="w-full flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors group text-left"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 transition-colors">
                                            {u.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{u.name}</p>
                                            <p className="text-xs text-slate-500">{u.email}</p>
                                        </div>
                                        {email === u.email && <Check size={16} className="ml-auto text-blue-500" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleShare}
                        disabled={!email || isSending || success}
                        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${success
                            ? 'bg-green-500 text-white shadow-green-500/20'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-600/20 active:scale-95'
                            }`}
                    >
                        {success ? (
                            <>Shared Successfully <Check size={18} /></>
                        ) : isSending ? (
                            <span className="animate-pulse">Sharing...</span>
                        ) : (
                            <>Share Now <UserPlus size={18} /></>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
