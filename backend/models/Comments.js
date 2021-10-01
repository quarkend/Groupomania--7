module.exports = (sequelize, DataTypes) => {

    const Comments = sequelize.define("Comments", {
        postId: {
            type: DataTypes.INTEGER,

        },
        commentBody: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: DataTypes.INTEGER,
    });
    Comments.associate = (models) => {
        Comments.belongsTo(models.Users, {
            foreignKey: 'userId',
            as: 'user',
        })
        Comments.belongsTo(models.Posts, {
            foreignKey: 'postId',
            as: 'post',
        })
    }

    return Comments;
};