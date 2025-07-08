import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import MultiSelect from '../Common/MultiSelect';
import DownloadButton from '../Common/DownloadButton';

interface EmailCalendarProps {
  openEditModal: (data?: any) => void;
}

const EmailCalendar: React.FC<EmailCalendarProps> = ({ openEditModal }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [urlInput, setUrlInput] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [selectedEmailTypes, setSelectedEmailTypes] = useState<string[]>([]);
  const [selectedCampaignTypes, setSelectedCampaignTypes] = useState<string[]>([]);
  const [selectedFrequencies, setSelectedFrequencies] = useState<string[]>([]);
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: '📧 I\'m your email marketing assistant! Add a URL and I\'ll help you create compelling email campaigns that convert visitors into customers.'
    }
  ]);

  const analyzeUrl = () => {
    if (!urlInput) {
      alert('Please enter a URL to analyze');
      return;
    }

    const newMessages = [
      ...messages,
      { type: 'user', content: `Analyzing URL for email campaign: ${urlInput}` }
    ];
    setMessages(newMessages);

    setTimeout(() => {
      setMessages([
        ...newMessages,
        { type: 'ai', content: '📧 Excellent source material! I\'ve identified compelling content that will convert well in email format.' }
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
        { type: 'ai', content: '💡 Perfect direction! I\'ll craft a compelling email campaign with attention-grabbing subject lines.' }
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
            <DownloadButton type="calendar" calendarType="email" />
            <DownloadButton type="content" calendarType="email" />
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
          <div className="chat-title">Email Campaign AI</div>
          <div className="chat-subtitle">Create email campaigns from any URL</div>
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
              <label className="input-label">Email Type</label>
              <MultiSelect
                options={[
                  { value: 'newsletter', label: 'Newsletter' },
                  { value: 'promotional', label: 'Promotional' },
                  { value: 'welcome', label: 'Welcome Series' },
                  { value: 'abandoned-cart', label: 'Abandoned Cart' },
                  { value: 'product-launch', label: 'Product Launch' },
                  { value: 'educational', label: 'Educational Content' },
                  { value: 're-engagement', label: 'Re-engagement' },
                  { value: 'survey', label: 'Survey/Feedback' }
                ]}
                value={selectedEmailTypes}
                onChange={setSelectedEmailTypes}
                placeholder="Select email types..."
              />
            </div>

            <div className="select-group">
              <label className="input-label">Campaign Type</label>
              <MultiSelect
                options={[
                  { value: 'broadcast', label: 'Broadcast Email' },
                  { value: 'automated', label: 'Automated Sequence' },
                  { value: 'drip', label: 'Drip Campaign' },
                  { value: 'trigger', label: 'Trigger-based' },
                  { value: 'ab-test', label: 'A/B Test Campaign' },
                  { value: 'transactional', label: 'Transactional' }
                ]}
                value={selectedCampaignTypes}
                onChange={setSelectedCampaignTypes}
                placeholder="Select campaign types..."
              />
            </div>

            <div className="select-group">
              <label className="input-label">Send Frequency</label>
              <MultiSelect
                options={[
                  { value: 'daily', label: 'Daily' },
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'bi-weekly', label: 'Bi-weekly' },
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'quarterly', label: 'Quarterly' },
                  { value: 'triggered', label: 'Event Triggered' },
                  { value: 'one-time', label: 'One-time Send' }
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
              placeholder="Ask me to create email campaign content..." 
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

export default EmailCalendar;