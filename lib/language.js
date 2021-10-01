import { createContext } from "react";


export const languages = [
    "farsi",
    "english"
]
export const LanguageContext = createContext({
    language: "farsi",  toggleLanguage: () => {},});