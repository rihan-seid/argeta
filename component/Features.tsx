"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

// Main App component
export  function FeaturesPage() { // Changed to default export
  const [showSustainabilityModal, setShowSustainabilityModal] = useState(false);
  const scrollingContainerRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;

  // Custom hook to detect if a component is scrolled past
  // This hook now also passes a reference to the element being observed,
  // which is necessary for the IntersectionObserver rootMargin setup.
  const useScrollPastObserver = (
    targetRef: React.RefObject<HTMLElement>,
    parentRef: React.RefObject<HTMLElement> | null,
    onScrollPast: (scrolledPast: boolean) => void
  ) => {
    useEffect(() => {
      let observer: IntersectionObserver;
      const handleIntersect = ([entry]: IntersectionObserverEntry[]) => {
        // If the target element is no longer intersecting and its top is above the viewport,
        // it means we have scrolled past it.
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          onScrollPast(true);
        } else if (entry.isIntersecting && entry.boundingClientRect.top >= 0) {
          // If it re-enters the viewport from the top (scrolled back up)
          onScrollPast(false);
        }
      };

      if (targetRef.current) { // Check targetRef only, parentRef is null for this specific use case
        // Observe relative to the viewport (root: null) for the main scrolling container
        observer = new IntersectionObserver(handleIntersect, {
          root: null, // Observe relative to the viewport
          rootMargin: '0px 0px -100% 0px', // When the bottom of the target crosses the bottom of the root
          threshold: 0 // Trigger as soon as any part of the target is out of the root
        });
        observer.observe(targetRef.current);
      }

      return () => {
        if (observer && targetRef.current) {
          observer.unobserve(targetRef.current);
        }
      };
    }, [targetRef, parentRef, onScrollPast]);
  };

  // Trigger modal when ScrollingAccordionContainer is scrolled past
  // The 'parentRef' argument is null here because we're observing against the viewport.
  useScrollPastObserver(scrollingContainerRef, null, setShowSustainabilityModal);


  const handleCloseModal = () => {
    setShowSustainabilityModal(false);
  };

  return (
    <div className="min-h-screen bg-[#A8582B] font-inter"> {/* Main background color */}
      {/* Tailwind CSS CDN and custom styles for 'Inter' font and animations */}
      <style>
        {`
          @import url('https://rsms.me/inter/inter.css');
          html { font-family: 'Inter', sans-serif; }

          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
            opacity: 0; /* Hidden by default until animation starts */
          }

          @keyframes grow-bar {
            from {
              height: 0%;
            }
            to {
              /* Target height will be set by JS */
            }
          }

          .animate-grow-bar {
            animation-name: grow-bar;
            animation-duration: 1.5s;
            animation-timing-function: ease-out;
            animation-fill-mode: forwards;
          }

          /* Modal specific animations */
          @keyframes modal-fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes modal-slide-in {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          .modal-overlay {
            animation: modal-fade-in 0.3s ease-out forwards;
          }

          .modal-content-animated {
            animation: modal-slide-in 0.4s ease-out forwards;
          }

          /* Hide scrollbar for the accordion container */
          .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera*/
          }

          /* Custom CSS Variables and Classes */
          /* Define your color palette here if not using direct Tailwind colors or extending config */
          .bg-pastel-green { background-color: #D3E0DC; }
          .bg-secondary-beige { background-color: #F3E5D7; }
          .bg-primary-orange { background-color: #E85C26; }
          .bg-primary-yellow { background-color: #F8D568; }
          .bg-primary-green { background-color: #8FD19E; }
          .bg-primary-black { background-color: #3F3F3F; }
          .text-secondary-grey { color: #555555; }
          .ring-primary-orange { --tw-ring-color: #E85C26; }
          .bg-primary-orange-hover:hover { background-color: #D25322; } /* Example hover color */

          /* Responsive Typography Classes (adjust values as per design system) */
          .mobile-eyebrow-h3 { font-size: 3.73cqw; } /* Example for mobile */
          .small-desktop-eyebrow-h3 { font-size: 1.4cqw; } /* Example for small desktop */
          .desktop-eyebrow-h3 { font-size: 1.9cqw; } /* Example for large desktop */

          .mobile-h4 { font-size: 4.8cqw; } /* Example for mobile */
          .small-desktop-h4 { font-size: 1.87cqw; } /* Example for small desktop */
          .desktop-h4 { font-size: 1.9cqw; } /* Example for large desktop */

          /* Button flip animation */
          .button-flip:hover .button-flip-text:first-child {
            transform: translateY(-100%);
          }
          .button-flip:hover .button-flip-text:last-child {
            transform: translateY(-100%);
          }
          .button-flip:hover .button-flip-bg {
            background-color: #E85C26; /* Example: orange on hover */
          }
        `}
      </style>

      {/* Features Section */}
      <Features />

      {/* SVG Wave separating Features from the Accordion Sections */}
      <svg className="w-full" viewBox="0 0 1680 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M838.89 160C521.69 159.86 230.12 100.27 0 .65V0h1680v.65C1449.88 100.27 1158.32 159.86 841.11 160h-2.22Z" fill="#C47D4C"></path>
      </svg>

      {/* Unified Scrolling Accordion Container for Survey and Sustainability */}
      {/* <ScrollingAccordionContainer ref={scrollingContainerRef} /> */}

      {/* Sustainability Modal - Appears when scrolling past the accordion container */}
      {showSustainabilityModal && (
        <Modal onClose={handleCloseModal}>
          <SustainabilityModalContent />
        </Modal>
      )}
    </div>
  );
}

