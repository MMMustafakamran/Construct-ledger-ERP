import React from "react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  align?: "left" | "center" | "right";
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
}

function Table<T extends { id: string | number }>({ columns, data, onRowClick, isLoading }: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="table-state">
        <div className="skeleton-line wide" />
        <div className="skeleton-line" />
        <div className="skeleton-line medium" />
      </div>
    );
  }

  if (data.length === 0) {
    return <div className="table-state">No records found yet.</div>;
  }

  return (
    <div className="table-shell">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} style={{ textAlign: col.align ?? "left" }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} onClick={() => onRowClick?.(item)} className={onRowClick ? "clickable" : ""}>
              {columns.map((col, idx) => (
                <td key={idx} style={{ textAlign: col.align ?? "left" }}>
                  {typeof col.accessor === "function" ? col.accessor(item) : (item[col.accessor] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
