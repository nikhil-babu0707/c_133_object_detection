Status = "";
objects = [];


function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDectector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "status : Detecting Objects";
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (Status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDectector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Dectected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects dected are : " + objects.length;

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelloaded() {
    console.log("I am loaded");
    Status = true;
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}