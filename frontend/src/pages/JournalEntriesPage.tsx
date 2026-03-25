import React, { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import Table from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import { api, JournalEntry } from "../api";

const JournalEntriesPage: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getJournalEntries().then(setEntries).finally(() => setLoading(false));
  }, []);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="journal-entries-page">
      <PageHeader title="General Ledger / Journal Entries" />
      
      <div className="table-card">
        <Table 
          isLoading={loading}
          data={entries}
          columns={[
            { header: "Date", accessor: (item) => new Date(item.entryDate).toLocaleDateString() },
            { header: "Reference", accessor: (item) => `${item.referenceType} (${item.referenceId.slice(0,8)})` },
            { header: "Memo", accessor: "memo" },
            { 
              header: "Entry Lines (Account - DR / CR)", 
              accessor: (item) => (
                <div className="journal-lines-stack">
                  {item.lines.map(line => (
                    <div key={line.id} className="journal-line-row">
                      <span className="line-account">{line.account?.name || line.accountId}</span>
                      <span className="line-amounts">
                        {line.debitAmount > 0 && <Badge variant="success">DR {formatCurrency(line.debitAmount)}</Badge>}
                        {line.creditAmount > 0 && <Badge variant="info">CR {formatCurrency(line.creditAmount)}</Badge>}
                      </span>
                    </div>
                  ))}
                </div>
              )
            },
          ]}
        />
      </div>
    </div>
  );
};

export default JournalEntriesPage;
