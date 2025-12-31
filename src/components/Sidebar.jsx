
import {
    LayoutDashboard,
    CheckSquare,
    Mail,
    Calendar,
    Users,
    Settings,
    LogOut,
    BrainCircuit
} from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', active: true },
        { icon: CheckSquare, label: 'Tasks', badge: '5' },
        { icon: Mail, label: 'Inbox', badge: '2' },
        { icon: Calendar, label: 'Schedule' },
        { icon: Users, label: 'Clients' },
        { icon: BrainCircuit, label: 'Knowledge Base' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-20 lg:w-64 bg-slate-900 text-white flex flex-col transition-all duration-300 z-50">
            {/* Logo Area */}
            <div className="h-20 flex items-center justify-center lg:justify-start lg:px-8 border-b border-slate-800">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
                    <span className="font-bold text-xl">S</span>
                </div>
                <span className="ml-3 font-bold text-lg hidden lg:block tracking-wide">Skytronex</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-8 px-4 space-y-2">
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group
              ${item.active
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <item.icon size={22} className={`${item.active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                        <span className="ml-3 font-medium hidden lg:block">{item.label}</span>
                        {item.badge && (
                            <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full hidden lg:block">
                                {item.badge}
                            </span>
                        )}
                    </button>
                ))}
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-slate-800">
                <button className="w-full flex items-center p-3 rounded-xl hover:bg-slate-800 transition-colors text-slate-400 hover:text-white">
                    <Settings size={22} />
                    <span className="ml-3 font-medium hidden lg:block">Settings</span>
                </button>
                <button className="w-full flex items-center p-3 rounded-xl hover:bg-red-900/20 transition-colors text-slate-400 hover:text-red-400 mt-1">
                    <LogOut size={22} />
                    <span className="ml-3 font-medium hidden lg:block">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
