const router = require('express').Router();
const { getUserInfoByToken, getAgencyProjectAdminIds } = require('../common/Common');
const { isAuthorized } = require('../common/middlewares/role.validator');
const ProjectAccessDorContoller = require('../controllers/ProjectAccessDoorController');
const jwt = require('../common/middlewares/jwt.validator');

/**
 * @swagger
 * /api/access_dor/project_id:
 *   get:
 *     tags:
 *       - Project Access Door
 *     name: List Project Access Door
 *     summary: List Project Access Door
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Action successful
 *       401:
 *         description: Bad Request, not found in db
 *
 */

router.get('/:project_id', jwt.decode, getUserInfoByToken, getAgencyProjectAdminIds, ProjectAccessDorContoller.list);

/**
 * @swagger
 * /api/access_dor/project_id:
 *   post:
 *     tags:
 *       - Project Access Door
 *     name: Add
 *     summary: Add Access Door
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             hps_extended_spacing:
 *               type: string
 *               enum: [200, 125]
 *             wall_anlysis:
 *               type: string
 *             north_wall:
 *               type: string
 *             additional_north_wall:
 *               type: string
 *             east_wall:
 *               type: string
 *             additional_east_wall:
 *               type: string
 *             south_wall:
 *               type: string
 *             additional_south_wall:
 *               type: string
 *             west_wall:
 *               type: string
 *             additional_west_wall:
 *               type: string
 *             approved_hsp_area:
 *               type: string
 *             exosting_hps_tech_report:
 *               type: string
 *               enum: [yes, no]
 *         required:
 *           - hps_extended_spacing
 *     responses:
 *       200:
 *         description: Project hps area added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */

router.post('/:project_id', jwt.decode, isAuthorized, ProjectAccessDorContoller.add);

/**
 * @swagger
 * /api/access_dor/project_id:
 *   put:
 *     tags:
 *       - Project Access Door
 *     name: Update
 *     summary: Update Access Door
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *             hps_extended_spacing:
 *               type: string
 *             wall_anlysis:
 *               type: string
 *             north_wall:
 *               type: string
 *             additional_north_wall:
 *               type: string
 *             east_wall:
 *               type: string
 *             additional_east_wall:
 *               type: string
 *             south_wall:
 *               type: string
 *             additional_south_wall:
 *               type: string
 *             west_wall:
 *               type: string
 *             additional_west_wall:
 *               type: string
 *             exosting_hps_tech_report:
 *               type: string
 *         required:
 *           - id
 *     responses:
 *       200:
 *         description: Project hps area added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */

router.put('/:project_id', jwt.decode, isAuthorized, ProjectAccessDorContoller.update);

/**
 * @swagger
 * /api/access_dor/project_id:
 *   delete:
 *     tags:
 *       - Project Access Door
 *     name: Delete
 *     summary: Delete Project Hps Area
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: query
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *         required:
 *           - id
 *     responses:
 *       200:
 *         description: Project hps area added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */

router.delete('/:project_id', jwt.decode, isAuthorized, ProjectAccessDorContoller.deleteAccessDor);

module.exports = router;
