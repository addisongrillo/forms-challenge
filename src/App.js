import { React, useState } from 'react'
import './App.css';
import Form from './components/form/form';
import Results from './components/results/results';


function App() {

  //hooks
  const [formContent, setFormContent] = useState(null);
  const [timeDiff, setTimeDiff] = useState('');

  const updateFormContent = (f, d) => {
    setFormContent(f);
    setTimeDiff(d);
  }

  return (
    <div className="App">
      <h1 id="title">Jira Ticket Logger</h1>
      <div id="container">
        <Form updateFormContent={updateFormContent} />
        <Results formContent={formContent} timeDiff={timeDiff} />
      </div>
    </div>
  );
}

export default App;
