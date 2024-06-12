import { Carousel } from 'flowbite-react';
import Image from 'next/image';

const Hero = () => {
  const aspectRatio = 56.25;

  return (
    <div className="relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.png"
          alt="background"
          width={300}
          height={300}
          quality={100}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-7xl mx-auto px-5 pt-20 relative z-10">
        <div
          className="relative w-full"
          style={{ paddingTop: `${aspectRatio}%` }}
        >
          <Carousel
            slideInterval={5000}
            className="absolute top-0 left-0 w-full h-full"
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
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1600}
                  height={900}
                  quality={100}
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
