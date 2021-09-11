window.inputHandler = {
    initialize: function (objRef, minScale, maxScale, curStep) {

        lastDbUpdate: Date.now();
        container = document.getElementById("canvas-container");
        currentInstance = objRef;
        min_scale = minScale;
        max_scale = maxScale;
        step = curStep;

        bindCanvas(container);

        zoomControl = document.getElementById("main-game-zoom-slider");
        zoomControl.value = 1;
        zoomControl.addEventListener("input", function (e) {
            cur_scale = parseFloat(zoomControl.value).toFixed(1);
            if (cur_scale != last_scale) {
                inputHandler.zoom(cur_scale);
                last_scale = cur_scale;
            }
        });

        var zoomIn = document.getElementById("main-game-zoom-slider-plus");
        zoomIn.addEventListener("click", function () {
            var new_scale = parseFloat(cur_scale) + step;
            new_scale = new_scale.toFixed(1);
            if (new_scale <= max_scale) {
                inputHandler.zoom(new_scale);
            }
        });

        var zoomOut = document.getElementById("main-game-zoom-slider-minus");
        zoomOut.addEventListener("click", function () {
            var new_scale = parseFloat(cur_scale) - step;
            new_scale = new_scale.toFixed(1);
            if (new_scale >= min_scale) {
                inputHandler.zoom(new_scale);
            }
        });

        inputHandler.bindTokens();
    },
    zoom: function (scale) {
        container.style.webkitTransform = "scale3d(" + scale + ", " + scale + ", 1)";
        if (scale != cur_scale) {
            cur_scale = scale;
            last_scale = scale;
            zoomControl.value = scale;
        }
    },
    bindTokens: function () {
        //var tokens = document.getElementsByClassName("token");
        //tokenHammers = new Array(tokens.length);
        //for (i = 0; i < tokens.length; i++) {
        //    tokenHammers[i] = new Hammer(tokens[i], {});
        //    tokenHammers[i].on('panstart pan panend', tokenMove);
        //}
    }
}

let min_scale;
let max_scale;
let step;
let cur_scale = 1;
let last_scale = 1;
let container;
let zoomControl;
let tokenHammers;
let hammertime;
let tokenDragging;
let currentInstance;

function bindCanvas(elem) {
    hammertime = new Hammer(elem, {});
    hammertime.get('pinch').set({
        enable: true
    });
    var posX = window.scrollX,
        posY = window.scrollY;

    var tokenPosX = 0,
        tokenPosY = 0;

    hammertime.on('tap doubletap pan panstart panend pinch pinchend', function (ev) {
        //if (ev.type == "doubletap") {
        //    transform =
        //        "translate3d(0, 0, 0) " +
        //        "scale3d(2, 2, 1) ";
        //    scale = 2;
        //    last_scale = 2;
        //    try {
        //        if (window.getComputedStyle(el, null).getPropertyValue('-webkit-transform').toString() != "matrix(1, 0, 0, 1, 0, 0)") {
        //            transform =
        //                "translate3d(0, 0, 0) " +
        //                "scale3d(1, 1, 1) ";
        //            scale = 1;
        //            last_scale = 1;
        //        }
        //    } catch (err) { }
        //    el.style.webkitTransform = transform;
        //    transform = "";
        //}

        //tap
        if (ev.type == "tap") {
            posX = window.scrollX;
            posY = window.scrollY;
        }

        if (ev.type == "panstart") {
            console.log(ev.target.localName);
            if (ev.target.localName == "div") {
                tokenDragging = ev.target.parentElement;
                var dx = parseFloat(tokenDragging.style.left, 10);
                var dy = parseFloat(tokenDragging.style.top, 10);
                tokenPosX = dx - (dx % 50);
                tokenPosY = dy - (dy % 50);
            }
        }

        //pan    
        if (ev.type == "pan") {
            if (tokenDragging == null) {
                window.scrollTo(posX - ev.deltaX, posY - ev.deltaY);
            } else {
                var curX = parseFloat(tokenDragging.style.left, 10);
                var curY = parseFloat(tokenDragging.style.top, 10);
                var newX = tokenPosX + (ev.deltaX - (ev.deltaX % 50));
                var newY = tokenPosY + (ev.deltaY - (ev.deltaY % 50));
                if (curX != newX || curY != newY) {
                    var newX = tokenPosX + (ev.deltaX - (ev.deltaX % 50));
                    var newY = tokenPosY + (ev.deltaY - (ev.deltaY % 50));
                    tokenDragging.style.left = newX + "px";
                    tokenDragging.style.top = newY + "px";
                }

                //if (((ev.deltaX - (ev.deltaX % 50)) == 0) || ((ev.deltaX - (ev.deltaX % 50)) == 0)) {
                //    var newX = tokenPosX + (ev.deltaX - (ev.deltaX % 50));
                //    var newY = tokenPosY + (ev.deltaY - (ev.deltaY % 50));
                //    console.log(newX, newY);
                //    tokenDragging.style.left = newX + "px";
                //    tokenDragging.style.top = newY + "px";
                //}
                
            }
        }

        if (ev.type == "pinchend") {
            last_scale = cur_scale;
        }

        //panend
        if (ev.type == "panend") {
            if (tokenDragging != null) {
                var charId = parseInt(tokenDragging.dataset.characterId);
                var newX = tokenPosX + (ev.deltaX - (ev.deltaX % 50));
                var newY = tokenPosY + (ev.deltaY - (ev.deltaY % 50));
                console.log(charId, newX, newY);
                currentInstance.invokeMethodAsync("TokenMove", charId, newX, newY);
                tokenDragging = null;
            }
            posX = window.scrollX;
            posY = window.scrollY;
        }

        //pinch
        if (ev.type == "pinch") {
            cur_scale = Math.max(min_scale, Math.min(last_scale * (ev.scale), max_scale));
            zoomControl.value = cur_scale;
            inputHandler.zoom(cur_scale);
        }
    });
}