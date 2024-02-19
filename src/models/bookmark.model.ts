import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class Bookmark extends Model<InferAttributes<Bookmark>, InferCreationAttributes<Bookmark>> {
    static initiate(sequelize: Sequelize) {
        Bookmark.init(
            {
                postId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                userId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: "Bookmark",
                tableName: "bookmark",
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    static associate(db) {
        db.Bookmark.belongsTo(db.Post, { foreignKey: "post_id" });
        db.Bookmark.belongsTo(db.User, { foreignKey: "user_id" });
    }
}

module.exports = Bookmark;
