import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../theme/theme';
import Card from '../components/Card';

const SupportScreen = ({ navigation }) => {
    const handleCall = () => {
        Linking.openURL('tel:+251911234567');
    };

    const handleEmail = () => {
        Linking.openURL('mailto:support@muyapro.com');
    };

    const handleChat = () => {
        navigation.navigate('Chat', { isSupport: true });
    };

    const faqs = [
        {
            id: '1',
            question: 'How do I book a technician?',
            answer: 'Go to the Home screen, select a category, choose a service, and follow the booking steps.',
        },
        {
            id: '2',
            question: 'Is there a cancellation fee?',
            answer: 'You can cancel for free within 10 minutes of booking. After that, a small fee may apply.',
        },
        {
            id: '3',
            question: 'How do I pay?',
            answer: 'We accept cash, Telebirr, and bank transfers. Payment is made directly to the technician after the job is done.',
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
                    <Text style={styles.headerTitle}>Customer Support</Text>
                    <Text style={styles.headerSubtitle}>We're here to help you 24/7</Text>
                </LinearGradient>

                {/* Contact Options */}
                <View style={styles.contactContainer}>
                    <Text style={styles.sectionTitle}>Contact Us</Text>
                    <View style={styles.contactGrid}>
                        <TouchableOpacity style={styles.contactCard} onPress={handleChat}>
                            <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary + '20' }]}>
                                <Ionicons name="chatbubbles" size={28} color={theme.colors.primary} />
                            </View>
                            <Text style={styles.contactLabel}>Live Chat</Text>
                            <Text style={styles.contactSub}>Instant support</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.contactCard} onPress={handleCall}>
                            <View style={[styles.iconContainer, { backgroundColor: theme.colors.success + '20' }]}>
                                <Ionicons name="call" size={28} color={theme.colors.success} />
                            </View>
                            <Text style={styles.contactLabel}>Call Us</Text>
                            <Text style={styles.contactSub}>+251 911...</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.contactCard} onPress={handleEmail}>
                            <View style={[styles.iconContainer, { backgroundColor: theme.colors.secondary + '20' }]}>
                                <Ionicons name="mail" size={28} color={theme.colors.secondary} />
                            </View>
                            <Text style={styles.contactLabel}>Email</Text>
                            <Text style={styles.contactSub}>Get a response</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* FAQs */}
                <View style={styles.faqContainer}>
                    <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
                    {faqs.map((faq) => (
                        <Card key={faq.id} style={styles.faqCard}>
                            <View style={styles.faqHeader}>
                                <Ionicons name="help-circle-outline" size={20} color={theme.colors.primary} />
                                <Text style={styles.question}>{faq.question}</Text>
                            </View>
                            <Text style={styles.answer}>{faq.answer}</Text>
                        </Card>
                    ))}
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Still need help? Visit our website at www.muyapro.com
                    </Text>
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
        width: 40,
        height: 40,
        justifyContent: 'center',
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
    contactContainer: {
        padding: theme.spacing.lg,
        marginTop: theme.spacing.md,
    },
    sectionTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.lg,
    },
    contactGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: theme.spacing.md,
    },
    contactCard: {
        flex: 1,
        backgroundColor: theme.colors.white,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
        ...theme.shadow.sm,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.sm,
    },
    contactLabel: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.textPrimary,
        marginBottom: 2,
    },
    contactSub: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
    faqContainer: {
        padding: theme.spacing.lg,
        paddingTop: 0,
    },
    faqCard: {
        marginBottom: theme.spacing.md,
        padding: theme.spacing.md,
    },
    faqHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
        gap: theme.spacing.sm,
    },
    question: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.textPrimary,
        flex: 1,
    },
    answer: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        lineHeight: 20,
        paddingLeft: 28, // Align with text start
    },
    footer: {
        padding: theme.spacing.xl,
        alignItems: 'center',
    },
    footerText: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.gray400,
        textAlign: 'center',
    },
});

export default SupportScreen;
