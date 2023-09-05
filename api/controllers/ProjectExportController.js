const moment = require("moment");
const { Op } = require("sequelize");
const { sendError500, sendError404, sendResp200 } = require("../common/helpers/httpStatus.helper");
const { COMMODITY_LETTER_SUCCESS, ACTIVE, PROJECT_ID_REQUIRED, DATE_FORMAT, SINGLE_OR_DOUBLE_ROW_RACK, DOUBLE_OR_MULTIPLE_ROW_RACK, SINGLE_DOUBLE_OR_MULTIPLE, PROJECT_RETRIVED_JSON_SUCCESS } = require("../constants/constant");
const AllModels = require("../services/model.service");
const { logger } = require("../utils/logger");

const {
  Project,
  ProjectHpsArea,
  ProjectScopeDescription,
  Jurisdiction,
  City,
  State,
  ProjectSprinkler,
  SprinklerHpsAreaMap,
  ProjectSmokeVent,
  ProjectCommodity,
  ProjectAccessDoor,
  ProjectOtherFeature,
  SprinklerStorageConfigMap,
  ProjectStorageConfig,
  CommodityStorageConfigMap,
  User
} = AllModels();

const projectScopeDescriptionData = async (project_id) => {
  const data = await ProjectScopeDescription.findAll({
    where: { project_id },
    attributes: ["value"],
  });
  const values = data.map((row) => row?.dataValues?.value);

  return {
    rackInScope: values.includes("storage_rack"),
    palletizedInScope: values.includes("palletized"),
    shelfInScope: values.includes("shelf_storage"),
    sowDesc: "",
  };
};

const projectData = async (project_id) => {
  const project = await Project.findOne({
    where: { status: ACTIVE, id: project_id },
    attributes: ["name", "address", "suite", "zip_code"],
    include: [
      { model: Jurisdiction, required: false },
      { model: City, required: false },
      { model: State, required: false },
    ],
  });

  const projectJson = project.toJSON();
  const {
    name,
    address,
    suite,
    zip_code,
  } = projectJson;


  return {
    projectName: name,
    add: `${address} ${suite}`,
    zip: zip_code,
    city: project?.City?.name || null,
    state: project?.State?.name || null,
    jurisdiction: "",
    jurisdictionData: "",
    previousPCchk: "",
    previousPC: "",
  };
};
const unknownFields = {
  "dsSmokeVents": "true",
  "dsAccessDoors": "true",
  "dsIRAS": "true",
  "dsSpk": "true",
  "dsColProt": "true",
  "dsDraftCur": "true",
  "ds1hWall": "true",
  "ds1hDoor": "true",
  "dsSEF": "true",
  "dsDetection": "true",
  "fireCode": "5",
  "fireCodeData": "Phoenix Special Fire Code",
  "bldgCode": "5",
  "bldgCodeData": "Phoenix Special Bldg Code",
  "nfpa13": "true",
  "nfpa30": "true",
  "nfpa30b": "true",
  "FMDS8-1": "true",
  "FMDS8-3": "true",
  "FMDS8-9": "true",
  "FMDS8-18": "true",
  "FMDS8-30": "true",
  "FMDS8-34": "true",
  "FMDS7-29": "true",
  "localStd": "true",
  "bldgConst": "IIIB",
  "occGroups": "B/S-1",
  "hazmatPresent": "true",
  "wallRating": "3",
  "wallRatingData": "This is a Special Wall Note added to describe a custom wall. This is a Special Wall Note added to describe a custom wall. This is a Special Wall Note added to describe a custom wall. ",
}
const projectHpsAreaData = async (project_id, limit, offset) => {

  const data = await ProjectHpsArea.findAll({
    where: { project_id },
    include: [
      {
        model: SprinklerHpsAreaMap,
        seprate: true,
        where: {
          status: ACTIVE,
        },
        required: false,
      },
    ],
    limit,
    offset
  })

  const resultObject = data.reduce((acc, obj, index) => {
    const hpsKey = `hps${index}`;

    acc[`${hpsKey}_whsArea`] = obj.warehouse_area || "";
    acc[`${hpsKey}_hpsAreaInScope`] = obj.hps_area_scope || "";
    acc[`${hpsKey}_hpsAreaExisting`] = obj.existing_hps_area || "";
    acc[`${hpsKey}_hpsAreaTotal`] = obj.total_hps_area || "";
    acc[`${hpsKey}_hpsDesignation`] = obj.hazard_designation === "High Hazard" ? "1" : "";
    acc[`${hpsKey}_maxTravelDistance`] = obj.travel_distance === "<=250ft." ? "0" : "";
    acc[`${hpsKey}_numExistingSV`] = obj.commodities || "";
    acc[`${hpsKey}_linkTemp`] = "";
    acc[`${hpsKey}_linkAltNote`] = "";
    acc[`${hpsKey}_numSEFexists`] = "";
    acc[`${hpsKey}_hasPalletized`] = obj.hps_palletized_shelf === "0" ? "true" : "";
    acc[`${hpsKey}_maxPileLength`] = "60'-0\"";
    acc[`${hpsKey}_maxPileWidth`] = "50'-0\"";
    acc[`${hpsKey}_maxPileHeight`] = "25'-0\"";
    acc[`${hpsKey}_pileVolume`] = obj.palletized_storage_volume || "";
    acc[`${hpsKey}_hasHeatDetection`] = "false";
    acc[`${hpsKey}_isPublic`] = "false";
    acc[`${hpsKey}_hasBldgAccess`] = "true";
    acc[`${hpsKey}_hasSkylightsOnly`] = "false";
    acc[`${hpsKey}_classI-IIFreezer`] = "false";
    acc[`${hpsKey}_hasMRRprotection`] = "true";
    acc[`${hpsKey}_hasMechStocking`] = "true";
    acc[`${hpsKey}_spkSys0`] = "true";
    acc[`${hpsKey}_spkSys1`] = "true";
    acc[`${hpsKey}_spkSys2`] = "false";
    acc[`${hpsKey}_spkSys3`] = "false";

    return acc;

  }, {});

  return {
    data: resultObject ?? {},
    length: data?.length ?? 0
  }
}

