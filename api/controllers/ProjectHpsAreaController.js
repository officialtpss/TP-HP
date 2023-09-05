const crypto = require('crypto');
const { Op } = require('sequelize');
const emailService = require('../services/email.service');
const { sendError404, sendError500, sendResp200, sendError400 } = require('../common/helpers/httpStatus.helper');
const AllModels = require('../services/model.service');
const { INVITED_ADD_HPS_AREA, INVALID_VERIFICATION_CODE, ACTIVE } = require('../constants/constant');

const { Project, HpsAreaInvite, ProjectHpsArea, SprinklerHpsAreaMap, ProjectSprinkler } = AllModels();
/** ****************************************************************************
 *                              Project Hps Area Controller
 ***************************************************************************** */
// get project hps area
const list = async (req, res) => {
  try {
    const { project_id } = req.params;
    const { limit, offset } = res.pagination;
    const projects = await Project.findOne({
      where: {
        id: project_id,
        project_admin_id: {
          [Op.in]: res.agencyProjectAdminIds
        },
      },
    })
    
    if (!projects) return sendError404(res, 'PROJECT_NOT_FOUND');

    const condition = {
      where: {
        id: project_id,
        project_admin_id: {
          [Op.in]: res.agencyProjectAdminIds
        },
      },
      include: [
        {
          model: ProjectHpsArea,
          separate: true,
          where: {
            status: ACTIVE,
          },
          include: [
            {
              model: SprinklerHpsAreaMap,
              seprate: true,
              where: {
                status: ACTIVE,
              },
              required: false,
              include: [
                {
                  model: ProjectSprinkler,
                  seprate: true,
                  required: false,
                  include: [
                    {
                      model: ProjectSprinkler,
                      seprate: true,
                      required: false,
                    },
                  ],
                },
              ],
            },
          ],
          limit,
          offset,
          order: [['id', 'DESC']],
        }
      ]
    }

    const project = await Project.findOne(condition);

    const totalHpsAreaCount = await ProjectHpsArea.count({
      where: {
        status: ACTIVE,
        project_id
      }
    });

    project.dataValues.totalHpsAreaCount = totalHpsAreaCount;
    project.ProjectHpsAreas = project?.dataValues?.ProjectHpsAreas.map((value, index) => {
      if (!value.area) {
        const count = index + 1;
        value.area = `${count} of ${totalHpsAreaCount}`;
      }
      return value;
    });
    return sendResp200(res, 'HPS_AREA_GET_ALL_SUCCESS', { project });
  } catch (error) {
    return sendError500(res);
  }
};

// add Project hps area from project admin
const add = async (req, res) => {
  try {
    const { sprinkler } = req.body;
    req.body.project_id = req.params.project_id;
    const hpsArea = await ProjectHpsArea.create(req.body);
    if (hpsArea && sprinkler?.length) {
      const sprinklers = sprinkler?.map((sprinkler_id) => {
        return {
          hps_area_id: hpsArea?.id,
          sprinkler_id
        };
      });
      sprinklers?.length && await SprinklerHpsAreaMap.bulkCreate(sprinklers);
    }
    return sendResp200(res, 'HPS_AREA_CREATE_SUCCESS', { data: hpsArea });
  } catch (err) {
    return sendError500(res);
  }
};

// update Project hps area from invited user
const inviteAdminUpdate = async (req, res) => {
  try {
    await ProjectHpsArea.update(req.body, { where: { id: req.body.hps_area_id } });
    return sendResp200(res, 'HPS_AREA_UPDATE_SUCCESS');
  } catch (err) {
    return sendError500(res);
  }
};
// add Project hps area
const update = async (req, res) => {
  try {
    const { id, sprinkler } = req.body;
    await ProjectHpsArea.update(req.body, { where: { id } });
    if (sprinkler?.length) {
      await SprinklerHpsAreaMap.destroy({ where: { hps_area_id: id } });
      const sprinklers = sprinkler?.map((sprinkler_id) => {
        return {
          hps_area_id: id,
          sprinkler_id
        };
      });
      sprinklers?.length && SprinklerHpsAreaMap.bulkCreate(sprinklers);
    }

    return sendResp200(res, 'HPS_AREA_UPDATE_SUCCESS');
  } catch (err) {
    return sendError500(res);
  }
};

