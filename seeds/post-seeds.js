const {Post} = require('../models');

const mockPostData = [
    {
        user_id: 1,
        post_url: "testurl.com",
        title: "Testing seed data" 
    },
    {
        user_id: 2,
        post_url: "testurl.com",
        title: "Testing seed data" 
    },
    {
        user_id: 3,
        post_url: "testurl.com",
        title: "Testing seed data" 
    },
    {
        user_id: 4,
        post_url: "testurl.com",
        title: "Testing seed data" 
    },
    {
        user_id: 5,
        post_url: "testurl.com",
        title: "Testing seed data" 
    },
]

const seedPosts = () => Post.bulkCreate(mockPostData);

module.exports = seedPosts;