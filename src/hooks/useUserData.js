import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export const useUserData = (key, initialValue) => {
    const { user } = useAuth();
    // Prefix key with user ID if user exists, else 'guest'
    const userKey = user ? `skytronex_${user.id}_${key}` : `skytronex_guest_${key}`;

    const [data, setData] = useState(() => {
        try {
            const item = localStorage.getItem(userKey);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading ${userKey} from localStorage`, error);
            return initialValue;
        }
    });

    useEffect(() => {
        // When user changes, or key changes, reload data
        // This handles switching users
        try {
            const item = localStorage.getItem(userKey);
            if (item) {
                setData(JSON.parse(item));
            } else {
                setData(initialValue);
            }
        } catch (error) {
            console.error(`Error reloading ${userKey}`, error);
        }
    }, [user, userKey]); // eslint-disable-line react-hooks/exhaustive-deps

    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(data) : value;

            setData(valueToStore);
            localStorage.setItem(userKey, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error saving ${userKey} to localStorage`, error);
        }
    };

    return [data, setValue];
};
