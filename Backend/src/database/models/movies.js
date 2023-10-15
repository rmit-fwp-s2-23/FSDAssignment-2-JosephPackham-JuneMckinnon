module.exports = (sequelize, DataTypes) => //Movie table in database
    sequelize.define("movie", {
        movie_name: {
            type: DataTypes.STRING(32),
            allowNull: false,
            primaryKey: true
        },
        
        movie_image: {
            type: DataTypes.STRING(500),
            allowNull: false
        }
    });