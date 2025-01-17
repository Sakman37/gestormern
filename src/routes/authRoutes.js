// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');  // Asegúrate de que la ruta sea correcta

// Rutas de login y registro
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
