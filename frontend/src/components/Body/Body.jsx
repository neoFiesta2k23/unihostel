import React from "react";
import Header from "../header/Header";
import Footer from "../Footer/Footer";
import Body1 from "./body1/Body1";
import Body2 from "./body2/Body2";
import Gallery from "./Gallery/Gallery";


const Body = () => {
  return (
    <>
      <div className="body">
        <Header />
        <Body1 />
        <Body2 />
        <Gallery />
        <Footer />
      </div>
    </>
  );
};

export default Body;
