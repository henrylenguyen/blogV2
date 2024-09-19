import React, { useMemo } from 'react';
import Table from './table';
import { columns } from './columnModel';

const TableContainer: React.FC = () => {
  const data = useMemo(() => [
    { name: 'John Doe', age: 28, email: 'john@example.com', joinDate: '2023-01-01' },
    { name: 'Jane Smith', age: 34, email: 'jane@example.com', joinDate: '2022-05-15' },
    { name: 'Alice Johnson', age: 45, email: 'alice@example.com', joinDate: '2023-02-20' },
  ], []);

  return (
    <div className="p-4">
      <Table data={data} columns={columns} />
    </div>
  );
};

export default TableContainer;
