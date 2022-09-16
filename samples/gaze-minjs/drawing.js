

const canvasBoard = document.getElementById("drawing-board");
const tool = document.getElementById("tool");

const context = canvasBoard.getContext("2d");

const cSetX = canvasBoard.offsetLeft;
const cSetY = canvasBoard.offsetTop;

canvasBoard.width = window.innerWidth - cSetX;
canvasBoard.height = window.innerHeight - cSetY;

//If we started drawing or not, it remains false
let isPainting = false;
let lineWidth = 10; //default line width
//For the current mouse position's coordinates
let startX;
let startY;

//setting everything to point zero if the "clear" button is clicked
tool.addEventListener("click", (e) => {
  if (e.target.id === "clearBoard") {
    context.clearRect(0, 0, canvasBoard.width, canvasBoard.height);
  }
});

//If the toolbar's value has been changed suhc as checking thr id of the
tool.addEventListener("change", (e) => {
  if (e.target.id === "stroke") {
    context.strokeStyle = e.target.value;
  }

  if (e.target.id === "penWidth") {
    lineWidth = e.target.value;
  }
});

canvasBoard.addEventListener("mousedown", (e) => {
  isPainting = true; //change the value to true, as we are starting to draw on the canvas board (the user clicks and holds the mouse button down)
  //set the current mouse position's coordinates into startX and startY.
  startX = e.clientX;
  startY = e.clientY;
});

//If the user releases the mouse button, then we'll set isPainting to false.
canvasBoard.addEventListener("mouseup", (e) => {
  isPainting = false;
  context.stroke();
  context.beginPath();
});
//Now to set the variable draw to what the user has chosen (anonymous "funtion" or like a class):
//It checks if the user is drawing, then it will set the properties of the "line width" and "line cap"
//to what the input fields are
//these will be once visible on the canvas white board.
//else, it returns as the user still didnt draw anything yet.
const draw = (e) => {
  if (!isPainting) {
    return;
  }

  context.lineWidth = lineWidth;
  context.lineCap = "round";

  context.lineTo(e.clientX - cSetX, e.clientY);
  context.stroke(); //stroke method to give the line the color that we selected.
};

canvasBoard.addEventListener("mousemove", draw);

import "./index.js";