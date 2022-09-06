import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import User from "./pages/User/User"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import UserPub from "./pages/UserPub/UserPub";
import Manager from "./pages/Manager/Manager";
import ManUser from "./pages/ManUser/ManUser";
import ManPub from "./pages/ManPub/ManPub";
import Subscribe from "./pages/Subscribe/Subscribe";

function App() {
    const [isLoggedIn, setLog] = useState(false);
    const [email, setEmail] = useState("");
    function LogIn(email) {
        setEmail(email);
        setLog(true);
    }
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navbar />} />
                <Route path="/login" element={<div><Navbar /><Login LogIn={LogIn} /></div>} />
                <Route path="/register" element={<div><Navbar /><Register LogIn={LogIn} /></div>} />
                <Route path="/user" element={<div><User isLoggedIn={isLoggedIn} email={email} /></div>} />
                <Route path="/manager" element={<Manager isLoggedIn={isLoggedIn} email={email} />} />
                <Route path="/userPub" element={<UserPub isLoggedIn={isLoggedIn} />} />
                <Route path="/manUser" element={<ManUser isLoggedIn={isLoggedIn} />} />
                <Route path="/manPub" element={<ManPub isLoggedIn={isLoggedIn} />} />
                <Route path="/subscribe" element={<Subscribe isLoggedIn={isLoggedIn} email={email} />} />
            </Routes>
        </Router>
    );
};

export default App;