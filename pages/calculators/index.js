import DinCalculator from "components/Calculators/DinCalculator";
import UnitConverter from "components/Calculators/UnitConverter";
import { getAllFooterPosts } from "lib/api";
import IndexNavbar from "components/Navbars/IndexNavbar";
import Head from 'next/head';
import Footer from "components/Footers/Footer";
import { useLanguage } from "lib/language";

export async function getStaticProps() {
  const footerData = await getAllFooterPosts();

  return {
    props: {
      footerData
    }
  };
}
function Calculators({footerData}) {
  let lang = useLanguage()
  return (
    <>
      <IndexNavbar fixed />

      <Head>
        <title>{lang == "english" ? "Mini tools" : "ابزارک ها"}</title>
        <meta name="description" content={lang == "english" ? "Small tools for building construction related arithmetic" : "ابزار های کوچک محاسبات عمرانی"} />
        <meta property="og:title" content={lang == "english" ? "Arithmetic small tools" : "ابزارک های عمرانی"} />
      </Head>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 place-items-center bg-blueGray-100 pt-32 pb-16" dir="rtl">
        <section>
          <div>
            <DinCalculator lang={lang}/>
          </div>
        </section>
        <section>
          <div>
            <UnitConverter lang={lang}/>
          </div>
        </section>
      </div>
      <Footer postData={footerData} />
    </>
  )
}

export default Calculators;