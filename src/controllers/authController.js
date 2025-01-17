const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({
            token,
            user: { name: user.name, email: user.email, id: user._id }  // Enviar el usuario en la respuesta
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ msg: 'El usuario ya existe' });

        const user = await User.create({ name, email, password });
        res.status(201).json({ msg: 'Usuario registrado correctamente' });
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};
