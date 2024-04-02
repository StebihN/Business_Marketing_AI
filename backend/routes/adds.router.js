var router = require("express").Router();
var addsController = require("../controllers/adds.controller");
const authorize = require('../middleware/authorization');

router.post("/generate", authorize, addsController.generateAdd);
router.post("/save", authorize, addsController.saveAdd);
router.get("/get/:id", authorize, addsController.getAdd);
router.delete("/delete/:id", authorize, addsController.deleteAdd);

module.exports = router;
