import {computeRectangle} from '../boundary/Boundary.js';
import {Up, Down, Left, Right, NoMove, NeighborType ,Model, Puzzle} from '../model/Model.js'
//import{Square} from '../model/Square.js';

export function selectSquare(model, canvas, event) {
  const canvasRect = canvas.getBoundingClientRect();
  
  let idx = model.puzzle.squares.findIndex(square=> {
    let rect = computeRectangle(square);
    return rect.contains(event.clientX - canvasRect.left, event.clientY - canvasRect.top);
  });
  
  let selected = null;
  if (idx >= 0  ) {
    
    selected = model.puzzle.squares[idx];
    
  }
  
  
  
  model.puzzle.select(selected);
  return model.copy();
}

export function fillSquare(model, direction ){

  let selected = model.puzzle.selected;
  if(!selected) {return model;}
  
  if (direction==Left) {
    model.puzzle.extendColor(selected.row , selected.column-1, selected.color , selected.label+1) ;
  }
  if (direction== Up) { model.puzzle.extendColor(selected.row-1, selected.column, selected.color , selected.label+1);}
  if (direction== Right) { model.puzzle.extendColor(selected.row , selected.column+1, selected.color , selected.label+1);}
  if (direction== Down) { model.puzzle.extendColor(selected.row+1 , selected.column, selected.color , selected.label+1);}
  
  
 

  if (model.puzzle.hasWon()===true) 
  {
      model.victorious();
  } 
  
  
  return model.copy(); 
}


