import React from 'react'
import "./Navbar.css"
import { useHistory } from "react-router-dom";


export default function Navbar() {

    const history = useHistory();

    function redirectToUpdateUserPage(){
        history.push("/user/modifyUser")
    }

    function clearLocalStorage() {
        localStorage.clear();
        history.push("/")
    }
    function toRegisterAdvertisement() {
        localStorage.clear();
        history.push("/registerAdvertisement")
    }
    let data_page = JSON.parse(localStorage.getItem("data"));

    return (
        <header>
            <div>
                <div class="container">
                    <img src="#" alt="logo" class="logo" />
                    <nav>
                        <ul>
                        <li><span onClick={redirectToUpdateUserPage}>{data_page!==null && data_page[0].firstName}</span></li>
                        {data_page!==null && data_page[0].role===3 && <li>
                          <span onClick={toRegisterAdvertisement}>POST</span></li>}
                        <li onClick={clearLocalStorage}><span style={{ cursor: "pointer" }} > Log out</span></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>

    )
}