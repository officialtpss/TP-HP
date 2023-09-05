const router = require('express').Router();
const { getUserInfoByToken, getAgencyProjectAdminIds } = require('../common/Common');
const { isAuthorized, isProjectAdmin } = require('../common/middlewares/role.validator');
const checkRequiredField = require('../common/middlewares/schema.validator');
const ProjectStorageConfigController = require('../controllers/ProjectStorageConfigController');
const jwt = require('../common/middlewares/jwt.validator');

const projectIdRequired = ['project_id'];
const updateOrDeleteRequiredField = [...projectIdRequired, 'id'];


/**
 * @swagger
 * /api/storage_config/{project_id}:
 *   get:
 *     tags:
 *       - Project storage config
 *     name: Project storage config list
 *     summary: Project storage config list
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: project_id
 *         in: path
 *         description: ID of the project
 *         required: true
 *         schema:
 *           type: string
 *       - name: storage_type
 *         in: query
 *         description: Type of storage
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project storage config retrieved successfully!
 *       401:
 *         description: Bad Request, not found in the database
 *       500:
 *         description: Server error
 *       403:
 *         description: Not authorized to perform this action
 */


router.get('/:project_id', [jwt.decode, getUserInfoByToken, getAgencyProjectAdminIds], ProjectStorageConfigController.list);
/**
 * @swagger
 * /api/storage_config/project_id:
 *   post:
 *     tags:
 *       - Project storage config
 *     name: Add
 *     summary: Add project storage config
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
 *             label:
 *               type: string
 *             allowable_storage_height:
 *               type: string
 *             proposed_storage_height:
 *               type: string
 *             configure_storage_rack:
 *               type: string
 *             storage_depth:
 *               type: array
 *               items:
 *                   type: string
 *             allowable_options:
 *               type: array
 *               items:
 *                   type: string
 *         required:
 *           - label
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

router.post('/:project_id', jwt.decode, isAuthorized, ProjectStorageConfigController.add);

/**
 * @swagger
 * /api/storage_config/project_id:
 *   put:
 *     tags:
 *       - Project storage config
 *     name: Update
 *     summary: Update Project storage config
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
 *             label:
 *               type: string
 *             allowable_storage_height:
 *               type: string
 *             proposed_storage_height:
 *               type: string
 *             configure_storage_rack:
 *               type: string
 *             storage_depth:
 *               type: array
 *               items:
 *                   type: string
 *             allowable_options:
 *               type: array
 *               items:
 *                   type: string
 *             fuel_space_less_25:
 *               type: array
 *               items:
 *                   type: string
 *             fuel_space_greater_25:
 *               type: array
 *               items:
 *                   type: string
 *             fmds_fuel_space:
 *               type: array
 *               items:
 *                   type: string
 *             fuel_space_enforcement:
 *               type: array
 *               items:
 *                   type: string
 *             load_limitation:
 *               type: array
 *               items:
 *                   type: string
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

router.put('/:project_id', checkRequiredField(updateOrDeleteRequiredField), jwt.decode, isAuthorized, ProjectStorageConfigController.update);
/**
 * @swagger
 * /api/storage_config/project_id:
 *   delete:
 *     tags:
 *       - Project storage config
 *     name: Delete
 *     summary: Delete Project storage config
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
 *         description: Project storage config  deleted sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */

router.delete('/:project_id', checkRequiredField(updateOrDeleteRequiredField), jwt.decode, isAuthorized, ProjectStorageConfigController.deleteStorageConfig);

/**
 * @swagger
 * /api/storage_config/addcommodity/project_id:
 *   post:
 *     tags:
 *       - Project storage config
 *     name: Add commodity to storage config
 *     summary: Add commodity to storage config
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
 *             commodity:
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

router.post('/addcommodity/:project_id', checkRequiredField(updateOrDeleteRequiredField), jwt.decode, isAuthorized, ProjectStorageConfigController.addCommodity);

/**
 * @swagger
 * /api/storage_config/copy/options/project_id:
 *   get:
 *     tags:
 *       - Project storage config
 *     name: copy storage config list options
 *     summary: copy storage config from another project storage config lists
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: project_id
 *         in: params
 *         required:
 *           - project_id
 *       - name: type
 *         in: query
 *         required:
 *           - type
 *     responses:
 *       200:
 *         description: Storage config list with same type retieved successfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */
const storageConfigOptionsRequiredFields = [...projectIdRequired, 'type'];
router.get('/copy/options/:project_id', checkRequiredField(storageConfigOptionsRequiredFields), jwt.decode, ProjectStorageConfigController.storageConfigOptions);

/**
 * @swagger
 * /api/storage_config/copy/project_id:
 *   post:
 *     tags:
 *       - Project storage config
 *     name: copy storage config
 *     summary: copy storage config from another project
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: project_id
 *         in: params
 *         required:
 *           - project_id
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             storage_config_ids:
 *               type: array
 *               items:
 *                   type: integer
 *             type:
 *               type: string
 *         required:
 *           - storage_config_ids
 *           - string
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
const copyStorageConfigRequiredFields = [...projectIdRequired, 'storage_config_ids', 'type'];
router.post('/copy/:project_id', checkRequiredField(copyStorageConfigRequiredFields), jwt.decode, isProjectAdmin, ProjectStorageConfigController.copyStorageConfig);

module.exports = router;