var { buildSchema } = require('graphql');

var graphQLSchema = buildSchema(`
  type Query {
    user(id: String!): [User]
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

module.exports= graphQLSchema;