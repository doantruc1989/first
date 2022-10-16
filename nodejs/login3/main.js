const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
var multer = require('multer');
var exphbs = require('express-handlebars');

//multer upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/client/public/image');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage });

//handlerbars
const hbs = exphbs.create({ defaultLayout: 'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './client/views/'));

//cookie parser
const cookieParser = require('cookie-parser');
const { ifError } = require('assert');
app.use(cookieParser());

//bodyParser + static
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/public'));

// routes
app.get('/', (req, res) => {
    var options = {
        root: path.join(__dirname)
    };
    var fileName = 'index.html';
    res.sendFile(fileName, options)
});

app.get('/login', (req, res) => {
    var options = {
        root: path.join(__dirname)
    };
    var fileName = 'client/public/login.html';
    if (req.cookies.username) {
        res.redirect('/profile');
    };
    res.sendFile(fileName, options);

});

app.get('/profile', (req, res) => {
    if (!req.cookies.username) {
        res.redirect('/login');
    }
    res.render('home');
});

app.post('/logout', function (req, res) {
    res.clearCookie('username')
    res.redirect('/')
});

app.get('/register', (req, res) => {
    var options = {
        root: path.join(__dirname)
    };
    var fileName = 'client/public/register.html';
    res.sendFile(fileName, options)
});

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db1'
});

app.post('/profile', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var rememberMe = req.body.rememberMe;
    if (username && password) {
        connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0 && rememberMe) {
                // var content = `<img src="/img/{{post.image}}" height="100px" width="100px"/>`;
                res.cookie('username', username, { maxAge: 2592000000 });
                var imagePath = results[0].avatar;
                res.setHeader('Content-Type','text/html');
                res.writeHead(200);
                res.render('home', {
                    name: username,
                    img: imagePath
                });
                res.end();
               
            } else if (results.length > 0 && !rememberMe) {
                res.cookie('username', username);
                var imagePath = results[0].avatar;
                res.setHeader('Content-Type','text/html');
                res.writeHead(200);
                res.render('home', {
                    name: username,
                    img: imagePath
                });
                res.end();
               
            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});

app.listen(3000);
