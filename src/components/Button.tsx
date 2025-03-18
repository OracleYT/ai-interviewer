import clsx from "clsx";
import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  rounding?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondry";
}

const Button = ({
  children,
  onClick,
  size = "lg",
  rounding = "sm",
  disabled = false,
  className,
  type,
  variant,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        size === "sm" && "h-9 text-sm",
        size === "md" && "h-12 text-base",
        size === "lg" && "h-14 text-base",
        rounding === "sm" ? "rounded-lg" : "rounded-full",
        variant === "secondry"
          ? "px-6 bg-[#101010] hover:bg-[#000000] inline-flex items-center justify-center text-center font-medium tracking-looser text-white hover:shadow transition-[border_.28s_cubic-bezier(.4,0,.2,1),box-shadow_.28s_cubic-bezier(.4,0,.2,1)] disabled:bg-[#e4e4e4] disabled:border-[#e4e4e4] disabled:text-[#999999] active:bg-[#101010] active:border-[#101010] select-none"
          : "px-6 bg-primary hover:bg-hover-primary inline-flex items-center justify-center text-center font-medium tracking-looser text-white hover:shadow transition-[border_.28s_cubic-bezier(.4,0,.2,1),box-shadow_.28s_cubic-bezier(.4,0,.2,1)] disabled:bg-[#e4e4e4] disabled:border-[#e4e4e4] disabled:text-[#999999] active:bg-deep-blue active:border-deep-blue select-none",
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
