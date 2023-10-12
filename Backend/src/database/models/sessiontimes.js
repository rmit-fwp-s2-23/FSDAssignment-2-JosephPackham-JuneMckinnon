module.exports = (sequelize, DataTypes) =>
    sequelize.define('sessiontimes', {
        sessiontime_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        sessiontime_movie: {
            type: DataTypes.STRING(100),
            allowNull: false,
            ForeignKey: true
        },
        
        sessiontime_time: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        sessiontime_day: {
            type: DataTypes.STRING(100),
            allowNull: false,
            

        },
        sessiontime_available_seats: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
       
    });