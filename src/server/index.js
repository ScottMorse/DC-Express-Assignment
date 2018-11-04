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
      conString: "postgres://rhoshiwuxnsqgh:7f23b644efa4df7786bc8d61adbf38c3b7c1db73b8ecb7ad96055e8753c4eaa2@ec2-184-73-169-151.compute-1.amazonaws.com:5432/dbu28qtrb6553b"
    }),
    secret: "Zgs4JS3e3n",
    resave: false,
    saveUninitialized: false
}))

app.get('/api/sess', (req, res) => {
    res.send(req.session)
})

app.use('/api',homeRouter)
app.use('/api/cart',cartRouter)

app.listen(process.env.PORT || 8080, () => console.log('Listening on port 8080!'))

module.exports = app