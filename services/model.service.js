const User = require('../models/User');
const Company = require('../models/Company');
const Contact = require('../models/Contact');
const ContactType = require('../models/ContactType');
const CompanyType = require('../models/CompanyType');
const CompanyContactMap = require('../models/CompanyContactMap');
const Invite = require('../models/Invite');
const CommodityGroup = require('../models/CommodityGroup');
const Jurisdiction = require('../models/Jurisdiction');
const State = require('../models/State');
const City = require('../models/City');
const Project = require('../models/Project');
const ContactTypeMap = require('../models/ContactTypeMap');
const CityJurisdictionMap = require('../models/CityJurisdictionMap');
const CompanyTypeMap = require('../models/CompanyTypeMap');
const ProjectOccupancy = require('../models/ProjectOccupancy');
const ProjectScopeBuilding = require('../models/ProjectScopeBuilding');
const ProjectScopeService = require('../models/ProjectScopeService');
const ProjectScopeWork = require('../models/ProjectScopeWork');
const ProjectSprinkler = require('../models/ProjectSprinkler');
const ProjectHpsArea = require('../models/ProjectHpsArea');
const SprinklerHpsAreaMap = require('../models/SprinklerHpsAreaMap');
const RecentProjectView = require('../models/RecentProjectView');
const ProjectScopeDescription = require('../models/ProjectScopeDescription');
const Code = require('../models/Code');
const ProjectContactMap = require('../models/ProjectContactMap');
const ProjectCodeMap = require('../models/ProjectCodeMap');
const ProjectSmokeVent = require('../models/ProjectSmokeVent');
const ProjectAccessDoor = require('../models/ProjectAccessDoor');
const ProjectNotes = require('../models/ProjectNotes');
const ProjectCommodity = require('../models/ProjectCommodity');
const HpsAreaInvite = require('../models/HpsAreaInvite');
const Commodity = require('../models/Commodity');
const ProjectStorageConfig = require('../models/ProjectStorageConfig');
const AgencyService = require('../models/AgencyService');
const SprinklerStorageConfigMap = require('../models/SprinklerStorageConfigMap');
const CommodityStorageConfigMap = require('../models/CommodityStorageConfigMap');
const ProjectOtherFeature = require('../models/ProjectOtherFeature');
const ProjectSubmital = require('../models/ProjectSubmital');
const ProjectSubmitalLog = require('../models/ProjectSubmitalLog');
const ImportedProjectCommodity = require('../models/ImportedProjectCommodity');
const CommodityClass = require('../models/CommodityClass');
const ProjectCommodityGroup = require('../models/ProjectCommodityGroup');
const Tag = require('../models/Tag');

const AllModels = () => ({
  User,
  Company,
  Contact,
  ContactType,
  CompanyType,
  CompanyContactMap,
  Invite,
  CommodityGroup,
  Jurisdiction,
  State,
  City,
  ContactTypeMap,
  Project,
  CityJurisdictionMap,
  CompanyTypeMap,
  ProjectOccupancy,
  ProjectScopeBuilding,
  ProjectScopeService,
  ProjectScopeWork,
  ProjectSprinkler,
  SprinklerHpsAreaMap,
  ProjectHpsArea,
  ProjectScopeDescription,
  RecentProjectView,
  Code,
  ProjectContactMap,
  ProjectSmokeVent,
  ProjectCodeMap,
  ProjectAccessDoor,
  ProjectNotes,
  ProjectCommodity,
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
  CommodityClass,
  ProjectCommodityGroup,
  Tag,
});

module.exports = AllModels;
