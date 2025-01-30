import React, { useState } from "react";

const SearchOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setOrderDetails(null);

    if (!orderId) {
      setError("Order ID is required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/search-order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_id: orderId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong.");
        return;
      }

      const data = await response.json();
      setOrderDetails(data);
    } catch (err) {
      setError("Failed to fetch order details. Please try again later.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "30vw",
        marginTop: "50px", // Adjust this for vertical spacing
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <h2 style={{ textAlign: "center" }}>Search Order</h2>
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>

        {error && (
          <div style={{ marginTop: "10px", color: "red", textAlign: "center" }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {orderDetails && (
          <div style={{ marginTop: "20px", textAlign: "left" }}>
            <h3>Order Details</h3>
            <p><strong>Product Name:</strong> {orderDetails.Product_Name}</p>
            <p><strong>Estimated Delivery Time:</strong> {orderDetails.Estimated_Time}</p>
            <p><strong>Status:</strong> {orderDetails.Status}</p>
            <p><strong>Company Name:</strong> {orderDetails.Company_Name}</p>
            <p><strong>Rating:</strong> {orderDetails.Rating}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOrder;
