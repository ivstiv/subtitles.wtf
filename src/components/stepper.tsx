import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';

export const StepperLayout = () => {
  const [active, setActive] = useState(1);
  // const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  // const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper
        active={active}
        onStepClick={setActive}
        sx={{ width: "100%" }}
        breakpoint="xs"
      >
        <Stepper.Step label="Pick your movie">
        </Stepper.Step>
        <Stepper.Step label="Select language">
        </Stepper.Step>
        <Stepper.Step label="Get your snacks">
        </Stepper.Step>
        <Stepper.Completed>
        </Stepper.Completed>
      </Stepper>

      {/* <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group> */}
    </>
  );
}