"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Puzzle = exports.Square = exports.Cordinate = exports.NoMove = exports.Right = exports.Left = exports.Up = exports.Down = exports.MoveType = void 0;

var _utils = require("@testing-library/user-event/dist/utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MoveType =
/*#__PURE__*/
function () {
  function MoveType(dr, dc, label) {
    _classCallCheck(this, MoveType);

    this.deltar = dr;
    this.deltac = dc;
    this.label = label;
  }

  _createClass(MoveType, null, [{
    key: "parse",
    value: function parse(s) {
      if (s === "down" || s === "Down") {
        return Down;
      }

      if (s === "up" || s === "Up") {
        return Up;
      }

      if (s === "left" || s === "Left") {
        return Left;
      }

      if (s === "right" || s === "Right") {
        return Right;
      }

      return NoMove;
    }
  }]);

  return MoveType;
}();

exports.MoveType = MoveType;
;
var Down = new MoveType(1, 0, "down");
exports.Down = Down;
var Up = new MoveType(-1, 0, "up");
exports.Up = Up;
var Left = new MoveType(0, -1, "left");
exports.Left = Left;
var Right = new MoveType(0, 1, "right");
exports.Right = Right;
var NoMove = new MoveType(0, 0, "*"); // no move is possible

exports.NoMove = NoMove;

var Cordinate = function Cordinate(row, column) {
  _classCallCheck(this, Cordinate);

  this.row = row;
  this.column = column;
};

exports.Cordinate = Cordinate;

var Square =
/*#__PURE__*/
function () {
  function Square(label, color, r, c) {
    _classCallCheck(this, Square);

    this.color = color;
    this.row = r;
    this.column = c;
    this.label = label;
  }

  _createClass(Square, [{
    key: "place",
    value: function place(row, col) {
      this.row = row;
      this.col = col;
    }
  }, {
    key: "location",
    value: function location() {
      return new Cordinate(this.row, this.column);
    }
  }, {
    key: "copy",
    value: function copy() {
      var p = new Square(this.width, this.height, this.isBase, this.Label);
      p.place(this.row, this.column);
      return p;
    }
  }]);

  return Square;
}();

exports.Square = Square;

var Puzzle =
/*#__PURE__*/
function () {
  function Puzzle(numRows, numColumns) {
    _classCallCheck(this, Puzzle);

    this.numRows = numRows;
    this.numColumns = numColumns;
    this.squares = [];

    for (var r = 0; r < numRows; r++) {
      for (var c = 0; c < numColumns; c++) {
        this.squares.push(new Square(r, c));
      }
    }

    this.selected = null;
  }

  _createClass(Puzzle, [{
    key: "setBaseSquare",
    value: function setBaseSquare(r, c, color) {
      this.squares.forEach(function (sq) {
        if (sq.row === r && sq.column === c) {
          sq.color = color;
        }
      });
    } // setUnusedSquare(r,c,color){
    //     this.squares.forEach((sq) => { 
    //         if(sq.row==r && sq.column==c){
    //             sq.color=color ;
    //         }
    //     }) 
    // }

  }, {
    key: "initialize",
    value: function initialize(squares) {
      this.squares = squares.map(function (p) {
        return p.copy();
      });
    }
  }]);

  return Puzzle;
}(); // export default class Model{
//     constructor(info){
//         this.initialize(info);
//     }
//     initialize(info){
//         let numRows = parseInt(info.numRows);
//         let numColumns= parseInt(info.numColumns);
//         let baseSquares = [] // [parseInt(info.baseSquares.color),parseInt(info.baseSquares.rows),parseInt(info.baseSquares.columns)];
//         [parseInt(info.unusedSquares.color),parseInt(info.unusedSquares.rows),parseInt(info.unusedSquares.columns)];
//         this.puzzle = new Puzzle(numRows, numColumns);
//         info.baseSquares.forEach(element => { 
//             this.puzzle.setBaseSquare(parseInt(element.row),parseInt(element.column),element.color) 
//                });
//         let unusedSquares = [parseInt(this.puzzle.row),parseInt(this.puzzle.column),this.puzzle.color]
//          var allSquares = [];
//          for(let p of info.){
//             allSquares.push(new Square(p.squares.label, p.squares.color ,parseInt(p.squares.row),parseInt(p.squares.column)));
//                 }
//            for(let loc of info.locations){
//              let coord = new Cordinate (parseInt(loc.location.row),parseInt(loc.location.column));
//         // let idx = allSquares.findIndex(squares => (squares.label === loc.square));
//         // allSquares[idx].place(coord.row,coord.column);
//        }
//       // this.puzzle.initialize(allSquares);
//         this.victory = false;
//     }
// }


exports.Puzzle = Puzzle;