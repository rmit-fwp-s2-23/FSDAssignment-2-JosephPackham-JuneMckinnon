module.exports = (sequelize, DataTypes) =>
    sequelize.define('sessiontimes', {
        sessiontime_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        sessiontime_movie: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        
        sessiontime_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        sessiontime_time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        sessiontime_available_seats: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sessiontime_total_seats: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
       
    });