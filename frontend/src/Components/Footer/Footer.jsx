import React from "react";

function Footer() {
    return (
        <footer className="footer mt-5 pt-5">
            <div className="footer-banner r1 resbutton  text-white text-center d-flex flex-column align-items-center justify-content-center">
                <h2 className="fw-bold">REGISTER FOR <span className="text-secondary">FREE</span></h2>
                <p className="r1">Register with us and win amazing discount points on<span className="text-secondary"> table bookings</span></p>
                <button className="btn btn-dark fw-bold px-4 mt-2 ">Register</button>
            </div>
            <div className="bg-dark text-white pt-4 pb-2 text-center">
                <h4 className="fw-bold mb-3 sansita">TableAhead</h4>
                <div className="mb-3 d-flex justify-content-center flex-wrap gap-4 resbutton">
                    <a href="#" className="text-white text-decoration-none">Service</a>
                    <a href="#" className="text-white text-decoration-none">About Us</a>
                    <a href="#" className="text-white text-decoration-none">Contact Us</a>
                    <a href="#" className="text-white text-decoration-none">FAQs</a>
                    <a href="#" className="text-white text-decoration-none">Sign In</a>
                </div>
                <div className="mb-3">
                    <i className="bi bi-facebook fs-4 me-3"></i>
                    <i className="bi bi-twitter fs-4 me-3"></i>
                    <i className="bi bi-instagram fs-4"></i>
                </div>
                <p className="text-secondary small sansita">TableAhead.com | All rights reserved</p>
            </div>
        </footer>
    );
}

export default Footer;
