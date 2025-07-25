import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    Dice1,
    Dice2,
    Dice3,
    Dice4,
    DUBAI,
    FiftyRupee,
    FiveHundredRupee,
    FiveRupee,
    HundredRupee,
    LOGO,
    MUMBAI,
    NEWYORK,
    TenRupee,
    TOKYO,
    TwentyRupee,
    TwoRupee,
} from "../../assets/AssetManager";
import { useResponsiveDimensions } from "../hooks/useResponsiveDimensions";
import OrientationLock from "./common/OrientationLock";

// Type definitions
interface BetAmount {
    value: number;
    image: any;
}

interface City {
    name: string;
    number: number;
    image: any;
}

interface GameHistoryItem {
    result: "win" | "lose";
    amount: number;
    dice: number;
    timestamp: number;
    betType: "combination";
    citySelection: string;
    numberSelection: number;
}

interface PlacedBet {
    amount: number;
    city: City;
    number: number;
    timestamp: number;
}

const betAmounts: BetAmount[] = [
    { value: 2, image: TwoRupee },
    { value: 5, image: FiveRupee },
    { value: 10, image: TenRupee },
    { value: 20, image: TwentyRupee },
    { value: 50, image: FiftyRupee },
    { value: 100, image: HundredRupee },
    { value: 500, image: FiveHundredRupee },
];

const cities: City[] = [
    { name: "NEW YORK", number: 1, image: NEWYORK },
    { name: "MUMBAI", number: 2, image: MUMBAI },
    { name: "DUBAI", number: 3, image: DUBAI },
    { name: "TOKYO", number: 4, image: TOKYO },
];

const diceNumbers: { number: number; image: any }[] = [
    { number: 1, image: Dice1 },
    { number: 2, image: Dice2 },
    { number: 3, image: Dice3 },
    { number: 4, image: Dice4 },
];

