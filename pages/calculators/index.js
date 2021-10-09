import DinCalculator from "components/Calculators/DinCalculator";
import UnitConverter from "components/Calculators/UnitConverter";
import { getAllFooterPosts } from "lib/api";
import IndexNavbar from "components/Navbars/IndexNavbar";
import Head from 'next/head';
import Footer from "components/Footers/Footer";

export async function getStaticProps() {
  const footerData = await getAllFooterPosts();

  return {
    props: {
      footerData
    }
  };
}
const Calculators = ({ footerData }) => (
  <>
    <IndexNavbar fixed />

    <Head>
      <title>Calculators page</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 place-items-center bg-blueGray-100 pt-32 pb-16" dir="rtl">
      <section className="" dir="">
        <div className="">
          <DinCalculator />
        </div>
      </section>
      <section className="" dir="">
        <div className="">
          <UnitConverter />
        </div>
      </section>
    </div>
    <Footer postData={footerData} />
  </>
);

export default Calculators;