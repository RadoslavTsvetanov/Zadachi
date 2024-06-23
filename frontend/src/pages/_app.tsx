import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import "~/styles/globals.css";
import { Theme } from '@radix-ui/themes';
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={GeistSans.className}>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </main>
  );
};

export default MyApp;
