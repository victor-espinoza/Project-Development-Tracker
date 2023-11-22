var express = require('express');
var indexRouter = require('./routes/index.js');
const { auth } = require('express-openid-connect');
require('dotenv').config();

//configuration for how we are going to connect to the open-id provider (auth0)
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
  clientSecret: process.env.CLIENTSECRET,
  authorizationParams: {
    response_type: 'code', //authorization flow type (code-grant type)
    audience: "https://project-data-api.com", //api that we want to talk to
    scope: 'openid profile email create:task read:task update:task delete:task create:sprint read:sprint update:sprint delete:sprint' //define the scope of the data that is being authorized
  }
};

var app = express(); //define express app
app.set('views', 'views'); //views engine will use the views directory
app.set('view engine', 'ejs'); //define views engine being used (ejs)
//add middleware so incoming requests can be handled 
app.use(express.json()); //handle incoming json
//extended true lets us handle nested data in the url encoded query string
app.use(express.urlencoded({ extended: true })); //handle incoming url encoded query strings
//anything in the public directory will be served before routes are resolved
app.use(express.static('public'));

//authentication middleware (auth router attaches /login, /logout, and /callback routes to the baseURL)
app.use(auth(config));


app.use('/', indexRouter) //home directory


// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Where Did I Go Wrong? (Error 404)');
  err.status = 404;
  next(err);
});


// Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    title: "Error", 
    user: req.oidc.user,
    isAuthenticated: req.oidc.isAuthenticated(),
    error: process.env.NODE_ENV !== 'production' ? err : {}

  });
});


app.listen(3000, () => {
  console.log("express is running on port 3000");
});