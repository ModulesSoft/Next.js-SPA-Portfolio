import { useState } from "react";
import LinkRender from "./LinkRender";
import ResumeModal from "components/Modals/ResumeModal"
import LanguageDropdown from "components/Dropdowns/LanguageDropdown";
import Link from "next/link";

const Links = ({ lang, navbar }) => {

    const [navbarOpen, setNavbarOpen] = useState(false);
    const [resumeModalOpen, setResumeModalOpen] = useState(false);
    let text = "dark";
    navbar == "auth" ? text = "light" : text = "dark"
    return (
        <>
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                {resumeModalOpen && <ResumeModal close={() => setResumeModalOpen(!resumeModalOpen)} />}
                    <a
                        className="text-center text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                        href="/"
                    >
                        <img src="/img/azarshiga/azarshiga.png" style={{ "max-width": "200px" }} />
                        <LinkRender text={text} href="/" exact language={lang} enText="azarshiga" faText="آذرشیگا" icon="" />
                    </a>
                    <button
                        className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                        type="button"
                        onClick={() => setNavbarOpen(!navbarOpen)}
                    >
                        <i className="text-white fas fa-bars"></i>
                    </button>
                </div>
                <div
                    className={
                        "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
                        (navbarOpen ? " block rounded shadow-lg" : " hidden")
                    }
                    id="example-navbar-warning"
                >
                    <ul className="flex flex-col lg:flex-row list-none">
                        <li className="flex items-center">
                            <LinkRender text={text} href="/projects" exact language={lang} enText="Projects" faText="پروژه ها" icon="fas fa-pallet" />
                        </li>
                        <li className="flex items-center">
                            <LinkRender text={text} href="/calculators" exact language={lang} enText="Tools" faText="ابزارک ها" icon="fas fa-calculator" />
                        </li>
                    </ul>
                    <ul className={`flex flex-col lg:flex-row list-none ${lang == "english" ? "lg:ml-auto" : "lg:mr-auto"}`}>
                        <li className="flex items-center">
                            <LanguageDropdown text={text} />
                        </li>
                        <li className="flex items-center">
                            <LinkRender text={text} href="/auth/login" exact language={lang} enText="login" faText="ورود" icon="fas fa-user" />
                        </li>

                        <li className="flex items-center">
                            <LinkRender text={text} href="https://t.me/Azarshiga" language={lang} enText="Telegram" faText="تلگرام" icon="fab fa-telegram" />
                        </li>

                        <li className="flex items-center">
                            <button
                                className={`text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150 ${navbar == "auth" ? "bg-white text-blueGray-700 active:bg-blueGray-50 " : "bg-blueGray-700 text-white active:bg-blueGray-600 "} `}
                                type="button"
                                onClick={() => setResumeModalOpen(!resumeModalOpen)}
                            >
                                <i className="fas fa-arrow-alt-circle-down" />
                                {lang == "english" ? "Resume" : "رزومه"}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )

}
export default Links;