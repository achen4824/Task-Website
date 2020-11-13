const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	// _id: mongoose.Schema.Types.ObjectId,
	name: {  type: String, required: true },
	value: { type: Number, required: true },
	time: { type: Number, required: true }
}, { collection: 'dailytasks' });


mongoose.model('task', taskSchema);