const express = require('express');
const os = require('os');
const db = require('./modules/pgutils')
const dotEnv = require('dotenv').config()
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')

const app = express();

const homeRouter = require('./routes/home')
const cartRouter = require('./routes/cart')

app.use(express.static('dist'));

app.use(bodyParser.json());

app.use(session({
    store: new (require('connect-pg-simple')(session))({
      conString: process.env.DB_CONN
    }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}))

app.get('/api/sess', (req, res) => {
    res.send(req.session)
})

app.use('/api',homeRouter)
app.use('/api/cart',cartRouter)

app.listen(8080, () => console.log('Listening on port 8080!'))

module.exports = app