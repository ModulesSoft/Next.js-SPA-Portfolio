import { useRouter } from "next/router";
import Head from 'next/head';
import Link from "next/link";
import ReactHtmlParser from 'react-html-parser';

import React from "react";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import StarRatings from "components/StarRatings/StarRatings.js";

import { getAllPostsWithSlug, getPost } from "../../lib/api";

export default function Post({ postData }) {
    const router = useRouter();

    if (!router.isFallback && !postData?.slug) {
        return <p>error!</p>;
    }

    const formatDate = date => {
        const newDate = new Date(date);
        return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
    };

    return (
        <>
            <Navbar transparent />
            <Head>
                <title>{postData.title}</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className="profile-page">
                <section className="relative block h-500-px">
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage:
                                `url(${postData.extraProjectsInfo.previewImage ? postData.extraProjectsInfo.previewImage.mediaItemUrl : ''})`,
                        }}
                    >
                        <span
                            id="blackOverlay"
                            className="w-full h-full absolute opacity-50 bg-black"
                        ></span>
                    </div>
                    <div
                        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
                        style={{ transform: "translateZ(0)" }}
                    >
                        <svg
                            className="absolute bottom-0 overflow-hidden"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon
                                className="text-blueGray-200 fill-current"
                                points="2560 0 2560 100 0 100"
                            ></polygon>
                        </svg>
                    </div>
                </section>
                <section className="relative py-16 bg-blueGray-200">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div className="relative">
                                            <img
                                                alt="Azar shiga"
                                                src="/img/azarshiga/azarshiga-blog-2.png"
                                                className=" rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                        <div className="py-6 px-3 mt-32 sm:mt-0 grid grid-cols-1 gap-4 ">
                                            <span className="text-center ">
                                                <StarRatings rating={postData.extraProjectsInfo.scale / 20} />
                                            </span>
                                            <span className={`${postData.extraProjectsInfo.status ? "bg-teal-200" : "bg-orange-200"} text-teal-800 text-xs px-2  rounded-full  uppercase font-semibold tracking-wide pt-2 text-center m-4 `}>
                                                {(postData.extraProjectsInfo.status ? "done" : "under construction")}
                                            </span>

                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                    {postData.extraProjectsInfo.floors}
                                                    <i class="fas fa-sort-amount-up-alt"></i>
                                                </span>
                                                <span className="text-sm text-blueGray-400">
                                                    <p>Floors</p>
                                                </span>
                                            </div>
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                    {postData.extraProjectsInfo.foundation}
                                                <i class="fas fa-external-link-square-alt"></i>
                                                </span>
                                                <span className="text-sm text-blueGray-400">
                                                    <p>Foundation area</p>
                                                </span>
                                            </div>
                                            <div className="lg:mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                    89
                                                </span>
                                                <span className="text-sm text-blueGray-400">
                                                    Comments
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-12">
                                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        {postData.title}
                                    </h3>
                                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                        {postData.extraProjectsInfo.location}
                                    </div>
                                    <div className="mb-2 text-blueGray-600 mt-10">
                                        <i className="fas fa-handshake mr-2 text-lg text-blueGray-400"></i>
                                        <a href={postData.extraProjectsInfo.employerLink} target="_blank" className="text-teal-500 hover:text-lightBlue-600">
                                        {postData.extraProjectsInfo.employer}
                                        </a>
                                    </div>
                                    {/* <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                    University of Computer Science
                  </div> */}
                                </div>
                                <div className="mt-10 py-10 border-t border-blueGray-200">
                                    <div className="flex flex-wrap">
                                        <div className="w-full lg:w-9/12 px-4">
                                            
                                            {ReactHtmlParser(postData.content)}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            {/* <Footer /> */}
        </>

    )
}
export async function getStaticPaths() {
    const allPosts = await getAllPostsWithSlug();

    return {
        paths: allPosts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
        fallback: true
    };
}
export async function getStaticProps({ params }) {
    const data = await getPost(params.slug);
    return {
        props: {
            postData: data.post
        }
    };
}