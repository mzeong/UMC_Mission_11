import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class GameApply extends Model<InferAttributes<GameApply>, InferCreationAttributes<GameApply>> {
    static initiate(sequelize: Sequelize) {
        GameApply.init(
            {
                gameId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: true,
                },
                teamId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: "GameApply",
                tableName: "game_apply",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    static associate(db) {
        db.GameApply.belongsTo(db.Game, { foreignKey: "game_id" });
        db.GameApply.belongsTo(db.Team, { foreignKey: "team_id" });
    }
}

module.exports = GameApply;
