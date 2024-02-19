import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class Team extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> {
    static initiate(sequelize: Sequelize) {
        Team.init(
            {
                logo: {
                    type: new DataTypes.STRING(200),
                    allowNull: true,
                },
                name: {
                    type: new DataTypes.STRING(20),
                    allowNull: false,
                },
                description: {
                    type: new DataTypes.STRING(400),
                    allowNull: true,
                },
                gender: {
                    type: new DataTypes.STRING(1),
                    allowNull: false,
                },
                ageGroup: {
                    type: new DataTypes.STRING(10),
                    allowNull: false,
                },
                region: {
                    type: new DataTypes.STRING(200),
                    allowNull: false,
                },
                gymName: {
                    type: new DataTypes.STRING(100),
                    allowNull: false,
                },
                leaderId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                inviteCode: {
                    type: new DataTypes.STRING(100),
                    allowNull: false,
                },
                skillLevel: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                mannerLevel: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                category: {
                    type: new DataTypes.STRING(15),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: "Team",
                tableName: "team",
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    static associate(db) {
        db.Team.hasMany(db.Member, { foreignKey: "team_id" });
        db.Team.belongsTo(db.User, { foreignKey: "leader_id" });
        db.Team.hasMany(db.Game, { foreignKey: "host_team_id" });
        db.Team.hasMany(db.Game, { foreignKey: "opposing_team_id" });
        db.Game.hasMany(db.GameApply, { foreignKey: "team_id" });
        db.Team.hasMany(db.Guest, { foreignKey: "team_id" });
        db.Team.hasMany(db.TeamReview, { foreignKey: "reviewed_team_id" });
    }
}

module.exports = Team;
