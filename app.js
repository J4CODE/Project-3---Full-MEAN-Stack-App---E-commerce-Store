require('dotenv').config();

const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const express       = require('express');
const favicon       = require('serve-favicon');
const hbs           = require('hbs');
const mongoose      = require('mongoose');
const logger        = require('morgan');
const path          = require('path');
const session       = require("express-session");
const MongoStore    = require("connect-mongo")(session);
const app           = express();
const cors          = require('cors');
const bcrypt        = require('bcryptjs');
const passport      = require('passport');

const passportSetup = require('./config/passport');
passportSetup(passport);

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/project-3', {useMongoClient: true})
    //mongoose.connect("mongodb://localhost/deploy-exercise");

  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}))

//Comments on side of route to note router placed position
const index = require('./routes/index');//Sixth
app.use('/', index);
const productRouter = require('./routes/product');//First
app.use('/product', productRouter);

const userRoute = require('./routes/users');//Second
app.use('/users', userRoute);

const authRoutes = require('./routes/authRoutes');//Third
app.use('/api', authRoutes);

const cartRoute = require('./routes/carts');//Fourth
app.use('/carts', cartRoute);

const feedbackRoute = require('./routes/feedback');//Fifth
app.use('/feedback', feedbackRoute);


// app.use((req, res, next) => {
//   res.sendfile(__dirname + '/public/index.html');
// });


module.exports = app;