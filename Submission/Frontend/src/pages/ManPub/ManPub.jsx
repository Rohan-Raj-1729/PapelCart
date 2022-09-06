import styles from "./ManPub.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ManNav from "../../components/ManNav/ManNav";

function PubCard(props) {
    console.log(props.imgSrc);
    return (
        <div class="card" className={styles.card1}>
            <img
                class="card-img-top"
                className={styles.pic}
                src={props.imgSrc}
                alt="Card cap"
            />
            <hr />
            <div class="card-body" className={"styles." + props.language}>
                <h5 class="card-title" className={styles.hh5}>
                    {props.name}
                </h5>
                <h6 class="card-text" className={styles.il}>
                    Language :{" "}
                </h6>
                <p class="card-text">{props.language}</p>
                <h6 class="card-text" className={styles.il}>
                    Type :{" "}
                </h6>
                <p class="card-text">{props.type}</p>
                <h6 class="card-text" className={styles.il}>
                    Number of Pages :{" "}
                </h6>
                <p class="card-text">{props.numPages}</p>
                <h6 class="card-text" className={styles.il}>
                    Price :{" "}
                </h6>
                <p class="card-text">{props.price}</p>
                <div className={styles.grid2}>
                    <button type="button" class="btn btn-outline-dark">
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
}

function ManPub(props) {
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
    function manCard(item) {
        return (
            <PubCard id={item.Publication_Id}
                imgSrc={require("../../utils/" + item.Publication_Name + ".jpg")}
                name={item.Publication_Name} language={item.Language} type={item.Type} price={item.Selling_Price} numPages={item.Pages} />
        );
    }
    return (
        <div>
            <ManNav />
            <div className={styles.grid3}>
                {pubs.name.map(manCard)}
            </div>
        </div>
    );
}
export default ManPub;
