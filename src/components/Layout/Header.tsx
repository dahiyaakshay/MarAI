import React from 'react';
import { Sun, Moon, Plus } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
  theme: string;
  toggleTheme: () => void;
  currentClient: string;
  clients: Record<string, { name: string; data: any }>;
  switchClient: (clientId: string) => void;
  openAddClientModal: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  theme,
  toggleTheme,
  currentClient,
  clients,
  switchClient,
  openAddClientModal
}) => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="header-right">
        <div className="header-controls">
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>
          <select 
            className="client-dropdown" 
            value={currentClient}
            onChange={(e) => switchClient(e.target.value)}
          >
            {Object.entries(clients).map(([id, client]) => (
              <option key={id} value={id}>{client.name}</option>
            ))}
          </select>
          <button className="btn btn-secondary" onClick={openAddClientModal}>
            <Plus size={16} />
            Add Client
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;