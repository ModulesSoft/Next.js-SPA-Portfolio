import Head from 'next/head';
import Link from 'next/link';

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import StarRatings from "components/StarRatings/StarRatings.js";
// data
import { getAllProjects } from '../../lib/api';

// styles
// import styles from '../../styles/Home.module.css';
// import blogStyles from '../../styles/Blog.module.css';
const styles = '';
const blogStyles = '';
const Blog = ({ allPosts: { edges },footerData:footerData }) => (
  <>
    <IndexNavbar fixed />

    <Head>
      <title>Blog articles page</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <section className="pb-16 bg-blueGray-100 pt-32" dir="">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {edges.map(({ node }) => (
          <div key={node.id} className="m-4 bg-gray-400 antialiased text-gray-900">
            <img
              src={node.extraProjectsInfo.thumbnailImage ? node.extraProjectsInfo.thumbnailImage.mediaItemUrl : ''}
              alt={node.title}
              className="h-350-px w-full object-cover object-center rounded-lg shadow-md" />

            <div className="relative -mt-16">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-baseline">
                  <span className={`${node.extraProjectsInfo.status ? "bg-teal-200" : "bg-orange-200"} text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide pt-2 text-center`}>
                    {(node.extraProjectsInfo.status ? "done" : "under construction")}
                  </span>
                  <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                    {node.extraProjectsInfo.floors && node.extraProjectsInfo.floors + " floors"}  &nbsp; {node.extraProjectsInfo.foundation && node.extraProjectsInfo.foundation + "m²"}
                  </div>
                </div>

                <h4 className="mt-1 text-xl font-semibold uppercase leading-tight" >
                <Link href={`/blog/${node.slug}`}>
                      <a className="text-teal-500 hover:text-lightBlue-600 flex items-center font-bold">
                        {node.title}
                      </a>
                    </Link>
                </h4>

                <div className="mt-1">
                  {/* overal cost: $1800
                  <span className="text-gray-600 text-sm">   /wk</span> */}
                </div>
                <div className="mt-1">
                  employer:
                  <span className="text-gray-600 text-sm">{" " + node.extraProjectsInfo.employer}</span>
                </div>
                <div className="mt-4 grid ">
                  <p>
                    project scale:
                  </p>
                  <span className="text-center">
                    <StarRatings rating={node.extraProjectsInfo.scale/20}/>
                  </span>

                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
    <Footer postData={footerData}/>
  </>
);

export async function getStaticProps() {
  const allPosts = await getAllProjects();
  return {
    props: {
      allPosts
    }
  };
}


export default Blog;