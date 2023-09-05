const { Op } = require("sequelize");
const { sendError500 } = require("../common/helpers/httpStatus.helper");
const { locale } = require("../config/locales");
const { ACTIVE } = require("../constants/constant");
const AllModels = require("../services/model.service");
const { filterKeysWithLength } = require("../utils/helper");

const {
    Project,
    Jurisdiction,
    State,
    City,
    ProjectSprinkler,
    ProjectHpsArea,
    ProjectCommodity,
    ProjectStorageConfig,
} = AllModels();

const buildSprinklerFilter = (sprinkler) => {
    const { low_ceiling, high_ceiling } = sprinkler;
    return {
        model: ProjectSprinkler,
        where: {
            status: ACTIVE,
            ...(low_ceiling && { low_ceiling: { [Op.gte]: parseInt(low_ceiling) } }),
            ...(high_ceiling && { high_ceiling: { [Op.gte]: parseInt(high_ceiling) } }),
        },
        required: true,
    };
};

const buildHpsAreaFilter = (hpsarea) => {
    const { hazard_designation, storage_area, hps_area_range } = hpsarea;
    return {
        model: ProjectHpsArea,
        where: {
            status: ACTIVE,
            ...(hazard_designation && { hazard_designation }),
            ...(hps_area_range && { hps_area_range }),
            ...(storage_area && { storage_area: '1' }),
        },
        required: true,
    };
};

const buildCommodityFilter = (commodity) => {
    const { group_id: commodity_group_id, oversize_loaded, on_top_container } = commodity;
    return {
        model: ProjectCommodity,
        where: {
            status: ACTIVE,
            ...(commodity_group_id && { commodity_group_id }),
            ...(oversize_loaded && { oversize_loaded: '1' }),
            ...(on_top_container && { on_top_container: '1' }),
        },
        required: true,
    };
};

const buildStorageConfigFilter = (storage_config) => {
    const { height_min, height_max, depth_min, depth_max, storage_config: storageConfigArray } = storage_config || {};

    return {
        model: ProjectStorageConfig,
        where: {
            status: ACTIVE,
            ...storageConfigArray && { type: { [Op.in]: storageConfigArray } },
            ...height_min && { allowable_storage_height: { [Op.gte]: parseInt(height_min) } },
            ...height_max && { allowable_storage_height: { [Op.lte]: parseInt(height_max) } },
            ...depth_min && { allowable_storage_depth: { [Op.gte]: parseInt(depth_min) } },
            ...depth_max && { allowable_storage_depth: { [Op.lte]: parseInt(depth_max) } },
        },
        required: true,
    };
};

const applyDateFilter = (condition, start_date, end_date) => {
    if (start_date && end_date) {
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);
        const startOfDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        const endOfDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1);
        condition.where.createdAt = {
            [Op.between]: [startOfDay, endOfDay],
        };
    }
};

const filterProject = async (req, res) => {
    try {
        req.body = filterKeysWithLength(req.body);

        const {
            city: cityId,
            state: stateId,
            jurisdiction: jurisdictionId,
            start_date,
            end_date,
            sprinkler,
            hpsarea,
            storage_config,
            commodity,
        } = req.body;


        const include = [];

        // Apply project sprinkler filter
        if (sprinkler) {
            include.push(buildSprinklerFilter(sprinkler));
        }

        // Apply project hpsarea filter
        if (hpsarea) {
            include.push(buildHpsAreaFilter(hpsarea));
        }

        // Apply project commodity filter
        if (commodity) {
            include.push(buildCommodityFilter(commodity));
        }

        // Apply project storage config filter
        if (storage_config) {
            include.push(buildStorageConfigFilter(storage_config));
        }

        // Apply project created date filter
        const condition = { where: {} };
        applyDateFilter(condition, start_date, end_date);

        // Apply city filters
        if (cityId) {
            condition.where.city_id = cityId
            include.push(City);

            // Apply jurisdiction filters
        }
        if (jurisdictionId) {
            condition.where.jurisdiction_id = cityId
            include.push(Jurisdiction);
        }
        // Apply  state filters
        if (stateId) {
            condition.where.state_id = stateId
            include.push(State);
        }

        const { limit, offset, search } = res.pagination;

        const { rows, count } = await Project.findAndCountAll({
            where: {
                status: ACTIVE,
                project_admin_id: {
                    [Op.in]: res.agencyProjectAdminIds,
                },
                name: { [Op.substring]: `%${search}%` },
                ...condition.where,
            },
            include,
            order: [['id', 'DESC']],
            limit,
            offset,
        });
        const data = { projects: rows, totalcount: count }
        return res.status(200).json({ msg: locale('PROJECT_RETRIVED_SUCCESS_AFTER_FILTER'), data, success: true });
    } catch (error) {
        return sendError500(res, error);
    }
};
module.exports = { filterProject }