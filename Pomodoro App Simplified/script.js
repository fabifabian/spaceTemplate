if(localStorage.length==0){
    localStorage.setItem('firstTime', 'true')
}
if(localStorage.getItem('firstTime')=='true'){
    localStorage.setItem('firstTime', 'false')
    localStorage.setItem('theme', '1')
    localStorage.setItem('workTimer', 25*60)
    localStorage.setItem('breakTimer', 5*60)
    console.log(localStorage)
}

var inputWork = document.getElementById('workValue')
var inputBreak = document.getElementById('breakValue')
var inputSound = document.getElementById('sounds')
inputWork.value = parseInt(localStorage.getItem('workTimer'))/60
inputBreak.value = parseInt(localStorage.getItem('breakTimer'))/60
inputWork.addEventListener('change', changeWorkValue)
inputBreak.addEventListener('change', changeBreakValue)

var pomodoro = inputWork.value*60;
var shortbreak = inputBreak.value*60;
var timer = 0;
var timerRightNow = 'Start';
var paused = false;
var yesOrNo = 'not set';
var interval;
var i = 0;
var r = document.querySelector(':root');
var theme = parseInt(localStorage.getItem('theme'));

var audio = new Audio('content/sounds/notify.mp3');
var timerTitle = document.getElementById('timerTitle')
var timerState = document.getElementById('timerState')
var windowAlert = document.getElementById('alert')
var windowSettings = document.getElementById('settingswindow')
var buttonSettings = document.getElementById('settings')
var buttonExit = document.getElementById('settingsClose')
var buttonReset = document.getElementById('reset')
var buttonYes = document.getElementById('yes')
var buttonNo = document.getElementById('no')
var buttonStartSetup = document.getElementById('startSetup')
var buttonStart = document.getElementById('start')
var buttonPause = document.getElementById('pause')
buttonStartSetup.addEventListener("click", startTimer);
buttonStart.addEventListener("click", playTimer);
buttonPause.addEventListener("click", pauseTimer);
buttonReset.addEventListener("click", resetTimer);
buttonYes.addEventListener("click", turnYes);
buttonNo.addEventListener("click", turnNo);
buttonExit.addEventListener("click", exitSettings);
buttonSettings.addEventListener("click", openSettings);

var theme1 = document.getElementById('theme1')
var theme2 = document.getElementById('theme2')
var theme3 = document.getElementById('theme3')
var theme4 = document.getElementById('theme4')
theme1.addEventListener("click", setTheme1)
theme2.addEventListener("click", setTheme2)
theme3.addEventListener("click", setTheme3)
theme4.addEventListener("click", setTheme4)

buttonStart.style.display = 'none'
buttonPause.style.display = 'none'
buttonReset.style.display = 'none'


changeBreakValue()
changeWorkValue()


function startTimer(){
    timerState.textContent = 'Work'
    clearInterval(interval)
    i = 0;
    pomodoro = inputWork.value*60;
    shortbreak = inputBreak.value*60;
    timer = pomodoro+shortbreak
    buttonStartSetup.style.display = 'none'
    buttonPause.style.display = 'inline'
    buttonStart.style.display = 'none'
    buttonReset.style.display = 'inline'
    interval = setInterval(function (){
        if(i<timer){
            if(paused==false){
                i++
            }else{
                buttonPause.style.display = 'none'
                buttonStart.style.display = 'inline'
            }
            if((timer-i)<shortbreak){
                
                timerRightNow = 'Short Break';
                timerTitle.textContent = addZero(Math.floor((timer-i)/60))+':'+addZero((timer-i)%60)
                if((timer-i)==shortbreak-1 && inputSound.checked == true){
                    audio.play();
                }
                if((timer-i)==1 && inputSound.checked == true){
                    audio.play();
                }
            } else {
                
                timerRightNow ='Work';
                timerTitle.textContent = addZero(Math.floor(((timer-i)-shortbreak)/60))+':'+addZero(((timer-i)-shortbreak)%60)
            }
            timerState.textContent = timerRightNow
        } else {
            i=0;
        }
    },1000)
}


function pauseTimer(){
    paused = true;
    buttonPause.style.display = 'none'
    buttonStart.style.display = 'inline'
}

