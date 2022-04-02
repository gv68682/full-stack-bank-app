
// const DBurl = 'mongodb://localhost:27017';
import mongo from 'mongodb';
let MongoClient = mongo.MongoClient;
const DBUrl = process.env.DBUrl;
let db = null;

MongoClient.connect(DBUrl, { useUnifiedTopology: true }, function (err, client) {
	// connect to database
	db = client.db('bankdaldb');
});

// create user account
 function create(name, email, password) {
	return new Promise((resolve, reject) => {
		const collection = db.collection('users');
		const doc = { name, email, password, balance: 0 };
		collection.insertOne(doc, { w: 1 }, function (err, result) {
			err ? reject(err) : resolve(doc);
		});
	})
}

// find user account
function find(email) {
	return new Promise((resolve, reject) => {
		const customers = db
			.collection('users')
			.find({ email: email })
			.toArray(function (err, docs) {
				err ? reject(err) : resolve(docs);
			});
	})
}

// return all users
function all() {
	return new Promise((resolve, reject) => {
		const customers = db
			.collection('users')
			.find({})
			.toArray(function (err, docs) {
				err ? reject(err) : resolve(docs);
			});
	})
}

// find one user
function findOne(id) {
	return new Promise((resolve, reject) => {
		//It won't accept string so passed like this***
		const o_id = new mongo.ObjectId(id);
		const customers = db
			.collection('users')
			.findOne({ _id: o_id })
			.then((doc) => resolve(doc))
			.catch((err) => reject(err));
	})
}

// update - deposit/withdraw amount
function update(id, balance1) {
	return new Promise((resolve, reject) => {
		const o_id = new mongo.ObjectId(id);
		const customers = db
			.collection('users')
			.findOneAndUpdate(
				{ _id: o_id },
				{ $set: {balance: balance1} } ,
				// { returnOriginal: false },
				function (err, documents) {
					err ? reject(err) : resolve(documents);
				}
			);
	});
}


export { create, findOne, find, update, all };