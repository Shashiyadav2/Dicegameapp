import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useResponsiveDimensions } from "../hooks/useResponsiveDimensions";
import OrientationLock from "./common/OrientationLock";

interface LoginProps {
    mobileNumber: string;
    setMobileNumber: (mobileNumber: string) => void;
    setCurrentScreen: (screen: string) => void;
}

export default function Login({
    mobileNumber,
    setMobileNumber,
    setCurrentScreen,
}: LoginProps) {
    const { width, height, scale, fontScale, spacing, isTablet } = useResponsiveDimensions();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const buttonScale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleButtonPress = () => {
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(buttonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();

        // Simulate login success and navigate to main
        setTimeout(() => {
            setCurrentScreen("main");
        }, 500);
    };

    return (
        <OrientationLock>
            <LinearGradient
                colors={["#667eea", "#764ba2", "#f093fb"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.container, { width, height }]}
            >
                <StatusBar
                    hidden
                />

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    style={{ flex: 1 }}
                >
                    <Animated.View
                        style={[
                            styles(scale, fontScale, spacing).loginContainer,
                            {
                                opacity: fadeAnim,
                                transform: [
                                    { translateY: slideAnim },
                                    { scale: scaleAnim },
                                ],
                                flexDirection: "row", // Always landscape layout
                            },
                        ]}
                    >
                        <View style={[styles(scale, fontScale, spacing).leftPanel, { flex: 1 }]}>
                            <View
                                style={[
                                    styles(scale, fontScale, spacing).animationContainer,
                                    {
                                        width: Math.round(270 * scale),
                                        height: Math.round(270 * scale),
                                    },
                                ]}
                            >
                                <LottieView
                                    source={require("../../assets/animation/login-animation.json")}
                                    autoPlay
                                    loop
                                    style={styles(scale, fontScale, spacing).lottieAnimation}
                                />
                            </View>
                            <Text
                                style={styles(scale, fontScale, spacing).brandText}
                            >
                                Welcome
                            </Text>
                            <Text
                                style={styles(scale, fontScale, spacing).brandSubtext}
                            >
                                To ICW Gaming Platform
                            </Text>
                        </View>

                        <View style={[styles(scale, fontScale, spacing).rightPanel, { flex: 1 }]}>
                            <View
                                style={[
                                    styles(scale, fontScale, spacing).card,
                                    { maxWidth: Math.round(520 * scale) },
                                ]}
                            >
                                <Text
                                    style={styles(scale, fontScale, spacing).loginTitle}
                                >
                                    Welcome Back
                                </Text>
                                <Text
                                    style={styles(scale, fontScale, spacing).loginSubtitle}
                                >
                                    Sign in to continue your journey
                                </Text>

                                <View style={styles(scale, fontScale, spacing).inputWrapper}>
                                    <TextInput
                                        style={styles(scale, fontScale, spacing).input}
                                        placeholder="Mobile Number"
                                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                                        value={mobileNumber}
                                        onChangeText={setMobileNumber}
                                        keyboardType="phone-pad"
                                        autoCapitalize="none"
                                    />
                                </View>

                                <Animated.View
                                    style={{
                                        transform: [{ scale: buttonScale }],
                                    }}
                                >
                                    <TouchableOpacity
                                        style={styles(scale, fontScale, spacing).button}
                                        onPress={handleButtonPress}
                                    >
                                        <LinearGradient
                                            colors={["#ff6b6b", "#ff8e53"]}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={styles(scale, fontScale, spacing).buttonGradient}
                                        >
                                            <Text
                                                style={styles(scale, fontScale, spacing).buttonText}
                                            >
                                                Send OTP
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>
                        </View>
                    </Animated.View>
                </KeyboardAvoidingView>
            </LinearGradient>
        </OrientationLock>
    );
}

const styles = (scale: number, fontScale: number, spacing: any) => StyleSheet.create({
    container: { flex: 1 },
    loginContainer: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? Math.round(50 * scale) : Math.round((StatusBar.currentHeight || 20) * scale),
    },
    leftPanel: {
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.lg,
    },
    rightPanel: {
        paddingHorizontal: spacing.lg,
        justifyContent: "center",
    },
    animationContainer: {
        marginBottom: spacing.lg,
    },
    lottieAnimation: {
        width: "100%",
        height: "100%",
    },
    brandText: {
        color: "white",
        fontSize: Math.round(30 * fontScale),
        fontWeight: "bold",
        textAlign: "center",
    },
    brandSubtext: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: Math.round(18 * fontScale),
        textAlign: "center",
        marginTop: spacing.sm,
    },
    card: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderRadius: Math.round(24 * scale),
        padding: spacing.xl,
        width: "100%",
        alignSelf: "center",
    },
    loginTitle: {
        color: "white",
        fontSize: Math.round(28 * fontScale),
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: spacing.sm,
    },
    loginSubtitle: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: Math.round(18 * fontScale),
        textAlign: "center",
        marginBottom: spacing.lg,
    },
    inputWrapper: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: Math.round(12 * scale),
        paddingHorizontal: spacing.md,
        marginBottom: spacing.md,
    },
    input: {
        color: "white",
        fontSize: Math.round(18 * fontScale),
        paddingVertical: spacing.md,
    },
    button: {
        borderRadius: Math.round(16 * scale),
        overflow: "hidden",
        marginBottom: spacing.md,
    },
    buttonGradient: {
        paddingVertical: spacing.md,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: Math.round(20 * fontScale),
        fontWeight: "600",
    },
});
