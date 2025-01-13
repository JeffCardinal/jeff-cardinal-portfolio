import Image from "next/image";
import Link from "next/link";


function Footer({ textColor }: { textColor: string }) {
    return (
        <div className="
            flex flex-3
            flex-col-reverse
            lg:flex-row
            justify-left items-center
        ">
            <Image
                className="p-8"
                alt='Chrome JC Logo'
                src='/images/jclogo-shiny-3.png'
                width="400" 
                height="0"
            />
            <div className='flex grow pt-8 min-w-[300px] justify-center text-center'>
            <div className={`text-2xl flex-auto ${textColor}`}>
            <div className="font-distancia text-2xl">Nav</div>
                <Link href='/'>Home</Link><br></br>
                <Link href='/about'>About</Link><br></br>
                <Link href="/JeffCardinalResume2024PDF.pdf">Resume</Link><br></br>
            </div>
            </div>
            <div className='flex grow pt-8 min-w-[300px] justify-center text-center'>
            <div className={`text-2xl flex-auto ${textColor}`}>
            <div className="font-distancia text-2xl">Social</div>
                <Link href='https://www.instagram.com/vaperror'>IG</Link><br></br>
                <Link href='https://www.x.com/vaperror'>X</Link><br></br>
                <Link href='https://www.linkedin.com/in/jeffjcardinal'>LinkedIn</Link><br></br>
            </div>
            </div>
        </div>
    );
};

export default Footer;