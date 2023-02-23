import { selectSquare } from "../controller/Controller";

//import context from "react-bootstrap/esm/AccordionContext";
export class Position {
    constructor (row, column) {
        this.row = row;
        this.column = column;
    }
}

export class NeighborType {
    constructor(dr, dc, label){
        this.deltar = dr
        this.deltac = dc;
        this.label = label;  
    }
    static parse(s) {
        if ((s === "down")  || (s === "Down"))   { return Down; }
        if ((s === "up")    || (s === "Up"))     { return Up; }
        if ((s === "left")  || (s === "Left"))   { return Left; }
        if ((s === "right") || (s === "Right"))  { return Right; }
        
        return NoMove;
    }
}

export const Down = new NeighborType(1, 0, "down");
export const Up = new NeighborType(-1, 0, "up");
export const Left = new NeighborType(0, -1, "left");
export const Right = new NeighborType(0, 1, "right");
export const NoMove = new NeighborType(0, 0, "*"); // No neighbor 


export class Square {
    constructor(row, column){
        this.row = row;
        this.column = column;
        
        this.baseSquare = false; 
        this.color = null;
        this.label = 0;
        this.unused = false;
    }
    place() {
        return new Position(this.row, this.column);
    }
    
    fillColor(color, label){
        this.color = color;
        this.label = label
    }
    location() {
        return new Position(this.row, this.column);
    }
    
    
    
    copy(){
        let p = new Square(this.row, this.column );
        p.baseSquare = this.baseSquare;
        p.color = this.color;
        p.label = this.label;
        p.unused = this.unused;
        
        return p;
    }
}



export class Puzzle {
    constructor(numRows, numColumns){
        this.numRows = numRows;
        this.numColumns = numColumns;
        this.squares = []
        this.baseSquares = []
        for (let r = 0; r < numRows; r++) {
            for (let c = 0; c < numColumns; c++) {
                this.squares.push(new Square(r,c));
            }
        }
        
        this.selected = null; 
        this.maxRow = 10;
        this.maxColumn = 10;
        this.maxColors = 5; 
    }
    
    // heineman: NEW METHOD to return square in puzzle at given [row,column]
    findSquare(row, column) {
        let real_sq = this.squares.find(sq => {
            if (sq.row === row && sq.column === column) {
                return true;
            }
        })
        
        return real_sq;
    }
    
    makePuzzle (row, column, color, baseSquare, unused){
        this.squares.forEach ((sq)=> {
            if (sq.row === row && sq.column === column){
                sq.color=color;
                sq.baseSquare = baseSquare;
                if(baseSquare) {this.baseSquares.push(sq);}
                sq.unused = unused;
            }
        }) 
    }
    
    hasWon(){
        
        let maybeLost = false;
        this.squares.forEach ((sq)=> {
            if (sq.color === null ){
                maybeLost = true;
            }
        });
        
        if (maybeLost) { return false; }
        console.log("READY TO CHECK MORE");
        // let NotCompeleted = 0 ;
        
        
        this.baseSquares.forEach((bsq)=>{
            let color = bsq.color;
            let largestLabel = -1 ;
            this.squares.forEach((sq) => {
                if(sq.color === color) { 
                    if(sq.label > largestLabel) { largestLabel = sq.label; }
                }
            })
            
            
            this.baseSquares.forEach((bsq1) => {
                let nbsq = this.neighbors(bsq1);
                if( !(nbsq.label=== 1 ) && !(nbsq.label === largestLabel)) {
                    maybeLost = true;
                }
            })
        }) 
        
        
        
        return !maybeLost;
        
    }
    
    //*********************************** */
    
    extendColor(row,column,color,label) {
        
        this.squares.forEach ((sq)=> {
            if (sq.row === row && sq.column === column){
                sq.color=color;
                sq.label =label;
            }
            
        })
        
        this.hasWon();
        
    }
    
    
    initialize (squares){
        //make sure to create new square objects
        this.squares = squares.map(p=> p.copy());
    }
    /** Make a deep copy of this puzzle. */
    
