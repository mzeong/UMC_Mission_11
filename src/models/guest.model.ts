import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class Guest extends Model<InferAttributes<Guest>, InferCreationAttributes<Guest>> {
    static initiate(sequelize: Sequelize) {
        Guest.init(
            {
                teamId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                gameTime: {
                    type: new DataTypes.DATE(6),
                    allowNull: false,
                },
                description: {
                    type: new DataTypes.STRING(400),
                    allowNull: true,
                },
                recruitCount: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                gameDuration: {
                    type: new DataTypes.TIME(),
                    allowNull: false,
                },
                status: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                    defaultValue: 0,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: "Guest",
                tableName: "guest",
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    static associate(db) {
        db.Guest.hasMany(db.GuestUser, { foreignKey: "guest_id" });
        db.Guest.belongsTo(db.Team, { foreignKey: "team_id" });
        db.Guest.hasMany(db.TeamReview, { foreignKey: "guest_match_id" });
        db.Guest.hasMany(db.UserReview, { foreignKey: "guest_match_id" });
    }
}

module.exports = Guest;
