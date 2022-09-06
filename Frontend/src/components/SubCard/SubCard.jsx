import styles from "./SubCard.module.css";
import React from "react";

function SubCard(props) {
    return (
        <div class="card" className={styles.card1}>
            <img class="card-img-top" src={props.imgSrc} alt="Card cap" />
            <div class="card-body">
                <h5 class="card-title">{props.pubName}</h5>
                <h6 class="card-text" className={styles.il}>Expires on : </h6><p class="card-text" >{props.expiry}</p>
                <h6 class="card-text" className={styles.il}>Deliver to : </h6><p class="card-text" >{props.address}</p>
                <a href="#" class="btn btn-dark">Details</a>
            </div>
        </div>
    );
}

export default SubCard;