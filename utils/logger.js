/* eslint-disable import/no-extraneous-dependencies */
const { v4: uuid_v4 } = require('uuid');
const morgan = require('morgan');
const { createLogger, format, transports } = require('winston');
const { LOG_LEVEL } = require('../config');

morgan.token('id', (req) => req.id);

const MASK = ['pwd', 'password', 'repeatPassword'];

const maskParameters = (body) => {
    const data = { ...body };
    // eslint-disable-next-line no-restricted-syntax
    for (const [key] of Object.entries(data)) {
        if (MASK.includes(key)) {
            data[key] = '***';
        }
    }
    return data;
};
const coloredOutput = format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
    format.align(),
    format.printf(info => {
        const { timestamp, level, message, ...args } = info;
        return `${timestamp} [${level}]:${message} ${Object.keys(args).length ? JSON.stringify({ ...args }) : ''}`;
    }),
);
const logger = createLogger({
    transports: [
        new transports.Console({
            level: LOG_LEVEL,
            format: coloredOutput,
        }),
    ],
});
const logRequest = (app) => {
    app.use((req, res, next) => {
        req.id = uuid_v4();
        const body = maskParameters(req.body);
        logger.info('Request:', {
            requestId: req.id,
            requestMethod: req.method,
            requestUrl: req.url,
            'Query:': req.query,
            'Body:': body,
        });
        next();
    });
};
const logMorgan = (app) => {
    app.use(
        morgan(':id :remote-addr :method :url :status :response-time ms - :res[content-length]', {
            stream: {
                write: (text) => {
                    logger.info(`Request finished: ${text?.split('\n').join('')} \n`);
                },
            },
        }),
    );
};
const logRequestVariables = (requestId, variables) => {
    logger.info('Variables: ', {
        requestId,
        ...variables,
    });
};
const logRequestMessage = (requestId, message, level = 'info', data = {}) => {
    logger.log(level, message, { requestId, ...data });
};
const initializeLogger = (app) => {
    logMorgan(app);
    logRequest(app);
};
module.exports = { logger, initializeLogger, logRequestMessage, logRequestVariables };
