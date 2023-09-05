const router = require('express').Router();
const { getUserInfoByToken } = require('../common/Common');
const CompanyContoller = require('../controllers/CompanyController');
const jwt = require('../common/middlewares/jwt.validator');
const { validateRole } = require('../common/middlewares/role.validator');
const checkRequiredField = require('../common/middlewares/schema.validator');
const { projectAdmin, agencyAdmin } = require('../constants');

/**
 * @swagger
 * /api/company:
 *   post:
 *     tags:
 *       - Company
 *     name: Add
 *     summary: Add company
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
 *             company_name:
 *               type: string
 *             address:
 *               type: string
 *             suite:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             zip_code:
 *               type: string
 *             main_phone:
 *               type:
 *             company_type_id:
 *               type: number
 *             contact:
 *               type: array
 *               items:
 *                   type: integer
 *             company_type:
 *               type: array
 *               items:
 *                   type: integer
 *         required:
 *           - compan_name
 *           - address
 *           - suite
 *           - city
 *           - state
 *           - zip_code
 *           - main_phone
 *           - company_type_id
 *     responses:
 *       200:
 *         description: Company added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action

 *
 */
const createCompanyRequiredField = ['company_name'];
router.post('/', checkRequiredField(createCompanyRequiredField), jwt.decode, getUserInfoByToken, CompanyContoller.addCompany);

/**
 * @swagger
 * /api/company:
 *   get:
 *     tags:
 *       - Company
 *     name: List Companies
 *     summary: List All Companies
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
router.get('/', jwt.decode, CompanyContoller.getAll);

/**
 * @swagger
 * /api/company/id:
 *   get:
 *     tags:
 *       - Company
 *     name: Company Detail
 *     summary: Company Detail
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
router.get('/:id', jwt.decode, validateRole(projectAdmin, agencyAdmin), CompanyContoller.getDetail);
/**
 * @swagger
 * /api/company/id:
 *   put:
 *     tags:
 *       - Company
 *     name: Upate
 *     summary: update company
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
 *             company_name:
 *               type: string
 *             address:
 *               type: string
 *             suite:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             zip_code:
 *               type: string
 *             main_phone:
 *               type: string
 *             company_type:
 *               type: array
 *               items:
 *                   type: integer
 *         required:
 *           - compan_name
 *           - address
 *           - suite
 *           - city
 *           - state
 *           - zip_code
 *           - main_phone
 *     responses:
 *       200:
 *         description: Company updated sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action

 *
 */
router.put('/:id', jwt.decode, validateRole(projectAdmin), CompanyContoller.update);

/**
 * @swagger
 * /api/company/id:
 *   delete:
 *     tags:
 *       - Company
 *     name: Delete
 *     summary: Delete company
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Company updated sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */
router.delete('/:id', jwt.decode, validateRole(projectAdmin), CompanyContoller.deleteCompany);

/**
 * @swagger
 * /api/company/auth/options:
 *   get:
 *     tags:
 *       - Company
 *     name: Company list options
 *     summary: Company list options
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
router.get('/auth/options', jwt.decode, validateRole(projectAdmin), CompanyContoller.authorizedCompanyList);

/**
 * @swagger
 * /api/company//project_contact/:company_id?project_id="":
 *   get:
 *     tags:
 *       - Company
 *     name: Contact list associated with company and project
 *     summary: Contact list associated with company and project simultaneously
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
router.get('/project_contact/:company_id', jwt.decode, validateRole(projectAdmin), CompanyContoller.getAllContactsOnBehalfOfCompanyAndAssociatedProject);

module.exports = router;