export default function CityBettingGame() {
    const router = useRouter();
    const { width, height, scale, fontScale, spacing, isTablet, isSmallScreen } = useResponsiveDimensions();
    const [selectedAmount, setSelectedAmount] = useState<BetAmount | null>(
        null
    );
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
    const [isFreeTrial, setIsFreeTrial] = useState(false);
    const [balance, setBalance] = useState<number>(1000);
    const [trialBalance, setTrialBalance] = useState<number>(5000);
    const [isRolling, setIsRolling] = useState(false);
    const [diceResult, setDiceResult] = useState<number>(0);
    const [gameHistory, setGameHistory] = useState<GameHistoryItem[]>([]);
    const [placedBets, setPlacedBets] = useState<PlacedBet[]>([]);
    const userName = "Rakesh";

    // Enhanced haptic feedback
    const triggerHapticFeedback = useCallback(async () => {
        try {
            await Haptics.selectionAsync();
        } catch (error) {
            console.warn("Haptic feedback failed:", error);
        }
    }, []);

    // Selection handler for independent selections
    const handleSelection = useCallback(
        <T,>(type: "amount" | "city" | "number", value: T) => {
            triggerHapticFeedback();

            switch (type) {
                case "amount":
                    setSelectedAmount(value as BetAmount);
                    break;
                case "city":
                    setSelectedCity(value as City);
                    break;
                case "number":
                    setSelectedNumber(value as number);
                    break;
            }
        },
        [triggerHapticFeedback]
    );

    // Enhanced validation - requires ALL three selections
    const validateBet = useCallback((): boolean => {
        // Must have all three selections
        if (!selectedAmount || !selectedCity || !selectedNumber) {
            return false;
        }

        const currentBalance = isFreeTrial ? trialBalance : balance;
        return currentBalance >= selectedAmount.value;
    }, [
        selectedAmount,
        selectedCity,
        selectedNumber,
        isFreeTrial,
        trialBalance,
        balance,
    ]);

    // Check if all selections are made
    const isSelectionComplete = useCallback((): boolean => {
        return !!(selectedAmount && selectedCity && selectedNumber);
    }, [selectedAmount, selectedCity, selectedNumber]);

    // Store placed bet data silently
    const storePlacedBet = useCallback(() => {
        if (!selectedAmount || !selectedCity || !selectedNumber) {
            return;
        }

        const newBet: PlacedBet = {
            amount: selectedAmount.value,
            city: selectedCity,
            number: selectedNumber,
            timestamp: Date.now(),
        };

        setPlacedBets((prev) => [...prev, newBet]);

        // Log the bet data to console (for debugging)
        console.log("Bet placed:", newBet);
    }, [selectedAmount, selectedCity, selectedNumber]);

    // Enhanced roll handler
    const handleRoll = useCallback(() => {
        if (!validateBet()) {
            return;
        }

        // Store the bet data first
        storePlacedBet();

        setIsRolling(true);

        // Immediate dice roll without delay
        const newDice = Math.floor(Math.random() * 4) + 1;
        setDiceResult(newDice);

        // Win condition: dice matches either city number OR selected number
        const isWin =
            newDice === selectedCity!.number || newDice === selectedNumber;
        const betAmount = selectedAmount!.value;

        if (isWin) {
            const winAmount = betAmount * 2;
            const netGain = winAmount - betAmount;

            // Update balance
            if (isFreeTrial) {
                setTrialBalance((prev) => prev + netGain);
            } else {
                setBalance((prev) => prev + netGain);
            }

            // Add to history
            const historyItem: GameHistoryItem = {
                result: "win",
                amount: winAmount,
                dice: newDice,
                timestamp: Date.now(),
                betType: "combination",
                citySelection: selectedCity!.name,
                numberSelection: selectedNumber!,
            };

            setGameHistory((prev) => [...prev.slice(-4), historyItem]);
        } else {
            // Update balance
            if (isFreeTrial) {
                setTrialBalance((prev) => prev - betAmount);
            } else {
                setBalance((prev) => prev - betAmount);
            }

            // Add to history
            const historyItem: GameHistoryItem = {
                result: "lose",
                amount: betAmount,
                dice: newDice,
                timestamp: Date.now(),
                betType: "combination",
                citySelection: selectedCity!.name,
                numberSelection: selectedNumber!,
            };

            setGameHistory((prev) => [...prev.slice(-4), historyItem]);
        }

        setIsRolling(false);
    }, [
        validateBet,
        storePlacedBet,
        selectedAmount,
        selectedCity,
        selectedNumber,
        isFreeTrial,
        trialBalance,
        balance,
    ]);

    // Toggle trial mode
    const toggleTrialMode = useCallback(() => {
        setIsFreeTrial((prev) => !prev);
        triggerHapticFeedback();
    }, [triggerHapticFeedback]);

    // Get current balance
    const currentBalance = isFreeTrial ? trialBalance : balance;

    // Calculate responsive dimensions
    const getAmountButtonSize = () => {
        if (isSmallScreen) {
            return { width: Math.round(55 * scale), height: Math.round(55 * scale) };
        } else if (isTablet) {
            return { width: Math.round(75 * scale), height: Math.round(75 * scale) };
        } else {
            return { width: Math.round(85 * scale), height: Math.round(85 * scale) };
        }
    };

    const getAmountImageSize = () => {
        if (isSmallScreen) {
            return { width: Math.round(40 * scale), height: Math.round(40 * scale) };
        } else if (isTablet) {
            return { width: Math.round(55 * scale), height: Math.round(55 * scale) };
        } else {
            return { width: Math.round(65 * scale), height: Math.round(65 * scale) };
        }
    };

    const getCityImageSize = () => {
        return {
            width: Math.round(80 * scale),
            height: Math.round(55 * scale),
        };
    };

    const getDiceImageSize = () => {
        return {
            width: Math.round(70 * scale),
            height: Math.round(70 * scale),
        };
    };

    const getSidebarWidth = () => {
        if (isSmallScreen) {
            return Math.round(140 * scale);
        } else if (isTablet) {
            return Math.round(180 * scale);
        } else {
            return Math.round(200 * scale);
        }
    };

    return (
        <OrientationLock>
            <LinearGradient
                colors={["#4c51bf", "#6b46c1"]}
                style={[styles(scale, fontScale, spacing).container, { width, height }]}
            >
                {/* Sidebar */}
                <View style={[styles(scale, fontScale, spacing).sidebar, { width: getSidebarWidth() }]}>
                    <View style={styles(scale, fontScale, spacing).sidebarTop}>
                        <Image
                            source={LOGO}
                            style={[
                                styles(scale, fontScale, spacing).logo,
                                {
                                    width: Math.round(100 * scale),
                                    height: Math.round(100 * scale),
                                },
                            ]}
                            resizeMode="contain"
                        />
                        <Text
                            style={styles(scale, fontScale, spacing).userName}
                        >
                            {userName}
                        </Text>
                        <Text
                            style={styles(scale, fontScale, spacing).balanceText}
                        >
                            {isFreeTrial ? "Trial " : ""}Balance: ₹
                            {currentBalance}
                        </Text>
                    </View>

                    <View style={styles(scale, fontScale, spacing).sidebarBottom}>
                        <Link href="/userprofilepage" asChild>
                            <TouchableOpacity style={styles(scale, fontScale, spacing).profileBtn}>
                                <Text style={styles(scale, fontScale, spacing).profileText}>Profile</Text>
                            </TouchableOpacity>
                        </Link>
                        <Link href="/userbalancepage" asChild>
                            <TouchableOpacity style={styles(scale, fontScale, spacing).walletBtn}>
                                <Text style={styles(scale, fontScale, spacing).walletBtnText}>Wallet</Text>
                            </TouchableOpacity>
                        </Link>
                        <TouchableOpacity
                            style={[
                                styles(scale, fontScale, spacing).trialBtn,
                                isFreeTrial && styles(scale, fontScale, spacing).trialBtnActive,
                            ]}
                            onPress={toggleTrialMode}
                        >
                            <Text style={styles(scale, fontScale, spacing).trialBtnText}>
                                {isFreeTrial ? "Exit Trial" : "Start Trial"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles(scale, fontScale, spacing).rollBtn,
                                isRolling && styles(scale, fontScale, spacing).rollBtnDisabled,
                                !isSelectionComplete() &&
                                    styles(scale, fontScale, spacing).rollBtnDisabled,
                            ]}
                            onPress={() => {
                                handleRoll();
                                router.push("/diceboardpage");
                            }}
                            disabled={isRolling || !isSelectionComplete()}
                        >
                            <Text style={styles(scale, fontScale, spacing).rollText}>
                                {isRolling ? "Rolling..." : "Place Bet"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Main Content - Three Sections */}
                <View style={[styles(scale, fontScale, spacing).mainContent, { flex: 1 }]}>
                    {/* Amount Selection - 2x2 Grid with all images */}
                    <LinearGradient
                        colors={["#f43f5eCC", "#e11d48CC"]}
                        style={styles(scale, fontScale, spacing).section}
                    >
                        <Text
                            style={styles(scale, fontScale, spacing).sectionTitle}
                        >
                            Select Amount {selectedAmount && "✓"}
                        </Text>
                        <View style={styles(scale, fontScale, spacing).amountGridContainer}>
                            {/* Arrange all 7 images in a 2x2 grid (2 rows, 4 columns; last row has 3 images + 1 empty slot) */}
                            {[0, 1].map((rowIdx) => (
                                <View key={rowIdx} style={styles(scale, fontScale, spacing).amountGrid2x2}>
                                    {Array.from({ length: 4 }).map(
                                        (_, colIdx) => {
                                            const idx = rowIdx * 4 + colIdx;
                                            const amt = betAmounts[idx];
                                            if (amt) {
                                                return (
                                                    <TouchableOpacity
                                                        key={amt.value}
                                                        style={[
                                                            styles(scale, fontScale, spacing).amountBtn2x2,
                                                            getAmountButtonSize(),
                                                            selectedAmount?.value ===
                                                                amt.value &&
                                                                styles(scale, fontScale, spacing).selectedItem,
                                                        ]}
                                                        onPress={() =>
                                                            handleSelection(
                                                                "amount",
                                                                amt
                                                            )
                                                        }
                                                        activeOpacity={0.7}
                                                    >
                                                        <Image
                                                            source={amt.image}
                                                            style={[
                                                                styles(scale, fontScale, spacing).amountImage2x2,
                                                                getAmountImageSize(),
                                                            ]}
                                                            resizeMode="contain"
                                                        />
                                                    </TouchableOpacity>
                                                );
                                            } else {
                                                // Fill empty slot for 8th cell
                                                return (
                                                    <View
                                                        key={`empty-${rowIdx}-${colIdx}`}
                                                        style={[
                                                            styles(scale, fontScale, spacing).amountBtn2x2,
                                                            getAmountButtonSize(),
                                                            { opacity: 0 },
                                                        ]}
                                                    />
                                                );
                                            }
                                        }
                                    )}
                                </View>
                            ))}
                        </View>
                    </LinearGradient>

                    {/* City Selection */}
                    <LinearGradient
                        colors={["#10b981CC", "#059669CC"]}
                        style={styles(scale, fontScale, spacing).section}
                    >
                        <Text
                            style={styles(scale, fontScale, spacing).sectionTitle}
                        >
                            Select City {selectedCity && "✓"}
                        </Text>
                        <View style={styles(scale, fontScale, spacing).cityGrid}>
                            {cities.map((city: City) => (
                                <TouchableOpacity
                                    key={city.name}
                                    style={[
                                        styles(scale, fontScale, spacing).cityBtn,
                                        selectedCity?.name === city.name &&
                                            styles(scale, fontScale, spacing).selectedItem,
                                    ]}
                                    onPress={() =>
                                        handleSelection("city", city)
                                    }
                                    activeOpacity={0.7}
                                >
                                    <Image
                                        source={city.image}
                                        style={[
                                            styles(scale, fontScale, spacing).cityImage,
                                            getCityImageSize(),
                                        ]}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </LinearGradient>

                    {/* Number Selection */}
                    <LinearGradient
                        colors={["#3b82f6CC", "#2563ebCC"]}
                        style={styles(scale, fontScale, spacing).section}
                    >
                        <Text
                            style={styles(scale, fontScale, spacing).sectionTitle}
                        >
                            Select Number {selectedNumber && "✓"}
                        </Text>
                        <View style={styles(scale, fontScale, spacing).numberGrid}>
                            {diceNumbers.map(
                                (d: { number: number; image: any }) => (
                                    <TouchableOpacity
                                        key={d.number}
                                        style={[
                                            styles(scale, fontScale, spacing).numberBtn,
                                            selectedNumber === d.number &&
                                                styles(scale, fontScale, spacing).selectedItem,
                                        ]}
                                        onPress={() =>
                                            handleSelection("number", d.number)
                                        }
                                        activeOpacity={0.7}
                                    >
                                        <Image
                                            source={d.image}
                                            style={[
                                                styles(scale, fontScale, spacing).diceImage,
                                                getDiceImageSize(),
                                            ]}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                )
                            )}
                        </View>
                    </LinearGradient>
                </View>
            </LinearGradient>
        </OrientationLock>
    );
}

const styles = (scale: number, fontScale: number, spacing: any) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    sidebar: {
        padding: spacing.sm,
        paddingTop: Platform.OS === "ios" ? Math.round(48 * scale) : Math.round(28 * scale),
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "space-between",
    },
    sidebarTop: {
        alignItems: "center",
        width: "100%",
    },
    sidebarBottom: {
        alignItems: "center",
        width: "100%",
        gap: 8,
    },
    logo: {
        marginBottom: spacing.sm,
    },
    userName: {
        color: "#fff",
        fontWeight: "700",
        fontSize: Math.round(16 * fontScale),
        marginBottom: spacing.xs,
        textAlign: "center",
    },
    balanceText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: Math.round(14 * fontScale),
        marginBottom: spacing.md,
        textAlign: "center",
    },
    profileBtn: {
        backgroundColor: "rgba(255,255,255,0.1)",
        padding: spacing.sm,
        borderRadius: Math.round(8 * scale),
        width: "100%",
        alignItems: "center",
    },
    profileText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: Math.round(14 * fontScale),
    },
    walletBtn: {
        backgroundColor: "#805ad5",
        padding: spacing.sm,
        borderRadius: Math.round(8 * scale),
        alignItems: "center",
        width: "100%",
    },
    walletBtnText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: Math.round(14 * fontScale),
    },
    mainContent: {
        flex: 1,
        flexDirection: "row",
        padding: spacing.sm,
        paddingTop: Platform.OS === "ios" ? Math.round(50 * scale) : Math.round(30 * scale),
        gap: spacing.sm,
    },
    section: {
        flex: 1,
        borderRadius: Math.round(12 * scale),
        padding: spacing.sm,
        alignItems: "center",
    },
    sectionTitle: {
        color: "#fff",
        fontWeight: "700",
        fontSize: Math.round(14 * fontScale),
        marginBottom: spacing.sm,
        textAlign: "center",
    },
    // New 2x2 grid styles for amount selection
    amountGridContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: spacing.sm,
        flex: 1,
    },
    amountGrid2x2: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: spacing.xs,
        maxWidth: Math.round(180 * scale),
    },
    amountBtn2x2: {
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: Math.round(8 * scale),
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "transparent",
    },
    amountImage2x2: {
        // Dynamic sizing handled in component
    },
    // Existing styles
    cityGrid: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        gap: spacing.lg,
    },
    cityBtn: {
        width: Math.round(100 * scale),
        height: Math.round(50 * scale),
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: Math.round(8 * scale),
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "transparent",
        padding: spacing.xs,
    },
    cityImage: {},
    numberGrid: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        gap: spacing.sm,
    },
    numberBtn: {
        width: Math.round(75 * scale),
        height: Math.round(75 * scale),
        backgroundColor: "transparent",
        borderRadius: Math.round(8 * scale),
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "transparent",
    },
    diceImage: {},
    trialBtn: {
        backgroundColor: "#38a169",
        padding: spacing.sm,
        borderRadius: Math.round(8 * scale),
        alignItems: "center",
        width: "100%",
    },
    trialBtnActive: {
        backgroundColor: "#e53e3e",
    },
    trialBtnText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: Math.round(14 * fontScale),
    },
    rollBtn: {
        backgroundColor: "#e2951d",
        padding: spacing.sm,
        borderRadius: Math.round(10 * scale),
        alignItems: "center",
        width: "100%",
    },
    rollBtnDisabled: {
        backgroundColor: "#a0a0a0",
    },
    rollText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: Math.round(14 * fontScale),
    },
    selectedItem: {
        borderColor: "#ffd700",
        backgroundColor: "rgba(255,215,0,0.2)",
    },
});
