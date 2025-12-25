import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

// --- MOCK DATA ---
const MOCK_REQUESTS = [
    {
        id: 'req_1',
        category: 'IT Support',
        service: 'Laptop Repair',
        description: 'Screen is flickering and sometimes goes black.',
        status: 'Completed',
        date: '2025-11-25T14:30:00.000Z',
        technician: { name: 'Dawit Abraham', phone: '+251911000000' },
        price: 1500,
        rating: 5,
        location: { latitude: 9.0, longitude: 38.7 },
        preferredTime: 'Afternoon',
    },
    {
        id: 'req_2',
        category: 'Plumbing',
        service: 'Leak Fix',
        description: 'Kitchen sink pipe is leaking water.',
        status: 'In Progress',
        date: '2025-11-28T09:00:00.000Z',
        technician: { name: 'Samuel Tadesse', phone: '+251922000000' },
        price: 800,
        location: { latitude: 9.01, longitude: 38.75 },
        preferredTime: 'Morning',
    },
    {
        id: 'req_3',
        category: 'Electrical',
        service: 'Wiring Check',
        description: 'Living room sockets not working.',
        status: 'Pending',
        date: '2025-11-28T10:30:00.000Z',
        technician: null,
        price: null,
        location: { latitude: 9.02, longitude: 38.74 },
        preferredTime: 'Now',
    },
];

const MOCK_NOTIFICATIONS = [
    {
        id: 'notif_1',
        title: 'Welcome to ሙያPro',
        message: 'Find the best technicians in town!',
        type: 'info',
        timestamp: new Date(Date.now() - 86400000),
        read: true,
    },
    {
        id: 'notif_2',
        title: 'Technician Assigned',
        message: 'Samuel Tadesse has accepted your plumbing request.',
        type: 'success',
        timestamp: new Date(Date.now() - 3600000),
        read: false,
    },
];

export const AppProvider = ({ children }) => {
    const [userMode, setUserMode] = useState(null); // 'customer' or 'technician'
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Data States
    const [requests, setRequests] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [activeJobs, setActiveJobs] = useState([]); // For technicians
    const [chats, setChats] = useState({
        'job_1': [ // Chat for a specific job
            {
                id: '1',
                text: 'Hello! I have accepted your request.',
                sender: 'technician',
                timestamp: new Date(Date.now() - 3600000).toISOString(),
            },
            {
                id: '2',
                text: 'Great! When can you arrive?',
                sender: 'customer',
                timestamp: new Date(Date.now() - 3500000).toISOString(),
            },
        ],
        'support': [ // Customer Support Chat
            {
                id: '1',
                text: 'Welcome to MuyaPro Support! How can we help you today?',
                sender: 'support',
                timestamp: new Date(Date.now() - 86400000).toISOString(),
            }
        ]
    });

    // Load saved data on mount
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            // Load User & Mode
            const savedMode = await AsyncStorage.getItem('userMode');
            const savedUser = await AsyncStorage.getItem('user');

            if (savedMode) setUserMode(savedMode);
            if (savedUser) {
                setUser(JSON.parse(savedUser));
                setIsAuthenticated(true);
            }

            // Load Requests (or set mock data if empty)
            const savedRequests = await AsyncStorage.getItem('requests');
            if (savedRequests) {
                setRequests(JSON.parse(savedRequests));
            } else {
                setRequests(MOCK_REQUESTS);
                await AsyncStorage.setItem('requests', JSON.stringify(MOCK_REQUESTS));
            }

            // Load Notifications
            const savedNotifs = await AsyncStorage.getItem('notifications');
            if (savedNotifs) {
                setNotifications(JSON.parse(savedNotifs));
            } else {
                setNotifications(MOCK_NOTIFICATIONS);
                await AsyncStorage.setItem('notifications', JSON.stringify(MOCK_NOTIFICATIONS));
            }

        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    // --- Actions ---

    const switchMode = async (mode) => {
        try {
            await AsyncStorage.setItem('userMode', mode);
            setUserMode(mode);
        } catch (error) {
            console.error('Error switching mode:', error);
        }
    };

    const login = async (userData) => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const updateUser = async (updatedData) => {
        try {
            const updatedUser = { ...user, ...updatedData };
            await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    };

    const addRequest = async (newRequest) => {
        try {
            const updatedRequests = [newRequest, ...requests];
            setRequests(updatedRequests);
            await AsyncStorage.setItem('requests', JSON.stringify(updatedRequests));

            // Add a notification as well
            addNotification({
                title: 'Request Submitted',
                message: `Your request for ${newRequest.service} has been received.`,
                type: 'info',
            });
        } catch (error) {
            console.error('Error adding request:', error);
        }
    };

    const updateRequestStatus = async (requestId, status) => {
        try {
            const updatedRequests = requests.map(req =>
                req.id === requestId ? { ...req, status } : req
            );
            setRequests(updatedRequests);
            await AsyncStorage.setItem('requests', JSON.stringify(updatedRequests));
        } catch (error) {
            console.error('Error updating request:', error);
        }
    };

    const addNotification = async (notification) => {
        try {
            const newNotif = {
                id: Date.now().toString(),
                timestamp: new Date(),
                read: false,
                ...notification
            };
            const updatedNotifs = [newNotif, ...notifications];
            setNotifications(updatedNotifs);
            await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifs));
        } catch (error) {
            console.error('Error adding notification:', error);
        }
    };

    const clearNotification = async (id) => {
        try {
            const updatedNotifs = notifications.filter(n => n.id !== id);
            setNotifications(updatedNotifs);
            await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifs));
        } catch (error) {
            console.error('Error clearing notification:', error);
        }
    };

    const markAllNotificationsRead = async () => {
        try {
            const updatedNotifs = notifications.map(n => ({ ...n, read: true }));
            setNotifications(updatedNotifs);
            await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifs));
        } catch (error) {
            console.error('Error marking notifications read:', error);
        }
    };

    const sendMessage = async (channelId, message) => {
        try {
            const newMessage = {
                id: Date.now().toString(),
                text: message,
                sender: userMode === 'customer' ? 'customer' : 'technician',
                timestamp: new Date().toISOString(),
            };

            const updatedChats = {
                ...chats,
                [channelId]: [...(chats[channelId] || []), newMessage]
            };

            setChats(updatedChats);
            // In a real app, you would save this to AsyncStorage or backend
            // await AsyncStorage.setItem('chats', JSON.stringify(updatedChats));

            // Simulate auto-reply for support
            if (channelId === 'support') {
                setTimeout(() => {
                    const reply = {
                        id: (Date.now() + 1).toString(),
                        text: "Thank you for your message. A support agent will get back to you shortly.",
                        sender: 'support',
                        timestamp: new Date().toISOString(),
                    };
                    setChats(prev => ({
                        ...prev,
                        [channelId]: [...(prev[channelId] || []), reply]
                    }));
                }, 1000);
            }

        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const value = {
        userMode,
        setUserMode: switchMode,
        user,
        setUser,
        isAuthenticated,
        login,
        logout,
        updateUser,
        loading,

        // Data
        requests,
        addRequest,
        updateRequestStatus,

        notifications,
        addNotification,
        clearNotification,
        markAllNotificationsRead,

        activeJobs,
        setActiveJobs,

        chats,
        sendMessage,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
