require('dotenv').config()

module.exports = {
    port: process.env.PORT || 2017,
    JWT_SECRET: process.env.JWT_SECRET,
    LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
    EMAIL_USER: process.env.MAIL_USERNAME,
    EMAIL_PASS: process.env.MAIL_PASSWORD,
    EMAIL_HOST: process.env.MAIL_HOST,
    MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
    MAIL_PORT: process.env.MAIL_PORT,
    LOCAL_CLIENT_URL: process.env.LOCAL_CLIENT_URL || 'http://localhost:8080',
    DEV_CLIENT_URL: process.env.DEV_CLIENT_URL || 'https://highpiler-dev.techpss.com'
};