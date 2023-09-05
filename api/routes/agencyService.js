const router = require('express').Router();
const AgencyServiceController = require('../controllers/AgencyServiceController');
const jwt = require('../common/middlewares/jwt.validator');
const checkRequiredField = require('../common/middlewares/schema.validator');
const { validateRole } = require('../common/middlewares/role.validator');
const { projectAdmin } = require('../constants');

/**
 * @swagger
 * /api/agencyservice:
 *   post:
 *     tags:
 *       - Agency Service
 *     name: Add agency Service
 *     summary: Add agency Service
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
 *             name:
 *               type: string
 *         required:
 *           - type
 *     responses:
 *       200:
 *         description: Request completed sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */
const requiredParam = ['name']
router.post('/', [jwt.decode, validateRole(projectAdmin), checkRequiredField(requiredParam)], AgencyServiceController.createAgency);

/**
 * @swagger
 * /api/agencyservice/id:
 *   put:
 *     tags:
 *       - Agency Service
 *     name: update Agency Service
 *     summary: update Agency Service
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
 *             name:
 *               type: string
 *         required:
 *           - type
 *     responses:
 *       200:
 *         description: Request completed sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */

router.put('/:id', [jwt.decode, validateRole(projectAdmin)], AgencyServiceController.updateAgency);

/**
 * @swagger
 * /api/agencyservice/id:
 *   delete:
 *     tags:
 *       - Agency Service
 *     name: Delete Agency Service
 *     summary: Delete Agency Service
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Action successfull
 *       401:
 *         description: Bad Request, not found in db
 *
 */

router.delete('/:id', [jwt.decode, validateRole(projectAdmin)], AgencyServiceController.deleteAgency);

/**
 * @swagger
 * /api/agencyservice:
 *   get:
 *     tags:
 *       - Agency Service
 *     name: List Agency Service
 *     summary: List Agency Service
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

router.get('/', [jwt.decode, validateRole(projectAdmin)], AgencyServiceController.getAllAgency);

module.exports = router;
