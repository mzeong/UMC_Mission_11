import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class Game extends Model<InferAttributes<Game>, InferCreationAttributes<Game>> {
    static initiate(sequelize: Sequelize) {
        Game.init(
            {
                hostTeamId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                opposingTeamId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: true,
                },
                gameTime: {
                    type: new DataTypes.DATE(),
                    allowNull: false,
                },
                gameDuration: {
                    type: new DataTypes.TIME(),
                    allowNull: false,
                },
                category: {
                    type: new DataTypes.STRING(15),
                    allowNull: false,
                },
                description: {
                    type: new DataTypes.STRING(400),
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
                modelName: "Game",
                tableName: "game",
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    static associate(db) {
        db.Game.belongsTo(db.Team, { foreignKey: "host_team_id", as: "HostTeam" });
        db.Game.belongsTo(db.Team, { foreignKey: "opposing_team_id" });
        db.Game.hasMany(db.GameApply, { foreignKey: "game_id" });
        db.Game.hasMany(db.TeamReview, { foreignKey: "team_match_id" });
    }
}

module.exports = Game;
