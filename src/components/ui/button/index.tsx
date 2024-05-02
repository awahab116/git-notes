// MyButton.tsx
import React from 'react';
import './button.scss'; // Import the styles

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

const MyButton: React.FC<Props> = ({ text, className, ...props }) => {
  return (
    <button className={`my-button ${className}`} {...props}>
      {text}
    </button>
  );
};

export default MyButton;
