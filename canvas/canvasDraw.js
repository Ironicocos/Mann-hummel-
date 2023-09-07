const canvasDraw = document.getElementById("canvas");
const ctxDraw = canvasDraw.getContext("2d");
let coord = { x: 0, y: 0 };
let isDrawing = false;


let strokeStyle= "white";

function blackStroke() {
    strokeStyle = document.getElementById('blackButton').value
}
document.getElementById('blackButton').addEventListener('click',blackStroke)

function redStroke() {
    strokeStyle = document.getElementById('redButton').value
}
document.getElementById('redButton').addEventListener('click',redStroke)

function greenStroke() {
    strokeStyle = document.getElementById('greenButton').value
}
document.getElementById('greenButton').addEventListener('click',greenStroke)

function whiteStroke() {
    strokeStyle = document.getElementById('whiteButton').value
}
document.getElementById('whiteButton').addEventListener('click',whiteStroke)

document.addEventListener("mousedown", start);
document.addEventListener("mouseup", stop);
window.addEventListener("resize", resize);

const eraseButton = document.getElementById('eraseButton');
eraseButton.addEventListener('click', () =>{
    ctx.drawImage(image ,0 ,0)
    canvas.style.cursor = 'default';
})


function resize() {
ctxDraw.canvas.width = window.innerWidth;
ctxDraw.canvas.height = window.innerHeight;
}
resize();
function reposition(event) {
coord.x = event.clientX - canvas.offsetLeft;
coord.y = event.clientY - canvas.offsetTop;
}
function start(event) {
document.addEventListener("mousemove", draw);
reposition(event);
}
function stop() {
document.removeEventListener("mousemove", draw);
}
function draw(event) {
ctxDraw.beginPath();
ctxDraw.lineWidth = 5;
ctxDraw.lineCap = "round";
ctxDraw.strokeStyle = strokeStyle;
ctxDraw.moveTo(coord.x, coord.y);
reposition(event);
ctxDraw.lineTo(coord.x, coord.y);
ctxDraw.stroke();
}