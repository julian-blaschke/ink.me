import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../context/ThemeContext";
import "../styles/tailwind.css";
import NavBar from "../components/navigation/NavBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar></NavBar>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
