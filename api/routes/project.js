const router = require('express').Router();
const { getUserInfoByToken, getAgencyProjectAdminIds } = require('../common/Common');
const { isProjectAdmin, isAuthorized } = require('../common/middlewares/role.validator');
const checkRequiredParameter = require('../common/middlewares/schema.validator');
const ProjectContoller = require('../controllers/ProjectController');
const ProjectExportController = require('../controllers/ProjectExportController');
const jwt = require('../common/middlewares/jwt.validator');
const checkRequiredField = require('../common/middlewares/schema.validator');
const ProjectFilterController = require('../controllers/ProjectFilterController');

const projectIdRequired = ['project_id']

/**
 * @swagger
 * /api/project:
 *   post:
 *     tags:
 *       - Project
 *     name: Add
 *     summary: Add Project
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
 *             designation:
 *               type: string
 *             address:
 *               type: string
 *             suite:
 *               type: string
 *             city:
 *               type: string
 *             state_id:
 *               type: number
 *             zip_code:
 *               type: string
 *             agency_project_number:
 *               type: string
 *             construction_type:
 *               type: string
 *             jurisdiction_id:
 *               type: number
 *         required:
 *           - name
 *           - designation
 *           - address
 *           - suite
 *           - city
 *           - state_id
 *           - zip_code
 *           - jurisdiction_id
 *     responses:
 *       200:
 *         description: Project added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */

router.post('/', jwt.decode, isProjectAdmin, ProjectContoller.add);

/**
 * @swagger
 * /api/project/copy:
 *   post:
 *     tags:
 *       - Project
 *     name: copy
 *     summary: copy Project
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
 *             poroject_id:
 *               type: number
 *         required:
 *           - poroject_id
 *     responses:
 *       200:
 *         description: Project added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */

router.post('/copy', jwt.decode, isProjectAdmin, ProjectContoller.copy);

/**
 * @swagger
 * /api/project:
 *   get:
 *     tags:
 *       - Project
 *     name: List Projects
 *     summary: List All Projects
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

router.get('/', jwt.decode, ProjectContoller.getAll);

/**
 * @swagger
 * /api/project/archive:
 *   get:
 *     tags:
 *       - Project
 *     name: List Archive Projects
 *     summary: List All Archive Projects
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

router.get('/archive', jwt.decode, ProjectContoller.getAllArchive);

/**
 * @swagger
 * /api/project/all:
 *   get:
 *     tags:
 *       - Project
 *     name: List all agency Projects
 *     summary: List all agency Projects
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

router.get('/all', jwt.decode, getUserInfoByToken, getAgencyProjectAdminIds, ProjectContoller.getAllAGency);

/**
 * @swagger
 * /api/project/id:
 *   get:
 *     tags:
 *       - Project
 *     name: Project Detail
 *     summary: Project Detail
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

router.get('/:id', jwt.decode, getUserInfoByToken, getAgencyProjectAdminIds, ProjectContoller.getDetail);

/**
 * @swagger
 * /api/project/id:
 *   put:
 *     tags:
 *       - Project
 *     name: Upate
 *     summary: update project
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
 *             address:
 *               type: string
 *             suite:
 *               type: string
 *             city:
 *               type: number
 *             state_id:
 *               type: string
 *             zip_code:
 *               type: string
 *             agency_project_number:
 *               type: string
 *             jurisdiction_id:
 *               type: string
 *             building:
 *               type: string
 *             scope_output:
 *               type: string
 *             code:
 *               type: array
 *               items:
 *                   type: object
 *                   properties:
 *                       code_id:
 *                         type: number
 *                       selected_year:
 *                         type: number
 *             occupancy:
 *               type: array
 *               items:
 *                   type: string
 *             service:
 *               type: array
 *               items:
 *                   type: string
 *             work:
 *               type: array
 *               items:
 *                   type: string
 *             building_modification:
 *               type: array
 *               items:
 *                   type: string
 *             scope_description:
 *               type: array
 *               items:
 *                   type: object
 *                   properties:
 *                     name:
 *                         type: string
 *                     new:
 *                         type: string
 *                     existing:
 *                         type: string
 *         required:
 *           - name
 *           - address
 *           - suite
 *           - city
 *           - state_id
 *           - zip_code
 *           - jurisdiction_id
 *     responses:
 *       200:
 *         description: Project updated sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */

router.put('/:id', jwt.decode, isAuthorized, ProjectContoller.update);

/**
 * @swagger
 * /api/project/id:
 *   delete:
 *     tags:
 *       - Project
 *     name: Delete
 *     summary: Delete Project
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: status
 *         in: query
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *     responses:
 *       200:
 *         description: Project updated sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */

router.delete('/:id', jwt.decode, isAuthorized, ProjectContoller.deleteProject);