const projectSprinlerData = async (project_id, limit, offset) => {

  const data = await ProjectSprinkler.findAll({ where: { project_id }, limit, offset })
  const resultObject = data.reduce((acc, item, index) => {
    acc[`ss${index}_eSpkLabel`] = "0";
    acc[`ss${index}_eSpkLabelData`] = "";
    acc[`ss${index}_eLowCeil`] = "29'-0\"";
    acc[`ss${index}_eHighCeil`] = "31'-0\"";
    acc[`ss${index}_eDesignDensity`] = ".45";
    acc[`ss${index}_eDesignArea`] = "3000";
    acc[`ss${index}_eHeadOrient`] = "0";
    acc[`ss${index}_eNumHeads`] = "";
    acc[`ss${index}_eOpPressure`] = "";
    acc[`ss${index}_eAmbientTemp`] = "";
    acc[`ss${index}_eDesignType`] = "0";
    acc[`ss${index}_eKFactor`] = "1";
    acc[`ss${index}_eHeadTemp`] = "2";
    acc[`ss${index}_eHeadTempData`] = "";
    acc[`ss${index}_eSystemType`] = "0";
    acc[`ss${index}_modifySpk`] = "true";
    acc[`ss${index}_nRecalc`] = "false";
    acc[`ss${index}_nUpgrade`] = "true";
    acc[`ss${index}_nLowCeil`] = "29'-0\"";
    acc[`ss${index}_nHighCeil`] = "31'-0\"";
    acc[`ss${index}_nDesignDensity`] = "";
    acc[`ss${index}_nDesignArea`] = "";
    acc[`ss${index}_nHeadOrient`] = "2";
    acc[`ss${index}_nNumHeads`] = "12";
    acc[`ss${index}_nOpPressure`] = "42";
    acc[`ss${index}_nAmbientTemp`] = "";
    acc[`ss${index}_nDesignType`] = "1";
    acc[`ss${index}_nKFactor`] = "4";
    acc[`ss${index}_nHeadTemp`] = "1";
    acc[`ss${index}_nHeadTempData`] = "";
    acc[`ss${index}_nSystemType`] = "0";

    return acc;

  }, {});
  return {
    data: resultObject ?? {},
    length: data?.length ?? 0
  }
}
const projectSmokeVentData = async (project_id, limit, offset) => {

  const data = await ProjectSmokeVent.findAll({
    where: {
      status: ACTIVE,
      project_id
    },
    limit,
    offset
  })
  const resultObject = data.reduce((acc, item, index) => {
    const { beyond_hps_area, copy_wrh_area } = item

    acc[`sv${index}_applyToHPSarea`] = "0";
    acc[`sv${index}_15ftBeyond`] = beyond_hps_area;
    acc[`sv${index}_useWhsAreaChk`] = copy_wrh_area == "1" ? true : false;
    acc[`sv${index}_numExistingSV`] = "0";
    acc[`sv${index}_numReqdSV`] = "0";
    acc[`sv${index}_numNewSV`] = "0";
    acc[`sv${index}_useCeilFromSpk`] = "0";


    return acc;

  }, {});

  return {
    data: resultObject ?? {},
    length: data?.length ?? 0
  }

}

