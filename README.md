# UnifiedLogistics

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

UnifiedLogistics is a comprehensive logistics management platform designed to optimize transportation planning, warehouse management, order fulfillment, and supply chain visibility. It integrates with existing ERP and CRM systems to streamline logistics operations and provide real-time insights.

## 🌟 Features

### Transportation Management System (TMS)
- **Route Optimization**: AI-powered algorithms for optimal route planning
- **Carrier Management**: Compare rates and manage relationships with logistics providers
- **Shipment Tracking**: Real-time visibility into shipment status and location
- **Documentation**: Digital management of shipping documents and customs paperwork

### Warehouse Management System (WMS)
- **Inventory Control**: Real-time tracking of inventory levels and locations
- **Pick and Pack Optimization**: Efficient picking routes and packing instructions
- **Labor Management**: Track productivity and allocate resources effectively
- **Barcode/RFID Integration**: Seamless scanning capabilities for inventory management

### Order Management
- **Order Processing**: Automated workflows for order fulfillment
- **Customer Notifications**: Automated status updates and delivery notifications
- **Returns Management**: Streamlined return processing and inventory restocking
- **Order Analytics**: Detailed reports on order metrics and fulfillment performance

### Integration Capabilities
- **API Framework**: Robust APIs for connecting with ERP, CRM, and e-commerce platforms
- **EDI Support**: Electronic Data Interchange compatibility
- **Custom Integrations**: Support for specialized systems and business needs

### Analytics and Reporting
- **Business Intelligence**: Customizable dashboards for key performance indicators
- **Forecasting**: Predictive analytics for demand planning
- **Cost Analysis**: Detailed breakdown of logistics costs and opportunities for optimization



### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NiharMandahas/UnifiedLogistics.git
   cd UnifiedLogistics
   ```

2. Set up a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run database migrations:
   ```bash
   python manage.py migrate
   ```

5. Create a superuser (admin):
   ```bash
   python manage.py createsuperuser
   ```

6. Start the development server:
   ```bash
   python manage.py runserver
   ```

7. For the frontend (React):
   ```bash
   cd frontend
   npm install
   npm start
   ```



## 📋 API Documentation

The API documentation is available at `/api/docs/` when running the server locally. For Django REST Framework's browsable API interface, visit `/api/` endpoints directly in your browser. For detailed information about available endpoints and request/response formats, please refer to the API documentation.

## 🔧 Configuration

UnifiedLogistics can be configured through environment variables in your `.env` file. See `.env.example` for available configuration options.

For Django-specific settings, refer to `backend/settings.py` and related configuration files.

## 🧪 Testing

```bash
# Run Django tests
python manage.py test

# Run tests with coverage
coverage run --source='.' manage.py test
coverage report

# Run frontend tests
cd frontend
npm test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React](https://reactjs.org/)
- [MySQL](https://www.mysql.com/)
