import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    ListRenderItem,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import OrientationLock from "../src/components/common/OrientationLock";
import { useResponsiveDimensions } from "../src/hooks/useResponsiveDimensions";

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

const transactionIcons: Record<
    TransactionType,
    { name: string; color: string }
> = {
    Deposit: { name: "trending-up", color: "#4ade80" },
    "Bet Won": { name: "emoji-events", color: "#fbbf24" },
    "Bet Placed": { name: "paid", color: "#f87171" },
    Withdrawal: { name: "trending-down", color: "#60a5fa" },
};

export default function UserBalance() {
    const { width, height, scale, fontScale, spacing, isTablet, isSmallScreen } = useResponsiveDimensions();
    const router = useRouter();
    const displayedBalance = DUMMY_IS_FREE_TRIAL
        ? DUMMY_FREE_TRIAL_BALANCE
        : DUMMY_BALANCE;
    const isFreeTrial = DUMMY_IS_FREE_TRIAL;

    const handleBack = () => {
        router.back();
    };

    const renderTransactionItem: ListRenderItem<Transaction> = ({ item }) => {
        const icon = transactionIcons[item.type] || {
            name: "paid",
            color: "#9ca3af",
        };

        return (
            <View style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                    <Icon name={icon.name} size={24} color={icon.color} />
                    <View style={styles.transactionInfo}>
                        <Text style={styles.transactionType}>{item.type}</Text>
                        <Text style={styles.transactionDate}>{item.date}</Text>
                    </View>
                </View>
                <Text
                    style={[
                        styles.transactionAmount,
                        { color: item.amount >= 0 ? "#4ade80" : "#f87171" },
                    ]}
                >
                    {item.amount >= 0 ? "+" : "-"}₹
                    {Math.abs(item.amount).toLocaleString()}
                </Text>
            </View>
        );
    };

    return (
        <OrientationLock>
            <SafeAreaView style={[styles.container, { width, height }]}>
                <StatusBar hidden />
                <LinearGradient
                    colors={["#312e81", "#7c3aed"]}
                    style={styles(scale, fontScale, spacing).gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <FlatList
                        data={[{ key: "main" }]}
                        renderItem={() => (
                            <View
                                style={[
                                    styles(scale, fontScale, spacing).content,
                                    { maxWidth: Math.round((isTablet ? 1100 : 900) * scale) },
                                ]}
                            >
                                {/* Left Section - Balance & Actions */}
                                <View style={styles(scale, fontScale, spacing).leftSection}>
                                    <View style={styles(scale, fontScale, spacing).header}>
                                        <Text
                                            style={[
                                                styles(scale, fontScale, spacing).title,
                                                { flex: 1 },
                                            ]}
                                        >
                                            My Wallet
                                        </Text>
                                    </View>

                                    {/* Balance Overview */}
                                    <View
                                        style={[
                                            styles(scale, fontScale, spacing).balanceCard,
                                        ]}
                                    >
                                        <Text
                                            style={styles(scale, fontScale, spacing).balanceLabel}
                                        >
                                            Current Balance
                                        </Text>
                                        <Text
                                            style={styles(scale, fontScale, spacing).balanceAmount}
                                        >
                                            ₹{displayedBalance.toLocaleString()}
                                        </Text>
                                        {isFreeTrial && (
                                            <View
                                                style={styles(scale, fontScale, spacing).freeTrialBadge}
                                            >
                                                <Text
                                                    style={styles(scale, fontScale, spacing).freeTrialText}
                                                >
                                                    Free Trial Balance
                                                </Text>
                                            </View>
                                        )}
                                    </View>

                                    {/* Action Buttons */}
                                    <View
                                        style={styles(scale, fontScale, spacing).actionButtons}
                                    >
                                        <TouchableOpacity
                                            style={[
                                                styles(scale, fontScale, spacing).actionButton,
                                                styles(scale, fontScale, spacing).addFundsButton,
                                            ]}
                                            activeOpacity={0.8}
                                        >
                                            <Icon
                                                name="add-circle"
                                                size={Math.round((isTablet ? 22 : 18) * scale)}
                                                color="#fff"
                                            />
                                            <Text
                                                style={styles(scale, fontScale, spacing).actionButtonText}
                                            >
                                                Add Funds
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles(scale, fontScale, spacing).actionButton,
                                                styles(scale, fontScale, spacing).withdrawButton,
                                            ]}
                                            activeOpacity={0.8}
                                        >
                                            <Icon
                                                name="trending-down"
                                                size={Math.round((isTablet ? 22 : 18) * scale)}
                                                color="#fff"
                                            />
                                            <Text
                                                style={styles(scale, fontScale, spacing).actionButtonText}
                                            >
                                                Withdraw
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Right Section - Transaction History */}
                                <View style={styles(scale, fontScale, spacing).rightSection}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginBottom: spacing.md,
                                        }}
                                    >
                                        <Text
                                            style={[styles(scale, fontScale, spacing).historyTitle, { flex: 1 }]}
                                        >
                                            Recent Transactions
                                        </Text>
                                        <TouchableOpacity
                                            onPress={handleBack}
                                            style={styles(scale, fontScale, spacing).backButton}
                                        >
                                            <Icon
                                                name="arrow-back"
                                                size={Math.round((isTablet ? 24 : 20) * scale)}
                                                color="#fff"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {DUMMY_BALANCE_HISTORY.length > 0 ? (
                                        <FlatList
                                            data={DUMMY_BALANCE_HISTORY}
                                            renderItem={({ item }) => (
                                                <View
                                                    style={[
                                                        styles(scale, fontScale, spacing).transactionItem,
                                                    ]}
                                                >
                                                    <View
                                                        style={styles(scale, fontScale, spacing).transactionLeft}
                                                    >
                                                        <Icon
                                                            name={
                                                                transactionIcons[
                                                                    item.type
                                                                ]?.name ||
                                                                "paid"
                                                            }
                                                            size={Math.round((isTablet ? 28 : 24) * scale)}
                                                            color={
                                                                transactionIcons[
                                                                    item.type
                                                                ]?.color ||
                                                                "#9ca3af"
                                                            }
                                                        />
                                                        <View
                                                            style={[
                                                                styles(scale, fontScale, spacing).transactionInfo,
                                                            ]}
                                                        >
                                                            <Text
                                                                style={styles(scale, fontScale, spacing).transactionType}
                                                            >
                                                                {item.type}
                                                            </Text>
                                                            <Text
                                                                style={styles(scale, fontScale, spacing).transactionDate}
                                                            >
                                                                {item.date}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <Text
                                                        style={[
                                                            styles(scale, fontScale, spacing).transactionAmount,
                                                            {
                                                                color:
                                                                    item.amount >=
                                                                    0
                                                                        ? "#4ade80"
                                                                        : "#f87171",
                                                            },
                                                        ]}
                                                    >
                                                        {item.amount >= 0
                                                            ? "+"
                                                            : "-"}
                                                        ₹
                                                        {Math.abs(
                                                            item.amount
                                                        ).toLocaleString()}
                                                    </Text>
                                                </View>
                                            )}
                                            keyExtractor={(item) =>
                                                item.id.toString()
                                            }
                                            style={styles(scale, fontScale, spacing).transactionList}
                                            showsVerticalScrollIndicator={false}
                                        />
                                    ) : (
                                        <View
                                            style={styles(scale, fontScale, spacing).emptyState}
                                        >
                                            <Text
                                                style={styles(scale, fontScale, spacing).emptyStateText}
                                            >
                                                No balance history available.
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.key}
                        contentContainerStyle={styles(scale, fontScale, spacing).scrollContainer}
                        showsVerticalScrollIndicator={false}
                    />
                </LinearGradient>
            </SafeAreaView>
        </OrientationLock>
    );
}

