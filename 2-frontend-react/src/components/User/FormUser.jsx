import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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
    <div className="container">
        <Card >
          <Card.Header>Data User</Card.Header>
          <Card.Body>
            <Button href="/user" variant="warning">Data User</Button>
            <Card.Text>
       <form onSubmit={handleSubmit}>
           <h2>{form.id ? "Edit User" : "Add User"}</h2>
           <div>
           <Form.Label htmlFor="Name">Name</Form.Label>
            <Form.Control
                 type="text"
                 name="name"
                 value={form.name}
                 onChange={handleChange}
                 required
            />
           </div>
           <div>
           <Form.Label htmlFor="Email">Email</Form.Label>
           <Form.Control
                   type="email"
                   name="email"
                   value={form.email}
                   onChange={handleChange}
                   required
               />
           </div>
           <div>
           <Form.Label htmlFor="password">Password</Form.Label>
           <Form.Control
                   type="password"
                   name="password"
                   value={form.password}
                   onChange={handleChange}
                   required={!form.id}
               />
           </div>
           <div>
           <Form.Label htmlFor="level">Level</Form.Label>
                <Form.Select aria-label="Default select example" name="level" value={form.level} onChange={handleChange}>
                   <option>Pilih Level</option>
                   <option value="user">User</option>
                   <option value="admin">Admin</option>
               </Form.Select>
           </div>
           <div>
           <Form.Label htmlFor="ExpireTime">Expire Time</Form.Label>
           <Form.Control
                   type="datetime-local"
                   name="expire_time"
                   value={form.expire_time}
                   onChange={handleChange}
               />
           </div>
           <div>
           <Form.Label htmlFor="Active">Active</Form.Label>
           <Form.Check
                   type="checkbox"
                   name="is_active"
                   checked={form.is_active}
                   onChange={(e) =>
                       setForm({ ...form, is_active: e.target.checked })
                   }
               />
           </div>
           <Button type="submit" variant="info">{form.id ? "Update" : "Create"}</Button>
       </form>
       </Card.Text>
          </Card.Body>
        </Card>
    </div>
   );
};

export default FormUser;