function playTimer(){
    paused = false;
    buttonPause.style.display = 'inline'
    buttonStart.style.display = 'none'
}

function addZero(x){
    if(x<10){
        return '0' + x
    } else{
        return x
    }
}

function resetTimer(){
    windowAlert.style.display = 'block'
    if(yesOrNo == 'not set'){
        setTimeout(resetTimer,  100);
    } else {
        if(yesOrNo == 'yes'){
            clearInterval(interval)
            pomodoro = inputWork.value*60;
            shortbreak = inputBreak.value*60;
            timerState.textContent = 'Start'
            timer = pomodoro+shortbreak
            timerTitle.textContent = addZero(Math.floor(((timer)-shortbreak)/60))+':'+addZero(((timer)-shortbreak)%60)
            i = 0
            yesOrNo = 'not set'
            buttonStartSetup.style.display = 'inline'
            buttonReset.style.display = 'none'
            buttonStart.style.display = 'none'
            buttonPause.style.display = 'none'
            windowAlert.style.display = 'none'
            paused = false;
        } else if(yesOrNo == 'no'){
            windowAlert.style.display = 'none'
            yesOrNo = 'not set'
        }
    }
    
}

function turnYes(){
    yesOrNo = 'yes'
}
function turnNo(){
    yesOrNo = 'no'
}

function openSettings(){
    windowSettings.style.right = 0
}
function exitSettings(){
    windowSettings.style.right = '-90vw'
}

function changeWorkValue(){
    localStorage.setItem('workTimer', inputWork.value*60)
    localStorage.setItem('breakTimer', inputBreak.value*60)
    if(timer-i==timer){
        pomodoro = inputWork.value*60;
        shortbreak = inputBreak.value*60;
        timer = pomodoro+shortbreak
        timerTitle.textContent = addZero(Math.floor(((timer)-shortbreak)/60))+':'+addZero(((timer)-shortbreak)%60)
    }
}

function changeBreakValue(){
    localStorage.setItem('workTimer', inputWork.value*60)
    localStorage.setItem('breakTimer', inputBreak.value*60)
    if(timer-i==timer){
        pomodoro = inputWork.value*60;
        shortbreak = inputBreak.value*60;
        timer = pomodoro+shortbreak
    }
}


if(theme == 1){
    setTheme1()
} else if(theme == 2){
    setTheme2()
} else if(theme == 3){
    setTheme3()
} else if(theme == 4){
    setTheme4()
}

function setTheme1(){
    r.style.setProperty('--timerBgcolor', '#1572A1')
    r.style.setProperty('--settingsBgcolor', '#42a1d1')
    r.style.setProperty('--fontcolor', '#ffffff')
    theme1.classList.add('selected')
    theme2.classList.remove('selected')
    theme3.classList.remove('selected')
    theme4.classList.remove('selected')
    theme = 1;
    localStorage.setItem('theme', 1)
}

function setTheme2(){
    r.style.setProperty('--timerBgcolor', '#876445')
    r.style.setProperty('--settingsBgcolor', '#CA965C')
    r.style.setProperty('--fontcolor', '#fffcf7')
    theme1.classList.remove('selected')
    theme2.classList.add('selected')
    theme3.classList.remove('selected')
    theme4.classList.remove('selected')
    theme = 2;
    localStorage.setItem('theme', 2)
}

function setTheme3(){
    r.style.setProperty('--timerBgcolor', '#393E46')
    r.style.setProperty('--settingsBgcolor', '#222831')
    r.style.setProperty('--fontcolor', '#EEEEEE')
    
    theme1.classList.remove('selected')
    theme2.classList.remove('selected')
    theme3.classList.add('selected')
    theme4.classList.remove('selected')
    theme = 3;
    localStorage.setItem('theme', 3)
}

function setTheme4(){
    r.style.setProperty('--timerBgcolor', '#1A1A40')
    r.style.setProperty('--settingsBgcolor', '#100529')
    r.style.setProperty('--fontcolor', '#EEEEEE')
    theme1.classList.remove('selected')
    theme2.classList.remove('selected')
    theme3.classList.remove('selected')
    theme4.classList.add('selected')
    theme = 4;
    localStorage.setItem('theme', 4)
}