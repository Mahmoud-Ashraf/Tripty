import NextAuth from 'next-auth';
import Facebook from 'next-auth/providers/facebook';
import Google from 'next-auth/providers/google';
import Twitter from 'next-auth/providers/twitter';
import Apple from 'next-auth/providers/apple';
import Credentials from 'next-auth/providers/credentials';

const options = {
    providers: [
        Facebook({
            clientId: process.env.FACEBOOK_ID || '',
            clientSecret: process.env.FACEBOOK_SECRET || ''
        }),
        Google({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || ''
        }),
        Twitter({
            clientId: process.env.TWITTER_ID || '',
            clientSecret: process.env.TWITTER_SECRET || ''
        }),
        Apple({
            clientId: process.env.APPLE_ID || '',
            clientSecret: process.env.APPLE_SECRET || ''
        }),
        Credentials({
            async authorize(credentials, req) {
                console.log(credentials);
                if (credentials && credentials.email && credentials.password) {
                    // Validate the credentials here
                    const user = { email: credentials.email, password: credentials.password };

                    // Example validation - replace this with your own logic
                    if (user) {
                        // Return the user object if authenticated
                        return Promise.resolve(user);
                    }
                }

                // Return null if authentication fails or credentials are missing
                return Promise.resolve(null);
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
}
export default (req, res) => NextAuth(req, res, options)