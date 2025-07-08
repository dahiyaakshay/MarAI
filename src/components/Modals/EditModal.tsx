import React, { useState, useEffect } from 'react';
import { X, Calendar, FileText, Star, Settings } from 'lucide-react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  calendarType: string;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, data, calendarType }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '09:00',
    title: '',
    content: '',
    contentType: '',
    platform: '',
    campaignType: '',
    status: 'draft',
    audience: '',
    tags: ''
  });

  const calendarOptions = {
    'marketing-calendar': {
      title: 'Edit Marketing Content',
      contentTypes: [
        { value: 'blog', text: 'Blog Post' },
        { value: 'infographic', text: 'Infographic' },
        { value: 'social-post', text: 'Social Media Post' },
        { value: 'email', text: 'Email Campaign' },
        { value: 'whitepaper', text: 'Whitepaper' },
        { value: 'video-script', text: 'Video Script' },
        { value: 'press-release', text: 'Press Release' },
        { value: 'case-study', text: 'Case Study' }
      ],
      platforms: [
        { value: 'website', text: 'Website/Blog' },
        { value: 'facebook', text: 'Facebook' },
        { value: 'instagram', text: 'Instagram' },
        { value: 'twitter', text: 'Twitter/X' },
        { value: 'linkedin', text: 'LinkedIn' },
        { value: 'email', text: 'Email' }
      ],
      campaignTypes: [
        { value: 'brand-awareness', text: 'Brand Awareness' },
        { value: 'lead-generation', text: 'Lead Generation' },
        { value: 'product-launch', text: 'Product Launch' },
        { value: 'promotional', text: 'Promotional' }
      ]
    },
    'social-calendar': {
      title: 'Edit Social Media Post',
      contentTypes: [
        { value: 'post', text: 'Social Media Post' },
        { value: 'story', text: 'Story Content' },
        { value: 'reel', text: 'Reel/Short Video' },
        { value: 'carousel', text: 'Carousel Post' }
      ],
      platforms: [
        { value: 'facebook', text: 'Facebook' },
        { value: 'instagram', text: 'Instagram' },
        { value: 'twitter', text: 'Twitter/X' },
        { value: 'linkedin', text: 'LinkedIn' },
        { value: 'tiktok', text: 'TikTok' }
      ],
      campaignTypes: [
        { value: 'engagement', text: 'Engagement Campaign' },
        { value: 'viral', text: 'Viral Content' },
        { value: 'influencer', text: 'Influencer Collaboration' },
        { value: 'community', text: 'Community Building' }
      ]
    },
    'email-calendar': {
      title: 'Edit Email Campaign',
      contentTypes: [
        { value: 'newsletter', text: 'Newsletter' },
        { value: 'promotional', text: 'Promotional' },
        { value: 'welcome', text: 'Welcome Series' },
        { value: 'abandoned-cart', text: 'Abandoned Cart' }
      ],
      platforms: [
        { value: 'mailchimp', text: 'Mailchimp' },
        { value: 'hubspot', text: 'HubSpot' },
        { value: 'sendgrid', text: 'SendGrid' },
        { value: 'klaviyo', text: 'Klaviyo' }
      ],
      campaignTypes: [
        { value: 'broadcast', text: 'Broadcast Email' },
        { value: 'automated', text: 'Automated Sequence' },
        { value: 'drip', text: 'Drip Campaign' },
        { value: 'trigger', text: 'Trigger-based' }
      ]
    }
  };

  const currentOptions = calendarOptions[calendarType as keyof typeof calendarOptions] || calendarOptions['marketing-calendar'];

  useEffect(() => {
    if (data) {
      setFormData({
        date: data.date || '',
        time: data.time || '09:00',
        title: data.title || '',
        content: data.content || '',
        contentType: data.contentType || '',
        platform: data.platform || '',
        campaignType: data.campaignType || '',
        status: data.status || 'draft',
        audience: data.audience || '',
        tags: data.tags || ''
      });
    }
  }, [data]);

  const handleSave = () => {
    console.log('Saving content:', formData);
    alert('Content saved successfully!');
    onClose();
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this content?')) {
      console.log('Deleting content');
      alert('Content deleted successfully!');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">{currentOptions.title}</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          <form>
            {/* Date & Time Section */}
            <div className="form-section">
              <div className="section-title">
                <Calendar size={16} />
                Schedule
              </div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="input-label">Date</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="input-label">Time</label>
                  <input 
                    type="time" 
                    className="form-input" 
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="form-section">
              <div className="section-title">
                <FileText size={16} />
                Content Details
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="input-label">Title</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter content title..."
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="input-label">Content</label>
                  <textarea 
                    className="form-input form-textarea" 
                    placeholder="Enter your content here..."
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Campaign Configuration */}
            <div className="form-section">
              <div className="section-title">
                <Star size={16} />
                Campaign Settings
              </div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="input-label">Content Type</label>
                  <select 
                    className="form-select"
                    value={formData.contentType}
                    onChange={(e) => setFormData(prev => ({ ...prev, contentType: e.target.value }))}
                  >
                    <option value="">Select content type...</option>
                    {currentOptions.contentTypes.map(option => (
                      <option key={option.value} value={option.value}>{option.text}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="input-label">Platform</label>
                  <select 
                    className="form-select"
                    value={formData.platform}
                    onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value }))}
                  >
                    <option value="">Select platform...</option>
                    {currentOptions.platforms.map(option => (
                      <option key={option.value} value={option.value}>{option.text}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="input-label">Campaign Type</label>
                  <select 
                    className="form-select"
                    value={formData.campaignType}
                    onChange={(e) => setFormData(prev => ({ ...prev, campaignType: e.target.value }))}
                  >
                    <option value="">Select campaign type...</option>
                    {currentOptions.campaignTypes.map(option => (
                      <option key={option.value} value={option.value}>{option.text}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="input-label">Status</label>
                  <select 
                    className="form-select"
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="published">Published</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Settings */}
            <div className="form-section">
              <div className="section-title">
                <Settings size={16} />
                Additional Options
              </div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="input-label">Target Audience</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g., Marketing professionals, B2B decision makers"
                    value={formData.audience}
                    onChange={(e) => setFormData(prev => ({ ...prev, audience: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="input-label">Tags</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g., promotion, product-launch, holiday"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-delete" onClick={handleDelete}>
            Delete
          </button>
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          <button type="button" className="btn-save" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;