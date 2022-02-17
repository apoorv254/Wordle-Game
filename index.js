let attempts = 6;

const WORD = WORDS[Math.floor(Math.random() *  WORDS.length)];
const el = document.querySelector("#guess");

console.log("Target:", WORD);

var count=0;

function registerGuess(guess) {
    guess = guess.toUpperCase();
    const status = [];
    const WORD_LETTERS = WORD.split("");
    const ext = {};

    WORD_LETTERS.map((letter)=>{

        if(ext[letter]){
            ext[letter] += 1;
        }
        else{
            ext[letter] = 1;
        }
    })

   console.log('=>>>>>>>>>>.',ext);

    
    guess.split("").forEach(function(letter, index) {
        // TODO: handle additional letters when there are duplicates

        if(count===6)
        {
            return false;
        }
        let letterStatus;
        const isInPlace = WORD_LETTERS[index] === letter;

        if(isInPlace)
        {
             letterStatus=2;
             status[index]=2;
             ext[letter]--;
        }
        else
        {
              letterStatus=0;
              status[index]=0;
        }

        count++;
    })
    guess.split("").forEach(function(letter, index) {

        if(count===6)
        {
            return false;
        }
        
        let letterStatus;
        const isInPlace = WORD_LETTERS[index] === letter;

        const existsInWord =WORD_LETTERS.indexOf(letter)>-1;

        if( status[index]!==2 && existsInWord && ext[letter]>0 )
        {
             letterStatus=1;
             status[index]=1;
             ext[letter]--;
        }
    })


    printGuess(guess, status);
    return status;
}

el.focus();

el.addEventListener("blur", function(e) {
    el.focus();
})

document.addEventListener("focus", function(e) {
    el.focus();
})

el.addEventListener("change", function(e) {
    const userInput = e.target.value;
    if (userInput.length === 5) {
        const result = registerGuess(userInput);
        e.target.value = "";
        const event = new Event('input');
        e.target.dispatchEvent(event);
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        if (result.reduce(reducer) === 10) {
            el.classList.add("hidden");
            const victoryMessage = document.createElement("div");
            victoryMessage.innerText = "You won";
            document.body.appendChild(victoryMessage);
        }
    } else {
        console.log("Skip this");
    }
});

el.addEventListener("input", function(e) {
    const userInput = e.target.value;
    drawGhostInput(userInput);
});
