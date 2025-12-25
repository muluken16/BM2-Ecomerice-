import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import theme from '../../theme/theme';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { useApp } from '../../context/AppContext';

const CreateServiceRequestScreen = ({ navigation, route }) => {
    const { addRequest } = useApp();
    const selectedCategory = route.params?.category;

    const [category, setCategory] = useState(selectedCategory?.name || '');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [urgency, setUrgency] = useState('normal');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const categories = [
        { name: 'IT Support', icon: 'laptop-outline', color: theme.colors.primary },
        { name: 'Electronics Repair', icon: 'hardware-chip-outline', color: theme.colors.blue },
        { name: 'Electrical', icon: 'flash-outline', color: theme.colors.accent },
        { name: 'Mechanical', icon: 'construct-outline', color: theme.colors.primary },
        { name: 'Plumbing', icon: 'water-outline', color: theme.colors.secondary },
        { name: 'Carpentry', icon: 'hammer-outline', color: theme.colors.warning },
        { name: 'Automotive', icon: 'car-sport-outline', color: theme.colors.error },
        { name: 'Cleaning', icon: 'sparkles-outline', color: theme.colors.success },
    ];

    const urgencyLevels = [
        { id: 'low', label: 'Low', icon: 'time-outline', color: theme.colors.success, desc: 'Can wait a few days' },
        { id: 'normal', label: 'Normal', icon: 'calendar-outline', color: theme.colors.blue, desc: 'Within 24 hours' },
        { id: 'high', label: 'High', icon: 'alert-circle-outline', color: theme.colors.warning, desc: 'Today' },
        { id: 'urgent', label: 'Urgent', icon: 'flash-outline', color: theme.colors.error, desc: 'Immediate' },
    ];

    const handleImagePick = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Please grant camera roll permissions');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 0.8,
            aspect: [4, 3],
        });

        if (!result.canceled && result.assets) {
            setImages([...images, ...result.assets.slice(0, 4 - images.length)]);
        }
    };

    const handleCameraCapture = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Please grant camera permissions');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 0.8,
            aspect: [4, 3],
        });

        if (!result.canceled && result.assets) {
            setImages([...images, result.assets[0]]);
        }
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (!category) {
            Alert.alert('Error', 'Please select a service category');
            return;
        }
        if (!title.trim()) {
            Alert.alert('Error', 'Please enter a title');
            return;
        }
        if (!description.trim()) {
            Alert.alert('Error', 'Please describe your issue');
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(async () => {
            const newRequest = {
                id: Date.now().toString(),
                category,
                service: title,
                description,
                urgency,
                images: images.map(img => img.uri),
                status: 'Pending',
                date: new Date().toISOString(),
            };

            await addRequest(newRequest);
            setLoading(false);

            Alert.alert(
                'Success! 🎉',
                'Your service request has been submitted. We\'ll find you a technician shortly.',
                [
                    {
                        text: 'View Request',
                        onPress: () => navigation.replace('JobStatus', { request: newRequest }),
                    },
                ]
            );
        }, 1500);
    };

    return (
        <View style={styles.container}>
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
                <Text style={styles.headerTitle}>🛠️ New Service Request</Text>
                <Text style={styles.headerSubtitle}>Tell us what you need help with</Text>
            </LinearGradient>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Category Selection */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        <Ionicons name="apps-outline" size={18} color={theme.colors.textPrimary} /> Service Category *
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesScroll}
                    >
                        {categories.map((cat) => (
                            <TouchableOpacity
                                key={cat.name}
                                onPress={() => setCategory(cat.name)}
                                style={[
                                    styles.categoryChip,
                                    category === cat.name && [styles.categoryChipSelected, { borderColor: cat.color }],
                                ]}
                            >
                                <View style={[
                                    styles.categoryIconWrapper,
                                    category === cat.name && { backgroundColor: cat.color }
                                ]}>
                                    <Ionicons
                                        name={cat.icon}
                                        size={20}
                                        color={category === cat.name ? theme.colors.white : cat.color}
                                    />
                                </View>
                                <Text style={[
                                    styles.categoryChipText,
                                    category === cat.name && styles.categoryChipTextSelected
                                ]}>
                                    {cat.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Title */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        <Ionicons name="create-outline" size={18} color={theme.colors.textPrimary} /> Title *
                    </Text>
                    <Card style={styles.inputCard}>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., Laptop won't turn on"
                            value={title}
                            onChangeText={setTitle}
                            placeholderTextColor={theme.colors.gray400}
                        />
                    </Card>
                </View>

                {/* Description */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        <Ionicons name="document-text-outline" size={18} color={theme.colors.textPrimary} /> Description *
                    </Text>
                    <Card style={styles.inputCard}>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Describe the issue in detail..."
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                            placeholderTextColor={theme.colors.gray400}
                        />
                    </Card>
                </View>

                {/* Urgency Level */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        <Ionicons name="speedometer-outline" size={18} color={theme.colors.textPrimary} /> Urgency Level
                    </Text>
                    <View style={styles.urgencyGrid}>
                        {urgencyLevels.map((level) => (
                            <TouchableOpacity
                                key={level.id}
                                onPress={() => setUrgency(level.id)}
                                style={[
                                    styles.urgencyCard,
                                    urgency === level.id && [styles.urgencyCardSelected, { borderColor: level.color }],
                                ]}
                            >
                                <Ionicons
                                    name={level.icon}
                                    size={28}
                                    color={urgency === level.id ? level.color : theme.colors.gray400}
                                />
                                <Text style={[
                                    styles.urgencyLabel,
                                    urgency === level.id && { color: level.color, fontWeight: theme.fontWeight.bold }
                                ]}>
                                    {level.label}
                                </Text>
                                <Text style={styles.urgencyDesc}>{level.desc}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Images */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        <Ionicons name="images-outline" size={18} color={theme.colors.textPrimary} /> Photos (Optional)
                    </Text>
                    <Text style={styles.sectionSubtitle}>Add up to 4 photos to help technicians understand the issue</Text>

                    <View style={styles.imagesGrid}>
                        {images.map((image, index) => (
                            <View key={index} style={styles.imageContainer}>
                                <Image source={{ uri: image.uri }} style={styles.image} />
                                <TouchableOpacity
                                    style={styles.removeImageButton}
                                    onPress={() => removeImage(index)}
                                >
                                    <Ionicons name="close-circle" size={24} color={theme.colors.error} />
                                </TouchableOpacity>
                            </View>
                        ))}

                        {images.length < 4 && (
                            <>
                                <TouchableOpacity
                                    style={styles.addImageButton}
                                    onPress={handleImagePick}
                                >
                                    <Ionicons name="images-outline" size={32} color={theme.colors.primary} />
                                    <Text style={styles.addImageText}>Gallery</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.addImageButton}
                                    onPress={handleCameraCapture}
                                >
                                    <Ionicons name="camera-outline" size={32} color={theme.colors.primary} />
                                    <Text style={styles.addImageText}>Camera</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>

                {/* Submit Button */}
                <Button
                    title="🚀 Submit Request"
                    onPress={handleSubmit}
                    loading={loading}
                    fullWidth
                    style={styles.submitButton}
                />
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
        paddingTop: 50,
        paddingBottom: theme.spacing.xl,
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
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: theme.spacing.lg,
    },
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.sm,
    },
    sectionSubtitle: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.md,
    },
    categoriesScroll: {
        gap: theme.spacing.sm,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 2,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.white,
        gap: theme.spacing.xs,
    },
    categoryChipSelected: {
        borderWidth: 2,
        backgroundColor: theme.colors.primaryLight + '10',
    },
    categoryIconWrapper: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.gray100,
    },
    categoryChipText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textPrimary,
        fontWeight: theme.fontWeight.medium,
    },
    categoryChipTextSelected: {
        fontWeight: theme.fontWeight.bold,
    },
    inputCard: {
        padding: 0,
    },
    input: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textPrimary,
        padding: theme.spacing.md,
    },
    textArea: {
        minHeight: 120,
    },
    urgencyGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.sm,
    },
    urgencyCard: {
        width: '48%',
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 2,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.white,
        alignItems: 'center',
    },
    urgencyCardSelected: {
        borderWidth: 2,
        backgroundColor: theme.colors.primaryLight + '05',
    },
    urgencyLabel: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textPrimary,
        fontWeight: theme.fontWeight.semibold,
        marginTop: theme.spacing.xs,
    },
    urgencyDesc: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: 2,
    },
    imagesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.sm,
    },
    imageContainer: {
        position: 'relative',
        width: '48%',
        aspectRatio: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: theme.borderRadius.lg,
    },
    removeImageButton: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: theme.colors.white,
        borderRadius: 12,
    },
    addImageButton: {
        width: '48%',
        aspectRatio: 1,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primaryLight + '10',
    },
    addImageText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.primary,
        fontWeight: theme.fontWeight.semibold,
        marginTop: theme.spacing.xs,
    },
    submitButton: {
        marginBottom: theme.spacing.xl,
    },
});

export default CreateServiceRequestScreen;
