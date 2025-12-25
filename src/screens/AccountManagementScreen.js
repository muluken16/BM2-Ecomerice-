import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../theme/theme';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';

const AccountManagementScreen = ({ navigation }) => {
    const { user, updateUser } = useApp();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        address: user?.address || '',
        bio: user?.bio || '',
    });

    const handleSave = async () => {
        try {
            await updateUser(formData);
            setIsEditing(false);
            Alert.alert('Success', 'Profile updated successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile');
        }
    };

    const handleCancel = () => {
        setFormData({
            fullName: user?.fullName || '',
            email: user?.email || '',
            phoneNumber: user?.phoneNumber || '',
            address: user?.address || '',
            bio: user?.bio || '',
        });
        setIsEditing(false);
    };

    const securityOptions = [
        {
            id: '1',
            title: 'Change Password',
            icon: 'lock-closed-outline',
            description: 'Update your password',
            onPress: () => Alert.alert('Coming Soon', 'Password change feature will be available soon'),
        },
        {
            id: '2',
            title: 'Two-Factor Authentication',
            icon: 'shield-checkmark-outline',
            description: 'Add an extra layer of security',
            onPress: () => Alert.alert('Coming Soon', '2FA feature will be available soon'),
        },
        {
            id: '3',
            title: 'Login History',
            icon: 'time-outline',
            description: 'View your recent login activity',
            onPress: () => Alert.alert('Coming Soon', 'Login history feature will be available soon'),
        },
    ];

    const privacyOptions = [
        {
            id: '1',
            title: 'Data & Privacy',
            icon: 'eye-outline',
            description: 'Manage your data and privacy settings',
            onPress: () => Alert.alert('Coming Soon', 'Privacy settings will be available soon'),
        },
        {
            id: '2',
            title: 'Download My Data',
            icon: 'download-outline',
            description: 'Request a copy of your data',
            onPress: () => Alert.alert('Coming Soon', 'Data download feature will be available soon'),
        },
        {
            id: '3',
            title: 'Delete Account',
            icon: 'trash-outline',
            description: 'Permanently delete your account',
            destructive: true,
            onPress: () => {
                Alert.alert(
                    'Delete Account',
                    'Are you sure you want to permanently delete your account? This action cannot be undone.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'Delete',
                            style: 'destructive',
                            onPress: () => Alert.alert('Coming Soon', 'Account deletion will be available soon'),
                        },
                    ]
                );
            },
        },
    ];

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <LinearGradient
                    colors={[theme.colors.primary, theme.colors.primaryDark]}
                    style={styles.header}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Account Management</Text>
                    <Text style={styles.headerSubtitle}>Manage your account settings and preferences</Text>
                </LinearGradient>

                {/* Personal Information */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Personal Information</Text>
                        {!isEditing ? (
                            <TouchableOpacity onPress={() => setIsEditing(true)}>
                                <Text style={styles.editButton}>Edit</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.editActions}>
                                <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                                    <Text style={styles.saveText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    <Card style={styles.card}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Full Name</Text>
                            <TextInput
                                style={[styles.input, !isEditing && styles.inputDisabled]}
                                value={formData.fullName}
                                onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                                editable={isEditing}
                                placeholder="Enter your full name"
                                placeholderTextColor={theme.colors.gray400}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email Address</Text>
                            <TextInput
                                style={[styles.input, !isEditing && styles.inputDisabled]}
                                value={formData.email}
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                                editable={isEditing}
                                placeholder="Enter your email"
                                placeholderTextColor={theme.colors.gray400}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                style={[styles.input, !isEditing && styles.inputDisabled]}
                                value={formData.phoneNumber}
                                onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
                                editable={isEditing}
                                placeholder="Enter your phone number"
                                placeholderTextColor={theme.colors.gray400}
                                keyboardType="phone-pad"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Address</Text>
                            <TextInput
                                style={[styles.input, !isEditing && styles.inputDisabled]}
                                value={formData.address}
                                onChangeText={(text) => setFormData({ ...formData, address: text })}
                                editable={isEditing}
                                placeholder="Enter your address"
                                placeholderTextColor={theme.colors.gray400}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Bio</Text>
                            <TextInput
                                style={[styles.input, styles.textArea, !isEditing && styles.inputDisabled]}
                                value={formData.bio}
                                onChangeText={(text) => setFormData({ ...formData, bio: text })}
                                editable={isEditing}
                                placeholder="Tell us about yourself"
                                placeholderTextColor={theme.colors.gray400}
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                            />
                        </View>
                    </Card>
                </View>

                {/* Security Settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Security</Text>
                    <Card style={styles.card}>
                        {securityOptions.map((option, index) => (
                            <TouchableOpacity
                                key={option.id}
                                style={[
                                    styles.optionItem,
                                    index !== securityOptions.length - 1 && styles.optionBorder,
                                ]}
                                onPress={option.onPress}
                            >
                                <View style={styles.optionIcon}>
                                    <Ionicons name={option.icon} size={24} color={theme.colors.primary} />
                                </View>
                                <View style={styles.optionContent}>
                                    <Text style={styles.optionTitle}>{option.title}</Text>
                                    <Text style={styles.optionDescription}>{option.description}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color={theme.colors.gray400} />
                            </TouchableOpacity>
                        ))}
                    </Card>
                </View>

                {/* Privacy Settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Privacy & Data</Text>
                    <Card style={styles.card}>
                        {privacyOptions.map((option, index) => (
                            <TouchableOpacity
                                key={option.id}
                                style={[
                                    styles.optionItem,
                                    index !== privacyOptions.length - 1 && styles.optionBorder,
                                ]}
                                onPress={option.onPress}
                            >
                                <View style={[
                                    styles.optionIcon,
                                    option.destructive && { backgroundColor: theme.colors.error + '20' }
                                ]}>
                                    <Ionicons
                                        name={option.icon}
                                        size={24}
                                        color={option.destructive ? theme.colors.error : theme.colors.primary}
                                    />
                                </View>
                                <View style={styles.optionContent}>
                                    <Text style={[
                                        styles.optionTitle,
                                        option.destructive && { color: theme.colors.error }
                                    ]}>
                                        {option.title}
                                    </Text>
                                    <Text style={styles.optionDescription}>{option.description}</Text>
                                </View>
                                <Ionicons
                                    name="chevron-forward"
                                    size={20}
                                    color={option.destructive ? theme.colors.error : theme.colors.gray400}
                                />
                            </TouchableOpacity>
                        ))}
                    </Card>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        paddingTop: 60,
        paddingBottom: theme.spacing.xxl,
        paddingHorizontal: theme.spacing.lg,
        borderBottomLeftRadius: theme.borderRadius.xxl,
        borderBottomRightRadius: theme.borderRadius.xxl,
        ...theme.shadow.lg,
    },
    backButton: {
        marginBottom: theme.spacing.md,
    },
    headerTitle: {
        fontSize: theme.fontSize.xxl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.white,
        marginBottom: theme.spacing.xs,
    },
    headerSubtitle: {
        fontSize: theme.fontSize.md,
        color: theme.colors.white,
        opacity: 0.9,
    },
    section: {
        paddingHorizontal: theme.spacing.lg,
        marginTop: theme.spacing.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    sectionTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.textPrimary,
    },
    editButton: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.primary,
    },
    editActions: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    cancelButton: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
    },
    cancelText: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.gray500,
    },
    saveButton: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.md,
    },
    saveText: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.white,
    },
    card: {
        padding: theme.spacing.lg,
    },
    inputGroup: {
        marginBottom: theme.spacing.lg,
    },
    label: {
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        fontSize: theme.fontSize.md,
        color: theme.colors.textPrimary,
        backgroundColor: theme.colors.white,
    },
    inputDisabled: {
        backgroundColor: theme.colors.gray100,
        color: theme.colors.gray600,
    },
    textArea: {
        height: 100,
        paddingTop: theme.spacing.md,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: theme.spacing.md,
    },
    optionBorder: {
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    optionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: theme.colors.primaryLight + '20',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.md,
    },
    optionContent: {
        flex: 1,
    },
    optionTitle: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.textPrimary,
        marginBottom: 2,
    },
    optionDescription: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
    },
});

export default AccountManagementScreen;
