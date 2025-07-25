import React, { useEffect, useState } from "react";
import Main from "../src/components/CityBettingGame";
import Login from "../src/components/Login";
import Onboarding from "../src/components/Onboarding";
import SplashScreen from "../src/components/SplashScreen";

export default function HomeScreen() {
    const [currentScreen, setCurrentScreen] = useState("splash");
    const [onboardingStep, setOnboardingStep] = useState(0);
    const [mobileNumber, setMobileNumber] = useState("");

    useEffect(() => {
        if (currentScreen === "splash") {
            const timer = setTimeout(
                () => setCurrentScreen("onboarding"),
                2000
            );
            return () => clearTimeout(timer);
        }
    }, [currentScreen]);

    if (currentScreen === "splash") {
        return <SplashScreen currentScreen={currentScreen} />;
    }
    if (currentScreen === "onboarding") {
        return (
            <Onboarding
                onboardingStep={onboardingStep}
                setOnboardingStep={setOnboardingStep}
                setCurrentScreen={setCurrentScreen}
            />
        );
    }
    if (currentScreen === "login") {
        return (
            <Login
                mobileNumber={mobileNumber}
                setMobileNumber={setMobileNumber}
                setCurrentScreen={setCurrentScreen}
            />
        );
    }
    if (currentScreen === "main") {
        return <Main />;
    }
    return null;
}
