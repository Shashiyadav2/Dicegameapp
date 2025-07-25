import { VideoView, useVideoPlayer } from "expo-video";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    Easing,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { GameProvider, useGameContext } from "../src/Context/gamecontext";
import { useResponsiveDimensions } from "../src/hooks/useResponsiveDimensions";

// Utility function
function timerStringToSeconds(timer: string): number {
    const [h, m, s] = timer.split(":").map(Number);
    return h * 3600 + m * 60 + s;
}

// OnlineUsersCard Component
const OnlineUsersCard: React.FC<{ count: number }> = ({ count }) => {
    const { scale, fontScale, spacing, cardDimensions } = useResponsiveDimensions();
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const scaleAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.05,
                    duration: 3000,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true,
                }),
            ])
        );

        const pulseAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.3,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );

        scaleAnimation.start();
        pulseAnimation.start();

        return () => {
            scaleAnimation.stop();
            pulseAnimation.stop();
        };
    }, []);

    return (
        <Animated.View
            style={[
                styles(scale, fontScale, spacing, cardDimensions).card,
                styles(scale, fontScale, spacing, cardDimensions).onlineCard,
                { transform: [{ scale: scaleAnim }] },
            ]}
        >
            <View style={styles(scale, fontScale, spacing, cardDimensions).cardOverlay} />
            <View style={styles(scale, fontScale, spacing, cardDimensions).cardContent}>
                <View style={styles(scale, fontScale, spacing, cardDimensions).iconContainer}>
                    <Text style={styles(scale, fontScale, spacing, cardDimensions).userIcon}>👥</Text>
                    <Animated.View
                        style={[
                            styles(scale, fontScale, spacing, cardDimensions).glowEffect,
                            { transform: [{ scale: pulseAnim }] },
                        ]}
                    />
                </View>
                <View style={styles(scale, fontScale, spacing, cardDimensions).textContainer}>
                    <Text style={styles(scale, fontScale, spacing, cardDimensions).countText}>{count}</Text>
                    <Text style={styles(scale, fontScale, spacing, cardDimensions).labelText}>ONLINE PLAYERS</Text>
                </View>
                <View style={styles(scale, fontScale, spacing, cardDimensions).statusDots}>
                    {[0, 1, 2].map((i) => (
                        <Animated.View
                            key={i}
                            style={[
                                styles(scale, fontScale, spacing, cardDimensions).statusDot,
                                {
                                    transform: [{ scale: pulseAnim }],
                                },
                            ]}
                        />
                    ))}
                </View>
            </View>
        </Animated.View>
    );
};

// BetAmountCard Component
const BetAmountCard: React.FC<{ amount: number }> = ({ amount }) => {
    const { scale, fontScale, spacing, cardDimensions } = useResponsiveDimensions();
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 10000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );
        animation.start();

        return () => animation.stop();
    }, []);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <Animated.View
            style={[
                styles(scale, fontScale, spacing, cardDimensions).card,
                styles(scale, fontScale, spacing, cardDimensions).betCard,
                { transform: [{ scale: scaleAnim }] },
            ]}
        >
            <View style={styles(scale, fontScale, spacing, cardDimensions).cardOverlay} />
            <View style={styles(scale, fontScale, spacing, cardDimensions).cardContent}>
                <View style={styles(scale, fontScale, spacing, cardDimensions).coinContainer}>
                    {/*  <Image
            source={{ uri: `https://example.com/assets/${amount}rupee.png` }}
            style={styles(scale, fontScale, spacing, cardDimensions).coinImage}
            defaultSource={require('./assets/coin-placeholder.png')} // Add a placeholder
          /> */}
                    <Animated.View
                        style={[styles(scale, fontScale, spacing, cardDimensions).coinGlow, { transform: [{ rotate }] }]}
                    />
                </View>
                <Text style={styles(scale, fontScale, spacing, cardDimensions).betText}>
                    You have selected ₹{amount} table
                </Text>
                <View style={styles(scale, fontScale, spacing, cardDimensions).statusIndicator} />
            </View>
        </Animated.View>
    );
};

