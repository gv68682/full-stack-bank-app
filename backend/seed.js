
import { } from 'dotenv/config'
import bcrypt from 'bcryptjs';
import mongo from 'mongodb';
let MongoClient = mongo.MongoClient;
const DBUrl = process.env.DBUrl;


const data = [
  { name: 'abel', email: 'abel@mit.edu', password: 'secret', balance: 500 },
  { name: 'anne', email: 'anne@mit.edu', password: 'secret', balance: 100 },
  { name: 'don', email: 'don@mit.edu', password: 'secret', balance: 100 }
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
        let hashUser = { name: user.name, email: user.email, password: hash , balance: user.balance};
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