const deleteHspsArea = async (req, res) => {
  try {
    await ProjectHpsArea.update({ status: 'deleted' }, { where: { id: req.query.id } },);
    return sendResp200(res, 'HPS_AREA_DELETE_SUCCESS');
  } catch (err) {
    return sendError500(res);
  }
};

const removeSprinkler = async (req, res) => {
  try {
    await SprinklerHpsAreaMap.update({ status: 'deleted' }, { where: { id: req.query.id } });
    return sendResp200(res, 'SPRNIKLER_REMOVE_FROM_HPS_AREA_SUCCESS')
  } catch (err) {
    return sendError500(res);
  }
};
// hps area invite
// eslint-disable-next-line consistent-return
const invite = async (req, res) => {
  try {
    const { email, hps_area_id } = req.body;
    const { project_id } = req.params;
    // check user for the requested email
    const checkUser = await HpsAreaInvite.findOne({ where: { email, project_id } });
    if (checkUser) return sendError400(res, 'INVITE_ALREADY_SENT_TO_CONTACT')
    // send invite email
    const token = crypto.randomBytes(Math.ceil(60 / 2)).toString('hex').slice(0, 60);
    const code = Math.random().toString(36).slice(2);
    // send hps area invitation email
    emailService.HpsAreaInvite({
      to: email,
      token,
      code,
      project_id,
      subject: INVITED_ADD_HPS_AREA,
    }, async (err) => {
      if (err) return sendError400(res, err?.message);

      await HpsAreaInvite.create({
        email,
        project_id,
        hps_area_id,
        token,
        code,
        token_expire_time: Date.now() + (3600000 * 24 * 7),
      });
      return sendResp200(res, 'INVITE_SENT_TO_CONTACT_SUCCESS')
    });
  } catch (error) {
    return sendError500(res);
  }
};

const inviteVerification = async (req, res) => {
  try {
    const { token, code } = req.body;
    const { project_id } = req.params;
    const inviteDetail = await HpsAreaInvite.findOne({
      where: {
        token,
        is_verified: 0,
        code,
        // token_expire_time: {
        //   [Op.gte]: Date.now(),
        // },
        project_id,
      },
      include: [
        {
          model: ProjectHpsArea,
          seprate: true,
          where: {
            status: ACTIVE,
          },
          required: false,
        },
      ],
    });

    if (inviteDetail) {
      await HpsAreaInvite.update({ is_verified: 1 }, { where: { token, code, project_id } });
      return res.status(200).json({ inviteDetail });
    }
    return res.status(402).json({ msg: INVALID_VERIFICATION_CODE });
  } catch (error) {
    return sendError500(res);
  }
};

// all sprinkler on behalf of hps area

const getAllSprinklersOnBehalfOfHpsArea = async (req, res) => {
  try {
    const { hps_area_id } = req.params;
    let spriklers = await SprinklerHpsAreaMap.findAll({
      where: { hps_area_id },
      include: [{
        model: ProjectSprinkler,
        seprate: true,
        where: {
          status: ACTIVE,
        },
        required: false,
      }]
    });
    spriklers = spriklers?.map((row) => row?.ProjectSprinkler);
    return sendResp200(res, 'SPRNIKLER_GET_ALL_SUCCESS', { spriklers });
  } catch (error) {
    console.log(error.message)
    return sendError500(res);
  }
};
const ProjectHpsAreaController = {
  list,
  add,
  inviteAdminUpdate,
  update,
  deleteHspsArea,
  removeSprinkler,
  invite,
  inviteVerification,
  getAllSprinklersOnBehalfOfHpsArea
}
module.exports = ProjectHpsAreaController;
