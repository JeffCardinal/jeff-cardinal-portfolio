import { faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";


function Footer({ textColor, bgColor }: { textColor: string, bgColor: string }) {
    return (
        <div className={`
            flex flex-3
            flex-col-reverse
            lg:flex-row
            justify-left items-center
            ${bgColor}
        `}>
            <Image
                className="p-8"
                alt='Chrome JC Logo'
                src='/images/jclogo-shiny-3.png'
                width="400" 
                height="0"
            />
            <div className='flex grow pt-8 min-w-[300px] justify-center text-center'>
                <div className={`text-2xl flex-auto ${textColor}`}>
                    <div className="font-distancia text-4xl">Nav</div>
                    <Link href='/'>Home</Link><br></br>
                    <Link href='/about'>About</Link><br></br>
                    <Link href="/JeffCardinalResume2024PDF.pdf">Resume</Link><br></br>
                </div>
            </div>
            <div className='flex grow pt-8 min-w-[300px] justify-center text-center'>
                <div className={`text-2xl flex-auto ${textColor}`}>
                <div className="font-distancia text-4xl">Social</div>
                    <div className="justify-center items-center flex flex-row">
                        <Link href='https://www.instagram.com/vaperror'>
                            <div className="flex flex-row w-full">
                                <div className="h-16 w-16 mr-4 pt-1">
                                    <Image width={100} height={100} src={`/images/glyphs/Instagram_Glyph_Gradient.png`} alt={"Instagram"}/>
                                </div>
                                {/* <div>IG</div> */}
                            </div>
                        </Link>
                        <Link href='https://www.x.com/vaperror'>
                            <div className="flex flex-row w-full">
                                <div className="h-[4.5rem] w-[4.5rem] mr-4 pt-1"><FontAwesomeIcon icon={faXTwitter} /></div>
                                {/* <div>X</div> */}
                            </div>
                        </Link>
                        <Link href='https://www.linkedin.com/in/jeffjcardinal'>
                            <div className="flex flex-row w-full">
                                <div className="h-16 w-16 mr-4"><FontAwesomeIcon icon={faLinkedin} color="#2d64bc" /></div>
                                {/* <div>LinkedIn</div> */}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;