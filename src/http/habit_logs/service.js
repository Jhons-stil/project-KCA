const { where } = require("sequelize");
const db = require("../../db/models");

const {HabitLogs} = db;

const tampilHabitLogs = async () => { 
    return await HabitLogs.findAll();
};

const cariHabitLogsById = async (id) => {
 return await HabitLogs.findByPk(id);
}

const cariLogsByHabit = async (habit_id) => {
    return await HabitLogs.findAll({
        where: {habit_id},
        order: [["date", "DESC"]],
    });
};

const tambahHabitLogs = async (body) => {
    return await HabitLogs.create(body);
};

const ubahHabitLogs = async (id, body) => {
    const data = await HabitLogs.findByPk(id);

    if (!data) {
        throw new Error("Habit log tidak ditemukan");        
    }
    return await data.update(body);
};

const hapusHabitLogs = async (id) => {
    const data = await HabitLogs.findByPk(id);

    if (!data) {
        throw new Error("Habit log tidak ditemukan");
    }
    return await data.destroy()
}

module.exports = {
    tampilHabitLogs,
    cariHabitLogsById,
    cariLogsByHabit,
    tambahHabitLogs,
    ubahHabitLogs,
    hapusHabitLogs,
}