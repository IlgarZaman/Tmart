import React, { useEffect } from "react";
import "./index.scss";
import banner1 from "../../../../assets/banner-1.jpg";
import banner2 from "../../../../assets/banner-2.jpg";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
const SecondSection = () => {
  const banner1style = {
    backgroundImage: `url(${banner1})`,
  };
  const banner2style = {
    backgroundImage: `url(${banner2})`,
  };
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div id="secondSection">
      <div className="container">
        <div className="mainDiv">
          <div
            className="productCollection "
            style={banner1style}
            data-aos="zoom-in"
          >
            <div className="textDiv">
              <Link to={"#"}>
                <h2>New Product Collection</h2>
              </Link>
              <Link to={"/products"} className="shopNowBtn">
                Shop Now
              </Link>
            </div>
          </div>
          <div
            className="basketCollection"
            style={banner2style}
            data-aos="zoom-in"
          >
            <div className="textDiv">
              <Link to={"#"}>
                <h2>Basket Collection</h2>
              </Link>
              <Link to={"/products"} className="shopNowBtn">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
