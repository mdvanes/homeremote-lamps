import React, {SFC} from 'react';
import './Lamp.css';

interface IProps {
  name: string;
  isOn: boolean;
}

const Lamp: SFC<IProps> = ({name, isOn}) => (
  <div className="lamp" style={{
    backgroundColor: isOn ? 'darkgreen' : 'darkred',
  }}>
    {name}
  </div>);

export default Lamp;