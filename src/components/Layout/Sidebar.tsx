import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  activePage: string;
  navigateToPage: (pageId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, navigateToPage }) => {
  return (
    <nav className="sidebar">
      <div className="logo">
        <h2>
          <span className="logo-icon">
            <svg viewBox="0 0 24 24">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
          </span>
          MarketTool
        </h2>
      </div>
      
      <div className="nav-content">
        <div className="nav-section">
          <div className="nav-title">General</div>
          <a 
            className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
            onClick={() => navigateToPage('dashboard')}
          >
            <span className="icon">
              <svg viewBox="0 0 24 24">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
              </svg>
            </span>
            <span>Dashboard</span>
          </a>
        </div>
        
        <div className="nav-section">
          <div className="nav-title">Calendar</div>
          <a 
            className={`nav-item ${activePage === 'marketing-calendar' ? 'active' : ''}`}
            onClick={() => navigateToPage('marketing-calendar')}
          >
            <span className="icon">
              <svg viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
            </span>
            <span>Marketing Calendar</span>
          </a>
          <a 
            className={`nav-item ${activePage === 'social-calendar' ? 'active' : ''}`}
            onClick={() => navigateToPage('social-calendar')}
          >
            <span className="icon">
              <svg viewBox="0 0 24 24">
                <path d="M7 9H2V7h5v2zm0 3H2v2h5v-2zm13.59 7l-3.83-3.83c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L22 17.59 20.59 19zM17 11c0-1.65-1.35-3-3-3s-3 1.35-3 3 1.35 3 3 3 3-1.35 3-3zM2 19h10v-2H2v2z"/>
              </svg>
            </span>
            <span>Social Media Calendar</span>
          </a>
          <a 
            className={`nav-item ${activePage === 'email-calendar' ? 'active' : ''}`}
            onClick={() => navigateToPage('email-calendar')}
          >
            <span className="icon">
              <svg viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </span>
            <span>Email Calendar</span>
          </a>
        </div>
        
        <div className="nav-section">
          <div className="nav-title">Tools</div>
          <a 
            className={`nav-item ${activePage === 'email-generator' ? 'active' : ''}`}
            onClick={() => navigateToPage('email-generator')}
          >
            <span className="icon">
              <svg viewBox="0 0 24 24">
                <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z"/>
              </svg>
            </span>
            <span>Email Generator</span>
          </a>
          <a 
            className={`nav-item ${activePage === 'persona-builder' ? 'active' : ''}`}
            onClick={() => navigateToPage('persona-builder')}
          >
            <span className="icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </span>
            <span>Persona Builder</span>
          </a>
        </div>
        
        <div className="nav-section">
          <div className="nav-title">Other</div>
          <a 
            className={`nav-item ${activePage === 'settings' ? 'active' : ''}`}
            onClick={() => navigateToPage('settings')}
          >
            <span className="icon">
              <svg viewBox="0 0 24 24">
                <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
              </svg>
            </span>
            <span>Settings</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;