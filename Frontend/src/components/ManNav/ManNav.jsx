import styles from "./ManNav.module.css";
import logo from "../../utils/logo.png";
import React from "react";
import { useNavigate } from "react-router-dom";

function ManNav(props) {
    const navigate = useNavigate();
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light" className={styles.total}>
            <a class="navbar-brand" onClick={() => {
                navigate("/login");
            }} href="#"> <img className={styles.logo} src={logo} alt="PapelCart" /> </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="ms-auto navbar-nav mr-auto nav-right">
                    <li class=" nav-item active" className={styles.right}>
                        <h4>Manager Page</h4>
                    </li>
                </ul>
            </div>
        </nav >
    );
}


export default ManNav;