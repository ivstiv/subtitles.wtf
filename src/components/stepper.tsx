import { useState } from "react";
import { Stepper } from "@mantine/core";

export const StepperLayout = () => {
  const [active, setActive] = useState(1);
  // const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  // const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper
        active={active}
        onStepClick={setActive}
        sx={theme => ({
          width: "fit-content",
          [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
            width: "100%",
          },
        })}
      >
        <Stepper.Step label="Pick your movie" />
        <Stepper.Step label="Select language"/>
        <Stepper.Step label="Get your snacks"/>
        <Stepper.Completed> </Stepper.Completed>
      </Stepper>

      {/* <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group> */}
    </>
  );
};
