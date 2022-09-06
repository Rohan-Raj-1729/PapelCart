import React, { useState, useEffect } from "react";
import styles from "./Subscribe.module.css"
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import UserNav from "../../components/UserNav/UserNav";

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



function Subscribe(props) {
    const navigate = useNavigate();
    const locate = useLocation();
    var publicationId;
    const [user, setUser] = useState({
        address: "",
        city: "",
        state: "",
        zip: "",
        startDate: "",
        duration: ""
    });
    useEffect(() => {
        publicationId = locate.state.publication_Id;
    });

    function handleChange(event) {
        const InputValue = event.target.value;
        const InputId = event.target.id;
        setUser((prevValue) => {
            if (InputId === "inputAddress") {
                return { address: InputValue, city: prevValue.city, state: prevValue.state, zip: prevValue.zip, startDate: prevValue.startDate, duration: prevValue.duration }
            } else if (InputId === "inputCity") {
                return { address: prevValue.address, city: InputValue, state: prevValue.state, zip: prevValue.zip, startDate: prevValue.startDate, duration: prevValue.duration }
            }
            else if (InputId === "inputState") {
                return { address: prevValue.address, city: prevValue.city, state: InputValue, zip: prevValue.zip, startDate: prevValue.startDate, duration: prevValue.duration }
            }
            else if (InputId === "inputZip") {
                return { address: prevValue.address, city: prevValue.city, state: prevValue.state, zip: InputValue, startDate: prevValue.startDate, duration: prevValue.duration }
            }
            else if (InputId === "inputStartDate") {
                return { address: prevValue.address, city: prevValue.city, state: prevValue.state, zip: prevValue.zip, startDate: InputValue, duration: prevValue.duration }
            }
            else if (InputId === "inputDuration") {
                return { address: prevValue.address, city: prevValue.city, state: prevValue.state, zip: prevValue.zip, startDate: prevValue.startDate, duration: InputValue }
            }
        });
    }

    function addUser(event) {
        event.preventDefault();
        var sendData = {
            address: user.address + ", " + user.city + ", " + user.state + ", PIN : " + user.zip,
            startDate: user.startDate,
            duration: user.duration,
            userEmail: props.email,
            publicationId: publicationId
        }
        axios
            .post("http://localhost:3000/api/subscribe", sendData)
            .then((res) => {
                // console.log(res.data);
                if (res.data.status === 400) {
                    alert("Error in Subscribing!!");
                } else {
                    alert("Successfully Subscribed");
                    navigate("/user");
                }
            });
    }


    return (
        <div>
            <UserNav />
            <form action="/register" method="post" class="row g-3" className={styles.total}>
                <div class="col-12">
                    <label class="form-label">Address</label>
                    <input type="text" value={user.address} class="form-control" id="inputAddress" onChange={handleChange} placeholder="1234 Main St" />
                </div>
                <div className={styles.grid3}>
                    <div class="col-md-9">
                        <label for="inputCity" class="form-label">City</label>
                        <input type="text" value={user.city} onChange={handleChange} class="form-control" id="inputCity" />
                    </div>
                    <div class="col-md-9">
                        <label for="inputState" class="form-label">State</label>
                        <select id="inputState" onChange={handleChange} value={user.state} class="form-select">
                            <option selected>Choose...</option>
                            {indianStates.map((item, index) => {
                                return <option key={index}>{item.name}</option>
                            })}
                        </select>
                    </div>
                    <div class="col-md-9">
                        <label for="inputZip" class="form-label">Zip</label>
                        <input type="text" onChange={handleChange} value={user.zip} class="form-control" id="inputZip" />
                    </div>
                </div>

                <div class="col-md-9">
                    <label for="inputStartDate" class="form-label">Start Date</label>
                    <input type="date" onChange={handleChange} value={user.startDate} class="form-control" id="inputStartDate" />
                </div>

                <div class="col-md-9">
                    <label for="inputDuration" class="form-label">Duration (in months)</label>
                    <input type="number" onChange={handleChange} value={user.duration} class="form-control" id="inputDuration" />
                </div>

                <div class="col-md-6" className={styles.btnReg}>
                    <button type="submit" onClick={addUser} class="btn btn-dark">Subscribe</button>
                </div>
            </form>
        </div>
    );
}

export default Subscribe;