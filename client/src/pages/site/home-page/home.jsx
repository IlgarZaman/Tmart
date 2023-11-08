import React from "react";
import { Helmet } from "react-helmet-async";
import SiteHeader from "../../../layouts/site/header/header";
import FifthSection from "./fifth-section";
import FirstSection from "./first-section";
import FourthSection from "./fourth-section/fourth-section";
import SecondSection from "./second-section";
import SixthSection from "./sixth-section";
import ThirdSection from "./third-section";

const Home = () => {
  return (
    <div id="home">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Tmart - Online Store</title>
      </Helmet>
      <SiteHeader />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixthSection/>
    </div>
  );
};

export default Home;
