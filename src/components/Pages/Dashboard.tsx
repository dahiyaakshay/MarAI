import React, { useState } from 'react';
import { Calendar, Mail, Users, Search, TrendingUp, Activity, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';

interface DashboardProps {
  navigateToPage: (pageId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ navigateToPage }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [personaStartIndex, setPersonaStartIndex] = useState(0);
  const [activityStartIndex, setActivityStartIndex] = useState(0);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Previous month days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isToday: false,
        hasEvent: false
      });
    }
    
    // Current month days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = year === today.getFullYear() && 
                     month === today.getMonth() && 
                     day === today.getDate();
      const hasEvent = [6, 12, 25].includes(day); // Sample events
      
      days.push({
        day,
        isCurrentMonth: true,
        isToday,
        hasEvent
      });
    }
    
    // Next month days to fill the grid
    const totalCells = 42; // 6 rows × 7 days
    const remainingCells = totalCells - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isToday: false,
        hasEvent: false
      });
    }
    
    return days;
  };

  // Sample personas data (expanded for slider demonstration)
  const allPersonas = [
    { id: 1, name: 'John Davis', role: 'Marketing Manager', avatar: 'JD' },
    { id: 2, name: 'Sarah Chen', role: 'Small Business Owner', avatar: 'SC' },
    { id: 3, name: 'Michael Johnson', role: 'Enterprise CTO', avatar: 'MJ' },
    { id: 4, name: 'Emily Rodriguez', role: 'Content Creator', avatar: 'ER' },
    { id: 5, name: 'David Kim', role: 'Startup Founder', avatar: 'DK' },
    { id: 6, name: 'Lisa Thompson', role: 'Brand Manager', avatar: 'LT' },
    { id: 7, name: 'Alex Wilson', role: 'Digital Marketer', avatar: 'AW' },
    { id: 8, name: 'Maria Garcia', role: 'E-commerce Owner', avatar: 'MG' }
  ];

  // Sample activity data (expanded for slider demonstration)
  const allActivities = [
    {
      icon: '📧',
      title: 'Email Campaign Created',
      description: 'Black Friday promotion email generated via AI',
      time: '2 hours ago'
    },
    {
      icon: '👥',
      title: 'New Persona Added',
      description: 'Enterprise Marketing Director persona created',
      time: '4 hours ago'
    },
    {
      icon: '📅',
      title: 'Content Scheduled',
      description: 'Instagram post scheduled for tomorrow 9 AM',
      time: '6 hours ago'
    },
    {
      icon: '🎯',
      title: 'Campaign Planned',
      description: 'Q4 product launch campaign content created',
      time: '1 day ago'
    },
    {
      icon: '📊',
      title: 'Content Report',
      description: 'Weekly content performance report generated',
      time: '2 days ago'
    },
    {
      icon: '✨',
      title: 'Template Created',
      description: 'New email template designed for holiday campaigns',
      time: '3 days ago'
    },
    {
      icon: '🔄',
      title: 'Workflow Automated',
      description: 'Social media posting workflow set up',
      time: '4 days ago'
    },
    {
      icon: '📈',
      title: 'Analytics Updated',
      description: 'Monthly performance metrics compiled',
      time: '5 days ago'
    }
  ];

  const visiblePersonas = allPersonas.slice(personaStartIndex, personaStartIndex + 3);
  const visibleActivities = allActivities.slice(activityStartIndex, activityStartIndex + 5);

  const nextPersonas = () => {
    if (personaStartIndex + 3 < allPersonas.length) {
      setPersonaStartIndex(personaStartIndex + 1);
    }
  };

  const prevPersonas = () => {
    if (personaStartIndex > 0) {
      setPersonaStartIndex(personaStartIndex - 1);
    }
  };

  const nextActivities = () => {
    if (activityStartIndex + 5 < allActivities.length) {
      setActivityStartIndex(activityStartIndex + 1);
    }
  };

  const prevActivities = () => {
    if (activityStartIndex > 0) {
      setActivityStartIndex(activityStartIndex - 1);
    }
  };

  return (
    <>
      {/* Quick Actions */}
      <div className="quick-actions">
        <a href="#" className="quick-action-btn" onClick={() => navigateToPage('marketing-calendar')}>
          <div className="icon">
            <Calendar size={24} />
          </div>
          <div className="quick-action-content">
            <h4>Marketing Calendar</h4>
            <p>Plan marketing content</p>
          </div>
        </a>
        
        <a href="#" className="quick-action-btn" onClick={() => navigateToPage('social-calendar')}>
          <div className="icon">
            <Search size={24} />
          </div>
          <div className="quick-action-content">
            <h4>Social Calendar</h4>
            <p>Schedule social posts</p>
          </div>
        </a>
        
        <a href="#" className="quick-action-btn" onClick={() => navigateToPage('email-calendar')}>
          <div className="icon">
            <Mail size={24} />
          </div>
          <div className="quick-action-content">
            <h4>Email Calendar</h4>
            <p>Plan email campaigns</p>
          </div>
        </a>
        
        <a href="#" className="quick-action-btn" onClick={() => navigateToPage('email-generator')}>
          <div className="icon">
            <TrendingUp size={24} />
          </div>
          <div className="quick-action-content">
            <h4>Email Generator</h4>
            <p>Create email campaigns</p>
          </div>
        </a>
        
        <a href="#" className="quick-action-btn" onClick={() => navigateToPage('persona-builder')}>
          <div className="icon">
            <Users size={24} />
          </div>
          <div className="quick-action-content">
            <h4>Build Persona</h4>
            <p>Create customer profiles</p>
          </div>
        </a>
        
        <a href="#" className="quick-action-btn" onClick={() => navigateToPage('settings')}>
          <div className="icon">
            <Activity size={24} />
          </div>
          <div className="quick-action-content">
            <h4>Settings</h4>
            <p>Configure your account</p>
          </div>
        </a>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-4">
        <div className="stat-card">
          <div className="stat-number">47</div>
          <div className="stat-label">Content Created</div>
          <div className="stat-change positive">
            <TrendingUp size={12} />
            +12% This Week
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">23</div>
          <div className="stat-label">Active Campaigns</div>
          <div className="stat-change positive">
            <TrendingUp size={12} />
            +8.1% This Month
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">89%</div>
          <div className="stat-label">Content Success Rate</div>
          <div className="stat-change positive">
            <TrendingUp size={12} />
            +5.2% This Month
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">156</div>
          <div className="stat-label">Scheduled Posts</div>
          <div className="stat-change negative">
            <TrendingUp size={12} style={{ transform: 'rotate(180deg)' }} />
            -3.1% This Week
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      {/* Top Row - Main Sections */}
      <div className="dashboard-top-row">
        <div className="card dashboard-main-card">
          <div className="card-header">
            <div className="card-title">Content Analytics</div>
            <div className="card-subtitle">Content creation and performance insights</div>
          </div>
          <div className="card-content">
            <div style={{ height: '100%', padding: '20px', display: 'flex', flexDirection: 'column' }}>
              {/* Top Stats Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ff6b35', marginBottom: '4px' }}>47</div>
                  <div style={{ fontSize: '12px', color: '#8b949e', fontWeight: '500' }}>Content Created</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#56d364', marginBottom: '4px' }}>23</div>
                  <div style={{ fontSize: '12px', color: '#8b949e', fontWeight: '500' }}>Templates Used</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f1c40f', marginBottom: '4px' }}>156</div>
                  <div style={{ fontSize: '12px', color: '#8b949e', fontWeight: '500' }}>Scheduled Items</div>
                </div>
              </div>
              
              {/* Chart Container */}
              <div style={{ 
                flex: 1, 
                background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', 
                borderRadius: '8px', 
                padding: '20px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '220px'
              }}>
                {/* Chart SVG */}
                <svg width="320" height="160" viewBox="0 0 320 160" style={{ maxWidth: '100%', height: 'auto' }}>
                  <defs>
                    <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#ff6b35" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  
                  {/* Chart Bars */}
                  <rect x="20" y="80" width="30" height="40" fill="url(#barGradient)" rx="4" />
                  <rect x="65" y="65" width="30" height="55" fill="url(#barGradient)" rx="4" />
                  <rect x="110" y="50" width="30" height="70" fill="url(#barGradient)" rx="4" />
                  <rect x="155" y="55" width="30" height="65" fill="url(#barGradient)" rx="4" />
                  <rect x="200" y="40" width="30" height="80" fill="url(#barGradient)" rx="4" />
                  <rect x="245" y="70" width="30" height="50" fill="url(#barGradient)" rx="4" />
                  <rect x="290" y="60" width="30" height="60" fill="url(#barGradient)" rx="4" />
                  
                  {/* Day Labels */}
                  <text x="35" y="140" textAnchor="middle" fill="var(--text-subtle)" fontSize="12" fontWeight="500">Mon</text>
                  <text x="80" y="140" textAnchor="middle" fill="var(--text-subtle)" fontSize="12" fontWeight="500">Tue</text>
                  <text x="125" y="140" textAnchor="middle" fill="var(--text-subtle)" fontSize="12" fontWeight="500">Wed</text>
                  <text x="170" y="140" textAnchor="middle" fill="var(--text-subtle)" fontSize="12" fontWeight="500">Thu</text>
                  <text x="215" y="140" textAnchor="middle" fill="var(--text-subtle)" fontSize="12" fontWeight="500">Fri</text>
                  <text x="260" y="140" textAnchor="middle" fill="var(--text-subtle)" fontSize="12" fontWeight="500">Sat</text>
                  <text x="305" y="140" textAnchor="middle" fill="var(--text-subtle)" fontSize="12" fontWeight="500">Sun</text>
                </svg>
                
                {/* Chart Legend */}
                <div style={{ 
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  fontSize: '11px', 
                  color: 'var(--text-secondary)',
                  fontWeight: '500',
                  background: 'var(--bg-primary)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.3s ease'
                }}>
                  Weekly Content Creation
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card dashboard-main-card">
          <div className="card-header">
            <div className="card-title">Recent Activity</div>
            <div className="card-subtitle">Latest content creation activities</div>
            <div className="calendar-nav" style={{ marginLeft: 'auto' }}>
              <button 
                onClick={prevActivities}
                disabled={activityStartIndex === 0}
                style={{ opacity: activityStartIndex === 0 ? 0.5 : 1 }}
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={nextActivities}
                disabled={activityStartIndex + 5 >= allActivities.length}
                style={{ opacity: activityStartIndex + 5 >= allActivities.length ? 0.5 : 1 }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="card-content">
            <div className="activity-feed">
              {visibleActivities.map((activity, index) => (
                <div key={activityStartIndex + index} className="activity-item">
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-content">
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card dashboard-main-card">
          <div className="card-header">
            <div className="card-title">Content Calendar</div>
            <div className="card-subtitle">Upcoming scheduled content</div>
            <div className="calendar-nav" style={{ marginLeft: 'auto' }}>
              <button onClick={prevMonth}>
                <ChevronLeft size={16} />
              </button>
              <button onClick={nextMonth}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="card-content" style={{ padding: 0 }}>
            <div className="mini-calendar">
              <div className="mini-calendar-header">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </div>
              <div className="mini-calendar-grid">
                {['S', 'M', 'T', 'W', 'Th', 'F', 'S'].map((day, index) => (
                  <div key={`header-${index}`} className="mini-calendar-day header">{day}</div>
                ))}
                
                {getDaysInMonth().map((dayData, index) => (
                  <div 
                    key={`day-${index}`} 
                    className={`mini-calendar-day ${
                      dayData.isToday ? 'today' : ''
                    } ${
                      dayData.hasEvent ? 'has-event' : ''
                    } ${
                      !dayData.isCurrentMonth ? 'other-month' : ''
                    }`}
                  >
                    {dayData.day}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row - Widgets */}
      <div className="dashboard-bottom-row">
        <div className="card dashboard-widget-card">
          <div className="card-header">
            <div className="card-title">Active Personas</div>
            <div className="card-subtitle">Customer profiles in use</div>
            <div className="calendar-nav" style={{ marginLeft: 'auto' }}>
              <button 
                onClick={prevPersonas}
                disabled={personaStartIndex === 0}
                style={{ opacity: personaStartIndex === 0 ? 0.5 : 1 }}
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={nextPersonas}
                disabled={personaStartIndex + 3 >= allPersonas.length}
                style={{ opacity: personaStartIndex + 3 >= allPersonas.length ? 0.5 : 1 }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="card-content">
            <div className="personas-widget">
              {visiblePersonas.map((persona) => (
                <div key={persona.id} className="persona-widget-item" onClick={() => navigateToPage('persona-builder')}>
                  <div className="persona-widget-avatar">{persona.avatar}</div>
                  <div className="persona-widget-info">
                    <h4>{persona.name}</h4>
                    <p>{persona.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card dashboard-widget-card">
          <div className="card-header">
            <div className="card-title">AI Services Status</div>
            <div className="card-subtitle">API connections</div>
          </div>
          <div className="card-content">
            <div className="api-status-widget">
              <div className="api-status-item">
                <div className="api-status-name">Claude API</div>
                <div className="api-status-badge connected">Connected</div>
              </div>
              
              <div className="api-status-item">
                <div className="api-status-name">ChatGPT API</div>
                <div className="api-status-badge disconnected">Not Connected</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card dashboard-widget-card">
          <div className="card-header">
            <div className="card-title">Upcoming Content</div>
            <div className="card-subtitle">Next 7 days schedule</div>
          </div>
          <div className="card-content">
            <div className="upcoming-content">
              <div className="upcoming-item">
                <div className="upcoming-date">Dec 7</div>
                <div className="upcoming-info">
                  <h4>Product Launch Email</h4>
                  <p>Draft ready for review</p>
                  <span className="upcoming-platform">EMAIL</span>
                </div>
              </div>
              
              <div className="upcoming-item">
                <div className="upcoming-date">Dec 8</div>
                <div className="upcoming-info">
                  <h4>Social Media Post</h4>
                  <p>Feature announcement content</p>
                  <span className="upcoming-platform">LINKEDIN</span>
                </div>
              </div>
              
              <div className="upcoming-item">
                <div className="upcoming-date">Dec 10</div>
                <div className="upcoming-info">
                  <h4>Blog Post Content</h4>
                  <p>Industry insights article draft</p>
                  <span className="upcoming-platform">WEBSITE</span>
                </div>
              </div>
              
              <div className="upcoming-item">
                <div className="upcoming-date">Dec 12</div>
                <div className="upcoming-info">
                  <h4>Newsletter Content</h4>
                  <p>Monthly digest template</p>
                  <span className="upcoming-platform">EMAIL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;