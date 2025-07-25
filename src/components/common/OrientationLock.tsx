import * as ScreenOrientation from "expo-screen-orientation";
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
            } catch (error) {
                console.warn("Failed to lock orientation:", error);
            }
        };
        lockOrientation();
        // Do not unlock on unmount to keep orientation locked
    }, []);

    return <>{children}</>;
}
