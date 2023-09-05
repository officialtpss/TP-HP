const database = require('../config/database');
const AllModels = require('./model.service');

const dbService = (environment, migrate) => {
  const authenticateDB = () => database.authenticate();
  // const dropDB = () => database.drop();

  const syncDB = () => database.sync({ alter: false });
  const association = () => {
    const {
      User,
      Company,
      Contact,
      ContactType,
      CompanyType,
      CompanyContactMap,
      ContactTypeMap,
      Invite,
      CommodityGroup,
      Jurisdiction,
      State,
      City,
      Project,
      CityJurisdictionMap,
      CompanyTypeMap,
      ProjectOccupancy,
      ProjectScopeBuilding,
      ProjectScopeService,
      ProjectScopeWork,
      ProjectSprinkler,
      ProjectHpsArea,
      SprinklerHpsAreaMap,
      ProjectScopeDescription,
      RecentProjectView,
      Code,
      ProjectContactMap,
      ProjectSmokeVent,
      ProjectCodeMap,
      ProjectAccessDoor,
      ProjectCommodity,
      ProjectNotes,
      HpsAreaInvite,
      Commodity,
      ProjectStorageConfig,
      AgencyService,
      SprinklerStorageConfigMap,
      CommodityStorageConfigMap,
      ProjectOtherFeature,
      ProjectSubmital,
      ProjectSubmitalLog,
      ImportedProjectCommodity,
      ProjectCommodityGroup,
      Tag,
    } = AllModels();

    User.hasMany(User, {
      foreignKey: 'parent_id',
      as: 'project_admin',
      sourceKey: 'id'
    });
    User.belongsTo(State, { foreignKey: 'state_id', sourceKey: 'id' });
    // user has many with project admin invite
    User.hasMany(Invite, { foreignKey: 'user_id', sourceKey: 'id' });
    Invite.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
    // User has many Company
    User.hasMany(Company, { foreignKey: 'project_admin_id', sourceKey: 'id' });
    Company.belongsTo(User, {
      foreignKey: 'project_admin_id',
      targetKey: 'id'
    });
    User.hasMany(Company, { foreignKey: 'agency_id', sourceKey: 'id' });
    Company.belongsTo(User, {
      foreignKey: 'agency_id',
      targetKey: 'id'
    });
    // User has many contact
    User.hasMany(Contact, { foreignKey: 'project_admin_id', sourceKey: 'id' });
    Contact.belongsTo(User, {
      foreignKey: 'project_admin_id',
      targetKey: 'id'
    });
    User.hasMany(Contact, { foreignKey: 'agency_id', sourceKey: 'id' });
    Contact.belongsTo(User, {
      foreignKey: 'agency_id',
      targetKey: 'id'
    });
    // User has many ContactType
    User.hasMany(ContactType, { foreignKey: 'user_id', sourceKey: 'id' });
    ContactType.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
    Commodity.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
    Commodity.belongsTo(CommodityGroup, {
      foreignKey: 'commodity_group_id',
      targetKey: 'id'
    });
    // Company compabytype companytypemap association
    User.hasMany(CompanyType, { foreignKey: 'user_id', sourceKey: 'id' });
    CompanyType.belongsTo(User, { foreignKey: 'user_id', sourceKey: 'id' });

    CompanyType.belongsTo(User, { foreignKey: 'agency_id', targetKey: 'id' });
    User.hasMany(CompanyType, { foreignKey: 'agency_id', targetKey: 'id' });

    CompanyTypeMap.belongsTo(Company, {
      foreignKey: 'company_id',
      sourceKey: 'id'
    });
    CompanyTypeMap.belongsTo(CompanyType, {
      foreignKey: 'company_type_id',
      sourceKey: 'id'
    });
    CompanyContactMap.belongsTo(Company, {
      foreignKey: 'company_id',
      targetKey: 'id'
    });
    CompanyType.hasMany(CompanyTypeMap, {
      foreignKey: 'company_type_id',
      sourceKey: 'id'
    });
    Company.hasMany(CompanyTypeMap, {
      foreignKey: 'company_id',
      sourceKey: 'id'
    });

    // company and contact have many to many using contact map table
    Company.belongsTo(State, { foreignKey: 'state_id', targetKey: 'id' });
    Company.hasMany(CompanyContactMap, {
      foreignKey: 'company_id',
      sourceKey: 'id'
    });
    Contact.hasMany(CompanyContactMap, {
      foreignKey: 'contact_id',
      sourceKey: 'id'
    });
    CompanyContactMap.belongsTo(Contact, {
      foreignKey: 'contact_id',
      targetKey: 'id'
    });

    // contact and contact Type relation using contact_type_mapping
    Contact.hasMany(ContactTypeMap, {
      foreignKey: 'contact_id',
      sourceKey: 'id'
    });
    ContactTypeMap.belongsTo(Contact, {
      foreignKey: 'contact_id',
      targetKey: 'id'
    });
    ContactTypeMap.belongsTo(ContactType, {
      foreignKey: 'contact_type_id',
      targetKey: 'id'
    });

    // CommodityGroup belons to user
    CommodityGroup.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
    CommodityGroup.hasMany(Commodity, {
      foreignKey: 'commodity_group_id',
      targetKey: 'id'
    });

    Jurisdiction.belongsTo(User, { foreignKey: 'agency_id', targetKey: 'id' });
    User.hasMany(Jurisdiction, { foreignKey: 'agency_id', targetKey: 'id' });
    Jurisdiction.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
    Jurisdiction.belongsTo(State, { foreignKey: 'state_id', targetKey: 'id' });
    Jurisdiction.hasMany(CityJurisdictionMap, {
      foreignKey: 'jurisdiction_id',
      targetKey: 'id'
    });

    City.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
    City.belongsTo(State, { foreignKey: 'state_id', targetKey: 'id' });
    City.belongsTo(User, { foreignKey: 'agency_id', targetKey: 'id' });
    User.hasMany(City, { foreignKey: 'agency_id', targetKey: 'id' });
    City.hasMany(CityJurisdictionMap, {
      foreignKey: 'city_id',
      sourceKey: 'id'
    });
    CityJurisdictionMap.belongsTo(City, {
      foreignKey: 'city_id',
      targetKey: 'id'
    });
    CityJurisdictionMap.belongsTo(Jurisdiction, {
      foreignKey: 'jurisdiction_id',
      targetKey: 'id'
    });
    // project association
    Project.belongsTo(State, { foreignKey: 'state_id', targetKey: 'id' });
    Project.belongsTo(Jurisdiction, {
      foreignKey: 'jurisdiction_id',
      targetKey: 'id'
    });
    Project.belongsTo(City, { foreignKey: 'city_id', targetKey: 'id' });
    Project.belongsTo(User, {
      foreignKey: 'project_admin_id',
      targetKey: 'id'
    });
    Project.belongsTo(Project, {
      foreignKey: 'original_project_id',
      targetKey: 'id'
    });
    Project.belongsTo(Company, { foreignKey: 'company_id', targetKey: 'id' });
    // project scope association
    SprinklerStorageConfigMap.belongsTo(ProjectSprinkler, {
      foreignKey: 'sprinkler_id',
      targetKey: 'id'
    });
    SprinklerStorageConfigMap.belongsTo(ProjectStorageConfig, {
      foreignKey: 'storage_config_id',
      targetKey: 'id'
    });

    CommodityStorageConfigMap.belongsTo(ProjectCommodity, {
      foreignKey: 'project_commodity_id',
      targetKey: 'id'
    });
    CommodityStorageConfigMap.belongsTo(ProjectStorageConfig, {
      foreignKey: 'storage_config_id',
      targetKey: 'id'
    });

    Project.hasMany(ProjectOccupancy, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    Project.hasMany(ProjectScopeWork, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    Project.hasMany(ProjectScopeService, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    Project.hasMany(ProjectScopeBuilding, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    Project.hasMany(ProjectSprinkler, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    Project.hasMany(ProjectHpsArea, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    Project.hasMany(ProjectScopeDescription, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    Project.hasMany(ProjectSmokeVent, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    Project.hasMany(ProjectCommodity, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    Project.hasMany(ProjectNotes, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    Project.hasMany(ProjectStorageConfig, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    Project.hasMany(ProjectOtherFeature, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    Project.hasMany(ProjectContactMap, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    Project.hasMany(ProjectCodeMap, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    Project.hasMany(ProjectSubmital, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    Project.hasMany(ProjectSubmitalLog, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    HpsAreaInvite.belongsTo(Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    ProjectHpsArea.belongsTo(Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    HpsAreaInvite.belongsTo(ProjectHpsArea, {
      foreignKey: 'hps_area_id',
      targetKey: 'id'
    });
    ProjectOccupancy.belongsTo(Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    ProjectScopeWork.belongsTo(Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    ProjectScopeDescription.belongsTo(Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    ProjectScopeService.belongsTo(Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    ProjectScopeService.belongsTo(AgencyService, {
      foreignKey: 'agency_service_id',
      targetKey: 'id'
    });
    ProjectScopeBuilding.belongsTo(Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    ProjectStorageConfig.belongsTo(Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    ProjectStorageConfig.hasMany(SprinklerStorageConfigMap, {
      foreignKey: 'storage_config_id',
      targetKey: 'id'
    });
    ProjectStorageConfig.hasMany(CommodityStorageConfigMap, {
      foreignKey: 'storage_config_id',
      targetKey: 'id'
    });
    ProjectSprinkler.belongsTo(Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    ProjectSprinkler.belongsTo(ProjectSprinkler, {
      foreignKey: 'sprinkler_id',
      targetKey: 'id'
    });
    ProjectSprinkler.hasOne(ProjectSprinkler, {
      foreignKey: 'sprinkler_id',
      targetKey: 'id'
    });
    ProjectSprinkler.hasMany(SprinklerStorageConfigMap, {
      foreignKey: 'sprinkler_id',
      targetKey: 'id'
    });
    ProjectSprinkler.hasMany(SprinklerHpsAreaMap, {
      foreignKey: 'sprinkler_id',
      targetKey: 'id'
    });
    SprinklerHpsAreaMap.belongsTo(ProjectSprinkler, {
      foreignKey: 'sprinkler_id',
      targetKey: 'id'
    });
    SprinklerHpsAreaMap.belongsTo(ProjectHpsArea, {
      foreignKey: 'hps_area_id',
      targetKey: 'id'
    });
    ProjectHpsArea.hasMany(SprinklerHpsAreaMap, {
      foreignKey: 'hps_area_id',
      targetKey: 'id'
    });
    Project.hasMany(ProjectAccessDoor, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    ProjectAccessDoor.belongsTo(Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    ProjectSmokeVent.belongsTo(Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    ProjectSmokeVent.belongsTo(ProjectHpsArea, {
      foreignKey: 'hps_area_id',
      targetKey: 'id'
    });
    ProjectSprinkler.hasMany(ProjectSmokeVent, {
      foreignKey: 'sprinkler_id',
      targetKey: 'id'
    });
    ProjectSmokeVent.belongsTo(ProjectSprinkler, {
      foreignKey: 'sprinkler_id',
      targetKey: 'id'
    });

    // project team and doc map
    ProjectContactMap.belongsTo(Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    ProjectContactMap.belongsTo(Contact, {
      foreignKey: 'contact_id',
      targetKey: 'id'
    });
    ProjectNotes.belongsTo(Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    ProjectCommodity.belongsTo(Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    ProjectCommodity.belongsTo(CommodityGroup, {
      foreignKey: 'commodity_group_id',
      targetKey: 'id'
    });
    // project code  map
    ProjectCodeMap.belongsTo(Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    ProjectCodeMap.belongsTo(Code, { foreignKey: 'code_id', targetKey: 'id' });
    ProjectOtherFeature.belongsTo(Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });

    ProjectSubmital.belongsTo(Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    ProjectSubmitalLog.belongsTo(Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    // recentproject view association
    RecentProjectView.belongsTo(Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    RecentProjectView.belongsTo(User, {
      foreignKey: 'user_id',
      targetKey: 'id'
    });

    // Code association
    Code.belongsTo(State, { foreignKey: 'state_id', targetKey: 'id' });
    Code.belongsTo(Jurisdiction, {
      foreignKey: 'jurisdiction_id',
      targetKey: 'id'
    });
    Code.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
    User.hasMany(Code, { foreignKey: 'agency_id', targetKey: 'id' });
    Code.belongsTo(User, { foreignKey: 'agency_id', targetKey: 'id' });

    // agency service association
    AgencyService.hasMany(ProjectScopeService, { foreignKey: 'agency_service_id', targetKey: 'id' });

    AgencyService.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
    AgencyService.belongsTo(User, { foreignKey: 'agency_id', targetKey: 'id' });

    User.hasMany(AgencyService, { foreignKey: 'agency_id', targetKey: 'id' });

    ImportedProjectCommodity.belongsTo(Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    ImportedProjectCommodity.belongsTo(ProjectCommodity, {
      foreignKey: 'project_commodity_id',
      targetKey: 'id'
    });

    Project.hasMany(ProjectCommodityGroup, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    ProjectCommodityGroup.belongsTo(Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
    CommodityGroup.hasMany(ProjectCommodityGroup, {
      foreignKey: 'commodity_group_id',
      targetKey: 'id'
    });
    User.hasMany(CommodityGroup, { foreignKey: 'agency_id', targetKey: 'id' });
    CommodityGroup.belongsTo(User, { foreignKey: 'agency_id', targetKey: 'id' });
    ProjectCommodityGroup.belongsTo(CommodityGroup, {
      foreignKey: 'commodity_group_id',
      targetKey: 'id'
    });
    ProjectCommodity.hasMany(ProjectCommodityGroup, {
      foreignKey: 'project_commodity_id',
      targetKey: 'id'
    });
    ProjectCommodity.belongsTo(Commodity, { foreignKey: 'original_commodity_id', targetKey: 'id' });
    Commodity.hasMany(ProjectCommodity, { foreignKey: 'original_commodity_id', targetKey: 'id' });

    ProjectCommodityGroup.belongsTo(ProjectCommodity, {
      foreignKey: 'project_commodity_id',
      targetKey: 'id'
    });

    // tag associations

    User.hasMany(Tag, { foreignKey: 'agency_id', sourceKey: 'id' });
    Tag.belongsTo(User, { foreignKey: 'agency_id', targetKey: 'id' });

    User.hasMany(Tag, { foreignKey: 'user_id', sourceKey: 'id' });
    Tag.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });

    // eslint-disable-next-line no-console
    console.log('association....finish');
    return true;
  };

  const successfulDBStart = () => {
    console.info('connection to the database has been established successfully');
  };
  const errorDBStart = (err) => {
    console.info('unable to connect to the database:', err);
  };
  const wrongEnvironment = () => {
    console.warn(`only development, staging, test and production are valid NODE_ENV variables but ${environment} is specified`);
    return process.exit(1);
  };

  const startMigrateTrue = async () => {
    try {
      await syncDB();
      successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startMigrateFalse = async () => {
    try {
      // await dropDB();
      await syncDB();
      successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startDev = async () => {
    try {
      await authenticateDB();

      if (migrate) {
        return startMigrateTrue();
      }

      return startMigrateFalse();
    } catch (err) {
      return errorDBStart(err);
    }
  };

  const startStage = async () => {
    try {
      await authenticateDB();

      if (migrate) {
        return startMigrateTrue();
      }

      return startMigrateFalse();
    } catch (err) {
      return errorDBStart(err);
    }
  };

  const startTest = async () => {
    try {
      await authenticateDB();
      await startMigrateFalse();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startProd = async () => {
    try {
      await authenticateDB();
      await startMigrateFalse();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const start = async () => {
    association();
    switch (environment) {
      case 'development':
        await startDev();
        break;
      case 'staging':
        await startStage();
        break;
      case 'testing':
        await startTest();
        break;
      case 'production':
        await startProd();
        break;
      default:
        await wrongEnvironment();
    }
  };

  return {
    start
  };
};

module.exports = dbService;
