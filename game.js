// @ts-check
// @types/jquery
var buttonColours=["red", "blue", "green", "yellow"],gamePattern=[],userClickedPattern=[],level=1,started=false;
$(document).on("keypress",function(){
    if(!started){
        started=true;
        nextSequence();
    }
});
$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(curLevel){
    if(gamePattern[curLevel] === userClickedPattern[curLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200); 
        
        startOver();
    }   
}

function nextSequence(){
    var randomNumber;
    $("h1").text("Level "+level);
    userClickedPattern=[];
    randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    ++level;
}

function playSound(name){
    var ad=new Audio("sounds/"+name+".mp3");
    ad.play();
}

function animatePress(curColour){
    $("#"+curColour).addClass("pressed");
    setTimeout(function(){
        $("#"+curColour).removeClass("pressed");
    }, 100); 
}



function startOver(){
    gamePattern=[];
    level=1;
    started=false;
}
