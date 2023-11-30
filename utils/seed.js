const connection = require('../config/connection');
const { User, Thought } = require('../models');
const {
  getRandomName,
  getRandomPost,
} = require('./data');

// Start the seeding runtime timer
console.time('seeding');

// Creates a connection to MongoDB
connection.once('open', async () => {
  // Delete the collections if they exist
  await Promise.all([User.deleteMany(), Thought.deleteMany()]);

  // Array to hold generated users and thoughts
  const users = [];
  const thoughts = [];

  // Generate users and thoughts
  for (let i = 0; i < 10; i++) {
    const username = getRandomName();
    const email = `${username.split(' ')[0].toLowerCase()}@example.com`; // Creating a fake email using the username

    // Create a user
    const user = await User.create({ username, email });
    users.push(user);

    // Create thoughts associated with the user
    for (let j = 0; j < 2; j++) {
      const thoughtText = getRandomPost(10); // Random thought text
      const thought = await Thought.create({
        thoughtText,
        username: user.username,
      });
      thoughts.push(thought);

      for (let j = 0; j < 2; j++) {
        const thoughtText = getRandomPost(10);
        const thought = await Thought.create({ thoughtText, username: user.username });
        thoughts.push(thought);
        
        // Attach thought to the user
        user.thoughts.push(thought._id);
        await user.save();
      }
    }

    // Add friends to the current user
    const friendsToAdd = 3; // Change the number of friends to add
    const friends = users
      .filter((u) => u._id !== user._id) // Exclude the current user
      .slice(0, friendsToAdd); // Get a subset of users as friends

    user.friends.push(...friends.map((f) => f._id));
    await user.save();
  }

  // Convert documents to plain objects before displaying in console.table
  const userObjects = users.map((user) => user.toObject());
  const thoughtObjects = thoughts.map((thought) => thought.toObject());

  console.table(userObjects);
  console.table(thoughtObjects);
  console.timeEnd('seeding complete 🌱');
  process.exit(0);
});
