import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from "react-redux";
import store from "../store/index";
import Layout from '@/components/layout/Layout';
import { appWithTranslation } from 'next-i18next'

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
    {
      shouldNotUseLayout ?
        <Component {...pageProps} />
        :
        <Layout>
          <Component {...pageProps} />
        </Layout>
    }
  </Provider>
}


export default appWithTranslation(App);
