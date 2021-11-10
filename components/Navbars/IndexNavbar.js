import { useContext } from "react";
import { LanguageContext } from "lib/language";
import Links from "./Links";

export default function Navbar() {
  const lang = useContext(LanguageContext).language;
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow" dir={lang == "english" ? "ltr" : "rtl"}>
        <Links lang={lang} navbar="index"></Links>
      </nav>
    </>
  );
}
