import { VideoView, useVideoPlayer } from "expo-video";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    Easing,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { GameProvider, useGameContext } from "../src/Context/gamecontext";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Utility function
function timerStringToSeconds(timer: string): number {
    const [h, m, s] = timer.split(":").map(Number);
    return h * 3600 + m * 60 + s;
}

// OnlineUsersCard Component
const OnlineUsersCard: React.FC<{ count: number }> = ({ count }) => {
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
                styles.card,
                styles.onlineCard,
                { transform: [{ scale: scaleAnim }] },
            ]}
        >
            <View style={styles.cardOverlay} />
            <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                    <Text style={styles.userIcon}>👥</Text>
                    <Animated.View
                        style={[
                            styles.glowEffect,
                            { transform: [{ scale: pulseAnim }] },
                        ]}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.countText}>{count}</Text>
                    <Text style={styles.labelText}>ONLINE PLAYERS</Text>
                </View>
                <View style={styles.statusDots}>
                    {[0, 1, 2].map((i) => (
                        <Animated.View
                            key={i}
                            style={[
                                styles.statusDot,
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
                styles.card,
                styles.betCard,
                { transform: [{ scale: scaleAnim }] },
            ]}
        >
            <View style={styles.cardOverlay} />
            <View style={styles.cardContent}>
                <View style={styles.coinContainer}>
                    {/*  <Image
            source={{ uri: `https://example.com/assets/${amount}rupee.png` }}
            style={styles.coinImage}
            defaultSource={require('./assets/coin-placeholder.png')} // Add a placeholder
          /> */}
                    <Animated.View
                        style={[styles.coinGlow, { transform: [{ rotate }] }]}
                    />
                </View>
                <Text style={styles.betText}>
                    You have selected ₹{amount} table
                </Text>
                <View style={styles.statusIndicator} />
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
        <View style={[styles.card, styles.slotCard]}>
            <View style={styles.cardOverlay} />
            <View style={styles.slotContent}>
                <View style={styles.slotSection}>
                    <Animated.View
                        style={[
                            styles.slotItems,
                            { transform: [{ translateY: cityTranslateY }] },
                        ]}
                    >
                        {cities.map((city, index) => (
                            <View key={index} style={styles.slotItem}>
                                {/*   <Image
                  source={{ uri: `https://example.com/assets/${city}.png` }}
                  style={styles.slotImage}
                /> */}
                            </View>
                        ))}
                    </Animated.View>
                </View>

                <View style={styles.divider} />

                <View style={styles.slotSection}>
                    <Animated.View
                        style={[
                            styles.slotItems,
                            { transform: [{ translateY: diceTranslateY }] },
                        ]}
                    >
                        {dice.map((num, index) => (
                            <View key={index} style={styles.slotItem}>
                                {/*   <Image
                  source={{ uri: `https://example.com/assets/Dice${num}.png` }}
                  style={styles.slotImage}
                /> */}
                            </View>
                        ))}
                    </Animated.View>
                </View>
            </View>

            {gamePhase === "spinning" && (
                <Animated.View
                    style={[
                        styles.shimmerOverlay,
                        { transform: [{ translateX: shimmerTranslateX }] },
                    ]}
                />
            )}

            <View style={styles.statusIndicator} />
        </View>
    );
};

// TimerCard Component
const TimerCard: React.FC<{ seconds: number }> = ({ seconds }) => {
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
                styles.card,
                isUrgent ? styles.urgentTimerCard : styles.normalTimerCard,
                { transform: [{ scale: scaleAnim }] },
            ]}
        >
            <View style={styles.cardOverlay} />
            <View style={styles.timerContent}>
                <Text style={styles.timerLabel}>SECONDS LEFT</Text>
                <View style={styles.timerNumberContainer}>
                    <Animated.Text
                        style={[
                            styles.timerNumber,
                            { transform: [{ scale: glowAnim }] },
                        ]}
                    >
                        {seconds}
                    </Animated.Text>
                    {isUrgent && (
                        <Animated.View
                            style={[
                                styles.urgentGlow,
                                { transform: [{ scale: glowAnim }] },
                            ]}
                        />
                    )}
                </View>
                <View style={styles.timerDots}>
                    {[0, 1, 2].map((i) => (
                        <Animated.View
                            key={i}
                            style={[
                                styles.timerDot,
                                isUrgent ? styles.urgentDot : styles.normalDot,
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
        <View style={styles.container}>
            <View style={styles.backgroundOverlay} />

            <Animated.View style={[styles.topSection, { opacity: fadeAnim }]}>
                <View style={styles.cardRow}>
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

            <Animated.View style={[styles.mainSection, { opacity: fadeAnim }]}>
                <View style={styles.gameArea}>
                    <View style={styles.gameAreaOverlay} />
                    <View style={styles.videoContainer}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f0f23",
    },
    backgroundOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    topSection: {
        height: screenHeight * 0.25,
        paddingHorizontal: 16,
        paddingTop: 20,
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
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    gameArea: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: 32,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    gameAreaOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 32,
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
        padding: 16,
        zIndex: 2,
    },

    mockVideoFrame: {
        width: "100%",
        height: "100%",
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
        backgroundColor: "#1f2937", // Dark gray background
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },

    videoLabel: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
        opacity: 0.7,
    },

    card: {
        flex: 1,
        minWidth: screenWidth * 0.23,
        maxWidth: screenWidth * 0.26,
        height: "100%",
        marginHorizontal: 1,
        borderRadius: 24,
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
        paddingHorizontal: 12,
        paddingTop: 30,
        paddingBottom: 10,
        gap: 5,
        height: 90,
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
        borderRadius: 24,
    },
    cardContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        position: "relative",
        zIndex: 1,
    },
    iconContainer: {
        marginRight: 16,
        position: "relative",
    },
    userIcon: {
        fontSize: 32,
        color: "white",
    },
    glowEffect: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(34, 197, 94, 0.3)",
        borderRadius: 20,
        opacity: 0.7,
    },
    textContainer: {
        flex: 1,
    },
    countText: {
        fontSize: 12,
        fontWeight: "900",
        color: "white",
    },
    labelText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "rgba(255, 255, 255, 0.9)",
    },

    statusDots: {
        flexDirection: "row",
        position: "absolute",
        top: 12,
        right: 12,
    },
    statusDot: {
        width: 4,
        height: 4,
        borderRadius: 4,
        backgroundColor: "#22c55e",
        marginLeft: 4,
        shadowColor: "#22c55e",
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 4,
    },
    coinContainer: {
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    coinImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    coinGlow: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(168, 85, 247, 0.3)",
        borderRadius: 40,
        opacity: 1,
    },
    betText: {
        flex: 1,
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        textShadowColor: "rgba(0, 0, 0, 0.8)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    statusIndicator: {
        position: "absolute",
        top: 12,
        right: 12,
        width: 10,
        height: 10,
        borderRadius: 5,
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
        height: 60,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    slotImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },
    divider: {
        width: 4,
        height: "60%",
        backgroundColor: "#ec4899",
        borderRadius: 2,
        marginHorizontal: 8,
        shadowColor: "#ec4899",
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 4,
    },
    shimmerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 24,
    },
    timerContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    timerLabel: {
        fontSize: 16,
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
        fontSize: 40,
        fontWeight: "900",
        color: "white",
        textShadowColor: "rgba(0, 0, 0, 0.8)",
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 6,
    },
    urgentGlow: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(251, 191, 36, 0.5)",
        borderRadius: 30,
        opacity: 0.8,
    },
    timerDots: {
        flexDirection: "row",
    },
    timerDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 4,
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
