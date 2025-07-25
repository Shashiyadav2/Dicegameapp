import Icon from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    Alert,
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import OrientationLock from "../src/components/common/OrientationLock";

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
    const router = useRouter();
    const [name, setName] = useState(DUMMY_USER.name);
    const [email, setEmail] = useState(DUMMY_USER.email);
    const [phone, setPhone] = useState(DUMMY_USER.phone);

    // Get screen dimensions
    const { width, height } = Dimensions.get("window");
    const isLandscape = width > height;
    const responsiveScale = Math.min(width, height) / 400; // Base scale on smaller dimension

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

    // Calculate responsive values
    const responsiveStyles = createResponsiveStyles(
        responsiveScale,
        isLandscape
    );

    return (
        <OrientationLock orientation="landscape">
            <SafeAreaView style={responsiveStyles.container}>
                <StatusBar hidden />
                <LinearGradient
                    colors={["#312e81", "#7c3aed"]}
                    style={responsiveStyles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={responsiveStyles.content}>
                        {/* Left Section - Avatar */}
                        <View style={responsiveStyles.leftSection}>
                            <View style={responsiveStyles.avatarContainer}>
                                <Image
                                    source={{ uri: DUMMY_USER.avatar }}
                                    style={responsiveStyles.avatar}
                                />
                                <TouchableOpacity
                                    style={responsiveStyles.cameraButton}
                                >
                                    <Icon
                                        name="camera-alt"
                                        size={
                                            responsiveStyles.cameraButton
                                                .width / 2
                                        }
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Right Section - Form */}
                        <View style={responsiveStyles.rightSection}>
                            <View style={responsiveStyles.header}>
                                <Text style={responsiveStyles.title}>
                                    My Profile
                                </Text>
                                <TouchableOpacity
                                    onPress={handleBack}
                                    style={responsiveStyles.backButton}
                                >
                                    <Icon
                                        name="arrow-back"
                                        size={
                                            responsiveStyles.backButton.width /
                                            2
                                        }
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={responsiveStyles.form}>
                                <View style={responsiveStyles.inputContainer}>
                                    <Icon
                                        name="person"
                                        size={
                                            responsiveStyles.inputIcon.fontSize
                                        }
                                        color="rgba(255,255,255,0.4)"
                                        style={responsiveStyles.inputIcon}
                                    />
                                    <TextInput
                                        style={responsiveStyles.input}
                                        value={name}
                                        onChangeText={setName}
                                        placeholder="Full Name"
                                        placeholderTextColor="rgba(255,255,255,0.4)"
                                    />
                                </View>

                                <View style={responsiveStyles.inputContainer}>
                                    <Icon
                                        name="email"
                                        size={
                                            responsiveStyles.inputIcon.fontSize
                                        }
                                        color="rgba(255,255,255,0.4)"
                                        style={responsiveStyles.inputIcon}
                                    />
                                    <TextInput
                                        style={responsiveStyles.input}
                                        value={email}
                                        onChangeText={setEmail}
                                        placeholder="Email Address"
                                        placeholderTextColor="rgba(255,255,255,0.4)"
                                        keyboardType="email-address"
                                    />
                                </View>

                                <View style={responsiveStyles.inputContainer}>
                                    <Icon
                                        name="phone"
                                        size={
                                            responsiveStyles.inputIcon.fontSize
                                        }
                                        color="rgba(255,255,255,0.4)"
                                        style={responsiveStyles.inputIcon}
                                    />
                                    <TextInput
                                        style={responsiveStyles.input}
                                        value={phone}
                                        onChangeText={setPhone}
                                        placeholder="Phone Number"
                                        placeholderTextColor="rgba(255,255,255,0.4)"
                                        keyboardType="phone-pad"
                                    />
                                </View>

                                <TouchableOpacity
                                    style={responsiveStyles.submitButton}
                                    onPress={handleSubmit}
                                    activeOpacity={0.8}
                                >
                                    <LinearGradient
                                        colors={["#3b82f6", "#8b5cf6"]}
                                        style={responsiveStyles.submitGradient}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                    >
                                        <Text
                                            style={responsiveStyles.submitText}
                                        >
                                            Save Changes
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </SafeAreaView>
        </OrientationLock>
    );
}

const createResponsiveStyles = (scale: number, isLandscape: boolean) => {
    // Base sizes for landscape orientation
    const baseSizes = {
        containerPadding: 20,
        contentPadding: 20,
        avatarSize: isLandscape ? 150 : 100,
        avatarBorderRadius: 75,
        cameraButtonSize: 40,
        backButtonSize: 44,
        titleFontSize: 26,
        inputFontSize: 18,
        inputIconSize: 22,
        inputHeight: 50,
        submitButtonHeight: 50,
        submitFontSize: 18,
        gap: 20,
        inputLeftPadding: 50,
    };

    // Scale all dimensions
    const scaledSizes = Object.fromEntries(
        Object.entries(baseSizes).map(([key, value]) => [key, value * scale])
    ) as typeof baseSizes;

    return StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
            height: "100%",
        },
        gradient: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        content: {
            flexDirection: "row",
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: scaledSizes.contentPadding,
            padding: scaledSizes.contentPadding,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.1)",
            width: "90%",
            maxWidth: 800,
            maxHeight: 500,
        },
        leftSection: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingRight: scaledSizes.gap,
        },
        rightSection: {
            flex: 2,
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: scaledSizes.gap,
        },
        title: {
            fontWeight: "bold",
            color: "#fff",
            fontSize: scaledSizes.titleFontSize,
        },
        backButton: {
            backgroundColor: "rgba(255,255,255,0.1)",
            padding: scaledSizes.gap / 2,
            borderRadius: scaledSizes.backButtonSize,
            width: scaledSizes.backButtonSize,
            height: scaledSizes.backButtonSize,
            justifyContent: "center",
            alignItems: "center",
        },
        avatarContainer: {
            position: "relative",
            alignItems: "center",
        },
        avatar: {
            width: scaledSizes.avatarSize,
            height: scaledSizes.avatarSize,
            borderRadius: scaledSizes.avatarBorderRadius,
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
            padding: scaledSizes.gap / 2,
            borderRadius: scaledSizes.cameraButtonSize,
            width: scaledSizes.cameraButtonSize,
            height: scaledSizes.cameraButtonSize,
            justifyContent: "center",
            alignItems: "center",
        },
        form: {
            gap: scaledSizes.gap,
        },
        inputContainer: {
            position: "relative",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.05)",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.1)",
            borderRadius: scaledSizes.contentPadding,
            height: scaledSizes.inputHeight,
        },
        inputIcon: {
            position: "absolute",
            left: scaledSizes.gap,
            fontSize: scaledSizes.inputIconSize,
        },
        input: {
            flex: 1,
            paddingLeft: scaledSizes.inputLeftPadding,
            paddingRight: scaledSizes.gap,
            color: "#fff",
            fontSize: scaledSizes.inputFontSize,
            height: "100%",
        },
        submitButton: {
            overflow: "hidden",
            borderRadius: scaledSizes.contentPadding,
            marginTop: scaledSizes.gap,
        },
        submitGradient: {
            alignItems: "center",
            justifyContent: "center",
            height: scaledSizes.submitButtonHeight,
        },
        submitText: {
            color: "#fff",
            fontWeight: "bold",
            fontSize: scaledSizes.submitFontSize,
        },
    });
};
