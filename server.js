const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
//set view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

//middleware
app.use((req, res, next) => {
  res.locals.currentYear = new Date().getFullYear();
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    if (err) console.log('Could not print log' + err);
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance', { title: 'Under Maintenance' });
// });

//tells express about our static assets
app.use(express.static(__dirname + '/public'));

//routes

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Welcome',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    currentYear: new Date().getFullYear(),
  });
});

app.get('/bad', (req, res) => {
  res.json({
    err: 'Whoops',
    message: 'Something went horribly wrong!',
  });
});

app.listen(3000, () => {
  console.log('server is listening on port: 3000');
});
