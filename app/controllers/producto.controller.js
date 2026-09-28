const db = require("../models");
const Producto  = db.productos;
const Proveedor = db.proveedores;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  try {
    if (!req.body.nombre) {
      return res.status(400).json({
        mensaje: "Error: el campo 'nombre' es obligatorio para crear un Producto."
      });
    }

    if (!req.body.proveedorId) {
      return res.status(400).json({
        mensaje: "Error: el campo 'proveedorId' es obligatorio para crear un Producto."
      });
    }

    const proveedorExiste = await Proveedor.findByPk(req.body.proveedorId);
    if (!proveedorExiste) {
      return res.status(400).json({
        mensaje: `Error: no existe un Proveedor con id=${req.body.proveedorId}.`
      });
    }

    const producto = {
      nombre:      req.body.nombre,
      descripcion: req.body.descripcion,
      precio:      req.body.precio,
      stock:       req.body.stock !== undefined ? req.body.stock : 0,
      status:      req.body.status !== undefined ? req.body.status : true,
      proveedorId: req.body.proveedorId
    };

    const nuevoProducto = await Producto.create(producto);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el Producto.",
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

    const productos = await Producto.findAll({
      where: condicion,
      include: [
        {
          model: Proveedor,
          as: "proveedor"
        }
      ]
    });

    res.json(productos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los Productos.",
      error: error.message
    });
  }
};

exports.findAllStatus = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      where: { status: true },
      include: [{ model: Proveedor, as: "proveedor" }]
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los Productos activos.",
      error: error.message
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const producto = await Producto.findByPk(id, {
      include: [
        {
          model: Proveedor,
          as: "proveedor"
        }
      ]
    });

    if (!producto) {
      return res.status(404).json({
        mensaje: `Producto con id=${id} no encontrado.`
      });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({
      mensaje: `Error al obtener el Producto con id=${req.params.id}.`,
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [filasActualizadas] = await Producto.update(req.body, {
      where: { id: id }
    });

    if (filasActualizadas === 0) {
      return res.status(404).json({
        mensaje: `Producto con id=${id} no encontrado o sin cambios.`
      });
    }

    res.json({ mensaje: "Producto actualizado correctamente." });
  } catch (error) {
    res.status(500).json({
      mensaje: `Error al actualizar el Producto con id=${req.params.id}.`,
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const filasEliminadas = await Producto.destroy({ where: { id: id } });

    if (filasEliminadas === 0) {
      return res.status(404).json({
        mensaje: `Producto con id=${id} no encontrado.`
      });
    }

    res.json({ mensaje: "Producto eliminado correctamente." });
  } catch (error) {
    res.status(500).json({
      mensaje: `Error al eliminar el Producto con id=${req.params.id}.`,
      error: error.message
    });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const cantidad = await Producto.destroy({
      where: {},
      truncate: false
    });
    res.json({ mensaje: `${cantidad} Productos eliminados correctamente.` });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar todos los Productos.",
      error: error.message
    });
  }
};
