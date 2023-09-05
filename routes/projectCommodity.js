const router = require('express').Router();
const { getUserInfoByToken, getAgencyProjectAdminIds } = require('../common/Common');
const { isAuthorized } = require('../common/middlewares/role.validator');
const ProjectCommodityContoller = require('../controllers/ProjectCommodityController');
const jwt = require('../common/middlewares/jwt.validator');

/**
 * @swagger
 * /api/projectcommodity/project_id:
 *   get:
 *     tags:
 *       - Project commodity
 *     name: Project commodity list
 *     summary: Project commodity list
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Project commodity added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */

router.get('/:project_id', jwt.decode, getUserInfoByToken, getAgencyProjectAdminIds, ProjectCommodityContoller.list);

/**
 * @swagger
 * /api/projectcommodity/project_id:
 *   post:
 *     tags:
 *       - Project commodity
 *     name: Add
 *     summary: Add commodity
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
 *             max_storagge_height:
 *               type: string
 *             max_height_suffix:
 *               type: string
 *             low_class:
 *               type: string
 *             high_class:
 *               type: string
 *             final_class:
 *               type: string
 *             storage_config:
 *               type: array
 *               items:
 *                   type: string
 *             plastic_pallet_exception:
 *               type: string
 *             area_sf:
 *               type: string
 *             project_encapsulation:
 *               type: array
 *               items:
 *                   type: string
 *             code_basis:
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

router.post('/:project_id', jwt.decode, isAuthorized, ProjectCommodityContoller.add);

/**
 * @swagger
 * /api/projectcommodity/project_id:
 *   put:
 *     tags:
 *       - Project commodity
 *     name: Update
 *     summary: Update Project commodity
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

router.put('/:project_id', jwt.decode, isAuthorized, ProjectCommodityContoller.update);

/**
 * @swagger
 * /api/projectcommodity/project_id:
 *   delete:
 *     tags:
 *       - Project commodity
 *     name: Delete
 *     summary: Delete Project commodity
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

router.delete('/group/:project_id', jwt.decode, isAuthorized, ProjectCommodityContoller.deleteImportedCommodity);

/**
 * @swagger
 * /api/projectcommodity/group/project_id:
 *   delete:
 *     tags:
 *       - Project commodity
 *     name: Delete imported group commodity
 *     summary: Delete imported group commodity
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: group_id
 *         in: query
 *         schema:
 *           type: object
 *           properties:
 *             group_id:
 *               type: number
 *         required:
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

router.delete('/:project_id', jwt.decode, isAuthorized, ProjectCommodityContoller.deleteCommodity);

/**
 * @swagger
 * /api/projectcommodity/copy/project_id:
 *   post:
 *     tags:
 *       - Project commodity
 *     name: Copy comodity
 *     summary: Copy commodity to Project commodity
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
 *             commodity:
 *               type: array
 *               items:
 *                   type: integer
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

router.post('/copy/:project_id', jwt.decode, ProjectCommodityContoller.copyCommodity);

/**
 * @swagger
 * /api/projectcommodity/copypc/project_id:
 *   post:
 *     tags:
 *       - Project commodity
 *     name: Copy project commodity
 *     summary: Copy Project commodity
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
 *             commodity:
 *               type: array
 *               items:
 *                   type: integer
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

router.post('/copypc/:project_id', jwt.decode, ProjectCommodityContoller.copyProjectCommodity);

/**
 * @swagger
 * /api/projectcommodity/search/project_id:
 *   post:
 *     tags:
 *       - Project commodity
 *     name: Copy
 *     summary: search Project commodity by description
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

router.post('/search/:project_id', jwt.decode, getUserInfoByToken, getAgencyProjectAdminIds, ProjectCommodityContoller.search);

module.exports = router;
