import { LanguageContext } from "lib/language";
const LanguageDropdown = () => {
    return (
        <>
            <LanguageContext.Consumer>
                {({ language, toggleLanguage }) => (
                    <a
                        className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                        href="#language"
                        onClick={toggleLanguage}
                    >
                        <div>
                            <img className="inline-block" src={language == "farsi" ? "https://www.countryflags.io/us/flat/16.png" : "https://www.countryflags.io/ir/flat/16.png"} />
                            <p className="inline-block">{language=="farsi"?"English":"فارسی"}</p>
                        </div>
                    </a>
                )}
            </LanguageContext.Consumer>
        </>
    )
}
export default LanguageDropdown;