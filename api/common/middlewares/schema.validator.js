const { sendError400 } = require('../helpers/httpStatus.helper');

const checkRequiredField = (requiredParam) => {
    return (req, res, next) => {
        if (!(requiredParam instanceof Array)) {
            throw Error('Required parametrs must be an array');
        }
        const paramObj = Object.assign({}, req.params || {}, req.query || {}, req.body || {});
        let isMissingParam = false;
        const message = [];
        const objKeys = Object.keys(paramObj);
        requiredParam.forEach((key) => {
            if (!(objKeys.includes(key))) {
                isMissingParam = true;
                message.push(`${key} is Required.`);
            }
            const value = paramObj[key] ? paramObj[key]?.toString()?.trim() : '';
            if (objKeys.includes(key) && !value?.length) {
                isMissingParam = true;
                message.push(`Value of : '${key}' is required.`);
            }
        });
        if (isMissingParam) {
            return sendError400(res, message[0]);
        }
        next();
    };
};
module.exports = checkRequiredField;
