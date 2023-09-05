const router = require('express').Router();
const CityController = require('../controllers/CityController');
const jwt = require('../common/middlewares/jwt.validator');

const checkRequiredField = require('../common/middlewares/schema.validator');

/**
 * @swagger
 * /api/city:
 *   post:
 *     tags:
 *       - City
 *     name: Add City
 *     summary: Add City
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
 *             state_id:
 *               type: string
 *             jurisdictions:
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
const requiredParam = ['name', 'state_id']
router.post('/', [checkRequiredField(requiredParam), jwt.decode], CityController.createCity);

/**
* @swagger
* /api/city/id:
*   put:
*     tags:
*       - City
*     name: Update City
*     summary: Update City
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
*             state_id:
*               type: number
*             jurisdictions:
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

router.put('/:id', [jwt.decode], CityController.updateCity);

/**
* /api/city:
*   get:
*     tags:
*       - City
*     name: List City
*     summary: List City
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

router.get('/', [jwt.decode], CityController.getAllCities);

/**
 * @swagger
 * /api/city/id:
 *   delete:
 *     tags:
 *       - City
 *     name: Delete City
 *     summary: Delete City
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

router.delete('/:id', [jwt.decode], CityController.deleteCity);

module.exports = router;
