const wordEl = document.getElementById("word");
const wrongLetterEL = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById("final-message-reveal-word");

const figureparts = document.querySelectorAll(".figure-part");
const words=["application","programming","interface","random","roshan","electronics"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters=[];
const WrongLetters=[]

//show hidden
function displayWord(){
    wordEl.innerHTML=`
    ${selectedWord.split('').map(letter=>{
        return `<span class="letter"> 
            ${correctLetters.includes(letter)?letter:""}
        </span>`
    }).join('')}
    `;

    const innerWord = wordEl.innerText.replace(/[\n]/g,'');
    if(innerWord===selectedWord)
    {
        finalMessage.innerText="Congrats!! You Won 😁";
        popup.style.display="flex";
        playable=false;
    }
}

function showNotification(){
    notification.classList.add("show");

    setTimeout(function(){
        notification.classList.remove("show");
    },2000);
}

function updateWrongLettersEl(){

    //display wrong letters
    wrongLetterEL.innerHTML=`
    ${WrongLetters.length>0?`<p>Wrong Letters</p>`:''}
    ${WrongLetters.map(letter=>`<span>${letter}</span>`)}`

    //build hangman body parts while checking for errors
    figureparts.forEach((part,index)=>{
        const errors = WrongLetters.length;
        if(index<errors){
            part.style.display="block";
        }
        else{
            part.style.display="none";
        }
    })

    if(WrongLetters.length===figureparts.length){
        finalMessage.innerText="You are a pathetic Loser😝😝";
        popup.style.display="flex";
        playable=false;
    }

}

//add event listener for key press
window.addEventListener('keydown',e=>{
    if(playable){
        if(e.keyCode>=65 && e.keyCode<=90)
        {
            const letter = e.key.toLowerCase();
            if(selectedWord.includes(letter))
            {
                if(!correctLetters.includes(letter))
                {
                    //letter in string
                    correctLetters.push(letter);
                    displayWord();
                }

                //if key already pressed
                else{
                    showNotification();
                }
            }

            //letter not in string
            else{
                if(!WrongLetters.includes(letter))
                {
                    WrongLetters.push(letter);
                    updateWrongLettersEl();
                }

                //letter not present in string but already pressed
                else{
                    showNotification();
                }
            }
        }
    }
})

//restart game
playAgainBtn.addEventListener('click',function(){
    playable=true;
    correctLetters.splice(0);
    WrongLetters.splice(0);

    selectedWord=words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLettersEl();
    popup.style.display="none";
})

displayWord();