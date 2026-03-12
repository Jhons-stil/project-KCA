const express = require("express");
const router = express.Router();

const {
  cekHabits,

  cekId,
} = require("../../middlewares/middlewareHabits/habitsMiddleware.js");

const { getAllHabits, getHabitsById, createHabits, updateHabits, deleteHabits, getHabitsByUser } = require("./controller.js");
const verifyToken = require("../../middlewares/midlewareJwt/jwtMiddleware.js");
const { cekError } = require("../../middlewares/middlewareUser/usermiddleware.js");

router.get("/", verifyToken, getAllHabits);
router.get("/my-habits", verifyToken, getHabitsByUser);
router.get("/:id", verifyToken, cekId, getHabitsById);
router.post("/create", verifyToken, cekHabits, cekError, createHabits);
router.patch("/update/:id", verifyToken, cekHabits, cekId, cekError, updateHabits);
router.delete("/delete/:id", verifyToken, cekId, deleteHabits);

module.exports = router;
