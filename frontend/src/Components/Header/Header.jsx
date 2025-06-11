import React from "react";
import { Link } from "react-router";
import Notifications from "../Customer/Notifications";

function Header() {
    return (
        <header className="head mb-4">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5 ">
                <span className="navbar-brand sansita">Table AHead</span>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto resbutton">
                          <li className="nav-item me-2 mt-2">
                            <Notifications />
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/restaurants">Home</Link>
                        </li>
                        <li className="nav-item me-2">
                            <Link className="nav-link" to="/restaurants/add">Add Restaurant</Link>
                        </li>
                        <li className="nav-item me-2">
                            <Link className="btn btn-dark" to="/Login">Sign</Link>
                        </li>
                         <li className="nav-item me-2">
                            <Link className="btn btn-secondary" to="/Dashboard">DashBoard</Link>
                        </li>
                      
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;
