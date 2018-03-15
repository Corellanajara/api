const dbConnection = require('../../config/dbConnection');
var bodyParser = require('body-parser');
module.exports = app => {


    const connection = dbConnection();
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());


    app.post('/usuario', (req, res) => {
      console.log(res);
      console.log(req.body);
      const { nombre } = req.body;
      connection.query('SELECT * FROM usuarios where nombre = "'+nombre+'" ', (err, result) => {
        //console.log(err);
        res.json(result);

      });
    });

    app.get('/temperatura/:id', (req, res) => {

      const sql = 'SELECT * FROM temperatura where id_maquina = '+req.params.id ;

      connection.query( sql , (err, result) => {
        //console.log(err);
        res.json(result);
      });

    });

    app.get('/sensores/:id', (req, res) => {

      const sql = 'SELECT * FROM humedad where id_maquina = '+req.params.id ;
      const sql2 = 'SELECT * FROM temperatura where id_maquina = '+req.params.id ;
      const sql3 = 'SELECT * FROM presion where id_maquina = '+req.params.id ;
      let resultado = [];

      connection.query( sql , (err, result) => {
        console.log(result);
        resultado.push(result);
      });
      connection.query( sql2 , (err, result) => {
        console.log(result);
        resultado.push(result);
      });
      connection.query( sql3 , (err, result) => {
        console.log(result);
        resultado.push(result);
        console.log("resultado",resultado);
        res.json(resultado);
      });

    });


    app.post('/usuarios', (req, res) => {

      const { nombre } = req.body;
      console.log("body",req.body);

      connection.query('INSERT INTO usuarios SET ? ',
        {
          nombre
        }
      , (err, result) => {
        res.redirect('/usuarios');
      });
    });




  };
