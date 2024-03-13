// routes.js
const express = require("express");
const router = express.Router();
const UserController = require("./controllers/UserController");
const imageController = require("./controllers/ImageController");

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/images/:id", imageController.getImageById);
router.get("/images", imageController.getAllImages);
router.get("/images/name/:name", imageController.getImageByName);

module.exports = router;
