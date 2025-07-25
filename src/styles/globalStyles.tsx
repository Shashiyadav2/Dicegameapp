import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const globalStyles = StyleSheet.create({
    // Container styles
    container: {
        flex: 1,
        backgroundColor: "#4c51bf",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
    },

    gradientContainer: {
        flex: 1,
        width: "100%",
    },

    centerContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
    },

    // Card styles
    card: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 16,
        padding: 24,
        margin: 16,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    // Game specific cards
    gameCard: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 12,
        padding: 15,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    // Button styles
    button: {
        backgroundColor: "#38a169",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    buttonPressed: {
        backgroundColor: "#2f855a",
        transform: [{ scale: 0.95 }],
    },

    buttonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 16,
    },

    // Game specific buttons
    primaryButton: {
        backgroundColor: "#e2951d",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    secondaryButton: {
        backgroundColor: "#718096",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },

    successButton: {
        backgroundColor: "#38a169",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    dangerButton: {
        backgroundColor: "#e53e3e",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    disabledButton: {
        backgroundColor: "#a0a0a0",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    // Selection items
    selectionItem: {
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "transparent",
    },

    selectedItem: {
        borderColor: "#ffd700",
        backgroundColor: "rgba(255,215,0,0.2)",
    },

    // Input styles
    input: {
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        color: "white",
        fontSize: 16,
    },

    inputFocused: {
        borderColor: "#4c51bf",
        shadowColor: "#4c51bf",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },

    // Text styles
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginBottom: 16,
    },

    subtitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
        textAlign: "center",
        marginBottom: 12,
    },

    text: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
    },

    // Game specific text styles
    sectionTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "white",
        textAlign: "center",
        marginBottom: 10,
    },

    balanceText: {
        fontSize: 16,
        fontWeight: "700",
        color: "white",
    },

    winText: {
        color: "#48bb78",
        fontWeight: "600",
    },

    loseText: {
        color: "#f56565",
        fontWeight: "600",
    },

    accentText: {
        color: "#ffd700",
        fontWeight: "700",
    },

    placeholderText: {
        color: "rgba(255, 255, 255, 0.7)",
    },

    // Layout helpers
    row: {
        flexDirection: "row",
        alignItems: "center",
    },

    column: {
        flexDirection: "column",
    },

    spaceBetween: {
        justifyContent: "space-between",
    },

    spaceAround: {
        justifyContent: "space-around",
    },

    spaceEvenly: {
        justifyContent: "space-evenly",
    },

    center: {
        alignItems: "center",
        justifyContent: "center",
    },

    marginVertical: {
        marginVertical: 8,
    },

    marginHorizontal: {
        marginHorizontal: 8,
    },

    padding: {
        padding: 16,
    },

    smallPadding: {
        padding: 8,
    },

    largePadding: {
        padding: 24,
    },

    flex1: {
        flex: 1,
    },

    flex2: {
        flex: 2,
    },

    // Grid layouts
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 8,
    },

    gridItem: {
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "transparent",
    },

    // Gradient colors (for use with react-native-linear-gradient)
    gradientColors: ["#4c51bf", "#6b46c1"],
    buttonGradientColors: ["#38a169", "#2f855a"],
    buttonPressedGradientColors: ["#2f855a", "#276749"],
    primaryGradientColors: ["#e2951d", "#d69e2e"],
    successGradientColors: ["#38a169", "#2f855a"],
    dangerGradientColors: ["#e53e3e", "#c53030"],
});

// Helper function for responsive dimensions
export const responsiveDimensions = {
    screenWidth: width,
    screenHeight: height,
    isSmallScreen: width < 350,
    isMediumScreen: width >= 350 && width < 450,
    isLargeScreen: width >= 450,
    isLandscape: width > height,
    isPortrait: height > width,
};

// Common spacing values
export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
};

// Common border radius values
export const borderRadius = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 20,
    round: 50,
};

// Common colors
export const colors = {
    primary: "#4c51bf",
    secondary: "#6b46c1",
    accent: "#ffd700",
    success: "#38a169",
    danger: "#e53e3e",
    warning: "#e2951d",
    info: "#3182ce",
    light: "#f7fafc",
    dark: "#1a202c",
    white: "#ffffff",
    black: "#000000",
    gray: "#718096",
    transparent: "transparent",
    overlay: "rgba(0, 0, 0, 0.5)",
    cardOverlay: "rgba(255, 255, 255, 0.1)",
    borderOverlay: "rgba(255, 255, 255, 0.2)",
};
