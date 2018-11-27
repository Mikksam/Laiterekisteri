// npm install express
// npm install handlebars
// npm install consolidate

var express = require('express');
var cons = require('consolidate');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var customerController = require('./Controller');


// Tulosta konsoliin mahdolliset enginet
//console.log(cons);

app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./'));
//Login
//////////////////////////////////////////////////////////////////////////////
app.get('/', function(req, res) {
  res.render('login', {
    
  });
  });

app.get('/login', function(req, res) {
  res.render('login', {
    
  });
});

//Signup
//////////////////////////////////////////////////////////////////////////////

app.get('/Auth', function (req, res) {

    var email = req.param('auth');

         customerController.fetchLogin(email).then(function (data) {
                console.log(JSON.stringify(data));
                 return data;
        })
        .then((info) => {
            return info;
        })
        .catch(function (msg) {
            console.log("Virhettä pukkaa " + msg);
        })
        .then((info) => {
            //suoritetaan vaikka tulis virhe
            if (info == null) info = [{ kayttajanimi: null, salasana: null}];
            res.send(info);
        });
});

app.get('/signup', function(req, res) {
  res.render('signup', {
    
  });
});

app.route('/register')
    .post(customerController.createUser); 

//Mainpage
//////////////////////////////////////////////////////////////////////////////

app.get('/mainpage', function(req, res) {
  res.render('etusivu', {
    
  });
});

app.get('/homepage', function (req, res) {
    res.render('kotisivu', {

    });
});
//Settings
//////////////////////////////////////////////////////////////////////////////

app.get('/settings', function (req, res) {
    res.render('omattiedot', {

    });
});
app.get('/usersettings', function (req, res) {
    var email = req.param('email');
    customerController.fetchInfo(email).then(function(data){
        console.log(JSON.stringify(data));
        return data;    
    })
    .then((info) => {
        return info;
    })
    .catch(function(msg){
        console.log("Virhettä pukkaa " + msg);
    })
        .then((info) => {
         //suoritetaan vaikka tulis virhe
            if (info == null) info = [{ kayttajatunnus: 'null', etunimi: 'null', sukunimi: 'null', puhnro: 'null', osoite: 'null'}];
        res.send(info);        
        });

});

app.route('/updateUser')
    .post(customerController.updateUser); 

app.get('/Laitehallinta', function (req, res) {
    res.render('Laitehallinta', {

    });
});

//Devices
//////////////////////////////////////////////////////////////////////////////

app.get('/LoadEditDevice', function (req, res) {
    res.render('laitteenmuokkaus', {

    });
});

app.get('/fetchDevices', function (req, res) {

    customerController.fetchDevices().then(function (data) {
        console.log(JSON.stringify(data));
        return data;
    })
        .then((info) => {
            return info;
        })
        .catch(function (msg) {
            console.log("Virhettä pukkaa " + msg);
        })
        .then((info) => {
            //suoritetaan vaikka tulis virhe
            if (info == null) info = [{ sarjanumero: 'null', laite_id: 'null', laite_id: 'null', laite_nimi: 'null', laite_merkki: 'null', laite_malli: 'null', omistaja: 'null', sijainti: 'null', kuvaus: 'null' }];
            res.send(info);
        });
});

app.get('/EditDevice', function (req, res) {
    var sarjanumero = req.param("sarjanumero");
    customerController.fetchDevice(sarjanumero).then(function (data) {
        console.log(JSON.stringify(data));
        return data;
    })
        .then((info) => {
            return info;
        })
        .catch(function (msg) {
            console.log("Virhettä pukkaa " + msg);
        })
        .then((info) => {
            //suoritetaan vaikka tulis virhe
            if (info == null) info = [{ /* tänne, mitä halutaan palauttaa jos palautus on null */ }];
            res.send(info);
        });
});

app.route('/addDevice')
    .post(customerController.addDevice);

app.route('/deleteDevice')
    .post(customerController.deleteDevice);

app.route('/updateDevice')
    .post(customerController.updateDevice);

//Orders
//////////////////////////////////////////////////////////////////////////////

app.get('/fetchOrders', function (req, res) {

    customerController.fetchOrders().then(function (data) {
        console.log(JSON.stringify(data));
        return data;
    })
        .then((info) => {
            return info;
        })
        .catch(function (msg) {
            console.log("Virhettä pukkaa " + msg);
        })
        .then((info) => {
            //suoritetaan vaikka tulis virhe
            if (info == null) info = [{ /* tänne, mitä halutaan palauttaa jos palautus on null */ }];
            res.send(info);
        });
});

app.route('/updateOrder')
    .post(customerController.updateOrder);

app.route('/addOrder')
    .post(customerController.addOrder);

app.route('/deleteOrder')
    .post(customerController.deleteOrder);

//////////////////////////////////////////////////////////////////////////////

app.listen(3002);
console.log('Express server listening on port 3002');

