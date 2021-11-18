import { useLanguage } from "lib/language";
import Links from "./Links";

export default function Navbar() {
  const lang = useLanguage();
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg" dir={lang == "english" ? "ltr" : "rtl"}>
        <Links lang={lang} navbar="auth"></Links>
      </nav>
    </>
  );
}
