const HelloText: React.FC = () => {
    return (
        <div
            style={{
                position: "absolute",
                top: "35%",
                left: "50%",
                transform: "translate(-50%, -100%)",
                fontSize: "clamp(24px, 4vw, 64px)",
                fontWeight: "bold",
                color: "#FFFFFF",
            }}
        >
            Hey! I'm
        </div>
    );
};

export default HelloText;