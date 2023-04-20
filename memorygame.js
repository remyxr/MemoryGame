function showDiv() {
    document.getElementById('start').style.display = "block";
}

let clickedCard = null;
let preventClick = false;
let hiScore = localStorage.getItem("high-score");
let score = 0;
document.getElementById('high-score').innerHTML = hiScore;


const colors = [
    'red',
    'purple',
    'blue',
    'green',
    'pink',
]

const cards = [...document.querySelectorAll('.card')];
for (let color of colors) {
    const cardAIndex = parseInt(Math.random() * cards.length);
    const cardA = cards[cardAIndex];
    cards.splice(cardAIndex, 1);
    cardA.className += ` ${color}`
    cardA.setAttribute('data-color', color)

    const cardBIndex = parseInt(Math.random() * cards.length);
    const cardB = cards[cardBIndex]
    cards.splice(cardBIndex, 1);
    cardB.className += ` ${color}`
    cardB.setAttribute('data-color', color)
    
}
function reset() {
    let resetDiv = document.querySelectorAll('.card');
    for (let i = 0; i < resetDiv.length; i++) {
        resetDiv[i].classList.add('color-hidden')
    }

}

 
function scoreBoard() {
    let scoreSheet = document.getElementById('score');
    if (cardA === cardB) {
        score = score + 1;
        document.getElementById('score').innerHTML = "Score: " + score;
    
    }
}
function onClicked(e) {
    const target = e.currentTarget;
    
    if (
        preventClick || 
        target === clickedCard || target.className.includes('done')
    ){
        return;
    }

    target.className = target.className.replace('color-hidden', '').trim();
    target.className += ' done';
    

    if (!clickedCard) {
        clickedCard = target;

    } else if (clickedCard) {
       
        if
            (clickedCard.getAttribute('data-color') !==
            target.getAttribute('data-color') 
            
        ) {
            preventClick = true;
            setTimeout(() => {
                clickedCard.className =
                    clickedCard.className.replace('done', '').trim() +
                    ' color-hidden';
                target.className =
                    target.className.replace('done', '').trim() +
                ' color-hidden';
                clickedCard = null;
                preventClick = false;
            }, 1000);
        } else {
            score++;
            clickedCard = null;
            document.getElementById('score').innerHTML = "Score: " + score;
             
            }
            if (score === 5) {
                alert('YOU WON THE GAME!')
        }
    }
}

score.text = score;