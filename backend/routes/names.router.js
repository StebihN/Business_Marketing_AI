var router = require("express").Router();
var namesController = require("../controllers/names.controller")
const authorize = require('../middleware/authorization');

router.post("/generate", authorize, namesController.generateName);
router.post("/save", authorize, namesController.saveName);
router.get("/get/:id", authorize, namesController.getName);
router.delete("/delete/:id", authorize, namesController.deleteName);

module.exports = router;
