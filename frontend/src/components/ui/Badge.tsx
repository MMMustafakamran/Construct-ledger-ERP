import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
}

const Badge: React.FC<BadgeProps> = ({ children, variant = "neutral" }) => {
  return <span className={`badge badge-${variant}`}>{children}</span>;
};

export default Badge;
