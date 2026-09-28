const express = require("express");
const router  = express.Router();

const proveedorController = require("../controllers/proveedor.controller.js");

module.exports = app => {
  router.post("/create", proveedorController.create);
  router.get("/", proveedorController.findAll);
  router.get("/status", proveedorController.findAllStatus);
  router.get("/:id/products", proveedorController.findProductsBySupplier);
  router.get("/:id", proveedorController.findOne);
  router.put("/update/:id", proveedorController.update);
  router.delete("/delete", proveedorController.deleteAll);
  router.delete("/delete/:id", proveedorController.delete);

  app.use("/api/supplier", router);
};
