import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';

const Home = () => {
    const { submitBooking, showNotification } = useContext(ShopContext);

    // FAQ Accordion State
    const [faqActive, setFaqActive] = useState(null);

    const toggleFaq = (index) => {
        if (faqActive === index) {
            setFaqActive(null);
        } else {
            setFaqActive(index);
        }
    };

    // Booking Form State for Demo Class / Counseling
    const [bookingForm, setBookingForm] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        service: 'Digital Marketing Demo Class',
        notes: ''
    });
    const [bookingSubmitting, setBookingSubmitting] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const handleBookingChange = (e) => {
        setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        
        if (!bookingForm.name || !bookingForm.email || !bookingForm.phone || !bookingForm.date) {
            showNotification("Please fill in all required fields.", "error");
            return;
        }

        setBookingSubmitting(true);
        const success = await submitBooking(bookingForm);
        setBookingSubmitting(false);

        if (success) {
            setBookingSuccess(true);
            showNotification("Free Demo Session requested successfully!", "success");
        } else {
            showNotification("Request failed. Please try again.", "error");
        }
    };

    const handleResetBooking = () => {
        setBookingForm({
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            service: 'Digital Marketing Demo Class',
            notes: ''
        });
        setBookingSuccess(false);
    };

    // Smooth Scroll to Footer function
    const scrollToFooter = () => {
        const footerElement = document.getElementById('mainFooter');
        if (footerElement) {
            footerElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const faqs = [
        {
            q: "Who is eligible to join these courses?",
            a: "Students, working professionals, business owners, and freelancers looking to master digital channels. Basic computer literacy is all that is required."
        },
        {
            q: "Is there a placement guarantee after course completion?",
            a: "We provide 100% placement assistance, including mock interview sessions, resume-building workshops, and direct references to our internal agency team and partner companies."
        },
        {
            q: "What is the duration of the training & internship?",
            a: "The training program lasts 3 months (classroom/online lectures). Following that, students undergo a 3-month live-project internship at PRETUTE Web Solutions."
        },
        {
            q: "Do you offer weekend batches for working professionals?",
            a: "Yes, we have specialized weekend batches (Saturday & Sunday classes) as well as self-paced online interactive sessions."
        },
        {
            q: "Will I get certified after the training?",
            a: "Absolutely. You will receive a course completion certificate from PRETUTE Academy, along with globally recognized certifications from Google, HubSpot, and Meta."
        }
    ];

    return (
        <div id="homeView" className="page-view active">
            
            {/* 1. Hero / Banner Section */}
            <section className="hero-banner-section" id="heroSection">
                <div className="section-container hero-grid">
                    <div className="hero-content">
                        <span className="hero-badge">🎓 Gurgaon's Practical Learning Academy</span>
                        <h1 className="hero-title">
                            Master Digital Skills with <span className="highlight-text">PRETUTE</span> Agency Experts
                        </h1>
                        <p className="hero-desc">
                            Learn Search Engine Optimization, Google Ads, Social Media Marketing, and Full-Stack Development through 100% practical, live-project training.
                        </p>
                        <div className="hero-actions">
                            {/* Scroll to Footer Button */}
                            <button 
                                onClick={scrollToFooter} 
                                className="btn btn-primary btn-large scroll-footer-btn"
                                id="heroScrollBtn"
                            >
                                <i className="fa-solid fa-angles-down"></i> Get Institute Contacts
                            </button>
                            <a 
                                href="/PRETUTE_Digital_Marketing_Syllabus.pdf" 
                                download="PRETUTE_Digital_Marketing_Syllabus.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline btn-large"
                            >
                                <i className="fa-solid fa-file-pdf"></i> Download Syllabus PDF
                            </a>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="glowing-card hero-image-card">
                            <div className="visual-badge"><i className="fa-solid fa-briefcase"></i> 100% Internship</div>
                            <h3>3-Month Practical Program + 3-Month Live Internship</h3>
                            <p>Build a robust portfolio by working directly on international marketing and design projects managed by PRETUTE Web Solutions.</p>
                            <ul className="hero-bullets">
                                <li><i className="fa-solid fa-circle-check"></i> Work on Live Client Accounts</li>
                                <li><i className="fa-solid fa-circle-check"></i> Certified Agency Instructors</li>
                                <li><i className="fa-solid fa-circle-check"></i> Job Placement Referrals</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Highlight Stats Banner */}
            <section className="stats-banner-section">
                <div className="section-container stats-grid">
                    <div className="stat-card">
                        <h2>10+</h2>
                        <p>Years Agency Experience</p>
                    </div>
                    <div className="stat-card">
                        <h2>500+</h2>
                        <p>Students Placed</p>
                    </div>
                    <div className="stat-card">
                        <h2>12+</h2>
                        <p>Global Certifications</p>
                    </div>
                    <div className="stat-card">
                        <h2>100%</h2>
                        <p>Practical & Live Projects</p>
                    </div>
                </div>
            </section>

            {/* 3. Courses Section using Article tags */}
            <section className="courses-showcase-section" id="coursesSection">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-subtitle">Academic Curriculums</span>
                        <h2 className="section-title">Explore Professional Courses</h2>
                        <p className="section-desc">Our courses are designed around real agency campaigns to provide the most updated search, ads, and coding knowledge.</p>
                    </div>

                    <div className="courses-grid">
                        {/* Course 1 */}
                        <article className="course-card">
                            <div className="course-icon"><i className="fa-solid fa-magnifying-glass-chart"></i></div>
                            <h3 className="course-title">Search Engine Optimization (SEO)</h3>
                            <p className="course-desc">Master On-Page optimization, technical audits, Google Search Console, link building, and site schema logic.</p>
                            <ul className="course-features">
                                <li><i className="fa-solid fa-clock"></i> Duration: 4 Weeks</li>
                                <li><i className="fa-solid fa-laptop-code"></i> Tool: SEMrush, Ahrefs</li>
                            </ul>
                            <div className="course-footer">
                                <a 
                                    href="/PRETUTE_Digital_Marketing_Syllabus.pdf" 
                                    download="PRETUTE_SEO_Syllabus.pdf" 
                                    className="btn-course-download"
                                >
                                    Syllabus PDF <i className="fa-solid fa-download"></i>
                                </a>
                            </div>
                        </article>

                        {/* Course 2 */}
                        <article className="course-card">
                            <div className="course-icon"><i className="fa-solid fa-rectangle-ad"></i></div>
                            <h3 className="course-title">Google Ads & Paid PPC</h3>
                            <p className="course-desc">Learn search campaigns, display ads, shopping funnels, Meta custom audience targeting, and ROI tracking.</p>
                            <ul className="course-features">
                                <li><i className="fa-solid fa-clock"></i> Duration: 6 Weeks</li>
                                <li><i className="fa-solid fa-laptop-code"></i> Tool: Google Ads, Meta Business Manager</li>
                            </ul>
                            <div className="course-footer">
                                <a 
                                    href="/PRETUTE_Digital_Marketing_Syllabus.pdf" 
                                    download="PRETUTE_PPC_Syllabus.pdf" 
                                    className="btn-course-download"
                                >
                                    Syllabus PDF <i className="fa-solid fa-download"></i>
                                </a>
                            </div>
                        </article>

                        {/* Course 3 */}
                        <article className="course-card">
                            <div className="course-icon"><i className="fa-solid fa-share-nodes"></i></div>
                            <h3 className="course-title">Social Media Optimization (SMO)</h3>
                            <p className="course-desc">Discover the secrets of organic reach, content strategy, graphic creation, and community building on Instagram, LinkedIn & Facebook.</p>
                            <ul className="course-features">
                                <li><i className="fa-solid fa-clock"></i> Duration: 4 Weeks</li>
                                <li><i className="fa-solid fa-laptop-code"></i> Tool: Canva, Buffer, Hootsuite</li>
                            </ul>
                            <div className="course-footer">
                                <a 
                                    href="/PRETUTE_Digital_Marketing_Syllabus.pdf" 
                                    download="PRETUTE_SMO_Syllabus.pdf" 
                                    className="btn-course-download"
                                >
                                    Syllabus PDF <i className="fa-solid fa-download"></i>
                                </a>
                            </div>
                        </article>

                        {/* Course 4 */}
                        <article className="course-card">
                            <div className="course-icon"><i className="fa-solid fa-code"></i></div>
                            <h3 className="course-title">Web & eCommerce Development</h3>
                            <p className="course-desc">Build responsive agency-standard web assets. Covers basic HTML5/CSS3, custom WordPress layouts, and Shopify storefront design.</p>
                            <ul className="course-features">
                                <li><i className="fa-solid fa-clock"></i> Duration: 8 Weeks</li>
                                <li><i className="fa-solid fa-laptop-code"></i> Tech: WordPress, Shopify, JS</li>
                            </ul>
                            <div className="course-footer">
                                <a 
                                    href="/PRETUTE_Digital_Marketing_Syllabus.pdf" 
                                    download="PRETUTE_WebDev_Syllabus.pdf" 
                                    className="btn-course-download"
                                >
                                    Syllabus PDF <i className="fa-solid fa-download"></i>
                                </a>
                            </div>
                        </article>

                        {/* Course 5 */}
                        <article className="course-card">
                            <div className="course-icon"><i className="fa-solid fa-mobile-screen-button"></i></div>
                            <h3 className="course-title">Flutter App Development</h3>
                            <p className="course-desc">Develop high-performance cross-platform applications for iOS and Android using Dart language and Flutter design patterns.</p>
                            <ul className="course-features">
                                <li><i className="fa-solid fa-clock"></i> Duration: 10 Weeks</li>
                                <li><i className="fa-solid fa-laptop-code"></i> Tech: Flutter SDK, Dart Language</li>
                            </ul>
                            <div className="course-footer">
                                <a 
                                    href="/PRETUTE_Digital_Marketing_Syllabus.pdf" 
                                    download="PRETUTE_Flutter_Syllabus.pdf" 
                                    className="btn-course-download"
                                >
                                    Syllabus PDF <i className="fa-solid fa-download"></i>
                                </a>
                            </div>
                        </article>

                        {/* Course 6 */}
                        <article className="course-card">
                            <div className="course-icon"><i className="fa-solid fa-palette"></i></div>
                            <h3 className="course-title">UI/UX Design & Branding</h3>
                            <p className="course-desc">Learn how to make professional, responsive interfaces, layouts, wireframes, and prototypes. Follow typography and grids.</p>
                            <ul className="course-features">
                                <li><i className="fa-solid fa-clock"></i> Duration: 6 Weeks</li>
                                <li><i className="fa-solid fa-laptop-code"></i> Tool: Figma, Adobe XD</li>
                            </ul>
                            <div className="course-footer">
                                <a 
                                    href="/PRETUTE_Digital_Marketing_Syllabus.pdf" 
                                    download="PRETUTE_UIUX_Syllabus.pdf" 
                                    className="btn-course-download"
                                >
                                    Syllabus PDF <i className="fa-solid fa-download"></i>
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* 4. Poster / Download PDF Section */}
            <section className="brochure-poster-section">
                <div className="section-container">
                    <div className="poster-card glassmorphism-card">
                        <div className="poster-details">
                            <span className="poster-badge"><i className="fa-solid fa-star"></i> FREE ACADEMIC GUIDE</span>
                            <h2>Get the Comprehensive Course Syllabus Catalog</h2>
                            <p>
                                Download our detailed training brochure containing modules, weekly breakdown, live client projects details, certification partners, and fee structures.
                            </p>
                            <div className="poster-actions">
                                <a 
                                    href="/PRETUTE_Digital_Marketing_Syllabus.pdf" 
                                    download="PRETUTE_Digital_Marketing_Syllabus.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary btn-large download-pdf-btn"
                                    id="posterDownloadBtn"
                                >
                                    <i className="fa-solid fa-file-pdf"></i> Download Syllabus PDF Brochure
                                </a>
                            </div>
                        </div>
                        <div className="poster-mockup">
                            <div className="pdf-thumbnail">
                                <div className="pdf-icon"><i className="fa-solid fa-file-pdf"></i></div>
                                <h4>PRETUTE Syllabus</h4>
                                <span>30+ Training Modules</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Training Modes Section */}
            <section className="training-modes-section" id="trainingSection">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-subtitle">flexible learning</span>
                        <h2 className="section-title">Select Your Training Mode</h2>
                        <p className="section-desc">We structure classes to accommodate everyone, from full-time students to working corporate employees.</p>
                    </div>
                    <div className="modes-grid">
                        <article className="mode-card">
                            <div className="mode-img"><i className="fa-solid fa-users-rectangle"></i></div>
                            <h3>Classroom Training</h3>
                            <p>Learn face-to-face at our Gurugram center. Practice inside our lab, engage in direct brainstorms, and work side-by-side with agency professionals.</p>
                        </article>
                        <article className="mode-card">
                            <div className="mode-img"><i className="fa-solid fa-display"></i></div>
                            <h3>Online Interactive Classes</h3>
                            <p>Live instructor-led webinar classes. Get access to screen sharing, active chat, session recordings, and live dashboard doubt troubleshooting.</p>
                        </article>
                        <article className="mode-card">
                            <div className="mode-img"><i className="fa-solid fa-building-user"></i></div>
                            <h3>Corporate Training</h3>
                            <p>Custom tailored curriculum for corporate teams to upskill in PPC, automated SEO dashboards, conversion optimization, and Shopify operations.</p>
                        </article>
                    </div>
                </div>
            </section>

            {/* 6. Internship Program Section */}
            <section className="internship-section" id="internshipSection">
                <div className="section-container internship-grid">
                    <div className="internship-content">
                        <span className="section-subtitle">Real Agency Experience</span>
                        <h2 className="section-title">3-Month Guaranteed Internship</h2>
                        <p>
                            Unlike traditional coaching centers, PRETUTE integrates learning with real-world application. Post course completion, all qualifying students join our active digital marketing agency for a 3-month internship program.
                        </p>
                        <div className="internship-bullets">
                            <div className="bullet-item">
                                <div className="bullet-icon"><i className="fa-solid fa-check"></i></div>
                                <div className="bullet-text">
                                    <h4>Live Budget Allocation</h4>
                                    <p>Run Google Search & Meta campaigns utilizing actual budgets to experience cost tracking.</p>
                                </div>
                            </div>
                            <div className="bullet-item">
                                <div className="bullet-icon"><i className="fa-solid fa-check"></i></div>
                                <div className="bullet-text">
                                    <h4>Agency Portfolio</h4>
                                    <p>Co-author marketing case studies and add actual corporate references to your resume.</p>
                                </div>
                            </div>
                            <div className="bullet-item">
                                <div className="bullet-icon"><i className="fa-solid fa-check"></i></div>
                                <div className="bullet-text">
                                    <h4>Work Experience Certificate</h4>
                                    <p>Receive an official internship experience certificate from PRETUTE Web Solutions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="internship-quote">
                        <blockquote>
                            "At PRETUTE Web Solutions, we hire directly from our academy. The internship acts as a training ground to filter high-potential professionals for our permanent team."
                            <cite>— Team PRETUTE, Gurgaon</cite>
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* 7. Why Us & Industry Sectors */}
            <section className="why-us-section">
                <div className="section-container">
                    <div className="why-us-grid">
                        <div className="why-us-details">
                            <span className="section-subtitle">OUR ADVANTAGE</span>
                            <h2 className="section-title">Why You Should Hire Us & Join Our Institute?</h2>
                            <p>
                                With years of service as a full-cycle web agency, we understand what brands are actively looking for when hiring marketers. Our training covers specific practical strategies for various industries:
                            </p>
                            <div className="industries-cloud">
                                <span className="ind-tag"><i className="fa-solid fa-heart-pulse"></i> Healthcare & Hospitals</span>
                                <span className="ind-tag"><i className="fa-solid fa-car"></i> Automotive Marketing</span>
                                <span className="ind-tag"><i className="fa-solid fa-user-graduate"></i> EdTech & Academies</span>
                                <span className="ind-tag"><i className="fa-solid fa-gears"></i> Manufacturing SEO</span>
                                <span className="ind-tag"><i className="fa-solid fa-plane-departure"></i> Travel Agency Campaigns</span>
                                <span className="ind-tag"><i className="fa-solid fa-hotel"></i> Hotel & Hospitality PPC</span>
                            </div>
                        </div>
                        <div className="why-us-points">
                            <div className="point-card">
                                <h4>Certified Professionals</h4>
                                <p>Get certified in Google Analytics, HubSpot Inbound SEO, Google Ads search campaigns, and Meta Blueprint.</p>
                            </div>
                            <div className="point-card">
                                <h4>Premium Mock Interviews</h4>
                                <p>Practice interactive QA and mock tests designed to make you comfortable during direct recruiter screening rounds.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Demo Booking Section */}
            <section className="booking-section-wrapper" id="bookingSection">
                <div className="section-container">
                    <div className="booking-form-box">
                        <h2 className="booking-title">Book a Free Demo Class & Counseling</h2>
                        <p className="booking-subtitle">Fill in the registration form below. Our academy career counselor will contact you to schedule your demo class batch.</p>
                        
                        {!bookingSuccess ? (
                            <form className="demo-booking-form" onSubmit={handleBookingSubmit}>
                                <div className="form-row-two">
                                    <div className="form-group">
                                        <label htmlFor="studentName">Full Name *</label>
                                        <input 
                                            id="studentName"
                                            type="text" 
                                            name="name" 
                                            required 
                                            value={bookingForm.name} 
                                            onChange={handleBookingChange} 
                                            placeholder="Enter your name" 
                                            className="form-input" 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="studentEmail">Email Address *</label>
                                        <input 
                                            id="studentEmail"
                                            type="email" 
                                            name="email" 
                                            required 
                                            value={bookingForm.email} 
                                            onChange={handleBookingChange} 
                                            placeholder="Enter your email" 
                                            className="form-input" 
                                        />
                                    </div>
                                </div>
                                <div className="form-row-two">
                                    <div className="form-group">
                                        <label htmlFor="studentPhone">Phone / WhatsApp Number *</label>
                                        <input 
                                            id="studentPhone"
                                            type="tel" 
                                            name="phone" 
                                            required
                                            value={bookingForm.phone} 
                                            onChange={handleBookingChange} 
                                            placeholder="Enter mobile number" 
                                            className="form-input" 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="selectCourse">Select Course / Topic *</label>
                                        <select 
                                            id="selectCourse"
                                            name="service" 
                                            value={bookingForm.service} 
                                            onChange={handleBookingChange} 
                                            className="form-input select-input"
                                        >
                                            <option value="Digital Marketing Master Course">Digital Marketing Master Course</option>
                                            <option value="SEO & Organic Growth Course">SEO & Organic Growth Course</option>
                                            <option value="Paid PPC & Ads Specialist">Paid PPC & Ads Specialist</option>
                                            <option value="WordPress & Web Coding">WordPress & Web Coding</option>
                                            <option value="Flutter Cross-Platform App Course">Flutter Cross-Platform App Course</option>
                                            <option value="UI/UX Design Certification">UI/UX Design Certification</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row-two">
                                    <div className="form-group">
                                        <label htmlFor="demoDate">Preferred Date *</label>
                                        <input 
                                            id="demoDate"
                                            type="date" 
                                            name="date" 
                                            required 
                                            value={bookingForm.date} 
                                            onChange={handleBookingChange} 
                                            className="form-input" 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="demoTime">Preferred Time Batch</label>
                                        <input 
                                            id="demoTime"
                                            type="time" 
                                            name="time" 
                                            value={bookingForm.time} 
                                            onChange={handleBookingChange} 
                                            className="form-input" 
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="demoNotes">Any Questions or Special Requests?</label>
                                    <textarea 
                                        id="demoNotes"
                                        name="notes" 
                                        rows="3" 
                                        value={bookingForm.notes} 
                                        onChange={handleBookingChange} 
                                        placeholder="Ask us anything here..." 
                                        className="form-input form-textarea"
                                    ></textarea>
                                </div>
                                <button type="submit" disabled={bookingSubmitting} className="btn btn-primary btn-large btn-submit">
                                    {bookingSubmitting ? (
                                        <><span>Submitting...</span> <i className="fa-solid fa-spinner fa-spin"></i></>
                                    ) : (
                                        <><span>Reserve Free Demo Seat</span> <i className="fa-solid fa-calendar-check"></i></>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="booking-success-card active">
                                <div className="success-icon"><i className="fa-solid fa-circle-check"></i></div>
                                <h3>Demo Seat Reserved!</h3>
                                <p>
                                    Thank you, <strong>{bookingForm.name}</strong>. We have registered your request for the <strong>{bookingForm.service}</strong> demo class on <strong>{bookingForm.date}</strong>. 
                                    Our admissions team will send batch details and class link to <strong>{bookingForm.email}</strong> shortly.
                                </p>
                                <button className="btn btn-outline" onClick={handleResetBooking}>Register Another Candidate</button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 9. FAQ Section */}
            <section className="faq-section" id="faqSection">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-subtitle">Got Questions?</span>
                        <h2 className="section-title">Frequently Asked Questions</h2>
                        <p className="section-desc">Find answers to the most common queries about our courses, internship program, and career placement support.</p>
                    </div>
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <div key={index} className={`faq-item ${faqActive === index ? 'active' : ''}`}>
                                <button onClick={() => toggleFaq(index)} className="faq-question">
                                    <span>{faq.q}</span>
                                    <i className={`fa-solid ${faqActive === index ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                </button>
                                <div className="faq-answer">
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
        </div>
    );
};

export default Home;
