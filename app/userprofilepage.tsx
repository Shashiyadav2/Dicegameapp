import Icon from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import OrientationLock from "../src/components/common/OrientationLock";
import { useResponsiveDimensions } from "../src/hooks/useResponsiveDimensions";

// --- Type Definitions ---
interface User {
    name: string;
    email: string;
    phone: string;
    avatar: string;
}

// --- Dummy Data ---
const DUMMY_USER: User = {
    name: "International Confirm win",
    email: "Contact@masworld.in.com",
    phone: "123456456",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=ICWDoe",
};

export default function UserProfile() {
    const { width, height, scale, fontScale, spacing, isTablet } = useResponsiveDimensions();
    const router = useRouter();
    const [name, setName] = useState(DUMMY_USER.name);
    const [email, setEmail] = useState(DUMMY_USER.email);
    const [phone, setPhone] = useState(DUMMY_USER.phone);

    const handleSubmit = () => {
        Alert.alert(
            "Profile Updated",
            `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`,
            [{ text: "OK" }]
        );
    };

    const handleBack = () => {
        router.back();
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
                    <ScrollView
                        contentContainerStyle={styles(scale, fontScale, spacing).scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <View
                            style={[
                                styles(scale, fontScale, spacing).content,
                                { maxWidth: Math.round((isTablet ? 1000 : 800) * scale) },
                            ]}
                        >
                            {/* Left Section - Avatar */}
                            <View style={styles(scale, fontScale, spacing).leftSection}>
                                <View style={styles(scale, fontScale, spacing).avatarContainer}>
                                    <Image
                                        source={{ uri: DUMMY_USER.avatar }}
                                        style={[
                                            styles(scale, fontScale, spacing).avatar,
                                            {
                                                width: Math.round(130 * scale),
                                                height: Math.round(130 * scale),
                                                borderRadius: Math.round(65 * scale),
                                            },
                                        ]}
                                    />
                                    <TouchableOpacity
                                        style={styles(scale, fontScale, spacing).cameraButton}
                                    >
                                        <Icon
                                            name="camera-alt"
                                            size={Math.round(18 * scale)}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Right Section - Form */}
                            <View style={styles(scale, fontScale, spacing).rightSection}>
                                <View style={styles(scale, fontScale, spacing).header}>
                                    <Text
                                        style={styles(scale, fontScale, spacing).title}
                                    >
                                        My Profile
                                    </Text>
                                    <TouchableOpacity
                                        onPress={handleBack}
                                        style={styles(scale, fontScale, spacing).backButton}
                                    >
                                        <Icon
                                            name="arrow-back"
                                            size={Math.round(22 * scale)}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={styles(scale, fontScale, spacing).form}
                                >
                                    <View
                                        style={styles(scale, fontScale, spacing).inputContainer}
                                    >
                                        <Icon
                                            name="person"
                                            size={Math.round(22 * scale)}
                                            color="rgba(255,255,255,0.4)"
                                            style={styles(scale, fontScale, spacing).inputIcon}
                                        />
                                        <TextInput
                                            style={styles(scale, fontScale, spacing).input}
                                            value={name}
                                            onChangeText={setName}
                                            placeholder="Full Name"
                                            placeholderTextColor="rgba(255,255,255,0.4)"
                                        />
                                    </View>

                                    <View
                                        style={styles(scale, fontScale, spacing).inputContainer}
                                    >
                                        <Icon
                                            name="email"
                                            size={Math.round(22 * scale)}
                                            color="rgba(255,255,255,0.4)"
                                            style={styles(scale, fontScale, spacing).inputIcon}
                                        />
                                        <TextInput
                                            style={styles(scale, fontScale, spacing).input}
                                            value={email}
                                            onChangeText={setEmail}
                                            placeholder="Email Address"
                                            placeholderTextColor="rgba(255,255,255,0.4)"
                                            keyboardType="email-address"
                                        />
                                    </View>

                                    <View
                                        style={styles(scale, fontScale, spacing).inputContainer}
                                    >
                                        <Icon
                                            name="phone"
                                            size={Math.round(22 * scale)}
                                            color="rgba(255,255,255,0.4)"
                                            style={styles(scale, fontScale, spacing).inputIcon}
                                        />
                                        <TextInput
                                            style={styles(scale, fontScale, spacing).input}
                                            value={phone}
                                            onChangeText={setPhone}
                                            placeholder="Phone Number"
                                            placeholderTextColor="rgba(255,255,255,0.4)"
                                            keyboardType="phone-pad"
                                        />
                                    </View>

                                    <TouchableOpacity
                                        style={styles(scale, fontScale, spacing).submitButton}
                                        onPress={handleSubmit}
                                        activeOpacity={0.8}
                                    >
                                        <LinearGradient
                                            colors={["#3b82f6", "#8b5cf6"]}
                                            style={styles(scale, fontScale, spacing).submitGradient}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                        >
                                            <Text
                                                style={styles(scale, fontScale, spacing).submitText}
                                            >
                                                Save Changes
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
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
        maxWidth: 800,
        alignSelf: "center",
        width: "100%",
    },
    leftSection: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingRight: spacing.lg,
    },
    rightSection: {
        flex: 2,
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
        fontSize: Math.round(26 * fontScale),
    },
    backButton: {
        backgroundColor: "rgba(255,255,255,0.1)",
        padding: spacing.sm,
        borderRadius: Math.round(24 * scale),
    },
    avatarContainer: {
        position: "relative",
        alignItems: "center",
    },
    avatar: {
        borderWidth: 4,
        borderColor: "rgba(255,255,255,0.2)",
    },
    cameraButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#3b82f6",
        borderWidth: 2,
        borderColor: "#1e293b",
        padding: spacing.sm,
        borderRadius: Math.round(20 * scale),
    },
    form: {
        gap: spacing.lg,
    },
    inputContainer: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.05)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
        borderRadius: Math.round(16 * scale),
    },
    inputIcon: {
        position: "absolute",
        left: spacing.md,
        zIndex: 1,
    },
    input: {
        flex: 1,
        paddingLeft: Math.round(50 * scale),
        paddingRight: spacing.md,
        paddingVertical: spacing.md,
        color: "#fff",
        fontSize: Math.round(18 * fontScale),
    },
    submitButton: {
        overflow: "hidden",
        borderRadius: Math.round(16 * scale),
        marginTop: spacing.lg,
    },
    submitGradient: {
        alignItems: "center",
        paddingVertical: spacing.lg,
    },
    submitText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: Math.round(18 * fontScale),
    },
});