/**
 * @swagger
 * /api/project/sprinkler:
 *   post:
 *     tags:
 *       - Project Sprinkler
 *     name: Add Sprinkler
 *     summary: Add Project Sprinkler
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
 *             area:
 *               type: string
 *             low_ceiling:
 *               type: string
 *             high_ceiling:
 *               type: string
 *             design_type:
 *               type: string
 *             k_factor:
 *               type: string
 *             head_temperature:
 *               type: number
 *             design_area:
 *               type: string
 *             head_orientation:
 *               type: string
 *             system:
 *               type: number
 *             ambient_temperature:
 *               type: string
 *             heads:
 *               type: string
 *             project_id:
 *               type: number
 *             operating_pressure:
 *               type: string
 *             smoke:
 *               type: string
 *             catwalk:
 *               type: string
 *             proposed_sprinkler:
 *               type: object
 *               properties:
 *                 recalc:
 *                  type: string
 *         required:
 *           - area
 *     responses:
 *       200:
 *         description: Project added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */

router.post('/sprinkler', jwt.decode, checkRequiredField(projectIdRequired), isAuthorized, ProjectContoller.addSprinkler);

/**
 * @swagger
 * /api/project/updatesprinkler:
 *   post:
 *     tags:
 *       - Project Sprinkler
 *     name: Update Sprinkler
 *     summary: Update Project Sprinkler
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
 *               type: number
 *             area:
 *               type: string
 *             low_ceiling:
 *               type: string
 *             high_ceiling:
 *               type: string
 *             design_type:
 *               type: string
 *             k_factor:
 *               type: string
 *             head_temperature:
 *               type: number
 *             design_area:
 *               type: string
 *             head_orientation:
 *               type: string
 *             system:
 *               type: number
 *             ambient_temperature:
 *               type: string
 *             heads:
 *               type: string
 *             project_id:
 *               type: number
 *             operating_pressure:
 *               type: string
 *             smoke:
 *               type: string
 *             catwalk:
 *               type: string
 *             proposed_sprinkler:
 *               type: object
 *               properties:
 *                 recalc:
 *                  type: string
 *         required:
 *           - area
 *     responses:
 *       200:
 *         description: Project added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */
const updateSprinklerReuiredFiled = ['area', 'project_id', 'id'];
router.post('/updatesprinkler/', jwt.decode, checkRequiredField(updateSprinklerReuiredFiled), isAuthorized, ProjectContoller.updateSprinkler);

/**
 * @swagger
 * /api/project/deletesprinkler:
 *   post:
 *     tags:
 *       - Project Sprinkler
 *     name: Delete Sprinkler
 *     summary: Delte Project Sprinkler
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
 *               type: number
 *             project_id:
 *               type: number
 *             type:
 *               type: string
 *               value: 'prposed'
 *         required:
 *           - area
 *     responses:
 *       200:
 *         description: Project added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */

router.post('/deletesprinkler/', jwt.decode, checkRequiredField(projectIdRequired), isAuthorized, ProjectContoller.deleteSprinkler);

/**
 * @swagger
 * /api/project/teamdocs:
 *   post:
 *     tags:
 *       - Project teamdocs
 *     name: Add teamdocs
 *     summary: Add Project teamdocs
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
 *             contact_update:
 *               type: string
 *               enum: ['yes', 'no']
 *             company_id:
 *               type: integer
 *             contact_id:
 *               type: array
 *               items:
 *                   type: integer
 *         required:
 *           - area
 *     responses:
 *       200:
 *         description: Project added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */
const reuireFiled = ['project_id', 'contact_id'];
router.post('/teamdocs', checkRequiredParameter(reuireFiled), jwt.decode, isAuthorized, ProjectContoller.addTeamDocs);

/**
 * @swagger
 * /api/project/search:
 *   post:
 *     tags:
 *       - Project
 *     name: Search Project
 *     summary: Search Project by name
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

router.post('/search', jwt.decode, getUserInfoByToken, getAgencyProjectAdminIds, ProjectContoller.search);

/**
 * @swagger
 * /api/project/contact:
 *   post:
 *     tags:
 *       - Project
 *     name: Delete Project contact
 *     summary: Delete Project contact
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
 *             contact_id:
 *               type: number
 *             project_id:
 *               type: array
 *               items:
 *                   type: integer
 *         required:
 *           - area
 *     responses:
 *       200:
 *         description: Project added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action

 *
 */
const deleteProjectContactRequiredFields = ['contact_id', 'project_id']
router.post('/contact/', checkRequiredField(deleteProjectContactRequiredFields), jwt.decode, ProjectContoller.deleteProjectContact);
/**
 * @swagger
 * /api/project/jurisdiction:
 *   post:
 *     tags:
 *       - Project
 *     name: Delete Project jurisdiction
 *     summary: Delete Project jurisdiction
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
 *             jurisdiction_id:
 *               type: number
 *             project_id:
 *               type: array
 *               items:
 *                   type: integer
 *         required:
 *           - area
 *     responses:
 *       200:
 *         description: Project added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action

 *
 */
const deleteProjectJurisdictionRequiredFields = ['jurisdiction_id', 'project_id']
router.post('/jurisdiction/', checkRequiredField(deleteProjectJurisdictionRequiredFields), jwt.decode, ProjectContoller.deleteProjectJurisdiction);
/**
 * @swagger
 * /api/project/city:
 *   post:
 *     tags:
 *       - Project
 *     name: Delete Project city
 *     summary: Delete Project city
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
 *             city_id:
 *               type: number
 *             project_id:
 *               type: array
 *               items:
 *                   type: integer
 *         required:
 *           - area
 *     responses:
 *       200:
 *         description: Project added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action

 *
 */
