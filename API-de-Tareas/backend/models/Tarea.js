const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  completado: Boolean,
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  archivo: String
});

module.exports = mongoose.model('Tarea', tareaSchema);
