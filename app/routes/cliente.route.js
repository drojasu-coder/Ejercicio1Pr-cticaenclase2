const express = require("express");
const router  = express.Router();

const clienteController = require("../controllers/cliente.controller.js");

module.exports = app => {
  router.post("/create", clienteController.create);
  router.get("/", clienteController.findAll);
  router.get("/status", clienteController.findAllStatus);
  router.get("/:id", clienteController.findOne);
  router.put("/update/:id", clienteController.update);
  router.delete("/delete", clienteController.deleteAll);
  router.delete("/delete/:id", clienteController.delete);

  app.use("/api/customer", router);
};
