import React, { useState } from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: number;
  className?: string;
}

const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Generate pastel/pleasing colors
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 60%)`;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 40, className = '' }) => {
  const [error, setError] = useState(false);

  const initials = alt
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const bgColor = stringToColor(alt);

  const style: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    objectFit: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: error || !src ? bgColor : 'transparent',
    color: '#ffffff',
    fontSize: size * 0.4,
    fontWeight: 'normal',
    border: '2px solid white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease'
  };

  if (!src || error) {
    return (
      <div className={className} style={style} title={alt}>
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ ...style, backgroundColor: 'transparent' }}
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
    />
  );
};

export default Avatar;
