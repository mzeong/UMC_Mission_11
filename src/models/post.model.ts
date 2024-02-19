import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
    static initiate(sequelize: Sequelize) {
        Post.init(
            {
                title: {
                    type: new DataTypes.STRING(30),
                    allowNull: false,
                },
                content: {
                    type: new DataTypes.STRING(1000),
                    allowNull: true,
                },
                link: {
                    type: new DataTypes.STRING(200),
                    allowNull: true,
                },
                authorId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                type: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                rentDate: {
                    type: new DataTypes.DATE(),
                    allowNull: true,
                },
                rentPlace: {
                    type: new DataTypes.STRING(100),
                    allowNull: true,
                },
                rentStatus: {
                    type: new DataTypes.INTEGER(),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: "Post",
                tableName: "post",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    static associate(db) {
        db.Post.belongsTo(db.User, { foreignKey: "author_id" });
        db.Post.hasMany(db.Image, { foreignKey: "post_id" });
        db.Post.hasMany(db.Bookmark, { foreignKey: "post_id" });
        db.Post.hasMany(db.Comment, { foreignKey: "post_id" });
    }
}

module.exports = Post;