// SlotPreviewCard Component
const SlotPreviewCard: React.FC<{
    gamePhase: string;
    currentCity?: string;
    currentNumber?: number;
}> = ({ gamePhase, currentCity, currentNumber }) => {
    const { scale, fontScale, spacing, cardDimensions } = useResponsiveDimensions();
    const cityAnim = useRef(new Animated.Value(0)).current;
    const diceAnim = useRef(new Animated.Value(0)).current;
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    const cities = ["DUBAI", "MUMBAI", "NEWYORK", "TOKYO"];
    const dice = [1, 2, 3, 4];

    useEffect(() => {
        if (gamePhase === "spinning") {
            const cityAnimation = Animated.loop(
                Animated.timing(cityAnim, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            );

            const diceAnimation = Animated.loop(
                Animated.timing(diceAnim, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            );

            const shimmerAnimation = Animated.loop(
                Animated.timing(shimmerAnim, {
                    toValue: 1,
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                })
            );

            cityAnimation.start();
            diceAnimation.start();
            shimmerAnimation.start();

            return () => {
                cityAnimation.stop();
                diceAnimation.stop();
                shimmerAnimation.stop();
            };
        }
    }, [gamePhase]);

    const cityTranslateY = cityAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -100],
    });

    const diceTranslateY = diceAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -80],
    });

    const shimmerTranslateX = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 100],
    });

    return (
        <View style={[styles(scale, fontScale, spacing, cardDimensions).card, styles(scale, fontScale, spacing, cardDimensions).slotCard]}>
            <View style={styles(scale, fontScale, spacing, cardDimensions).cardOverlay} />
            <View style={styles(scale, fontScale, spacing, cardDimensions).slotContent}>
                <View style={styles(scale, fontScale, spacing, cardDimensions).slotSection}>
                    <Animated.View
                        style={[
                            styles(scale, fontScale, spacing, cardDimensions).slotItems,
                            { transform: [{ translateY: cityTranslateY }] },
                        ]}
                    >
                        {cities.map((city, index) => (
                            <View key={index} style={styles(scale, fontScale, spacing, cardDimensions).slotItem}>
                                {/*   <Image
                  source={{ uri: `https://example.com/assets/${city}.png` }}
                  style={styles(scale, fontScale, spacing, cardDimensions).slotImage}
                /> */}
                            </View>
                        ))}
                    </Animated.View>
                </View>

                <View style={styles(scale, fontScale, spacing, cardDimensions).divider} />

                <View style={styles(scale, fontScale, spacing, cardDimensions).slotSection}>
                    <Animated.View
                        style={[
                            styles(scale, fontScale, spacing, cardDimensions).slotItems,
                            { transform: [{ translateY: diceTranslateY }] },
                        ]}
                    >
                        {dice.map((num, index) => (
                            <View key={index} style={styles(scale, fontScale, spacing, cardDimensions).slotItem}>
                                {/*   <Image
                  source={{ uri: `https://example.com/assets/Dice${num}.png` }}
                  style={styles(scale, fontScale, spacing, cardDimensions).slotImage}
                /> */}
                            </View>
                        ))}
                    </Animated.View>
                </View>
            </View>

            {gamePhase === "spinning" && (
                <Animated.View
                    style={[
                        styles(scale, fontScale, spacing, cardDimensions).shimmerOverlay,
                        { transform: [{ translateX: shimmerTranslateX }] },
                    ]}
                />
            )}

            <View style={styles(scale, fontScale, spacing, cardDimensions).statusIndicator} />
        </View>
    );
};

// TimerCard Component
const TimerCard: React.FC<{ seconds: number }> = ({ seconds }) => {
    const { scale, fontScale, spacing, cardDimensions } = useResponsiveDimensions();
    const isUrgent = seconds <= 10;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const glowAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (isUrgent) {
            const urgentAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(scaleAnim, {
                        toValue: 1.05,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnim, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ])
            );

            const glowAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(glowAnim, {
                        toValue: 1.5,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                    Animated.timing(glowAnim, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                ])
            );

            urgentAnimation.start();
            glowAnimation.start();

            return () => {
                urgentAnimation.stop();
                glowAnimation.stop();
            };
        }
    }, [isUrgent]);

    return (
        <Animated.View
            style={[
                styles(scale, fontScale, spacing, cardDimensions).card,
                isUrgent ? styles(scale, fontScale, spacing, cardDimensions).urgentTimerCard : styles(scale, fontScale, spacing, cardDimensions).normalTimerCard,
                { transform: [{ scale: scaleAnim }] },
            ]}
        >
            <View style={styles(scale, fontScale, spacing, cardDimensions).cardOverlay} />
            <View style={styles(scale, fontScale, spacing, cardDimensions).timerContent}>
                <Text style={styles(scale, fontScale, spacing, cardDimensions).timerLabel}>SECONDS LEFT</Text>
                <View style={styles(scale, fontScale, spacing, cardDimensions).timerNumberContainer}>
                    <Animated.Text
                        style={[
                            styles(scale, fontScale, spacing, cardDimensions).timerNumber,
                            { transform: [{ scale: glowAnim }] },
                        ]}
                    >
                        {seconds}
                    </Animated.Text>
                    {isUrgent && (
                        <Animated.View
                            style={[
                                styles(scale, fontScale, spacing, cardDimensions).urgentGlow,
                                { transform: [{ scale: glowAnim }] },
                            ]}
                        />
                    )}
                </View>
                <View style={styles(scale, fontScale, spacing, cardDimensions).timerDots}>
                    {[0, 1, 2].map((i) => (
                        <Animated.View
                            key={i}
                            style={[
                                styles(scale, fontScale, spacing, cardDimensions).timerDot,
                                isUrgent ? styles(scale, fontScale, spacing, cardDimensions).urgentDot : styles(scale, fontScale, spacing, cardDimensions).normalDot,
                                { transform: [{ scale: glowAnim }] },
                            ]}
                        />
                    ))}
                </View>
            </View>
        </Animated.View>
    );
};

