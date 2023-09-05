const router = require('express').Router();
const { getUserInfoByToken, getAgencyProjectAdminIds } = require('../common/Common');
const { validateRole } = require('../common/middlewares/role.validator');
const checkRequiredField = require('../common/middlewares/schema.validator');
const CommodityGroupController = require('../controllers/CommodityGroupController');
const { globalAdmin } = require('../constants');
const jwt = require('../common/middlewares/jwt.validator');

/**
 * @swagger
 * /api/commoditygroup:
 *   post:
 *     tags:
 *       - Commodity Group
 *     name: Add Commodity Group
 *     summary: Add Commodity Group
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
const commodityGroupCreateRequiredField = ['name'];
router.post('/', checkRequiredField(commodityGroupCreateRequiredField), jwt.decode, CommodityGroupController.addGroup);
/**
 * @swagger
 * /api/commoditygroup/id:
 *   put:
 *     tags:
 *       - Commodity Group
 *     name: update Commodity Group
 *     summary: update Commodity Group
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

router.put('/:id', jwt.decode, CommodityGroupController.update);

/**
 * @swagger
 * /api/commoditygroup:
 *   get:
 *     tags:
 *       - Commodity Group
 *     name: List Commodity Group
 *     summary: List Commodity Group
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
router.get('/', jwt.decode, getUserInfoByToken, getAgencyProjectAdminIds, CommodityGroupController.getAllGroups);

/**
 * @swagger
 * /api/commoditygroup/id:
 *   delete:
 *     tags:
 *       - Commodity Group
 *     name: Delete Commodity Group
 *     summary: Delete Commodity Group
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
router.delete('/:id', jwt.decode, CommodityGroupController.deleteGroup);

/**
 * @swagger
 * /api/commoditygroup/search:
 *   post:
 *     tags:
 *       - Commodity Group
 *     name: Search Commodity Group
 *     summary: Search Commodity Group by name
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
 *             search:
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

router.post('/search', jwt.decode, getUserInfoByToken, getAgencyProjectAdminIds, CommodityGroupController.search);

/**
 * @swagger
 * /api/commoditygroup/admin:
 *   get:
 *     tags:
 *       - Commodity Group
 *     name: List Commodity Group for admin
 *     summary: List Commodity Group for admin
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
router.get('/admin', jwt.decode, CommodityGroupController.getAllAdminGroups);

/**
 * @swagger
 * /api/commoditygroup/merge:
 *   post:
 *     tags:
 *       - Commodity Group
 *     name: Merege Commodity Group
 *     summary: Merge Commodity Group
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
 *             group_id:
 *               type: number
 *             merge_group_id:
 *               type: array
 *               items:
 *                   type: integer
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
const commodityGroupMergeRequiredField = ['group_id', 'merge_group_id'];
router.post('/merge', checkRequiredField(commodityGroupMergeRequiredField), jwt.decode, validateRole(globalAdmin), CommodityGroupController.merge);

module.exports = router;
