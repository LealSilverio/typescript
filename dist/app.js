"use strict";
var canvas = document.getElementById('drawingCanvas');
if (!canvas) {
    throw new Error('Canvas element not found');
}
var ctx = canvas.getContext('2d');
if (!ctx) {
    throw new Error('Failed to get 2D context');
}
var drawing = false;
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
    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
};
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
