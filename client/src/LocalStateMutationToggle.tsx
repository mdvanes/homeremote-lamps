import React, { FC } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import styled from "styled-components";

interface Props {
  id: number;
  isAnimating: boolean;
}

interface ToggleProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: any;
  isAnimating: boolean;
}

const TOGGLE_ANIMATION = gql`
  mutation ToggleAnimation($id: Int!) {
    toggleAnimation(id: $id) @client
  }
`;

const Toggle: FC<ToggleProps> = styled.button`
  background-color: ${(props: ToggleProps): void =>
    props.isAnimating ? "#61dafb" : "#4d90fe"};
  border: none;
  border-radius: 0 0 5px 5px;
  cursor: pointer;
  padding: 0.5rem;
`;

// Example for LocalState Mutation using resolvers

const LocalStateMutationToggle: FC<Props> = ({
  id,
  isAnimating
}): JSX.Element => (
  <Mutation mutation={TOGGLE_ANIMATION} variables={{ id }}>
    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
    {(toggleAnimation: any): JSX.Element => (
      <Toggle onClick={toggleAnimation} isAnimating={isAnimating}>
        {isAnimating ? "🤸" : "🚶"} toggle
      </Toggle>
    )}
  </Mutation>
);

export default LocalStateMutationToggle;
