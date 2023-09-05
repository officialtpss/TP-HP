require('dotenv').config();

// config.js
module.exports = {
    app: {
        port: process.env.DEV_APP_PORT || 3000,
        appName: process.env.APP_NAME || 'highpiler-backend',
        env: process.env.NODE_ENV || 'development',
    },
    db: {
        development: {
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST || 'localhost',
            dialect: 'mysql'
        },
        testing: {
            database: 'databasename',
            username: 'username',
            password: 'password',
            host: 'localhost',
            dialect: 'sqlite' || 'mysql' || 'postgres'
        },
        production: {
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST || 'localhost',
            dialect: 'sqlite' || 'mysql' || 'postgres'
        }
    },
    winiston: {
        logpath: '/highpiler/logs/',
    },
    auth: {
        jwt_secret: process.env.JWT_SECRET,
        jwt_expiresin: process.env.JWT_EXPIRES_IN || '1d',
    },
};