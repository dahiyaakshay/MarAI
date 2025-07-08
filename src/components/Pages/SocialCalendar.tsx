import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import MultiSelect from '../Common/MultiSelect';
import DownloadButton from '../Common/DownloadButton';

interface SocialCalendarProps {
  openEditModal: (data?: any) => void;
}

const SocialCalendar: React.FC<SocialCalendarProps> = ({ openEditModal }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [urlInput, setUrlInput] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedFrequencies, setSelectedFrequencies] = useState<string[]>([]);
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: '📱 Ready to create social media content! Share a URL and I\'ll analyze it to generate engaging posts optimized for your chosen platform and audience.'
    }
  ]);

  const analyzeUrl = () => {
    if (!urlInput) {
      alert('Please enter a URL to analyze');
      return;
    }

    const newMessages = [
      ...messages,
      { type: 'user', content: `Analyzing URL for social media: ${urlInput}` }
    ];
    setMessages(newMessages);

    setTimeout(() => {
      setMessages([
        ...newMessages,
        { type: 'ai', content: '🎯 Perfect! I\'ve analyzed the content and identified key elements perfect for social media engagement.' }
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
        { type: 'ai', content: '🚀 Great idea! I\'ll create engaging social media content optimized for your selected platform.' }
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
            <DownloadButton type="calendar" calendarType="social" />
            <DownloadButton type="content" calendarType="social" />
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
          <div className="chat-title">Social Media AI</div>
          <div className="chat-subtitle">Generate social content from any URL</div>
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
                  { value: 'post', label: 'Social Media Post' },
                  { value: 'story', label: 'Story Content' },
                  { value: 'reel', label: 'Reel/Short Video' },
                  { value: 'carousel', label: 'Carousel Post' },
                  { value: 'live', label: 'Live Stream' },
                  { value: 'poll', label: 'Poll/Question' },
                  { value: 'ugc', label: 'User Generated Content' },
                  { value: 'hashtag-campaign', label: 'Hashtag Campaign' }
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
                  { value: 'tiktok', label: 'TikTok' },
                  { value: 'youtube', label: 'YouTube Shorts' },
                  { value: 'snapchat', label: 'Snapchat' },
                  { value: 'pinterest', label: 'Pinterest' },
                  { value: 'reddit', label: 'Reddit' }
                ]}
                value={selectedPlatforms}
                onChange={setSelectedPlatforms}
                placeholder="Select platforms..."
              />
            </div>

            <div className="select-group">
              <label className="input-label">Posting Frequency</label>
              <MultiSelect
                options={[
                  { value: 'multiple-daily', label: 'Multiple times daily' },
                  { value: 'daily', label: 'Daily' },
                  { value: 'every-other-day', label: 'Every other day' },
                  { value: '3x-week', label: '3x per week' },
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'bi-weekly', label: 'Bi-weekly' },
                  { value: 'monthly', label: 'Monthly' }
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
              placeholder="Ask me to create social media content..." 
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

export default SocialCalendar;