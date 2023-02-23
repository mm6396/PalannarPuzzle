"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectSquare = selectSquare;
exports.fillSquare = fillSquare;

var _Boundary = require("../boundary/Boundary.js");

var _Model = require("../model/Model.js");

function selectSquare(model, canvas, event) {
  var canvasRect = canvas.getBoundingClientRect();
  var idx = model.puzzle.squares.findIndex(function (square) {
    var rect = (0, _Boundary.computeRectangle)(square);
    return rect.contains(event.clientX - canvasRect.left, event.clientY - canvasRect.top);
  });
  var selected = null;

  if (idx >= 0) {
    selected = model.puzzle.squares[idx];
  }

  model.puzzle.select(selected);
  return model.copy();
}

function fillSquare(model, direction) {
  var selected = model.puzzle.selected;

  if (!selected) {
    return model;
  }

  if (direction == _Model.Left) {
    model.puzzle.extendColor(selected.row, selected.column - 1, selected.color, selected.label + 1);
  }

  if (direction == _Model.Up) {
    model.puzzle.extendColor(selected.row - 1, selected.column, selected.color, selected.label + 1);
  }

  if (direction == _Model.Right) {
    model.puzzle.extendColor(selected.row, selected.column + 1, selected.color, selected.label + 1);
  }

  if (direction == _Model.Down) {
    model.puzzle.extendColor(selected.row + 1, selected.column, selected.color, selected.label + 1);
  }

  if (model.puzzle.hasWon() === true) {
    model.victorious();
  }

  return model.copy();
}