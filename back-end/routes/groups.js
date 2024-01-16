const express = require("express");
const router = express.Router();
const groupsController = require("../controllers").group;

router.post("/addGroup",groupsController.addGroup);
router.get("/getAllGroups",groupsController.getAllGroups);
router.get("/getGroupById/:id",groupsController.getGroupById);

module.exports = router;
