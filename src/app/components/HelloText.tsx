import Image from "next/image";

const HelloText: React.FC = () => {
    return (
        <Image
            className=""
            src={`/images/heyim.png`}
            alt='' 
            width={250}
            height={250}
            // sizes="100vw"
            // style={{ width: '100%', height: 'auto' }}
            style={{
                position: "absolute",
                top: "40%",
                left: "31%",
                transform: "translate(-50%, -100%)",
                rotate: "-5deg",
            }}
            objectFit='contain'
        />
        // <div
            // style={{
            //     position: "absolute",
            //     top: "33%",
            //     left: "50%",
            //     transform: "translate(-50%, -100%)",
            //     fontSize: "64px",
            //     fontWeight: "bold",
            //     color: "#FFFFFF",
            //     whiteSpace: "nowrap",
            // }}
        // >
        //     Hey! I'm
        // </div>
    );
};

export default HelloText;