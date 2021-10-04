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
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
      <section className="pb-16 bg-blueGray-100 pt-32" dir="">
        <div className="">
          <DinCalculator />
        </div>
      </section>
      <section className="pb-16 bg-blueGray-100 pt-32" dir="">
        <div className="">
          <UnitConverter />
        </div>
      </section>
    </div>
    <Footer postData={footerData} />
  </>
);

export default Calculators;