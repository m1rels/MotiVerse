import React from 'react';
import LottieView from "lottie-react-native";

function ActivityIndicator({visible = false}) {
    if (!visible) return null;

    return (
        <LottieView
        autoPlay
        loop
        source={require("../assets/animations/loader.json")}
        style={{height: 100, width: 100}}
        />
    );
}

export default ActivityIndicator;