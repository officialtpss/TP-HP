const router = require('express').Router();
const { getUserInfoByToken, getAgencyProjectAdminIds } = require('../common/Common');
const { isAuthorized } = require('../common/middlewares/role.validator');
const checkRequiredField = require('../common/middlewares/schema.validator');
const ProjectSmokeVentContoller = require('../controllers/ProjectSmokeVentController');
const jwt = require('../common/middlewares/jwt.validator');

const projectIdRequired = ['project_id'];
const updateOrDeleteRequiredField = [...projectIdRequired, 'id'];

/**
 * @swagger
 * /api/smoke_vent/project_id:
 *   get:
 *     tags:
 *       - Project Smoke vent
 *     name: List Project Smoke vent
 *     summary: List Project Smoke vent
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

router.get('/:project_id', checkRequiredField(projectIdRequired), jwt.decode, getUserInfoByToken, getAgencyProjectAdminIds, ProjectSmokeVentContoller.list);

/**
 * @swagger
 * /api/smoke_vent/project_id:
 *   post:
 *     tags:
 *       - Project Smoke vent
 *     name: Add
 *     summary: Add Project smoke vent
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
 *             lable_name:
 *               type: string
 *             beyond_hps_area:
 *               type: string
 *             copy_wrh_area:
 *               type: string
 *             skylight_provided:
 *               type: string
 *             beyond_smoke_event:
 *               type: string
 *             link_temperature:
 *               type: number
 *             link_temperature_opton:
 *               type: string
 *             require_smoke_event:
 *               type: string
 *             hps_area_id:
 *               type: number
 *         required:
 *           - lable_name
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

router.post('/:project_id', checkRequiredField(projectIdRequired), jwt.decode, isAuthorized, ProjectSmokeVentContoller.add);

/**
 * @swagger
 * /api/smoke_vent/project_id:
 *   put:
 *     tags:
 *       - Project Smoke vent
 *     name: Update
 *     summary: Update Project smoke vent
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
  *             lable_name:
 *               type: string
 *             beyond_hps_area:
 *               type: string
 *             copy_wrh_area:
 *               type: string
 *             skylight_provided:
 *               type: string
 *             beyond_smoke_event:
 *               type: string
 *             link_temperature:
 *               type: number
 *             link_temperature_opton:
 *               type: string
 *             require_smoke_event:
 *               type: string
 *             hps_area_id:
 *               type: number
 *         required:
 *           - lable_name
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

router.put('/:project_id', checkRequiredField(updateOrDeleteRequiredField), jwt.decode, isAuthorized, ProjectSmokeVentContoller.update);

/**
 * @swagger
 * /api/smoke_vent/project_id:
 *   delete:
 *     tags:
 *       - Project Smoke vent
 *     name: Delete
 *     summary: Delete Project smoke vent
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

router.delete('/:project_id', checkRequiredField(updateOrDeleteRequiredField), jwt.decode, isAuthorized, ProjectSmokeVentContoller.deleteSmokeEvent);

module.exports = router;
