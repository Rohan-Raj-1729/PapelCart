import styles from "./User.module.css";
import React, { useState, useEffect } from "react";
import SubCard from "../../components/SubCard/SubCard";
import { useLocation, useNavigate } from "react-router-dom"
import UserNav from "../../components/UserNav/UserNav";
import axios from "axios"

function User(props) {
    const navigate = useNavigate();
    // const { state } = useLocation();
    const [nameField, setName] = useState({
        name: "",
        subs: []
    });
    useEffect(async () => {
        if (!props.isLoggedIn) {
            console.log(props);
            alert("Not logged in");
            navigate("/login");
        } else {
            console.log(props.email);
            await axios
                .post("http://localhost:3000/api/user", { email: props.email })
                .then((res1) => {
                    if (res1.data.status === 400) {
                        alert("User Not Found!! Please Register");
                        navigate("/login");
                    } else if (res1.data.status === 500) {
                        alert("Server Error");
                    }
                    else {
                        props.LogIn(props.email);
                        console.log("res1", res1);
                        setName((prevValue) => { return { name: res1.data.data[0].User_Name, subs: prevValue.subs } });
                    }
                })
                .catch((err) => {
                    console.error(err);
                });

            await axios
                .post("http://localhost:3000/api/userSubs", { email: props.email })
                .then((res1) => {
                    console.log("res1", res1);
                    // cores1.data
                    setName((prevValue) => { return { name: prevValue.name, subs: res1.data.data } });
                    // }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, []);
    console.log(nameField.name);
    // console.log(nameField.subs[0].Publication_Name);
    function handleSub(item) {
        return <SubCard imgSrc={require("../../utils/" + item.Publication_Name + ".jpg")} address={item.Address} pubName={item.Publication_Name} />
    }
    console.log(nameField.subs);
    return (
        <div>
            <UserNav name={nameField.name} />
            <h1 className={styles.heading}>Your Subscriptions</h1>
            <div className={styles.Cards}>
                {nameField.subs.map(handleSub)}
            </div>
        </div>
    );
}

export default User;