import React, { useState } from "react";
import Link from "next/link";
// layout for page

import Auth from "layouts/Auth.js";
// import { useUser, useUpdateUser } from "lib/session"
//import { AES, enc } from "crypto-js"
import useUser from "lib/useUser";
import fetchJson from "lib/fetchJson";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  const { user, mutateUser, isLoading } = useUser();

  const authenticate = async (e) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true)
      try {
        const body = {
          username: email,
          password: password,
        }
        try {
          const response = await fetchJson(
            "/api/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
          await mutateUser(
            await response
          );
          setLoading(false)
        } catch (e) {
          console.error("error while creating session cookie: " + e);
        }
        // updateUser(user);
        // let decodedRefreshToken = user.refreshToken;
        // //encrypt refresh token
        // let encryptedRefreshToken = AES.encrypt(decodedRefreshToken, process.env.REFRESH_TOKEN_ENCRYPTION_KEY).toString();

        // localStorage.setItem("refreshTokenEncrypted", encryptedRefreshToken)
        // localStorage.setItem("name", user.user.name)

      } catch (e) {
        setErrors("Wrong credentials!")
      }
      //[user.user.name,user.user.id,user.authToken,user.refreshToken]
    } else {
      setErrors("All fields are required!")
    }
  }
  if (user?.user) {
    return (
      <>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-500 text-sm font-bold">
                      {loading ? <p className="text-red-500">loading...</p>:`Signed in as ${user.user.name}`}
                      <br />
                      <button onClick={
                        async (e) => {
                          e.preventDefault();
                          mutateUser(await fetchJson('/api/logout', { method: 'POST' }), false)
                          setLoading(true)
                        }
                      }>Sign out</button>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>)
  }
  else {
    return (
      <>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-red-500 text-sm font-bold">
                      <ul>
                        {
                          // errors.map((e)=><li>{e.error}</li>)
                          errors && errors
                        }
                        {loading && "loading..."}
                      </ul>
                    </h6>
                  </div>
                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="text-blueGray-400 text-center mb-3 font-bold">
                    <small>Sign in with credentials</small>
                  </div>
                  <form onSubmit={authenticate}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                        // name="username"
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        // placeholder="Password"
                        // name="password"
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          id="customCheckLogin"
                          type="checkbox"
                          className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        />
                        <span className="ml-2 text-sm font-semibold text-blueGray-600">
                          Remember me
                        </span>
                      </label>
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex flex-wrap mt-6 relative">
                <div className="w-1/2">
                  <a
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    className="text-blueGray-200"
                  >
                    <small>Forgot password?</small>
                  </a>
                </div>
                <div className="w-1/2 text-right">
                  <Link href="/auth/register">
                    <a href="#pablo" className="text-blueGray-200">
                      <small>Create new account</small>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
Login.layout = Auth;
