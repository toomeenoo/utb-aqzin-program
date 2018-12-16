/*
*
*
*
*/
Render = function(){
    var s = this;
    this.config = {};
    this.ctx = document.getElementById("render").getContext("2d");
    this.loop = function(){
        s.ctx.clearRect(0,0,s.config.w,s.config.h);
        s.ctx.strokeStyle = "#AAAAAA";
        s.ctx.beginPath();
        s.ctx.moveTo(0, s.config.ny+0.5);
        s.ctx.lineTo(s.config.w, s.config.ny+0.5);
        s.ctx.moveTo(s.config.nx+0.5, 0);
        s.ctx.lineTo(s.config.nx+0.5, s.config.h);
        s.ctx.stroke();
        window.requestAnimationFrame(s.loop);
    };
    this.resetSizes = function(){
        this.config.w = this.ctx.canvas.clientWidth;
        this.config.h = this.ctx.canvas.clientHeight;
        this.config.nx = 50;
        this.config.ny = Math.round(this.ctx.canvas.clientHeight/2) + 50 - (Math.round(this.ctx.canvas.clientHeight/2) % 50);
        this.ctx.canvas.width = this.ctx.canvas.clientWidth;
        this.ctx.canvas.height = this.ctx.canvas.clientHeight
    }

    window.addEventListener("resize", function(){
        s.resetSizes();
    });
    this.resetSizes();
    this.loop();
}

window.onload = function(){ window.r = new Render() };