const { body, validationResult } = require("express-validator");
const { resGagal } = require("../../payloads/payload.js");
const { cariHabitsById } = require("../../http/habits/service.js")

const cekId = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = await cariHabitsById(id);
    if (!user) {
      return resGagal(res, 404, "error", "Data tidak ditemukan");
    }
    next();
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

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

const cekHabits = [
    body("habit_name")
    .notEmpty()
    .withMessage("Habit name wajib diisi")
    .bail()
    .isLength({min: 3, max: 100})
    .withMessage("Habit name minimal 3 karakter dan maksimal 100 karakter"),

    body("target_frequency")
    .notEmpty()
    .withMessage("Target Frequency wajib diisi")
    .bail()
    .isIn(["harian", "mingguan"])
    .withMessage("Target Frequency hanya boleh harian dan mingguan"),
];

module.exports = {
    cekId,
    cekError,
    cekHabits
}

