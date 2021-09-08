window.inputHandler = {
    initialize: function (objRef) {
        container = document.getElementById("flex-grid-container");
        mainGameCanvas = document.getElementById("canvas-container");
        currentInstance = objRef;

        mc = new Hammer.Manager(container);
        mc.add(new Hammer.Tap());
        mc.add(new Hammer.Pan());

        mc.on('tap', tapHandler);
        mc.on('pan', panHandler);
        mc.on('panend', panEndHandler);
        mc.on('pinchin', pinchInHandler);
        mc.on('pinchout', pinchOutHandler);

        pos = {
            left: window.scrollX,
            top: window.scrollY
        };
    }
}

let mc;
let mainGameCanvas;
let currentInstance;
let container;
let pos = { top: 0, left: 0, x: 0, y: 0 };

const tapHandler = function (e) {   
    mainGameCanvas.classList.add('canvas-container-grabbing');
    pos = {
        left: window.scrollX,
        top: window.scrollY
    };
}

const panHandler = function (e) {

    window.scrollTo(pos.left - e.deltaX, pos.top - e.deltaY);

}

const panEndHandler = function (e) {
    pos.left = window.scrollX;
    pos.top = window.scrollY;
    mainGameCanvas.classList.remove('canvas-container-grabbing');
    selectedToken = null;
}

const pinchInHandler = function (e) {
    console.log('pinchin');
    var newScale = mainGameCanvas.style.zoom - 0.5;
    currentInstance.invokeMethodAsync('Zoom', newScale);
}

const pinchOutHandler = function (e) {
    console.log('pinchout');
    var newScale = mainGameCanvas.style.zoom + 0.5;
    currentInstance.invokeMethodAsync('Zoom', newScale);
}