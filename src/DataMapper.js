import React, { useState } from "react";

const CSVField = ({ columnName, index, csvData }) => {
  return (
    <div
      className="searchable-dropdown"
      key={index}
      style={{ display: "flex", margin: "10px 0px" }}
    >
      <span style={{ width: "100px" }}>{columnName}</span>
      <select name={columnName} multiple={true}>
        {csvData[0] &&
          Object.keys(csvData[0]).map((fieldName, idx) => (
            <option value={fieldName}>{fieldName}</option>
          ))}
      </select>
    </div>
  );
};

const DataMapper = ({ csvData = [], handleMapping = () => {} }) => {
  const [fieldMappings, setFieldMappings] = useState({});
  const dbColumns = ["Name", "Class", "School", "State"];
  const handleSubmit = (e) => {
    e.preventDefault();
    handleMapping(fieldMappings);
  };

  return (
    <div>
      <h2>Data Mapping</h2>
      <div>
        <span>Select the CSV fields you want to map to each column</span>
        <span> (Hold down shift to select multiple)</span>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex" style={{ justifyContent: "space-between" }}>
            {dbColumns.map((column, index) => (
              <div key={index}>
                <span
                  style={{
                    width: "100px",
                    marginBottom: "6px",
                    fontWeight: "600",
                  }}
                >
                  {column}
                </span>
                <select
                  name={column}
                  multiple={true}
                  onChange={(e) => {
                    const options = [...e.target.selectedOptions];
                    const values = options.map((option) => option.value);
                    setFieldMappings((prev) => ({
                      ...prev,
                      [column]: values,
                    }));
                  }}
                >
                  {csvData[0] &&
                    Object.keys(csvData[0]).map((fieldName, idx) => (
                      <option value={fieldName}>{fieldName}</option>
                    ))}
                </select>
              </div>
            ))}
          </div>
          <div className="flex" style={{ justifyContent: "flex-end" }}>
            <button type="reset">Reset</button>
            <button type="submit">Submit and Map</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataMapper;
