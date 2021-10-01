module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {

        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,

        },
        isAdmin: {
            type: DataTypes.BOOLEAN,

        },


    });

    Users.associate = (models) => {

        Users.hasMany(models.Likes, {
            onDelete: "cascade",
        });

        Users.hasMany(models.Posts, {
            onDelete: "cascade",
        });
        Users.hasMany(models.Comments, {
            onDelete: "cascade",
        });
    };

    return Users;
};