const { ApolloServer  } = require('apollo-server')
const db = require('./config/db')
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typedefs')

const PORT = process.env.port || 5000 

db()

const server =  new ApolloServer ({
    typeDefs,
    resolvers ,
    context : ({req}) => ({req})
})

server.listen({ port : PORT})
.then( res => console.log(`Server running at ${res.url}`))