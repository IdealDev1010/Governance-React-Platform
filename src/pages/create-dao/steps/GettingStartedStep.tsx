import { styled } from "@mui/material";
import { Button, Markdown } from "components";
import { useTranslation } from "react-i18next";
import { StyledFlexColumn } from "styles";
import { useCreatDaoStore } from "../store";
import { Step } from "./Step";
import { Submit } from "./Submit";

export function GettingStartedStep() {
  const { t } = useTranslation();
  const { nextStep } = useCreatDaoStore();

  return (
    <Step title={t("getStarted")}>
      <StyledContainer>
        <StyledFlexColumn alignItems="flex-start" gap={15}>
          {t("gettingStartedBody")
            .split("/n")
            .map((it, index) => {
              return <Markdown key={index}>{it}</Markdown>;
            }) || ""}
        </StyledFlexColumn>
        <Submit>
          <Button onClick={nextStep}>{t("start")}</Button>
        </Submit>
      </StyledContainer>
    </Step>
  );
}


const StyledContainer = styled(StyledFlexColumn)({
  a:{
    textDecoration:'unset'
  }
});