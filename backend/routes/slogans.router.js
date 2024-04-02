var router = require("express").Router();
var slogansController = require("../controllers/slogans.controller")
const authorize = require('../middleware/authorization');

router.post("/generate", authorize, slogansController.generateSlogan);
router.post("/save", authorize, slogansController.saveSlogan);
router.get("/get/:id", authorize, slogansController.getSlogan);
router.delete("/delete/:id", authorize, slogansController.deleteSlogan);

module.exports = router;
