const {MongoSchema, mongoose} = require('./mongo');

const userSchema = new MongoSchema({
    id:String,
    name: String,
    age: Number,
    address: String,
    dob: String
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;