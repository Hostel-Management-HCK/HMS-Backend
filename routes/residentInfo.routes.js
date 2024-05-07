const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware } = require("../jwt");
const residentController = require('../controllers/residentInfo.controller');
const { updateResidentValidator } = require('../validators/updateResident.validator');


/**
 * @swagger
 * tags:
 *   name: Resident
 *   description: API endpoints for managing residentInfo
 */

/**
 * @swagger
 * /api/residentInfo:
 *   get:
 *     summary: Get all residentInfo information or information of a specific resident
 *     tags: [Resident]
 *     parameters:
 *       - in: query
 *         name: username
 *         required: false
 *         description: Username of the resident whose information is to be retrieved. If not provided, information of all residents will be retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '404':
 *         description: Allocation or user not found
 *       '500':
 *         description: Internal server error
 */
router.get("/residentInfo", jwtAuthMiddleware, residentController.getResidentInfo);

/**
 * @swagger
 * /api/residentInfo/{username}:
 *   put:
 *     summary: Update a resident by username
 *     tags: [Resident]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the resident to update
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               middleName:
 *                 type: string
 *                 nullable: true
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               citizenshipNo:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *               newUsername:  
 *                 type: string
 *             example:
 *               firstName: John
 *               middleName: ""
 *               lastName: Smith
 *               email: john@example.com
 *               phone: "9876543210"
 *               citizenshipNo: "12-345-6789"
 *               dateOfBirth: "1990-01-01"
 *               newUsername: john_smith  
 *     responses:
 *       '200':
 *         description: Resident updated successfully
 *       '400':
 *         description: Bad request, check the request body for errors
 *       '404':
 *         description: Resident not found
 *       '500':
 *         description: Internal server error
 */
router.put("/residentInfo/:username", jwtAuthMiddleware, residentController.updateResident);

/**
 * @swagger
 * /api/residentInfo/{username}:
 *   delete:
 *     summary: Delete a resident by username
 *     tags: [Resident]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the resident to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Resident deleted successfully
 *       '404':
 *         description: Resident not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/residentInfo/:username", jwtAuthMiddleware, residentController.deleteResident);

router.get("/residentInfo", jwtAuthMiddleware, residentController.getResidentInfo);

module.exports = router;