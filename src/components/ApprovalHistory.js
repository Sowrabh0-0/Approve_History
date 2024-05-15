import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import Filter from './Filter';
import Navbar from './Navbar';
import './ApprovalHistory.css';

const ApprovalHistory = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/approvals`);
        if (Array.isArray(response.data)) {
          setData(response.data);
          setFilteredData(response.data);
        } else {
          console.error('Fetched data is not an array:', response.data);
          setError(new Error('Fetched data is not an array'));
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilter = useCallback((filters) => {
    let filtered = data;
    if (filters.requestedBy) {
      filtered = filtered.filter(item => item.requestedBy.includes(filters.requestedBy));
    }
    if (filters.approvedBy) {
      filtered = filtered.filter(item => item.approvedBy.includes(filters.approvedBy));
    }
    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status);
    }
    setFilteredData(filtered);
  }, [data]);

  const columns = useMemo(() => [
    { Header: 'Request Date', accessor: 'requestDate' },
    { Header: 'Status', accessor: 'status' },
    { Header: 'Approved / Disapproved On', accessor: 'approvedOn' },
    { Header: 'Approval Message', accessor: 'message' },
    { Header: 'Requested By', accessor: 'requestedBy' },
    { Header: 'Approved By', accessor: 'approvedBy' },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: filteredData });

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="approval-history">
      <Navbar />
      <div className="header-content">
        <h1>Approval History</h1>
      </div>
      <Filter onFilter={handleFilter} />
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th key={column.id} {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td key={cell.id} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovalHistory;
