import React from 'react';
import submitrightarrow from '../../../public/provax/submitrightarrow.svg'
import rightarrowwhite from '../../../public/provax/rightarrowwhite.svg'
import Link from 'next/link';

// Shared props
interface BaseProps {
  children: React.ReactNode;
  variant:
  | 'primary'
  | 'secondary'
  | 'secondary2'
  | 'form'
  | 'light-solid'
  | 'nav-primary'
  | 'nav-secondary'
  | 'gradient-outline'
  | 'tertiary'
  | 'tertiary2'
  | 'auth'
  | 'authForm'
  | 'action-primary'
  | 'action-secondary'
  | 'brand-highlighted'
  className?: string;
  showArrow?: boolean;
}

// Type-safe discriminated union
type CustomButtonProps =
  | (BaseProps & {
    type: 'button' | 'submit' | 'reset';
    onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    to?: never;
  })
  | (BaseProps & {
    type: 'link';
    to: string;
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  });

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant,
  className = '',
  showArrow = true,
  to = '#',
}) => {
  const baseClasses = "font-medium flex items-center justify-center group transition-all duration-300";

  let variantClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses = 'text-responsive bg-#00FF88  hover:bg-#00FF95 px-7 py-3 rounded-full text-white transition-all duration-500 ease-in-out';
      break;


    case 'secondary':
      variantClasses = 'text-responsive bg-transparent border border-white cursor-pointer hover:bg-white hover:text-brand px-7 py-3 rounded-full text-white transition-all duration-500 ease-in-out';
      break;

    case 'secondary2':
      variantClasses = 'text-responsive bg-transparent border border-brand px-7 py-3 rounded-xl text-white cursor-pointer  hover:border-transparent hover:bg-gradient-to-r hover:from-brand hover:to-brand2 transition-all duration-500 ease-in-out';
      break;

    case 'form':
      variantClasses = 'text-responsive bg-white text-gray-900 font-bold py-3 px-8 rounded-xl w-full sm:w-auto cursor-pointer transition-all duration-500 ease-in-out';
      break;

    case 'light-solid':
      variantClasses = 'text-responsive bg-white text-gray-900 font-bold py-5 px-8 rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-brand hover:to-brand2 hover:text-white transition-all duration-500 ease-in-out';
      break

    case 'nav-primary':
      variantClasses = 'text-responsive bg-brand text-white px-5 py-2 rounded-full hover:bg-blue-700 cursor-pointer transition-all duration-500 ease-in-out';
      break;
    case 'nav-secondary':
      variantClasses = 'text-responsive border border-brand text-brand px-5 py-2 rounded-full cursor-pointer hover:bg-brand hover:text-white transition-all duration-500 ease-in-out';
      break;

    case 'gradient-outline':
      variantClasses = 'text-responsive font-bold px-7 py-5 rounded-xl btn-gradient-outline cursor-pointer transition-all duration-500 ease-in-out';
      break;

    case 'tertiary':
      variantClasses = 'text-responsive bg-brand px-7 py-5 rounded-xl text-white cursor-pointer hover:bg-gradient-to-r hover:from-brand hover:to-brand2 transition-all duration-500 ease-in-out';
      break;

    case 'tertiary2':
      variantClasses = 'text-responsive bg-brand px-7 py-5 rounded-xl text-white cursor-pointer hover:bg-gradient-to-l hover:from-brand hover:to-brand2 transition-all duration-500 ease-in-out';
      break;

    // auth screen button used in LeftComp
    case 'auth':
      variantClasses = 'px-6 py-2 text-base rounded-full font-medium transition-all';
      break;
    case 'authForm':
      variantClasses = '!font-light text-base bg-brand text-white px-7 py-2 rounded-full hover:bg-blue-700 cursor-pointer transition-all duration-500 ease-in-out'
      break;
    case 'action-primary':
      variantClasses = 'px-4 py-2 min-w-[120px] cursor-pointer bg-brand text-white rounded-md text-xs'
      break;
    case 'action-secondary':
      variantClasses = 'px-4 py-2 min-w-[120px] cursor-pointer bg-white border border-brand text-brand rounded-md text-xs'
      break;
    case 'brand-highlighted':
      variantClasses = 'flex items-center cursor-pointer px-4 py-2 w-full items-center justify-start gap-2 rounded-md hover:bg-brand/20 text-black hover:text-brand transition-colors duration-200 mt-2'
      break;




  }

  const content = (
    <>
      {children}
      {showArrow && (
        <img
          src={(variant === 'primary' || variant === 'secondary' || variant === 'secondary2' || variant === 'tertiary' || variant === 'tertiary2' || variant === 'authForm') ? rightarrowwhite : submitrightarrow}
          alt='rightarrow'
          className={`ml-2 transition-all duration-500 ease-in-out
            ${(variant === 'gradient-outline' || variant === 'light-solid') ? 'invert-0 group-hover:invert' : ''}`}

        />)}
    </>
  );

  if (type === 'link') {
    return (
      <Link 
        href={to}
        onClick={onClick}
        className={`${baseClasses} ${variantClasses} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick as (event: React.MouseEvent<HTMLButtonElement>) => void}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {content}
    </button>
  );
};

export default CustomButton;