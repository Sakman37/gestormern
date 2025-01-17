const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ⚠️ Cambiar userId a user
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ['pendiente', 'en progreso', 'completada'], default: 'pendiente' }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
