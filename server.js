
var express = require('express');
var hbs = require('hbs');
var fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    
    var now = new Date().toString();
    var log = `Req date: ${now} -> ${req.method}, ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err)
            console.log(err.message);
    });

    next();
});

/*
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});
*/

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {

    res.render('home.hbs', {
        pageTitle: 'Rendered Home page',
        welcomeMessage: 'Welcome to my website !!!'
    });

});

app.get('/data', (req, res) => {

    res.send({
        name: 'Erick',
        lastName: 'Silva'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Rendered About page...',
    });
});

app.get('/bad', (req, res) => {

    res.send({
        errorMessage: 'Unable to handle request.',
        errorDescription: 'Some description',
        anotherField: 'Another field to send back to the client'
    });

});

app.listen(3000, () => {
    console.log('__dirname:' + __dirname);
    console.log('Server up and running on port 3000...');
});
