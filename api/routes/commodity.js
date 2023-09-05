const router = require('express').Router();
const { getUserInfoByToken, getAgencyProjectAdminIds } = require('../common/Common');
const CommodityContoller = require('../controllers/CommodityController');
const jwt = require('../common/middlewares/jwt.validator');
const checkRequiredField = require('../common/middlewares/schema.validator');

/**
 * @swagger
 * /api/commodity/:
 *   get:
 *     tags:
 *       - Commodity
 *     name: Commodity list
 *     summary: Commodity list
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Commodity added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */
router.get('/:id', jwt.decode, getUserInfoByToken, getAgencyProjectAdminIds, CommodityContoller.list);

/**
 * @swagger
 * /api/commodity/:
 *   post:
 *     tags:
 *       - Commodity
 *     name: Add
 *     summary: Commodity
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
 *             commodity_group_id:
 *               type: integer
 *             internal_description:
 *               type: string
 *             short_description:
 *               type: string
 *             full_description:
 *               type: string
 *             container_size:
 *               type: string
 *             nfpa_exception:
 *               type: string
 *             nfpa_fig:
 *               type: string
 *             oversize_loaded:
 *               type: string
 *             on_top_container:
 *               type: string
 *             configure_exlicit:
 *               type: string
 *             final_narrative:
 *               type: string
 *             gross_load_weight:
 *               type: string
 *             gross_load_volume:
 *               type: string
 *             net_plastic_weight:
 *               type: string
 *             net_plastic_volume:
 *               type: string
 *             expanded_plastic_content:
 *               type: string
 *             unexp_plastic:
 *               type: string
 *             exp_plastic:
 *               type: string
 *             dimenssion_narrative:
 *               type: string
 *             width_ft:
 *               type: string
 *             depth_ft:
 *               type: string
 *             include_load_narrative:
 *               type: string
 *             plastic_percentage_narrative:
 *               type: string
 *             area_sf:
 *               type: string
 *             commodity_class:
 *               type: array
 *               items:
 *                   type: string
 *             project_encapsulation:
 *               type: array
 *               items:
 *                   type: string
 *             pallet_type:
 *               type: array
 *               items:
 *                   type: string
 *             plastic_pallet_case:
 *               type: array
 *               items:
 *                   type: string
 *             container_type:
 *               type: array
 *               items:
 *                   type: string
 *             shelving_type:
 *               type: array
 *               items:
 *                   type: string
 *             commodity_group:
 *               type: array
 *               items:
 *                   type: integer
 *             max_storagge_height:
 *               type: string
 *             max_height_suffix:
 *               type: string
 *             low_class:
 *               type: string
 *             high_class:
 *               type: string
 *             freeze_output:
 *               type: string
 *             final_class:
 *               type: string
 *             storage_config:
 *               type: array
 *               items:
 *                   type: string
 *             code_basis:
 *               type: array
 *               items:
 *                   type: string
 *         required:
 *           - internal_description
 *           - short_description
 *           - full_description
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

router.post('/', jwt.decode, CommodityContoller.add);

/**
 * @swagger
 * /api/commodity/:
 *   put:
 *     tags:
 *       - Commodity
 *     name: Update
 *     summary: Update Commodity
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
 *               type: integer
 *             internal_description:
 *               type: string
 *             short_description:
 *               type: string
 *             full_description:
 *               type: string
 *             container_size:
 *               type: string
 *             nfpa_exception:
 *               type: string
 *             nfpa_fig:
 *               type: string
 *             include_load_narrative:
 *               type: string
 *             plastic_percentage_narrative:
 *               type: string
 *             oversize_loaded:
 *               type: string
 *             on_top_container:
 *               type: string
 *             configure_exlicit:
 *               type: string
 *             final_narrative:
 *               type: string
 *             gross_load_weight:
 *               type: string
 *             gross_load_volume:
 *               type: string
 *             net_plastic_weight:
 *               type: string
 *             net_plastic_volume:
 *               type: string
 *             expanded_plastic_content:
 *               type: string
 *             unexp_plastic:
 *               type: string
 *             exp_plastic:
 *               type: string
 *             dimenssion_narrative:
 *               type: string
 *             width_ft:
 *               type: string
 *             depth_ft:
 *               type: string
 *             area_sf:
 *               type: string
 *             commodity_class:
 *               type: array
 *               items:
 *                   type: string
 *             project_encapsulation:
 *               type: array
 *               items:
 *                   type: string
 *             pallet_type:
 *               type: array
 *               items:
 *                   type: string
 *             plastic_pallet_case:
 *               type: array
 *               items:
 *                   type: string
 *             container_type:
 *               type: array
 *               items:
 *                   type: string
 *             shelving_type:
 *               type: array
 *               items:
 *                   type: string
 *             commodity_group:
 *               type: array
 *               items:
 *                   type: integer
 *             max_storagge_height:
 *               type: string
 *             max_height_suffix:
 *               type: string
 *             low_class:
 *               type: string
 *             high_class:
 *               type: string
 *             freeze_output:
 *               type: string
 *             final_class:
 *               type: string
 *             storage_config:
 *               type: array
 *               items:
 *                   type: string
 *             code_basis:
 *               type: array
 *               items:
 *                   type: string
 *         required:
 *           - id
 *           - internal_description
 *           - short_description
 *           - full_description
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

router.put('/:id', jwt.decode, CommodityContoller.update);

/**
 * @swagger
 * /api/commodity/id:
 *   delete:
 *     tags:
 *       - Commodity
 *     name: Delete
 *     summary: Delete Commodity
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

router.delete('/:id', jwt.decode, CommodityContoller.deleteCommodity);

/**
 * @swagger
 * /api/commodity/copy/:
 *   post:
 *     tags:
 *       - Commodity
 *     name: copy commodity
 *     summary: copy commodity from project commidity
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
 *             project_id:
 *               type: string
 *             group_id:
 *               type: string
 *             commodity:
 *               type: array
 *               items:
 *                   type: integer
 *         required:
 *           - commodity
 *           - project_id
 *           - group_id
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
const copyProjectCommodityRequiredField = ['commodity', 'group_id', 'project_id'];
router.post('/copy', [checkRequiredField(copyProjectCommodityRequiredField), jwt.decode], CommodityContoller.copyProjectCommodity);


/**
 * @swagger
 * /api/commodity/import/{commodity_group_id}/{project_id}:
 *   get:
 *     tags:
 *       - Commodity
 *     name: Import commodity list on the behalf of commdity group and project.
 *     summary: Import commodity list on the behalf of commdity group and project 
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: commodity_group_id
 *         in: path
 *         required:
 *           - commodity_group_id
 *       - name: project_id
 *         in: path
 *         required:
 *           - project_id
 *     responses:
 *       200:
 *         description: All Commodities retrieved successfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */
const getCommoditiesByGroupAndProject = ['commodity_group_id', 'project_id'];
router.get('/import/:commodity_group_id/:project_id', [checkRequiredField(getCommoditiesByGroupAndProject), jwt.decode], CommodityContoller.getCommoditiesByGroupAndProject);

module.exports = router;
