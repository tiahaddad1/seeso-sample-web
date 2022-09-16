// helper functions to display gaze information and dot in browser.

// show gaze information on screen.
function showGazeInfoOnDom(gazeInfo) {
  const gazeInfoDiv = document.getElementById("gazeInfoA");
  gazeInfoDiv.innerText = `Display Gaze Information:
    \nx: ${gazeInfo.x}
    \ny: ${gazeInfo.y}
    `;
}
let csvFileData = new Set();

function startTimer() {
  return new Date();
}

function stopTimer() {
  return new Date();
}

function timeMeasure(startTime, endTime) {
  let timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds
  let seconds = Math.round(timeDiff);

  csvFileData.add(
    startTime.toLocaleTimeString() +
      "," +
      endTime.toLocaleTimeString() +
      "," +
      seconds
  );
}

let color;
let lineWidth;
let startTime;
let endTime;
// show gaze dot on screen.
function showGazeDotOnDom(gazeInfo) {
  let tool = document.getElementById("tool");
  let db = document.getElementsByClassName("drawing-board");
  let canvas = document.getElementById("drawing-board");
  let ctx = canvas.getContext("2d");
  const cSetX = canvas.offsetLeft;
  tool.addEventListener("change", (e) => {
    let isPainting = false;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //setting everything to point zero if the "clear" button is clicked
    tool.addEventListener("click", (e) => {
      if (e.target.id === "clearBoard") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      if (e.target.id === "startTimer") {
        startTime = startTimer();
      }
      if (e.target.id === "stopTimer") {
        endTime = stopTimer();
      }
      if (e.target.id === "calculate") {
        timeMeasure(startTime, endTime);
      }
    });

    if (e.target.id === "stroke") {
      color = e.target.value;
    } else {
      color = "#00000";
    }

    if (e.target.id === "penWidth") {
      lineWidth = e.target.value;
    } else {
      lineWidth = 10;
    }
    ctx.fillStyle = color;
  });

  let b = document.getElementById("downloadCSV").getBoundingClientRect();

  if (gazeInfo.x >= 468 && gazeInfo.x <= 476) {
    if (!startTime || !endTime) {
      alert("No data found to download!");
      return;
    }
    const dC = document.getElementById("downloadCSV");
    dC.style.backgroundColor = "#d98695";
    dC.style.color = "white";

    let totalNum = timeMeasure(startTime, endTime);

    var csvTitle = "Start,End,Total (seconds)\n";

    csvFileData.forEach(function (row) {
      csvTitle += row;
      csvTitle += "\n";
    });

    var dataCsv = document.createElement("a");
    dataCsv.href = "data:text/csv;charset=utf-8," + encodeURI(csvTitle);
    dataCsv.target = "_blank";

    let d = new Date();

    dataCsv.download = `Recording Data '${d.toLocaleString()}'.csv`;
    dataCsv.click();
  }

  ctx.beginPath();
  ctx.arc(gazeInfo.x, gazeInfo.y, lineWidth, 0, Math.PI * 2, true);
  ctx.fill();
}

function showGaze(gazeInfo) {
  showGazeInfoOnDom(gazeInfo);
  showGazeDotOnDom(gazeInfo);
}

export default showGaze;
