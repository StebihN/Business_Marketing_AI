const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sloganSchema = new Schema({
    user: String,
    slogans: {
        slogan1: String,
        slogan2: String,
        slogan3: String,
        slogan4: String,
        slogan5: String
    }
}, {collection: "Slogans"})

module.exports = mongoose.model('Slogan', sloganSchema);

