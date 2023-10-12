const db = require("../database");

//select all session times
exports.all = async (req, res) => {
  const sessiontimes = await db.sessiontimes.findAll();
  res.json(sessiontimes);
};

//select session time by movie name
exports.one = async (req, res) => {
  const sessiontimes = await db.sessiontimes.findAll({
    where: {
      movie: req.params.movie
    }
  });

  res.json(sessiontimes);
}

//delete a session time by session time id
exports.delete = async (req, res) => {
  const sessiontimes = await db.sessiontimes.findByPk(req.params.id);
  await sessiontimes.destroy();

  res.json(sessiontimes);
}

//update a session time in the database by session time id
exports.update = async (req, res) => {
  const sessiontimes = await db.sessiontimes.findByPk(req.params.id);
  sessiontimes.sessiontime_movie = req.body.sessiontime_movie;
  sessiontimes.sessiontime_date = req.body.sessiontime_date;
  sessiontimes.sessiontime_time = req.body.sessiontime_time;
  sessiontimes.sessiontime_available_seats = req.body.sessiontime_available_seats;
  sessiontimes.sessiontime_total_seats = req.body.sessiontime_total_seats;

  await sessiontimes.save();

  res.json(sessiontimes);
}

//create a session time in the database
exports.create = async (req, res) => {
  const sessiontimes = await db.sessiontimes.create({
    sessiontime_movie: req.body.sessiontime_movie,
    sessiontime_date: req.body.sessiontime_date,
    sessiontime_time: req.body.sessiontime_time,
    sessiontime_available_seats: req.body.sessiontime_available_seats,
    sessiontime_total_seats: req.body.sessiontime_total_seats
  });

  res.json(sessiontimes);
};