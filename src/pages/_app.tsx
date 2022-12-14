import { type AppType } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { trpc } from "../utils/trpc";


const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
          defaultRadius: "lg",
          loader: "bars",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
