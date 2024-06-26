import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ onFilter }) => {
    const [requestedBy, setRequestedBy] = useState('');
    const [approvedBy, setApprovedBy] = useState('');
    const [status, setStatus] = useState('');

    const handleFilter = (e) => {
        e.preventDefault();
        onFilter({
            requestedBy,
            approvedBy,
            status,
        });
    };

    return (
        <div className="filter">
            <form onSubmit={handleFilter}>
                <div>
                    <label htmlFor="requestedBy">Requested By:</label>
                    <input
                        type="text"
                        id="requestedBy"
                        value={requestedBy}
                        onChange={(e) => setRequestedBy(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="approvedBy">Approved By:</label>
                    <input
                        type="text"
                        id="approvedBy"
                        value={approvedBy}
                        onChange={(e) => setApprovedBy(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <button type="submit">Filter</button>
            </form>
        </div>
    );
};

export default Filter;

// This component is used to render a filter form for a list of items.
// It takes an `onFilter` prop which is a function to be called when the filter form is submitted.
// The form contains inputs for filtering by requestedBy, approvedBy, and status.
// When the form is submitted, the `handleFilter` function is called with the current values of the inputs,
// and the `onFilter` function is called with an object containing the filter values.
