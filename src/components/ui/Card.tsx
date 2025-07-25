import React from "react";
import {
    StyleSheet,
    View,
    ViewStyle,
    Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    gradient?: boolean;
    gradientColors?: string[];
    elevation?: number;
    padding?: number;
}

const { width } = Dimensions.get("window");
const isTablet = width > 768;

export default function Card({
    children,
    style,
    gradient = false,
    gradientColors = ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.05)"],
    elevation = 5,
    padding,
}: CardProps) {
    const cardStyle = [
        styles.card,
        { elevation },
        padding && { padding },
        style,
    ];

    if (gradient) {
        return (
            <LinearGradient
                colors={gradientColors}
                style={cardStyle}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {children}
            </LinearGradient>
        );
    }

    return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: isTablet ? 20 : 16,
        padding: isTablet ? 24 : 16,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});