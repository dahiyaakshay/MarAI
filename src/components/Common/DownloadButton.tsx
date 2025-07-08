import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, File, ChevronDown } from 'lucide-react';
import { exportService } from '../../services/exportService';

interface DownloadButtonProps {
  type: 'calendar' | 'content' | 'personas';
  calendarType?: string;
  className?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ type, calendarType, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = (format: 'pdf' | 'excel' | 'word') => {
    try {
      if (type === 'calendar' && calendarType) {
        switch (format) {
          case 'pdf':
            exportService.exportCalendarPDF(calendarType);
            break;
          case 'excel':
            exportService.exportCalendarExcel(calendarType);
            break;
        }
      } else if (type === 'content' && calendarType) {
        switch (format) {
          case 'pdf':
            exportService.exportContentPDF(calendarType);
            break;
          case 'excel':
            exportService.exportContentExcel(calendarType);
            break;
        }
      } else if (type === 'personas') {
        switch (format) {
          case 'pdf':
            exportService.exportPersonasPDF();
            break;
          case 'excel':
            exportService.exportPersonasExcel();
            break;
        }
      }
      
      setIsOpen(false);
      
      // Show success message
      const formatName = format === 'excel' ? 'Excel' : 'PDF';
      const typeName = type === 'personas' ? 'Personas' : type === 'calendar' ? 'Calendar' : 'Content';
      alert(`${typeName} exported successfully as ${formatName}!`);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    }
  };

  const getButtonText = () => {
    switch (type) {
      case 'calendar':
        return 'Download Calendar';
      case 'content':
        return 'Download Content';
      case 'personas':
        return 'Download Personas';
      default:
        return 'Download';
    }
  };

  const getIcon = (format: string) => {
    switch (format) {
      case 'pdf':
        return <FileText size={16} />;
      case 'excel':
        return <FileSpreadsheet size={16} />;
      default:
        return <Download size={16} />;
    }
  };

  return (
    <div className={`download-button-container ${className}`} style={{ position: 'relative' }}>
      <button 
        className="btn btn-secondary download-btn"
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          minWidth: '160px',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Download size={16} />
          {getButtonText()}
        </div>
        <ChevronDown 
          size={14} 
          style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }} 
        />
      </button>
      
      {isOpen && (
        <div 
          className="download-dropdown"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-hover)',
            borderRadius: '6px',
            marginTop: '4px',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden'
          }}
        >
          <button
            className="download-option"
            onClick={() => handleDownload('pdf')}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: 'none',
              background: 'transparent',
              color: 'var(--text-primary)',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {getIcon('pdf')}
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: '500' }}>Export as PDF</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Formatted document with styling
              </div>
            </div>
          </button>
          
          <button
            className="download-option"
            onClick={() => handleDownload('excel')}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: 'none',
              background: 'transparent',
              color: 'var(--text-primary)',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {getIcon('excel')}
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: '500' }}>Export as Excel</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Spreadsheet for data analysis
              </div>
            </div>
          </button>
        </div>
      )}
      
      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default DownloadButton;