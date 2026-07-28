import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';

const Header = () => {
    const { 
        isMobileSidebarOpen, setIsMobileSidebarOpen 
    } = useContext(ShopContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();
    const suggestionsRef = useRef(null);

    // List of Courses for search/autocomplete
    const courseList = [
        { id: 'seo', title: 'Search Engine Optimization (SEO)', slug: 'seo', desc: 'Rank higher on Google organically' },
        { id: 'ppc', title: 'Pay-Per-Click (PPC) & Google Ads', slug: 'ppc', desc: 'Generate instant leads and ROI' },
        { id: 'smo', title: 'Social Media Marketing (SMO/SMM)', slug: 'social-media', desc: 'Build community and brand engagement' },
        { id: 'web-dev', title: 'Web & eCommerce Development', slug: 'web-development', desc: 'Build custom WordPress, Shopify & MERN apps' },
        { id: 'flutter', title: 'Flutter App Development', slug: 'app-development', desc: 'Cross-platform Android & iOS apps' },
        { id: 'uiux', title: 'UI/UX Design & Branding', slug: 'ui-ux-design', desc: 'Design stunning user interfaces' },
    ];

    // Scroll sticky logic
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Search filter
    useEffect(() => {
        if (searchQuery.trim().length < 1) {
            setSuggestions([]);
            setIsSearchActive(false);
            return;
        }

        const query = searchQuery.toLowerCase().trim();
        const matches = courseList.filter(c => 
            c.title.toLowerCase().includes(query) || 
            c.desc.toLowerCase().includes(query)
        );

        setSuggestions(matches);
        setIsSearchActive(true);
    }, [searchQuery]);

    // Close search suggestions on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
                setIsSearchActive(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle Search Submit
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const query = searchQuery.trim();
        if (query) {
            setIsSearchActive(false);
            setSearchQuery('');
            // Scroll to courses section or highlight
            const coursesSection = document.getElementById('coursesSection');
            if (coursesSection) {
                coursesSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // Scroll helper
    const scrollToSection = (id) => {
        setIsMobileSidebarOpen(false);
        setIsCourseDropdownOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/');
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    };

    return (
        <header className={`main-header ${isSticky ? 'sticky' : ''}`} id="mainHeader">
            {/* Top Bar with Agency Contact Info */}
            <div className="header-top">
                <div className="section-container topbar-container">
                    <div className="topbar-left">
                        <a href="mailto:info@pretute.in">
                            <i className="fa-regular fa-envelope"></i> info@pretute.in
                        </a>
                        <a href="tel:+919891876652">
                            <i className="fa-solid fa-phone"></i> +91 98918 76652
                        </a>
                    </div>
                    <div className="topbar-right">
                        <span className="topbar-tagline">Gurgaon's Premier Marketing Academy</span>
                        <div className="topbar-socials">
                            <a href="https://www.facebook.com/pretutedigital" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="https://www.instagram.com/pretutedigital/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                            <a href="https://www.linkedin.com/company/pretutedigital/" target="_blank" rel="noopener noreferrer" aria-label="Linkedin"><i className="fa-brands fa-linkedin-in"></i></a>
                            <a href="https://x.com/pretutedigital" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="header-container">
                {/* Mobile Menu Toggle */}
                <button 
                    className="mobile-nav-toggle" 
                    onClick={() => setIsMobileSidebarOpen(true)}
                    aria-label="Toggle Menu"
                >
                    <i className="fa-solid fa-bars-staggered"></i>
                </button>

                {/* Brand Logo & Name */}
                <Link to="/" className="logo-container" id="logoLink">
                    <img src="assets/logo.png" alt="PRETUTE Logo" className="brand-logo" id="brandLogo" />
                    <div className="logo-text-wrapper">
                        <span className="logo-title">PRETUTE</span>
                        <span className="logo-subtitle">Digital Marketing Institute</span>
                    </div>
                </Link>

                {/* Course Search Bar */}
                <div className="search-wrapper" ref={suggestionsRef}>
                    <form className="search-form" onSubmit={handleSearchSubmit} autoComplete="off">
                        <input 
                            type="text" 
                            placeholder="Search courses (SEO, Ads, Web)..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search Courses"
                        />
                        <button type="submit" className="search-btn" aria-label="Submit Search">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                    
                    {/* Course Suggestions Popup */}
                    {isSearchActive && (
                        <div className="search-suggestions active" id="searchSuggestions">
                            {suggestions.length === 0 ? (
                                <div className="suggestion-item">
                                    <div className="suggestion-info">
                                        <h5>No matches found</h5>
                                    </div>
                                </div>
                            ) : (
                                suggestions.map(c => (
                                    <div 
                                        key={c.id} 
                                        className="suggestion-item"
                                        onClick={() => {
                                            setSearchQuery('');
                                            setIsSearchActive(false);
                                            scrollToSection('coursesSection');
                                        }}
                                    >
                                        <div className="suggestion-info">
                                            <h5>{c.title}</h5>
                                            <p>{c.desc}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* Header Admin Panel Link / Utilities */}
                <div className="header-utilities">
                    <Link to="/admin" className="utility-item utility-btn admin-dashboard-link" aria-label="Admin Dashboard">
                        <i className="fa-solid fa-user-shield"></i>
                        <span className="utility-label">Admin Panel</span>
                    </Link>
                </div>
            </div>

            {/* Desktop Semantic Navigation */}
            <nav className="desktop-navigation" id="desktopNav">
                <ul className="nav-links">
                    <li><Link to="/" className="nav-link active">Home</Link></li>
                    <li 
                        className="nav-link-dropdown"
                        onMouseEnter={() => setIsCourseDropdownOpen(true)}
                        onMouseLeave={() => setIsCourseDropdownOpen(false)}
                    >
                        <span className="nav-link dropdown-toggle-link">
                            Courses <i className="fa-solid fa-chevron-down"></i>
                        </span>
                        {isCourseDropdownOpen && (
                            <ul className="dropdown-menu">
                                <li><button onClick={() => scrollToSection('coursesSection')} className="dropdown-item-btn">Search Engine Optimization (SEO)</button></li>
                                <li><button onClick={() => scrollToSection('coursesSection')} className="dropdown-item-btn">Pay Per Click (PPC / Google Ads)</button></li>
                                <li><button onClick={() => scrollToSection('coursesSection')} className="dropdown-item-btn">Social Media Marketing (SMM)</button></li>
                                <li><button onClick={() => scrollToSection('coursesSection')} className="dropdown-item-btn">Web & eCommerce Development</button></li>
                                <li><button onClick={() => scrollToSection('coursesSection')} className="dropdown-item-btn">Flutter App Development</button></li>
                            </ul>
                        )}
                    </li>
                    <li><button onClick={() => scrollToSection('trainingSection')} className="nav-link-btn">Training Modes</button></li>
                    <li><button onClick={() => scrollToSection('internshipSection')} className="nav-link-btn">Internship Program</button></li>
                    <li><button onClick={() => scrollToSection('faqSection')} className="nav-link-btn">FAQs</button></li>
                    <li><button onClick={() => scrollToSection('bookingSection')} className="nav-link-btn contact-btn">Book Demo</button></li>
                    
                    {/* CTA to Download Brochure */}
                    <li>
                        <a 
                            href="/PRETUTE_Digital_Marketing_Syllabus.pdf" 
                            download="PRETUTE_Digital_Marketing_Syllabus.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-brochure-nav"
                        >
                            <i className="fa-solid fa-file-arrow-down"></i> Syllabus
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Mobile Navigation Sidebar */}
            <div 
                className={`mobile-sidebar-overlay ${isMobileSidebarOpen ? 'active' : ''}`} 
                onClick={() => setIsMobileSidebarOpen(false)}
            ></div>
            <div className={`mobile-sidebar ${isMobileSidebarOpen ? 'active' : ''}`} id="mobileSidebar">
                <div className="sidebar-header">
                    <span className="sidebar-title">Institute Menu</span>
                    <button 
                        className="close-sidebar-btn" 
                        onClick={() => setIsMobileSidebarOpen(false)}
                        aria-label="Close Menu"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <ul className="mobile-nav-links">
                    <li>
                        <Link to="/" className="mob-link" onClick={() => setIsMobileSidebarOpen(false)}>
                            <i className="fa-solid fa-house"></i> Home
                        </Link>
                    </li>
                    <li>
                        <button className="mob-link" onClick={() => scrollToSection('coursesSection')}>
                            <i className="fa-solid fa-graduation-cap"></i> Our Courses
                        </button>
                    </li>
                    <li>
                        <button className="mob-link" onClick={() => scrollToSection('trainingSection')}>
                            <i className="fa-solid fa-chalkboard-user"></i> Training Modes
                        </button>
                    </li>
                    <li>
                        <button className="mob-link" onClick={() => scrollToSection('internshipSection')}>
                            <i className="fa-solid fa-briefcase"></i> Internship Program
                        </button>
                    </li>
                    <li>
                        <button className="mob-link" onClick={() => scrollToSection('faqSection')}>
                            <i className="fa-solid fa-circle-question"></i> FAQs
                        </button>
                    </li>
                    <li>
                        <button className="mob-link" onClick={() => scrollToSection('bookingSection')}>
                            <i className="fa-solid fa-calendar-check"></i> Book Free Demo
                        </button>
                    </li>
                    <li>
                        <a 
                            href="/PRETUTE_Digital_Marketing_Syllabus.pdf" 
                            download="PRETUTE_Digital_Marketing_Syllabus.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mob-link syllabus-mob-link"
                            onClick={() => setIsMobileSidebarOpen(false)}
                        >
                            <i className="fa-solid fa-file-pdf"></i> Download Syllabus PDF
                        </a>
                    </li>
                </ul>
                <div className="sidebar-footer">
                    <p>Contact: info@pretute.in</p>
                    <p>Phone: +91 98918 76652</p>
                    <div className="mob-socials">
                        <a href="https://www.facebook.com/pretutedigital" target="_blank" rel="noopener noreferrer" className="social-circle"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="https://www.instagram.com/pretutedigital/" target="_blank" rel="noopener noreferrer" className="social-circle"><i className="fa-brands fa-instagram"></i></a>
                        <a href="https://www.linkedin.com/company/pretutedigital/" target="_blank" rel="noopener noreferrer" className="social-circle"><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
