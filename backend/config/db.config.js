module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "password1",
    DB: "gropomania2",
    dialect: "mysql",
    port: 8082,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
