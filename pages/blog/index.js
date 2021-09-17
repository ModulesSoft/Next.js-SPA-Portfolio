import Head from 'next/head';
import Link from 'next/link';

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
// data
import { getAllPosts } from '../../lib/api';

// styles
// import styles from '../../styles/Home.module.css';
// import blogStyles from '../../styles/Blog.module.css';
const styles = '';
const blogStyles = '';
const Blog = ({ allPosts: { edges } }) => (
  <>
  <Navbar transparent />
  <main>

  <div className="relative pt-16 pb-32 content-center items-center justify-center min-h-screen-75">
    <Head>
      <title>Blog articles page</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    {edges.map(({ node }) => (
      <div className="wrapper bg-gray-400 antialiased text-gray-900 inline-block">

        <img 
        src={node.extraPostInfo.thumbnailImage ? node.extraPostInfo.thumbnailImage.mediaItemUrl :''}
        alt={node.title}
        className="thumbNailImage w-full object-cover object-center rounded-lg shadow-md" />

        <div className="relative px-4 -mt-16">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-baseline">
              <span className={`${node.extraPostInfo.status? "bg-teal-200" : "bg-orange-200"} text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide pt-2`}>
               {(node.extraPostInfo.status ? "done" : "under construction")}
              </span>
              <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                {node.extraPostInfo.floors && node.extraPostInfo.floors+" floors"}  &bull; {node.extraPostInfo.foundation && node.extraPostInfo.foundation+"m²"}
              </div>
            </div>

            <h4 className="mt-1 text-xl font-semibold uppercase leading-tight" >
              {node.title}
            </h4>

            <div className="mt-1">
              overal cost: $1800
              <span className="text-gray-600 text-sm">   /wk</span>
            </div>
            <div className="mt-1">
              employer: 
              <span className="text-gray-600 text-sm">{" "+node.extraPostInfo.employer}</span>
            </div>
            <div className="mt-4">
              <span className="text-teal-500 text-md font-semibold">
              4/5 ratings
                </span><br />
              <span className="text-sm text-lightBlue-500 mt-4">
                {/* (based on 234 ratings) */}
                <Link href={`/blog/${node.slug}`}>
                  <a>Read more </a>
                </Link>
              </span>
            </div>
          </div>
        </div>

      </div>
    ))}
  </div>
  
  </main>
  </>
);

export async function getStaticProps() {
  const allPosts = await getAllPosts();
  return {
    props: {
      allPosts
    }
  };
}


export default Blog;