import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../theme/theme';

const Button = ({
    title,
    onPress,
    variant = 'primary', // primary, secondary, outline, text
    size = 'medium', // small, medium, large
    loading = false,
    disabled = false,
    icon,
    fullWidth = false,
    style,
    textStyle,
    gradientColors,
}) => {
    const getButtonStyle = () => {
        const baseStyle = [styles.button, styles[`${variant}Button`], styles[`${size}Button`]];
        if (fullWidth) baseStyle.push(styles.fullWidth);
        if (disabled) baseStyle.push(styles.disabled);
        return baseStyle;
    };

    const getTextStyle = () => {
        return [styles.text, styles[`${variant}Text`], styles[`${size}Text`], textStyle];
    };

    const renderContent = () => (
        <>
            {loading ? (
                <ActivityIndicator
                    color={variant === 'outline' ? theme.colors.primary : theme.colors.white}
                    size="small"
                />
            ) : (
                <>
                    {icon && icon}
                    <Text style={getTextStyle()}>{title}</Text>
                </>
            )}
        </>
    );

    if (variant === 'primary' && !disabled) {
        const colors = gradientColors || [theme.colors.primary, theme.colors.primaryDark];

        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled || loading}
                style={[styles.button, styles[`${size}Button`], fullWidth && styles.fullWidth, style]}
                activeOpacity={0.8}
            >
                <LinearGradient
                    colors={colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                >
                    {renderContent()}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[...getButtonStyle(), style]}
            activeOpacity={0.7}
        >
            {renderContent()}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        overflow: 'hidden',
    },
    gradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },

    // Variants
    primaryButton: {
        backgroundColor: theme.colors.primary,
    },
    secondaryButton: {
        backgroundColor: theme.colors.secondary,
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    textButton: {
        backgroundColor: 'transparent',
    },

    // Sizes
    smallButton: {
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
        minHeight: 36,
    },
    mediumButton: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
        minHeight: 48,
    },
    largeButton: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.xl,
        minHeight: 56,
    },

    // Text styles
    text: {
        fontWeight: theme.fontWeight.semibold,
        textAlign: 'center',
    },
    primaryText: {
        color: theme.colors.white,
    },
    secondaryText: {
        color: theme.colors.textPrimary,
    },
    outlineText: {
        color: theme.colors.primary,
    },
    textText: {
        color: theme.colors.primary,
    },
    smallText: {
        fontSize: theme.fontSize.sm,
    },
    mediumText: {
        fontSize: theme.fontSize.md,
    },
    largeText: {
        fontSize: theme.fontSize.lg,
    },

    // States
    disabled: {
        opacity: 0.5,
    },
    fullWidth: {
        width: '100%',
    },
});

export default Button;
