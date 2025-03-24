import React, { useState, useRef, useEffect } from 'react';

type InputProps = {
    size: 'xs' | 's' | 'm' | 'l' | 'xl',
    width?: string,
    borderColor?: string,
    backgroundColor?: string,
    textColor?: string,
    Icon?: React.ElementType,

}

const Input: React.FC<InputProps> = ({

}) => {
  const sizeClasses: Record<NonNullable<DatePickerProps['size']>, string> = {
    xs: 'px-2 py-1 text-xs h-7',
    s: 'px-3 py-1 text-sm h-8',
    m: 'px-3 py-1 text-base h-9',
    l: 'px-3 py-1 text-lg h-10',
    xl: 'px-3 py-2 text-lg h-11',
  };

}
