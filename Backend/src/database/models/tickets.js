//Ticket Reservation table in database

module.exports = (sequelize, DataTypes) => 
    sequelize.define("ticket", {
        ticket_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        movie: {
            type: DataTypes.STRING(32),
            allowNull: false,
            ForeignKey: true
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
        ticket_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ticket_day: {
            type: DataTypes.STRING(32),
            allowNull: false,
            ForeignKey: true
            
        },
        ticket_time: {
            type: DataTypes.STRING(32),
            allowNull: false,
            ForeignKey: true
            
        }
    });

