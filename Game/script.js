let direction = 'top'
let speed_player = 5
let texto_codernadas = document.querySelector('.cordenadas')
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
    object.update()
    fruit.update()
    generateNewTail()
    movement()
    scoreText.text = "score : " + score;
    scoreText.update()
    // Movimentacao do player
    if (object.checkColisionWall()) {
        player[0].y = 200;
        player[0].x = 200;
        direction = "right"
    }
    document.querySelector('.codernadas').innerHTML = 'CORDENADAS X: ' + player[0].x + '<br>' + 'CORDENADAS Y: ' + player[0].y

    //if(!gameArea.gameover){

    /*} else {
        clearInterval(gameArea.interval)
        gameArea.context.clearRect(player.x, player.y, player.width, player.height)
        gameArea.context.clearRect(fruit.x, fruit.y, fruit.width, fruit.height)
        player = null
        fruit = null
    } */
}

function gameover() {
    gameArea.gameover = true
}
function scoreUp() {
    let audio = document.getElementById('myAudio')
    audio.play()
}

function generateNewTail() {
    let head = player[0]
    if (object.checkColision(fruit.x, fruit.y, fruit.width, fruit.height)) {
        
        eatfood()
        player[player.length] = { x: head.x, y: head.y }

    }
}
function eatfood() {

    dados = criarComida()
    fruit.x = dados.x
    fruit.y = dados.y 
    score++
}

function movement() {
    let x = player[0].x
    let y = player[0].y
    switch (direction) {
        case 'top':
            y -= speed_player
            break
        case 'down':
            y += speed_player
            break
        case 'left':
            x -= speed_player
            break
        case 'right':
            x += speed_player
            break

    }
    let tail = player.pop();
    tail.x = x;
    tail.y = y;
    player.unshift(tail);

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

function criarComida() {
    r_x = Math.floor(Math.random() * gameArea.canvas.width - 10)
    r_y = Math.floor(Math.random() * gameArea.canvas.height - 10)
    return { r_x, r_y }
}

function drawTail(color) {

    this.color = color
    this.update = function () {
        ctx = gameArea.context
        ctx.fillStyle = this.color
        player.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, 50, 50)
        });
    }
    this.checkColision = function (x, y, x_width, y_height) {
        return player[0].x < x + x_width
            && 50 + player[0].x > x
            && player[0].y < y + y_height
            && 50 + player[0].y > y

    }
    this.checkColisionWall = function () {
        let bottom = gameArea.canvas.width - player[0].x
        let colidiu = false;
        if (player[0].y > gameArea.canvas.height) {
            colidiu = true
        }
        if (player[0].y < -10) {
            colidiu = true
        }
        if (player[0].x < -10) {
            colidiu = true
        }
        if (player[0].x > gameArea.canvas.width) {
            colidiu = true
        }

        return colidiu
    }
}

function setText(text, x, y, color) {
    this.text = text;
    this.x = x
    this.y = y
    this.color = color
    this.update = () => {
        ctx = gameArea.context
        ctx.font = "25pt arcade"
        ctx.fillStyle = this.color
        ctx.fillText(this.text, this.x, this.y)
    }
}

function START() {
    document.querySelector('.start').style.display = 'none'
    gameArea.start()
    player = [{ x: gameArea.canvas.width / 2, y: gameArea.canvas.height / 2 }]
    fruit = new component(300, 300, 'darkgreen', 30, 30)
    object = new drawTail("green")
    scoreText = new setText('score : 0', 10, gameArea.canvas.height - 10, 'green')
    //texto_codernadas.innerText = 'CORDENADAS X: ' +  player.x + 'CORDENADAS Y: ' + player.y
}