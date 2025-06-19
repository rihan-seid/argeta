"use client"

import React, { useEffect } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

// Helper component for the animated flip button text
type FlipTextProps = {
  children: React.ReactNode;
  textColor: string;
};

const FlipText = ({ children, textColor }: FlipTextProps) => (
  <div className="overflow-hidden text-balance">
    <motion.div>
      <div className="overflow-clip flex flex-col h-[4.5vw] gap-[4.5vw] md:h-[1.3vw] md:gap-[1.3vw] xl:h-[1vw] xl:gap-[1vw]">
        <span className={`button-flip-text block transition transform duration-300 ${textColor}`}>{children}</span>
        <span className={`button-flip-text block transition transform duration-300 ${textColor}`}>{children}</span>
      </div>
    </motion.div>
  </div>
);

// The main application component
export default function App() {
  // Define data for the hero section
  const slides = [
    {
      title: "ARGETA",
      subtitle: "No. 1 meat and fish pâté in Europe*",
      description:
        "Flavours that have convinced more than 40 million Europeans. See how we did it.",
      // IMPORTANT: Replace with a public URL for your h1.jpg image
      circleImage: "/h1.jpg",
      bgColor: "rgb(169, 75, 8)", // Matches Argeta background
    },
  ];

  // Define data for the new scrolling product sections
  const productSections = [
    {
      id: "argeta",
      title: "Argeta",
      description: "The most popular meat and fish pâtés in Europe.*",
      // IMPORTANT: Replace with a public URL for your flag1.jpg image
      productImage: "/flag1.jpg",
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
      // IMPORTANT: Replace with a public URL for your flag1.jpg image
      productImage: "/flag1.jpg",
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
      // IMPORTANT: Replace with a public URL for your flag1.jpg image
      productImage: "/flag1.jpg",
      backgroundImage: "https://argeta-com.cnj.digital/assets/lines/junior_banner@2x.jpg",
      bgColor: "bg-[#fbb03b]",
      textColor: "text-[#964b00]",
      buttonBorderColor: "border-[#A94B08]",
      buttonTextColor: "text-[#383838]",
      link: "/en/junior",
    },
    {
      id: "exclusive",
      title: "Argeta Exclusive",
      description: "A restaurant experience in your home.",
      // IMPORTANT: Replace with a public URL for your flag1.jpg image
      productImage: "/flag1.jpg",
      backgroundImage: "https://argeta-com.cnj.digital/assets/lines/exclusive_banner@2x.jpg",
      bgColor: "bg-black",
      textColor: "text-white",
      buttonBorderColor: "border-[#A94B08]",
      buttonTextColor: "text-[#383838]",
      link: "/en/exclusive",
    },
    {
      id: "meatless",
      title: "Argeta Meatless",
      description: "Meatless masterpieces for vegans and meat lovers alike.",
      // IMPORTANT: Replace with a public URL for your flag1.jpg image
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
      // IMPORTANT: Replace with a public URL for your flag1.jpg image
      productImage: "/flag1.jpg",
      backgroundImage: "https://argeta-com.cnj.digital/assets/argeta-solate-pasta-konzumacija_background.jpg",
      bgColor: "bg-[#F8E6C0]",
      textColor: "text-[#A94B08]",
      buttonBorderColor: "border-[#A94B08]",
      buttonTextColor: "text-[#383838]",
      link: "/en/salad",
    },
  ];

  // Get scroll progress from framer-motion
  const { scrollYProgress } = useViewportScroll();

  // --- Scroll Animation Ranges ---
  // These define at what scrollYProgress values different animations occur.
  const heroPhase1Start = 0; // Start of hero section
  const heroPhase1End = 0.2; // End of initial hero reveal

  const heroPhase2Start = heroPhase1End + 0.1; // Start of "Discover the good side of"
  const heroPhase2End = heroPhase2Start + 0.2;

  const heroPhase3Start = heroPhase2End + 0.1; // Start of "bread"
  const heroPhase3End = heroPhase3Start + 0.2;

  // Total scroll height for the hero section to accommodate all animations
  // This needs to be a large enough value to allow the animations to play out.
  const totalHeroHeight = `${(heroPhase3End + 0.1) * 1000}vh`; // Multiplied by 1000 for ample scroll space

  // --- Hero Section Animations ---

  // Video Circle Animation
  const videoCircleWidth = useTransform(scrollYProgress, [heroPhase1Start, heroPhase1End], ["81.8795vw", "40vw"]); // Approximating cqw
  const videoCircleHeight = useTransform(scrollYProgress, [heroPhase1Start, heroPhase1End], ["81.8795vw", "40vw"]);
  const videoCircleLeft = useTransform(scrollYProgress, [heroPhase1Start, heroPhase1End], ["-12.1718vw", "5vw"]); // Moves to center
  const videoCircleTop = useTransform(scrollYProgress, [heroPhase1Start, heroPhase1End], ["24.3984vw", "20vh"]);
  const videoCircleOpacity = useTransform(scrollYProgress, [heroPhase1Start, heroPhase1End - 0.05, heroPhase1End], [1, 1, 0]); // Fade out slightly at end

  // Main SVG Path Animation (Placeholder for now, complex to animate path data directly with scroll)
  const svgOpacity = useTransform(scrollYProgress, [heroPhase1Start, heroPhase1End], [1, 0.3]);
  const svgY = useTransform(scrollYProgress, [heroPhase1Start, heroPhase1End], ["0%", "-50%"]); // Parallax

  // "No. 1 meat and fish pâté..." Text Animation
  const subtitleOpacity = useTransform(scrollYProgress, [heroPhase1Start, heroPhase1Start + 0.05, heroPhase1End], [0, 1, 0]);
  const subtitleY = useTransform(scrollYProgress, [heroPhase1Start, heroPhase1Start + 0.05, heroPhase1End], ["50%", "0%", "-50%"]);

  // "Our story" Button Animation
  const button1Opacity = useTransform(scrollYProgress, [heroPhase1Start + 0.05, heroPhase1Start + 0.1, heroPhase1End], [0, 1, 0]);
  const button1Y = useTransform(scrollYProgress, [heroPhase1Start + 0.05, heroPhase1End], ["50px", "-50px"]);

  // "Discover the good side of" Text Animation
  const discoverTextOpacity = useTransform(scrollYProgress, [heroPhase2Start, heroPhase2Start + 0.05, heroPhase2End], [0, 1, 0]);
  const discoverTextY = useTransform(scrollYProgress, [heroPhase2Start, heroPhase2Start + 0.05, heroPhase2End], ["50%", "0%", "-50%"]);

  // "bread" Text Animation
  const breadTextOpacity = useTransform(scrollYProgress, [heroPhase3Start, heroPhase3Start + 0.05, heroPhase3End], [0, 1, 0]);
  const breadTextX = useTransform(scrollYProgress, [heroPhase3Start, heroPhase3End], ["0vw", "21.232vw"]); // Example X translation
  const breadTextY = useTransform(scrollYProgress, [heroPhase3Start, heroPhase3Start + 0.05, heroPhase3End], ["50%", "0%", "-50%"]);

  // "Get to know the flavours" Button Animation
  const button2Opacity = useTransform(scrollYProgress, [heroPhase3Start + 0.05, heroPhase3Start + 0.1, heroPhase3End], [0, 1, 0]);
  const button2Y = useTransform(scrollYProgress, [heroPhase3Start + 0.05, heroPhase3End], ["50px", "-50px"]);

  // Ensure body and html allow scrolling and font is Ubuntu
  useEffect(() => {
    document.body.style.overflowX = 'hidden'; // Prevent horizontal scroll
    document.body.style.margin = '0';
    document.body.style.fontFamily = 'Ubuntu, sans-serif'; // Updated font family
    document.documentElement.style.scrollBehavior = 'smooth'; // Optional: for smoother programmatic scrolls
  }, []);

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
        .px-8vw { padding-left: 8vw; padding-right: 8vw; }
        .px-5vw { padding-left: 5vw; padding-right: 5vw; }
        .text-size-adjust-100 { text-size-adjust: 100%; }
        .leading-none { line-height: 1; }
        .tracking-tighter { letter-spacing: -0.05em; }
        .tracking-widest { letter-spacing: 0.1em; }
        .h-0-important { height: 0 !important; } /* For hiding elements completely */

        /* Specific styles for responsive fonts, approximating cqw from Argeta site */
        .mobile-h2 { font-size: 10vw; }
        .md\\:small-desktop-h4 { font-size: 2.5vw; }
        .xl\\:desktop-h4 { font-size: 1.5vw; }
        .xl\\:desktop-h1 { font-size: 6vw; }
        .md\\:small-desktop-h2 { font-size: 4vw; }
        .xl\\:desktop-h2 { font-size: 3.5vw; }

        /* Specific styles for product image to be circular and small */
        .product-image-circle {
          width: 100px;
          height: 100px;
          min-width: 60px; /* Ensure it doesn't get too small */
          min-height: 60px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }
        @media (min-width: 768px) { /* md breakpoint */
          .product-image-circle {
            width: 80px;
            height: 80px;
          }
        }
        @media (min-width: 1280px) { /* xl breakpoint */
          .product-image-circle {
            width: 60px;
            height: 60px;
          }
        }
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
                '2.14cqw-xl': '2.14rem', // Example: 2.14% of 1600px (desktop width) / 16px (base font size) = 2.14rem
                '3.33cqw-xl': '3.33rem',
                '3.56cqw-xl': '3.56rem',
                '0.95cqw-xl': '0.95rem',
                '0.83cqw-xl': '0.83rem',
                '1.42cqw-xl': '1.42rem',
                '4.28cqw-xl': '4.28rem',
                '8.57cqw-xl': '8.57rem',
              },
              fontSize: {
                // Responsive font sizes, approximating cqw for desktop and vw for mobile
                '3.75cqw-md': '3.75vw',
                '9.6cqw-base': '9.6vw',
              }
            }
          }
        }
        `}
      </script>

      {/* Main container for the entire page, includes the large scroll area for the hero */}
      <div className="relative bg-primary-orange-hover" style={{ minHeight: totalHeroHeight }}>

        {/* Hero Section - Main container for the complex scroll animation */}
        <section
          className="relative z-10 pointer-events-auto text-secondary-grey h-screen sticky top-0 overflow-hidden"
          style={{ backgroundColor: "rgb(169, 75, 8)" }} // Fixed background color for the hero
        >
          <div className="max-w-[2560px] mx-auto md:container absolute inset-0 z-50 w-full h-full xl:pt-[2.14cqw-xl]">
            {/* Left Content Column */}
            <div className="md:col-span-12 md:grid md:grid-cols-12 gap-x-[8vw] md:gap-x-[2.5vw] xl:gap-x-[1.9vw] grid-cols-1 px-[8vw] md:px-[5vw] xl:px-[3.33vw]">

              {/* Argeta Brand/Video Circle (Desktop only) */}
              <motion.div
                className="absolute hidden overflow-hidden rounded-full md:block will-change-transform"
                style={{
                  width: videoCircleWidth,
                  height: videoCircleHeight,
                  left: videoCircleLeft,
                  top: videoCircleTop,
                  opacity: videoCircleOpacity,
                }}
              >
                {/* IMPORTANT: Replace with a public URL for your video */}
                <video muted playsInline disableRemotePlayback disablePictureInPicture className="w-full h-full pointer-events-none">
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                </video>
              </motion.div>

              {/* Argeta Brand SVG */}
              <motion.svg
                className="relative w-[calc(100vw+10px)] md:w-auto ml-[-9.33vw] mr-[-1.33vw] -mt-[8.53vw] mb-[8.53vw] md:m-0"
                viewBox="0 0 1563 472"
                fill="currentColor" // Inherits color from parent
                xmlns="http://www.w3.org/2000/svg"
                style={{ opacity: svgOpacity, y: svgY }}
              >
                {/* Long SVG Path data */}
                <path d="M1444.82 250.43h-73.68l36.54-93.07 37.14 93.07Zm-1332.9 0 36.67-93.17 37.04 93.17h-73.71Zm307.77-39.47H386.5v-66.6c0-6.8.6-14.37.6-23.86l27.55-.35c39.34 0 56.79 16.34 56.79 45.12 0 25.95-19.69 45.72-51.76 45.72m-100.06-88.53v137.59c.5 27.08-.07 79.5-2.3 99.84h71.45c-1.7-11.31-1.7-43.44-1.7-59.77V258.9h35.44c60.22 151.78 173.84 212.12 288.02 212.12 45.03 0 90.06-9.58 132.27-26.51l-18.02-45.12a255.56 255.56 0 0 1-106.3 23.14c-91.19 0-184.56-51.9-238.01-181.66 36.6-19.14 56.28-45.09 56.85-85.2.57-53-44.4-89.1-128.87-88.52-18.55 0-75.97 2.8-91.13 2.8-15.16 0-43.9 0-63.62-.53a463.4 463.4 0 0 1 1.7 55.83c19.75-1 42.17-1.98 64.22-2.77m901.29 177.66v-148.4c0-6.22.54-17.5.54-25.95 33.74 0 57.92.53 87.76 1.1 0-22.54 1.7-41.74 3.4-60.31a9770.75 9770.75 0 0 1-215.54 2.24c-67.57 0-142.32 0-211.5-2.24 2.26 19.73 2.8 73.87 2.8 100.95v93.64c0 26.51-.54 80.08-2.8 100.39 28.67-1.68 64.11-2.24 97.86-2.24 31.54 0 68.68.56 95.66 2.24.59-20.88 1.13-39.5 2.83-57-26.48 1.13-56.83 1.7-88.37 1.7-11.82 0-25.31-.57-37.67-.57-.6-6.18-.6-14.66-.6-19.74v-51.9h99.59c0-18.03 0-34.42 1.13-49.62H955.29v-40.07c0-5.08.6-13.6-19.74 30.97-.57 64.12-.57 92.77-.57 28.64 0 69.78.57 102.98 1.14 1.14 22 1.73 47.39 1.73 63.18v71.63c0 27.09-1.13 79.52-3.39 99.85h72.55c-1.64-11.32-1.64-44.01-1.64-59.77M1523 274.7l-93.96-211.59-41.14 4.54c-7.83 23.11-18.52 45.68-33.74 80.08l-95.06 212.12h69.21c6.76-16.4 18.02-46.28 25.32-63.21h108.58l28.71 66.59 72.02-3.38a2297.2 2297.2 0 0 1-39.94-85.19m-688.09 62.05v-41.18c0-26.51.54-82.91 2.77-98.7-27.58 1.13-41 1.7-73.15 1.7-17.98 0-30.9-.57-55.12-1.7.56 14.12.56 31.55-.54 50.18 18.59-1.13 28.68-1.13 44.44-1.13 11.82 0 10.69 0 20.82.57.56 6.2.56 16.93.56 22v34.4c-13.52 5.64-28.14 8.48-44.46 8.48-51.17 0-91.7-34.96-91.7-97.61 0-53.03 39.94-94.77 99.02-94.77 28.12 0 55.13 10.75 75.95 24.84l18.02-54.7c-23.05-15.83-57.36-27.08-96.77-27.08-96.2 0-163.74 69.36-163.74 159.62 0 79.55 60.79 146.1 149.69 146.1 45 0 82.14-11.31 114.24-31.02m-571.1-62.05L168.78 59.75C155.84 30.42 130.53 5.6 93.4 0L68.68 55.27c29.12 4.5 40.97 20.78 49.97 39.25-6.39 15.26-14.15 32.1-23.55 53.28L0 359.9h69.18c6.8-16.4 17.99-46.29 25.35-63.22H203.3l28.5 66.59 72-3.38a2355.21 2355.21 0 0 1-39.93-85.19" />
              </motion.svg>

              {/* "No. 1 meat and fish pâté..." Text Block */}
              <div className="md:col-span-4 md:col-start-9 xl:col-span-3 xl:col-start-10">
                <div className="relative flex justify-end md:-mt-[2.4vw] h-full">
                  <div className="xl:max-w-[22.85vw]">
                    <motion.div
                      className="z-20 -mx-[1.5vw] md:-mx-[0.8vw] -mb-[0.5vw] md:-mb-[0.6vw] pt-[1.0vw] md:pt-[0.6vw] overflow-hidden xl:desktop-h4 md:small-desktop-h4 mobile-h2"
                      style={{ opacity: subtitleOpacity, y: subtitleY }}
                    >
                      <h1 className="inline-block px-[1.5vw] md:px-[0.8vw] pb-[0.5vw] md:pb-[0.6vw] italic tracking-tighter font-bold leading-none break-words hyphens-auto text-balance text-secondary-beige">
                        No. 1 meat and fish pâté in Europe*
                      </h1>
                    </motion.div>
                    <motion.div
                      className="mt-[4.26vw] md:mt-[1.25vw] xl:mt-[1.43vw] md:text-[length:1.09vw] xl:text-[length:0.95vw]"
                      style={{ opacity: subtitleOpacity, y: subtitleY }}
                    >
                      <p>Flavours that have convinced more than 40 million Europeans. See how we did it.</p>
                    </motion.div>
                    <motion.div
                      className="mt-[6.4vw] md:mt-[1.87vw] xl:mt-[1.43vw]"
                      style={{ opacity: button1Opacity, y: button1Y }}
                    >
                      <a className="button-flip relative group overflow-hidden outline-none focus:ring-2 rounded-full inline-block disabled:opacity-20 no-underline ring-offset-1 ring-secondary-beige" data-event="our-story" href="/en/our-story">
                        <div className="disabled:opacity-20 disabled:cursor-not-allowed absolute inset-0 rounded-full w-[13.33vw] md:w-[4.21vw] xl:w-[4.28vw] bg-secondary-beige md:group-hover:bg-secondary-beige-hover" style={{ transform: "none", width: "100%" }}></div>
                        <div className="relative inline-flex w-full justify-center items-center leading-tight xl:p-[1.42vw] text-[length:3.73vw] md:text-[length:1.09vw] xl:text-[length:0.83vw] font-bold uppercase tracking-widest transition-all duration-100 text-secondary-grey focus:outline-secondary-beige px-[6.4vw] md:px-[1.87vw] py-[4.26vw] md:py-[1.25vw]">
                          <div className="size-[4.26vw] md:size-[1.71vw] xl:size-[1.42vw] overflow-hidden shrink-0 text-primary-orange mr-[4.26vw] md:mr-[1.25vw] xl:mr-[0.95vw]">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m0 0-7-7m7 7-7 7"></path></svg>
                          </div>
                          <FlipText textColor="text-secondary-grey">Our story</FlipText>
                        </div>
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Discover the good side of... Section */}
              <div className="md:col-span-12 mt-[38.4vw] md:mt-0 relative">
                <motion.div
                  className="-mx-[1.5vw] md:-mx-[0.8vw] -mb-[0.5vw] md:-mb-[0.6vw] pt-[1.0vw] md:pt-[0.6vw] overflow-hidden z-20 relative xl:desktop-h1 md:small-desktop-h2 mobile-h2"
                  style={{ opacity: discoverTextOpacity, y: discoverTextY }}
                >
                  <h2 className="inline-block px-[1.5vw] md:px-[0.8vw] pb-[0.5vw] md:pb-[0.6vw] italic tracking-tighter font-bold leading-none break-words hyphens-auto text-balance text-secondary-beige" style={{ lineHeight: "1.70773" }}>
                    Discover <br />the good <br />side of
                  </h2>
                </motion.div>
                {/* Mobile video circle */}
                <video muted autoPlay loop playsInline disableRemotePlayback disablePictureInPicture className="z-10 size-[51.2vw] md:hidden pointer-events-none absolute bottom-0 right-0 left-0 rounded-full mx-auto" style={{}}>
                  {/* IMPORTANT: Replace with a public URL for your mobile video */}
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Bread Section */}
              <div className="relative z-20 md:col-span-12 pb-[19.2vw] md:pb-[2.81vw] xl:pb-[3.8vw] flex flex-col items-end">
                <motion.div
                  className="z-20 -mx-[1.5vw] md:-mx-[0.8vw] -mb-[0.5vw] md:-mb-[0.6vw] pt-[1.0vw] md:pt-[0.6vw] overflow-hidden relative xl:desktop-h1 md:small-desktop-h4 mobile-h2"
                  style={{ opacity: breadTextOpacity, x: breadTextX, y: breadTextY }}
                >
                  <h2 className="inline-block px-[1.5vw] md:px-[0.8vw] pb-[0.5vw] md:pb-[0.6vw] italic tracking-tighter font-bold leading-none break-words hyphens-auto text-balance text-secondary-beige" style={{}}>
                    bread
                  </h2>
                </motion.div>
                <motion.div
                  className="md:max-w-[27.96vw] xl:max-w-[22.85vw] mt-[6.4vw] md:mt-[2.81vw] xl:mt-[3.33vw] md:text-[length:1.09vw] xl:text-[length:0.95vw]"
                  style={{ opacity: breadTextOpacity, y: breadTextY }}
                >
                  <div><p>Selected ingredients, <br />great taste, no additives.</p></div>
                  <div className="mt-[6.4vw] md:mt-[2.81vw] xl:mt-[2.14vw] text-left">
                    <a className="button-flip relative group overflow-hidden outline-none focus:ring-2 rounded-full inline-block disabled:opacity-20 no-underline ring-offset-1 ring-secondary-beige" data-event="get-to-know-the-flavours" href="/en/products">
                      <div className="disabled:opacity-20 disabled:cursor-not-allowed absolute inset-0 rounded-full w-[13.33vw] md:w-[4.21vw] xl:w-[4.28vw] bg-secondary-beige md:group-hover:bg-secondary-beige-hover" style={{ transform: "none", width: "100%" }}></div>
                      <div className="relative inline-flex w-full justify-center items-center leading-tight xl:p-[1.42vw] text-[3.73vw] md:text-[1.09vw] xl:text-[0.83vw] font-bold uppercase tracking-widest transition-all duration-100 text-secondary-grey focus:outline-secondary-beige px-[6.4vw] md:px-[1.87vw] py-[4.26vw] md:py-[1.25vw]">
                        <div className="size-[4.26vw] md:size-[1.71vw] xl:size-[1.42vw] overflow-hidden shrink-0 text-primary-orange mr-[4.26vw] md:mr-[1.25vw] xl:mr-[0.95vw]">
                          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14s1.5 2 4 2 4-2 4-2m-1-5h.01M9 9h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10m-6.5-3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-6 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"></path>
                          </svg>
                        </div>
                        <FlipText textColor="text-secondary-grey">Get to know the flavours</FlipText>
                      </div>
                    </a>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* Product Showcase Section - Retained from previous iterations, now follows the new hero */}
        {/* The section itself is sticky, and its children animate based on scroll progress */}
        {/* Removed 'bg-primary-orange-hover' as per original Argeta structure for these sections */}
        <section
          className="relative z-10 pointer-events-auto h-screen sticky top-0 overflow-hidden"
          style={{ height: `calc(100vh + ${productSections.length * 15}vh)` }} // 100vh base + 15vh scroll per item
        >
          {/* Background Images Layer (Parallaxing) */}
          <div className="absolute inset-0 w-full h-full">
            {productSections.map((product, index) => {
              // Scroll range for each background image
              // These ranges need to start *after* the complex hero section
              const bgRangeStart = heroPhase3End + 0.1 + index * (0.12 + 0.02); // Start after hero, then regular spacing
              const bgRangeEnd = bgRangeStart + 0.12 + 0.02;

              // Opacity and Y transform for parallax effect
              const bgOpacity = useTransform(
                scrollYProgress,
                [bgRangeStart, bgRangeStart + 0.12 * 0.2, bgRangeEnd - 0.12 * 0.2, bgRangeEnd],
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
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/1920x1280/666666/FFFFFF?text=BG+Error+${index + 1}`; }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Product Cards Layer (Foreground, Sticky animation) */}
          <div className="max-w-[2560px] mx-auto relative z-50 w-full h-full xl:pt-[2.14vw]">
            <div className="md:w-[45vw] xl:w-[38vw] m-[2.66vw] md:mx-[5vw] xl:mx-[3.33vw] xl:text-[1vw] w-[calc(100%-5.32vw)] sticky duration-300 top-[calc(100dvh-41.06vw)] md:top-[calc(100vh-17.8125vw)] xl:top-[calc(100vh-14.99vw)] h-[38.4vw] md:h-[17.81vw] xl:h-[14.99vw] md:my-0">
              {productSections.map((product, index) => {
                const range = {
                  start: heroPhase3End + 0.1 + index * (0.12 + 0.02),
                  end: heroPhase3End + 0.1 + (index * (0.12 + 0.02)) + 0.12
                };

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
                      className={`no-underline absolute inset-0 w-full flex space-x-[5.33vw] md:space-x-[1.875vw] xl:space-x-[2.14vw] items-center p-[5.33vw] md:p-[1.875vw] xl:p-[2.14vw] md:pr-[3.75vw] xl:pr-[3.56vw] rounded-[8vw] md:rounded-full ${product.bgColor} ${product.textColor}`}
                      data-event={product.title}
                    >
                      <div className="shrink-0">
                        {/* Product image: circular and smaller */}
                        <img
                          alt={product.title}
                          loading="lazy"
                          width="100"
                          height="100"
                          decoding="async"
                          data-nimg="1"
                          className="product-image-circle" // Custom class for styling
                          src={product.productImage}
                          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/cccccc/000000?text=Prod+Error`; }}
                        />
                      </div>
                      <div className="grow">
                        <h4 className={`italic font-bold text-[9.6vw] md:text-[3.75vw] xl:text-[3.33vw] leading-none tracking-tighter mb-[2.13vw] md:mb-[1.25vw] xl:mb-[0.95vw]`}>
                          {product.title}
                          {/* SVG for mobile arrow */}
                          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" className="inline size-[4.26vw] md:hidden ml-[2.13vw]">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m0 0-7-7m7 7-7 7"></path>
                          </svg>
                        </h4>
                        <div className={`text-[3.73vw] md:text-[1.09375vw] xl:text-[0.83vw]`}>
                          {product.description}
                        </div>
                      </div>
                      <div className="md:w-[4.6875vw] md:h-[4.6875vw] xl:w-[4.28vw] xl:h-[4.28vw] shrink-0 hidden md:block transition hover:scale-110">
                        <button
                          href={product.link}
                          className={`button-flip relative group overflow-hidden outline-none focus:ring-2 rounded-full inline-block disabled:opacity-20 no-underline ring-offset-2 ring-offset-transparent ${product.buttonBorderColor} focus:ring-${product.buttonBorderColor}`}
                        >
                          <div
                            className={`disabled:opacity-20 disabled:cursor-not-allowed absolute inset-0 rounded-full border-2 md:group-hover:border-4 w-[13.33vw] md:w-[4.21vw] xl:w-[4.28vw] ${product.buttonBorderColor}`}
                            style={{ transform: "none", width: "100%" }}
                          ></div>
                          <div className={`relative inline-flex w-full justify-center items-center leading-tight xl:p-[1.42vw] text-[3.73vw] md:text-[1.09vw] xl:text-[0.83vw] font-bold uppercase tracking-widest transition-all duration-100 ${product.buttonTextColor} p-[4.53vw] md:p-[1.25vw]`}>
                            <div className={`size-[4.26vw] md:size-[1.71vw] xl:size-[1.42vw] overflow-hidden shrink-0 ${product.buttonBorderColor}`}>
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
