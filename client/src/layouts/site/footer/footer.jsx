import React from "react";
import "./footer.scss";
import logoImg from "../../../assets/logo_medium.png";
import { Link } from "react-router-dom";
const SiteFooter = () => {
  return (
    <div id="siteFooter">
      <div className="mainDiv">
        <div className="container centerDiv">
          <div className="firstDouble">
            <div className="information">
              <div className="logo">
                <Link to={"/"}>
                  <img src={logoImg} alt="Footer Logo" />
                </Link>
              </div>
              <div className="address">
                <i className="zmdi zmdi-pin"></i>
                <p>Your address or location goes here</p>
              </div>
              <div className="mail">
                <i className="zmdi zmdi-email"></i>
                <p>info@example.com</p>
              </div>
              <div className="phone">
                <i className="zmdi zmdi-phone-in-talk"></i>
                <p>+012 345 678 102</p>
              </div>
              <div className="logos">
                <div className="facebook">
                  <a href="https://facebook.com/" target={"_blank"}>
                    <i className="zmdi zmdi-facebook"></i>
                  </a>
                </div>
                <div className="googlePlus">
                  <a href="https://currents.google.com/up" target={"_blank"}>
                    <i className="zmdi zmdi-google-plus"></i>
                  </a>
                </div>
                <div className="twitter">
                  <a href="https://twitter.com/" target={"_blank"}>
                    <i className="zmdi zmdi-twitter"></i>
                  </a>
                </div>
                <div className="instagram">
                  <a href="https://instagram.com/" target={"_blank"}>
                    <i className="zmdi zmdi-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="categories">
              <div className="title">
                <h2>Categories</h2>
              </div>
              <div className="footerCategories">
                <ul>
                  <li>
                    <Link to={"#"}>Men</Link>
                  </li>
                  <li>
                    <Link to={"#"}>Women</Link>
                  </li>
                  <li>
                    <Link to={"#"}>Accessories</Link>
                  </li>
                  <li>
                    <Link to={"#"}>Shoes</Link>
                  </li>
                  <li>
                    <Link to={"#"}>Dress</Link>
                  </li>
                  <li>
                    <Link to={"#"}>Denim</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="secondDouble">
            <div className="information">
              <div className="title">
                <h2>Information</h2>
              </div>
              <div className="footerInformation">
                <ul>
                  <li>
                    <Link to={"#"}>About Us</Link>
                  </li>
                  <li>
                    <Link to={"#"}>Contact Us</Link>
                  </li>
                  <li>
                    <Link to={"#"}>Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to={"#"}>Returns & Exchanges</Link>
                  </li>
                  <li>
                    <Link to={"#"}>Shipping & Delivery</Link>
                  </li>
                  <li>
                    <Link to={"#"}>Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="newslatter">
              <div className="title">
                <h2>Newsletter</h2>
              </div>
              <div className="footerCategories">
                <p>
                  Subscribe to our newsletter and get 10% off on your first
                  purchase .
                </p>
                <div className="newsletterInput">
                  <form className="newsletterForm">
                    <input
                      type="mail"
                      placeholder="Email Address"
                      fdprocessedid="ea4n1"
                      required
                      name="mail"
                    />
                    <button type="submit">
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="endWrite container">
          <p>Copyright © TMART All Right Reserved.</p>
          <ul>
            <li>
              <Link to={"#"}>Home</Link>
            </li>
            <li>
              <Link to={"#"}>Product</Link>
            </li>
            <li>
              <Link to={"#"}>Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SiteFooter;
