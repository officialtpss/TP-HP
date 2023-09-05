const router = require('express').Router();
const { getUserInfoByToken } = require('../common/Common');
const { isAdmin, validateRole } = require('../common/middlewares/role.validator');
const UserContoller = require('../controllers/UserController');
const jwt = require('../common/middlewares/jwt.validator');
const { agencyAdmin } = require('../constants');
const fileUpoload = require('../services/fileUpload.service');
const checkRequiredField = require('../common/middlewares/schema.validator');
/**
 * @swagger
 * /api/users/authorize:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Authorize User
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: 'johnperter88@mailinator.com'
 *             password:
 *               type: string
 *               format: password
 *               example: 'Password123'
 *         required:
 *           - email
 *           - password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Bad Request, not found in db
 *
 */

router.post('/authorize', (req, res, next) => UserContoller().login(req, res, next), jwt.encode);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags:
 *       - Users
 *     name: Register
 *     summary: Register New User
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
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *             first_name:
 *               type: string
 *             last_name:
 *               type: string
 *             domain_url:
 *               type: string
 *             phone:
 *               type: string
 *             title:
 *               type: string
 *             agency_name:
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
 *             main_phone:
 *               type: string
 *             role:
 *               type: string
 *               enum: ['agency']
 *         required:
 *           - email
 *           - password
 *           - first_name
 *           - last_name
 *           - phone
 *           - role
 *     responses:
 *       200:
 *         description: Registration successful
 *       401:
 *         description: Bad Request, not found in db
 *
 */

router.post('/register', (req, res) => UserContoller().register(req, res));

/**
 * @swagger
 * /api/users/checkemail:
 *   post:
 *     tags:
 *       - Users
 *     name: Checkemail
 *     summary: checkemail
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
 *             email:
 *               type: string
 *         required:
 *           - email
 *     responses:
 *       200:
 *         description: ''
 *       400:
 *         description: Email already exist
 *       500:
 *         description: Server error

 *
 */

router.post('/checkemail', (req, res) => UserContoller().checkEmail(req, res));

/**
 * @swagger
 * /api/users/forgotpassword:
 *   post:
 *     tags:
 *       - Users
 *     name: Forgotpassword
 *     summary: Forgotpassword
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
 *             email:
 *               type: string
 *         required:
 *           - email
 *     responses:
 *       200:
 *         description: Invitation sent sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error , email not sent

 *
 */

router.post('/forgotpassword', (req, res) => UserContoller().forgotPassword(req, res));

/**
 * @swagger
 * /api/users/resetpassword:
 *   post:
 *     tags:
 *       - Users
 *     name: Reset password
 *     summary: Reset password
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
 *             password:
 *               type: string
 *             password2:
 *               type: string
 *             token:
 *               type: string
 *         required:
 *           - password
 *           - password2
 *           - token
 *     responses:
 *       200:
 *         description: Invitation sent sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error , email not sent
 *
 */

router.post('/resetpassword', (req, res) => UserContoller().resetPassword(req, res));

/**
 * @swagger
 * /api/users/invite/verification:
 *   post:
 *     tags:
 *       - Users
 *     name: Invite
 *     summary: Invite Project Admin verification
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
 *             token:
 *               type: string
 *         required:
 *           - token
 *     responses:
 *       200:
 *         description: Invitation sent sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error , email not sent
 *
 */

router.post('/invite/verification', (req, res) => UserContoller().inviteVerification(req, res));

/**
 * @swagger
 * /api/users/invite:
 *   post:
 *     tags:
 *       - Users
 *     name: Invite
 *     summary: Invite Project Admin
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
 *             email:
 *               type: string
 *         required:
 *           - email
 *     responses:
 *       200:
 *         description: Invitation sent sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error , email not sent
 *
 */
const inviteRequiredField = ['email']
router.post('/invite', checkRequiredField(inviteRequiredField), jwt.decode, validateRole(agencyAdmin), getUserInfoByToken, (req, res) => UserContoller().invite(req, res));

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     name: List Users
 *     summary: List All Users
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
router.get('/', jwt.decode, (req, res) => UserContoller().getAll(req, res));

