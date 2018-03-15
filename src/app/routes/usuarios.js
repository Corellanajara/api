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

    app.get('/usuarios/:id', (req, res) => {

      const sql = 'SELECT * FROM usuarios where id = '+req.params.id ;

      connection.query( sql , (err, result) => {
        //console.log(err);
        res.json(result);
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

    app.put('/usuarios', (req, res) => {

      const { id ,nombre } = req.body;
      console.log("body",req.body);
      const sql = 'UPDATE usuarios SET nombre = "'+nombre+'" where id ='+id;

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

    app.delete('/usuarios/:id', (req, res) => {

      const { id } = req.body;
      console.log("body",req.body);
      const sql = 'DELETE from  usuarios where id ='+req.params.id;

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
