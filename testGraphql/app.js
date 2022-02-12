const { ApolloServer, gql} = require('apollo-server');

const users = require('./data').users;

const typeDefs = gql`
  type Query{
    users: [User]
    user(id: Int!): User
    me: User
}
  type User{
    id: ID!
    name: String!
}
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (parent, {id})=>{
      console.log(parent);
      console.log(id);
      console.log(typeof id);
      const user = users.filter(user => user.id ===id);
      console.log(user);
      return user[0];
    },
    me: () =>(users[0])
  }
};

const server = new ApolloServer({
  typeDefs, 
  resolvers});


server.listen().then( ({ url }) => {console.log(`apollo-server-express running  at ${url}`);});
