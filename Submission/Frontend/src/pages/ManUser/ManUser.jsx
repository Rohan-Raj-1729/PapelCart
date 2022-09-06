import React, { useState, useEffect } from "react";
import styles from "./ManUser.module.css";
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios";
import ManNav from "../../components/ManNav/ManNav";

function UserCard(props) {
    return (
        <div class="card" className={styles.card1}>
            <div class="card-body">
                <h5 class="card-title">{props.name}</h5>
                <h6 class="card-text" className={styles.il}>email ID : </h6><p class="card-text" >{props.email_id}</p>
                <h6 class="card-text" className={styles.il}>Phone Number : </h6><p class="card-text" >{props.phno}</p>
                <a href="#" class="btn btn-dark">Subscriptions</a>
            </div>
        </div>
    );
}

function uc(item) {
    return (<UserCard email_id={item.Email_Id} name={item.User_Name} phno={item.Phone_Number} />);
}

function ManUser(props) {
    const navigate = useNavigate();
    // const { state } = useLocation();
    const [usersField, setUser] = useState({
        users: []
    });
    useEffect(async () => {
        if (!props.isLoggedIn) {
            console.log(props);
            alert("Not logged in");
            navigate("/login");
        } else {
            console.log(props.email);
            await axios
                .post("http://localhost:3000/api/manUser")
                .then((res1) => {
                    console.log("res1", res1);
                    setUser(() => { return { users: res1.data.data } });
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, []);

    return (
        <div>
            <ManNav />
            <h1 className={styles.heading}>Users</h1>
            <div className={styles.grid2}>
                {usersField.users.map(uc)}
            </div>
        </div>
    );
}

export default ManUser;
