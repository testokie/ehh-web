"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const heroSlides = [
  {
    image: "https://imagesplashh.vercel.app/api/image/1920/1080/Dubai",
    alt: "EHH Campus Dubai",
  },
  {
    image:
      "https://imagesplashh.vercel.app/api/image/1920/1080/Hospitality+Training",
    alt: "Hospitality Training",
  },
  {
    image:
      "https://imagesplashh.vercel.app/api/image/1920/1080/Culinary+Arts+Program",
    alt: "Culinary Arts Program",
  },
  {
    image:
      "https://imagesplashh.vercel.app/api/image/1920/1080/Real+World+Experience",
    alt: "Real World Experience",
  },
];

const navItems = [
  { label: "About", sectionId: "about", isCTA: false },
  { label: "Programs", sectionId: "programs", isCTA: false },
  { label: "Why Dubai", sectionId: "why-dubai", isCTA: false },
  { label: "Why Study", sectionId: "why-study", isCTA: false },
  { label: "Contact Us", sectionId: "contact", isCTA: true },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isOverHero, setIsOverHero] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      setIsScrolled(scrollY > 50);
      setIsOverHero(scrollY < heroHeight - 100);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest("nav")) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[var(--primary-red)] rounded"></div>
              <span
                className={`text-lg sm:text-xl font-semibold transition-colors duration-300 ${
                  isOverHero ? "text-white" : "text-[var(--text-primary)]"
                }`}
              >
                EHH
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className={`transition-colors font-medium ${
                    item.isCTA
                      ? `px-6 py-2 rounded-md ${
                          isOverHero
                            ? "bg-white text-[var(--primary-red)] hover:bg-white/90"
                            : "bg-[var(--primary-red)] text-white hover:bg-[var(--primary-red-dark)]"
                        }`
                      : isOverHero
                      ? "text-white/90 hover:text-white"
                      : "text-[var(--text-secondary)] hover:text-[var(--primary-red)]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-md transition-colors ${
                isOverHero && !isScrolled
                  ? "text-white hover:bg-white/10"
                  : "text-[var(--text-primary)] hover:bg-gray-100"
              }`}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 overflow-hidden ${
              isMobileMenuOpen
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className={`w-full text-left px-4 py-3 rounded-md transition-colors font-medium ${
                    item.isCTA
                      ? "bg-[var(--primary-red)] text-white hover:bg-[var(--primary-red-dark)]"
                      : "text-[var(--text-secondary)] hover:bg-gray-100 hover:text-[var(--primary-red)]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Image Slider */}
      <section className="relative h-screen min-h-[500px] sm:min-h-[600px] max-h-[900px] overflow-hidden">
        {/* Image Slider */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content Overlay */}
        <div className="relative h-full flex items-center justify-center pt-20 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-4xl space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight drop-shadow-lg px-4 sm:px-0">
                  Shaping Tomorrow's Global Hospitality Leaders
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 leading-relaxed drop-shadow-md px-4 sm:px-0">
                  Starting Today in Association with{" "}
                  <span className="text-[var(--primary-red-light)] font-semibold">
                    MAF Accor Hotels and Resorts
                  </span>{" "}
                  – Dubai UAE
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 sm:px-0">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="bg-[var(--primary-red)] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md hover:bg-[var(--primary-red-dark)] transition-colors font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Start Your Journey
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md hover:bg-white hover:text-[var(--primary-red)] transition-colors font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-6 sm:w-8 bg-[var(--primary-red)]"
                  : "w-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 hidden lg:block">
          <div className="flex flex-col items-center space-y-2 text-white/70">
            <span className="text-xs sm:text-sm font-medium">Scroll</span>
            <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1.5 sm:p-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/70 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About EHH */}
      <section
        id="about"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <div className="text-center space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
              About EHH
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-[var(--primary-red)] mx-auto"></div>
          </div>
          <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            <p>
              <span className="font-semibold text-[var(--text-primary)]">
                Ecole Hôtelière Helvétique (EHH)
              </span>{" "}
              is a Swiss-inspired hospitality and culinary academy dedicated to
              developing future-ready professionals for the global tourism and
              service industry. Our approach is simple:{" "}
              <span className="font-semibold text-[var(--primary-red)]">
                Real learning happens in the Real World.
              </span>
            </p>
            <p>
              EHH brings an innovative and industry-driven model of education to
              students in the UAE and beyond, ensuring every learner gains
              confidence, competence, and international exposure from the very
              start.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Unique */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--section-bg)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
              What Makes Us Unique
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-[var(--primary-red)] mx-auto"></div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Blended Learning */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[var(--primary-red)] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl sm:text-2xl font-bold">
                  1
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                Blended Learning Excellence
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Our programs combine the best of two worlds:
              </p>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li className="flex items-start">
                  <span className="text-[var(--primary-red)] mr-2 font-bold">
                    30%
                  </span>
                  <span>
                    Academic Theory – built on strong academic foundations and
                    industry standards.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-red)] mr-2 font-bold">
                    70%
                  </span>
                  <span>
                    Practical Training – real-life experience in hotels,
                    kitchens, restaurants, and frontline operations.
                  </span>
                </li>
              </ul>
              <p className="text-[var(--text-secondary)] italic">
                This balanced approach ensures students do not just learn
                hospitality — they live it from DAY 1.
              </p>
            </div>

            {/* Real-World Experience */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[var(--primary-red)] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl sm:text-2xl font-bold">
                  2
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                Real-World Experience From Day One
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                At EHH, students enter the real hospitality environment from
                their very first day. They train, work, and grow inside actual
                hotels and culinary operations, gaining industry exposure that
                traditional programs only offer after graduation or in a
                simulated environment. Our students evolve in the{" "}
                <span className="font-semibold text-[var(--primary-red)]">
                  REAL business world.
                </span>
              </p>
            </div>

            {/* Dual Pathways */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[var(--primary-red)] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl sm:text-2xl font-bold">
                  3
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                Dual Pathways: Hospitality Business & Culinary Arts
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We offer two core professional programs designed to prepare
                students for international career opportunities right after
                completion.
              </p>
            </div>

            {/* Progression to Europe */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[var(--primary-red)] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl sm:text-2xl font-bold">
                  4
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                Progression to Europe – Specialization Opportunities
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Students have the opportunity to continue their studies or
                specialize in Europe, including partnerships with leading
                institutions in Switzerland, France, Italy, and Hungary. These
                pathways allow students to elevate their academic qualifications
                and gain global exposure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section
        id="programs"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
              Our Programs
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-[var(--primary-red)] mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            {/* Hospitality Business Program */}
            <div className="space-y-4 sm:space-y-6">
              <div className="relative h-48 sm:h-56 lg:h-64 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://imagesplashh.vercel.app/api/image/600/400/Hospitality+Business"
                  alt="Hospitality Business Program"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  Hospitality Business Program
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-[var(--text-secondary)]">
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-3 mt-1">
                      •
                    </span>
                    <span>Front Office</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-3 mt-1">
                      •
                    </span>
                    <span>Guest Relations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-3 mt-1">
                      •
                    </span>
                    <span>F&B Service</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-3 mt-1">
                      •
                    </span>
                    <span>Hotel Operations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-3 mt-1">
                      •
                    </span>
                    <span>Hospitality Leadership Foundations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-3 mt-1">
                      •
                    </span>
                    <span>Guest Accounting</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-3 mt-1">
                      •
                    </span>
                    <span>Auditing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-3 mt-1">
                      •
                    </span>
                    <span>Entrepreneurship/Business Studies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-3 mt-1">
                      •
                    </span>
                    <span>
                      Integrated Project: Hospitality Business Project
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Culinary Arts Program */}
            <div className="space-y-4 sm:space-y-6">
              <div className="relative h-48 sm:h-56 lg:h-64 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://imagesplashh.vercel.app/api/image/600/400/Culinary+Arts"
                  alt="Culinary Arts Program"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  Culinary Arts Program
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-[var(--text-secondary)]">
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-3 mt-1">
                      •
                    </span>
                    <span>Culinary Fundamentals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-3 mt-1">
                      •
                    </span>
                    <span>Classical Cooking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-3 mt-1">
                      •
                    </span>
                    <span>Baking and Pastry</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-3 mt-1">
                      •
                    </span>
                    <span>Hot & Cold Kitchen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-3 mt-1">
                      •
                    </span>
                    <span>Menu Planning and Costing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-3 mt-1">
                      •
                    </span>
                    <span>Food Safety and Hygiene</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-3 mt-1">
                      •
                    </span>
                    <span>Professional Chef Development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-3 mt-1">
                      •
                    </span>
                    <span>Entrepreneurship/Business Studies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-3 mt-1">
                      •
                    </span>
                    <span>Integrated Project: Culinary Business Project</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Dubai */}
      <section
        id="why-dubai"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--section-bg)]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] px-4 sm:px-0">
              Why Choose Dubai as Your Study–Work–Live Destination?
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-[var(--primary-red)] mx-auto"></div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-10 lg:mb-12">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm text-center space-y-3 sm:space-y-4">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--primary-red)]">
                A Global Tourism Capital
              </div>
              <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                Dubai welcomes millions of visitors annually and is home to
                hundreds of luxury hotels, award-winning restaurants, and global
                hospitality brands.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm text-center space-y-3 sm:space-y-4">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--primary-red)]">
                Career Opportunities Everywhere
              </div>
              <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                5-star hotels, international brands, world-class restaurants,
                mega events, tourism companies, and startup opportunities.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm text-center space-y-3 sm:space-y-4">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--primary-red)]">
                Safe, Modern, and Multicultural
              </div>
              <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                With over 200 nationalities, Dubai is one of the safest and most
                international cities in the world.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm text-center space-y-3 sm:space-y-4">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--primary-red)]">
                Future-Ready Lifestyle
              </div>
              <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                Safe and secured city, high-tech infrastructure, excellent
                quality of life, competitive work opportunities, and a
                fast-growing professional landscape.
              </p>
            </div>
          </div>

          <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://imagesplashh.vercel.app/api/image/1200/600/Dubai+Skyline"
              alt="Dubai"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why Study Hospitality */}
      <section
        id="why-study"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] px-4 sm:px-0">
              Why Study Hospitality Management & Culinary Arts?
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-[var(--primary-red)] mx-auto"></div>
            <p className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto px-4 sm:px-0">
              Studying Hospitality Management and Culinary Arts offers a unique
              combination of skills, blending business acumen, customer service,
              and culinary creativity.
            </p>
          </div>

          <div className="space-y-12 sm:space-y-16">
            {/* Global Career Opportunities */}
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://imagesplashh.vercel.app/api/image/800/600/Global+Careers"
                  alt="Global Career Opportunities"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  Global Career Opportunities
                </h3>
                <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                  Graduates have access to a wide range of careers worldwide:
                  Hotels, Resorts, Cruise Lines, Fine Dining & F&B Operations,
                  Event Management & Catering. The global culinary market was
                  valued at over $3.5 trillion (2024), with a projected growth
                  rate of 6% annually.
                </p>
              </div>
            </div>

            {/* Transferable Skills */}
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
              <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  Transferable Skills
                </h3>
                <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                  A combination of hospitality management and culinary arts
                  provides a versatile skill set: Leadership & Team Management,
                  Creative & Critical Thinking, Customer Service &
                  Communication, Business & Financial Acumen, Problem Solving &
                  Adaptability, and Tech & Innovation.
                </p>
                <p className="text-[var(--text-light)] italic">
                  A 2023 Cornell University study found that 90% of hospitality
                  and culinary graduates reported that their skills were
                  applicable in diverse industries.
                </p>
              </div>
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg order-1 lg:order-2">
                <Image
                  src="https://imagesplashh.vercel.app/api/image/800/600/Transferable+Skills"
                  alt="Transferable Skills"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Entrepreneurship */}
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://imagesplashh.vercel.app/api/image/800/600/Entrepreneurship"
                  alt="Entrepreneurship Opportunities"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  Entrepreneurship Opportunities
                </h3>
                <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                  Graduates are uniquely equipped to launch their own
                  businesses: Restaurants, Cafes, Catering Ventures, Boutique
                  Hotels & Culinary Lodges, Franchise Ownership, and Food
                  Innovation & Specialty Products.
                </p>
                <p className="text-[var(--text-light)] italic">
                  According to Hospitality Net (2023), entrepreneurship in
                  hospitality and culinary ventures is rapidly growing, with
                  boutique hotels and culinary startups seeing annual growth
                  rates of 15–20%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Students Choose EHH */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--section-bg)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
              Why Students Choose EHH
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-[var(--primary-red)] mx-auto"></div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              "Swiss-inspired education model - Practicals with Academic underpinning",
              "Real industry training, not simulations",
              "Highly experienced industry faculty mentorship",
              "International progression opportunities",
              "Career-centric program",
              "Immediate exposure to hospitality workplaces",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border-l-4 border-[var(--primary-red)]"
              >
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section
        id="contact"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--primary-red)]"
      >
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Contact Our Team Today!
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed px-4 sm:px-0">
            EHH graduates stand out because they have what the industry values
            most: hands-on experience, professionalism, and global readiness.
          </p>
          <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-white italic px-4 sm:px-0">
            "Your global hospitality career starts here! Connect with us if
            you're serious about excelling in the service sector, creating your
            own business, or exploring international opportunities."
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <button className="bg-white text-[var(--primary-red)] px-6 sm:px-8 py-3 sm:py-4 rounded-md hover:bg-gray-100 transition-colors font-semibold text-base sm:text-lg">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md hover:bg-white/10 transition-colors font-semibold text-base sm:text-lg">
              Request Information
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--text-primary)] text-white py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[var(--primary-red)] rounded"></div>
                <span className="text-lg sm:text-xl font-semibold">EHH</span>
              </div>
              <p className="text-sm sm:text-base text-gray-400">
                Ecole Hôtelière Helvétique - Shaping Tomorrow's Global
                Hospitality Leaders
              </p>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="hover:text-white transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("programs")}
                    className="hover:text-white transition-colors"
                  >
                    Programs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("why-dubai")}
                    className="hover:text-white transition-colors"
                  >
                    Why Dubai
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Contact
              </h4>
              <p className="text-sm sm:text-base text-gray-400">Dubai, UAE</p>
              <p className="text-sm sm:text-base text-gray-400">
                In Association with MAF Accor Hotels and Resorts
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 sm:pt-8 text-center text-sm sm:text-base text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Ecole Hôtelière Helvétique. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
