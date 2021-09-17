import { useRouter } from "next/router";
import Head from 'next/head';
import Link from "next/link";
import ReactHtmlParser from 'react-html-parser';


import {getAllPostsWithSlug, getPost} from "../../lib/api";

export default function Post({postData}){
    const router = useRouter();

    if(!router.isFallback && !postData?.slug){
        return <p>error!</p>;
    }

    const formatDate = date =>{
        const newDate = new Date(date);
        return `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;
    };

    return (
        <div className={null}>
            <Head>
                <title>{postData.title}</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className={null}>
                {router.isFallback?(<h2>Loading...</h2>):(
                    <article className={null}>
                        <div className={null}>
                            <h1>
                                {postData.title}
                            </h1>
                            <p>{formatDate(postData.date)}</p>
                        </div>
                        <div>
                            {ReactHtmlParser(postData.content)}
                        </div>
                    </article>
                )}
                <p>
                    <Link href="/blog">
                        <a>
                            back to blog
                        </a>
                    </Link>
                </p>
            </main>
        </div>

    )
}
export async function getStaticPaths(){
    const allPosts = await getAllPostsWithSlug();

    return {
        paths: allPosts.edges.map(({node})=> `/blog/${node.slug}`) || [],
        fallback: true
    };
}
export async function getStaticProps({params}) {
    const data = await getPost(params.slug);
    return {
      props: {
        postData: data.post
      }
    };
  }