import { LanguageContext, languages } from "lib/language";
const LanguageDropdown = () => {
    return (
        <>
            <LanguageContext.Consumer>
                {({ language, toggleLanguage }) => (
                    <a
                        className="py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                        href="#language"
                        onClick={toggleLanguage}
                    >
                        <img className={`inline-block ${language == "english" ? "mr-2" : "ml-2"}`} src={language == "farsi" ? "https://www.countryflags.io/us/flat/24.png" : "https://www.countryflags.io/ir/flat/24.png"} />
                        <span className="inline-block">{language == "farsi" ? "English" : "فارسی"}</span>

                    </a>
                )}
            </LanguageContext.Consumer>
        </>
    )
}
export default LanguageDropdown;