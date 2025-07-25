import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
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
            "No room for hesitation — it's now or never. Make your move or miss your moment.",
    },
];

export default function Onboarding({
    onboardingStep,
    setOnboardingStep,
    setCurrentScreen,
}: OnboardingProps) {
    const { width, height, scale, fontScale, spacing, isTablet } = useResponsiveDimensions();
    const window = useWindowDimensions();
    const isLandscape = window.width > window.height;
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
                style={[styles(scale, fontScale, spacing, isLandscape).container, { width, height }]}
            >
                <StatusBar hidden />
                <View style={styles(scale, fontScale, spacing, isLandscape).onboardingContainer}>
                    <TouchableOpacity
                        style={styles(scale, fontScale, spacing, isLandscape).skipButton}
                        onPress={skipOnboarding}
                    >
                        <Text style={styles(scale, fontScale, spacing, isLandscape).skipText}>Skip</Text>
                    </TouchableOpacity>

                    <View style={styles(scale, fontScale, spacing, isLandscape).onboardingContent}>
                        <View
                            style={[
                                styles(scale, fontScale, spacing, isLandscape).lottieWrapper,
                                {
                                    width: Math.round((isSecondStep ? (isLandscape ? 240 : 290) : (isLandscape ? 160 : 200)) * scale),
                                    height: Math.round((isSecondStep ? (isLandscape ? 240 : 290) : (isLandscape ? 160 : 200)) * scale),
                                },
                            ]}
                        >
                            <LottieView
                                source={currentData.lottie}
                                autoPlay
                                loop
                                style={styles(scale, fontScale, spacing, isLandscape).lottieAnimation}
                            />
                        </View>
                    </View>

                    <View style={styles(scale, fontScale, spacing, isLandscape).onboardingFooter}>
                        <View style={styles(scale, fontScale, spacing, isLandscape).dotsContainer}>
                            {onboardingData.map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles(scale, fontScale, spacing, isLandscape).dot,
                                        {
                                            width: Math.round(14 * scale),
                                            height: Math.round(14 * scale),
                                            borderRadius: Math.round(7 * scale),
                                        },
                                        index === onboardingStep
                                            ? styles(scale, fontScale, spacing, isLandscape).activeDot
                                            : styles(scale, fontScale, spacing, isLandscape).inactiveDot,
                                    ]}
                                />
                            ))}
                        </View>
                        <View style={styles(scale, fontScale, spacing, isLandscape).textAndButtonBlock}>
                            <View style={styles(scale, fontScale, spacing, isLandscape).textBlock}>
                                <Text style={styles(scale, fontScale, spacing, isLandscape).onboardingTitle}>
                                    {currentData.title}
                                </Text>
                                <Text style={styles(scale, fontScale, spacing, isLandscape).onboardingDescription}>
                                    {currentData.description}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles(scale, fontScale, spacing, isLandscape).button}
                                onPress={nextOnboarding}
                            >
                                <LinearGradient
                                    colors={["#ff6b6b", "#ff8e53"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles(scale, fontScale, spacing, isLandscape).buttonGradient}
                                >
                                    <Text style={styles(scale, fontScale, spacing, isLandscape).buttonText}>
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

const styles = (scale: number, fontScale: number, spacing: any, isLandscape: boolean) => StyleSheet.create({
    container: {
        flex: 1,
    },
    onboardingContainer: {
        flex: 1,
        paddingHorizontal: isLandscape ? spacing.xl * 2 : spacing.lg,
        paddingTop: isLandscape ? spacing.lg : Math.round(50 * scale),
        justifyContent: "space-between",
    },
    skipButton: {
        alignSelf: "flex-end",
        padding: spacing.sm,
    },
    skipText: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: Math.round(18 * fontScale),
    },
    onboardingContent: {
        flex: 1,
        justifyContent: isLandscape ? "center" : "center",
        alignItems: "center",
        paddingHorizontal: isLandscape ? spacing.xl : spacing.lg,
    },
    lottieWrapper: {
        marginBottom: isLandscape ? spacing.md : spacing.sm,
        alignItems: "center",
        justifyContent: "center",
    },
    lottieAnimation: {
        width: "100%",
        height: "100%",
    },
    textAndButtonBlock: {
        alignItems: "center",
        width: "100%",
    },
    textBlock: {
        marginBottom: isLandscape ? spacing.md : spacing.lg,
        alignItems: "center",
        width: "100%",
    },
    onboardingTitle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: spacing.sm,
        paddingHorizontal: spacing.sm,
        width: "100%",
        fontSize: isLandscape ? Math.round(30 * fontScale) : Math.round(35 * fontScale),
    },
    onboardingDescription: {
        color: "rgba(255, 255, 255, 0.85)",
        textAlign: "center",
        lineHeight: Math.round(26 * fontScale),
        maxWidth: isLandscape ? Math.round(600 * scale) : Math.round(420 * scale),
        paddingHorizontal: spacing.sm,
        width: "100%",
        fontSize: isLandscape ? Math.round(18 * fontScale) : Math.round(20 * fontScale),
    },
    onboardingFooter: {
        alignItems: "center",
        marginBottom: isLandscape ? spacing.lg : Math.round(40 * scale),
    },
    dotsContainer: {
        flexDirection: "row",
        marginTop: isLandscape ? spacing.lg : Math.round(90 * scale),
    },
    dot: {
        marginHorizontal: spacing.xs,
    },
    activeDot: {
        backgroundColor: "white",
    },
    inactiveDot: {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
    },
    button: {
        borderRadius: Math.round(16 * scale),
        overflow: "hidden",
    },
    buttonGradient: {
        paddingVertical: spacing.md,
        paddingHorizontal: Math.round(40 * scale),
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
        fontSize: Math.round(18 * fontScale),
    },
});
