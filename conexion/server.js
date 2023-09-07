const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const socketsModule = require('./index');
socketsModule(io);

app.get('/', (req, res) => {
    res.sendFile('index.html', {root:'./'});
});

app.get('/:fileName', (req,res)=>{
    const fileName = req.params.fileName;
    res.sendFile(fileName , {root: './'})
})
app.get('/canvas/:scritpName' , (req,res) =>{
    const scriptName = req.params.scritpName;
    res.sendFile(scriptName, {root: './canvas/'})
})

app.get('/Icons/:imageName', (req, res) =>{
    const imageName = req.params.imageName;
    res.sendFile(imageName, {root: './Icons/'})
})

server.listen(9090, () => {
    console.log('Server is running on port 9090');
});