// Main Component
const DiceWaitingPageContent: React.FC = () => {
    const { width, height, scale, fontScale, spacing } = useResponsiveDimensions();
    const {
        onlineUsers,
        totalBet,
        timer,
        gamePhase,
        currentCity,
        currentNumber,
    } = useGameContext();

    const timerSeconds = timerStringToSeconds(timer);
    const player = useVideoPlayer(
        require("../assets/Video/dicevideo.mp4"),
        (player) => {
            player.loop = true;
            player.play();
            player.muted = true;
        }
    );

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles(scale, fontScale, spacing, {}).container}>
            <View style={styles(scale, fontScale, spacing, {}).backgroundOverlay} />

            <Animated.View style={[styles(scale, fontScale, spacing, {}).topSection, { opacity: fadeAnim, height: height * 0.25 }]}>
                <View style={styles(scale, fontScale, spacing, {}).cardRow}>
                    <OnlineUsersCard count={onlineUsers} />
                    <BetAmountCard amount={totalBet} />
                    <SlotPreviewCard
                        gamePhase={gamePhase}
                        currentCity={currentCity}
                        currentNumber={currentNumber}
                    />
                    <TimerCard seconds={timerSeconds} />
                </View>
            </Animated.View>

            <Animated.View style={[styles(scale, fontScale, spacing, {}).mainSection, { opacity: fadeAnim }]}>
                <View style={styles(scale, fontScale, spacing, {}).gameArea}>
                    <View style={styles(scale, fontScale, spacing, {}).gameAreaOverlay} />
                    <View style={styles(scale, fontScale, spacing, {}).videoContainer}>
                        <VideoView
                            player={player}
                            style={StyleSheet.absoluteFill}
                            contentFit="cover"
                        />
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = (scale: number, fontScale: number, spacing: any, cardDimensions: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f0f23",
    },
    backgroundOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    topSection: {
        paddingHorizontal: spacing.md,
        paddingTop: spacing.lg,
    },
    statsGrid: {
        flex: 1,
    },
    statsRow: {
        flexDirection: "row",
        flex: 1,
        marginBottom: 8,
    },
    slotRow: {
        flex: 2,
        marginBottom: 8,
    },
    timerRow: {
        flex: 1,
    },
    mainSection: {
        flex: 1,
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.lg,
    },
    gameArea: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: Math.round(32 * scale),
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    gameAreaOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: Math.round(32 * scale),
    },
    gameAreaText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    videoContainer: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: spacing.md,
        zIndex: 2,
    },

    mockVideoFrame: {
        width: "100%",
        height: "100%",
        borderRadius: Math.round(24 * scale),
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
        backgroundColor: "#1f2937", // Dark gray background
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },

    videoLabel: {
        color: "white",
        fontSize: Math.round(18 * fontScale),
        fontWeight: "600",
        opacity: 0.7,
    },

    card: {
        flex: 1,
        minWidth: cardDimensions.width,
        maxWidth: cardDimensions.width * 1.2,
        height: "100%",
        marginHorizontal: spacing.xs,
        borderRadius: Math.round(24 * scale),
        borderWidth: 1,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },

    cardRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: spacing.sm,
        paddingTop: spacing.xl,
        paddingBottom: spacing.sm,
        gap: spacing.xs,
        height: Math.round(90 * scale),
    },

    onlineCard: {
        backgroundColor: "#1e40af",
        borderColor: "rgba(34, 197, 94, 0.3)",
    },
    betCard: {
        backgroundColor: "#7c3aed",
        borderColor: "rgba(168, 85, 247, 0.3)",
    },
    slotCard: {
        backgroundColor: "#c2410c",
        borderColor: "rgba(147, 51, 234, 0.3)",
    },
    normalTimerCard: {
        backgroundColor: "#059669",
        borderColor: "rgba(16, 185, 129, 0.3)",
    },
    urgentTimerCard: {
        backgroundColor: "#dc2626",
        borderColor: "rgba(239, 68, 68, 0.3)",
    },
    cardOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: Math.round(24 * scale),
    },
    cardContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: spacing.md,
        position: "relative",
        zIndex: 1,
    },
    iconContainer: {
        marginRight: spacing.md,
        position: "relative",
    },
    userIcon: {
        fontSize: Math.round(32 * fontScale),
        color: "white",
    },
    glowEffect: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(34, 197, 94, 0.3)",
        borderRadius: Math.round(20 * scale),
        opacity: 0.7,
    },
    textContainer: {
        flex: 1,
    },
    countText: {
        fontSize: Math.round(12 * fontScale),
        fontWeight: "900",
        color: "white",
    },
    labelText: {
        fontSize: Math.round(14 * fontScale),
        fontWeight: "bold",
        color: "rgba(255, 255, 255, 0.9)",
    },

    statusDots: {
        flexDirection: "row",
        position: "absolute",
        top: spacing.sm,
        right: spacing.sm,
    },
    statusDot: {
        width: Math.round(4 * scale),
        height: Math.round(4 * scale),
        borderRadius: Math.round(4 * scale),
        backgroundColor: "#22c55e",
        marginLeft: Math.round(4 * scale),
        shadowColor: "#22c55e",
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 4,
    },
    coinContainer: {
        width: Math.round(80 * scale),
        height: Math.round(80 * scale),
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    coinImage: {
        width: Math.round(60 * scale),
        height: Math.round(60 * scale),
        borderRadius: Math.round(30 * scale),
    },
    coinGlow: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(168, 85, 247, 0.3)",
        borderRadius: Math.round(40 * scale),
        opacity: 1,
    },
    betText: {
        flex: 1,
        fontSize: Math.round(14 * fontScale),
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        textShadowColor: "rgba(0, 0, 0, 0.8)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    statusIndicator: {
        position: "absolute",
        top: spacing.sm,
        right: spacing.sm,
        width: Math.round(10 * scale),
        height: Math.round(10 * scale),
        borderRadius: Math.round(5 * scale),
        backgroundColor: "#22c55e",
        shadowColor: "#22c55e",
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 4,
    },
    slotContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    slotSection: {
        flex: 1,
        height: "100%",
        overflow: "hidden",
        justifyContent: "center",
    },
    slotItems: {
        alignItems: "center",
    },
    slotItem: {
        height: Math.round(60 * scale),
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    slotImage: {
        width: Math.round(50 * scale),
        height: Math.round(50 * scale),
        borderRadius: Math.round(8 * scale),
    },
    divider: {
        width: Math.round(4 * scale),
        height: "60%",
        backgroundColor: "#ec4899",
        borderRadius: 2,
        marginHorizontal: spacing.sm,
        shadowColor: "#ec4899",
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 4,
    },
    shimmerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: Math.round(24 * scale),
    },
    timerContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: spacing.lg,
    },
    timerLabel: {
        fontSize: Math.round(16 * fontScale),
        fontWeight: "900",
        color: "white",
        textTransform: "uppercase",
        letterSpacing: 1,
        textShadowColor: "rgba(0, 0, 0, 0.8)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    timerNumberContainer: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
    timerNumber: {
        fontSize: Math.round(40 * fontScale),
        fontWeight: "900",
        color: "white",
        textShadowColor: "rgba(0, 0, 0, 0.8)",
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 6,
    },
    urgentGlow: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(251, 191, 36, 0.5)",
        borderRadius: Math.round(30 * scale),
        opacity: 0.8,
    },
    timerDots: {
        flexDirection: "row",
    },
    timerDot: {
        width: Math.round(10 * scale),
        height: Math.round(10 * scale),
        borderRadius: Math.round(5 * scale),
        marginLeft: Math.round(4 * scale),
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 4,
    },
    normalDot: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        shadowColor: "#ffffff",
    },
    urgentDot: {
        backgroundColor: "#fbbf24",
        shadowColor: "#fbbf24",
    },
});
// Arrange the page layout by wrapping with GameProvider
const DiceBoardingPage: React.FC = () => (
    <GameProvider>
        <DiceWaitingPageContent />
    </GameProvider>
);

export default DiceBoardingPage;
