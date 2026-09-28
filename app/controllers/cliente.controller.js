const db = require("../models");
const Cliente = db.clientes;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  try {
    if (!req.body.nombre) {
      return res.status(400).json({
        mensaje: "Error: el campo 'nombre' es obligatorio para crear un Cliente."
      });
    }

    const cliente = {
      nombre:    req.body.nombre,
      apellido:  req.body.apellido,
      direccion: req.body.direccion,
      correo:    req.body.correo,
      telefono:  req.body.telefono,
      ingreso:   req.body.ingreso,
      status:    req.body.status !== undefined ? req.body.status : true
    };

    const nuevoCliente = await Cliente.create(cliente);
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el Cliente.",
      error: error.message
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const nombre = req.query.nombre;
    const condicion = nombre
      ? { nombre: { [Op.iLike]: `%${nombre}%` } }
      : {};

    const clientes = await Cliente.findAll({ where: condicion });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los Clientes.",
      error: error.message
    });
  }
};

exports.findAllStatus = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({ where: { status: true } });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los Clientes activos.",
      error: error.message
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(404).json({
        mensaje: `Cliente con id=${id} no encontrado.`
      });
    }

    res.json(cliente);
  } catch (error) {
    res.status(500).json({
      mensaje: `Error al obtener el Cliente con id=${req.params.id}.`,
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [filasActualizadas] = await Cliente.update(req.body, {
      where: { id: id }
    });

    if (filasActualizadas === 0) {
      return res.status(404).json({
        mensaje: `Cliente con id=${id} no encontrado o sin cambios.`
      });
    }

    res.json({ mensaje: "Cliente actualizado correctamente." });
  } catch (error) {
    res.status(500).json({
      mensaje: `Error al actualizar el Cliente con id=${req.params.id}.`,
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const filasEliminadas = await Cliente.destroy({ where: { id: id } });

    if (filasEliminadas === 0) {
      return res.status(404).json({
        mensaje: `Cliente con id=${id} no encontrado.`
      });
    }

    res.json({ mensaje: "Cliente eliminado correctamente." });
  } catch (error) {
    res.status(500).json({
      mensaje: `Error al eliminar el Cliente con id=${req.params.id}.`,
      error: error.message
    });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const cantidad = await Cliente.destroy({
      where: {},
      truncate: false
    });
    res.json({ mensaje: `${cantidad} Clientes eliminados correctamente.` });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar todos los Clientes.",
      error: error.message
    });
  }
};
