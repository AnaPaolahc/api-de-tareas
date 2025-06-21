const Tarea = require('../models/Tarea');
const fs = require('fs');

exports.crearTarea = async (req, res) => {
  const { titulo, descripcion, completado } = req.body;
  const archivo = req.file?.filename;
  const nuevaTarea = new Tarea({ titulo, descripcion, completado, archivo });
  await nuevaTarea.save();
  res.json(nuevaTarea);
};

exports.listarTareas = async (req, res) => {
  const tareas = await Tarea.find().sort({ fechaCreacion: -1 });
  res.json(tareas);
};

exports.actualizarTarea = async (req, res) => {
  const { id } = req.params;
  const tarea = await Tarea.findByIdAndUpdate(id, req.body, { new: true });
  res.json(tarea);
};

exports.eliminarTarea = async (req, res) => {
  const { id } = req.params;
  const tarea = await Tarea.findByIdAndDelete(id);
  if (tarea?.archivo) fs.unlinkSync(`uploads/${tarea.archivo}`);
  res.json({ mensaje: 'Eliminado' });
};
