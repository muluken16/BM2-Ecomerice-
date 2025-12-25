import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../theme/theme';
import { useApp } from '../../context/AppContext';
import Card from '../../components/Card';
import FloatingSupportButton from '../../components/FloatingSupportButton';

const CustomerHomeScreen = ({ navigation }) => {
    const { user, requests } = useApp(); // Use requests from context
    const [searchQuery, setSearchQuery] = useState('');

    // Get recent 2 requests
    const recentRequests = requests.slice(0, 2);

    const serviceCategories = [
        {
            id: '1',
            name: 'IT Support',
            image: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=500&q=80',
            services: 12,
        },
        {
            id: '2',
            name: 'Plumbing',
            image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=500&q=80',
            services: 8,
        },
        {
            id: '3',
            name: 'Electrical',
            image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&q=80',
            services: 15,
        },
        {
            id: '4',
            name: 'Cleaning',
            image: 'https://images.unsplash.com/photo-1581578731117-104f2a863a30?w=500&q=80',
            services: 10,
        },
        {
            id: '5',
            name: 'Painting',
            image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&q=80',
            services: 6,
        },
        {
            id: '6',
            name: 'Carpentry',
            image: 'https://images.unsplash.com/photo-1622151834677-70f982c9adef?w=500&q=80',
            services: 9,
        },
        {
            id: '7',
            name: 'Gardening',
            image: 'https://images.unsplash.com/photo-1615429054742-ef1819619d30?w=500&q=80',
            services: 7,
        },
        {
            id: '8',
            name: 'Moving',
            image: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=500&q=80',
            services: 5,
        },
        {
            id: '9',
            name: 'Pest Control',
            image: 'https://images.unsplash.com/photo-1587573088697-b4f9d1731689?w=500&q=80',
            services: 4,
        },
        {
            id: '10',
            name: 'Appliance Repair',
            image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=500&q=80',
            services: 11,
        },
        {
            id: '11',
            name: 'Beauty & Spa',
            image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=500&q=80',
            services: 20,
        },
        {
            id: '12',
            name: 'Home Security',
            image: 'https://images.unsplash.com/photo-1558002038-1091a166111c?w=500&q=80',
            services: 3,
        },
        {
            id: '13',
            name: 'Laundry',
            image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb8f?w=500&q=80',
            services: 14,
        },
        {
            id: '14',
            name: 'Car Wash',
            image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=500&q=80',
            services: 8,
        },
        {
            id: '15',
            name: 'Event Planning',
            image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&q=80',
            services: 5,
        },
        {
            id: '16',
            name: 'Photography',
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80',
            services: 16,
        },
        {
            id: '17',
            name: 'Tutoring',
            image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80',
            services: 25,
        },
        {
            id: '18',
            name: 'Health & Fitness',
            image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80',
            services: 18,
        },
        {
            id: '19',
            name: 'Interior Design',
            image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80',
            services: 7,
        },
        {
            id: '20',
            name: 'Locksmith',
            image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=500&q=80',
            services: 2,
        },
    ];

    const popularServices = [
        {
            id: '1',
            title: 'Computer Repair & Maintenance',
            category: 'IT Support',
            price: 'From ETB 500',
            rating: 4.8,
            technicians: 24,
            image: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=500&q=80',
        },
        {
            id: '2',
            title: 'Mobile Phone Screen Replacement',
            category: 'Electronics Repair',
            price: 'From ETB 800',
            rating: 4.9,
            technicians: 18,
            image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=500&q=80',
        },
        {
            id: '3',
            title: 'Home Electrical Wiring',
            category: 'Electrical',
            price: 'From ETB 1200',
            rating: 4.7,
            technicians: 32,
            image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&q=80',
        },
        {
            id: '4',
            title: 'Leaky Faucet Repair',
            category: 'Plumbing',
            price: 'From ETB 300',
            rating: 4.6,
            technicians: 15,
            image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=500&q=80',
        },
        {
            id: '5',
            title: 'Deep House Cleaning',
            category: 'Cleaning',
            price: 'From ETB 1500',
            rating: 4.9,
            technicians: 40,
            image: 'https://images.unsplash.com/photo-1581578731117-104f2a863a30?w=500&q=80',
        },
        {
            id: '6',
            title: 'Interior Wall Painting',
            category: 'Painting',
            price: 'From ETB 50/sqm',
            rating: 4.7,
            technicians: 12,
            image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&q=80',
        },
        {
            id: '7',
            title: 'Furniture Assembly',
            category: 'Carpentry',
            price: 'From ETB 400',
            rating: 4.8,
            technicians: 10,
            image: 'https://images.unsplash.com/photo-1622151834677-70f982c9adef?w=500&q=80',
        },
        {
            id: '8',
            title: 'Garden Maintenance',
            category: 'Gardening',
            price: 'From ETB 600',
            rating: 4.5,
            technicians: 8,
            image: 'https://images.unsplash.com/photo-1615429054742-ef1819619d30?w=500&q=80',
        },
        {
            id: '9',
            title: 'Local Moving Service',
            category: 'Moving',
            price: 'From ETB 2000',
            rating: 4.6,
            technicians: 6,
            image: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=500&q=80',
        },
        {
            id: '10',
            title: 'Pest Control Treatment',
            category: 'Pest Control',
            price: 'From ETB 1000',
            rating: 4.7,
            technicians: 5,
            image: 'https://images.unsplash.com/photo-1587573088697-b4f9d1731689?w=500&q=80',
        },
        {
            id: '11',
            title: 'Refrigerator Repair',
            category: 'Appliance Repair',
            price: 'From ETB 800',
            rating: 4.8,
            technicians: 14,
            image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=500&q=80',
        },
        {
            id: '12',
            title: 'Manicure & Pedicure',
            category: 'Beauty & Spa',
            price: 'From ETB 400',
            rating: 4.9,
            technicians: 25,
            image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=500&q=80',
        },
        {
            id: '13',
            title: 'CCTV Installation',
            category: 'Home Security',
            price: 'From ETB 1500',
            rating: 4.9,
            technicians: 4,
            image: 'https://images.unsplash.com/photo-1558002038-1091a166111c?w=500&q=80',
        },
        {
            id: '14',
            title: 'Wash & Fold',
            category: 'Laundry',
            price: 'From ETB 100/kg',
            rating: 4.6,
            technicians: 18,
            image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb8f?w=500&q=80',
        },
        {
            id: '15',
            title: 'Wedding Photography',
            category: 'Photography',
            price: 'From ETB 5000',
            rating: 4.9,
            technicians: 12,
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80',
        },
    ];

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => navigation.navigate('CategoryDetail', { category: item })}
            activeOpacity={0.8}
        >
            <View style={styles.categoryImageContainer}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.categoryImage}
                    resizeMode="cover"
                />
            </View>
            <Text style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryDark]}
                style={styles.header}
            >
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.greeting}>👋 Hello, {user?.fullName?.split(' ')[0] || 'there'}!</Text>
                        <Text style={styles.headerSubtitle}>✨ What service do you need today?</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.notificationButton}
                        onPress={() => navigation.navigate('Notifications')}
                    >
                        <Ionicons name="notifications-outline" size={26} color={theme.colors.white} />
                        <View style={styles.notificationBadge}>
                            <Text style={styles.notificationBadgeText}>3</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={22} color={theme.colors.primary} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for services..."
                        placeholderTextColor={theme.colors.gray400}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={20} color={theme.colors.gray400} />
                        </TouchableOpacity>
                    )}
                </View>
            </LinearGradient>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Service Categories */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>📂 Service Categories</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={serviceCategories}
                        renderItem={renderCategoryItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesList}
                    />
                </View>

                {/* Popular Services */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>🔥 Popular Services</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    {popularServices.map((service) => {
                        // Find the matching category object to pass full details (like image)
                        const categoryItem = serviceCategories.find(c => c.name === service.category);

                        return (
                            <Card
                                key={service.id}
                                onPress={() => navigation.navigate('CategoryDetail', {
                                    category: categoryItem || {
                                        name: service.category,
                                        image: service.image,
                                        services: 1 // Default count
                                    }
                                })}
                                style={styles.serviceCard}
                            >
                                <Image
                                    source={{ uri: service.image }}
                                    style={styles.serviceImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.serviceContent}>
                                    <View style={styles.serviceHeader}>
                                        <Text style={styles.serviceTitle}>{service.title}</Text>
                                        <View style={styles.ratingContainer}>
                                            <Ionicons name="star" size={18} color={theme.colors.secondary} />
                                            <Text style={styles.rating}>{service.rating}</Text>
                                        </View>
                                    </View>

                                    <Text style={styles.serviceCategory}>{service.category}</Text>

                                    <View style={styles.serviceFooter}>
                                        <Text style={styles.servicePrice}>{service.price}</Text>
                                        <View style={styles.technicianCount}>
                                            <Ionicons name="people-outline" size={18} color={theme.colors.primary} />
                                            <Text style={styles.technicianCountText}>
                                                {service.technicians} technicians
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </Card>
                        );
                    })}
                </View>

                {/* Recent Requests */}
                {recentRequests.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>📋 Recent Requests</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('MyRequests')}>
                                <Text style={styles.seeAll}>View All</Text>
                            </TouchableOpacity>
                        </View>

                        {recentRequests.map((request) => (
                            <Card
                                key={request.id}
                                onPress={() => navigation.navigate('JobStatus', { request })}
                                style={styles.requestCard}
                            >
                                <View style={styles.requestHeader}>
                                    <Text style={styles.requestService}>{request.service}</Text>
                                    <View style={[
                                        styles.statusBadge,
                                        request.status === 'Completed' && styles.statusCompleted,
                                        request.status === 'In Progress' && styles.statusInProgress,
                                        request.status === 'Pending' && styles.statusPending,
                                    ]}>
                                        <Text style={[
                                            styles.statusText,
                                            request.status === 'Completed' && { color: theme.colors.success },
                                            request.status === 'In Progress' && { color: theme.colors.primary },
                                            request.status === 'Pending' && { color: theme.colors.warning },
                                        ]}>{request.status}</Text>
                                    </View>
                                </View>

                                <Text style={styles.requestTechnician}>
                                    {request.technician ? `Technician: ${request.technician.name}` : 'Finding Technician...'}
                                </Text>
                                <Text style={styles.requestDate}>
                                    {new Date(request.date).toLocaleDateString()}
                                </Text>
                            </Card>
                        ))}
                    </View>
                )}

                {/* Quick Actions */}
                <View style={[styles.section, { marginBottom: theme.spacing.xl }]}>
                    <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>

                    <View style={styles.quickActionsGrid}>
                        <TouchableOpacity
                            style={styles.quickAction}
                            onPress={() => navigation.navigate('CreateServiceRequest')}
                        >
                            <View style={[styles.quickActionIcon, { backgroundColor: theme.colors.error }]}>
                                <Ionicons name="megaphone-outline" size={26} color={theme.colors.white} />
                            </View>
                            <Text style={styles.quickActionText}>Emergency</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.quickAction}
                            onPress={() => navigation.navigate('MyRequests')}
                        >
                            <View style={[styles.quickActionIcon, { backgroundColor: theme.colors.blue }]}>
                                <Ionicons name="clipboard-outline" size={26} color={theme.colors.white} />
                            </View>
                            <Text style={styles.quickActionText}>My Requests</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.quickAction}>
                            <View style={[styles.quickActionIcon, { backgroundColor: theme.colors.secondary }]}>
                                <Ionicons name="wallet-outline" size={26} color={theme.colors.white} />
                            </View>
                            <Text style={styles.quickActionText}>Payments</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.quickAction}
                            onPress={() => navigation.navigate('Profile')}
                        >
                            <View style={[styles.quickActionIcon, { backgroundColor: theme.colors.primary }]}>
                                <Ionicons name="person-circle-outline" size={26} color={theme.colors.white} />
                            </View>
                            <Text style={styles.quickActionText}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <FloatingSupportButton />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        paddingTop: 50,
        paddingBottom: theme.spacing.lg,
        paddingHorizontal: theme.spacing.lg,
        borderBottomLeftRadius: theme.borderRadius.xl,
        borderBottomRightRadius: theme.borderRadius.xl,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.lg,
    },
    greeting: {
        fontSize: theme.fontSize.heading,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.white,
    },
    headerSubtitle: {
        fontSize: theme.fontSize.md,
        color: theme.colors.white,
        opacity: 0.9,
        marginTop: theme.spacing.xs,
    },
    notificationButton: {
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: theme.colors.accent,
        borderRadius: theme.borderRadius.round,
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationBadgeText: {
        color: theme.colors.white,
        fontSize: 10,
        fontWeight: theme.fontWeight.bold,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.lg,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        gap: theme.spacing.sm,
    },
    searchInput: {
        flex: 1,
        fontSize: theme.fontSize.md,
        color: theme.colors.textPrimary,
    },
    content: {
        flex: 1,
    },
    section: {
        marginTop: theme.spacing.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.md,
    },
    sectionTitle: {
        fontSize: theme.fontSize.xl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.textPrimary,
    },
    seeAll: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.primary,
        fontWeight: theme.fontWeight.semibold,
    },
    categoriesList: {
        paddingHorizontal: theme.spacing.lg,
        gap: theme.spacing.md,
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: theme.spacing.md,
        width: 80,
    },
    categoryImageContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        overflow: 'hidden',
        marginBottom: theme.spacing.xs,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        ...theme.shadow.sm,
    },
    categoryImage: {
        width: '100%',
        height: '100%',
    },
    categoryName: {
        fontSize: theme.fontSize.xs,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.textPrimary,
        textAlign: 'center',
    },
    serviceCard: {
        marginHorizontal: theme.spacing.lg,
        padding: 0, // Remove padding from card to let image fill width
        overflow: 'hidden',
    },
    serviceImage: {
        width: '100%',
        height: 150,
    },
    serviceContent: {
        padding: theme.spacing.md,
    },
    serviceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.xs,
    },
    serviceTitle: {
        flex: 1,
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.textPrimary,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginLeft: theme.spacing.sm,
    },
    rating: {
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.textPrimary,
    },
    serviceCategory: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.primary,
        marginBottom: theme.spacing.sm,
    },
    serviceFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    servicePrice: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.primary,
    },
    technicianCount: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    technicianCountText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    requestCard: {
        marginHorizontal: theme.spacing.lg,
    },
    requestHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    requestService: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.textPrimary,
    },
    statusBadge: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 4,
        borderRadius: theme.borderRadius.sm,
        backgroundColor: theme.colors.gray200,
    },
    statusCompleted: {
        backgroundColor: theme.colors.success + '15',
    },
    statusInProgress: {
        backgroundColor: theme.colors.primary + '15',
    },
    statusPending: {
        backgroundColor: theme.colors.warning + '15',
    },
    statusText: {
        fontSize: theme.fontSize.xs,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.textSecondary,
    },
    requestTechnician: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        marginBottom: 4,
    },
    requestDate: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.gray400,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: theme.spacing.lg,
        gap: theme.spacing.md,
        justifyContent: 'space-between',
    },
    quickAction: {
        width: '22%',
        alignItems: 'center',
    },
    quickActionIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.sm,
        ...theme.shadow.md,
    },
    quickActionText: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textPrimary,
        textAlign: 'center',
    },
});

export default CustomerHomeScreen;
