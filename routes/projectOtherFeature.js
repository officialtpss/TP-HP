const router = require('express').Router();
const { getUserInfoByToken, getAgencyProjectAdminIds } = require('../common/Common');
const { isAuthorized } = require('../common/middlewares/role.validator');
const checkRequiredField = require('../common/middlewares/schema.validator');
const ProjectOtherFeatureController = require('../controllers/ProjectOtherFeatureController');
const jwt = require('../common/middlewares/jwt.validator');

const projectIdRequired = ['project_id'];
const updateOrDeleteRequiredField = [...projectIdRequired, 'id'];

/**
 * @swagger
 * /api/other_feature/project_id:
 *   get:
 *     tags:
 *       - Project other feature
 *     name: Project other feature list
 *     summary: Project other feature list
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Project other feature list!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action

 *
 */

router.get('/:project_id', checkRequiredField(projectIdRequired), jwt.decode, getUserInfoByToken, getAgencyProjectAdminIds, ProjectOtherFeatureController.list);
/**
 * @swagger
 * /api/other_feature/project_id:
 *   post:
 *     tags:
 *       - Project other feature
 *     name: Add
 *     summary: Add project other feature
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
 *             pallet_analysis:
 *               type: array
 *               items:
 *                   type: string
 *             batterry_charging_analysis:
 *               type: array
 *               items:
 *                   type: string
 *             lpg_tank_analysis:
 *               type: array
 *               items:
 *                   type: string
 *             steel_building_analysis:
 *               type: array
 *               items:
 *                   type: string
 *             hvls_fan_analysis:
 *               type: array
 *               items:
 *                   type: string
 *             photovolatic_roof_analysis:
 *               type: array
 *               items:
 *                   type: string
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

router.post('/:project_id', checkRequiredField(projectIdRequired), jwt.decode, isAuthorized, ProjectOtherFeatureController.add);

/**
 * @swagger
 * /api/other_feature/project_id:
 *   put:
 *     tags:
 *       - Project other feature
 *     name: Update
 *     summary: Update Project other feature
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
 *               type: integer
 *             pallet_analysis:
 *               type: array
 *               items:
 *                   type: string
 *             batterry_charging_analysis:
 *               type: array
 *               items:
 *                   type: string
 *             lpg_tank_analysis:
 *               type: array
 *               items:
 *                   type: string
 *             steel_building_analysis:
 *               type: array
 *               items:
 *                   type: string
 *             hvls_fan_analysis:
 *               type: array
 *               items:
 *                   type: string
 *             photovolatic_roof_analysis:
 *               type: array
 *               items:
 *                   type: string
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

router.put('/:project_id', checkRequiredField(updateOrDeleteRequiredField), jwt.decode, isAuthorized, ProjectOtherFeatureController.update);
/**
 * @swagger
 * /api/other_feature/project_id:
 *   delete:
 *     tags:
 *       - Project other feature
 *     name: Delete
 *     summary: Delete Project other feature
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
 *         required:
 *           - id
 *     responses:
 *       200:
 *         description: Project storage config  deleted sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action

 *
 */

router.delete('/other_feature/:project_id', checkRequiredField(updateOrDeleteRequiredField), jwt.decode, isAuthorized, ProjectOtherFeatureController.deleteOtherFeature);

module.exports = router;
