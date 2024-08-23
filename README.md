
# Auction Bidding Platform - Backend

This repository contains the backend microservices for the **Admin Panel** and **Auction Bidding** system. The **Auction Bidding** microservice handles the auction process but does not yet include the functionality to determine the winner due to the 1-day time duration requirement.

## Features

### Admin Panel Backend
- APIs for managing auctions, users, and bidding processes.
- Real-time monitoring of ongoing auctions and bidding activity.

### Auction Bidding Backend
- APIs for placing bids on items in real-time.
- Endpoints to view auction details and current highest bids.

## Prerequisites

Before running the backend locally, ensure you have the following installed:

- Node.js (v14.x or later)
- npm (v6.x or later)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/auction-bidding-backend.git
cd auction-bidding-backend
```

### 2. Install Dependencies

Navigate to each backend service directory and install the necessary Node packages:

```bash
# For Admin Panel Backend
cd admin-panel-backend
npm install

# For Auction Bidding Backend
cd ../auction-bidding-backend
npm install
```

### 3. Create Environment Variables

Create a `.env` file in the root of each backend service directory with the following variables:

```bash
# .env file

# Backend URL
BACKEND_URL=http://your-backend-url

# Secret Key
SECRET_KEY=your-secret-key
```

Replace `your-backend-url` with the actual backend URL and `your-secret-key` with your secret key.

### 4. Run the Backend Services

Navigate to each backend service directory and run the following command to start the services:

```bash
# For Admin Panel Backend
cd admin-panel-backend
npm start

# For Auction Bidding Backend
cd ../auction-bidding-backend
npm start
```

### 5. Access the Backend Services

- **Auction Bidding Backend**: Access the APIs at `http://localhost:3001/api`.

## Future Enhancements

- Implementing the logic to determine the auction winner after a 1-day duration.
- Adding additional API endpoints for better auction management.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## License

This project is licensed under the MIT License.
