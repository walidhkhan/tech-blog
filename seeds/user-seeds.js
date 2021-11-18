const { User } = require('../models');

const userMockData = [
    {
        username: "Jason",
        email: "jason@gmail.com",
        password: "jason4305"
    },
    {
        username: "John",
        email: "john@gmail.com",
        password: "jason4305"
    },
    {
        username: "Jim",
        email: "jim@gmail.com",
        password: "jason4305"
    },
    {
        username: "Job",
        email: "Job@gmail.com",
        password: "jason4305"
    },
    {
        username: "Jeff",
        email: "Jeff@gmail.com",
        password: "jason4305"
    }
]

const seedUsers = () => User.bulkCreate(userMockData);

module.exports = seedUsers;