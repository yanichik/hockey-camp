/*START INCLUSIONS*/
const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');  // includes layout, partial, & block template functions for view engine
const path = require('path');
const port = process.env.PORT || 3000;  // port defined in .env file or localhost:3000
const mongoose = require('mongoose');
const Camp = require('./models/camp');
/*END INCLUSIONS*/

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

/*START SETS*/
app.engine('ejs', ejsMate);  // sets the ejsMate function to render all ejs files
app.set('view engine', 'ejs');  // sets the view engine to ejs
app.set('views', path.join(__dirname, 'views'));  // sets default directory for all static views
/*END SETS*/

/*START USES*/
app.use(express.static(path.join(__dirname, 'public')));  // sets default directory 'public' to serve all static assets
/*END USES*/

/*START ROUTES*/
app.get('/', async (req, res, next)=>{
	// res.send('welcome camp seakers!');
	const camps = await Camp.find({});
	res.render('home', {camps});
})

app.get('/camps', async(req, res, next) => {
	const camps = await Camp.find({});
	// console.log(camps);
	res.render('index', {camps});
})
/*END ROUTES*/

/*START LISTEN @ ROUTER*/
app.listen(port, ()=>{
	console.log(`Listening on Port ${port}`);
})
/*END LISTEN @ ROUTER*/