const projectCommodityData = async (project_id, limit, offset) => {

  const commodityExcludeObj = {
    "comm_allCartoned": "true",
    "comm_allExposed": "false",
    "comm_allWoodPallets": "true",
    "comm_allPlasticPallets": "true",
    "comm_allHandStacked": "true",
    "comm_allWireDecks": "true",
    "comm_allFloor": "false",
    "plasticPalletException": "2",
    "comm_exclude_II": "false",
    "comm_exclude_III": "false",
    "comm_exclude_IV": "false",
    "comm_exclude_CUP": "false",
    "comm_exclude_EUP": "true",
    "comm_exclude_CEP": "true",
    "comm_exclude_EEP": "true",
    "comm_exclude_IPS": "true",
    "comm_exclude_tires": "true",
    "comm_exclude_rolledPaper": "true",
    "comm_exclude_rolledCarpet": "true",
    "comm_exclude_GOH": "true",
    "comm_exclude_aerosols": "true",
    "comm_exclude_FCL": "true",
    "comm_exclude_hazmat": "true",
  }
  const data = await ProjectCommodity.findAll({
    where: {
      status: ACTIVE,
      project_id
    },
    limit,
    offset
  })
  const resultObject = data.reduce((acc, item, index) => {

    acc[`comm${index}_description`] = "Various 3PL products such as appliances, consumer electronics, and furniture. ";
    acc[`comm${index}_storageHeight`] = "25'-8\"";
    acc[`comm${index}_output`] = "The commodities are either exposed or packaged in corrugated cardboard cartons, then placed hand-stacked (not stored on pallets) and located on the floor. While Class I through Class II commodities exist, at a worst-case, this is a Class III commodity per CFC Table 3203.8. ";
    acc[`comm${index}_shelftype`] = "1";
    acc[`comm${index}_shelftypeData`] = "";
    acc[`comm${index}_highClass`] = "1";
    acc[`comm${index}_highClassData`] = "";
    acc[`comm${index}_lowClass`] = "0";
    acc[`comm${index}_lowClassData`] = "";
    acc[`comm${index}_class`] = "2";
    acc[`comm${index}_classData`] = "";
    acc[`comm${index}_heightNarrative`] = "2";
    acc[`comm${index}_cartoned`] = "true";
    acc[`comm${index}_exposed`] = "true";
    acc[`comm${index}_encapsulated`] = "false";
    acc[`comm${index}_nonencapsulated`] = "false";
    acc[`comm${index}_nopallet`] = "true";
    acc[`comm${index}_woodpallet`] = "false";
    acc[`comm${index}_plasticpallet`] = "false";
    acc[`comm${index}_fmpallet`] = "false";
    acc[`comm${index}_palletized`] = "true";
    acc[`comm${index}_shelving`] = "false";
    acc[`comm${index}_racks`] = "false";
    acc[`comm${index}_table3203_8`] = "true";
    acc[`comm${index}_fig3203_9_1`] = "false";
    acc[`comm${index}_s3203_10_2`] = "false";
    acc[`comm${index}_fig56333a`] = "false";
    acc[`comm${index}_fig56333b`] = "false";
    acc[`comm${index}_ch2`] = "false";
    acc[`comm${index}_fmds8_1`] = "false";
    acc[`comm${index}_freezeOutput`] = "false";


    return acc;

  }, commodityExcludeObj);

  return {
    data: resultObject ?? {},
    length: data?.length ?? 0
  }

}

