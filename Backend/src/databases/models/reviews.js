module.exports = (sequelize, DataTypes) =>
  sequelize.define("review", {
    author_name: {
      type: DataTypes.STRING(32),
      allowNull: false,

      
    },
    author_email: {
      type: DataTypes.STRING(40),
      allowNull: false
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
