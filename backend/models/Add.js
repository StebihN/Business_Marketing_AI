const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addSchema = new Schema({
    user: String,
    title: String,
    text: String,
    type: String,
    extra: String
}, {collection: "Adds"})

module.exports = mongoose.model('Add', addSchema);