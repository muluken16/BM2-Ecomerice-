import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../theme/theme';
import { useApp } from '../../context/AppContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import FloatingSupportButton from '../../components/FloatingSupportButton';

const TechnicianHomeScreen = ({ navigation }) => {
    const { user, requests } = useApp(); // Use requests from context
    const [activeTab, setActiveTab] = useState('New'); // New, Active, Completed

    // Filter requests for technician view
    // In a real app, this would filter by technician ID or available jobs
    // For demo, we show 'Pending' as New, and others as Active/Completed
    const newJobs = requests.filter(r => r.status === 'Pending');
    const activeJobs = requests.filter(r => ['In Progress', 'Assigned'].includes(r.status));
    const completedJobs = requests.filter(r => r.status === 'Completed');

    const stats = {
        totalEarnings: 12450,
        completedJobs: completedJobs.length + 45, // Mock + real
        rating: 4.8,
    };

    const getJobsForTab = () => {
        switch (activeTab) {
            case 'New': return newJobs;
            case 'Active': return activeJobs;
            case 'Completed': return completedJobs;
            default: return [];
        }
    };

    const renderJobCard = ({ item }) => (
        <Card
            style={styles.jobCard}
            onPress={() => navigation.navigate('JobDetail', { job: item })}
        >
            <View style={styles.jobHeader}>
                <View style={styles.serviceInfo}>
                    <Text style={styles.serviceTitle}>{item.service}</Text>
                    <Text style={styles.customerName}>{item.category}</Text>
                </View>
                <View style={styles.priceTag}>
                    <Text style={styles.priceText}>ETB {item.price || 'Est.'}</Text>
                </View>
            </View>

            <Text style={styles.description} numberOfLines={2}>{item.description}</Text>

            <View style={styles.jobDetails}>
                <View style={styles.detailItem}>
                    <Ionicons name="location" size={16} color={theme.colors.gray400} />
                    <Text style={styles.detailText}>2.5 km away</Text>
                </View>
                <View style={styles.detailItem}>
                    <Ionicons name="time" size={16} color={theme.colors.gray400} />
                    <Text style={styles.detailText}>{item.preferredTime || 'ASAP'}</Text>
                </View>
            </View>

            {activeTab === 'New' && (
                <View style={styles.actionButtons}>
                    <Button
                        title="Decline"
                        variant="outline"
                        size="small"
                        style={styles.actionButton}
                        textStyle={{ color: theme.colors.error }}
                        onPress={() => { }}
                    />
                    <Button
                        title="Accept"
                        size="small"
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('JobDetail', { job: item })}
                    />
                </View>
            )}

            {activeTab === 'Active' && (
                <Button
                    title="Update Status"
                    variant="outline"
                    size="small"
                    style={{ marginTop: theme.spacing.md }}
                    onPress={() => navigation.navigate('JobDetail', { job: item })}
                />
            )}
        </Card>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryDark]}
                style={styles.header}
            >
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.greeting}>Hello, {user?.fullName?.split(' ')[0] || 'Technician'}!</Text>
                        <Text style={styles.headerSubtitle}>Ready to take on new jobs?</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.notificationButton}
                        onPress={() => navigation.navigate('Notifications')}
                    >
                        <Ionicons name="notifications" size={24} color={theme.colors.white} />
                        <View style={styles.notificationBadge}>
                            <Text style={styles.notificationBadgeText}>2</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>ETB {stats.totalEarnings.toLocaleString()}</Text>
                        <Text style={styles.statLabel}>Total Earnings</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{stats.completedJobs}</Text>
                        <Text style={styles.statLabel}>Jobs Done</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={20} color={theme.colors.secondary} />
                            <Text style={styles.statValue}>{stats.rating}</Text>
                        </View>
                        <Text style={styles.statLabel}>Rating</Text>
                    </View>
                </View>
            </LinearGradient>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                {[
                    { id: 'New', label: 'New Jobs', count: newJobs.length },
                    { id: 'Active', label: 'Active', count: activeJobs.length },
                    { id: 'Completed', label: 'Completed', count: completedJobs.length },
                ].map((tab) => (
                    <TouchableOpacity
                        key={tab.id}
                        style={[styles.tab, activeTab === tab.id && styles.tabActive]}
                        onPress={() => setActiveTab(tab.id)}
                    >
                        <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>
                            {tab.label}
                        </Text>
                        {tab.count > 0 && (
                            <View style={[styles.badge, activeTab === tab.id && styles.badgeActive]}>
                                <Text style={[styles.badgeText, activeTab === tab.id && styles.badgeTextActive]}>
                                    {tab.count}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            {/* Job List */}
            <FlatList
                data={getJobsForTab()}
                renderItem={renderJobCard}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="briefcase-outline" size={64} color={theme.colors.gray300} />
                        <Text style={styles.emptyText}>No {activeTab.toLowerCase()} jobs found</Text>
                    </View>
                }
            />

            <FloatingSupportButton />
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
        paddingBottom: theme.spacing.xl,
        paddingHorizontal: theme.spacing.lg,
        borderBottomLeftRadius: theme.borderRadius.xl,
        borderBottomRightRadius: theme.borderRadius.xl,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.lg,
    },
    greeting: {
        fontSize: theme.fontSize.heading,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.white,
    },
    headerSubtitle: {
        fontSize: theme.fontSize.md,
        color: theme.colors.white,
        opacity: 0.9,
        marginTop: theme.spacing.xs,
    },
    notificationButton: {
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: theme.colors.accent,
        borderRadius: theme.borderRadius.round,
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationBadgeText: {
        color: theme.colors.white,
        fontSize: 10,
        fontWeight: theme.fontWeight.bold,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statDivider: {
        width: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    statValue: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.white,
    },
    statLabel: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.white,
        opacity: 0.9,
        marginTop: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    tabsContainer: {
        flexDirection: 'row',
        padding: theme.spacing.md,
        backgroundColor: theme.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.full,
        gap: 6,
    },
    tabActive: {
        backgroundColor: theme.colors.primary,
    },
    tabText: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
        fontWeight: theme.fontWeight.medium,
    },
    tabTextActive: {
        color: theme.colors.white,
        fontWeight: theme.fontWeight.bold,
    },
    badge: {
        backgroundColor: theme.colors.gray200,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
    },
    badgeActive: {
        backgroundColor: theme.colors.white,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: theme.colors.textSecondary,
    },
    badgeTextActive: {
        color: theme.colors.primary,
    },
    listContent: {
        padding: theme.spacing.md,
    },
    jobCard: {
        marginBottom: theme.spacing.md,
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.sm,
    },
    serviceTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.textPrimary,
    },
    customerName: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    priceTag: {
        backgroundColor: theme.colors.success + '15',
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 4,
        borderRadius: theme.borderRadius.sm,
    },
    priceText: {
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.success,
    },
    description: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.md,
        lineHeight: 20,
    },
    jobDetails: {
        flexDirection: 'row',
        gap: theme.spacing.lg,
        marginBottom: theme.spacing.md,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    detailText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingTop: theme.spacing.md,
    },
    actionButton: {
        flex: 1,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
    },
    emptyText: {
        marginTop: theme.spacing.md,
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
    },
});

export default TechnicianHomeScreen;
