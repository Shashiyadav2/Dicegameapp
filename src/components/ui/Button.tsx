import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
    TextStyle,
    Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: "primary" | "secondary" | "success" | "danger" | "outline";
    size?: "small" | "medium" | "large";
    gradient?: boolean;
    gradientColors?: string[];
    textStyle?: TextStyle;
    containerStyle?: ViewStyle;
}

const { width } = Dimensions.get("window");
const isTablet = width > 768;

export default function Button({
    title,
    variant = "primary",
    size = "medium",
    gradient = false,
    gradientColors,
    style,
    textStyle,
    containerStyle,
    disabled,
    ...props
}: ButtonProps) {
    const buttonStyles = [
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style,
    ];

    const textStyles = [
        styles.text,
        styles[`${variant}Text`],
        styles[`${size}Text`],
        disabled && styles.disabledText,
        textStyle,
    ];

    const content = <Text style={textStyles}>{title}</Text>;

    if (gradient && !disabled) {
        const colors = gradientColors || getGradientColors(variant);
        return (
            <TouchableOpacity
                style={[styles.button, styles[size], containerStyle]}
                disabled={disabled}
                {...props}
            >
                <LinearGradient
                    colors={colors}
                    style={[styles.gradient, style]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    {content}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity style={buttonStyles} disabled={disabled} {...props}>
            {content}
        </TouchableOpacity>
    );
}

function getGradientColors(variant: string): string[] {
    switch (variant) {
        case "primary":
            return ["#4c51bf", "#6b46c1"];
        case "success":
            return ["#38a169", "#2f855a"];
        case "danger":
            return ["#e53e3e", "#c53030"];
        default:
            return ["#4c51bf", "#6b46c1"];
    }
}

const styles = StyleSheet.create({
    button: {
        borderRadius: isTablet ? 12 : 8,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    gradient: {
        borderRadius: isTablet ? 12 : 8,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    text: {
        fontWeight: "600",
        textAlign: "center",
    },
    // Variants
    primary: {
        backgroundColor: "#4c51bf",
    },
    secondary: {
        backgroundColor: "#718096",
    },
    success: {
        backgroundColor: "#38a169",
    },
    danger: {
        backgroundColor: "#e53e3e",
    },
    outline: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#4c51bf",
    },
    disabled: {
        backgroundColor: "#a0a0a0",
        shadowOpacity: 0,
        elevation: 0,
    },
    // Sizes
    small: {
        paddingVertical: isTablet ? 10 : 8,
        paddingHorizontal: isTablet ? 20 : 16,
        minHeight: isTablet ? 44 : 36,
    },
    medium: {
        paddingVertical: isTablet ? 14 : 12,
        paddingHorizontal: isTablet ? 28 : 24,
        minHeight: isTablet ? 52 : 44,
    },
    large: {
        paddingVertical: isTablet ? 18 : 16,
        paddingHorizontal: isTablet ? 36 : 32,
        minHeight: isTablet ? 60 : 52,
    },
    // Text variants
    primaryText: {
        color: "#fff",
    },
    secondaryText: {
        color: "#fff",
    },
    successText: {
        color: "#fff",
    },
    dangerText: {
        color: "#fff",
    },
    outlineText: {
        color: "#4c51bf",
    },
    disabledText: {
        color: "#666",
    },
    // Text sizes
    smallText: {
        fontSize: isTablet ? 16 : 14,
    },
    mediumText: {
        fontSize: isTablet ? 18 : 16,
    },
    largeText: {
        fontSize: isTablet ? 20 : 18,
    },
});