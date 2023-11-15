import React, { useState } from "react";
import CSVReader from "@uiw/react-csv-reader";
import DataMapper from "./DataMapper";
import "./styles.css";

const App = () => {
  const [csvData, setCSVData] = useState([]);
  const [mappedDataBase, setMappedDataBase] = useState([]);

  const handleCSV = (data) => {
    setCSVData(data);
  };

  const customHandleCSV = (data) => {
    // Extract headers from the first row
    const headers = data[0];

    // Convert the array of data to an array of objects with keys as headers
    const parsedData = data.slice(1).map((row) => {
      const rowData = {};
      headers.forEach((header, index) => {
        rowData[header] = row[index];
      });
      return rowData;
    });

    handleCSV(parsedData);
  };

  const handleMapping = async (fieldMappings) => {
    try {
      const mappedData = [];
      csvData.forEach((row) => {
        const mappedRow = {};
        Object.keys(fieldMappings).forEach((column) => {
          if (column === "Class") return;
          const databaseField = fieldMappings[column];
          const value = databaseField.map((field) => row[field]).join(" ");
          mappedRow[column] = value;
        });
        const classes = fieldMappings["Class"];
        classes.forEach((ele) => {
          mappedData.push({
            ...mappedRow,
            Class: row[ele],
          });
        });
      });
      setMappedDataBase(mappedData);
    } catch (error) {
      console.error("Error mapping data:", error);
    }
  };

  return (
    <div className="App">
      <h1>CSV Upload and Mapping App</h1>
      <CSVReader
        onFileLoaded={customHandleCSV}
        parserOptions={{ header: false, skipEmptyLines: true }}
      />

      {csvData.length > 0 && (
        <>
          <h2>Uploaded CSV Data</h2>
          <table>
            <thead>
              <tr>
                {csvData[0] &&
                  Object.keys(csvData[0]).map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <a
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(
              csvData.map((row) => Object.values(row).join(",")).join("\n")
            )}`}
            download="uploaded_data.csv"
          >
            Download Uploaded CSV
          </a>
          <DataMapper csvData={csvData} handleMapping={handleMapping} />
        </>
      )}
      {mappedDataBase.length > 0 && (
        <>
          <h2>Mapped Data</h2>
          <table>
            <thead>
              <tr>
                {mappedDataBase[0] &&
                  Object.keys(mappedDataBase[0]).map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {mappedDataBase.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <a
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(
              mappedDataBase
                .map((row) => Object.values(row).join(","))
                .join("\n")
            )}`}
            download="mapped_data.csv"
          >
            Download Mapped CSV
          </a>
        </>
      )}
    </div>
  );
};

export default App;
