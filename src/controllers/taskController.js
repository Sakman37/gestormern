const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { title, description, deadline, status } = req.body;
    const user = req.user.id;

    if (!title || !deadline || !status) {
      return res.status(400).json({ msg: 'Faltan datos requeridos' });
    }

    const newTask = new Task({ title, description, deadline, status, user });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, deadline, status } = req.body;
    let task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ msg: 'Tarea no encontrada' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.deadline = deadline || task.deadline;
    task.status = status || task.status;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    let task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ msg: 'Tarea no encontrada' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    await task.deleteOne();
    res.status(200).json({ msg: 'Tarea eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};
