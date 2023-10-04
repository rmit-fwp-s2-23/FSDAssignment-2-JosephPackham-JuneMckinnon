const {Sequelize, DataTypes} = require('sequelize');
const config = require('./config.js');


const db = {
  Op: Sequelize.Op // set Sequelize.Op to Sequelize.Op
}; 

db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

db.user = require('./models/user.js')(db.sequelize, DataTypes);
db.reviews = require('./models/reviews.js')(db.sequelize, DataTypes);

db.reviews.belongsTo(db.user, {foreignKey: {name: 'author_email', allowNull: false}});






db.sync = async () => {
  await db.sequelize.sync();
  await seedData();
};

async function seedData() {   
  const count = await db.user.count();
  if(count > 0)
    return;
  const argon2 = require('argon2');

  let hash = await argon2.hash('abc123', {type: argon2.argon2id});
  await db.user.create({name: 'User1', password_hash: hash, email:'User@Email.com', joined: '2023-04-01'});
  // await db.user.create({name: 'Matthew Bolger', password_hash: hash, email:'MBolger@gmail.com', joined: '2021-04-01'});
  // await db.user.create({name: 'Shekhar Kalra', password_hash: hash, email:'JPackham@gmail.com', joined: '2021-04-01'});
  
  await db.reviews.create({movie: 'Movie1', author_name: 'User1', author_email: 'User@Email.com', review_rating: 5, review_text: 'SampleReview', review_date: '2023-04-01'});
}

module.exports = db;








// const { Sequelize, DataTypes } = require("sequelize");
// const config = require("./config.js");

// const db = {
//   Op: Sequelize.Op
// };

// // Create Sequelize.
// db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
//   host: config.HOST,
//   dialect: config.DIALECT
// });

// // Include models.
// db.user = require("./models/user.js")(db.sequelize, DataTypes);
// db.post = require("./models/reviews.js")(db.sequelize, DataTypes);

// // Relate post and user.
// // db.post.belongsTo(db.user, { foreignKey: { name: "username", allowNull: false } });

// // Learn more about associations here: https://sequelize.org/master/manual/assocs.html

// // Include a sync option with seed data logic included.
// db.sync = async () => {
//   // Sync schema.
//   await db.sequelize.sync();

//   // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
//   // await db.sequelize.sync({ force: true });
  
//   await seedData();
// };

// async  function seedData() {
//   const count = await db.user.count();

//   // Only seed data if necessary.
//   if(count > 0)
//     return;

//   const argon2 = require("argon2");

//   // let hash = await argon2.hash("abc123", { type: argon2.argon2id });
//   // await db.user.create({ username: "mbolger", password_hash: hash, first_name: "Matthew", last_name : "Bolger" });

//   // hash = await argon2.hash("def456", { type: argon2.argon2id });
//   // await db.user.create({ username: "shekhar", password_hash: hash, first_name: "Shekhar", last_name : "Kalra" });
// }

// module.exports = db;
