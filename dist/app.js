"use strict";
var canvas = document.getElementById('drawingCanvas');
if (!canvas) {
    throw new Error('Canvas element not found');
}
else {
    console.log('Canvas Initialized');
}
var ctx = canvas.getContext('2d');
if (!ctx) {
    throw new Error('Failed to get 2D context');
}
var drawing = false;
var mirror = false;
var eraserMode = false;
var startDrawing = function (event) {
    drawing = true;
    draw(event);
};
var stopDrawing = function () {
    drawing = false;
    ctx.beginPath();
};
var draw = function (event) {
    if (!drawing)
        return;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;
    if (mirror) {
        var mirrorX = canvas.width - x;
        ctx.lineTo(mirrorX, y);
        ctx.stroke();
        ctx.moveTo(x, y);
    }
    else {
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
};
function toggleMirror(event) {
    var checkbox = event.target;
    mirror = checkbox.checked;
}
function clearCanvas() {
    if (!ctx || !canvas) {
        throw new Error('Failed to get element');
    }
    else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}
function toggleEraser() {
    eraserMode = !eraserMode;
}
// Event listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseout', stopDrawing);
var mirrorCheckbox = document.getElementById('mirrorCheckbox');
mirrorCheckbox.addEventListener('change', function (event) { return toggleMirror(event); });
var clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', clearCanvas);
var eraserButton = document.getElementById('eraserButton');
eraserButton.addEventListener('click', toggleEraser);
