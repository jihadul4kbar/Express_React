---
theme : "night"
transition: "slide"
highlightTheme: "monokai"
logoImg: "img/logo.png"
slideNumber: false
title: "Install React Boostrap dan Route"

---

#### Instalasi React Boostrap
by [Jihadul Akbar](https://github.com/jihadul4kbar)

---

## [React Boostrap](https://react-bootstrap.netlify.app/)

Merupakan tool untuk membuat halaman website dengan framework boostrap pada library react

--

### Installasi 
Buka terminal dan jalankan perintah pada frontend
```js
npm install react-bootstrap bootstrap
```

--

### Cek instalasi 

Buka file package.json dan temukan pada 
```
"dependencies": {
    "axios": "^1.7.7",
    *"bootstrap": "^5.3.3"*,
    "react": "^18.3.1",
    *"react-bootstrap": "^2.10.6"*,
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.0.2"
  }
```

--

Buat folder Layout di dalam src/components
dan buat file baru di dalamnya dengan nama MenuNavBar.jsx

--

isi file MenuNavBar.jsx dengan file yang di copy dari 
https://react-bootstrap.netlify.app/docs/components/navbar

--

ganti 
```js
 function BasicExample() 
``` 
menjadi  
```js 
function MenuNavBar()
```
dan 
```js
export default MenuNavBar;
```

--

buat folder Page di dalam src/components
dan buat file baru dengan nama Home.jsx

--

isi file Home.jsx
```js
import React from "react";
function Home(){
    return (
    <>
        <div className="container ">
            <h1>Selamat Datang Di Apilasi</h1>
            <p>Ini merupakan sebuah aplikasi yang dibuat menggunakan Expess JS dan React JS</p>
        </div>
    </>
    );
  }
  export default Home;
```

--

Perbaharui file 
file App.jsx

```js
import React from "react";
import Home from './components/Page/Home'
import MenuNavBar from "./components/Layout/MenuNavBar";

export default function App() {
    return (
            <>
                <MenuNavBar />
                <Home />
            </>
        );
};
```

--

bagi yang belum muncul cssnya tambahkan pada file main.jsx
sebagai berikut 
```js
import 'bootstrap/dist/css/bootstrap.min.css';
```

---

### Install Route DOM

Route adalah cara untuk menentukan kemana saja link akan di tuju

--

instalasi 
```js
npm install react-router-dom
```

--

buat folder routes di dalam src dan buat file baru bernama index.jsx

-- 

isi dengan kode berikut
```js
//import react router dom
import { Routes, Route } from "react-router-dom";
// Home
import Home from '../components/Page/Home.jsx'
// User
import DataUser from '../components/User/DataUser.jsx';
//Form User
import FormUser from '../components/User/FormUser.jsx';
//Edit
import EditUser from '../components/User/EditUser.jsx';
function RoutesIndex() {
    return (
        <Routes>
            {/* route "/" */}
            <Route path="/" element={<Home />} />
            {/* route "/user" */}
            <Route path="/user" element={<DataUser />} />
            {/* route "/user/create" */}
            <Route path="/user/create" element={<FormUser />} />
            {/* route "/user/edit/:id" */}
            <Route path="/user/edit/:id" element={<EditUser />} />
        </Routes>
    )
}

export default RoutesIndex;
```

--

Buat file FormUser.jsx isinya 

```js
import React, { useState, useEffect } from "react";
import { createUser, updateUser } from "../../services/api";

const FormUser = ({ currentUser, onSuccess }) => {
   const [form, setForm] = useState({
       name: "",
       email: "",
       password: "",
       level: "user",
       is_active: true,
       expire_time: "",
   });

   useEffect(() => {
       if (currentUser) {
           setForm(currentUser);
       }
   }, [currentUser]);

   const handleChange = (e) => {
       const { name, value } = e.target;
       setForm({ ...form, [name]: value });
   };

   const handleSubmit = async (e) => {
       e.preventDefault();
       try {
           if (form.id) {
               await updateUser(form.id, form);
           } else {
               await createUser(form);
           }
           setForm({
               name: "",
               email: "",
               password: "",
               level: "user",
               is_active: true,
               expire_time: "",
           });
           onSuccess();
       } catch (error) {
           console.error("Error saving user:", error);
       }
   };

   return (
    <div className="conatiner">
       <form onSubmit={handleSubmit}>
           <h2>{form.id ? "Edit User" : "Add User"}</h2>
           <div>
               <label>Name:</label>
               <input
                   type="text"
                   name="name"
                   value={form.name}
                   onChange={handleChange}
                   required
               />
           </div>
           <div>
               <label>Email:</label>
               <input
                   type="email"
                   name="email"
                   value={form.email}
                   onChange={handleChange}
                   required
               />
           </div>
           <div>
               <label>Password:</label>
               <input
                   type="password"
                   name="password"
                   value={form.password}
                   onChange={handleChange}
                   required={!form.id}
               />
           </div>
           <div>
               <label>Level:</label>
               <select name="level" value={form.level} onChange={handleChange}>
                   <option value="user">User</option>
                   <option value="admin">Admin</option>
               </select>
           </div>
           <div>
               <label>Expire Time:</label>
               <input
                   type="datetime-local"
                   name="expire_time"
                   value={form.expire_time}
                   onChange={handleChange}
               />
           </div>
           <div>
               <label>Active:</label>
               <input
                   type="checkbox"
                   name="is_active"
                   checked={form.is_active}
                   onChange={(e) =>
                       setForm({ ...form, is_active: e.target.checked })
                   }
               />
           </div>
           <button type="submit">{form.id ? "Update" : "Create"}</button>
       </form>
       </div>
   );
};

export default FormUser;
```

--

perbaiki file App.jsx
```js
import React from "react";
import Routes from '../src/routes/index'
import MenuNavBar from "./components/Layout/MenuNavBar";

export default function App() {
    return (
            <>
                <MenuNavBar />
                <Routes />
            </>
        );
    }
```






