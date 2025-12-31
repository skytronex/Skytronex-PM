import { useState, useEffect } from 'react';
import {
    Layout,
    Upload,
    CheckCircle2,
    Clock,
    BookOpen,
    Briefcase,
    Zap,
    TrendingUp,
    Calendar,
    Search,
    Plus,
    ArrowRight,
    ShieldAlert,
    Filter,
    PenTool,
    Send,
    Sparkles,
    X,
    Trash2,
    Mail,
    Users,
    Book,
    Save,
    StickyNote,
    Sun,
    Moon,
    Github,
    Youtube,
    Link as LinkIcon,
    Code,
    Reply
} from 'lucide-react';
import { MOCK_BRIEFING, MOCK_TASKS, MOCK_SKILLS, MOCK_EMAILS, MOCK_EVENTS, MOCK_CLIENTS, MOCK_NOTES, MOCK_STICKIES, MOCK_RESOURCES, MOCK_SNIPPETS, MOCK_ROADMAP } from './data/mockData';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './components/Login';
import { AdminDashboard } from './components/AdminDashboard';
import { TTSButton } from './components/TTSButton';
import { CodeEditor } from './components/CodeEditor';
import { BackgroundGradientAnimation } from './components/ui/BackgroundGradientAnimation';
import { NeonGradientCard } from './components/ui/NeonGradientCard';
import { LogOut, Shield } from 'lucide-react';

// --- HELPER COMPONENTS ---

const CategoryBadge = ({ category }) => {
    const styles = {
        FREELANCE: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
        LEARNING: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
        DAILY: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
    };

    const icons = {
        FREELANCE: <Briefcase size={12} className="mr-1" />,
        LEARNING: <BookOpen size={12} className="mr-1" />,
        DAILY: <Calendar size={12} className="mr-1" />
    };

    return (
        <span className={`flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${styles[category] || styles.DAILY}`}>
            {icons[category]}
            {category}
        </span>
    );
};

const SkillBar = ({ skill }) => (
    <div className="mb-4 last:mb-0 group cursor-default">
        <div className="flex justify-between items-end mb-1">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{skill.name}</span>
            <span className="text-xs font-bold text-slate-400">{skill.level}% Mastery</span>
        </div>
        <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
                className={`h-full rounded-full transition-all duration-1000 ${skill.trend === 'up' ? 'bg-blue-500' : 'bg-slate-400'} group-hover:scale-x-105 origin-left`}
                style={{ width: `${skill.level}%` }}
            ></div>
        </div>
        <div className="flex justify-between mt-1">
            <span className="text-[10px] text-slate-400">{skill.practiceHours}h Real-world Practice</span>
            {skill.trend === 'up' && <span className="text-[10px] text-green-600 dark:text-green-400 font-bold flex items-center">Trending Up <TrendingUp size={10} className="ml-1 group-hover:-translate-y-0.5 transition-transform" /></span>}
        </div>
    </div>
);

const TaskList = ({ tasks, toggleTask, onDeleteTask, compact = false, onAddTask, sortOrder, onToggleSort, onEditTask }) => (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-full flex flex-col transition-all hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900/50">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="text-blue-500" size={20} />
                {compact ? "Today's Execution List" : "Master Task Database"}
            </h3>
            <div className="flex gap-2">
                {!compact && (
                    <button
                        onClick={onToggleSort}
                        className="text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1 transition-colors"
                    >
                        <Filter size={10} /> Sort: {sortOrder === 'PRIORITY' ? 'Priority' : 'Time'}
                    </button>
                )}
            </div>
        </div>

        <div className="divide-y divide-slate-50 dark:divide-slate-800 flex-grow overflow-auto">
            {tasks.length > 0 ? (
                tasks.slice(0, compact ? 4 : undefined).map((task, index) => (
                    <div key={task.id} className={`p-4 flex items-center group transition-all hover:bg-slate-50/80 dark:hover:bg-slate-800/50 hover:scale-[1.01] ${task.status === 'completed' ? 'opacity-50' : ''}`} style={{ animationDelay: `${index * 50}ms` }}>
                        <button
                            onClick={() => toggleTask(task.id)}
                            className={`mr-4 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${task.status === 'completed' ? 'bg-blue-500 border-blue-500 text-white scale-110' : 'border-slate-300 dark:border-slate-600 text-transparent hover:border-blue-400 hover:scale-110'}`}
                        >
                            <CheckCircle2 size={14} fill="currentColor" />
                        </button>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-sm font-medium truncate transition-colors ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                                    {task.title}
                                </span>
                                {task.urgent && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>}
                            </div>
                            <div className="flex items-center gap-3">
                                <CategoryBadge category={task.category} />
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                    <Clock size={10} /> {task.time} ({task.duration})
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                            {!compact && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); onDeleteTask(task.id); }}
                                    className="p-2 text-slate-400 hover:text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                    title="Delete Task"
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                            <button
                                onClick={(e) => { e.stopPropagation(); onEditTask(task); }}
                                className="p-2 text-slate-400 hover:text-blue-600 transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                            >
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="p-8 text-center text-slate-400 text-sm">
                    No tasks found for this filter.
                </div>
            )}
        </div>

        <button
            onClick={onAddTask}
            className="w-full py-3 text-sm text-slate-500 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 mt-auto group"
        >
            <Plus size={16} className="group-hover:rotate-180 transition-transform duration-500" /> Add New Task
        </button>
    </div>
);

// --- MAIN APP COMPONENT ---

