
import React from 'react';
import './App.css';
import Flexbox from './component/Flexbox';
import {useEffect, useState } from 'react';

function App() {
  const svedHistory = localStorage.getItem('flex-settings-history')
  const [flexDirection, setFlexDirection] =useState("row");
  const [justifyContent, setJustifyContent] = useState("center");
  const [alignItems, setAlignItems] = useState("flex-end");
  const defaulSetting = svedHistory === null ? [] : JSON.parse(svedHistory);
  const [settingsHistory, setSettingsHistory] = useState(
   defaulSetting
  );

  const selectHistory = (history) => {
    setFlexDirection(history.flexDirection);
    setJustifyContent(history.justifyContent);
    setAlignItems(history.alignItems);
  };
  useEffect(() => {
    const setting = {
      stepDate: Date.now(),
      flexDirection, justifyContent, alignItems
    };
    setSettingsHistory([...settingsHistory, setting]);
    localStorage.setItem('flex-settings-history',JSON.stringify(settingsHistory));
    console.log(settingsHistory);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[flexDirection, justifyContent, alignItems]);
  return (
    <div className="App">
      <h1>Flexbox Konfigurator</h1>
      <fieldset>
         flex-direction:
        <input
       type= 'radio'id='row'name='flex-direction'value={flexDirection}
       onChange={() => {
         setFlexDirection('row');
       }
      }
      />
      <label htmlFor='row'>row</label>
      <input  type= 'radio'id='column'name='flex-direction'value={flexDirection}
      onChange={() =>{
        setFlexDirection('column');
      }}
      />
      <label htmlFor='column'>column</label>
      </fieldset>
       <fieldset id='justify-content'>
        justify-content:
       <select id='justify-content' onChange={(e)=>{
         setJustifyContent(e.target.value);

       }}>
        <option value='flex-start'selected={justifyContent === "flex-start" ? "true" : "false"}  >flex-start</option>
         <option value='flex-end'selected={justifyContent === "flex-end" ? "true" : "false"} >flex-end</option>
         <option value='center'selected={justifyContent === "ceter" ? "true" : "false"} >center</option>
         <option value='space-between'selected={justifyContent === "space-between" ? "true" : "false"} >space-between</option>
         <option value='space-around'selected={justifyContent === "space-around" ? "true" : "false"} >space-around</option>
       </select>
      </fieldset>
      <fieldset id='align_Items'>
        alin-items:
       <select id='align-items' onChange={(e)=>{
         setAlignItems(e.target.value);
       }
      }>
         <option value='flex-start'selected={justifyContent === "flex-start" ? "true" : "false"} >flex-start</option>
         <option value='flex-end'selected={justifyContent === "flex-end" ? "true" : "false"} >flex-end</option>
         <option value='center'selected={justifyContent === "center" ? "true" : "false"} >center</option>
         <option value='stretch'selected={justifyContent === "stretch" ? "true" : "false"} >stretch</option>
         <option value='baseline'selected={justifyContent === "baseline" ? "true" : "false"} >baseline</option>
       </select>
      </fieldset>
      <div className='color-container' style={{
        flexDirection: flexDirection,
        justifyContent: justifyContent,
        alignItems: alignItems,
      }}>

    <Flexbox color='red'></Flexbox>
    <Flexbox color='yellow'></Flexbox>
    <Flexbox color='green'></Flexbox>
    <Flexbox color='blue'></Flexbox>
    <Flexbox color='purple'></Flexbox>
     </div>
     <h3>History</h3>
      <ul className="historyList">
        {settingsHistory.map((historyentry) => {
          const tmpDate = new Date(historyentry.stepDate);
          return (
            <li 
              key={historyentry.stepDate}
              onClick={() => selectHistory(historyentry)}
            >
              <span style={{ marginRight: 4, fontWeight: "bold" }}>
                {tmpDate.toLocaleString("de-DE", {
                  dateStyle: "short",
                  timeStyle: "medium"
                })}
              </span>
              {historyentry.flexDirection},{historyentry.alignItems},
              {historyentry.justifyContent}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
