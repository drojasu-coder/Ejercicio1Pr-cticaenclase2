const express = require("express");
const router  = express.Router();

const productoController = require("../controllers/producto.controller.js");

module.exports = app => {
  router.post("/create", productoController.create);
  router.get("/", productoController.findAll);
  router.get("/status", productoController.findAllStatus);
  router.get("/:id", productoController.findOne);
  router.put("/update/:id", productoController.update);
  router.delete("/delete", productoController.deleteAll);
  router.delete("/delete/:id", productoController.delete);

  app.use("/api/product", router);
};
