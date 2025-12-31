import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Database, Edit2, Save, X, Search, Users } from 'lucide-react';

export const AdminDashboard = () => {
    const { getAllUsers, updateUserSpace } = useAuth();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingUserId, setEditingUserId] = useState(null);
    const [editForm, setEditForm] = useState({ spaceLimit: '' });

    useEffect(() => {
        loadUsers();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const loadUsers = () => {
        setUsers(getAllUsers());
    };

    const handleEdit = (user) => {
        setEditingUserId(user.id);
        setEditForm({ spaceLimit: user.spaceLimit || '1GB' });
    };

    const handleSave = (userId) => {
        updateUserSpace(userId, editForm.spaceLimit);
        setEditingUserId(null);
        loadUsers(); // Refresh list
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 h-full overflow-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 flex items-center gap-3">
                        <Shield className="text-blue-500" size={32} />
                        Admin Command Center
                    </h1>
                    <p className="text-slate-400 mt-2">Manage user accounts and resource allocations.</p>
                </div>
                <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                            <Users size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase font-bold">Total Users</p>
                            <p className="text-xl font-bold text-white">{users.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="mb-6 relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                    type="text"
                    placeholder="Search users by name or email..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* User Table */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-900/50 text-xs uppercase text-slate-400 font-bold border-b border-slate-700">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Storage Quota</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="hover:bg-slate-800/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-bold text-white group-hover:text-blue-400 transition-colors">{user.name}</p>
                                        <p className="text-sm text-slate-500">{user.email}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-slate-700/50 text-slate-400 border border-slate-600'}`}>
                                        {user.role || 'user'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {editingUserId === user.id ? (
                                        <div className="flex items-center gap-2">
                                            <Database size={14} className="text-blue-500" />
                                            <input
                                                type="text"
                                                className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white w-24 focus:outline-none focus:border-blue-500"
                                                value={editForm.spaceLimit}
                                                onChange={(e) => setEditForm({ ...editForm, spaceLimit: e.target.value })}
                                                autoFocus
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <Database size={14} className="text-slate-500" />
                                            {user.spaceLimit || '1GB'}
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {editingUserId === user.id ? (
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => setEditingUserId(null)}
                                                className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                                                title="Cancel"
                                            >
                                                <X size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleSave(user.id)}
                                                className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white shadow-lg shadow-blue-500/20 transition-all"
                                                title="Save Changes"
                                            >
                                                <Save size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="p-2 hover:bg-slate-700 rounded-lg text-slate-500 hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100"
                                            title="Edit Quota"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <div className="p-8 text-center text-slate-500">
                        No users found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};
