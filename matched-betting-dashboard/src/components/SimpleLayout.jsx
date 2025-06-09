import React, { useState } from 'react';

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '#',
    icon: '📊',
  },
  {
    label: 'Predictions',
    href: '#calculator',
    icon: '📈',
  },
  {
    label: 'Value Bets',
    href: '#value-bets',
    icon: '💰',
  },
  {
    label: 'Logs',
    href: '#logs',
    icon: '📋',
  },
];

export default function SimpleLayout({ children, theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#');

  const handleNavClick = (e, href) => {
    e.preventDefault();
    
    // Handle the home link specially
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('#');
      setIsMenuOpen(false);
      return;
    }
    
    // Find the target section
    const targetSection = document.querySelector(href);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(href);
      setIsMenuOpen(false);
    } else {
      console.warn(`Section not found: ${href}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container navbar-container">
          <div className="navbar-title">Matched Betting Dashboard</div>
          
          {/* Desktop Navigation */}
          <div className="navbar-links">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`navbar-link ${activeSection === item.href ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <span className="navbar-link-icon">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="navbar-mobile-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="navbar-mobile-menu">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`navbar-link ${activeSection === item.href ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <span className="navbar-link-icon">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
      
      {/* Main Content */}
      <main className="container">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="p-4" style={{ textAlign: 'center', borderTop: '1px solid var(--border)', marginTop: '2rem' }}>
        <p>© {new Date().getFullYear()} Matched Betting Dashboard. All rights reserved</p>
      </footer>
      
      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </div>
  );
}