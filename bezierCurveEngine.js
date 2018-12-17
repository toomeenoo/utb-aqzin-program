/**
 * Interpretace vstupních dat pomocí
 * Bézierových křivek
 * Tomáš MOLINARI 2018
 */
RenderCore.prototype.Bezier = function(RenderCore){
    var s = this;//Instance
    var points = [];
    var mouse = {x:-9999999999, y:-9999999999};
    var color = "#ff8800";
    this.points = points;
    function pointGetControls(prev, point, next, smoothing){
        var before = {x: ((point.x-prev.x)*smoothing/2), y: 0};
        var after = {x: ((next.x-point.x)*smoothing/2), y: 0}
        var rise = 1/((prev.x - next.x)/(prev.y - next.y));
        before.y =  point.y + before.x*rise*-1;
        after.y = point.y + after.x*rise;
        before.x = point.x - before.x;
        after.x += point.x ;
        return { before: before, after: after };
    }
    this.handleClick = function(x, y){
        var p = RenderCore.pointRecompute(x, y)
        //this.addPoint(p.x,p.y);
        var i = 1;
        var diff = -1;
        while(i < points.length - 1){
            if(points[i-1].x < p.x && points[i+1].x > p.x ){
                if(diff < 0){
                    diff = Math.abs(p.x-points[i].x);
                }else{
                    points[diff>Math.abs(p.x-points[i].x)? i : i-1].y = p.y;
                }
            }
            i++;
        }
    };
    RenderCore.ctx.canvas.addEventListener("click", function(evt){
        s.handleClick(evt.layerX, evt.layerY);
        /* testing output
        var p = RenderCore.pointRecompute(evt.layerX, evt.layerY);
        console.log(s.getValue(p.x));
        */
    });
    RenderCore.ctx.canvas.addEventListener("mousemove", function(evt){
        mouse = RenderCore.pointRecompute(evt.layerX, evt.layerY);
        if(evt.buttons > 0)
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
                var dist = Math.sqrt(Math.pow(Math.abs(mouse.x-points[i].x),2)+Math.pow(Math.abs(mouse.y-points[i].y),2));
                if(dist < 150){
                    RenderCore.lineColor = "transparent";
                    RenderCore.fillColor = "rgba(255,255,255,"+1/(dist/8)+")";    
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
        var max = Math.ceil(RenderCore.config.w/xRes)+2;
        var i = -Math.floor(max/2);
        //console.log(RenderCore.config.w, xRes, RenderCore.config.w/xRes);
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
    this.getValue = function(x){
        //P = (1−t)^3 P1 + 3(1−t)^2 tP2 +3(1−t)t^2 P3 + t^3 P4
        var i = 1;
        while(i < points.length - 2){
            if(points[i].x <= x && points[i+1].x > x ){
                if(points[i].x == x)
                    return points[i].y;
                var t = (x-points[i].x)/(points[i+1].x - points[i].x);
                var startC = pointGetControls(points[i-1], points[i], points[i+1], RenderCore.config.smoothing);
                var endC = pointGetControls(points[i], points[i+1], points[i+2], RenderCore.config.smoothing);
                return (1-t)*(1-t)*(1-t)*points[i].y + 3*(1-t)*(1-t)*t*startC.after.y + 3*(1-t)*t*t*endC.before.y + t*t*t*points[i+1].y;
            }
            i++;
        }
    }
    this.defaultPoints = function(){
        //Before start
        this.addPoint(-110, 0);
        this.addPoint(-100, 0);
        //At end
        this.addPoint(RenderCore.config.w+100, 0);
        this.addPoint(RenderCore.config.w+110, 0);
        this.addPoint(RenderCore.config.w+120, 0);
        //Data
        this.renderMath(RenderCore.config.renderMath, RenderCore.config.dynRes, RenderCore.config.zoomX, RenderCore.config.zoomY);
    }
    
    this.defaultPoints();
    if(this.Discretize){
        this.DiscretizeInstance = new this.Discretize(RenderCore, s);
        RenderCore.registerAction(this.DiscretizeInstance.loop);
    }
}
