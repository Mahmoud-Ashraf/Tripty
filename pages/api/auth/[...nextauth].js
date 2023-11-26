import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';
import AppleProvider from 'next-auth/providers/apple';
import CredentialsProvider from 'next-auth/providers/credentials';

const options = {
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID || '',
            clientSecret: process.env.FACEBOOK_SECRET || ''
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || ''
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_ID || '',
            clientSecret: process.env.TWITTER_SECRET || ''
        }),
        AppleProvider({
            clientId: process.env.APPLE_ID || '',
            clientSecret: process.env.APPLE_SECRET || ''
        }),
        CredentialsProvider({
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
}
export default (req, res) => NextAuth(req, res, options)