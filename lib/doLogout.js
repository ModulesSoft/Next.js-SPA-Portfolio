import fetchJson from "lib/fetchJson";
import router from "next/router";

export const logout = async()=> {
  const isLoggedIn = (await fetchJson("/api/logout"))?.isLoggedIn
  if (!isLoggedIn) {
    return router.push("/")
  }
}
export default logout;