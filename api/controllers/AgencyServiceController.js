const { Op } = require('sequelize');
const {
  sendError500,
  sendError409,
  sendResp200,
  sendError403,
  sendError404,
  sendError400,
} = require('../common/helpers/httpStatus.helper');
const getAllModels = require('../services/model.service');

const models = getAllModels();
const { AgencyService, Project, ProjectScopeService } = models;

/** ****************************************************************************
 *                              Agency Service Controller
 ***************************************************************************** */

/**
 * @description: Create Agency Service.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} The response object.
 */
const createAgency = async (req, res) => {
  try {
    // Extract user_id and agency_id from the decoded JWT token
    const { user_id, agency_id } = res;

    // Perform the create operation on the agency service
    await AgencyService.create({ ...req.body, user_id, agency_id });

    // Return success response
    return sendResp200(res, 'AGENCY_CREATE_SUCCESS');
  } catch (error) {
    // Check if the error is a duplicate entry error
    if (error?.original?.code === 'ER_DUP_ENTRY') {
      // If it is a duplicate entry error, send a 409 Conflict response
      return sendError409(res, 'AGENCY_ALREADY_EXISTS');
    }

    // Handle other errors
    return sendError500(res, error);
  }
};

/**
 * @description: Update Agency Service.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} The response object.
 */
const updateAgency = async (req, res) => {
  try {
    const { id } = req.params;
    // Extract user_id and agency_id from the decoded JWT token
    const { user_id, agency_id } = res;

    // Find the agency service by its ID and agency ID
    const agencyService = await AgencyService.findOne({ where: { id, agency_id } });

    // If the agency service does not exist, send a 404 Not Found response
    if (!agencyService) {
      return sendError404(res, 'AGENCY_NOT_FOUND');
    }

    // If the requesting user is not authorized for the agency service, send a 403 Forbidden response
    if (user_id !== agencyService.user_id) {
      return sendError403(res, 'NOT_AUTHORIZED');
    }

    // Perform the update operation on the agency service
    await AgencyService.update(req.body, { where: { id } });

    // Return success response
    return sendResp200(res, 'AGENCY_UPDATE_SUCCESS');
  } catch (error) {
    // Check if the error is a duplicate entry error
    if (error?.original?.code === 'ER_DUP_ENTRY') {
      // If it is a duplicate entry error, send a 409 Conflict response
      return sendError409(res, 'AGENCY_ALREADY_EXISTS');
    }

    // Handle other errors
    return sendError500(res, error);
  }
};

/**
 * @description: Delete Agency Service.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} The response object.
 */
const deleteAgency = async (req, res) => {
  try {
    const { id } = req.params;
    // Extract user_id and agency_id from the decoded JWT token
    const { user_id, agency_id, role } = res;
    const isProjectAdmin = role === 'project_admin';

    // Find the agency service by its ID and agency ID
    const agencyService = await AgencyService.findOne({ where: { id, agency_id } });

    // If the agency service does not exist, send a 404 Not Found response
    if (!agencyService) {
      return sendError404(res, 'AGENCY_NOT_FOUND');
    }

    // Check if the user is authorized to delete the agency service
    if (user_id !== agencyService.user_id) {
      return sendError403(res, 'NOT_AUTHORIZED');
    }

    // Fetch projects associated with the agency service
    const associatedProjects = await ProjectScopeService.findAll({
      where: { agency_service_id: id },
      include: [
        {
          model: Project,
          attributes: ['id', 'project_admin_id'],
        },
      ],
    });

    // Check if any Agency Service is already associated with the Project.
    // If projects exist and the user is a project admin, send the error indicating association with own project
    const isAssociatedWithOwnProject = isProjectAdmin && associatedProjects.some(({ dataValues }) => dataValues?.Project?.dataValues?.project_admin_id === user_id);
    if (isAssociatedWithOwnProject) {
      return sendError400(res, 'AGENCY_ASSOCIATED_WITH_YOUR_PROJECT');
    }

    // If the user is a project admin and there are associated projects,
    // send the error indicating association with other projects
    if (isProjectAdmin && associatedProjects.length > 0) {
      return sendError400(res, 'AGENCY_ASSOCIATED_WITH_OTHERS_PROJECT');
    }

    // Perform the delete operation on the agency service
    await AgencyService.destroy({ where: { id } });

    // Return success response        
    return sendResp200(res, 'AGENCY_DELETE_SUCCESS');
  } catch (error) {
    // Handle other errors
    return sendError500(res, error);
  }
};

/**
 * @description: List All Agency Services.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} The response object.
 */
const getAllAgency = async (req, res) => {
  try {
    // Extract limit and offset from res.pagination (included in JWT decode middleware)
    const { limit, offset, search } = res.pagination;
    const { agency_id } = res;

    // Retrieve all agency services that belong to the specified agency ID and match the search query
    const { rows, count } = await AgencyService.findAndCountAll({
      where: {
        agency_id: { [Op.or]: [agency_id, null] },
        name: { [Op.substring]: `%${search}%` },
      },
      order: [['id', 'DESC']],
      limit,
      offset,
    });

    // Return the agency services and the total count with success response
    return sendResp200(res, 'AGENCY_GET_ALL_SUCCESS', { groups: rows, totalCount: count });
  } catch (error) {
    // Handle other errors
    return sendError500(res, error);
  }
};

module.exports = {
  createAgency,
  updateAgency,
  deleteAgency,
  getAllAgency,
};
