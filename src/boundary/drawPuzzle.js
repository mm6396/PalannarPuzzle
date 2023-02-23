import { computeRectangle } from "./Boundary";

/** Draw puzzle. */
// export function drawPuzzle (ctx, puzzle, showLabels) {
//     ctx.shadowColor = 'black';
//     let selected = puzzle.selected;
//      puzzle.Square.forEach(square => {
//         let rect = computeRectangle(square);
//         if (square === selected) {
//             ctx.fillStyle = 'yellow';
//          } else {
//             if (square.isBase) {
//               ctx.fillStyle = 'red';
//             } else {
//               ctx.fillStyle = 'lightblue';
//             }
//         //ctx.shadowBlur = 10;
//         ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
//     })
//   }
/** Draw puzzle. */

export function drawPuzzle(ctx, puzzle, showLabels) {

  ctx.shadowColor = 'black';

  let selected = puzzle.selected;

  puzzle.squares.forEach(square => {
    let rect = computeRectangle(square);

    if (square === selected) {
      ctx.fillStyle = 'yellow';
    } else {
      if (square.isWinner) {
        ctx.fillStyle = 'red';
      } else {
        ctx.fillStyle = 'lightblue';
      }
    }

    //ctx.shadowBlur = 10;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  });

}
