const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


//To play game user must make the first to make the hat and holes visibile
class Field {
  constructor(array2d){
    this._array2d = array2d;
    this.rows = this._array2d.length;
    this.cols = this._array2d[0].length;
    
  }

  print(){
    for(let i=0; i<this.rows; i++){
      let line = '';
      line = this._array2d[i].join(' ');

      console.log(line);
    }
  }
  
  //Random number generator function 
  randomNumber(val){
    return Math.floor(Math.random() * val);
  }

  getRandomPosition(grid, char){
    do{

      let firstIndex = this.randomNumber(grid.length);
      let secondIndex = this.randomNumber(grid[0].length);

      if(Number.isInteger(firstIndex) && Number.isInteger(secondIndex)){
        if(firstIndex !== 0 && secondIndex !== 0 && grid[firstIndex][secondIndex] === fieldCharacter){
          
          grid[firstIndex][secondIndex] = char;
          //console.log(firstIndex, secondIndex)
          
          return [firstIndex, secondIndex];
          break;  
        }  
      }
      
    }while(true); 
  }

  getHatAndHole(grid, ahat, ahole){
    let hatPos = this.getRandomPosition(grid, ahat);
    let hole1 = this.getRandomPosition(grid, ahole);
    let hole2 = this.getRandomPosition(grid, ahole);
    //let hole3 = this.getRandomPosition(grid, ahole); //Adding more hole variables if more holes needed

    let result = [hatPos, hole1, hole2];

    return result;
  }

  

  //game grid generator function 
  static generateField(height, width){
    let rows = height;
    let cols = width;
    let grid = Array(height).fill(0).map(x => Array(width).fill(0));

    //filling the grid with default character
    for(let i=0; i<rows; i++){
      for(let j=0; j<cols; j++){
        grid[i][j] = fieldCharacter;
      }
    }
    //console.log(grid);
    return grid;
  }

  playGame (){

  let input = '';
  //Creating values to help track the currentPlace at any time user enters value
  let x = 0; //representing the rows
  let y = 0; //representing the columns within the rows
  let cL = this._array2d[x][y]; //cL for currentLocation

  //get a position for the hat
  let values = this.getHatAndHole(this._array2d, hat, hole);
  //console.log(values); //Checking the hat and holes positions

  let hatPos = values[0];
  let hole1 = values[1];
  let hole2 = values[2];

  
  //Function to help reset the game when there is an error from user
  function resetGame(grid, location){
    let rows = grid.length;
    let cols = grid[0].length;
    for(let i=0; i<rows; i++){
      for(let j=0; j<cols; j++){
        grid[i][j] = fieldCharacter;
      }
    }
    grid[0][0] = pathCharacter;
    location = grid[0][0];
  }

  do{

    console.log("List of moves: (Down:d | Up:u | Left:l | right:r )");
    console.log("Enter 'exit' to quit game \n");
    input = prompt("Kindly enter your move: ");

    if(input == 'exit'){
      break;
    }

    // if(clPos === hole){
    //   console.log("Sorry, better luck next time");
    //   break;
    // }
    input = input.toLowerCase();

    if(input == 'u'){
        moveUp(this._array2d, cL);
        this.print();
    }else if(input == 'd'){
        moveDown(this._array2d, cL);
        this.print();
    }else if(input == 'l'){
        moveLeft(this._array2d, cL);
        this.print();
    }else if(input == 'r'){
        moveRight(this._array2d, cL);
        this.print();
    }else{
      console.log("kindly enter a valid move");
      break;
    }

    //console.log(hatPos[0], hatPos[1], x,y);
    if((x === hatPos[0]) && (y===hatPos[1])){
      console.log("Congrats you won");
      break;
    }

    if((x === hole1[0]) && (y===hole1[1])){
      console.log("Sorry you fell into a hole");
      break;
    }

    if((x === hole2[0]) && (y===hole2[1])){
      console.log("Sorry you fell into a hole");
      break;
    }
  }
  while(input !== 'exit')

  function moveUp(grid, location){
    try{
      x -= 1;
      grid[x][y] = pathCharacter;
     
    }catch(e){
      console.log(e+"Sorry, out of the Field");
      x = 0;
      y = 0;
      resetGame(grid, location);
      return e;
    }
  }

  function moveDown (grid, location){
    try{
      x += 1;
      grid[x][y] = pathCharacter;
      
    }catch(e){
      console.log(e+"Sorry, out of the Field");
      x = 0;
      y = 0;
      resetGame(grid, location);
      return e;
    }    
  }

  function moveLeft (grid, location){
    try{
      y -= 1;
      grid[x][y] = pathCharacter;
      
    }catch(e){
      console.log(e+"Sorry, out of the Field");
      x = 0;
      y = 0;
      resetGame(grid, location);
      return e;
    }
  }

  function moveRight (grid, location){
    try{
      y += 1;
      grid[x][y] = pathCharacter;
      
    }catch(e){
      console.log(e+"Sorry, out of the Field");
      x = 0;
      y = 0;
      resetGame(grid, location);
      return e;
    }
  }


  }

}


let testGrid = Field.generateField(4,5);
let testField = new Field(testGrid);
//let theInput = prompt("Please your move: ");

testField.print();
testField.playGame();

