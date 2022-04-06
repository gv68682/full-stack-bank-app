import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { create, findOne, find, update, all } from '../dal/dal.js'
var app = express();

const accessTokenSecret = process.env.JWTSECRET;

// used to serve static files from public directory
app.use(express.static('public'));


//Create user account/ Signup
app.post('/signup', function (req, res) {
	// create/:name/:email/:password
	find(req.body.email).
		then((users) => {
			if (users.length > 0) {
				res.send('User already exists');
			}
			else {
				// else create user with hashed pwd
				bcrypt.genSalt(10, (err, salt) => {
					if (err) {
						//console.log("failed to create salt: ", err);
						res.status(500).send(err);
					}
					bcrypt.hash(req.body.password, salt, (err, hash) => {
						if (err) {
							//console.log("failed to hash password: ", err);
							res.status(500).send(err);
						}
						create(req.body.name, req.body.email, hash)
							.then((user) => {
								//console.log("User from DAL  ", user);
								const accessToken = jwt.sign(
									{ name: user.name, id: user._id }, //token
									accessTokenSecret, // secret used to sign token
									{ expiresIn: '60m' } //token details
								)
								res.status(201).json(accessToken);
							}).catch((error) => {
								//console.log("User Error from DB: ", error);
								res.status(500).send('error');
							});
					})
				})

			}

		});
});


// Login user 
app.post('/login', function (req, res) {
	find(req.body.email).
		then((user) => {
			if (user.length > 0 && user.length < 2) {
				user = user[0];
				bcrypt.compare(req.body.password, user.password).then(result => {
					if (result === true) {
						const accessToken = jwt.sign(
							{ name: user.name, id: user._id }, //token
							accessTokenSecret, // secret used to sign token
							{ expiresIn: '60m' } //token details
						)
						res.json(accessToken);
					} else {
						res.status(401).json('invalid password')
					}
				});
			}
			else {
				res.status(401).json('Login failed: user does not exist');
			}
		});
});

export default app;