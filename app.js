const express = require('express')
const http = require('http')

const app = express()


const server = http.createServer(app)

const socketIO = require('socket.io')

const io = socketIO.listen(server)


server.listen(3000, () => {
    console.log('RUNNING')
})

const historic = []

app.use(express.static(__dirname+ "/public"))

io.on('connection', (socket) => {
        console.log("Nova Conexão")
        
        historic.forEach(linha => {
            socket.emit('desenhar', linha)
        })

        socket.on('desenhar', (linha) => {
            historic.push(linha)
            io.emit('desenhar', linha)
        })
})