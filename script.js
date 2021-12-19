let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32
let snake = [{
        x: 8* box, 
        y: 8 * box
    }]
let dir = "right"
let score = 0
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function arrow(tecla) {
    if(tecla == 'left' && dir != 'right') dir = 'left'
    if(tecla == 'up' && dir != 'down') dir = 'up'
    if(tecla == 'right' && dir != 'left') dir = 'right'
    if(tecla == 'down' && dir != 'up') dir = 'down'
}

function reset() {
    snake = [{
        x: 8* box, 
        y: 8 * box
    }]
    dir = "right"
    score = 0
    food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }
    updateScore()
    let jogo = setInterval(iniciarJogo, 100)
}

function iniciar() {
    criarBG()
    criarCobrinha()
}
iniciar()
function criarBG() {
    context.fillStyle = 'lightgreen'
    context.fillRect(0, 0, 16 * box, 16 * box)
}
function criarCobrinha() {
    for(let i = 0; i < snake.length; i++) {
        context.fillStyle = "black"
        context.strokeStyle = 'lightgreen';
        context.fillRect(snake[i].x, snake[i].y, box, box)
        context.stroke()
    }
}

document.addEventListener('keydown', update)

function update(event) {
    let tecla = event.keyCode
    if(tecla == 37 && dir != 'right') dir = 'left'
    if(tecla == 38 && dir != 'down') dir = 'up'
    if(tecla == 39 && dir != 'left') dir = 'right'
    if(tecla == 40 && dir != 'up') dir = 'down'
}

function checkDirection() {
    let x = snake[0].x
    let y = snake[0].y
    let total = 15 * box
    if(x > total && dir == 'right') snake[0].x = 0
    if(x < 0 && dir == 'left' ) snake[0].x = 16 * box
    if(y > total && dir == 'down') snake[0].y = 0
    if(y < 0 && dir == 'up' ) snake[0].y = 16 * box
}


function setFood(){
    food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }
}


function updateScore() {
    score++
    let scoreboard = document.querySelector('#score')
    scoreboard.innerText = score
}

function drawFood() {
    context.fillStyle = 'red'
    context.fillRect(food.x, food.y, box, box)
}
function checkGameOver() {
    for(let i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo)
            alert(`Game Over seu score foi de ${score}`)
        }
    }
}

function iniciarJogo() {
    criarBG()
    drawFood()
    checkDirection()
    criarCobrinha()

    
    let snakeX = snake[0].x
    let snakeY = snake[0].y
    
    if( dir == 'up') snakeY -= box
    if( dir == 'right') snakeX += box
    if( dir == 'down') snakeY += box
    if( dir == 'left') snakeX -=box

    checkGameOver()

    if(snakeX != food.x || snakeY != food.y){
        snake.pop()
    } else{
        updateScore()
        setFood()
    }

    let newHead  = {
        x: snakeX,
        y: snakeY
    }
    
    snake.unshift(newHead)

}

