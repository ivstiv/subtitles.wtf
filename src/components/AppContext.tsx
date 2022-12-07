import type { Dispatch, FC, SetStateAction } from "react";
import { useState } from "react";
import { createContext } from "react";

export type AppContext = {
  step: number
  setStep: Dispatch<SetStateAction<number>>
  movie: string
  setMovie: Dispatch<SetStateAction<string>>
}


export const AppContext = createContext<AppContext | null>(null);


type Props = { children: JSX.Element | JSX.Element[] }
export const AppContextProvider: FC<Props> = ({ children }) => {
  const [step, setStep] = useState(0);
  const [movie, setMovie] = useState("");

  const contextValue = {
    step, setStep,
    movie, setMovie,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
