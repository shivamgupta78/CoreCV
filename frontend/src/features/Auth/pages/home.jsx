import React from 'react';
import { useNavigate } from 'react-router';
import { FileText, Target, Zap, ShieldCheck } from 'lucide-react';
import '../../Auth/main.scss';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="corecv-landing">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <FileText className="logo-icon" size={28} />
          <h1 className="logo-text">CoreCV</h1>
        </div>
        <div className="nav-buttons">
          <button className="btn-login" onClick={() => navigate('/login')}>
            Log In
          </button>
          <button className="btn-signup" onClick={() => navigate('/signup')}>
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <div className="badge">✨ AI-Powered Resume Analyzer</div>
          <h2 className="hero-title">
            Land Your Dream Job with a <span className="highlight">Perfect Resume</span>
          </h2>
          <p className="hero-subtitle">
            CoreCV uses advanced AI to analyze your resume, optimize it for ATS (Applicant Tracking Systems), and provide actionable feedback in seconds.
          </p>
          <button className="btn-get-started" onClick={() => navigate('/signup')}>
            Get Started — It's Free
          </button>
        </div>
      </header>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h3 className="section-title">Why choose CoreCV?</h3>
        <div className="benefits-grid">
          
          <div className="benefit-card">
            <div className="icon-wrapper">
              <Target size={24} />
            </div>
            <h4>ATS Optimization</h4>
            <p>We scan your resume exactly how corporate HR software does, ensuring your CV never gets auto-rejected.</p>
          </div>

          <div className="benefit-card">
            <div className="icon-wrapper">
              <Zap size={24} />
            </div>
            <h4>Instant AI Feedback</h4>
            <p>Get real-time scoring and line-by-line suggestions to improve your impact, grammar, and formatting.</p>
          </div>

          <div className="benefit-card">
            <div className="icon-wrapper">
              <ShieldCheck size={24} />
            </div>
            <h4>Industry Standards</h4>
            <p>Tailor your resume based on what top-tier tech companies and recruiters are actually looking for.</p>
          </div>

        </div>
      </section>

      {/* Simple Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CoreCV. Built for professionals.</p>
      </footer>
    </div>
  );
}