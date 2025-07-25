import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const isTablet = width > 768;

export const responsiveStyles = StyleSheet.create({
    // Container styles
    container: {
        flex: 1,
        paddingHorizontal: isTablet ? 24 : 16,
        paddingVertical: isTablet ? 20 : 16,
    },
    
    centerContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: isTablet ? 24 : 16,
    },
    
    // Layout styles
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    
    rowBetween: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    
    rowCenter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    
    // Text styles
    title: {
        fontSize: isTablet ? 32 : 24,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        marginBottom: isTablet ? 20 : 16,
    },
    
    subtitle: {
        fontSize: isTablet ? 22 : 18,
        fontWeight: "600",
        color: "#fff",
        textAlign: "center",
        marginBottom: isTablet ? 16 : 12,
    },
    
    body: {
        fontSize: isTablet ? 18 : 16,
        color: "#fff",
        lineHeight: isTablet ? 26 : 22,
    },
    
    caption: {
        fontSize: isTablet ? 16 : 14,
        color: "rgba(255, 255, 255, 0.7)",
    },
    
    // Spacing
    marginVertical: {
        marginVertical: isTablet ? 12 : 8,
    },
    
    marginHorizontal: {
        marginHorizontal: isTablet ? 12 : 8,
    },
    
    padding: {
        padding: isTablet ? 24 : 16,
    },
    
    paddingHorizontal: {
        paddingHorizontal: isTablet ? 24 : 16,
    },
    
    paddingVertical: {
        paddingVertical: isTablet ? 20 : 16,
    },
    
    // Game specific styles
    gameSection: {
        flex: 1,
        borderRadius: isTablet ? 16 : 12,
        padding: isTablet ? 16 : 12,
        marginHorizontal: isTablet ? 8 : 5,
    },
    
    gameButton: {
        borderRadius: isTablet ? 12 : 8,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "transparent",
        backgroundColor: "rgba(255,255,255,0.1)",
    },
    
    selectedItem: {
        borderColor: "#ffd700",
        backgroundColor: "rgba(255,215,0,0.2)",
    },
    
    // Sidebar styles
    sidebar: {
        width: isTablet ? 200 : 160,
        padding: isTablet ? 12 : 8,
        paddingTop: isTablet ? 60 : 48,
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "space-between",
    },
    
    // Grid styles
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignContent: "center",
        flex: 1,
        gap: isTablet ? 10 : 6,
    },
});