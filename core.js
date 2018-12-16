/**
 * Jádro programu
 * Zjednodušuje přístup k funkcím JavaScript Canvas-u
 * Tomáš MOLINARI 2018
 */
RenderCore = function(cfg){
    var s = this;//Instance
    this.config = Object.assign(cfg || {}, {
        smoothing: 1, // 0 - 1
    });
    this.ctx = document.getElementById("render").getContext("2d");
    this.beforeLoop = [];
    this.stop = false;
    this.loop = function(){
        s.ctx.clearRect(0,0,s.config.w,s.config.h);
        s.ctx.strokeStyle = "#AAAAAA";
        s.ctx.beginPath();
        s.ctx.moveTo(0, s.config.ny);
        s.ctx.lineTo(s.config.w, s.config.ny);
        s.ctx.stroke();
        s.ctx.closePath();
        var i = 0;
        while(i<s.beforeLoop.length){
            try{
                s.beforeLoop[i](s);
            }catch(e){
                console.log("Error running before loop.",e);
            }
            i++;
        }
        if(!s.stop)
         window.requestAnimationFrame(s.loop);
    };
    this.registerAction = function(fn){
        this.beforeLoop.push(fn);
    };
    this.lineColor = "#ff0000";
    this.fillColor = "rgba(255,255,255,0.3)";
    this.line = function(fromPoint, toPoint){
        s.ctx.strokeStyle = s.lineColor;
        s.ctx.beginPath();
        s.ctx.moveTo(fromPoint.x+s.config.nx, s.config.ny-fromPoint.y);
        s.ctx.lineTo(toPoint.x+s.config.nx, s.config.ny-toPoint.y);
        s.ctx.stroke();
        s.ctx.closePath();
    };
    this.curve = function(start, control1, control2, end){
        s.ctx.strokeStyle = s.lineColor;
        s.ctx.beginPath();
        s.ctx.moveTo(start.x+s.config.nx, s.config.ny-start.y); // Start
        s.ctx.bezierCurveTo(
            control1.x+s.config.nx, s.config.ny-control1.y, // Control 1
            control2.x+s.config.nx, s.config.ny-control2.y, // Control 2
            end.x+s.config.nx, s.config.ny-end.y // End
        );
        s.ctx.stroke();
        s.ctx.closePath();
    }
    this.crossHair = function(point){
        s.ctx.strokeStyle = s.lineColor;
        s.ctx.beginPath();
        s.ctx.moveTo(point.x+s.config.nx+5, s.config.ny-point.y);
        s.ctx.lineTo(point.x+s.config.nx-5, s.config.ny-point.y);
        s.ctx.moveTo(point.x+s.config.nx, s.config.ny-point.y+5);
        s.ctx.lineTo(point.x+s.config.nx, s.config.ny-point.y-5);
        s.ctx.stroke();
        s.ctx.closePath();
    }
    this.dot = function(point, radius){
        s.ctx.strokeStyle = s.lineColor;
        s.ctx.fillStyle = s.fillColor;
        var r = radius || 20;
        s.ctx.beginPath();
        s.ctx.arc(point.x+s.config.nx, s.config.ny-point.y, r, 0, 2 * Math.PI);
        s.ctx.stroke();
        s.ctx.fill();
        s.ctx.closePath();
    }
    this.resetSizes = function(){
        s.config.w = s.ctx.canvas.clientWidth;
        s.config.h = s.ctx.canvas.clientHeight;
        s.config.nx = 0.5;
        s.config.ny = (Math.round(s.ctx.canvas.clientHeight/2) + 50 - (Math.round(s.ctx.canvas.clientHeight/2) % 50))+0.5;
        s.ctx.canvas.width = s.ctx.canvas.clientWidth;
        s.ctx.canvas.height = s.ctx.canvas.clientHeight;
    }
    this.pointRecompute = function(x, y){
        return {
            x: x+s.config.nx,
            y: (y-s.config.ny)*-1,
        }
    }
    window.addEventListener("resize", function(){
        s.resetSizes();
    });
    this.resetSizes();
    if(this.Bezier){
        this.BezierInstance = new this.Bezier(s);
        this.registerAction(this.BezierInstance.loop);
    }
    this.loop();
}

window.onload = function(){ window.ProgramCore = new RenderCore() };
