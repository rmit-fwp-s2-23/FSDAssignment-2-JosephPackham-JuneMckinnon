module.exports = (sequelize, DataTypes) => //Sessiontimes table in database
    sequelize.define('sessiontimes', {
        sessiontime_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
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
            allowNull: false,
            validate: {
                min: -1000, 
                notNull: true,
                isInt: true,
              },
        },
        
       
    });