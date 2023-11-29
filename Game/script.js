let direction = 'top'
let speed_player = 5
let texto_codernadas = document.querySelector('.cordenadas')
let player = []
let score = 0
let vidas = 0
let startScreen = document.querySelector('.start')




let gameArea = {
    gameover: false,
    canvas: document.getElementById('canvas'),
    start: function () {
        this.context = this.canvas.getContext('2d')
        this.interval = setInterval(gameUpdate, 40) //define um time para executar a function 'gameUpdate'
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height) // limpa a tela 
    }
}

function gameUpdate() {
    gameArea.clear()
    drawSnake()
    fruit.update()
    generateTail()
    EatFood()
    movement()
    colision()
    gameover()
    colisionSegment()
    textScore.text = 'Score : ' + score
    textScore.update()
    textVidas.text = 'Vidas : ' + vidas
    textVidas.update()

}

function colision(){
    let head=player[0]
    let y = head.y 
    let x = head.x 
    if(y < 0 || y > gameArea.canvas.height || x > gameArea.canvas.width || x < 0)
    {
        vidas = vidas - 1;
        head.x = 200; 
        head.y = 300;
        direction = ' '

    }

}
const gameover = () => {
    if(vidas <= 0){
        clearInterval(gameArea.interval)
        gameArea.clear()
        startScreen.style.display = 'flex'
    }
}

function EatFood() {
    let head = player[0]
    if (fruit.checkColision(head.x, head.y, 50, 50)) {
        generateFood()
        score++

    }
}

function generateTail() {
    let head = player[0]
    if (fruit.checkColision(head.x, head.y, 50, 50)) {
            player[player.length] = {x : head.x, y: head.y}
            console.log(player.length)
    }
}

function generateFood() {
    fruit.x = Math.floor(Math.random() * gameArea.canvas.width)
    fruit.y = Math.floor(Math.random() * gameArea.canvas.height)
}

function movement() {
    let head = {x : player[0].x, y: player[0].y}
    switch (direction) {
        case 'top':
            head.y -= speed_player
            break
        case 'down':
            head.y += speed_player
            break
        case 'left':
            head.x -= speed_player
            break
        case 'right':
            head.x += speed_player
            break
    }
    let tail = player.pop(head);
    tail.x = head.x;
    tail.y = head.y;
    player.unshift(tail);
}


function colisionSegment(){
    if(player.length > 12){
        let head = player[0]
        for(let i = 1 ; i <= player.length-1; i++){
            if(head.x === player[i].x && head.y === player[i].y){
                vidas = vidas - 1
                head.x = gameArea.canvas.width / 2
                head.y = gameArea.canvas.height / 2
            }
        }
    }
}


document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            direction = 'top'
            break
        case 'ArrowDown':
            direction = 'down'
            break
        case 'ArrowLeft':
            direction = 'left'
            break
        case 'ArrowRight':
            direction = 'right'
            break
    }
})

function component(x, y, color, width, height) {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.update = function () {
        ctx = gameArea.context
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    this.checkColision = function (x, y, x_width, y_height) {
        return this.x < x + x_width
            && this.height + this.x > x
            && this.y < y + y_height
            && this.height + this.y > y

    }
    this.checkColisionWall = function () {
        let bottom = gameArea.canvas.width - this.x
        let colidiu = false;
        if (this.y > gameArea.canvas.height) {
            colidiu = true
        }
        if (this.y < -10) {
            colidiu = true
        }
        if (this.x < -10) {
            colidiu = true
        }
        if (this.x > gameArea.canvas.width) {
            colidiu = true
        }

        return colidiu
    }
}
function drawSnake(color = 'darkgreen') {
    ctx = gameArea.context
    ctx.fillStyle = this.color
    player.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 50, 50)
    })
}
function setText(text, x, y) {
    ctx = gameArea.context
    this.text = text
    this.y = y 
    this.x = x
    ctx.font = '20pt arcade'
    ctx.fillStyle = 'darkgreen'
    this.update = () => {
        ctx.fillText(this.text, this.x, this.y)
    }
}


function START() {
    gameArea.start()
    startScreen.style.display = 'none'
    vidas = 1
    score = 0
    fruit = new component(300, 300, 'darkgreen', 30, 30)
    textScore = new setText('Score : 0',10, 490)
    textVidas = new setText(`Vidas : ${vidas}`,190, 490)
    player = [{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },]
    direction = 'down'
    generateFood()
    //texto_codernadas.innerText = 'CORDENADAS X: ' +  player.x + 'CORDENADAS Y: ' + player.y
}
