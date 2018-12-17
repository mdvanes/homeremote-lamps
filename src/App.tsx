import React, {SFC} from 'react';
import logo from './logo.svg';
import './App.css';
import LampList from './LampList';

const App: SFC = () => (
  <div className="App">
    <header className="App-header" style={
      {
        minHeight: 'auto'
      }
    }>
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <LampList />
  </div>
);

export default App;
