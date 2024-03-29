import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "components/Navbars/AuthNavbar.js";
import StarRatings from "components/StarRatings/StarRatings.js";
import { getAllProjects, getPost, getImagesByParentPost } from "../../lib/api";
import Interweave from "interweave";
import ProjectGallery from "components/Galleries/ProjectGallery";
// import { comment } from "postcss";
export async function getStaticPaths() {
  const allProjects = await getAllProjects();
  return {
    paths: allProjects.edges.map(({ node }) => `/projects/${node.slug}`) || [],
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const postData = await getPost(params.slug);
  const images = await getImagesByParentPost(postData.databaseId);
  return {
    props: {
      postData,
      images,
    },
  };
}

export default function Post({ postData, images }) {
  const router = useRouter();
  //remove images from content
  if (postData.content) {
    postData.content = postData.content.replace(/<img[^>]*>/g, "");
  }
  if (!router.isFallback && !postData?.slug) {
    return <p>error!</p>;
  }

  // const formatDate = date => {
  //     const newDate = new Date(date);
  //     return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
  // };

  return (
    <>
      <Navbar transparent />
      <Head>
        <title>{postData.title}</title>
        <meta
          name="description"
          content={
            " مقیاس پروژه " +
            postData.extraProjectsInfo.scale +
            " طبقه " +
            postData.extraProjectsInfo.floors +
            " زیربنا " +
            postData.extraProjectsInfo.foundation +
            " کارفرما " +
            postData.extraProjectsInfo.employer
          }
        />
        <meta property="og:title" content={postData.title + " پروژه "} />
      </Head>
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url(${
                postData.extraProjectsInfo.previewImage
                  ? postData.extraProjectsInfo.previewImage.mediaItemUrl
                  : ""
              })`,
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
                        alt="Azar shiga Helmet"
                        src={
                          process.env.imagesPrefix +
                          "/img/azarshiga/azarshiga-blog-2.png"
                        }
                        className=" rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0 grid grid-cols-1 gap-4 ">
                      <span className="text-center ">
                        <StarRatings
                          rating={postData.extraProjectsInfo.scale / 20}
                        />
                      </span>
                      <span
                        className={`${
                          postData.extraProjectsInfo.status
                            ? "bg-teal-200"
                            : "bg-orange-200"
                        } text-teal-800 text-xs px-2  rounded-full  uppercase font-semibold tracking-wide pt-2 text-center m-4 `}
                      >
                        {postData.extraProjectsInfo.status
                          ? "done"
                          : "under construction"}
                      </span>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          <p className="inline-block">
                            {postData.extraProjectsInfo.floors}
                          </p>
                          <i className="fas fa-sort-amount-up-alt inline-block"></i>
                        </span>
                        <span className="text-sm text-blueGray-400">
                          <p>Floors</p>
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          <p className="inline-block">
                            {postData.extraProjectsInfo.foundation}
                          </p>
                          <i className="fas fa-external-link-square-alt inline-block"></i>
                        </span>
                        <span className="text-sm text-blueGray-400">
                          <p>Foundation area</p>
                        </span>
                      </div>
                      {/* <div className="lg:mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                    89
                                                </span>
                                                <span className="text-sm text-blueGray-400">
                                                    Comments
                                                </span>
                                            </div> */}
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
                    <a
                      href={postData.extraProjectsInfo.employerLink}
                      target="_blank"
                      className="text-teal-500 hover:text-lightBlue-600"
                    >
                      {postData.extraProjectsInfo.employer}
                    </a>
                  </div>
                </div>
                <div className="mt-10 py-10 border-blueGray-100 border-t flex justify-center">
                  <ProjectGallery mediaItem={images}></ProjectGallery>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200">
                  <div className="flex flex-wrap" dir="rtl">
                    <div className="w-full lg:w-9/12 px-4">
                      <Interweave content={postData.content} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
