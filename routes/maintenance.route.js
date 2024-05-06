const express = require("express");
const router = express.Router();

const maintenanceController = require('../controllers/maintenance.controller');

/**
 * @swagger
 * tags:
 *   name: Maintenance
 *   description: API endpoints for managing maintenance tasks
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Maintenance:
 *       type: object
 *       required:
 *         - staffId
 *         - task
 *       properties:
 *         staffId:
 *           type: number
 *           description: Staff's ID
 *         task:
 *           type: string
 *           description: Task to be assigned
 */

// GET route to retrieve all assigned maintenance tasks
/**
 * @swagger
 * /api/maintenance:
 *   get:
 *     summary: Retrieve all assigned maintenance tasks
 *     tags: [Maintenance]
 *     responses:
 *       '200':
 *         description: A list of assigned maintenance tasks
 *       '500':
 *         description: Internal server error
 */
router.get("/maintenance", maintenanceController.getAllMaintenance);

// POST route to assign a new maintenance task
/**
 * @swagger
 * /api/maintenance:
 *   post:
 *     summary: Assign a new maintenance task
 *     tags: [Maintenance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Maintenance'
 *     responses:
 *       '201':
 *         description: Maintenance task assigned successfully
 *       '400':
 *         description: Bad request
 */
router.post("/maintenance", maintenanceController.assignMaintenance);

// PUT route to reassign a maintenance task
/**
 * @swagger
 * /api/maintenance/{maintenanceId}:
 *   put:
 *     summary: Reassign a maintenance task
 *     tags: [Maintenance]
 *     parameters:
 *       - in: path
 *         name: maintenanceId
 *         required: true
 *         description: ID of the maintenance task to reassign
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Maintenance'
 *     responses:
 *       '200':
 *         description: Maintenance task reassigned successfully
 *       '404':
 *         description: Maintenance task not found
 *       '400':
 *         description: Bad request
 */
router.put("/maintenance/:maintenanceId", maintenanceController.reassignMaintenance);

// DELETE route to delete an assigned maintenance task
/**
 * @swagger
 * /api/maintenance/{maintenanceId}:
 *   delete:
 *     summary: Delete an assigned maintenance task
 *     tags: [Maintenance]
 *     parameters:
 *       - in: path
 *         name: maintenanceId
 *         required: true
 *         description: ID of the maintenance task to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Maintenance task deleted successfully
 *       '404':
 *         description: Maintenance task not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/maintenance/:maintenanceId", maintenanceController.deleteMaintenance);

module.exports = router;