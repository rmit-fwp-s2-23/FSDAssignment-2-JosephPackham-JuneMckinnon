module.exports = (sequelize, DataTypes) =>
    sequelize.define("movie", {
        movie_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        movie_name: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        
        movie_image: {
            type: DataTypes.STRING(500),
            allowNull: false
        }
    });