const dbConnection = require('../../config/dbConnection');
var bodyParser = require('body-parser');

module.exports = app => {


    const connection = dbConnection();
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());


    app.get('/usuario/:id/maquina', (req, res) => {
      connection.query('SELECT * FROM maquina where id_usuario = '+req.params.id, (err, result) => {
        //console.log(err);
        res.json(result);

      });
    });

    app.get('/maquina/limites/:id', (req, res) => {

      connection.query('Select templimites.limin , templimites.limax from templimites, limites where templimites.id = limites.id and limites.id = '+req.params.id, (err, value) => {          
        console.log(value);
        res.json(value);
      });
    });


    app.get('/usuario/:id/sector/:sector/maquina', (req, res) => {

      connection.query('SELECT * FROM maquina where id_sector = '+req.params.sector+' and id_usuario = '+req.params.id, (err, result) => {
        //console.log(err);
        res.json(result);

      });
    });



    app.post('/usuario/:id/sector/:sector/maquina', (req, res) => {

      const { nombre } = req.body;
      const id_usuario = req.params.id;
      const id_sector = req.params.sector;
      console.log("body",req.body);

      connection.query('INSERT INTO maquina SET ? ',
        {
          nombre,
          id_sector,
          id_usuario
        }
      , (err, result) => {
        res.redirect('/maquina');
      });
    });

    app.post('/usuario/:id/maquina', (req, res) => {

      const { nombre } = req.body;
      const id_usuario = req.params.id;
      console.log("body",req.body);

      connection.query('INSERT INTO maquina SET ? ',
        {
          nombre,
          id_usuario
        }
      , (err, result) => {
        res.redirect('/maquina');
      });
    });

    app.put('/usuario/:id/maquina', (req, res) => {

      const { id ,nombre ,id_sector } = req.body;

      const sql = 'UPDATE maquina SET nombre = "'+nombre+'" , id_sector = '+id_sector+' where id ='+id;

      connection.query(sql, (err, result) => {
        if (err){
          console.log("error",err);
        }else{
          res.json({
            "msg" : "cambiado con exito"
          })
        }
        //res.redirect('/news');
      });
    });

    app.delete('/maquina/:id', (req, res) => {

      const { id } = req.body;
      console.log("body",req.body);
      const sql = 'DELETE from  maquina where id ='+req.params.id;

      connection.query(sql, (err, result) => {
        if (err){
          console.log("error",err);
        }else{
          res.json({
            "msg" : "Borrado con exito"
          })
        }
        //res.redirect('/news');
      });
    });
  };
