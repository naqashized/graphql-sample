var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphQLSchema = require('./graphql-schema');
const Users = require('./user')


// Return a single user (based on id)
var getUser = async function(args) {
  var userID = args.id;
  return await Users.find({ id: userID}).select("id name address dob").exec();
}

// Return a list of users (takes an optional name parameter)
var retrieveUsers = async function(args) {

  if (args.name) {
    var name = args.name;
    return await Users.find({ name: name}).select("id name address dob").exec();
  } else {
    return Users.find().exec();
  }
}

var addUser=async function(args){
  const doc = new Users({
    id: args.input.id,
    name: args.input.name,
    address: args.input.address,
    dob: args.input.dob
  });
  await doc.save(args.input);
  return Users.findOne();

}

// Root resolver
var root = { 
  user: getUser,  // Resolver function to return user with specific id
  users: retrieveUsers,
  addUser:addUser
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: graphQLSchema,  // Must be provided
  rootValue: root,
  graphiql: true,  // Enable GraphiQL when server endpoint is accessed in browser
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));