const express = require("express");
const router = express.Router();
const { register, login, readUser } = require("./controller.js");
const {
  cekFinance,
  cekError,
} = require("../../middlewares/middlewareFinance/financeMiddleware.js");
const authMidd = require("../../middlewares/authMiddleware/authMidd.js")


const {
getAllFinance,
getFinanceById,
createFinance,
updateFinance,
deleteFinance
} =
require("./controller.js")
router.get("/", getAllFinance);
router.get("/:id", getFinanceById);
router.post("/create",authMidd,cekFinance,cekError, createFinance);
router.patch("/update/:id",authMidd,cekFinance,cekError, updateFinance)
router.delete("/delete/:id", authMidd,deleteFinance)
module.exports = router;
