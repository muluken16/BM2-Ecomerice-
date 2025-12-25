import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme/theme';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.3)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        // Parallel animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 10,
                friction: 2,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                delay: 200,
                useNativeDriver: true,
            }),
        ]).start();

        // Call onFinish after animation
        const timer = setTimeout(() => {
            if (onFinish) {
                onFinish();
            }
        }, 2500);

        return () => clearTimeout(timer);
    }, [onFinish]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryDark, theme.colors.secondary]}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {/* Animated Background Circles */}
                <Animated.View
                    style={[
                        styles.circle,
                        styles.circle1,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.circle,
                        styles.circle2,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                />

                {/* Main Content */}
                <View style={styles.content}>
                    {/* Animated Icon */}
                    <Animated.View
                        style={[
                            styles.iconContainer,
                            {
                                opacity: fadeAnim,
                                transform: [
                                    { scale: scaleAnim },
                                    { rotate: rotate },
                                ],
                            },
                        ]}
                    >
                        <View style={styles.iconWrapper}>
                            <Ionicons name="construct" size={80} color={theme.colors.white} />
                        </View>
                    </Animated.View>

                    {/* Animated Logo Text */}
                    <Animated.View
                        style={{
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        }}
                    >
                        <Text style={styles.logo}>
                            ሙያ<Text style={styles.logoSub}>Pro</Text>
                        </Text>
                        <Text style={styles.tagline}>
                            🔧 Connect. Fix. Grow.
                        </Text>
                    </Animated.View>

                    {/* Loading Indicator */}
                    <Animated.View
                        style={[
                            styles.loadingContainer,
                            {
                                opacity: fadeAnim,
                            },
                        ]}
                    >
                        <View style={styles.loadingBar}>
                            <Animated.View
                                style={[
                                    styles.loadingProgress,
                                    {
                                        transform: [{
                                            scaleX: fadeAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [0, 1],
                                            }),
                                        }],
                                    },
                                ]}
                            />
                        </View>
                        <Text style={styles.loadingText}>Loading amazing features...</Text>
                    </Animated.View>
                </View>

                {/* Footer */}
                <Animated.View
                    style={[
                        styles.footer,
                        {
                            opacity: fadeAnim,
                        },
                    ]}
                >
                    <Text style={styles.footerText}>
                        Empowering Ethiopian Technicians
                    </Text>
                    <Text style={styles.version}>v1.0.0</Text>
                </Animated.View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        position: 'absolute',
        borderRadius: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    circle1: {
        width: width * 1.5,
        height: width * 1.5,
        top: -width * 0.5,
        right: -width * 0.3,
    },
    circle2: {
        width: width * 1.2,
        height: width * 1.2,
        bottom: -width * 0.4,
        left: -width * 0.2,
    },
    content: {
        alignItems: 'center',
        zIndex: 1,
    },
    iconContainer: {
        marginBottom: theme.spacing.xl,
    },
    iconWrapper: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        ...theme.shadow.xl,
    },
    logo: {
        fontSize: 56,
        fontWeight: theme.fontWeight.extrabold,
        color: theme.colors.white,
        textAlign: 'center',
        marginBottom: theme.spacing.sm,
    },
    logoSub: {
        color: theme.colors.secondary,
    },
    tagline: {
        fontSize: theme.fontSize.xl,
        color: theme.colors.white,
        textAlign: 'center',
        opacity: 0.95,
        fontWeight: theme.fontWeight.semibold,
        letterSpacing: 1,
    },
    loadingContainer: {
        marginTop: theme.spacing.xxl * 2,
        alignItems: 'center',
        width: width * 0.7,
    },
    loadingBar: {
        width: '100%',
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: theme.spacing.sm,
    },
    loadingProgress: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.white,
        borderRadius: 2,
        transformOrigin: 'left',
    },
    loadingText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.white,
        opacity: 0.9,
        fontWeight: theme.fontWeight.medium,
    },
    footer: {
        position: 'absolute',
        bottom: theme.spacing.xl,
        alignItems: 'center',
    },
    footerText: {
        fontSize: theme.fontSize.md,
        color: theme.colors.white,
        opacity: 0.9,
        fontWeight: theme.fontWeight.medium,
        marginBottom: theme.spacing.xs,
    },
    version: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.white,
        opacity: 0.7,
    },
});

export default SplashScreen;
