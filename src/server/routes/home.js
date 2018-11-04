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
                          db.insertNewData('addresses',['uid','name','street','city','zip'],[
                              user.id,
                              db.wrap(req.body.addname),
                              db.wrap(req.body.addstreet),
                              db.wrap(req.body.addcity),
                              req.body.addzip,
                          ])
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

router.post('/search',(req,res) => {
  const queryArr = req.body.query.q.split()
  let results = {results: []}
  db.selectTableAll('products')
    .then(rows => {
      rows.forEach(product => {
        queryArr.forEach(word => {
          if(product.name.toLowerCase().includes(word.toLowerCase())){
            results.results.push(product)
          }
          else if(product.category.toLowerCase().includes(word.toLowerCase())){
            results.results.push(product)
          }
        })
      })
      res.send(JSON.stringify(results))
    })
})

router.post('/address', (req,res) => {
   db.filterData('addresses',['*'],['uid'],[req.body.uid])
     .then(rows => {
       res.send(JSON.stringify(rows[0]))
     })
})

router.post('/add', (req,res)=> {
  db.insertNewData('products',['name','category','price','imageurl'],[
    db.wrap(req.body.name),
    db.wrap(req.body.category),
    req.body.price,
    db.wrap(req.body.imageurl)
  ])
})

module.exports = router