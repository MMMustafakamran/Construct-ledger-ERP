import React from "react";

const EmptyState: React.FC<{ title: string; message: string; icon?: string }> = ({ title, message, icon }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon || "📭"}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
    </div>
  );
};

export default EmptyState;
