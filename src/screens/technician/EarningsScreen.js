import React from 'react';
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
import theme from '../../theme/theme';
import Card from '../../components/Card';
import Button from '../../components/Button';

const EarningsScreen = ({ navigation }) => {
    const earnings = {
        balance: 4500.00,
        totalEarned: 12450.00,
        pendingPayout: 0,
        lastPayout: '2025-11-25',
    };

    const transactions = [
        {
            id: '1',
            type: 'job',
            title: 'Job #1234 - Computer Repair',
            amount: 800,
            date: '2025-11-28',
            status: 'completed',
        },
        {
            id: '2',
            type: 'payout',
            title: 'Weekly Payout',
            amount: -2500,
            date: '2025-11-25',
            status: 'processed',
        },
        {
            id: '3',
            type: 'job',
            title: 'Job #1230 - Network Setup',
            amount: 1200,
            date: '2025-11-24',
            status: 'completed',
        },
    ];

    const renderTransaction = ({ item }) => (
        <View style={styles.transactionItem}>
            <View style={[
                styles.iconContainer,
                item.type === 'payout' ? styles.payoutIcon : styles.jobIcon
            ]}>
                <Ionicons
                    name={item.type === 'payout' ? 'cash' : 'construct'}
                    size={20}
                    color={item.type === 'payout' ? theme.colors.secondary : theme.colors.primary}
                />
            </View>
            <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>{item.title}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
            </View>
            <Text style={[
                styles.transactionAmount,
                item.type === 'payout' ? styles.amountNegative : styles.amountPositive
            ]}>
                {item.type === 'payout' ? '-' : '+'} ETB {Math.abs(item.amount)}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                {/* Balance Card */}
                <LinearGradient
                    colors={[theme.colors.primary, theme.colors.primaryDark]}
                    style={styles.balanceCard}
                >
                    <Text style={styles.balanceLabel}>Available Balance</Text>
                    <Text style={styles.balanceAmount}>ETB {earnings.balance.toFixed(2)}</Text>

                    <View style={styles.balanceStats}>
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Total Earned</Text>
                            <Text style={styles.statValue}>ETB {earnings.totalEarned}</Text>
                        </View>
                        <View style={styles.verticalDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Last Payout</Text>
                            <Text style={styles.statValue}>{earnings.lastPayout}</Text>
                        </View>
                    </View>

                    <Button
                        title="Request Payout"
                        variant="secondary"
                        style={styles.payoutButton}
                        textStyle={{ color: theme.colors.textPrimary }}
                        onPress={() => { }}
                    />
                </LinearGradient>

                {/* Recent Transactions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Transactions</Text>
                    <Card style={styles.transactionsCard}>
                        <FlatList
                            data={transactions}
                            renderItem={renderTransaction}
                            keyExtractor={item => item.id}
                            scrollEnabled={false}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />
                    </Card>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        flex: 1,
        padding: theme.spacing.lg,
    },
    balanceCard: {
        padding: theme.spacing.xl,
        borderRadius: theme.borderRadius.xl,
        marginBottom: theme.spacing.xl,
        ...theme.shadow.lg,
    },
    balanceLabel: {
        fontSize: theme.fontSize.md,
        color: theme.colors.white,
        opacity: 0.9,
        marginBottom: theme.spacing.xs,
    },
    balanceAmount: {
        fontSize: 36,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.white,
        marginBottom: theme.spacing.lg,
    },
    balanceStats: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.lg,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    verticalDivider: {
        width: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    statLabel: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.white,
        opacity: 0.8,
        marginBottom: 4,
    },
    statValue: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.white,
    },
    payoutButton: {
        width: '100%',
    },
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.md,
    },
    transactionsCard: {
        padding: 0,
        overflow: 'hidden',
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.md,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.md,
    },
    jobIcon: {
        backgroundColor: theme.colors.primary + '15',
    },
    payoutIcon: {
        backgroundColor: theme.colors.secondary + '15',
    },
    transactionInfo: {
        flex: 1,
    },
    transactionTitle: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.textPrimary,
        marginBottom: 2,
    },
    transactionDate: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
    },
    transactionAmount: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
    },
    amountPositive: {
        color: theme.colors.success,
    },
    amountNegative: {
        color: theme.colors.textPrimary,
    },
    separator: {
        height: 1,
        backgroundColor: theme.colors.border,
    },
});

export default EarningsScreen;
