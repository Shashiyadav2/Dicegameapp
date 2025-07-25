import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

interface ResponsiveDimensions {
    width: number;
    height: number;
    isTablet: boolean;
    isSmallScreen: boolean;
    isMediumScreen: boolean;
    isLargeScreen: boolean;
    orientation: "landscape" | "portrait";
}

export function useResponsiveDimensions(): ResponsiveDimensions {
    const [dimensions, setDimensions] = useState(() => {
        const { width, height } = Dimensions.get("window");
        return {
            width,
            height,
            isTablet: width > 768,
            isSmallScreen: width < 480,
            isMediumScreen: width >= 480 && width < 768,
            isLargeScreen: width >= 768,
            orientation: width > height ? "landscape" : "portrait",
        };
    });

    useEffect(() => {
        const subscription = Dimensions.addEventListener("change", ({ window }) => {
            const { width, height } = window;
            setDimensions({
                width,
                height,
                isTablet: width > 768,
                isSmallScreen: width < 480,
                isMediumScreen: width >= 480 && width < 768,
                isLargeScreen: width >= 768,
                orientation: width > height ? "landscape" : "portrait",
            });
        });

        return () => subscription?.remove();
    }, []);

    return dimensions;
}