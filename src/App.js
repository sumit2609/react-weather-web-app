import React from 'react';
import './App.css';
import Logo from './components/Logo/Logo';
import Forecast from "./components/Forecast/Forecast";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <h1>React Weather App</h1>
      </header>
      <main>
          {/* add weather fetching component */}
          <Forecast />
      </main>
      <footer>
        Page created by Sumit Sharma
      </footer>
    </div>
  );
}

export default App;
