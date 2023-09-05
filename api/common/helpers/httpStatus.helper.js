const { locale } = require('../../config/locales');
const { logger } = require('../../utils/logger');

const responseObj = (message, success = false) => {
    return {
        msg: message || locale('SOMETHING_WENT_WRONG'),
        success
    };
};

// 200 Success
const sendResp200 = (res, message, data = {}) => {
    message = locale(message) || message
    let response = responseObj(message, true);
    if (data && Object.keys(data)?.length) {
        response = Object.keys(data)?.length ? { ...response, ...data } : { ...response, data }
    }
    return res.status(200).json(response);
}

// 400 Bad Request
const sendError400 = (res, message) => res.status(400).json(responseObj(locale(message)));

// 403 Unauthenticated
const sendError401 = (res, message) => res.status(401).json(responseObj(locale(message)));

// 403 Unauthorized
const sendError403 = (res, message) => res.status(403).json(responseObj(locale(message)));

// 404 Not Found
const sendError404 = (res, message) => res.status(404).json(responseObj(locale(message)));

// 409 Already Exists
const sendError409 = (res, message) => res.status(409).json(responseObj(locale(message)));

// 500 Server Error
const sendError500 = (res, error = {}) => {
    logger.error(`[${res?.req?.method}] ${res?.req?.originalUrl} >> StatusCode:: ${500}`, error);
    return res.status(500).json(responseObj(locale('INTERNAL_SERVER_ERROR')))
}
module.exports = {
    sendResp200,
    sendError400,
    sendError401,
    sendError403,
    sendError404,
    sendError409,
    sendError500,
}
