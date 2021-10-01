module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define("Likes");

    return Likes;
};
// module.exports = (sequelize, DataTypes) => {
//     const Likes = sequelize.define("Likes", {
//         UserId: {
//             type: DataTypes.INTEGER,
//         },

//         // postId: {
//         //     like: DataTypes.INTEGER,

//         // },

//         like: {
//             type: DataTypes.INTEGER,

//         },


//     });


//     Users.associate = (models) => {




//         Users.hasMany(models.Likes, {
//             foreignKey: 'userId',
//             as: 'user',
//             onDelete: "cascade",
//         });

//         Users.hasMany(models.Posts, {
//             through: models.Like,
//             foreignKey: 'userId',
//             otherKey: 'postId',
//             onDelete: "cascade",
//         });
//         Likes.hasMany(models.Users, {
//             through: models.Like,
//             foreignKey: 'userId',
//             otherKey: 'postId',
//             onDelete: "cascade",
//         });
//         Likes.hasMany(models.Posts, {
//             foreignKey: 'postId',
//             as: 'post',
//             onDelete: "cascade",
//         });
//     };




//     return Likes;
// };