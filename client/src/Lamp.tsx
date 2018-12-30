import React, {FC} from 'react';
import {Mutation} from 'react-apollo';
import styled from 'styled-components';
import gql from 'graphql-tag';

export interface ILamp {
  id: number;
  name: string;
  isOn: boolean;
  size: number;
}

interface IBProps {
  isOn: boolean;
  size: number;
  onClick:any;
}

// const TOGGLE_LAMP = gql`
//   mutation ToggleLamp($name: String!) {
//     toggleLamp(name: $name) @client
//   }
// `;

const TOGGLE_LAMP = gql`
  mutation ToggleLamp($id: Int!) {
    toggleLamp(id: $id) @client
  }
`;

const LampButton:FC<IBProps> = styled.button`
  background-color: ${(props:IBProps) => props.isOn ? 'darkgreen' : 'darkred'};
  border: 1px solid black;
  border-radius: 3px;
  color: #ddd;
  cursor: pointer;
  display: inline-block;
  margin: 0.2rem;
  padding: ${(props:IBProps) => props.size ? `${props.size * 0.1}rem` : '0.3rem'};
  
  &:hover {
    opacity: 0.5;
  }
`;

const Lamp: FC<ILamp> = ({id, name, isOn, size}) => (
  <Mutation mutation={TOGGLE_LAMP} variables={{id}}>
    {(toggleLamp:any) => (
      <LampButton isOn={isOn} size={size} onClick={toggleLamp}>
        {name} {isOn}
      </LampButton>
    )}
  </Mutation>);

export default Lamp;