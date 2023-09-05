const router = require('express').Router();
const { getUserInfoByToken, getAgencyProjectAdminIds } = require('../common/Common');
const ProjectContoller = require('../controllers/ProjectController');
const jwt = require('../common/middlewares/jwt.validator');

/**
 * @swagger
 * /api/sprinkler/invite/project_id:
 *   get:
 *     tags:
 *       - Project sprinkler
 *     name: Project sprinkler list for invite user
 *     summary: Project sprinkler  list for invite user
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

router.get('/invite/:project_id', jwt.decode, ProjectContoller.getSprinklerForInvite);

/**
 * @swagger
 * /api/sprinkler/project_id:
 *   get:
 *     tags:
 *       - Project sprinkler
 *     name: Project sprinkler list
 *     summary: Project sprinkler list
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

router.get('/:project_id', jwt.decode, getUserInfoByToken, getAgencyProjectAdminIds, ProjectContoller.getSprinkler);

module.exports = router;
