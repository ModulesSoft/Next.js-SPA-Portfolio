import { useContext, useState } from "react";
import Link from "next/link";
// components
import LanguageDropdown from "components/Dropdowns/LanguageDropdown.js";
import { LanguageContext } from "lib/language";
import LinkRender from "./LinkRender";
import ResumeModal from "components/Modals/ResumeModal"


export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [resumeModalOpen,setResumeModalOpen] = useState(false);
  const lang = useContext(LanguageContext).language;
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow" dir={lang=="english"?"ltr":"rtl"}>
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a
                className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                href="#"
              >
                <img src="/img/azarshiga/azarshiga.png" style={{ "max-height": "40px" }} />
                <p className="text-center -mt-4">azarshiga</p>
              </a>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none">
              <li className="flex items-center">
                <Link href="/projects">
                  <a
                    className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    href=""
                  >
                    <LinkRender language={lang} enText="Projects" faText="پروژه ها" icon="fas fa-pallet"/>
                  </a>
                </Link>
              </li>
              <li className="flex items-center">
                <Link  href="/calculators">
                  <a
                    className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    href=""
                  >
                    <LinkRender language={lang} enText="Tools" faText="ابزارک ها" icon="fas fa-calculator"/>
                  </a>
                </Link>
              </li>
            </ul>
            <ul className={`flex flex-col lg:flex-row list-none ${lang=="english"?"lg:ml-auto":"lg:mr-auto"}`}>
              <li className="flex items-center">
                <a
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://t.me/Azarshiga"
                  target="_blank"
                >
                  <LanguageDropdown />
                </a>
              </li>
              

              <li className="flex items-center">
                <button
                  className="bg-blueGray-700 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setResumeModalOpen(!resumeModalOpen)}
                >
                  <i className="fas fa-arrow-alt-circle-down"></i>
                  <LinkRender language={lang} enText="Resume" faText="رزومه" icon={null}/>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {resumeModalOpen && <ResumeModal close={() => setResumeModalOpen(!resumeModalOpen)}/>}
    </>
  );
}
