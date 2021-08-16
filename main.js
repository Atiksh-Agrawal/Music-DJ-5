song = "";

leftWristY = 0;
leftWristX = 0;
scoreLeftWrist = 0;

rightWristY = 0;
rightWristX = 0;
scoreRightWrist = 0;

function preload() {
    harry_potter = loadSound("music.mp3");
    peter_pan = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.position(400, 600);
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);

    posenet.on('pose', getPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("red");

    if (scoreLeftWrist > 0.2) {

        circle(leftWristX, leftWristY, 20);
        peter_pan.stop()

        if (harry_potter.isPlaying() == false) {
            harry_potter.play();
            document.getElementById(song_name).innerHTML = "Song playing : Harray Potter Theme Remix";
        }
    }

    if (scoreRightWrist > 0.2) {

        circle(rightWristX, rightWristY, 20);
        harry_potter.stop()

        if (peter_pan.isPlaying() == false) {
            peter_pan.play();
            document.getElementById(song_name).innerHTML = "Song playing : Peter Pan";
        }
    }
}

function modelLoaded() {
    console.log("posnet is initialized");
}

function getPoses(results) {
    if (results.length > 0) {

        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        leftWristY = results[0].pose.leftWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        console.log("Left Wrist X =" + leftWristX + "  Left Wrist Y = " + leftWristY);

        rightWristY = results[0].pose.rightWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        console.log("Right Wrist X =" + rightWristX + "  Right Wrist Y = " + rightWristY);
    }
}


function playMusic() {

    var name = document.getElementById("name").value;
    if (name == "peter_pan") {

        peter_pan.play();
    }

    if (name == "harry_potter") {

        harry_potter.play();
    }
}

function stopMusic() {
    harry_potter.stop();
    peter_pan.stop();
}