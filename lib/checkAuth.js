import jwt from "jsonwebtoken"
import { AES,enc } from "crypto-js"
import { refreshAuthToken } from "lib/api"

export default async function checkAuth(session) {
    if (session && Object.keys(session).length!==0) {
        const decodedAuthToken = jwt.decode(session.authToken)
        const exp = new Date((decodedAuthToken.exp) * 1000)//It's in seconds, we need miliseconds
        const now = new Date()
        if (false){//now < exp) {
            //   console.log("not expired")
            return true;
        } else {
            //   console.log("expired");
            const encryptedRefreshToken = localStorage.getItem("refreshTokenEncrypted") || null;
            const name = localStorage.getItem("name") || null;
            if (encryptedRefreshToken && name) {
                //decrypt refresh token
                const refreshToken = AES.decrypt(encryptedRefreshToken, process.env.REFRESH_TOKEN_ENCRYPTION_KEY).toString(enc.Utf8)
                const newAuthToken = await refreshAuthToken(refreshToken)
                const user = {
                    authToken : newAuthToken,
                    user: {
                        name : name
                    }
                }
                console.log(user);
                return user;
                
            } else {
                return false;
            }
        }
    } else {
        return null;
    }
}