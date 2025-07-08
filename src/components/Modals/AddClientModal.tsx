import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (clientData: any) => void;
}

const AddClientModal: React.FC<AddClientModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    website: '',
    contactName: '',
    contactEmail: '',
    phone: '',
    contactRole: '',
    targetAudience: '',
    budget: '',
    goals: ''
  });

  const handleSave = () => {
    if (!formData.companyName) {
      alert('Company name is required');
      return;
    }

    onSave(formData);
    
    // Reset form
    setFormData({
      companyName: '',
      industry: '',
      website: '',
      contactName: '',
      contactEmail: '',
      phone: '',
      contactRole: '',
      targetAudience: '',
      budget: '',
      goals: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">Add New Client</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          <form>
            {/* Company Information */}
            <div className="client-form-section">
              <div className="client-form-title">Company Information</div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="input-label">Company Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter company name" 
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="input-label">Industry</label>
                  <select 
                    className="form-select"
                    value={formData.industry}
                    onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                  >
                    <option value="">Select industry...</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="education">Education</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="input-label">Website URL</label>
                <input 
                  type="url" 
                  className="form-input" 
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="client-form-section">
              <div className="client-form-title">Primary Contact</div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="input-label">Contact Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Contact person name"
                    value={formData.contactName}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="input-label">Contact Email</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="contact@example.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="input-label">Phone Number</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="input-label">Contact Role</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g., Marketing Director"
                    value={formData.contactRole}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactRole: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Marketing Details */}
            <div className="client-form-section">
              <div className="client-form-title">Marketing Details</div>
              <div className="form-group">
                <label className="input-label">Target Audience</label>
                <textarea 
                  className="form-input form-textarea" 
                  placeholder="Describe the client's target audience..." 
                  style={{ minHeight: '80px' }}
                  value={formData.targetAudience}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                />
              </div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="input-label">Marketing Budget</label>
                  <select 
                    className="form-select"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  >
                    <option value="">Select budget range...</option>
                    <option value="0-10k">$0 - $10,000</option>
                    <option value="10k-50k">$10,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k+">$100,000+</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="input-label">Primary Marketing Goals</label>
                  <select 
                    className="form-select"
                    value={formData.goals}
                    onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                  >
                    <option value="">Select primary goal...</option>
                    <option value="brand-awareness">Brand Awareness</option>
                    <option value="lead-generation">Lead Generation</option>
                    <option value="sales">Direct Sales</option>
                    <option value="engagement">Customer Engagement</option>
                    <option value="retention">Customer Retention</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          <button type="button" className="btn-save" onClick={handleSave}>
            <Plus size={16} />
            Add Client
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClientModal;