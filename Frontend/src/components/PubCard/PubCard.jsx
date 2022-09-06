import styles from "./PubCard.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";


function PubCard(props) {
    const navigate = useNavigate();
    function handleSubscribe(event) {
        // console.log(event.target.id);
        navigate("/subscribe", { state: { publication_Id: event.target.id } });
    }

    return (
        <div class="card" className={styles.card1}>
            <img class="card-img-top" className={styles.pic} src={props.imgSrc} alt="Card cap" />
            <hr />
            <div class="card-body" className={"styles." + props.language}>
                <h5 class="card-title" className={styles.hh5}>{props.name}</h5>
                <h6 class="card-text" className={styles.il}>Language : </h6><p class="card-text" >{props.language}</p>
                <h6 class="card-text" className={styles.il}>Type : </h6><p class="card-text" >{props.type}</p>
                <h6 class="card-text" className={styles.il}>Number of Pages : </h6><p class="card-text" >{props.numPages}</p>
                <h6 class="card-text" className={styles.il}>Price : </h6><p class="card-text" >{props.price}</p>
                <div className={styles.grid2}>
                    <button type="button" class="btn btn-outline-dark">Details</button>
                    <button type="button" class="btn btn-dark" id={props.id} onClick={handleSubscribe}>Subscribe</button>
                </div>
            </div>
        </div >
    );
}

export default PubCard;