import React from "react";
import { Dimensions, StyleSheet, View, ViewStyle } from "react-native";

interface ResponsiveContainerProps {
    children: React.ReactNode;
    style?: ViewStyle;
    maxWidth?: number;
    padding?: number;
}

const { width, height } = Dimensions.get("window");

export default function ResponsiveContainer({
    children,
    style,
    maxWidth = 1200,
    padding = 16,
}: ResponsiveContainerProps) {
    const isTablet = width > 768;
    const containerWidth = Math.min(width, maxWidth);
    
    const responsiveStyles = StyleSheet.create({
        container: {
            width: containerWidth,
            maxWidth: maxWidth,
            paddingHorizontal: isTablet ? padding * 1.5 : padding,
            paddingVertical: padding,
            alignSelf: "center",
            flex: 1,
        },
    });

    return (
        <View style={[responsiveStyles.container, style]}>
            {children}
        </View>
    );
}