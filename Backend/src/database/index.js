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
db.tickets = require('./models/tickets.js')(db.sequelize, DataTypes);
db.movies = require('./models/movies.js')(db.sequelize, DataTypes);
db.sessiontimes = require('./models/sessiontimes.js')(db.sequelize, DataTypes);

db.reviews.belongsTo(db.user, { foreignKey: { name: 'author_email', allowNull: false } });
db.tickets.belongsTo(db.user, { foreignKey: { name: 'author_email', allowNull: false } });
db.tickets.belongsTo(db.sessiontimes, { foreignKey: { name: 'ticket_session', allowNull: false } });
db.sessiontimes.belongsTo(db.movies, { foreignKey: { name: 'sessiontime_movie', allowNull: false } });






db.sync = async () => {
  await db.sequelize.sync();
  await seedData();
  await seedAssignmentData();
};

async function seedData() {   
  const count = await db.tickets.count();
  if(count > 0)
    return;
  const argon2 = require('argon2');

  let hash = await argon2.hash('abc123', {type: argon2.argon2id});
  await db.user.create({name: 'User1', password_hash: hash, email:'User@Email.com', joined: '2023-04-01', blocked: false, admin: true});
  // await db.user.create({name: 'Matthew Bolger', password_hash: hash, email:'MBolger@gmail.com', joined: '2021-04-01'});
  // await db.user.create({name: 'Shekhar Kalra', password_hash: hash, email:'JPackham@gmail.com', joined: '2021-04-01'});
  
  await db.reviews.create({movie: 'Movie1', author_name: 'User1', author_email: 'User@Email.com', review_rating: 5, review_text: 'SampleReview', review_date: '2023-04-01'});

   await db.movies.create({movie_name: 'Movie1', movie_image: 'Movie1.jpg'});
   
   await db.sessiontimes.create({sessiontime_movie: 'Movie1', sessiontime_day:'Sample Day', sessiontime_time: '9:30', sessiontime_available_seats: 5,})
  
  await db.tickets.create({movie: 'Movie1', author_name: 'User1', author_email: 'User@Email.com', ticket_quantity: 5, ticket_session: '1'});

 

  
};
//This is sample data for the assignment, This was the data hardcoded in assignment one
async function seedAssignmentData() {
    const count = await db.sessiontimes.count();
    if(count > 1) {
      return;
    }



  
    //if the sample data has not been added, add it
    //add movies (Barbie, Oppenheimer, Avengers, the Lord of the rings)
    await db.movies.create({movie_name: 'Barbie', movie_image: '../images/barbie/barbie-poster.jpg'});
    await db.movies.create({movie_name: 'Oppenheimer', movie_image: '../images/Oppenheimer.jpg'});
    await db.movies.create({movie_name: 'Avengers', movie_image: '../images/avengersendgame_lob_crd_05.jpg'});
    await db.movies.create({movie_name: 'The Lord of the Rings', movie_image: '../images/lordoftherings.jpg'});

    // add session times for each movie

    //Barbie Session Times
    //Wednesday 23/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Wednesday 23/10/2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Wednesday 23/10/2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Wednesday 23/10/2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Wednesday 23/10/2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Thursday 24/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Thursday 24/10/2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Thursday 24/10/2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Thursday 24/10/2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Thursday 24/10/2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Friday 25/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Friday 25/10/2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Friday 25/10/2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Friday 25/10/2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Friday 25/10/2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Saturday 26/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Saturday 26/10/2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Saturday 26/10/2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Saturday 26/10/2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Saturday 26/10/2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Sunday 27/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Sunday 27/10/2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Sunday 27/10/2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Sunday 27/10/2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Sunday 27/10/2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});

    //Oppenheimer Session Times
    //Wednesday 23/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Wednesday 23/10/2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Wednesday 23/10/2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Wednesday 23/10/2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Wednesday 23/10/2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Thursday 24/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Thursday 24/10/2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Thursday 24/10/2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Thursday 24/10/2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Thursday 24/10/2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Friday 25/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Friday 25/10/2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Friday 25/10/2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Friday 25/10/2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Friday 25/10/2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Saturday 26/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Saturday 26/10/2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Saturday 26/10/2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Saturday 26/10/2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Saturday 26/10/2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Sunday 27/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Sunday 27/10/2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Sunday 27/10/2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Sunday 27/10/2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Sunday 27/10/2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});

    //Avengers Session Times
    //Wednesday 23/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Wednesday 23/10/2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Wednesday 23/10/2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Wednesday 23/10/2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Wednesday 23/10/2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Thursday 24/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Thursday 24/10/2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Thursday 24/10/2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Thursday 24/10/2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Thursday 24/10/2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Friday 25/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Friday 25/10/2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Friday 25/10/2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Friday 25/10/2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Friday 25/10/2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Saturday 26/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Saturday 26/10/2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Saturday 26/10/2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Saturday 26/10/2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Saturday 26/10/2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Sunday 27/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Sunday 27/10/2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Sunday 27/10/2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Sunday 27/10/2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Sunday 27/10/2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});

    //The Lord of the Rings Session Times
    //Wednesday 23/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Wednesday 23/10/2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Wednesday 23/10/2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Wednesday 23/10/2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Wednesday 23/10/2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Thursday 24/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Thursday 24/10/2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Thursday 24/10/2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Thursday 24/10/2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    //Friday 25/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Friday 25/10/2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Friday 25/10/2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Friday 25/10/2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    //Saturday 26/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Saturday 26/10/2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Saturday 26/10/2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});

  


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
