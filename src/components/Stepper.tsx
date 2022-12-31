import { useContext } from "react";
import { Stepper as MantineStepper } from "@mantine/core";
import { AppContext } from "./AppContext";



export const Stepper = () => {
  const context = useContext(AppContext);
  if(!context) {
    throw new Error("Missing context provider for AppContext!");
  }

  return (
    <>
      <MantineStepper
        active={context.step}
        // TO-DO: make sure user can't click on langs or subs without previous data
        onStepClick={context.setStep}
        sx={theme => ({
          width: "fit-content",
          [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
            width: "100%",
          },
        })}
      >
        <MantineStepper.Step label="Pick your movie" />
        <MantineStepper.Step label="Select language"/>
        <MantineStepper.Step label="Get your snacks"/>
        <MantineStepper.Completed> completed todo??</MantineStepper.Completed>
      </MantineStepper>
    </>
  );
};
