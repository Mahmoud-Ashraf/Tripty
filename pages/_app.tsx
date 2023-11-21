import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider, useDispatch } from "react-redux";
import store from "../store/index";
import Layout from '@/components/layout/Layout';
import { useEffect } from 'react';
import { langActions } from '@/store/Lang/Lang';
import Wrapper from '@/components/layout/Wrapper/Wrapper';

const App = ({ Component, pageProps, router }: AppProps) => {
  const routesWithoutLayout = ['/auth'];
  let shouldNotUseLayout = false;
  routesWithoutLayout.forEach(route => {
    if (router.pathname.includes(route)) {
      shouldNotUseLayout = true;
      return;
    }
  });

  return <Provider store={store}>
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
}


export default App;
