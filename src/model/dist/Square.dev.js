"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Model = _interopRequireDefault(require("../model/Model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Square =
/*#__PURE__*/
function () {
  function Square(row, column) {
    _classCallCheck(this, Square);

    this.row = row;
    this.column = column;
    this.baseSquare = false;
    this.color = null;
    this.label = 0;
    this.unused = false;
  }

  _createClass(Square, [{
    key: "place",
    value: function place() {
      return new _Model["default"](this.row, this.column);
    }
  }, {
    key: "fillColor",
    value: function fillColor(color, label) {
      this.color = color;
      this.label = label;
    }
  }, {
    key: "location",
    value: function location() {
      return new _Model["default"](this.row, this.column);
    }
  }, {
    key: "extendColor",
    value: function extendColor(row, column, color) {
      this.color = color;
      this.row = row;
      this.column = column;
      console.log(this.square);
    }
  }, {
    key: "copy",
    value: function copy() {
      var p = new Square(this.row, this.column);
      p.baseSquare = this.baseSquare;
      p.color = this.color;
      p.label = this.label;
      p.unused = this.unused;
      return p;
    }
  }]);

  return Square;
}();

exports["default"] = Square;