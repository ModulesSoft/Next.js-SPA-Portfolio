import { addPost } from "../lib/api";
import fetchJson from "lib/fetchJson";
import useUser from "lib/useUser";
export default function test() {
    const { user } = useUser();
    async function aPost() {
        const data = await fetchJson(process.env.API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user[process.env.ACCESS_TOKEN_INDEX_IN_SERVER_AUTH_JSON_RESPONSE]}`
            },
            body: addPost("title!","BS!")
        });
        return data?.createPost;
    }

    return (
        <button onClick={(e) => { e.preventDefault(); aPost() }}>
            add a Post!
        </button>
    )
}