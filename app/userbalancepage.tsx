import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    ListRenderItem,
    SafeAreaView,
    StatusBar,
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
    const { width, height, isTablet } = useResponsiveDimensions();
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
                <StatusBar barStyle="light-content" backgroundColor="#312e81" />
                <LinearGradient
                    colors={["#312e81", "#7c3aed"]}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <FlatList
                        data={[{ key: "main" }]}
                        renderItem={() => (
                            <View
                                style={[
                                    styles.content,
                                    { maxWidth: isTablet ? 1100 : 900 },
                                ]}
                            >
                                {/* Left Section - Balance & Actions */}
                                <View style={styles.leftSection}>
                                    <View style={styles.header}>
                                        <Text
                                            style={[
                                                styles.title,
                                                {
                                                    fontSize: isTablet
                                                        ? 28
                                                        : 24,
                                                },
                                                { flex: 1 },
                                            ]}
                                        >
                                            My Wallet
                                        </Text>
                                    </View>

                                    {/* Balance Overview */}
                                    <View
                                        style={[
                                            styles.balanceCard,
                                            {
                                                borderRadius: isTablet
                                                    ? 20
                                                    : 16,
                                                padding: isTablet ? 32 : 24,
                                                marginBottom: isTablet
                                                    ? 32
                                                    : 24,
                                            },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.balanceLabel,
                                                {
                                                    fontSize: isTablet
                                                        ? 16
                                                        : 12,
                                                },
                                            ]}
                                        >
                                            Current Balance
                                        </Text>
                                        <Text
                                            style={[
                                                styles.balanceAmount,
                                                {
                                                    fontSize: isTablet
                                                        ? 40
                                                        : 32,
                                                },
                                            ]}
                                        >
                                            ₹{displayedBalance.toLocaleString()}
                                        </Text>
                                        {isFreeTrial && (
                                            <View
                                                style={[
                                                    styles.freeTrialBadge,
                                                    {
                                                        borderRadius: isTablet
                                                            ? 16
                                                            : 12,
                                                        paddingHorizontal:
                                                            isTablet ? 16 : 12,
                                                        paddingVertical:
                                                            isTablet ? 6 : 4,
                                                        marginTop: isTablet
                                                            ? 12
                                                            : 8,
                                                    },
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.freeTrialText,
                                                        {
                                                            fontSize: isTablet
                                                                ? 12
                                                                : 10,
                                                        },
                                                    ]}
                                                >
                                                    Free Trial Balance
                                                </Text>
                                            </View>
                                        )}
                                    </View>

                                    {/* Action Buttons */}
                                    <View
                                        style={[
                                            styles.actionButtons,
                                            { gap: isTablet ? 16 : 12 },
                                        ]}
                                    >
                                        <TouchableOpacity
                                            style={[
                                                styles.actionButton,
                                                styles.addFundsButton,
                                                {
                                                    paddingVertical: isTablet
                                                        ? 16
                                                        : 12,
                                                    borderRadius: isTablet
                                                        ? 16
                                                        : 12,
                                                },
                                            ]}
                                            activeOpacity={0.8}
                                        >
                                            <Icon
                                                name="add-circle"
                                                size={isTablet ? 22 : 18}
                                                color="#fff"
                                            />
                                            <Text
                                                style={[
                                                    styles.actionButtonText,
                                                    {
                                                        fontSize: isTablet
                                                            ? 18
                                                            : 14,
                                                    },
                                                ]}
                                            >
                                                Add Funds
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.actionButton,
                                                styles.withdrawButton,
                                                {
                                                    paddingVertical: isTablet
                                                        ? 16
                                                        : 12,
                                                    borderRadius: isTablet
                                                        ? 16
                                                        : 12,
                                                },
                                            ]}
                                            activeOpacity={0.8}
                                        >
                                            <Icon
                                                name="trending-down"
                                                size={isTablet ? 22 : 18}
                                                color="#fff"
                                            />
                                            <Text
                                                style={[
                                                    styles.actionButtonText,
                                                    {
                                                        fontSize: isTablet
                                                            ? 18
                                                            : 14,
                                                    },
                                                ]}
                                            >
                                                Withdraw
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Right Section - Transaction History */}
                                <View style={styles.rightSection}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginBottom: 16,
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.historyTitle,
                                                {
                                                    fontSize: isTablet
                                                        ? 22
                                                        : 18,
                                                },
                                                { flex: 1 },
                                            ]}
                                        >
                                            Recent Transactions
                                        </Text>
                                        <TouchableOpacity
                                            onPress={handleBack}
                                            style={[
                                                styles.backButton,
                                                {
                                                    padding: isTablet ? 12 : 8,
                                                    borderRadius: isTablet
                                                        ? 24
                                                        : 22,
                                                    marginLeft: 12,
                                                },
                                            ]}
                                        >
                                            <Icon
                                                name="arrow-back"
                                                size={isTablet ? 24 : 20}
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
                                                        styles.transactionItem,
                                                        {
                                                            borderRadius:
                                                                isTablet
                                                                    ? 16
                                                                    : 12,
                                                            padding: isTablet
                                                                ? 20
                                                                : 16,
                                                            marginBottom:
                                                                isTablet
                                                                    ? 12
                                                                    : 8,
                                                        },
                                                    ]}
                                                >
                                                    <View
                                                        style={
                                                            styles.transactionLeft
                                                        }
                                                    >
                                                        <Icon
                                                            name={
                                                                transactionIcons[
                                                                    item.type
                                                                ]?.name ||
                                                                "paid"
                                                            }
                                                            size={
                                                                isTablet
                                                                    ? 28
                                                                    : 24
                                                            }
                                                            color={
                                                                transactionIcons[
                                                                    item.type
                                                                ]?.color ||
                                                                "#9ca3af"
                                                            }
                                                        />
                                                        <View
                                                            style={[
                                                                styles.transactionInfo,
                                                                {
                                                                    marginLeft:
                                                                        isTablet
                                                                            ? 16
                                                                            : 12,
                                                                },
                                                            ]}
                                                        >
                                                            <Text
                                                                style={[
                                                                    styles.transactionType,
                                                                    {
                                                                        fontSize:
                                                                            isTablet
                                                                                ? 18
                                                                                : 14,
                                                                    },
                                                                ]}
                                                            >
                                                                {item.type}
                                                            </Text>
                                                            <Text
                                                                style={[
                                                                    styles.transactionDate,
                                                                    {
                                                                        fontSize:
                                                                            isTablet
                                                                                ? 16
                                                                                : 12,
                                                                    },
                                                                ]}
                                                            >
                                                                {item.date}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <Text
                                                        style={[
                                                            styles.transactionAmount,
                                                            {
                                                                color:
                                                                    item.amount >=
                                                                    0
                                                                        ? "#4ade80"
                                                                        : "#f87171",
                                                                fontSize:
                                                                    isTablet
                                                                        ? 20
                                                                        : 16,
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
                                            style={[
                                                styles.transactionList,
                                                {
                                                    maxHeight: isTablet
                                                        ? 350
                                                        : 280,
                                                },
                                            ]}
                                            showsVerticalScrollIndicator={false}
                                        />
                                    ) : (
                                        <View
                                            style={[
                                                styles.emptyState,
                                                {
                                                    borderRadius: isTablet
                                                        ? 16
                                                        : 12,
                                                    padding: isTablet ? 40 : 32,
                                                },
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.emptyStateText,
                                                    {
                                                        fontSize: isTablet
                                                            ? 18
                                                            : 14,
                                                    },
                                                ]}
                                            >
                                                No balance history available.
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.key}
                        contentContainerStyle={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    />
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
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    content: {
        flexDirection: "row",
        backgroundColor: "rgba(0,0,0,0.2)",
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
        maxWidth: 900,
        alignSelf: "center",
        width: "100%",
        minHeight: 350,
    },
    leftSection: {
        flex: 1,
        paddingRight: 24,
    },
    rightSection: {
        flex: 1.2,
        paddingLeft: 24,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },
    title: {
        fontWeight: "bold",
        color: "#fff",
    },
    backButton: {
        backgroundColor: "rgba(255,255,255,0.1)",
    },
    balanceCard: {
        backgroundColor: "rgba(255,255,255,0.1)",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
    },
    balanceLabel: {
        color: "rgba(255,255,255,0.7)",
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 8,
    },
    balanceAmount: {
        fontWeight: "bold",
        color: "#fff",
        letterSpacing: -1,
    },
    freeTrialBadge: {
        backgroundColor: "rgba(251, 191, 36, 0.2)",
    },
    freeTrialText: {
        color: "#fbbf24",
    },
    actionButtons: {
        flexDirection: "row",
    },
    actionButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
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
    },
    historyTitle: {
        fontWeight: "600",
        color: "#fff",
        marginBottom: 16,
    },
    transactionList: {
        flex: 1,
    },
    transactionItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.05)",
    },
    transactionLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    transactionInfo: {},
    transactionType: {
        fontWeight: "600",
        color: "#fff",
    },
    transactionDate: {
        color: "rgba(255,255,255,0.6)",
        marginTop: 2,
    },
    transactionAmount: {
        fontWeight: "bold",
    },
    emptyState: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.05)",
    },
    emptyStateText: {
        color: "rgba(255,255,255,0.6)",
    },
});
