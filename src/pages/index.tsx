import { type NextPage } from "next";
import Head from "next/head";
import { AppContextProvider } from "../components/AppContext";
import { CurrentStep } from "../components/step-components/CurrentStep";
import { Header } from "../components/Header";


const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <AppContextProvider>
      <Head>
        <title>Where To Find subtitles?</title>
        <meta name="description" content="TO-DO: " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Header/>
      </header>
      <main>
        <CurrentStep/>
      </main>
    </AppContextProvider>
  );
};

export default Home;
