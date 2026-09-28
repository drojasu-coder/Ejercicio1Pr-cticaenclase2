const db = require("../models");
const Proveedor = db.proveedores;
const Producto  = db.productos;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  try {
    if (!req.body.nombre) {
      return res.status(400).json({
        mensaje: "Error: el campo 'nombre' es obligatorio para crear un Proveedor."
      });
    }

    const proveedor = {
      nombre:    req.body.nombre,
      contacto:  req.body.contacto,
      correo:    req.body.correo,
      telefono:  req.body.telefono,
      direccion: req.body.direccion,
      status:    req.body.status !== undefined ? req.body.status : true
    };

    const nuevoProveedor = await Proveedor.create(proveedor);
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el Proveedor.",
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

    const proveedores = await Proveedor.findAll({ where: condicion });
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los Proveedores.",
      error: error.message
    });
  }
};

exports.findAllStatus = async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll({ where: { status: true } });
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los Proveedores activos.",
      error: error.message
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const proveedor = await Proveedor.findByPk(id, {
      include: [
        {
          model: Producto,
          as: "productos"
        }
      ]
    });

    if (!proveedor) {
      return res.status(404).json({
        mensaje: `Proveedor con id=${id} no encontrado.`
      });
    }

    res.json(proveedor);
  } catch (error) {
    res.status(500).json({
      mensaje: `Error al obtener el Proveedor con id=${req.params.id}.`,
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [filasActualizadas] = await Proveedor.update(req.body, {
      where: { id: id }
    });

    if (filasActualizadas === 0) {
      return res.status(404).json({
        mensaje: `Proveedor con id=${id} no encontrado o sin cambios.`
      });
    }

    res.json({ mensaje: "Proveedor actualizado correctamente." });
  } catch (error) {
    res.status(500).json({
      mensaje: `Error al actualizar el Proveedor con id=${req.params.id}.`,
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const filasEliminadas = await Proveedor.destroy({ where: { id: id } });

    if (filasEliminadas === 0) {
      return res.status(404).json({
        mensaje: `Proveedor con id=${id} no encontrado.`
      });
    }

    res.json({ mensaje: "Proveedor eliminado correctamente." });
  } catch (error) {
    res.status(500).json({
      mensaje: `Error al eliminar el Proveedor con id=${req.params.id}.`,
      error: error.message
    });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const cantidad = await Proveedor.destroy({
      where: {},
      truncate: false
    });
    res.json({ mensaje: `${cantidad} Proveedores eliminados correctamente.` });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar todos los Proveedores.",
      error: error.message
    });
  }
};

exports.findProductsBySupplier = async (req, res) => {
  try {
    const id = req.params.id;

    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor) {
      return res.status(404).json({
        mensaje: `Proveedor con id=${id} no encontrado.`
      });
    }

    const productos = await Producto.findAll({
      where: { proveedorId: id }
    });

    res.json({
      proveedor: proveedor.nombre,
      totalProductos: productos.length,
      productos: productos
    });
  } catch (error) {
    res.status(500).json({
      mensaje: `Error al obtener los productos del Proveedor con id=${req.params.id}.`,
      error: error.message
    });
  }
};
