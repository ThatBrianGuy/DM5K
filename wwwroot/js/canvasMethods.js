window.canvasMethods = {
    setDimensions: function (height, width) {
        var canvas = document.querySelector('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.width = width;
        canvas.height = height;
    },
    centerCanvas: function () {
        // Initialize position in the center
        var c = document.getElementById("canvas-container");
        var dy = c.clientHeight - window.innerHeight;
        var dx = c.clientWidth - window.innerWidth;
        var newX = 0;
        var newY = 0;
        if (dy > 0) { newY = dy / 2; }
        if (dx > 0) { newX = dx / 2; }
        window.scrollTo(newX, newY);
    }
}