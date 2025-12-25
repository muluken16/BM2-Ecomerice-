import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../theme/theme';
import Button from '../../components/Button';
import Card from '../../components/Card';

const CategoryDetailScreen = ({ navigation, route }) => {
    const { category } = route.params;

    // Enhanced mock data for sub-services based on category
    const getSubServices = (catName) => {
        const services = {
            'IT Support': [
                { id: '1', name: 'Computer Repair', price: '500', time: '1-2 hours', desc: 'Diagnosis and repair of hardware/software issues.' },
                { id: '2', name: 'Network Setup', price: '800', time: '2-3 hours', desc: 'Wi-Fi configuration and network troubleshooting.' },
                { id: '3', name: 'Data Recovery', price: '1200', time: '2-4 days', desc: 'Recover lost data from damaged drives.' },
            ],
            'Plumbing': [
                { id: '1', name: 'Leak Repair', price: '300', time: '1 hour', desc: 'Fixing leaky faucets, pipes, and toilets.' },
                { id: '2', name: 'Drain Cleaning', price: '600', time: '1-2 hours', desc: 'Unclogging sinks, showers, and main lines.' },
                { id: '3', name: 'Pipe Installation', price: '1500', time: '3-5 hours', desc: 'Installing new water or sewage pipes.' },
            ],
            'Electrical': [
                { id: '1', name: 'Wiring Repair', price: '400', time: '1-2 hours', desc: 'Fixing faulty wiring and outlets.' },
                { id: '2', name: 'Lighting Installation', price: '300', time: '1 hour', desc: 'Installing new light fixtures and switches.' },
                { id: '3', name: 'Panel Upgrade', price: '2500', time: '4-6 hours', desc: 'Upgrading electrical panels for higher capacity.' },
            ],
            'Cleaning': [
                { id: '1', name: 'Deep Cleaning', price: '1500', time: '4-6 hours', desc: 'Thorough cleaning of the entire house.' },
                { id: '2', name: 'Sofa Cleaning', price: '800', time: '2 hours', desc: 'Shampooing and vacuuming sofas.' },
                { id: '3', name: 'Carpet Cleaning', price: '1000', time: '2-3 hours', desc: 'Deep cleaning of carpets and rugs.' },
            ],
            // Default for others
            'default': [
                { id: '1', name: 'General Service', price: '500', time: '1-2 hours', desc: 'Standard service package.' },
                { id: '2', name: 'Premium Service', price: '1000', time: '3-4 hours', desc: 'Comprehensive service with premium materials.' },
                { id: '3', name: 'Consultation', price: '300', time: '1 hour', desc: 'Professional advice and assessment.' },
            ]
        };
        return services[catName] || services['default'];
    };

    const subServices = getSubServices(category.name);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false} testID="category-detail-scroll">
                {/* Header Image */}
                <ImageBackground
                    source={{ uri: category.image || 'https://via.placeholder.com/500' }}
                    style={styles.headerImage}
                >
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        style={styles.headerGradient}
                    >
                        <Text style={styles.headerTitle}>{category.name}</Text>
                        <Text style={styles.headerSubtitle}>
                            {category.services || 'Multiple'} services available
                        </Text>
                    </LinearGradient>
                </ImageBackground>

                <View style={styles.body}>
                    {/* Available Services */}
                    <Text style={styles.sectionTitle}>Available Services</Text>
                    {subServices.map((service) => (
                        <Card key={service.id} style={styles.serviceCard}>
                            <View style={styles.serviceContent}>
                                <View style={styles.serviceHeader}>
                                    <Text style={styles.serviceName}>{service.name}</Text>
                                    <Text style={styles.serviceDescription}>{service.desc}</Text>
                                </View>

                                <View style={styles.serviceFooter}>
                                    <View style={styles.priceTimeRow}>
                                        <View style={styles.priceSection}>
                                            <Text style={styles.priceLabel}>Starting from</Text>
                                            <Text style={styles.priceText}>ETB {service.price}</Text>
                                        </View>
                                        <View style={styles.timeBadge}>
                                            <Ionicons name="time-outline" size={16} color={theme.colors.primary} />
                                            <Text style={styles.timeText}>{service.time}</Text>
                                        </View>
                                    </View>

                                    <Button
                                        title="Book Now"
                                        size="large"
                                        variant="primary"
                                        icon={<Ionicons name="calendar-outline" size={20} color={theme.colors.white} style={{ marginRight: 6 }} />}
                                        style={styles.bookButton}
                                        onPress={() => navigation.navigate('CreateServiceRequest', { category, service })}
                                    />
                                </View>
                            </View>
                        </Card>
                    ))}

                    {/* Info Card */}
                    <Card style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <Ionicons name="shield-checkmark" size={24} color={theme.colors.success} />
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoTitle}>Verified Professionals</Text>
                                <Text style={styles.infoDescription}>
                                    All technicians are vetted, background-checked, and skill-tested for your safety.
                                </Text>
                            </View>
                        </View>
                    </Card>
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
    content: {
        flex: 1,
    },
    headerImage: {
        width: '100%',
        height: 250,
        justifyContent: 'flex-end',
    },
    headerGradient: {
        padding: theme.spacing.lg,
        paddingTop: 100,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.colors.white,
        marginBottom: theme.spacing.xs,
    },
    headerSubtitle: {
        fontSize: theme.fontSize.md,
        color: theme.colors.white,
        opacity: 0.9,
    },
    body: {
        padding: theme.spacing.lg,
        marginTop: -20,
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: theme.borderRadius.xl,
        borderTopRightRadius: theme.borderRadius.xl,
    },
    sectionTitle: {
        fontSize: theme.fontSize.xl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.md,
    },
    serviceCard: {
        marginBottom: theme.spacing.lg,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.xl,
        borderWidth: 1,
        borderColor: theme.colors.gray100,
        ...theme.shadow.sm,
    },
    serviceContent: {
        padding: 0,
    },
    serviceHeader: {
        marginBottom: theme.spacing.md,
    },
    serviceName: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.textPrimary,
        marginBottom: 4,
    },
    serviceDescription: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        lineHeight: 20,
    },
    serviceFooter: {
        marginTop: theme.spacing.md,
        paddingTop: theme.spacing.md,
        borderTopWidth: 1,
        borderTopColor: theme.colors.gray100,
        gap: theme.spacing.md,
    },
    priceTimeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    priceSection: {
        gap: 4,
    },
    priceLabel: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        fontWeight: theme.fontWeight.medium,
    },
    priceText: {
        fontSize: 26,
        color: theme.colors.primary,
        fontWeight: theme.fontWeight.bold,
        letterSpacing: -0.5,
    },
    timeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: theme.colors.primary + '15',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },
    timeText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.primary,
        fontWeight: theme.fontWeight.semibold,
    },
    bookButton: {
        width: '100%',
        borderRadius: 24,
        height: 54,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    infoCard: {
        backgroundColor: theme.colors.success + '10',
        borderWidth: 1,
        borderColor: theme.colors.success + '30',
        marginTop: theme.spacing.md,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    infoTextContainer: {
        flex: 1,
    },
    infoTitle: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.textPrimary,
    },
    infoDescription: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        marginTop: 2,
    },
});

export default CategoryDetailScreen;
