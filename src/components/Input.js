import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme/theme';

const Input = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry = false,
    keyboardType = 'default',
    error,
    leftIcon,
    rightIcon,
    onRightIconPress,
    multiline = false,
    numberOfLines = 1,
    editable = true,
    style,
    containerStyle,
    ...props
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={[
                styles.inputContainer,
                error && styles.inputError,
                !editable && styles.inputDisabled
            ]}>
                {leftIcon && (
                    <View style={styles.leftIcon}>
                        {leftIcon}
                    </View>
                )}

                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={theme.colors.gray400}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    editable={editable}
                    style={[
                        styles.input,
                        multiline && styles.multilineInput,
                        leftIcon && styles.inputWithLeftIcon,
                        rightIcon && styles.inputWithRightIcon,
                        style
                    ]}
                    {...props}
                />

                {rightIcon && (
                    <TouchableOpacity
                        onPress={onRightIconPress}
                        style={styles.rightIcon}
                        activeOpacity={0.7}
                    >
                        {rightIcon}
                    </TouchableOpacity>
                )}
            </View>

            {error && (
                <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle" size={14} color={theme.colors.error} />
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.md,
    },
    label: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.xs,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        paddingHorizontal: theme.spacing.md,
        minHeight: 48,
    },
    inputError: {
        borderColor: theme.colors.error,
    },
    inputDisabled: {
        backgroundColor: theme.colors.gray100,
        opacity: 0.7,
    },
    input: {
        flex: 1,
        fontSize: theme.fontSize.md,
        color: theme.colors.textPrimary,
        paddingVertical: theme.spacing.sm,
    },
    multilineInput: {
        minHeight: 100,
        textAlignVertical: 'top',
        paddingTop: theme.spacing.md,
    },
    inputWithLeftIcon: {
        paddingLeft: theme.spacing.xs,
    },
    inputWithRightIcon: {
        paddingRight: theme.spacing.xs,
    },
    leftIcon: {
        marginRight: theme.spacing.sm,
    },
    rightIcon: {
        marginLeft: theme.spacing.sm,
        padding: theme.spacing.xs,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: theme.spacing.xs,
    },
    errorText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.error,
        marginLeft: theme.spacing.xs,
    },
});

export default Input;
