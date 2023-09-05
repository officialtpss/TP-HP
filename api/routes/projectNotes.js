const router = require('express').Router();
const { getUserInfoByToken, getAgencyProjectAdminIds } = require('../common/Common');
const { isAuthorized } = require('../common/middlewares/role.validator');
const checkRequiredField = require('../common/middlewares/schema.validator');
const ProjectNotesContoller = require('../controllers/ProjectNotesController');
const jwt = require('../common/middlewares/jwt.validator');
/**
 * @swagger
 * /api/notes/project_id:
 *   get:
 *     tags:
 *       - Project notes
 *     name: Project notes list
 *     summary: Project notes list
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

router.get('/:project_id', jwt.decode, getUserInfoByToken, getAgencyProjectAdminIds, ProjectNotesContoller.list);

/**
 * @swagger
 * /api/notes/project_id:
 *   post:
 *     tags:
 *       - Project notes
 *     name: Add
 *     summary: Add Notes
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
 *             date:
 *               type: string
 *             message:
 *               type: string
 *             north_wall:
 *         required:
 *           - date
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
const createNotesRequiredFields = ['project_id', 'message'];
router.post('/:project_id', checkRequiredField(createNotesRequiredFields), jwt.decode, isAuthorized, ProjectNotesContoller.add);

/**
 * @swagger
 * /api/notes/project_id:
 *   put:
 *     tags:
 *       - Project notes
 *     name: Update
 *     summary: Update Project Notes
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
 *             date:
 *               type: string
 *             message:
 *               type: string
 *             north_wall:
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
const updateOrDeleteNotesRequiredFields = ['project_id', 'id'];
router.put('/:project_id', checkRequiredField(updateOrDeleteNotesRequiredFields), jwt.decode, isAuthorized, ProjectNotesContoller.update);

/**
 * @swagger
 * /api/notes/project_id:
 *   delete:
 *     tags:
 *       - Project notes
 *     name: Delete
 *     summary: Delete Project notes
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
router.delete('/:project_id', checkRequiredField(updateOrDeleteNotesRequiredFields), jwt.decode, isAuthorized, ProjectNotesContoller.deleteNotes);

module.exports = router;
