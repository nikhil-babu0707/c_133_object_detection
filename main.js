img = "";
Status = "";
objects = [];


function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDectector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "status : Detecting Objects"
}

function preload() {
    img = loadImage("dog_cat.jpg");
}

function draw() {
    image(img, 0, 0, 640, 420);
    if (Status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Dectected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelloaded() {
    console.log("I am loaded");
    Status = true;
    objectDectector.detect(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}