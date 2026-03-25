import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: string;
  trend?: {
    value: string;
    isUp: boolean;
  };
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "neutral";
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend, variant = "primary" }) => {
  return (
    <article className={`stat-card ${variant}`}>
      <div className="stat-card-header">
        <span className="stat-label">{label}</span>
        {icon && <span className="stat-icon">{icon}</span>}
      </div>
      <div className="stat-value">{value}</div>
      {trend && <div className={`stat-trend ${trend.isUp ? "up" : "down"}`}>{trend.isUp ? "↑" : "↓"} {trend.value}</div>}
    </article>
  );
};

export default StatCard;
