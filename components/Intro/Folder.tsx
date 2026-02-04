
import React, { useState, useEffect } from 'react';

interface FolderProps {
  color?: string;
  size?: number;
  items?: React.ReactNode[];
  className?: string;
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder: React.FC<FolderProps> = ({ color = '#5227FF', size = 1, items = [], className = '' }) => {
  const [open, setOpen] = useState(false);

  // Auto-open on mount
  useEffect(() => {
    // Open folder after 500ms
    const openTimer = setTimeout(() => {
      setOpen(true);
    }, 500);

    return () => {
      clearTimeout(openTimer);
    };
  }, []);

  const papers = items.slice(0, 1);
  const folderBackColor = darkenColor(color, 0.08);

  // We define dynamic paper offsets for the animation
  // Since we want it automatic, we'll just use a fixed "popped up" state when open

  const folderStyle: React.CSSProperties = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
  } as React.CSSProperties;

  const scaleStyle = { transform: `scale(${size})` };

  return (
    <div style={scaleStyle} className={className}>
      <div
        className="group relative transition-all duration-200 ease-in"
        style={{
          ...folderStyle,
          transform: open ? 'translateY(-8px)' : undefined
        }}
      >
        <div
          className="relative w-[100px] h-[80px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
          style={{ backgroundColor: folderBackColor }}
        >
          <span
            className="absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-0 rounded-br-0"
            style={{ backgroundColor: folderBackColor }}
          ></span>

          {papers.map((item, i) => {
            // When open, move the item up significantly to show it
            const transformStyle = open
              ? `translate(-50%, -120%)` // Move up out of the folder
              : undefined;

            return (
              <div
                key={i}
                className={`absolute z-20 bottom-[10%] left-1/2 transition-all duration-700 ease-out w-[80%] h-[80%]`}
                style={{
                  ...(!open ? { transform: 'translate(-50%, 10%)' } : { transform: transformStyle }),
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                {item}
              </div>
            );
          })}

          <div
            className="absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out"
            style={{
              backgroundColor: color,
              borderRadius: '5px 10px 10px 10px',
              transform: open ? 'skew(15deg) scaleY(0.6)' : undefined
            }}
          ></div>
          <div
            className="absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out"
            style={{
              backgroundColor: color,
              borderRadius: '5px 10px 10px 10px',
              transform: open ? 'skew(-15deg) scaleY(0.6)' : undefined
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
