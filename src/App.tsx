import React, { useState, useEffect } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Pages/Dashboard';
import MarketingCalendar from './components/Pages/MarketingCalendar';
import SocialCalendar from './components/Pages/SocialCalendar';
import EmailCalendar from './components/Pages/EmailCalendar';
import EmailGenerator from './components/Pages/EmailGenerator';
import PersonaBuilder from './components/Pages/PersonaBuilder';
import Settings from './components/Pages/Settings';
import EditModal from './components/Modals/EditModal';
import AddClientModal from './components/Modals/AddClientModal';
import EditPersonaModal from './components/Modals/EditPersonaModal';
import PreviewModal from './components/Modals/PreviewModal';
import './App.css';

const pageData = {
  'dashboard': {
    title: 'Dashboard',
    subtitle: 'Overview of your marketing performance'
  },
  'marketing-calendar': {
    title: 'Marketing Calendar',
    subtitle: 'Plan and schedule your marketing campaigns'
  },
  'social-calendar': {
    title: 'Social Media Calendar',
    subtitle: 'Schedule and manage your social media posts'
  },
  'email-calendar': {
    title: 'Email Calendar',
    subtitle: 'Plan and schedule your email campaigns'
  },
  'email-generator': {
    title: 'Email Generator',
    subtitle: 'Generate compelling email content with AI'
  },
  'persona-builder': {
    title: 'Persona Builder',
    subtitle: 'Create and manage customer personas'
  },
  'settings': {
    title: 'Settings',
    subtitle: 'Configure your account and preferences'
  }
};

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [theme, setTheme] = useState('dark');
  const [currentClient, setCurrentClient] = useState('default');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addClientModalOpen, setAddClientModalOpen] = useState(false);
  const [editPersonaModalOpen, setEditPersonaModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState(null);
  const [previewModalData, setPreviewModalData] = useState(null);

  const [clients, setClients] = useState({
    'default': { name: 'Select Client...', data: {} }
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setTheme('light');
      document.body.classList.add('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', newTheme);
  };

  const navigateToPage = (pageId: string) => {
    setActivePage(pageId);
  };

  const switchClient = (clientId: string) => {
    setCurrentClient(clientId);
  };

  const openEditModal = (data = null) => {
    setEditModalData(data);
    setEditModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditModalData(null);
    document.body.style.overflow = 'auto';
  };

  const openAddClientModal = () => {
    setAddClientModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeAddClientModal = () => {
    setAddClientModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const openEditPersonaModal = () => {
    setEditPersonaModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeEditPersonaModal = () => {
    setEditPersonaModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const openPreviewModal = (data) => {
    setPreviewModalData(data);
    setPreviewModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closePreviewModal = () => {
    setPreviewModalOpen(false);
    setPreviewModalData(null);
    document.body.style.overflow = 'auto';
  };

  const saveNewClient = (clientData) => {
    const clientId = 'client' + (Object.keys(clients).length + 1);
    setClients(prev => ({
      ...prev,
      [clientId]: {
        name: clientData.companyName,
        data: clientData
      }
    }));
    setCurrentClient(clientId);
    closeAddClientModal();
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard navigateToPage={navigateToPage} />;
      case 'marketing-calendar':
        return <MarketingCalendar openEditModal={openEditModal} />;
      case 'social-calendar':
        return <SocialCalendar openEditModal={openEditModal} />;
      case 'email-calendar':
        return <EmailCalendar openEditModal={openEditModal} />;
      case 'email-generator':
        return <EmailGenerator openPreviewModal={openPreviewModal} />;
      case 'persona-builder':
        return <PersonaBuilder openEditPersonaModal={openEditPersonaModal} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard navigateToPage={navigateToPage} />;
    }
  };

  const currentPageData = pageData[activePage];

  return (
    <div className="container">
      <Sidebar activePage={activePage} navigateToPage={navigateToPage} />
      
      <main className="main-content">
        <Header
          title={currentPageData.title}
          subtitle={currentPageData.subtitle}
          theme={theme}
          toggleTheme={toggleTheme}
          currentClient={currentClient}
          clients={clients}
          switchClient={switchClient}
          openAddClientModal={openAddClientModal}
        />
        
        <div className="content">
          {renderActivePage()}
        </div>
      </main>

      {editModalOpen && (
        <EditModal
          isOpen={editModalOpen}
          onClose={closeEditModal}
          data={editModalData}
          calendarType={activePage}
        />
      )}

      {addClientModalOpen && (
        <AddClientModal
          isOpen={addClientModalOpen}
          onClose={closeAddClientModal}
          onSave={saveNewClient}
        />
      )}

      {editPersonaModalOpen && (
        <EditPersonaModal
          isOpen={editPersonaModalOpen}
          onClose={closeEditPersonaModal}
        />
      )}

      {previewModalOpen && (
        <PreviewModal
          isOpen={previewModalOpen}
          onClose={closePreviewModal}
          data={previewModalData}
          onUse={(data) => {
            // Navigate to email generator and trigger the use functionality
            setActivePage('email-generator');
            // The EmailGenerator component will handle the actual template/wireframe usage
            setTimeout(() => {
              const event = new CustomEvent('useTemplateOrWireframe', { detail: data });
              window.dispatchEvent(event);
            }, 100);
          }}
        />
      )}
    </div>
  );
}

export default App;