const styles = (scale: number, fontScale: number, spacing: any) => StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.lg,
    },
    content: {
        flexDirection: "row",
        backgroundColor: "rgba(0,0,0,0.2)",
        borderRadius: Math.round(24 * scale),
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
        maxWidth: 900,
        alignSelf: "center",
        width: "100%",
        minHeight: Math.round(350 * scale),
    },
    leftSection: {
        flex: 1,
        paddingRight: spacing.lg,
    },
    rightSection: {
        flex: 1.2,
        paddingLeft: spacing.lg,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacing.lg,
    },
    title: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: Math.round(24 * fontScale),
    },
    backButton: {
        backgroundColor: "rgba(255,255,255,0.1)",
        padding: spacing.sm,
        borderRadius: Math.round(24 * scale),
        marginLeft: spacing.sm,
    },
    balanceCard: {
        backgroundColor: "rgba(255,255,255,0.1)",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
        borderRadius: Math.round(20 * scale),
        padding: spacing.xl,
        marginBottom: spacing.xl,
    },
    balanceLabel: {
        color: "rgba(255,255,255,0.7)",
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: spacing.sm,
        fontSize: Math.round(14 * fontScale),
    },
    balanceAmount: {
        fontWeight: "bold",
        color: "#fff",
        letterSpacing: -1,
        fontSize: Math.round(36 * fontScale),
    },
    freeTrialBadge: {
        backgroundColor: "rgba(251, 191, 36, 0.2)",
        borderRadius: Math.round(16 * scale),
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        marginTop: spacing.sm,
    },
    freeTrialText: {
        color: "#fbbf24",
        fontSize: Math.round(12 * fontScale),
    },
    actionButtons: {
        flexDirection: "row",
        gap: spacing.md,
    },
    actionButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.xs,
        paddingVertical: spacing.md,
        borderRadius: Math.round(16 * scale),
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
        fontSize: Math.round(16 * fontScale),
    },
    historyTitle: {
        fontWeight: "600",
        color: "#fff",
        fontSize: Math.round(20 * fontScale),
    },
    transactionList: {
        flex: 1,
        maxHeight: Math.round(320 * scale),
    },
    transactionItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: Math.round(16 * scale),
        padding: spacing.md,
        marginBottom: spacing.sm,
    },
    transactionLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    transactionInfo: {
        marginLeft: spacing.md,
    },
    transactionType: {
        fontWeight: "600",
        color: "#fff",
        fontSize: Math.round(16 * fontScale),
    },
    transactionDate: {
        color: "rgba(255,255,255,0.6)",
        marginTop: spacing.xs / 2,
        fontSize: Math.round(14 * fontScale),
    },
    transactionAmount: {
        fontWeight: "bold",
        fontSize: Math.round(18 * fontScale),
    },
    emptyState: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: Math.round(16 * scale),
        padding: spacing.xl,
    },
    emptyStateText: {
        color: "rgba(255,255,255,0.6)",
        fontSize: Math.round(16 * fontScale),
    },
});
