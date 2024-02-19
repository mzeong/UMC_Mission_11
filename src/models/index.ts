import { Sequelize, Dialect } from "sequelize";
import { config as Config } from "../../config/config";
const Bookmark = require("./bookmark.model");
const Comment = require("./comment.model");
const GameApply = require("./game-apply.model");
const Game = require("./game.model");
const GuestUser = require("./guest-user.model");
const Guest = require("./guest.model");
const Image = require("./image.model");
const Member = require("./member.model");
const Post = require("./post.model");
const Profile = require("./profile.model");
const TeamReview = require("./team-review.model");
const Team = require("./team.model");
const UserReview = require("./user-review.model");
const User = require("./user.model");

const env = process.env.NODE_ENV || "development";
const config = Config[env];
const db: any = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect as Dialect,
});

db.sequelize = sequelize;

db.Bookmark = Bookmark;
db.Comment = Comment;
db.GameApply = GameApply;
db.Game = Game;
db.GuestUser = GuestUser;
db.Guest = Guest;
db.Image = Image;
db.Member = Member;
db.Post = Post;
db.Profile = Profile;
db.TeamReview = TeamReview;
db.Team = Team;
db.UserReview = UserReview;
db.User = User;

Bookmark.initiate(sequelize);
Comment.initiate(sequelize);
GameApply.initiate(sequelize);
Game.initiate(sequelize);
GuestUser.initiate(sequelize);
Guest.initiate(sequelize);
Image.initiate(sequelize);
Member.initiate(sequelize);
Post.initiate(sequelize);
Profile.initiate(sequelize);
TeamReview.initiate(sequelize);
Team.initiate(sequelize);
UserReview.initiate(sequelize);
User.initiate(sequelize);

Bookmark.associate(db);
Comment.associate(db);
GameApply.associate(db);
Game.associate(db);
GuestUser.associate(db);
Guest.associate(db);
Image.associate(db);
Member.associate(db);
Post.associate(db);
Profile.associate(db);
TeamReview.associate(db);
Team.associate(db);
UserReview.associate(db);
User.associate(db);

export default db;