const projectOtherFeaturesData = async (project_id) => {
  const data = (await ProjectOtherFeature.findOne({
    where: {
      status: ACTIVE,
      project_id
    }
  })).toJSON()
  return {
    "other_class": "2",
    "other_aisleWidth": "0",
    "other_hasLPG": "true",
    "other_nLpgTanks": "8",
    "other_lbsPerLpg": "35",
    "other_hasBattChg": "true",
    "other_nChargers": "10",
    "other_clearFromRack": "true",
    "other_max15ftHeight": "true",
    "other_iras": "true",
    "other_colSprink": "true",
    "other_esfr": "true",
    "other_ceilOnly": "true",
    "other_fmDesign": "true",
    "other_t12_12_1_2a": "true",
    "other_t12_12_1_2b": "true",
    "other_t12_12_1_2c": "true",
    "other_s12_12_1_2_4": "true",
    "other_s12_12_2_2_4_2": "true",
    "other_s12_12_2_2_4_3": "true",

  }
}

const projectAcessDoorData = async (project_id) => {
  const data = (await ProjectAccessDoor.findOne({
    where: {
      status: ACTIVE,
      project_id
    }
  })).toJSON()
  return {
    "doors_ doors200ft": "true",
    "doors_doors125ft": "false",
    "doors_wallByWallAnalysis": "true",
    "doors_northWall": "0",
    "doors_eastWall": "1",
    "doors_southWall": "2",
    "doors_westWall": "1",
    "doors_northWallNDoors": "",
    "doors_eastWallNDoors": "2",
    "doors_southWallNDoors": "",
    "doors_westWallNDoors": "1"
  }
}
const masterJSONExportSchema = async (req, res) => {
  try {
    const { project_id } = req.params;
    const { limit, offset } = res.pagination;
    const projectJsonData = await projectData(project_id);
    const projectScopeDescriptionJsonData = await projectScopeDescriptionData(project_id);

    const models = [projectHpsAreaData, projectSprinlerData, projectSmokeVentData, projectCommodityData, projectOtherFeaturesData];

    let remainingLimit = limit;
    let currentOffset = offset;

    let mergedData = {};
    if (currentOffset === 0) {
      mergedData = {
        ...mergedData,
        ...projectJsonData,
        ...projectScopeDescriptionJsonData,
        ...unknownFields,
      }
    }
    for (const model of models) {
      const modelData = await model(project_id, remainingLimit, currentOffset);
      mergedData = { ...mergedData, ...modelData.data };
      remainingLimit -= modelData.length;
      currentOffset = 0;
      if (model.name === projectOtherFeaturesData.name) {
        const projectOtherFeaturesJsonData = await projectOtherFeaturesData(project_id);
        const projectAcessDoorJsonData = await projectAcessDoorData(project_id);
        mergedData = {
          ...mergedData,
          ...projectOtherFeaturesJsonData,
          ...projectAcessDoorJsonData
        }
      }
      if (remainingLimit < 1) {
        break;
      }
    }

    return res
      .status(200)
      .json({ msg: PROJECT_RETRIVED_JSON_SUCCESS, data: mergedData });
  } catch (error) {
    sendError500(res);
  }
};

