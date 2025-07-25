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
    const { width, height } = useResponsiveDimensions();

    // Dynamic sizing for landscape responsiveness
    const lottieSize = width * 0.25;
    const brandTextFontSize = width * 0.03;
    const brandSubtextFontSize = width * 0.018;
    const cardMaxWidth = width * 0.45;
    const loginTitleFontSize = width * 0.025;
    const loginSubtitleFontSize = width * 0.016;
    const inputFontSize = width * 0.016;
    const buttonTextFontSize = width * 0.018;
    const borderRadius = width * 0.02;
    const padding = width * 0.02;
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
                                paddingTop:
                                    Platform.OS === "ios" ? padding * 2 : padding,
                                paddingHorizontal: padding,
                            },
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
                                        width: lottieSize,
                                        height: lottieSize,
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
                                    { fontSize: brandTextFontSize },
                                ]}
                            >
                                Welcome
                            </Text>
                            <Text
                                style={[
                                    styles.brandSubtext,
                                    { fontSize: brandSubtextFontSize },
                                ]}
                            >
                                To ICW Gaming Platform
                            </Text>
                        </View>

                        <View style={[styles.rightPanel, { flex: 1 }]}>
                            <View
                                style={[
                                    styles.card,
                                    {
                                        maxWidth: cardMaxWidth,
                                        borderRadius: borderRadius,
                                        padding: padding,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.loginTitle,
                                        { fontSize: loginTitleFontSize },
                                    ]}
                                >
                                    Welcome Back
                                </Text>
                                <Text
                                    style={[
                                        styles.loginSubtitle,
                                        { fontSize: loginSubtitleFontSize },
                                    ]}
                                >
                                    Sign in to continue your journey
                                </Text>

                                <View style={[styles.inputWrapper, { borderRadius: borderRadius * 0.75 }]}>
                                    <TextInput
                                        style={[styles.input, { fontSize: inputFontSize, paddingVertical: padding * 0.75 }]}
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
                                        style={[styles.button, { borderRadius: borderRadius }]}
                                        onPress={handleButtonPress}
                                    >
                                        <LinearGradient
                                            colors={["#ff6b6b", "#ff8e53"]}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={[styles.buttonGradient, { paddingVertical: padding * 0.8 }]}
                                        >
                                            <Text
                                                style={[
                                                    styles.buttonText,
                                                    {
                                                        fontSize: buttonTextFontSize,
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
        flexDirection: "row",
    },
    leftPanel: {
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    rightPanel: {
        paddingHorizontal: 24,
        justifyContent: "center",
    },
    animationContainer: {
        marginBottom: 24,
    },
    lottieAnimation: {
        width: "100%",
        height: "100%",
    },
    brandText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    brandSubtext: {
        color: "rgba(255, 255, 255, 0.8)",
        textAlign: "center",
        marginTop: 8,
    },
    card: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        width: "100%",
        alignSelf: "center",
    },
    loginTitle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 8,
    },
    loginSubtitle: {
        color: "rgba(255, 255, 255, 0.8)",
        textAlign: "center",
        marginBottom: 24,
    },
    inputWrapper: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    input: {
        color: "white",
    },
    button: {
        overflow: "hidden",
        marginBottom: 16,
    },
    buttonGradient: {
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
    },
});
