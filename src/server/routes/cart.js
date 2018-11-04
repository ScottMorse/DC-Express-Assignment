let express = require('express');
let router = express.Router();
let db = require("../modules/pgutils")

router.post('/', (req,res) => {
    db.filterData('usercarts',['*'],['uid'],[req.body.uid])
      .then(rows => {
        const prodIds = rows[0].productids
        let promises = []
        let results = {results: []}
        prodIds.forEach(prodId => {
            promises.push( 
              db.filterData('products',['*'],['id'],[prodId])
                .then(rows =>{
                    results.results.push(rows[0])
                })
            )
        })
        Promise.all(promises)
          .then( after => {
            res.send(JSON.stringify(results))
          })
    })
})

router.post('/addToCart', (req,res) => {
    db.updateData('usercarts',['productids'],['array_append(productids, ' + req.body.prodId + ')'],['uid'],[req.body.uid])
    res.end()
})

router.post('/removeFromCart', (req,res) => {
    db.updateData('usercarts',['productids'],['array_remove(productids, ' + req.body.prodId + ')'],['uid'],[req.body.uid])
    res.end()
})

router.post('/placeOrder', (req,res)=>{
    const today = new Date()
    let date = today.getFullYear() + '-'
    if(today.getMonth() <= 9) date += '0'
    date += today.getMonth() + '-'
    if(today.getDate() <= 9) date += '0'
    date += today.getDate()

    db.filterData('usercarts',['*'],['uid'],[req.body.uid])
      .then(rows => {
          const cart = rows[0]
          db.insertNewData('orders',['uid','productids','date','price'],[
              req.body.uid,
              db.wrap('{ ' + cart.productids.join(', ') + ' }'),
              db.wrap(date),
              req.body.price
          ]).then(after => res.end()).catch(err => console.log(err))
      })
    
    db.updateData('usercarts',['productids'],[db.wrap('{}')],['uid'],[req.body.uid])
})

router.post('/orders',(req,res)=>{
    db.filterData('orders',['*'],['uid'],[req.body.uid])
      .then(rows => {
          res.send(JSON.stringify(rows))
      })
})

module.exports = router