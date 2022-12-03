import { Flex } from "@mantine/core";
import { type NextPage } from "next";
import Head from "next/head";
import { Logo } from "../components/Logo";
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
        <Flex
          justify="center"
          align="center"
          gap="xl"
          wrap={{
            lg:"nowrap",
            xs:"wrap"
          }}
          sx={{
            margin: "2rem",
            flexWrap: "wrap",
          }}
        >
          <Logo/>
          <StepperLayout/>
        </Flex>
      </main>
    </>
  );
};

export default Home;
