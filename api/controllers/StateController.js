const { sendError500, sendResp200 } = require('../common/helpers/httpStatus.helper');
const { ACTIVE } = require('../constants/constant');
const AllModels = require('../services/model.service');

const { State } = AllModels();
/** ****************************************************************************
 *                              State Controller
 ***************************************************************************** */

// List All states
const getAll = async (req, res) => {
  try {
    const condition = {
      where: {
        status: ACTIVE,
      },
      attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
      order: [
        ['name', 'ASC'],
      ],
    };
    const states = await State.findAll(condition);
    return sendResp200(res, 'STATE_GET_ALL_SUCCESS', { states });
  } catch (error) {
    return sendError500(res, error);
  }
};

const StateController = {
  getAll,
};

module.exports = StateController;
