var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const Sequelize = require('sequelize');

const db = {};
const sequelize = new Sequelize('mysql', 'root', 'Buster', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.sequelize.sync();

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
    console.log('http://localhost:3000');
});