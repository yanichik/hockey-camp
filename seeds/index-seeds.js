const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Camp = require('../models/camp');
const pics = require('./pics-seeds');

/*START MONGOOSE SETUP*/
mongoose.connect('mongodb://localhost/hockey-camp', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Mongoose connected")
});
/*END MONGOOSE SETUP*/

/*START INSERT ONE*/
// const minnesota = new Camp({name: 'Minnesota Hockey Camps'});
// minnesota.save( function(err, minnesota){
// 	if (err) {
// 		return console.log(err);
// 	}
// });
/*END INSERT ONE*/

/*START INSERT MANY*/
const insertPics = Camp.insertMany(pics);
/*END INSERT MANY*/