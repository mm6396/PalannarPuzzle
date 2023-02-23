import React from 'react';
import { useState } from "react";
import './App.css';
import {Model,Square,Puzzle} from './model/Model.js';
import { Up, Down, Left, Right } from './model/Model.js';
import { redrawCanvas } from './boundary/Boundary.js';
import { selectSquare, fillSquare, movePiece /* solvePuzzle */} from './controller/Controller.js';


import { desktopLayout } from './Desktop.js';
import {layout} from './Layout.js';
import { useMediaQuery } from 'react-responsive'

// puzzle json file;
import { config_1,config_2, config_3 } from './model/Puzzle.js'; 


var actualPuzzle = JSON.parse(JSON.stringify(config_1));   // parses string into JSON object, used below.

var initialConfigs = [
  JSON.parse(JSON.stringify(config_1)),
  JSON.parse(JSON.stringify(config_2)),
  JSON.parse(JSON.stringify(config_3))
];

var puzzleIsSet = false; 
// Used to record when key is pressed, since there will be duplicate events generated,
// and we only want to process the first one.
var isKeyDown = false;

function App() {
  const [model, setModel] = React.useState(new Model(initialConfigs[0]));
  //const [solved, setSolved] = React.useState(false);
  const [solution, setSolution] = React.useState("");
  const [isInputPuzzleVisible, setInputPuzzleVisible] = React.useState(false);
  const [inputPuzzle, setInputPuzzle] = React.useState("");
  
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth
  })
  
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 900px)' })
  const layout =  desktopLayout ;
  const appRef = React.useRef(null);      // need to be able to refer to App to get background color in Boundary
  const canvasRef = React.useRef(null);   // need to be able to refer to Canvas
  
  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect (() => {
    function handleResize() {
      setDimensions({
        height:window.innerHeight,
        width: window.innerWidth
      })
    }
    window.addEventListener('resize', handleResize);
   
    
    /** Happens once. */
    redrawCanvas(model, canvasRef.current, appRef.current);
  }, [model])   // this second argument is CRITICAL, since it declares when to refresh (whenever Model changes)
  


  const selectConfigHandler = (config) => {
    let newModel = new Model(config);
    setModel(newModel); // react to changes, if model has changed. 
    puzzleIsSet = true;
  }
  
  const updatePuzzle = (e) => {
    setInputPuzzle(e.target.value);
  };
  
  const handleClick = (e) => {

    console.log(e.screenX, e.screenY, e.clientX, e.clientY)
    // ^^^^^ useful for logging specific events for testing purposes
    let newModel = selectSquare(model, canvasRef.current, e);
    setModel(newModel);   // react to changes, if model has changed.
  }
  
  
  
  const handleKeyUpEvent = (e) => {
    isKeyDown = false;
  }
  
  
  
  const resetHandler = () => {
    let m = new Model(initialConfigs[0]);
    setModel(m);                    // react to changes since model has changed.
    
  }
  

  
  
  const changePuzzle = (e) => {
    setInputPuzzleVisible(!isInputPuzzleVisible);
    actualPuzzle = JSON.parse(inputPuzzle);
    try {
      let m = new Model(actualPuzzle)
      setModel(m);
      
    } catch (err) {
      console.log("Problem parsing input:" + err);
    }
  }
  
  const colorSquareHandler = (direction) => {
    let newModel = fillSquare(model, direction);
    
    setModel(newModel);   
  }
  const handleKeyDownEvent = (e) => { 
    if (isKeyDown) { return; }
    isKeyDown = true;
    
    var direction = null;
    if      ((e.keyCode === 37 || e.keyCode === 65 || e.keyCode === 100) && model.available(Left))  { direction = Left; }
    else if ((e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 104) && model.available(Up))    { direction = Up; }
    else if ((e.keyCode === 39 || e.keyCode === 68 || e.keyCode === 102) && model.available(Right)) { direction = Right; }
    else if ((e.keyCode === 40 || e.keyCode === 83 || e.keyCode === 98)  && model.available(Down))  { direction = Down; }
    if (direction) { colorSquareHandler(direction); } 
  }
  
 
  
  // top-level application
  return (
    <main style={layout.Appmain} ref={appRef}>
    {/* Allows key events, with tabIndex */}
    <canvas tabIndex="1"  
    className="App-canvas"
    ref={canvasRef}
    width={layout.canvas.width}
    height={layout.canvas.height}
    onClick={handleClick} onKeyDown={handleKeyDownEvent} onKeyUp={handleKeyUpEvent} />

    
    
    <textarea style={layout.inputPuzzle} placeholder="Enter JSON here" rows={5} onChange={updatePuzzle} hidden={!isInputPuzzleVisible}></textarea>
    <label data-testid="victory-text" style={layout.victory} className={"display-5 mb-3"}> 
    {model.isVictorious() ? "Congratulations you 've won!" : "Not solved ..." }</label>

    {/* Model.isVictorious() ? (<label data-testid="victory-label" style={layout.victory}> Congratulation! You've Won! </label>): tryOnceMore */ }
    { isInputPuzzleVisible ? ( <button style={layout.inputPuzzleChange} onClick={changePuzzle} hidden={isInputPuzzleVisible}>Change Puzzle</button> ) : null }
    {/* Configuration buttons*/}
    <div style={layout.configButtons}>

    <button style={layout.level1button} onClick={(e) => selectConfigHandler(config_1)}>Puzzle2x4</button>
    <button style={layout.level2button} onClick={(e) => selectConfigHandler(config_2)}> Puzzle4x8 </button>
    <button style={layout.level3button} onClick={(e) => selectConfigHandler(config_3)}>Puzzle8x8</button>
    
    
    </div>
    
    {/* extraButtons */}
    <div style = {layout.extraButtons}>
    
    
    </div>
    
    {/* Group buttons together */}
    <div style={layout.buttons}>
    
    
    <button style={layout.upbutton}    onClick={(e) => colorSquareHandler(Up)} disabled={!model.available(Up)}     >^</button>
    <button style={layout.leftbutton}  onClick={(e) => colorSquareHandler(Left)} disabled={!model.available(Left)}   > &lt;</button>
    <button style={layout.rightbutton} onClick={(e) => colorSquareHandler(Right)} disabled={!model.available(Right)}  > &gt;</button>
    <button style={layout.downbutton}  onClick={(e) => colorSquareHandler(Down)} disabled={!model.available(Down)}    > v </button> 
    <button style={layout.resetbutton} onClick={(e) => resetHandler()} >Reset</button>
   
    
    
    </div>
    </main>
    );
    
  }
  
  export default App;
