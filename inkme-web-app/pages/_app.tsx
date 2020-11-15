import Head from "next/head";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ThemeProvider } from "../context/ThemeContext";
import NavBar from "../components/navigation/NavBar";
import "../styles/tailwind.css";
import { AuthProvider } from "../context/AuthContext";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
        </Head>
        <NavBar></NavBar>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
};
export default App;
