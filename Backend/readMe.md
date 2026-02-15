# ChakulaKonnect Backend

Node.js/Express REST API with PostgreSQL

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Configure your database in `.env`

4. Run development server:
```bash
npm run dev
```

## API Endpoints

See [API Documentation](../docs/API_DOCUMENTATION.md)

## Project Structure
```
src/
├── config/       # Database & app configuration
├── controllers/  # Request handlers
├── middleware/   # Authentication, validation, etc.
├── models/       # Database models
├── routes/       # API routes
└── utils/        # Helper functions
```