const deleteProjectCityRequiredFields = ['city_id', 'project_id']
router.post('/city/', checkRequiredField(deleteProjectCityRequiredFields), jwt.decode, ProjectContoller.deleteProjectCity);

/**
 * @swagger
 * /api/project/company:
 *   post:
 *     tags:
 *       - Project
 *     name: Disassociate company from project
 *     summary: Disassociate company from project
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
 *             company_id:
 *               type: number
 *             project_id:
 *               type: array
 *               items:
 *                   type: integer
 *         required:
 *           - area
 *     responses:
 *       200:
 *         description: Project added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action

 *
 */
const deleteProjectCompanyRequiredFields = ['company_id', 'project_id']
router.post('/company/', checkRequiredField(deleteProjectCompanyRequiredFields), jwt.decode, ProjectContoller.deleteProjectCompany);
/**
 * @swagger
 * /api/project/agency_service:
 *   post:
 *     tags:
 *       - Project
 *     name: Disassociate agency service from project
 *     summary: Disassociate agency service from project
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
 *             agency_service_id:
 *               type: number
 *             project_id:
 *               type: array
 *               items:
 *                   type: integer
 *         required:
 *           - agency_service_id
 *           - project_id
 *     responses:
 *       200:
 *         description: Project added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action

 *
 */
const deleteProjectScopeServiceRequiredFields = ['agency_service_id', 'project_id']
router.post('/agency_service/', checkRequiredField(deleteProjectScopeServiceRequiredFields), jwt.decode, ProjectContoller.deleteProjectScopeService);

/**
 * @swagger
 * /api/project/export/project_id:
 *   get:
 *     tags:
 *       - Project
 *     name: Export Project
 *     summary: Export Project
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
router.get('/export/:project_id', jwt.decode, ProjectContoller.exportProject);

/**
 * @swagger
 * /api/project/exports/project_id:
 *   get:
 *     tags:
 *       - Project
 *     name: Export Project
 *     summary: Export Project
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
router.get('/exports/:project_id', jwt.decode, ProjectExportController.masterJSONExportSchema);
/**
 * @swagger
 * /api/project/filter:
 *   post:
 *     tags:
 *       - Project
 *     name: Filter project
 *     summary: Filter project
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
 *             city:
 *               type: number
 *             state:
 *               type: number
 *             jurisdiction:
 *               type: number
 *             start_date:
 *               type: string
 *             end_date:
 *               type: string
 *             sprinkler:
 *               type: object
 *               properties:
 *                 design_type:
 *                   type: string
 *                 k_factor:
 *                   type: string
 *                 design_area:
 *                   type: string
 *                 head_temperature:
 *                   type: string
 *                 operating_pressure:
 *                   type: string
 *                 head_orientation:
 *                   type: string
 *                 low_ceiling:
 *                   type: string
 *                 high_ceiling:
 *                   type: string
 *             hpsarea:
 *               type: object
 *               properties:
 *                 hazard_designation:
 *                   type: string
 *                 storage_area:
 *                   type: boolean
 *             storage_config:
 *               type: object
 *               properties:
 *                 height_min:
 *                   type: string
 *                 height_max:
 *                   type: string
 *                 depth_min:
 *                   type: string
 *                 depth_max:
 *                   type: string
 *                 storage_config:
 *                   type: array
 *                   items:
 *                     type: string
 *             commodity:
 *               type: object
 *               properties:
 *                 group_id:
 *                   type: number
 *                 commodity_class:
 *                   type: array
 *                   items:
 *                     type: string
 *     responses:
 *       200:
 *         description: Project added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */

router.post('/filter', jwt.decode, getUserInfoByToken, getAgencyProjectAdminIds, ProjectFilterController.filterProject);

/**
 * @swagger
 * /api/project/copy-commodities-and-storageConfigs:
 *   post:
 *     tags:
 *       - Project
 *     name: copy commodities and storage configurations
 *     summary: Copy commodities and storage configurations only
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
 *               type: number
 *         required:
 *           - project_id
 *     responses:
 *       200:
 *         description: Project added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */

router.post('/copy-commodities-and-storageConfigs', jwt.decode, ProjectContoller.copyCommoditiesAndStorageConfig);

/**
 * @swagger
 * /api/project/export-hps-app/{projectId}:
 *   get:
 *     tags:
 *       - Project
 *     name: Download hps-app information through pdf.
 *     summary: Download hps-app information through pdf
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required:
 *           - projectId
 *     responses:
 *       200:
 *         description: PDF retrieved sucess!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */

router.get('/export-hps-app/:projectId',[jwt.decode, getUserInfoByToken,getAgencyProjectAdminIds], ProjectExportController.exportHpsApp);


router.get('/export-commodity-letter/:projectId',[jwt.decode, getUserInfoByToken,getAgencyProjectAdminIds], ProjectExportController.exportCommodityLetter)

module.exports = router;