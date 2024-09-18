import { useEffect, useState } from "react";
import "./banner.css";
import img1 from "./images2/img6.jpg";
import img2 from "./images2/img5.jpg";
import img3 from "./images2/img3.jpg";
import img4 from "./images2/img4.jpg";
import { Link } from "react-router-dom";

const MagicBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isNext, setIsNext] = useState(false);
  const [isPrev, setIsPrev] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 3 ? 0 : prevSlide + 1));
    setIsNext(true);
    setIsPrev(false);
    setTimeout(() => {
      setIsNext(false);
    }, 500); // Animation duration
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 3 : prevSlide - 1));
    setIsPrev(true);
    setIsNext(false);
    setTimeout(() => {
      setIsPrev(false);
    }, 500); // Animation duration
  };

  // Automatically click next slide after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 3500); // 3.5 seconds

    return () => clearTimeout(timer);
  }, [currentSlide]); // Re-run effect when currentSlide changes

  return (
    <div className="mt-12 lg:mt-10 font-poppins">
      <div
        className={`carousel ${isNext ? "next" : ""} ${isPrev ? "prev" : ""}`}
      >
        <div className="list">
          {[img1, img2, img3, img4].map((img, index) => (
            <div
              className="item"
              key={index}
              style={{ display: currentSlide === index ? "block" : "none" }}
            >
              <img
                className="brightness-[0.30]"
                src={img}
                alt={`Slide ${index + 1}`}
              />

              <div className="content">
                <div>
                  <div className="my-5">
                    <h1 className="text-3xl lg:text-6xl font-bold text-slate-200">
                      Unlock Your Career
                    </h1>
                  </div>
                  <div className="my-5">
                    <h1 className="drop-shadow-2xl text-blue-600 text-5xl lg:text-7xl font-bold">
                      Register Now!
                    </h1>
                  </div>
                  <div className="w-2/3 hidden lg:flex ">
                    <p className="text-slate-200 text-xl">
                      Explore opportunities from across the globe to learn,
                      showcase skills, participate in events, hackathons, &
                      achieve your dreams.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-14 text-black bg-white font-medium rounded-lg text-lg px-7 py-2 text-center  mb-2"
                >
                  See More
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Thumbnails */}
        <div className="thumbnail">
          {[img1, img2, img3, img4].map((img, index) => (
            <div
              key={index}
              className={`item ${
                currentSlide === index
                  ? "border-4 rounded-3xl border-blue-600"
                  : ""
              }`}
              onClick={() => setCurrentSlide(index)}
            >
              <img src={img} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
        {/* Arrows */}
        <div className="arrows">
          <button id="prev" onClick={prevSlide}>
            {"<"}
          </button>
          <button id="next" onClick={nextSlide}>
            {">"}
          </button>
        </div>
        <div className="time"></div>
      </div>
    </div>
  );
};

export default MagicBanner;