const buildSmokeVentsFields = async (sprinkler_id, hps_area_id) => {
  try {
    const projectSmokeVentData = await ProjectSmokeVent.findOne({
      where: {
        status: ACTIVE,
        sprinkler_id,
        hps_area_id
      },
      attributes: ['link_temperature', 'beyond_smoke_event', 'total_required_smoke_vent']
    })
    if (!projectSmokeVentData) {
      return;
    }
    const { link_temperature, beyond_smoke_event, total_required_smoke_vent } = projectSmokeVentData?.dataValues;
    const smokeVentFields = {
      linkTemperature: link_temperature,
      isBeyondSmokeVent: beyond_smoke_event > 0,
      beyondSmokeVent: beyond_smoke_event,
      totalRequiredSmokeVent: total_required_smoke_vent,
      cubicFeet: '0'
    }
    return smokeVentFields
  } catch (error) {
    logger.error('buildSmokeVentsFields()', error)
    return {}
  }
}

const buildCommodityFields = async (sprinkler_id) => {
  try {
    const storageConfigData = await SprinklerStorageConfigMap.findAll({
      where: {
        status: ACTIVE,
        sprinkler_id
      },
      include: [
        {
          model: ProjectStorageConfig,
          required: true,
          where: { status: ACTIVE }
        }
      ]
    }).map(x => x?.dataValues?.ProjectStorageConfig?.dataValues);
    if (storageConfigData.length < 1) {
      return [];
    }
    const { lowestStorageHeight, highestStorageHeight } = storageConfigData.reduce(
      (acc, obj, index) => {
        const height = parseInt(obj.allowable_storage_height) || 0;
        acc.lowestStorageHeight = index === 0 ? height : Math.min(acc.lowestStorageHeight, height);
        acc.highestStorageHeight = Math.max(acc.highestStorageHeight, height);
        return acc;
      },
      { lowestStorageHeight: 0, highestStorageHeight: 0 }
    );

    const projectCommodityData = await CommodityStorageConfigMap.findAll({
      where: {
        status: ACTIVE,
        storage_config_id: { [Op.in]: storageConfigData.map(x => x.id) }
      },
      include: [
        {
          model: ProjectCommodity,
          required: true,
          where: { status: ACTIVE }
        }
      ]
    }).map(commoidty => {
      const { container_type } = commoidty?.dataValues?.ProjectCommodity?.dataValues
      return {
        containerType: '',
        shelvingType: '',
        commodityClass: '',
        proposedMaxHeight: '',
        isEncapsulated: '',
        storageConfig: '',
        palletType: ''
      }
    });
    return projectCommodityData?.length ? projectCommodityData : [];
  } catch (error) {
    logger.error('buildCommodityFields()', error)
    return []
  }
}

const buildSprinklerFields = async (sprinkler) => {
  try {
    const { high_ceiling, low_ceiling, ProjectSprinkler, area } = sprinkler
    const highCieling = ProjectSprinkler.high_ceiling || high_ceiling
    const lowCieling = ProjectSprinkler.low_ceiling || low_ceiling
    const sprinklerInfo = {
      highCielingFeet: Math.floor(highCieling / 12),
      highCielingInch: lowCieling % 12,
      lowCielingFeet: Math.floor(highCieling / 12),
      lowCielingInch: lowCieling % 12,
      isRoofPitchGreater: false,
      sprinklerName: area
    }
    return sprinklerInfo
  } catch (error) {
    logger.error('buildSprinklerFields()', error)
    return {}
  }
}

const buildProjectAndManagerFields = async (project) => {
  try {
    const { name: projectName, address: projectAddress, User: projectAdmin } = project
    const { first_name, last_name, phone } = projectAdmin
    const projectData = { projectName, projectAddress }
    const projectManagerData = { managerName: `${first_name} ${last_name}`, managerPhone: phone }
    return {
      ...projectData,
      ...projectManagerData
    }
  } catch (error) {
    logger.error('getPdfData()', error?.message);
    return {};
  }
}
const buildHpsFields = async (hpsArea) => {
  try {
    const { hps_area_scope, total_hps_area, area } = hpsArea
    return {
      floorAreaOnThisFloor: hps_area_scope,
      floorAreaOnEntireBuilding: total_hps_area,
      hpsAreaName: area
    }
  } catch (error) {
    logger.error('buildHpsFields()', error?.message);
    return {};
  }
}

