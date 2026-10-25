import React from 'react';

const ButtonText = (props) => {
  const {
    onClick,
    isLink,
    href,
    className = '',
    children,
  } = props;

  return isLink ? (
    <a
      href={href}
      className={`buttonText ${className}`}
      target="_blank"
    >
      {children}
    </a>
  ) : (
    <button onClick={onClick} className={`buttonText ${className}`}>
      {children}
    </button>
  );
};

export default ButtonText;
