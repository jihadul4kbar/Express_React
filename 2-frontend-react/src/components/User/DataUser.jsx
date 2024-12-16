import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { getUsers, deleteUser  } from "../../services/api";

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

    const handleDelete = async (id) => {
           try {
               await deleteUser(id);
               fetchUsers(); // Refresh data
           } catch (error) {
               console.error("Error deleting user:", error);
           }
       };
    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <>
        <div className="container">
        <Card >
          <Card.Header>Data User</Card.Header>
          <Card.Body>
            <Card.Title>Data User </Card.Title>
            <Button href="/user/create" variant="warning">Tambah User</Button>
            <Card.Text>
            <Table striped bordered hover>
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
                                <Button onClick={() => onEdit(user)} variant="info">Edit</Button>
                                <Button onClick={() => handleDelete(user.id)} variant="danger">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </Table>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
        </>
    );
 };
 
 export default DataUser;
 