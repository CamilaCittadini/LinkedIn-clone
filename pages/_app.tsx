import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { QueryClientProvider, QueryClient } from "react-query";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <SessionProvider session={session}>
        <RecoilRoot>
          <ThemeProvider attribute="class">
            <Component {...pageProps} />
          </ThemeProvider>
        </RecoilRoot>
      </SessionProvider>
    </QueryClientProvider>
  );
}
