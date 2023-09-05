const router = require('express').Router();
const CommodityClassController = require('../controllers/CommodityClassController');
const jwt = require('../common/middlewares/jwt.validator');

/**
 * @swagger
 * /api/commodityclass:
 *   get:
 *     tags:
 *       - Commodity class
 *     name: List Commodity class
 *     summary: List Commodity class
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
router.get('/', [jwt.decode], CommodityClassController.getAllCommodityClass);

module.exports = router;
