module.exports = (sequelize, DataTypes) => //User table in database
sequelize.define("user", {
  email: {
    type: DataTypes.STRING(40),
    allowNull: false,
    primaryKey: true

  }, 
  name: {
    type: DataTypes.STRING(32),
    allowNull: false
    
  },
  password_hash: {
    type: DataTypes.STRING(1000),
    allowNull: false

  },

  joined: {
    type: DataTypes.DATE,
    allowNull: false

  },
  blocked: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});