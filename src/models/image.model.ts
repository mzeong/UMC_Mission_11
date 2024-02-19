import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class Image extends Model<InferAttributes<Image>, InferCreationAttributes<Image>> {
    static initiate(sequelize: Sequelize) {
        Image.init(
            {
                postId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                url: {
                    type: new DataTypes.STRING(1000),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: true,
                modelName: "Image",
                tableName: "image",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    static associate(db) {
        db.Image.belongsTo(db.Post, { foreignKey: "post_id" });
    }
}

module.exports = Image;
