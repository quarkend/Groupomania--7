module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        userId: {
            type: DataTypes.INTEGER,
        },
        title: {
            type: DataTypes.STRING,

        },
        postText: {
            type: DataTypes.STRING,

        },
        username: {
            type: DataTypes.STRING,

        },
    });

    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade",
        });

        Posts.hasMany(models.Likes, {
            onDelete: "cascade",
        });
    };
    return Posts;
};