    clone(){
        let copy = new Puzzle( this.numRows, this.numColumns);
        copy.squares = [];
        for (let p of this.squares){
            let dup = p.copy();
            copy.squares.push(dup);
            if (p === this.selected){
                copy.selected = dup;
            }
        }
        return copy;
    }
    select (square){
        this.selected = square;
    }
    
    isSelected(square){
        return square === this.selected;
    }
    
    
    
    neighbors(square){
        let nearby = [];
        if (square.column > 0) {
            nearby.push(this.findSquare(square.row, square.column - 1));
        }
        if (square.row > 0){
            nearby.push(this.findSquare(square.row - 1, square.column ))
        }
        if(square.row < this.numRows -1){
            nearby.push(this.findSquare(square.row + 1, square.column ))
        }
        if (square.column < this.numColumns -1) {
            nearby.push(this.findSquare(square.row, square.column + 1 ));
        }
        console.log(nearby);
        return nearby;
    }
    
    
    
    possibleMove(){
        let p = this.selected;
        if (p== null){ return [];}
        let valids = [];
        let coord = this.selected.location();
        
        // c1 =>   (unused : true , base = true) :=> do nothing
        //c2 =>    (unused : false , base = true) :=> do nothing 
        // c3 =>    (unused : true , base = false) :=> do nothing  
        // c4 =>    (unused : false , base = false) :=> push (Right)
        //
        
        // CHECK to make sure next square (1) is not basse; (2) is not unused; (3) is not already filled in with a color
        // heineman: Is valid column? 
        if ( coord.column  < this.numColumns-1) {
            let sq = this.findSquare(p.row, p.column+1);
            if (sq.baseSquare===false && sq.unused===false && !sq.color) { 
                valids.push(Right);
            }
        }
        
        if ( coord.column > 0) {
            let sq = this.findSquare(p.row, p.column-1);
            if (sq.baseSquare===false && sq.unused===false && !sq.color) { 
                valids.push(Left);
            }
        }
        
        if ( coord.row > 0) {
            let sq = this.findSquare(p.row-1, p.column);
            if (sq.baseSquare===false && sq.unused===false && !sq.color) { 
                valids.push(Up);
            }
        }
        
        if ( coord.row < this.numRows -1) {
            let sq = this.findSquare(p.row+1, p.column);
            if (sq.baseSquare===false && sq.unused===false && !sq.color) { 
                valids.push(Down);
            }
        }
        
        
        
        return valids;
    }
    
}

export class Model {
    static _id = 0; // helpful for debugging. Can be used to show which 'version' Model is being processed
    
    /** Construct a Model for this puzzle information. If info is undefined, then defaults to no-op constructor. */
    constructor(info) {
        this.id = Model._id;
        Model._id += 1;
        
        if (typeof info === 'undefined') {return; }
        
        this.initialize(info);
    }
    //info is going to be JSON-encoded puzzle
    
    
    initialize(info){
        let numRow = parseInt(info.numRows);
        let numColumn = parseInt(info.numColumns); 
        this.puzzle = new Puzzle(numRow, numColumn);
        
        
        
        for (let p of info.baseSquare) {
            this.puzzle.makePuzzle(parseInt(p.row), parseInt(p.column),p.color ,true , false)
            //row, column, color, label, unused
        }
        
        
        
        for (let p of info.unused){
            this.puzzle.makePuzzle(parseInt(p.row), parseInt(p.column),p.color,true,true)
        }
        
        
        
        this.victory = false;
        
    }
    victorious () {
        this.victory = true;
    }
    
    isVictorious() {
        return this.victory;
    }
    
    
    
    available(direction){
        // if no piece selected? Then none are available.
        if (!this.puzzle.selected) { return false; }
        if (direction === NoMove) { return false; }
        
        let allValidMoves = this.puzzle.possibleMove();
        
        return allValidMoves.includes(direction);
        
    }
    
    copy() {
        let m = new Model(this.info);
        m.puzzle = this.puzzle.clone();
        m.victory = this.victory;
        return m
        
    }
    
}