const router = require('express').Router();
const { getUserInfoByToken, getAgencyProjectAdminIds } = require('../common/Common');
const { isAuthorized } = require('../common/middlewares/role.validator');
const ProjectHpsAreaContoller = require('../controllers/ProjectHpsAreaController');
const jwt = require('../common/middlewares/jwt.validator');
const checkRequiredField = require('../common/middlewares/schema.validator');

const projectIdRequired = ['project_id']

/**
 * @swagger
 * /api/hps_area/project_id/invitation/verification:
 *   post:
 *     tags:
 *       - Project Hps Area
 *     name: Project Hps Area invite verification
 *     summary: Hps Area Invite Project Admin verification
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *             code:
 *               type: string
 *         required:
 *           - token
 *     responses:
 *       200:
 *         description: Invitation sent sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error , email not sent
 *
 */
const inviteVerificationRequiredField = [...projectIdRequired, 'token', 'code']
router.post('/:project_id/invitation/verification', checkRequiredField(inviteVerificationRequiredField), ProjectHpsAreaContoller.inviteVerification);

/**
 * @swagger
 * /api/hps_area/invite/project_id:
 *   post:
 *     tags:
 *       - Project Hps Area
 *     name: Add by invited user
 *     summary: Add Project Hps Area by invited user
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
 *             hps_area_id:
 *               type: number
 *             warehouse_area:
 *               type: string
 *             area:
 *               type: string
 *             existing_hps_area:
 *               type: string
 *             hps_area_scope:
 *               type: string
 *             hazard_designation:
 *               type: string
 *             engineering_analysis:
 *               type: number
 *             public_occupancy:
 *               type: string
 *             detection_present:
 *               type: string
 *             access_provided:
 *               type: string
 *             travel_distance:
 *               type: number
 *             storage_hps_area:
 *               type: string
 *             mechanical_stocking:
 *               type: string
 *             hamat_present:
 *               type: string
 *             commodities:
 *               type: string
 *             storage_area:
 *               type: string
 *             total_hps_area:
 *               type: string
 *             sprinkler:
 *               type: array
 *               items:
 *                   type: integer
 *         required:
 *           - area
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
const inviteAdminUpdateRequiredFields = [...projectIdRequired, 'hps_area_id']
router.post('/invite/:project_id', checkRequiredField(inviteAdminUpdateRequiredFields), ProjectHpsAreaContoller.inviteAdminUpdate);

/**
 * @swagger
 * /api/hps_area/project_id:
 *   get:
 *     tags:
 *       - Project Hps Area
 *     name: List Project Hps Area
 *     summary: List Project Hps Area
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
router.get('/:project_id', checkRequiredField(projectIdRequired), jwt.decode, getUserInfoByToken, getAgencyProjectAdminIds, ProjectHpsAreaContoller.list);

/**
 * @swagger
 * /api/hps_area/project_id:
 *   post:
 *     tags:
 *       - Project Hps Area
 *     name: Add
 *     summary: Add Project Hps Area
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
 *             warehouse_area:
 *               type: string
 *             area:
 *               type: string
 *             existing_hps_area:
 *               type: string
 *             hps_area_scope:
 *               type: string
 *             hazard_designation:
 *               type: string
 *             engineering_analysis:
 *               type: number
 *             public_occupancy:
 *               type: string
 *             detection_present:
 *               type: string
 *             access_provided:
 *               type: string
 *             travel_distance:
 *               type: number
 *             storage_hps_area:
 *               type: string
 *             mechanical_stocking:
 *               type: string
 *             hamat_present:
 *               type: string
 *             commodities:
 *               type: string
 *             storage_area:
 *               type: string
 *             total_hps_area:
 *               type: string
 *             hps_palletized_shelf:
 *               type: string
 *             palletized_storage_dims_w:
 *               type: string
 *             palletized_storage_dims_d:
 *               type: string
 *             palletized_storage_height:
 *               type: string
 *             palletized_storage_volume:
 *               type: string
 *             sprinkler:
 *               type: array
 *               items:
 *                   type: integer
 *         required:
 *           - area
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

router.post('/:project_id', checkRequiredField(projectIdRequired), jwt.decode, isAuthorized, ProjectHpsAreaContoller.add);

/**
 * @swagger
 * /api/hps_area/project_id/invitation:
 *   post:
 *     tags:
 *       - Project Hps Area
 *     name: Invite
 *     summary: send  Project Hps Area invite
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
 *             hps_area_id:
 *               type: number
 *             email:
 *               type: string
 *         required:
 *           - email
 *     responses:
 *       200:
 *         description: Project hps area invitation sent sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */
const inviteRequiredField = [...projectIdRequired, 'email', 'hps_area_id']
router.post('/:project_id/invitation', checkRequiredField(inviteRequiredField), jwt.decode, ProjectHpsAreaContoller.invite);

/**
 * @swagger
 * /api/hps_area/project_id:
 *   put:
 *     tags:
 *       - Project Hps Area
 *     name: Update
 *     summary: Update Project Hps Area
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
 *             warehouse_area:
 *               type: string
 *             area:
 *               type: string
 *             existing_hps_area:
 *               type: string
 *             hps_area_scope:
 *               type: string
 *             hazard_designation:
 *               type: string
 *             engineering_analysis:
 *               type: number
 *             public_occupancy:
 *               type: string
 *             detection_present:
 *               type: string
 *             access_provided:
 *               type: string
 *             travel_distance:
 *               type: number
 *             storage_hps_area:
 *               type: string
 *             mechanical_stocking:
 *               type: string
 *             hamat_present:
 *               type: string
 *             commodities:
 *               type: string
 *             storage_area:
 *               type: string
 *             total_hps_area:
 *               type: string
 *             sprinkler:
 *               type: array
 *               items:
 *                   type: integer
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

router.put('/:project_id', checkRequiredField(projectIdRequired), jwt.decode, isAuthorized, ProjectHpsAreaContoller.update);

/**
 * @swagger
 * /api/hps_area/removesprikler/project_id:
 *   delete:
 *     tags:
 *       - Project Hps Area
 *     name: Remove sprinkler
 *     summary: Remove sprinkler from Project Hps Area
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
const removeSprinklerRequiredField = [...projectIdRequired, 'id']
router.delete('/removesprikler/:project_id', checkRequiredField(removeSprinklerRequiredField), jwt.decode, isAuthorized, ProjectHpsAreaContoller.removeSprinkler);

/**
 * @swagger
 * /api/hps_area/project_id:
 *   delete:
 *     tags:
 *       - Project Hps Area
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
const deleteHspsAreaRequiredField = [...projectIdRequired, 'id']
router.delete('/:project_id', checkRequiredField(deleteHspsAreaRequiredField), jwt.decode, isAuthorized, ProjectHpsAreaContoller.deleteHspsArea);

/**
 * @swagger
 * /api/hps_area/sprinklers/hps_area_id:
 *   get:
 *     tags:
 *       - Project Hps Area
 *     name: get All sprinkelers on behalf of project hps_area
 *     summary: get All sprinkelers on behalf of project hps_area
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: hps_area_id
 *         in: params
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *         required:
 *           - hps_area_id
 *     responses:
 *       200:
 *         description: Action successful
 *       401:
 *         description: Bad Request, not found in db
 *
 */
const getAllSprinklerRequiredField = ['hps_area_id']
router.get('/sprinklers/:hps_area_id', checkRequiredField(getAllSprinklerRequiredField), jwt.decode, ProjectHpsAreaContoller.getAllSprinklersOnBehalfOfHpsArea);

module.exports = router;
