import React from "react";
import notFoundAnimation from "assets/notFound.json";
import Lottie from "react-lottie";

export const NotFound = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: notFoundAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div>
            <Lottie options={defaultOptions} height={400} width={800} />
        </div>
    );
};
