var canvas = {
  element: document.getElementById("canvas"),
  width: window.innerWidth,
  height: window.innerHeight,
  initialize: function () {
    this.element.style.width = window.innerWidth + "px";
    this.element.style.height = window.innerHeight + "px";
    document.body.appendChild(this.element);
  },
};

canvas.element.addEventListener("click", function (e) {
  var CoordX = e.x - (window.innerWidth - canvas.width) / 2;
  var CoordY = e.y - (window.innerHeight - canvas.height) / 2;
  let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  let dx = Math.floor(Math.random() * (20 + 20)) - 20;
  let dy = Math.floor(Math.random() * (20 + 20)) - 20;
  Ball.create(color, dx, dy).generate(CoordX, CoordY);
  document.querySelector(".title").style.display = "none";
});

var Ball = {
  create: function (color, dx, dy) {
    var ball = Object.create(this);
    let size = Math.floor(Math.random() * 100 + 50);
    ball.dx = dx;
    ball.dy = dy;
    ball.ax = 2;
    ball.ay = 2;
    ball.width = size;
    ball.height = size;
    ball.element = document.createElement("div");
    ball.element.style.backgroundColor = color;
    ball.element.style.width = ball.width + "px";
    ball.element.style.height = ball.height + "px";
    ball.element.className += " ball";
    canvas.element.appendChild(ball.element);
    return ball;
  },
  movement: function (x, y) {
    this.element.style.left = x + "px";
    this.element.style.top = y + "px";
  },
  handleDirection: function (x, y) {
    if (x < 0 || x > window.innerWidth - this.width) {
      this.dx = -this.dx;
      this.ax = this.ax - this.ax * 0.1;
      if (this.ax < 0) {
        this.ax = 0;
      }
    }
    if (y < 0 || y > window.innerHeight - this.height) {
      this.dy = -this.dy;
      this.ay = this.ay - this.ay * 0.1;
      if (this.ay < 0) {
        this.ay = 0;
      }
    }
  },
  generate: function (x, y) {
    this.movement(x, y);
    var ball = this;
    setTimeout(function () {
      ball.handleDirection(x, y);
      ball.generate(x + ball.dx * ball.ax, y + ball.dy * ball.ay);
    }, 1000 / 60);
  },
};
canvas.initialize();
