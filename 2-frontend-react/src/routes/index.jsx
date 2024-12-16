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

export default RoutesIndex