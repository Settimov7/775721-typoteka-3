`use strict`;

module.exports = {
  MODULE_NAME: `--generate`,
  DAY_IN_MILLISECONDS: 86400000,
  DATE_LIMIT_IN_DAYS: 90,
  FilePath: {
    TITLES: `./data/titles.txt`,
    CATEGORIES: `./data/categories.txt`,
    SENTENCES: `./data/sentences.txt`,
    COMMENTS: `./data/comments.txt`,
  },
  QuantityLimit: {
    MIN: 1,
    MAX: 1000,
  },
  AnnounceSizeLimit: {
    MIN: 1,
    MAX: 5,
  },
  CommentTextSentencesLimit: {
    MIN: 1,
    MAX: 3,
  },
  CommentsQuantityLimit: {
    MIN: 0,
    MAX: 5,
  }
}
