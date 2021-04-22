const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campSchema = new Schema({
	name: String,
})

const Camp = mongoose.model('Camp', campSchema);

module.exports = Camp;