window.canvasMethods = {
    setDimensions: function (height, width, netObj) {
        var canvas = document.querySelector('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.width = width;
        canvas.height = height;

        window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
        window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
        window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
        window.addEventListener('keydown', preventDefaultForScrollKeys, false);
        window.onresize = function () {
            netObj.invokeMethodAsync("OnBrowserResize");
        }

    },
    scrollWindow: function (x, y, cx, cy) {
        var c = document.getElementById('main-game-container');
        c.scrollTo(x, y);
        console.log('scrolled to x:' + x + ', y:' + y + ', cx:' + cx + ', cy:' + cy);
    },
    getWindowDimensions: function () {
        var c = document.getElementById('main-game-container');
        return {
            width: c.clientWidth,
            height: c.clientHeight
        };
    },
    getScrollPosition: function () {
        var c = document.getElementById('main-game-container');
        return {
            x: c.scrollX,
            y: c.scrollY
        };
    },
    toggleFullscreen: function (state) {
        if (state) {
            document.getElementById('main-game-fullscreen-container').requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';