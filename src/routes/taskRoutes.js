const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController'); // ⚠️ Asegúrate de importar todas las funciones correctamente
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
