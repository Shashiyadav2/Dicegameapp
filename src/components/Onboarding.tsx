import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import React from "react";
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useResponsiveDimensions } from "../hooks/useResponsiveDimensions";
import OrientationLock from "./common/OrientationLock";

interface OnboardingProps {
    onboardingStep: number;
    setOnboardingStep: (step: number) => void;
    setCurrentScreen: (screen: string) => void;
}

const onboardingData = [
    {
        lottie: require("../../assets/animation/onboarding1.json"),
        title: "Fortune favors the bold",
        description:
            "Play with confidence. The biggest rewards go to those who dare.",
    },
    {
        lottie: require("../../assets/animation/onboarding2.json"),
        title: "All in? Or all out of excuses",
        description:
            "No room for hesitation — it’s now or never. Make your move or miss your moment.",
    },
];

export default function Onboarding({
    onboardingStep,
    setOnboardingStep,
    setCurrentScreen,
}: OnboardingProps) {
    const { width, height, isTablet } = useResponsiveDimensions();
    const currentData = onboardingData[onboardingStep];

    const isSecondStep = onboardingStep === 1;

    const nextOnboarding = () => {
        if (onboardingStep < onboardingData.length - 1) {
            setOnboardingStep(onboardingStep + 1);
        } else {
            setCurrentScreen("login");
        }
    };

    const skipOnboarding = () => {
        setCurrentScreen("login");
    };

    return (
        <OrientationLock>
            <LinearGradient
                colors={["#667eea", "#764ba2", "#f093fb"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.container, { width, height }]}
            >
                <StatusBar hidden />
                <View style={styles.onboardingContainer}>
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={skipOnboarding}
                    >
                        <Text style={[styles.skipText, { fontSize: isTablet ? 20 : 16 }]}>Skip</Text>
                    </TouchableOpacity>

                    <View style={styles.onboardingContent}>
                        <View
                            style={[
                                styles.lottieWrapper,
                                {
                                    width: isSecondStep ? (isTablet ? 320 : 260) : (isTablet ? 220 : 180),
                                    height: isSecondStep ? (isTablet ? 320 : 260) : (isTablet ? 220 : 180),
                                },
                            ]}
                        >
                            <LottieView
                                source={currentData.lottie}
                                autoPlay
                                loop
                                style={styles.lottieAnimation}
                            />
                        </View>
                    </View>

                    <View style={styles.onboardingFooter}>
                        <View style={styles.dotsContainer}>
                            {onboardingData.map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.dot,
                                        {
                                            width: isTablet ? 16 : 12,
                                            height: isTablet ? 16 : 12,
                                            borderRadius: isTablet ? 8 : 6,
                                        },
                                        index === onboardingStep
                                            ? styles.activeDot
                                            : styles.inactiveDot,
                                    ]}
                                />
                            ))}
                        </View>
                        <View style={styles.textAndButtonBlock}>
                            <View style={styles.textBlock}>
                                <Text style={[styles.onboardingTitle, { fontSize: isTablet ? 38 : 32 }]}>
                                    {currentData.title}
                                </Text>
                                <Text style={[styles.onboardingDescription, { fontSize: isTablet ? 22 : 18 }]}>
                                    {currentData.description}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={nextOnboarding}
                            >
                                <LinearGradient
                                    colors={["#ff6b6b", "#ff8e53"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.buttonGradient}
                                >
                                    <Text style={[styles.buttonText, { fontSize: isTablet ? 20 : 16 }]}>
                                        {onboardingStep < onboardingData.length - 1
                                            ? "Next"
                                            : "Get Started"}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </OrientationLock>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    onboardingContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 50,
        justifyContent: "space-between",
    },
    skipButton: {
        alignSelf: "flex-end",
        padding: 10,
    },
    skipText: {
        color: "rgba(255, 255, 255, 0.8)",
    },
    onboardingContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    lottieWrapper: {
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    lottieAnimation: {
        width: "100%",
        height: "100%",
    },
    textAndButtonBlock: {
        marginTop: 0,
        marginBottom: 0,
        alignItems: "center",
        width: "100%",
    },
    textBlock: {
        marginBottom: 24,
        alignItems: "center",
        width: "100%",
    },
    onboardingTitle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
        paddingHorizontal: 8,
        width: "100%",
    },
    onboardingDescription: {
        color: "rgba(255, 255, 255, 0.85)",
        textAlign: "center",
        lineHeight: 26,
        maxWidth: 420,
        paddingHorizontal: 8,
        width: "100%",
    },
    onboardingFooter: {
        alignItems: "center",
        marginBottom: 40,
    },
    dotsContainer: {
        flexDirection: "row",
        marginTop: 90,
        marginBottom: 0,
    },
    dot: {
        marginHorizontal: 6,
    },
    activeDot: {
        backgroundColor: "white",
    },
    inactiveDot: {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
    },
    button: {
        borderRadius: 16,
        overflow: "hidden",
    },
    buttonGradient: {
        paddingVertical: 14,
        paddingHorizontal: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
    },
});
