import { useContext } from "react";
import { AppContext } from "../AppContext";


export const LanguageStep = () => {
  const context = useContext(AppContext);
  if(!context) {
    throw new Error("Missing context provider for AppContext!");
  }

  return <>language movie</>;
};
