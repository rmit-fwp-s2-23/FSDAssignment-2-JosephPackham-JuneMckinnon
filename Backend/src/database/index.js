const {Sequelize, DataTypes} = require('sequelize');
const config = require('./config.js');

// Create a new object for the database.
const db = {
  Op: Sequelize.Op // set Sequelize.Op to Sequelize.Op
}; 

// Connect to the database using the configuration settings.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Define the models for the database.
db.user = require('./models/user.js')(db.sequelize, DataTypes);
db.reviews = require('./models/reviews.js')(db.sequelize, DataTypes);
db.tickets = require('./models/tickets.js')(db.sequelize, DataTypes);
db.movies = require('./models/movies.js')(db.sequelize, DataTypes);
db.sessiontimes = require('./models/sessiontimes.js')(db.sequelize, DataTypes);

// Define the relationships between the models.
db.reviews.belongsTo(db.user, { foreignKey: { name: 'author_email', allowNull: false } });
db.tickets.belongsTo(db.user, { foreignKey: { name: 'author_email', allowNull: false } });
db.sessiontimes.belongsTo(db.movies, { foreignKey: { name: 'sessiontime_movie', allowNull: false } });

// Define a function to synchronize the database and seed it with data.
db.sync = async () => {
  await db.sequelize.sync();
  await seedData();
  await seedAssignmentData();
};

// Define a function to seed the database with data.
async function seedData() {   
  const count = await db.reviews.count();
  if(count > 0)
    return;
  const argon2 = require('argon2');

  let hash = await argon2.hash('abc123', {type: argon2.argon2id});
  await db.user.create({name: 'User1', password_hash: hash, email:'User@Email.com', joined: '2023-04-01', blocked: false, admin: false});
  await db.user.create({name: 'Admin', password_hash: hash, email:'admin@email.com', joined: '2023-04-01', blocked: false, admin: false});
   
  await db.reviews.create({movie: 'Movie1', author_name: 'User1', author_email: 'User@Email.com', review_rating: 5, review_text: 'SampleReview', review_date: '2023-04-01'});

   await db.movies.create({movie_name: 'Movie1', movie_image: 'Movie1.jpg'});
   
   await db.sessiontimes.create({sessiontime_movie: 'Movie1', sessiontime_day:'Sample Day', sessiontime_time: '9:30', sessiontime_available_seats: 5,})
  
  await db.tickets.create({movie: 'Movie1', author_name: 'User1', author_email: 'User@Email.com', ticket_quantity: 5, ticket_day: 'Sample Day', ticket_time: '9:30'});
}

 

  
};
//This is sample data for the assignment, This was the data hardcoded in assignment one
async function seedAssignmentData() {
    const count = await db.sessiontimes.count();
    if(count > 1) {
      return;
    }



  
    //if the sample data has not been added, add it
    //add movies (Barbie, Oppenheimer, Avengers, the Lord of the rings)
    await db.movies.create({movie_name: 'Barbie', movie_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSafIMrN5IX_1wR8Bw9j0LDHVvqlSrnnb8PLfc2jBBIboZxeNdhTP3sYiH5z22iQnZuY8M&usqp=CAU'});
    await db.movies.create({movie_name: 'Oppenheimer', movie_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSafIMrN5IX_1wR8Bw9j0LDHVvqlSrnnb8PLfc2jBBIboZxeNdhTP3sYiH5z22iQnZuY8M&usqp=CAU'});
    await db.movies.create({movie_name: 'Avengers', movie_image: 'https://www.bigw.com.au/medias/sys_master/images/images/h7a/h94/14140097986590.jpg'});
    await db.movies.create({movie_name: 'The Lord of the Rings', movie_image: 'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg'});

    // add session times for each movie

    //Barbie Session Times
    //Wednesday 23/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Wednesday 23-10-2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Wednesday 23-10-2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Wednesday 23-10-2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Wednesday 23-10-2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Thursday 24/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Thursday 24-10-2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Thursday 24-10-2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Thursday 24-10-2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Thursday 24-10-2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Friday 25/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Friday 25-10-2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Friday 25-10-2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Friday 25-10-2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Friday 25-10-2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Saturday 26/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Saturday 26-10-2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Saturday 26-10-2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Saturday 26-10-2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Saturday 26-10-2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Sunday 27/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Sunday 27-10-2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Sunday 27-10-2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Sunday 27-10-2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Barbie', sessiontime_day:'Sunday 27-10-2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Oppenheimer Session Times
    //Wednesday 23/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Wednesday 23-10-2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Wednesday 23-10-2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Wednesday 23-10-2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Wednesday 23-10-2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Thursday 24/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Thursday 24-10-2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Thursday 24-10-2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Thursday 24-10-2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Thursday 24-10-2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Friday 25/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Friday 25-10-2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Friday 25-10-2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Friday 25-10-2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Friday 25-10-2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Saturday 26/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Saturday 26-10-2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Saturday 26-10-2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Saturday 26-10-2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Saturday 26-10-2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Sunday 27/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Sunday 27-10-2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Sunday 27-10-2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Sunday 27-10-2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Oppenheimer', sessiontime_day:'Sunday 27-10-2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Lord of the Rings Session Times
    //Wednesday 23/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Wednesday 23-10-2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Wednesday 23-10-2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Wednesday 23-10-2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Wednesday 23-10-2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Thursday 24/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Thursday 24-10-2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Thursday 24-10-2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Thursday 24-10-2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Thursday 24-10-2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Friday 25/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Friday 25-10-2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Friday 25-10-2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Friday 25-10-2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Friday 25-10-2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Saturday 26/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Saturday 26-10-2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Saturday 26-10-2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Saturday 26-10-2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Saturday 26-10-2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Sunday 27/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Sunday 27-10-2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Sunday 27-10-2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Sunday 27-10-2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'The Lord of the Rings', sessiontime_day:'Sunday 27-10-2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});

    //Avengers Session Times
    //Wednesday 23/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Wednesday 23-10-2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Wednesday 23-10-2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Wednesday 23-10-2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Wednesday 23-10-2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Thursday 24/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Thursday 24-10-2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Thursday 24-10-2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Thursday 24-10-2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Thursday 24-10-2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Friday 25/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Friday 25-10-2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Friday 25-10-2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Friday 25-10-2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Friday 25-10-2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Saturday 26/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Saturday 26-10-2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Saturday 26-10-2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Saturday 26-10-2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Saturday 26-10-2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
    //Sunday 27/10/2023
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Sunday 27-10-2023', sessiontime_time: '9:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Sunday 27-10-2023', sessiontime_time: '12:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Sunday 27-10-2023', sessiontime_time: '15:00', sessiontime_available_seats: 10});
    await db.sessiontimes.create({sessiontime_movie: 'Avengers', sessiontime_day:'Sunday 27-10-2023', sessiontime_time: '18:00', sessiontime_available_seats: 10});
  


}


module.exports = db;







