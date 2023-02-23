import {Up, Down, Left, Right } from '../model/Model.js';
import {Square} from '../model/Model.js';

// Scaling Constants for Canvas
var BOXSIZE = 80;
const OFFSET = 10;


/** Represents a rectangle. */
export class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
   // //   /** Does the (x,y) point exist within the rectangle. */
   contains(x, y) {
      return x >= this.x && x <= (this.x + this.width) && y >= this.y && y <= (this.y + this.height);
  }
  }


export function computeRectangle(square) {
  return new Rectangle(BOXSIZE*square.column + OFFSET, BOXSIZE*square.row + OFFSET,BOXSIZE - 2*OFFSET, BOXSIZE - 2*OFFSET);
}



/** Draw puzzle. */
export function drawPuzzle (ctx, puzzle, showLabels) {
  
  ctx.shadowColor = 'black';
  
  let selected = puzzle.selected;

  
  puzzle.squares.forEach(square => {
     let rect = computeRectangle(square);
    // let neigh = neighbors(square);
     console.log(rect);
     if(square=== selected) {console.log(square);}
     if(square === selected && square.color ==='black') {
                ctx.fillStyle ='black';

     }
     else {
            if (square === selected) {
            ctx.fillStyle = 'lightblue';
            }else{
                if(square.color){
                 ctx.fillStyle = square.color; 
              //'square.color;
                 }else{
                   ctx.fillStyle ='white';
             }
	    }
  
    }
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    if(showLabels) {
      ctx.fillStyle='black';
      ctx.fillText(square.label, rect.x + rect.width /2, rect.y +rect.height/2);
    }
    
      
  });

}

/** Redraw  canvas */
export function redrawCanvas(model, canvasObj, appObj) {
   
    const ctx = canvasObj.getContext('2d');
     if(ctx=== null) { return ; }
    // clear the canvas area before rendering the coordinates held in state
    ctx.clearRect( 0,0, canvasObj.width, canvasObj.height);  // assume square region
     
    let puzzle = model.puzzle;
    let maxRC = puzzle.numRows;
    if (puzzle.numColumns > maxRC) { maxRC = puzzle.numColumns; }
    
    
    if (puzzle.numRows !== maxRC) {
       ctx.fillStyle = window.getComputedStyle(appObj).backgroundColor;
       ctx.fillRect(0, BOXSIZE*puzzle.numRows, canvasObj.width, BOXSIZE*(maxRC - puzzle.numRows));
    } else if (puzzle.numColumns !== maxRC) {
       ctx.fillStyle = window.getComputedStyle(appObj).backgroundColor;
       ctx.fillRect(BOXSIZE*puzzle.numColumns, 0, BOXSIZE*(maxRC - puzzle.numColumns), canvasObj.height);
    }

    
    if (model.puzzle) { 
     
      drawPuzzle (ctx, model.puzzle , true);
      
	     ctx.fillStyle = 'green';
	     ctx.shadowBlur = 0;
       ctx.fillRect(0, 0, puzzle.numColumns * BOXSIZE, OFFSET);
       ctx.fillRect(0, 0, OFFSET, puzzle.numRows * BOXSIZE);
	     ctx.fillRect(puzzle.numColumns*BOXSIZE - OFFSET, 0, OFFSET, puzzle.numRows * BOXSIZE);
	     ctx.fillRect(0, puzzle.numRows*BOXSIZE - OFFSET, puzzle.numColumns*BOXSIZE, OFFSET);
	  
	  
       ctx.fillRect(0, 0, puzzle.numColumns * BOXSIZE, OFFSET);
	  
    }
  };