const createPdfData = async (hpsArea, sprinkler) => {
  try {
    const { id: hpsAreaId } = hpsArea;
    const hpsData = await buildHpsFields(hpsArea)
    if (!sprinkler) {
      return [hpsData]
    }
    const { id: sprinklerId } = sprinkler;
    const sprinklerData = await buildSprinklerFields(sprinkler);
    const smokeVentData = await buildSmokeVentsFields(sprinklerId, hpsAreaId)
    const commodityData = await buildCommodityFields(sprinklerId);

    const pdfCreateObject = {
      ...hpsData,
      ...sprinklerData,
      ...smokeVentData,
      commodities: commodityData,
    };

    return pdfCreateObject;
  } catch (error) {
    logger.error('createPdfData() Error:', error);
    return null;
  }
};

const getHpsAppPdfData = async (hpsArea) => {
  try {
    const { id } = hpsArea.dataValues;

    const sprinklers = await SprinklerHpsAreaMap.findAll({
      where: {
        status: ACTIVE,
        hps_area_id: id
      },
      include: [
        {
          model: ProjectSprinkler,
          required: false,
          include: [
            {
              model: ProjectSprinkler,
              required: false
            }
          ]
        }
      ]
    });
    let results = [];
    if (sprinklers.length > 0) {
      results = await Promise.all(sprinklers.map(row => {
        const data = createPdfData(hpsArea?.dataValues, row?.dataValues?.ProjectSprinkler?.dataValues)
        return data
      }));
    } else {
      results = await createPdfData(hpsArea?.dataValues)
    }

    return results.filter(Boolean); // Remove null values from results array
  } catch (error) {
    logger.error('getPdfData()', error);
    return [];
  }
};
const exportHpsApp = async (req, res) => {
  try {
    const { projectId } = req.params;
    if (!projectId) return res.status(400).json({ msg: PROJECT_ID_REQUIRED })
    const project = await Project.findOne({
      where: {
        id: projectId,
        project_admin_id: {
          [Op.in]: res.agencyProjectAdminIds
        }
      },
      include: [
        {
          model: ProjectHpsArea,
          separate: true,
          where: { status: ACTIVE },
          attributes: ['id', 'hps_area_scope', 'total_hps_area', 'area'],
          required: true,
          order: [['id', 'DESC']],
        },
        {
          model: User,
          required: true,
          attributes: ['first_name', 'last_name', 'phone']
        }
      ],
      attributes: ['name', 'address']
    });

    if (!project) {
      return sendError404(res, 'PROJECT_NOT_FOUND');
    }

    const totalHpsAreaCount = await ProjectHpsArea.count({ where: { status: ACTIVE, project_id: projectId } });

    let projectHpsAreaData = []
    if (project?.dataValues?.ProjectHpsAreas?.length) {
      projectHpsAreaData = await Promise.all(project?.dataValues?.ProjectHpsAreas?.map(async (hps, index) => {
        if (!hps.area) {
          const count = index + 1;
          hps.area = `${count} of ${totalHpsAreaCount}`;
        }
        const data = await getHpsAppPdfData(hps);
        return data;
      })); 
    }

    const projectDetails = await buildProjectAndManagerFields(project?.dataValues)

    const data = {
      projectHpsAreaData: projectHpsAreaData.flat(),
      projectDetails
    }

    return sendResp200(res, 'HPS_AREA_GET_ALL_SUCCESS', { data });
    // const pdf = await createPdf(data)
    // res.contentType('application/pdf');
    // return res.send(pdf);

  } catch (error) {
    // return res.status(500).json({ msg: 'Internal Server Error!', sucesss: false, error: error?.message })
    return sendError500(res, error);
  }
};

