import React, { useState } from 'react';
import { X, User, TrendingUp, Target, Brain, Lightbulb } from 'lucide-react';

interface EditPersonaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditPersonaModal: React.FC<EditPersonaModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: 'John Davis',
    role: 'Marketing Manager at Tech Corp',
    age: '38',
    location: 'San Francisco, CA',
    income: '$85,000 - $120,000',
    education: 'MBA Marketing',
    goals: 'Increase marketing ROI by 40% this year\nBuild a strong brand presence across digital channels\nGenerate qualified leads for sales team\nStay ahead of marketing technology trends',
    painPoints: 'Limited budget for marketing initiatives\nDifficulty measuring campaign effectiveness\nToo many marketing tools to manage\nLack of time for content creation',
    techComfort: 'High - Early Adopter',
    decisionMaking: 'Data-Driven',
    communication: 'Email & Video Calls',
    workStyle: 'Collaborative',
    solutions: 'Marketing automation tools to save time on repetitive tasks\nAll-in-one platform to reduce tool sprawl and complexity\nAI-powered content generation for faster campaign creation\nBuilt-in analytics dashboard for easy ROI tracking',
    characteristics: 'Highly active on LinkedIn, shares industry insights regularly\nPrefers video tutorials over written documentation\nValues peer recommendations and case studies\nAttends 3-4 marketing conferences annually'
  });

  const handleSave = () => {
    console.log('Saving persona:', formData);
    alert('Persona saved successfully!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">Edit Persona</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          <form>
            {/* Basic Information */}
            <div className="form-section">
              <div className="section-title">
                <User size={16} />
                Basic Information
              </div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="input-label">Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Persona name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="input-label">Role/Title</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Job title or role"
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="input-label">Age</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g., 35 or 25-35"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="input-label">Location</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="City, State/Country"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Demographics */}
            <div className="form-section">
              <div className="section-title">
                <TrendingUp size={16} />
                Demographics
              </div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="input-label">Income Level</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g., $50k-$75k"
                    value={formData.income}
                    onChange={(e) => setFormData(prev => ({ ...prev, income: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="input-label">Education</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g., Bachelor's degree"
                    value={formData.education}
                    onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Goals & Pain Points */}
            <div className="form-section">
              <div className="section-title">
                <Target size={16} />
                Goals & Pain Points
              </div>
              <div className="form-group">
                <label className="input-label">Goals</label>
                <textarea 
                  className="form-input form-textarea" 
                  placeholder="What are their main goals and motivations?"
                  value={formData.goals}
                  onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="input-label">Pain Points</label>
                <textarea 
                  className="form-input form-textarea" 
                  placeholder="What challenges do they face?"
                  value={formData.painPoints}
                  onChange={(e) => setFormData(prev => ({ ...prev, painPoints: e.target.value }))}
                />
              </div>
            </div>

            {/* Behavioral Traits */}
            <div className="form-section">
              <div className="section-title">
                <Brain size={16} />
                Behavioral Traits
              </div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="input-label">Tech Comfort Level</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g., High - Early Adopter"
                    value={formData.techComfort}
                    onChange={(e) => setFormData(prev => ({ ...prev, techComfort: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="input-label">Decision Making Style</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g., Data-Driven, Intuitive"
                    value={formData.decisionMaking}
                    onChange={(e) => setFormData(prev => ({ ...prev, decisionMaking: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="input-label">Preferred Communication</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g., Email, Phone, Video Calls"
                    value={formData.communication}
                    onChange={(e) => setFormData(prev => ({ ...prev, communication: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="input-label">Work Style</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g., Collaborative, Independent"
                    value={formData.workStyle}
                    onChange={(e) => setFormData(prev => ({ ...prev, workStyle: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Solutions & Characteristics */}
            <div className="form-section">
              <div className="section-title">
                <Lightbulb size={16} />
                Solutions & Characteristics
              </div>
              <div className="form-group">
                <label className="input-label">Possible Solutions to Their Problems</label>
                <textarea 
                  className="form-input form-textarea" 
                  placeholder="What solutions would help address their pain points?"
                  value={formData.solutions}
                  onChange={(e) => setFormData(prev => ({ ...prev, solutions: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="input-label">Unique Characteristics</label>
                <textarea 
                  className="form-input form-textarea" 
                  placeholder="What makes this persona unique? Habits, preferences, behaviors..."
                  value={formData.characteristics}
                  onChange={(e) => setFormData(prev => ({ ...prev, characteristics: e.target.value }))}
                />
              </div>
            </div>
          </form>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          <button type="button" className="btn-save" onClick={handleSave}>Save Persona</button>
        </div>
      </div>
    </div>
  );
};

export default EditPersonaModal;