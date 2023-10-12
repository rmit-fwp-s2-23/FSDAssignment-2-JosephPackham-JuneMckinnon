module.exports = (sequelize, DataTypes) =>
    sequelize.define('sessiontimes', {
        sessiontime_movie: {
            type: DataTypes.STRING(100),
            allowNull: false,
            ForeignKey: true
        },
        
        sessiontime_time: {
            type: DataTypes.STRING(100),
            allowNull: false,
            primaryKey: true
        },
        sessiontime_available_seats: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
       
    });