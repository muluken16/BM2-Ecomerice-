import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme/theme';
import { useApp } from '../context/AppContext';

const { width } = Dimensions.get('window');

const ModeSelectionScreen = ({ navigation }) => {
    const { setUserMode } = useApp();
    const [selectedMode, setSelectedMode] = useState(null);

    const handleModeSelect = async (mode) => {
        setSelectedMode(mode);
        await setUserMode(mode);

        // Navigate to Login screen after short delay for animation
        setTimeout(() => {
            navigation.replace('Login');
        }, 300);
    };

    const modes = [
        {
            id: 'customer',
            title: 'Continue as Customer',
            subtitle: '👤 I need technical help',
            description: 'Find and hire skilled technicians for your technical needs',
            icon: 'person-circle-outline',
            gradient: [theme.colors.blue, theme.colors.blueDark],
            features: [
                { icon: 'search-outline', text: 'Browse services' },
                { icon: 'hand-right-outline', text: 'Request technicians' },
                { icon: 'location-outline', text: 'Track job progress' },
                { icon: 'star-outline', text: 'Rate & review' },
            ],
        },
        {
            id: 'technician',
            title: 'Continue as Technician',
            subtitle: '🔧 I offer technical services',
            description: 'Offer your technical skills and earn money',
            icon: 'construct-outline',
            gradient: [theme.colors.primary, theme.colors.primaryDark],
            features: [
                { icon: 'notifications-outline', text: 'Receive job requests' },
                { icon: 'briefcase-outline', text: 'Manage your jobs' },
                { icon: 'cash-outline', text: 'Track earnings' },
                { icon: 'trophy-outline', text: 'Build reputation' },
            ],
        },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoIconWrapper}>
                        <Ionicons name="construct" size={28} color={theme.colors.primary} />
                    </View>
                    <Text style={styles.logo}>ሙያ<Text style={styles.logoSub}>Pro</Text></Text>
                </View>
                <Text style={styles.headerTitle}>Welcome! 👋</Text>
                <Text style={styles.headerSubtitle}>Choose how you want to use ሙያPro</Text>
            </View>

            {/* Mode Cards */}
            <View style={styles.modesContainer}>
                {modes.map((mode) => (
                    <TouchableOpacity
                        key={mode.id}
                        onPress={() => handleModeSelect(mode.id)}
                        activeOpacity={0.9}
                        style={styles.modeCardContainer}
                    >
                        <LinearGradient
                            colors={mode.gradient}
                            style={[
                                styles.modeCard,
                                selectedMode === mode.id && styles.modeCardSelected,
                            ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            {/* Icon Container */}
                            <View style={styles.iconContainer}>
                                <Ionicons name={mode.icon} size={56} color={theme.colors.white} />
                            </View>

                            {/* Title & Subtitle */}
                            <Text style={styles.modeSubtitle}>{mode.subtitle}</Text>
                            <Text style={styles.modeTitle}>{mode.title}</Text>
                            <Text style={styles.modeDescription}>{mode.description}</Text>

                            {/* Features List */}
                            <View style={styles.featuresContainer}>
                                {mode.features.map((feature, index) => (
                                    <View key={index} style={styles.featureItem}>
                                        <View style={styles.featureIconWrapper}>
                                            <Ionicons
                                                name={feature.icon}
                                                size={18}
                                                color={theme.colors.white}
                                            />
                                        </View>
                                        <Text style={styles.featureText}>{feature.text}</Text>
                                    </View>
                                ))}
                            </View>

                            {/* Arrow Indicator */}
                            <View style={styles.arrowContainer}>
                                <Ionicons name="arrow-forward-circle" size={32} color="rgba(255, 255, 255, 0.9)" />
                            </View>

                            {/* Selected Badge */}
                            {selectedMode === mode.id && (
                                <View style={styles.selectedBadge}>
                                    <Ionicons name="checkmark-circle" size={28} color={theme.colors.secondary} />
                                </View>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.footerCard}>
                    <Ionicons name="information-circle-outline" size={20} color={theme.colors.primary} />
                    <Text style={styles.footerText}>
                        You can switch modes anytime from your profile settings
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.gray50,
    },
    scrollContent: {
        paddingVertical: theme.spacing.xl,
    },
    header: {
        alignItems: 'center',
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
        marginTop: theme.spacing.xl,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
        gap: theme.spacing.sm,
    },
    logoIconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: theme.colors.primaryLight + '30',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: theme.colors.primary + '40',
    },
    logo: {
        fontSize: 40,
        fontWeight: theme.fontWeight.extrabold,
        color: theme.colors.primary,
    },
    logoSub: {
        color: theme.colors.secondary,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.xs,
    },
    headerSubtitle: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        fontWeight: theme.fontWeight.medium,
    },
    modesContainer: {
        paddingHorizontal: theme.spacing.lg,
    },
    modeCardContainer: {
        marginBottom: theme.spacing.lg,
    },
    modeCard: {
        borderRadius: theme.borderRadius.xxl,
        padding: theme.spacing.xl,
        ...theme.shadow.xl,
        minHeight: 320,
        position: 'relative',
        overflow: 'hidden',
    },
    modeCardSelected: {
        transform: [{ scale: 0.98 }],
        ...theme.shadow.md,
    },
    iconContainer: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.md,
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    modeSubtitle: {
        fontSize: theme.fontSize.md,
        color: theme.colors.white,
        opacity: 0.95,
        marginBottom: theme.spacing.xs,
        fontWeight: theme.fontWeight.medium,
    },
    modeTitle: {
        fontSize: theme.fontSize.xxl,
        fontWeight: theme.fontWeight.extrabold,
        color: theme.colors.white,
        marginBottom: theme.spacing.xs,
    },
    modeDescription: {
        fontSize: theme.fontSize.md,
        color: theme.colors.white,
        opacity: 0.9,
        marginBottom: theme.spacing.lg,
        lineHeight: 22,
    },
    featuresContainer: {
        gap: theme.spacing.md,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    featureIconWrapper: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    featureText: {
        fontSize: theme.fontSize.md,
        color: theme.colors.white,
        opacity: 0.95,
        fontWeight: theme.fontWeight.medium,
        flex: 1,
    },
    arrowContainer: {
        position: 'absolute',
        bottom: theme.spacing.lg,
        right: theme.spacing.lg,
    },
    selectedBadge: {
        position: 'absolute',
        top: theme.spacing.lg,
        right: theme.spacing.lg,
        backgroundColor: theme.colors.white,
        borderRadius: 20,
        padding: 2,
    },
    footer: {
        paddingHorizontal: theme.spacing.lg,
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.xl,
        alignItems: 'center',
    },
    footerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        ...theme.shadow.sm,
        borderWidth: 1,
        borderColor: theme.colors.primary + '20',
    },
    footerText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        fontWeight: theme.fontWeight.medium,
        flex: 1,
    },
});

export default ModeSelectionScreen;
