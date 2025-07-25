import { Stack } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
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
            } catch (error) {
                console.warn("Failed to lock orientation:", error);
            }
        };
        lockOrientation();
    }, []);

    return <Stack screenOptions={{ headerShown: false }} />;
}
