import styles from "./Navbar.modules.css";
import logo from "../../utils/logo.png";

function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light center total">
            <a class="navbar-brand" href="#"> <img class="logo" src={logo} alt="PapelCart" /> </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="navbarText">
                <ul class="ms-auto navbar-nav mr-auto nav-right">
                    <li class=" nav-item active">
                        <button type="button" class="btn-lg btn-dark" href="login"> Login/Register </button>
                    </li>
                    {/* <li class="nav-item">
                        <a class="nav-link" href="#">Publications</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Login</a>
                    </li> */}
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;