// Custom hook for intersection observation (observes elements within a scrollable parent)
const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  options?: IntersectionObserverInit
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isIntersecting;
};

// Reusable FeatureCard Component
type FeatureCardProps = {
  icon: React.ReactNode;
  label1: string;
  label2: string;
  delay: number;
  isVisible: boolean;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, label1, label2, delay, isVisible }) => {
  return (
    <div className={`flex flex-col items-center ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: `${delay}s` }}>
      <div className="px-[6.4cqw] md:px-0">
        <div className="text-[#F3E5D7] inline-flex justify-center items-center border-2 md:border-[3px] border-dashed rounded-full aspect-square border-[#E85C26] w-[25cqw] h-[25cqw] md:w-[15cqw] md:h-[15cqw] xl:w-[13cqw] xl:h-[13cqw]">
          <div className="w-[17.6cqw] h-[17.6cqw] md:w-[10cqw] md:h-[10cqw] xl:w-[8.8cqw] xl:h-[8.8cqw]">
            {icon}
          </div>
        </div>
      </div>
      <div className="mt-[6.4cqw] md:mt-[1.87cqw] xl:mt-[1.42cqw] text-[length:3.73cqw] md:text-[1.4cqw] xl:text-[length:1.07cqw] font-bold leading-none tracking-wider text-center uppercase text-white">
        {label1}
      </div>
      <div
        className="mt-[1.06cqw] md:mt-[0.31cqw] xl:mt-[0.23cqw] text-[length:4.8cqw] md:text-[1.87cqw] xl:text-[length:1.9cqw] italic font-bold leading-none tracking-tighter text-center break-words hyphens-auto text-[#E85C26]"
        dangerouslySetInnerHTML={{ __html: label2 }}
      ></div>
    </div>
  );
};

// Features Section Component (remains largely the same)
const Features = () => {
  const { ref, inView: isVisible } = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="flex flex-col md:grid md:grid-cols-12 gap-x-[8vw] md:gap-x-[2.5vw] xl:gap-x-[1.9cqw] grid-cols-1 pt-[19.2cqw] md:pt-[7.5cqw] xl:pt-[8.57cqw] px-[8vw] md:px-[5vw] xl:px-[3.33cqw] overflow-hidden">
      {/* Title Section */}
      <div className="text-center md:col-span-10 md:col-start-2 xl:col-span-8 xl:col-start-3">
        <div className={`z-20 md:-mx-[0.8cqw] -mb-[0.5cqw] md:-mb-[0.6cqw] pt-[1.0cqw] md:pt-[0.6cqw] overflow-hidden text-center mx-auto text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <div
            className="origin-left"
            style={{ opacity: 1, transform: 'translateY(0%) translateZ(0px)' }}
          >
            <h2 className="inline-block px-[1.5cqw] md:px-[0.8cqw] pb-[0.5cqw] md:pb-[0.6cqw] italic tracking-tighter font-bold leading-none break-words hyphens-auto text-balance text-[#F3E5D7]"> {/* Title text color */}
              Argeta is prepared following the FREE FROM formula.
            </h2>
          </div>
        </div>

        {/* Feature Cards Section */}
        <div className="md:px-0 flex flex-wrap xl:flex-nowrap w-full justify-center gap-y-[6.4cqw] gap-x-[4.26cqw] md:gap-[3.75cqw] xl:gap-[2.85cqw] mx-auto mt-[12.8cqw] md:mt-[3.75cqw] xl:mt-[3.33cqw]">
          {/* Feature 1: Artificial Colours */}
          <FeatureCard
            icon={
              <svg viewBox="0 0 148 148" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M83.12 23.58c-3.4-.44-6.8-.63-10.2-.57-3 .07-6 .38-8.93.96a38.56 38.56 0 0 0-14 5.58 30.34 30.34 0 0 0-8.92 9.17 27.48 27.48 0 0 0-3.9 10.9c-.4 2.84-.25 5.72.35 8.53.6 2.72 1.7 5.3 3.27 7.62a19.48 19.48 0 0 0 6.08 5.77c2.65 1.6 5.6 2.6 8.69 2.98l.7.07 1 .11h.02c1.5.15 2.97.54 4.37 1.1.82.31 1.55.82 2.16 1.46.4.51.69 1.1.82 1.74.14.86.16 1.72.03 2.58a25.28 25.28 0 0 1-.68 3.18c-.37 1.23-.73 2.43-1.13 3.64-.47 1.4-.9 2.83-1.32 4.22a31.23 31.23 0 0 0-.91 4.44 16.5 16.5 0 0 0 .2 5.84c.5 2.06 1.53 3.96 3.01 5.48.82.9 1.77 1.65 2.78 2.32 1.16.75 2.4 1.4 3.68 1.93 1.53.63 3.08 1.15 4.68 1.57 1.92.5 3.87.9 5.83 1.2l1.08.15.05.01c5.56.7 11.18.16 16.51-1.58a41.84 41.84 0 0 0 14.27-8.15 45.97 45.97 0 0 0 10.53-13.22 48.42 48.42 0 0 0 5.4-16.88 45.5 45.5 0 0 0-1.12-17.61 43.74 43.74 0 0 0-7.28-14.92 47.38 47.38 0 0 0-12.1-11.23 50.48 50.48 0 0 0-15.6-6.65 91.04 0 0 0-9.42-1.74M67.3 40.74a11.05 11.05 0 0 1 9.6 12.42 11.14 11.14 0 0 1-12.42 9.65 11.13 11.13 0 0 1-7.38-4.24 11.16 11.16 0 0 1-2.2-8.22 11.17 11.17 0 0 1 4.19-7.39c2.33-1.8 5.3-2.59 8.2-2.22Zm38.85 11.1a7.56 7.56 0 0 1 6.57 8.52 7.63 7.63 0 0 1-8.5 6.6 7.62 7.62 0 0 1 1.93-15.13Zm-1.1 25.18a7.59 7.59 0 0 1 6.56 8.51c-.26 2-1.3 3.84-2.9 5.06a7.55 7.55 0 0 1-10.65-1.36 7.6 7.6 0 0 1 6.98-12.21ZM82.58 89.99a7.62 7.62 0 1 1-6.99 12.23 7.72 7.72 0 0 1 1.37-10.7 7.7 7.7 0 0 1 5.62-1.53M20 58.42c-.33.15-.58.41-.73.73-.13.25-.21.52-.25.79l-.02.5.03.6c.08.7.23 1.4.4 2.09.42 1.6.88 3.18 1.41 4.76.5 1.54 1.04 3.05 1.59 4.58a476.06 0 0 0 7.3 18.67c2.5 6.08 5.06 12.17 7.64 18.22l.05.1a2.4 2.4 0 0 0 1.37 1.23c.41.14 2.82-.84 3.24-.93-.1.64-2.1 2.29-2.01 2.94.14 1.11.48 2.2.99 3.21a16.67 16.67 0 0 0 2.1 3.3c.8 1 1.66 1.93 2.63 2.78.81.74-.33-1.78.66-1.29.42.22 2.92 3.52 3.37 3.6.53.1 1.09.05 1.58-.17.48-.25.29-6.74.54-7.22.22-.42.97 5.26 1.06 4.79.25-1.08.34-2.18.27-3.28a21.59 21.59 0 0 0-.51-3.8 17.66 17.66 0 0 0-1.24-3.7 10.06 10.06 0 0 0-1.89-2.78c-.45-.48-3.62.27-4.18-.05.34-.27 3.26-1.77 3.4-2.18.2-.6.18-1.27-.09-1.84l-.05-.1a1233.8 0 0 0-14.8-27.14c-.71-1.26-1.44-2.5-2.16-3.75-.6-1-1.17-2-1.75-3-.8-1.3-1.59-2.62-2.4-3.9-.54-.89-1.12-1.74-1.68-2.61a52.33 52.33 0 0 0-2.03-2.85 12.7 12.7 0 0 0-1.15-1.32c-.14-.17-.3-.31-.46-.45l-.4-.31c-.26-.15-.5-.26-.78-.34a1.68 1.68 0 0 0-1.06.12Z" clipRule="evenodd"></path>
              </svg>
            }
            label1="Free from"
            label2="artificial colours"
            delay={0.2}
            isVisible={isVisible}
          />

          {/* Feature 2: Preservatives */}
          <FeatureCard
            icon={
              <svg viewBox="0 0 148 148" fill="currentColor" aria-hidden="true">
                <path d="M86.94 58.74V30.99h5.93v-4.73h-8.25c-1.3 0-2.43.99-2.43 2.3v30.76c0 .38.11.74.3 1.07l8.5 16H56.77l8.5-16c.18-.33.29-.7.3-1.07V28.56c0-1.31-1.13-2.3-2.44-2.3h-8.25v4.73h5.94v27.75l-30.9 58.45a2.3 2.3 0 0 0 2.08 3.4h83.76a2.31 2.31 0 0 0 2.07-3.4l-30.9-58.45Z"></path>
              </svg>
            }
            label1="Free from"
            label2="preservatives"
            delay={0.4}
            isVisible={isVisible}
          />

          {/* Feature 3: Artificial Flavour Enhancers */}
          <FeatureCard
            icon={
              <svg viewBox="0 0 148 148" fill="currentColor" aria-hidden="true">
                <path d="M46.35 49.06a8.98 8.98 0 1 1 12.7-12.7l13.78 13.77-12.7 12.7z"></path>
                <path d="M59.7 74.4a7.87 7.87 0 0 1 0-11.14L73.25 49.7a7.87 7.87 0 0 1 11.13 0c.97.97.97 2.54 0 3.51L63.2 74.4c-.97.96-2.54.96-3.5 0m30.34 14.06a5.96 5.96 0 1 0 8.43-8.43L78.92 60.5l-8.43 8.43 19.54 19.53Z"></path>
                <path d="M97.25 91.25a2.83 2.83 0 0 0 4-4L80.37 66.37l-4 4zm-3.65 22.12a7.54 7.54 0 1 0 14.07 0l-7.04-18.2z"></path>
              </svg>
            }
            label1="Free from"
            label2="artificial flavour<br> enhancers"
            delay={0.6}
            isVisible={isVisible}
          />
        </div>

        {/* Call to Action Button */}
        <div className={`mb-[12.8cqw] md:mb-0 text-center mt-[12.8cqw] md:mt-[3.75cqw] xl:mt-[3.33cqw] ${isVisible ? 'animate-fade-in-up' : ''}`}
             style={{ animationDelay: '0.8s' }}>
          <div className="flex flex-wrap gap-[4.26vw] md:gap-[1.56vw] xl:gap-[1.42cqw] pointer-events-auto justify-center">
            <a
              className="button-flip relative group overflow-hidden outline-none focus:ring-2 rounded-full inline-block disabled:opacity-20 no-underline ring-offset-1 ring-[#F3E5D7]"
              data-event="check-out-our-quality"
              href="/en/quality"
            >
              <div
                className="disabled:opacity-20 disabled:cursor-not-allowed absolute inset-0 rounded-full w-[13.33cqw] md:w-[4.21cqw] xl:w-[4.28cqw] bg-white md:group-hover:bg-[#E85C26]" // Ensure button bg is white
                style={{ transform: 'none', width: '100%' }}
              ></div>
              <div className="relative inline-flex w-full justify-center items-center leading-tight text-[length:3.73cqw] md:text-[1.09cqw] xl:text-[length:0.83cqw] font-bold uppercase tracking-widest transition-all duration-100 text-[#3F3F3F] focus:outline-[#F3E5D7] px-[6.4cqw] md:px-[1.87cqw] py-[4.26cqw] md:py-[1.25cqw]">
                <div className="size-[4.26cqw] md:size-[1.71cqw] xl:size-[1.42cqw] overflow-hidden shrink-0 text-[#E85C26] mr-[4.26cqw] md:mr-[1.25cqw] xl:mr-[0.95cqw]">
                  <div style={{ opacity: 1 }}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m0 0-7-7m7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
                <div className="overflow-hidden text-balance">
                  <div style={{ transform: 'translateY(0%) translateZ(0px)' }}>
                    <div className="overflow-clip flex flex-col h-[4.5cqw] gap-[4.5cqw] md:h-[1.3cqw] md:gap-[1.3cqw] xl:h-[1cqw] xl:gap-[1cqw]">
                      <span className="button-flip-text block transition transform duration-300">Check out our quality</span>
                      <span className="button-flip-text block transition transform duration-300">Check out our quality</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Modal Component
type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  const handleClickOutside = useCallback((event: { target: any; }) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 modal-overlay">
      <div ref={modalRef} className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto modal-content-animated">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold z-10"
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

// Modal Content for Sustainability
const SustainabilityModalContent = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4 text-secondary-grey">ARGETA 🧡 SUSTAINABILITY</h2>
      <p className="text-lg text-secondary-grey mb-4">
        At Argeta, we believe that delicious food and a healthy planet can go hand in hand. We're committed to making a positive impact on the world through sustainable practices in every step of our production process.
      </p>
      <p className="text-md text-secondary-grey mb-4">
        From sourcing our ingredients responsibly to minimizing waste and supporting local communities, we are dedicated to creating a brighter, greener future. Discover our sustainability pledges and join us on this journey!
      </p>
      <ul className="list-disc list-inside text-secondary-grey mb-6">
        <li>Responsible Sourcing</li>
        <li>Eco-friendly Packaging</li>
        <li>Waste Reduction</li>
        <li>Community Support</li>
      </ul>
      <a
        href="/en/spread-good"
        className="inline-block px-6 py-3 bg-primary-orange text-white font-bold rounded-full hover:bg-primary-orange-hover transition-colors duration-300"
      >
        Learn More About Our Initiatives
      </a>
    </div>
  );
};


// AccordionItem Component for individual sections within the scrolling container
type AccordionItemProps = {
  sectionNumber: string;
  sectionTitle: string;
  sectionBgColor: string;
  children: React.ReactNode;
  rightPanelContent?: React.ReactElement<{ isVisible: boolean }>;
};

const AccordionItem: React.FC<AccordionItemProps> = ({ sectionNumber, sectionTitle, sectionBgColor, children, rightPanelContent }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, inView: isVisible } = useInView({ threshold: 0.1 });

  return (
    <div ref={ref} className="relative flex">
      {/* Left Panel: Header and Content. Applied sectionBgColor here */}
      <div className={`w-full md:w-1/2 md:max-w-[calc(1920/2px)] md:ml-auto px-[8cqw] md:pl-[5cqw] xl:pl-[3.33cqw] md:pr-[8.9vw] xl:pr-[8.57cqw] ${sectionBgColor}`}>
        {/* Sticky Header. Applied sectionBgColor here as well for consistent background */}
        <div className={`${sectionBgColor} flex xl:desktop-eyebrow-h3 md:small-desktop-eyebrow-h3 mobile-eyebrow-h3 font-bold leading-none tracking-wider uppercase py-[6.4vw] md:py-[2.5vw] xl:py-[1.9cqw] sticky top-0 z-30 text-secondary-grey ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <span className="w-3 mr-6 tabular-nums">{sectionNumber}</span> {/* Restored sectionNumber for display */}
          <span className="">{sectionTitle}</span>
        </div>
        {/* Content Area */}
        <div className="pt-8 pb-14 xl:pb-[1.9cqw] xl:pl-[1.78cqw] xl:pt-[1.42cqw]">
          <div className="h-full flex flex-col justify-center text-left">
            {children} {/* This is where the specific section content (question, text, buttons) will go */}
          </div>
        </div>
      </div>

      {/* Right Panel: Image or Chart */}
      <div className="sticky top-0 hidden w-1/2 md:block" style={{ height: '408px' }}> {/* Adjusted height to 408px */}
        {rightPanelContent && React.cloneElement(rightPanelContent, { isVisible })} {/* Pass isVisible to right panel content */}
      </div>
    </div>
  );
};

// ScrollingAccordionContainer to hold Survey and Sustainability sections
// const ScrollingAccordionContainer = React.forwardRef((props, ref) => {
//   // Use local state for child visibility within the accordion
//   const [surveyIsVisible, setSurveyIsVisible] = useState(false);
//   const [sustainabilityIsVisible, setSustainabilityIsVisible] = useState(false);

// // ...existing code...
// // ...existing code...
// const surveyRef = useRef<HTMLElement>(null);           // ✅ Correct
// const sustainabilityRef = useRef<HTMLElement>(null);   // ✅ Correct

// const observeSurvey = useIntersectionObserver(
//   surveyRef,
//   { threshold: 0.05, root: (ref && 'current' in ref ? ref.current : null) as Element | null }
// );


// const observeSustainability = useIntersectionObserver(
//   sustainabilityRef,
//   { threshold: 0.05, root: (ref && 'current' in ref ? ref.current : null) as Element | null }
// );
// // ...existing code...// ...existing code...
//   useEffect(() => {
//     setSurveyIsVisible(observeSurvey);
//   }, [observeSurvey]);

//   useEffect(() => {
//     setSustainabilityIsVisible(observeSustainability);
//   }, [observeSustainability]);

//   return (
//     // Applied the requested `bg-pastel-green` and `min-h-screen` to this outer container
//     // and removed pointer-events-none as it prevents interaction
//     <div className="overflow-hidden duration-200 md:duration-0 relative z-20 bg-pastel-green min-h-screen" style={{ transitionProperty: 'height', transform: 'none' }}>
//       <div className="max-w-[2560px] mx-auto md:container/section">
//         <div id="content-accordion" className="overflow-y-auto scrollbar-hide overscroll-contain h-full" data-lenis-prevent="true"> {/* Changed height to h-full */}
//           {/* Argeta Survey Section */}
//           <div ref={surveyRef}>
//             <AccordionItem
//               sectionNumber="1" // Passed here for display only
//               sectionTitle="Argeta Survey"
//               sectionBgColor="bg-pastel-green" // Ensure this matches the section's background
//               rightPanelContent={<SurveyChart isVisible={surveyIsVisible} />}
//             >
//               <div className="text-left">
//                 <div className={`z-20 -mx-[1.5cqw] md:-mx-[0.8cqw] -mb-[0.5cqw] md:-mb-[0.6cqw] pt-[1.0cqw] md:pt-[0.6cqw] overflow-hidden xl:desktop-h4 md:small-desktop-h4 mobile-h4 ${surveyIsVisible ? 'animate-fade-in-up' : ''}`}>
//                   <div className="origin-left" style={{ opacity: 1, transform: 'translateY(0%) translateZ(0px)' }}>
//                     <h3 className="inline-block px-[1.5cqw] md:px-[0.8cqw] pb-[0.5cqw] md:pb-[0.6cqw] italic tracking-tighter font-bold leading-none break-words hyphens-auto text-balance text-secondary-grey">
//                       Where have you heard about us?
//                     </h3>
//                   </div>
//                 </div>
//               </div>
//               <SurveyOptions isVisible={surveyIsVisible} />
//             </AccordionItem>
//           </div>

//           {/* ARGETA 🧡 SUSTAINABILITY Section - Now displayed sequentially within the same scrolling container */}
//           <div ref={sustainabilityRef}>
//             <AccordionItem
//               sectionNumber="2" // Passed here for display only
//               sectionTitle="ARGETA 🧡 SUSTAINABILITY"
//               sectionBgColor="bg-secondary-beige" // Ensure this matches the section's background
//               rightPanelContent={<SustainabilityImage isVisible={sustainabilityIsVisible} />}
//             >
//               <div className="text-left">
//                 <div className={`z-20 -mx-[1.5cqw] md:-mx-[0.8cqw] -mb-[0.5cqw] md:-mb-[0.6cqw] pt-[1.0cqw] md:pt-[0.6cqw] overflow-hidden xl:desktop-h4 md:small-desktop-h4 mobile-h4 ${sustainabilityIsVisible ? 'animate-fade-in-up' : ''}`}>
//                   <div className="origin-left" style={{ opacity: 1, transform: 'translateY(0%) translateZ(0px)' }}>
//                     <h3 className="inline-block px-[1.5cqw] md:px-[0.8cqw] pb-[0.5cqw] md:pb-[0.6cqw] italic tracking-tighter font-bold leading-none break-words hyphens-auto text-balance text-secondary-grey">
//                       Can one pâté change the world? It can try!
//                     </h3>
//                   </div>
//                 </div>
//               </div>
//               <div className={`mt-[6.4vw] md:mt-[4.37vw] xl:mt-[3.33cqw] text-[4.26vw] md:text-[1.40vw] xl:text-[length:1.19cqw] text-secondary-grey ${sustainabilityIsVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.2s' }}>
//                 <div className="prose">
//                   <p>Discover our sustainability pledges and follow our progress towards better products, a better environment, and a better society.</p>
//                 </div>
//                 <div className="mt-[9.6vw] md:my-[2.81vw] xl:my-[2.14cqw]">
//                   <div className="flex flex-wrap gap-[4.26vw] md:gap-[1.56vw] xl:gap-[1.42cqw] pointer-events-auto justify-start">
//                     <a
//                       className="button-flip relative group overflow-hidden outline-none focus:ring-2 rounded-full inline-block disabled:opacity-20 no-underline ring-offset-1 ring-primary-orange"
//                       data-event="read-more-about-sustainability"
//                       href="/en/spread-good"
//                     >
//                       <div className="disabled:opacity-20 disabled:cursor-not-allowed absolute inset-0 rounded-full w-[13.33cqw] md:w-[4.21cqw] xl:w-[4.28cqw] bg-primary-orange md:group-hover:bg-primary-orange-hover" style={{ transform: 'none', width: '100%' }}></div>
//                       <div className="relative inline-flex w-full justify-center items-center leading-tight xl:p-[1.42cqw] text-[length:3.73cqw] md:text-[1.09cqw] xl:text-[length:0.83cqw] font-bold uppercase tracking-widest transition-all duration-100 text-secondary-beige focus:outline-primary-orange px-[6.4cqw] md:px-[1.87cqw] py-[4.26cqw] md:py-[1.25cqw]">
//                         <div className="size-[4.26cqw] md:size-[1.71cqw] xl:size-[1.42cqw] overflow-hidden shrink-0 text-secondary-beige mr-[4.26cqw] md:mr-[1.25cqw] xl:mr-[0.95cqw]">
//                           <div style={{ opacity: 1 }}>
//                             <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m0 0-7-7m7 7-7 7"></path>
//                             </svg>
//                           </div>
//                         </div>
//                         <div className="overflow-hidden text-balance">
//                           <div style={{ transform: 'translateY(0%) translateZ(0px)' }}>
//                             <div className="overflow-clip flex flex-col h-[4.5cqw] gap-[4.5cqw] md:h-[1.3cqw] md:gap-[1.3cqw] xl:h-[1cqw] xl:gap-[1cqw]">
//                               <span className="button-flip-text block transition transform duration-300">Read more about sustainability</span>
//                               <span className="button-flip-text block transition transform duration-300">Read more about sustainability</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </AccordionItem>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });

// Specific component for Survey options (buttons)
// const SurveyOptions = ({ isVisible }) => {
//   const options = [
//     { label: "Stores", circleColor: "bg-primary-orange" },
//     { label: "Events", circleColor: "bg-primary-yellow" },
//     { label: "Social networks", circleColor: "bg-primary-green" },
//     { label: "Online advertisements", circleColor: "bg-primary-black" },
//   ];

//   return (
//     <div className="mt-[6.4vw] md:mt-[4.37vw] xl:mt-[3.33cqw] text-[4.26vw] md:text-[1.40vw] xl:text-[length:1.19cqw] text-secondary-grey">
//       <div className="xl:w-[30.47cqw] flex flex-col space-y-[2.13vw] md:space-y-[1.25vw] xl:space-y-[0.95cqw]">
//         {options.map((item, index) => (
//           <button
//             key={item.label}
//             className={`p-[4.26vw] md:p-[1.25vw] space-x-[4.26vw] md:space-x-[1.25vw] xl:p-[1.19cqw] rounded-full border-2 flex items-center xl:space-x-[1.19cqw] text-left duration-100 w-full group pointer-events-none cursor-default text-secondary-grey ${
//               index === 0 ? 'border-primary-orange/60' : 'opacity-50 border-primary-orange/30'
//             } ${isVisible ? 'animate-fade-in-up' : ''}`} // Apply animation based on its own visibility
//             style={{ animationDelay: `${0.1 + index * 0.1}s` }}
//           >
//             <div className="w-[4.26vw] h-[4.26vw] md:w-[1.25vw] md:h-[1.25vw] xl:w-[0.95cqw] xl:h-[0.95cqw] shrink-0 flex items-center justify-center">
//               <div className={`w-2/3 rounded-full h-2/3 ${item.circleColor}`}></div>
//             </div>
//             <span className="text-[3.73vw] md:text-[1.25vw] xl:text-[length:1.07cqw] grow">{item.label}</span>
//             <div className="md:w-[1.25vw] xl:w-[0.95cqw]"></div>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// Specific component for Survey Chart (right panel)
// const SurveyChart = ({ isVisible }) => {
//   const surveyData = [
//     { label: "Stores", percentage: 67, color: "bg-primary-orange", circleColor: "bg-primary-orange" },
//     { label: "Events", percentage: 14, color: "bg-primary-yellow", circleColor: "bg-primary-yellow" },
//     { label: "Social networks", percentage: 11, color: "bg-primary-green", circleColor: "bg-primary-green" },
//     { label: "Online advertisements", percentage: 9, color: "bg-primary-black", circleColor: "bg-primary-black" },
//   ];

//   return (
//     <div className="rounded-[5.3vw] md:rounded-none h-full px-[9.6vw] pt-[9.6vw] pb-[26.13vw] md:p-[7.5vw] xl:p-[8.57cqw] w-full bg-white relative">
//       <div id="survey-results"></div>
//       <div className="px-[4.26vw] relative flex items-end justify-around h-full border-l-[5px] border-b-[5px] w-full border-secondary-grey rounded-bl-[4.26vw] md:rounded-bl-[1.25vw] xl:rounded-bl-[1.19cqw] xl:max-h-[20cqw]">
//         <div className="absolute inset-x-0 top-0 z-10 w-full border-b border-dashed border-secondary-grey"></div>
//         <div className="z-10 absolute inset-x-0 top-[25%] w-full border-b border-secondary-grey border-dashed"></div>
//         <div className="z-10 absolute inset-x-0 top-[50%] w-full border-b border-secondary-grey border-dashed"></div>
//         <div className="z-10 absolute inset-x-0 top-[75%] w-full border-b border-secondary-grey border-dashed"></div>

//         {surveyData.map((item, index) => (
//           <div key={item.label} className="z-20 flex flex-col items-center justify-end h-full">
//             <div
//               className={`w-[4vw] md:w-[1.17vw] xl:w-[1cqw] ${item.color} transition-all duration-1000 rounded-t-full ${isVisible ? 'animate-grow-bar' : ''}`}
//               style={isVisible ? { height: `${item.percentage}%`, animationDelay: `${0.3 + index * 0.15}s` } : { height: '0%' }}
//             ></div>
//             <div className="relative">
//               <div className={`z-10 absolute top-[-5vw] md:top-[-1.9vw] xl:top-[-1.90cqw] right-0 origin-top-right -rotate-45 whitespace-nowrap min-w-fit py-[1.6vw] px-[2.66vw] md:py-[0.46vw] xl:py-[0.47cqw] md:px-[0.93vw] xl:px-[0.95cqw] bg-white rounded-full flex space-x-[1.06vw] md:space-x-[0.62vw] xl:space-x-[0.47cqw] items-center border-black/20 border-[2px] md:border-[3px] xl:border-[5px] ${isVisible ? 'animate-fade-in-up' : ''}`}
//                   style={{ animationDelay: `${0.5 + index * 0.15}s` }}>
//                 <span className="text-primary-orange font-bold text-[3.2vw] md:text-[1.09vw] xl:text-[length:0.83cqw] tracking-wider">{item.percentage}%</span>
//                 <span className="text-secondary-grey text-[3.2vw] md:text-[1.09vw] xl:text-[length:1.07cqw]">{item.label}</span>
//                 <div className="w-[3.2vw] h-[3.2vw] md:w-[0.93vw] md:h-[0.93vw] xl:w-[0.95cqw] xl:h-[0.95cqw] flex items-center justify-center">
//                   <div className={`w-2/3 h-2/3 rounded-full ${item.circleColor}`}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// Specific component for Sustainability Image (right panel)
type SustainabilityImageProps = {
  isVisible: boolean;
};

const SustainabilityImage: React.FC<SustainabilityImageProps> = ({ isVisible }) => {
  const imageUrl = "https://placehold.co/1280x1280/F3E5D7/3F3F3F?text=Sustainability+Image"; // Placeholder for the actual image

  return (
    <img
      alt="Can one pâté change the world? It can try!"
      loading="lazy"
      width="1280"
      height="1280"
      decoding="async"
      data-nimg="1"
      className={`object-cover h-full ${isVisible ? 'animate-fade-in-up' : ''}`}
      src={imageUrl}
      onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = 'https://placehold.co/1280x1280/F3E5D7/3F3F3F?text=Image+Not+Found'; }}
      style={{ color: 'transparent' }}
    />
  );
};
