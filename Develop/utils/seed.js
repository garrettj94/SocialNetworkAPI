const connection = require('../config/connection');
const { User, Thoughts } = require('../models');
const { getRandomName, getRandomAssignments } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await User.deleteMany({});

  // Drop existing students
  await Thoughts.deleteMany({});

  // Create empty array to hold the students
  const Thoughts = [];

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const reactions = getRandomReactions(20);

    const Thoughts = getRandomThought();

    Thoughts.push({
      thoughtText,
      createdAt,
      username,
      reaction,
    });
  }

  // Add students to the collection and await the results
  await Thoughts.collection.insertMany(Thougts);

  // Add courses to the collection and await the results
  await User.collection.insertOne({
    userName,
    email,
    thougts: [...Thoughts],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(Thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
