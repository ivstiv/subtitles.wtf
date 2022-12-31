import type { Dispatch, FC, SetStateAction } from "react";
import { useState } from "react";
import { createContext } from "react";

export type AppContext = {
  step: number
  setStep: Dispatch<SetStateAction<number>>
  imdbID: string
  setImdbID: Dispatch<SetStateAction<string>>
  languages: string
  setLanguages: Dispatch<SetStateAction<string>>
}


export const AppContext = createContext<AppContext | null>(null);

// TO-DO: pre-load the context from url params
type Props = { children: JSX.Element | JSX.Element[] }
export const AppContextProvider: FC<Props> = ({ children }) => {
  const [step, setStep] = useState(0);
  const [imdbID, setImdbID] = useState("");
  const [languages, setLanguages] = useState("");

  const contextValue = {
    step, setStep,
    imdbID, setImdbID,
    languages, setLanguages,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
