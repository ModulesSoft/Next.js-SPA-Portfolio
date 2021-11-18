import Head from 'next/head';
import Link from 'next/link';
import { useContext } from 'react';

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import StarRatings from "components/StarRatings/StarRatings.js";
import Footer from "components/Footers/Footer";
// data
import { getAllProjects } from '../../lib/api';
import { getAllFooterPosts } from '../../lib/api';
import { useLanguage } from "lib/language";

export async function getStaticProps() {
  const allPosts = await getAllProjects();
  const footerData = await getAllFooterPosts();

  return {
    props: {
      allPosts,
      footerData
    }
  };
}
function Blog({ allPosts: { edges }, footerData }) {
  let lang = useLanguage()
  return (
    <>
      <IndexNavbar fixed />

      {/* <Head>
        <title>Projects page</title>
        <link rel='icon' href='/favicon.ico' />
      </Head> */}
      <section className="pb-16 bg-blueGray-100 pt-32" dir={lang == "english" ? "ltr" : "rtl"}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {edges.map(({ node }) => (
            <div key={node.id} className="m-4 bg-gray-400 antialiased text-gray-900">
              <Link href={`/projects/${node.slug}`}>
                <img
                  src={node.extraProjectsInfo.thumbnailImage ? node.extraProjectsInfo.thumbnailImage.mediaItemUrl : ''}
                  alt={node.title}
                  className="cursor-pointer h-350-px w-full object-cover object-center rounded-lg shadow-md" />
              </Link>
              <div className="relative -mt-16">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-baseline">
                    <span className={`${node.extraProjectsInfo.status ? "bg-teal-200" : "bg-orange-200"} text-teal-800 text-xs p-2 inline-block rounded-full  uppercase font-semibold tracking-wide text-center`}>
                      {(node.extraProjectsInfo.status ? lang=="english"?"done":"انجام شده" : lang=="english"?"under construction":"دردست ساخت")}
                    </span>
                    <div className="mr-2 ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                      {node.extraProjectsInfo.floors && node.extraProjectsInfo.floors + (lang == "english" ?" floors":" طبقه")}  &nbsp; {node.extraProjectsInfo.foundation && node.extraProjectsInfo.foundation + "m²"}
                    </div>
                  </div>

                  <h4 className="mt-1 text-xl font-semibold leading-tight" >
                    <Link href={`/projects/${node.slug}`}>
                      <a className="text-teal-500 hover:text-lightBlue-600 flex items-center font-bold">
                        {lang == "english" ? node.postsInfo.englishTitle : node.title}
                      </a>
                    </Link>
                  </h4>

                  <div className="mt-1">
                    {/* overal cost: $1800
                  <span className="text-gray-600 text-sm">   /wk</span> */}
                  </div>
                  <div className="mt-1">
                  {lang == "english" ? "employer:" : "کارفرما:"}
                    <span className="text-gray-600 text-sm">{" " + node.extraProjectsInfo.employer}</span>
                  </div>
                  <div className="mt-4 grid ">
                    <p>
                      {lang == "english" ? "project scale:" : "مقیاس پروژه:"}
                    </p>
                    <span className="text-center">
                      <StarRatings rating={node.extraProjectsInfo.scale / 20} />
                    </span>

                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>
      <Footer postData={footerData} />
    </>

  )
};

export default Blog;