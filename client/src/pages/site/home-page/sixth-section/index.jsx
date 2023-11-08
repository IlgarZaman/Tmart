import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import AOS from "aos";
import "aos/dist/aos.css";
const SixthSection = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div id="SixthSection">
      <div className="container">
        <div className="leftDiv">
          <div className="leftImg" data-aos="zoom-in">
            <div className="text">
              <h4>
                <Link to={"#"}>New Products</Link>
              </h4>
              <Link to={"/products"} className="shopNowBtn">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        <div className="rightDiv">
          <div className="topImg" data-aos="zoom-in">
            <div className="text">
              <h4>
                <Link to={"#"}>Latest Lamp</Link>
              </h4>
              <Link to={"/products"} className="shopNowBtn">
                Shop Now
              </Link>
            </div>
          </div>
          <div className="bottomImg" data-aos="zoom-in">
            <div className="bottomLeftImg">
              <div className="text">
                <h4>
                  <Link to={"#"}>Bag Collection</Link>
                </h4>
                <Link to={"/products"} className="shopNowBtn">
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="bottomRightImg" data-aos="zoom-in">
              <div className="text">
                <h4>
                  <Link to={"#"}>New Clock</Link>
                </h4>
                <Link to={"/products"} className="shopNowBtn">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SixthSection;
