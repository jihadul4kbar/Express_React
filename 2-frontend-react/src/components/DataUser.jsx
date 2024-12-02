import React, { useEffect, useState } from "react";
import { getUsers } from "../services/api";


const DataUser = ({ }) => {
    const [users, setUsers] = useState([]);
 
    const fetchUsers = async () => {
        try {
            const { data } = await getUsers();
            setUsers(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
 
    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <div className="container">
            <h2>Data User</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.level}</td>
                            <td>
                                <button onClick={() => onEdit(user)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
 };
 
 export default DataUser;
 