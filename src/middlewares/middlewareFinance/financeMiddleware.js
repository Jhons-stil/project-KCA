const { body, validationResult } = require("express-validator");
const { resGagal } = require("../../payloads/payload.js");

const cekError = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const arrayError = errors.array().map((err) => {
      return {
        field: err.path,
        message: err.msg,
      };
    });

    return resGagal(res, 400, "error", "Terjadi kesalahan", arrayError);
  }

  next();
};

const cekFinance = [
  body("type")
    .notEmpty()
    .withMessage("Type wajib diisi")
    .isIn(["Pemasukan", "Pengeluaran"])
    .withMessage("Type harus Pemasukan atau Pengeluaran"),

  body("category")
    .notEmpty()
    .withMessage("Category wajib diisi"),

  body("amount")
    .notEmpty()
    .withMessage("Amount wajib diisi")
    .isNumeric()
    .withMessage("Amount harus berupa angka"),

  body("date")
    .notEmpty()
    .withMessage("Tanggal wajib diisi")
    .isDate()
    .withMessage("Format tanggal tidak valid"),

  body("note")
    .optional()
    .isString()
    .withMessage("Note harus berupa teks"),
];

module.exports = {
  cekFinance,
  cekError,
};