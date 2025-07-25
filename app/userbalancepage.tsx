import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import OrientationLock from "../src/components/common/OrientationLock";

// --- Type Definitions ---
type TransactionType = "Deposit" | "Bet Won" | "Bet Placed" | "Withdrawal";

interface Transaction {
    id: number;
    type: TransactionType;
    amount: number;
    date: string;
}

// --- Dummy Data ---
const DUMMY_BALANCE = 1000;
const DUMMY_IS_FREE_TRIAL = false;
const DUMMY_FREE_TRIAL_BALANCE = 5000;

const DUMMY_BALANCE_HISTORY: Transaction[] = [
    { id: 1, type: "Deposit", amount: 500, date: "2023-10-26" },
    { id: 2, type: "Bet Won", amount: 150, date: "2023-10-25" },
    { id: 3, type: "Bet Placed", amount: -50, date: "2023-10-24" },
    { id: 4, type: "Withdrawal", amount: -200, date: "2023-10-23" },
];

const transactionIcons: Record<TransactionType, { name: string; color: string }> = {
    Deposit: { name: "trending-up", color: "#4ade80" },
    "Bet Won": { name: "emoji-events", color: "#fbbf24" },
    "Bet Placed": { name: "paid", color: "#f87171" },
    Withdrawal: { name: "trending-down", color: "#60a5fa" },
};

