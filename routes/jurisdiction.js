const router = require('express').Router();
const JurisdictionController = require('../controllers/JurisdictionController');
const jwt = require('../common/middlewares/jwt.validator');
const checkRequiredField = require('../common/middlewares/schema.validator');

/**
 * @swagger
 * /api/jurisdiction:
 *   post:
 *     tags:
 *       - Jurisdiction
 *     name: Add Jurisdiction
 *     summary: Add Jurisdiction
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
 *             state_id:
 *               type: number
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

router.post('/', jwt.decode, JurisdictionController.add);

/**
 * @swagger
 * /api/jurisdiction/id:
 *   put:
 *     tags:
 *       - Jurisdiction
 *     name: Update Jurisdiction
 *     summary: Update Jurisdiction
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

router.put('/:id', jwt.decode, JurisdictionController.update);

/**
 * @swagger
 * /api/jurisdiction:
 *   get:
 *     tags:
 *       - Jurisdiction
 *     name: List Jurisdiction
 *     summary: List Jurisdiction
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
router.get('/', jwt.decode, JurisdictionController.getAll);

/**
 * @swagger
 * /api/jurisdiction/id:
 *   delete:
 *     tags:
 *       - Jurisdiction
 *     name: Delete Jurisdiction
 *     summary: Delete Jurisdiction
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
router.delete('/:id', jwt.decode, JurisdictionController.deleteJurisdiction);

/**
 * @swagger
 * /api/jurisdiction/state:
 *   post:
 *     tags:
 *       - Jurisdiction
 *     name: Get State Jurisdiction
 *     summary: State Jurisdiction
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
 *             state_id:
 *               type: number
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

router.post('/state', jwt.decode, checkRequiredField(['state_id']), JurisdictionController.getStateJurisdiction);

module.exports = router;
