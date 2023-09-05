const router = require('express').Router();
const CompanyTypeContoller = require('../controllers/CompanyTypeController');
const jwt = require('../common/middlewares/jwt.validator');
const checkRequiredField = require('../common/middlewares/schema.validator');

/**
 * @swagger
 * /api/companytype:
 *   post:
 *     tags:
 *       - Company Type
 *     name: Add type
 *     summary: Add company type
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
 *         required:
 *           - type
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

router.post('/', jwt.decode, CompanyTypeContoller.add);

/**
* @swagger
* /api/companytype/id:
*   put:
*     tags:
*       - Company Type
*     name: Update type
*     summary: update company type
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
*         required:
*           - type
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

router.put('/:id', jwt.decode, CompanyTypeContoller.update);

/**
* @swagger
* /api/companytype/admin:
*   get:
*     tags:
*       - Company Type
*     name: List Company types by specific admin
*     summary: List All Company types specific admin
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

router.get('/admin', jwt.decode, CompanyTypeContoller.getAllCreatedByGlobalAdmin);

/**
* @swagger
* /api/companytype:
*   get:
*     tags:
*       - Company Type
*     name: List Company types
*     summary: List All Company types
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

router.get('/', jwt.decode, CompanyTypeContoller.getAllList);
/**
* @swagger
* /api/companytype/id:
*   delete:
*     tags:
*       - Company Type
*     name: Delete
*     summary: Delete company type
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: Company Type deleted sucessfully!
*       401:
*         description: Bad Request, not found in db
*       500:
*         description: Server error
*       403:
*         description: not authorize to do this action
*
*/

router.delete('/:id', jwt.decode, CompanyTypeContoller.deleteType);

/**
 * @swagger
 * /api/companytype/company:
 *   post:
 *     tags:
 *       - Company Type
 *     name: Disassociate company from company type
 *     summary: Disassociate company from company type
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
 *             company_type_id:
 *               type: number
 *             company_id:
 *               type: array
 *               items:
 *                   type: integer
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
const dissociateCompanyRequiredFields = ['company_type_id', 'company_id'];
router.post('/company', jwt.decode, checkRequiredField(dissociateCompanyRequiredFields), CompanyTypeContoller.dissociateCompany);

module.exports = router;
