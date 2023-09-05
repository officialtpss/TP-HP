const router = require('express').Router();
const { getUserInfoByToken, isProjectAdmin } = require('../common/Common');
const { isProjectOrAgencyAdmin } = require('../common/middlewares/role.validator');
const ContactContoller = require('../controllers/ContactController');
const jwt = require('../common/middlewares/jwt.validator');

/**
 * @swagger
 * /api/contact:
 *   post:
 *     tags:
 *       - Contact
 *     name: Add
 *     summary: Add contact
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
 *             contact_name:
 *               type: string
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *             company:
 *               type: array
 *               items:
 *                   type: integer
 *             contact_type:
 *               type: array
 *               items:
 *                   type: integer
 *         required:
 *           - contact_name
 *           - email
 *           - phone
 *     responses:
 *       200:
 *         description: Contact added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action

 *
 */

router.post('/', jwt.decode, getUserInfoByToken, ContactContoller.addContact);

/**
 * @swagger
 * /api/contact:
 *   get:
 *     tags:
 *       - Contact
 *     name: List Contacts
 *     summary: List All Contacts
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
router.get('/', jwt.decode, isProjectOrAgencyAdmin, ContactContoller.getAll);

/**
 * @swagger
 * /api/contact/projectcontact:
 *   get:
 *     tags:
 *       - Contact
 *     name: List project Contacts
 *     summary: List All project Contacts
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
router.get('/projectcontact', jwt.decode, isProjectOrAgencyAdmin, ContactContoller.getAllProjectContact);

/**
 * @swagger
 * /api/contact/id:
 *   get:
 *     tags:
 *       - Contact
 *     name: Contact Detail
 *     summary: Contact Detail
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
router.get('/:id', jwt.decode, isProjectAdmin, ContactContoller.getDetail);
/**
 * @swagger
 * /api/contact/company/company_id:
 *   get:
 *     tags:
 *       - Contact
 *     name: Contact Detail On Behalf of Specific Company
 *     summary: Contact Detail On Behalf of Specific Company
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
router.get('/company/:company_id', jwt.decode, isProjectAdmin, ContactContoller.getAllContactsOnBehalfOfCompany);
/**
 * @swagger
 * /api/contact/id:
 *   put:
 *     tags:
 *       - Contact
 *     name: Upate
 *     summary: update contact
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
 *             contact_name:
 *               type: string
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *             company:
 *               type: array
 *               items:
 *                   type: integer
 *             contact_type:
 *               type: array
 *               items:
 *                   type: integer
 *         required:
 *           - contact_name
 *           - email
 *           - phone
 *     responses:
 *       200:
 *         description: Contact updated sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action

 *
 */
router.put('/:id', jwt.decode, isProjectAdmin, ContactContoller.update);

/**
 * @swagger
 * /api/contact/id:
 *   delete:
 *     tags:
 *       - Contact
 *     name: Delete
 *     summary: Delete contact
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Contact updated sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */
router.delete('/:id', jwt.decode, isProjectAdmin, ContactContoller.deleteContact);

/**
 * @swagger
 * /api/contact/unassociated/contacts:
 *   get:
 *     tags:
 *       - Contact
 *     name: List All Unassociated Contacts
 *     summary: List All Unassociated Contacts
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
router.get('/unassociated/contacts', [jwt.decode, isProjectOrAgencyAdmin], ContactContoller.getUnassociatedContacts);
module.exports = router;
