import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../theme/theme';

const Card = ({
    children,
    title,
    subtitle,
    onPress,
    style,
    elevated = true,
    padding = 'medium',
}) => {
    const paddingValue = {
        small: theme.spacing.sm,
        medium: theme.spacing.md,
        large: theme.spacing.lg,
    }[padding];

    const content = (
        <View
            style={[
                styles.card,
                elevated && theme.shadow.md,
                { padding: paddingValue },
                style,
            ]}
        >
            {title && (
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                </View>
            )}
            {children}
        </View>
    );

    if (onPress) {
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
                {content}
            </TouchableOpacity>
        );
    }

    return content;
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.md,
    },
    header: {
        marginBottom: theme.spacing.sm,
    },
    title: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.xs,
    },
    subtitle: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
    },
});

export default Card;