function Dashboard() {
    const { logout, user } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [activeLearningTab, setActiveLearningTab] = useState('overview'); // overview, resources, studio
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [tasks, setTasks] = useState(MOCK_TASKS);
    const [emails, setEmails] = useState(MOCK_EMAILS);
    const [clients, setClients] = useState(MOCK_CLIENTS);
    const [analyzing, setAnalyzing] = useState(false);
    const [postDraft, setPostDraft] = useState("Just discovered a game-changer for my freelance workflow: linking my learning goals directly to client tasks.\n\nNow, when I learn 'Spring Boot', I apply it immediately. #BuildInPublic #Java #Freelance");
    const [showBriefing, setShowBriefing] = useState(true);
    const [notes, setNotes] = useState(MOCK_NOTES);
    const [activeNote, setActiveNote] = useState(MOCK_NOTES[0]);
    const [stickies, setStickies] = useState(MOCK_STICKIES);
    const [skills, setSkills] = useState(MOCK_SKILLS.map((s, i) => ({ ...s, id: i })));
    const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [skillForm, setSkillForm] = useState({ name: '', level: '50', practiceHours: '0', trend: 'flat' });
    const [filter] = useState('ALL');
    const [sortOrder, setSortOrder] = useState('PRIORITY');
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [newTask, setNewTask] = useState({
        title: '',
        category: 'FREELANCE',
        time: '10:00 AM',
        duration: '1h',
        urgent: false
    });
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientForm, setClientForm] = useState({
        name: '',
        company: '',
        status: 'Lead',
        project: '',
        value: '',
        location: ''
    });
    const [events, setEvents] = useState(MOCK_EVENTS);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [eventForm, setEventForm] = useState({ title: '', time: '10:00 AM', date: '24', type: 'meeting' });
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [emailForm, setEmailForm] = useState({ to: '', subject: '', content: '' });

    // Resource State
    const [resources, setResources] = useState(MOCK_RESOURCES);
    const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
    const [selectedResource, setSelectedResource] = useState(null);
    const [resourceForm, setResourceForm] = useState({ title: '', description: '', type: 'link', url: '', tag: 'TOOL', duration: '' });

    // Toggle Dark Mode Class on Body/HTML
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const handleSaveTask = () => {
        if (!newTask.title.trim()) return;

        if (selectedTask) {
            setTasks(tasks.map(t => t.id === selectedTask.id ? { ...newTask, id: t.id, status: t.status } : t));
        } else {
            const taskToAdd = {
                id: tasks.length + 1,
                ...newTask,
                status: 'pending'
            };
            setTasks([...tasks, taskToAdd]);
        }
        setIsTaskModalOpen(false);
        setNewTask({ title: '', category: 'FREELANCE', time: '10:00 AM', duration: '1h', urgent: false });
        setSelectedTask(null);
    };

    const handleSaveResource = () => {
        if (!resourceForm.title.trim()) return;

        if (selectedResource) {
            setResources(resources.map(r => r.id === selectedResource.id ? { ...resourceForm, id: r.id } : r));
        } else {
            setResources([...resources, { ...resourceForm, id: Date.now() }]);
        }
        setIsResourceModalOpen(false);
        setResourceForm({ title: '', description: '', type: 'link', url: '', tag: 'TOOL', duration: '' });
        setSelectedResource(null);
    };

    const handleSaveClient = () => {
        if (selectedClient) {
            setClients(clients.map(c => c.id === selectedClient.id ? { ...clientForm, id: c.id } : c));
        } else {
            setClients([...clients, { ...clientForm, id: Date.now() }]);
        }
        setIsClientModalOpen(false);
        setClientForm({ name: '', company: '', status: 'Lead', project: '', value: '', location: '' });
        setSelectedClient(null);
    };

    const handleSaveSkill = () => {
        if (selectedSkill) {
            setSkills(skills.map(s => s.id === selectedSkill.id ? { ...skillForm, id: s.id } : s));
        } else {
            setSkills([...skills, { ...skillForm, id: Date.now() }]);
        }
        setIsSkillModalOpen(false);
        setSkillForm({ name: '', level: '50', practiceHours: '0', trend: 'flat' });
        setSelectedSkill(null);
    };

    const handleSaveEvent = () => {
        if (selectedEvent) {
            setEvents(events.map(e => e.id === selectedEvent.id ? { ...eventForm, id: e.id } : e));
        } else {
            setEvents([...events, { ...eventForm, id: Date.now() }]);
        }
        setIsEventModalOpen(false);
        setEventForm({ title: '', time: '10:00 AM', date: '24', type: 'meeting' });
        setSelectedEvent(null);
    };

    const handleSendEmail = () => {
        // In a real app, this would send to a backend.
        // For this mock, we'll confirm the action and maybe add a "Sent" item if we had a Sent folder.
        // We'll just add it to the top of the inbox as if we CC'd ourselves to verify the action.
        const newEmail = {
            id: Date.now(),
            sender: 'Me' + (emailForm.to ? ` (to ${emailForm.to})` : ''),
            time: 'Just now',
            subject: emailForm.subject,
            preview: emailForm.content,
            unread: false
        };
        setEmails([newEmail, ...emails]);
        setIsEmailModalOpen(false);
        setEmailForm({ to: '', subject: '', content: '' });
    };

    const handleAcceptPlan = () => {
        const focusTask = {
            id: Date.now(),
            title: "Focus Block: Khaleeq Revisions",
            category: "FREELANCE",
            time: "Now",
            duration: "4h",
            status: "pending",
            urgent: true
        };
        setTasks([focusTask, ...tasks]);
        setActiveTab('tasks');
    };



    const toggleSort = () => {
        setSortOrder(prev => prev === 'PRIORITY' ? 'TIME' : 'PRIORITY');
    };

    const filteredTasks = tasks
        .filter(t => filter === 'ALL' || t.category === filter)
        .sort((a, b) => {
            if (sortOrder === 'PRIORITY') {
                if (a.urgent === b.urgent) return 0;
                return a.urgent ? -1 : 1;
            } else {
                return a.time.localeCompare(b.time);
            }
        });

    const urgentPendingCount = tasks.filter(t => t.status === 'pending' && t.urgent).length;
    const unreadEmailCount = emails.filter(e => e.unread).length;

    // --- RENDER FUNCTIONS ---

    const NavButton = ({ id, icon: Icon, label, badgeCount, badgeColor = "bg-blue-500" }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`p-3 rounded-xl transition-all group relative flex items-center justify-center flex-shrink-0 duration-300 hover:scale-105 active:scale-95 ${activeTab === id ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
        >
            <div className="relative">
                <Icon size={20} className={`transition-transform duration-300 ${activeTab === id ? 'scale-110' : 'group-hover:scale-110'}`} />
                {badgeCount > 0 && (
                    <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 ${badgeColor} rounded-full border-2 border-slate-900 ${id === 'tasks' ? 'animate-pulse' : ''}`}></span>
                )}
            </div>
            <span className="absolute left-14 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-slate-700 flex items-center gap-2">
                {label}
                {badgeCount > 0 && (
                    <span className={`${badgeColor} text-white text-[10px] px-1.5 rounded-full`}>
                        {badgeCount} {id === 'tasks' ? 'Urgent' : 'New'}
                    </span>
                )}
            </span>
        </button>
    );

    const renderTaskModal = () => (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                        {selectedTask ? 'Edit Task' : 'Add New Task'}
                    </h3>
                    <button onClick={() => setIsTaskModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors hover:rotate-90 duration-300">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Task Title</label>
                        <input
                            type="text"
                            className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            placeholder="e.g., Review PR #123"
                            value={newTask.title}
                            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                            autoFocus
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Category</label>
                            <div className="relative">
                                <select
                                    className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none bg-white transition-all"
                                    value={newTask.category}
                                    onChange={e => setNewTask({ ...newTask, category: e.target.value })}
                                >
                                    <option value="FREELANCE">Freelance</option>
                                    <option value="LEARNING">Learning</option>
                                    <option value="DAILY">Daily</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <Briefcase size={14} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Urgency</label>
                            <div className="relative">
                                <select
                                    className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none bg-white transition-all"
                                    value={newTask.urgent.toString()}
                                    onChange={e => setNewTask({ ...newTask, urgent: e.target.value === 'true' })}
                                >
                                    <option value="false">Normal</option>
                                    <option value="true">High Priority</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <ShieldAlert size={14} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => setIsTaskModalOpen(false)}
                        className="px-4 py-2 text-slate-600 dark:text-slate-400 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveTask}
                        className="px-6 py-2 bg-slate-900 dark:bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/10"
                    >
                        {selectedTask ? 'Update Task' : 'Create Task'}
                    </button>
                </div>
            </div>
        </div>
    );

    const renderSkillModal = () => (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                        {selectedSkill ? 'Edit Skill' : 'Add New Skill'}
                    </h3>
                    <button onClick={() => setIsSkillModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors hover:rotate-90 duration-300">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Skill Name</label>
                        <input
                            type="text"
                            className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            placeholder="e.g. React Native"
                            value={skillForm.name}
                            onChange={e => setSkillForm({ ...skillForm, name: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Mastery Level (%)</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                value={skillForm.level}
                                onChange={e => setSkillForm({ ...skillForm, level: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Practice Hours</label>
                            <input
                                type="number"
                                className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                value={skillForm.practiceHours}
                                onChange={e => setSkillForm({ ...skillForm, practiceHours: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Trend</label>
                        <div className="relative">
                            <select
                                className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none bg-white transition-all"
                                value={skillForm.trend}
                                onChange={e => setSkillForm({ ...skillForm, trend: e.target.value })}
                            >
                                <option value="up">Trending Up</option>
                                <option value="flat">Stable</option>
                                <option value="down">Trending Down</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => setIsSkillModalOpen(false)}
                        className="px-4 py-2 text-slate-600 dark:text-slate-400 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveSkill}
                        className="px-6 py-2 bg-slate-900 dark:bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/10"
                    >
                        {selectedSkill ? 'Update Skill' : 'Save Skill'}
                    </button>
                </div>
            </div>
        </div>
    );

    const renderEventModal = () => (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                        {selectedEvent ? 'Edit Event' : 'Add New Event'}
                    </h3>
                    <button onClick={() => setIsEventModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors hover:rotate-90 duration-300">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Event Title</label>
                        <input
                            type="text"
                            className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            placeholder="e.g. Client Call"
                            value={eventForm.title}
                            onChange={e => setEventForm({ ...eventForm, title: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Date (Dec)</label>
                            <input
                                type="number"
                                min="1"
                                max="31"
                                className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                value={eventForm.date}
                                onChange={e => setEventForm({ ...eventForm, date: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Time</label>
                            <input
                                type="text"
                                className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder="10:00 AM"
                                value={eventForm.time}
                                onChange={e => setEventForm({ ...eventForm, time: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Type</label>
                        <div className="relative">
                            <select
                                className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none bg-white transition-all"
                                value={eventForm.type}
                                onChange={e => setEventForm({ ...eventForm, type: e.target.value })}
                            >
                                <option value="meeting">Meeting</option>
                                <option value="deadline">Deadline</option>
                                <option value="routine">Routine</option>
                                <option value="learning">Learning</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => setIsEventModalOpen(false)}
                        className="px-4 py-2 text-slate-600 dark:text-slate-400 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveEvent}
                        className="px-6 py-2 bg-slate-900 dark:bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/10"
                    >
                        {selectedEvent ? 'Update Event' : 'Save Event'}
                    </button>
                </div>
            </div>
        </div>
    );

    const renderEmailModal = () => (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                        {selectedEmail ? 'View Email' : 'Compose Email'}
                    </h3>
                    <button onClick={() => setIsEmailModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors hover:rotate-90 duration-300">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                            {selectedEmail ? 'From' : 'To'}
                        </label>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                {selectedEmail ? (selectedEmail.sender ? selectedEmail.sender.charAt(0) : 'U') : 'U'}
                            </div>
                            <input
                                type="text"
                                className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder={selectedEmail ? "" : "Recipient"}
                                value={selectedEmail ? selectedEmail.sender : emailForm.to}
                                onChange={e => !selectedEmail && setEmailForm({ ...emailForm, to: e.target.value })}
                                readOnly={!!selectedEmail}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Subject</label>
                        <input
                            type="text"
                            className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            placeholder="Subject"
                            value={selectedEmail ? selectedEmail.subject : emailForm.subject}
                            onChange={e => !selectedEmail && setEmailForm({ ...emailForm, subject: e.target.value })}
                            readOnly={!!selectedEmail}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Message</label>
                        <textarea
                            className="w-full h-40 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none leading-relaxed transition-all"
                            placeholder="Write your message..."
                            value={selectedEmail ? (selectedEmail.preview || selectedEmail.details) : emailForm.content}
                            onChange={e => !selectedEmail && setEmailForm({ ...emailForm, content: e.target.value })}
                            readOnly={!!selectedEmail}
                        />
                    </div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => setIsEmailModalOpen(false)}
                        className="px-4 py-2 text-slate-600 dark:text-slate-400 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        Close
                    </button>
                    {!selectedEmail && (
                        <button
                            onClick={handleSendEmail}
                            className="px-6 py-2 bg-slate-900 dark:bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/10 flex items-center gap-2"
                        >
                            <Send size={16} /> Send Email
                        </button>
                    )}
                    {selectedEmail && (
                        <button
                            onClick={() => {
                                // Reply logic could go here, for now switch to compose populated
                                const replySubject = selectedEmail.subject.startsWith('Re:') ? selectedEmail.subject : 'Re: ' + selectedEmail.subject;
                                setSelectedEmail(null);
                                setEmailForm({ to: selectedEmail.sender, subject: replySubject, content: '\n\nOn ' + selectedEmail.time + ', ' + selectedEmail.sender + ' wrote:\n' + selectedEmail.preview });
                            }}
                            className="px-6 py-2 bg-slate-900 dark:bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/10 flex items-center gap-2"
                        >
                            <Reply size={16} /> Reply
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    const renderResourceModal = () => (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                        {selectedResource ? 'Edit Resource' : 'Add New Resource'}
                    </h3>
                    <button onClick={() => setIsResourceModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors hover:rotate-90 duration-300">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Title</label>
                        <input
                            type="text"
                            className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            placeholder="Resource Title"
                            value={resourceForm.title}
                            onChange={e => setResourceForm({ ...resourceForm, title: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Description</label>
                        <textarea
                            className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                            placeholder="Brief description..."
                            rows="2"
                            value={resourceForm.description}
                            onChange={e => setResourceForm({ ...resourceForm, description: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Type</label>
                            <div className="relative">
                                <select
                                    className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none bg-white transition-all"
                                    value={resourceForm.type}
                                    onChange={e => setResourceForm({ ...resourceForm, type: e.target.value })}
                                >
                                    <option value="link">Link</option>
                                    <option value="video">Video</option>
                                    <option value="github">GitHub</option>
                                    <option value="api">API Doc</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Tag</label>
                            <input
                                type="text"
                                className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder="e.g. AI, DEVOPS"
                                value={resourceForm.tag}
                                onChange={e => setResourceForm({ ...resourceForm, tag: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">URL</label>
                        <input
                            type="text"
                            className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            placeholder="https://..."
                            value={resourceForm.url}
                            onChange={e => setResourceForm({ ...resourceForm, url: e.target.value })}
                        />
                    </div>
                    {resourceForm.type === 'video' && (
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Duration</label>
                            <input
                                type="text"
                                className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder="e.g. 15:20"
                                value={resourceForm.duration}
                                onChange={e => setResourceForm({ ...resourceForm, duration: e.target.value })}
                            />
                        </div>
                    )}
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => setIsResourceModalOpen(false)}
                        className="px-4 py-2 text-slate-600 dark:text-slate-400 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveResource}
                        className="px-6 py-2 bg-slate-900 dark:bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/10"
                    >
                        {selectedResource ? 'Update Resource' : 'Save Resource'}
                    </button>
                </div>
            </div>
        </div>
    );

    const renderClientModal = () => (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                        {selectedClient ? 'Edit Client' : 'Add New Client'}
                    </h3>
                    <button onClick={() => setIsClientModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors hover:rotate-90 duration-300">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Name</label>
                            <input
                                type="text"
                                className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder="Client Name"
                                value={clientForm.name}
                                onChange={e => setClientForm({ ...clientForm, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Company</label>
                            <input
                                type="text"
                                className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder="Company Name"
                                value={clientForm.company}
                                onChange={e => setClientForm({ ...clientForm, company: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Project</label>
                            <input
                                type="text"
                                className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder="Project Title"
                                value={clientForm.project}
                                onChange={e => setClientForm({ ...clientForm, project: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Value</label>
                            <input
                                type="text"
                                className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder="Est. Value"
                                value={clientForm.value}
                                onChange={e => setClientForm({ ...clientForm, value: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Status</label>
                            <div className="relative">
                                <select
                                    className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none bg-white transition-all"
                                    value={clientForm.status}
                                    onChange={e => setClientForm({ ...clientForm, status: e.target.value })}
                                >
                                    <option value="Lead">Lead</option>
                                    <option value="Active">Active</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Location</label>
                            <input
                                type="text"
                                className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder="Location"
                                value={clientForm.location}
                                onChange={e => setClientForm({ ...clientForm, location: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => setIsClientModalOpen(false)}
                        className="px-4 py-2 text-slate-600 dark:text-slate-400 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveClient}
                        className="px-6 py-2 bg-slate-900 dark:bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/10"
                    >
                        {selectedClient ? 'Update Client' : 'Save Client'}
                    </button>
                </div>
            </div>
        </div>
    );

    const renderDashboard = () => (
        <>
            {showBriefing && (
                <section className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500 ease-out">
                    <NeonGradientCard
                        containerClassName="shadow-xl hover:shadow-2xl transition-all duration-500"
                        className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-blue-900 dark:to-slate-900 text-white relative overflow-hidden"
                        borderSize={3}
                        neonColors={{ first: "#8B5CF6", second: "#3B82F6", third: "#06B6D4" }}
                    >
                        <div className="absolute top-0 right-0 p-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-colors duration-500"></div>
                        <button
                            onClick={() => setShowBriefing(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors z-20"
                            title="Dismiss Briefing"
                        >
                            <X size={18} />
                        </button>
                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2 text-blue-400 text-xs font-bold uppercase tracking-wider animate-pulse">
                                    <ShieldAlert size={14} /> Daily Focus Agent
                                </div>
                                <h2 className="text-lg md:text-xl font-medium leading-relaxed opacity-90">
                                    &quot;{MOCK_BRIEFING.quote}&quot;
                                </h2>
                                <div className="flex gap-4 mt-4 items-center">
                                    <TTSButton text={`Daily Focus: ${MOCK_BRIEFING.quote}. Focus Mode: ${MOCK_BRIEFING.focusMode}.`} className="text-white hover:bg-white/10" />
                                    <div className="flex items-center gap-2 text-sm text-slate-400">
                                        <Clock size={14} /> {MOCK_BRIEFING.focusMode}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-400">
                                        <Briefcase size={14} /> 2 Deadlines
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={handleAcceptPlan}
                                className="px-5 py-2.5 bg-white text-slate-900 rounded-lg text-sm font-bold hover:bg-blue-50 transition-all shadow-lg hover:scale-105 active:scale-95"
                            >
                                Accept Plan
                            </button>
                        </div>
                    </NeonGradientCard>
                </section>
            )
            }

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex items-center justify-between gap-6 relative overflow-hidden transition-all hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900/50 group magic-border">
                        <div className="relative z-10">
                            <h3 className="font-bold text-slate-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Have a new Lead?</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Upload a screenshot. Gemini 1.5 Pro will extract tasks & skills.</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setAnalyzing(!analyzing)}
                                    className="px-4 py-2 bg-slate-900 dark:bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/20"
                                >
                                    {analyzing ? 'Processing...' : 'Upload Image'}
                                </button>
                                <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors hover:border-slate-300 dark:hover:border-slate-600">
                                    Paste Text
                                </button>
                            </div>
                        </div>
                        {analyzing && (
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-100 z-20">
                                <div className="h-full bg-blue-500 w-1/3 animate-[loading_1s_ease-in-out_infinite]"></div>
                            </div>
                        )}
                        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors duration-500"></div>
                    </div>

                    <TaskList
                        tasks={filteredTasks}
                        toggleTask={toggleTask}
                        compact={true}
                        onAddTask={() => setIsTaskModalOpen(true)}
                        onToggleSort={toggleSort}
                        onDeleteTask={deleteTask}
                        onEditTask={(task) => {
                            setSelectedTask(task);
                            setNewTask(task);
                            setIsTaskModalOpen(true);
                        }}
                    />
                </div>

                <div className="space-y-8">
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 transition-all hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-900/50 group magic-border">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                <TrendingUp className="text-indigo-500 group-hover:scale-110 transition-transform" size={20} />
                                Skill Growth
                            </h3>
                            <button onClick={() => setActiveTab('learning')} className="text-xs text-blue-600 font-medium hover:underline">View All</button>
                        </div>
                        <div className="space-y-2">
                            {MOCK_SKILLS.slice(0, 3).map((skill, i) => (
                                <SkillBar key={i} skill={skill} />
                            ))}
                        </div>
                        <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-900/50 group-hover:bg-indigo-100/50 dark:group-hover:bg-indigo-900/30 transition-colors">
                            <p className="text-xs text-indigo-800 dark:text-indigo-300 font-medium leading-relaxed">
                                <span className="font-bold">Insight:</span> You&apos;ve linked 3 freelance tasks to &quot;Java Spring Boot&quot; this week. That&apos;s 12 hours of paid practice!
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:scale-105 hover:shadow-md cursor-default group">
                            <p className="text-xs text-slate-400 font-bold uppercase mb-1 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">Freelance</p>
                            <p className="text-2xl font-black text-slate-900 dark:text-white">$1.2k</p>
                            <p className="text-[10px] text-green-600 dark:text-green-400 font-bold">This Week</p>
                        </div>
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:scale-105 hover:shadow-md cursor-default group">
                            <p className="text-xs text-slate-400 font-bold uppercase mb-1 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">Learning</p>
                            <p className="text-2xl font-black text-slate-900 dark:text-white">18h</p>
                            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">Total Time</p>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );

    const renderContentCreation = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Content Studio</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Draft, optimize, and schedule your social presence.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20">
                        <Sparkles size={16} /> Auto-Generate
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 hover:shadow-lg transition-all">
                    <div className="mb-4">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Post Topic / Title</label>
                        <input type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm font-medium text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 transition-all" placeholder="e.g., My journey learning React" defaultValue="Linking Learning Goals to Freelance Work" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Content Draft</label>
                        <textarea
                            className="w-full h-64 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500 leading-relaxed resize-none transition-all"
                            value={postDraft}
                            onChange={(e) => setPostDraft(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-between items-center pt-2">
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-indigo-600 transition-all hover:scale-110"><Sparkles size={18} /></button>
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-indigo-600 transition-all hover:scale-110"><Upload size={18} /></button>
                        </div>
                        <button className="px-6 py-2 bg-slate-900 dark:bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 flex items-center gap-2 transition-all hover:scale-105 active:scale-95">
                            <Send size={16} /> Post to LinkedIn
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderNotepad = () => (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        Note Pad
                        <TTSButton text={`Notepad. You have ${notes.length} notes saved.`} size={18} />
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Quick thoughts, meeting minutes, and code snippets.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        className="px-4 py-2 bg-slate-900 dark:bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 flex items-center gap-2 transition-all hover:scale-105"
                        onClick={() => {
                            const newNote = { id: Date.now(), title: "New Note", content: "", date: "Today" };
                            setNotes([newNote, ...notes]);
                            setActiveNote(newNote);
                        }}
                    >
                        <Plus size={16} /> New Note
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex transition-colors">
                {/* Notes Sidebar */}
                <div className="w-64 border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col">
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input type="text" placeholder="Search notes..." className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-9 pr-3 py-2 rounded-lg text-xs focus:outline-none focus:border-blue-500 dark:text-white transition-all focus:ring-2 focus:ring-blue-500/20" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {notes.map(note => (
                            <div
                                key={note.id}
                                onClick={() => setActiveNote(note)}
                                className={`p-4 cursor-pointer transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0 ${activeNote.id === note.id ? 'bg-white dark:bg-slate-800 border-l-4 border-l-blue-500 shadow-sm' : 'hover:bg-slate-100/50 dark:hover:bg-slate-800/30 border-l-4 border-l-transparent'}`}
                            >
                                <h4 className={`text-sm font-bold truncate mb-1 ${activeNote.id === note.id ? 'text-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>{note.title}</h4>
                                <p className="text-xs text-slate-400 truncate">{note.content || "No content"}</p>
                                <p className="text-[10px] text-slate-400 mt-2">{note.date}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Editor Area */}
                <div className="flex-1 flex flex-col">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <input
                            type="text"
                            value={activeNote.title}
                            onChange={(e) => {
                                const updatedNote = { ...activeNote, title: e.target.value };
                                setActiveNote(updatedNote);
                                setNotes(notes.map(n => n.id === activeNote.id ? updatedNote : n));
                            }}
                            className="text-xl font-bold text-slate-800 dark:text-white bg-transparent focus:outline-none placeholder:text-slate-300 w-full"
                            placeholder="Note Title"
                        />
                        <button className="text-slate-400 hover:text-blue-600 transition-colors hover:scale-110" title="Save">
                            <Save size={18} />
                        </button>
                    </div>
                    <textarea
                        className="flex-1 p-6 text-sm text-slate-600 dark:text-slate-300 bg-transparent leading-relaxed focus:outline-none resize-none"
                        placeholder="Start typing..."
                        value={activeNote.content}
                        onChange={(e) => {
                            const updatedNote = { ...activeNote, content: e.target.value };
                            setActiveNote(updatedNote);
                            setNotes(notes.map(n => n.id === activeNote.id ? updatedNote : n));
                        }}
                    />
                </div>
            </div>
        </div>
    );

    const renderTasks = () => (
        <div className="h-[calc(100vh-140px)]">
            <TaskList
                tasks={filteredTasks}
                toggleTask={toggleTask}
                compact={false}
                onAddTask={() => {
                    setSelectedTask(null);
                    setNewTask({ title: '', category: 'FREELANCE', time: '10:00 AM', duration: '1h', urgent: false });
                    setIsTaskModalOpen(true);
                }}
                sortOrder={sortOrder}
                onToggleSort={toggleSort}
                onDeleteTask={deleteTask}
                onEditTask={(task) => {
                    setSelectedTask(task);
                    setNewTask(task);
                    setIsTaskModalOpen(true);
                }}
            />
        </div>
    );



    const renderLearning = () => (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-medium text-slate-800 dark:text-white flex items-center gap-2">
                    Learning Hub
                    <TTSButton text="Learning Hub. Review your skills, access resources, or practice coding." size={18} />
                </h2>
                <div className="flex gap-2 bg-slate-200 dark:bg-slate-800 p-1 rounded-lg items-center magic-border">
                    {['overview', 'resources', 'studio'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveLearningTab(tab)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-md capitalize transition-all ${activeLearningTab === tab ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                        >
                            {tab}
                        </button>
                    ))}
                    {activeLearningTab === 'resources' && (
                        <button
                            onClick={() => {
                                setSelectedResource(null);
                                setResourceForm({ title: '', description: '', type: 'link', url: '', tag: 'TOOL', duration: '' });
                                setIsResourceModalOpen(true);
                            }}
                            className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-md hover:bg-blue-700 transition-all flex items-center gap-1"
                            title="Add Resource"
                        >
                            <Plus size={14} />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                {activeLearningTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm magic-border">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg text-slate-800 dark:text-white">Active Skills</h3>
                                <button
                                    onClick={() => {
                                        setSelectedSkill(null);
                                        setSkillForm({ name: '', level: '50', practiceHours: '0', trend: 'flat' });
                                        setIsSkillModalOpen(true);
                                    }}
                                    className="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-1.5 rounded-lg transition-colors"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                {skills.map((skill) => (
                                    <div
                                        key={skill.id}
                                        onClick={() => {
                                            setSelectedSkill(skill);
                                            setSkillForm(skill);
                                            setIsSkillModalOpen(true);
                                        }}
                                        className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 -m-2 rounded-lg transition-colors"
                                    >
                                        <SkillBar skill={skill} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm magic-border">
                            <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white">Learning Roadmap</h3>
                            <div className="space-y-3">
                                {MOCK_ROADMAP.map((item) => (
                                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.title}</span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded ${item.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'}`}>{item.status}</span>
                                        </div>
                                        <p className="text-xs text-slate-500">{item.type} • {item.progress}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeLearningTab === 'resources' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {resources.map((res) => (
                            <div key={res.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all group cursor-pointer magic-border" onClick={() => window.open(res.url, '_blank')}>
                                <div className="flex items-start justify-between mb-2">
                                    <div className={`p-2 rounded-lg ${res.type === 'video' ? 'bg-red-100 text-red-600' : res.type === 'github' ? 'bg-slate-100 text-slate-800' : res.type === 'api' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                        {res.type === 'video' ? <Youtube size={18} /> : res.type === 'github' ? <Github size={18} /> : res.type === 'api' ? <Code size={18} /> : <LinkIcon size={18} />}
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded">{res.tag}</span>
                                </div>
                                <h4 className="font-bold text-slate-800 dark:text-white mb-1 group-hover:text-blue-500 transition-colors">{res.title}</h4>
                                <p className="text-xs text-slate-500 mb-3 line-clamp-2">{res.description}</p>
                                {res.type === 'video' && <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1"><Clock size={10} /> {res.duration}</div>}
                                {res.type === 'github' && <div className="text-[10px] font-mono text-green-600 flex items-center gap-1"><CheckCircle2 size={10} /> {res.status} ({res.lastRun})</div>}
                            </div>
                        ))}
                    </div>
                )}

                {activeLearningTab === 'studio' && (
                    <CodeEditor snippets={MOCK_SNIPPETS} />
                )}
            </div>
        </div>
    );

    const renderEmail = () => (
        <div className="h-[calc(100vh-140px)] flex flex-col bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h2 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                    <Mail size={20} /> Inbox
                    <TTSButton text={`You have ${unreadEmailCount} unread emails.`} size={16} />
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            setSelectedEmail(null);
                            setEmailForm({ to: '', subject: '', content: '' });
                            setIsEmailModalOpen(true);
                        }}
                        className="px-4 py-2 bg-slate-900 dark:bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Plus size={14} /> Compose
                    </button>
                    <button className="text-slate-400 hover:text-blue-500 p-2"><Filter size={18} /></button>
                </div>
            </div>
            <div className="flex-1 overflow-auto divide-y divide-slate-100 dark:divide-slate-800">
                {emails.map(email => (
                    <div
                        key={email.id}
                        onClick={() => {
                            setSelectedEmail(email);
                            setIsEmailModalOpen(true);
                        }}
                        className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors ${email.unread ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}
                    >
                        <div className="flex justify-between items-start mb-1">
                            <span className={`text-sm ${email.unread ? 'font-bold text-slate-800 dark:text-white' : 'font-medium text-slate-600 dark:text-slate-300'}`}>{email.sender}</span>
                            <span className="text-xs text-slate-400">{email.time}</span>
                        </div>
                        <p className={`text-sm mb-1 ${email.unread ? 'font-bold text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-400'}`}>{email.subject}</p>
                        <p className="text-xs text-slate-500 truncate">{email.preview}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderCalendar = () => (
        <div className="h-[calc(100vh-140px)] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 overflow-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    Calendar
                    <TTSButton text={`You have ${events.length} schedule events.`} size={18} />
                </h2>
                <button
                    onClick={() => {
                        setSelectedEvent(null);
                        setEventForm({ title: '', time: '10:00 AM', date: '24', type: 'meeting' });
                        setIsEventModalOpen(true);
                    }}
                    className="px-4 py-2 bg-slate-900 dark:bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <Plus size={16} /> Add Event
                </button>
            </div>
            <div className="space-y-4">
                {events.map(event => (
                    <div
                        key={event.id}
                        onClick={() => {
                            setSelectedEvent(event);
                            setEventForm(event);
                            setIsEventModalOpen(true);
                        }}
                        className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 hover:scale-[1.01] transition-transform cursor-pointer"
                    >
                        <div className="flex flex-col items-center justify-center bg-white dark:bg-slate-700 w-16 h-16 rounded-lg shadow-sm">
                            <span className="text-xs font-bold text-slate-500 uppercase">Dec</span>
                            <span className="text-xl font-black text-slate-800 dark:text-white">{event.date}</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-white">{event.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
                                <Clock size={14} /> {event.time}
                            </p>
                            <span className={`inline-block mt-2 text-[10px] uppercase font-bold px-2 py-0.5 rounded ${event.type === 'meeting' ? 'bg-purple-100 text-purple-700' : event.type === 'deadline' ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-700'}`}>
                                {event.type}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderClients = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    Clients
                    <TTSButton text={`Client CRM. You have ${clients.length} active clients.`} size={18} />
                </h2>
                <button
                    onClick={() => {
                        setSelectedClient(null);
                        setClientForm({ name: '', company: '', status: 'Lead', project: '', value: '', location: '' });
                        setIsClientModalOpen(true);
                    }}
                    className="px-4 py-2 bg-slate-900 dark:bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors"
                >
                    Add Client
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map(client => (
                    <div key={client.id} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {client.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-white">{client.name}</h3>
                                <p className="text-xs text-slate-500">{client.company}</p>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex justify-between"><span className="text-slate-400">Project:</span> <span className="font-medium text-slate-800 dark:text-slate-200">{client.project}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">Value:</span> <span className="font-medium text-green-600">${client.value}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">Status:</span>
                                <span className={`font-bold text-[10px] px-2 py-0.5 rounded-full ${client.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>{client.status}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setSelectedClient(client);
                                setClientForm(client);
                                setIsClientModalOpen(true);
                            }}
                            className="w-full mt-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderStickyNotes = () => (
        <div className="h-[calc(100vh-140px)] overflow-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    Sticky Wall
                    <TTSButton text={`Sticky Wall. You have ${stickies.length} notes posted.`} size={18} />
                </h2>
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-yellow-900 font-bold rounded-lg shadow-sm hover:bg-yellow-300 transition-colors"
                    onClick={() => setStickies([...stickies, { id: Date.now(), color: 'bg-yellow-200', content: 'New Idea...', rotation: `rotate-${Math.floor(Math.random() * 6) - 3}` }])}
                >
                    <Plus size={18} /> Add Sticky
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stickies.map(sticky => (
                    <div
                        key={sticky.id}
                        className={`aspect-square p-6 ${sticky.color} text-slate-800 shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col relative group ${sticky.rotation}`}
                        style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}
                    >
                        <textarea
                            className="w-full h-full bg-transparent resize-none border-none focus:ring-0 text-center font-bold text-lg leading-tight focus:outline-none placeholder-slate-500/50"
                            value={sticky.content}
                            onChange={(e) => {
                                const newContent = e.target.value;
                                setStickies(stickies.map(s => s.id === sticky.id ? { ...s, content: newContent } : s));
                            }}
                            placeholder="Type here..."
                        />
                        <button
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-600 transition-all hover:rotate-90"
                            onClick={(e) => {
                                e.stopPropagation();
                                setStickies(stickies.filter(s => s.id !== sticky.id));
                            }}
                            title="Delete Sticky"
                        >
                            <X size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    const handleGlobalAdd = () => {
        switch (activeTab) {
            case 'dashboard':
            case 'tasks':
                setSelectedTask(null);
                setNewTask({ title: '', category: 'FREELANCE', time: '10:00 AM', duration: '1h', urgent: false });
                setIsTaskModalOpen(true);
                break;
            case 'clients':
                setSelectedClient(null);
                setClientForm({ name: '', company: '', status: 'Lead', project: '', value: '', location: '' });
                setIsClientModalOpen(true);
                break;
            case 'learning':
                if (activeLearningTab === 'resources') {
                    setSelectedResource(null);
                    setResourceForm({ title: '', description: '', type: 'link', url: '', tag: 'TOOL', duration: '' });
                    setIsResourceModalOpen(true);
                } else {
                    setSelectedSkill(null);
                    setSkillForm({ name: '', level: '50', practiceHours: '0', trend: 'flat' });
                    setIsSkillModalOpen(true);
                }
                break;
            case 'calendar':
                setSelectedEvent(null);
                setEventForm({ title: '', time: '10:00 AM', date: '24', type: 'meeting' });
                setIsEventModalOpen(true);
                break;
            case 'email':
                setSelectedEmail(null);
                setEmailForm({ to: '', subject: '', content: '' });
                setIsEmailModalOpen(true);
                break;
            case 'stickies':
                setStickies([...stickies, { id: Date.now(), color: 'bg-yellow-200', content: 'New Idea...', rotation: `rotate-${Math.floor(Math.random() * 6) - 3}` }]);
                break;
            case 'notepad': {
                const newNote = { id: Date.now(), title: "New Note", content: "", date: "Today" };
                setNotes([newNote, ...notes]);
                setActiveNote(newNote);
                break;
            }
            default:
                // Default to adding a task if unsure
                setSelectedTask(null);
                setNewTask({ title: '', category: 'FREELANCE', time: '10:00 AM', duration: '1h', urgent: false });
                setIsTaskModalOpen(true);
        }
    };

    return (
        <BackgroundGradientAnimation
            containerClassName={`font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300`}
            className="overflow-y-auto"
        >
            {/* Old background blobs removed */}

            {/* SIDEBAR NAVIGATION */}
            <aside className="fixed left-0 top-0 h-full w-20 bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-md border-r border-slate-800 flex flex-col items-center py-6 z-50 hidden md:flex shadow-2xl">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-900/50 hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <Zap className="text-white" size={20} />
                </div>

                {/* Admin Panel Button - Only for Admins */}
                {user?.role === 'admin' && (
                    <button
                        onClick={() => setActiveTab('admin')}
                        className={`mb-4 p-3 rounded-xl transition-all group relative flex items-center justify-center duration-300 ${activeTab === 'admin' ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]' : 'bg-slate-800 text-purple-400 hover:text-white hover:bg-purple-600'}`}
                        title="Admin Panel"
                    >
                        <Shield size={20} />
                    </button>
                )}

                {/* Logout Button */}
                <button
                    onClick={logout}
                    className="mb-4 p-3 rounded-xl bg-slate-800 text-red-500 hover:text-white hover:bg-red-600 hover:scale-105 active:scale-95 transition-all border border-slate-700"
                    title="Log Out"
                >
                    <LogOut size={20} />
                </button>

                {/* Dark Mode Switch */}
                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="mb-8 p-3 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all border border-slate-700"
                    title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <nav className="flex-1 space-y-4 w-full flex flex-col items-center overflow-y-auto no-scrollbar pb-20">
                    <NavButton id="dashboard" icon={Layout} label="Dashboard" />
                    <NavButton id="tasks" icon={CheckCircle2} label="Task Command" badgeCount={urgentPendingCount} badgeColor="bg-red-500" />
                    <NavButton id="learning" icon={TrendingUp} label="Learning Hub" />
                    <NavButton id="content" icon={PenTool} label="Content Studio" />
                    <NavButton id="calendar" icon={Calendar} label="Calendar" />
                    <NavButton id="clients" icon={Users} label="Clients" />
                    <NavButton id="notepad" icon={Book} label="Note Pad" />
                    <NavButton id="stickies" icon={StickyNote} label="Sticky Wall" />
                    <NavButton id="email" icon={Mail} label="Inbox" badgeCount={unreadEmailCount} />
                </nav>

                <div className="mt-auto">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-emerald-400 border-2 border-slate-800 hover:rotate-12 transition-transform cursor-pointer"></div>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="md:pl-20 p-4 md:p-8 max-w-7xl mx-auto relative z-10 text-slate-800 dark:text-slate-100">

                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="animate-in slide-in-from-left-4 duration-500 fade-in">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
                            {activeTab === 'dashboard' ? "Good Morning, Skytronex." :
                                activeTab === 'tasks' ? "Task Command" :
                                    activeTab === 'learning' ? "Learning Hub" :
                                        activeTab === 'content' ? "Content Studio" :
                                            activeTab === 'calendar' ? "Schedule" :
                                                activeTab === 'clients' ? "Client CRM" :
                                                    activeTab === 'notepad' ? "Quick Notes" :
                                                        activeTab === 'stickies' ? "Sticky Wall" :
                                                            activeTab === 'admin' ? "Admin Panel" : "Inbox"}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Saturday, Dec 20 • <span className="text-blue-600 dark:text-blue-400 font-medium">4 High Priority Tasks</span></p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto animate-in slide-in-from-right-4 duration-500 fade-in">
                        <div className="relative group w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search leads, skills..."
                                className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm text-slate-800 dark:text-white placeholder:text-slate-400 backdrop-blur-sm"
                            />
                        </div>
                        <button
                            onClick={handleGlobalAdd}
                            className="bg-slate-900 dark:bg-blue-600 text-white p-2 rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-all shadow-sm hover:scale-105 active:scale-95"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                </header>

                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {activeTab === 'dashboard' && renderDashboard()}
                    {activeTab === 'tasks' && renderTasks()}
                    {activeTab === 'learning' && renderLearning()}
                    {activeTab === 'content' && renderContentCreation()}
                    {activeTab === 'email' && renderEmail()}
                    {activeTab === 'calendar' && renderCalendar()}
                    {activeTab === 'clients' && renderClients()}
                    {activeTab === 'notepad' && renderNotepad()}
                    {activeTab === 'stickies' && renderStickyNotes()}
                    {/* Admin Dashboard */}
                    {activeTab === 'admin' && user?.role === 'admin' && <AdminDashboard />}
                </div>

            </main>

            {/* MODALS */}
            {isTaskModalOpen && renderTaskModal()}
            {isClientModalOpen && renderClientModal()}
            {isSkillModalOpen && renderSkillModal()}
            {isEventModalOpen && renderEventModal()}
            {isEmailModalOpen && renderEmailModal()}
            {isResourceModalOpen && renderResourceModal()}



            <style>{`
        @keyframes loading {
          0% { width: 0%; margin-left: 0; }
          50% { width: 50%; }
          100% { width: 0%; margin-left: 100%; }
        }
        /* Custom scrollbar hiding */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </BackgroundGradientAnimation>
    );
}

const ProtectedApp = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-blue-400 font-bold animate-pulse">Initializing SkyTronex...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Login />;
    }

    return <Dashboard />;
};

export default function App() {
    return (
        <AuthProvider>
            <ProtectedApp />
        </AuthProvider>
    );
}
