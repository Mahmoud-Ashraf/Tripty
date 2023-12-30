import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider, useDispatch } from "react-redux";
import store from "../store/index";
import Layout from '@/components/layout/Layout';
import Wrapper from '@/components/layout/Wrapper/Wrapper';
import { SessionProvider, useSession } from "next-auth/react"
import { useEffect } from 'react';

const App = ({ Component, pageProps, router }: AppProps) => {
  const routesWithoutLayout = ['/auth', '/mobile'];
  let shouldNotUseLayout = false;
  routesWithoutLayout.forEach(route => {
    if (router.pathname.includes(route)) {
      shouldNotUseLayout = true;
      return;
    }
  });

  return (

    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Wrapper>
          {
            shouldNotUseLayout ?
              <Component {...pageProps} />
              :
              <Layout>
                <Component {...pageProps} />
              </Layout>
          }
        </Wrapper>
      </Provider>
    </SessionProvider>
  )
}


export default App;
