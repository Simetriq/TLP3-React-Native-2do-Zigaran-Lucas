import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import elementsRoutes from './src/routes/elements_routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.use('/elements', elementsRoutes);

app.listen(PORT, () => {
  console.log(`Server corriendo en http://localhost:${PORT}`);
});