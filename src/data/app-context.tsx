"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useContext, useState } from "react";
import { createContext } from "react";

export type AppContext = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  imdbID: string;
  setImdbID: Dispatch<SetStateAction<string>>;
  languages: string;
  setLanguages: Dispatch<SetStateAction<string>>;
};

export const AppContext = createContext<AppContext | null>(null);
// TO-DO: pre-load the context from url params
type Props = { children: ReactNode };
export const AppContextProvider = ({ children }: Props) => {
  const [step, setStep] = useState(0);
  const [imdbID, setImdbID] = useState("");
  const [languages, setLanguages] = useState("");

  const contextValue = {
    step,
    setStep,
    imdbID,
    setImdbID,
    languages,
    setLanguages,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Missing context provider for AppContext!");
  }
  return context;
};
