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
import { globalStyles } from "../styles/globalStyles";
import { responsiveStyles } from "../styles/responsive";
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
    const { width, height, isTablet } = useResponsiveDimensions();
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
        if (isTablet) {
            return { width: 80, height: 80 };
        }
        return { width: 65, height: 65 };
    };

    const getAmountImageSize = () => {
        if (isTablet) {
            return { width: 60, height: 60 };
        }
        return { width: 45, height: 45 };
    };

    return (
        <OrientationLock>
            <LinearGradient
                colors={globalStyles.gradientColors as [string, string]}
                style={[styles.container, { width, height }]}
            >
                {/* Sidebar */}
                <View style={[responsiveStyles.sidebar, styles.sidebar]}>
                    <View style={styles.sidebarTop}>
                        <Image
                            source={LOGO}
                            style={[
                                styles.logo,
                                {
                                    width: isTablet ? 120 : 100,
                                    height: isTablet ? 120 : 100,
                                },
                            ]}
                            resizeMode="contain"
                        />
                        <Text
                            style={[responsiveStyles.subtitle, styles.userName]}
                        >
                            {userName}
                        </Text>
                        <Text
                            style={[responsiveStyles.body, styles.balanceText]}
                        >
                            {isFreeTrial ? "Trial " : ""}Balance: ₹
                            {currentBalance}
                        </Text>
                    </View>

                    <View style={styles.sidebarBottom}>
                        <Link href="/userprofilepage" asChild>
                            <TouchableOpacity style={styles.profileBtn}>
                                <Text style={styles.profileText}>Profile</Text>
                            </TouchableOpacity>
                        </Link>
                        <Link href="/userbalancepage" asChild>
                            <TouchableOpacity style={styles.walletBtn}>
                                <Text style={styles.walletBtnText}>Wallet</Text>
                            </TouchableOpacity>
                        </Link>
                        <TouchableOpacity
                            style={[
                                styles.trialBtn,
                                isFreeTrial && styles.trialBtnActive,
                            ]}
                            onPress={toggleTrialMode}
                        >
                            <Text style={styles.trialBtnText}>
                                {isFreeTrial ? "Exit Trial" : "Start Trial"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.rollBtn,
                                isRolling && styles.rollBtnDisabled,
                                !isSelectionComplete() &&
                                    styles.rollBtnDisabled,
                            ]}
                            onPress={() => {
                                handleRoll();
                                router.push("/diceboardpage");
                            }}
                            disabled={isRolling || !isSelectionComplete()}
                        >
                            <Text style={styles.rollText}>
                                {isRolling ? "Rolling..." : "Place Bet"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Main Content - Three Sections */}
                <View style={[styles.mainContent, { flex: 1 }]}>
                    {/* Amount Selection - 2x2 Grid with all images */}
                    <LinearGradient
                        colors={["#f43f5eCC", "#e11d48CC"]}
                        style={[responsiveStyles.gameSection, styles.section]}
                    >
                        <Text
                            style={[
                                responsiveStyles.subtitle,
                                styles.sectionTitle,
                            ]}
                        >
                            Select Amount {selectedAmount && "✓"}
                        </Text>
                        <View style={styles.amountGridContainer}>
                            {/* Arrange all 7 images in a 2x2 grid (2 rows, 4 columns; last row has 3 images + 1 empty slot) */}
                            {[0, 1].map((rowIdx) => (
                                <View key={rowIdx} style={styles.amountGrid2x2}>
                                    {Array.from({ length: 4 }).map(
                                        (_, colIdx) => {
                                            const idx = rowIdx * 4 + colIdx;
                                            const amt = betAmounts[idx];
                                            if (amt) {
                                                return (
                                                    <TouchableOpacity
                                                        key={amt.value}
                                                        style={[
                                                            styles.amountBtn2x2,
                                                            getAmountButtonSize(),
                                                            selectedAmount?.value ===
                                                                amt.value &&
                                                                responsiveStyles.selectedItem,
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
                                                                styles.amountImage2x2,
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
                                                            styles.amountBtn2x2,
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
                        style={[responsiveStyles.gameSection, styles.section]}
                    >
                        <Text
                            style={[
                                responsiveStyles.subtitle,
                                styles.sectionTitle,
                            ]}
                        >
                            Select City {selectedCity && "✓"}
                        </Text>
                        <View style={[responsiveStyles.grid, styles.cityGrid]}>
                            {cities.map((city: City) => (
                                <TouchableOpacity
                                    key={city.name}
                                    style={[
                                        responsiveStyles.gameButton,
                                        styles.cityBtn,
                                        selectedCity?.name === city.name &&
                                            responsiveStyles.selectedItem,
                                    ]}
                                    onPress={() =>
                                        handleSelection("city", city)
                                    }
                                    activeOpacity={0.7}
                                >
                                    <Image
                                        source={city.image}
                                        style={[
                                            styles.cityImage,
                                            {
                                                width: isTablet ? 100 : 80,
                                                height: isTablet ? 65 : 55,
                                            },
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
                        style={[responsiveStyles.gameSection, styles.section]}
                    >
                        <Text
                            style={[
                                responsiveStyles.subtitle,
                                styles.sectionTitle,
                            ]}
                        >
                            Select Number {selectedNumber && "✓"}
                        </Text>
                        <View style={styles.numberGrid}>
                            {diceNumbers.map(
                                (d: { number: number; image: any }) => (
                                    <TouchableOpacity
                                        key={d.number}
                                        style={[
                                            responsiveStyles.gameButton,
                                            styles.numberBtn,
                                            selectedNumber === d.number &&
                                                responsiveStyles.selectedItem,
                                        ]}
                                        onPress={() =>
                                            handleSelection("number", d.number)
                                        }
                                        activeOpacity={0.7}
                                    >
                                        <Image
                                            source={d.image}
                                            style={[
                                                styles.diceImage,
                                                {
                                                    width: isTablet ? 85 : 70,
                                                    height: isTablet ? 85 : 70,
                                                },
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    sidebar: {
        width: 160,
        padding: 8,
        paddingTop: Platform.OS === "ios" ? 48 : 28,
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
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    userName: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
        marginBottom: 4,
        textAlign: "center",
    },
    balanceText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
        marginBottom: 15,
        textAlign: "center",
    },
    profileBtn: {
        backgroundColor: "rgba(255,255,255,0.1)",
        padding: 10,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
    },
    profileText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },
    walletBtn: {
        backgroundColor: "#805ad5",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        width: "100%",
    },
    walletBtnText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
    },
    mainContent: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        paddingTop: Platform.OS === "ios" ? 50 : 30,
        gap: 10,
    },
    section: {
        flex: 1,
        borderRadius: 12,
        padding: 12,
        alignItems: "center",
    },
    sectionTitle: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
        marginBottom: 12,
        textAlign: "center",
    },
    // New 2x2 grid styles for amount selection
    amountGridContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        flex: 1,
    },
    amountGrid2x2: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
        maxWidth: 180,
    },
    amountBtn2x2: {
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 8,
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
        gap: 24,
    },
    cityBtn: {
        width: 100,
        height: 50,
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "transparent",
        padding: 4,
    },
    cityImage: {
        width: 80,
        height: 55,
    },
    numberGrid: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        gap: 8,
    },
    numberBtn: {
        width: 75,
        height: 75,
        backgroundColor: "transparent",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "transparent",
    },
    diceImage: {
        width: 70,
        height: 70,
    },
    trialBtn: {
        backgroundColor: "#38a169",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        width: "100%",
    },
    trialBtnActive: {
        backgroundColor: "#e53e3e",
    },
    trialBtnText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
    },
    rollBtn: {
        backgroundColor: "#e2951d",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        width: "100%",
    },
    rollBtnDisabled: {
        backgroundColor: "#a0a0a0",
    },
    rollText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
    },
});
