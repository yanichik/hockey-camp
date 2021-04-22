const express = require('express');
const app = express();
// ejs-mate view engine to include layout, partial, & block template functions for ejs view engine
const ejsMate = require('ejs-mate');
const path = require('path');
// port defined in .env file or localhost:3000
const port = process.env.PORT || 3000;

app.engine('ejs', ejsMate);	// sets the ejsMate function to render all ejs files
app.set('view engine', 'ejs'); // sets the view engine to ejs
app.set('views', path.join(__dirname, 'views')); // sets default directory for all static views


// All app.use cases
app.use(express.static(path.join(__dirname, 'public')));	// sets default directory 'public' to serve all static assets

app.get('/', (req, res, next)=>{
	// res.send('welcome camp seakers!')
	res.render('home', {'camp': 'heartland hockey camps'});
})

app.listen(port, ()=>{
	console.log(`Listening on Port ${port}`);
})