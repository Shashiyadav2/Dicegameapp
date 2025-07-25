import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    Dimensions,
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
    const screenData = Dimensions.get("window");
    const isLandscape = screenData.width > screenData.height;

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
        console.log("Bet placed:", newBet);
    }, [selectedAmount, selectedCity, selectedNumber]);

    // Enhanced roll handler
    const handleRoll = useCallback(() => {
        if (!validateBet()) {
            return;
        }

        storePlacedBet();
        setIsRolling(true);

        const newDice = Math.floor(Math.random() * 4) + 1;
        setDiceResult(newDice);

        const isWin =
            newDice === selectedCity!.number || newDice === selectedNumber;
        const betAmount = selectedAmount!.value;

        if (isWin) {
            const winAmount = betAmount * 2;
            const netGain = winAmount - betAmount;

            if (isFreeTrial) {
                setTrialBalance((prev) => prev + netGain);
            } else {
                setBalance((prev) => prev + netGain);
            }

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
            if (isFreeTrial) {
                setTrialBalance((prev) => prev - betAmount);
            } else {
                setBalance((prev) => prev - betAmount);
            }

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

    // Responsive dimension calculations
    const getResponsiveDimensions = () => {
        const baseWidth = screenData.width;
        const baseHeight = screenData.height;

        // Sidebar width calculation
        const sidebarWidth = Math.min(
            isTablet ? (isLandscape ? 180 : 200) : isLandscape ? 140 : 160,
            baseWidth * 0.25 // Max 25% of screen width
        );

        // Logo size
        const logoSize = isTablet
            ? isLandscape
                ? 80
                : 100
            : isLandscape
            ? 60
            : 80;

        // Dynamic scaling factors based on screen width
        const baseScale = Math.min(baseWidth / 600, 1);

        const amountImageSize = {
            width: 40 * baseScale,
            height: 40 * baseScale,
        };

        const amountButtonSize = {
            width: 60 * baseScale,
            height: 60 * baseScale,
        };

        const cityImageSize = {
            width: 80 * baseScale,
            height: 50 * baseScale,
        };

        const diceImageSize = {
            width: 65 * baseScale,
            height: 65 * baseScale,
        };

        // Font sizes
        const fontSizes = {
            title: isTablet ? (isLandscape ? 14 : 16) : isLandscape ? 12 : 14,
            subtitle: isTablet
                ? isLandscape
                    ? 16
                    : 18
                : isLandscape
                ? 14
                : 16,
            body: isTablet ? (isLandscape ? 12 : 14) : isLandscape ? 10 : 12,
        };

        // Padding and margins
        const spacing = {
            containerPadding: isLandscape ? 8 : 12,
            sectionPadding: isLandscape ? 6 : 8,
            buttonGap: isLandscape ? 6 : 8,
            cityGap: isLandscape ? 12 : 16,
            sidebarGap: isLandscape ? 6 : 8,
        };

        return {
            sidebarWidth,
            logoSize,
            amountButtonSize,
            amountImageSize,
            cityImageSize,
            diceImageSize,
            fontSizes,
            spacing,
        };
    };

    const responsiveDims = getResponsiveDimensions();

    return (
        <OrientationLock>
            <LinearGradient
                colors={globalStyles.gradientColors as [string, string]}
                style={[styles.container, { width, height }]}
            >
                {/* Sidebar */}
                <View
                    style={[
                        styles.sidebar,
                        {
                            width: responsiveDims.sidebarWidth,
                            paddingTop:
                                Platform.OS === "ios"
                                    ? isLandscape
                                        ? 30
                                        : 48
                                    : isLandscape
                                    ? 16
                                    : 28,
                            padding: responsiveDims.spacing.containerPadding,
                        },
                    ]}
                >
                    <View style={styles.sidebarTop}>
                        <Image
                            source={LOGO}
                            style={[
                                styles.logo,
                                {
                                    width: responsiveDims.logoSize,
                                    height: responsiveDims.logoSize,
                                    marginBottom: isLandscape ? 8 : 10,
                                },
                            ]}
                            resizeMode="contain"
                        />
                        <Text
                            style={[
                                styles.userName,
                                {
                                    fontSize: responsiveDims.fontSizes.subtitle,
                                    marginBottom: isLandscape ? 2 : 4,
                                },
                            ]}
                        >
                            {userName}
                        </Text>
                        <Text
                            style={[
                                styles.balanceText,
                                {
                                    fontSize: responsiveDims.fontSizes.body,
                                    marginBottom: isLandscape ? 10 : 15,
                                },
                            ]}
                        >
                            {isFreeTrial ? "Trial " : ""}Balance: ₹
                            {currentBalance}
                        </Text>
                    </View>

                    <View
                        style={[
                            styles.sidebarBottom,
                            { gap: responsiveDims.spacing.sidebarGap },
                        ]}
                    >
                        <Link href="/userprofilepage" asChild>
                            <TouchableOpacity
                                style={[
                                    styles.profileBtn,
                                    {
                                        paddingVertical: isLandscape ? 6 : 8,
                                        paddingHorizontal:
                                            responsiveDims.spacing
                                                .containerPadding,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.profileText,
                                        {
                                            fontSize:
                                                responsiveDims.fontSizes.body,
                                        },
                                    ]}
                                >
                                    Profile
                                </Text>
                            </TouchableOpacity>
                        </Link>
                        <Link href="/userbalancepage" asChild>
                            <TouchableOpacity
                                style={[
                                    styles.walletBtn,
                                    {
                                        paddingVertical: isLandscape ? 6 : 8,
                                        paddingHorizontal:
                                            responsiveDims.spacing
                                                .containerPadding,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.walletBtnText,
                                        {
                                            fontSize:
                                                responsiveDims.fontSizes.body,
                                        },
                                    ]}
                                >
                                    Wallet
                                </Text>
                            </TouchableOpacity>
                        </Link>
                        <TouchableOpacity
                            style={[
                                styles.trialBtn,
                                isFreeTrial && styles.trialBtnActive,
                                {
                                    paddingVertical: isLandscape ? 6 : 8,
                                    paddingHorizontal:
                                        responsiveDims.spacing.containerPadding,
                                },
                            ]}
                            onPress={toggleTrialMode}
                        >
                            <Text
                                style={[
                                    styles.trialBtnText,
                                    { fontSize: responsiveDims.fontSizes.body },
                                ]}
                            >
                                {isFreeTrial ? "Exit Trial" : "Start Trial"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.rollBtn,
                                isRolling && styles.rollBtnDisabled,
                                !isSelectionComplete() &&
                                    styles.rollBtnDisabled,
                                {
                                    paddingVertical: isLandscape ? 8 : 10,
                                    paddingHorizontal:
                                        responsiveDims.spacing.containerPadding,
                                },
                            ]}
                            onPress={() => {
                                handleRoll();
                                router.push("/diceboardpage");
                            }}
                            disabled={isRolling || !isSelectionComplete()}
                        >
                            <Text
                                style={[
                                    styles.rollText,
                                    { fontSize: responsiveDims.fontSizes.body },
                                ]}
                            >
                                {isRolling ? "Rolling..." : "Place Bet"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Main Content - Three Sections */}
                <View
                    style={[
                        styles.mainContent,
                        {
                            flex: 1,
                            padding: responsiveDims.spacing.containerPadding,
                            paddingTop:
                                Platform.OS === "ios"
                                    ? isLandscape
                                        ? 32
                                        : 50
                                    : isLandscape
                                    ? 16
                                    : 30,
                            gap: responsiveDims.spacing.containerPadding,
                        },
                    ]}
                >
                    {/* Amount Selection - 2x2 Grid with all images */}
                    <LinearGradient
                        colors={["#f43f5eCC", "#e11d48CC"]}
                        style={[
                            styles.section,
                            {
                                flex: 1,
                                padding: responsiveDims.spacing.sectionPadding,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.sectionTitle,
                                {
                                    fontSize: responsiveDims.fontSizes.title,
                                    marginBottom: isLandscape ? 6 : 10,
                                },
                            ]}
                        >
                            Select Amount {selectedAmount && "✓"}
                        </Text>
                        <View
                            style={[
                                styles.amountGridContainer,
                                { gap: responsiveDims.spacing.buttonGap },
                            ]}
                        >
                            {Array.from({
                                length: Math.ceil(betAmounts.length / 2),
                            }).map((_, rowIndex) => (
                                <View
                                    key={rowIndex}
                                    style={[
                                        styles.amountGrid2x2,
                                        {
                                            gap: responsiveDims.spacing
                                                .buttonGap,
                                        },
                                    ]}
                                >
                                    {Array.from({ length: 2 }).map(
                                        (_, colIndex) => {
                                            const actualIndex =
                                                rowIndex * 2 + colIndex;
                                            const amt = betAmounts[actualIndex];

                                            return amt ? (
                                                <TouchableOpacity
                                                    key={amt.value}
                                                    style={[
                                                        styles.amountBtn2x2,
                                                        responsiveDims.amountButtonSize,
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
                                                            responsiveDims.amountImageSize,
                                                        ]}
                                                        resizeMode="contain"
                                                    />
                                                </TouchableOpacity>
                                            ) : (
                                                <View
                                                    key={`empty-${rowIndex}-${colIndex}`}
                                                    style={[
                                                        styles.amountBtn2x2,
                                                        responsiveDims.amountButtonSize,
                                                        { opacity: 0 },
                                                    ]}
                                                />
                                            );
                                        }
                                    )}
                                </View>
                            ))}
                        </View>
                    </LinearGradient>

                    {/* City Selection */}
                    <LinearGradient
                        colors={["#10b981CC", "#059669CC"]}
                        style={[
                            styles.section,
                            {
                                flex: 1,
                                padding: responsiveDims.spacing.sectionPadding,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.sectionTitle,
                                {
                                    fontSize: responsiveDims.fontSizes.title,
                                    marginBottom: isLandscape ? 6 : 10,
                                },
                            ]}
                        >
                            Select City {selectedCity && "✓"}
                        </Text>
                        <View
                            style={[
                                styles.cityGrid,
                                {
                                    flex: 1,
                                    gap: responsiveDims.spacing.cityGap,
                                },
                            ]}
                        >
                            {cities.map((city: City) => (
                                <TouchableOpacity
                                    key={city.name}
                                    style={[
                                        styles.cityBtn,
                                        {
                                            width:
                                                responsiveDims.cityImageSize
                                                    .width + 16,
                                            height:
                                                responsiveDims.cityImageSize
                                                    .height + 8,
                                        },
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
                                            responsiveDims.cityImageSize,
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
                        style={[
                            styles.section,
                            {
                                flex: 1,
                                padding: responsiveDims.spacing.sectionPadding,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.sectionTitle,
                                {
                                    fontSize: responsiveDims.fontSizes.title,
                                    marginBottom: isLandscape ? 6 : 10,
                                },
                            ]}
                        >
                            Select Number {selectedNumber && "✓"}
                        </Text>
                        <View
                            style={[
                                styles.numberGrid,
                                {
                                    flex: 1,
                                    gap: responsiveDims.spacing.buttonGap,
                                },
                            ]}
                        >
                            {diceNumbers.map(
                                (d: { number: number; image: any }) => (
                                    <TouchableOpacity
                                        key={d.number}
                                        style={[
                                            styles.numberBtn,
                                            {
                                                width:
                                                    responsiveDims.diceImageSize
                                                        .width + 4,
                                                height:
                                                    responsiveDims.diceImageSize
                                                        .height + 4,
                                            },
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
                                                responsiveDims.diceImageSize,
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
    },
    logo: {
        marginBottom: 10,
    },
    userName: {
        color: "#fff",
        fontWeight: "700",
        textAlign: "center",
    },
    balanceText: {
        color: "#fff",
        fontWeight: "700",
        textAlign: "center",
    },
    profileBtn: {
        backgroundColor: "#3b82f6",
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profileText: {
        color: "#fff",
        fontWeight: "700",
    },
    walletBtn: {
        backgroundColor: "#8b5cf6",
        borderRadius: 8,
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    walletBtnText: {
        color: "#fff",
        fontWeight: "700",
    },
    mainContent: {
        flexDirection: "row",
    },
    section: {
        borderRadius: 12,
        alignItems: "center",
    },
    sectionTitle: {
        color: "#fff",
        fontWeight: "700",
        textAlign: "center",
    },
    amountGridContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    amountGrid2x2: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
    },
    amountBtn2x2: {
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "transparent",
    },
    amountImage2x2: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    cityGrid: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    cityBtn: {
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "transparent",
        padding: 4,
    },
    cityImage: {
        width: "100%",
        height: "100%",
    },
    numberGrid: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    numberBtn: {
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "transparent",
    },
    diceImage: {
        // Dynamic sizing handled in component
    },
    trialBtn: {
        backgroundColor: "#38a169",
        borderRadius: 8,
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    trialBtnActive: {
        backgroundColor: "#e53e3e",
    },
    trialBtnText: {
        color: "#fff",
        fontWeight: "700",
    },
    rollBtn: {
        backgroundColor: "#f59e0b",
        borderRadius: 8,
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.4)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    rollBtnDisabled: {
        backgroundColor: "#a0a0a0",
        borderColor: "transparent",
        shadowOpacity: 0,
        elevation: 0,
    },
    rollText: {
        color: "#fff",
        fontWeight: "700",
    },
});
