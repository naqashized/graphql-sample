var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Initialize a GraphQL schema
var schema = buildSchema(`
  type Query {
    user(id: Int!): User
    users(name: String): [User]
  },

  type Mutation{
    addUser(input: UserInput!):User

  },
  type User {
    id: Int
    name: String
    address: String
    dob: String
  },

  input UserInput{
        id: Int
    name: String
    address: String
    dob: String

  }
`);

// Sample users
var users = [
  {
    id: 1,
    name: 'David',
    age: '21',
    address: 'Street 21, Block 1',
    dob: '12/09/1981'
  },
  {
    id: 2,
    name: 'Harley',
    age: '22',
    address: 'Street 21, Block 2',
    dob: '12/09/1909'
  },
  {
    id: 3,
    name: 'Bob',
    age: '23',
    address: 'Street 21, Block 3',
    dob: '12/09/1994'
  },
  {
    id: 4,
    name: 'Josephine',
    age: '23',
    address: 'Street 21, Block 4',
    dob: '12/09/1989'
  }
];

// Return a single user (based on id)
var getUser = function(args) {
  var userID = args.id;
  return users.filter(user => user.id == userID)[0];
}

// Return a list of users (takes an optional name parameter)
var retrieveUsers = function(args) {
  if (args.name) {
    var name = args.name;
    return users.filter(user => user.name === name);
  } else {
    return users;
  }
}

var addUser=function(args){
  console.log("adding user")
  users.push(args.input);
  var userID = args.id
  return getUser(args.input);

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
  schema: schema,  // Must be provided
  rootValue: root,
  graphiql: true,  // Enable GraphiQL when server endpoint is accessed in browser
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));