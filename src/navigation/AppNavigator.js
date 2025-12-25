import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import theme from '../theme/theme';
import { useApp } from '../context/AppContext';

// Screens
import SplashScreen from '../screens/SplashScreen';
import ModeSelectionScreen from '../screens/ModeSelectionScreen';
import LoginScreen from '../screens/LoginScreen';
import CustomerHomeScreen from '../screens/customer/CustomerHomeScreen';
import TechnicianHomeScreen from '../screens/technician/TechnicianHomeScreen';
import CreateServiceRequestScreen from '../screens/customer/CreateServiceRequestScreen';
import CategoryDetailScreen from '../screens/customer/CategoryDetailScreen';
import RequestSubmittedScreen from '../screens/customer/RequestSubmittedScreen';
import JobStatusScreen from '../screens/customer/JobStatusScreen';
import ChatScreen from '../screens/ChatScreen';

import JobDetailScreen from '../screens/technician/JobDetailScreen';
import EarningsScreen from '../screens/technician/EarningsScreen';

import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import MyRequestsScreen from '../screens/customer/MyRequestsScreen';
import AccountManagementScreen from '../screens/AccountManagementScreen';
import SupportScreen from '../screens/SupportScreen';

// Tab Navigators
import CustomerTabNavigator from './CustomerTabNavigator';
import TechnicianTabNavigator from './TechnicianTabNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const { isAuthenticated, userMode, loading } = useApp();
    const [showSplash, setShowSplash] = React.useState(true);

    if (loading || showSplash) {
        return <SplashScreen onFinish={() => setShowSplash(false)} />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerTintColor: theme.colors.white,
                    headerTitleStyle: {
                        fontWeight: theme.fontWeight.bold,
                        fontSize: theme.fontSize.lg,
                    },
                    headerBackTitleVisible: false,
                }}
            >
                {!isAuthenticated ? (
                    <>
                        <Stack.Screen
                            name="ModeSelection"
                            component={ModeSelectionScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                ) : userMode === 'customer' ? (
                    <>
                        <Stack.Screen
                            name="CustomerTabs"
                            component={CustomerTabNavigator}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="CategoryDetail"
                            component={CategoryDetailScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="CreateServiceRequest"
                            component={CreateServiceRequestScreen}
                            options={{
                                title: 'Create Request',
                                headerShown: true,
                            }}
                        />
                        <Stack.Screen
                            name="RequestSubmitted"
                            component={RequestSubmittedScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="JobStatus"
                            component={JobStatusScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Chat"
                            component={ChatScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="AccountManagement"
                            component={AccountManagementScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Support"
                            component={SupportScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="TechnicianTabs"
                            component={TechnicianTabNavigator}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="JobDetail"
                            component={JobDetailScreen}
                            options={{
                                title: 'Job Details',
                                headerShown: true
                            }}
                        />
                        <Stack.Screen
                            name="Chat"
                            component={ChatScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="AccountManagement"
                            component={AccountManagementScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Support"
                            component={SupportScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
