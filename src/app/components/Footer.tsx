import { faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";


function Footer({ textColor, bgColor }: { textColor: string, bgColor: string }) {
    return (
        <div className={`lg:grid lg:grid-cols-3 items-center ${bgColor}`}>
            <div className="flex justify-center lg:justify-start w-full">
                <Image
                    className="p-8"
                    alt='Chrome JC Logo'
                    src='/images/jclogo-shiny-3.png'
                    width={400} 
                    height={0}
                />
            </div>
            <div className='flex lg:pt-8 min-w-[300px] justify-center text-center'>
                <div className={`text-2xl ${textColor}`}>
                    <div className="font-distancia text-4xl">Navi</div>
                    <Link className="hover:text-rose-500 transition-colors duration-300" href='/'>HOME</Link><br />
                    <Link className="hover:text-rose-500 transition-colors duration-300" href='/about'>ABOUT</Link><br />
                    <Link className="hover:text-rose-500 transition-colors duration-300" href="/resume.pdf">RESUME</Link><br />
                </div>
            </div>
            <div className='flex p-8 min-w-[300px] items-center text-center justify-center lg:justify-end lg:text-right lg:items-end'>
                <div className={`text-2xl ${textColor}`}>
                    <div className="font-distancia text-4xl">Social</div>
                    <div className="flex justify-center items-center gap-6">
                        <Link href='https://www.instagram.com/vaperror'>
                            <div className="w-16 h-16 flex items-center justify-center">
                                <Image width={64} height={64} src={`/images/glyphs/Instagram_Glyph_Gradient.png`} alt={"Instagram"} />
                            </div>
                        </Link>
                        <Link href='https://www.x.com/vaperror'>
                            <div className="w-16 h-16 flex items-center justify-center">
                                <FontAwesomeIcon icon={faXTwitter} className="text-[64px]" />
                            </div>
                        </Link>
                        <Link href='https://www.linkedin.com/in/jeffjcardinal'>
                            <div className="w-16 h-16 flex items-center justify-center">
                                <FontAwesomeIcon icon={faLinkedin} color="#2d64bc" fill-opacity="white" className="text-[64px]" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;