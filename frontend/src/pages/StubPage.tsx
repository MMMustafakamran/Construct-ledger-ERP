import React from "react";
import PageHeader from "../components/layout/PageHeader";
import EmptyState from "../components/ui/EmptyState";

interface StubPageProps {
  title: string;
  description: string;
}

const StubPage: React.FC<StubPageProps> = ({ title, description }) => {
  return (
    <div className="stub-page">
      <PageHeader title={title} />
      <div className="table-card" style={{ padding: '40px' }}>
        <EmptyState 
          title="Coming Soon" 
          message={description} 
          icon="🛠️"
        />
      </div>
    </div>
  );
};

export default StubPage;
