const mongoose = require('mongoose');

const { Schema } = mongoose;

const TodoSchema = new Schema({
    name: { type: String },
    description: { type: String },
    done: { type: Boolean, default: false }
})

module.exports = mongoose.model('ToDo', TodoSchema);