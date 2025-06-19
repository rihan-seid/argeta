"use client";
import React, { useRef, useEffect, useState, useCallback } from 'react';

// Data for the product cards (First Section)
const products = [
  {
    imageSrc: 'https://argeta-com.cnj.digital/assets/products/photos_bg_si/original.jpg',
    altText: 'Looking for a flavour that will convince hungry young people?',
    title: 'Looking for a flavour that will convince hungry young people?',
    description: 'Discover Argeta Junior Original!',
    linkHref: '/en/junior/junior-original',
  },
  {
    imageSrc: 'https://argeta-com.cnj.digital/assets/products/photos_bg_si/chilli-limona.jpg',
    altText: 'Are you a veggie fan?',
    title: 'Are you a veggie fan?',
    description: 'Let Veggie Chilli & Lemon delight you!',
    linkHref: '/en/veggie/chilli-lemon',
  },
  {
    imageSrc: 'https://argeta-com.cnj.digital/assets/products/photos_bg_si/cajna-1701700134.jpg',
    altText: 'Discover more',
    title: 'Discover more',
    description: 'Discover even more flavours of Argeta pâtés and spreads!',
    linkHref: '/en/products',
  },
];

// Data for the 'Why Containers Special' section (Second Section)
const containerReasons = [
  {
    preTitle: 'BECAUSE',
    title: 'they are made of aluminium',
    description: 'Aluminium is one of the few materials that can be recycled endlessly.',
  },
  {
    preTitle: 'BECAUSE',
    title: 'they seal well',
    description: 'The container perfectly protects the pâté from light and other external influences, thus preserving taste and quality.',
  },
  {
    preTitle: 'BECAUSE',
    title: 'they give the pâté time',
    description: 'The containers and heat treatment extend the shelf life of the pâté and do not require artificial additives for preservability.',
  },
  {
    preTitle: 'BECAUSE',
    title: 'they are significantly lighter',
    description: 'Aluminium is much lighter than iron or glass, which means less impact on the environment during transportation.',
  },
];

// ProductCard Component (First Section's individual card)
type ProductCardProps = {
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
  linkHref: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, altText, title, description, linkHref }) => {
  return (
    <li className="flex justify-center md:h-screen gap-x-8 xl:gap-[1.9vw] md:shrink-0 md:w-[60vw] xl:w-[61.75vw]">
      <div className="w-full flex flex-col items-center md:h-screen md:py-[1.87vw] xl:py-[2.14vw] mx-auto text-center">
        {/* Image Container */}
        <div style={{ maxHeight: '17px' }} className="mt-[8.53vw] md:mt-0 order-2 md:order-1 rounded-[5.33vw] md:rounded-[3.12vw] xl:rounded-[2.38vw] md:h-0 md:max-h-[500px] w-full flex-auto relative overflow-hidden">
          <div className="h-full md:w-[135%] md:h-[120%] 2xl:w-[115%] 2xl:h-[100%]" style={{ transform: 'translateX(-200px) translateZ(0px)' }}>
            <img
              alt={altText}
              loading="lazy"
              width="1440"
              height="900"
              decoding="async"
              data-nimg="1"
              className="aspect-square md:aspect-auto md:absolute md:inset-0 object-cover w-[100%] md:h-full"
              style={{ color: 'transparent' }}
              src={imageSrc}
            />
          </div>
        </div>
        {/* Title */}
        <h3 className="px-[1.5vw] md:px-[0.8vw] pb-[0.5vw] md:pb-[0.2vw] overflow-hidden max-w-full break-words sm:break-keep italic font-bold leading-none tracking-tighter text-[8vw] md:text-[3vw] xl:text-[2.5vw] md:mt-[4.37vw] xl:mt-[3.33vw] md:max-w-[58.59vw] xl:max-w-[45.83vw] order-1 md:order-2 text-balance hyphens-auto">
          <span className="block" style={{ opacity: 1, transform: 'translateY(0%) translateZ(0px)' }}>
            {title}
          </span>
        </h3>
        {/* Description */}
        <div className="order-3 text-[4.26vw] md:text-[1.4vw] xl:text-[1.19vw] mt-[8.53vw] md:mt-[1.25vw] xl:mt-[2.14vw] md:max-w-[58.59vw] xl:max-w-[45.83vw]" style={{ opacity: 1, transform: 'translateY(0%) translateZ(0px)' }}>
          {description}
        </div>
        {/* Button */}
        <div className="order-4 mt-[9.6vw] md:mt-[2.81vw] xl:mt-[2.14vw]">
          <a
            className="button-flip relative group overflow-hidden outline-none focus:ring-2 rounded-full inline-block disabled:opacity-20 no-underline ring-offset-2 ring-offset-transparent ring-secondary-beige focus:ring-secondary-beige"
            data-event="discover-the-taste"
            href={linkHref}
          >
            <div className="disabled:opacity-20 disabled:cursor-not-allowed absolute inset-0 rounded-full border-2 md:group-hover:border-4 border-secondary-beige" style={{ transform: 'none' }}></div>
            <div className="relative inline-flex w-full justify-center items-center leading-tight xl:p-[1.42vw] text-[3.73vw] md:text-[1.09vw] xl:text-[0.83vw] font-bold uppercase tracking-widest transition-all duration-100 text-white px-[6.4vw] md:px-[1.87vw] py-[4.26vw] md:py-[1.25vw]">
              <div className="size-[4.26vw] md:size-[1.71vw] xl:size-[1.42vw] overflow-hidden shrink-0 text-secondary-beige mr-[4.26vw] md:mr-[1.25vw] xl:mr-[0.95vw]">
                <div style={{ opacity: 1 }}>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
              <div className="overflow-hidden text-balance">
                <div style={{ transform: 'translateY(0%) translateZ(0)' }}>
                  <div className="overflow-clip flex flex-col h-[4.5vw] gap-[4.5vw] md:h-[1.3vw] md:gap-[1.3vw] xl:h-[1vw] xl:gap-[1vw]">
                    <span className="button-flip-text block transition transform duration-300">DISCOVER THE TASTE</span>
                    <span className="button-flip-text block transition transform duration-300">DISCOVER THE TASTE</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </li>
  );
};

