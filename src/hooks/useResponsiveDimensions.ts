import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

interface ResponsiveDimensions {
    width: number;
    height: number;
    isTablet: boolean;
    isSmallScreen: boolean;
    isMediumScreen: boolean;
    isLargeScreen: boolean;
    isExtraLarge: boolean;
    orientation: "landscape" | "portrait";
    scale: number;
    fontScale: number;
    spacing: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
    };
    cardDimensions: {
        width: number;
        height: number;
        padding: number;
        margin: number;
    };
}

export function useResponsiveDimensions(): ResponsiveDimensions {
    const [dimensions, setDimensions] = useState(() => {
        const { width, height } = Dimensions.get("window");
        
        // Base scaling factors for landscape mode
        const baseWidth = 768; // iPad landscape width as baseline
        const scale = Math.min(width / baseWidth, 1.5); // Cap scaling at 1.5x
        const fontScale = Math.min(scale, 1.3); // More conservative font scaling
        
        // Device categorization for landscape
        const isSmallScreen = width < 768; // Small tablets/phones in landscape
        const isMediumScreen = width >= 768 && width < 1024; // Standard tablets
        const isLargeScreen = width >= 1024 && width < 1366; // Large tablets
        const isExtraLarge = width >= 1366; // Desktop/large displays
        const isTablet = width >= 768;
        
        // Responsive spacing system
        const spacing = {
            xs: Math.round(4 * scale),
            sm: Math.round(8 * scale),
            md: Math.round(16 * scale),
            lg: Math.round(24 * scale),
            xl: Math.round(32 * scale),
        };
        
        // Card dimensions based on screen size
        const cardDimensions = {
            width: Math.min(width * 0.22, 200), // Max 200px width
            height: Math.min(height * 0.25, 120), // Max 120px height
            padding: spacing.md,
            margin: spacing.sm,
        };
        
        return {
            width,
            height,
            isTablet,
            isSmallScreen,
            isMediumScreen,
            isLargeScreen,
            isExtraLarge,
            orientation: width > height ? "landscape" : "portrait",
            scale,
            fontScale,
            spacing,
            cardDimensions,
        };
    });

    useEffect(() => {
        const subscription = Dimensions.addEventListener("change", ({ window }) => {
            const { width, height } = window;
            
            const baseWidth = 768;
            const scale = Math.min(width / baseWidth, 1.5);
            const fontScale = Math.min(scale, 1.3);
            
            const isSmallScreen = width < 768;
            const isMediumScreen = width >= 768 && width < 1024;
            const isLargeScreen = width >= 1024 && width < 1366;
            const isExtraLarge = width >= 1366;
            const isTablet = width >= 768;
            
            const spacing = {
                xs: Math.round(4 * scale),
                sm: Math.round(8 * scale),
                md: Math.round(16 * scale),
                lg: Math.round(24 * scale),
                xl: Math.round(32 * scale),
            };
            
            const cardDimensions = {
                width: Math.min(width * 0.22, 200),
                height: Math.min(height * 0.25, 120),
                padding: spacing.md,
                margin: spacing.sm,
            };
            
            setDimensions({
                width,
                height,
                isTablet,
                isSmallScreen,
                isMediumScreen,
                isLargeScreen,
                isExtraLarge,
                orientation: width > height ? "landscape" : "portrait",
                scale,
                fontScale,
                spacing,
                cardDimensions,
            });
        });

        return () => subscription?.remove();
    }, []);

    return dimensions;
}

// Helper functions for responsive design
export const getResponsiveSize = (baseSize: number, scale: number): number => {
    return Math.round(baseSize * scale);
};

export const getResponsiveFontSize = (baseSize: number, fontScale: number): number => {
    return Math.round(baseSize * fontScale);
};

export const getResponsiveSpacing = (baseSpacing: number, scale: number): number => {
    return Math.round(baseSpacing * scale);
};