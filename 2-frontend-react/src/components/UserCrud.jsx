import React, { useState } from "react";
import UserList from "./UserList";
import UserForm from "./UserForm";

const UserCrud = () => {
   const [currentUser, setCurrentUser] = useState(null);

   const handleEdit = (user) => {
       setCurrentUser(user);
   };

   const handleSuccess = () => {
       setCurrentUser(null); // Reset form
   };

   return (
       <div className="container">
           <h1>User Management</h1>
           {/* <UserForm currentUser={currentUser} onSuccess={handleSuccess} /> */}
           <UserList onEdit={handleEdit} />
       </div>
   );
};

export default UserCrud;
