import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class Profile extends Model<InferAttributes<Profile>, InferCreationAttributes<Profile>> {
    static initiate(sequelize: Sequelize) {
        Profile.init(
            {
                userId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                category: {
                    type: new DataTypes.STRING(15),
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
                region: {
                    type: new DataTypes.STRING(200),
                    allowNull: true,
                },
                position: {
                    type: new DataTypes.STRING(50),
                    allowNull: true,
                },
                description: {
                    type: new DataTypes.STRING(400),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: "Profile",
                tableName: "profile",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    static associate(db) {
        db.Profile.belongsTo(db.User, { foreignKey: "user_id" });
    }
}

module.exports = Profile;
