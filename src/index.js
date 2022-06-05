const express = require('express');
const app = express();

const path = require('path');
const morgan = require('morgan');

// Config
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use(require('./routes/index.routes'));

// Estaticos
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('Server en puerto:', app.get('port'));
});
