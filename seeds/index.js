const seedPosts = require('./post-seeds.js');
const seedUsers = require('./user-seeds.js');
const seedComments = require('./comment-seeds.js');

const sequelize = require('../config/connection');

const populateSeedFields = async () => {
    await sequelize.sync({ force: true });
    console.log('database synced');

    await seedUsers();
    console.log('users seeded');

    await seedPosts();
    console.log('posts seeded');

    await seedComments();
    console.log('comments seeded');

    process.exit(0);

};

populateSeedFields();