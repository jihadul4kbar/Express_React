---
theme : "night"
transition: "slide"
highlightTheme: "monokai"
logoImg: "img/logo.png"
slideNumber: false
title: "Pengenalan Express JS"


---

## Instalasi Project Express JS 
by [Jihadul Akbar](https://github.com/jihadul4kbar)

---

## Buat Database

--

## Buat database
```
CREATE DATABASE fjs-backend;
```

--

## Buat Table Baru User

```
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    level ENUM('Admin', 'Petugas', 'Pelanggan'),
    expire_time DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

--

## Insert Tabel

```sql
INSERT INTO users 
    (user_id, name, email, password, 
    is_active, level, expire_time, 
    created_at, updated_at) 
VALUES 
    ('1234', 'Jihadul Akbar', 
    'jihadulakbar@gmail.com', 
    '12345678', '1', 'Admin', 
    '2024-11-11 07:55:48.000000', 
    current_timestamp(), 
    current_timestamp());
```

---

## Instalasi Project Express JS
Inisialisasi Proyek dengan Express.js

--

Buat folder `api-backend`

--

Jalankan perintah
Buat File `package.json`
```
npm init -y
```

--

Inisialisasi package 
```
npm install express mysql2 dotenv body-parser
```

--

Buat File `index.js`
```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

--

Jalankan File `index.js`
```js
node index.js
```

--

### [Nodemon](https://nodemon.io)
> **Nodemon** adalah utilitas yang akan memantau perubahan apa pun pada sumber Anda dan secara otomatis memulai ulang server Anda. Sempurna untuk pengembangan aplikasi Node.js

--

Instalasi Nodemon dengan NPM
```
npm install -g nodemon
```

--

Jalankan Nodemon
```
nodemon index.js    
```

--

```
[nodemon] 3.1.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node index.js`
Buka Port 3000 untuk melihat hasil
```

--



####  Struktur Project

```
api-backend
├── .env
├── index.js
├── routes
│   └── userRoutes.js
└── controllers
    └── userController.js
├── utils
│   └── db.js
```

--

#### Configurasi dotenv

Buat File .env
```js
    DB_HOST=127.0.0.1
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=fjs-backend
```

--

#### Buat File index.js

```js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const db = require("./utils/db"); // Menghubungkan ke database

app.use("/api/users", require("./routes/userRoutes"));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

--

##### Buat File routes/userRoutes.js

```js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;

```

--

#### Buat File controllers/userControllers.js

```js
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
```

--

#### Buat File utils/db.js

```js
// db.js
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeout: 10000,
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to database");
});

module.exports = db;

```

---

## [Postman](https://www.postman.com)
[Download Postman](https://www.postman.com/downloads/)


--

> Postman adalah platform API untuk membangun dan menggunakan API. Postman menyederhanakan setiap langkah siklus hidup API dan merampingkan kolaborasi sehingga Anda dapat membuat API yang lebih baik—lebih cepat.

--

### Test API
endpoint : http://localhost:3000/api/users

--


#### GET: Mendapatkan Daftar Pengguna

1.	Buka Postman dan pilih metode GET.
2.	Masukkan URL endpoint API Anda, misalnya: http://localhost:3000/api/users.
3.	Klik tombol Send untuk mengirim permintaan.
4.	Postman akan menampilkan respons yang dikirim server, seperti daftar pengguna dalam format JSON.


--

#### GET: Mendapatkan Pengguna Berdasarkan ID

1.	Pilih metode GET.
2.	Masukkan URL endpoint API untuk mengambil data pengguna berdasarkan ID, misalnya: http://localhost:3000/api/users/1 (di mana 1 adalah user_id).
3.	Klik Send.
4.	Anda akan menerima respons data pengguna yang sesuai.


--

#### POST: Menambahkan Pengguna Baru


1.	Pilih metode POST.
2.	Masukkan URL endpoint API untuk menambahkan pengguna, misalnya: http://localhost:3000/api/users
3.	Pilih tab Body -> raw -> JSON.
4.	Masukkan data pengguna baru dalam format JSON, misalnya:
    ```
    {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "password123",
        "is_active": true,
        "level": "user",
        "expire_time": "2024-12-31 23:59:59"
    }
    ```
5.	Klik Send.
6.	Jika berhasil, Anda akan melihat respons dari server dengan data pengguna yang baru ditambahkan.


``` 

--

#### PUT: Memperbarui Data Pengguna


1.	Pilih metode PUT.
2.	Masukkan URL endpoint untuk memperbarui data pengguna berdasarkan ID, misalnya: http://localhost:3000/api/users/1.
3.	Pilih Body -> raw -> JSON.
4.	Masukkan data yang ingin diperbarui, misalnya:
``` {
    "name": "Jane Doe",
    "email": "janedoe@example.com",
    "password": "newpassword",
    "is_active": true,
    "level": "admin",
    "expire_time": "2025-12-31 23:59:59"
}
```
5.	Klik Send.
6.	Anda akan menerima respons yang menunjukkan bahwa data pengguna berhasil diperbarui.


--

#### DELETE: Menghapus Pengguna Berdasarkan ID

1.	Pilih metode DELETE.
2.	Masukkan URL endpoint untuk menghapus pengguna berdasarkan ID, misalnya: http://localhost:3000/api/users/1.
3.	Klik Send.
4.	Anda akan mendapatkan respons yang menyatakan bahwa pengguna berhasil dihapus. 

--

### Memeriksa Respons dan Status Code
Setiap kali Anda mengirim permintaan, periksa status code di bagian atas respons Postman:

- 200 OK untuk permintaan yang berhasil.
- 201 Created jika berhasil menambahkan data.
- 404 Not Found jika endpoint atau data tidak ditemukan.
- 500 Internal Server Error jika terjadi kesalahan pada server.

--

---

## Q & A

---

## Refrensi
- [exressjs](https://expressjs.com/)
- [postman](https://www.postman.com/)
- [nodemon](https://nodemon.io/)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express-validator](https://www.npmjs.com/package/express-validator)
- [express-fileupload](https://www.npmjs.com/package/express-fileupload)
- [nodejs](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [github](https://github.com/jihadul4kbar)

