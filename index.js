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

app.get('/getAll', async (req, res) => {
    const data = await db.tutorials.findAll({
        where: {}
    });
   console.log('return data about all click => ', data);
    res.sendFile(__dirname + '/index.html');
});


app.get('/findOne:', async (req, res) => {
    const user = await db.tutorials.findByPk(req.params.id)
        .then(data => {
            res.send(data);
            console.log('First User =>', user);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
})

app.get('/create', async (req, res) => {
    await db.tutorials.create({
        title: 'req.body.title',
        description: 'req.body.description',
        published: false
    })
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
    console.log('http://localhost:3000');
});