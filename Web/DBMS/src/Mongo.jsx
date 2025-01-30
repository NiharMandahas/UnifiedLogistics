import { useState } from "react";
import axios from "axios";
import "./Mongo.css";

function Mongo() {
  const [collection, setCollection] = useState("Company_Data"); // Default collection
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    try {
      // Send the query to the backend
      const response = await axios.post("http://localhost:8000/api/mongo_query/", {
        collection,
        query,
      });

      // Update the result and clear any previous errors
      setResult(response.data.result);
      setError("");
    } catch (err) {
      // Handle errors and update the error message
      setResult(null);
      setError(err.response?.data?.error || "An error occurred while executing the query.");
    }
  };

  // Function to render the results as a table
  const renderTable = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <p>No data found.</p>;
    }

    // Extract table headers from the keys of the first object
    const headers = Object.keys(data[0]);

    return (
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="Mongo-Main">
      <div>
        <h1 className="title">MongoDB Query Executor</h1>
      </div>
      <div className="Mongo-Form">
        <form onSubmit={handleSubmit}>
          {/* Collection Selector */}
          <div>
            <label className="Select" htmlFor="collection">Select Collection:</label>
            <select
              className="drop"
              id="collection"
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
            >
              <option value="Company_Data">Company Data</option>
              <option value="Customer_Data">Customer Data</option>
              <option value="Orders_Data">Order Data</option>
              <option value="Package_Data">Package Data</option>
              <option value="Warehouse_Data">Warehouse Data</option>
              <option value="Vehicle_Data">Vehicle Data</option>
              <option value="Expects_From_Data">Expects From Data</option>
            </select>
            <br />
            <br />
          </div>
          {/* Query Textarea */}
          <div>
            <textarea
              className="Mongo_query"
              rows="10"
              cols="100"
              placeholder="Enter your MongoDB query here..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            ></textarea>
            <br />
          </div>
          <div className="button-submit">
            {/* Submit Button */}
            <button id="Execute-Button" type="submit" className="submit-mongo">
              Execute Query
            </button>
          </div>
        </form>
      </div>
      {/* Error Message */}
      {error && (
        <h3 style={{ color: "red" }}>
          Error: {error}
        </h3>
      )}

      {/* Query Result */}
      {result && (
        <div>
          <h3>Query Result:</h3>
          {renderTable(result)}
        </div>
      )}
    </div>
  );
}

export default Mongo;