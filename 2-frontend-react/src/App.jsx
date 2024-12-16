import React from "react";
import Routes from '../src/routes/index'
import MenuNavBar from "./components/Layout/MenuNavBar";
import Footer from "./components/Layout/Footer";

export default function App() {
    return (
            <>
                <MenuNavBar />
                <Routes />
                <Footer />
            </>
        );
    }