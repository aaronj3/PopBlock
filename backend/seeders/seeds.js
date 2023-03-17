// const mongoose = require("mongoose");
// const { mongoURI: db } = require('../config/keys.js');
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const { faker } = require('@faker-js/faker');

// const NUM_SEED_USERS = 10;

// // Create users
// const users = [];
// const colors = ["#E74C3C", "#2980B9", "#1ABC9C", "#F39C12"];

// users.push(
//   new User ({
//     username: 'demo-user',
//     hashedPassword: bcrypt.hashSync('password', 10),
//     color: colors[Math.floor(Math.random() * colors.length)]
//   })
// )

// for (let i = 1; i < NUM_SEED_USERS; i++) {
//   const firstName = faker.name.firstName();
//   const lastName = faker.name.lastName();
//   users.push(
//     new User ({
//       username: faker.internet.userName(firstName, lastName),
//       hashedPassword: bcrypt.hashSync('password', 10),
//       color: colors[Math.floor(Math.random() * colors.length)]
//     })
//   )
// }
  
    
// // Connect to database
// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => {
//     console.log('Connected to MongoDB successfully');
//     insertSeeds();
//   })
//   .catch(err => {
//     console.error(err.stack);
//     process.exit(1);
//   });

// // Reset and seed db

// // const insertSeeds = () => {
// //   console.log("Resetting db and seeding users...");

// //   User.collection.drop()
// //                  .then(() => User.insertMany(users))
// //                  .then(() => {
// //                    console.log("Done!");
// //                    mongoose.disconnect();
// //                  })
// //                  .catch(err => {
// //                    console.error(err.stack);
// //                    process.exit(1);
// //                  });
// // };

// const insertSeeds = () => {
//   console.log("Seeding users...");

//   User.insertMany(users)
//       .then(() => {
//         console.log("Done!");
//         mongoose.disconnect();
//       })
//       .catch(err => {
//         console.error(err.stack);
//         process.exit(1);
//       });
// };
