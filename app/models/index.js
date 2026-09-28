require("dotenv").config();

const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

const variablesRequeridas = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];
variablesRequeridas.forEach((variable) => {
  if (!process.env[variable]) {
    console.error(
      `\n❌ ERROR: La variable de entorno "${variable}" no está definida.`
    );
    console.error(
      `   Copia el archivo .env.example como .env y completa las credenciales.\n`
    );
    process.exit(1);
  }
});

const usarSSL = process.env.DB_SSL === "true";

const dialectOptions = usarSSL
  ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  : {};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  dialectOptions: dialectOptions,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.clientes    = require("./cliente.model.js")(sequelize, DataTypes);
db.productos   = require("./producto.model.js")(sequelize, DataTypes);
db.proveedores = require("./proveedor.model.js")(sequelize, DataTypes);

db.proveedores.hasMany(db.productos, { as: "productos", foreignKey: "proveedorId" });
db.productos.belongsTo(db.proveedores, { as: "proveedor", foreignKey: "proveedorId" });

module.exports = db;
