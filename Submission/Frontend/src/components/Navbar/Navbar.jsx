import styles from "./Navbar.module.css";
import logo from "../../utils/logo.png";
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light" className={styles.total}>
            <a class="navbar-brand" href="#"> <img className={styles.logo} src={logo} alt="PapelCart" /> </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="ms-auto navbar-nav mr-auto nav-right">
                    <li class=" nav-item active" className={styles.right}>
                        <button type="button" class="btn-lg btn-dark" onClick={() => {
                            navigate("/login");
                        }}> Login/Register </button>
                    </li>
                    {/* <li class="nav-item">
                        <a class="nav-link" href="#">Publications</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Login</a>
                    </li> */}
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;