const db = require("../utils/db");

// Mendapatkan semua user
exports.getUsers = (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

// Mendapatkan user berdasarkan ID
exports.getUserById = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM users WHERE user_id = ?", [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results[0]);
    });
};

// Menambahkan user baru
exports.createUser = (req, res) => {
    const { name, email, password, is_active, level, expire_time } = req.body;
    db.query(
        "INSERT INTO users (name, email, password, is_active, level, expire_time) VALUES (?, ?, ?, ?, ?, ?)",
        [name, email, password, is_active, level, expire_time],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(201).json({ user_id: results.insertId, ...req.body });
        }
    );
};

// Memperbarui data user
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, password, is_active, level, expire_time } = req.body;
    db.query(
        "UPDATE users SET name = ?, email = ?, password = ?, is_active = ?, level = ?, expire_time = ? WHERE user_id = ?",
        [name, email, password, is_active, level, expire_time, id],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json({ message: "User updated successfully" });
        }
    );
};

// Menghapus user
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM users WHERE user_id = ?", [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "User deleted successfully" });
    });
};