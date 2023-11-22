let gameArea = {
    canvas : document.getElementById('canvas'),
    start : function() {
        this.context = this.canvas.getContext('2d')
        this.interval = setInterval(gameUpdate, 20)
    },
    clear : function(){
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height)
    } 
}

function gameUpdate(){
    gameArea.clear()

    player.update()

}

function component(x,y,color,width,height) {
    this.x = x
    this.y = y 
    this.color = color
    this.width = width
    this.height = height
    this.update = function(){
        ctx = gameArea.context
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    this.checkColision = function(x, y, x_width, y_height) {
        return this.x < x + x_width  
        && this.height + this.x > x
        && this.y < y + y_height
        && this.height + this.y > y

    }
}


function START(){
    document.querySelector('.start').style.display = 'none'
    gameArea.start()
    player = new component(200, 200, 'darkgreen', 50, 50)

}