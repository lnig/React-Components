import React from 'react';

interface ButtonProps {
  size?: 'xs' | 's' | 'm' | 'l' | 'xl',
  type?: 'primary' | 'secondary' | 'tertiary' | 'icon' | 'link',
  btnType?: 'button' | 'submit' | 'reset',
  primaryColor?: string,
  secondaryColor?: string,
  tertiaryColor?: string,
  width?: string,
  text?: string,
  Icon?: React.ElementType,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  size = 'm',
  type = 'primary',
  btnType = 'button',
  primaryColor = '#EB4C60',
  secondaryColor = '#FFFFFF',
  tertiaryColor = '#ff94a1',
  width = 'w-fit',
  text,
  Icon,
  onClick,
  disabled = false,
}) => {
  
  const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
    xs: 'px-2 text-xs h-7',
    s: 'px-3 text-xs h-8',
    m: 'px-4 text-sm h-9',
    l: 'px-5 text-base h-11',
    xl: 'px-6 text-lg h-12',
  };

  const iconSizeMapping: Record<NonNullable<ButtonProps['size']>, { height: string, width: string, iconSize: number }> = {
    xs: { height: 'h-7', width: 'w-7', iconSize: 14 },
    s: { height: 'h-8', width: 'w-8', iconSize: 16 },
    m: { height: 'h-9', width: 'w-9', iconSize: 16 },
    l: { height: 'h-11', width: 'w-11', iconSize: 20 },
    xl: { height: 'h-12', width: 'w-12', iconSize: 24 },
  };

  const computedStyle: React.CSSProperties = {};

  switch (type) {
    case 'primary':
      computedStyle.backgroundColor = primaryColor;
      computedStyle.color = secondaryColor;
      break;
    case 'secondary':
      computedStyle.backgroundColor = 'transparent';
      computedStyle.border = `1px solid ${primaryColor}`;
      computedStyle.color = primaryColor;
      break;
    case 'tertiary':
      computedStyle.backgroundColor = tertiaryColor;
      computedStyle.color = secondaryColor;
      break;
    case 'icon':
      computedStyle.backgroundColor = 'transparent';
      computedStyle.color = primaryColor;
      computedStyle.padding = '0';
      break;
    case 'link':
      computedStyle.backgroundColor = 'transparent';
      computedStyle.color = primaryColor;
      computedStyle.textDecoration = 'underline';
      break;
    default:
      computedStyle.backgroundColor = secondaryColor;
      computedStyle.color = primaryColor;
  }

  const baseClasses = type === 'icon' ?
      `rounded flex items-center justify-center ${iconSizeMapping[size].height} ${iconSizeMapping[size].width} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}` :
      `rounded flex items-center justify-center gap-2 ${width} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  const renderContent = () => {
    if (Icon && text) {
      return (
        <>
          <Icon style={{ color: computedStyle.color }} size={iconSizeMapping[size].iconSize} />
          {text}
        </>
      );
    } else if (Icon) {
      return <Icon style={{ color: computedStyle.color }} size={iconSizeMapping[size].iconSize} />;
    } else {
      return text;
    }
  };

  return (
    <button
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      type={btnType}
      style={computedStyle}
    >
      {renderContent()}
    </button>
  );
};

export default Button;