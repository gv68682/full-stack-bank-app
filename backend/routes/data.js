import express from 'express'
const app = express()
import { create, findOne, find, update, all } from '../dal/dal.js'


// get all accounts
app.get('/allUsers/', function (req, res) {    
        all().
            then((docs) => {
                if (!docs) {
                    res.status(404).json({ messaage: "err" })
                } else {
                    res.status(200).json(docs);
                }
            });
});


//get specific user data
app.get('/userId', function (req, res) {
    let id = req.query._id;
     findOne(id).
        then((user) => {
            if (!user) {
                res.status(404).json({ messaage: user })
            } else {
                res.status(200).json(user);
            }
        }).catch(err => {
            res.status(500).send(err);
        });
});

// update - deposit/withdraw amount
app.put('/userId',  function (req, res) {
    var balance1 = Number(req.body.balance);
    update(req.query._id, balance1).
        then((user) => {
            //console.log("User from DAL  ", user);
            // res.send(user); 
            if (!user) {
                res.status(404).json({ message: "err" })
            } else {
                res.status(200).json({ Message: user });
            }
        });
});

export default app;