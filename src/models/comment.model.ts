import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
    static initiate(sequelize: Sequelize) {
        Comment.init(
            {
                postId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                authorId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                content: {
                    type: new DataTypes.STRING(500),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: "Comment",
                tableName: "comment",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    static associate(db) {
        db.Comment.belongsTo(db.Post, { foreignKey: "post_id" });
        db.Comment.belongsTo(db.User, { foreignKey: "author_id" });
    }
}

module.exports = Comment;
