import React, {FC} from 'react';
import styled from 'styled-components';

interface IProps {
  name: string;
  isOn: boolean;
}

const LampButton:any = styled.button`
  background-color: ${(props:any) => props.isOn ? 'darkgreen' : 'darkred'};
  border: 1px solid black;
  border-radius: 3px;
  color: #ddd;
  cursor: pointer;
  display: inline-block;
  margin: 0.2rem;
  padding: 0.3rem;
  
  &:hover {
    opacity: 0.5;
  }
`;

const Lamp: FC<IProps> = ({name, isOn}) => (
  <LampButton isOn={isOn}>
    {name}
  </LampButton>);

export default Lamp;