/**
 * @swagger
 * /api/users/pendingregistration:
 *   get:
 *     tags:
 *       - Users
 *     name: List Pending registration
 *     summary: List Pending registration
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
router.get('/pendingregistration', jwt.decode, isAdmin, UserContoller().pendingRegistration);

/**
 * @swagger
 * /api/users/getdetail/{id}:
 *   get:
 *     tags:
 *       - Users
 *     name: Get User Detail
 *     summary: Get User Detail
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
router.get('/getdetail/:id', jwt.decode, (req, res) => UserContoller().getDetail(req, res));

/**
 * @swagger
 * /api/users/id:
 *   put:
 *     tags:
 *       - Users
 *     name: Update
 *     summary: Update User
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *              type: integer
 *         - in: body
 *           schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *                      format: password
 *                  first_name:
 *                      type: string
 *                  last_name:
 *                       type: string
 *     responses:
 *       200:
 *         description: Update successful
 *       401:
 *         description: Bad Request, not found in db
 *
 */

router.put('/:id', jwt.decode, fileUpoload.signleUploadProfile('image'), (req, res) => UserContoller().update(req, res));

/**
 * @swagger
 * /api/users/changepassword:
 *   post:
 *     tags:
 *       - Users
 *     name: Change password
 *     summary: Change password
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
 *             password:
 *               type: string
 *             old_password:
 *               type: string
 *             token:
 *               type: string
 *         required:
 *           - password
 *           - old_password
 *           - token
 *     responses:
 *       200:
 *         description: Invitation sent sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error , email not sent
 *
 */

router.post('/changepassword', jwt.decode, (req, res) => UserContoller().changePassword(req, res));

/**
 * @swagger
 * /api/users/accountverification:
 *   post:
 *     tags:
 *       - Users
 *     name: Account verification
 *     summary: Account verification
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
 *               type: string
 *             status:
 *               type: string
 *         required:
 *           - id
 *           - status
 *     responses:
 *       200:
 *         description: Invitation sent sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error , email not sent
 *
 */

router.post('/accountverification', jwt.decode, (req, res) => UserContoller().accountVerifcation(req, res));

/**
 * @swagger
 * /api/users/createagency:
 *   post:
 *     tags:
 *       - Users
 *     name: Create agency
 *     summary: Create New agency user
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
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *             first_name:
 *               type: string
 *             last_name:
 *               type: string
 *             domain_url:
 *               type: string
 *             phone:
 *               type: string
 *             title:
 *               type: string
 *             agency_name:
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
 *             role:
 *               type: string
 *               enum: ['agency']
 *         required:
 *           - email
 *           - password
 *           - first_name
 *           - last_name
 *           - phone
 *           - role
 *     responses:
 *       200:
 *         description: Registration successful
 *       401:
 *         description: Bad Request, not found in db
 *
 */

router.post('/createagency', jwt.decode, (req, res) => UserContoller().createAgency(req, res));

/**
 * @swagger
 * /api/users/recentprojects:
 *   get:
 *     tags:
 *       - Users
 *     name: List Uers recent viewed project
 *     summary: List Uers recent viewed project
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
router.get('/recentprojects', jwt.decode, (req, res) => UserContoller().userRecentVieweProject(req, res));

/**
 * @swagger
 * /api/users/recentprojects/id:
 *   delete:
 *     tags:
 *       - Users
 *     name: Delete recentprojects
 *     summary: Delete entry from user recent viewed project
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
router.delete('/recentprojects/:id', jwt.decode, UserContoller().deleteRecentProjectView);

/**
 * @swagger
 * /api/users/invited/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     name: Delete invited user
 *     summary: Delete invited user
 *     parameters:
 *       - name: id
 *         in: params
 *         required:
 *           - id
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
router.delete('/invited/:id', jwt.decode, UserContoller().deleteInvitedUser);

module.exports = router;
