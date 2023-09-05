const router = require('express').Router();
const checkRequiredField = require('../common/middlewares/schema.validator');
const CodeController = require('../controllers/CodeController');
const jwt = require('../common/middlewares/jwt.validator');

/**
 * @swagger
 * /api/code:
 *   post:
 *     tags:
 *       - Code
 *     name: Add Code
 *     summary: Add Code
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
 *             type:
 *               type: string
 *             year:
 *               type: string
 *             short_code:
 *               type: string
 *             full_name:
 *               type: string
 *             state_id:
 *               type: number
 *             jurisdiction_id:
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

const requiredParam = ['short_code', 'full_name']
router.post('/', checkRequiredField(requiredParam), jwt.decode, CodeController.add);

/**
 * @swagger
 * /api/code/id:
 *   put:
 *     tags:
 *       - Code
 *     name: Update Code
 *     summary: Update Code
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
 *             type:
 *               type: string
 *             year:
 *               type: string
 *             short_code:
 *               type: string
 *             full_name:
 *               type: string
 *             state_id:
 *               type: number
 *             jurisdiction_id:
 *               type: number
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

router.put('/:id', jwt.decode, CodeController.update);

/**
 * @swagger
 * /api/code:
 *   get:
 *     tags:
 *       - Code
 *     name: List Code
 *     summary: List Code
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

router.get('/', jwt.decode, CodeController.getAll);

/**
 * @swagger
 * /api/code/id:
 *   delete:
 *     tags:
 *       - Code
 *     name: Delete Code
 *     summary: Delete Code
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

router.delete('/:id', jwt.decode, CodeController.deleteCode);

module.exports = router;
