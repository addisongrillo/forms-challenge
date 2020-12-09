import React from 'react'
import './App.css';
import Form from './components/form/form';
import Results from './components/results/results';
/**
 * START HERE
 * Good luck!
 */
function App() {
  return (
    <div className="App">
      <h1 id="title">Jira Work Logger</h1>
      <Form/>
      <Results/>
    </div>
  );
}

export default App;
