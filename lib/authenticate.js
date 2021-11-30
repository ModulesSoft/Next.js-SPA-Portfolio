import fetchJson from "./fetchJson"
import { login } from "./api";
export default async function authentication(username, password) {
    const data = await fetchJson(process.env.API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: login(username,password)
    });
    return data?.data.login
}