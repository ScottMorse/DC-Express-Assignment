const express = require('express');
const os = require('os');
const db = require('./modules/pgutils')
const dotEnv = require('dotenv').config()
const session = require('express-session')

const app = express();

app.use(express.static('dist'));

app.use(session({
    store: new (require('connect-pg-simple')(session))({
      conString: process.env.DB_CONN
    }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
  }))

app.get('/api/sess', (req, res) => {
    // console.log(req.session.uid)
    res.send(req.session)
})

app.listen(8080, () => console.log('Listening on port 8080!'));