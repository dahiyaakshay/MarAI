import React from 'react';
import { X } from 'lucide-react';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  onUse?: (data: any) => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, data, onUse }) => {
  const handleUse = () => {
    if (onUse) {
      onUse(data);
    }
    onClose();
  };

  if (!isOpen || !data) return null;

  return (
    <div className="preview-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="preview-modal">
        <div className="preview-modal-header">
          <h3 className="preview-modal-title">{data.name || 'Preview'}</h3>
          <button className="preview-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="preview-modal-content">
          <div className="preview-modal-image">
            Full Preview
          </div>
          <div className="preview-modal-description">
            {data.description || 'Template description will appear here'}
          </div>
          <div className="preview-modal-actions">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
            <button className="btn use-btn" onClick={handleUse}>
              Use {data.type === 'template' ? 'Template' : 'Wireframe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;