/**
 * third party libraries
 */
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const cors = require('cors');

/**
 * Swagger UI Configuration
 */

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  info: {
    title: 'Highpiler api doc',
    version: '1.0.0',
    description: 'Endpoints to test APIs',
  },
  host: process.env.SERVER_HOST,
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['api/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

/**
 * server configuration
 */
const config = require('./config');
const dbService = require('./services/db.service');

// environment: development, staging, testing, production
const environment = process.env.NODE_ENV;

/**
 * express application
 */
const app = express();
const server = http.Server(app);

const DB = dbService(environment, config.migrate).start();
const { initializeLogger, logger } = require('./utils/logger');

// initialize logger
initializeLogger(app);
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());

// secure express app
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

// define static folder
app.use(express.static('public'));

// parsing the request bodies
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

/**
 * Configure Routes
 */
require('./config/routes').set_routes(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.listen(config.port, () => {

  logger.info('========================================== ');
  logger.info(`🚀 API is listening on the port ${config.port}`);
  logger.info('==========================================');

  const validEnvironments = ['production', 'development', 'testing'];

  if (!validEnvironments.includes(environment)) {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
  return DB;
});
