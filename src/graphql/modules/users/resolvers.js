const User = require('../../../models/User');
const USER_ADDED = require('./channels');
module.exports = {
  User: {
    fullName: (user) => `${user.firstName} ${user.lastName}`,
  },
  Query: {
    users: () => User.find(),
    user: (_, { id }) => User.findById(id),
  },
  Mutation: {
    createUser: async (_, { data }, { pubSub }) => {
      const user = await User.create(data);

      pubSub.publish(USER_ADDED, {
        userAdded: user,
      });

      return user;
    },
    updateUser: (_, { id, data }) =>
      User.findOneAndUpdate(id, data, { new: true }),
    deleteUser: async (_, { id }) => !!(await User.findOneAndDelete(id)),
  },
  Subscription: {
    userAdded: {
      subscribe: (user, args, { pubSub }) => pubSub.asyncIterator(USER_ADDED),
    },
  },
};
