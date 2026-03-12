  const db = require("../../db/models/index.js");
  const { Habits } = db;

  const tampilHabits = async () => {
    return await Habits.findAll();
  };

  const cariHabitsById = async (id) => {
    return await Habits.findByPk(id);
  };

  const tambahHabits = async (body) => {
    return await Habits.create(body);
  };

  const ubahHabits = async (id, body) => {
    const data = await Habits.findByPk(id);
    if (!data) return null;

    return await data.update(body);
  };

  const hapusHabits = async (id) => {
    return await Habits.destroy({
      where: { id: id },
    });
  };
  const findHabits = async (user_id) => {
    return await Habits.findAll({
      where: { user_id },
    });
  };

  module.exports = {
    tambahHabits,
    tampilHabits,
    cariHabitsById,
    ubahHabits,
    hapusHabits,
    findHabits,
  };
