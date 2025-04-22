import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "./Gallery.css"; // Optional for your own styles
import "swiper/css/navigation";
import "swiper/css/pagination";

import photo0 from "../../assets/images/photo0.jpg";
import photo01 from "../../assets/images/photo01.jpg";
import photo1 from "../../assets/images/photo1.jpg";
import photo2 from "../../assets/images/photo2.jpg";
import photo4 from "../../assets/images/photo4.jpg";

// import photo0 from'../src/components/assets/images/photo0.jpg'
// import photo01 from "../src/components/assets/images/photo01.jpg";
// import photo1 from "../src/components/assets/images/photo1.jpg";
// import photo2 from "../src/components/assets/images/photo2.jpg";
// import photo4 from "../src/components/assets/images/photo4.jpg";
const Gallery = () => {
  return (
    <div className="gallery-maindiv">
      <div className="gallery-text">
        <h2>Gallery</h2>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={true}
        slidesPerView={1}
        spaceBetween={30}
        navigation
        pagination={{ clickable: true }}
        // autoplay={{ delay: 3500, disableOnInteraction: false }}
        className="custom-swiper"
        
      >
        <SwiperSlide>
          <div className="main-slidediv">
            <img src={photo0} alt="Slide 0" className="slide-image" />
            <div className="slide-text">
              <h2>WELCOME TO UNIHOSTEL</h2>
              <p>
                where comfort meets community. A perfect blend of safety, study,
                and student life.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="main-slidediv">
            <img src={photo01} alt="Slide 0" className="slide-image" />
            <div className="slide-text">
              <h2>OUR HOSTEL</h2>
              <p>
                The University has a fully furnished hostel equipped with round
                the clock electricity, Wi-Fi connection, entertainment
                facilities, geysers, coolers and best quality water purifiers
                etc. Reading rooms and additional sports facilities like
                table-tennis, chess and carom etc. are also available in the
                hostel
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="main-slidediv">
            <img src={photo1} alt="Slide 1" className="slide-image" />
            <div className="slide-text">
              <h2>ROOMS</h2>
              <p>
                Spacious, well-furnished, and student-friendly — each room at
                Unihostel is built for comfort and focus. A peaceful space to
                rest, study, and feel right at home.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="main-slidediv">
          <img src={photo2} alt="Slide 2" className="slide-image" />
          <div className="slide-text">
            <h2>PLAYROOM</h2>
            <p>
              For relaxation and fun, our hostel rooms include indoor games like
              carrom and chess. It’s the perfect way to unwind and bond with
              roommates after a long day.
            </p>
          </div>
          </div>
         
        </SwiperSlide>
        <SwiperSlide>
          <div className="main-slidediv">
            <img src={photo4} alt="Slide 4" className="slide-image" />
            <div className="slide-text">
              <h2>HOSTEL CORRIDOR</h2>
              <p>
                The spacious corridors of Unihostel are well-lit and designed
                for easy movement. With a welcoming atmosphere, they serve as a
                hub for casual interactions and connecting with fellow
                residents.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Gallery;
