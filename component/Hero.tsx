"use client";
import React, { useEffect } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

// The main application component
export default function App() {
  // Define data for the hero section
  const slides = [
    {
      title: "ARGETA",
      subtitle: "No. 1 meat and fish pâté in Europe*",
      description:
        "Flavours that have convinced more than 40 million Europeans. See how we did it.",
      circleImage: "h1.jpg",
      bgColor: "rgb(169, 75, 8)", 
    },
  ];

  const productSections = [
    {
      id: "argeta",
      title: "Argeta",
      description: "The most popular meat and fish pâtés in Europe.*",
      productImage: "https://placehold.co/100x100/F4B400/FFFFFF?text=FLAG1.JPG",
      backgroundImage: "https://placehold.co/1920x1280/F4B400/FFFFFF?text=YOUR_FOOD1.JPG_BACKGROUND",
      bgColor: "bg-[#A94B08]",
      textColor: "text-[#F8E6C0]", 
      buttonBorderColor: "border-[#F8E6C0]", 
      buttonTextColor: "text-white",
      link: "/en/argeta",
    },
    {
      id: "veggie",
      title: "Argeta Veggie",
      description: "The fantastic flavours of vegetables.",
      productImage: "https://placehold.co/100x100/DB4437/FFFFFF?text=FLAG1.JPG",
      backgroundImage: "https://argeta-com.cnj.digital/assets/lines/veggie_banner_3_res.jpg",
      bgColor: "bg-[#518e38]", 
      textColor: "text-[#383838]", 
      buttonBorderColor: "border-[#A94B08]",
      buttonTextColor: "text-[#383838]",
      link: "/en/veggie",
    },
    {
      id: "junior",
      title: "Argeta Junior",
      description: "Nutritious pâtés prepared for children and for the young at heart.",
      // Updated to use 'flag1.jpg' placeholder for product image
      productImage: "https://placehold.co/100x100/0F9D58/FFFFFF?text=FLAG1.JPG",
      backgroundImage: "https://argeta-com.cnj.digital/assets/lines/junior_banner@2x.jpg",
      bgColor: "bg-[#fbb03b]", // primary-yellow
      textColor: "text-[#964b00]", // secondary-baked
      buttonBorderColor: "border-[#A94B08]", // primary-orange
      buttonTextColor: "text-[#383838]",
      link: "/en/junior",
    },
    {
      id: "exclusive",
      title: "Argeta Exclusive",
      description: "A restaurant experience in your home.",
      // Updated to use 'flag1.jpg' placeholder for product image
      productImage: "https://placehold.co/100x100/4285F4/FFFFFF?text=FLAG1.JPG",
      backgroundImage: "https://argeta-com.cnj.digital/assets/lines/exclusive_banner@2x.jpg",
      bgColor: "bg-black", // primary-black
      textColor: "text-white",
      buttonBorderColor: "border-[#A94B08]", // primary-orange
      buttonTextColor: "text-[#383838]",
      link: "/en/exclusive",
    },
    {
      id: "meatless",
      title: "Argeta Meatless",
      description: "Meatless masterpieces for vegans and meat lovers alike.",
      productImage: "/flag1.jpg", 
      backgroundImage: "https://argeta-com.cnj.digital/assets/lines/meatless-banner.jpg",
      bgColor: "bg-[#6f4f28]", 
      textColor: "text-[#383838]", 
      buttonBorderColor: "border-[#A94B08]", 
      buttonTextColor: "text-[#383838]",
      link: "/en/meatless",
    },
    {
      id: "salad",
      title: "Argeta Salad",
      description: "Argeta salads, mouth-watering and nutritious.",
      // Updated to use 'flag1.jpg' placeholder for product image
      productImage: "https://placehold.co/100x100/8B008B/FFFFFF?text=FLAG1.JPG",
      backgroundImage: "https://argeta-com.cnj.digital/assets/argeta-solate-pasta-konzumacija_background.jpg",
      bgColor: "bg-[#F8E6C0]", // secondary-beige
      textColor: "text-[#A94B08]", // primary-orange
      buttonBorderColor: "border-[#A94B08]", // primary-orange
      buttonTextColor: "text-[#383838]",
      link: "/en/salad",
    },
  ];

  // Get scroll progress from framer-motion
  const { scrollYProgress } = useViewportScroll();

  // Hero section animations:
  const circleScale = useTransform(scrollYProgress, [0, 0.15], [2.2, 1]);
  const circleX = useTransform(scrollYProgress, [0, 0.15], ["-45%", "0%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05, 0.15], [0.5, 1, 0.3]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], ["0vh", "-10vh"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.05, 0.15], [0, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.05, 0.15], ["50px", "0px", "-50px"]);

  // Calculate scroll ranges for product sections
  const heroScrollEnd = 0.2; // Hero section completes its animation by 20% scroll
  const sectionScrollDuration = 0.12; // Each product section takes 12% of total scroll to animate fully
  const sectionGap = 0.02; // Small gap between sections where neither is fully active

  const productAnimationRanges = productSections.map((_, index) => {
    const start = heroScrollEnd + index * (sectionScrollDuration + sectionGap);
    const end = start + sectionScrollDuration;
    return { start, end };
  });

  // Ensure body and html allow scrolling and font is Ubuntu
  useEffect(() => {
    document.body.style.overflowX = 'hidden'; // Prevent horizontal scroll
    document.body.style.margin = '0';
    document.body.style.fontFamily = 'Ubuntu, sans-serif'; // Updated font family
    document.documentElement.style.scrollBehavior = 'smooth'; // Optional: for smoother programmatic scrolls
  }, []);

  // Calculate total scroll height dynamically based on number of sections
  const totalScrollHeight = `${100 + (productSections.length * (sectionScrollDuration + sectionGap) * 100) + 50}vh`; // 100vh for hero, + buffer

  return (
    // Tailwind CSS script for utility classes and custom config
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        {`
        /* Import Ubuntu font from Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700;900&display=swap');
        body {
          font-family: 'Ubuntu', sans-serif; /* Applied Ubuntu font */
          margin: 0;
          overflow-x: hidden; /* Prevent horizontal scrolling */
          -webkit-font-smoothing: antialiased;
        }
        /* Custom scrollbar for better aesthetics */
        ::-webkit-scrollbar {
            width: 10px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
        /* Custom utility for responsive padding/margin in viewport units */
        .px-5vw { padding-left: 5vw; padding-right: 5vw; }
        .text-size-adjust-100 { text-size-adjust: 100%; }
        .leading-none { line-height: 1; }
        .tracking-tighter { letter-spacing: -0.05em; }
        .tracking-widest { letter-spacing: 0.1em; }
        `}
      </style>
      <script>
        {`
        // Configure Tailwind CSS with custom colors
        tailwind.config = {
          theme: {
            extend: {
              colors: {
                'primary-orange': 'rgb(169, 75, 8)', // Main orange from hero
                'primary-orange-hover': '#cc6600', // Close to original hero bg
                'secondary-beige': '#f8e6c0', // Light text/button color
                'primary-green': '#518e38', // Example green for Veggie
                'secondary-grey': '#383838', // Dark grey text
                'primary-yellow': '#fbb03b', // Example yellow for Junior
                'secondary-baked': '#964b00', // Example baked color for Junior text
                'primary-black': '#000000', // For Exclusive
                'primary-brown': '#6f4f28', // For Meatless
              },
              spacing: {
                // Responsive spacing approximating cqw for a 1600px desktop base
                '2.14cqw-xl': '2.14rem', // 2.14% of 1600px / 16px font-size = 21.4rem * (16/16) = 2.14rem
                '3.33cqw-xl': '3.33rem',
                '3.56cqw-xl': '3.56rem',
                '0.95cqw-xl': '0.95rem',
                '0.83cqw-xl': '0.83rem',
                '1.42cqw-xl': '1.42rem',
                '4.28cqw-xl': '4.28rem',
                '8.57cqw-xl': '8.57rem',

                // Responsive sizing for product image
                '11.25cqw-md': '11.25vw', // Approx for md screens
                '25.6cqw-base': '25.6vw', // Approx for base screens
              },
              fontSize: {
                '3.75cqw-md': '3.75vw',
                '9.6cqw-base': '9.6vw',
              }
            }
          }
        }
        `}
      </script>

      {/* Main container with sufficient height to allow scroll animations */}
      <div className="relative" style={{ minHeight: totalScrollHeight }}>
        {/* Hero Section - sticky for scroll interaction */}
        <section
          style={{ backgroundColor: slides[0].bgColor }}
          className="h-screen sticky top-0 flex items-center justify-between px-5vw overflow-hidden relative z-50 md:z-10" // Adjust z-index for hero
        >
          {/* Big Title */}
          <motion.h1
            style={{
              position: "absolute",
              left: "3vw",
              top: "20vh",
              fontSize: "18vw",
              fontWeight: "900",
              color: "#f8e6c0",
              userSelect: "none",
              pointerEvents: "none",
              zIndex: 5,
              fontFamily: "'Ubuntu Black', sans-serif",
              letterSpacing: "-0.03em",
              lineHeight: "0.85",
              mixBlendMode: "multiply",
              opacity: titleOpacity,
              y: titleY,
            }}
            className="md:text-[16vw] lg:text-[14vw]"
          >
            {slides[0].title}
          </motion.h1>

          {/* Circle Image */}
          <motion.div
            style={{
              position: "relative",
              zIndex: 2,
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              overflow: "hidden",
              scale: circleScale,
              x: circleX,
              boxShadow: "0 15px 60px rgba(0,0,0,0.6)",
              flexShrink: 0,
              backgroundColor: "#fff",
            }}
            className="hidden md:block md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]"
          >
            <img
              src={slides[0].circleImage}
              alt="Circle"
              className="w-full h-full object-cover"
              onError={(e) => { const target = e.target as HTMLImageElement; target.onerror = null; target.src = "https://placehold.co/500x500/cccccc/000000?text=Image+Error"; }}
            />
          </motion.div>

          {/* Content Right */}
          <motion.div
            style={{
              position: "relative",
              zIndex: 3,
              maxWidth: "400px",
              color: "#f8e6c0",
              fontFamily: "'Ubuntu', sans-serif",
              opacity: contentOpacity,
              y: contentY,
            }}
            className="w-full text-center md:text-left md:w-auto md:max-w-[400px] px-4 md:px-0"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 font-bold">
              {slides[0].subtitle}
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-8">
              {slides[0].description}
            </p>
            <button
              className="py-3 px-7 text-base font-bold rounded-full border-none cursor-pointer
                         bg-[#f8e6c0] text-[rgb(169, 75, 8)] shadow-lg transition-colors duration-300
                         hover:bg-white active:bg-gray-200"
            >
              Our story
            </button>
          </motion.div>
        </section>

        {/* Product Showcase Section - Mimics Argeta's layered scroll effect */}
        {/* The section itself is sticky, and its children animate based on scroll progress */}
        <section
          className="relative z-10 pointer-events-auto bg-primary-orange-hover h-screen sticky top-0 overflow-hidden"
          // Calculate height dynamically based on the number of product sections to control scroll
          style={{ height: `calc(100vh + ${productSections.length * 15}vh)` }} // 100vh base + 15vh scroll per item
        >
          {/* Background Images Layer (Parallaxing) */}
          <div className="absolute inset-0 w-full h-full">
            {productSections.map((product, index) => {
              // Scroll range for each background image
              const bgRangeStart = heroScrollEnd + index * (sectionScrollDuration + sectionGap);
              const bgRangeEnd = bgRangeStart + sectionScrollDuration + sectionGap;

              // Opacity and Y transform for parallax effect
              const bgOpacity = useTransform(
                scrollYProgress,
                [bgRangeStart, bgRangeStart + sectionScrollDuration * 0.2, bgRangeEnd - sectionScrollDuration * 0.2, bgRangeEnd],
                [0, 1, 1, 0]
              );
              const bgY = useTransform(
                scrollYProgress,
                [bgRangeStart, bgRangeEnd],
                ["-20%", "20%"] // Parallax effect
              );

              return (
                <motion.div
                  key={`bg-${product.id}`}
                  className="absolute inset-0 w-full h-[120vh] overflow-hidden" // Increased height for parallax effect
                  style={{
                    zIndex: 6 - index, // Decreasing z-index for layering
                    y: bgY,
                    opacity: bgOpacity,
                  }}
                >
                  <img
                    alt={product.title + " Background"}
                    loading="lazy"
                    decoding="async"
                    data-nimg="1"
                    className="absolute inset-0 object-cover w-full h-full"
                    src={product.backgroundImage}
                    onError={(e) => { const target = e.target as HTMLImageElement; target.onerror = null; target.src = `https://placehold.co/1920x1280/666666/FFFFFF?text=BG+Error+${index + 1}`; }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Product Cards Layer (Foreground, Sticky animation) */}
          <div className="max-w-[2560px] mx-auto relative z-50 w-full h-full xl:pt-[2.14cqw-xl]">
            <div className="md:w-[45vw] xl:w-[38vw] m-[2.66vw] md:mx-[5vw] xl:mx-[3.33vw] xl:text-[length:1cqw-xl] w-[calc(100%-5.32vw)] sticky duration-300 top-[calc(100dvh-41.06vw)] md:top-[calc(100vh-17.8125vw)] xl:top-[calc(100vh-14.99vw)] h-[38.4vw] md:h-[17.81vw] xl:h-[14.99vw] md:my-0">
              {productSections.map((product, index) => {
                const range = productAnimationRanges[index];

                // Product card opacity and Y position (sliding up/down and fading)
                const cardOpacity = useTransform(
                  scrollYProgress,
                  [range.start, range.start + 0.03, range.end - 0.03, range.end],
                  [0, 1, 1, 0]
                );
                const cardY = useTransform(
                  scrollYProgress,
                  [range.start, range.end],
                  ["100%", "0%"] // Start off-screen, slide into view
                );

                return (
                  <motion.div
                    key={product.id}
                    className="absolute top-0 left-0 right-0 w-full h-full overflow-hidden"
                    style={{ zIndex: 20 - index, opacity: cardOpacity, y: cardY }}
                  >
                    <a
                      href={product.link}
                      className={`no-underline absolute inset-0 w-full flex space-x-[5.33vw] md:space-x-[1.875vw] xl:space-x-[2.14cqw-xl] items-center p-[5.33vw] md:p-[1.875vw] xl:p-[2.14cqw-xl] md:pr-[3.75vw] xl:pr-[3.56cqw-xl] rounded-[8vw] md:rounded-full ${product.bgColor} ${product.textColor}`}
                      data-event={product.title}
                    >
                      <div className="shrink-0">
                        {/* Modified product image to be circular and smaller */}
                        <img
                          alt={product.title}
                          loading="lazy"
                          width="100" // Smaller size
                          height="100" 
                          decoding="async"
                          data-nimg="1"
                          className="w-[100px] h-[100px] md:w-[80px] md:h-[80px] xl:w-[60px] xl:h-[60px] rounded-full object-cover" // Added rounded-full for circular
                          style={{ color: "transparent" }}
                          src={product.productImage} // Using the updated product image
                          onError={(e) => { const target = e.target as HTMLImageElement; target.onerror = null; target.src = `https://placehold.co/100x100/cccccc/000000?text=Prod+Error`; }}
                        />
                      </div>
                      <div className="grow">
                        <h4 className={`italic font-bold text-[length:9.6cqw-base] md:text-[length:3.75cqw-md] xl:text-[length:3.33cqw-xl] leading-none tracking-tighter mb-[2.13vw] md:mb-[1.25vw] xl:mb-[0.95cqw-xl]`}>
                          {product.title}
                          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" className="inline size-[4.26vw] md:hidden ml-[2.13vw]">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m0 0-7-7m7 7-7 7"></path>
                          </svg>
                        </h4>
                        <div className={`text-[length:3.73vw] md:text-[length:1.09375vw] xl:text-[length:0.83cqw-xl]`}>
                          {product.description}
                        </div>
                      </div>
                      <div className="md:w-[4.6875vw] md:h-[4.6875vw] xl:w-[4.28cqw-xl] xl:h-[4.28cqw-xl] shrink-0 hidden md:block transition hover:scale-110">
                        <button
                          className={`button-flip relative group overflow-hidden outline-none focus:ring-2 rounded-full inline-block disabled:opacity-20 no-underline ring-offset-2 ring-offset-transparent ${product.buttonBorderColor} focus:ring-${product.buttonBorderColor}`}
                        >
                          <div
                            className={`disabled:opacity-20 disabled:cursor-not-allowed absolute inset-0 rounded-full border-2 md:group-hover:border-4 w-[13.33vw] md:w-[4.21vw] xl:w-[4.28cqw-xl] ${product.buttonBorderColor}`}
                            style={{ transform: "none", width: "100%" }}
                          ></div>
                          <div className={`relative inline-flex w-full justify-center items-center leading-tight xl:p-[1.42cqw-xl] text-[length:3.73vw] md:text-[length:1.09vw] xl:text-[length:0.83cqw-xl] font-bold uppercase tracking-widest transition-all duration-100 ${product.buttonTextColor} p-[4.53vw] md:p-[1.25vw]`}>
                            <div className={`size-[4.26vw] md:size-[1.71vw] xl:size-[1.42cqw-xl] overflow-hidden shrink-0 ${product.buttonBorderColor}`}>
                              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m0 0-7-7m7 7-7 7"></path>
                              </svg>
                            </div>
                          </div>
                        </button>
                      </div>
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
