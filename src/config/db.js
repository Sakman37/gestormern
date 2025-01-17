const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://juanpablo201460:ty51fDQ4CHKXdmtQ@gestormern.9f1ge.mongodb.net/gestormern?retryWrites=true&w=majority");
        console.log('✅ MongoDB Conectado');
    } catch (error) {
        console.error('❌ Error en la conexión a MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
