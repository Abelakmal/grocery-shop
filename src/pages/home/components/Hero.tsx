import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Hero = () => {
  const aspectRatio = 56.25;

  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-5 pt-20 relative z-10">
        <div
          className="relative w-full"
          style={{ paddingTop: `${aspectRatio}%` }}
        >
          <Carousel
            className="absolute top-0 left-0 w-full h-full" showArrows={false} showStatus={false} showThumbs={false} autoPlay={true} infiniteLoop={true} interval={3000}
          >
            {[
              {
                src: '/hero1.jpg',
                alt: 'hero1',
              },
              {
                src: '/hero2.jpg',
                alt: 'hero2',
              },
              {
                src: '/hero3.jpg',
                alt: 'hero3',
              },
            ].map((image, index) => (
              <div key={index} className="w-full h-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Hero;
