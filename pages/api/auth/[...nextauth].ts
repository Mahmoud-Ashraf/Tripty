import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';
import AppleProvider from 'next-auth/providers/apple';
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
    ],
}
export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)