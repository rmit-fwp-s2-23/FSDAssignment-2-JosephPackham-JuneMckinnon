const db = require("../database");

// Select all tickets from the database.
exports.all = async (req, res) => {
  const tickets = await db.tickets.findAll();

  res.json(tickets);
};

// Create a new ticket in the database.
exports.create = async (req, res) => {
  const tickets = await db.tickets.create({
    movie: req.body.movie,
    author_name: req.body.author_name,
    author_email: req.body.author_email,
    ticket_quantity: req.body.ticket_quantity,
    ticket_day: req.body.ticket_day,
    ticket_time: req.body.ticket_time
  });

  res.json(tickets);
};

// Select tickets by movie name.
exports.one = async (req, res) => {
  const tickets = await db.tickets.findAll({
    where: {
      movie: req.params.movie
    }
  });

  res.json(tickets);
}

// Select tickets by author email.
exports.email = async (req, res) => {
  const tickets = await db.tickets.findAll({
    where: {
      author_email: req.params.email
    }
  });

  res.json(tickets);
}

// Delete a ticket by ticket ID.
exports.delete = async (req, res) => {
  const tickets = await db.tickets.findByPk(req.params.id);
  await tickets.destroy();

  res.json(tickets);
}

// Update a ticket in the database by ticket ID.
exports.update = async (req, res) => {
  const tickets = await db.tickets.findByPk(req.params.id);
  tickets.movie = req.body.movie;
  tickets.author_name = req.body.author_name;
  tickets.author_email = req.body.author_email;
  tickets.ticket_quantity = req.body.ticket_quantity;
  tickets.ticket_day = req.body.ticket_day;
  tickets.ticket_time = req.body.ticket_time;

  await tickets.save();

  res.json(tickets);
}