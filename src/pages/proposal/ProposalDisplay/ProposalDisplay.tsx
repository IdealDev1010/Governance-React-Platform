import { styled, useMediaQuery } from "@mui/material";
import { AppTooltip, ErrorContainer } from "components";
import { StyledFlexColumn, StyledFlexRow } from "styles";
import { Deadline } from "./Deadline";
import { Metadata } from "./Metadata";
import { Results } from "./Results";
import { Vote } from "./Vote";
import { Votes } from "./Votes";
import { appNavigation, useAppNavigation } from "router/navigation";
import { useAppParams, useDevFeatures, useRole } from "hooks";
import { ProposalStatus } from "types";
import { ProposalAbout } from "./ProposalAbout";
import { useProposalPageQuery, useProposalPageStatus } from "../hooks";
import { useEffect, useState } from "react";
import { Page } from "wrappers";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useDaoQuery } from "query/getters";

const gap = 15;

const useComponents = () => {
  const isLoading = useProposalPageQuery().isLoading;

  const { proposalStatus } = useProposalPageStatus();

  return {
    proposalDescription: <ProposalAbout />,
    votes:
      !proposalStatus ||
      proposalStatus === ProposalStatus.NOT_STARTED ? null : (
        <Votes />
      ),
    vote:
      !proposalStatus ||
      proposalStatus !== ProposalStatus.ACTIVE ||
      isLoading ? null : (
        <Vote />
      ),
    deadline:
      !proposalStatus || proposalStatus === ProposalStatus.CLOSED ? null : (
        <Deadline />
      ),
    metadata: <Metadata />,
    results:
      !proposalStatus ||
      proposalStatus === ProposalStatus.NOT_STARTED ? null : (
        <Results />
      ),
  };
};

const Destop = () => {
  const { proposalDescription, votes, vote, deadline, metadata, results } =
    useComponents();

  return (
    <StyledWrapper>
      <StyledLeft>
        {proposalDescription}
        {vote}
        {votes}
      </StyledLeft>
      <StyledRight>
        {deadline}
        {metadata}
        {results}
      </StyledRight>
    </StyledWrapper>
  );
};

const Mobile = () => {
  const { proposalDescription, votes, vote, deadline, metadata, results } =
    useComponents();

  return (
    <StyledWrapper>
      {deadline}
      {proposalDescription}
      {vote}
      {results}
      {metadata}
      {votes}
    </StyledWrapper>
  );
};

export function ProposalDisplay() {
  const mobile = useMediaQuery("(max-width:800px)");
  const [showError, setShowError] = useState(false);
  const error = useProposalPageQuery().error;
  const { daoAddress } = useAppParams();

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  return (
    <Page
      back={appNavigation.daoPage.root(daoAddress)}
      headerComponent={<EditButton />}
    >
      {showError ? (
        <ErrorContainer text="Proposal not found" />
      ) : mobile ? (
        <Mobile />
      ) : (
        <Destop />
      )}
    </Page>
  );
}

export default ProposalDisplay;

const EditButton = () => {
  const { proposalPage } = useAppNavigation();
  const { daoAddress, proposalAddress } = useAppParams();

  const { data: dao } = useDaoQuery(daoAddress);

  const devFeatures = useDevFeatures();

  const { isOwner, isProposalPublisher } = useRole(dao?.daoRoles);

  if (!devFeatures) return null;
  if (!isOwner && !isProposalPublisher) return null;

  return (
    <AppTooltip text="Edit">
      <StyledEditButton
        onClick={() => proposalPage.edit(daoAddress, proposalAddress)}
      >
        <MdOutlineModeEditOutline
          style={{ width: 20, height: 20, color: "white" }}
        />
      </StyledEditButton>
    </AppTooltip>
  );
};

const StyledEditButton = styled(StyledFlexRow)({
  padding: 0,
  width: 35,
  height: 35,
  borderRadius: "50%",
  background: "#0088CC",
  cursor: "pointer",
});

const StyledWrapper = styled(StyledFlexRow)({
  gap,
  alignItems: "flex-start",
  "@media (max-width: 850px)": {
    flexDirection: "column",
  },
});

const StyledLeft = styled(StyledFlexColumn)({
  width: "calc(100% - 370px - 10px)",
  gap,
});

const StyledRight = styled(StyledFlexColumn)({
  width: 370,
  gap,
});
