// src/components/DataEntry.js
import  { useState, useEffect } from 'react';
import axios from 'axios';

const DataEntry = () => {
  const [formData, setFormData] = useState({
    company: {
      Company_ID: '',
      Name: '',
      Rating: '',
      TypeOfDelivery: '',
      ModeOfDelivery: ''
    },
    customers: {
      customer_id: '',
      name: '',
      address: '',
      city: '',
      pincode: '',
      email: '',
      contact: ''
    },
    expects: {
      customer: '',
      company: '',
      payment_method: ''
    },
    vehicles: {
      vehicle_id: '',
      driver_name: '',
      type: ''
    },
    warehouses: {
      warehouse_id: '',
      capacity: '',
      current_inventory: '',
      status: '',
      address: ''
    },
    orders: {
      order_id: '',
      product_name: '',
      quantity: '',
      estimated_time: '',
      status: '',
      returned: '',
      company: '',
      warehouse: '',
      vehicle: ''
    },
    products: {
      order: '',
      product_name: '',
      dimensions_cm: '',
      weight_kg: '',
      price: ''
    }
  });

  const [company, setcompany] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch reference data
    const fetchData = async () => {
      const [companyRes, customersRes, warehousesRes, vehiclesRes, ordersRes] = await Promise.all([
        axios.get('http://localhost:8000/api/company/'),
        axios.get('http://localhost:8000/api/customers/'),
        axios.get('http://localhost:8000/api/warehouses/'),
        axios.get('http://localhost:8000/api/vehicles/'),
        axios.get('http://localhost:8000/api/orders/')
      ]);
      
      setcompany(companyRes.data);
      setCustomers(customersRes.data);
      setWarehouses(warehousesRes.data);
      setVehicles(vehiclesRes.data);
      setOrders(ordersRes.data);
    };
    
    fetchData();
  }, []);

  const handleSubmit = async (endpoint, data) => {
    try {
      await axios.post(`http://localhost:8000/api/${endpoint}/`, data);
      alert('Data saved successfully!');
      // Reset form
      setFormData(prev => ({
        ...prev,
        [endpoint]: Object.fromEntries(Object.keys(prev[endpoint]).map(key => [key, '']))
      }));
    } catch (error) {
      alert('Error saving data: ' + error.message);
    }
  };

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Company Database Data Entry</h1>
      
      {/* Company Details Form */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
  <h2 className="text-xl font-semibold mb-4">Company Details</h2>
  <form onSubmit={(e) => {
    e.preventDefault();
    handleSubmit('company', formData.company);
  }} className="space-y-4">
    <input
      type="text"
      placeholder="Company ID"
      value={formData.company.Company_ID}
      onChange={(e) => handleChange('company', 'Company_ID', e.target.value)}
      className="w-full p-2 border rounded"
      required
    />
    <input
      type="text"
      placeholder="Name"
      value={formData.company.Name}
      onChange={(e) => handleChange('company', 'Name', e.target.value)}
      className="w-full p-2 border rounded"
      required
    />
    <input
      type="number"
      step="0.1"
      placeholder="Rating"
      value={formData.company.Rating}
      onChange={(e) => handleChange('company', 'Rating', e.target.value)}
      className="w-full p-2 border rounded"
      required
    />
    <input
      type="text"
      placeholder="Type of Delivery"
      value={formData.company.TypeOfDelivery}
      onChange={(e) => handleChange('company', 'TypeOfDelivery', e.target.value)}
      className="w-full p-2 border rounded"
      required
    />
    <input
      type="text"
      placeholder="Mode of Delivery"
      value={formData.company.ModeOfDelivery}
      onChange={(e) => handleChange('company', 'ModeOfDelivery', e.target.value)}
      className="w-full p-2 border rounded"
      required
    />
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      Save Company
    </button>
  </form>
</div>

      {/* Customer Details Form */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit('customers', formData.customers);
        }} className="space-y-4">
          <input
            type="text"
            placeholder="Customer ID"
            value={formData.customers.customer_id}
            onChange={(e) => handleChange('customers', 'customer_id', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Name"
            value={formData.customers.name}
            onChange={(e) => handleChange('customers', 'name', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Address"
            value={formData.customers.address}
            onChange={(e) => handleChange('customers', 'address', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="City"
            value={formData.customers.city}
            onChange={(e) => handleChange('customers', 'city', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Pincode"
            value={formData.customers.pincode}
            onChange={(e) => handleChange('customers', 'pincode', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.customers.email}
            onChange={(e) => handleChange('customers', 'email', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="tel"
            placeholder="Contact"
            value={formData.customers.contact}
            onChange={(e) => handleChange('customers', 'contact', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Save Customer
          </button>
        </form>
      </div>

      {/* Expects From Form */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Customer Expectations</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit('expects', formData.expects);
        }} className="space-y-4">
          <select
            value={formData.expects.customer}
            onChange={(e) => handleChange('expects', 'customer', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Customer</option>
            {customers.map(customer => (
              <option key={customer.customer_id} value={customer.customer_id}>
                {customer.name}
              </option>
            ))}
          </select>
          <select
            value={formData.expects.company}
            onChange={(e) => handleChange('expects', 'company', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Company</option>
            {company.map(company => (
              <option key={company.Company_ID} value={company.Company_ID}>
                {company.Name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Payment Method"
            value={formData.expects.payment_method}
            onChange={(e) => handleChange('expects', 'payment_method', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Save Expectation
          </button>
        </form>
      </div>

      {/* Vehicle Form */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Vehicle Details</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit('vehicles', formData.vehicles);
        }} className="space-y-4">
          <input
            type="text"
            placeholder="Vehicle ID"
            value={formData.vehicles.vehicle_id}
            onChange={(e) => handleChange('vehicles', 'vehicle_id', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Driver Name"
            value={formData.vehicles.driver_name}
            onChange={(e) => handleChange('vehicles', 'driver_name', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Vehicle Type"
            value={formData.vehicles.type}
            onChange={(e) => handleChange('vehicles', 'type', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Save Vehicle
          </button>
        </form>
      </div>

      {/* Warehouse Form */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Warehouse Details</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit('warehouses', formData.warehouses);
        }} className="space-y-4">
          <input
            type="text"
            placeholder="Warehouse ID"
            value={formData.warehouses.warehouse_id}
            onChange={(e) => handleChange('warehouses', 'warehouse_id', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Capacity"
            value={formData.warehouses.capacity}
            onChange={(e) => handleChange('warehouses', 'capacity', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Current Inventory"
            value={formData.warehouses.current_inventory}
            onChange={(e) => handleChange('warehouses', 'current_inventory', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Status"
            value={formData.warehouses.status}
            onChange={(e) => handleChange('warehouses', 'status', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Address"
            value={formData.warehouses.address}
            onChange={(e) => handleChange('warehouses', 'address', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Save Warehouse
          </button>
        </form>
      </div>

      {/* Orders Form */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Orders</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit('orders', formData.orders);
        }} className="space-y-4">
          <input
            type="text"
            placeholder="Order ID"
            value={formData.orders.order_id}
            onChange={(e) => handleChange('orders', 'order_id', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Product Name"
            value={formData.orders.product_name}
            onChange={(e) => handleChange('orders', 'product_name', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={formData.orders.quantity}
            onChange={(e) => handleChange('orders', 'quantity', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Estimated Time"
            value={formData.orders.estimated_time}
            onChange={(e) => handleChange('orders', 'estimated_time', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Status"
            value={formData.orders.status}
            onChange={(e) => handleChange('orders', 'status', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <select
            value={formData.orders.returned}
            onChange={(e) => handleChange('orders', 'returned', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Return Status</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <select
            value={formData.orders.company}
            onChange={(e) => handleChange('orders', 'company', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Company</option>
            {company.map(company => (
              <option key={company.Company_ID} value={company.Company_ID}>
                {company.Name}
              </option>
            ))}
          </select>
          <select value={formData.orders.warehouse}
            onChange={(e) => handleChange('orders', 'warehouse', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Warehouse</option>
            {warehouses.map(warehouse => (
              <option key={warehouse.warehouse_id} value={warehouse.warehouse_id}>
                {warehouse.warehouse_id}
              </option>
            ))}
          </select>
          <select
            value={formData.orders.vehicle}
            onChange={(e) => handleChange('orders', 'vehicle', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Vehicle</option>
            {vehicles.map(vehicle => (
              <option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
                {vehicle.vehicle_id} - {vehicle.driver_name}
              </option>
            ))}
          </select>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Save Order
          </button>
        </form>
      </div>

      {/* Product Details Form */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Product Details</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit('products', formData.products);
        }} className="space-y-4">
          <select
            value={formData.products.order}
            onChange={(e) => handleChange('products', 'order', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Order</option>
            {orders.map(order => (
              <option key={order.order_id} value={order.order_id}>
                {order.order_id} - {order.product_name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Product Name"
            value={formData.products.product_name}
            onChange={(e) => handleChange('products', 'product_name', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Dimensions (cm)"
            value={formData.products.dimensions_cm}
            onChange={(e) => handleChange('products', 'dimensions_cm', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Weight (kg)"
            value={formData.products.weight_kg}
            onChange={(e) => handleChange('products', 'weight_kg', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.products.price}
            onChange={(e) => handleChange('products', 'price', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Save Product Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default DataEntry;
