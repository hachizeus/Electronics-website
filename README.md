# Electronics Website

A full-stack electronics e-commerce website with separate frontend, admin panel, and backend.

## 🚀 Live Demo
Run locally with `npm run dev`

## 📁 Project Structure

```
electronics-website/
├── frontend/          # React frontend (Port 3000)
├── admin/            # Admin panel (Port 3001)
├── backend/          # Express.js API server (Port 5000)
└── package.json      # Root package with concurrently setup
```

## 🛠️ Local Development

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

2. **Run all services at once:**
   ```bash
   npm run dev
   ```

This will start:
- Frontend: http://localhost:3000
- Admin Panel: http://localhost:3001
- Backend API: http://localhost:5000

## 🌐 Local Development Only

This project runs locally. For deployment, consider using Vercel, Netlify, or other hosting platforms.

## 🔧 Admin Access

- URL: http://localhost:3001
- Just click "Sign In" button (no credentials needed)

## ✨ Features

### Frontend
- Product catalog with filtering and search
- Flash sales with countdown timer
- Shopping cart functionality
- Responsive design with dark mode
- Product details and categories

### Admin Panel
- One-click login system
- Product management (CRUD operations)
- Real-time product updates
- Clean, intuitive interface

### Backend
- RESTful API for products
- JWT-based admin authentication
- CORS enabled for cross-origin requests
- In-memory data storage

## 🔗 API Endpoints

### Public Routes
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Admin Routes
- `POST /api/admin/login` - Admin login
- `GET /api/admin/products` - Get all products (admin view)
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

## 🛠️ Technologies Used

- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Admin:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js, JWT, bcryptjs
- **Deployment:** Local development
- **Development:** Concurrently, Nodemon