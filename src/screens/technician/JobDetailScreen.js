// JobDetailScreen.js – fully rebuilt to fix JSX errors and object rendering
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../theme/theme';
import Button from '../../components/Button';
import Card from '../../components/Card';

const JobDetailScreen = ({ navigation, route }) => {
    const { job } = route.params;

    const handleAccept = () => {
        Alert.alert(
            'Accept Job',
            'Are you sure you want to accept this job?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Accept',
                    onPress: () => {
                        // TODO: update job status or navigate to active job view
                        navigation.goBack();
                    },
                },
            ]
        );
    };

    const handleDecline = () => {
        Alert.alert(
            'Decline Job',
            'Are you sure you want to decline this job?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Decline', style: 'destructive', onPress: () => navigation.goBack() },
            ]
        );
    };

    // Helper to render location safely as a string
    const renderLocation = () => {
        if (typeof job.location === 'object' && job.location !== null) {
            const { latitude, longitude } = job.location;
            return `${latitude}, ${longitude}`;
        }
        return String(job.location);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Map placeholder */}
                <View style={styles.mapContainer}>
                    <LinearGradient
                        colors={[theme.colors.gray200, theme.colors.gray300]}
                        style={styles.mapPlaceholder}
                    >
                        <Ionicons name="map" size={48} color={theme.colors.gray400} />
                        <Text style={styles.mapText}>Location Map View</Text>
                    </LinearGradient>
                </View>

                {/* Details section */}
                <View style={styles.detailsContainer}>
                    {/* Customer info */}
                    <View style={styles.header}>
                        <View style={styles.customerInfo}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>
                                    {job.customer ? job.customer.split(' ').map(n => n[0]).join('') : '?'}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.customerName}>
                                    {job.customer || 'Unknown Customer'}
                                </Text>
                                <View style={styles.ratingContainer}>
                                    <Ionicons name="star" size={16} color={theme.colors.secondary} />
                                    <Text style={styles.ratingText}>4.8 (12 reviews)</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.priceTag}>
                            <Text style={styles.priceLabel}>Est. Earnings</Text>
                            <Text style={styles.priceValue}>ETB {job.estimatedPrice}</Text>
                        </View>
                    </View>

                    {/* Job info card */}
                    <Card style={styles.card}>
                        <Text style={styles.sectionTitle}>Job Details</Text>

                        <View style={styles.detailRow}>
                            <Ionicons name="construct" size={20} color={theme.colors.primary} />
                            <View style={styles.detailContent}>
                                <Text style={styles.detailLabel}>Service</Text>
                                <Text style={styles.detailValue}>{job.service}</Text>
                            </View>
                        </View>

                        <View style={styles.detailRow}>
                            <Ionicons name="document-text" size={20} color={theme.colors.primary} />
                            <View style={styles.detailContent}>
                                <Text style={styles.detailLabel}>Description</Text>
                                <Text style={styles.detailValue}>{job.description}</Text>
                            </View>
                        </View>

                        <View style={styles.detailRow}>
                            <Ionicons name="time" size={20} color={theme.colors.primary} />
                            <View style={styles.detailContent}>
                                <Text style={styles.detailLabel}>Preferred Time</Text>
                                <Text style={styles.detailValue}>{job.preferredTime}</Text>
                            </View>
                        </View>

                        <View style={styles.detailRow}>
                            <Ionicons name="location" size={20} color={theme.colors.primary} />
                            <View style={styles.detailContent}>
                                <Text style={styles.detailLabel}>Location</Text>
                                <Text style={styles.detailValue}>{renderLocation()}</Text>
                                <Text style={styles.distanceText}>{job.distance} away</Text>
                            </View>
                        </View>
                    </Card>

                    {/* Photos section */}
                    <Text style={styles.sectionTitle}>Photos</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosScroll}>
                        {[1, 2, 3].map(i => (
                            <View key={i} style={styles.photoPlaceholder}>
                                <Ionicons name="image" size={32} color={theme.colors.gray400} />
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Action buttons */}
                <View style={styles.footer}>
                    <Button
                        title="Decline"
                        variant="outline"
                        style={styles.declineButton}
                        textStyle={{ color: theme.colors.error }}
                        onPress={handleDecline}
                    />
                    <Button
                        title="Accept Job"
                        style={styles.acceptButton}
                        gradientColors={[theme.colors.primary, theme.colors.primaryDark]}
                        onPress={handleAccept}
                    />
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
    },
    mapContainer: {
        height: 200,
        width: '100%',
    },
    mapPlaceholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapText: {
        marginTop: theme.spacing.sm,
        color: theme.colors.gray500,
        fontWeight: theme.fontWeight.medium,
    },
    detailsContainer: {
        padding: theme.spacing.lg,
        marginTop: -20,
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: theme.borderRadius.xl,
        borderTopRightRadius: theme.borderRadius.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },
    customerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: theme.colors.white,
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
    },
    customerName: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.textPrimary,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    priceTag: {
        alignItems: 'flex-end',
    },
    priceLabel: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
    },
    priceValue: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.success,
    },
    card: {
        marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.md,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.md,
        gap: theme.spacing.md,
    },
    detailContent: {
        flex: 1,
    },
    detailLabel: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
        marginBottom: 2,
    },
    detailValue: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textPrimary,
        lineHeight: 20,
    },
    distanceText: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.primary,
        marginTop: 2,
        fontWeight: theme.fontWeight.medium,
    },
    photosScroll: {
        marginBottom: theme.spacing.xl,
    },
    photoPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: theme.colors.gray200,
        borderRadius: theme.borderRadius.md,
        marginRight: theme.spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        flexDirection: 'row',
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.white,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        gap: theme.spacing.md,
    },
    declineButton: {
        flex: 1,
        borderColor: theme.colors.error,
    },
    acceptButton: {
        flex: 2,
    },
});

export default JobDetailScreen;
