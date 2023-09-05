const router = require('express').Router();
const { getUserInfoByToken, getAgencyProjectAdminIds } = require('../common/Common');
const { isAuthorized } = require('../common/middlewares/role.validator');
const checkRequiredField = require('../common/middlewares/schema.validator');
const ProjectSubmitalContoller = require('../controllers/ProjectSubmitalController');
const jwt = require('../common/middlewares/jwt.validator');
const fileUpoload = require('../services/fileUpload.service');

const projectIdRequired = ['project_id'];
const updateOrDeleteRequiredField = [...projectIdRequired, 'id'];

/**
 * @swagger
 * /api/submital/project_id:
 *   get:
 *     tags:
 *       - Project submital
 *     name: Project submital list
 *     summary: Project submital list
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Project submital added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */

router.get('/:project_id', checkRequiredField(projectIdRequired), jwt.decode, getUserInfoByToken, getAgencyProjectAdminIds, ProjectSubmitalContoller.list);

/**
 * @swagger
 * /api/submital/project_id:
 *   post:
 *     tags:
 *       - Project submital
 *     name: Add Project submital
 *     summary:  Add Project submital
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *         - in: formData
 *           name: receipt
 *           type: file
 *         - in: formData
 *           name: fee
 *           type: string
 *         - in: formData
 *           name: paid_on
 *           type: string
 *           description: format:yyyy-mm-dd
 *     responses:
 *       200:
 *         description: add successful
 *         "schema": {
 *           "type": "object"
 *          }
 *       401:
 *         description: Bad Request, Image not upladed.
 *
 */

router.post('/:project_id', checkRequiredField(projectIdRequired), jwt.decode, isAuthorized, fileUpoload.multipleUpload('receipt'), ProjectSubmitalContoller.add);

/**
 * @swagger
 * /api/submital/project_id:
 *   put:
 *     tags:
 *       - Project submital
 *     name: Update Project submital
 *     summary:  Update Project submital
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *         - in: formData
 *           name: receipt
 *           type: file
 *         - in: formData
 *           name: fee
 *           type: string
 *         - in: formData
 *           name: id
 *           type: number
 *         - in: formData
 *           name: paid_on
 *           type: string
 *           description: format:yyyy-mm-dd
 *     responses:
 *       200:
 *         description: add successful
 *         "schema": {
 *           "type": "object"
 *          }
 *       401:
 *         description: Bad Request, Image not upladed.
 *
 */

router.put('/:project_id', jwt.decode, isAuthorized, fileUpoload.signleUpload('receipt'), ProjectSubmitalContoller.update);
/**
 * @swagger
 * /api/submital/project_id:
 *   delete:
 *     tags:
 *       - Project submital
 *     name: Delete
 *     summary: Delete Project submital
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
 *         description: Project submital deleted sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */

router.delete('/:project_id', checkRequiredField(updateOrDeleteRequiredField), jwt.decode, isAuthorized, ProjectSubmitalContoller.deleteSubmital);

module.exports = router;
