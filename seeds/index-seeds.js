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

const db = mongoose.connection;  // db is object instance of the opened mongoose connection
db.on('error', console.error.bind(console, 'connection error:'));  // sets event listener if "error" occurs
db.once('open', function() {  // sets event listener if "open" occurs
	console.log("Mongoose connected")
});

// db.emit('open');
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
	await Camp.deleteMany({});
	const picsSize = picsArray.length;
	for (let i = 0; i < picsSize; i++){
		const newCamp = new Camp({pics: picsArray[i].pic, name: picsArray[i].name});

		/* THIS SAVE METHOD RETURNS "MongoError: Topology is closed, please connect" */
		await newCamp.save(function(e, someCamp){
			if(e) console.log("Something went wrong :(" + e);
			else {console.log(`Successfully added ${someCamp}`)};
		}).then()

		/* this save method works without fault */
		// await newCamp.save();
	}
}
/* this close method works without fault */
seedCamps().then(() => {
	db.close();
})
.catch(e => {console.log(e)})

// seedCamps()


/* THIS DISCONNECT METHOD RETURNS "TypeError: mongoose.connection.disconnect is not a function" */
// seedCamps().then(() => {
// 	mongoose.connection.disconnect();
// })
// .catch(e => {console.log(e)})

/*END SEED*/