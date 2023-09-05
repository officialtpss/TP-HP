const users = require('../routes/users');
const company = require('../routes/company');
const companyType = require('../routes/companyType');
const contactType = require('../routes/contactType');
const contact = require('../routes/contact');
const commodityGroup = require('../routes/commodityGroup');
const jurisdiction = require('../routes/jurisdiction');
const state = require('../routes/state');
const city = require('../routes/city');
const Commodity = require('../routes/commodity');
const project = require('../routes/project');
const projectSprinkler = require('../routes/projectSprinkler');
const projectTeamAndDocs = require('../routes/projectTeamAndDoc');
const projectHpsArea = require('../routes/projectHpsArea');
const projectSmokeVent = require('../routes/projectSmokeVent');
const code = require('../routes/code');
const accessDor = require('../routes/projectAccessDoor');
const Notes = require('../routes/projectNotes');
const projectCommodity = require('../routes/projectCommodity');
const projectStorageConfig = require('../routes/projectStorageConfig');
const agencyService = require('../routes/agencyService');
const otherFeature = require('../routes/projectOtherFeature');
const submital = require('../routes/projectSubmital');
const submitalLog = require('../routes/projectSubmitalLog');
const commodityClass = require('../routes/commodityClass');
const tag = require('../routes/tag');

exports.set_routes = (app) => {
  // users route
  app.use('/api/users', users);

  // company route
  app.use('/api/company', company);

  // companyType route
  app.use('/api/companytype', companyType);

  // contactType route
  app.use('/api/contacttype', contactType);

  // contact route
  app.use('/api/contact', contact);

  // commodityGroup route
  app.use('/api/commoditygroup', commodityGroup);

  // jurisdiction route
  app.use('/api/jurisdiction', jurisdiction);

  // state route
  app.use('/api/state', state);

  // city route
  app.use('/api/city', city);

  // commodity route
  app.use('/api/commodity', Commodity);

  // Proect route
  app.use('/api/project', project);

  // project Sprinkler route
  app.use('/api/sprinkler', projectSprinkler);

  // project Team and docs
  app.use('/api/team_docs', projectTeamAndDocs);

  // project hps area route
  app.use('/api/hps_area', projectHpsArea);

  // project hps smoke vent route
  app.use('/api/smoke_vent', projectSmokeVent);

  // code route
  app.use('/api/code', code);

  // Access door
  app.use('/api/access_dor', accessDor);

  // Project notes
  app.use('/api/notes', Notes);

  // Project commodity
  app.use('/api/projectcommodity', projectCommodity);

  // Project commodity
  app.use('/api/storage_config', projectStorageConfig);

  // Agency service
  app.use('/api/agencyservice', agencyService);

  // other feature
  app.use('/api/other_feature', otherFeature);

  // Submital route
  app.use('/api/submital', submital);

  // Submital log route
  app.use('/api/submital_log', submitalLog);

  // Commodity class  route
  app.use('/api/commodityclass', commodityClass);

  // Tag route
  app.use('/api/tag', tag);
};