const buildStoragRackType = async (storageRackData) => {
  try {
    // const storageRackData = allStoragConfig.filter(({ type }) => type === 'Storage Rack').map(x => x.dataValues)
    // console.log({ allStoragConfig: storageRackData.map(x => x.CommodityStorageConfigMaps) })
    const rackTypes = storageRackData.reduce((types, obj) => {
      const storageDepth = JSON.parse(obj.storage_depth);
      storageDepth.forEach(type => {
        types.add(type);
      });
      return types;
    }, new Set());
    if (rackTypes.size === 1) {
      const type = rackTypes.values().next().value;
      return `${type.toUpperCase()} ROW RACK: `;
    }

    if (rackTypes.size === 2) {
      if (rackTypes.has('Single Row') && rackTypes.has('Double Row')) {
        return SINGLE_OR_DOUBLE_ROW_RACK;
      }
      if (rackTypes.has('Double Row') && rackTypes.has('Multi Row')) {
        return DOUBLE_OR_MULTIPLE_ROW_RACK;
      }
    }
    if (rackTypes.size === 3) {
      return SINGLE_DOUBLE_OR_MULTIPLE;
    }

    return INVALID_CONFIGURATION;
  }
  catch (error) {
    logger.error('buildStoragRackType()', error)
    return INVALID_CONFIGURATION;
  }
}
const buildStoragRackCommidtyPalletType = async (storageRack) => {
  try {
    const palletTypes = storageRack?.map(row => row?.CommodityStorageConfigMaps)?.flat()?.map(row => row?.ProjectCommodity);
    const mergedTypesSet = new Set();

    palletTypes.forEach(({ dataValues }) => {
      const commoditypalletTypes = JSON.parse(dataValues.pallet_type);
      commoditypalletTypes.forEach(type => mergedTypesSet.add(type));
    });

    const mergedTypes = Array.from(mergedTypesSet);
    return mergedTypes
  } catch (error) {
    logger.error('buildStoragRackCommidtyPalletType()', error)
    return '[]';
  }
}
const storageRackTypeData = async (project_id) => {
  try {
    const data = await ProjectStorageConfig.findAll({
      where: {
        status: ACTIVE,
        project_id,
        type: 'Storage Rack'
      },
      include: [
        {
          model: CommodityStorageConfigMap,
          where: { status: ACTIVE },
          include: [
            {
              model: ProjectCommodity,
              where: { status: ACTIVE },
              attributes: ['id', 'pallet_type', 'full_description']
            },
          ]
        },
      ]
    }).map(x => x.dataValues)
    const storageRackType = await buildStoragRackType(data);
    const storagRackCommidtyPalletType = await buildStoragRackCommidtyPalletType(data)
    function getAllStorageRackCommodities(data) {
      const arr = data.map(row => row?.CommodityStorageConfigMaps)?.flat()?.map(row => row?.ProjectCommodity.dataValues)
      const uniqueIds = new Set();
      return arr.filter(item => {
        if (!uniqueIds.has(item.id)) {
          uniqueIds.add(item.id);
          return true;
        }
        return false;
      });
    }
    const storageRackCommodities = getAllStorageRackCommodities(data);
    // console.log({ uniqueArray })
    return {
      storageRackType,
      storagRackCommidtyPalletType,
      storageRackCommodities
    }
  } catch (error) {
    logger.error('buildStorageConfig()', error)
    return {}
  }
}
const getCommodityLetterDocsData = async (projectDetails) => {
  try {
    const { name: projectName, id: projectId, address: projectAddress } = projectDetails;
    const storageRack = await storageRackTypeData(projectId)
    return {
      date: moment(new Date()).format(DATE_FORMAT),
      projectName,
      projectAddress,
      storageRack
    }
  } catch (error) {
    logger.error('getCommodityLetterDocsData()', error)
    return {}
  }
}

const exportCommodityLetter = async (req, res) => {
  try {
    const { projectId } = req.params;
    const projectDetails = await Project.findOne({
      where: { status: ACTIVE, id: projectId, },
      attributes: ['id', 'name', 'address']
    })
    const buildData = await getCommodityLetterDocsData(projectDetails)
    return sendResp200(res, COMMODITY_LETTER_SUCCESS, { data: buildData })
  } catch (error) {
    return sendError500(res, error);
  }
};


module.exports = {
  masterJSONExportSchema,
  exportHpsApp,
  exportCommodityLetter
};
