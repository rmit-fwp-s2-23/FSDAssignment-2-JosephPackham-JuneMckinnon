const db = require("../database");

// select all movies
exports.all = async (req, res) => {
  const movies = await db.movies.findAll();
  res.json(movies);
};

// select movie by movie name
exports.one = async (req, res) => {
  const movies = await db.movies.findAll({
    where: {
      movie_name: req.params.movie_name
    }
  });

  res.json(movies);
}

// select movie by movie id
exports.oneById = async (req, res) => {
  const movies = await db.movies.findAll({
    where: {
      movie_id: req.params.movie_id
    }
  });

  res.json(movies);
}

//delete a movie by movie name
exports.delete = async (req, res) => {
  const movies = await db.movies.findByPk(req.params.id);
  await movies.destroy();

  res.json(movies);
}

//update a movie in the database by movie name
exports.update = async (req, res) => {
  const movies = await db.movies.findByPk(req.params.id);
  movies.movie_name = req.body.movie_name;
  movies.movie_image = req.body.movie_image;

  await movies.save();

  res.json(movies);
}

// create a movie 
exports.create = async (req, res) => {
    const movies = await db.movies.create({
        movie_name: req.body.movie_name,
        movie_image: req.body.movie_image
    });
    
    res.json(movies);
};