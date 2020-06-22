

document.addEventListener('DOMContentLoaded',() =>{

    const socket = io.connect()

    const pen = {
        ready:false,
        moving:false,
        pos:{x:0, y:0},
        backPos:null
    }
    const tela = document.querySelector('#tela');
    const context = tela.getContext('2d');
    const corver = document.querySelector('#corver')
    const verde = document.querySelector('#verde')
    const azul = document.querySelector('#azul')
    const preto = document.querySelector('#preto')

    tela.width = 1080;
    tela.height = 720;
    
    //context.lineWidth = 7;
    //context.strokeStyle = 
    corver.addEventListener('click', ()=>{
        context.strokeStyle = 'red'
    })
    verde.addEventListener('click', ()=>{
        context.strokeStyle = 'green'
    })

    azul.addEventListener('click', ()=>{
        context.strokeStyle = 'blue'
    })

    preto.addEventListener('click', ()=>{
        context.strokeStyle = 'black'
    })
    
    


      
    const drawn = (linha) =>{


    
   

    context.beginPath();
    context.moveTo(linha.backPos.x,linha.backPos.y);
    context.lineTo(linha.pos.x,linha.pos.y);
    context.stroke()


 }

    tela.onmousedown = (evento) => {
        pen.ready = true
    };

    tela.onmouseup = (evento) => {
        pen.ready = false
    };

    tela.onmousemove = (evento) => {
        pen.pos.x = evento.clientX;
        pen.pos.y = evento.clientY;
        pen.moving = true;

            
    };

    socket.on('desenhar', (linha) => {
        drawn(linha)
    })

    const loop = () => {
        if(pen.ready && pen.moving && pen.backPos) {
            socket.emit('desenhar',{
                pos:pen.pos, backPos: pen.backPos
            } )
            //drawn()
            pen.moving = false;
        }
        pen.backPos = {x: pen.pos.x, y: pen.pos.y}

        setTimeout(loop, 10)
    }

    loop()

})



