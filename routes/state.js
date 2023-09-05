const router = require('express').Router();
const StateController = require('../controllers/StateController');
/**
 * @swagger
 * /api/state:
 *   get:
 *     tags:
 *       - State
 *     name: List State
 *     summary: List State
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
router.get('/', StateController.getAll);

module.exports = router;
