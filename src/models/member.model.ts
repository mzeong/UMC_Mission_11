import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class Member extends Model<InferAttributes<Member>, InferCreationAttributes<Member>> {
    static initiate(sequelize: Sequelize) {
        Member.init(
            {
                teamId: {
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
                modelName: "Member",
                tableName: "member",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    static associate(db) {
        db.Member.belongsTo(db.Team, { foreignKey: "team_id" });
        db.Member.belongsTo(db.User, { foreignKey: "user_id" });
    }
}

module.exports = Member;
