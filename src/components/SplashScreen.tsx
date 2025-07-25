import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useResponsiveDimensions } from "../hooks/useResponsiveDimensions";
import OrientationLock from "./common/OrientationLock";

export default function SplashScreen({
    currentScreen,
}: {
    currentScreen: string;
}) {
    const { width, height, isTablet } = useResponsiveDimensions();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    if (currentScreen === "splash") {
        return (
            <OrientationLock>
                <LinearGradient
                    colors={["#667eea", "#764ba2", "#f093fb"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.container, { width, height }]}
                >
                    <StatusBar hidden />
                    <Animated.View
                        style={[
                            styles.splashContainer,
                            {
                                opacity: fadeAnim,
                                transform: [{ scale: scaleAnim }],
                            },
                        ]}
                    >
                        <View style={[styles.animationBox, { 
                            width: isTablet ? 280 : 220, 
                            height: isTablet ? 280 : 220 
                        }]}>
                            <Image
                                source={require("../../assets/images/LOGO.png")}
                                style={styles.lottie}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={[styles.logoTitle, { fontSize: isTablet ? 32 : 26 }]}>
                            International Confirm Win
                        </Text>
                        <Text style={[styles.splashSubtitle, { fontSize: isTablet ? 20 : 16 }]}>
                            Welcome to the future of gaming!
                        </Text>
                    </Animated.View>
                </LinearGradient>
            </OrientationLock>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    splashContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 30,
    },
    animationBox: {
        marginBottom: 20,
    },
    lottie: {
        width: "100%",
        height: "100%",
    },
    logoTitle: {
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        marginBottom: 10,
    },
    splashSubtitle: {
        color: "rgba(255, 255, 255, 0.85)",
        textAlign: "center",
        lineHeight: 22,
    },
});
