import { Stack } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react"
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();
    useEffect(() => {
        const lockOrientation = async () => {
            try {
                await ScreenOrientation.lockAsync(
                    ScreenOrientation.OrientationLock.LANDSCAPE
                );
                // Hide system UI for fullscreen experience
                await SystemUI.setBackgroundColorAsync("transparent");
            } catch (error) {
                console.warn("Failed to lock orientation:", error);
            }
        };
        lockOrientation();
    }, []);

    return (
        <>
            <StatusBar hidden />
            <Stack screenOptions={{ headerShown: false }} />
        </>
    );
}
