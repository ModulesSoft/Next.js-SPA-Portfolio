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
const Blog = ({ allPosts: { edges } }) => (
  <>
    <IndexNavbar fixed />

    <Head>
      <title>Blog articles page</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <section className="pb-16 bg-blueGray-100 relative pt-32">
      <div className="container mx-auto items-center flex flex-wrap">
        {edges.map(({ node }) => (
          <div key={node.id} className="wrapper bg-gray-400 antialiased text-gray-900 inline-block">
            <img
              src={node.extraProjectsInfo.thumbnailImage ? node.extraProjectsInfo.thumbnailImage.mediaItemUrl : ''}
              alt={node.title}
              className="thumbNailImage w-full object-cover object-center rounded-lg shadow-md" />

            <div className="relative px-4 -mt-16">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-baseline">
                  <span className={`${node.extraProjectsInfo.status ? "bg-teal-200" : "bg-orange-200"} text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide pt-2`}>
                    {(node.extraProjectsInfo.status ? "done" : "under construction")}
                  </span>
                  <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                    {node.extraProjectsInfo.floors && node.extraProjectsInfo.floors + " floors"}  &bull; {node.extraProjectsInfo.foundation && node.extraProjectsInfo.foundation + "m²"}
                  </div>
                </div>

                <h4 className="mt-1 text-xl font-semibold uppercase leading-tight" >
                <Link href={`/blog/${node.slug}`}>
                      <a className="hover:text-blueGray-500 text-blueGray-700  flex items-center font-bold">
                        {node.title}
                      </a>
                    </Link>
                </h4>

                <div className="mt-1">
                  overal cost: $1800
                  <span className="text-gray-600 text-sm">   /wk</span>
                </div>
                <div className="mt-1">
                  employer:
                  <span className="text-gray-600 text-sm">{" " + node.extraProjectsInfo.employer}</span>
                </div>
                <div className="mt-4">
                  <span className="text-md">
                    project scale:
                    <StarRatings rating={node.extraProjectsInfo.scale/20}/>
                  </span>

                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>

    <Footer />
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