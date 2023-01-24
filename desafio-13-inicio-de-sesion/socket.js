import { Server } from 'socket.io'
import moment from 'moment'
import mensajesApiArchivo from './api/mensajesAPIArchivo.js'
import normalizar from './normalizr.js'

const mensajes = new mensajesApiArchivo;

let io;

let messages = {};
let products = [];

(async function () {
    try {
        const historialMensajes = await mensajes.listarAll();
        if (historialMensajes.length == 0) {
            mensajes.guardar({
                id: 'mensajes',
                mensajes: [{
                    email: "nico@gmail.com",
                    author: {
                        id: "nico@gmail.com",
                        nombre: 'Nicolas', 
                        apellido: 'Pedicino', 
                        edad: '0', 
                        alias: 'CoderHouse',
                        avatar: 'https://i.pinimg.com/280x280_RS/9b/20/ea/9b20ea6de7ec343daac5714717dc8cd2.jpg',
                    },
                    text: "Bienvenidos",
                    date: "01/01/2022 00:00:00",
                }]
            });
        }
        messages = historialMensajes;
    } catch (error) {
        console.error(error.message);
    }
})();

function initSocket(httpServer) {
    io = new Server(httpServer);
    setEvents(io);
}

function setEvents(io) {
    io.on('connection', (socketClient) => {
        console.log('Se conecto un nuevo cliente con el id', socketClient.id);
        
        const messagesNormalizados = normalizar(messages);

        socketClient.emit('history-messages', messagesNormalizados);
        
        socketClient.emit('history-products', products);

        socketClient.on('new-message', (data) => {
            data.date = moment().format("DD/MM/YYYY HH:mm:ss");;
            messages[0].mensajes.push(data);
            mensajes.guardar(data);
            io.emit('notification', data);
        })

        socketClient.on('new-product', (data) => {
            products.push(data);
            io.emit('table-update', data);
        })

        socketClient.on('disconnect', (socketClient) => {
            console.log('Se desconecto un cliente');
        })
    })
}

export {
    initSocket,
}