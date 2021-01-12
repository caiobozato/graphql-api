const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const startServer = require('./server');

startServer({ typeDefs, resolvers });
