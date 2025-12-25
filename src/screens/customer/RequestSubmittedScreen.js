import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme/theme';
import Button from '../../components/Button';

const RequestSubmittedScreen = ({ navigation, route }) => {
    const { request } = route.params;
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Animated.View
                    style={[
                        styles.iconContainer,
                        { transform: [{ scale: scaleAnim }] },
                    ]}
                >
                    <Ionicons name="checkmark" size={64} color={theme.colors.white} />
                </Animated.View>

                <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
                    <Text style={styles.title}>Request Submitted!</Text>
                    <Text style={styles.message}>
                        Your request for {request.category} has been received. We are finding the best technician for you.
                    </Text>

                    <View style={styles.detailsContainer}>
                        <View style={styles.detailRow}>
                            <Ionicons name="time-outline" size={20} color={theme.colors.primary} />
                            <Text style={styles.detailText}>
                                Preferred Time: <Text style={styles.detailValue}>{request.preferredTime === 'now' ? 'Immediately' : request.preferredTime}</Text>
                            </Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Ionicons name="location-outline" size={20} color={theme.colors.primary} />
                            <Text style={styles.detailText}>Location detected</Text>
                        </View>
                    </View>
                </Animated.View>
            </View>

            <View style={styles.footer}>
                <Button
                    title="View Request Status"
                    onPress={() => navigation.replace('JobStatus', { request })}
                    fullWidth
                    style={styles.button}
                />
                <Button
                    title="Back to Home"
                    variant="text"
                    onPress={() => navigation.navigate('CustomerTabs')}
                    fullWidth
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
        padding: theme.spacing.xl,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: theme.colors.success,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.xl,
        ...theme.shadow.lg,
    },
    title: {
        fontSize: theme.fontSize.heading,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.md,
        textAlign: 'center',
    },
    message: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
        lineHeight: 24,
    },
    detailsContainer: {
        width: '100%',
        backgroundColor: theme.colors.gray50,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        gap: theme.spacing.md,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    detailText: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
    },
    detailValue: {
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.textPrimary,
    },
    footer: {
        gap: theme.spacing.sm,
    },
    button: {
        marginBottom: theme.spacing.sm,
    },
});

export default RequestSubmittedScreen;
