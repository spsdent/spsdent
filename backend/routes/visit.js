module.exports = app => {
    const visits = require("../controllers/visit.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", visits.create);
  
    // Retrieve all visits
    router.get("/", visits.findAll);
  
    // Retrieve all published visits
    router.get("/status", visits.findAllByStatus);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", visits.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", visits.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", visits.delete);
  
    // Create a new Tutorial
    router.delete("/", visits.deleteAll);
  
    app.use('/api/visits', router);
  };