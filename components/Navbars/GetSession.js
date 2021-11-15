import { useContext } from "react";
import { LanguageContext } from "lib/language";

export default function GetSession() {
  const lang = useContext(LanguageContext).language;
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow" dir={lang == "english" ? "ltr" : "rtl"}>
        
      </nav>
    </>
  );
}
