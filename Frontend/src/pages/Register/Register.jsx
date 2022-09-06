import React, { useState } from "react";
import styles from "./Register.module.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

var indianStates = [
    {
        "key": "AN",
        "name": "Andaman and Nicobar Islands"
    },
    {
        "key": "AP",
        "name": "Andhra Pradesh"
    },
    {
        "key": "AR",
        "name": "Arunachal Pradesh"
    },
    {
        "key": "AS",
        "name": "Assam"
    },
    {
        "key": "BR",
        "name": "Bihar"
    },
    {
        "key": "CG",
        "name": "Chandigarh"
    },
    {
        "key": "CH",
        "name": "Chhattisgarh"
    },
    {
        "key": "DH",
        "name": "Dadra and Nagar Haveli"
    },
    {
        "key": "DD",
        "name": "Daman and Diu"
    },
    {
        "key": "DL",
        "name": "Delhi"
    },
    {
        "key": "GA",
        "name": "Goa"
    },
    {
        "key": "GJ",
        "name": "Gujarat"
    },
    {
        "key": "HR",
        "name": "Haryana"
    },
    {
        "key": "HP",
        "name": "Himachal Pradesh"
    },
    {
        "key": "JK",
        "name": "Jammu and Kashmir"
    },
    {
        "key": "JH",
        "name": "Jharkhand"
    },
    {
        "key": "KA",
        "name": "Karnataka"
    },
    {
        "key": "KL",
        "name": "Kerala"
    },
    {
        "key": "LD",
        "name": "Lakshadweep"
    },
    {
        "key": "MP",
        "name": "Madhya Pradesh"
    },
    {
        "key": "MH",
        "name": "Maharashtra"
    },
    {
        "key": "MN",
        "name": "Manipur"
    },
    {
        "key": "ML",
        "name": "Meghalaya"
    },
    {
        "key": "MZ",
        "name": "Mizoram"
    },
    {
        "key": "NL",
        "name": "Nagaland"
    },
    {
        "key": "OR",
        "name": "Odisha"
    },
    {
        "key": "PY",
        "name": "Puducherry"
    },
    {
        "key": "PB",
        "name": "Punjab"
    },
    {
        "key": "RJ",
        "name": "Rajasthan"
    },
    {
        "key": "SK",
        "name": "Sikkim"
    },
    {
        "key": "TN",
        "name": "Tamil Nadu"
    },
    {
        "key": "TS",
        "name": "Telangana"
    },
    {
        "key": "TR",
        "name": "Tripura"
    },
    {
        "key": "UK",
        "name": "Uttar Pradesh"
    },
    {
        "key": "UP",
        "name": "Uttarakhand"
    },
    {
        "key": "WB",
        "name": "West Bengal"
    }
];



function Register(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        phno: "",
        email: "",
        password: ""
    });


    function handleChange(event) {
        const InputValue = event.target.value;
        const InputId = event.target.id;
        setUser((prevValue) => {
            if (InputId === "inputEmail1") {
                return { email: InputValue, password: prevValue.password, username: prevValue.username, phno: prevValue.phno }
            } else if (InputId === "inputPassword1") {
                return { email: prevValue.email, password: InputValue, username: prevValue.username, phno: prevValue.phno }
            }
            else if (InputId === "inputName1") {
                return { email: prevValue.email, password: prevValue.password, username: InputValue, phno: prevValue.phno }
            }
            else if (InputId === "inputPhNo1") {
                return { email: prevValue.email, password: prevValue.password, username: prevValue.username, phno: InputValue }
            }
        });
    }

    function addUser(event) {
        event.preventDefault();
        console.log(user);
        axios
            .post("http://localhost:3000/api/register", user)
            .then((res) => {
                // console.log(res.data);
                if (res.data.status === 400) {
                    alert("Error in Signing Up!!");
                } else {
                    alert("Successfully Registered");
                    props.LogIn(user.email);
                    navigate("/user", { state: user });
                }
            });
    }


    return (
        <form action="/register" method="post" class="row g-3" className={styles.total}>
            <div className={styles.grid2}>
                <div class="col-md-12">
                    <label class="form-label">Name</label>
                    <input onChange={handleChange} value={user.username} type="text" class="form-control" id="inputName1" />
                </div>
                <div class="col-md-12">
                    <label class="form-label">Phone Number</label>
                    <input onChange={handleChange} value={user.phno} type="tel" class="form-control" id="inputPhNo1" />
                </div>
            </div>
            <div className={styles.grid2}>
                <div class="col-md-12">
                    <label class="form-label">Email</label>
                    <input onChange={handleChange} value={user.email} type="email" class="form-control" id="inputEmail1" />
                </div>
                <div class="col-md-12">
                    <label class="form-label">Password</label>
                    <input onChange={handleChange} value={user.password} type="password" class="form-control" id="inputPassword1" />
                </div>
            </div>
            <div class="col-12">
                <label class="form-label">Address</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" />
            </div>
            <div className={styles.grid3}>
                <div class="col-md-9">
                    <label for="inputCity" class="form-label">City</label>
                    <input type="text" class="form-control" id="inputCity" />
                </div>
                <div class="col-md-9">
                    <label for="inputState" class="form-label">State</label>
                    <select id="inputState" class="form-select">
                        <option selected>Choose...</option>
                        {indianStates.map((item, index) => {
                            return <option key={index}>{item.name}</option>
                        })}

                    </select>
                </div>
                <div class="col-md-9">
                    <label for="inputZip" class="form-label">Zip</label>
                    <input type="text" class="form-control" id="inputZip" />
                </div>
            </div>
            <div class="col-md-6" className={styles.btnReg}>
                <button type="submit" onClick={addUser} class="btn btn-dark">Register</button>
            </div>
        </form>
    );
}

export default Register;