import React, {FC} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const TOGGLE_ANIMATION = gql`
  mutation ToggleAnimation($id: Int!) {
    toggleAnimation(id: $id) @client
  }
`;

const Toggle:any = styled.button`
  background-color: ${(props:any) => props.isAnimating ? '#61dafb' : '#4d90fe'};
  border: none;
  border-radius: 0 0 5px 5px;
  cursor: pointer;
  padding: 0.5rem;
`;

interface IProps {
  id: number,
  isAnimating: boolean
}

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