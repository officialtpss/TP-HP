const router = require('express').Router();
const { getUserInfoByToken, getAgencyProjectAdminIds } = require('../common/Common');
const { isAuthorized } = require('../common/middlewares/role.validator');
const checkRequiredField = require('../common/middlewares/schema.validator');
const ProjectSubmitalLogController = require('../controllers/ProjectSubmitaLogController');
const jwt = require('../common/middlewares/jwt.validator');

const projectIdRequired = ['project_id'];
const updateOrDeleteRequiredField = [...projectIdRequired, 'id'];

/**
 * @swagger
 * /api/submital_log/project_id:
 *   get:
 *     tags:
 *       - Project submital Log
 *     name: Project submital Log list
 *     summary: Project submital Log list
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
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

router.get('/:project_id', checkRequiredField(projectIdRequired), jwt.decode, getUserInfoByToken, getAgencyProjectAdminIds, ProjectSubmitalLogController.list);
/**
 * @swagger
 * /api/submital_log/project_id:
 *   post:
 *     tags:
 *       - Project submital Log
 *     name: Add Project submital Log
 *     summary: Add Project submital Log
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
 *             status_on:
 *               type: string
 *             submital_status:
 *               type: string
 *             submital_round:
 *               type: string
 *             message:
 *               type: string
 *         required:
 *           - status_on
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

router.post('/:project_id', checkRequiredField(projectIdRequired), jwt.decode, isAuthorized, ProjectSubmitalLogController.add);

/**
 * @swagger
 * /api/submital_log/project_id:
 *   put:
 *     tags:
 *       - Project submital Log
 *     name: Update
 *     summary: Update Project submital Log
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
 *             status_on:
 *               type: string
 *             submital_status:
 *               type: string
 *             submital_round:
 *               type: string
 *             message:
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
router.put('/:project_id', checkRequiredField(updateOrDeleteRequiredField), jwt.decode, isAuthorized, ProjectSubmitalLogController.update);
/**
 * @swagger
 * /api/submital_log/project_id:
 *   delete:
 *     tags:
 *       - Project submital Log
 *     name: Delete
 *     summary: Delete Project submital Log
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

router.delete('/:project_id', checkRequiredField(updateOrDeleteRequiredField), jwt.decode, isAuthorized, ProjectSubmitalLogController.deleteLog);

module.exports = router;
