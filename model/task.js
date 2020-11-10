const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	// _id: mongoose.Schema.Types.ObjectId,
	name: { first: { type: String, required: true }, last: { type: String, required: true } },
	email: { type: String, required: true },
	password: { type: String, required: true }
}, { collection: 'tasks' });


mongoose.model('task', taskSchema);