module.exports = (sequelize, DataTypes) => {
  const Proveedor = sequelize.define("proveedor", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contacto: {
      type: DataTypes.STRING,
      allowNull: true
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  return Proveedor;
};
