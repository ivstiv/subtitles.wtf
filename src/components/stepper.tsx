import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';

export const StepperLayout = () => {
  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="Pick your movie">
          Step 1 content: Create an account
        </Stepper.Step>
        <Stepper.Step label="Select language">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Get your snacks">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
}