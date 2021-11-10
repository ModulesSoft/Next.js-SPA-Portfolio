import LinkRender from "components/Navbars/LinkRender";
import { LanguageContext, languages } from "lib/language";
const LanguageDropdown = ({text}) => {
    return (
        <>
            <LanguageContext.Consumer>
                {({ language, toggleLanguage }) => (
                    <a
                        className="py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                        href="#language"
                        onClick={toggleLanguage}
                    >
                        <LinkRender text={text} href="#language" exact language={language} enText="فارسی" faText="English" icon="" />
                        <img className={`inline-block ${language == "english" ? "mr-2" : "ml-2"}`} src={language == "farsi" ? "/img/flags/USA.png" : "/img/flags/Iran.png"} />
                    </a>
                )}
            </LanguageContext.Consumer>
        </>
    )
}
export default LanguageDropdown;