import colors from './colors';

const theme = {
    colors,

    // Spacing
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 40,
    },

    // Border radius
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        xxl: 24,
        round: 999,
    },

    // Font sizes
    fontSize: {
        xs: 10,
        sm: 12,
        md: 14,
        lg: 16,
        xl: 18,
        xxl: 20,
        title: 24,
        heading: 28,
        display: 32,
    },

    // Font weights
    fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
    },

    // Shadows
    shadow: {
        sm: {
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
            elevation: 1,
        },
        md: {
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.20,
            shadowRadius: 2.5,
            elevation: 3,
        },
        lg: {
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.22,
            shadowRadius: 4.0,
            elevation: 5,
        },
        xl: {
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.25,
            shadowRadius: 6.0,
            elevation: 8,
        },
    },

    // Animation durations
    animation: {
        fast: 200,
        normal: 300,
        slow: 500,
    },
};

export default theme;
