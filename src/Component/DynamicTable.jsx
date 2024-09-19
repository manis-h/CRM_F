import React from 'react';
import './DynamicTable.css';
import { useLocation } from 'react-router-dom';

const DynamicTable = ({ header = [], rows = [] }) => {
  const location = useLocation();

  return (
    <div className="table-container">
      
      <table>
        <thead>
          <tr>
            {header.map((headerItem, index) => (
              <th key={index} className="table-header">
                {headerItem}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="table-row">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="table-cell">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={header.length} className="no-data">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
