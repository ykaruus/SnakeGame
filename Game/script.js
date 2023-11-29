let direction = 'top'
let speed_player = 5
let texto_codernadas = document.querySelector('.cordenadas')
let player = []
let score = 0
let gameArea = {
    gameover: false,
    canvas: document.getElementById('canvas'),
    start: function () {
        this.context = this.canvas.getContext('2d')
        this.interval = setInterval(gameUpdate, 20) //define um time para executar a function 'gameUpdate'
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height) // limpa a tela 
    }
}

function gameUpdate() {
    gameArea.clear()
    drawSnake()
    fruit.update()
    EatFood()
    movement()
    textScore.text = 'Score : ' + score
    textScore.update()
}

function gameover() {
    gameArea.gameover = true
}



function EatFood() {
    let head = player[0]
    if (fruit.checkColision(head.x, head.y, 50, 50)) {
        generateFood()
        score++

    }
}
function generateFood() {
    fruit.x = Math.floor(Math.random() * gameArea.canvas.width)
    fruit.y = Math.floor(Math.random() * gameArea.canvas.height)
}

function movement() {
    let head = player[0]
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
function setText(text) {
    ctx = gameArea.context
    this.text = text
    ctx.font = '20pt arcade'
    ctx.fillStyle = 'darkgreen'
    this.update = () => {
        ctx.fillText(this.text, 2, 490)
    }
}


function START() {
    document.querySelector('.start').style.display = 'none'
    gameArea.start()
    fruit = new component(300, 300, 'darkgreen', 30, 30)
    textScore = new setText('Score : 0')
    player = [{ x: 10, y: 10 }]

    generateFood()
    //texto_codernadas.innerText = 'CORDENADAS X: ' +  player.x + 'CORDENADAS Y: ' + player.y
}
