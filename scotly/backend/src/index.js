import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import regalosRoutes from './routes/regalos.js';
import usuariosRoutes from './routes/usuarios.js';
import tiendaRoutes from './routes/tienda.js';
import inventarioRoutes from './routes/inventario.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.get('/', (req, res) => {
  res.json({ message: 'Scotly API funcionando 🎮' });
});

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/regalos', regalosRoutes);
app.use('/api/inventario', inventarioRoutes);
app.use('/api/tienda', tiendaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});