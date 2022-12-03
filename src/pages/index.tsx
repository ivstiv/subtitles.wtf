import { type NextPage } from "next";
import Head from "next/head";
import { StepperLayout } from "../components/stepper";


const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Where To Find subtitles?</title>
        <meta name="description" content="TO-DO: " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <StepperLayout></StepperLayout>
      </main>
    </>
  );
};

export default Home;
