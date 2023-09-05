module.exports.en = {
    // Common response messages
    SOMETHING_WENT_WRONG: 'Something went wrong!',
    INTERNAL_SERVER_ERROR: 'Internal Server Error!',
    NOT_AUTHORIZED: 'The request is understood, but it has been refused or access is not allowed!',
    UNAUTHENTICATED: 'Authentication credentials were missing or incorrect',
    AUTH_HEADER_MISSING: 'Authorization header missing!',

    // User response messages
    USER_LOGIN_SUCCESS: 'User logged in successfully!',

    // Agency service response messages
    AGENCY_CREATE_SUCCESS: 'Agency service created successfully!',
    AGENCY_UPDATE_SUCCESS: 'Agency service updated successfully!',
    AGENCY_DELETE_SUCCESS: 'Agency service deleted successfully!',
    AGENCY_GET_ALL_SUCCESS: 'All agency services retrieved successfully!',
    AGENCY_NOT_FOUND: 'Agency service not found!',
    AGENCY_ALREADY_EXISTS: 'Agency service already exists!',
    AGENCY_ASSOCIATED_WITH_YOUR_PROJECT: "You can't delete it. Agency service is associated with your project.",
    AGENCY_ASSOCIATED_WITH_OTHERS_PROJECT: "You can't delete it. Agency service is associated with other project admin's project",

    // City response messages
    CITY_CREATE_SUCCESS: 'City created successfully!',
    CITY_UPDATE_SUCCESS: 'City updated successfully!',
    CITY_DELETE_SUCCESS: 'City deleted successfully!',
    CITY_GET_ALL_SUCCESS: 'All Cities retrieved successfully!',
    CITY_NOT_FOUND: 'City not found!',
    CITY_ALREADY_EXISTS: 'City name already exists!',
    CITY_ASSOCIATED_WITH_YOUR_PROJECT: "You can't delete it. City is associated with your project.",
    CITY_ASSOCIATED_WITH_OTHERS_PROJECT: "You can't delete it. City is associated with other project admin's project",
    CITY_ASSOCIATED_WITH_PROJECT_ADMIN_PROJECTS: "You can't delete it. City is associated with the project of project admin.",

    // Code response messages
    CODE_CREATE_SUCCESS: 'Code created successfully!',
    CODE_UPDATE_SUCCESS: 'Code updated successfully!',
    CODE_DELETE_SUCCESS: 'Code deleted successfully!',
    CODE_GET_ALL_SUCCESS: 'All Codes retrieved successfully!',
    CODE_NOT_FOUND: 'Code not found!',
    CODE_ALREADY_EXISTS: 'Code name already exists!',
    ONLY_ADMIN_CREATE_CODE: 'Only admin can create international code',
    CODE_ASSOCIATED_WITH_YOUR_PROJECT: "You can't delete it.Code is associated with your project.",
    CODE_ASSOCIATED_WITH_OTHERS_PROJECT: "You can't delete it. Code is associated with other project admin's project",
    CODE_ASSOCIATED_WITH_PROJECT_ADMIN_PROJECTS: "You can't delete it. Code is associated with the project of project admin.",

    // Commodity class response messages
    COMMODITY_CLASS_GET_ALL_SUCCESS: 'All Commodity classes retrieved successfully!',

    // Commodity response messages
    COMMODITY_CREATE_SUCCESS: 'Commodity created successfully!',
    COMMODITY_UPDATE_SUCCESS: 'Commodity updated successfully!',
    COMMODITY_DELETE_SUCCESS: 'Commodity deleted successfully!',
    COMMODITY_GET_ALL_SUCCESS: 'All Commodities retrieved successfully!',
    COMMODITY_IMPORT_SUCCESS: 'Commodity imported successfully!',
    COMMODITY_NOT_FOUND: 'Commodity not found!',

    // Commodity group response messages
    COMMODITY_GROUP_CREATE_SUCCESS: 'Commodity group created successfully!',
    COMMODITY_GROUP_UPDATE_SUCCESS: 'Commodity group updated successfully!',
    COMMODITY_GROUP_DELETE_SUCCESS: 'Commodity group deleted successfully!',
    COMMODITY_GROUP_GET_ALL_SUCCESS: 'All Commoditiy groups retrieved successfully!',
    COMMODITY_GROUP_MERGE_SUCCESS: 'Commodity group merged successfully!',
    INVALID_MERGED_GROUP_ID: 'invalid merged group id!',
    INVALID_GROUP_ID: 'invalid commodity group id!',
    COMMODITY_GROUP_NOT_FOUND: 'Commodity group not found!',

    // Company response messages
    COMPANY_CREATE_SUCCESS: 'Company created successfully!',
    COMPANY_UPDATE_SUCCESS: 'Company updated successfully!',
    COMPANY_DELETE_SUCCESS: 'Company deleted successfully!',
    COMPANY_GET_ALL_SUCCESS: 'All Companies retrieved successfully!',
    COMPANY_GET_ONE_SUCCESS: 'Company retrieved successfully!',
    COMPANY_IMPORT_SUCCESS: 'Company imported successfully!',
    COMPANY_NOT_FOUND: 'Company not found!',
    COMPANY_ASSOCIATED_WITH_YOUR_PROJECT: "You can't delete it. Company is associated with your project.",
    COMPANY_ASSOCIATED_WITH_OTHERS_PROJECT: "You can't delete it. Company is associated with other project admin's project",
    COMPANY_ASSOCIATED_WITH_YOUR_CONTACT: "You can't delete it. Company is associated with your contact.",
    COMPANY_ASSOCIATED_WITH_OTHERS_CONTACT: "You can't delete it. Company is associated with other project admin's contact",

    // CompanyType response messages
    COMPANY_TYPE_CREATE_SUCCESS: 'Company type created successfully!',
    COMPANY_TYPE_UPDATE_SUCCESS: 'Company type updated successfully!',
    COMPANY_TYPE_DELETE_SUCCESS: 'Company type deleted successfully!',
    COMPANY_TYPE_GET_ALL_SUCCESS: 'All Company types retrieved successfully!',
    COMPANY_TYPE_NOT_FOUND: 'Company type not found!',
    COMPANY_TYPE_ASSOCIATED_WITH_YOUR_COMPANY: "You can't delete it. Company type is associated with your company.",
    COMPANY_TYPE_ASSOCIATED_WITH_OTHERS_COMPANY: "You can't delete it. Company type is associated with other project admin's company",
    COMPANY_TYPE_ASSOCIATED_WITH_PROJECT_ADMIN_COMPANY: "You can't delete it. Company type is associated with the company of project admin.",
    REMOVE_ASSOCIATION_BEFORE_DELETE_FROM_COMPANY: 'Please remove association from company before deleting this!',
    COMPANY_DISASSOCIATION_SUCCESS: 'Company has been disassociated from company type successfully!',

    // Contact response messages
    CONTACT_CREATE_SUCCESS: 'Contact created successfully!',
    CONTACT_UPDATE_SUCCESS: 'Contact updated successfully!',
    CONTACT_DELETE_SUCCESS: 'Contact deleted successfully!',
    CONTACT_GET_ALL_SUCCESS: 'All Contacts retrieved successfully!',
    CONTACT_GET_ONE_SUCCESS: 'Contact retrieved successfully!',
    REMOVE_ASSOCIATION_BEFORE_DELETE: 'Please remove association from project before deleting this!',
    CONTACT_NOT_FOUND: 'Contact not found!',
    CONTACT_ASSOCIATED_WITH_YOUR_PROJECT: "You can't delete it. Contact is associated with your project.",
    CONTACT_ASSOCIATED_WITH_OTHERS_PROJECT: "You can't delete it. Contact is associated with other project admin's project",

    // Contact type response messages
    CONTACT_TYPE_CREATE_SUCCESS: 'Contact type created successfully!',
    CONTACT_TYPE_UPDATE_SUCCESS: 'Contact type updated successfully!',
    CONTACT_TYPE_DELETE_SUCCESS: 'Contact type deleted successfully!',
    CONTACT_TYPE_GET_ALL_SUCCESS: 'All Contact types retrieved successfully!',
    CONTACT_TYPE_NOT_FOUND: 'Contact type not found!',

    // Jurisdiction response messages
    JURISDICTION_CREATE_SUCCESS: 'Jurisdiction created successfully!',
    JURISDICTION_UPDATE_SUCCESS: 'Jurisdiction updated successfully!',
    JURISDICTION_DELETE_SUCCESS: 'Jurisdiction deleted successfully!',
    JURISDICTION_GET_ALL_SUCCESS: 'All Jurisdictions retrieved successfully!',
    JURISDICTION_NOT_FOUND: 'Jurisdiction not found!',
    JURISDICTION_ALREADY_EXISTS: 'Jurisdiction name already exists!',
    JURISDICTION_ASSOCIATED_WITH_PROJECT_ADMIN_PROJECT: "You can't delete it. Jurisdiction is associated with the project of project admin.",
    JURISDICTION_ASSOCIATED_WITH_YOUR_PROJECT: "You can't delete it. Jurisdiction is associated with your project.",
    JURISDICTION_ASSOCIATED_WITH_OTHERS_PROJECT: "You can't delete it. Jurisdiction is associated with other project admin's project",
    JURISDICTION_ASSOCIATED_WITH_PROJECT_ADMIN_CITY: "You can't delete it. Jurisdiction is associated with the city of project admin.",
    JURISDICTION_ASSOCIATED_WITH_GLOBAL_ADMIN_CITY: "You can't delete it. Jurisdiction is associated with the city.",
    JURISDICTION_ASSOCIATED_WITH_YOUR_CITY: "You can't delete it. Jurisdiction is associated with your city.",
    JURISDICTION_ASSOCIATED_WITH_OTHERS_CITY: "You can't delete it. Jurisdiction is associated with other project admin's city",
    JURISDICTION_ASSOCIATED_WITH_PROJECT_ADMIN_CODE: "You can't delete it. Jurisdiction is associated with the code of project admin.",
    JURISDICTION_ASSOCIATED_WITH_GLOBAL_ADMIN_CODE: "You can't delete it. Jurisdiction is associated with the code.",
    JURISDICTION_ASSOCIATED_WITH_YOUR_CODE: "You can't delete it. Jurisdiction is associated with your code.",
    JURISDICTION_ASSOCIATED_WITH_OTHERS_CODE: "You can't delete it. Jurisdiction is associated with other project admin's code",

    // Project Access Door response messages
    ACCESS_DOOR_CREATE_SUCCESS: 'Access door added to project successfully!',
    ACCESS_DOOR_UPDATE_SUCCESS: 'Access Door updated successfully!',
    ACCESS_DOOR_DELETE_SUCCESS: 'Access door deleted to project successfully!',
    ACCESS_DOOR_GET_ALL_SUCCESS: 'All Access Doors retrieved successfully!',
    ACCESS_DOOR_NOT_FOUND: 'Access Door not found!',
    ACCESS_DOOR_ALREADY_EXISTS: 'Access Door name already exists!',

    // Company response messages
    PROJECT_COMMODITY_CREATE_SUCCESS: 'Commodity added to project successfully!!',
    PROJECT_COMMODITY_UPDATE_SUCCESS: 'Project commodity updated successfully!',
    PROJECT_COMMODITY_DELETE_SUCCESS: 'Project commodity deleted to project successfully!',
    PROJECT_COMMODITY_GET_ALL_SUCCESS: 'All project commodities retrieved successfully!',
    PROJECT_COMMODITY_GET_ONE_SUCCESS: 'Project commodity retrieved successfully!',
    PROJECT_COMMODITY_IMPORT_SUCCESS: 'Project commodity imported successfully!',
    PROJECT_COMMODITY_NOT_FOUND: 'Project commodity not found!',
    COMMODITY_ID_REQUIRED: 'Commidity id required!',
    COMMODITY_IMPORT_TO_PROJECT_SUCCESS: 'Commodity imported to project successfully!',
    COMMODITY_EXPORT_FROM_PROJECT_SUCCESS: 'Commodity is exported from project successfully!',

    // State response messages
    STATE_GET_ALL_SUCCESS: 'All states retrieved successfully!',

    // Project response messages
    PROJECT_NOT_FOUND: 'Project not found!',
    PROJECT_ALREADY_EXISTS: 'Project already exist!',
    PROJECT_NAME_ALREADY_EXISTS: 'Project name already exist!',
    PROJECT_ALREADY_EXISTS_WITH_ANOTHER_PROJECT_ADMIN: 'This project name is already used by another user!',
    PROJECT_CONTACT_DISASSOCIATION_SUCCESS: 'Project contact disassociated successfully!',
    PROJECT_CITY_DISASSOCIATION_SUCCESS: 'Project contact city successfully!',
    PROJECT_JURISDICTION_DISASSOCIATION_SUCCESS: 'Project jurisdiction disassociated successfully!',

    // Project hps area response messages
    HPS_AREA_GET_ALL_SUCCESS: 'All Hps areas retrieved successfully!',
    HPS_AREA_CREATE_SUCCESS: 'Hps area added to project successfully!',
    HPS_AREA_UPDATE_SUCCESS: 'Hps area updated  successfully!',
    HPS_AREA_DELETE_SUCCESS: 'Hps area deleted to project successfully!',
    SPRNIKLER_REMOVE_FROM_HPS_AREA_SUCCESS: 'Sprinkle removed from  project hps area successfully!',
    SPRNIKLER_GET_ALL_SUCCESS: 'All sprinklers retrieved  successfully!',
    INVITE_SENT_TO_CONTACT_SUCCESS: 'Invitation sent to contact successfully!',
    INVITE_ALREADY_SENT_TO_CONTACT: 'Invitation is already sent to this contact!',

    // Project notes response messages
    PROJECT_NOTES_GET_ALL_SUCCESS: 'All project notes retrieved successfully!',
    PROJECT_NOTES_CREATE_SUCCESS: 'Notes added to project successfully!',
    PROJECT_NOTES_UPDATE_SUCCESS: 'Project notes updated  successfully!',
    PROJECT_NOTES_DELETE_SUCCESS: 'Project notes deleted to project successfully!',

    // Project Submital logs response messages
    PROJECT_SUBMITAL_LOG_GET_ALL_SUCCESS: 'All project submital logs retrieved successfully!',
    PROJECT_SUBMITAL_LOG_CREATE_SUCCESS: 'Submital log added to project successfully!',
    PROJECT_SUBMITAL_LOG_UPDATE_SUCCESS: 'Submital log updated  successfully!',
    PROJECT_SUBMITAL_LOG_DELETE_SUCCESS: 'Submital log deleted to project successfully!',

    // Project smoke vent response messages
    PROJECT_OTHER_FEATURE_GET_ALL_SUCCESS: 'All project other features retrieved successfully!',
    PROJECT_OTHER_FEATURE_CREATE_SUCCESS: 'Other feature added to project successfully!',
    PROJECT_OTHER_FEATURE_UPDATE_SUCCESS: 'Other hps feature updated in project successfully!!',
    PROJECT_OTHER_FEATURE_DELETE_SUCCESS: 'Project other feature deleted to project successfully!',

    // Project smoke vent response messages
    PROJECT_SMOKE_VENT_GET_ALL_SUCCESS: 'All smoke vents retrieved successfully!',
    PROJECT_SMOKE_VENT_CREATE_SUCCESS: 'Smoke vent added to project successfully!',
    PROJECT_SMOKE_VENT_UPDATE_SUCCESS: 'Smoke vent updated  successfully!',
    PROJECT_SMOKE_VENT_DELETE_SUCCESS: 'Smoke vent deleted to project successfully!',

    // Project Submital logs response messages
    PROJECT_SUBMITAL_GET_ALL_SUCCESS: 'All project submital retrieved successfully!',
    PROJECT_SUBMITAL_CREATE_SUCCESS: 'Project submital added  successfully!',
    PROJECT_SUBMITAL_UPDATE_SUCCESS: 'Submital updated  successfully!',
    PROJECT_SUBMITAL_DELETE_SUCCESS: 'Submital deleted to project successfully!',

    // Project storage config response messages
    PROJECT_STORAGE_CONFIG_GET_ALL_SUCCESS: 'All storage configs retrieved successfully!',
    PROJECT_STORAGE_CONFIG_SAME_TYPE_GET_ALL_SUCCESS: 'Storage config list with same type retieved successfully!',
    PROJECT_STORAGE_CONFIG_UPDATE_SUCCESS: 'Project storage config updated  successfully!',
    PROJECT_STORAGE_CONFIG_NOT_FOUND: 'No storage config found in this project. Please select another project!',
    PROJECT_STORAGE_CONFIG_IMPORT_TO_PROJECT_SUCCESS: 'Storage config imported to project successfully!',
    PROJECT_RETRIVED_SUCCESS_AFTER_FILTER: 'Project retrieved successfully after filter!',
}