import React from "react";
import UserCrud from "./components/UserCrud";
import NavBar from "./components/NavBar";

const App = () => {
    return (
        <div className="App">
            <NavBar />
            <UserCrud />
        </div>
    );
};

export default App;