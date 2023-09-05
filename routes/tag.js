const router = require('express').Router();
const TagController = require('../controllers/TagController');
const jwt = require('../common/middlewares/jwt.validator');

/**
 * @swagger
 * /api/tag:
 *   get:
 *     tags:
 *       - Tag
 *     name: List Tag
 *     summary: List Tag
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: keyword
 *         in: query
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       200:
 *         description: Action successful
 *       401:
 *         description: Bad Request, not found in db
 *
 */
router.get('/', jwt.decode, TagController.getAllTags);

module.exports = router;
