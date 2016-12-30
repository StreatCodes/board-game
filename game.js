//get canvas and context
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

//setup canvas draw loop
ctx.fillStyle = "#FF00FF";
ctx.strokeStyle = "#FF00FF";
let prevTime = 0.0;
let dt = 0.0;
requestAnimationFrame(draw);

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
    let x = e.clientX - canvas.getBoundingClientRect().left;
    let y = e.clientY - canvas.getBoundingClientRect().top;

    mouseX = x < canvas.clientWidth ? x : canvas.clientWidth;
    mouseY = y < canvas.clientHeight ? y : canvas.clientHeight;

    mouseX = mouseX < 0 ? 0 : mouseX;
    mouseY = mouseY < 0 ? 0 : mouseY;
});

class Grid {
    constructor(){
        this.cellWidth = 30;
        this.width = 10;
        this.height = 10;
        this.cells = [];

        for(let i = 0; i < this.width; i++){
            let row = [];
            for (let j = 0; j < this.height; j++){
                row.push(new Cell(this.cellWidth, this.cellWidth, (i + j) % 2 == 1 ? "#FF00FF" : "#00FF00"));
            }
            this.cells.push(row);
        }
    }

    draw(){
        for(let i = 0; i < this.width; i++){
            for (let j = 0; j < this.height; j++){
                this.cells[i][j].draw(i * this.cellWidth, j * this.cellWidth);
            }
        }
    }
}

class Cell {
    constructor(width, height, color){
        this.width = width;
        this.height = height;
        this.fillColor = color;
    }

    draw(x, y){
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(x, y, this.width, this.height);
    }
}

let grid = new Grid();

function draw(now) {
    //setup drawing
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dt = prevTime - now;
    prevTime = now;

    update(dt);
    //draw to canvas
    grid.draw();
}

function update() {

}