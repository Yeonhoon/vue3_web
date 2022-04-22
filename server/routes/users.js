// const e = require('express');
const express = require('express');
// const { closeComplete } = require('pg-protocol/dist/messages');
var router = express.Router();
const DB = require('pg').Pool
const pool = new DB({
  user: 'r3417',
  host: 'localhost',
  database: 'r3417',
  password: 'snubh19940123',
  port:5432,
})

router.get('/', function(req, res, next) {
  res.send('Hi!222221254235423');
});


router.get('/test',(req,res)=>{
  pool.query('select * from webd.users',(err,result)=>{
    if (err) {
      throw err
    }
    res.status(200).json(result.rows)
  })
});

router.post('/test', (req, res)=>{
  const {email } = req.body
    pool.query('insert into webd.users (email) \
    values ($1)', [email],(err, result)=>{
      if (err) {
        // user already exists
         if (err.code == 23505){ 
           res.send("User already exists");
          //  return res.redirect('/');
         }
      } else {
        console.log('회원가입완료')
        res.status(201).send(`User ${email} Added.`)
        // console.log(result)
      }
    })


  
})

module.exports = router;
