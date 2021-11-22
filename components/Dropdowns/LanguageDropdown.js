import { useLanguage, useToggleLanguage } from "lib/language";
export default function LanguageDropdown({ text }) {
    const lang = useLanguage()
    const toggleLanguage = useToggleLanguage()
    return (
        <a onClick={toggleLanguage}
            className={`${text === "light" ? "lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 " : "hover:text-blueGray-500 text-blueGray-700 "}  px-3 py-4 lg:py-2 cursor-pointer`}>      
            <i>
                <img className={`inline-block ${lang === "english" ? "mr-2" : "ml-2"}`} src={lang === "farsi" ? "/img/flags/USA.png" : "/img/flags/Iran.png"} />
            </i>
            <span>
                {lang === "english" ? "فارسی" : "English"}
            </span>
        </a>

    )
}