import React from 'react';

interface LikeIconProps {
  className?: string;
  shouldRotate?: boolean;
}

const LikeIcon: React.FC<LikeIconProps> = ({ className = "w-6 h-6", shouldRotate = false }) => {
  return (
    <svg 
      width="24" 
      height="25" 
      viewBox="0 0 24 25" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`${className} ${shouldRotate ? 'rotate-180' : ''} transition-transform duration-200`}
    >
      <path 
        d="M7.47998 19.3299L10.58 21.7299C10.98 22.1299 11.88 22.3299 12.48 22.3299H16.28C17.48 22.3299 18.78 21.4299 19.08 20.2299L21.48 12.9299C21.98 11.5299 21.08 10.3299 19.58 10.3299L15.58 10.3299C14.98 10.3299 14.48 9.82995 14.58 9.12995L15.08 5.92995C15.28 5.02995 14.68 4.02995 13.78 3.72995C12.98 3.42995 11.98 3.82995 11.58 4.42995L7.47998 10.5299" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeMiterlimit="10"
      />
      <path 
        d="M2.37988 19.3299L2.37988 9.52988C2.37988 8.12988 2.97988 7.62988 4.37988 7.62988H5.37988C6.77988 7.62988 7.37988 8.12988 7.37988 9.52988L7.37988 19.3299C7.37988 20.7299 6.77988 21.2299 5.37988 21.2299H4.37988C2.97988 21.2299 2.37988 20.7299 2.37988 19.3299Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LikeIcon;
