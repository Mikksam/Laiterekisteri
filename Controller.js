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
                connection.query('SELECT l.laite_id, l.sarjanumero, t.tyyppi_nimi, l.laite_merkki, l.laite_malli, l.omistaja, l.sijainti, l.kuvaus FROM laite AS l INNER JOIN laitetyyppi AS t ON l.tyyppi_id = t.tyyppi_id', function (error, results, fields) {
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
            connection.query('SELECT l.laite_id, l.sarjanumero, l.tyyppi_id, t.tyyppi_nimi, l.laite_merkki, l.laite_malli, l.omistaja, l.sijainti, l.kuvaus FROM laite AS l INNER JOIN laitetyyppi AS t ON l.tyyppi_id = t.tyyppi_id WHERE laite_id = ?', [avain], function (error, results, fields) {
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
            connection.query('INSERT INTO laite (sarjanumero, tyyppi_id, laite_merkki, laite_malli, omistaja, sijainti, kuvaus) VALUES (?, ?, ?, ?, ?, ?, ?)', [c.sarjanumero, c.tyyppi_id, c.laite_merkki, c.laite_malli, c.omistaja, c.sijainti, c.kuvaus],
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

    addType: function (req, res) {
        let c = req.body;
        console.log("body (ADD TYPE): " + JSON.stringify(c));
        connection.query('INSERT INTO laitetyyppi (tyyppi_nimi) VALUES (?)', [c.tyyppi_nimi],
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
            connection.query('DELETE FROM laite WHERE laite_id = ?', [c.avain],
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
            connection.query('UPDATE laite SET sarjanumero = ?, tyyppi_id = ?, laite_merkki = ?, laite_malli = ?, omistaja = ?, sijainti = ?, kuvaus = ? WHERE laite_id = ?', [c.sarjanumero, c.tyyppi_id, c.laite_merkki, c.laite_malli, c.omistaja, c.sijainti, c.kuvaus, c.laiteid],
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


    fetchMyOrders: function (email) {

            return new Promise((resolve, reject) => {

                connection.query('SELECT v.varaus_id, l.sarjanumero, t.tyyppi_nimi, l.laite_merkki, l.laite_malli, v.status, v.varauspvm, v.lainauspvm, v.palautuspvm FROM varaus AS v INNER JOIN laite AS l ON v.laite_id = l.laite_id INNER JOIN laitetyyppi AS t ON l.tyyppi_id = t.tyyppi_id INNER JOIN kayttaja AS k ON v.kayttaja_id = k.kayttaja_id WHERE k.kayttajanimi = ?', [email], function (error, results, fields) {
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

    fetchTypes: function () {

        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM laitetyyppi', function (error, results, fields) {
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

    fetchDevicesForOrder: function (alku, loppu) {
        return new Promise((resolve, reject) => {

            connection.query('SELECT l.sarjanumero, t.tyyppi_nimi, l.laite_merkki, l.laite_malli, l.sijainti, l.kuvaus  FROM laite AS l INNER JOIN varaus AS v ON v.laite_id = l.laite_id INNER JOIN laitetyyppi AS t ON l.tyyppi_id = t.tyyppi_id WHERE v.lainauspvm NOT BETWEEN CAST(? AS DATE) AND CAST(? AS DATE) AND v.palautuspvm NOT BETWEEN CAST(? AS DATE) AND CAST(? AS DATE)', [alku , loppu, alku, loppu], function (error, results, fields) {
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

    



