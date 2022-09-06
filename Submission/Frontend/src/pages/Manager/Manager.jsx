import React, { useState, useEffect } from "react";
import ManNav from "../../components/ManNav/ManNav";
import styles from "./Manager.module.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Manager(props) {
    const navigate = useNavigate();
    // const { state } = useLocation();
    const [nameField, setName] = useState({
        name: ""
    });
    useEffect(async () => {
        if (!props.isLoggedIn) {
            console.log(props);
            alert("Not logged in");
            navigate("/login");
        } else {
            console.log(props.email);
            await axios
                .post("http://localhost:3000/api/manager", { email: props.email })
                .then((res1) => {
                    console.log("res1", res1);
                    setName(() => { return { name: res1.data.data[0].User_Name } });
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, []);
    return (
        <div>
            <ManNav />
            <div className={styles.grid1}>
                <button type="button" onClick={() => {
                    navigate("/manPub");
                }} class="btn btn-dark btn-lg btn-block">Publications</button>
                <button type="button" class="btn btn-dark btn-lg btn-block">Deliverers</button>
                <button type="button" onClick={() => {
                    navigate("/manUser");
                }} class="btn btn-dark btn-lg btn-block">Users</button>
            </div>
        </div>
    );
}

export default Manager;