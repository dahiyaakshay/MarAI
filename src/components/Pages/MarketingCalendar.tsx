import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import MultiSelect from '../Common/MultiSelect';
import DownloadButton from '../Common/DownloadButton';

interface MarketingCalendarProps {
  openEditModal: (data?: any) => void;
}

const MarketingCalendar: React.FC<MarketingCalendarProps> = ({ openEditModal }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [urlInput, setUrlInput] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedFrequencies, setSelectedFrequencies] = useState<string[]>([]);
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: '👋 Hi! I\'m your AI marketing assistant. Add a URL above and I\'ll analyze it to help you create targeted content for your marketing calendar.'
    }
  ]);

  const analyzeUrl = () => {
    if (!urlInput) {
      alert('Please enter a URL to analyze');
      return;
    }

    const newMessages = [
      ...messages,
      { type: 'user', content: `Analyzing URL: ${urlInput}` }
    ];
    setMessages(newMessages);

    setTimeout(() => {
      setMessages([
        ...newMessages,
        { type: 'ai', content: '✅ URL analyzed successfully! I found valuable insights about the content, target audience, and key messaging. Ready to create content based on your specifications!' }
      ]);
    }, 2000);
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;

    const newMessages = [
      ...messages,
      { type: 'user', content: chatInput }
    ];
    setMessages(newMessages);
    setChatInput('');

    setTimeout(() => {
      setMessages([
        ...newMessages,
        { type: 'ai', content: 'I\'ll help you create that content! Based on the analyzed URL and your requirements, I can generate the content and schedule it in your calendar.' }
      ]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

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

  const handleDayClick = (day: number) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = selectedDate.toISOString().split('T')[0];
    openEditModal({ date: dateString });
  };

  return (
    <div className="calendar-layout">
      {/* Calendar Section */}
      <div className="calendar-section">
        <div className="calendar-header">
          <h3 className="calendar-title">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <DownloadButton type="calendar" calendarType="marketing" />
            <DownloadButton type="content" calendarType="marketing" />
            <div className="calendar-nav">
            <button onClick={prevMonth}>
              <ChevronLeft size={16} />
            </button>
            <button onClick={nextMonth}>
              <ChevronRight size={16} />
            </button>
            </div>
          </div>
        </div>
        
        <div className="calendar-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="calendar-day-header">{day}</div>
          ))}
          
          {getDaysInMonth().map((dayData, index) => (
            <div 
              key={index} 
              className={`calendar-day ${
                dayData.isToday ? 'today' : ''
              } ${
                !dayData.isCurrentMonth ? 'other-month' : ''
              }`}
              onClick={() => dayData.isCurrentMonth && handleDayClick(dayData.day)}
            >
              <div className="day-number">{dayData.day}</div>
              {dayData.hasEvent && (
                <div className="day-events">
                  <div className="event-dot"></div>
                  {dayData.day === 12 && <div className="event-dot"></div>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="chat-section">
        <div className="chat-header">
          <div className="chat-title">AI Content Generator</div>
          <div className="chat-subtitle">Create marketing content from any URL</div>
        </div>
        
        <div className="chat-content">
          <div className="url-input-section">
            <label className="input-label">Website URL</label>
            <input 
              type="url" 
              className="url-input" 
              placeholder="https://example.com" 
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
            <button className="analyze-btn" onClick={analyzeUrl}>Analyze URL</button>
          </div>

          <div className="config-section">
            <div className="select-group">
              <label className="input-label">Content Type</label>
              <MultiSelect
                options={[
                  { value: 'blog', label: 'Blog Post' },
                  { value: 'infographic', label: 'Infographic' },
                  { value: 'social-post', label: 'Social Media Post' },
                  { value: 'email', label: 'Email Campaign' },
                  { value: 'whitepaper', label: 'Whitepaper' },
                  { value: 'video-script', label: 'Video Script' },
                  { value: 'press-release', label: 'Press Release' },
                  { value: 'case-study', label: 'Case Study' }
                ]}
                value={selectedContentTypes}
                onChange={setSelectedContentTypes}
                placeholder="Select content types..."
              />
            </div>

            <div className="select-group">
              <label className="input-label">Platform</label>
              <MultiSelect
                options={[
                  { value: 'facebook', label: 'Facebook' },
                  { value: 'instagram', label: 'Instagram' },
                  { value: 'twitter', label: 'Twitter/X' },
                  { value: 'linkedin', label: 'LinkedIn' },
                  { value: 'reddit', label: 'Reddit' },
                  { value: 'tiktok', label: 'TikTok' },
                  { value: 'youtube', label: 'YouTube' },
                  { value: 'website', label: 'Website/Blog' },
                  { value: 'email', label: 'Email' }
                ]}
                value={selectedPlatforms}
                onChange={setSelectedPlatforms}
                placeholder="Select platforms..."
              />
            </div>

            <div className="select-group">
              <label className="input-label">Frequency</label>
              <MultiSelect
                options={[
                  { value: 'daily', label: 'Daily' },
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'bi-weekly', label: 'Bi-weekly' },
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'quarterly', label: 'Quarterly' },
                  { value: 'one-time', label: 'One-time' }
                ]}
                value={selectedFrequencies}
                onChange={setSelectedFrequencies}
                placeholder="Select frequencies..."
              />
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                {message.content}
              </div>
            ))}
          </div>

          <div className="chat-input-area">
            <textarea 
              className="chat-input" 
              placeholder="Ask me to create content based on the analyzed URL..." 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="send-btn" onClick={sendMessage}>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingCalendar;