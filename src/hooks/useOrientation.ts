import { useState, useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

export function useOrientation() {
    const [orientation, setOrientation] = useState<ScreenOrientation.Orientation>();

    useEffect(() => {
        const getOrientation = async () => {
            const currentOrientation = await ScreenOrientation.getOrientationAsync();
            setOrientation(currentOrientation);
        };

        getOrientation();

        const subscription = ScreenOrientation.addOrientationChangeListener((event) => {
            setOrientation(event.orientationInfo.orientation);
        });

        return () => {
            ScreenOrientation.removeOrientationChangeListener(subscription);
        };
    }, []);

    const lockLandscape = async () => {
        try {
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.LANDSCAPE
            );
        } catch (error) {
            console.warn("Failed to lock orientation:", error);
        }
    };

    const unlockOrientation = async () => {
        try {
            await ScreenOrientation.unlockAsync();
        } catch (error) {
            console.warn("Failed to unlock orientation:", error);
        }
    };

    return {
        orientation,
        lockLandscape,
        unlockOrientation,
        isLandscape: orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT || 
                    orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT,
    };
}