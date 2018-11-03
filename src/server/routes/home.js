let express = require('express');
let router = express.Router();
let db = require("../modules/pgutils")

router.post('/login', (req,res) => {
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
                req.session.uid = user.id
                req.session.username = user.username
                req.session.email = user.email
              }
              res.send(JSON.stringify(response))
            })
        }
        else{
          res.send(JSON.stringify(response))
        }
    })
})
  
router.post('/register', (req,res) => {
  const response = {userValid: false, emailValid: false}
  db.filterData('users',['id'],['username'],[db.wrap(req.body.username)])
    .then(rows => {
      if(rows.length == 0){
        response.userValid = true
        db.filterData('users',['*'],['email'],[db.wrap(req.body.email)])
          .then(rows => {
            if(rows.length == 0){
              response.emailValid = true
              db.encryptPassword(req.body.pswd)
                .then(hashedPswd => {
                  db.insertNewData('users',['username','email','pswd'],[
                    db.wrap(req.body.username),
                    db.wrap(req.body.email),
                    db.wrap(hashedPswd),
                  ])
                    .then(after => {
                      db.filterData('users',['*'],['username'],[db.wrap(req.body.username)])
                        .then(rows => {
                          const user = rows[0]
                          req.session.uid = user.id
                          req.session.email = user.email
                          req.session.username = user.username
                          db.insertNewData('usercarts',['uid'],[req.session.uid])
                          res.send(JSON.stringify(response))
                        })
                    })
                })
            }
            else{
              res.send(JSON.stringify(response))
            }
          })
      }
      else{
        res.send(JSON.stringify(response))
      }
  })
})

router.post('/logout',(req,res) => {
    req.session.destroy()
    res.end()
})

module.exports = router