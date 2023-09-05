const router = require('express').Router();
const ContactTypeContoller = require('../controllers/ContactTypeController');
const jwt = require('../common/middlewares/jwt.validator');

/**
 * @swagger
 * /api/contacttype:
 *   post:
 *     tags:
 *       - Contact Type
 *     name: Add contact type
 *     summary: Add contact type
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
 *         description: Contact added sucessfully!
 *       401:
 *         description: Bad Request, not found in db
 *       500:
 *         description: Server error
 *       403:
 *         description: not authorize to do this action
 *
 */

router.post('/', jwt.decode, ContactTypeContoller.add);

/**
* @swagger
* /api/contacttype/id:
*   put:
*     tags:
*       - Contact Type
*     name: Update contact type
*     summary: update contact type
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
*         description: Contact updated sucessfully!
*       401:
*         description: Bad Request, not found in db
*       500:
*         description: Server error
*       403:
*         description: not authorize to do this action
*
*/

router.put('/:id', jwt.decode, ContactTypeContoller.update);

/**
* @swagger
* /api/contactype:
*   get:
*     tags:
*       - Contact Type
*     name: List Contact types
*     summary: List All contact types
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

router.get('/', jwt.decode, ContactTypeContoller.getAll);

/**
* @swagger
* /api/contacttype/id:
*   delete:
*     tags:
*       - Contact Type
*     name: Delete
*     summary: Delete contact type
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: Contact Type deleted sucessfully!
*       401:
*         description: Bad Request, not found in db
*       500:
*         description: Server error
*       403:
*         description: not authorize to do this action
*
*/

router.delete('/:id', jwt.decode, ContactTypeContoller.deleteType);

module.exports = router;
