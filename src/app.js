
import express from 'express';
import handlebars from 'express-handlebars';
import { Server} from 'socket.io';
import viewRouter from './routes/views.router.js';


import __dirname from './utils.js';
import { log } from 'console';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
const PORT = process.env.PORT ||  9090;

// Configuración de Handlebars

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');   


// Usando router y handlebars

app.use('/views', viewRouter );

app.get('/socket', (req, res) => {

    res.render('socket');

});







const httpServer = app.listen(PORT, () => {

    console.log(`Servidor Express escuchando en el puerto ${PORT}`);

});

const dataLogMessage = [];

// Configuración de Socket.io

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {

    console.log("Nuevo cliente conectado");

    // Progagamos el log de mensaje al nuevo usuario

    socketServer.emit('messageLogs', dataLogMessage);


    socket.on('message', (data) => {

        console.log("Data: ", data);
        
        dataLogMessage.push(data);

        socketServer.emit('messageLogs', dataLogMessage);

    });

    // Hacemos un broadcast cuando un nuevo usuario se conecta

    socket.on("NewUser connected", (data) => {

        socket.broadcast.emit("NewUser connected", {user: data.user});

    });


    // Escuchar el evento CloseChatBox

    socket.on('CloseChatBox', data => {

        if (data.close) {

            console.log("El usuario ha cerrado el chat box");
            socket.disconnect();


        }

    });

});



