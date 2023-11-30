import NextAuth from 'next-auth';
import Facebook from 'next-auth/providers/facebook';
import Google from 'next-auth/providers/google';
import Twitter from 'next-auth/providers/twitter';
import Apple from 'next-auth/providers/apple';
import Credentials from 'next-auth/providers/credentials';

export default (req, res) => {

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
                    if (credentials && credentials.email && credentials.password) {
                        // Validate the credentials here
                        const user = { email: credentials.email, password: credentials.password };
                        const res = await fetch('http://18.133.139.168/api/v1/front/login', {
                            method: 'POST',
                            headers: { 'Content-type': 'application/json' },
                            body: JSON.stringify(user)
                        });
                        if (!res.ok) {
                            return Promise.resolve(null);
                        }
                        const userData = await res.json();
                        if (userData.error) {
                            return Promise.resolve(null);
                        }

                        // Return the user object if authenticated
                        return Promise.resolve(user);

                    }

                    // Return null if authentication fails or credentials are missing
                    return Promise.resolve(null);
                },
            }),
        ],
        callbacks: {
            async signIn({ user, account, profile, email, credentials }) {
                if (account.provider !== 'credentials') {
                    const body = {
                        provider: account.provider,
                        provider_user_id: account.providerAccountId,
                        email: user.email,
                        name: user.name,
                        avatar: user.image
                    }
                    const res = await fetch('http://18.133.139.168/api/v1/front/social/login', {
                        method: 'POST',
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify(body)
                    });
                    if (!res.ok) {
                        return false
                    }
                    const userData = await res.json();
                    if (userData.error) {
                        return false;
                    }
                    user.data = userData;
                    return true
                } else if (account.provider === 'credentials') {
                    const body = {
                        password: user.password,
                        email: user.email,
                    }
                    const res = await fetch('http://18.133.139.168/api/v1/front/login', {
                        method: 'POST',
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify(body)
                    });
                    if (!res.ok) {
                        return false
                    }
                    const userData = await res.json();
                    if (userData.error) {
                        return false;
                    }
                    user.data = userData;
                    return true
                }
                return true;
            },
            async jwt({ token, user }) {
                if (user?.data?.data) {
                    token.user = user?.data?.data;
                }
                return token;
            },
            async session({ session, token }) {
                if (token?.user) {
                    session = token.user
                }
                return session
            }
        },
        pages: {
            signIn: `/auth/login`,
        },
    }
    return NextAuth(req, res, options);

}