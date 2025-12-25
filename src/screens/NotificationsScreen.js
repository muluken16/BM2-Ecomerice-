import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../theme/theme';
import Card from '../components/Card';

const NotificationsScreen = ({ navigation }) => {
    const [selectedFilter, setSelectedFilter] = useState('all');

    const filters = [
        { id: 'all', label: 'All', icon: 'apps-outline', count: 12 },
        { id: 'jobs', label: 'Jobs', icon: 'briefcase-outline', count: 5 },
        { id: 'messages', label: 'Messages', icon: 'chatbubble-outline', count: 4 },
        { id: 'updates', label: 'Updates', icon: 'information-circle-outline', count: 3 },
    ];

    const notifications = [
        {
            id: '1',
            type: 'jobs',
            title: 'New Job Request',
            message: 'You have a new job request for IT Support in Bole area',
            time: '5 min ago',
            icon: 'briefcase',
            iconBg: theme.colors.primary,
            unread: true,
        },
        {
            id: '2',
            type: 'messages',
            title: 'Message from Dawit',
            message: 'Thank you for the excellent service! The computer works perfectly now.',
            time: '15 min ago',
            icon: 'chatbubble',
            iconBg: theme.colors.blue,
            unread: true,
        },
        {
            id: '3',
            type: 'jobs',
            title: 'Job Completed',
            message: 'Your electrical repair job has been marked as completed',
            time: '1 hour ago',
            icon: 'checkmark-circle',
            iconBg: theme.colors.success,
            unread: true,
        },
        {
            id: '4',
            type: 'updates',
            title: 'Profile Update',
            message: 'Your profile has been verified successfully',
            time: '2 hours ago',
            icon: 'shield-checkmark',
            iconBg: theme.colors.secondary,
            unread: false,
        },
        {
            id: '5',
            type: 'jobs',
            title: 'Payment Received',
            message: 'You received ETB 1,200 for Computer Repair job',
            time: '3 hours ago',
            icon: 'cash',
            iconBg: theme.colors.accent,
            unread: false,
        },
        {
            id: '6',
            type: 'messages',
            title: 'New Review',
            message: 'Sarah left you a 5-star review! "Excellent work and very professional"',
            time: '5 hours ago',
            icon: 'star',
            iconBg: theme.colors.secondary,
            unread: false,
        },
        {
            id: '7',
            type: 'updates',
            title: 'App Update Available',
            message: 'Version 1.1.0 is now available with new features',
            time: '1 day ago',
            icon: 'download',
            iconBg: theme.colors.primary,
            unread: false,
        },
        {
            id: '8',
            type: 'jobs',
            title: 'Job Reminder',
            message: 'You have a scheduled job tomorrow at 10:00 AM',
            time: '1 day ago',
            icon: 'time',
            iconBg: theme.colors.warning,
            unread: false,
        },
    ];

    const filteredNotifications = selectedFilter === 'all'
        ? notifications
        : notifications.filter(n => n.type === selectedFilter);

    const renderNotification = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
                // Handle notification tap
                console.log('Notification tapped:', item.id);
            }}
        >
            <Card style={[styles.notificationCard, item.unread && styles.unreadCard]}>
                <View style={styles.notificationContent}>
                    <View style={[styles.iconContainer, { backgroundColor: item.iconBg + '20' }]}>
                        <Ionicons name={item.icon} size={24} color={item.iconBg} />
                    </View>

                    <View style={styles.textContainer}>
                        <View style={styles.titleRow}>
                            <Text style={styles.notificationTitle}>{item.title}</Text>
                            {item.unread && <View style={styles.unreadDot} />}
                        </View>
                        <Text style={styles.notificationMessage} numberOfLines={2}>
                            {item.message}
                        </Text>
                        <Text style={styles.notificationTime}>{item.time}</Text>
                    </View>

                    <TouchableOpacity style={styles.moreButton}>
                        <Ionicons name="ellipsis-vertical" size={20} color={theme.colors.gray400} />
                    </TouchableOpacity>
                </View>
            </Card>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryDark]}
                style={styles.header}
            >
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
                    </TouchableOpacity>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>🔔 Notifications</Text>
                        <Text style={styles.headerSubtitle}>
                            {notifications.filter(n => n.unread).length} unread
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.markAllButton}>
                        <Ionicons name="checkmark-done" size={24} color={theme.colors.white} />
                    </TouchableOpacity>
                </View>

                {/* Filters */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filtersContainer}
                >
                    {filters.map((filter) => (
                        <TouchableOpacity
                            key={filter.id}
                            onPress={() => setSelectedFilter(filter.id)}
                            style={[
                                styles.filterChip,
                                selectedFilter === filter.id && styles.filterChipActive,
                            ]}
                        >
                            <Ionicons
                                name={filter.icon}
                                size={18}
                                color={selectedFilter === filter.id ? theme.colors.white : theme.colors.white}
                                style={{ opacity: selectedFilter === filter.id ? 1 : 0.7 }}
                            />
                            <Text
                                style={[
                                    styles.filterText,
                                    selectedFilter === filter.id && styles.filterTextActive,
                                ]}
                            >
                                {filter.label}
                            </Text>
                            {filter.count > 0 && (
                                <View style={[
                                    styles.filterBadge,
                                    selectedFilter === filter.id && styles.filterBadgeActive,
                                ]}>
                                    <Text style={[
                                        styles.filterBadgeText,
                                        selectedFilter === filter.id && styles.filterBadgeTextActive,
                                    ]}>
                                        {filter.count}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </LinearGradient>

            {/* Notifications List */}
            <FlatList
                data={filteredNotifications}
                renderItem={renderNotification}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="notifications-off-outline" size={64} color={theme.colors.gray300} />
                        <Text style={styles.emptyText}>No notifications</Text>
                        <Text style={styles.emptySubtext}>You're all caught up!</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        paddingTop: 50,
        paddingBottom: theme.spacing.md,
        borderBottomLeftRadius: theme.borderRadius.xl,
        borderBottomRightRadius: theme.borderRadius.xl,
        ...theme.shadow.lg,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.md,
    },
    backButton: {
        marginRight: theme.spacing.md,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: theme.fontSize.xxl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.white,
    },
    headerSubtitle: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.white,
        opacity: 0.9,
        marginTop: 2,
    },
    markAllButton: {
        padding: theme.spacing.xs,
    },
    filtersContainer: {
        paddingHorizontal: theme.spacing.lg,
        gap: theme.spacing.sm,
    },
    filterChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.round,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        gap: theme.spacing.xs,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    filterChipActive: {
        backgroundColor: theme.colors.white,
    },
    filterText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.white,
        fontWeight: theme.fontWeight.semibold,
        opacity: 0.9,
    },
    filterTextActive: {
        color: theme.colors.primary,
        opacity: 1,
    },
    filterBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
        minWidth: 20,
        alignItems: 'center',
    },
    filterBadgeActive: {
        backgroundColor: theme.colors.primary,
    },
    filterBadgeText: {
        fontSize: 10,
        color: theme.colors.white,
        fontWeight: theme.fontWeight.bold,
    },
    filterBadgeTextActive: {
        color: theme.colors.white,
    },
    listContainer: {
        padding: theme.spacing.lg,
    },
    notificationCard: {
        marginBottom: theme.spacing.md,
        borderLeftWidth: 3,
        borderLeftColor: 'transparent',
    },
    unreadCard: {
        borderLeftColor: theme.colors.primary,
        backgroundColor: theme.colors.primaryLight + '10',
    },
    notificationContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.md,
    },
    textContainer: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.xs,
    },
    notificationTitle: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.textPrimary,
        flex: 1,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.primary,
        marginLeft: theme.spacing.xs,
    },
    notificationMessage: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        lineHeight: 20,
        marginBottom: theme.spacing.xs,
    },
    notificationTime: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.gray400,
    },
    moreButton: {
        padding: theme.spacing.xs,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.xxl * 2,
    },
    emptyText: {
        fontSize: theme.fontSize.xl,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.textPrimary,
        marginTop: theme.spacing.lg,
    },
    emptySubtext: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
});

export default NotificationsScreen;
