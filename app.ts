const canvas = document.getElementById('drawingCanvas') as HTMLCanvasElement | null;
if (!canvas) {
    throw new Error('Canvas element not found');
} else {
    console.log('Canvas Initialized');
}

const ctx = canvas.getContext('2d');
if (!ctx) {
    throw new Error('Failed to get 2D context');
}

let drawing = false;

const startDrawing = (event: MouseEvent) => {
  drawing = true;
  draw(event);
};

const stopDrawing = () => {
  drawing = false;
  ctx.beginPath();
};

const draw = (event: MouseEvent) => {
  if (!drawing) return;

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
