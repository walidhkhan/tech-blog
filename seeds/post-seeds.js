const {Post} = require('../models');

const mockPostData = [
    {
        user_id: 3,
        post_url: "",
        title: "Testing seed data" 
    }
]

const seedPosts = () => Post.bulkCreate(mockPostData);

module.exports = seedPosts;