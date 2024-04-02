const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGO_URL;

const connect = async () => {
  try{
    await mongoose.connect(url,{
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  } catch(err){
    console.error(err);
  }
}
module.exports = connect;