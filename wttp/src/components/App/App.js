import React, { Component } from 'react'
import './App.css'
import Pipeline from '../Pipeline/Pipeline'

class App extends Component {
  render() {
    return (
      <div className="App">
      
        <header className="App-header">
          <h1 className="App-title">Welcome to The Pampa</h1>
        </header>

        <p className="App-intro">
          Pampa, welcome to the Pampa
        </p>

        <Pipeline />

      </div>
    );
  }
}

export default App;
