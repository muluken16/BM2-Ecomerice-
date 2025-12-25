import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import theme from '../theme/theme';

const FloatingSupportButton = () => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Support');
    };

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={handlePress}
            activeOpacity={0.8}
        >
            <Ionicons name="headset" size={28} color={theme.colors.white} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: theme.colors.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        zIndex: 999,
    },
});

export default FloatingSupportButton;
