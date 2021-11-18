const { Comment } = require('../models');

const mockCommentData = [
    {
        user_id: 1,
        post_id: 2,
        comment_text: "This article is Awesome!"
    },
    {
        user_id: 3,
        post_id: 5,
        comment_text: "This article is lame!"
    },
    {
        user_id: 2,
        post_id: 4,
        comment_text: "This article is useful!"
    },
]

const seedComments = () => Comment.bulkCreate(mockCommentData);

module.exports = seedComments;