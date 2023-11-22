let direction = 'top'
let speed_player = 5
let texto_codernadas = document.querySelector('.cordenadas')

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
    movement() // Movimentacao do player
    player.update()
    fruit.update()
    if (player.checkColisionWall()) { player.y = 200; player.x = 200 }
    EatFood()
    tail_square.update()
    document.querySelector('.codernadas').innerHTML = 'CORDENADAS X: ' + player.x + '<br>' + 'CORDENADAS Y: ' + player.y

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

function EatFood() {
    if (player.checkColision(fruit.x, fruit.y, fruit.width, fruit.height)) {
        tail.push({ x: player.x -20, y: player.y })
        tail_square.update()
        console.log('teste')
    }
}

function movement() {
    switch (direction) {
        case 'top':
            player.y -= speed_player
            break
        case 'down':
            player.y += speed_player
            break
        case 'left':
            player.x -= speed_player
            break
        case 'right':
            player.x += speed_player
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
function drawTail(color, width, height) {

    this.color = color
    this.width = width
    this.height = height
    this.update = function () {
        ctx = gameArea.context
        ctx.fillStyle = this.color
        for (let i = 0; i <= tail; i++) {
            ctx.fillRect(tail[i].x - 20, tail[i].y, this.width, this.height)
        }
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


function START() {
    document.querySelector('.start').style.display = 'none'
    gameArea.start()
    player = new component(200, 200, 'darkgreen', 50, 50)
    tail = [{x : player.x - 20, y : player.y}]
    fruit = new component(300, 300, 'darkgreen', 30, 30)
    tail_square = new drawTail('red', 50, 50)
    //texto_codernadas.innerText = 'CORDENADAS X: ' +  player.x + 'CORDENADAS Y: ' + player.y
}