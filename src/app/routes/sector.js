const dbConnection = require('../../config/dbConnection');
var bodyParser = require('body-parser');

module.exports = app => {


    const connection = dbConnection();
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());


    app.get('/usuario/:id/sector', (req, res) => {
      connection.query('SELECT * FROM sector where id_usuario = '+req.params.id, (err, result) => {
        //console.log(err);
        res.json(result);

      });
    });

    app.get('/sector/:id', (req, res) => {

      const sql = 'SELECT * FROM sector where id = '+req.params.id ;

      connection.query( sql , (err, result) => {
        //console.log(err);
        res.json(result);
      });

    });


    app.post('/usuario/:id/sector', (req, res) => {

      const { nombre } = req.body;
      const id_usuario = req.params.id;
      console.log("body",req.body);

      connection.query('INSERT INTO sector SET ? ',
        {
          nombre,
          id_usuario
        }
      , (err, result) => {
        res.redirect('/sector');
      });
    });

    app.put('/sector', (req, res) => {

      const { id ,nombre } = req.body;
      console.log("body",req.body);
      const sql = 'UPDATE sector SET nombre = "'+nombre+'" where id ='+id;

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

    app.delete('/sector/:id', (req, res) => {

      const { id } = req.body;
      console.log("body",req.body);
      const sql = 'DELETE from  sector where id ='+req.params.id;

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
