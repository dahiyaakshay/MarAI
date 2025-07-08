import React, { useState } from 'react';
import { Send, Edit, Save, Check, User, Star, Target, Brain, Calendar, Lightbulb } from 'lucide-react';
import DownloadButton from '../Common/DownloadButton';

interface PersonaBuilderProps {
  openEditPersonaModal: () => void;
}

const PersonaBuilder: React.FC<PersonaBuilderProps> = ({ openEditPersonaModal }) => {
  const [activeTab, setActiveTab] = useState('new-persona');
  const [selectedPersona, setSelectedPersona] = useState(1);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: `👋 Hi! I'm your AI persona builder. Tell me about your target customer and I'll help you create a comprehensive persona profile.

You can start by describing:
• Their job role or position
• The industry they work in
• Their main goals and challenges
• Any demographic information you know

The more details you provide, the more accurate and useful the persona will be!`
    }
  ]);
  const [generatedPersona, setGeneratedPersona] = useState<any>(null);

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
        { type: 'ai', content: "🤔 Analyzing your description... I'm creating a comprehensive persona based on the information you provided." }
      ]);
      
      // Generate persona after a delay
      setTimeout(() => {
        generatePersonaFromChat(chatInput);
        setMessages(prev => [...prev, { type: 'ai', content: "✅ Great! I've created a detailed persona based on your description. You can see the preview on the right. Feel free to edit any details or save it to your personas library!" }]);
      }, 2000);
    }, 1000);
  };

  const generatePersonaFromChat = (description: string) => {
    const isEnterprise = description.toLowerCase().includes('enterprise') || description.toLowerCase().includes('large company');
    const isTech = description.toLowerCase().includes('tech') || description.toLowerCase().includes('software');
    const isMarketing = description.toLowerCase().includes('marketing') || description.toLowerCase().includes('lead');
    
    const persona = {
      name: isEnterprise ? 'Emily Richardson' : 'David Martinez',
      role: isMarketing ? 'Head of Digital Marketing' : 'Product Manager',
      company: isEnterprise ? 'Fortune 500 Company' : 'Growing Startup',
      avatar: isEnterprise ? 'ER' : 'DM',
      age: isEnterprise ? '42 years old' : '34 years old',
      location: isTech ? 'Seattle, WA' : 'Chicago, IL',
      income: isEnterprise ? '$120,000 - $150,000' : '$75,000 - $95,000',
      education: isMarketing ? 'MBA Marketing' : 'BS Computer Science',
      techComfort: 'High - Early Adopter',
      decisionMaking: 'Data-Driven',
      communication: 'Email & Video Calls',
      workStyle: 'Collaborative',
      goals: [
        'Increase team productivity by 30%',
        'Implement AI-driven marketing solutions',
        'Build a data-driven culture',
        'Reduce marketing costs while improving ROI'
      ],
      painPoints: [
        'Too many disconnected tools',
        'Difficulty measuring campaign ROI',
        'Limited time for strategic planning',
        'Keeping up with marketing trends'
      ],
      solutions: [
        'Integrated marketing platform',
        'AI-powered content generation',
        'Automated reporting dashboards',
        'Predictive analytics tools'
      ],
      characteristics: [
        'Active on LinkedIn and Twitter',
        'Attends 5-6 industry conferences yearly',
        'Prefers data-backed decisions',
        'Early morning email checker',
        'Values work-life balance'
      ]
    };
    
    setGeneratedPersona(persona);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const saveGeneratedPersona = () => {
    if (!generatedPersona) return;
    
    alert('Persona saved successfully!');
    setActiveTab('saved-personas');
    setGeneratedPersona(null);
  };

  const editGeneratedPersona = () => {
    openEditPersonaModal();
  };

  const personas = [
    {
      id: 1,
      name: 'John Davis',
      role: 'Marketing Manager',
      avatar: 'JD',
      tags: ['B2B', 'Tech Savvy', '35-45']
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'Small Business Owner',
      avatar: 'SC',
      tags: ['E-commerce', 'Budget Conscious', '25-35']
    },
    {
      id: 3,
      name: 'Michael Johnson',
      role: 'Enterprise CTO',
      avatar: 'MJ',
      tags: ['Enterprise', 'Decision Maker', '45-55']
    }
  ];

  const currentPersona = personas.find(p => p.id === selectedPersona) || personas[0];

  return (
    <>
      {/* Sub-navigation for Persona Builder */}
      <div className="persona-builder-nav">
        <button 
          className={`persona-tab-btn ${activeTab === 'new-persona' ? 'active' : ''}`}
          onClick={() => setActiveTab('new-persona')}
        >
          New Persona
        </button>
        <button 
          className={`persona-tab-btn ${activeTab === 'saved-personas' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved-personas')}
        >
          Saved Personas
        </button>
      </div>

      {/* New Persona Section */}
      {activeTab === 'new-persona' && (
        <div className="persona-tab active">
          <div className="new-persona-container">
            <div className="new-persona-chat">
              <div className="chat-header">
                <div className="chat-title">AI Persona Builder</div>
                <div className="chat-subtitle">Describe your target customer and I'll help you build a detailed persona</div>
              </div>
              
              <div className="chat-content">
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
                    placeholder="E.g., 'I want to create a persona for a marketing manager at a mid-size tech company who struggles with lead generation...'" 
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
            
            <div className="persona-preview-section">
              <div className="preview-header">
                <div className="preview-title">Persona Preview</div>
                <div className="preview-actions">
                  {generatedPersona && (
                    <>
                      <button className="btn btn-secondary" onClick={editGeneratedPersona}>
                        <Edit size={16} />
                        Edit
                      </button>
                      <button className="btn" onClick={saveGeneratedPersona}>
                        <Save size={16} />
                        Save Persona
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="persona-preview-content">
                {generatedPersona ? (
                  <div>
                    <div className="persona-detail-header" style={{ margin: '-24px -24px 24px -24px' }}>
                      <div className="persona-detail-title">
                        <div className="persona-detail-avatar">{generatedPersona.avatar}</div>
                        <div>
                          <h2 className="persona-detail-name">{generatedPersona.name}</h2>
                          <p className="persona-detail-role">{generatedPersona.role} at {generatedPersona.company}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="persona-section">
                      <h3 className="persona-section-title">
                        <User size={20} />
                        Demographics
                      </h3>
                      <div className="persona-info-grid">
                        <div className="persona-info-item">
                          <div className="persona-info-label">Age</div>
                          <div className="persona-info-value">{generatedPersona.age}</div>
                        </div>
                        <div className="persona-info-item">
                          <div className="persona-info-label">Location</div>
                          <div className="persona-info-value">{generatedPersona.location}</div>
                        </div>
                        <div className="persona-info-item">
                          <div className="persona-info-label">Income</div>
                          <div className="persona-info-value">{generatedPersona.income}</div>
                        </div>
                        <div className="persona-info-item">
                          <div className="persona-info-label">Education</div>
                          <div className="persona-info-value">{generatedPersona.education}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="persona-section">
                      <h3 className="persona-section-title">
                        <Star size={20} />
                        Goals & Motivations
                      </h3>
                      <div className="persona-description">
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {generatedPersona.goals.map((goal: string, index: number) => (
                            <li key={index} style={{ marginBottom: '12px' }}>✓ {goal}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="persona-section">
                      <h3 className="persona-section-title">
                        <Target size={20} />
                        Pain Points & Challenges
                      </h3>
                      <div className="persona-description">
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {generatedPersona.painPoints.map((pain: string, index: number) => (
                            <li key={index} style={{ marginBottom: '12px' }}>× {pain}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="preview-placeholder">
                    <User size={64} style={{ color: 'var(--border-hover)' }} />
                    <h3>Your Persona Will Appear Here</h3>
                    <p>Start chatting with the AI to create a detailed customer persona</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Saved Personas Section */}
      {activeTab === 'saved-personas' && (
        <div className="persona-tab active">
          <div className="persona-builder-container">
            {/* Personas List Sidebar */}
            <div className="personas-sidebar">
              <div className="personas-header">
                <h3 className="personas-title">Your Personas</h3>
                <DownloadButton type="personas" />
              </div>
            
              <div className="personas-list">
                {personas.map(persona => (
                  <div 
                    key={persona.id}
                    className={`persona-item ${selectedPersona === persona.id ? 'active' : ''}`}
                    onClick={() => setSelectedPersona(persona.id)}
                  >
                    <div className="persona-item-header">
                      <div className="persona-avatar">{persona.avatar}</div>
                      <div className="persona-item-info">
                        <div className="persona-name">{persona.name}</div>
                        <div className="persona-role">{persona.role}</div>
                      </div>
                    </div>
                    <div className="persona-tags">
                      {persona.tags.map(tag => (
                        <span key={tag} className="persona-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Persona Detail View */}
            <div className="persona-detail">
              <div className="persona-detail-header">
                <div className="persona-detail-title">
                  <div className="persona-detail-avatar">{currentPersona.avatar}</div>
                  <div>
                    <h2 className="persona-detail-name">{currentPersona.name}</h2>
                    <p className="persona-detail-role">{currentPersona.role} at Tech Corp</p>
                  </div>
                </div>
                <div className="persona-detail-actions">
                  <button className="btn btn-secondary" onClick={openEditPersonaModal}>
                    <Edit size={16} />
                    Edit
                  </button>
                  <button className="btn">
                    <Check size={16} />
                    Use for Content
                  </button>
                </div>
              </div>
              
              <div className="persona-detail-content">
                {/* Demographics Section */}
                <div className="persona-section">
                  <h3 className="persona-section-title">
                    <User size={20} />
                    Demographics
                  </h3>
                  <div className="persona-info-grid">
                    <div className="persona-info-item">
                      <div className="persona-info-label">Age</div>
                      <div className="persona-info-value">38 years old</div>
                    </div>
                    <div className="persona-info-item">
                      <div className="persona-info-label">Location</div>
                      <div className="persona-info-value">San Francisco, CA</div>
                    </div>
                    <div className="persona-info-item">
                      <div className="persona-info-label">Income</div>
                      <div className="persona-info-value">$85,000 - $120,000</div>
                    </div>
                    <div className="persona-info-item">
                      <div className="persona-info-label">Education</div>
                      <div className="persona-info-value">MBA Marketing</div>
                    </div>
                  </div>
                </div>
                
                {/* Goals & Motivations */}
                <div className="persona-section">
                  <h3 className="persona-section-title">
                    <Star size={20} />
                    Goals & Motivations
                  </h3>
                  <div className="persona-description">
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      <li style={{ marginBottom: '12px' }}>✓ Increase marketing ROI by 40% this year</li>
                      <li style={{ marginBottom: '12px' }}>✓ Build a strong brand presence across digital channels</li>
                      <li style={{ marginBottom: '12px' }}>✓ Generate qualified leads for sales team</li>
                      <li style={{ marginBottom: '12px' }}>✓ Stay ahead of marketing technology trends</li>
                    </ul>
                  </div>
                </div>
                
                {/* Pain Points */}
                <div className="persona-section">
                  <h3 className="persona-section-title">
                    <Target size={20} />
                    Pain Points & Challenges
                  </h3>
                  <div className="persona-description">
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      <li style={{ marginBottom: '12px' }}>× Limited budget for marketing initiatives</li>
                      <li style={{ marginBottom: '12px' }}>× Difficulty measuring campaign effectiveness</li>
                      <li style={{ marginBottom: '12px' }}>× Too many marketing tools to manage</li>
                      <li style={{ marginBottom: '12px' }}>× Lack of time for content creation</li>
                    </ul>
                  </div>
                </div>
                
                {/* Behavioral Traits */}
                <div className="persona-section">
                  <h3 className="persona-section-title">
                    <Brain size={20} />
                    Behavioral Traits
                  </h3>
                  <div className="persona-info-grid">
                    <div className="persona-info-item">
                      <div className="persona-info-label">Tech Comfort</div>
                      <div className="persona-info-value">High - Early Adopter</div>
                    </div>
                    <div className="persona-info-item">
                      <div className="persona-info-label">Decision Making</div>
                      <div className="persona-info-value">Data-Driven</div>
                    </div>
                    <div className="persona-info-item">
                      <div className="persona-info-label">Communication</div>
                      <div className="persona-info-value">Email & Slack</div>
                    </div>
                    <div className="persona-info-item">
                      <div className="persona-info-label">Work Style</div>
                      <div className="persona-info-value">Collaborative</div>
                    </div>
                  </div>
                </div>
                
                {/* Possible Solutions */}
                <div className="persona-section">
                  <h3 className="persona-section-title">
                    <Lightbulb size={20} />
                    Possible Solutions to Their Problems
                  </h3>
                  <div className="persona-description">
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      <li style={{ marginBottom: '12px' }}>💡 Marketing automation tools to save time on repetitive tasks</li>
                      <li style={{ marginBottom: '12px' }}>💡 All-in-one platform to reduce tool sprawl and complexity</li>
                      <li style={{ marginBottom: '12px' }}>💡 AI-powered content generation for faster campaign creation</li>
                      <li style={{ marginBottom: '12px' }}>💡 Built-in analytics dashboard for easy ROI tracking</li>
                      <li style={{ marginBottom: '12px' }}>💡 Budget-friendly pricing with scalable features</li>
                    </ul>
                  </div>
                </div>
                
                {/* Unique Characteristics */}
                <div className="persona-section">
                  <h3 className="persona-section-title">
                    <Star size={20} />
                    Unique Characteristics
                  </h3>
                  <div className="persona-description">
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      <li style={{ marginBottom: '12px' }}>🎯 Highly active on LinkedIn, shares industry insights regularly</li>
                      <li style={{ marginBottom: '12px' }}>🎯 Prefers video tutorials over written documentation</li>
                      <li style={{ marginBottom: '12px' }}>🎯 Values peer recommendations and case studies</li>
                      <li style={{ marginBottom: '12px' }}>🎯 Attends 3-4 marketing conferences annually</li>
                      <li style={{ marginBottom: '12px' }}>🎯 Early morning worker, most productive 6-10 AM</li>
                      <li style={{ marginBottom: '12px' }}>🎯 Advocates for sustainable and ethical marketing practices</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonaBuilder;