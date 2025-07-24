# KodeCamp Stage 4 Project

This is a Node.js RESTful API for managing users and products, built with Express and MongoDB (Mongoose). The project supports user registration, login, and product management with role-based access control (admin/customer).

## Features

- User registration and login (with JWT authentication)
- Role-based access (admin, customer)
- Add, view, and delete products (admin only for add/delete)
- Secure endpoints with JWT middleware

## Project Structure

```
├── app.js
├── package.json
├── controllers/
│   ├── productsController.js
│   └── userController.js
├── middleware/
│   └── checkAuth.js
├── routers/
│   ├── productsRouter.js
│   └── userRouter.js
├── schema/
│   ├── product.js
│   └── user.js
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd <project-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add:
   ```env
   DB_URL=<your-mongodb-connection-string>
   JWT_KEY=<your-secret-key>
   PORT=3000
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Documentation

The full API documentation and sample requests are available in the following Postman collection:

[Postman Documentation - KodeCamp Stage 4](https://www.postman.com/ife-di-ora/workspace/tutorials/collection/31603116-57cfd962-97dd-460e-abd8-2131c6ed57ae?action=share&creator=31603116)

## Main Endpoints

### Auth

- `POST /auth/register` — Register a new user (admin or customer)
- `POST /auth/login` — Login and receive JWT token

### Products

- `GET /products` — Get all products
- `POST /products` — Add a new product (admin only, requires JWT)
- `DELETE /products/:id` — Delete a product by ID (admin only, requires JWT)

## Environment Variables

- `DB_URL` — MongoDB connection string
- `JWT_KEY` — Secret key for JWT
- `PORT` — Port number (default: 3000)

## License

This project is for educational purposes.
