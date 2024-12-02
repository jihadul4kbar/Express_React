import React, { useState, useEffect } from "react";
import { createUser, updateUser } from "../services/api";

const UserForm = ({ currentUser, onSuccess }) => {
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

export default UserForm;
