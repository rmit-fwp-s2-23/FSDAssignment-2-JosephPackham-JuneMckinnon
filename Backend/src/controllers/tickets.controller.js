const db = require("../database");

//select all tickets
exports.all = async (req, res) => {
  const tickets = await db.tickets.findAll();

  res.json(tickets);
};

//create a new ticket
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

//select ticket by movie name
exports.one = async (req, res) => {
  const tickets = await db.tickets.findAll({
    where: {
      movie: req.params.movie
    }
  });

  res.json(tickets);
}

//select ticket by email
exports.email = async (req, res) => {
  const tickets = await db.tickets.findAll({
    where: {
      author_email: req.params.email
    }
  });

  res.json(tickets);
}

//delete a ticket by ticket_id
exports.delete = async (req, res) => {
  const tickets = await db.tickets.findByPk(req.params.id);
  await tickets.destroy();

  res.json(tickets);
}

//update a ticket in the database by ticket_id
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

//update a ticket in the database
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

