
import "../styles/globals.css";
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import Layout from "../components/LayoutMain";
import { wrapper } from "../store/store"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default wrapper.withRedux(App);



/*import '../styles/globals.css'
import type { AppProps } from 'next/app'

import {SessionProvider} from 'next-auth/react'


export default function App({ Component, pageProps }: AppProps) {
  return (
 <SessionProvider session={pageProps.session}>
  <Component {...pageProps} />
</SessionProvider>
)
}
*/