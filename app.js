const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res, next)=>{
	res.send('welcome camp seakers!')
})

app.listen(port, ()=>{
	console.log(`Listening on Port ${port}`);
})