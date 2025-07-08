import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface MultiSelectProps {
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select options...",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const removeTag = (optionValue: string) => {
    onChange(value.filter(v => v !== optionValue));
  };

  const getSelectedLabels = () => {
    return value.map(v => options.find(opt => opt.value === v)?.label || v);
  };

  return (
    <div className={`multi-select ${className}`} ref={containerRef}>
      <div 
        className="multi-select-display"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value.length === 0 ? (
          <span style={{ color: 'var(--text-muted)' }}>{placeholder}</span>
        ) : (
          <div className="selected-tags">
            {getSelectedLabels().map((label, index) => (
              <span key={value[index]} className="selected-tag">
                {label}
                <button
                  className="tag-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(value[index]);
                  }}
                >
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      
      {isOpen && (
        <div className="multi-select-dropdown">
          {options.map(option => (
            <div
              key={option.value}
              className="multi-select-option"
              onClick={() => handleOptionToggle(option.value)}
            >
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={() => {}} // Handled by parent onClick
                onClick={(e) => e.stopPropagation()}
              />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;