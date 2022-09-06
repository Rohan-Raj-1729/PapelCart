import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"

function Login(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });


    function checkManagerCredentials(event) {
        event.preventDefault();
        const { email, password } = user;
        if (email && password) {
            axios
                .post("http://localhost:3000/api/manager", user)
                .then((res) => {
                    console.log("res", res.data)
                    if (res.data.status === 400) {
                        alert("User Not Found!! Please Register");
                    } else if (res.data.status === 500) {
                        alert("Server Error");
                    }
                    else {
                        alert("Succesfully logged in");
                        props.LogIn(email);
                        navigate("/manager");
                    }
                });
        } else {
            alert("Invalid Input");
        }
    }

    function checkCredentials(event) {
        event.preventDefault();
        const { email, password } = user;
        if (email && password) {
            axios
                .post("http://localhost:3000/api/login", user)
                .then((res) => {
                    console.log("res", res.data)
                    if (res.data.status === 400) {
                        alert("User Not Found!! Please Register");
                    } else if (res.data.status === 500) {
                        alert("Server Error");
                    }
                    else {
                        alert("Succesfully logged in");
                        props.LogIn(email);
                        navigate("/user");
                    }
                });
        } else {
            alert("Invalid Input");
        }
    }
    function handleChange(event) {
        const InputValue = event.target.value;
        const InputType = event.target.type;
        setUser((prevValue) => {
            if (InputType === "email") {
                return { email: InputValue, password: prevValue.password }
            } else if (InputType === "password") {
                return { email: prevValue.email, password: InputValue }
            }
        });
    }
    return (
        <form class="row g-3" className={styles.total}>
            <br />
            <div class="col-md-6">
                <label for="inputEmail" class="form-label">Email</label>
                <input value={user.email} onChange={handleChange} type="email" class="form-control" id="inputEmail4" placeholder="Enter your email ID" />
            </div>
            <br />
            <div class="col-md-6">
                <label for="inputPassword" class="form-label">Password</label>
                <input value={user.password} onChange={handleChange} type="password" class="form-control" id="inputPassword4" placeholder="Enter your password" />
            </div>
            <br />


            <div class="col-12" className={styles.regBtn}>
                <button onClick={checkCredentials} class="btn btn-dark">Sign in</button>
            </div>
            <div class="col-12" className={styles.regBtn}>
                <button onClick={checkManagerCredentials} class="btn btn-dark">Manager Sign in</button>
            </div>
            <div class="col-12" className={styles.regBtn}>
                <button class="btn btn-dark" onClick={() => {
                    navigate("/register");
                }}>Create New Account</button>
            </div>
        </form>
    );
}

export default Login;
