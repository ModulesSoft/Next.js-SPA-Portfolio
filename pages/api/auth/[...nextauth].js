import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { loginUser } from "lib/api"

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Credentials({
            name: "My Provider",
            // credentials: {
            //     username: { label: "Email", type: "text", placeholder: "info@azarshiga.ir" },
            //     password: { label: "password", type: "password" }

            // },
            pages: {
                signIn: '/auth/login',
                // signOut: '/auth/signout',
                error: '/auth/login', // Error code passed in query string as ?error=
                // verifyRequest: '/auth/verify-request', // (used for check email message)
                newUser: null // If set, new users will be directed here on first sign in
            },
            async authorize(credentials) {
                const user = await loginUser(credentials.username, credentials.password);
                // console.log(user);
                return user;
            }


        }),
        // ...add more providers here
    ],
    // A database is optional, but required to persist accounts in a database
    // database: process.env.DATABASE_URL,
    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `jwt` is automatically set to `true` if no database is specified.
        jwt: true,

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 2 * 60 * 60,

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours
    },
    callbacks: {
        jwt: async (token, user, account, profile, isNewUser) => {
            // Persist the OAuth access_token to the token right after signin
            // if (user) {
            //     token.accessToken = user.authToken
            // }
            // return token
            //  "user" parameter is the object received from "authorize"
            //  "token" is being send below to "session" callback...
            //  ...so we set "user" param of "token" to object from "authorize"...
            //  ...and return it...
            user && (token.user = user);
            return Promise.resolve(token)   // ...here
        },
        session: async (session, user, sessionToken) => {
            //  "session" is current session object
            //  below we set "user" param of "session" to value received from "jwt" callback
            session.user = user.user;
            return Promise.resolve(session)
        }
    }

})