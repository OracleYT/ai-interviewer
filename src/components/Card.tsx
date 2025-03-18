import React from 'react';

type Props = {
  children: React.ReactNode;
  borderRadius?: string;
  background?: string;
  padding?: string;
  height?: string;
  width?: string;
  margin?: string;
  hover?: string;
  className?: string;
  // onClick?: Function;
};

function Card({
  background,
  borderRadius,
  children,
  padding ,
  height,
  width,
  margin,
  className,
  // onClick,
}: Props) {
  return (
    <div
      style={{ borderRadius, padding, background, height, width, margin }}
      className={`${className}`}
      // onClick={(e) => onClick && onClick(e)}
    >
      {children}
    </div>
  );
}

export default Card;
