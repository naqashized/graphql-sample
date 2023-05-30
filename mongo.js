const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/graphql', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  
const MongoSchema = mongoose.Schema;

module.exports = {MongoSchema, mongoose};