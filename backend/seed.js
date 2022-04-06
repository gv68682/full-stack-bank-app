
import { } from 'dotenv/config'
import bcrypt from 'bcryptjs';
import mongo from 'mongodb';
let MongoClient = mongo.MongoClient;
const DBUrl = process.env.DBUrl;


const data = [
  { name: 'Abel', email: 'abel@mit.edu', password: 'secret', balance: 100000 },
  { name: 'Anne', email: 'anne@mit.edu', password: 'secret', balance: 1000 },
  { name: 'Lilly', email: 'lilly@mit.edu', password: 'secret', balance: 100 },
  { name: 'Tesla', email: 'tesla@mit.edu', password: '123123', balance: 100 },
  { name: 'Robert', email: 'robert@gmail.com', password: '111111', balance: 100 },
  { name: 'Rose', email: 'rose@mit.edu', password: '123123', balance: 100 }
]


MongoClient.connect(DBUrl, { useUnifiedTopology: true }, function (err, client) {
  if (err) {
    return;
  }
  const db = client.db('bankdaldb');
  const collection = db.collection('users');
  data.map(user => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        res.status(500).send(err);
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          res.status(500).send(err);
        }
        let hashUser = { name: user.name, email: user.email, password: hash , balance: user.balance, created_at: new Date()};
        collection.insertOne(hashUser, { w: 1 }, (err, _) => {
          if (err) {
           // console.log('failed to add user: ', user);
            return;
          }
        });
      });

    });
  });
  
  setTimeout(() => client.close(), 3000);
});

