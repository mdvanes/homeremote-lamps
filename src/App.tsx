import React from 'react';
import logo from './logo.svg';
import './App.css';
import LampList from './LampList';

/* TODO what is the type of App? */
/* This is the style used instead of SFC */
const App = () => {
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <LampList></LampList>
        </header>
      </div>
  );
};

export default App;
