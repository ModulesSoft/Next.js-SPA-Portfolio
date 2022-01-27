import { Component, createRef } from "react";
import Link from "next/link";
import Navbar from "components/Navbars/AuthNavbar.js";
import Brands from "components/Brands/Brands.js";
import Footer from "components/Footers/Footer";
import Interweave from 'interweave';
import ReCAPTCHA from "react-google-recaptcha";
import { getAllHomePosts, getAllBrands, getAllFooterPosts, sendContactEmail } from "../lib/api";
import { LanguageContext } from "lib/language";
import GetPost from "../lib/GetPost";
import Router from "next/router";
import Head from "next/head";

export async function getStaticProps() {
  const data = await getAllHomePosts();
  const brands = await getAllBrands();
  const footerData = await getAllFooterPosts();
  return {
    props: {
      postData: data,
      brandData: brands,
      footerData
    }
  }
}
class Home extends Component {
  constructor(props) {
    super(props)
    this.sendMail = this.sendMail.bind(this)
    this.captchaSuccess = this.captchaSuccess.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.state = {
      from: "",
      fullName: "",
      body: "",
      sentResult: "",
      disableContactFormButton: false,
      errors: {},
      expired: true,
      scrollCursor: 0,
      scrolling: false,
      scrollToTopEnabled: false
    }
    this.firstRef = createRef()
    this.secondRef = createRef()
    this.thirdRef = createRef()
    this.fourthRef = createRef()
    this.fifthRef = createRef()
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    e.preventDefault()
    if (this.state.scrolling) {//If the window is scrolling don't let enter
      return;
    }
    let scrollToTopEnabled = true
    let w = window.scrollY
    var st = window.pageYOffset || document.documentElement.scrollTop;
    let scrollUp = st < this.state.scrollCursor//scroll up
    if (scrollUp) {
      if (w < this.firstRef.current.offsetTop) {
        scrollToTopEnabled = false
      }
      // if (w < this.firstRef.current.offsetTop) {
      //   window.scrollTo({
      //     top: 0,
      //     behavior: 'smooth'
      //   })
      //   scrollToTopEnabled = false
      // } else if (w < this.secondRef.current.offsetTop) {
      //   window.scrollTo({
      //     top: this.firstRef.current.offsetTop,
      //     behavior: 'smooth'
      //   })
      // } else if (w < this.thirdRef.current.offsetTop) {
      //   window.scrollTo({
      //     top: this.secondRef.current.offsetTop,
      //     behavior: 'smooth'
      //   })
      // } else if (w < this.fourthRef.current.offsetTop) {
      //   window.scrollTo({
      //     top: this.thirdRef.current.offsetTop,
      //     behavior: 'smooth'
      //   })
      // }
    } else {
      if (w < this.firstRef.current.offsetTop && w > 0) {
        this.setState({ scrolling: true })
        this.windowScrollTo(this.firstRef.current.offsetTop, () => this.setState({ scrolling: false }))
      } else if (w > this.firstRef.current.offsetTop + this.firstRef.current.offsetHeight - 700 && w < this.secondRef.current.offsetTop) {
        this.setState({ scrolling: true })
        this.windowScrollTo(this.secondRef.current.offsetTop, () => this.setState({ scrolling: false }))
      } else if (w > this.secondRef.current.offsetTop + this.secondRef.current.offsetHeight - 700 && w < this.thirdRef.current.offsetTop) {
        this.setState({ scrolling: true })
        this.windowScrollTo(this.thirdRef.current.offsetTop, () => this.setState({ scrolling: false }))
      } else if (w > this.thirdRef.current.offsetTop + this.thirdRef.current.offsetHeight - 700 && w < this.fourthRef.current.offsetTop) {
        this.setState({ scrolling: true })
        this.windowScrollTo(this.fourthRef.current.offsetTop, () => this.setState({ scrolling: false }))
      }
    }
    this.setState(
      {
        scrollToTopEnabled: scrollToTopEnabled ? true : false,
        scrollCursor: (st <= 0 ? 0 : st)
      }
    )

  }
  windowScrollTo(offset, callback) {  //A custom callback function to check if window is scrolling(chrome debug)
    const fixedOffset = offset.toFixed();
    const onScroll = function () {
      if (window.pageYOffset.toFixed() === fixedOffset) {
        window.removeEventListener('scroll', onScroll)
        callback()
      }
    }

    window.addEventListener('scroll', onScroll)
    onScroll()
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    })
  }
  scrollTo(hashtag) {
    if (hashtag === 0) {
      this.setState(
        {
          scrollToTopEnabled: false
        }
      )
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } else {
      Router.push(hashtag)
    }
  }


  //Email form
  captchaSuccess(value) {
    if (value) {
      this.setState({
        expired: false
      })
    } else {
      this.setState({
        expired: true
      })
    }
  }
  handleInputs(state, e) {
    this.setState(
      {
        [state]: e.target.value
      }
    )
  }
  handleValidation() {
    let errors = {};
    let formIsValid = true;
    //Name
    if (!this.state.fullName) {
      formIsValid = false;
      errors["fullname"] = "Cannot be empty";
    }
    //Message
    if (this.state.body.length < 10) {
      errors["body"] = "Message cannot be less than 10 chars";
      formIsValid = false;
    }
    if (!this.state.body) {
      formIsValid = false;
      errors["body"] = "Cannot be empty";
    }
    //Email
    if (typeof this.state.from !== "undefined") {
      let lastAtPos = this.state.from.lastIndexOf("@");
      let lastDotPos = this.state.from.lastIndexOf(".");
      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.state.from.indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          this.state.from.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }
    if (!this.state.from) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }
    this.setState({ errors: errors });
    return formIsValid;
  }
  async sendMail(e) {
    e.preventDefault();
    if (this.handleValidation() && !this.state.expired) {
      this.setState({
        sentResult: "Sending your Email...",
        disableContactFormButton: true,
      });
      const msg = await sendContactEmail(this.state.from, this.state.fullName, "contactForm", this.state.body);
      this.setState({
        from: "",
        fullName: "",
        body: "",
        sentResult: msg.message
      });

    } else {
      this.setState({
        sentResult: "Form has errors",
        disableContactFormButton: false,
      })
    }
  }

  render() {
    let lang = LanguageContext._currentValue;
    let post = new GetPost(this.props.postData, lang, "extraHomePostsInfo");
    return (
      <>
        <Head>
          <title>
          {lang == "english" ? "Azarshiga Construction Company" : "شرکت عمرانی آذرشیگا"}
          </title>
          <meta name="description" content={lang == "english" ? "Azarshiga Construction Company Introduction Webpage - Urmia, Iran" : "وبسایت رسمی شرکت عمرانی آذرشیگا - ارومیه ایران"} />
          <meta property="og:title" content={lang == "english" ? "Azarshiga Construction Company" : "شرکت عمرانی آذرشیگا"} />
        </Head>
        <Navbar transparent />
        {this.state.scrollToTopEnabled &&
          <div className="cursor-pointer fixed z-50 hover:shadow-md focus:outline-none bottom-0 inline-flex justify-center w-full"
            onClick={() => this.scrollTo(0)}
          >
            <img className="transform rotate-180" src="/img/swipe-down.gif" alt="swiper" />
          </div>
        }
        <main dir={lang == "english" ? "ltr" : "rtl"} >
          <div id="intro" className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('/img/azarshiga/azarshiga-team.jpg')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-75 bg-black"
              >

              </span>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
              style={{ transform: "translateZ(0)" }}
            >
            </div>

          </div>

          <section id="first" ref={this.firstRef} className="pb-20 bg-blueGray-200 -mt-24">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap">
                <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                        <i className="fas fa-award"></i>
                      </div>
                      <h6 className="text-xl font-semibold">{post.findPost(1, 1, 'title')}</h6>
                      <div className="mt-2 mb-4 text-blueGray-500">
                        <Interweave content={post.findPost(1, 1, 'content')} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-4/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                        <i className="fas fa-barcode"></i>
                      </div>
                      <h6 className="text-xl font-semibold">{post.findPost(1, 2, 'title')}</h6>
                      <div className="mt-2 mb-4 text-blueGray-500">
                        <Interweave content={post.findPost(1, 2, 'content')} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                        <i className="fas fa-retweet"></i>
                      </div>
                      <h6 className="text-xl font-semibold">{post.findPost(1, 3, 'title')}</h6>
                      <div className="mt-2 mb-4 text-blueGray-500">
                        <Interweave content={post.findPost(1, 3, 'content')} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex flex-wrap items-center mt-32">
                

                <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                    <img
                      alt="azarshiga construction"
                      src="/img/azarshiga/urmia-Industrial-university-construction.jpg"
                      className="w-full align-middle rounded-t-lg"
                    />
                    <blockquote className="relative p-8 mb-4">
                      <svg
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 583 95"
                        className="absolute left-0 w-full block h-95-px -top-94-px"
                      >
                        <polygon
                          points="-30,95 583,95 583,65"
                          className="text-blueGray-700 fill-current"
                        ></polygon>
                      </svg>
                      <h4 className="text-xl font-bold text-white">
                        {post.findPost(2, 3, 'title')}
                      </h4>
                      <div className="text-md font-light mt-2 text-white">
                        <Interweave content={post.findPost(2, 3, 'content')} />
                      </div>
                    </blockquote>
                  </div>
                </div>

                <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                    <i className="fas fa-school text-xl"></i>
                  </div>
                  <h3 className="text-3xl mb-2 font-semibold leading-normal">
                    {post.findPost(2, 1, 'title')}
                  </h3>
                  <div className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                    <Interweave content={post.findPost(2, 1, 'content')} />
                  </div>
                  {/* <Link href="/projects">
                    <a href="#projects" className="font-bold text-teal-500 hover:text-lightBlue-600 mt-8">
                      {lang == "english" ? "Check projects!" : "مشاهده پروژه ها"}
                    </a>
                  </Link> */}
                </div>
                <div className="cursor-pointer w-full inline-flex items-center justify-center mt-4 text-lg text-blueGray-200"
                  onClick={(e) => this.scrollTo("#second")}
                >
                  <img src="/img/swipe-down.gif" alt="swiper" />
                </div>
              </div>
            </div>
          </section>

          <section ref={this.secondRef} id="second" className="relative py-20">
            <div
              className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
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
                  className="text-white fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>

            <div className="container mx-auto px-4">
              <div className="items-center flex flex-wrap">
                <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                  <div className="md:pr-12">
                    <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-blueGray-200">
                      <i className="fas fa-industry text-xl"></i>
                    </div>
                    <h3 className="text-3xl font-semibold">
                      {post.findPost(3, 1, 'title')}
                    </h3>
                    <div className="mt-4 text-lg leading-relaxed text-blueGray-500">
                      <Interweave content={post.findPost(3, 1, 'content')} />
                    </div>
                    <ul className="list-none mt-6">
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                              <i className="fas fa-fingerprint"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-blueGray-500">
                              {lang == "english" ? "Originality" : "اصالت"}
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                              <i className="fas fa-globe"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-blueGray-500">
                              {lang == "english" ? "International Standards" : "استاندارد جهانی"}
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                              <i className="fas fa-vials"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-blueGray-500">
                              {lang == "english" ? "Quality" : "کیفیت"}
                            </h4>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                  <img
                    alt="azar shiga flag fields"
                    className="max-w-full rounded-lg shadow-lg"
                    src="/img/azarshiga/surgery-room.jpg"
                  />
                </div>
              </div>

              <div className="cursor-pointer w-full inline-flex items-center justify-center mt-4 text-lg text-blueGray-200"
                onClick={(e) => this.scrollTo("#third")}
              >
                <img src="/img/swipe-down.gif" alt="swiper" />
              </div>
            </div>
          </section>

          <section ref={this.thirdRef} id="third" className="pt-20 pb-48">
            <div className="container mx-auto px-4">
              {/* <div className="flex flex-wrap justify-center text-center mb-24">
                <div className="w-full lg:w-6/12 px-4">
                  <h2 className="text-4xl font-semibold">{post.findPost(4, 2, 'title')}</h2>
                  <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                  <Interweave content={post.findPost(4, 2, 'content')} />
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <img
                      alt="..."
                      src="/img/team-1-800x800.jpg"
                      className="shadow-lg rounded-full mx-auto max-w-120-px"
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">Ryan Tompson</h5>
                      <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                        Web Developer
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>
                        <button
                          className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </button>
                        <button
                          className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-dribbble"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <img
                      alt="..."
                      src="/img/team-2-800x800.jpg"
                      className="shadow-lg rounded-full mx-auto max-w-120-px"
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">Romina Hadid</h5>
                      <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                        Marketing Specialist
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-google"></i>
                        </button>
                        <button
                          className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <img
                      alt="..."
                      src="/img/team-3-800x800.jpg"
                      className="shadow-lg rounded-full mx-auto max-w-120-px"
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">Alexa Smith</h5>
                      <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                        UI/UX Designer
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-google"></i>
                        </button>
                        <button
                          className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>
                        <button
                          className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-instagram"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <img
                      alt="..."
                      src="/img/team-4-470x470.png"
                      className="shadow-lg rounded-full mx-auto max-w-120-px"
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">Jenna Kardi</h5>
                      <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                        Founder and CEO
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-dribbble"></i>
                        </button>
                        <button
                          className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-google"></i>
                        </button>
                        <button
                          className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>
                        <button
                          className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-instagram"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="flex flex-wrap justify-center text-center mt-12">
                <div className="w-full lg:w-6/12 py-16">
                  <h2 className="text-4xl font-semibold">{post.findPost(5, 2, 'title')}</h2>
                  <div className="text-lg leading-relaxed m-4 text-blueGray-500">
                    <Interweave content={post.findPost(5, 2, 'content')} />
                  </div>
                  <div className="text-lg leading-relaxed m-2 text-blueGray-500">
                    <Brands data={this.props.brandData} language={lang} />
                  </div>
                </div>
              </div>
              <div className="cursor-pointer w-full inline-flex items-center justify-center mt-4 text-lg text-blueGray-200"
                onClick={(e) => this.scrollTo("#fourth")}
              >
                <img src="/img/swipe-down.gif" alt="swiper" />
              </div>
            </div>
          </section>

          <section id="fourth" ref={this.fourthRef} className="pb-20 relative block bg-blueGray-800">

            <div
              className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
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
                  className="text-blueGray-800 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>

            <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
              <div className="flex flex-wrap text-center justify-center">
                <div className="w-full lg:w-6/12 px-4">
                  <h2 className="text-4xl font-semibold text-white">
                    {post.findPost(6, 2, 'title')}
                  </h2>
                  <div className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                    <Interweave content={post.findPost(6, 2, 'content')} />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap mt-12 justify-center">
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-medal text-xl"></i>
                  </div>
                  <h6 className="text-xl mt-5 font-semibold text-white">
                    {post.findPost(7, 3, 'title')}
                  </h6>
                  <div className="mt-2 mb-4 text-blueGray-400">
                    <Interweave content={post.findPost(7, 3, 'content')} />
                  </div>
                </div>
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-poll text-xl"></i>
                  </div>
                  <h5 className="text-xl mt-5 font-semibold text-white">
                    {post.findPost(7, 2, 'title')}
                  </h5>
                  <div className="mt-2 mb-4 text-blueGray-400">
                    <Interweave content={post.findPost(7, 2, 'content')} />
                  </div>
                </div>
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-lightbulb text-xl"></i>
                  </div>
                  <h5 className="text-xl mt-5 font-semibold text-white">
                    {post.findPost(7, 1, 'title')}
                  </h5>
                  <div className="mt-2 mb-12 text-blueGray-400">
                    <Interweave content={post.findPost(7, 1, 'content')} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="fifth" ref={this.fifthRef} className="relative block pt-24 lg:pt-0 bg-blueGray-800">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                    <form onSubmit={this.sendMail} className="flex-auto p-5 lg:p-10">
                      <h4 className="text-2xl font-semibold">
                        {lang == "english" ? "Want to cooperate?" : " تمایل به همکاری دارید؟"}
                      </h4>
                      <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                        {lang == "english" ? "Please fill out the form below and we will contact you" : "لطفا فرم زیر را پر کرده و ارسال نمایید تا با شما تماس بگیریم"}
                      </p>
                      <div className="relative w-full mb-3 mt-8">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="full-name"
                        >
                          {lang == "english" ? "" : "نام و نام خانوادگی"}
                        </label>
                        <input
                          value={this.state.fullName}
                          onChange={(e) => this.handleInputs('fullName', e)}
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Full Name"
                        />
                      </div>
                      <span style={{ color: "red" }}>{this.state.errors["fullname"]}</span>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="email"
                        >
                          {lang == "english" ? "" : "ایمیل"}
                        </label>
                        <input
                          value={this.state.from}
                          onChange={(e) => this.handleInputs('from', e)}
                          type="email"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Email"
                        />
                      </div>
                      <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="message"
                        >
                          {lang == "english" ? "" : "پیام"}
                        </label>
                        <textarea
                          value={this.state.body}
                          onChange={(e) => this.handleInputs('body', e)}
                          rows="4"
                          cols="80"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Type a message..."
                        />
                      </div>
                      <span style={{ color: "red" }}>{this.state.errors["body"]}</span>
                      <div className="text-center mt-6">
                        <div className={this.state.sentResult == "Email Sent" ? "text-lightBlue-400" : "text-red-500"}>
                          <ReCAPTCHA
                            sitekey={process.env.CAPTCHA_KEY}
                            onChange={this.captchaSuccess}
                          />
                          {this.state.sentResult}
                        </div>
                        <button
                          className={"bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"}
                          type="submit"
                          disabled={this.state.disableContactFormButton}
                        >
                          {lang == "english" ? "send" : "ارسال پیام"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Footer postData={this.props.footerData} />

        </main>
      </>
    );
  }
}
Home.contextType = LanguageContext;
export default Home