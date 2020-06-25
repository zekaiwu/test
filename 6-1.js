// empty shell for students to do their quadcopter
// exercise

// we do enable typescript type checking - see
// https://graphics.cs.wisc.edu/Courses/559-sp2020/pages/typed-js/
// and
// https://github.com/Microsoft/TypeScript/wiki/Type-Checking-JavaScript-Files
// @ts-check

/* Set options for jshint (my preferred linter)
 * disable the warning about using bracket rather than dot
 * even though dot is better
 * https://stackoverflow.com/questions/13192466/how-to-suppress-variable-is-better-written-in-dot-notation
 */
/* jshint -W069, esversion:6 */

window.onload = function () {
    // somewhere in your program (maybe not here) you'll want a line
    // that looks like:
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
    let context = canvas.getContext("2d");
    let boxfdots = [];
    let x,y;
    function drawBlade(angle){
        context.save();
        context.beginPath();
        context.translate(0, 50);
        context.rotate(angle*6);
        context.fillStyle='black';
        context.fillRect(-2,0,4,20);
        context.fillRect(-2,0,4,-20);
        context.fillStyle='yellow';
        context.fillRect(-3,3,6,-6);
        context.fill();
        context.stroke();
        context.restore();
    }
    function drawArm(angle){
        context.save();
        context.fillStyle='gray';
        context.rotate(Math.PI/4);
        for(let arm=0; arm<4; arm++){
          context.fillStyle='gray';
          context.beginPath();
          context.fillRect(-5,0,10,50);

          drawBlade(angle);
          context.rotate(Math.PI/2);
        }
        context.restore();
    }

    function drawCircleBody(angle) {
        context.save();
        context.fillStyle = "lightgreen";
        context.rotate(angle);
        context.translate(0, 100);
        context.beginPath();
        drawArm(angle);
        context.fillRect(15,15,-30,-30);
        context.fill();
        context.stroke();
        context.restore();
    }
    function drawScene() {
        let a = performance.now() / 500;
        context.clearRect(0, 0, canvas.width, canvas.height);

        boxfdots.forEach(function(dot){
          context.fillStyle = "black";
          context.fillRect(dot.x,dot.y,10,10);
          dot.y-=a;
        });

        context.save();
        context.fillStyle = "lightgreen";
        context.beginPath();
        context.translate(x, y);
        drawArm(a);
        context.fillRect(15,15,-30,-30);
        context.fill();
        context.stroke();
        context.restore();

        context.save();
          context.scale(1, -1);
          context.translate(0, -canvas.height);
          context.fillStyle = "blue";
          context.fillRect(90,0,510,30);
          context.fillStyle = "green";
          context.moveTo(50,0);
          context.lineTo(80,100);
          context.lineTo(110,0);
          context.lineTo(50,0);
          context.fill();
          context.stroke();
          context.save();
          context.translate(300, 300);
          drawCircleBody(a);
          context.restore();
          context.translate(500, 200);
          drawCircleBody(-1.5*a);
          context.restore();
        context.restore();
        window.requestAnimationFrame(drawScene);
    }
    canvas.onmousemove = function(event) {
        x = event.clientX;
        y = event.clientY;
        let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
        x -= box.left;
        y -= box.top;
    };
    document.getElementById("canvas1").onclick = function(event) {
      let cx = event.clientX;
      let cy = event.clientY;
      let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
      cx -= box.left;
      cy -= box.top;
      console.log("a");
      boxfdots.push({"x":cx,"y":cy});
    };
    drawScene();
};
