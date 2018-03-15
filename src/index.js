const app = require('./config/server');

require('./app/routes/news')(app);
require('./app/routes/usuarios')(app);
require('./app/routes/maquina')(app);
require('./app/routes/sensores')(app);
require('./app/routes/sector')(app);


app.set('port',process.env.PORT || 3000);
// starting the server
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});
