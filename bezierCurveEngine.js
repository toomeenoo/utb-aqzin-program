/**
 * Interpretace vstupních dat pomocí
 * Bézierových křivek
 * Tomáš MOLINARI 2018
 */
RenderCore.prototype.Bezier = function(RenderCore){
    var s = this;//Instance
    var points = [];
    var color = "#ff8800";
    this.points = points;
    function pointGetControls(prev, point, next, smoothing){
        var before = {x: ((point.x-prev.x)*smoothing/2), y: 0};
        var after = {x: ((next.x-point.x)*smoothing/2), y: 0}
        var rise = 1/((prev.x - next.x)/(prev.y - next.y));
        before.y =  point.y + before.x*rise*-1;
        after.y = point.y + after.x*rise;
        //fix
        before.x = point.x - before.x;
        after.x += point.x ;
        return { before: before, after: after };
    }
    this.handleClick = function(x, y){
        var p = RenderCore.pointRecompute(x, y)
        this.addPoint(p.x,p.y);
    };
    RenderCore.ctx.canvas.addEventListener("click", function(evt){
        s.handleClick(evt.layerX, evt.layerY);
    });
    this.loop = function(){
        RenderCore.lineColor = color;
        if(points.length == 2){  
            RenderCore.line(points[0], points[1]);
        }else if(points.length > 2){
            var i = 0;
            while(i < points.length - 3){
                var myCP = pointGetControls(points[i], points[i+1], points[i+2], RenderCore.config.smoothing);

                /* Config line *
                RenderCore.lineColor = "#4477ff";
                RenderCore.line(points[i], points[i+1]);
                /* */
                if(i>1 && 1){
                    RenderCore.lineColor = "transparent";
                    RenderCore.fillColor = "rgba(255,255,255,0.3)";    
                    RenderCore.dot(points[i], 4);
                }
                
                /* Real line */
                RenderCore.lineColor = "#ff8800";
                var myCP = pointGetControls(points[i], points[i+1], points[i+2], RenderCore.config.smoothing);
                var nextCP = pointGetControls(points[i+1], points[i+2], points[i+3], RenderCore.config.smoothing);
                RenderCore.curve(points[i+1], myCP.after, nextCP.before, points[i+2]);
                /* */

                i++;
            }
        }
    }
    this.renderMath = function(func, xRes, zoomx, zoomy){
        zoomx_r = zoomx || 1;
        zoomy_r = zoomy || zoomx || 1;
        var i = 0;
        var max = Math.ceil(RenderCore.config.w/xRes);
        console.log(RenderCore.config.w, xRes, RenderCore.config.w/xRes);
        while(i<max){
            s.addPoint(xRes*i, func(xRes*i*(1/zoomx_r))*zoomy_r);
            i++;
        }
    }
    this.addPoint = function(px, py){
        var i = 0;
        while(i < this.points.lenght){
            if(this.points[i].x == px)
                return 0;
            i++;
        }
        this.points.push({x: px, y: py});
        function compare(a,b) {
            if (a.x < b.x)
                return -1;
            if (a.x > b.x)
                return 1;
            return 0;
        }
        this.points.sort(compare);
        return 1;
    }
    /* Default points */
    //before start
    this.addPoint(-10, 0);
    this.addPoint(0, 0);
    //At end
    this.addPoint(RenderCore.config.w, 0);
    this.addPoint(RenderCore.config.w+10, 0);
    this.addPoint(RenderCore.config.w+20, 0);

    this.renderMath(function(x){
        return Math.sin(x);
    },5,50, 100);
}
