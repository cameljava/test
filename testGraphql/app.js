const { ApolloServer, gql} = require('apollo-server');

const users = require('./data').users;
const cars = require('./data').cars;

const typeDefs = gql`
  type Query{
    users: [User]
    user(id: Int!): User
    cars: [Car]
    car(id: Int!): Car
    me: User
}
  type User{
    id: ID!
    name: String!
}
  type Car{
    id: ID!
    build: String!
    make: String!
    color: String!
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
      return user[0];
    },
    cars: () => cars,
    car: (parent, {id})=>{
      console.log(parent);
      const car = cars.filter(car => car.id ===id);
      return car[0];
    },
    me: () =>(users[0])
  }
};

const server = new ApolloServer({
  typeDefs, 
  resolvers});


server.listen().then( ({ url }) => {console.log(`apollo-server-express running  at ${url}`);});
