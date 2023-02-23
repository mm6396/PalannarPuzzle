import { OffcanvasTitle } from "react-bootstrap";
var BOXSIZE = 100 ; 
const OFFSET = 8;
/** Represents a rectangle. */
export class Rectangle {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
    
    /** Does the (x,y) point exist within the rectangle. */
    contains(x, y) {
       return x >= this.x && x <= (this.x + this.width) && y >= this.y && y <= (this.y + this.height);
    }
  }

export function computeRectangle(square){
    // let c=square.location();
    // return new Rectangle(BOXSIZE*square.column+OFFSET,BOXSIZE*square.row+OFFSET,
    //                      BOXSIZE*square.width-2*OFFSET,BOXSIZE*square.height-2*OFFSET);
    return new Rectangle(BOXSIZE+OFFSET,BOXSIZE+OFFSET);
}

export function drawPuzzle(ctx , puzzle, showLabels){
     ctx.shadowColor = 'black' ; 
     let selected = puzzle.selected;
     
     puzzle.squares.forEach(square => {

            let rect = computeRectangle(square);
            
           if(square === selected){

             ctx.fillStyle ='green' ; 
         } else {
               if(square.isBase){
              ctx.fillStyle = 'red';
             } else {
             ctx.fillStyle = 'lightblue';
             } 
        } 
        //ctx.shadowBlur = 10;
        ctx.fillRect(rect.x , rect.y , rect.width , rect.height)
     })
  }


export function redrawCanvas(model, canvasObj, appObj) {
    const ctx = canvasObj.getContext('2d');
    if (ctx === null) { return; }    // here for testing purposes...
    
    // clear the canvas area before rendering the coordinates held in state
    ctx.clearRect( 0,0, canvasObj.width, canvasObj.height);  

    if(model.puzzle) {
          drawPuzzle(ctx,model.puzzle , model.showLabels);
    }
}
