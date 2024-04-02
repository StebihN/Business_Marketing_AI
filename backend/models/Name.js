const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nameSchema = new Schema({
    user: String,
    names: {
        name1: String,
        name2: String,
        name3: String,
        name4: String,
        name5: String
    }
}, {collection: "Names"})

module.exports = mongoose.model('Name', nameSchema);

