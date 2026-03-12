const express = require("express");
const router = express.Router();

const {
  cekFinance,
  cekError,
  cekId,
} = require("../../middlewares/middlewareFinance/financeMiddleware.js");

const {
  getAllFinance,
  getFinanceById,
  createFinance,
  updateFinance,
  deleteFinance,
  getFinanceByUser
} = require("./controller.js");

const verifyToken = require("../../middlewares/midlewareJwt/jwtMiddleware.js");

router.get("/",verifyToken, getAllFinance);
router.get("/my-finance",verifyToken, getFinanceByUser)
router.get("/:id", cekId, getFinanceById);
router.post("/create", verifyToken, cekFinance, cekError, createFinance);
router.patch(
  "/update/:id",
  verifyToken,
  cekId,
  cekFinance,
  cekError,
  updateFinance,
);
router.delete("/delete/:id", verifyToken, cekId, deleteFinance);

module.exports = router;
