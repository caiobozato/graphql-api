const Article = require('../../../models/Article');
const User = require('../../../models/User');

module.exports = {
  Article: {
    author: (article) => User.findById(article.author),
  },
  Query: {
    articles: () => Article.find(),
    article: (_, { id }) => Article.findById(id),
  },
  Mutation: {
    createArticle: (_, { data }) => Article.create(data),
    updateArticle: (_, { id, data }) =>
      Article.findOneAndUpdate(id, data, { new: true }),
    deleteArticle: async (_, { id }) => !!(await Article.findOneAndDelete(id)),
  },
};
