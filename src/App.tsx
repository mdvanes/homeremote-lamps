import React, {FC} from 'react';
import logo from './logo.svg';
import './App.css';
import LampList from './LampList';
import LocalStateDirectWriteButton from './LocalStateDirectWriteButton';

const App: FC = () => (
  <div className="App">
    <header className="App-header" style={
      {
        minHeight: 'auto'
      }
    }>
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <p>These cards share the same state store</p>
    <LocalStateDirectWriteButton />
    <LocalStateDirectWriteButton />
    <LampList />
  </div>
);

export default App;
