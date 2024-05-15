import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import Filter from './Filter';
import Navbar from './Navbar';
import './ApprovalHistory.css';

const ApprovalHistory = () => {
    const [data, setData] = useState([]); // State to store the data
    const [filteredData, setFilteredData] = useState([]); // State to store the filtered data
    const [loading, setLoading] = useState(true); // State to track loading state
    const [error, setError] = useState(null); // State to track error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/approvals`); // Fetch data from the backend API
                if (Array.isArray(response.data)) {
                    console.log('Fetched data:', response.data);
                    setData(response.data); // Set the fetched data to the state
                    setFilteredData(response.data); // Set the filtered data to the state
                } else {
                    console.error('Fetched data is not an array:', response.data);
                    setError(new Error('Fetched data is not an array')); // Set error if the fetched data is not an array
                }
                setLoading(false); // Set loading state to false
            } catch (error) {
                setError(error); // Set error if there is an error during data fetching
                setLoading(false); // Set loading state to false
            }
        };

        fetchData(); // Call the fetchData function when the component mounts
    }, []);

    const handleFilter = useCallback((filters) => {
        let filtered = data;
        if (filters.requestedBy) {
            filtered = filtered.filter(item => item.requestedBy.includes(filters.requestedBy)); // Filter data based on the requestedBy filter
        }
        if (filters.approvedBy) {
            filtered = filtered.filter(item => item.approvedBy.includes(filters.approvedBy)); // Filter data based on the approvedBy filter
        }
        if (filters.status) {
            filtered = filtered.filter(item => item.status === filters.status); // Filter data based on the status filter
        }
        setFilteredData(filtered); // Set the filtered data to the state
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
        return <div className="loading">Loading...</div>; // Show loading message if data is still loading
    }

    if (error) {
        return <div className="error">Error: {error.message}</div>; // Show error message if there is an error
    }

    return (
        <div className="approval-history">
            <Navbar />
            <div className="header-content">
                <h1>Approval History</h1>
            </div>
            <Filter onFilter={handleFilter} /> {/* Filter component to filter the data */}
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
