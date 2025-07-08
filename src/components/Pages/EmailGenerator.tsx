import React, { useState } from 'react';
import { Send, Download, Copy, Monitor, Smartphone, Mail, Upload, Image, X } from 'lucide-react';

interface EmailGeneratorProps {
  openPreviewModal: (data: any) => void;
}

const EmailGenerator: React.FC<EmailGeneratorProps> = ({ openPreviewModal }) => {
  const [activeTab, setActiveTab] = useState('create-email');
  const [previewMode, setPreviewMode] = useState('desktop');
  const [urlInput, setUrlInput] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: '🎨 Hi! I\'m your AI email designer. I can create professional email templates for you. Optionally add a website URL and I\'ll extract branding, colors, logos, and content to create on-brand emails. Or just describe what you need!'
    }
  ]);
  const [emailPreview, setEmailPreview] = useState('');

  // Listen for template/wireframe usage from preview modal
  React.useEffect(() => {
    const handleUseTemplateOrWireframe = (event: any) => {
      const data = event.detail;
      if (data.type === 'template') {
        useTemplate(data);
      } else if (data.type === 'wireframe') {
        useWireframe(data);
      }
    };

    window.addEventListener('useTemplateOrWireframe', handleUseTemplateOrWireframe);
    return () => {
      window.removeEventListener('useTemplateOrWireframe', handleUseTemplateOrWireframe);
    };
  }, [messages]);

  const analyzeUrl = () => {
    if (!urlInput) {
      alert('Please enter a URL to analyze');
      return;
    }

    const newMessages = [
      ...messages,
      { type: 'user', content: `Analyzing website: ${urlInput}` }
    ];
    setMessages(newMessages);

    setTimeout(() => {
      setMessages([
        ...newMessages,
        { type: 'ai', content: `🎨 Perfect! I've extracted the branding from ${urlInput}:\n\n✅ Logo and brand colors identified\n✅ Content style and tone analyzed\n✅ Visual elements captured\n✅ Brand guidelines extracted\n\nNow tell me what kind of email you'd like me to create using this brand identity!` }
      ]);
    }, 3000);
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
      const responses = [
        "🚀 Great! I'm creating a professional email template for you. This will include responsive design, your brand colors, and compelling copy...",
        "✨ Generating your custom email with modern styling, clear CTAs, and mobile-optimized layout...",
        "📧 Perfect! Creating an engaging email that matches your brand identity and marketing goals..."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages([...newMessages, { type: 'ai', content: randomResponse }]);
      
      // Generate email preview after a delay
      setTimeout(() => {
        generateEmailPreview(chatInput);
        setMessages(prev => [...prev, { type: 'ai', content: "✅ Your email is ready! Check the preview on the right. You can download the HTML code or copy it to use in your email platform." }]);
      }, 2000);
    }, 1000);
  };

  const generateEmailPreview = (prompt: string) => {
    const previewHTML = `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #ffffff;">
        <div style="background-color: #ff6b35; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Your Brand</h1>
        </div>
        <div style="padding: 30px 20px;">
          <h2 style="color: #333; margin-bottom: 20px;">Generated Email Based on: "${prompt}"</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            This is your AI-generated email content. The design incorporates modern styling, 
            responsive layout, and professional typography optimized for all email clients.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="background-color: #ff6b35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Call to Action</a>
          </div>
          <p style="color: #666; line-height: 1.6;">
            Additional content and details would go here based on your specific requirements and brand guidelines.
          </p>
        </div>
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #999;">
          © 2025 Your Company. All rights reserved.
        </div>
      </div>
    `;
    setEmailPreview(previewHTML);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const validFiles = Array.from(files).filter(file => {
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isImage && isValidSize;
    });
    
    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
      
      const fileNames = validFiles.map(f => f.name).join(', ');
      const newMessages = [
        ...messages,
        { type: 'user', content: `Uploaded files: ${fileNames}` }
      ];
      setMessages(newMessages);
      
      setTimeout(() => {
        setMessages([
          ...newMessages,
          { type: 'ai', content: `📸 Perfect! I've received your ${validFiles.length} image(s). I'll incorporate these into your email design. The images will be optimized for email clients and used appropriately in your template.` }
        ]);
      }, 1000);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    handleFileUpload(e.dataTransfer.files);
  };

  const downloadEmailCode = () => {
    if (!emailPreview) {
      alert('Please generate an email first');
      return;
    }

    const blob = new Blob([emailPreview], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-template.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Email code downloaded successfully!');
  };

  const copyEmailCode = () => {
    if (!emailPreview) {
      alert('Please generate an email first');
      return;
    }

    navigator.clipboard.writeText(emailPreview).then(() => {
      alert('Email code copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy to clipboard. Please try again.');
    });
  };

  const previewTemplate = (id: number, name: string, description: string) => {
    openPreviewModal({ type: 'template', id, name, description });
  };

  const previewWireframe = (id: number, name: string, description: string) => {
    openPreviewModal({ type: 'wireframe', id, name, description });
  };

  const useTemplate = (template: any) => {
    setActiveTab('create-email');
    
    // Add message about importing template
    const newMessages = [
      ...messages,
      { type: 'ai', content: `📧 ${template.name} imported successfully! I've loaded this template into the editor. You can now customize it by describing what changes you'd like me to make.` }
    ];
    setMessages(newMessages);
    
    // Generate email preview based on template
    const templateHTML = `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #ffffff;">
        <div style="background-color: #ff6b35; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Your Brand</h1>
        </div>
        <div style="padding: 30px 20px;">
          <h2 style="color: #333; margin-bottom: 20px;">${template.name}</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            ${template.description}. This template has been customized with modern styling, 
            responsive layout, and professional typography optimized for all email clients.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="background-color: #ff6b35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Call to Action</a>
          </div>
          <p style="color: #666; line-height: 1.6;">
            This ${template.type} template includes all the essential elements for effective email marketing campaigns.
          </p>
        </div>
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #999;">
          © 2025 Your Company. All rights reserved.
        </div>
      </div>
    `;
    setEmailPreview(templateHTML);
  };

  const useWireframe = (wireframe: any) => {
    setActiveTab('create-email');
    
    // Add message about importing wireframe
    const newMessages = [
      ...messages,
      { type: 'ai', content: `🎯 ${wireframe.name} imported successfully! I've loaded this wireframe structure. Now tell me how you'd like me to design the content within this layout.` }
    ];
    setMessages(newMessages);
    
    // Generate wireframe-based preview
    const wireframeHTML = `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #ffffff; border: 2px dashed #ddd;">
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-bottom: 2px dashed #ddd;">
          <div style="background-color: #e0e0e0; height: 40px; display: flex; align-items: center; justify-content: center; color: #666;">
            Header Section - ${wireframe.name}
          </div>
        </div>
        <div style="padding: 30px 20px;">
          <div style="background-color: #f9f9f9; padding: 20px; margin-bottom: 20px; border: 1px dashed #ccc; text-align: center; color: #666;">
            Content Area - ${wireframe.type} Layout
          </div>
          <div style="background-color: #f9f9f9; padding: 15px; margin-bottom: 20px; border: 1px dashed #ccc; text-align: center; color: #666;">
            ${wireframe.description}
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <div style="background-color: #e0e0e0; color: #666; padding: 12px 30px; border: 1px dashed #ccc; display: inline-block;">
              Call to Action Button
            </div>
          </div>
        </div>
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-top: 2px dashed #ddd;">
          <div style="background-color: #e0e0e0; height: 30px; display: flex; align-items: center; justify-content: center; color: #666;">
            Footer Section
          </div>
        </div>
      </div>
    `;
    setEmailPreview(wireframeHTML);
  };

  // Generate templates and wireframes
  const generateTemplates = () => {
    const templateTypes = ['newsletter', 'promotional', 'welcome', 'announcement', 'ecommerce'];
    const templates = [];

    for (let i = 1; i <= 50; i++) {
      const type = templateTypes[Math.floor(Math.random() * templateTypes.length)];
      templates.push({
        id: i,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} Template ${i}`,
        type: type,
        description: `Professional ${type} email template with modern design and responsive layout`
      });
    }

    return templates;
  };

  const generateWireframes = () => {
    const wireframeTypes = ['simple', 'complex', 'header-footer', 'sidebar', 'grid'];
    const wireframes = [];

    for (let i = 1; i <= 50; i++) {
      const type = wireframeTypes[Math.floor(Math.random() * wireframeTypes.length)];
      wireframes.push({
        id: i,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} Wireframe ${i}`,
        type: type,
        description: `${type} email wireframe layout for structural planning`
      });
    }

    return wireframes;
  };

  const templates = generateTemplates();
  const wireframes = generateWireframes();
  const [templateFilter, setTemplateFilter] = useState('all');
  const [wireframeFilter, setWireframeFilter] = useState('all');

  const filteredTemplates = templateFilter === 'all' 
    ? templates 
    : templates.filter(t => t.type === templateFilter);

  const filteredWireframes = wireframeFilter === 'all' 
    ? wireframes 
    : wireframes.filter(w => w.type === wireframeFilter);

  return (
    <>
      {/* Sub-navigation for Email Generator */}
      <div className="email-generator-nav">
        <button 
          className={`tab-btn ${activeTab === 'create-email' ? 'active' : ''}`}
          onClick={() => setActiveTab('create-email')}
        >
          Create Email
        </button>
        <button 
          className={`tab-btn ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveTab('templates')}
        >
          Templates
        </button>
        <button 
          className={`tab-btn ${activeTab === 'wireframes' ? 'active' : ''}`}
          onClick={() => setActiveTab('wireframes')}
        >
          Wireframes
        </button>
      </div>

      {/* Create Email Section */}
      {activeTab === 'create-email' && (
        <div className="email-tab active">
          <div className="email-generator-layout">
            {/* Chat Section */}
            <div className="email-chat-section">
              <div className="chat-header">
                <div className="chat-title">AI Email Generator</div>
                <div className="chat-subtitle">Create professional emails with AI assistance</div>
              </div>
              
              <div className="chat-content">
                <div className="url-input-section">
                  <label className="input-label">Website URL (Optional)</label>
                  <input 
                    type="url" 
                    className="url-input" 
                    placeholder="https://example.com - AI will extract branding, colors, and content" 
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                  />
                  <button className="analyze-btn" onClick={analyzeUrl}>Extract Brand Info</button>
                </div>

                <div className="upload-section">
                  <label className="input-label">Upload Images & Logos (Optional)</label>
                  <div 
                    className="upload-area"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input 
                      type="file"
                      className="upload-input"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e.target.files)}
                    />
                    <div className="upload-content">
                      <Upload size={24} className="upload-icon" />
                      <div className="upload-text">Drop images here or click to upload</div>
                      <div className="upload-subtext">PNG, JPG, GIF up to 5MB each</div>
                    </div>
                  </div>
                  
                  {uploadedFiles.length > 0 && (
                    <div className="uploaded-files">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="uploaded-file">
                          <div className="file-info">
                            <Image size={16} />
                            <span>{file.name}</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                          <button 
                            className="file-remove"
                            onClick={() => removeFile(index)}
                            title="Remove file"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
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
                    placeholder="Describe the email you want to create (e.g., 'Create a product launch email for a tech startup with a modern design')" 
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

            {/* Preview Section */}
            <div className="email-preview-section">
              <div className="preview-header">
                <div className="preview-title">Email Preview</div>
                <div className="preview-controls">
                  <div className="preview-toggle">
                    <button 
                      className={`toggle-btn ${previewMode === 'desktop' ? 'active' : ''}`}
                      onClick={() => setPreviewMode('desktop')}
                    >
                      <Monitor size={12} />
                      Desktop
                    </button>
                    <button 
                      className={`toggle-btn ${previewMode === 'mobile' ? 'active' : ''}`}
                      onClick={() => setPreviewMode('mobile')}
                    >
                      <Smartphone size={12} />
                      Mobile
                    </button>
                  </div>
                  <div className="preview-actions">
                    <button className="btn btn-secondary" onClick={downloadEmailCode}>
                      <Download size={16} />
                      Download Code
                    </button>
                    <button className="btn" onClick={copyEmailCode}>
                      <Copy size={16} />
                      Copy Code
                    </button>
                  </div>
                </div>
              </div>
              <div className={`email-preview ${previewMode}`}>
                {emailPreview ? (
                  <div dangerouslySetInnerHTML={{ __html: emailPreview }} />
                ) : (
                  <div className="preview-placeholder">
                    <Mail size={64} style={{ color: 'var(--border-hover)' }} />
                    <h3>Generate Your Email</h3>
                    <p>Start chatting with the AI to create your custom email template</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Templates Section */}
      {activeTab === 'templates' && (
        <div className="email-tab active">
          <div className="templates-header">
            <h3>Email Templates</h3>
            <p>Choose from 50+ professional email templates</p>
          </div>
          
          <div className="templates-filters">
            <button 
              className={`filter-btn ${templateFilter === 'all' ? 'active' : ''}`}
              onClick={() => setTemplateFilter('all')}
            >
              All Templates
            </button>
            <button 
              className={`filter-btn ${templateFilter === 'newsletter' ? 'active' : ''}`}
              onClick={() => setTemplateFilter('newsletter')}
            >
              Newsletter
            </button>
            <button 
              className={`filter-btn ${templateFilter === 'promotional' ? 'active' : ''}`}
              onClick={() => setTemplateFilter('promotional')}
            >
              Promotional
            </button>
            <button 
              className={`filter-btn ${templateFilter === 'welcome' ? 'active' : ''}`}
              onClick={() => setTemplateFilter('welcome')}
            >
              Welcome
            </button>
            <button 
              className={`filter-btn ${templateFilter === 'announcement' ? 'active' : ''}`}
              onClick={() => setTemplateFilter('announcement')}
            >
              Announcement
            </button>
            <button 
              className={`filter-btn ${templateFilter === 'ecommerce' ? 'active' : ''}`}
              onClick={() => setTemplateFilter('ecommerce')}
            >
              E-commerce
            </button>
          </div>

          <div className="templates-grid">
            {filteredTemplates.map(template => (
              <div key={template.id} className="template-card">
                <div className="template-preview">
                  Template Preview
                </div>
                <div className="template-info">
                  <div className="template-name">{template.name}</div>
                  <div className="template-description">{template.description}</div>
                  <div className="template-actions">
                    <button 
                      className="import-btn"
                      onClick={() => useTemplate(template)}
                    >
                      Use Template
                    </button>
                    <button 
                      className="preview-btn"
                      onClick={() => previewTemplate(template.id, template.name, template.description)}
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wireframes Section */}
      {activeTab === 'wireframes' && (
        <div className="email-tab active">
          <div className="wireframes-header">
            <h3>Email Wireframes</h3>
            <p>Choose from 50+ email wireframe layouts</p>
          </div>
          
          <div className="wireframes-filters">
            <button 
              className={`filter-btn ${wireframeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setWireframeFilter('all')}
            >
              All Wireframes
            </button>
            <button 
              className={`filter-btn ${wireframeFilter === 'simple' ? 'active' : ''}`}
              onClick={() => setWireframeFilter('simple')}
            >
              Simple
            </button>
            <button 
              className={`filter-btn ${wireframeFilter === 'complex' ? 'active' : ''}`}
              onClick={() => setWireframeFilter('complex')}
            >
              Complex
            </button>
            <button 
              className={`filter-btn ${wireframeFilter === 'header-footer' ? 'active' : ''}`}
              onClick={() => setWireframeFilter('header-footer')}
            >
              Header/Footer
            </button>
            <button 
              className={`filter-btn ${wireframeFilter === 'sidebar' ? 'active' : ''}`}
              onClick={() => setWireframeFilter('sidebar')}
            >
              Sidebar
            </button>
            <button 
              className={`filter-btn ${wireframeFilter === 'grid' ? 'active' : ''}`}
              onClick={() => setWireframeFilter('grid')}
            >
              Grid Layout
            </button>
          </div>

          <div className="wireframes-grid">
            {filteredWireframes.map(wireframe => (
              <div key={wireframe.id} className="wireframe-card">
                <div className="wireframe-preview">
                  Wireframe Layout
                </div>
                <div className="wireframe-info">
                  <div className="wireframe-name">{wireframe.name}</div>
                  <div className="wireframe-description">{wireframe.description}</div>
                  <div className="wireframe-actions">
                    <button 
                      className="import-btn"
                      onClick={() => useWireframe(wireframe)}
                    >
                      Use Wireframe
                    </button>
                    <button 
                      className="preview-btn"
                      onClick={() => previewWireframe(wireframe.id, wireframe.name, wireframe.description)}
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default EmailGenerator;