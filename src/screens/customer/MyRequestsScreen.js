import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme/theme';
import { useApp } from '../../context/AppContext';
import Card from '../../components/Card';

const MyRequestsScreen = ({ navigation }) => {
    const { requests } = useApp();
    const [filter, setFilter] = useState('All'); // All, Active, Completed

    const filteredRequests = requests.filter(req => {
        if (filter === 'All') return true;
        if (filter === 'Active') return ['Pending', 'In Progress', 'Assigned'].includes(req.status);
        if (filter === 'Completed') return req.status === 'Completed';
        return true;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return theme.colors.success;
            case 'In Progress': return theme.colors.primary;
            case 'Pending': return theme.colors.warning;
            case 'Cancelled': return theme.colors.error;
            default: return theme.colors.gray500;
        }
    };

    const renderRequestItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                if (item.status === 'Completed') {
                    // Navigate to details or rating
                } else {
                    navigation.navigate('JobStatus', { request: item });
                }
            }}
        >
            <Card style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.serviceInfo}>
                        <Text style={styles.serviceName}>{item.service}</Text>
                        <Text style={styles.categoryName}>{item.category}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '15' }]}>
                        <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                            {item.status}
                        </Text>
                    </View>
                </View>

                <Text style={styles.description} numberOfLines={2}>
                    {item.description}
                </Text>

                <View style={styles.footer}>
                    <View style={styles.footerItem}>
                        <Ionicons name="calendar-outline" size={16} color={theme.colors.textSecondary} />
                        <Text style={styles.footerText}>
                            {new Date(item.date).toLocaleDateString()}
                        </Text>
                    </View>
                    {item.price && (
                        <Text style={styles.priceText}>ETB {item.price}</Text>
                    )}
                </View>
            </Card>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Filter Tabs */}
            <View style={styles.tabs}>
                {['All', 'Active', 'Completed'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, filter === tab && styles.activeTab]}
                        onPress={() => setFilter(tab)}
                    >
                        <Text style={[styles.tabText, filter === tab && styles.activeTabText]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* List */}
            <FlatList
                data={filteredRequests}
                renderItem={renderRequestItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="document-text-outline" size={64} color={theme.colors.gray300} />
                        <Text style={styles.emptyText}>No requests found</Text>
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
    tabs: {
        flexDirection: 'row',
        padding: theme.spacing.md,
        backgroundColor: theme.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    tab: {
        flex: 1,
        paddingVertical: theme.spacing.sm,
        alignItems: 'center',
        borderRadius: theme.borderRadius.full,
    },
    activeTab: {
        backgroundColor: theme.colors.primary,
    },
    tabText: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
        fontWeight: theme.fontWeight.medium,
    },
    activeTabText: {
        color: theme.colors.white,
        fontWeight: theme.fontWeight.bold,
    },
    list: {
        padding: theme.spacing.md,
    },
    card: {
        marginBottom: theme.spacing.md,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.sm,
    },
    serviceName: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.textPrimary,
    },
    categoryName: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    statusBadge: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 4,
        borderRadius: theme.borderRadius.sm,
    },
    statusText: {
        fontSize: theme.fontSize.xs,
        fontWeight: theme.fontWeight.bold,
    },
    description: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.md,
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingTop: theme.spacing.sm,
    },
    footerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    footerText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    priceText: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.primary,
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

export default MyRequestsScreen;
