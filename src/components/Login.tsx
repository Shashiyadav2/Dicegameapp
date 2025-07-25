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
    const { width, height, isTablet } = useResponsiveDimensions();
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
                            styles.loginContainer,
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
                        <View style={[styles.leftPanel, { flex: 1 }]}>
                            <View
                                style={[
                                    styles.animationContainer,
                                    {
                                        width: isTablet ? 300 : 250,
                                        height: isTablet ? 300 : 250,
                                    },
                                ]}
                            >
                                <LottieView
                                    source={require("../../assets/animation/login-animation.json")}
                                    autoPlay
                                    loop
                                    style={styles.lottieAnimation}
                                />
                            </View>
                            <Text
                                style={[
                                    styles.brandText,
                                    { fontSize: isTablet ? 32 : 28 },
                                ]}
                            >
                                Welcome
                            </Text>
                            <Text
                                style={[
                                    styles.brandSubtext,
                                    { fontSize: isTablet ? 20 : 16 },
                                ]}
                            >
                                To ICW Gaming Platform
                            </Text>
                        </View>

                        <View style={[styles.rightPanel, { flex: 1 }]}>
                            <View
                                style={[
                                    styles.card,
                                    { maxWidth: isTablet ? 600 : 480 },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.loginTitle,
                                        { fontSize: isTablet ? 30 : 26 },
                                    ]}
                                >
                                    Welcome Back
                                </Text>
                                <Text
                                    style={[
                                        styles.loginSubtitle,
                                        { fontSize: isTablet ? 20 : 16 },
                                    ]}
                                >
                                    Sign in to continue your journey
                                </Text>

                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={[
                                            styles.input,
                                            { fontSize: isTablet ? 20 : 16 },
                                        ]}
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
                                        style={styles.button}
                                        onPress={handleButtonPress}
                                    >
                                        <LinearGradient
                                            colors={["#ff6b6b", "#ff8e53"]}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={styles.buttonGradient}
                                        >
                                            <Text
                                                style={[
                                                    styles.buttonText,
                                                    {
                                                        fontSize: isTablet
                                                            ? 22
                                                            : 18,
                                                    },
                                                ]}
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

const styles = StyleSheet.create({
    container: { flex: 1 },
    loginContainer: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 50 : StatusBar.currentHeight || 20,
    },
    leftPanel: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    rightPanel: {
        paddingHorizontal: 20,
        justifyContent: "center",
    },
    animationContainer: {
        marginBottom: 20,
    },
    lottieAnimation: {
        width: "100%",
        height: "100%",
    },
    brandText: {
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
    },
    brandSubtext: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 16,
        textAlign: "center",
        marginTop: 8,
    },
    card: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderRadius: 24,
        padding: 32,
        width: "100%",
        maxWidth: 480,
        alignSelf: "center",
    },
    loginTitle: {
        color: "white",
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 8,
    },
    loginSubtitle: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 24,
    },
    inputWrapper: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    input: {
        color: "white",
        fontSize: 16,
        paddingVertical: 14,
    },
    button: {
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 16,
    },
    buttonGradient: {
        paddingVertical: 16,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
});
