const { Op, Sequelize } = require('sequelize');
const { sendError500, sendError409, sendResp200, sendError404, sendError400 } = require('../common/helpers/httpStatus.helper');
const { ACTIVE } = require('../constants/constant');
const AllModels = require('../services/model.service');

const { City, CityJurisdictionMap, Jurisdiction, State, Project } = AllModels();

/** ****************************************************************************
 *                              City Controller
 ***************************************************************************** */
/**
 * @description Add a new city.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} The response object.
 */
const createCity = async (req, res) => {
  try {
    // Extract user_id, agency_id, and role from the decoded JWT token
    const { user_id, agency_id, role } = res;
    const { jurisdictions = [] } = req.body;

    // Create a new city entry in the database
    const data = await City.create({
      ...req.body,
      user_id,
      agency_id,
      is_global: role === 'admin' ? 'yes' : 'no',
    });

    // Create city-jurisdiction mappings if jurisdictions are provided
    if (jurisdictions.length) {
      const mappedJurisdictions = jurisdictions.map(jurisdiction_id => ({
        city_id: data?.id,
        jurisdiction_id,
      }));

      // Bulk create the city-jurisdiction mappings if there are any
      mappedJurisdictions?.length && await CityJurisdictionMap.bulkCreate(mappedJurisdictions);
    }

    // Return success response
    return sendResp200(res, 'CITY_CREATE_SUCCESS');
  } catch (error) {
    // Check if the error is a duplicate entry error
    if (error?.original?.code === 'ER_DUP_ENTRY') {
      // If it is a duplicate entry error, send a 409 Conflict response
      return sendError409(res, 'CITY_ALREADY_EXISTS');
    }
    // Handle other errors
    return sendError500(res, error);
  }
};

/**
 * @description Update an existing city.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} The response object.
 */
const updateCity = async (req, res) => {
  try {
    // Extract user_id from the decoded JWT token
    const { user_id } = res;
    const { id } = req.params;
    const { jurisdictions = [] } = req.body;

    // Find the city instance in the database by ID and ensure it is active
    const instance = await City.findOne({ where: { id, status: ACTIVE } });
    if (!instance) return sendError404(res, 'CITY_NOT_FOUND');
    // Check if the user is authorized to update the city
    if (user_id !== instance.user_id  &&  res.role !== 'admin') return sendError400(res, 'NOT_AUTHORIZED');

    // Update city-jurisdiction mappings if jurisdictions are provided
    if (jurisdictions.length) {
      // Delete existing city-jurisdiction mappings
      await CityJurisdictionMap.destroy({ where: { city_id: id } });

      // Create new city-jurisdiction mappings based on the provided jurisdictions
      const mappedJurisdictions = jurisdictions.map(jurisdiction_id => ({
        city_id: id,
        jurisdiction_id,
      }));

      // Bulk create the city-jurisdiction mappings if there are any
      mappedJurisdictions?.length && await CityJurisdictionMap.bulkCreate(mappedJurisdictions);
    }

    // Update the city instance with the new data
    await instance.update(req.body);

    // Return success response
    return sendResp200(res, 'CITY_UPDATE_SUCCESS');
  } catch (error) {
    // Check if the error is a duplicate entry error
    if (error?.original?.code === 'ER_DUP_ENTRY') {
      // If it is a duplicate entry error, send a 409 Conflict response
      return sendError409(res, 'CITY_ALREADY_EXISTS');
    }
    // Handle other errors
    return sendError500(res, error);
  }
};


/**
 * @description Delete a city.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} The response object.
 */
const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, user_id } = res;
    const isProjectAdmin = role === 'project_admin';
    const isGlobalAdmin = role === 'admin';

    // Find the city instance in the database by ID and ensure it is active
    const instance = await City.findOne({ where: { id, status: 'active' } });

    if (!instance) return sendError404(res, 'CITY_NOT_FOUND');

    // Check if the user is authorized to delete the city
    if (user_id !== instance.user_id && !isGlobalAdmin) return sendError400(res, 'NOT_AUTHORIZED');

    // Retrieve associated projects for the city
    const associatedProjects = await Project.findAll({
      where: { status: 'active', city_id: id },
      attributes: ['project_admin_id'],
      group: ['project_admin_id']
    });

    const isAssociatedWithOwnProject = isProjectAdmin && associatedProjects.some(({ project_admin_id }) => project_admin_id === user_id);

    // Check if the city is associated with projects and handle accordingly
    if (isGlobalAdmin && associatedProjects?.length > 0) {
      return sendError400(res, 'CITY_ASSOCIATED_WITH_PROJECT_ADMIN_PROJECTS');
    }

    if (isAssociatedWithOwnProject) {
      return sendError400(res, 'CITY_ASSOCIATED_WITH_YOUR_PROJECT');
    }

    if (isProjectAdmin && associatedProjects.length > 0) {
      return sendError400(res, 'CITY_ASSOCIATED_WITH_OTHERS_PROJECT');
    }

    // Update the city instance to mark it as deleted
    await instance.update({ status: 'deleted', name: Sequelize.literal(`CONCAT(name, '-', id)`) });

    // Return success response
    return sendResp200(res, 'CITY_DELETE_SUCCESS');
  } catch (error) {
    // Handle errors
    return sendError500(res, error);
  }
};


/**
 * @description Get a list of all cities.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} The response object.
 */
const getAllCities = async (req, res) => {
  try {
    const { limit, offset, search } = res.pagination;
    const { agency_id, role } = res;
    const isAdminCreatedList = req.query.role === 'admin';

    // Retrieve cities based on search criteria, pagination, and user role
    const { count, rows } = await City.findAndCountAll({
      where: {
        status: ACTIVE,
        name: { [Op.substring]: `%${search}%` },
        ...(role === 'project_admin') ? { agency_id: { [Op.or]: [null, agency_id] } } : isAdminCreatedList ? { agency_id: null } : {}
      },
      include: [
        {
          model: CityJurisdictionMap,
          separate: true,
          attributes: ['jurisdiction_id'],
          include: [
            {
              model: Jurisdiction,
              where: { status: ACTIVE },
              attributes: ['name', 'id'],
              required: false,
              include: [
                {
                  model: State,
                  attributes: ['name', 'id'],
                },
              ],
            },
          ],
          required: false
        },
        {
          model: State,
          attributes: ['name', 'id'],
        },
      ],
      order: [['id', 'DESC']],
      distinct: true,
      limit,
      offset
    });

    // Return success response with the retrieved cities and total count
    return sendResp200(res, 'CITY_GET_ALL_SUCCESS', { city: rows, totalCount: count });
  } catch (error) {
    // Handle errors
    return sendError500(res, error);
  }
};


module.exports = {
  createCity,
  updateCity,
  deleteCity,
  getAllCities,
};
