import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    static initiate(sequelize: Sequelize) {
        User.init(
            {
                nickname: {
                    type: new DataTypes.STRING(10),
                    allowNull: false,
                },
                provider: {
                    type: new DataTypes.STRING(10),
                    allowNull: false,
                },
                providerId: {
                    type: new DataTypes.STRING(50),
                    allowNull: false,
                },
                refreshToken: {
                    type: new DataTypes.STRING(150),
                    allowNull: true,
                },
                gender: {
                    type: new DataTypes.STRING(1),
                    allowNull: true,
                },
                ageGroup: {
                    type: new DataTypes.STRING(10),
                    allowNull: true,
                },
                height: {
                    type: new DataTypes.INTEGER(),
                    allowNull: true,
                },
                avatarUrl: {
                    type: new DataTypes.STRING(200),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: "User",
                tableName: "user",
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    static associate(db) {
        db.User.hasMany(db.Profile, { foreignKey: "user_id" });
        db.User.hasMany(db.Team, { foreignKey: "leader_id" });
        db.User.hasMany(db.Member, { foreignKey: "user_id" });
        db.User.hasMany(db.GuestUser, { foreignKey: "user_id" });
        db.User.hasMany(db.Post, { foreignKey: "author_id" });
        db.User.hasMany(db.Bookmark, { foreignKey: "user_id" });
        db.User.hasMany(db.Comment, { foreignKey: "author_id" });
        db.User.hasMany(db.TeamReview, { foreignKey: "reviewer_id" });
        db.User.hasMany(db.UserReview, { foreignKey: "reviewer_id" });
        db.User.hasMany(db.UserReview, { foreignKey: "reviewee_id" });
    }
}

module.exports = User;
