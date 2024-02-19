import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class TeamReview extends Model<InferAttributes<TeamReview>, InferCreationAttributes<TeamReview>> {
    static initiate(sequelize: Sequelize) {
        TeamReview.init(
            {
                reviewerId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                reviewedTeamId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                teamMatchId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: true,
                },
                guestMatchId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: true,
                },
                skillScore: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                mannerScore: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: "TeamReview",
                tableName: "team_review",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    static associate(db) {
        db.TeamReview.belongsTo(db.User, { foreignKey: "reviewer_id" });
        db.TeamReview.belongsTo(db.Team, { foreignKey: "reviewed_team_id" });
        db.TeamReview.belongsTo(db.Game, { foreignKey: "team_match_id" });
        db.TeamReview.belongsTo(db.Guest, { foreignKey: "guest_match_id" });
    }
}

module.exports = TeamReview;
