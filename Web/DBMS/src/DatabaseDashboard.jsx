import React, { useState, useEffect } from 'react';
import './DatabaseDashboard.css';  // We'll create this CSS file next

const DatabaseDashboard = () => {
  const [tableData, setTableData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('CompanyDetails');
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [filters, setFilters] = useState({});

  const tables = [
    'CompanyDetails',
    'CustomerDetails',
    'ExpectsFrom',
    'Vehicle',
    'Warehouse',
    'Orders',
    'ProductDetails'
  ];

  useEffect(() => {
    const fetchAllTables = async () => {
      try {
        const results = {};
        for (const table of tables) {
          const response = await fetch(`/api/table/${table}/`);
          if (!response.ok) throw new Error(`Failed to fetch ${table}`);
          const data = await response.json();
          results[table] = data;
        }
        setTableData(results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAllTables();
  }, []);

  const handleEdit = (row, tableName) => {
    setEditingRow(row);
    setEditedData(row);
  };


  const handleSave = async (tableName) => {
    try {
      const idField = getIdFieldForTable(tableName);
      const response = await fetch(`/api/table/${tableName}/${editedData[idField]}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });
  
      if (!response.ok) throw new Error('Failed to update');
  
      setTableData(prev => ({
        ...prev,
        [tableName]: prev[tableName].map(row => 
          row[idField] === editedData[idField] ? editedData : row
        )
      }));
  
      setEditingRow(null);
      setEditedData({});
    } catch (err) {
      alert('Error saving: ' + err.message);
    }
  };
  

  const handleFilterChange = (column, value, tableName) => {
    setFilters(prev => ({
      ...prev,
      [tableName]: {
        ...prev[tableName],
        [column]: value
      }
    }));
  };

  const getIdFieldForTable = (tableName) => {
    const idMapping = {
      'CompanyDetails': 'Company_ID',
      'CustomerDetails': 'Customer_ID',
      'Vehicle': 'Vehicle_ID',
      'Warehouse': 'Warehouse_ID',
      'Orders': 'Order_ID',
      'ProductDetails': 'Order_ID'
    };
    return idMapping[tableName] || 'id';
  };

  const filterData = (data, tableFilters) => {
    if (!tableFilters) return data;
    
    return data.filter(row => {
      return Object.entries(tableFilters).every(([column, filterValue]) => {
        if (!filterValue) return true;
        const cellValue = String(row[column] || '').toLowerCase();
        return cellValue.includes(filterValue.toLowerCase());
      });
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const renderTable = (tableName) => {
    const data = tableData[tableName] || [];
    if (data.length === 0) return <p className="no-data">No data available</p>;

    const columns = Object.keys(data[0]);
    const filteredData = filterData(data, filters[tableName]);

    return (
      <div className="table-container">
        <div className="filters">
          {columns.map(column => (
            <input
              key={column}
              type="text"
              placeholder={`Filter ${column}`}
              onChange={(e) => handleFilterChange(column, e.target.value, tableName)}
              className="filter-input"
            />
          ))}
        </div>
        <table className="data-table">
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column}>{column.replace(/_/g, ' ')}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                {columns.map(column => (
                  <td key={column}>
                    {editingRow === row ? (
                      <input
                        type="text"
                        value={editedData[column] || ''}
                        onChange={(e) => setEditedData(prev => ({
                          ...prev,
                          [column]: e.target.value
                        }))}
                        className="edit-input"
                      />
                    ) : (
                      row[column]?.toString() || '-'
                    )}
                  </td>
                ))}
                <td>
                  {editingRow === row ? (
                    <div className="action-buttons">
                      <button onClick={() => handleSave(tableName)} className="save-button">
                        Save
                      </button>
                      <button onClick={() => setEditingRow(null)} className="cancel-button">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => handleEdit(row, tableName)} className="edit-button">
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Database Dashboard</h1>
      <div className="tabs">
        {tables.map((table) => (
          <button
            key={table}
            className={`tab ${activeTab === table ? 'active' : ''}`}
            onClick={() => setActiveTab(table)}
          >
            {table}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {renderTable(activeTab)}
      </div>
    </div>
  );
};

export default DatabaseDashboard;