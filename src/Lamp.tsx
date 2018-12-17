import React, {SFC} from 'react';

interface IProps {
  name: string;
  isOn: boolean;
}

const Lamp: SFC<IProps> = ({name, isOn}) => (
  <div style={{
    backgroundColor: isOn ? 'darkgreen' : 'darkred',
    border: '1px solid black',
    color: '#ddd',
    display: 'inline-block',
    margin: '0.2rem',
    padding: '0.3rem'
  }}>
    {name}
  </div>);

export default Lamp;