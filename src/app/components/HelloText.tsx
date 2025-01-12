import Image from "next/image";

const HelloText: React.FC = () => {
    return (
        <Image
            className="absolute top-[40%] lg:left-[31%] left-[50%] -translate-x-1/2 -translate-y-full -rotate-5"
            src={`/images/heyim.png`}
            alt='' 
            width={250}
            height={250}
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