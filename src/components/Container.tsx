import { Box, Skeleton, styled, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { StyledFlexColumn } from "styles";

function Container({
  children,
  className = "",
  title,
  loading,
  loaderAmount,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  loading?: boolean;
  loaderAmount?: number;
}) {
  return (
    <StyledContainer className={className}>
      {title && <Title>{title}</Title>}
      {loading ? <Loader loaderAmount={loaderAmount} /> : children}
    </StyledContainer>
  );
}

const Loader = ({ loaderAmount = 2 }: { loaderAmount?: number }) => {
  return (
    <StyledLoaderContainer>
      {[...Array(loaderAmount).keys()].map((i) => {
        return <StyledLoader key={i} />;
      })}
    </StyledLoaderContainer>
  );
};

const StyledLoader = styled(Skeleton)({
  width: "85%",
  height: 20,
  transform: "unset",
  background: "rgba(0,0,0, 0.12)",
  borderRadius: 10,
  gap: 15,
});

const StyledLoaderContainer = styled(StyledFlexColumn)({
  gap: 10,
  alignItems:'flex-start'
});

const StyledContainer = styled(Box)({
  background: "white",
  border: "0.5px solid rgba(114, 138, 150, 0.24)",
  boxShadow: "rgb(114 138 150 / 8%) 0px 2px 16px",
  borderRadius: 20,
  padding: 20,
  width: "100%",
});

const Title = ({ children }: { children: string }) => {
  return <StyledTitle variant="h4">{children}</StyledTitle>;
};

const StyledTitle = styled(Typography)({
  marginBottom: 20,
  width: "100%",
  textAlign: "left",
});

export { Container };
