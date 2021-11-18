import { createContext, useContext, useState } from "react";

export const languages = [
    "farsi",
    "english"
]
export const LanguageContext = createContext({
    language: "farsi",
});
export const LanguageContextChange = createContext()

export function useLanguage() {
    return useContext(LanguageContext);
}
export function useToggleLanguage() {
    return useContext(LanguageContextChange);
}


export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(languages[0]);

    function toggleLanguage() {
        setLanguage(
            language =>
                language === languages[0]
                    ? languages[1]
                    : languages[0],

        )
    }
    return (
        <>
            <LanguageContext.Provider value={language}>
                <LanguageContextChange.Provider value={toggleLanguage}>
                    {children}
                </LanguageContextChange.Provider>
            </LanguageContext.Provider>

        </>
    )
}