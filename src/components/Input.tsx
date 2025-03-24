import React, { useState } from 'react';

type InputProps = {
  value: string | null,
  onValueChange: (value: string) => void,
  placeholder?: string,
  size: 'xs' | 's' | 'm' | 'l' | 'xl',
  width?: string,
  borderColor?: string,
  borderColorFocusActive?: string,
  backgroundColor?: string,
  textColor?: string,
  Icon?: React.ElementType,
}

const Input: React.FC<InputProps> = ({
  value,
  onValueChange,
  placeholder,
  size = 'm',
  width = 'w-64',
  borderColor = '#DEE1E5',
  borderColorFocusActive = '#BDC0C9',
  backgroundColor = '#FFFFFF',
  textColor = '#313642',
  Icon,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const sizeClasses: Record<NonNullable<InputProps['size']>, string> = {
    xs: 'px-2 py-1 text-xs h-7',
    s: 'px-3 py-1 text-sm h-8',
    m: 'px-3 py-1 text-base h-9',
    l: 'px-3 py-1 text-lg h-10',
    xl: 'px-3 py-2 text-lg h-11',
  };

  const paddingClass = size === 'xs'
    ? 'pl-7'
    : size === 's'
    ? 'pl-8 pb-[5px]'
    : size === 'm'
    ? 'pl-9 pb-[6px]'
    : size === 'l'
    ? 'pl-9'
    : 'pl-10';

  const currentBorderColor = isActive || isFocused
    ? borderColorFocusActive
    : borderColor;

  return (
    <div className={`relative`}>
      {Icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
          <Icon
            size={size === 'xs' ? 16 : size === 's' ? 18 : size === 'm' ? 20 : size === 'l' ? 20 : 24}
            color={value ? textColor : '#8E94A0'}
            strokeWidth={1.5}
          />
        </div>
      )}
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onValueChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        placeholder={placeholder}
        className={`border rounded cursor-pointer focus:outline-none placeholder:text-[#8E94A0] ${width} ${paddingClass} ${sizeClasses[size]}`}
        style={{ borderColor: currentBorderColor, background: backgroundColor, color: textColor }}
      />
    </div>
  );
};

export default Input;
