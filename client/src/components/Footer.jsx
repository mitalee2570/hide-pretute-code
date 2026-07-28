import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterSuccess, setNewsletterSuccess] = useState(false);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (newsletterEmail.trim()) {
            setNewsletterEmail('');
            setNewsletterSuccess(true);
            setTimeout(() => {
                setNewsletterSuccess(false);
            }, 5000);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="main-footer" id="mainFooter">
            <div className="footer-top">
                <div className="section-container footer-grid">
                    {/* Col 1: About Institute */}
                    <div className="footer-col about-col">
                        <Link to="/" className="footer-logo">
                            <img src="assets/logo.png" alt="PRETUTE Logo" className="footer-brand-logo" />
                            <span className="footer-logo-text">PRETUTE ACADEMY</span>
                        </Link>
                        <p className="about-text">
                            PRETUTE Digital Marketing Institute is Gurgaon's premier learning academy. We provide 100% practical, agency-led training designed to build career readiness and corporate expertise.
                        </p>
                        <div className="social-links">
                            <a href="https://www.facebook.com/pretutedigital" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="https://www.instagram.com/pretutedigital/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                            <a href="https://www.linkedin.com/company/pretutedigital/" target="_blank" rel="noopener noreferrer" aria-label="Linkedin"><i className="fa-brands fa-linkedin-in"></i></a>
                            <a href="https://x.com/pretutedigital" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
                        </div>
                    </div>

                    {/* Col 2: Courses links */}
                    <div className="footer-col links-col">
                        <h4 className="col-title">Training Modules</h4>
                        <ul className="footer-links">
                            <li><button onClick={() => scrollToSection('coursesSection')} className="footer-link-btn">Search Engine Optimization</button></li>
                            <li><button onClick={() => scrollToSection('coursesSection')} className="footer-link-btn">Google & Meta Paid Ads</button></li>
                            <li><button onClick={() => scrollToSection('coursesSection')} className="footer-link-btn">Social Media Growth</button></li>
                            <li><button onClick={() => scrollToSection('coursesSection')} className="footer-link-btn">Web Development Course</button></li>
                            <li><button onClick={() => scrollToSection('coursesSection')} className="footer-link-btn">Flutter App Training</button></li>
                        </ul>
                    </div>

                    {/* Col 3: Contact details */}
                    <div className="footer-col contact-col">
                        <h4 className="col-title">Gurugram Center</h4>
                        <p className="contact-address">
                            <i className="fa-solid fa-location-dot"></i> SF 44, Omaxe Celebration Mall, Sohna Rd, Gurugram, Haryana 122018 India
                        </p>
                        <p className="contact-phone">
                            <i className="fa-solid fa-phone"></i> +91 98918 76652
                        </p>
                        <p className="contact-email">
                            <i className="fa-solid fa-envelope"></i> info@pretute.in
                        </p>
                        <a 
                            href="https://share.google/y9taR1uFezSdA1Zzr" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="get-directions-link"
                        >
                            <i className="fa-solid fa-map-location-dot"></i> Get Directions Map
                        </a>
                    </div>

                    {/* Col 4: Newsletter & Back to Top Area */}
                    <div className="footer-col newsletter-col">
                        <h4 className="col-title">Subscribe for Course Batches</h4>
                        <p className="newsletter-text">Subscribe to get notifications about upcoming weekend batches, webinar classes, and discount offers.</p>
                        <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className="newsletter-field" 
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                required 
                            />
                            <button type="submit" className="btn btn-primary btn-subscribe">Subscribe</button>
                        </form>
                        {newsletterSuccess && (
                            <div className="newsletter-success" style={{ display: 'block', marginTop: '10px' }}>
                                ✓ Subscribed successfully!
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Bar containing copyright and the Back to Top Arrow */}
            <div className="footer-bottom">
                <div className="section-container bottom-row">
                    <p className="copyright">&copy; 2026 PRETUTE Digital Marketing Institute. All rights reserved.</p>
                    
                    {/* Back to Top Arrow Button */}
                    <button 
                        onClick={scrollToTop} 
                        className="back-to-top-btn" 
                        aria-label="Back to top"
                        title="Back to Top"
                    >
                        <i className="fa-solid fa-arrow-up"></i>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
