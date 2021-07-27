module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        profilePicture: {
            type: Sequelize.STRING,
            default: ""

        },
        coverPicture: {
            type: Sequelize.STRING,
            default: ""

        },
        folowers: {
            type: Sequelize.TEXT,
            default: []

        },
        folowins: {
            type: Sequelize.TEXT,
            default: []

        },

        isadmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        isdeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },

        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE

        }
    },
        { underscored: true }
    );
    return User;
};
//         });
//     },
//     down: async (queryInterface, Sequelize) => {
//         await queryInterface.dropTable('User');
//     }
// };