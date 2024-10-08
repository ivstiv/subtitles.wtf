import "~/styles/globals.css";
import "@mantine/core/styles.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { MantineProvider, ColorSchemeScript, createTheme } from "@mantine/core";
import { AppContextProvider } from "~/data/app-context";
import { Poppins } from "next/font/google";
import { Footer } from "./_components/footer/footer";

export const metadata: Metadata = {
  title: "Where To Find Subtitles?",
  description: "Where to find subtitles for your favorite movies and TV shows?",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: ["subtitles", "movies", "tv shows", "streaming", "download"],
};

const poppins = Poppins({
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const theme = createTheme({
  /** Put your mantine theme override here */
  radius: {
    xs: "16px",
    sm: "16px",
    md: "16px",
    lg: "16px",
    xl: "16px",
  },
  fontFamily: poppins.style.fontFamily,
  headings: {
    fontFamily: poppins.style.fontFamily,
  },
  components: {
    Button: {
      styles: {
        root: {
          fontFamily: poppins.style.fontFamily,
        },
        label: {
          fontFamily: poppins.style.fontFamily,
        },
      },
    },
    Text: {
      styles: {
        root: {
          fontFamily: poppins.style.fontFamily,
        },
      },
    },
    Input: {
      styles: {
        input: {
          fontFamily: poppins.style.fontFamily,
        },
      },
    },
    Switch: {
      styles: {
        label: {
          fontFamily: poppins.style.fontFamily,
        },
      },
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <TRPCReactProvider>
          <MantineProvider theme={theme} defaultColorScheme="dark">
            <AppContextProvider>{children}</AppContextProvider>
            <Footer />
          </MantineProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
