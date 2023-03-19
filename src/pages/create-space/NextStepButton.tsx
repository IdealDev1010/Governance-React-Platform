import { styled } from "@mui/material";
import { Button } from "components";
import React, { ReactNode } from "react";
import { useCreateSpaceStore } from "./store";

function NextStepButton({
  children,
}: {
  children: ReactNode;
}) {
  const { setStep, step } = useCreateSpaceStore();

  return <StyledButton onClick={() => setStep(step + 1)}>{children}</StyledButton>;
}

export { NextStepButton };

const StyledButton = styled(Button)({
  width: "100%",
  height: 40,
});
