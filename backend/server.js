import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your-secret-key';

app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
let products = [
  { id: 1, name: 'iPhone 15 Pro', price: 999, category: 'Electronics', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', description: 'Latest iPhone with advanced camera system' },
  { id: 2, name: 'MacBook Pro 16"', price: 2499, category: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', description: 'Powerful laptop for professionals' },
  { id: 3, name: 'Sony WH-1000XM5', price: 399, category: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', description: 'Premium noise-canceling headphones' },
  { id: 4, name: 'Apple Watch Series 9', price: 399, category: 'Wearables', image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400', description: 'Advanced smartwatch with health monitoring' },
  { id: 5, name: 'Samsung Galaxy S24', price: 799, category: 'Electronics', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400', description: 'Flagship Android smartphone' },
  { id: 6, name: 'Dell XPS 13', price: 1199, category: 'Laptops', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400', description: 'Ultra-portable premium laptop' },
  { id: 7, name: 'JBL Charge 5', price: 179, category: 'Audio', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', description: 'Portable Bluetooth speaker' },
  { id: 8, name: 'Fitbit Versa 4', price: 199, category: 'Wearables', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400', description: 'Fitness-focused smartwatch' }
];

const adminUser = {
  username: 'admin',
  password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // password: 'admin123'
};

// Admin login
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  
  if (username === adminUser.username && await bcrypt.compare(password, adminUser.password)) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Middleware to verify admin token
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  
  // Accept fake token for development
  if (token === 'fake-admin-token') {
    next();
    return;
  }
  
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Public routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// Admin routes
app.get('/api/admin/products', verifyAdmin, (req, res) => {
  res.json(products);
});

app.post('/api/admin/products', verifyAdmin, (req, res) => {
  const newProduct = {
    id: Math.max(...products.map(p => p.id), 0) + 1,
    ...req.body
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/admin/products/:id', verifyAdmin, (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

app.delete('/api/admin/products/:id', verifyAdmin, (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  
  products.splice(index, 1);
  res.json({ message: 'Product deleted' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});