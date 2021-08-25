song="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleft=0;
scoreright=0;
function preload() {
    song=loadSound("music.mp3");

}

function setup() {
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelloaded);
    posenet.on('pose',gotposes);
}


function draw() {
    image(video, 0,0,600,500);
    fill("red");
    stroke("red");
    if(scoreright>0.2)
    {
        circle(rightwristx,rightwristy,20);
        if(rightwristy>0 &&rightwristy<=100)
        {
            document.getElementById("speed").innerHTML="speed=0.5";
            song.rate(0.5);
        }
        else if(rightwristy>100 &&rightwristy<=200)
        {
            document.getElementById("speed").innerHTML="speed=0.5";
            song.rate(1);

        }
        else if(rightwristy>200 &&rightwristy<=300)
        {
            document.getElementById("speed").innerHTML="speed=0.5";
            song.rate(1.5);
        }   
    
    else if(rightwristy>300 &&rightwristy<=400)
        {
            document.getElementById("speed").innerHTML="speed=0.5";
            song.rate(2);
        }
    }
    if(scoreleft>0.2)
    {
        circle(leftwristx,leftwristy,20);
        num_leftwrist=Number(leftwristy);
        new_leftwrist=floor(num_leftwrist*2);
        d=new_leftwrist/1000;
        document.getElementById("volume").innerHTML="volume= "+d;
        song.setVolume(d);

    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelloaded(){
    console.log("moadelloaded")
}


function gotposes(results) {
    if(results.length > 0)
    {
        scoreleft=results[0].pose.keypoints[9].score;
        scoreright=results[0].pose.keypoints[10].score;
        console.log("scoreleft= "+scoreleft+"scoreright"+scoreright);

        console.log(results);
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;

        console.log("leftwristx= "+leftwristx+"leftwristy= "+leftwristy);

        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;

        console.log("rightwristx= "+rightwristx+"rightwristy= "+rightwristy);


    }

}