export default function UserBalance() {
    const { width, height } = useWindowDimensions();
    const router = useRouter();
    const displayedBalance = DUMMY_IS_FREE_TRIAL ? DUMMY_FREE_TRIAL_BALANCE : DUMMY_BALANCE;
    const isFreeTrial = DUMMY_IS_FREE_TRIAL;

    // Calculate responsive values
    const isLandscape = width > height;
    const isTablet = width >= 768;
    const scaleFactor = isTablet ? 1.2 : 1;
    const baseSpacing = isTablet ? 16 : 12;

    // Adjust layout for landscape
    const containerPadding = isLandscape ? baseSpacing * 2 : baseSpacing;
    const contentPadding = baseSpacing * 1.5;
    const transactionItemPadding = baseSpacing;

    const handleBack = () => {
        router.back();
    };

    return (
        <OrientationLock orientation="landscape">
            <SafeAreaView style={styles.container}>
                <StatusBar hidden />
                <LinearGradient
                    colors={["#312e81", "#7c3aed"]}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={[
                        styles.contentContainer,
                        {
                            padding: containerPadding,
                            maxWidth: isTablet ? 1200 : 1000,
                            minHeight: isLandscape ? height * 0.8 : height * 0.6
                        }
                    ]}>
                        <View style={styles.content}>
                            {/* Left Section - Balance & Actions */}
                            <View style={[
                                styles.leftSection,
                                {
                                    paddingRight: contentPadding,
                                    flex: isLandscape ? 1 : undefined
                                }
                            ]}>
                                <View style={styles.header}>
                                    <Text style={styles.title}>My Wallet</Text>
                                </View>

                                {/* Balance Overview */}
                                <View style={[
                                    styles.balanceCard,
                                    { padding: contentPadding }
                                ]}>
                                    <Text style={styles.balanceLabel}>
                                        Current Balance
                                    </Text>
                                    <Text style={styles.balanceAmount}>
                                        ₹{displayedBalance.toLocaleString()}
                                    </Text>
                                    {isFreeTrial && (
                                        <View style={styles.freeTrialBadge}>
                                            <Text style={styles.freeTrialText}>
                                                Free Trial Balance
                                            </Text>
                                        </View>
                                    )}
                                </View>

                                {/* Action Buttons */}
                                <View style={styles.actionButtons}>
                                    <TouchableOpacity
                                        style={[styles.actionButton, styles.addFundsButton]}
                                        activeOpacity={0.8}
                                    >
                                        <Icon
                                            name="add-circle"
                                            size={24 * scaleFactor}
                                            color="#fff"
                                        />
                                        <Text style={styles.actionButtonText}>
                                            Add Funds
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.actionButton, styles.withdrawButton]}
                                        activeOpacity={0.8}
                                    >
                                        <Icon
                                            name="trending-down"
                                            size={24 * scaleFactor}
                                            color="#fff"
                                        />
                                        <Text style={styles.actionButtonText}>
                                            Withdraw
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Right Section - Transaction History */}
                            <View style={[
                                styles.rightSection,
                                {
                                    paddingLeft: contentPadding,
                                    flex: isLandscape ? 1.2 : undefined
                                }
                            ]}>
                                <View style={styles.historyHeader}>
                                    <Text style={styles.historyTitle}>
                                        Recent Transactions
                                    </Text>
                                    <TouchableOpacity
                                        onPress={handleBack}
                                        style={styles.backButton}
                                    >
                                        <Icon
                                            name="arrow-back"
                                            size={24 * scaleFactor}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>
                                </View>

                                {DUMMY_BALANCE_HISTORY.length > 0 ? (
                                    <FlatList
                                        data={DUMMY_BALANCE_HISTORY}
                                        renderItem={({ item }) => (
                                            <View style={[
                                                styles.transactionItem,
                                                { padding: transactionItemPadding }
                                            ]}>
                                                <View style={styles.transactionLeft}>
                                                    <Icon
                                                        name={transactionIcons[item.type]?.name || "paid"}
                                                        size={24 * scaleFactor}
                                                        color={transactionIcons[item.type]?.color || "#9ca3af"}
                                                    />
                                                    <View style={styles.transactionInfo}>
                                                        <Text style={styles.transactionType}>
                                                            {item.type}
                                                        </Text>
                                                        <Text style={styles.transactionDate}>
                                                            {item.date}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <Text
                                                    style={[
                                                        styles.transactionAmount,
                                                        {
                                                            color: item.amount >= 0 ? "#4ade80" : "#f87171",
                                                        },
                                                    ]}
                                                >
                                                    {item.amount >= 0 ? "+" : "-"}₹
                                                    {Math.abs(item.amount).toLocaleString()}
                                                </Text>
                                            </View>
                                        )}
                                        keyExtractor={(item) => item.id.toString()}
                                        style={styles.transactionList}
                                        showsVerticalScrollIndicator={false}
                                    />
                                ) : (
                                    <View style={styles.emptyState}>
                                        <Text style={styles.emptyStateText}>
                                            No balance history available.
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </SafeAreaView>
        </OrientationLock>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignSelf: "center",
        width: "100%",
    },
    content: {
        flexDirection: "row",
        backgroundColor: "rgba(0,0,0,0.2)",
        borderRadius: 24,
        padding: 16,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
    },
    leftSection: {
        justifyContent: "center",
    },
    rightSection: {
        justifyContent: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: 24,
    },
    backButton: {
        backgroundColor: "rgba(255,255,255,0.1)",
        padding: 8,
        borderRadius: 24,
        marginLeft: 8,
    },
    balanceCard: {
        backgroundColor: "rgba(255,255,255,0.1)",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
        borderRadius: 20,
        marginBottom: 24,
    },
    balanceLabel: {
        color: "rgba(255,255,255,0.7)",
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 8,
        fontSize: 14,
    },
    balanceAmount: {
        fontWeight: "bold",
        color: "#fff",
        letterSpacing: -1,
        fontSize: 36,
    },
    freeTrialBadge: {
        backgroundColor: "rgba(251, 191, 36, 0.2)",
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginTop: 8,
    },
    freeTrialText: {
        color: "#fbbf24",
        fontSize: 12,
    },
    actionButtons: {
        flexDirection: "row",
        gap: 12,
    },
    actionButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingVertical: 12,
        borderRadius: 16,
    },
    addFundsButton: {
        backgroundColor: "rgba(34, 197, 94, 0.8)",
    },
    withdrawButton: {
        backgroundColor: "rgba(59, 130, 246, 0.8)",
    },
    actionButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    historyHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    historyTitle: {
        fontWeight: "600",
        color: "#fff",
        fontSize: 20,
        flex: 1,
    },
    transactionList: {
        flex: 1,
    },
    transactionItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: 16,
        marginBottom: 8,
    },
    transactionLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    transactionInfo: {
        marginLeft: 12,
    },
    transactionType: {
        fontWeight: "600",
        color: "#fff",
        fontSize: 16,
    },
    transactionDate: {
        color: "rgba(255,255,255,0.6)",
        marginTop: 2,
        fontSize: 14,
    },
    transactionAmount: {
        fontWeight: "bold",
        fontSize: 18,
    },
    emptyState: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: 16,
        padding: 24,
    },
    emptyStateText: {
        color: "rgba(255,255,255,0.6)",
        fontSize: 16,
    },
});
