import React, { useState, ReactNode } from 'react';

interface Props {
  onClick: () => void;
  initialColor?: string;
  initialText?: string;
}

function GridButton({
  onClick,
  initialColor = 'bg-blue-500',
  initialText = 'Inactive',
}: Props) {
  // Starting stage for button and starting color
  const [color, setColor] = useState(initialColor);
  const [text, setText] = useState(initialText);

  const handleClick = () => {
    if (color === 'bg-blue-500') {
      setColor('bg-yellow-500');
      setText('Choosable');
    } else if (color === 'bg-yellow-500') {
      setColor('bg-green-500');
      setText('Active');
    } else {
      setColor('bg-blue-500');
      setText('Inactive');
    }

    // Kutsutaan mahdollisesti annettua onClick-tapahtumaa
    if (onClick) {
      onClick();
    }
  };
  return (
    <button
      className={`${color} text-white px-5 py-5 pb-5 rounded hover:opacity-80`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default GridButton;
