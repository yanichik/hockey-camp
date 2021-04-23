const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Camp = require('../models/camp');
const picsArray = require('./pics-seeds');

/*START MONGOOSE SETUP*/
mongoose.connect('mongodb://localhost/hockey-camp', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
});

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

/*START SEED*/
const seedCamps = async () =>{
	const picsSize = picsArray.length;
	for (let i = 0; i < picsSize; i++){
		const newCamp = new Camp({pics: picsArray[i].pic});

		/* THIS SAVE METHOD RETURNS "MongoError: Topology is closed, please connect" */
		await newCamp.save(function(e, someCamp){
			if(e) return console.log("Something went wrong :(" + e);
			console.log(`Successfully added ${someCamp}`);
		})

		/* this save method works without fault */
		// await newCamp.save();
	}
}

/* this close method works without fault */
/*seedCamps().then(() => {
	mongoose.connection.close();
})
.catch(e => {console.log(e)})*/

/* THIS DISCONNECT METHOD RETURNS "TypeError: mongoose.connection.disconnect is not a function" */
seedCamps().then(() => {
	mongoose.connection.disconnect();
})
.catch(e => {console.log(e)})

/*END SEED*/