// Main AlwaysLookingSection Component (First Section)
const AlwaysLookingSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const [translateX, setTranslateX] = useState(0);

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current && ulRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const ulElement = ulRef.current;

      const { top, height } = scrollContainer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const scrollStart = top + window.scrollY;
      const scrollEnd = scrollStart + height - viewportHeight;

      let progress = 0;
      if (window.scrollY > scrollStart && window.scrollY < scrollEnd) {
        progress = (window.scrollY - scrollStart) / (height - viewportHeight);
      } else if (window.scrollY >= scrollEnd) {
        progress = 1;
      } else if (window.scrollY <= scrollStart) {
        progress = 0;
      }

      const maxTranslate = -(ulElement.scrollWidth - ulElement.clientWidth);
      const newTranslateX = maxTranslate * progress;

      setTranslateX(newTranslateX);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div style={{ position: 'relative', zIndex: 15 }}>
      <section className="py-[12.8vw] md:py-[11.25vw] xl:py-[8.57vw] relative z-30 text-secondary-beige">
        <div className="max-w-[2560px] mx-auto md:container">
          <div className="flex flex-col md:grid md:grid-cols-12 gap-x-[8vw] md:gap-x-[2.5vw] xl:gap-x-[1.9vw] px-[8vw] md:px-[5vw] xl:px-[3.33vw]">
            <div className="md:col-span-8 md:col-start-2">
              <div className="z-20 -mx-[1.5vw] md:-mx-[0.8vw] pt-[1.0vw] md:pt-[0.6vw] overflow-hidden mb-[19.2vw] md:mb-[1.87vw] xl:mb-[2.14vw] md:text-center xl:text-[2.5vw] md:text-[2vw] text-[7vw]">
                <div className="origin-left" style={{ opacity: 1, transform: 'translateY(0%) translateZ(0px)' }}>
                  <h2 className="inline-block px-[1.5vw] md:px-[0.8vw] pb-[0.5vw] md:pb-[0.6vw] italic tracking-tighter font-bold leading-none break-words hyphens-auto text-balance text-secondary-beige">
                    Always looking for something new?
                  </h2>
                </div>
              </div>
            </div>
            <div
              className="relative md:col-start-2 md:col-span-10"
              style={{ height: '300vh' }}
              ref={scrollContainerRef}
            >
              <ul
                className="sticky top-0 flex flex-col md:flex-row gap-y-[14.93vw] md:gap-y-0 md:gap-x-[2.34vw] xl:gap-x-[1.78vw] h-screen items-center"
                style={{ transform: `translateX(${translateX}px) translateZ(0px)` }}
                ref={ulRef}
              >
                {products.map((product, index) => (
                  <ProductCard key={index} {...product} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// WhySpecialSection Component (New Second Section)
const WhySpecialSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current && contentRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const contentElement = contentRef.current;

      const { top, height } = scrollContainer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const scrollStart = top + window.scrollY;
      const scrollEnd = scrollStart + height - viewportHeight;

      let progress = 0;
      if (window.scrollY > scrollStart && window.scrollY < scrollEnd) {
        progress = (window.scrollY - scrollStart) / (height - viewportHeight);
      } else if (window.scrollY >= scrollEnd) {
        progress = 1;
      } else if (window.scrollY <= scrollStart) {
        progress = 0;
      }

      // Calculate the maximum vertical translation needed for the content
      const maxTranslate = -(contentElement.scrollHeight - contentElement.clientHeight);

      // Interpolate the translateY value based on the scroll progress
      const newTranslateY = maxTranslate * progress;

      setTranslateY(newTranslateY);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set position
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div style={{ position: 'relative', zIndex: 14 }}>
      <section className="relative z-30 bg-primary-orange">
        <div className="max-w-[2560px] mx-auto md:container">
          {/* Sticky Circle with Background */}
          <div className="w-[84vw] xl:w-[calc(100vh-11.39vw)] container mx-auto sticky top-0 left-0 right-0 z-30 flex flex-col items-center h-screen overflow-hidden pointer-events-none">
            <div className="w-full -mb-px bg-primary-orange grow"></div>
            <svg className="w-[calc(100%_+_2px)] aspect-square text-primary-orange shrink-0 -mx-px" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_0_5)">
                <path fillRule="evenodd" clipRule="evenodd" d="M200 0H0V200H200V0ZM100 199C154.676 199 199 154.676 199 100C199 45.3238 154.676 1 100 1C45.3238 1 1 45.3238 1 100C1 154.676 45.3238 199 100 199Z" fill="currentColor"></path>
              </g>
              <defs>
                <clipPath id="clip0_0_5">
                  <rect width="200" height="200" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            <div className="w-full -mt-px bg-primary-orange grow"></div>
          </div>

          {/* Scrollable Content Container */}
          <div
            className="w-[84vw] xl:w-[calc(100vh-11.39vw)] container py-[calc((100vh-84vw)/2)] xl:py-[5.71vw] -mt-[100vh] mx-auto flex flex-col items-center bg-secondary-beige"
            style={{ height: `${containerReasons.length * 100}vh` }} /* Adjust height based on number of slides */
            ref={scrollContainerRef}
          >
            {/* Inner content that slides vertically */}
            <div className="relative flex items-center justify-center w-full mx-auto text-center rounded-full aspect-square bg-primary-orange-hover">
              <div className="z-20 -mx-[1.5vw] md:-mx-[0.8vw] -mb-[0.5vw] md:-mb-[0.6vw] pt-[1.0vw] md:pt-[0.6vw] overflow-hidden px-[14.93vw] md:px-[7.5vw] xl:px-[5vw] relative text-[7vw] md:text-[4vw] xl:text-[3vw]">
                <div className="origin-left" style={{ opacity: 1, transform: 'translateY(0%) translateZ(0px)' }}>
                  <h2 className="inline-block px-[1.5vw] md:px-[0.8vw] pb-[0.5vw] md:pb-[0.6vw] italic tracking-tighter font-bold leading-none break-words hyphens-auto text-balance text-secondary-beige">
                    Why are our containers so special?
                    <span className="uppercase tracking-wider font-bold leading-none px-[8.53vw] xl:px-0 absolute not-italic bottom-[-10vw] left-0 right-0 w-full font-bold text-[3.2vw] xl:text-[1.5vw] text-secondary-beige">
                      Swipe to find out.
                    </span>
                  </h2>
                </div>
              </div>
            </div>

            <div className="w-[12.8vw] h-[6.93vw] xl:w-[12vw] xl:h-[8vw] rounded-b-[5vw] xl:rounded-b-[4vw] bg-primary-orange-hover mt-[-1vw] xl:-mt-[2vw] flex justify-center items-end">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" className="size-[6.4vw] xl:size-[4vw] text-secondary-beige xl:mb-[2vw]">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 13 5 5 5-5M7 6l5 5 5-5"></path>
              </svg>
            </div>

            {/* Vertical sliding content */}
            <div
              className="xl:mt-[5.71vw] px-[8.53vw] md:px-[6.25vw] xl:px-[7.61vw] w-full overflow-hidden"
              style={{ transform: `translateY(${translateY}px) translateZ(0px)` }}
              ref={contentRef}
            >
              {containerReasons.map((reason, index) => (
                <div key={index} className="text-center space-y-[6.4vw] md:space-y-[2.5vw] xl:space-y-[7vw] h-[100vh] flex flex-col justify-center"> {/* Changed 100vw/cqw to 100vh for vertical slide */}
                  <span className="uppercase tracking-wider font-bold leading-none text-[3.73vw] md:text-[1.09vw] xl:text-[2vw] text-secondary-grey">
                    {reason.preTitle}
                  </span>
                  <div className="z-20 -mx-[1.5vw] md:-mx-[0.8vw] -mb-[0.5vw] md:-mb-[0.6vw] pt-[1.0vw] md:pt-[0.6vw] overflow-hidden text-[9.6vw] leading-none md:text-[3.75vw] md:leading-none xl:text-[10vw]">
                    <div className="origin-left" style={{ opacity: 1, transform: 'translateY(0%) translateZ(0px)' }}>
                      <h3 className="inline-block px-[1.5vw] md:px-[0.8vw] pb-[0.5vw] md:pb-[0.6vw] italic tracking-tighter font-bold leading-none break-words hyphens-auto text-balance text-secondary-grey">
                        {reason.title}
                      </h3>
                    </div>
                  </div>
                  <div className="text-[4.26vw] md:text-[1.40vw] xl:text-[3vw] text-balance">
                    <p>{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Main App component to render sections
const ProductSections = () => {
  return (
    // Increased min-h to accommodate both sections and their scroll effects
    <div className="bg-orange-600 text-white min-h-[1000vh] font-inter"> {/* Adjusted min-h */}
      <AlwaysLookingSection />
      <WhySpecialSection />
      {/* Dummy content to ensure there's enough scroll space after the new section */}
    </div>
  );
};

export default ProductSections;
