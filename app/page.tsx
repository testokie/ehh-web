"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Globe,
  Briefcase,
  Shield,
  Zap,
  GraduationCap,
  Building2,
  Route,
  Plane,
  MessageCircle,
  Link,
} from "lucide-react";

const heroSlides = [
  {
    image: "/hero/hom1.webp",
    alt: "EHH Campus Dubai",
  },
  {
    image: "/hero/hom2.webp",
    alt: "Hospitality Training",
  },
  {
    image: "/hero/hom3.webp",
    alt: "Culinary Arts Program",
  },
  {
    image: "/hero/hom4.webp",
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      setIsScrolled(scrollY > 50);
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
              <div className="relative min-w-48 h-8 md:h-10">
                <Image
                  src="/main-logo-new.png"
                  alt="EHH Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className={`transition-colors font-medium ${
                    item.isCTA
                      ? `px-6 py-2 rounded-md bg-primary-red text-white hover:bg-primary-red-dark`
                      : isScrolled
                      ? "text-text-secondary hover:text-primary-red"
                      : "text-white/90 hover:text-primary-red"
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
                isScrolled
                  ? "text-text-primary hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
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
                      ? "bg-primary-red text-white hover:bg-primary-red-dark"
                      : "text-text-secondary hover:bg-gray-100 hover:text-primary-red"
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
                  <span className="text-primary-red-light font-semibold">
                    MAF Accor Hotels and Resorts
                  </span>{" "}
                  – Dubai UAE
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 sm:px-0">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="bg-primary-red text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md hover:bg-primary-red-dark transition-colors font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Start Your Journey
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md hover:bg-white hover:text-primary-red transition-colors font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
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
                  ? "w-6 sm:w-8 bg-primary-red"
                  : "w-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* About EHH */}
      <section
        id="about"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <div className="text-center space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
              About EHH
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-primary-red mx-auto"></div>
          </div>
          <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-text-secondary leading-relaxed">
            <p>
              <span className="font-semibold text-text-primary">
                Ecole Hôtelière Helvétique (EHH)
              </span>{" "}
              is a Swiss-inspired hospitality and culinary academy dedicated to
              developing future-ready professionals for the global tourism and
              service industry. Our approach is simple:{" "}
              <span className="font-semibold text-primary-red">
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
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-section-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
              What Makes Us Unique
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-primary-red mx-auto"></div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Blended Learning */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-red rounded-lg flex items-center justify-center mx-auto">
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary text-center">
                Blended Learning Excellence
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Our programs combine the best of two worlds:
              </p>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-start">
                  <span className="text-primary-red mr-2 font-bold">30%</span>
                  <span>
                    Academic Theory – built on strong academic foundations and
                    industry standards.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-red mr-2 font-bold">70%</span>
                  <span>
                    Practical Training – real-life experience in hotels,
                    kitchens, restaurants, and frontline operations.
                  </span>
                </li>
              </ul>
              <p className="text-text-secondary italic">
                This balanced approach ensures students do not just learn
                hospitality — they live it from DAY 1.
              </p>
            </div>

            {/* Real-World Experience */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-red rounded-lg flex items-center justify-center mx-auto">
                <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary text-center">
                Real-World Experience From Day One
              </h3>
              <p className="text-text-secondary leading-relaxed">
                At EHH, students enter the real hospitality environment from
                their very first day. They train, work, and grow inside actual
                hotels and culinary operations, gaining industry exposure that
                traditional programs only offer after graduation or in a
                simulated environment. Our students evolve in the{" "}
                <span className="font-semibold text-primary-red">
                  REAL business world.
                </span>
              </p>
            </div>

            {/* Dual Pathways */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-red rounded-lg flex items-center justify-center mx-auto">
                <Route className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary text-center">
                Dual Pathways: Hospitality Business & Culinary Arts
              </h3>
              <p className="text-text-secondary leading-relaxed">
                We offer two core professional programs designed to prepare
                students for international career opportunities right after
                completion.
              </p>
            </div>

            {/* Progression to Europe */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-red rounded-lg flex items-center justify-center mx-auto">
                <Plane className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary text-center">
                Progression to Europe – Specialization Opportunities
              </h3>
              <p className="text-text-secondary leading-relaxed">
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
        className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
              Our Programs
            </h2>
            <div className="w-24 h-1 bg-primary-red mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Hospitality Business Program */}
            <div className="bg-section-bg rounded-xl overflow-hidden">
              <div className="relative h-72 lg:h-96">
                <Image
                  src="/prog1.jpg"
                  alt="Hospitality Business Program"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 lg:p-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6">
                  Hospitality Business Program
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-3">
                    {[
                      "Front Office",
                      "Guest Relations",
                      "F&B Service",
                      "Hotel Operations",
                      "Hospitality Leadership Foundations",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 text-text-secondary"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-red mt-2 shrink-0"></div>
                        <span className="text-sm sm:text-base">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {[
                      "Guest Accounting",
                      "Auditing",
                      "Entrepreneurship/Business Studies",
                      "Integrated Project: Hospitality Business Project",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 text-text-secondary"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-red mt-2 shrink-0"></div>
                        <span className="text-sm sm:text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Culinary Arts Program */}
            <div className="bg-section-bg rounded-xl overflow-hidden">
              <div className="relative h-72 lg:h-96">
                <Image
                  src="/prog2.png"
                  alt="Culinary Arts Program"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 lg:p-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6">
                  Culinary Arts Program
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-3">
                    {[
                      "Culinary Fundamentals",
                      "Classical Cooking",
                      "Baking and Pastry",
                      "Hot & Cold Kitchen",
                      "Menu Planning and Costing",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 text-text-secondary"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-red mt-2 shrink-0"></div>
                        <span className="text-sm sm:text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {[
                      "Food Safety and Hygiene",
                      "Professional Chef Development",
                      "Entrepreneurship/Business Studies",
                      "Integrated Project: Culinary Business Project",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 text-text-secondary"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-red mt-2 shrink-0"></div>
                        <span className="text-sm sm:text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pullman Training Hub Section */}
      <section className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-section-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
              Pullman Dubai Creek City Centre
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              EHH Academic Training Hub
            </p>
            <div className="w-24 h-1 bg-primary-red mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/campus.webp"
                alt="Pullman Dubai Creek City Centre"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-text-secondary leading-relaxed">
              <p>
                EHH conducts both theory classes and hands-on practical training
                at the prestigious{" "}
                <span className="font-semibold text-text-primary">
                  MAF Accor Pullman Dubai Creek City Centre
                </span>
                , a 5-star property directly connected to City Centre Deira. The
                hotel offers all the facilities of a modern premium hotel,
                providing the perfect platform for students to apply their
                knowledge in real time.
              </p>
              <p>
                As a 5-star luxury hotel, Pullman exposes students to
                world-class guests and the highest standards of service,
                preparing them for the challenging yet rewarding career paths of
                the global hospitality industry. From Food production,
                Restaurant operations, Front Office and F&B to events, guest
                services, and hotel operations and management, students gain
                practical experience that builds confidence, professionalism,
                and a true understanding of luxury hospitality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Dubai */}
      <section
        id="why-dubai"
        className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
              Why Choose Dubai?
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Your Study–Work–Live Destination
            </p>
            <div className="w-24 h-1 bg-primary-red mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-primary-red rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    Global Tourism Capital
                  </h3>
                  <p className="text-text-secondary">
                    Millions of visitors annually, hundreds of luxury hotels,
                    and award-winning restaurants.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-primary-red rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    Career Opportunities
                  </h3>
                  <p className="text-text-secondary">
                    5-star hotels, international brands, world-class
                    restaurants, and startup opportunities.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-primary-red rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    Safe & Multicultural
                  </h3>
                  <p className="text-text-secondary">
                    Over 200 nationalities in one of the world's safest and most
                    international cities.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-primary-red rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    Future-Ready Lifestyle
                  </h3>
                  <p className="text-text-secondary">
                    High-tech infrastructure, excellent quality of life, and a
                    fast-growing professional landscape.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[30rem] lg:h-[40rem] rounded-lg overflow-hidden">
            <Image src="/dubai.jpg" alt="Dubai" fill className="object-cover" />
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary px-4 sm:px-0">
              Why Study Hospitality Management & Culinary Arts?
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-primary-red mx-auto"></div>
            <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto px-4 sm:px-0">
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
                  src="/1.png"
                  alt="Global Career Opportunities"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary">
                  Global Career Opportunities
                </h3>
                <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
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
                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary">
                  Transferable Skills
                </h3>
                <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                  A combination of hospitality management and culinary arts
                  provides a versatile skill set: Leadership & Team Management,
                  Creative & Critical Thinking, Customer Service &
                  Communication, Business & Financial Acumen, Problem Solving &
                  Adaptability, and Tech & Innovation.
                </p>
                <p className="text-text-light italic">
                  A 2023 Cornell University study found that 90% of hospitality
                  and culinary graduates reported that their skills were
                  applicable in diverse industries.
                </p>
              </div>
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg order-1 lg:order-2">
                <Image
                  src="/2.png"
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
                  src="/3.png"
                  alt="Entrepreneurship Opportunities"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary">
                  Entrepreneurship Opportunities
                </h3>
                <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                  Graduates are uniquely equipped to launch their own
                  businesses: Restaurants, Cafes, Catering Ventures, Boutique
                  Hotels & Culinary Lodges, Franchise Ownership, and Food
                  Innovation & Specialty Products.
                </p>
                <p className="text-text-light italic">
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

      {/* Director's Message */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
              Director's Message
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-primary-red mx-auto"></div>
          </div>

          <div className="bg-section-bg rounded-lg p-6 sm:p-8 lg:p-10 shadow-sm">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Message Content */}
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-text-secondary leading-relaxed">
                <p>
                  <span className="font-semibold text-text-primary text-lg sm:text-xl">
                    "Why do you need an education?"
                  </span>
                </p>
                <p>
                  We at EHH believe that the best long-term investment is the
                  investment in your education in the field of your choice.
                </p>
                <p>
                  For us at{" "}
                  <span className="font-semibold text-primary-red">
                    Ecole Hôtelière Helvétique
                  </span>
                  , Education without a "Well-defined" career pathway is an
                  incomplete educational solution; EHH focuses on developing
                  young responsible adults for a meaningful career which
                  directly contributes to the sustainable global tourism
                  industry.
                </p>
                <p>
                  <span className="font-semibold text-text-primary">
                    Our tagline "Real Learning for Real Careers"
                  </span>
                </p>
                <p>
                  At EHH, we offer the students a transformed way of learning
                  where we integrate our business modules into the real world
                  from day one. We are unique because our programs are
                  innovative, hands-on, and forward-thinking, aligned with
                  acquiring knowledge, mastering skills, and eventually taking
                  the lead.
                </p>
                <p>
                  Our graduates are one of the most sought-after young
                  professionals; we aim to secure their internships and career
                  opportunities and we plan to continue to open more career
                  doors for young learners exposing them to the international
                  arena across the Globe.
                </p>
                <p className="font-semibold text-text-primary">
                  Are you ambitious and determined and ready for REAL WORLD,
                  REAL CAREERS, we will be happy to hear from you and join you
                  on the journey of TRANSFORMATION.
                </p>
              </div>

              {/* Director Image and Name */}
              <div className="space-y-6 order-first lg:order-last">
                <div className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg bg-gray-100">
                  <img
                    src="./director.jpeg"
                    alt="Valeriya Krupenya - Director"
                    className="w-full"
                  />
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-xl sm:text-2xl font-bold text-text-primary">
                    Valeriya Krupenya
                  </p>
                  <p className="text-lg sm:text-xl font-semibold text-primary-red">
                    Director
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Students Choose EHH */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-section-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
              Why Students Choose EHH
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-primary-red mx-auto"></div>
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
                className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border-l-4 border-primary-red"
              >
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
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
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-primary-red"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 sm:space-y-8 mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Contact Our Team Today!
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed px-4 sm:px-0">
              EHH graduates stand out because they have what the industry values
              most: hands-on experience, professionalism, and global readiness.
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-white italic px-4 sm:px-0">
              "Your global hospitality career starts here! Connect with us if
              you're serious about excelling in the service sector, creating
              your own business, or exploring international opportunities."
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">ADDRESS</h3>
              <div className="text-white/90 text-sm sm:text-base space-y-1">
                <p>
                  Admin Office: Science Park - Al Barsha South ( By appointment
                  only )
                </p>
                <p>P.O.Box 345025</p>
                <p>Dubai - United Arab Emirates</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Contact</h3>
              <div className="text-white/90 text-sm sm:text-base space-y-2">
                <p className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 shrink-0" />
                  <a
                    href="mailto:info@ehheducation.com"
                    className="hover:text-white transition-colors"
                  >
                    info@ehheducation.com
                  </a>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 shrink-0" />
                  <a
                    href="mailto:info@swisse.com"
                    className="hover:text-white transition-colors"
                  >
                    info@swisse.com
                  </a>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>

                  <a
                    href="https://wa.me/971501016067"
                    className="hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +971 50 101 6067
                  </a>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>

                  <a
                    href="https://wa.me/971507353900"
                    className="hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +971 50 735 3900
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-text-primary text-white py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <div className="relative min-w-48 h-8 md:h-10">
                  <Image
                    src="/main-logo-new.png"
                    alt="EHH Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-400">
                Ecole Hôtelière Helvétique - Shaping Tomorrow's Global
                Hospitality Leaders
              </p>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center">
                <span className="w-8 h-8 bg-primary-red rounded-full flex items-center justify-center mr-2">
                  <Link className="w-4 h-4 text-white" />
                </span>
                <span>Quick Links</span>
              </h4>
              <ul className="space-y-2 text-sm sm:text-base">
                {navItems.map((item) => (
                  <li key={item.sectionId}>
                    <button
                      onClick={() => scrollToSection(item.sectionId)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center">
                <span className="w-8 h-8 bg-primary-red rounded-full flex items-center justify-center mr-2">
                  <Phone className="w-4 h-4 text-white" />
                </span>
                <span>Contact</span>
              </h4>
              <div className="space-y-2 text-sm sm:text-base text-gray-400">
                <p className="pt-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 shrink-0 text-gray-400" />
                  <a
                    href="mailto:info@ehheducation.com"
                    className="hover:text-white transition-colors"
                  >
                    info@ehheducation.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 shrink-0 text-gray-400" />
                  <a
                    href="mailto:info@swisse.com"
                    className="hover:text-white transition-colors"
                  >
                    info@swisse.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 shrink-0 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <a
                    href="https://wa.me/971501016067"
                    className="hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +971 50 101 6067
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 shrink-0 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <a
                    href="https://wa.me/971507353900"
                    className="hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +971 50 735 3900
                  </a>
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                CONNECT US
              </h4>
              <ul className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap w-fit">
                <li>
                  <a
                    href="https://www.facebook.com/ecolehotelierehelvetique/?ref=page_internal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:bg-white/10"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/ecole-hoteliere-helvetique/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:bg-white/10"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/ehheducation/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:bg-white/10"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UC_60J4DAFPrzJ3QczG5cOOg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:bg-white/10"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                </li>
              </ul>
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
