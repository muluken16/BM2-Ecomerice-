import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
import theme from '../theme/theme';
import Button from '../components/Button';
import Input from '../components/Input';
import { useApp } from '../context/AppContext';

const LoginScreen = ({ navigation }) => {
    const { userMode, login } = useApp();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    // Form state
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    // Technician specific
    const [certificates, setCertificates] = useState([]);
    const [specializations, setSpecializations] = useState([]);

    const categories = [
        { name: 'IT Support', icon: 'laptop-outline' },
        { name: 'Electronics Repair', icon: 'hardware-chip-outline' },
        { name: 'Electrical', icon: 'flash-outline' },
        { name: 'Mechanical', icon: 'construct-outline' },
        { name: 'Manufacturing', icon: 'business-outline' },
        { name: 'Plumbing', icon: 'water-outline' },
        { name: 'Carpentry', icon: 'hammer-outline' },
        { name: 'Automotive', icon: 'car-sport-outline' },
    ];

    const handleSendOTP = async () => {
        if (!phoneNumber || phoneNumber.length < 10) {
            Alert.alert('Error', 'Please enter a valid phone number');
            return;
        }

        setLoading(true);
        // Simulate OTP sending
        setTimeout(() => {
            setLoading(false);
            setOtpSent(true);
            Alert.alert('Success', 'OTP sent to your phone number');
        }, 1500);
    };

    const handleVerifyOTP = async () => {
        if (!otp || otp.length !== 6) {
            Alert.alert('Error', 'Please enter a valid 6-digit OTP');
            return;
        }

        setLoading(true);

        // Simulate OTP verification
        setTimeout(async () => {
            const userData = {
                phoneNumber,
                fullName,
                email,
                mode: userMode,
                ...(userMode === 'technician' && {
                    certificates,
                    specializations,
                }),
            };

            await login(userData);
            setLoading(false);

            // Navigate based on user mode
            if (userMode === 'customer') {
                navigation.replace('CustomerTabs');
            } else {
                navigation.replace('TechnicianTabs');
            }
        }, 1500);
    };

    const handleDocumentPick = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['image/*', 'application/pdf'],
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets) {
                setCertificates([...certificates, result.assets[0]]);
            }
        } catch (error) {
            console.error('Error picking document:', error);
        }
    };

    const toggleSpecialization = (categoryName) => {
        if (specializations.includes(categoryName)) {
            setSpecializations(specializations.filter(s => s !== categoryName));
        } else {
            setSpecializations([...specializations, categoryName]);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Header with Gradient */}
                <LinearGradient
                    colors={[theme.colors.primary, theme.colors.primaryDark]}
                    style={styles.headerGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={styles.logoContainer}>
                        <View style={styles.logoIconWrapper}>
                            <Ionicons name="construct" size={32} color={theme.colors.white} />
                        </View>
                        <Text style={styles.logo}>ሙያ<Text style={styles.logoSub}>Pro</Text></Text>
                    </View>
                    <Text style={styles.title}>
                        {isLogin ? 'Welcome Back!' : 'Join Us Today'}
                    </Text>
                    <Text style={styles.subtitle}>
                        {userMode === 'customer' ? '👤 Customer' : '🔧 Technician'} {isLogin ? 'Login' : 'Registration'}
                    </Text>
                </LinearGradient>

                {/* Form Card */}
                <View style={styles.formCard}>
                    {/* Phone Number */}
                    <Input
                        label="Phone Number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        placeholder="+251 9XX XXX XXX"
                        keyboardType="phone-pad"
                        leftIcon={<Ionicons name="call-outline" size={20} color={theme.colors.primary} />}
                        editable={!otpSent}
                    />

                    {!otpSent ? (
                        <>
                            {!isLogin && (
                                <>
                                    <Input
                                        label="Full Name"
                                        value={fullName}
                                        onChangeText={setFullName}
                                        placeholder="Enter your full name"
                                        leftIcon={<Ionicons name="person-outline" size={20} color={theme.colors.primary} />}
                                    />

                                    <Input
                                        label="Email (Optional)"
                                        value={email}
                                        onChangeText={setEmail}
                                        placeholder="your@email.com"
                                        keyboardType="email-address"
                                        leftIcon={<Ionicons name="mail-outline" size={20} color={theme.colors.primary} />}
                                    />

                                    {/* Technician specific fields */}
                                    {userMode === 'technician' && (
                                        <>
                                            {/* Specialization Categories */}
                                            <View style={styles.section}>
                                                <Text style={styles.sectionTitle}>
                                                    <Ionicons name="briefcase-outline" size={18} color={theme.colors.textPrimary} /> Select Specializations
                                                </Text>
                                                <View style={styles.categoriesGrid}>
                                                    {categories.map((category) => (
                                                        <TouchableOpacity
                                                            key={category.name}
                                                            onPress={() => toggleSpecialization(category.name)}
                                                            style={[
                                                                styles.categoryChip,
                                                                specializations.includes(category.name) && styles.categoryChipSelected,
                                                            ]}
                                                        >
                                                            <Ionicons
                                                                name={category.icon}
                                                                size={16}
                                                                color={specializations.includes(category.name) ? theme.colors.white : theme.colors.primary}
                                                            />
                                                            <Text
                                                                style={[
                                                                    styles.categoryText,
                                                                    specializations.includes(category.name) && styles.categoryTextSelected,
                                                                ]}
                                                            >
                                                                {category.name}
                                                            </Text>
                                                            {specializations.includes(category.name) && (
                                                                <Ionicons name="checkmark-circle" size={16} color={theme.colors.white} />
                                                            )}
                                                        </TouchableOpacity>
                                                    ))}
                                                </View>
                                            </View>

                                            {/* Certificates Upload */}
                                            <View style={styles.section}>
                                                <Text style={styles.sectionTitle}>
                                                    <Ionicons name="document-text-outline" size={18} color={theme.colors.textPrimary} /> Upload Certificates or ID
                                                </Text>
                                                <Button
                                                    title="Choose Document"
                                                    onPress={handleDocumentPick}
                                                    variant="outline"
                                                    icon={<Ionicons name="cloud-upload-outline" size={20} color={theme.colors.primary} style={{ marginRight: 8 }} />}
                                                />

                                                {certificates.length > 0 && (
                                                    <View style={styles.documentsContainer}>
                                                        {certificates.map((doc, index) => (
                                                            <View key={index} style={styles.documentItem}>
                                                                <Ionicons name="document-text" size={20} color={theme.colors.primary} />
                                                                <Text style={styles.documentName} numberOfLines={1}>
                                                                    {doc.name}
                                                                </Text>
                                                                <TouchableOpacity
                                                                    onPress={() => setCertificates(certificates.filter((_, i) => i !== index))}
                                                                >
                                                                    <Ionicons name="close-circle" size={20} color={theme.colors.error} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        ))}
                                                    </View>
                                                )}
                                            </View>
                                        </>
                                    )}
                                </>
                            )}

                            <Button
                                title={isLogin ? '📱 Send OTP' : '🚀 Sign Up & Send OTP'}
                                onPress={handleSendOTP}
                                loading={loading}
                                fullWidth
                                style={{ marginTop: theme.spacing.md }}
                            />
                        </>
                    ) : (
                        <>
                            <View style={styles.otpInfoCard}>
                                <Ionicons name="shield-checkmark" size={48} color={theme.colors.primary} />
                                <Text style={styles.otpInfoText}>
                                    We've sent a 6-digit code to {phoneNumber}
                                </Text>
                            </View>

                            <Input
                                label="Enter OTP"
                                value={otp}
                                onChangeText={setOtp}
                                placeholder="000000"
                                keyboardType="number-pad"
                                maxLength={6}
                                leftIcon={<Ionicons name="shield-checkmark-outline" size={20} color={theme.colors.primary} />}
                            />

                            <Button
                                title="✓ Verify & Continue"
                                onPress={handleVerifyOTP}
                                loading={loading}
                                fullWidth
                            />

                            <TouchableOpacity onPress={() => setOtpSent(false)} style={styles.linkButton}>
                                <Ionicons name="arrow-back-circle-outline" size={18} color={theme.colors.primary} />
                                <Text style={styles.linkText}>Change phone number</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {/* Toggle Login/Register */}
                    {!otpSent && (
                        <View style={styles.toggleContainer}>
                            <Text style={styles.toggleText}>
                                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                            </Text>
                            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                                <Text style={styles.toggleLink}>
                                    {isLogin ? 'Sign Up' : 'Login'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.gray100,
    },
    scrollContent: {
        flexGrow: 1,
    },
    headerGradient: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 40,
        paddingHorizontal: theme.spacing.lg,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        ...theme.shadow.lg,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        gap: theme.spacing.sm,
    },
    logoIconWrapper: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    logo: {
        fontSize: 40,
        fontWeight: theme.fontWeight.extrabold,
        color: theme.colors.white,
    },
    logoSub: {
        color: theme.colors.secondary,
    },
    title: {
        fontSize: 28,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.white,
        marginBottom: theme.spacing.xs,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: theme.fontSize.md,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
    },
    formCard: {
        flex: 1,
        backgroundColor: theme.colors.white,
        marginTop: -20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: theme.spacing.lg,
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        ...theme.shadow.md,
    },
    section: {
        marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.sm,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.round,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.white,
        gap: theme.spacing.xs,
        ...theme.shadow.sm,
    },
    categoryChipSelected: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
        ...theme.shadow.md,
    },
    categoryText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.primary,
        fontWeight: theme.fontWeight.semibold,
    },
    categoryTextSelected: {
        color: theme.colors.white,
    },
    documentsContainer: {
        marginTop: theme.spacing.md,
        gap: theme.spacing.sm,
    },
    documentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.md,
        backgroundColor: theme.colors.gray50,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        gap: theme.spacing.sm,
    },
    documentName: {
        flex: 1,
        fontSize: theme.fontSize.sm,
        color: theme.colors.textPrimary,
        fontWeight: theme.fontWeight.medium,
    },
    otpInfoCard: {
        alignItems: 'center',
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.primaryLight + '20',
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.lg,
        borderWidth: 1,
        borderColor: theme.colors.primary + '30',
    },
    otpInfoText: {
        marginTop: theme.spacing.sm,
        fontSize: theme.fontSize.md,
        color: theme.colors.textPrimary,
        textAlign: 'center',
        fontWeight: theme.fontWeight.medium,
    },
    linkButton: {
        marginTop: theme.spacing.md,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: theme.spacing.xs,
    },
    linkText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.primary,
        fontWeight: theme.fontWeight.semibold,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: theme.spacing.xl,
        gap: theme.spacing.xs,
    },
    toggleText: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
    },
    toggleLink: {
        fontSize: theme.fontSize.md,
        color: theme.colors.primary,
        fontWeight: theme.fontWeight.bold,
    },
});

export default LoginScreen;
