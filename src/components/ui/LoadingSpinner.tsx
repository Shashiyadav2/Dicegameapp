import React from "react";
import { ActivityIndicator, StyleSheet, View, Text, Dimensions } from "react-native";

interface LoadingSpinnerProps {
    size?: "small" | "large";
    color?: string;
    text?: string;
    overlay?: boolean;
}

const { width } = Dimensions.get("window");
const isTablet = width > 768;

export default function LoadingSpinner({
    size = "large",
    color = "#4c51bf",
    text,
    overlay = false,
}: LoadingSpinnerProps) {
    const containerStyle = overlay ? styles.overlay : styles.container;

    return (
        <View style={containerStyle}>
            <ActivityIndicator size={size} color={color} />
            {text && <Text style={styles.text}>{text}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: isTablet ? 24 : 16,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    },
    text: {
        marginTop: isTablet ? 16 : 12,
        fontSize: isTablet ? 18 : 16,
        color: "#666",
        textAlign: "center",
    },
});