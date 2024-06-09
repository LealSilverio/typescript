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
let mirror = false;
let eraserMode = false;

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

    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;

    if (mirror) {
        const mirrorX = canvas.width - x;
        ctx.lineTo(mirrorX, y);
        ctx.stroke();
        ctx.moveTo(x, y);
    } if (eraserMode) {
        erase(x, y);
    } else {    
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
};

function toggleMirror(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    mirror = checkbox.checked;
}

function erase(x: number, y: number) {
    if (!ctx) {
        throw new Error('Failed to get element');}
    ctx.clearRect(x - 5, y - 5, 10, 10);
}


function toggleEraser() {
    eraserMode = !eraserMode;
}

function clearCanvas() {
    if (!ctx || !canvas) {
        throw new Error('Failed to get element');
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// Event listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseout', stopDrawing);

const mirrorCheckbox = document.getElementById('mirrorCheckbox') as HTMLInputElement;
mirrorCheckbox.addEventListener('change', (event) => toggleMirror(event));

const clearButton = document.getElementById('clearButton') as HTMLButtonElement;
clearButton.addEventListener('click', clearCanvas);

const eraserButton = document.getElementById('eraserButton') as HTMLButtonElement;
eraserButton.addEventListener('click', toggleEraser);


// Other Requirements

// Recursion function example: Factorial
function factorial(n: number): number {
    if (n <= 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

// Lists example
const myList: number[] = [1, 2, 3, 4, 5];

// Asynchronous function example: Simulating a delay with setTimeout
function simulateAsyncOperation() {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 2000); // 2 seconds delay
    });
}

console.log("Factorial example ", factorial(20));
console.log("List example ", myList)
console.log("Async example", simulateAsyncOperation);