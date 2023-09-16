module.exports = (sequelize, DataTypes) =>
sequelize.define("user", {
  name: {
    type: DataTypes.STRING(32),
    primaryKey: true
  },
  password_hash: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  joined: {
    type: DataTypes.DATE,
    allowNull: false
  }
});