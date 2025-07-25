import Icon from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
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
    const { width, height, isTablet } = useResponsiveDimensions();
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
                <StatusBar barStyle="light-content" backgroundColor="#312e81" />
                <LinearGradient
                    colors={["#312e81", "#7c3aed"]}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <View
                            style={[
                                styles.content,
                                { maxWidth: isTablet ? 1000 : 800 },
                            ]}
                        >
                            {/* Left Section - Avatar */}
                            <View style={styles.leftSection}>
                                <View style={styles.avatarContainer}>
                                    <Image
                                        source={{ uri: DUMMY_USER.avatar }}
                                        style={[
                                            styles.avatar,
                                            {
                                                width: isTablet ? 150 : 120,
                                                height: isTablet ? 150 : 120,
                                                borderRadius: isTablet
                                                    ? 75
                                                    : 60,
                                            },
                                        ]}
                                    />
                                    <TouchableOpacity
                                        style={[
                                            styles.cameraButton,
                                            {
                                                padding: isTablet ? 12 : 8,
                                                borderRadius: isTablet
                                                    ? 20
                                                    : 16,
                                            },
                                        ]}
                                    >
                                        <Icon
                                            name="camera-alt"
                                            size={isTablet ? 20 : 16}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Right Section - Form */}
                            <View style={styles.rightSection}>
                                <View style={styles.header}>
                                    <Text
                                        style={[
                                            styles.title,
                                            { fontSize: isTablet ? 28 : 24 },
                                        ]}
                                    >
                                        My Profile
                                    </Text>
                                    <TouchableOpacity
                                        onPress={handleBack}
                                        style={[
                                            styles.backButton,
                                            {
                                                padding: isTablet ? 12 : 8,
                                                borderRadius: isTablet
                                                    ? 24
                                                    : 20,
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

                                <View
                                    style={[
                                        styles.form,
                                        { gap: isTablet ? 20 : 16 },
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.inputContainer,
                                            {
                                                borderRadius: isTablet
                                                    ? 16
                                                    : 12,
                                            },
                                        ]}
                                    >
                                        <Icon
                                            name="person"
                                            size={isTablet ? 24 : 20}
                                            color="rgba(255,255,255,0.4)"
                                            style={[
                                                styles.inputIcon,
                                                { left: isTablet ? 16 : 12 },
                                            ]}
                                        />
                                        <TextInput
                                            style={[
                                                styles.input,
                                                {
                                                    fontSize: isTablet
                                                        ? 20
                                                        : 16,
                                                    paddingLeft: isTablet
                                                        ? 52
                                                        : 44,
                                                    paddingVertical: isTablet
                                                        ? 16
                                                        : 12,
                                                },
                                            ]}
                                            value={name}
                                            onChangeText={setName}
                                            placeholder="Full Name"
                                            placeholderTextColor="rgba(255,255,255,0.4)"
                                        />
                                    </View>

                                    <View
                                        style={[
                                            styles.inputContainer,
                                            {
                                                borderRadius: isTablet
                                                    ? 16
                                                    : 12,
                                            },
                                        ]}
                                    >
                                        <Icon
                                            name="email"
                                            size={isTablet ? 24 : 20}
                                            color="rgba(255,255,255,0.4)"
                                            style={[
                                                styles.inputIcon,
                                                { left: isTablet ? 16 : 12 },
                                            ]}
                                        />
                                        <TextInput
                                            style={[
                                                styles.input,
                                                {
                                                    fontSize: isTablet
                                                        ? 20
                                                        : 16,
                                                    paddingLeft: isTablet
                                                        ? 52
                                                        : 44,
                                                    paddingVertical: isTablet
                                                        ? 16
                                                        : 12,
                                                },
                                            ]}
                                            value={email}
                                            onChangeText={setEmail}
                                            placeholder="Email Address"
                                            placeholderTextColor="rgba(255,255,255,0.4)"
                                            keyboardType="email-address"
                                        />
                                    </View>

                                    <View
                                        style={[
                                            styles.inputContainer,
                                            {
                                                borderRadius: isTablet
                                                    ? 16
                                                    : 12,
                                            },
                                        ]}
                                    >
                                        <Icon
                                            name="phone"
                                            size={isTablet ? 24 : 20}
                                            color="rgba(255,255,255,0.4)"
                                            style={[
                                                styles.inputIcon,
                                                { left: isTablet ? 16 : 12 },
                                            ]}
                                        />
                                        <TextInput
                                            style={[
                                                styles.input,
                                                {
                                                    fontSize: isTablet
                                                        ? 20
                                                        : 16,
                                                    paddingLeft: isTablet
                                                        ? 52
                                                        : 44,
                                                    paddingVertical: isTablet
                                                        ? 16
                                                        : 12,
                                                },
                                            ]}
                                            value={phone}
                                            onChangeText={setPhone}
                                            placeholder="Phone Number"
                                            placeholderTextColor="rgba(255,255,255,0.4)"
                                            keyboardType="phone-pad"
                                        />
                                    </View>

                                    <TouchableOpacity
                                        style={[
                                            styles.submitButton,
                                            {
                                                borderRadius: isTablet
                                                    ? 16
                                                    : 12,
                                                marginTop: isTablet ? 24 : 16,
                                            },
                                        ]}
                                        onPress={handleSubmit}
                                        activeOpacity={0.8}
                                    >
                                        <LinearGradient
                                            colors={["#3b82f6", "#8b5cf6"]}
                                            style={[
                                                styles.submitGradient,
                                                {
                                                    paddingVertical: isTablet
                                                        ? 20
                                                        : 16,
                                                },
                                            ]}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                        >
                                            <Text
                                                style={[
                                                    styles.submitText,
                                                    {
                                                        fontSize: isTablet
                                                            ? 20
                                                            : 16,
                                                    },
                                                ]}
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
        maxWidth: 800,
        alignSelf: "center",
        width: "100%",
    },
    leftSection: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 24,
    },
    rightSection: {
        flex: 2,
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
    },
    form: {},
    inputContainer: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.05)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
    },
    inputIcon: {
        position: "absolute",
        zIndex: 1,
    },
    input: {
        flex: 1,
        paddingRight: 16,
        color: "#fff",
    },
    submitButton: {
        overflow: "hidden",
    },
    submitGradient: {
        alignItems: "center",
    },
    submitText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
