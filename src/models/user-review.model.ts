import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class UserReview extends Model<InferAttributes<UserReview>, InferCreationAttributes<UserReview>> {
    static initiate(sequelize: Sequelize) {
        UserReview.init(
            {
                reviewerId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                revieweeId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                guestMatchId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
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
                modelName: "UserReview",
                tableName: "user_review",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    static associate(db) {
        db.UserReview.belongsTo(db.User, { foreignKey: "reviewer_id" });
        db.UserReview.belongsTo(db.User, { foreignKey: "reviewee_id" });
        db.UserReview.belongsTo(db.Guest, { foreignKey: "guest_match_id" });
    }
}

module.exports = UserReview;
