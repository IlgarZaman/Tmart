import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../swiper.css";
import "./index.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import slider1 from "../../../../assets/slider_1.png";
import slider2 from "../../../../assets/slider_2.png";
import { Link } from "react-router-dom";
const FirstSection = () => {
  const slider1Style = {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${slider1})`,
  };
  const slider2Style = {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${slider2})`,
  };
  return (
    <div id="firstSection">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Navigation, Autoplay]}
        navigation={true}
        className="mySwiper"
        
      >
        <SwiperSlide className="swiperSlide firstSwiper" style={slider1Style}>
          <div className="sliderInner firstSlider">
            <h1>
              New Product
              <span className="textTheme"> Collection</span>
            </h1>
            <div className="sliderBtn">
              <Link to={"/products"}>Shop Now</Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiperSlide" style={slider2Style}>
          <div className="sliderInner secondSlider">
            <h1>
              New Product
              <span className="textTheme"> Collection</span>
            </h1>
            <div className="sliderBtn">
              <Link to={"/products"}>Shop Now</Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="homeFirstSectionText">
        <h1>
          New Product
          <span className="textTheme"> Collection</span>
        </h1>
        <div className="sliderBtn">
          <Link to={"/products"}>Shop Now</Link>
        </div>
      </div>
    </div>
  );
};

export default FirstSection;
