const dbConnection = require('../../config/dbConnection');
var bodyParser = require('body-parser');
module.exports = app => {

  const connection = dbConnection();
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  app.get('/news', (req, res) => {
    connection.query('SELECT * FROM news', (err, result) => {
      //console.log(err);
      res.json(result);

    });
  });

  app.get('/news/:id', (req, res) => {

    const sql = 'SELECT * FROM news where id_news = '+req.params.id ;

    connection.query( sql , (err, result) => {
      //console.log(err);
      res.json(result);
    });

  });


  app.post('/news', (req, res) => {

    const { title, news } = req.body;
    console.log("body",req.body);

    connection.query('INSERT INTO news SET ? ',
      {
        title,
        news
      }
    , (err, result) => {
      res.redirect('/news');
    });
  });

  app.put('/news', (req, res) => {

    const { id_news ,title, news } = req.body;
    console.log("body",req.body);
    const sql = 'UPDATE news SET title = "'+title+'" , news = "'+news+'" where id_news ='+id_news;

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

  app.delete('/news/:id', (req, res) => {

    const { id_news } = req.body;
    console.log("body",req.body);
    const sql = 'DELETE from  news where id_news ='+req.params.id;

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
