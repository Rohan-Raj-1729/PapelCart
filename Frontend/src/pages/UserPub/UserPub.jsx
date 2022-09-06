import React, { useState, useEffect } from "react";
import PubCard from "../../components/PubCard/PubCard";
import UserNav from "../../components/UserNav/UserNav";
import styles from "./UserPub.module.css";
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios";

function UserPub(props) {
    const navigate = useNavigate();
    // const { state } = useLocation();
    const [pubs, setPubs] = useState({
        name: []
    });
    useEffect(async () => {
        if (!props.isLoggedIn) {
            console.log(props);
            alert("Not logged in");
            navigate("/login");
        } else {
            await axios
                .post("http://localhost:3000/api/userPub")
                .then((res1) => {
                    if (res1.data.status === 400) {
                        alert("No Publications found!");
                        navigate("/user");
                    } else if (res1.data.status === 500) {
                        alert("Server Error");
                    }
                    else if (!props.isLoggedIn) {
                        alert("You have to first login!");
                        navigate("/login");
                    }
                    else {
                        console.log("res1", res1);
                        setPubs(() => { return { name: res1.data.data } });
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, []);
    function pubCard(item) {
        return (
            <PubCard id={item.Publication_Id} imgSrc={require("../../utils/" + item.Publication_Name + ".jpg")} name={item.Publication_Name} language={item.Language} type={item.Type} price={item.Selling_Price} numPages={item.Pages} />
        );
    }
    return (
        <div>
            <UserNav />
            <h1 className={styles.heading}>Available Publications</h1>
            <div className={styles.grid3}>
                {pubs.name.map(pubCard)}
                {/* <PubCard imgSrc={require("../../utils/toi.jpg")} name="Times of India" language="English" type="Magazine" price="4.00" />
                <PubCard imgSrc={require("../../utils/eenadu.jpg")} name="Eenadu" language="Telugu" type="Newspaper" price="5.50" /> */}
            </div>
        </div>
    );
};

export default UserPub;