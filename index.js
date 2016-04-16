var app = require('./app');

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), 'localhost', function() {
  console.log('Listening on %d', app.get('port'));
});
