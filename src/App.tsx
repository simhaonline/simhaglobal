import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  Phone, 
  ArrowRight, 
  Menu, 
  X,
  ChevronRight,
  CheckCircle2,
  Calendar,
  User,
  ChevronLeft,
  Package
} from 'lucide-react';
import { marked } from 'marked';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Types
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
  content?: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  slug: string;
  description?: string;
  content?: string;
}

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Corner Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`fixed top-6 right-6 z-[60] w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-300 ${
          isScrolled || isMobileMenuOpen 
            ? 'bg-[#070A12]/90 border border-[rgba(244,246,255,0.2)]' 
            : 'bg-[#070A12]/50 border border-[rgba(244,246,255,0.1)]'
        } hover:bg-[#070A12] hover:border-[#B8B9F3]`}
      >
        {isMobileMenuOpen ? (
          <X size={24} className="text-[#F4F6FF]" />
        ) : (
          <Menu size={24} className="text-[#F4F6FF]" />
        )}
      </button>

      {/* Logo - always visible */}
      <div className={`fixed top-6 left-6 z-[60] font-display font-bold text-xl text-[#F4F6FF] transition-all duration-300 ${
        isScrolled ? 'opacity-100' : 'opacity-0'
      }`}>
        Simha Global
      </div>

      {/* Full Screen Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#070A12]/98 backdrop-blur-lg">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <button onClick={() => scrollToSection('hero')} className="text-3xl text-[#F4F6FF] font-display hover:text-[#B8B9F3] transition-colors">Home</button>
            <button onClick={() => scrollToSection('sectors')} className="text-3xl text-[#F4F6FF] font-display hover:text-[#B8B9F3] transition-colors">Sectors</button>
            <button onClick={() => scrollToSection('products')} className="text-3xl text-[#F4F6FF] font-display hover:text-[#B8B9F3] transition-colors">Products</button>
            <button onClick={() => scrollToSection('network')} className="text-3xl text-[#F4F6FF] font-display hover:text-[#B8B9F3] transition-colors">Network</button>
            <button onClick={() => scrollToSection('about')} className="text-3xl text-[#F4F6FF] font-display hover:text-[#B8B9F3] transition-colors">About</button>
            <button onClick={() => scrollToSection('projects')} className="text-3xl text-[#F4F6FF] font-display hover:text-[#B8B9F3] transition-colors">Projects</button>
            <button onClick={() => scrollToSection('blog')} className="text-3xl text-[#F4F6FF] font-display hover:text-[#B8B9F3] transition-colors">Blog</button>
            <button onClick={() => scrollToSection('contact')} className="btn-primary mt-4 text-lg px-8 py-4">Get in Touch</button>
          </div>
        </div>
      )}
    </>
  );
}

// Hero Section with Full-Screen Image Slider
function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { image: '/images/01.jpg', title: 'Technology Infrastructure' },
    { image: '/images/05.jpg', title: 'Agricultural Excellence' },
    { image: '/images/06.jpg', title: 'Global Logistics' },
    { image: '/images/08.jpg', title: 'Minerals & Resources' },
    { image: '/images/09.jpg', title: 'Mining Operations' },
    { image: '/images/10.jpg', title: 'Data Solutions' },
    { image: '/images/background.jpg', title: 'Reaching New Heights' },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial load animation
      gsap.fromTo('.hero-content',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070A12]/60 via-[#070A12]/40 to-[#070A12]/80" />
        </div>
      ))}

      {/* Content */}
      <div className="hero-content relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="eyebrow mb-4">GLOBAL HOLDING COMPANY</p>
        <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-[#F4F6FF] mb-6 leading-tight">
          Simha Global
        </h1>
        <p className="text-[#A7B0C8] text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
          Operating across metals, agriculture, technology, and investments—built for scale, governed by clarity.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button onClick={() => scrollToSection('sectors')} className="btn-primary flex items-center gap-2">
            Explore Sectors <ArrowRight size={18} />
          </button>
          <button onClick={() => scrollToSection('contact')} className="btn-secondary">
            Contact Us
          </button>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button 
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-[#070A12]/50 border border-[rgba(244,246,255,0.2)] flex items-center justify-center hover:bg-[#070A12] hover:border-[#B8B9F3] transition-all"
        >
          <ChevronLeft size={20} className="text-[#F4F6FF]" />
        </button>
        
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-[#B8B9F3] w-6' 
                  : 'bg-[rgba(244,246,255,0.3)] hover:bg-[rgba(244,246,255,0.5)]'
              }`}
            />
          ))}
        </div>
        
        <button 
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-[#070A12]/50 border border-[rgba(244,246,255,0.2)] flex items-center justify-center hover:bg-[#070A12] hover:border-[#B8B9F3] transition-all"
        >
          <ChevronRight size={20} className="text-[#F4F6FF]" />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 z-20 text-[#A7B0C8] font-mono text-sm">
        {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </section>
  );
}

// Business Pillar Section Component
function BusinessPillarSection({ 
  id, 
  eyebrow, 
  title, 
  description, 
  cardTitle, 
  bullets, 
  image, 
  zIndex 
}: { 
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  cardTitle: string;
  bullets: string[];
  image: string;
  zIndex: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl
        .fromTo(imageRef.current, 
          { opacity: 0, scale: 1.10 }, 
          { opacity: 1, scale: 1, ease: 'none' }, 
          0
        )
        .fromTo(contentRef.current, 
          { x: '-40vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'power2.out' }, 
          0
        )
        .fromTo(cardRef.current, 
          { x: '40vw', opacity: 0, rotate: -2 }, 
          { x: 0, opacity: 1, rotate: 0, ease: 'power2.out' }, 
          0
        );

      scrollTl
        .fromTo(contentRef.current, 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(cardRef.current, 
          { x: 0, opacity: 1 }, 
          { x: '18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(imageRef.current, 
          { scale: 1, opacity: 1 }, 
          { scale: 1.06, opacity: 0.65, ease: 'power2.in' }, 
          0.7
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id={id} className="section-pinned relative" style={{ zIndex }}>
      <div ref={imageRef} className="absolute inset-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      
      <div className="absolute inset-0 bg-[#070A12]/78 slash-overlay-alt" />
      
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-6 lg:px-12 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div ref={contentRef} className="max-w-xl">
            <p className="eyebrow mb-4">{eyebrow}</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#F4F6FF] mb-6">
              {title}
            </h2>
            <p className="text-[#A7B0C8] text-lg mb-8 leading-relaxed">
              {description}
            </p>
            <button className="btn-secondary flex items-center gap-2">
              View capabilities <ArrowRight size={18} />
            </button>
          </div>
          
          <div ref={cardRef} className="hidden lg:block">
            <div className="bg-[#0B1022]/80 backdrop-blur-sm border border-[rgba(244,246,255,0.14)] p-8 rounded-lg">
              <h3 className="font-display font-semibold text-xl text-[#F4F6FF] mb-4">{cardTitle}</h3>
              <ul className="space-y-3">
                {bullets.map((bullet, index) => (
                  <li key={index} className="flex items-center gap-3 text-[#F4F6FF]">
                    <CheckCircle2 size={18} className="text-[#B8B9F3]" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Products Section
function ProductsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productContent, setProductContent] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      const productFiles = [
        { slug: 'copper-ore', name: 'Copper Ore', category: 'Metals & Minerals', image: '/images/08.jpg' },
        { slug: 'iron-ore', name: 'Iron Ore', category: 'Metals & Minerals', image: '/images/09.jpg' },
        { slug: 'wheat', name: 'Wheat', category: 'Agriculture', image: '/images/05.jpg' },
        { slug: 'soybeans', name: 'Soybeans', category: 'Agriculture', image: '/images/06.jpg' },
        { slug: 'cloud-services', name: 'Cloud Services', category: 'Information Technology', image: '/images/01.jpg' },
        { slug: 'cybersecurity', name: 'Cybersecurity', category: 'Information Technology', image: '/images/10.jpg' },
      ];

      const loadedProducts: Product[] = [];

      for (const product of productFiles) {
        try {
          const response = await fetch(`/products/${product.slug}.md`);
          const content = await response.text();
          const lines = content.split('\n');
          const description = lines.find(line => line.startsWith('## Product Description') || line.startsWith('## Service Description'));
          const descIndex = lines.indexOf(description || '');
          const descText = descIndex >= 0 ? lines[descIndex + 2] : '';

          loadedProducts.push({
            id: product.slug,
            name: product.name,
            category: product.category,
            image: product.image,
            slug: product.slug,
            description: descText,
            content
          });
        } catch (error) {
          console.error(`Failed to load ${product.slug}:`, error);
        }
      }

      setProducts(loadedProducts);
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(cardsRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [products]);

  const openProduct = async (product: Product) => {
    setSelectedProduct(product);
    if (product.content) {
      const html = await marked(product.content);
      setProductContent(html);
    }
  };

  const closeProduct = () => {
    setSelectedProduct(null);
    setProductContent('');
  };

  return (
    <section ref={sectionRef} id="products" className="relative py-24 lg:py-32 bg-[#070A12]">
      <div className="w-full px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow mb-4">OUR OFFERINGS</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#F4F6FF] mb-6">
            Products & Services
          </h2>
          <p className="text-[#A7B0C8] text-lg">
            Comprehensive range of products and services across our business sectors.
          </p>
        </div>

        {/* Product Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              onClick={() => openProduct(product)}
              className="group bg-[#0B1022] border border-[rgba(244,246,255,0.14)] rounded-lg overflow-hidden card-hover cursor-pointer"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Package size={16} className="text-[#B8B9F3]" />
                  <span className="text-xs text-[#B8B9F3] uppercase tracking-wider">{product.category}</span>
                </div>
                <h3 className="font-display font-semibold text-lg text-[#F4F6FF] mb-2">
                  {product.name}
                </h3>
                <p className="text-[#A7B0C8] text-sm line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-[#B8B9F3] text-sm">
                  View details <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-[#070A12]/95 backdrop-blur-lg overflow-y-auto">
          <div className="min-h-screen px-6 lg:px-12 py-24">
            <div className="max-w-4xl mx-auto">
              <button 
                onClick={closeProduct}
                className="fixed top-6 right-20 text-[#F4F6FF] hover:text-[#B8B9F3] transition-colors z-10"
              >
                <X size={32} />
              </button>
              
              <div className="aspect-video rounded-lg overflow-hidden mb-8">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <Package size={18} className="text-[#B8B9F3]" />
                <span className="text-sm text-[#B8B9F3] uppercase tracking-wider">{selectedProduct.category}</span>
              </div>
              
              <div 
                className="prose-blog"
                dangerouslySetInnerHTML={{ __html: productContent }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Global Presence Section with Blinking Points
function GlobalPresenceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<SVGSVGElement>(null);
  const regionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const paths = mapRef.current?.querySelectorAll('path');
      if (paths) {
        paths.forEach(path => {
          const length = (path as SVGPathElement).getTotalLength?.() || 1000;
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: mapRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          });
        });
      }

      gsap.fromTo(regionsRef.current?.children || [],
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          scrollTrigger: {
            trigger: regionsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const regions = [
    { name: 'Asia–Pacific', countries: 'India, China, Hong Kong, UAE' },
    { name: 'Americas', countries: 'USA' },
    { name: 'Europe', countries: 'Poland' },
    { name: 'Africa', countries: 'Tanzania, Ghana, Cameroon, Congo, Zambia' },
  ];

  // Office coordinates for blinking points
  const offices = [
    { name: 'India', cx: 720, cy: 160 },
    { name: 'China', cx: 780, cy: 140 },
    { name: 'Hong Kong', cx: 790, cy: 165 },
    { name: 'UAE', cx: 620, cy: 155 },
    { name: 'USA', cx: 150, cy: 130 },
    { name: 'Poland', cx: 520, cy: 110 },
    { name: 'Tanzania', cx: 540, cy: 260 },
    { name: 'Ghana', cx: 470, cy: 220 },
    { name: 'Cameroon', cx: 490, cy: 210 },
    { name: 'Congo', cx: 515, cy: 240 },
    { name: 'Zambia', cx: 530, cy: 280 },
  ];

  return (
    <section ref={sectionRef} id="network" className="relative py-24 lg:py-32 bg-[#070A12]">
      <div className="w-full px-6 lg:px-12">
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow mb-4">GLOBAL NETWORK</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#F4F6FF] mb-6">
            Offices where it matters
          </h2>
          <p className="text-[#A7B0C8] text-lg">
            Regulatory insight, local relationships, and on-the-ground logistics—in every market we serve.
          </p>
        </div>

        {/* World Map with Blinking Points */}
        <div className="mb-16 overflow-hidden">
          <svg ref={mapRef} viewBox="0 0 1000 500" className="w-full max-w-4xl mx-auto">
            {/* Continents */}
            <path d="M50,80 L280,80 L300,200 L180,250 L50,200 Z" 
              fill="rgba(244,246,255,0.08)" stroke="rgba(244,246,255,0.18)" strokeWidth="1.5" />
            <path d="M180,260 L300,260 L320,380 L220,450 L160,350 Z" 
              fill="rgba(244,246,255,0.08)" stroke="rgba(244,246,255,0.18)" strokeWidth="1.5" />
            <path d="M420,80 L580,80 L560,160 L440,150 Z" 
              fill="rgba(244,246,255,0.08)" stroke="rgba(244,246,255,0.18)" strokeWidth="1.5" />
            <path d="M440,170 L580,170 L600,300 L520,400 L420,300 Z" 
              fill="rgba(244,246,255,0.08)" stroke="rgba(244,246,255,0.18)" strokeWidth="1.5" />
            <path d="M590,80 L900,80 L920,200 L800,280 L600,200 Z" 
              fill="rgba(244,246,255,0.08)" stroke="rgba(244,246,255,0.18)" strokeWidth="1.5" />
            <path d="M750,320 L900,320 L880,420 L750,400 Z" 
              fill="rgba(244,246,255,0.08)" stroke="rgba(244,246,255,0.18)" strokeWidth="1.5" />
            
            {/* Blinking Office Points */}
            {offices.map((office, index) => (
              <g key={index}>
                {/* Outer pulse ring */}
                <circle 
                  cx={office.cx} 
                  cy={office.cy} 
                  r="12" 
                  fill="none" 
                  stroke="#B8B9F3" 
                  strokeWidth="1"
                  className="map-pulse-ring"
                />
                {/* Inner dot */}
                <circle 
                  cx={office.cx} 
                  cy={office.cy} 
                  r="5" 
                  fill="#B8B9F3"
                  className="map-pulse-dot"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Regions */}
        <div ref={regionsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map((region, index) => (
            <div key={index} className="border border-[rgba(244,246,255,0.14)] p-6 rounded-lg card-hover">
              <h4 className="font-display font-semibold text-lg text-[#F4F6FF] mb-2">{region.name}</h4>
              <p className="text-[#A7B0C8] text-sm">{region.countries}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current,
        { x: '-10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(contentRef.current,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(statsRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-24 lg:py-32 bg-[#070A12]">
      <div className="w-full px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div ref={imageRef} className="relative">
            <div className="aspect-[3/4] lg:aspect-[4/5] overflow-hidden rounded-lg" 
              style={{ clipPath: 'polygon(0 0, 100% 0, 78% 100%, 0 100%)' }}>
              <img 
                src="/images/about_handshake.jpg" 
                alt="Business Partnership" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div ref={contentRef}>
            <p className="eyebrow mb-4">ABOUT US</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#F4F6FF] mb-6">
              Built for scale.<br />
              <span className="text-[#B8B9F3]">Governed by clarity.</span>
            </h2>
            <div className="space-y-4 text-[#A7B0C8] leading-relaxed mb-8">
              <p>
                Simha Global is a holding company built to operate across borders and sectors. We don't just move goods—we structure trade, manage risk, and keep compliance at the center of every transaction.
              </p>
              <p>
                Our teams combine local market knowledge with global standards: clear reporting, strong controls, and long-term relationships.
              </p>
              <p>
                Whether it's a metals shipment, an agri export, or an infrastructure investment, we deliver with consistency.
              </p>
            </div>

            <div ref={statsRef} className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="font-display font-bold text-3xl md:text-4xl text-[#B8B9F3] mb-1">11</div>
                <div className="text-[#A7B0C8] text-sm">Countries</div>
              </div>
              <div className="text-center">
                <div className="font-display font-bold text-3xl md:text-4xl text-[#B8B9F3] mb-1">4</div>
                <div className="text-[#A7B0C8] text-sm">Sectors</div>
              </div>
              <div className="text-center">
                <div className="font-display font-bold text-3xl md:text-4xl text-[#B8B9F3] mb-1">∞</div>
                <div className="text-[#A7B0C8] text-sm">End-to-end</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Projects Section
function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.project-card');
      cards?.forEach((card, index) => {
        const image = card.querySelector('.card-image');
        const text = card.querySelector('.card-text');
        const direction = index % 2 === 0 ? -40 : 40;

        gsap.fromTo(image,
          { scale: 1.04, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        gsap.fromTo(text,
          { x: direction, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: 'Copper concentrate logistics — Central Africa to Asia',
      description: 'End-to-end coordination: sourcing, testing, customs, and port handling—delivered on schedule with full documentation.',
      image: '/images/project_copper_logistics.jpg'
    },
    {
      title: 'Agri export program — East Africa to Middle East',
      description: 'Warehousing, certification, and cold-chain logistics for high-volume grain and oilseed exports.',
      image: '/images/project_agri_export.jpg'
    },
    {
      title: 'IT infrastructure modernization — Multi-site deployment',
      description: 'Cloud migration, security hardening, and 24/7 support across distributed teams.',
      image: '/images/project_it_deployment.jpg'
    }
  ];

  return (
    <section ref={sectionRef} id="projects" className="relative py-24 lg:py-32 bg-[#070A12]">
      <div className="w-full px-6 lg:px-12">
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow mb-4">CASE STUDIES</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#F4F6FF] mb-6">
            Featured projects
          </h2>
          <p className="text-[#A7B0C8] text-lg">
            A few examples of how we turn complex supply chains into reliable outcomes.
          </p>
        </div>

        <div ref={cardsRef} className="space-y-12">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`project-card grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`card-image overflow-hidden rounded-lg border border-[rgba(244,246,255,0.14)] ${
                index % 2 === 1 ? 'lg:order-2' : ''
              }`}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-64 lg:h-80 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className={`card-text ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <h3 className="font-display font-semibold text-xl md:text-2xl text-[#F4F6FF] mb-4">
                  {project.title}
                </h3>
                <p className="text-[#A7B0C8] leading-relaxed mb-6">
                  {project.description}
                </p>
                <button className="text-[#B8B9F3] flex items-center gap-2 hover:gap-3 transition-all">
                  Read more <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Blog Section
function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [postContent, setPostContent] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      const blogFiles = [
        'expanding-agricultural-operations.md',
        'copper-market-outlook-2026.md',
        'it-infrastructure-trends.md',
        'investment-strategy-2026.md'
      ];

      const loadedPosts: BlogPost[] = [];

      for (const file of blogFiles) {
        try {
          const response = await fetch(`/blog/${file}`);
          const content = await response.text();
          const lines = content.split('\n');
          const title = lines[0].replace('# ', '');
          const dateMatch = content.match(/\*\*Published:\*\* (.+)/);
          const authorMatch = content.match(/\*\*Author:\*\* (.+)/);
          
          let excerpt = '';
          for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() && !lines[i].startsWith('**')) {
              excerpt = lines[i].substring(0, 150) + '...';
              break;
            }
          }

          loadedPosts.push({
            id: file,
            title,
            excerpt,
            date: dateMatch ? dateMatch[1] : '',
            author: authorMatch ? authorMatch[1] : '',
            slug: file.replace('.md', ''),
            content
          });
        } catch (error) {
          console.error(`Failed to load ${file}:`, error);
        }
      }

      setPosts(loadedPosts);
    };

    loadPosts();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(cardsRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [posts]);

  const openPost = async (post: BlogPost) => {
    setSelectedPost(post);
    if (post.content) {
      const html = await marked(post.content);
      setPostContent(html);
    }
  };

  const closePost = () => {
    setSelectedPost(null);
    setPostContent('');
  };

  return (
    <section ref={sectionRef} id="blog" className="relative py-24 lg:py-32 bg-[#0B1022]">
      <div className="w-full px-6 lg:px-12">
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow mb-4">INSIGHTS</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#F4F6FF] mb-6">
            Latest from our blog
          </h2>
          <p className="text-[#A7B0C8] text-lg">
            Industry insights, market analysis, and updates from across our operations.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div 
              key={post.id} 
              onClick={() => openPost(post)}
              className="bg-[#070A12] border border-[rgba(244,246,255,0.14)] p-6 rounded-lg card-hover cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-4 text-sm text-[#A7B0C8]">
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <User size={14} /> {post.author}
                </span>
              </div>
              <h3 className="font-display font-semibold text-lg text-[#F4F6FF] mb-3 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-[#A7B0C8] text-sm line-clamp-3">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-2 text-[#B8B9F3] text-sm">
                Read article <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-[#070A12]/95 backdrop-blur-lg overflow-y-auto">
          <div className="min-h-screen px-6 lg:px-12 py-24">
            <div className="max-w-3xl mx-auto">
              <button 
                onClick={closePost}
                className="fixed top-6 right-20 text-[#F4F6FF] hover:text-[#B8B9F3] transition-colors"
              >
                <X size={32} />
              </button>
              
              <div className="flex items-center gap-4 mb-6 text-sm text-[#A7B0C8]">
                <span className="flex items-center gap-1">
                  <Calendar size={16} /> {selectedPost.date}
                </span>
                <span className="flex items-center gap-1">
                  <User size={16} /> {selectedPost.author}
                </span>
              </div>
              
              <h1 className="font-display font-bold text-3xl md:text-4xl text-[#F4F6FF] mb-8">
                {selectedPost.title}
              </h1>
              
              <div 
                className="prose-blog"
                dangerouslySetInnerHTML={{ __html: postContent }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Contact Section (without Our Offices)
function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(formRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 lg:py-32 bg-[#070A12]">
      <div className="w-full px-6 lg:px-12">
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#F4F6FF] mb-6">
            Let's build something reliable.
          </h2>
          <p className="text-[#A7B0C8] text-lg">
            Tell us what you're moving, building, or investing in—we'll respond within two business days.
          </p>
        </div>

        <div ref={formRef} className="max-w-2xl mx-auto">
          <div className="bg-[#0B1022] border border-[rgba(244,246,255,0.14)] p-8 rounded-lg">
            <h3 className="font-display font-semibold text-xl text-[#F4F6FF] mb-6">Send us a message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm text-[#A7B0C8] mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-[#070A12] border border-[rgba(244,246,255,0.14)] rounded-lg px-4 py-3 text-[#F4F6FF] focus:border-[#B8B9F3] focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-[#A7B0C8] mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-[#070A12] border border-[rgba(244,246,255,0.14)] rounded-lg px-4 py-3 text-[#F4F6FF] focus:border-[#B8B9F3] focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm text-[#A7B0C8] mb-2">Company</label>
                <input 
                  type="text" 
                  className="w-full bg-[#070A12] border border-[rgba(244,246,255,0.14)] rounded-lg px-4 py-3 text-[#F4F6FF] focus:border-[#B8B9F3] focus:outline-none transition-colors"
                  placeholder="Your company"
                />
              </div>
              <div>
                <label className="block text-sm text-[#A7B0C8] mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-[#070A12] border border-[rgba(244,246,255,0.14)] rounded-lg px-4 py-3 text-[#F4F6FF] focus:border-[#B8B9F3] focus:outline-none transition-colors resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Send message
              </button>
            </form>

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-[rgba(244,246,255,0.14)]">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-[#B8B9F3]" />
                  <span className="text-[#A7B0C8] text-sm">info@simhaglobal.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-[#B8B9F3]" />
                  <span className="text-[#A7B0C8] text-sm">+971-4-XXX-XXXX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-[#070A12] border-t border-[rgba(244,246,255,0.08)] py-12">
      <div className="w-full px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display font-bold text-xl text-[#F4F6FF]">
            Simha Global
          </div>
          <div className="flex items-center gap-6 text-sm text-[#A7B0C8]">
            <a href="#" className="hover:text-[#F4F6FF] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#F4F6FF] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#F4F6FF] transition-colors">Careers</a>
          </div>
          <div className="text-sm text-[#A7B0C8]">
            © {new Date().getFullYear()} Simha Global. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  useEffect(() => {
    const pinnedTriggers = ScrollTrigger.getAll().filter(st => st.vars.pin);
    
    if (pinnedTriggers.length > 0) {
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll) return;

      const pinnedRanges = pinnedTriggers.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out'
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-[#070A12] min-h-screen">
      <div className="grain-overlay" />
      <Navigation />
      
      <main className="relative">
        <HeroSection />
        
        <div id="sectors">
          <BusinessPillarSection
            id="metals"
            eyebrow="BUSINESS PILLAR"
            title="Metals & Minerals"
            description="From raw extraction to refined delivery, we manage supply chains that power infrastructure, manufacturing, and energy projects worldwide."
            cardTitle="How we deliver"
            bullets={["Sourcing & procurement", "Quality assurance & testing", "Logistics & customs clearance"]}
            image="/images/metals_industrial.jpg"
            zIndex={20}
          />
          
          <BusinessPillarSection
            id="agriculture"
            eyebrow="BUSINESS PILLAR"
            title="Agriculture"
            description="We move food and feed from origin to market—handling storage, compliance, and delivery with traceability at every step."
            cardTitle="What we handle"
            bullets={["Grains, oilseeds & pulses", "Cold chain & warehousing", "Export documentation & certification"]}
            image="/images/agriculture_field.jpg"
            zIndex={30}
          />
          
          <BusinessPillarSection
            id="technology"
            eyebrow="BUSINESS PILLAR"
            title="Information Technology"
            description="Infrastructure, security, and support—designed for uptime, built for growth. We help teams stay connected and protected."
            cardTitle="Services"
            bullets={["Cloud & infrastructure", "Cybersecurity & compliance", "Managed IT support"]}
            image="/images/datacenter_servers.jpg"
            zIndex={40}
          />
          
          <BusinessPillarSection
            id="investments"
            eyebrow="BUSINESS PILLAR"
            title="Equity Investments"
            description="We invest with patience and governance—backing teams, real assets, and cash-flow businesses across emerging and established markets."
            cardTitle="Investment criteria"
            bullets={["Sustainable cash flows", "Strong governance & reporting", "Long-term alignment"]}
            image="/images/finance_architecture.jpg"
            zIndex={50}
          />
        </div>
        
        <ProductsSection />
        <GlobalPresenceSection />
        <AboutSection />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;