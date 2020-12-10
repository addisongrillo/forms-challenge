import React from 'react'
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import './results.css';


function Results(props) {
    var JSONPrettyMon = require('react-json-pretty/dist/monikai');
  return (
    <div className="Results">
        <h3>JSON Output</h3>
        { props.formContent != null &&
        <div>
            
            <JSONPretty 
            id="json-pretty" 
            data={props.formContent} 
            theme={JSONPrettyMon}
            style={{fontSize: "1.5em"}} >
            
            </JSONPretty>
        <h4>Task Length: {props.timeDiff}</h4>
        </div>
        }
        
    </div>
  );
}

export default Results;
