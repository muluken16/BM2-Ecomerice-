import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme/theme';

// Screens
import CustomerHomeScreen from '../screens/customer/CustomerHomeScreen';
import MyRequestsScreen from '../screens/customer/MyRequestsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const CustomerTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'MyRequests') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Notifications') {
                        iconName = focused ? 'notifications' : 'notifications-outline';
                    } else if (route.name === 'Account') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.gray400,
                tabBarStyle: {
                    backgroundColor: theme.colors.white,
                    borderTopWidth: 1,
                    borderTopColor: theme.colors.border,
                    paddingBottom: 8,
                    paddingTop: 8,
                    height: 65,
                    ...theme.shadow.md,
                },
                tabBarLabelStyle: {
                    fontSize: theme.fontSize.xs,
                    fontWeight: theme.fontWeight.semibold,
                    marginTop: -4,
                },
                headerShown: false,
            })}
        >
            <Tab.Screen
                name="Home"
                component={CustomerHomeScreen}
                options={{
                    tabBarLabel: 'Home',
                }}
            />
            <Tab.Screen
                name="MyRequests"
                component={MyRequestsScreen}
                options={{
                    tabBarLabel: 'Requests',
                    headerShown: true,
                    headerTitle: 'My Requests',
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    headerTintColor: theme.colors.white,
                    headerTitleStyle: {
                        fontWeight: theme.fontWeight.bold,
                    },
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{
                    tabBarLabel: 'Alerts',
                    headerShown: true,
                    headerTitle: 'Notifications',
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    headerTintColor: theme.colors.white,
                    headerTitleStyle: {
                        fontWeight: theme.fontWeight.bold,
                    },
                    tabBarBadge: 3, // You can make this dynamic based on unread notifications
                    tabBarBadgeStyle: {
                        backgroundColor: theme.colors.error,
                        color: theme.colors.white,
                        fontSize: 10,
                        minWidth: 18,
                        height: 18,
                        borderRadius: 9,
                    },
                }}
            />
            <Tab.Screen
                name="Account"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Account',
                    headerShown: true,
                    headerTitle: 'My Profile',
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    headerTintColor: theme.colors.white,
                    headerTitleStyle: {
                        fontWeight: theme.fontWeight.bold,
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export default CustomerTabNavigator;
