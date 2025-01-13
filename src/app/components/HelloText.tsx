import Image from "next/image";

const HelloText: React.FC = () => {
    return (
        <Image
            className="absolute top-[38%] lg:left-[28%] left-[50%] -translate-x-1/2 -translate-y-full rotate-[-10deg]"
            src={`/images/heyim.png`}
            alt='' 
            width={250}
            height={250}
            objectFit='contain'
        />
    );
};

export default HelloText;