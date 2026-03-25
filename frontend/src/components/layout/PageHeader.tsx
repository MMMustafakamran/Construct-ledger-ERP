import React from "react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  backPath?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, actionLabel, onAction, backPath }) => {
  const navigate = useNavigate();

  return (
    <div className="page-header">
      <div className="header-title-row">
        {backPath && (
          <button className="back-button" onClick={() => navigate(backPath)}>
            ←
          </button>
        )}
        <h1 className="page-title">{title}</h1>
      </div>
      {actionLabel && (
        <button className="primary-button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default PageHeader;
