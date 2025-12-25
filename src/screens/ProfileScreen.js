import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../theme/theme';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';

const ProfileScreen = ({ navigation }) => {
    const { user, logout } = useApp();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [locationEnabled, setLocationEnabled] = useState(true);

    const stats = [
        {
            id: '1',
            label: 'Jobs Completed',
            value: '24',
            icon: 'checkmark-circle',
            color: theme.colors.success,
            trend: '+12%',
        },
        {
            id: '2',
            label: 'Total Earnings',
            value: 'ETB 28,500',
            icon: 'cash',
            color: theme.colors.primary,
            trend: '+8%',
        },
        {
            id: '3',
            label: 'Rating',
            value: '4.8',
            icon: 'star',
            color: theme.colors.secondary,
            trend: '+0.2',
        },
        {
            id: '4',
            label: 'Response Time',
            value: '12 min',
            icon: 'time',
            color: theme.colors.blue,
            trend: '-3 min',
        },
    ];

    const menuSections = [
        {
            title: 'Account',
            items: [
                { id: '1', label: 'Account Management', icon: 'settings-outline', screen: 'AccountManagement' },
                { id: '2', label: 'Edit Profile', icon: 'person-outline', screen: 'EditProfile' },
                { id: '3', label: 'My Certificates', icon: 'document-text-outline', screen: 'Certificates' },
                { id: '4', label: 'Payment Methods', icon: 'card-outline', screen: 'PaymentMethods' },
                { id: '5', label: 'Addresses', icon: 'location-outline', screen: 'Addresses' },
            ],
        },
        {
            title: 'Preferences',
            items: [
                { id: '5', label: 'Notifications', icon: 'notifications-outline', toggle: true, value: notificationsEnabled, onToggle: setNotificationsEnabled },
                { id: '6', label: 'Location Services', icon: 'navigate-outline', toggle: true, value: locationEnabled, onToggle: setLocationEnabled },
                { id: '7', label: 'Language', icon: 'language-outline', value: 'English', screen: 'Language' },
                { id: '8', label: 'Theme', icon: 'color-palette-outline', value: 'Light', screen: 'Theme' },
            ],
        },
        {
            title: 'Support',
            items: [
                {
                    id: '9',
                    label: 'Help Center',
                    icon: 'help-circle-outline',
                    screen: 'Support',
                },
                {
                    id: '10',
                    label: 'Report a Problem',
                    icon: 'bug-outline',
                    screen: 'Support',
                },
                { id: '11', label: 'Terms of Service', icon: 'document-outline', screen: 'Terms' },
                { id: '12', label: 'Privacy Policy', icon: 'shield-checkmark-outline', screen: 'Privacy' },
            ],
        },
    ];

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        navigation.replace('ModeSelection');
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <LinearGradient
                    colors={[theme.colors.primary, theme.colors.primaryDark]}
                    style={styles.header}
                >
                    <View style={styles.profileSection}>
                        <View style={styles.avatarContainer}>
                            <LinearGradient
                                colors={[theme.colors.secondary, theme.colors.accent]}
                                style={styles.avatar}
                            >
                                <Text style={styles.avatarText}>
                                    {user?.fullName?.split(' ').map(n => n[0]).join('') || 'U'}
                                </Text>
                            </LinearGradient>
                            <TouchableOpacity style={styles.editAvatarButton}>
                                <Ionicons name="camera" size={16} color={theme.colors.white} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.userName}>{user?.fullName || 'User Name'}</Text>
                        <Text style={styles.userEmail}>{user?.email || user?.phoneNumber}</Text>

                        <View style={styles.badgeContainer}>
                            <View style={styles.badge}>
                                <Ionicons name="shield-checkmark" size={14} color={theme.colors.success} />
                                <Text style={styles.badgeText}>Verified</Text>
                            </View>
                            <View style={styles.badge}>
                                <Ionicons name="star" size={14} color={theme.colors.secondary} />
                                <Text style={styles.badgeText}>Top Rated</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

                {/* Stats Grid */}
                <View style={styles.statsContainer}>
                    {stats.map((stat) => (
                        <Card key={stat.id} style={styles.statCard}>
                            <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                                <Ionicons name={stat.icon} size={24} color={stat.color} />
                            </View>
                            <Text style={styles.statValue}>{stat.value}</Text>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                            <View style={styles.trendContainer}>
                                <Ionicons
                                    name={stat.trend.startsWith('+') ? 'trending-up' : 'trending-down'}
                                    size={12}
                                    color={stat.trend.startsWith('+') ? theme.colors.success : theme.colors.error}
                                />
                                <Text style={[
                                    styles.trendText,
                                    { color: stat.trend.startsWith('+') ? theme.colors.success : theme.colors.error }
                                ]}>
                                    {stat.trend}
                                </Text>
                            </View>
                        </Card>
                    ))}
                </View>

                {/* Menu Sections */}
                {menuSections.map((section, index) => (
                    <View key={index} style={styles.menuSection}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <Card style={styles.menuCard}>
                            {section.items.map((item, itemIndex) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.menuItem,
                                        itemIndex !== section.items.length - 1 && styles.menuItemBorder,
                                    ]}
                                    onPress={() => item.screen && navigation.navigate(item.screen, item.params)}
                                    disabled={item.toggle}
                                >
                                    <View style={styles.menuItemLeft}>
                                        <View style={styles.menuIconContainer}>
                                            <Ionicons name={item.icon} size={22} color={theme.colors.primary} />
                                        </View>
                                        <Text style={styles.menuItemLabel}>{item.label}</Text>
                                    </View>

                                    {item.toggle ? (
                                        <Switch
                                            value={item.value}
                                            onValueChange={item.onToggle}
                                            trackColor={{ false: theme.colors.gray300, true: theme.colors.primaryLight }}
                                            thumbColor={item.value ? theme.colors.primary : theme.colors.gray100}
                                        />
                                    ) : (
                                        <View style={styles.menuItemRight}>
                                            {item.value && (
                                                <Text style={styles.menuItemValue}>{item.value}</Text>
                                            )}
                                            <Ionicons name="chevron-forward" size={20} color={theme.colors.gray400} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </Card>
                    </View>
                ))}

                {/* Logout Button */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out-outline" size={22} color={theme.colors.error} />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                {/* App Version */}
                <Text style={styles.versionText}>Version 1.0.0</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        paddingTop: 60,
        paddingBottom: theme.spacing.xxl,
        borderBottomLeftRadius: theme.borderRadius.xxl,
        borderBottomRightRadius: theme.borderRadius.xxl,
        ...theme.shadow.lg,
    },
    backButton: {
        marginLeft: theme.spacing.lg,
        marginBottom: theme.spacing.md,
    },
    profileSection: {
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: theme.spacing.md,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: theme.colors.white,
        ...theme.shadow.xl,
    },
    avatarText: {
        fontSize: 36,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.white,
    },
    editAvatarButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: theme.colors.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: theme.colors.white,
    },
    userName: {
        fontSize: theme.fontSize.xxl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.white,
        marginBottom: theme.spacing.xs,
    },
    userEmail: {
        fontSize: theme.fontSize.md,
        color: theme.colors.white,
        opacity: 0.9,
        marginBottom: theme.spacing.md,
    },
    badgeContainer: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.round,
        gap: 4,
    },
    badgeText: {
        fontSize: theme.fontSize.xs,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.textPrimary,
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: theme.spacing.lg,
        gap: theme.spacing.md,
        marginTop: -theme.spacing.xxl,
    },
    statCard: {
        width: '48%',
        alignItems: 'center',
        padding: theme.spacing.md,
    },
    statIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.sm,
    },
    statValue: {
        fontSize: theme.fontSize.xl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.textPrimary,
        marginBottom: 2,
    },
    statLabel: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: theme.spacing.xs,
    },
    trendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    trendText: {
        fontSize: theme.fontSize.xs,
        fontWeight: theme.fontWeight.semibold,
    },
    menuSection: {
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.sm,
    },
    menuCard: {
        padding: 0,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing.md,
    },
    menuItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.primaryLight + '20',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.md,
    },
    menuItemLabel: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textPrimary,
        fontWeight: theme.fontWeight.medium,
    },
    menuItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
    },
    menuItemValue: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: theme.spacing.lg,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 2,
        borderColor: theme.colors.error,
        gap: theme.spacing.sm,
        marginBottom: theme.spacing.md,
    },
    logoutText: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.error,
    },
    versionText: {
        textAlign: 'center',
        fontSize: theme.fontSize.sm,
        color: theme.colors.gray400,
        marginBottom: theme.spacing.xl,
    },
});

export default ProfileScreen;
