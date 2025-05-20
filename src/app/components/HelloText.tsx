import Image from "next/image";

const HelloText: React.FC = () => {
    return (
        <div className="absolute top-[30%] lg:left-[25%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-row object-scale-down user-select-none">
            <Image
                className="rotate-[-10deg]"
                src={`/images/heyim.png`}
                alt='' 
                width={250}
                height={250}
            />
        </div>
    );
};

export default HelloText;