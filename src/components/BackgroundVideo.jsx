export default function BackgroundVideo() {
    return (
        <video
            className="background-video"
            autoPlay
            loop
            muted
            playsInline
        >
            <source src="/video/video_uno.mp4" type="video/mp4" />
        </video>
    );
}
