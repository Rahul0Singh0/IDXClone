import express from 'express';
import { PORT } from './config/serverConfig.js';
import cors from 'cors';
import apiRouter from './routes/index.js';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import chokidar from 'chokidar';
import { handleEditorSocketEvents } from './socketHandlers/editorHandler.js';
import { handleContainerCreate } from './containers/handleContainerCreate.js';

const app = express();
const server = createServer(app); // combined of express server and socket.io server
const io = new Server(server, {
    cors: {
        origin: '*',
        method: ['GET', 'POST'],
    }
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

io.on('connection', (socket) => {
    console.log('a user connected');
});

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
    return res.json({message: 'pong'});
});

const editorNamespace = io.of('/editor');

editorNamespace.on("connection", (socket) => {
    console.log('editor connected');
    
    // somehow we will get the projectId from frontend
    let projectId = socket.handshake.query['projectId'];
    console.log("Project id received from frontend after connection:", projectId);

    if(projectId) {
        var watcher = chokidar.watch(`./projects/${projectId}`, {
            ignored: (path) => path.includes("node_modules"),
            persistent: true,
            awaitWriteFinish: {
                stabilityThreshold: 2000, /** Ensures stability of files before triggering event */
            },
            ignoreInitial: true, /** Ignore the initial files in the directory */
        });
        
        watcher.on('all', (event, path) => {
            console.log(event, path);
        });
    }

    handleEditorSocketEvents(socket, editorNamespace);

});

const terminalNamespace = io.of('/terminal');

terminalNamespace.on("connection", (socket) => {
    let projectId = socket.handshake.query['projectId'];
    console.log('terminal connected');

    socket.on("shell-input", (data) => {
        console.log("input received", data);
        terminalNamespace.emit("shell-output", data);
    });

    socket.on("disconnect", () => {
        console.log("terminal disconnected");
    });

    handleContainerCreate(projectId, socket);
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});