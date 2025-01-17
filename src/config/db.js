const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:5006/gestormern");

        console.log('✅ MongoDB Conectado');
    } catch (error) {
        console.error('❌ Error en la conexión a MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
