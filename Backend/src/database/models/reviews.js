module.exports = (sequelize, DataTypes) =>
  sequelize.define("review", {
    review_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    movie: {
      type: DataTypes.STRING(100),
      allowNull: false,

      
    },
    author_name: {
      type: DataTypes.STRING(32),
      allowNull: false

    },
    author_email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      ForeignKey: true
    },

    review_rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review_text: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    review_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
