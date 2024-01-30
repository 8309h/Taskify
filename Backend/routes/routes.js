const express = require('express');
const { getAllTasks,createTask,updateTask,deleteTask,markTaskAsCompleted } = require('../controllers/taskcontroller.routes');

const router = express.Router();

router.get('/tasks', getAllTasks);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
router.patch('/tasks/:id/complete', markTaskAsCompleted);

module.exports = {router};
