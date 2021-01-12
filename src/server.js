require('dotenv').config();
const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const createServer = ({ typeDefs, resolvers }) => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const pubSub = new PubSub();
  const server = new ApolloServer({ typeDefs, resolvers, context: { pubSub } });
  server.listen(process.env.PORT || 4000).then(({ url }) => {
    console.log(`Server running on ${url}`);
  });
};

module.exports = createServer;
