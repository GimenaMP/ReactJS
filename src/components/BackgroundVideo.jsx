// src/components/BackgroundVideo.jsx
import React from "react";


export default function BackgroundVideo() {
    return (
        <video
            className="background-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/video_uno_preview.jpg"
        >
            <source src="/video/video_uno.webm" type="video/webm" />
            <source src="/video/video_uno.mp4" type="video/mp4" />
            Tu navegador no soporta el video.
        </video>
    );
}
