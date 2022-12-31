
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;



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