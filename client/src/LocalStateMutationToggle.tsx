import React, {FC} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

interface IProps {
  id: number,
  isAnimating: boolean
}

interface ITProps {
  onClick: any,
  isAnimating: boolean
}

const TOGGLE_ANIMATION = gql`
  mutation ToggleAnimation($id: Int!) {
    toggleAnimation(id: $id) @client
  }
`;

const Toggle:FC<ITProps> = styled.button`
  background-color: ${(props:ITProps) => props.isAnimating ? '#61dafb' : '#4d90fe'};
  border: none;
  border-radius: 0 0 5px 5px;
  cursor: pointer;
  padding: 0.5rem;
`;

// Example for LocalState Mutation using resolvers

const LocalStateMutationToggle: FC<IProps> = ({id, isAnimating}) => (
  <Mutation mutation={TOGGLE_ANIMATION} variables={{id}}>
    {(toggleAnimation:any) => (
      <Toggle
        onClick={toggleAnimation}
        isAnimating={isAnimating}
      >
        { isAnimating ? '🤸' : '🚶'} toggle
      </Toggle>
    )}
  </Mutation>
);

export default LocalStateMutationToggle;