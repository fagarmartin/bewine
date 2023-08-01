import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import carrusel1Img from "../assets/carrusel1.jpg";
import carrusel2Img from "../assets/carrusel2.jpg";
import carrusel3Img from "../assets/carrusel3.jpg";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carrusel1Img}
          alt="First slide"
          height={300}
        />
        <Carousel.Caption>
          <h3>Disfruta con los cinco sentidos</h3>
          <p>De las mejores bodegas a tu mesa</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carrusel2Img}
          alt="Second slide"
          height={300}
        />

        <Carousel.Caption>
          <h3>La mejor selección de vinos</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carrusel3Img}
          alt="Third slide"
          height={300}
        />

        <Carousel.Caption>
          <h3>Viñedos cuidados con mucho cariño</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
