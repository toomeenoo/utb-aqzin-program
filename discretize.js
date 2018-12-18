/**
 * Dskretizuje vstupní data
 * podle zvolených parametrů
 * Tomáš MOLINARI 2018
 */
RenderCore.prototype.Bezier.prototype.Discretize = function(RenderCore, BezierInstance){
    this.loop = function(){
        var max = Math.ceil(RenderCore.config.w/RenderCore.config.sampling)+2;
        var i = 0;
        while(i<max){
            var x = i*RenderCore.config.sampling;

            /* Math perfect sampling recognition */
            var y = Math.round(BezierInstance.getValue(x)/RenderCore.config.quantInterval)*RenderCore.config.quantInterval;
            
            /* Standart sampling recognition (round down) *
            var y = BezierInstance.getValue(i*RenderCore.config.sampling);
            y = y - (y%RenderCore.config.quantInterval);
            /*  */

            /* render point *
            RenderCore.lineColor = "#00ff88";
            RenderCore.crossHair({y: y, x: x},4);
            /*  */

            /* render cell */
            var j = y/RenderCore.config.quantInterval;
            RenderCore.lineColor = "#003388";
            if(!(isNaN(j) || j > 999999999 || j < -999999999)){
                while(j != 0){
                    RenderCore.line({y:j*RenderCore.config.quantInterval, x:x}, {y:j*RenderCore.config.quantInterval, x:x+RenderCore.config.sampling});
                    j = j > 0 ? j-1 : j+1;
                }
            }
            RenderCore.lineColor = "#0044AA";
            RenderCore.line({y:0, x:x}, {y:y, x:x});
            RenderCore.line({y:y, x:x+RenderCore.config.sampling}, {y:0, x:x+RenderCore.config.sampling});
            RenderCore.line({y:0, x:x}, {y:0, x:x+RenderCore.config.sampling});
            RenderCore.lineColor = "#00FF88";
            RenderCore.line({y:y, x:x}, {y:y, x:x+RenderCore.config.sampling});
            i++;
        }
    }
}
