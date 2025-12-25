import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../theme/theme';
import Button from '../../components/Button';
import Card from '../../components/Card';

import { useApp } from '../../context/AppContext';

const JobStatusScreen = ({ navigation, route }) => {
    const { request } = route.params;
    const { updateRequestStatus } = useApp();

    // Initialize status from request, default to 'searching'
    const [status, setStatus] = useState(
        !request.status || request.status === 'Pending'
            ? 'searching'
            : request.status.toLowerCase()
    );
    const [technician, setTechnician] = useState(request.technician || null);

    useEffect(() => {
        // Simulate finding a technician if in searching/pending state
        if (status === 'searching' || status === 'pending') {
            const timer = setTimeout(() => {
                const assignedTech = {
                    id: 'tech1',
                    name: 'Dawit Abraham',
                    rating: 4.8,
                    jobs: 156,
                    image: null,
                    phone: '+251911234567',
                    location: { lat: 9.0, lng: 38.7 },
                    distance: '2.5 km',
                    eta: '15 mins',
                };
                setTechnician(assignedTech);
                setStatus('assigned');
                updateRequestStatus(request.id, 'Assigned');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleCall = () => {
        if (technician?.phone) {
            Linking.openURL(`tel:${technician.phone}`);
        }
    };

    const handleChat = () => {
        navigation.navigate('Chat', {
            recipient: technician,
            jobId: request.id || 'temp-id'
        });
    };

    const renderStatusStep = (stepStatus, label, icon, isLast = false) => {
        const isActive = status === stepStatus;
        const isPast =
            (status === 'assigned' && stepStatus === 'searching') ||
            (status === 'arrived' && ['searching', 'assigned'].includes(stepStatus)) ||
            (status === 'working' && ['searching', 'assigned', 'arrived'].includes(stepStatus)) ||
            (status === 'completed');

        let color = theme.colors.gray300;
        if (isActive) color = theme.colors.primary;
        if (isPast) color = theme.colors.success;

        return (
            <View style={styles.stepContainer}>
                <View style={styles.stepIconContainer}>
                    <View style={[styles.stepIcon, { backgroundColor: color }]}>
                        <Ionicons
                            name={isPast ? 'checkmark' : icon}
                            size={16}
                            color={theme.colors.white}
                        />
                    </View>
                    {!isLast && (
                        <View style={[styles.stepLine, { backgroundColor: isPast ? theme.colors.success : theme.colors.gray300 }]} />
                    )}
                </View>
                <View style={styles.stepContent}>
                    <Text style={[styles.stepLabel, isActive && styles.stepLabelActive]}>
                        {label}
                    </Text>
                    {isActive && (
                        <Text style={styles.stepSubLabel}>
                            {stepStatus === 'searching' ? 'Please wait...' : 'In progress'}
                        </Text>
                    )}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Map Placeholder */}
            <View style={styles.mapContainer}>
                <LinearGradient
                    colors={[theme.colors.gray200, theme.colors.gray300]}
                    style={styles.mapPlaceholder}
                >
                    <Ionicons name="map" size={48} color={theme.colors.gray400} />
                    <Text style={styles.mapText}>Map View</Text>
                </LinearGradient>
            </View>

            {/* Bottom Sheet Content */}
            <View style={styles.bottomSheet}>
                <View style={styles.dragHandle} />

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Status Header */}
                    <View style={styles.header}>
                        <Text style={styles.statusTitle}>
                            {status === 'searching' ? 'Finding Technician' :
                                status === 'assigned' ? 'Technician Assigned' :
                                    status === 'arrived' ? 'Technician Arrived' :
                                        status === 'working' ? 'Job In Progress' : 'Job Completed'}
                        </Text>
                        {status === 'searching' && <ActivityIndicator color={theme.colors.primary} />}
                    </View>

                    {/* Technician Card */}
                    {technician && (
                        <Card style={styles.technicianCard}>
                            <View style={styles.techHeader}>
                                <View style={styles.techAvatar}>
                                    <Text style={styles.techInitials}>
                                        {technician.name.split(' ').map(n => n[0]).join('')}
                                    </Text>
                                </View>
                                <View style={styles.techInfo}>
                                    <Text style={styles.techName}>{technician.name}</Text>
                                    <View style={styles.techRating}>
                                        <Ionicons name="star" size={16} color={theme.colors.secondary} />
                                        <Text style={styles.ratingText}>{technician.rating} ({technician.jobs} jobs)</Text>
                                    </View>
                                </View>
                                <View style={styles.etaContainer}>
                                    <Text style={styles.etaLabel}>ETA</Text>
                                    <Text style={styles.etaValue}>{technician.eta}</Text>
                                </View>
                            </View>

                            <View style={styles.actionButtons}>
                                <TouchableOpacity style={styles.actionButton} onPress={handleChat}>
                                    <View style={[styles.actionIcon, { backgroundColor: theme.colors.blue + '20' }]}>
                                        <Ionicons name="chatbubble" size={20} color={theme.colors.blue} />
                                    </View>
                                    <Text style={styles.actionText}>Chat</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
                                    <View style={[styles.actionIcon, { backgroundColor: theme.colors.success + '20' }]}>
                                        <Ionicons name="call" size={20} color={theme.colors.success} />
                                    </View>
                                    <Text style={styles.actionText}>Call</Text>
                                </TouchableOpacity>
                            </View>
                        </Card>
                    )}

                    {/* Timeline */}
                    <View style={styles.timeline}>
                        {renderStatusStep('searching', 'Request Received', 'document-text')}
                        {renderStatusStep('assigned', 'Technician Assigned', 'person')}
                        {renderStatusStep('arrived', 'Technician Arrived', 'location')}
                        {renderStatusStep('working', 'Job In Progress', 'hammer')}
                        {renderStatusStep('completed', 'Job Completed', 'checkmark-circle', true)}
                    </View>

                    {/* Job Details */}
                    <View style={styles.detailsSection}>
                        <Text style={styles.sectionTitle}>Job Details</Text>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Service</Text>
                            <Text style={styles.detailValue}>{request.category}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Description</Text>
                            <Text style={styles.detailValue}>{request.description}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Location</Text>
                            <Text style={styles.detailValue}>Current Location</Text>
                        </View>
                    </View>

                    {/* Cancel Button */}
                    {status !== 'completed' && (
                        <Button
                            title="Cancel Request"
                            variant="outline"
                            style={styles.cancelButton}
                            textStyle={{ color: theme.colors.error }}
                            onPress={() => navigation.goBack()}
                        />
                    )}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    mapContainer: {
        height: '40%',
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
    bottomSheet: {
        flex: 1,
        backgroundColor: theme.colors.white,
        borderTopLeftRadius: theme.borderRadius.xxl,
        borderTopRightRadius: theme.borderRadius.xxl,
        marginTop: -24,
        ...theme.shadow.xl,
    },
    dragHandle: {
        width: 40,
        height: 4,
        backgroundColor: theme.colors.gray300,
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: theme.spacing.sm,
        marginBottom: theme.spacing.sm,
    },
    content: {
        flex: 1,
        paddingHorizontal: theme.spacing.lg,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.lg,
        marginTop: theme.spacing.sm,
    },
    statusTitle: {
        fontSize: theme.fontSize.xl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.textPrimary,
    },
    technicianCard: {
        marginBottom: theme.spacing.xl,
        padding: theme.spacing.md,
    },
    techHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    techAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.md,
    },
    techInitials: {
        color: theme.colors.white,
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
    },
    techInfo: {
        flex: 1,
    },
    techName: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.textPrimary,
    },
    techRating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2,
    },
    ratingText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    etaContainer: {
        alignItems: 'flex-end',
    },
    etaLabel: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
    },
    etaValue: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.primary,
    },
    actionButtons: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingTop: theme.spacing.md,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.sm,
    },
    actionIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionText: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.textPrimary,
    },
    timeline: {
        marginBottom: theme.spacing.xl,
    },
    stepContainer: {
        flexDirection: 'row',
        minHeight: 40,
    },
    stepIconContainer: {
        alignItems: 'center',
        marginRight: theme.spacing.md,
        width: 24,
    },
    stepIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    stepLine: {
        width: 2,
        flex: 1,
        marginVertical: 4,
    },
    stepContent: {
        flex: 1,
        paddingBottom: theme.spacing.md,
    },
    stepLabel: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
        fontWeight: theme.fontWeight.medium,
    },
    stepLabelActive: {
        color: theme.colors.textPrimary,
        fontWeight: theme.fontWeight.bold,
    },
    stepSubLabel: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.primary,
        marginTop: 2,
    },
    detailsSection: {
        marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.md,
    },
    detailItem: {
        marginBottom: theme.spacing.sm,
    },
    detailLabel: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        marginBottom: 2,
    },
    detailValue: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textPrimary,
    },
    cancelButton: {
        borderColor: theme.colors.error,
        marginBottom: theme.spacing.xl,
    },
});

export default JobStatusScreen;
