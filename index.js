var http = require('http');
var express = require('express');
var app = express();
// var bodyParser = require('body-parser');
// var expressLayouts = require('express-ejs-layouts');
var server = http.createServer(app);
var io = require('socket.io')(server);
var SerialPort = require('serialport');
var readline = require('@serialport/parser-readline');
var port = new SerialPort('COM9');

var serialport = port.pipe(new readline('\r\n'));

//olhar a porta que o Arduino esta e ajustar aqui
app.set('view engine', 'ejs');    // Setamos que nossa engine será o ejs
// app.use(expressLayouts);       // Definimos que vamos utilizar o express-ejs-layouts na nossa aplicação
// app.use(bodyParser.urlencoded()); // Com essa configuração, vamos conseguir parsear o corpo das requisições
 
app.get('/',function(req,res){
    res.render('index');
});

serialport.on('open',function(){
    console.log('Serial port opened');
});

io.on('connection',function(socket){
    console.log('socket.io connection');
    serialport.on('data',function(data){
        data=data.trim();
        socket.emit('data',data);
    });


socket.on('disconnect',function(){
    console.log('disconected');
});

});

server.listen(3000, function(){
    console.log('listening on port 3000...');
});
