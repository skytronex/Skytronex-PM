import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for active session
        const storedUser = localStorage.getItem('skytronex_current_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            // Simulate API delay
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('skytronex_users') || '[]');
                const foundUser = users.find(u => u.email === email && u.password === password);

                if (foundUser) {
                    const userObj = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
                    setUser(userObj);
                    localStorage.setItem('skytronex_current_user', JSON.stringify(userObj));
                    resolve(userObj);
                } else {
                    reject(new Error('Invalid email or password'));
                }
            }, 500);
        });
    };

    const register = (name, email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('skytronex_users') || '[]');
                if (users.find(u => u.email === email)) {
                    reject(new Error('User already exists'));
                    return;
                }

                // Check for admin
                const role = email === 'admin@skytronex.com' ? 'admin' : 'user';

                const newUser = {
                    id: Date.now().toString(),
                    name,
                    email,
                    password,
                    role: role,
                    spaceLimit: '1GB' // Default Quota
                };
                users.push(newUser);
                localStorage.setItem('skytronex_users', JSON.stringify(users));

                // Auto login after register
                const userObj = { ...newUser };
                delete userObj.password; // Don't keep password in user object state

                setUser(userObj);
                localStorage.setItem('skytronex_current_user', JSON.stringify(userObj));
                resolve(userObj);
            }, 500);
        });
    };

    const getAllUsers = () => {
        return JSON.parse(localStorage.getItem('skytronex_users') || '[]').map(u => {
            // eslint-disable-next-line no-unused-vars
            const { password, ...rest } = u; // Exclude password
            return rest;
        });
    };

    const updateUserSpace = (userId, newLimit) => {
        const users = JSON.parse(localStorage.getItem('skytronex_users') || '[]');
        const updatedUsers = users.map(u => u.id === userId ? { ...u, spaceLimit: newLimit } : u);
        localStorage.setItem('skytronex_users', JSON.stringify(updatedUsers));
        return true;
    };

    const resetPassword = (email) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Determine if user exists? For security usually we don't reveal, but for mock:
                resolve({ success: true, message: `Password reset link sent to ${email}` });
            }, 800);
        });
    };

    const loginWithGoogle = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const userObj = {
                    id: 'google_' + Date.now(),
                    name: 'Google User',
                    email: 'user@gmail.com',
                    avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c' // Mock avatar
                };
                setUser(userObj);
                localStorage.setItem('skytronex_current_user', JSON.stringify(userObj));
                resolve(userObj);
            }, 1500);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('skytronex_current_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, resetPassword, loginWithGoogle, getAllUsers, updateUserSpace, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
