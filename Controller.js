'use strict'

// Asenna ensin mysql driver 
// npm install mysql --save

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',  // HUOM! Älä käytä root:n tunnusta tuotantokoneella!!!!
  password : '',
  database : 'Laiterekisteri'
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports =
    {
     //Devices
    //////////////////////////////////////////////////////////////////////////////
        fetchDevices: function () {
            return new Promise((resolve, reject) => {
                connection.query('SELECT * FROM laite', function (error, results, fields) {
                    if (error) {
                        console.log("Virhe haettaessa dataa laite-taulusta, syy: " + error);
                        reject("Virhe haettaessa dataa laite-taulusta, syy: " + error);
                    }
                    else {
                        console.log("Data (rev) = " + JSON.stringify(results));
                        resolve(results);
                    }
                })
            })
    },

    fetchDevice: function (avain) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM laite WHERE sarjanumero=?', [avain], function (error, results, fields) {
                if (error) {
                    console.log("Virhe haettaessa dataa laite-taulusta, syy: " + error);
                    reject("Virhe haettaessa dataa laite-taulusta, syy: " + error);
                }
                else {
                    console.log("Data (rev) = " + JSON.stringify(results));
                    resolve(results);
                }
            })
        })
    },

        addDevice: function (req, res) {
            let c = req.body;
            console.log("body (CREATE): " + JSON.stringify(c));
            connection.query('INSERT INTO laite (sarjanumero, laite_id, laite_nimi, laite_merkki, laite_malli, omistaja, sijainti, kuvaus) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [c.sarjanumero, c.laite_id, c.laite_nimi, c.laite_merkki, c.laite_malli, c.omistaja, c.sijainti, c.kuvaus],
                function (error, results, fields) {
                    if (error) {
                        console.log("Virhe lisättäessä dataa laite-tauluun, syy: " + error);
                        res.send(error);
                    }
                    else {
                        console.log("Data = " + JSON.stringify(results));
                        res.statusCode = 201;
                        c.Avain = results.insertId;
                        res.send(c);
                    }
                });
        },

        deleteDevice: function (req, res) {
            let c = req.body;
            console.log("body (DELETE): " + JSON.stringify(c));
            connection.query('DELETE FROM laite WHERE sarjanumero=?', [c.avain],
                function (error, results, fields) {
                    if (error) {
                        console.log("Virhe poistettaessa dataa laite-taulusta, syy: " + error);
                        res.send(error);
                    }
                    else {
                        console.log("Data = " + JSON.stringify(results));
                        res.statusCode = 201;
                        c.Avain = results.insertId;
                        res.send(c);
                    }
                });
        },


        updateDevice: function (req, res) {
            let c = req.body;
            console.log("body (UPDATE): " + JSON.stringify(c));
            connection.query('UPDATE laite SET laite_id = ?, laite_nimi = ?, laite_merkki = ?, laite_malli = ?, omistaja = ?, sijainti = ?, kuvaus = ? WHERE sarjanumero = ?', [c.laite_id, c.laite_nimi, c.laite_merkki, c.laite_malli, c.omistaja, c.sijainti, c.kuvaus, c.sarjanumero],
                function (error, results, fields) {
                    if (error) {
                        console.log("Virhe muutettaessa dataa laite-tauluun, syy: " + error);
                        res.send(error);
                    }
                    else {
                        console.log("Data = " + JSON.stringify(results));
                        res.statusCode = 201;
                        c.Avain = results.insertId;
                        res.send(c);
                    }
                });
        },


     //User
    //////////////////////////////////////////////////////////////////////////////

        fetchInfo: function (email) {
            return new Promise((resolve, reject) => {

                connection.query('SELECT * FROM kayttaja WHERE kayttajanimi =? ', [email], function (error, results, fields) {
                    if (error) {
                        console.log("Virhe haettaessa dataa Asiakas-taulusta, syy: " + error);
                        reject("Virhe haettaessa dataa Asiakas-taulusta, syy: " + error);
                    }
                    else {
                        console.log("Data (rev) = " + JSON.stringify(results));
                        resolve(results);
                    }
                });
            });
        },
        // Sama kuin edellinen! muista tehdä muutoksen siten, että voi ottaa tämän pois!!!
        fetchLogin: function (email) {
            return new Promise((resolve, reject) => {

                connection.query('SELECT * FROM kayttaja WHERE kayttajanimi =? ', [email], function (error, results, fields) {
                    if (error) {
                        console.log("Virhe haettaessa dataa kayttaja-taulusta, syy: " + error);
                        reject("Virhe haettaessa dataa kayttaja-taulusta, syy: " + error);
                    }
                    else {
                        console.log("Data (rev) = " + JSON.stringify(results));
                        resolve(results);
                    }
                });
            });
        },

        updateUser: function (req, res) {

            var c = req.body;
            console.log("body (UPDATE): " + JSON.stringify(req.body));


            connection.query("UPDATE kayttaja SET salasana = ?, etunimi = ?, sukunimi = ?, puhnro = ?, osoite = ? WHERE kayttajanimi = ?", [c.password, c.fname, c.lname, c.phone, c.address, c.email],
                function (error, results, fields) {
                    if (error) {
                        console.log("Virhe muuttaessa dataa kayttaja-tauluun, syy: " + error);
                        res.send(error);
                    }
                    else {
                        console.log("Data = " + JSON.stringify(results));
                        res.statusCode = 201;
                        c.Avain = results.insertId;
                        res.send(c);
                    }

                });

        },

        createUser: function (req, res) {
            let c = req.body;
            console.log("body (CREATEUSER): " + JSON.stringify(c));

            connection.query('INSERT INTO kayttaja (kayttajanimi, salasana, tyyppi, tyyppi_selite, Luontipvm, etunimi, sukunimi ) VALUES (?, ?, 2, "Customer", CURDATE(), ? , ?)', [c.email, c.password, c.fname, c.lname],
                function (error, results, fields) {
                    if (error) {
                        console.log("Virhe lisättäessä dataa kayttaja-tauluun, syy: " + error);
                        res.send(error);
                    }
                    else {
                        console.log("Data = " + JSON.stringify(results));
                        res.statusCode = 201;
                        c.Avain = results.insertId;
                        res.send(c);
                    }
                });
        },


     //Orders
    //////////////////////////////////////////////////////////////////////////////


        fetchOrders: function (email) {
            return new Promise((resolve, reject) => {

                connection.query('SELECT * FROM varaus WHERE kayttajanimi = ?', [email], function (error, results, fields) {
                    if (error) {
                        console.log("Virhe haettaessa dataa varaus-taulusta, syy: " + error);
                        reject("Virhe haettaessa dataa varaus-taulusta, syy: " + error);
                    }
                    else {
                        console.log("Data (rev) = " + JSON.stringify(results));
                        resolve(results);
                    }
                });
            });
        },

        addOrder: function (req, res) {
            let c = req.body;
            console.log("body (CREATE): " + JSON.stringify(c));
            connection.query('INSERT INTO varaus (kayttajanimi, sarjanumero, status, varauspvm, lainauspvm, palautuspvm) VALUES (?, ?, ?, CURDATE(), ?, ?)', [c.kayttajanimi, c.sarjanumero, c.status, c.lainauspvm, c.palautuspvm],
                function (error, results, fields) {
                    if (error) {
                        console.log("Virhe lisättäessä dataa varaus-tauluun, syy: " + error);
                        res.send(error);
                    }
                    else {
                        console.log("Data = " + JSON.stringify(results));
                        res.statusCode = 201;
                        c.Avain = results.insertId;
                        res.send(c);
                    }
                });
    },


        deleteOrder: function (req, res) {
            let c = req.body;
            console.log("body (DELETE): " + JSON.stringify(c));
            connection.query('DELETE FROM varaus WHERE varaus_id = ?', [c.varaus_id],
                function (error, results, fields) {
                    if (error) {
                        console.log("Virhe poistettaessa dataa varaus-taulusta, syy: " + error);
                        res.send(error);
                    }
                    else {
                        console.log("Data = " + JSON.stringify(results));
                        res.statusCode = 201;
                        c.Avain = results.insertId;
                        res.send(c);
                    }
                });
        },


        updateOrder: function (req, res) {
            let c = req.body;
            console.log("body (UPDATE): " + JSON.stringify(c));
            connection.query('UPDATE varaus SET status = ?, lainauspvm = ?, palautuspvm = ? WHERE varaus_id = ?', [c.status, c.lainauspvm, c.palautuspvm],
                function (error, results, fields) {
                    if (error) {
                        console.log("Virhe muutettaessa dataa varaus-tauluun, syy: " + error);
                        res.send(error);
                    }
                    else {
                        console.log("Data = " + JSON.stringify(results));
                        res.statusCode = 201;
                        c.Avain = results.insertId;
                        res.send(c);
                    }
                });
        }





    };

    



