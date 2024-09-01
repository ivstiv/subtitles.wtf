"use client";
import { CurrentStep } from "~/app/_components/steps/current-step";
import { Header } from "~/app/_components/header/header";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <CurrentStep />
      </main>
    </>
  );
}
