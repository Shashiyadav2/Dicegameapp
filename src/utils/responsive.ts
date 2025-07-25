import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Extract these values before the main object to avoid circular dependency
const isTablet = width > 768;
const isSmallScreen = width < 480;
const isMediumScreen = width >= 480 && width < 768;
const isLargeScreen = width >= 768;

// Responsive scaling functions
const scale = (size: number) => {
    const baseWidth = 375; // iPhone 6/7/8 width as base
    return (width / baseWidth) * size;
};

const verticalScale = (size: number) => {
    const baseHeight = 667; // iPhone 6/7/8 height as base
    return (height / baseHeight) * size;
};

const moderateScale = (size: number, factor = 0.5) => {
    return size + (scale(size) - size) * factor;
};

export const responsiveUtils = {
    // Screen dimensions
    screenWidth: width,
    screenHeight: height,
    
    // Device type detection
    isTablet,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    
    // Responsive scaling functions
    scale,
    verticalScale,
    moderateScale,
    
    // Responsive spacing
    spacing: {
        xs: isTablet ? 6 : 4,
        sm: isTablet ? 12 : 8,
        md: isTablet ? 24 : 16,
        lg: isTablet ? 36 : 24,
        xl: isTablet ? 48 : 32,
        xxl: isTablet ? 60 : 40,
    },
    
    // Responsive font sizes
    fontSize: {
        xs: isTablet ? 14 : 12,
        sm: isTablet ? 16 : 14,
        md: isTablet ? 18 : 16,
        lg: isTablet ? 22 : 18,
        xl: isTablet ? 26 : 20,
        xxl: isTablet ? 32 : 24,
    },
    
    // Responsive border radius
    borderRadius: {
        sm: isTablet ? 6 : 4,
        md: isTablet ? 12 : 8,
        lg: isTablet ? 18 : 12,
        xl: isTablet ? 24 : 16,
        round: 50,
    },
};

export { scale, verticalScale, moderateScale };