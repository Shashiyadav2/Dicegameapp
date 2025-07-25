import * as ScreenOrientation from "expo-screen-orientation";
import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";
import { useEffect } from "react";

interface OrientationLockProps {
    children: React.ReactNode;
}

export default function OrientationLock({ children }: OrientationLockProps) {
    useEffect(() => {
        const lockOrientation = async () => {
            try {
                await ScreenOrientation.lockAsync(
                    ScreenOrientation.OrientationLock.LANDSCAPE
                );
                
                // Hide navigation bar on Android for true fullscreen
                if (Platform.OS === "android") {
                    await NavigationBar.setVisibilityAsync("hidden");
                    await NavigationBar.setBehaviorAsync("inset-swipe");
                }
            } catch (error) {
                console.warn("Failed to lock orientation:", error);
            }
        };
        lockOrientation();
        // Do not unlock on unmount to keep orientation locked
    }, []);

    return <>{children}</>;
}
