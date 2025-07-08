import React, { useState } from 'react';
import { Eye, EyeOff, Trash2, CheckCircle, XCircle, Loader } from 'lucide-react';

const Settings: React.FC = () => {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    company: 'Marketing Agency Inc.',
    role: 'Marketing Manager'
  });

  const [apiKeys, setApiKeys] = useState({
    claude: { value: '', masked: '', isValid: null, lastValidated: null },
    chatgpt: { value: '', masked: '', isValid: null, lastValidated: null }
  });

  const [loading, setLoading] = useState({
    profile: false,
    claude: false,
    chatgpt: false
  });

  const [showApiKey, setShowApiKey] = useState({
    claude: false,
    chatgpt: false
  });

  // Load data from localStorage on component mount
  React.useEffect(() => {
    loadUserProfile();
    loadApiKeys();
  }, []);

  const loadUserProfile = () => {
    try {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);
      }
    } catch (error) {
      console.error('Failed to load profile from localStorage:', error);
    }
  };

  const loadApiKeys = () => {
    try {
      const savedApiKeys = localStorage.getItem('apiKeys');
      if (savedApiKeys) {
        const parsedApiKeys = JSON.parse(savedApiKeys);
        setApiKeys(parsedApiKeys);
      }
    } catch (error) {
      console.error('Failed to load API keys from localStorage:', error);
    }
  };

  const saveProfile = async () => {
    try {
      setLoading(prev => ({ ...prev, profile: true }));
      
      // Save to localStorage
      localStorage.setItem('userProfile', JSON.stringify(profile));
      
      setTimeout(() => {
        setLoading(prev => ({ ...prev, profile: false }));
        alert('Profile saved successfully!');
      }, 500);
    } catch (error) {
      console.error('Failed to save profile:', error);
      setLoading(prev => ({ ...prev, profile: false }));
      alert('Failed to save profile. Please try again.');
    }
  };

  const toggleApiKeyVisibility = (service: 'claude' | 'chatgpt') => {
    setShowApiKey(prev => ({
      ...prev,
      [service]: !prev[service]
    }));
  };

  const maskApiKey = (apiKey: string) => {
    if (!apiKey || apiKey.length < 8) {
      return '';
    }
    const start = apiKey.substring(0, 4);
    const end = apiKey.substring(apiKey.length - 4);
    const middle = '•'.repeat(Math.max(4, apiKey.length - 8));
    return `${start}${middle}${end}`;
  };

  const saveApiKey = async (service: 'claude' | 'chatgpt') => {
    const apiKey = apiKeys[service].value;
    
    if (!apiKey) {
      alert('Please enter an API key');
      return;
    }

    try {
      setLoading(prev => ({ ...prev, [service]: true }));
      
      // Update state to show saved key
      const updatedApiKeys = {
        ...apiKeys,
        [service]: {
          value: apiKey, // Keep the actual key for validation
          masked: maskApiKey(apiKey),
          isValid: null,
          lastValidated: null
        }
      };
      
      setApiKeys(updatedApiKeys);
      localStorage.setItem('apiKeys', JSON.stringify(updatedApiKeys));
      
      setTimeout(() => {
        setLoading(prev => ({ ...prev, [service]: false }));
        alert(`${service.charAt(0).toUpperCase() + service.slice(1)} API key saved successfully! Click "Validate" to test the connection.`);
      }, 500);
    } catch (error) {
      console.error('Failed to save API key:', error);
      setLoading(prev => ({ ...prev, [service]: false }));
      alert('Failed to save API key. Please try again.');
    }
  };

  const validateApiKey = async (service: 'claude' | 'chatgpt') => {
    const apiKey = apiKeys[service].value || apiKeys[service].masked;
    
    if (!apiKey) {
      alert('No API key found to validate');
      return;
    }

    try {
      setLoading(prev => ({ ...prev, [service]: true }));
      
      // Call the backend validation endpoint
      const endpoint = service === 'claude' ? 'anthropic' : 'openai';
      const response = await fetch(`http://localhost:3001/api/validate/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          apiKey: apiKeys[service].value || apiKeys[service].masked 
        })
      });

      const result = await response.json();
      
      const updatedApiKeys = {
        ...apiKeys,
        [service]: {
          ...apiKeys[service],
          isValid: result.success,
          lastValidated: new Date().toISOString()
        }
      };
      
      setApiKeys(updatedApiKeys);
      localStorage.setItem('apiKeys', JSON.stringify(updatedApiKeys));
      
      setLoading(prev => ({ ...prev, [service]: false }));
      
      if (result.success) {
        alert(`${service.charAt(0).toUpperCase() + service.slice(1)} API key is valid! AI features are now enabled.`);
      } else {
        alert(`${service.charAt(0).toUpperCase() + service.slice(1)} API key validation failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Failed to validate API key:', error);
      setLoading(prev => ({ ...prev, [service]: false }));
      
      // Check if it's a network error (backend not running)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        alert(`Cannot connect to backend server. Please make sure the backend is running on http://localhost:3001`);
      } else {
        alert('Failed to validate API key. Please try again.');
      }
    }
  };

  const deleteApiKey = async (service: 'claude' | 'chatgpt') => {
    if (!confirm(`Are you sure you want to delete the ${service} API key?`)) {
      return;
    }

    try {
      const updatedApiKeys = {
        ...apiKeys,
        [service]: {
          value: '',
          masked: '',
          isValid: null,
          lastValidated: null
        }
      };
      
      setApiKeys(updatedApiKeys);
      localStorage.setItem('apiKeys', JSON.stringify(updatedApiKeys));
      
      alert(`${service.charAt(0).toUpperCase() + service.slice(1)} API key deleted successfully!`);
    } catch (error) {
      console.error('Failed to delete API key:', error);
      alert('Failed to delete API key. Please try again.');
    }
  };

  const getApiStatus = (service: 'claude' | 'chatgpt') => {
    const apiKey = apiKeys[service];
    
    if (!apiKey.masked) {
      return { text: 'Not Configured', className: '' };
    }
    
    if (apiKey.isValid === true) {
      return { text: 'Validated', className: 'validated' };
    }
    
    if (apiKey.isValid === false) {
      return { text: 'Invalid Key', className: 'error' };
    }
    
    return { text: 'Not Validated', className: '' };
  };

  const getStatusIcon = (service: 'claude' | 'chatgpt') => {
    const apiKey = apiKeys[service];
    
    if (loading[service]) {
      return <Loader size={16} className="animate-spin" />;
    }
    
    if (apiKey.isValid === true) {
      return <CheckCircle size={16} style={{ color: 'var(--success-color)' }} />;
    }
    
    if (apiKey.isValid === false) {
      return <XCircle size={16} style={{ color: 'var(--error-color)' }} />;
    }
    
    return null;
  };

  return (
    <div className="grid grid-2">
      {/* Profile Information Section */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">Profile Information</div>
          <div className="card-subtitle">Manage your personal information</div>
        </div>
        <div className="card-content">
          <div className="settings-form">
            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label className="input-label">First Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="John" 
                  value={profile.firstName}
                  onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="input-label">Last Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Doe" 
                  value={profile.lastName}
                  onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="input-label">Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="john.doe@example.com" 
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label className="input-label">Company</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Marketing Agency Inc." 
                value={profile.company}
                onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label className="input-label">Role</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Marketing Manager" 
                value={profile.role}
                onChange={(e) => setProfile(prev => ({ ...prev, role: e.target.value }))}
              />
            </div>
            <div className="form-actions">
              <button 
                className="btn" 
                onClick={saveProfile}
                disabled={loading.profile}
              >
                {loading.profile ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Profile'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* API Keys Section */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">API Keys</div>
          <div className="card-subtitle">Configure your AI service API keys to enable AI features</div>
        </div>
        <div className="card-content">
          <div className="api-key-section">
            <div className="api-key-group">
              <div className="api-key-header">
                <h4>Claude API Key</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {getStatusIcon('claude')}
                  <span className={`api-status ${getApiStatus('claude').className}`}>
                    {getApiStatus('claude').text}
                  </span>
                </div>
              </div>
              
              {apiKeys.claude.masked && (
                <div style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  Current key: {apiKeys.claude.masked}
                  {apiKeys.claude.lastValidated && (
                    <span style={{ marginLeft: '8px' }}>
                      (Last validated: {new Date(apiKeys.claude.lastValidated).toLocaleDateString()})
                    </span>
                  )}
                </div>
              )}
              
              <div className="api-key-input-group">
                <input 
                  type={showApiKey.claude ? 'text' : 'password'}
                  className="form-input api-key-input" 
                  placeholder={apiKeys.claude.masked ? "Enter new key to update" : "sk-ant-api03-..."}
                  value={apiKeys.claude.value}
                  onChange={(e) => setApiKeys(prev => ({ 
                    ...prev, 
                    claude: { ...prev.claude, value: e.target.value }
                  }))}
                />
                <button 
                  className="btn btn-secondary" 
                  onClick={() => toggleApiKeyVisibility('claude')}
                >
                  {showApiKey.claude ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button 
                  className="btn" 
                  onClick={() => saveApiKey('claude')}
                  disabled={loading.claude || !apiKeys.claude.value}
                >
                  {loading.claude ? <Loader size={16} className="animate-spin" /> : 'Save'}
                </button>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button 
                  className="btn validate-btn" 
                  onClick={() => validateApiKey('claude')}
                  disabled={loading.claude || (!apiKeys.claude.masked && !apiKeys.claude.value)}
                >
                  {loading.claude ? <Loader size={16} className="animate-spin" /> : 'Validate'}
                </button>
                
                {apiKeys.claude.masked && (
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => deleteApiKey('claude')}
                    style={{ color: 'var(--error-color)' }}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                )}
              </div>
            </div>

            <div className="api-key-group">
              <div className="api-key-header">
                <h4>ChatGPT API Key</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {getStatusIcon('chatgpt')}
                  <span className={`api-status ${getApiStatus('chatgpt').className}`}>
                    {getApiStatus('chatgpt').text}
                  </span>
                </div>
              </div>
              
              {apiKeys.chatgpt.masked && (
                <div style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  Current key: {apiKeys.chatgpt.masked}
                  {apiKeys.chatgpt.lastValidated && (
                    <span style={{ marginLeft: '8px' }}>
                      (Last validated: {new Date(apiKeys.chatgpt.lastValidated).toLocaleDateString()})
                    </span>
                  )}
                </div>
              )}
              
              <div className="api-key-input-group">
                <input 
                  type={showApiKey.chatgpt ? 'text' : 'password'}
                  className="form-input api-key-input" 
                  placeholder={apiKeys.chatgpt.masked ? "Enter new key to update" : "sk-..."}
                  value={apiKeys.chatgpt.value}
                  onChange={(e) => setApiKeys(prev => ({ 
                    ...prev, 
                    chatgpt: { ...prev.chatgpt, value: e.target.value }
                  }))}
                />
                <button 
                  className="btn btn-secondary" 
                  onClick={() => toggleApiKeyVisibility('chatgpt')}
                >
                  {showApiKey.chatgpt ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button 
                  className="btn" 
                  onClick={() => saveApiKey('chatgpt')}
                  disabled={loading.chatgpt || !apiKeys.chatgpt.value}
                >
                  {loading.chatgpt ? <Loader size={16} className="animate-spin" /> : 'Save'}
                </button>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button 
                  className="btn validate-btn" 
                  onClick={() => validateApiKey('chatgpt')}
                  disabled={loading.chatgpt || (!apiKeys.chatgpt.masked && !apiKeys.chatgpt.value)}
                >
                  {loading.chatgpt ? <Loader size={16} className="animate-spin" /> : 'Validate'}
                </button>
                
                {apiKeys.chatgpt.masked && (
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => deleteApiKey('chatgpt')}
                    style={{ color: 'var(--error-color)' }}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;