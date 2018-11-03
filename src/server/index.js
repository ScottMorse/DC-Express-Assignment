const express = require('express');
const os = require('os');
const db = require('./modules/pgutils')
const dotEnv = require('dotenv').config()
const session = require('express-session')

const bodyParser = require('body-parser')

const app = express();

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
    // console.log(req.session.uid)
    res.send(req.session)
})

app.post('/api/login', (req,res) => {
  const response = {userValid: false, pswdValid: false}
  db.filterData('users',['*'],['username'],[db.wrap(req.body.username)])
    .then(rows => {
      if(rows.length > 0){
        user = rows[0]
        response.userValid = true
        db.comparePasswords(req.body.pswd,user.pswd)
          .then(result =>{
            if(result){
              response.pswdValid = true
            }
            res.send(JSON.stringify(response))
          })
      }
      else{
        res.send(JSON.stringify(response))
      }
    })
})

app.listen(8080, () => console.log('Listening on port 8080!'));