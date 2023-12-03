import React from "react";
import Carousel from "nuka-carousel";
import { BASE_REACT } from "../../../utils/constants";
import { Button } from "semantic-ui-react";

export function CarouselHome() {
  const carouselStyle = {
    height: "450px",
    marginBottom: "50px",
  };

  const imageStyle = {
    width: "100%",
    height: "500px",
  };

  const buttonPrev = ({ previousSlide, previousDisabled }) => (
    <Button
      circular
      inverted
      disabled={previousDisabled}
      onClick={previousSlide}
      title={"Anterior"}
    >
      <i className="fa-duotone fa-arrow-left"></i>
    </Button>
  );

  const buttonNext = ({ nextDisabled, nextSlide }) => (
    <Button
      circular
      inverted
      disabled={nextDisabled}
      onClick={nextSlide}
      title={"Siguiente"}
    >
      <i className="fa-duotone fa-arrow-right"></i>
    </Button>
  );

  return (
    <Carousel
      autoplay={true}
      autoplayInterval={3000}
      wrapAround={true}
      style={carouselStyle}
      renderCenterLeftControls={buttonPrev}
      renderCenterRightControls={buttonNext}
    >
      <img
        src={`${BASE_REACT}/images/Slide 1.jpg`}
        style={imageStyle}
        alt="Slide 1"
      />
      <img
        src={`${BASE_REACT}/images/Slide 2.jpg`}
        style={imageStyle}
        alt="Slide 2"
      />
      <img
        src={`${BASE_REACT}/images/Slide 3.jpg`}
        style={imageStyle}
        alt="Slide 3"
      />
      <img
        src={`${BASE_REACT}/images/Slide 4.jpg`}
        style={imageStyle}
        alt="Slide 4"
      />
      <img
        src={`${BASE_REACT}/images/Slide 5.jpg`}
        style={imageStyle}
        alt="Slide 5"
      />
    </Carousel>
  );
}
